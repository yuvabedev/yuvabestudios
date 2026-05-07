"use client";

import { useQuery } from "@tanstack/react-query";
import type { Job, JobLevel } from "@/lib/types/jobs";

async function fetchJobs(level?: JobLevel): Promise<Job[]> {
  const url = level
    ? `/api/careers/jobs?level=${level}`
    : "/api/careers/jobs";
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  const data = (await res.json()) as { jobs: Job[] };
  return data.jobs;
}

export function useJobs(level?: JobLevel) {
  return useQuery({
    queryKey: level ? ["jobs", level] : ["jobs"],
    queryFn: () => fetchJobs(level),
  });
}

export function useJobsByLevel(level: JobLevel) {
  return useJobs(level);
}
