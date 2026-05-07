export type JobLevel = "entry" | "experienced";
export type JobType = "Full-time" | "Part-time" | "Contract" | "Remote";

export type JobBenefits = {
  remote?: string[];
  inPerson?: string[];
};

export type Job = {
  slug: string;
  title: string;
  level: JobLevel;
  department: string;
  location: string;
  type: JobType;
  posted: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  portfolioRequirement?: string;
  benefits?: JobBenefits;
  workCulture?: string[];
  compensation?: string;
};

// Shape of a row returned from Supabase jobs_duplicate table
export type JobRow = {
  id: number | string;
  description: string;
  created_at: string;
};
