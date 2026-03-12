"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import Link from "next/link";
import { Maximize2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const caseStudyCardVariants = cva(
  "group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-transparent bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(252,252,253,0.96))] shadow-[0_18px_48px_rgba(11,15,25,0.08)]",
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
  "relative overflow-hidden rounded-[1.25rem] border border-[color:color-mix(in_srgb,var(--purple-500)_12%,white)] bg-[linear-gradient(135deg,rgba(241,242,244,0.72),rgba(203,195,223,0.28)_46%,rgba(148,219,228,0.2)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]",
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
  media,
  size,
  className,
  mediaClassName,
}: StudioCaseStudyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const borderGlowInset = 56;
  const glowX = useMotionValue(340);
  const glowY = useMotionValue(220);
  const borderOpacity = useMotionValue(0);
  const borderGlow = useMotionTemplate`radial-gradient(300px circle at ${glowX}px ${glowY}px, rgba(255,202,45,0.18), rgba(249,169,31,0.06) 10%, rgba(104,56,255,0.98) 24%, rgba(88,41,199,0.94) 46%, rgba(120,86,223,0.72) 64%, rgba(150,136,192,0.24) 80%, rgba(88,41,199,0.04) 92%, rgba(88,41,199,0) 100%)`;

  // The cursor-tracked border glow keeps the effect anchored to the frame edge instead of flooding the card body.
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (shouldReduceMotion || !cardRef.current) {
      return;
    }

    const bounds = cardRef.current.getBoundingClientRect();
    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;
    const clampedX = Math.min(Math.max(localX, borderGlowInset), bounds.width - borderGlowInset);
    const clampedY = Math.min(Math.max(localY, borderGlowInset), bounds.height - borderGlowInset);

    glowX.set(clampedX);
    glowY.set(clampedY);
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn("h-full", href ? "cursor-pointer" : undefined)}
      onPointerMove={handlePointerMove}
      onHoverStart={() => {
        if (!shouldReduceMotion) {
          borderOpacity.set(1);
        }
      }}
      onHoverEnd={() => {
        borderOpacity.set(0);
      }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.012, y: -4 }}
      transition={{ duration: 0.36, ease: easeOut }}
    >
      <Card className={cn(caseStudyCardVariants({ size }), className)}>
        {/* The animated shell turns the pointer glow into a longer border-only response. */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] p-[2px]"
          style={{ background: borderGlow, opacity: borderOpacity }}
          transition={{ duration: 0.28, ease: easeOut }}
        >
          <div className="h-full w-full rounded-[calc(1.5rem-1px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(252,252,253,0.96))]" />
        </motion.div>

        {/* The metallic rim adds a crisp white edge and restrained inset shadow even when the glow is off. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.96),inset_0_0_0_1px_rgba(255,255,255,0.42),0_0_0_1px_rgba(255,255,255,0.24),0_1px_0_rgba(255,255,255,0.18)]"
        />

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
            ) : null}
          </div>
        </CardHeader>

        {/* The services line compresses the proof taxonomy into one scannable metadata row. */}
        <CardContent className="relative z-10 px-5 pb-0 sm:px-6 md:px-7">
          <p className="text-label-sm leading-6 uppercase tracking-[0.22em] text-[color:color-mix(in_srgb,var(--neutral-600)_90%,var(--lavender-500)_10%)]">
            {services.join(", ")}
          </p>
        </CardContent>

        {/* The media area lets each case study carry a logo, illustration, or proof artifact in a consistent frame. */}
        <CardFooter className="relative z-10 mt-auto p-5 pt-5 sm:p-6 sm:pt-6 md:p-7 md:pt-7">
          <motion.div
            className={cn(mediaFrameVariants({ size }), "w-full", mediaClassName)}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
            transition={{ duration: 0.36, ease: easeOut }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(88,41,199,0.16),rgba(255,255,255,0)_62%)]"
            />
            <div className="relative flex h-full items-center justify-center p-6 sm:p-8 text-[var(--neutral-700)]">{media}</div>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}



