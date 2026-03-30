import { ArrowRight } from "lucide-react";

import type { StudioHomepageHeroContent } from "@/components/studio/studio-homepage-content";
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
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.042)_1px,transparent_1px)] bg-[size:120px_100%]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(148,163,184,0.021)_1px,transparent_1px)] bg-[size:100%_120px]" />
      <div className="absolute right-[-18rem] top-[-18rem] h-[56rem] w-[56rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,202,45,0.40)_0%,rgba(249,169,31,0.36)_24%,rgba(88,41,199,0.22)_48%,rgba(43,183,199,0.16)_62%,rgba(255,255,255,0)_76%)] blur-3xl" />
      <div className="absolute right-[-12rem] top-[-10rem] h-[40rem] w-[44rem] rotate-[-18deg] rounded-[40%] bg-[conic-gradient(from_220deg_at_50%_50%,rgba(88,41,199,0.00)_0deg,rgba(88,41,199,0.14)_55deg,rgba(203,195,223,0.55)_105deg,rgba(255,202,45,0.70)_160deg,rgba(249,169,31,0.65)_225deg,rgba(240,78,40,0.48)_280deg,rgba(88,41,199,0.00)_360deg)] blur-2xl" />
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
    <section
      id="about"
      className="relative flex flex-col justify-start overflow-hidden bg-white pb-14 md:min-h-[calc(100svh-72px)] md:pb-20"
    >
      <HeroBackground />

      {/* The editorial content occupies the remaining viewport height after the rail is accounted for. */}
      <StudioPageContainer className="relative z-10 flex items-start pb-6 pt-14 md:pb-12 md:pt-16">
        <div className="grid w-full items-center gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:gap-7">
          {/* The left column follows Stripe's strong editorial layout with a compact badge, oversized headline, and one CTA. */}
          <div className="max-w-4xl space-y-4 lg:pl-4 xl:pl-4">
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

          {/* The right column gives the hero a premium visual counterweight without introducing extra messaging. */}
          <div className="relative hidden min-h-[18.5rem] lg:block">
            <div className="absolute inset-x-8 top-3 h-[18.5rem] rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(255,255,255,0.35))] shadow-[0_30px_80px_rgba(15,23,42,0.10)] backdrop-blur-sm" />
            <div className="absolute inset-x-16 top-9 h-[14.25rem] rounded-[1.75rem] border border-white/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.95),rgba(255,255,255,0.50))] shadow-[0_20px_60px_rgba(15,23,42,0.12)]" />
            <div className="absolute inset-x-24 top-13 space-y-3 rounded-[1.5rem] border border-slate-200/80 bg-white/90 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur">
              <div className="inline-flex w-fit rounded-full bg-[color:color-mix(in_srgb,var(--yellow-500)_16%,white)] px-3 py-1 text-label-sm text-[var(--neutral-800)]">
                Founder momentum, systemized
              </div>
              <div className="space-y-2.5">
                <div className="h-3 w-28 rounded-full bg-[color:color-mix(in_srgb,var(--purple-500)_18%,white)]" />
                <div className="h-3 w-full rounded-full bg-slate-100" />
                <div className="h-3 w-[88%] rounded-full bg-slate-100" />
                <div className="h-3 w-[76%] rounded-full bg-slate-100" />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-label-sm text-slate-500">Strategy</p>
                  <p className="mt-2 text-heading-sm text-[var(--neutral-900)]">
                    Sharper bets
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-label-sm text-slate-500">Engineering</p>
                  <p className="mt-2 text-heading-sm text-[var(--neutral-900)]">
                    Faster loops
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StudioPageContainer>

      <StudioTrustStrip />
    </section>
  );
}
