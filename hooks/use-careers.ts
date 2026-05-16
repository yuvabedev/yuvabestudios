"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getAllJobs,
  getJobBySlug,
  getJobsByLevel,
  checkApplicationExists,
} from "@/services/careers.service";
import type { Job, JobLevel } from "@/types/careers";

export function useJobsByLevel(level: JobLevel, initialData?: Job[]) {
  return useQuery({
    queryKey: ["careers", "list", level],
    queryFn: () => getJobsByLevel(level),
    initialData,
    staleTime: 60 * 1000,
  });
}

export function useJobBySlug(slug: string, initialData?: Job) {
  return useQuery({
    queryKey: ["careers", "detail", slug],
    queryFn: () => getJobBySlug(slug),
    initialData,
    staleTime: 60 * 1000,
  });
}

export function useAllJobs(initialData?: Job[]) {
  return useQuery({
    queryKey: ["careers", "list"],
    queryFn: getAllJobs,
    initialData,
    staleTime: 60 * 1000,
  });
}

export function useCheckApplication(email: string, jobCode: string) {
  const isValidEmail = email.includes("@") && email.includes(".");
  return useQuery({
    queryKey: ["careers", "check-application", email, jobCode],
    queryFn: () => checkApplicationExists(email, jobCode),
    enabled: isValidEmail && jobCode.length > 0,
    staleTime: 30 * 1000,
  });
}
