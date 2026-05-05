"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import type { DigitalMarketingCaseStudy } from "@/components/digital-marketing/digital-marketing-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ServiceCaseStudyPreviewDialog } from "@/components/shared/service-case-study-preview-dialog";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type ServiceCaseStudyGridProps = {
  items: DigitalMarketingCaseStudy[];
  heroClickable?: boolean;
};

export function ServiceCaseStudyGrid({ items, heroClickable = false }: ServiceCaseStudyGridProps) {
  const [activeItem, setActiveItem] = useState<DigitalMarketingCaseStudy | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  if (!items.length) return null;

  const [hero, ...rest] = items;
  function openPreview(item: DigitalMarketingCaseStudy) {
    setActiveItem(item);
    setIsPreviewOpen(true);
  }

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="flex flex-col"
      >
        {/* ── Featured (top) case study — with image ─────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className={cn(
            "overflow-hidden border border-slate-200/80",
            heroClickable && "group cursor-pointer"
          )}
          onClick={heroClickable ? () => openPreview(hero) : undefined}
          role={heroClickable ? "button" : undefined}
          tabIndex={heroClickable ? 0 : undefined}
          aria-label={heroClickable ? `Preview ${hero.title} case study` : undefined}
          onKeyDown={
            heroClickable
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openPreview(hero);
                  }
                }
              : undefined
          }
        >
          <div className="flex flex-row">
            {/* Content */}
            <div className="flex flex-1 flex-col justify-center space-y-5 p-8 md:p-12">
              <div className="space-y-3">
                <p className="text-label-sm uppercase tracking-[0.22em] text-(--color-text-tertiary)">
                  {hero.category}
                </p>
                <h3 className="text-xl font-semibold leading-snug tracking-tight text-(--neutral-950) md:text-2xl">
                  {hero.title}
                </h3>
                <p className="max-w-[52ch] text-body-md text-(--color-text-secondary)">
                  {hero.description}
                </p>
              </div>

              {hero.services && hero.services.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {hero.services.map((s, i) => (
                    <Badge key={s} variant="service" colorIndex={i}>{s}</Badge>
                  ))}
                </div>
              )}

              {heroClickable && (
                <Button size="sm" className="self-start bg-violet-600 text-white hover:bg-violet-700">
                  {hero.ctaLabel || "View case study"}
                  <ArrowRight className="size-4" />
                </Button>
              )}
            </div>

            {/* Thumbnail — right side */}
            <div className="relative w-[380px] min-h-70 shrink-0 overflow-hidden pr-4">
              {hero.thumbnailSrc ? (
                <Image
                  src={hero.thumbnailSrc}
                  alt={`${hero.title} preview`}
                  fill
                  sizes="380px"
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="h-full w-full bg-[linear-gradient(135deg,rgba(88,41,199,0.10),rgba(255,202,45,0.10))]" />
              )}
            </div>
          </div>
        </motion.div>

        {/* ── Remaining case studies — text only, bordered grid cells ────────── */}
        {rest.length > 0 && (
          <div className="grid border-l border-slate-200/80 sm:grid-cols-2">
            {rest.map((item) => (
              <motion.div
                key={item.slug}
                variants={itemVariants}
                className="border-b border-r border-slate-200/80 p-7 md:p-8"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-label-sm uppercase tracking-[0.22em] text-(--color-text-tertiary)">
                      {item.category}
                    </p>
                    <h3 className="font-semibold leading-snug tracking-tight text-(--neutral-950)">
                      {item.title}
                    </h3>
                    <p className="text-body-sm text-(--color-text-secondary)">
                      {item.description}
                    </p>
                  </div>

                  {item.services && item.services.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.services.map((s, i) => (
                        <Badge key={s} variant="service" colorIndex={i}>{s}</Badge>
                      ))}
                    </div>
                  )}
                </div>
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
