"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  CheckCircle2,
  LayoutGrid,
  type LucideIcon,
  Monitor,
  ScanSearch,
  Sparkles,
} from "lucide-react";

import type {
  CaseStudyProofPoint,
  DigitalMarketingCaseStudy,
} from "@/components/digital-marketing/digital-marketing-content";
import { StartProjectButton } from "@/components/studio/start-project-button";
import { Button } from "@/components/ui/button";
import { ModalShell } from "@/components/ui/modal-shell";

const proofIconMap: Record<CaseStudyProofPoint["iconKey"], LucideIcon> = {
  barChart3: BarChart3,
  bot: Bot,
  layoutGrid: LayoutGrid,
  scanSearch: ScanSearch,
  sparkles: Sparkles,
};

// Shared shell keeps proof-point icons visually consistent with the homepage case-study modal.
const proofIconShellClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-[0.95rem] border border-white/80 bg-white/80 text-brand shadow-[0_10px_24px_rgba(15,23,42,0.06)]";

type ServiceCaseStudyPreviewDialogProps = {
  caseStudy: DigitalMarketingCaseStudy | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAfterClose?: () => void;
};

export function ServiceCaseStudyPreviewDialog({
  caseStudy,
  open,
  onOpenChange,
  onAfterClose,
}: ServiceCaseStudyPreviewDialogProps) {
  const href = caseStudy ? `/case-studies/${caseStudy.slug}` : "#";

  return (
    <ModalShell
      open={open}
      onOpenChange={onOpenChange}
      onAfterClose={onAfterClose}
      title={caseStudy?.title ?? "Case Study Preview"}
      closeVariant="case-study"
      mobileLayout="fullscreen"
      contentClassName="px-5 pb-8 pt-16 sm:px-8 lg:px-10 lg:pb-10"
    >
      {caseStudy ? (
        <div className="relative isolate overflow-visible rounded-[1.85rem]">

          {/* ── Header: two-column grid ──────────────────────────────────── */}
          <div className="border-b border-(--color-border-default)/80 pb-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.8fr)] lg:items-start">

              {/* Left: category, title, description, CTA */}
              <div>
                <p className="text-label-sm uppercase tracking-[0.22em] text-(--color-text-tertiary)">
                  {caseStudy.category}
                </p>
                <h2 className="mt-2 font-display text-[clamp(2.25rem,4vw,4.25rem)] leading-[0.92] tracking-[-0.05em] text-(--neutral-950)">
                  {caseStudy.title}
                </h2>
                <p className="mt-4 max-w-2xl text-body-lg leading-8 text-(--color-text-secondary)">
                  {caseStudy.description}
                </p>
                <div className="mt-6">
                  <Button asChild size="lg" className="px-6">
                    <Link href={href}>
                      Read full case study
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right: outcomes */}
              {caseStudy.outcomes && caseStudy.outcomes.length > 0 && (
                <div className="space-y-3">
                  <p className="text-label-sm uppercase tracking-[0.16em] text-(--color-text-tertiary)">
                    Outcomes
                  </p>
                  <ul className="space-y-3 text-body-md leading-7 text-(--color-text-secondary)">
                    {caseStudy.outcomes.map((point) => (
                      <li key={point} className="flex gap-3">
                        <CheckCircle2 className="mt-1 size-4 shrink-0 text-brand" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* ── Cover image ───────────────────────────────────────────────── */}
          {caseStudy.thumbnailSrc && (
            <div className="relative z-10 border-b border-(--color-border-default)/80 py-8">
              <div className="relative aspect-video w-full overflow-hidden rounded-[1.35rem]">
                <Image
                  src={caseStudy.thumbnailSrc}
                  alt={`${caseStudy.title} preview`}
                  fill
                  sizes="(min-width: 1280px) 70rem, (min-width: 768px) 90vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          )}

          {/* ── Work Gallery ──────────────────────────────────────────────── */}
          {caseStudy.workGallery && caseStudy.workGallery.length > 0 && (
            <div className="border-b border-(--color-border-default)/80 py-8">
              <p className="mb-5 text-label-sm uppercase tracking-[0.22em] text-(--color-text-tertiary)">
                Work Gallery
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {caseStudy.workGallery.map((image) => (
                  <div
                    key={image.label}
                    className="group relative overflow-hidden rounded-2xl bg-(--color-background-canvas)"
                  >
                    {/* Label badge */}
                    <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-white/60 bg-white/88 px-2.5 py-1 backdrop-blur-sm">
                      <Monitor className="size-3 shrink-0 text-(--color-text-tertiary)" />
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-(--color-text-secondary)">
                        {image.label}
                      </span>
                    </div>
                    {/* Image */}
                    <div className="relative aspect-4/3 w-full">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1280px) 32rem, (min-width: 768px) 44vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Proof Points ──────────────────────────────────────────────── */}
          {caseStudy.proofPoints && caseStudy.proofPoints.length > 0 && (
            <div className="grid gap-5 border-b border-(--color-border-default)/80 py-8 md:grid-cols-3">
              {caseStudy.proofPoints.map((point) => {
                const ProofIcon = proofIconMap[point.iconKey] ?? Sparkles;

                return (
                  <section key={point.title} className="space-y-4 pt-1">
                    <div className={proofIconShellClass}>
                      <ProofIcon className="size-4" strokeWidth={1.9} />
                    </div>
                    <div>
                      <h3 className="text-body-lg font-semibold text-(--neutral-950)">
                        {point.title}
                      </h3>
                      <p className="mt-3 max-w-sm text-body-sm leading-7 text-(--color-text-secondary)">
                        {point.description}
                      </p>
                    </div>
                  </section>
                );
              })}
            </div>
          )}

          {/* ── Testimonial ───────────────────────────────────────────────── */}
          {caseStudy.testimonial && (
            <div className="py-10 sm:py-12">
              <div className="mx-auto max-w-4xl text-center">
                <p className="text-label-sm uppercase tracking-[0.16em] text-(--color-text-tertiary)">
                  Client perspective
                </p>
                <p className="mt-5 text-[clamp(1.65rem,3vw,2.75rem)] leading-[1.16] tracking-[-0.04em] text-(--color-text-secondary) sm:text-balance">
                  &quot;{caseStudy.testimonial.quote}&quot;
                </p>
                <p className="mt-6 text-body-lg text-(--neutral-950)">
                  <span className="font-semibold">
                    {caseStudy.testimonial.attribution}
                  </span>
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button asChild size="lg" className="px-6">
                    <Link href={href}>
                      Read full case study
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                  <StartProjectButton
                    variant="secondary"
                    size="lg"
                    source={`case-study-modal-secondary:${caseStudy.slug}`}
                    className="px-6"
                  >
                    Get in touch
                  </StartProjectButton>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </ModalShell>
  );
}
