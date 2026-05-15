import { getSupabasePeopleClient } from "@/integrations/supabase-people";
import type { Job, JobLevel, JobRow } from "@/types/careers";

function resolveJobLevel(row: JobRow): JobLevel {
  if (row.level) {
    const normalized = row.level.toLowerCase();
    if (normalized === "entry" || normalized === "entry level") {
      return "entry";
    }
    if (normalized === "experienced" || normalized === "senior") {
      return "experienced";
    }
  }

  if (row.criteria && typeof row.criteria === "object" && !Array.isArray(row.criteria)) {
    const exp = (row.criteria as Record<string, unknown>).experience;
    if (typeof exp === "string") {
      const match = exp.match(/(\d+)/);
      if (match) {
        const years = parseInt(match[1], 10);
        return years < 2 ? "entry" : "experienced";
      }
    }
  }

  const reqs = row.requirements as string[] | null;
  if (reqs && reqs.length > 0) {
    const match = reqs[0].match(/(\d+)\+?\s*year/i);
    if (match) {
      const years = parseInt(match[1], 10);
      return years < 2 ? "entry" : "experienced";
    }
  }

  return "entry";
}

function mapRowToJob(row: JobRow): Job {
  return {
    slug: row.code || row.id,
    title: row.title || "",
    level: resolveJobLevel(row),
    department: row.department || "",
    location: (row.location as Job["location"]) || "Auroville, India",
    type: (row.type as Job["type"]) || "Full-time",
    posted: row.created_at || new Date().toISOString(),
    summary: row.summary || "",
    responsibilities: (row.responsibilities as string[]) || [],
    requirements: (row.requirements as string[]) || [],
    niceToHave: (row.nicetohave as string[]) || [],
    portfolioRequirement: row.portfoliorequirement || undefined,
    benefits: {
      remote:
        row.benefits_remote && (row.benefits_remote as string[]).length > 0
          ? (row.benefits_remote as string[])
          : undefined,
      inPerson:
        row.benefits_inperson && (row.benefits_inperson as string[]).length > 0
          ? (row.benefits_inperson as string[])
          : undefined,
    },
    workCulture: row.workculture ? (row.workculture as string[]) : undefined,
    archived: row.archived_at ?? undefined,

  };
}

export async function getJobBySlug(slug: string): Promise<Job | undefined> {
  try {
    const client = getSupabasePeopleClient();
    const { data, error } = await client
      .from("jobs")
      .select("*")
      .or(`code.eq.${slug},id.eq.${slug}`)
      .eq("status", "active")
      .single();

    if (error || !data) return undefined;
    return mapRowToJob(data as JobRow);
  } catch {
    return undefined;
  }
}

export async function getAllJobs(): Promise<Job[]> {
  try {
    const client = getSupabasePeopleClient();
    const { data, error } = await client
      .from("jobs")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return (data as JobRow[]).map(mapRowToJob);
  } catch {
    return [];
  }
}

export async function getJobsByLevel(level: JobLevel): Promise<Job[]> {
  const all = await getAllJobs();
  return all.filter((job) => job.level === level);
}

export async function getAllJobSlugs(): Promise<string[]> {
  try {
    const client = getSupabasePeopleClient();
    const { data, error } = await client
      .from("jobs")
      .select("id, code")
      .eq("status", "active");

    if (error || !data) return [];
    return (data as Array<{ id: string; code: string | null }>).map(
      (row) => row.code || row.id,
    );
  } catch {
    return [];
  }
}

export async function checkApplicationExists(
  email: string,
  jobCode: string,
): Promise<boolean> {
  try {
    const client = getSupabasePeopleClient();
    const { data, error } = await client
      .from("applications")
      .select("id")
      .eq("candidate_email", email)
      .eq("job_code", jobCode)
      .limit(1);

    if (error) return false;
    return (data?.length ?? 0) > 0;
  } catch {
    return false;
  }
}
