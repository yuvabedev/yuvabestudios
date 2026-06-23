"use client";

import { useRouter } from "next/navigation";

import type { StudioHomepageWorkContent } from "@/components/studio/studio-homepage-content";
import {
  StudioCaseStudyMockCard,
  type StudioCaseStudyGradientPlacement,
  type StudioCaseStudyMockPresentation,
} from "@/components/studio/studio-case-study-mock-card";
import {
  getStudioCaseStudyHref,
  resolveStudioCaseStudyCoverSrc,
  type StudioCaseStudySummary,
} from "@/components/studio/studio-case-study-content";
import {
  StudioPageContainer,
  StudioPageRails,
} from "@/components/studio/studio-page-shell";

type StudioCaseStudiesProps = {
  caseStudies: StudioCaseStudySummary[];
  workContent: StudioHomepageWorkContent;
};

const homepageCaseStudyOrder = [
  "general-aeronautics",
  "bevolve",
  "kittykat",
  "tvam",
] as const;

// Hard-coded video sources keyed by case study ID — ensures the video shows even when
// the Supabase record predates the mockVideoSrc field being added.
const caseStudyVideoOverrides: Partial<Record<string, string>> = {};

// Hard-coded viewport overrides — switches portrait phone frames to landscape where the
// cover image is a wide/landscape asset and needs a wider container for full visibility.
const homepageCaseStudyViewport = "landscape" as const;
const homepageCaseStudyPresentation: StudioCaseStudyMockPresentation = "framed";

const homepageCaseStudyGradientMap: Record<string, StudioCaseStudyGradientPlacement> = {
  "general-aeronautics": "sunriseLeft",
  bevolve: "sunriseRight",
  kittykat: "violetDrift",
  tvam: "northArc",
};

const homepageCaseStudyBackgroundMap: Record<string, string> = {
  "general-aeronautics": "/assets/general-aeronautics/bg1.png",
  bevolve: "/assets/bevolve/bg2.png",
  kittykat: "/assets/KK/bg3.png",
  tvam: "/assets/tvam/bg4.png",
};

// Hard-coded presentation overrides — "fullImage" removes the phone frame and shows the
// image directly at the correct aspect ratio so wide covers aren't cropped into a frame.

// The case-studies section turns named proof into a scannable homepage evidence block.
export function StudioCaseStudies({
  caseStudies,
  workContent,
}: StudioCaseStudiesProps) {
  const router = useRouter();
  const homepageCaseStudies = homepageCaseStudyOrder
    .map((id) => caseStudies.find((caseStudy) => caseStudy.id === id))
    .filter((caseStudy): caseStudy is StudioCaseStudySummary => Boolean(caseStudy));

  // Cards now navigate straight to the full case study instead of opening a modal.
  function handleOpenCaseStudy(caseStudy: StudioCaseStudySummary) {
    router.push(getStudioCaseStudyHref(caseStudy.id));
  }

  return (
    <>
      <section
        id="work"
        className="relative overflow-hidden bg-white py-14 md:py-20"
      >
        {/* The section background extends the hero's light grid so the frame line continues below the fold. */}
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.042)_1px,transparent_1px)] bg-[size:120px_100%]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(148,163,184,0.021)_1px,transparent_1px)] bg-[size:100%_120px]" />
          <StudioPageRails />
        </div>

        <StudioPageContainer className="relative z-10 flex flex-col gap-10">
          {/* The section heading uses editorial contrast with one dominant line and one quieter display block. */}
          <div className="max-w-6xl space-y-5 lg:pl-10 xl:pl-14">
            <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
              {workContent.eyebrow}
            </p>
            <h2
              className="text-display-muted-editorial  max-w-5xl text-[var(--neutral-950)]"
              style={{ fontSize: "3.5rem", fontWeight: 600, wordSpacing: ".2rem" }}
            >
              <strong style={{ fontWeight: "inherit" }}>{workContent.headline}</strong>
            </h2>
            <p className="text-hero-support max-w-6xl">
              {workContent.supportPrefix}{" "}
              <span className="text-[var(--color-text-brand)]">
                {workContent.supportHighlight}
              </span>
              {workContent.supportSuffix}
            </p>
          </div>

          {/* The work grid keeps a strict 50/50 desktop rhythm so all homepage cards align on the same cadence. */}
          {/* A small mobile gutter keeps the case-study cards from feeling pinned to the screen edges. */}
          <div className="space-y-6 px-0 sm:px-0 lg:px-10 xl:px-14 pb-10">
            <div className="grid gap-6 xl:grid-cols-2">
              {homepageCaseStudies.map((caseStudy) => (
                <StudioCaseStudyMockCard
                  key={caseStudy.id}
                  backgroundSrc={homepageCaseStudyBackgroundMap[caseStudy.id]}
                  backgroundAlt={`${caseStudy.title} case study background artwork`}
                  sector={caseStudy.sector}
                  title={caseStudy.title}
                  summary={caseStudy.summary}
                  services={caseStudy.services}
                  imageSrc={
                    resolveStudioCaseStudyCoverSrc(caseStudy, "card") ??
                    "/assets/general-aeronautics/cover-mock.png"
                  }
                  imageAlt={
                    caseStudy.mockImageAlt ??
                    `${caseStudy.title} case study mock`
                  }
                  videoSrc={
                    caseStudy.mockVideoSrc ??
                    caseStudyVideoOverrides[caseStudy.id]
                  }
                  imageAspectRatio={caseStudy.mockImageAspectRatio}
                  imageClassName="!rounded-none"
                  mediaShellClassName="rounded-none"
                  mockViewport={homepageCaseStudyViewport}
                  mockPresentation={homepageCaseStudyPresentation}
                  variant={caseStudy.mockVariant}
                  gradientPlacement={homepageCaseStudyGradientMap[caseStudy.id]}
                  layout={caseStudy.mockLayout}
                  detailHref={getStudioCaseStudyHref(caseStudy.id)}
                  onOpenDetails={() => handleOpenCaseStudy(caseStudy)}
                />
              ))}
            </div>
          </div>
        </StudioPageContainer>
      </section>
    </>
  );
}

