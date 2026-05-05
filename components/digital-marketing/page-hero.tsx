"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import type { DigitalMarketingHeroContent } from "@/components/digital-marketing/digital-marketing-content";
import { StudioPageContainer } from "@/components/studio/studio-page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type PageHeroProps = {
  content: DigitalMarketingHeroContent;
};

// Matches the home page hero signal ease for visual consistency.
const heroSignalEase = [0.22, 1, 0.36, 1] as const;

// Vertical guide columns mirror the home page grid wave treatment, adapted to the DM gradient spread.
const heroGridWaveColumns = [
  { left: 8,  opacity: 0.28 },
  { left: 19, opacity: 0.34 },
  { left: 32, opacity: 0.38 },
  { left: 47, opacity: 0.44 },
  { left: 59, opacity: 0.48 },
  { left: 69, opacity: 0.52 },
  { left: 76, opacity: 0.56 },
  { left: 82, opacity: 0.50 },
  { left: 89, opacity: 0.42 },
  { left: 95, opacity: 0.32 },
] as const;

// Shared fade-up variant used by each content token so motion stays consistent across the stack.
function buildFadeUp(delay: number, reduceMotion: boolean) {
  return {
    initial: reduceMotion ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.52, ease: heroSignalEase, delay },
  };
}

export function PageHero({ content }: PageHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = shouldReduceMotion ?? false;

  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-white py-14 md:py-20">
      {/* Animated background layer: gradient wash + vertical grid guides, matching home-page signal-field rhythm. */}
      <motion.div
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.72, ease: heroSignalEase, delay: 0.08 }}
        className="pointer-events-none absolute inset-0"
      >
        {/* Brand gradient: purple anchor left, gold warmth upper-right — sourced from the DM page palette. */}
        <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_16%_4%,rgba(88,41,199,0.1),rgba(255,255,255,0)_34%),radial-gradient(circle_at_88%_0%,rgba(255,202,45,0.16),rgba(255,255,255,0)_30%)]" />

        {/* Vertical grid guides follow the same wave-column pattern as the home hero signal grid. */}
        <div className="absolute inset-0">
          {heroGridWaveColumns.map((col) => (
            <div
              key={col.left}
              className="ds-line-hero-signal-grid absolute inset-y-0 w-px"
              style={{ left: `${col.left}%`, opacity: col.opacity }}
            />
          ))}
        </div>
      </motion.div>

      <StudioPageContainer className="relative z-10">
        <div className="max-w-4xl space-y-5 lg:pl-4 xl:pl-6">
          <motion.div {...buildFadeUp(0.16, reduceMotion)}>
            <Badge variant="brandTagSubtle" className="w-fit">
              {content.subtitle}
            </Badge>
          </motion.div>

          <motion.h1
            className="max-w-5xl text-hero-display text-(--neutral-950)"
            {...buildFadeUp(0.26, reduceMotion)}
          >
            {content.title}
          </motion.h1>

          <motion.p
            className="max-w-3xl text-hero-support text-(--color-text-secondary)"
            {...buildFadeUp(0.36, reduceMotion)}
          >
            {content.description}
          </motion.p>

          {content.ctaLabel && content.ctaHref ? (
            <motion.div {...buildFadeUp(0.46, reduceMotion)}>
              <Button asChild size="lg" className="mt-2">
                <Link href={content.ctaHref}>{content.ctaLabel}</Link>
              </Button>
            </motion.div>
          ) : null}
        </div>
      </StudioPageContainer>
    </section>
  );
}
