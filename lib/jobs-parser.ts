import type { Job, JobLevel, JobRow, JobBenefits, JobType } from "@/lib/types/jobs";

// Static slug overrides to preserve existing URLs for SEO
const SLUG_OVERRIDES: Record<string, string> = {
  "Junior Video Editor (with Design Skills)": "junior-video-editor",
  "Junior Designer": "junior-designer",
  "Content Strategist & Creator": "content-strategist-creator",
  "UI/UX Designer (AI Focus)": "uiux-designer-ai-focus",
  "Full Stack Developer": "full-stack-developer",
  "Sales Head": "sales-head",
  "Digital Marketing & Performance Specialist": "digital-marketing-performance-specialist",
};

function extractSection(text: string, heading: string): string {
  const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Match: ### [optional **]heading[optional **][:] [optional whitespace] [newline] [content]
  const pattern = new RegExp(
    `###\\s*\\*\\*?${escapedHeading}\\*\\*?:?\\s*\\n([\\s\\S]*?)(?=###|##|#|$)`,
    "i",
  );
  const match = text.match(pattern);
  return match ? match[1].trim() : "";
}

function extractBullets(sectionText: string): string[] {
  return sectionText
    .split("\n")
    .map((line) => line.replace(/^\*\s+/, "").trim())
    .filter((line) => line.length > 0 && line !== "-");
}

function determineLevel(experienceText: string): JobLevel {
  const lower = experienceText.toLowerCase().trim();

  // Freshers / 0 experience → entry
  if (
    lower.includes("fresher") ||
    lower === "0" ||
    lower === ""
  ) {
    return "entry";
  }

  // Extract the first number that appears
  const match = lower.match(/(\d+)/);
  if (!match) return "entry";

  const years = parseInt(match[1], 10);
  return years >= 2 ? "experienced" : "entry";
}

function normalizeJobType(raw: string): JobType {
  const map: Record<string, JobType> = {
    "full-time": "Full-time",
    "part-time": "Part-time",
    contract: "Contract",
    remote: "Remote",
  };
  return map[raw.toLowerCase()] ?? "Full-time";
}

function makeSlug(title: string): string {
  return (
    SLUG_OVERRIDES[title] ??
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  );
}

function parseBenefits(benefitsText: string): JobBenefits | undefined {
  if (!benefitsText) return undefined;

  const lines = benefitsText
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const result: JobBenefits = {};

  let currentSection: "remote" | "inPerson" | null = null;
  const remote: string[] = [];
  const inPerson: string[] = [];

  for (const line of lines) {
    const lower = line.toLowerCase();
    if (
      lower.startsWith("remote") ||
      lower.includes("remote work") ||
      lower.includes("remote:")
    ) {
      currentSection = "remote";
      continue;
    }
    if (
      lower.includes("in-person") ||
      lower.includes("auroville") ||
      lower.includes("in person") ||
      lower.includes("in person:")
    ) {
      currentSection = "inPerson";
      continue;
    }

    const bullet = line.replace(/^\*\s+/, "").trim();
    if (!bullet) continue;

    if (currentSection === "remote") {
      remote.push(bullet);
    } else if (currentSection === "inPerson") {
      inPerson.push(bullet);
    } else {
      // Default to inPerson if no sub-section found
      inPerson.push(bullet);
    }
  }

  if (remote.length > 0) result.remote = remote;
  if (inPerson.length > 0) result.inPerson = inPerson;
  return Object.keys(result).length > 0 ? result : undefined;
}

export function parseJobRow(row: JobRow): Job {
  const desc = row.description;

  // Department: from "# Department" heading (may have ** bold formatting **)
  const deptMatch = desc.match(/^#\s+\*\*?(.+?)\*\*?$/m);
  const department = deptMatch ? deptMatch[1].trim() : "";

  // Title: from "## Title" heading (may have ** bold formatting **)
  const titleMatch = desc.match(/^##\s+\*\*?(.+?)\*\*?$/m);
  const title = titleMatch ? titleMatch[1].trim() : "";

  // Slug: slugify from title (includes static overrides for SEO)
  const slug = makeSlug(title);

  // Level determination from min experience text
  const minExpText = extractSection(desc, "Minimum Experience");
  const level = determineLevel(minExpText);

  // Extract sections
  const summary = extractSection(desc, "Description");
  const responsibilities = extractBullets(
    extractSection(desc, "Key Responsibilities"),
  );
  const requirements = extractBullets(extractSection(desc, "Requirements"));
  const niceToHave = extractBullets(extractSection(desc, "Nice to Have"));
  const workCulture = extractBullets(extractSection(desc, "Work Culture at Yuvabe")) || undefined;
  const portfolioRequirement =
    extractSection(desc, "Portfolio Requirement") || undefined;
  const benefitsText = extractSection(desc, "Benefits");
  const benefits = parseBenefits(benefitsText);

  // Format posted date from created_at (convert to YYYY-MM-DD)
  const posted = row.created_at?.split("T")[0] ?? new Date().toISOString().split("T")[0];

  return {
    slug,
    title,
    level,
    department,
    location: "Auroville, India",
    type: "Full-time",
    posted,
    summary,
    responsibilities,
    requirements,
    niceToHave,
    portfolioRequirement,
    benefits,
    workCulture: workCulture && workCulture.length > 0 ? workCulture : undefined,
  };
}
