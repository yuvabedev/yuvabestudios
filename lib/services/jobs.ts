import "server-only";
import { unstable_cache } from "next/cache";
import { getSupabasePeopleClient } from "@/lib/supabase-people";
import { parseJobRow } from "@/lib/jobs-parser";
import type { Job, JobLevel, JobRow } from "@/lib/types/jobs";

const JOBS_CACHE_TAG = "jobs";
const CACHE_TTL_SECONDS = 300; // 5 minutes

async function fetchAllJobsFromDb(): Promise<Job[]> {
  const supabase = getSupabasePeopleClient();
  const { data, error } = await supabase
    .from("jobs_duplicate")
    .select("id, description, created_at")
    .order("created_at");

  if (error) throw new Error(`Failed to fetch jobs: ${error.message}`);
  if (!data) return [];

  return (data as JobRow[]).map(parseJobRow);
}

export const getAllJobs = unstable_cache(
  fetchAllJobsFromDb,
  [JOBS_CACHE_TAG],
  { revalidate: CACHE_TTL_SECONDS, tags: [JOBS_CACHE_TAG] },
);

export async function getJobsByLevel(level: JobLevel): Promise<Job[]> {
  const jobs = await getAllJobs();
  return jobs.filter((j) => j.level === level);
}

export async function getJobBySlug(slug: string): Promise<Job | undefined> {
  const jobs = await getAllJobs();
  return jobs.find((j) => j.slug === slug);
}
