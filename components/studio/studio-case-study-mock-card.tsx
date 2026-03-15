"use client";

import { useRef, type PointerEvent } from "react";
import Image from "next/image";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

import { PremiumSurface, type PremiumSurfaceProps } from "@/components/ui/premium-surface";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

export type StudioCaseStudyMockVariant = "aurora" | "sunrise" | "prism";
export type StudioCaseStudyMockCardLayout = "feature" | "compact" | "wide";

const mockCardVariantStyles: Record<
  StudioCaseStudyMockVariant,
  {
    iconAccentClassName: string;
    mockFrameClassName: string;
    mockImageClassName: string;
    tone: NonNullable<PremiumSurfaceProps["tone"]>;
  }
> = {
  aurora: {
    iconAccentClassName: "bg-[rgba(245,243,255,0.88)] text-[var(--purple-500)]",
    mockFrameClassName:
      "w-fit max-w-full rounded-[2rem] border border-white/72 bg-white/66 p-3 shadow-[0_24px_70px_rgba(15,23,42,0.16)] backdrop-blur-sm",
    mockImageClassName: "rounded-[1.45rem]",
    tone: "billing",
  },
  sunrise: {
    iconAccentClassName: "bg-[rgba(255,248,234,0.92)] text-[color:color-mix(in_srgb,var(--orange-500)_72%,var(--purple-500))]",
    mockFrameClassName:
      "w-fit max-w-full rounded-[2.2rem] border border-white/72 bg-[rgba(255,255,255,0.62)] p-3 shadow-[0_30px_86px_rgba(240,78,40,0.18)] backdrop-blur-sm rotate-[-4deg] origin-bottom",
    mockImageClassName: "rounded-[1.55rem]",
    tone: "billingSunrise",
  },
  prism: {
    iconAccentClassName: "bg-[rgba(237,249,251,0.92)] text-[color:color-mix(in_srgb,var(--cyan-500)_72%,var(--purple-500))]",
    mockFrameClassName:
      "w-fit max-w-full rounded-[2.1rem] border border-white/72 bg-[rgba(255,255,255,0.64)] p-3 shadow-[0_28px_82px_rgba(43,183,199,0.16)] backdrop-blur-sm",
    mockImageClassName: "rounded-[1.5rem] saturate-[1.03] object-contain",
    tone: "billingPrism",
  },
};

const mockCardLayoutStyles: Record<
  StudioCaseStudyMockCardLayout,
  {
    bodyClassName: string;
    footerClassName: string;
    imageClassName: string;
    imageStageClassName: string;
    shellClassName: string;
    summaryClassName: string;
    titleClassName: string;
  }
> = {
  feature: {
    bodyClassName: "gap-6",
    footerClassName: "max-w-[30rem]",
    imageClassName: "h-[20rem] sm:h-[22rem] lg:h-[24rem]",
    imageStageClassName: "min-h-[460px] px-4 pb-2 pt-8 sm:px-6",
    shellClassName: "min-h-[760px] p-5 sm:p-6 md:p-7",
    summaryClassName: "max-w-[34ch] text-body-sm text-[var(--color-text-secondary)]",
    titleClassName: "text-heading-md text-foreground",
  },
  compact: {
    bodyClassName: "gap-4",
    footerClassName: "max-w-none",
    imageClassName: "h-[11rem] sm:h-[12rem]",
    imageStageClassName: "min-h-[250px] px-2 pb-1 pt-4 sm:px-3",
    shellClassName: "min-h-[520px] p-4 sm:p-5",
    summaryClassName: "max-w-[30ch] text-body-sm leading-6 text-[var(--color-text-secondary)]",
    titleClassName: "text-heading-sm text-foreground",
  },
  wide: {
    bodyClassName: "gap-5",
    footerClassName: "max-w-[34rem]",
    imageClassName: "h-[14rem] sm:h-[15rem] lg:h-[16rem]",
    imageStageClassName: "min-h-[320px] px-3 pb-1 pt-5 sm:px-5",
    shellClassName: "min-h-[560px] p-5 sm:p-6 md:p-7",
    summaryClassName: "max-w-[56ch] text-body-sm leading-6 text-[var(--color-text-secondary)]",
    titleClassName: "text-heading-md text-foreground",
  },
};

export type StudioCaseStudyMockCardProps = {
  sector: string;
  title: string;
  summary: string;
  services: string[];
  imageSrc: string;
  imageAlt: string;
  imageClassName?: string;
  variant?: StudioCaseStudyMockVariant;
  layout?: StudioCaseStudyMockCardLayout;
  onOpenDetails?: () => void;
  className?: string;
};

