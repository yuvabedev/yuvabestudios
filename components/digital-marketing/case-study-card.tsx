"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { DigitalMarketingCaseStudy } from "@/components/digital-marketing/digital-marketing-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PremiumSurface } from "@/components/ui/premium-surface";

type CaseStudyCardProps = {
  caseStudy: DigitalMarketingCaseStudy;
};

// Medium card — entry animation is provided by the parent grid slot's motion wrapper.
export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group h-full"
    >
      <PremiumSurface
        tone="glass"
        elevation="md"
        blur="md"
        radius="xl"
        className="flex h-full flex-col overflow-hidden border-white/75 p-0"
      >
        <div className="relative h-44 w-full overflow-hidden border-b border-slate-200/70 bg-(--color-background-canvas)">
          {caseStudy.thumbnailSrc ? (
            <Image
              src={caseStudy.thumbnailSrc}
              alt={`${caseStudy.title} cover`}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-[linear-gradient(135deg,rgba(88,41,199,0.18),rgba(255,202,45,0.14))]" />
          )}
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <Badge variant="brandTagSubtle" className="w-fit">
            {caseStudy.category}
          </Badge>
          <h3 className="text-heading-lg text-(--neutral-950)">
            {caseStudy.title}
          </h3>
          <p className="text-body-md text-(--color-text-secondary)">
            {caseStudy.description}
          </p>
          <div className="mt-auto pt-1">
            <Button asChild variant="secondary">
              <Link href={`/case-studies/${caseStudy.slug}`}>
                {caseStudy.ctaLabel}
              </Link>
            </Button>
          </div>
        </div>
      </PremiumSurface>
    </motion.article>
  );
}