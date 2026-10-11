import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import {
  CaseStudyIcon,
  resolveStudioCaseStudyDetail,
  resolveStudioCaseStudyHeroPalette,
  type StudioCaseStudySummary,
} from "@/components/studio/studio-case-study-content";
import {
  StudioPageContainer,
  StudioPageRails,
} from "@/components/studio/studio-page-shell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StartProjectLink } from "@/components/studio/start-project-link";

type StudioCaseStudyPageHeroProps = {
  caseStudy: StudioCaseStudySummary;
};

const shouldSkipImageOptimization = process.env.NODE_ENV === "development";
const caseStudyHeroLogoOverrides: Partial<Record<string, string>> = {
  "general-aeronautics": "/assets/general-aeronautics/logo.svg",
  bevolve: "/assets/bevolve/logo-no-text.png",
  kittykat: "/assets/KK/logo.svg",
  tvam: "/assets/tvam/logo.svg",
};

// Some case-study logos need a larger hero presence while keeping their intrinsic proportions intact.
function getCaseStudyHeroLogoStageClass(caseStudyId: string) {
  if (caseStudyId === "bevolve") {
    return "max-w-[18rem]";
  }

  if (caseStudyId === "tvam") {
    return "max-w-[9rem]";
  }

  if (caseStudyId === "kittykat") {
    return "max-w-[13.5rem]";
  }

  return "max-w-[34rem]";
}

// Compact logo rails read cleaner without the decorative underline used by wider wordmarks.
function shouldShowCaseStudyHeroLogoLine(caseStudyId: string) {
  return (
    caseStudyId !== "bevolve" &&
    caseStudyId !== "tvam" &&
    caseStudyId !== "kittykat"
  );
}

// Icon-led or portrait logos need a tighter stage so the mark scales visually instead of floating inside a wide banner box.
function getCaseStudyHeroLogoAspectClass(caseStudyId: string) {
  if (caseStudyId === "bevolve") {
    return "aspect-square";
  }

  if (caseStudyId === "tvam") {
    return "aspect-[177/248]";
  }

  if (caseStudyId === "kittykat") {
    return "aspect-[118/40]";
  }

  return "aspect-[17/4]";
}

// The hero keeps a branded right rail on every detail page, but TVAM now uses a compact logo treatment instead of a cover mock.
function shouldShowCaseStudyHeroVisual(caseStudyId: string) {
  return Boolean(caseStudyId);
}

