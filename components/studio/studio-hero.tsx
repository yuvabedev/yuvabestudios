import { ArrowRight } from "lucide-react";

import type { StudioHomepageHeroContent } from "@/components/studio/studio-homepage-content";
import { StudioHeroNoiseBackdrop } from "@/components/studio/hero-effect";
import { StartProjectButton } from "@/components/studio/start-project-button";
import { StudioHandDrawnUnderline } from "@/components/studio/studio-hand-drawn-underline";
import { StudioPageContainer } from "@/components/studio/studio-page-shell";
import {
  StudioTrustStrip,
  StudioTrustStripGuides,
} from "@/components/studio/studio-trust-strip";

// The hero background borrows Stripe's bright angled energy through Yuvabe's brand palette.
function HeroBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* The hero keeps the shared page rails, while the backdrop owns the single large-grid treatment. */}
      <StudioTrustStripGuides />
    </div>
  );
}

type StudioHeroProps = {
  content: StudioHomepageHeroContent;
};

// The hero content keeps the user-provided copy intact while shifting the visual system to a Stripe-inspired light layout.
export function StudioHero({ content }: StudioHeroProps) {
  return (
    <StudioHeroNoiseBackdrop
      id="about"
      className="relative flex flex-col justify-start overflow-x-hidden overflow-y-visible bg-white pb-14 md:min-h-[calc(100svh-72px)] md:pb-20"
    >
      <HeroBackground />

      {/* The editorial content occupies the remaining viewport height after the rail is accounted for. */}
      <StudioPageContainer className="relative z-10 flex items-start pb-6 pt-14 md:pb-12 md:pt-16">
        <div className="w-full">
          {/* The wash is pinned to the copy block with soft negative bleed so it feels atmospheric instead of boxed in. */}
          <div className="relative max-w-4xl lg:pl-4 xl:pl-4">
            <div
              aria-hidden="true"
              className="ds-overlay-hero-copy-wash pointer-events-none absolute -left-8 -top-8 h-[calc(100%+5rem)] w-[calc(100%+7rem)] max-w-[40rem] sm:-left-10 sm:-top-10 sm:h-[calc(100%+6rem)] sm:w-[calc(100%+9rem)] sm:max-w-[48rem] lg:-left-12 lg:-top-12 lg:h-[calc(100%+7rem)] lg:w-[calc(100%+10rem)] lg:max-w-[58rem]"
            />

            {/* The left column follows Stripe's strong editorial layout with a compact badge, oversized headline, and one CTA. */}
            <div className="relative z-10 space-y-4">
              <div id="ai-first-dna" className="max-w-5xl space-y-4">
                <h1 className="max-w-4xl text-hero-display text-[var(--neutral-950)]">
                  <span className="block">
                    {content.headlineIntro}{" "}
                    <span className="relative inline-block pr-[0.12em]">
                      {content.headlineHighlight}
                      <StudioHandDrawnUnderline className="-left-[0.18em] -translate-y-[0.14em] w-[1.78em]" />
                    </span>
                  </span>
                  <span className="relative mt-[0.06em] block w-fit pr-[0.16em]">
                    <span>{content.headlineLineTwo}</span>
                    <StudioHandDrawnUnderline
                      delay
                      className="-left-[0.01em] -translate-y-[0.14em] w-[calc(100%+0.22rem)]"
                    />
                  </span>
                </h1>
                <p className="text-hero-support max-w-4xl text-[var(--color-text-secondary)] lg:max-w-[46rem]">
                  <span>{content.supportPrefix} </span>
                  <span className="text-[var(--color-text-brand)]">
                    {content.supportHighlight}
                  </span>
                </p>
              </div>

              {/* The main CTA stays singular and visually dominant to preserve a clear conversion path. */}
              <div
                id="start-your-build"
                className="flex flex-col items-start gap-4 pt-6 sm:flex-row sm:items-center"
              >
                <StartProjectButton
                  size="lg"
                  source="homepage-hero"
                  className="w-full min-w-0 bg-[var(--purple-500)] px-7 sm:w-auto sm:min-w-[220px]"
                >
                  {content.ctaLabel}
                  <ArrowRight className="size-4" />
                </StartProjectButton>
              </div>
            </div>
          </div>
        </div>
      </StudioPageContainer>

      <StudioTrustStrip />
    </StudioHeroNoiseBackdrop>
  );
}