// This card adapts the premium gradient mock treatment into a reusable homepage and design-system proof pattern.
export function StudioCaseStudyMockCard({
  className,
  imageAlt,
  imageClassName,
  imageSrc,
  layout = "feature",
  onOpenDetails,
  sector,
  services,
  summary,
  title,
  variant = "aurora",
}: StudioCaseStudyMockCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const mockRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 180, damping: 18, mass: 0.6 });
  const springRotateY = useSpring(rotateY, { stiffness: 180, damping: 18, mass: 0.6 });
  const transform = useMotionTemplate`perspective(1200px) rotateX(${springRotateX}deg) rotateY(${springRotateY}deg) translateY(-4px)`;
  const variantStyles = mockCardVariantStyles[variant];
  const layoutStyles = mockCardLayoutStyles[layout];
  const serviceLabel = services.join(" • ");
  const canOpenDetails = Boolean(onOpenDetails);

  function handleOpenDetails() {
    onOpenDetails?.();
  }

  function handleMockPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (shouldReduceMotion || !mockRef.current) {
      return;
    }

    const bounds = mockRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    rotateX.set((0.5 - y) * 14);
    rotateY.set((x - 0.5) * 16);
  }

  function handleMockPointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      className={cn("group h-full", canOpenDetails ? "cursor-pointer" : undefined, className)}
      onClick={canOpenDetails ? handleOpenDetails : undefined}
      onKeyDown={
        canOpenDetails
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleOpenDetails();
              }
            }
          : undefined
      }
      role={canOpenDetails ? "button" : undefined}
      tabIndex={canOpenDetails ? 0 : undefined}
      aria-label={canOpenDetails ? `Open ${title} case study details` : undefined}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.014, y: -6 }}
      transition={{ duration: 0.36, ease: easeOut }}
    >
      <PremiumSurface
        tone={variantStyles.tone}
        elevation="lg"
        blur="none"
        radius="xl"
        className={cn(
          "border-[color:color-mix(in_srgb,var(--lavender-200)_56%,white)] transition-[box-shadow,transform] duration-300 ease-out group-hover:shadow-[0_34px_110px_rgba(88,41,199,0.18),0_24px_70px_rgba(11,15,25,0.14)]",
          layoutStyles.shellClassName,
        )}
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
          <div className="absolute inset-x-[12%] top-[12%] h-[24%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.5)_42%,transparent_76%)] blur-3xl" />
          <div className="absolute -left-[14%] bottom-[14%] h-[38%] w-[42%] rounded-full bg-[radial-gradient(circle,rgba(255,202,45,0.44)_0%,rgba(249,169,31,0.26)_40%,transparent_76%)] blur-3xl" />
          <div className="absolute left-[20%] right-[18%] bottom-[-6%] h-[42%] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.48)_0%,rgba(139,92,246,0.26)_38%,transparent_76%)] blur-3xl" />
          <div className="absolute -right-[10%] bottom-[8%] h-[34%] w-[36%] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.34)_0%,rgba(43,183,199,0.18)_40%,transparent_74%)] blur-3xl" />
        </div>

        <div className={cn("relative z-10 flex h-full flex-col", layoutStyles.bodyClassName)}>
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">{sector}</p>
                <h3 className={layoutStyles.titleClassName}>{title}</h3>
                <p className={layoutStyles.summaryClassName}>{summary}</p>
              </div>

              <div
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-[var(--ds-radius-xl)] shadow-[0_10px_28px_rgba(88,41,199,0.08)] transition-transform duration-300 ease-out group-hover:scale-[1.04]",
                  variantStyles.iconAccentClassName,
                )}
              >
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleOpenDetails();
                  }}
                  className="flex size-full cursor-pointer items-center justify-center rounded-[inherit] bg-transparent"
                  aria-label={canOpenDetails ? `Open ${title} case study details` : `Preview ${title} case study`}
                >
                  <Maximize2 className="size-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-auto space-y-5">
            <div className={cn("flex items-end justify-center [perspective:1400px]", layoutStyles.imageStageClassName)}>
              <motion.div
                ref={mockRef}
                onPointerMove={handleMockPointerMove}
                onPointerLeave={handleMockPointerLeave}
                style={shouldReduceMotion ? undefined : { transformStyle: "preserve-3d", transform }}
                className={cn(
                  variantStyles.mockFrameClassName,
                  "relative max-w-[500px] transition-[box-shadow] duration-300 ease-out group-hover:shadow-[0_34px_110px_rgba(11,15,25,0.22)]",
                )}
              >
                <div className="overflow-hidden rounded-[1.6rem] bg-[rgba(17,24,39,0.05)]">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={402}
                    height={804}
                    className={cn("w-auto max-w-full", layoutStyles.imageClassName, variantStyles.mockImageClassName, imageClassName)}
                    priority={false}
                  />
                </div>
              </motion.div>
            </div>

            <PremiumSurface
              tone="neutral"
              elevation="sm"
              blur="none"
              radius="lg"
              className={cn(
                "mx-auto flex w-full items-center justify-between gap-3 border-white/70 bg-white/88 px-4 py-3 shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition-[transform,box-shadow] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:shadow-[0_22px_54px_rgba(15,23,42,0.12)]",
                layoutStyles.footerClassName,
              )}
            >
              <p className="text-body-sm text-[var(--color-text-secondary)]">{serviceLabel}</p>
              <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-full", variantStyles.iconAccentClassName)}>
                <ArrowUpRight className="size-4" />
              </span>
            </PremiumSurface>
          </div>
        </div>
      </PremiumSurface>
    </motion.div>
  );
}

