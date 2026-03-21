"use client";

import { useState } from "react";

import type { StudioHomepageWorkContent } from "@/components/studio/studio-homepage-content";
import { StudioCaseStudyMockCard } from "@/components/studio/studio-case-study-mock-card";
import {
  getStudioCaseStudyHref,
  type StudioCaseStudySummary,
} from "@/components/studio/studio-case-study-content";
import { StudioCaseStudySummaryDialog } from "@/components/studio/studio-case-study-summary-dialog";

type StudioCaseStudiesProps = {
  caseStudies: StudioCaseStudySummary[];
  workContent: StudioHomepageWorkContent;
};

// The case-studies section turns named proof into a scannable homepage evidence block.
export function StudioCaseStudies({
  caseStudies,
  workContent,
}: StudioCaseStudiesProps) {
  const [activeCaseStudy, setActiveCaseStudy] =
    useState<StudioCaseStudySummary | null>(null);
  const [isCaseStudyDialogOpen, setIsCaseStudyDialogOpen] = useState(false);
  const featuredCaseStudies = caseStudies.slice(0, 2);
  const secondaryCaseStudies = caseStudies.slice(2, 4);
  const spotlightCaseStudy = caseStudies[4];

  // Keeping the selected study in parent state lets the modal animate out before content is cleared.
  function handleOpenCaseStudy(caseStudy: StudioCaseStudySummary) {
    setActiveCaseStudy(caseStudy);
    setIsCaseStudyDialogOpen(true);
  }

  return (
    <>
      <section
        id="work"
        className="relative overflow-hidden bg-white px-6 py-10 md:px-10 md:py-2"
      >
        {/* The section background extends the hero's light grid so the frame line continues below the fold. */}
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.042)_1px,transparent_1px)] bg-[size:120px_100%]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(148,163,184,0.021)_1px,transparent_1px)] bg-[size:100%_120px]" />
          <div className="absolute inset-y-0 left-1/2 hidden w-full max-w-7xl -translate-x-1/2 px-6 md:block md:px-10">
            <div className="absolute inset-y-0 left-0 w-px bg-slate-200/80" />
            <div className="absolute inset-y-0 right-0 w-px bg-slate-200/80" />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10">
          {/* The section heading uses editorial contrast with one dominant line and one quieter display block. */}
          <div className="max-w-6xl space-y-5 lg:pl-10 xl:pl-14">
            <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
              {workContent.eyebrow}
            </p>
            <h2 className="text-hero-support max-w-5xl text-[var(--neutral-950)]">
              <strong>{workContent.headline}</strong>
            </h2>
            <p className="text-display-muted-editorial max-w-6xl">
              {workContent.supportPrefix}{" "}
              <span className="text-[var(--color-text-brand)]">
                {workContent.supportHighlight}
              </span>
              {workContent.supportSuffix}
            </p>
          </div>

          {/* The work grid keeps the current 2 / 2 / 1 rhythm while adding crawlable case-study links. */}
          {/* A small mobile gutter keeps the case-study cards from feeling pinned to the screen edges. */}
          <div className="space-y-6 px-4 sm:px-0 lg:px-10 xl:px-14">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
              {featuredCaseStudies.map((caseStudy) => (
                <StudioCaseStudyMockCard
                  key={caseStudy.id}
                  sector={caseStudy.sector}
                  title={caseStudy.title}
                  summary={caseStudy.summary}
                  services={caseStudy.services}
                  imageSrc={caseStudy.mockImageSrc ?? "/assets/GA_cover.png"}
                  imageAlt={
                    caseStudy.mockImageAlt ??
                    `${caseStudy.title} case study mock`
                  }
                  imageAspectRatio={caseStudy.mockImageAspectRatio}
                  imageClassName={caseStudy.mockImageClassName}
                  mockViewport={caseStudy.mockViewport}
                  mockPresentation={caseStudy.mockPresentation}
                  variant={caseStudy.mockVariant}
                  layout={caseStudy.mockLayout}
                  detailHref={getStudioCaseStudyHref(caseStudy.id)}
                  onOpenDetails={() => handleOpenCaseStudy(caseStudy)}
                />
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              {secondaryCaseStudies.map((caseStudy) => (
                <StudioCaseStudyMockCard
                  key={caseStudy.id}
                  sector={caseStudy.sector}
                  title={caseStudy.title}
                  summary={caseStudy.summary}
                  services={caseStudy.services}
                  imageSrc={caseStudy.mockImageSrc ?? "/assets/GA_cover.png"}
                  imageAlt={
                    caseStudy.mockImageAlt ??
                    `${caseStudy.title} case study mock`
                  }
                  imageAspectRatio={caseStudy.mockImageAspectRatio}
                  imageClassName={caseStudy.mockImageClassName}
                  mockViewport={caseStudy.mockViewport}
                  mockPresentation={caseStudy.mockPresentation}
                  variant={caseStudy.mockVariant}
                  layout={caseStudy.mockLayout}
                  detailHref={getStudioCaseStudyHref(caseStudy.id)}
                  onOpenDetails={() => handleOpenCaseStudy(caseStudy)}
                />
              ))}
            </div>

            {spotlightCaseStudy ? (
              <div className="grid gap-6">
                <StudioCaseStudyMockCard
                  sector={spotlightCaseStudy.sector}
                  title={spotlightCaseStudy.title}
                  summary={spotlightCaseStudy.summary}
                  services={spotlightCaseStudy.services}
                  imageSrc={spotlightCaseStudy.mockImageSrc ?? "/assets/GA_cover.png"}
                  imageAlt={
                    spotlightCaseStudy.mockImageAlt ??
                    `${spotlightCaseStudy.title} case study mock`
                  }
                  imageAspectRatio={spotlightCaseStudy.mockImageAspectRatio}
                  imageClassName={spotlightCaseStudy.mockImageClassName}
                  mockViewport={spotlightCaseStudy.mockViewport}
                  mockPresentation={spotlightCaseStudy.mockPresentation}
                  variant={spotlightCaseStudy.mockVariant}
                  layout={spotlightCaseStudy.mockLayout}
                  span="full"
                  detailHref={getStudioCaseStudyHref(spotlightCaseStudy.id)}
                  onOpenDetails={() => handleOpenCaseStudy(spotlightCaseStudy)}
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <StudioCaseStudySummaryDialog
        caseStudy={activeCaseStudy}
        open={isCaseStudyDialogOpen}
        onOpenChange={setIsCaseStudyDialogOpen}
        onAfterClose={() => {
          setActiveCaseStudy(null);
        }}
      />
    </>
  );
}
