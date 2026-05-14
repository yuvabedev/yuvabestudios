"use client";

import { useRef } from "react";
import { AlertCircle, FileText, LoaderCircle, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModalShell } from "@/components/ui/modal-shell";
import { useApplyForm } from "./useApplyForm";

const inputClassName =
  "h-12 w-full rounded-[1.1rem] border border-[color-mix(in_srgb,var(--lavender-500)_22%,white)] bg-white/92 px-4 text-body-md text-[var(--neutral-900)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] outline-none transition-colors placeholder:text-[var(--neutral-400)] focus:border-[color-mix(in_srgb,var(--purple-500)_36%,white)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--purple-500)_14%,white)]";

type ApplyModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobCode: string;
  jobTitle: string;
};

export function ApplyModal({
  open,
  onOpenChange,
  jobCode,
  jobTitle,
}: ApplyModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { form, submitState, submitMessage, resumeFile, checkingDuplicate, alreadyApplied, onSubmit } =
    useApplyForm({ jobCode });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) form.setValue("resume", f, { shouldValidate: true });
  };

  const handlePickFile = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    fileInputRef.current?.click();
  };

  return (
    <ModalShell
      open={open}
      onOpenChange={onOpenChange}
      mobileLayout="fullscreen"
      motionPreset="fade"
      title={`Apply to ${jobTitle}`}
      className="mx-auto max-w-[32rem] sm:max-h-[calc(100svh-1.5rem)]"
      contentClassName="px-5 pb-6 pt-12 sm:px-8 sm:pb-6 lg:px-8"
    >
      <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
        {/* Duplicate warning */}
        {alreadyApplied && (
          <div className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <p className="text-body-sm text-amber-700">
              You&apos;ve already applied for this role. We&apos;ll review your previous application.
            </p>
          </div>
        )}

        {/* Name field */}
        <div className="space-y-2">
          <label htmlFor="apply-name" className="text-label-md sm:text-label-lg text-(--neutral-800)">
            Full name
          </label>
          <input
            id="apply-name"
            className={inputClassName}
            placeholder="Your name"
            autoComplete="name"
            disabled={submitState === "submitting"}
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <p className="text-body-sm text-red-600">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        {/* Email field */}
        <div className="space-y-2">
          <label htmlFor="apply-email" className="text-label-md sm:text-label-lg text-(--neutral-800)">
            Email
          </label>
          <div className="relative">
            <input
              id="apply-email"
              type="email"
              className={inputClassName}
              placeholder="your@email.com"
              autoComplete="email"
              disabled={submitState === "submitting"}
              {...form.register("email")}
            />
            {checkingDuplicate && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <LoaderCircle className="h-4 w-4 animate-spin text-(--color-text-tertiary)" />
              </div>
            )}
          </div>
          {form.formState.errors.email && (
            <p className="text-body-sm text-red-600">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        {/* Resume upload field */}
        <div className="space-y-2">
          <label className="text-label-md sm:text-label-lg text-(--neutral-800)">Resume</label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            className="hidden"
            disabled={submitState === "submitting"}
          />

          {resumeFile ? (
            <div className="flex items-center justify-between gap-3 rounded-[1.1rem] border border-[color-mix(in_srgb,var(--purple-500)_24%,white)] bg-[color-mix(in_srgb,var(--purple-500)_4%,white)] px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <FileText className="h-4 w-4 shrink-0 text-(--color-text-brand)" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-body-md text-(--neutral-800)">{resumeFile.name}</p>
                  <p className="text-body-sm text-(--color-text-tertiary)">
                    {(resumeFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handlePickFile}
                disabled={submitState === "submitting"}
                className="shrink-0 text-(--color-text-tertiary) hover:text-(--neutral-800) disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handlePickFile}
              disabled={submitState === "submitting"}
              className="w-full rounded-[1.1rem] border border-dashed border-[color-mix(in_srgb,var(--lavender-500)_22%,white)] bg-white/92 px-4 py-6 text-left transition-colors hover:bg-[color-mix(in_srgb,var(--purple-500)_8%,white)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 shrink-0 text-(--color-text-tertiary)" />
                <div className="min-w-0 flex-1">
                  <p className="text-body-md text-(--neutral-800)">Choose a file</p>
                  <p className="text-body-sm text-(--color-text-tertiary)">PDF · DOCX</p>
                </div>
              </div>
            </button>
          )}
          {form.formState.errors.resume && (
            <p className="text-body-sm text-red-600">
              {form.formState.errors.resume.message}
            </p>
          )}
        </div>

        {/* Submit button & status message */}
        <div className="space-y-2 pt-2">
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={submitState === "submitting" || submitState === "success" || !!alreadyApplied}
          >
            {submitState === "submitting" ? (
              <span className="inline-flex items-center gap-2">
                <LoaderCircle className="size-4 animate-spin" />
                Submitting
              </span>
            ) : submitState === "success" ? (
              "Application submitted"
            ) : (
              "Submit application"
            )}
          </Button>
          <p
            className={[
              "text-body-sm",
              submitState === "error"
                ? "text-red-600"
                : submitState === "success"
                  ? "text-emerald-700"
                  : "text-(--color-text-tertiary)",
            ].join(" ")}
          >
            {submitMessage ||
              "We'll match your resume against the role and respond within a few days."}
          </p>
        </div>
      </form>
    </ModalShell>
  );
}
