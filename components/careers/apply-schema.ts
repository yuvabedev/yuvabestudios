import { z } from "zod";

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
    ),
});

export type ApplyFormValues = z.infer<typeof applySchema>;
