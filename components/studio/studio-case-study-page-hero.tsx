import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  CaseStudyIcon,
  resolveStudioCaseStudyDetail,
  type StudioCaseStudySummary,
} from "@/components/studio/studio-case-study-content";
import { Button } from "@/components/ui/button";
import { PremiumSurface } from "@/components/ui/premium-surface";

const shouldSkipImageOptimization = process.env.NODE_ENV === "development";

type StudioCaseStudyPageHeroProps = {
  caseStudy: StudioCaseStudySummary;
};

// This page-only hero gives the SEO route a landing-style opening with one focused mockup instead of modal-style side panels.
export function StudioCaseStudyPageHero({
  caseStudy,
}: StudioCaseStudyPageHeroProps) {
  const detail = resolveStudioCaseStudyDetail(caseStudy);

  return (
    <section className="relative isolate overflow-hidden border-b border-[var(--color-border-default)]/80">
      {/* The page hero keeps the band, but folds it into one calmer brand wash so the rails and color feel coordinated. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 inset-y-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(252,252,253,0.93)_34%,rgba(248,248,250,0.92)_70%,rgba(248,248,250,0.95))]" />
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_18%_22%,rgba(88,41,199,0.11),rgba(255,255,255,0)_30%),radial-gradient(circle_at_76%_18%,rgba(255,202,45,0.11),rgba(255,255,255,0)_24%),radial-gradient(circle_at_62%_72%,rgba(150,136,192,0.08),rgba(255,255,255,0)_34%)]" />
        <div className="absolute inset-y-0 left-1/2 hidden w-full max-w-7xl -translate-x-1/2 px-6 md:block md:px-10">
          <div className="absolute inset-y-0 left-0 w-px bg-[linear-gradient(180deg,rgba(203,195,223,0.36),rgba(229,231,235,0.72)_20%,rgba(229,231,235,0.72)_78%,rgba(203,195,223,0.34))]" />
          <div className="absolute inset-y-0 right-0 w-px bg-[linear-gradient(180deg,rgba(250,223,144,0.34),rgba(229,231,235,0.72)_20%,rgba(229,231,235,0.72)_78%,rgba(203,195,223,0.28))]" />
        </div>
        <div className="absolute inset-x-[-12%] bottom-[5.25rem] h-[8.5rem] -rotate-[6deg] bg-[linear-gradient(90deg,rgba(88,41,199,0.82),rgba(129,103,255,0.74),rgba(43,183,199,0.66),rgba(148,233,228,0.56))]" />
      </div>

      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-10 md:px-10 md:pb-18 md:pt-14">
          <div className="grid gap-12 xl:grid-cols-[minmax(0,0.96fr)_minmax(30rem,0.9fr)] xl:items-start">
            {/* The left column keeps one dominant message, one support paragraph, and one CTA cluster. */}
            <div className="relative z-10 max-w-3xl">
              <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
                Case Study
              </p>
              <h1 className="mt-4 max-w-[12ch] font-display text-[clamp(3.25rem,6vw,6rem)] leading-[0.92] tracking-[-0.065em] text-[var(--neutral-950)]">
                {caseStudy.title}
              </h1>
              <p className="mt-6 max-w-[36rem] text-[clamp(1.22rem,1.65vw,1.6rem)] leading-[1.45] tracking-[-0.02em] text-[var(--color-text-secondary)]">
                {detail.intro}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link href="/#process">
                    Start a project
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="rounded-full px-6"
                >
                  <Link href="/#work">Back to work</Link>
                </Button>
              </div>
            </div>

            {/* The right side now focuses on one hero mockup card, matching the reference more closely. */}
            <div className="relative xl:pt-4">
              <PremiumSurface
                tone="glass"
                elevation="lg"
                blur="lg"
                radius="xl"
                className="overflow-hidden border-white/72 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(255,255,255,0.72))] p-5 shadow-[0_28px_80px_rgba(15,23,42,0.1)]"
              >
                <div className="space-y-5">
                  <div>
                    <p className="text-body-lg font-semibold text-[var(--neutral-950)]">
                      {caseStudy.heroMockHeadline ?? `${caseStudy.sector} product snapshot`}
                    </p>
                  </div>

                  <div className="relative overflow-hidden rounded-[1.55rem] border border-white/72 bg-[linear-gradient(160deg,rgba(247,248,255,0.92),rgba(255,255,255,0.74))] p-4">
                    <div className="absolute inset-x-[-12%] bottom-[-8%] h-[38%] bg-[radial-gradient(circle,rgba(88,41,199,0.22),rgba(88,41,199,0)_62%)] blur-3xl" />
                    <div className="absolute right-[-4%] top-[-6%] h-[30%] w-[30%] bg-[radial-gradient(circle,rgba(255,202,45,0.26),rgba(255,202,45,0)_70%)] blur-3xl" />
                    <div className="relative aspect-[1.1/1] overflow-hidden rounded-[1.25rem] border border-white/80 bg-white/80">
                      {caseStudy.mockImageSrc ? (
                        <Image
                          src={caseStudy.mockImageSrc}
                          alt={
                            caseStudy.mockImageAlt ??
                            `${caseStudy.title} case study visual`
                          }
                          fill
                          sizes="(min-width: 1280px) 36vw, (min-width: 768px) 48vw, 100vw"
                          className="object-cover"
                          unoptimized={shouldSkipImageOptimization}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[var(--neutral-700)]">
                          <CaseStudyIcon iconKey={caseStudy.mediaIconKey} />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {caseStudy.services.map((service) => (
                      <span
                        key={service}
                        className="rounded-full border border-[var(--color-border-default)] bg-white/88 px-3 py-2 text-label-sm text-[var(--color-text-secondary)]"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </PremiumSurface>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
