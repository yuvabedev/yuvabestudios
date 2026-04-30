"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import type { DigitalMarketingCaseStudy } from "@/components/digital-marketing/digital-marketing-content";
import { ServiceCaseStudyCard } from "@/components/shared/service-case-study-card";
import { ServiceCaseStudyPreviewDialog } from "@/components/shared/service-case-study-preview-dialog";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type ServiceCaseStudyGridProps = {
  items: DigitalMarketingCaseStudy[];
  /** When true, the first (hero) card opens the preview modal on click. */
  heroClickable?: boolean;
};

/**
 * 1 + 3 layout: full-width hero card on top, then a 3-column compact grid.
 * The hero card is clickable only when heroClickable is true.
 * Compact cards are always non-clickable (display only).
 */
export function ServiceCaseStudyGrid({ items, heroClickable = false }: ServiceCaseStudyGridProps) {
  const [activeItem, setActiveItem] = useState<DigitalMarketingCaseStudy | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  function handleOpenPreview(item: DigitalMarketingCaseStudy) {
    setActiveItem(item);
    setIsPreviewOpen(true);
  }

  const [hero, ...rest] = items;

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="flex flex-col gap-4"
      >
        {/* Hero card — full width */}
        {hero && (
          <motion.div variants={itemVariants}>
            <ServiceCaseStudyCard
              caseStudy={hero}
              variant="hero"
              onOpenPreview={heroClickable ? () => handleOpenPreview(hero) : undefined}
            />
          </motion.div>
        )}

        {/* Compact cards — 3 columns */}
        {rest.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {rest.map((item) => (
              <motion.div key={item.slug} variants={itemVariants} className="flex h-full flex-col">
                <ServiceCaseStudyCard caseStudy={item} variant="compact" />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <ServiceCaseStudyPreviewDialog
        caseStudy={activeItem}
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        onAfterClose={() => setActiveItem(null)}
      />
    </>
  );
}
