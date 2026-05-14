// Migration shim — re-exports from canonical locations
// Update consumers to import directly from @/types/careers or @/services/careers.service

export type { Job, JobLevel, JobType, JobBenefits, JobRow } from "@/types/careers";
export { getJobBySlug, getJobsByLevel, getAllJobs, getAllJobSlugs } from "@/services/careers.service";
