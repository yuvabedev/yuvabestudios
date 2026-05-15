/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />
// receive-application — Supabase Edge Function
// Fast path: validate → save raw → respond immediately with { applicationId }
// Background: LLM parse + score → update candidate + application records
// Accepts multipart/form-data: jobCode, name, email, resume (file)

import { createClient } from "npm:@supabase/supabase-js@2";
import OpenAI from "npm:openai@6";

// ─── CORS ─────────────────────────────────────────────────────────────────────

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey, x-client-info",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

// ─── File text extraction ──────────────────────────────────────────────────────

async function extractText(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";

  if (ext === "txt" || ext === "md") {
    return new TextDecoder().decode(await file.arrayBuffer());
  }

  if (ext === "pdf") {
    const { extractText } = await import("npm:unpdf");
    const bytes = new Uint8Array(await file.arrayBuffer());
    const { text } = await extractText(bytes, { mergePages: true });
    return text;
  }

  if (ext === "docx") {
    const mammoth = await import("npm:mammoth");
    const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
    return result.value;
  }

  throw new Error(`Unsupported file type ".${ext}". Upload PDF, DOCX, TXT, or MD.`);
}

// ─── Prompts ───────────────────────────────────────────────────────────────────

const PARSE_RESUME_SYSTEM = `You are parsing a resume into a structured candidate profile. Be faithful to the resume; do not invent information that is not present.

Output fields:
- phone: phone number as written in the resume, or "" if absent.
- location: "City, Country" or "City, Region" if available. Use "City, IN" / "City, US" style if the country is implied. Empty string if absent.
- summary: 1-2 factual sentences capturing the candidate's seniority and domain. No marketing language. No first-person. At most 30 words.
- yearsOfExperience: total years of professional work, rounded down. Count from earliest professional role to latest end date (or today if "present"). Education-only candidates: 0.
- skills: 6-15 distinct skills, technologies, methodologies, or tools explicitly mentioned. Specific over generic. No duplicates. Skip soft-skill platitudes.
- experience: each professional role as a separate entry, most recent first.
  - company, title, startDate (YYYY-MM), endDate (YYYY-MM or "present"), description (1-3 sentences)
- education: each degree as a separate entry, most recent first.
  - institution, degree, year (number)
- links: linkedin, portfolio, github — use "" if not present. Do NOT invent links.

Rules: never combine roles; return neutral empties when a field cannot be determined.`;

const SCORE_RESUME_SYSTEM = `You are matching a candidate's resume against a job's evaluable criteria. For each criterion return:
- criterionLabel: copy verbatim from input
- importance: copy verbatim ("must" / "strong" / "nice")
- matched: "yes" / "partial" / "no"
- score: 0-10 (8-10 strong yes; 5-7 partial; 0-4 weak/no)
- evidence: 4-15 words citing the resume specifically. For "no", be terse.

Plus matchSummary: 2-4 sentences. First sentence names the candidate + verdict. Honest about trade-offs.

Rules: return exactly one row per criterion in the given order. Copy labels verbatim. Never invent details.`;

const IMPORTANCE_WEIGHT: Record<string, number> = { must: 10, strong: 5, nice: 2 };

function computeMatchScore(breakdown: Array<{ importance: string; score: number }>): number {
  if (breakdown.length === 0) return 0;
  let weightedScore = 0, totalWeight = 0;
  for (const row of breakdown) {
    const w = IMPORTANCE_WEIGHT[row.importance] ?? 2;
    weightedScore += w * (row.score / 10);
    totalWeight += w;
  }
  return totalWeight === 0 ? 0 : Math.round((100 * weightedScore) / totalWeight);
}

// ─── LLM calls ────────────────────────────────────────────────────────────────

