import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  department: z.string().min(1, "Department is required"),
  location: z.string().min(1, "Location is required"),
  type: z.enum(["Full-time", "Part-time", "Contract", "Remote"]),
  level: z.enum(["entry", "experienced"]),
  posted: z.string().date("Posted date is required"),
  summary: z.string().min(1, "Summary/Description is required"),
  responsibilities: z.array(z.string()).min(1, "At least one responsibility is required"),
  requirements: z.array(z.string()).min(1, "At least one requirement is required"),
  niceToHave: z.array(z.string()).optional().default([]),
  portfolioRequirement: z.string().optional(),
  benefits_remote: z.array(z.string()).optional().default([]),
  benefits_inperson: z.array(z.string()).optional().default([]),
  workCulture: z.array(z.string()).optional().default([]),
  description: z.string().optional(), // Original markdown for reference
});

export type JobFormData = z.infer<typeof jobSchema>;
