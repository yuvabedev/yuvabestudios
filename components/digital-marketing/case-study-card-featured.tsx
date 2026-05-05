"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { DigitalMarketingCaseStudy } from "@/components/digital-marketing/digital-marketing-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PremiumSurface } from "@/components/ui/premium-surface";

type CaseStudyCardFeaturedProps = {
  caseStudy: DigitalMarketingCaseStudy;
  /** Flips image to the right side on desktop, creating visual symmetry when used for the last card. */
  reversed?: boolean;
};

// Full-width featured card: horizontal image+content on md+, stacked on mobile.
// Entry animation is delegated to the parent grid slot wrapper.
export function CaseStudyCardFeatured({ caseStudy, reversed = false }: CaseStudyCardFeaturedProps) {
  const { slug, title, description, category, thumbnailSrc, ctaLabel } = caseStudy;

  return (
    <motion.article
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group"
    >
      <PremiumSurface
        tone="glass"
        elevation="lg"
        blur="md"
        radius="xl"
        className={[
          "flex flex-col overflow-hidden border-white/75 p-0",
          reversed ? "md:flex-row-reverse" : "md:flex-row",
        ].join(" ")}
      >
        {/* Image: aspect-video stacked on mobile; left or right panel (50% width) on desktop */}
        <div className="relative aspect-video w-full shrink-0 overflow-hidden md:w-1/2">
          {thumbnailSrc ? (
            <Image
              src={thumbnailSrc}
              alt={`${title} cover`}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-[linear-gradient(135deg,rgba(88,41,199,0.18),rgba(255,202,45,0.14))]" />
          )}
        </div>

        {/* Content: full-width on mobile; opposite panel on desktop */}
        <div className="flex flex-1 flex-col justify-between gap-6 p-6 md:p-8 lg:p-10">
          <div className="space-y-4">
            <Badge variant="brandTagSubtle" className="w-fit">
              {category}
            </Badge>
            <h3 className="text-heading-xl text-(--neutral-950)">
              {title}
            </h3>
            <p className="text-body-lg text-(--color-text-secondary)">
              {description}
            </p>
          </div>
          <div>
            <Button asChild variant="secondary">
              <Link href={`/case-studies/${slug}`}>{ctaLabel}</Link>
            </Button>
          </div>
        </div>
      </PremiumSurface>
    </motion.article>
  );
}