async function parseResume(openai: OpenAI, resumeText: string) {
  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0,
    seed: 42,
    messages: [
      { role: "system", content: PARSE_RESUME_SYSTEM },
      { role: "user", content: `Resume:\n"""\n${resumeText}\n"""\n\nExtract the structured candidate profile.` },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "parse_resume",
        strict: true,
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            phone: { type: "string" },
            location: { type: "string" },
            summary: { type: "string" },
            yearsOfExperience: { type: "number" },
            skills: { type: "array", items: { type: "string" } },
            experience: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                properties: {
                  company: { type: "string" }, title: { type: "string" },
                  startDate: { type: "string" }, endDate: { type: "string" },
                  description: { type: "string" },
                },
                required: ["company", "title", "startDate", "endDate", "description"],
              },
            },
            education: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                properties: {
                  institution: { type: "string" }, degree: { type: "string" }, year: { type: "number" },
                },
                required: ["institution", "degree", "year"],
              },
            },
            links: {
              type: "object",
              additionalProperties: false,
              properties: {
                linkedin: { type: "string" }, portfolio: { type: "string" }, github: { type: "string" },
              },
              required: ["linkedin", "portfolio", "github"],
            },
          },
          required: ["phone", "location", "summary", "yearsOfExperience", "skills", "experience", "education", "links"],
        },
      },
    },
  });
  return JSON.parse(res.choices[0].message.content!);
}

async function scoreResume(
  openai: OpenAI,
  resumeText: string,
  criteria: Array<{ id: string; label: string; importance: string; category: string }>,
) {
  const criteriaList = criteria
    .map((c, i) => `${String(i + 1).padStart(2, "0")}. [${c.importance.toUpperCase()}] ${c.label}  (category: ${c.category})`)
    .join("\n");

  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0,
    seed: 42,
    messages: [
      { role: "system", content: SCORE_RESUME_SYSTEM },
      {
        role: "user",
        content: `Job criteria (return one row per criterion, in this exact order):\n${criteriaList}\n\nResume:\n"""\n${resumeText}\n"""\n\nScore the resume against each criterion.`,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "score_resume",
        strict: true,
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            matchSummary: { type: "string" },
            matchBreakdown: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                properties: {
                  criterionLabel: { type: "string" },
                  importance: { type: "string", enum: ["must", "strong", "nice"] },
                  matched: { type: "string", enum: ["yes", "partial", "no"] },
                  score: { type: "number", minimum: 0, maximum: 10 },
                  evidence: { type: "string" },
                },
                required: ["criterionLabel", "importance", "matched", "score", "evidence"],
              },
            },
          },
          required: ["matchSummary", "matchBreakdown"],
        },
      },
    },
  });
  return JSON.parse(res.choices[0].message.content!);
}

// ─── Background: LLM processing + record update ────────────────────────────────

async function processInBackground(
  supabase: ReturnType<typeof createClient>,
  openai: OpenAI,
  candidateId: string,
  applicationId: string,
  resumeText: string,
  jobCriteria: Array<{ id: string; label: string; importance: string; category: string }>,
) {
  try {
    const [profile, scoring] = await Promise.all([
      parseResume(openai, resumeText),
      scoreResume(openai, resumeText, jobCriteria),
    ]);

    const criteriaByLabel = new Map(jobCriteria.map((c) => [c.label, c]));
    const matchBreakdown = scoring.matchBreakdown.map((row: { criterionLabel: string }) => {
      const parent = criteriaByLabel.get(row.criterionLabel) as { id: string } | undefined;
      return parent ? { ...row, criterionId: parent.id } : row;
    });
    const matchScore = computeMatchScore(matchBreakdown);

    const links: Record<string, string> = {};
    if (profile.links.linkedin)  links.linkedin  = profile.links.linkedin;
    if (profile.links.portfolio) links.portfolio = profile.links.portfolio;
    if (profile.links.github)    links.github    = profile.links.github;

    await supabase.from("candidates").update({
      phone:               profile.phone,
      location:            profile.location,
      summary:             profile.summary,
      years_of_experience: profile.yearsOfExperience,
      skills:              profile.skills,
      experience:          profile.experience,
      education:           profile.education,
      links:               Object.keys(links).length > 0 ? links : null,
    }).eq("id", candidateId);

    await supabase.from("applications").update({
      candidate_location:            profile.location,
      candidate_years_of_experience: profile.yearsOfExperience,
      match_score:                   matchScore,
      match_summary:                 scoring.matchSummary,
      match_breakdown:               matchBreakdown,
      status:                        "new",
    }).eq("id", applicationId);
  } catch (err) {
    console.error("[receive-application] background processing failed:", err instanceof Error ? err.message : err);
    await supabase.from("applications").update({ status: "processing_failed" }).eq("id", applicationId);
  }
}

