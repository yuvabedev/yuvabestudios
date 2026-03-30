"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModalShell } from "@/components/ui/modal-shell";
import {
  START_PROJECT_EMAIL,
  buildStartProjectMailto,
} from "@/lib/start-project";

type StartProjectModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
};

const conversationNeedOptions = [
  "Product strategy",
  "Product design + engineering",
  "AI-native app or workflow",
  "Launch + growth marketing",
] as const;

const inputClassName =
  "h-11 w-full rounded-[1.1rem] border border-[color:color-mix(in_srgb,var(--lavender-500)_22%,white)] bg-white/92 px-4 text-body-md text-[var(--neutral-900)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] outline-none transition-colors placeholder:text-[var(--neutral-400)] focus:border-[color:color-mix(in_srgb,var(--purple-500)_36%,white)] focus:ring-2 focus:ring-[color:color-mix(in_srgb,var(--purple-500)_14%,white)]";

const textareaClassName =
  "min-h-[5.5rem] w-full rounded-[1.1rem] border border-[color:color-mix(in_srgb,var(--lavender-500)_22%,white)] bg-white/92 px-4 py-3 text-body-md text-[var(--neutral-900)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] outline-none transition-colors placeholder:text-[var(--neutral-400)] focus:border-[color:color-mix(in_srgb,var(--purple-500)_36%,white)] focus:ring-2 focus:ring-[color:color-mix(in_srgb,var(--purple-500)_14%,white)]";

const pillClassName =
  "inline-flex min-h-9 items-center gap-2 rounded-full border px-3.5 py-1.5 text-left text-body-sm shadow-[0_8px_18px_rgba(15,23,42,0.04)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--purple-500)_18%,white)]";

function toggleSelection(currentValues: string[], value: string) {
  return currentValues.includes(value)
    ? currentValues.filter((item) => item !== value)
    : [...currentValues, value];
}

