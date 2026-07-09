"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import type { DigitalMarketingHeroContent } from "@/components/digital-marketing/digital-marketing-content";
import { isStartProjectHref } from "@/lib/start-project";
import { StartProjectButton } from "@/components/studio/start-project-button";

type PageHeroProps = {
  content: DigitalMarketingHeroContent;
};

export function PageHero({ content }: PageHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = shouldReduceMotion ?? false;

  return (
    <section className="pb-20 pt-32 md:pb-28 md:pt-40 bg-white">
      <div className="mx-auto w-full max-w-[1720px] px-6 md:px-12 lg:px-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <span className="mb-6 inline-block font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-brand">
            {content.subtitle}
          </span>

          <h1 className="text-display-xl mb-7 text-card-foreground">
            {content.title}
          </h1>

          <p className="text-body-lg mb-10 max-w-xl text-(--color-text-secondary)">
            {content.description}
          </p>

          <div className="flex flex-wrap gap-3">
            {content.ctaLabel && content.ctaHref ? (
              isStartProjectHref(content.ctaHref) ? (
                <StartProjectButton
                  size="lg"
                  source="service-page-hero"
                  className="rounded-full px-6 py-3.5 text-[15px]"
                >
                  {content.ctaLabel}
                  <ArrowRight size={16} />
                </StartProjectButton>
              ) : (
                <Link
                  href={content.ctaHref}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(88,41,199,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(88,41,199,0.32)]"
                >
                  {content.ctaLabel}
                  <ArrowRight size={16} />
                </Link>
              )
            ) : null}
            <a
              href="#case-studies"
              className="inline-flex items-center gap-2 rounded-full border border-(--color-border-default) bg-transparent px-6 py-3.5 text-[15px] font-semibold text-(--neutral-900) transition-all hover:border-(--neutral-400) hover:bg-(--neutral-100)"
            >
              See our work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