// ─── Main handler ──────────────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed." }, 405);
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return json({ error: "Expected multipart/form-data." }, 400);
  }

  const jobCode = (formData.get("jobCode") as string | null)?.trim();
  const name    = (formData.get("name")    as string | null)?.trim();
  const email   = (formData.get("email")   as string | null)?.trim();
  const resume  = formData.get("resume");

  if (!jobCode)                                                             return json({ error: "Missing jobCode."         }, 400);
  if (!name)                                                                return json({ error: "Missing name."            }, 400);
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))                 return json({ error: "Invalid email."           }, 400);
  if (!resume || !(resume instanceof File))                                 return json({ error: "No resume file uploaded." }, 400);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
  const openai = new OpenAI({ apiKey: Deno.env.get("OPENAI_API_KEY") });

  const { data: job, error: jobErr } = await supabase
    .from("jobs")
    .select("id, code, criteria")
    .eq("code", jobCode)
    .maybeSingle();
  if (jobErr) return json({ error: "Database error fetching job." }, 500);
  if (!job)   return json({ error: `Job ${jobCode} not found.`    }, 404);

  let resumeText: string;
  try {
    resumeText = (await extractText(resume)).trim();
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : "Could not read file." }, 400);
  }
  if (resumeText.length < 50) {
    return json({ error: "Couldn't extract enough text from this resume (may be image-only PDF)." }, 400);
  }

  const candidateId   = crypto.randomUUID();
  const applicationId = crypto.randomUUID();

  // Upload resume file
  const ext = resume.name.split(".").pop()?.toLowerCase() ?? "bin";
  const storagePath = `${jobCode}/${candidateId}.${ext}`;
  const buffer = new Uint8Array(await resume.arrayBuffer());

  const { error: uploadErr } = await supabase.storage
    .from("resumes")
    .upload(storagePath, buffer, {
      contentType: resume.type || "application/octet-stream",
      upsert: false,
    });

  const safeName = name.replace(/[^\w\s-]/g, "").trim();
  const resumeUrl = uploadErr
    ? undefined
    : supabase.storage.from("resumes").getPublicUrl(storagePath, {
        download: `${safeName} Resume.${ext}`,
      }).data.publicUrl;

  // Save candidate with raw data only — LLM fields filled in by background job
  const { error: candidateErr } = await supabase.from("candidates").insert({
    id:          candidateId,
    name,
    email,
    resume_text: resumeText,
  });
  if (candidateErr) return json({ error: "Failed to save candidate: " + candidateErr.message }, 500);

  // Save application with status "processing" — updated to "new" after LLM completes
  const { error: appErr } = await supabase.from("applications").insert({
    id:              applicationId,
    job_id:          job.id,
    job_code:        job.code,
    candidate_id:    candidateId,
    candidate_name:  name,
    candidate_email: email,
    cover_letter:    "",
    resume_url:      resumeUrl ?? null,
    status:          "processing",
  });
  if (appErr) return json({ error: "Failed to save application: " + appErr.message }, 500);

  // Kick off LLM work after response is sent — user doesn't wait for this
  EdgeRuntime.waitUntil(
    processInBackground(supabase, openai, candidateId, applicationId, resumeText, job.criteria ?? []),
  );

  return json({ applicationId }, 201);
});
