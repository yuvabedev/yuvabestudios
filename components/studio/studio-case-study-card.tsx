"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { Maximize2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;
const cardHoverMotion = {
  lift: { scale: 1.006, y: -2 },
  mediaLift: { scale: 1.005 },
  transition: { duration: 0.32, ease: easeOut },
};

const caseStudyCardVariants = cva(
  "group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border-0 bg-transparent shadow-none",
  {
    variants: {
      size: {
        default: "min-h-[24rem] sm:min-h-[28rem]",
        feature: "min-h-[28rem] sm:min-h-[34rem]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const mediaFrameVariants = cva(
  "relative overflow-hidden rounded-[1.25rem]",
  {
    variants: {
      size: {
        default: "h-[10.5rem] sm:h-[12rem]",
        feature: "h-[11.5rem] sm:h-[13rem]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

type StudioCaseStudyCardProps = VariantProps<typeof caseStudyCardVariants> & {
  sector: string;
  title: string;
  summary: string;
  services: string[];
  href?: string;
  onOpenDetails?: () => void;
  media: ReactNode;
  className?: string;
  mediaClassName?: string;
};

// This card adapts the darker reference into a calm light surface for founder-facing case-study proof.
export function StudioCaseStudyCard({
  sector,
  title,
  summary,
  services,
  href,
  onOpenDetails,
  media,
  size,
  className,
  mediaClassName,
}: StudioCaseStudyCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const canOpenDetails = Boolean(onOpenDetails);

  // The shared opener keeps card clicks and the icon action aligned around the same detail-dialog behavior.
  function handleOpenDetails() {
    onOpenDetails?.();
  }

  return (
    <motion.div
      className={cn("h-full", href || canOpenDetails ? "cursor-pointer" : undefined)}
      onClick={canOpenDetails && !href ? handleOpenDetails : undefined}
      onKeyDown={
        canOpenDetails && !href
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleOpenDetails();
              }
            }
          : undefined
      }
      role={canOpenDetails && !href ? "button" : undefined}
      tabIndex={canOpenDetails && !href ? 0 : undefined}
      aria-label={canOpenDetails && !href ? `Open ${title} case study details` : undefined}
      whileHover={shouldReduceMotion ? undefined : cardHoverMotion.lift}
      transition={cardHoverMotion.transition}
    >
      <Card className={cn(caseStudyCardVariants({ size }), className)}>
        {/* The header carries the sector label, title, summary, and quick action. */}
        <CardHeader className="relative z-10 gap-5 p-5 sm:p-6 md:p-7">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:justify-between">
            <div className="space-y-4 pr-0 sm:pr-2">
              <p className="text-label-sm uppercase tracking-[0.22em] text-[color:color-mix(in_srgb,var(--lavender-500)_78%,var(--neutral-600))]">
                {sector}
              </p>
              <div className="space-y-3">
                <CardTitle className="text-[clamp(1.5rem,2vw,2rem)] leading-[1.05] tracking-[-0.03em] text-[var(--neutral-950)]">
                  {title}
                </CardTitle>
                <CardDescription className="max-w-[44rem] text-body-md leading-7 text-[color:color-mix(in_srgb,var(--neutral-700)_86%,var(--lavender-500)_14%)]">
                  {summary}
                </CardDescription>
              </div>
            </div>

            {/* The icon action stays visually stable so the border is the only card-hover response. */}
            {href ? (
              <div className="shrink-0 self-start rounded-[1rem] border border-[rgba(209,213,219,0.9)] bg-[rgba(255,255,255,0.96)] text-[rgb(75,85,99)] shadow-[0_8px_20px_rgba(11,15,25,0.06)]">
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="size-12 rounded-[1rem] border-0 bg-transparent text-current shadow-none hover:bg-transparent cursor-pointer sm:size-14"
                >
                  <Link href={href} aria-label={`Open ${title} case study`}>
                    <Maximize2 className="size-4" />
                  </Link>
                </Button>
              </div>
            ) : canOpenDetails ? (
              <div className="shrink-0 self-start rounded-[1rem] border border-[rgba(209,213,219,0.9)] bg-[rgba(255,255,255,0.96)] text-[rgb(75,85,99)] shadow-[0_8px_20px_rgba(11,15,25,0.06)]">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleOpenDetails();
                  }}
                  className="size-12 rounded-[1rem] border-0 bg-transparent text-current shadow-none hover:bg-transparent cursor-pointer sm:size-14"
                  aria-label={`Open ${title} case study details`}
                >
                  <Maximize2 className="size-4" />
                </Button>
              </div>
            ) : null}
          </div>
        </CardHeader>

        {/* The services line compresses the proof taxonomy into one scannable metadata row. */}
        <CardContent className="relative z-10 px-5 pb-0 sm:px-6 md:px-7">
          <p className="text-label-sm leading-6 uppercase tracking-[0.22em] text-[color:color-mix(in_srgb,var(--neutral-600)_90%,var(--lavender-500)_10%)]">
            {services.join(", ")}
          </p>
        </CardContent>

        {/* The media area now lets the asset sit directly in the layout without an extra frame treatment. */}
        <CardFooter className="relative z-10 mt-auto p-5 pt-5 sm:p-6 sm:pt-6 md:p-7 md:pt-7">
          <motion.div
            className={cn(mediaFrameVariants({ size }), "w-full", mediaClassName)}
            whileHover={shouldReduceMotion ? undefined : cardHoverMotion.mediaLift}
            transition={cardHoverMotion.transition}
          >
            <div className="relative flex h-full items-center justify-center text-[var(--neutral-700)]">{media}</div>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}



