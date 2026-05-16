import type { Tables } from "@/integrations/database.types";

export type JobLevel = "entry" | "experienced";
export type JobType = "Full-time" | "Part-time" | "Contract" | "Remote";
export type LocationType = "Auroville, India" | "Remote" | "Flexible";
export type JobBenefits = {
  remote?: string[];
  inPerson?: string[];
};

export type Job = {
  slug: string;
  title: string;
  level: JobLevel;
  department: string;
  location: LocationType;
  type: JobType;
  posted: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  portfolioRequirement?: string;
  benefits?: JobBenefits;
  compensation?: string;
  workCulture?: string[];
  archived?: string;
};

export type JobRow = Tables<"jobs">;
