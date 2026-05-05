"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import type { DigitalMarketingCaseStudy } from "@/components/digital-marketing/digital-marketing-content";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ServiceCaseStudyCardProps = {
  caseStudy: DigitalMarketingCaseStudy;
  variant?: "hero" | "compact";
  /** If provided, card is clickable and opens the preview modal. */
  onOpenPreview?: () => void;
};

const easeOut = [0.22, 1, 0.36, 1] as const;

export function ServiceCaseStudyCard({
  caseStudy,
  variant = "compact",
  onOpenPreview,
}: ServiceCaseStudyCardProps) {
  const { title, description, category, thumbnailSrc, services } = caseStudy;
  const shouldReduceMotion = useReducedMotion();
  const clickable = !!onOpenPreview;

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpenPreview?.();
    }
  }

  const tagPills = (
    <div className="flex flex-wrap gap-2">
      {services && services.length > 0
        ? services.map((service) => (
            <Badge key={service} variant="service">
              {service}
            </Badge>
          ))
        : <Badge variant="service">{category}</Badge>}
    </div>
  );

  // ── Hero variant ──────────────────────────────────────────────────────────
  if (variant === "hero") {
    const heroContent = (
      <>
        {/* Left — content */}
        <div className="flex flex-col justify-between gap-6 px-8 py-8 md:w-[38%] md:py-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-label-sm uppercase tracking-[0.22em] text-(--color-text-tertiary)">
                {category}
              </p>
              {clickable && (
                <div
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-[0.75rem] border border-slate-200/90 bg-white text-(--neutral-500) shadow-[0_8px_20px_rgba(11,15,25,0.06)]"
                >
                  <Maximize2 className="size-4" />
                </div>
              )}
            </div>
            <div className="space-y-3">
              <h3 className="text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.06] tracking-[-0.032em] text-(--neutral-950)">
                {title}
              </h3>
              <p className="text-body-md max-w-[42ch] text-(--color-text-secondary)">
                {description}
              </p>
            </div>
          </div>
          {tagPills}
        </div>

        {/* Right — image */}
        <div className="relative min-h-[260px] flex-1 overflow-hidden md:min-h-0">
          {thumbnailSrc ? (
            <Image
              src={thumbnailSrc}
              alt={`${title} preview`}
              fill
              sizes="(min-width: 768px) 62vw, 100vw"
              className={cn(
                "object-cover object-top",
                clickable && "transition-transform duration-500 ease-out group-hover:scale-[1.04]",
              )}
            />
          ) : (
            <div className="h-full w-full bg-[linear-gradient(135deg,rgba(88,41,199,0.14),rgba(255,202,45,0.10))]" />
          )}
        </div>
      </>
    );

    if (clickable) {
      return (
        <motion.div
          whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.006 }}
          transition={{ duration: 0.28, ease: easeOut }}
          className="group h-full"
        >
          <div
            role="button"
            tabIndex={0}
            aria-label={`Preview ${title} case study`}
            className="flex h-full min-h-[400px] cursor-pointer flex-col overflow-hidden rounded-[36px] border border-slate-100 bg-white shadow-[0_2px_24px_rgba(15,23,42,0.06)] md:flex-row"
            onClick={onOpenPreview}
            onKeyDown={handleKeyDown}
          >
            {heroContent}
          </div>
        </motion.div>
      );
    }

    return (
      <div className="group h-full">
        <div className="flex h-full min-h-[400px] cursor-default flex-col overflow-hidden rounded-[36px] border border-slate-100 bg-white shadow-[0_2px_24px_rgba(15,23,42,0.06)] md:flex-row">
          {heroContent}
        </div>
      </div>
    );
  }

  // ── Compact variant (non-clickable, vertical) ─────────────────────────────
  return (
    <div className="group h-full">
      <div className="flex h-full min-h-[380px] cursor-default flex-col overflow-hidden rounded-[36px] border border-slate-100 bg-white shadow-[0_2px_24px_rgba(15,23,42,0.06)]">
        <div className="flex flex-col gap-[10px] px-6 pb-6 pt-8 text-left">
          <p className="text-label-sm uppercase tracking-[0.22em] text-(--color-text-tertiary)">
            {category}
          </p>
          <div className="space-y-2">
            <h3 className="text-[clamp(1.2rem,1.6vw,1.5rem)] leading-[1.06] tracking-[-0.028em] text-(--neutral-950)">
              {title}
            </h3>
            <p className="text-body-sm max-w-[36ch] text-(--color-text-secondary)">
              {description}
            </p>
          </div>
          {tagPills}
        </div>

        <div className="relative mt-auto h-[13rem] w-full shrink-0 overflow-hidden">
          {thumbnailSrc ? (
            <Image
              src={thumbnailSrc}
              alt={`${title} preview`}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover object-top"
            />
          ) : (
            <div className="h-full w-full bg-[linear-gradient(135deg,rgba(88,41,199,0.14),rgba(255,202,45,0.10))]" />
          )}
        </div>
      </div>
    </div>
  );
}
