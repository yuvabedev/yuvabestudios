import { z } from "zod";

export const MAX_RESUME_BYTES = 10 * 1024 * 1024;

export const applySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  resume: z
    .instanceof(File, { message: "Resume is required" })
    .refine(
      (f) =>
        [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(f.type) || f.name.match(/\.(pdf|docx)$/i) !== null,
      "File must be PDF or DOCX"
    )
    .refine((f) => f.size <= MAX_RESUME_BYTES, "Resume must be 10 MB or smaller"),
});

export type ApplyFormValues = z.infer<typeof applySchema>;