// This shared modal turns every main CTA into one branded, founder-focused intake flow.
export function StartProjectModal({
  open,
  onOpenChange,
  source,
}: StartProjectModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [needs, setNeeds] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  // Each open should feel like a fresh start, not a stale draft from a prior CTA click.
  useEffect(() => {
    if (!open) {
      return;
    }

    setName("");
    setEmail("");
    setPhone("");
    setNeeds([]);
    setNotes("");
  }, [open]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const mailtoHref = buildStartProjectMailto({
      name,
      email,
      phone,
      needs,
      notes,
      source,
    });

    window.location.href = mailtoHref;
  }

  return (
    <ModalShell
      open={open}
      onOpenChange={onOpenChange}
      motionPreset="fade"
      title="Start your project"
      className="max-h-[calc(100svh-1.5rem)] max-w-[76rem] overflow-hidden"
      contentClassName="h-full px-5 pb-5 pt-12 sm:px-8 sm:pb-6 lg:px-10 lg:pb-6"
    >
      <div className="relative grid gap-7 overflow-hidden rounded-[inherit] lg:h-[calc(100svh-10rem)] lg:min-h-0 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:gap-8">
        {/* The background glow shifts more attention to the form side without adding another heavy surface. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 right-[-4rem] top-8 hidden w-[46rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(88,41,199,0.18)_0%,rgba(203,195,223,0.22)_28%,rgba(255,202,45,0.18)_52%,rgba(255,255,255,0)_74%)] blur-3xl lg:block"
        />

        {/* The left rail gives the modal stronger brand presence and a clearer founder-facing frame. */}
        <div className="space-y-6 lg:flex lg:h-full lg:flex-col lg:justify-center lg:pl-2 lg:pr-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3 rounded-full border border-[color:color-mix(in_srgb,var(--lavender-500)_18%,white)] bg-white/80 px-3 py-2 shadow-[0_10px_26px_rgba(15,23,42,0.05)]">
              <Image
                src="/logo.svg"
                alt="Yuvabe Studios"
                width={124}
                height={28}
                className="h-7 w-auto"
              />
            </div>

            <div className="space-y-2">
              <h2 className="max-w-[12ch] font-display text-[clamp(2.75rem,5vw,4.4rem)] font-medium leading-[0.92] tracking-[-0.055em] text-[var(--neutral-950)]">
                Let&apos;s connect.
              </h2>
              <p className="max-w-[17ch] text-[clamp(1.18rem,2vw,1.68rem)] font-medium leading-[1.12] tracking-[-0.03em] text-[var(--color-text-brand)]">
                Bring the idea, the bottleneck, or the next big bet.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-body-sm text-[var(--color-text-tertiary)]">
              Prefer email?{" "}
              <Link
                href={`mailto:${START_PROJECT_EMAIL}`}
                className="cursor-pointer lowercase text-[var(--neutral-700)] underline-offset-4 transition-colors hover:text-[var(--color-text-brand)] hover:underline"
              >
                {START_PROJECT_EMAIL}
              </Link>
            </p>
          </div>
        </div>

        {/* The right column replaces the generic brief field with guided conversation starters and cleaner input copy. */}
        <div className="relative -mx-5 rounded-b-[inherit] border-t border-white/72 bg-white/92 px-5 pt-4 sm:-mx-8 sm:px-8 lg:-my-8 lg:mx-0 lg:flex lg:h-[calc(100%+4rem)] lg:min-h-0 lg:flex-col lg:overflow-hidden lg:rounded-[inherit] lg:border-l lg:border-t-0 lg:border-white/80 lg:px-8 lg:pb-8 lg:pt-8">
          <form className="space-y-4 lg:min-h-0 lg:overflow-y-auto lg:pr-1" onSubmit={handleSubmit}>
            {/* The core contact fields stay lightweight so the founder can start fast. */}
            <div className="space-y-2">
              <label
                htmlFor="start-project-name"
                className="text-label-lg text-[var(--neutral-800)]"
              >
                Name
              </label>
              <input
                id="start-project-name"
                name="name"
                autoComplete="name"
                className={inputClassName}
                placeholder="Your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="start-project-email"
                  className="text-label-lg text-[var(--neutral-800)]"
                >
                  Email
                </label>
                <input
                  id="start-project-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={inputClassName}
                  placeholder="founder@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="start-project-phone"
                  className="text-label-lg text-[var(--neutral-800)]"
                >
                  Phone or WhatsApp
                </label>
                <input
                  id="start-project-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className={inputClassName}
                  placeholder="WhatsApp or phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>
            </div>

            {/* The service-selection group maps the modal directly to Yuvabe's actual offer areas. */}
            <div className="space-y-2">
              <div className="space-y-0.5">
                <p className="text-label-lg text-[var(--neutral-800)]">
                  Where do you want support?
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {conversationNeedOptions.map((option) => {
                  const isSelected = needs.includes(option);

                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() =>
                        setNeeds((currentValues) =>
                          toggleSelection(currentValues, option),
                        )
                      }
                      className={[
                        pillClassName,
                        isSelected
                          ? "border-[var(--purple-500)] bg-[var(--purple-500)] text-white shadow-[0_12px_28px_rgba(88,41,199,0.22)]"
                          : "border-slate-200 bg-white text-[var(--neutral-800)] hover:border-[color:color-mix(in_srgb,var(--purple-500)_24%,white)] hover:bg-white",
                      ].join(" ")}
                    >
                      {isSelected ? <Check className="size-3.5 text-white" /> : null}
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* This optional field captures nuance after the guided starters have reduced the blank-page problem. */}
            <div className="space-y-2">
              <label
                htmlFor="start-project-notes"
                className="text-label-lg text-[var(--neutral-800)]"
              >
                Extra context
              </label>
              <textarea
                id="start-project-notes"
                name="notes"
                className={textareaClassName}
                placeholder="Share the product, timeline, traction stage, or the decision you want help making."
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
            </div>

            {/* The helper keeps the first release honest: submit drafts the inquiry in the user's mail app. */}
            <div className="space-y-2 pt-1">
              <Button type="submit" size="lg" className="w-full">
                Send inquiry
              </Button>
              <p className="text-body-sm text-[var(--color-text-tertiary)]">
                This opens your email app with the details prefilled.
              </p>
            </div>
          </form>
        </div>
      </div>
    </ModalShell>
  );
}
