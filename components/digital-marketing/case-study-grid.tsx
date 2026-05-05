"use client";

import { motion } from "framer-motion";

import type { DigitalMarketingCaseStudy } from "@/components/digital-marketing/digital-marketing-content";
import { CaseStudyCard } from "@/components/digital-marketing/case-study-card";
import { CaseStudyCardFeatured } from "@/components/digital-marketing/case-study-card-featured";
import {
  cardEntryVariants,
  gridContainerVariants,
} from "@/components/digital-marketing/case-study-motion";

type CaseStudyGridProps = {
  items: DigitalMarketingCaseStudy[];
};

// 1-2-1 layout: featured → 2 medium → featured, consuming the first 4 items.
// Stagger is orchestrated here; cards handle hover independently.
export function CaseStudyGrid({ items }: CaseStudyGridProps) {
  return (
    <motion.div
      variants={gridContainerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="grid gap-4 md:grid-cols-2"
    >
      {/* Row 1: full-width featured card */}
      {items[0] && (
        <motion.div variants={cardEntryVariants} className="md:col-span-2">
          <CaseStudyCardFeatured caseStudy={items[0]} />
        </motion.div>
      )}

      {/* Row 2: two equal-height medium cards */}
      {items[1] && (
        <motion.div variants={cardEntryVariants} className="flex h-full flex-col">
          <CaseStudyCard caseStudy={items[1]} />
        </motion.div>
      )}
      {items[2] && (
        <motion.div variants={cardEntryVariants} className="flex h-full flex-col">
          <CaseStudyCard caseStudy={items[2]} />
        </motion.div>
      )}

      {/* Row 3: full-width featured card, image mirrored to right for visual symmetry */}
      {items[3] && (
        <motion.div variants={cardEntryVariants} className="md:col-span-2">
          <CaseStudyCardFeatured caseStudy={items[3]} reversed />
        </motion.div>
      )}
    </motion.div>
  );
}