// This page-only hero gives the SEO route a landing-style opening with one focused narrative instead of a hero mock card.
export function StudioCaseStudyPageHero({
  caseStudy,
}: StudioCaseStudyPageHeroProps) {
  const detail = resolveStudioCaseStudyDetail(caseStudy);
  const heroPalette = resolveStudioCaseStudyHeroPalette(caseStudy.id);
  const heroLogoSrc = caseStudyHeroLogoOverrides[caseStudy.id];
  const shouldShowHeroVisual = shouldShowCaseStudyHeroVisual(caseStudy.id);

  return (
    <section className="relative isolate overflow-visible border-b border-[var(--color-border-default)]/80">
      {/* The page hero keeps the band, but folds it into one calmer brand wash so the rails and color feel coordinated. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 inset-y-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(252,252,253,0.93)_34%,rgba(248,248,250,0.92)_70%,rgba(248,248,250,0.95))]" />
        <div
          className="absolute inset-x-0 top-0 h-[34rem]"
          style={{ backgroundImage: heroPalette.topWash }}
        />
        <StudioPageRails
          leftRailClassName="bg-[linear-gradient(180deg,rgba(203,195,223,0.36),rgba(229,231,235,0.72)_20%,rgba(229,231,235,0.72)_78%,rgba(203,195,223,0.34))]"
          rightRailClassName="bg-[linear-gradient(180deg,rgba(250,223,144,0.34),rgba(229,231,235,0.72)_20%,rgba(229,231,235,0.72)_78%,rgba(203,195,223,0.28))]"
        />
        <div
          className="absolute inset-x-[-16%] bottom-[-10rem] h-[13rem] -rotate-[8deg] md:bottom-[-12rem] md:h-[15rem] xl:bottom-[-14rem] xl:h-[18rem]"
          style={{ backgroundImage: heroPalette.strip }}
        />
      </div>

      <div className="relative z-10">
        <StudioPageContainer className="pb-14 pt-10 md:pb-18 md:pt-14">
          {/* The hero stays text-led; only cases that still need a branded right rail render one. */}
          <div
            className={cn(
              "grid gap-12",
              shouldShowHeroVisual
                ? "xl:grid-cols-[minmax(0,0.92fr)_minmax(26rem,0.84fr)] xl:items-center"
                : "max-w-5xl",
            )}
          >
            {/* The left column keeps one dominant message, one support paragraph, and one CTA cluster. */}
            <div className="xl:min-h-[27rem] xl:flex xl:flex-col xl:justify-center">
              <h1 className="max-w-[12ch] font-display text-[clamp(3.25rem,6vw,6rem)] leading-[0.92] tracking-[-0.065em] text-[var(--neutral-950)]">
                {caseStudy.title}
              </h1>
              <p className="mt-6 max-w-[36rem] text-[clamp(1.22rem,1.65vw,1.6rem)] leading-[1.45] tracking-[-0.02em] text-[var(--color-text-secondary)]">
                {detail.intro}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row">
                <Button asChild size="lg" className="px-6">
                  <StartProjectLink source="case-study-hero">
                    Start a project
                    <ArrowUpRight className="size-4" />
                  </StartProjectLink>
                </Button>
              </div>
            </div>

            {/* Logo-led cases can still keep a quieter visual rail without bringing the cover mock back. */}
            {shouldShowHeroVisual ? (
            <div className="relative flex items-center xl:min-h-[27rem] xl:self-center xl:justify-center">
              {heroLogoSrc ? (
                <div className="relative flex min-h-[18rem] w-full items-center justify-center px-4 py-10 sm:min-h-[22rem] sm:px-8 sm:py-12 xl:min-h-[27rem] xl:py-0">
                  <div
                    className="pointer-events-none absolute inset-x-[10%] top-1/2 h-24 -translate-y-1/2 rounded-full blur-3xl"
                    style={{ backgroundImage: heroPalette.logoGlow }}
                  />
                  {shouldShowCaseStudyHeroLogoLine(caseStudy.id) ? (
                    <div
                      className="pointer-events-none absolute inset-x-[20%] top-1/2 h-px translate-y-[4.25rem]"
                      style={{ backgroundImage: heroPalette.logoLine }}
                    />
                  ) : null}
                  <div
                    className={cn(
                      "relative w-full",
                      getCaseStudyHeroLogoAspectClass(caseStudy.id),
                      getCaseStudyHeroLogoStageClass(caseStudy.id),
                    )}
                  >
                    <Image
                      src={heroLogoSrc}
                      alt={`${caseStudy.title} logo`}
                      fill
                      sizes="(min-width: 1280px) 34rem, (min-width: 768px) 28rem, 20rem"
                      className="object-contain drop-shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
                      priority
                      unoptimized={shouldSkipImageOptimization}
                    />
                  </div>
                </div>
              ) : (
                <div className="relative flex min-h-[18rem] w-full items-center justify-center rounded-[2rem] border border-white/80 bg-white/55 px-6 py-10 shadow-[0_28px_80px_rgba(15,23,42,0.05)] backdrop-blur-[6px] sm:min-h-[22rem] sm:px-8 sm:py-12 xl:min-h-[27rem] xl:py-0">
                  <div className="pointer-events-none absolute inset-x-[14%] top-1/2 h-28 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(88,41,199,0.12),rgba(129,103,255,0.1)_32%,rgba(43,183,199,0.08)_56%,rgba(255,255,255,0)_76%)] blur-3xl" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-[1.4rem] border border-white/85 bg-white/85 text-[var(--neutral-700)] shadow-[0_16px_36px_rgba(15,23,42,0.08)] sm:h-24 sm:w-24">
                    <CaseStudyIcon iconKey={caseStudy.mediaIconKey} className="size-10 stroke-[1.55]" />
                  </div>
                </div>
              )}
            </div>
            ) : null}
          </div>
        </StudioPageContainer>
      </div>
    </section>
  );
}
