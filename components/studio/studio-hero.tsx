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
      className="relative flex flex-col justify-start overflow-x-hidden overflow-y-visible bg-white pb-10 md:min-h-[clamp(46rem,calc(100svh-72px),60rem)] md:pb-0"
    >
      <HeroBackground />

      {/* The editorial wrapper becomes the desktop centering region so the full copy stack stays balanced above the trust strip. */}
      <StudioPageContainer className="relative z-10 flex items-start pb-6 pt-14 md:flex-1 md:items-center md:pb-12 md:pt-16">
        <div className="w-full">
          {/* The copy halo uses an overflow-visible radial field so the readability wash dies off softly instead of revealing a hard box edge. */}
          <div className="relative max-w-4xl overflow-visible lg:pl-4 xl:pl-4">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 -top-14 h-[calc(100%+10rem)] w-[calc(100%+20rem)] max-w-[54rem] overflow-visible sm:-left-20 sm:-top-16 sm:h-[calc(100%+13rem)] sm:w-[calc(100%+26rem)] sm:max-w-[64rem] lg:-left-28 lg:-top-24 lg:h-[calc(100%+18rem)] lg:w-[calc(100%+38rem)] lg:max-w-[88rem] xl:-left-32 xl:w-[calc(100%+44rem)] xl:max-w-[96rem]"
            >
              <div className="ds-overlay-hero-copy-halo absolute inset-0" />
              <div className="ds-overlay-hero-copy-wash absolute inset-0" />
            </div>

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

      <StudioTrustStrip className="mt-10 md:mt-auto" />
    </StudioHeroNoiseBackdrop>
  );
}


