import { CheckCircle2 } from "lucide-react";

import {
  getCaseStudyIcon,
  resolveStudioCaseStudyDetail,
  type StudioCaseStudySummary,
} from "@/components/studio/studio-case-study-content";

type StudioCaseStudyOutcomesStripProps = {
  caseStudy: StudioCaseStudySummary;
};

// This page-level outcomes strip restores the post-hero payoff without pushing that content back into the hero itself.
export function StudioCaseStudyOutcomesStrip({
  caseStudy,
}: StudioCaseStudyOutcomesStripProps) {
  const detail = resolveStudioCaseStudyDetail(caseStudy);
  const serviceTags = caseStudy.services;

  return (
    <section className="relative border-b border-[var(--color-border-default)]/80 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-10">
        {/* The services row becomes a quiet separator band once it leaves the hero. */}
        {serviceTags.length ? (
          <div className="border-b border-[var(--color-border-default)]/80 pb-6">
            <div className="flex flex-col gap-4">
              <p className="text-label-sm uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
                Services
              </p>
              <div className="flex flex-wrap gap-2.5">
                {serviceTags.map((service) => (
                  <span
                    key={`${caseStudy.id}-${service}`}
                    className="rounded-full border border-[var(--color-border-default)] bg-[var(--color-background-surface-subtle)] px-3 py-1.5 text-label-md text-[var(--color-text-secondary)]"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* The section label gives the post-hero payoff its own clear headline before the four outcomes scan across. */}
        <div className="mb-6 pt-6">
          <p className="text-label-sm uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
            Outcomes
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {detail.outcomes.map((outcome, index) => {
            const OutcomeIcon = detail.proofPoints[index]?.iconKey
              ? getCaseStudyIcon(detail.proofPoints[index]?.iconKey)
              : CheckCircle2;

            return (
              <div
                key={outcome}
                className="border-l border-[color:color-mix(in_srgb,var(--purple-500)_20%,white)] pl-6"
              >
                <div className="flex items-center gap-3 text-[var(--color-text-brand)]">
                  <OutcomeIcon className="size-5 shrink-0" strokeWidth={1.9} />
                </div>
                <p className="mt-5 text-body-lg font-semibold text-[var(--neutral-950)]">
                  {outcome}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
