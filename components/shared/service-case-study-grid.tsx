"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import type { DigitalMarketingCaseStudy } from "@/components/digital-marketing/digital-marketing-content";
import { Badge } from "@/components/ui/badge";
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
          <div className="grid md:grid-cols-[1fr,380px]">
            {/* Content */}
            <div className="space-y-5 border-b border-slate-200/80 p-8 md:border-b-0 md:border-r md:p-12">
              <div className="space-y-3">
                <p className="text-label-sm uppercase tracking-[0.22em] text-(--color-text-tertiary)">
                  {hero.category}
                </p>
                <h3 className="text-xl font-bold leading-snug tracking-tight text-(--neutral-950) md:text-2xl">
                  {hero.title}
                </h3>
                <p className="max-w-[52ch] text-body-md text-(--color-text-secondary)">
                  {hero.description}
                </p>
              </div>

              {hero.services && hero.services.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {hero.services.map((s) => (
                    <Badge key={s} variant="service">{s}</Badge>
                  ))}
                </div>
              )}

              {heroClickable && (
                <div className="flex items-center gap-2 text-sm font-medium text-(--color-text-brand) transition-[gap] duration-200 group-hover:gap-3">
                  {hero.ctaLabel || "View case study"}
                  <ArrowRight className="size-4" />
                </div>
              )}
            </div>

            {/* Thumbnail — always shown; gradient fallback when no src */}
            <div className="relative min-h-70 overflow-hidden md:min-h-0">
              {hero.thumbnailSrc ? (
                <Image
                  src={hero.thumbnailSrc}
                  alt={`${hero.title} preview`}
                  fill
                  sizes="(min-width: 768px) 380px, 100vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="h-full w-full bg-[linear-gradient(135deg,rgba(88,41,199,0.10),rgba(255,202,45,0.10))]" />
              )}
            </div>
          </div>
        </motion.div>

        {/* ── Remaining case studies — text only, bordered grid cells ────────── */}
        {rest.length > 0 && (
          <div className="grid border-l border-slate-200/80 sm:grid-cols-2 md:grid-cols-3">
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
                    <h3 className="font-bold leading-snug tracking-tight text-(--neutral-950)">
                      {item.title}
                    </h3>
                    <p className="text-body-sm text-(--color-text-secondary)">
                      {item.description}
                    </p>
                  </div>

                  {item.services && item.services.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.services.map((s) => (
                        <Badge key={s} variant="service">{s}</Badge>
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
