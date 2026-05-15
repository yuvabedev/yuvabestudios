import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applySchema, ApplyFormValues } from "./apply-schema";
import { useCheckApplication } from "@/hooks/use-careers";

type UseApplyFormProps = {
  jobCode: string;
};

export function useApplyForm({ jobCode }: UseApplyFormProps) {
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [submitMessage, setSubmitMessage] = useState("");

  const form = useForm<ApplyFormValues>({
    resolver: zodResolver(applySchema),
    defaultValues: { name: "", email: "" },
  });

  const resumeFile = form.watch("resume");
  const emailValue = form.watch("email");

  const { data: alreadyApplied, isFetching: checkingDuplicate } = useCheckApplication(
    emailValue,
    jobCode
  );

  const onSubmit = form.handleSubmit(async (values: ApplyFormValues) => {
    if (alreadyApplied) return;

    setSubmitState("submitting");
    setSubmitMessage("");

    try {
      const fd = new FormData();
      fd.append("jobCode", jobCode);
      fd.append("name", values.name);
      fd.append("email", values.email);
      fd.append("resume", values.resume);

      const supabaseUrl = process.env.NEXT_PUBLIC_YUVABE_PEOPLE_SUPABASE_URL;
      const apiKey = process.env.NEXT_PUBLIC_YUVABE_PEOPLE_SUPABASE_KEY;

      const res = await fetch(`${supabaseUrl}/functions/v1/apply-function`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: fd,
      });

      const data = (await res.json()) as { applicationId?: string; error?: string };

      if (!res.ok) {
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      setSubmitState("success");
      setSubmitMessage("Application submitted! We'll review your resume and get back to you soon.");
      form.reset();
    } catch (err) {
      setSubmitState("error");
      setSubmitMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  });

  return {
    form,
    submitState,
    submitMessage,
    resumeFile,
    checkingDuplicate,
    alreadyApplied,
    onSubmit,
  };
}
