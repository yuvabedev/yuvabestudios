"use client";

import { useRef, type PointerEvent } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

import {
  PremiumSurface,
  type PremiumSurfaceProps,
} from "@/components/ui/premium-surface";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;
const shouldSkipImageOptimization = process.env.NODE_ENV === "development";

export type StudioCaseStudyMockVariant = "aurora" | "sunrise" | "prism";
export type StudioCaseStudyMockCardLayout = "feature" | "compact" | "wide";
export type StudioCaseStudyMockViewport = "portrait" | "landscape";
export type StudioCaseStudyMockCardSpan = "grid" | "full";
export type StudioCaseStudyMockPresentation = "framed" | "fullImage";

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
    iconAccentClassName:
      "bg-[rgba(255,248,234,0.92)] text-[color:color-mix(in_srgb,var(--orange-500)_72%,var(--purple-500))]",
    mockFrameClassName:
      "w-fit max-w-full rounded-[2.2rem] border border-white/72 bg-[rgba(255,255,255,0.62)] p-3 shadow-[0_30px_86px_rgba(240,78,40,0.18)] backdrop-blur-sm",
    mockImageClassName: "rounded-[1.55rem]",
    tone: "billingSunrise",
  },
  prism: {
    iconAccentClassName:
      "bg-[rgba(237,249,251,0.92)] text-[color:color-mix(in_srgb,var(--cyan-500)_72%,var(--purple-500))]",
    mockFrameClassName:
      "w-fit max-w-full rounded-[2.1rem] border border-white/72 bg-[rgba(255,255,255,0.64)] p-3 shadow-[0_28px_82px_rgba(43,183,199,0.16)] backdrop-blur-sm",
    mockImageClassName: "rounded-[1.5rem] saturate-[1.03]",
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
    mediaGroupClassName: string;
    shellClassName: string;
    summaryClassName: string;
    titleClassName: string;
  }
> = {
  // This layout config is the single source of truth for case-study card spacing and height behavior.
  // Mobile stacks naturally for better density, while desktop restores the editorial equal-height composition.
  feature: {
    bodyClassName: "gap-4 md:gap-6",
    footerClassName: "max-w-none md:max-w-[30rem]",
    imageClassName: "h-[20rem] sm:h-[22rem] lg:h-[24rem]",
    // The mock stage gets a smaller mobile min-height so the image sits closer to the copy.
    imageStageClassName:
      "min-h-[250px] px-1 pb-1 pt-1 sm:min-h-[300px] sm:px-2 sm:pt-2 md:min-h-[460px] md:px-4 md:pb-2 md:pt-8 lg:px-6",
    // Mobile keeps the media group in normal flow; desktop pushes it down to preserve the premium editorial rhythm.
    mediaGroupClassName: "space-y-4 md:mt-auto md:space-y-5",
    // Mobile uses natural height to avoid dead space, while desktop restores equal card heights for balanced rows.
    shellClassName: "h-auto px-5 py-5 sm:p-5 md:h-[760px] md:p-6 lg:p-7",
    summaryClassName: "max-w-[34ch] text-body-sm text-[var(--color-text-secondary)]",
    titleClassName: "text-heading-md text-foreground",
  },
  compact: {
    bodyClassName: "gap-3 md:gap-4",
    footerClassName: "max-w-none",
    imageClassName: "h-[11rem] sm:h-[12rem]",
    imageStageClassName:
      "min-h-[180px] px-1 pb-1 pt-1 sm:min-h-[220px] sm:px-2 sm:pt-2 md:min-h-[250px] md:px-2 md:pt-4 lg:px-3",
    mediaGroupClassName: "space-y-3 md:mt-auto md:space-y-4",
    shellClassName: "h-auto px-5 py-5 sm:p-5 md:h-[520px]",
    summaryClassName:
      "max-w-[30ch] text-body-sm leading-6 text-[var(--color-text-secondary)]",
    titleClassName: "text-heading-sm text-foreground",
  },
  wide: {
    bodyClassName: "gap-4 md:gap-5",
    footerClassName: "max-w-none md:max-w-[34rem]",
    imageClassName: "h-[14rem] sm:h-[15rem] lg:h-[16rem]",
    imageStageClassName:
      "min-h-[220px] px-1 pb-1 pt-1 sm:min-h-[260px] sm:px-3 sm:pt-2 md:min-h-[320px] md:pb-1 md:pt-5 lg:px-5",
    mediaGroupClassName: "space-y-4 md:mt-auto md:space-y-5",
    shellClassName: "h-auto px-5 py-5 sm:p-5 md:h-[560px] md:p-6 lg:p-7",
    summaryClassName:
      "max-w-[56ch] text-body-sm leading-6 text-[var(--color-text-secondary)]",
    titleClassName: "text-heading-md text-foreground",
  },
};

const mockViewportStyles: Record<
  StudioCaseStudyMockViewport,
  { frameClassName: string; imageClassName: string }
> = {
  // Viewport shape stays separate from layout so portrait and landscape cropping can change without rewriting card spacing rules.
  portrait: {
    frameClassName:
      "h-[320px] w-[200px] sm:h-[360px] sm:w-[220px] lg:h-[390px] lg:w-[240px]",
    imageClassName: "object-cover object-center",
  },
  landscape: {
    frameClassName:
      "h-[210px] w-[300px] sm:h-[240px] sm:w-[360px] lg:h-[280px] lg:w-[440px]",
    imageClassName: "object-cover object-center",
  },
};

const fullSpanShellOverrides: Record<StudioCaseStudyMockCardLayout, string> = {
  feature: "md:h-auto md:min-h-[38rem] lg:min-h-[40rem]",
  compact: "md:h-auto md:min-h-[30rem]",
  wide: "md:h-auto md:min-h-[34rem] lg:min-h-[36rem]",
};

const fullSpanImageStageOverrides: Record<StudioCaseStudyMockCardLayout, string> = {
  feature: "md:min-h-[320px] md:pt-4 lg:min-h-[360px] lg:pt-6",
  compact: "md:min-h-[220px] md:pt-3",
  wide: "md:min-h-[260px] md:pt-4 lg:min-h-[300px] lg:pt-5",
};

const fullSpanViewportOverrides: Record<StudioCaseStudyMockViewport, string> = {
  portrait: "md:h-[400px] md:w-[250px] lg:h-[440px] lg:w-[275px]",
  landscape: "md:h-[260px] md:w-[420px] lg:h-[320px] lg:w-[540px]",
};

function normalizeServiceLabel(service: string) {
  if (service === "Brand system") {
    return "Branding";
  }

  return service;
}

export type StudioCaseStudyMockCardProps = {
  sector: string;
  title: string;
  summary: string;
  services: string[];
  imageSrc: string;
  imageAlt: string;
  imageAspectRatio?: string;
  imageClassName?: string;
  mockViewport?: StudioCaseStudyMockViewport;
  mockPresentation?: StudioCaseStudyMockPresentation;
  variant?: StudioCaseStudyMockVariant;
  layout?: StudioCaseStudyMockCardLayout;
  span?: StudioCaseStudyMockCardSpan;
  detailHref?: string;
  onOpenDetails?: () => void;
  className?: string;
};

// This card adapts the premium gradient mock treatment into a reusable homepage and proof pattern.
export function StudioCaseStudyMockCard({
  className,
  detailHref,
  imageAlt,
  imageAspectRatio,
  imageClassName,
  imageSrc,
  layout = "feature",
  mockPresentation = "framed",
  mockViewport = "portrait",
  onOpenDetails,
  sector,
  services,
  span = "grid",
  summary,
  title,
  variant = "aurora",
}: StudioCaseStudyMockCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const mockRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, {
    stiffness: 180,
    damping: 18,
    mass: 0.6,
  });
  const springRotateY = useSpring(rotateY, {
    stiffness: 180,
    damping: 18,
    mass: 0.6,
  });
  const transform = useMotionTemplate`perspective(1200px) rotateX(${springRotateX}deg) rotateY(${springRotateY}deg) translateY(-4px)`;
  const variantStyles = mockCardVariantStyles[variant];
  const layoutStyles = mockCardLayoutStyles[layout];
  const viewportStyles = mockViewportStyles[mockViewport];
  const isFullImagePresentation = mockPresentation === "fullImage";
  const fullImageAspectRatio =
    imageAspectRatio ?? (mockViewport === "portrait" ? "1310 / 2708" : "16 / 10");
  const serviceTags = services.map(normalizeServiceLabel);
  const canOpenDetails = Boolean(onOpenDetails);

  function handleOpenDetails() {
    onOpenDetails?.();
  }

  // The image stage tilts subtly with the cursor so the mock keeps a tactile feel without changing layout.
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
      className={cn(
        "group h-full min-w-0 w-full",
        canOpenDetails ? "cursor-pointer" : undefined,
        className,
      )}
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
          "w-full min-w-0 border-[color:color-mix(in_srgb,var(--lavender-200)_56%,white)] transition-[box-shadow,transform] duration-300 ease-out group-hover:shadow-[0_34px_110px_rgba(88,41,199,0.18),0_24px_70px_rgba(11,15,25,0.14)]",
          layoutStyles.shellClassName,
          span === "full" && fullSpanShellOverrides[layout],
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
                <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
                  {sector}
                </p>
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
                  aria-label={
                    canOpenDetails
                      ? `Open ${title} case study details`
                      : `Preview ${title} case study`
                  }
                >
                  <Maximize2 className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* The media group uses tighter mobile spacing, then restores the desktop push-down behavior from md upward. */}
          <div
            className={cn(
              layoutStyles.mediaGroupClassName,
              span === "full" && "md:mt-0",
            )}
          >
            <div
              className={cn(
                "flex items-end justify-center [perspective:1400px]",
                isFullImagePresentation
                  ? "min-h-0 px-0 py-0"
                  : layoutStyles.imageStageClassName,
                span === "full" && fullSpanImageStageOverrides[layout],
              )}
            >
              <motion.div
                ref={mockRef}
                onPointerMove={handleMockPointerMove}
                onPointerLeave={handleMockPointerLeave}
                style={
                  shouldReduceMotion
                    ? undefined
                    : { transformStyle: "preserve-3d", transform }
                }
                className={cn(
                  isFullImagePresentation
                    ? "relative max-w-[560px]"
                    : variantStyles.mockFrameClassName,
                  "relative max-w-[560px] transition-[box-shadow] duration-300 ease-out group-hover:shadow-[0_34px_110px_rgba(11,15,25,0.22)]",
                  span === "full" && "max-w-[680px]",
                )}
              >
                <div
                  style={isFullImagePresentation ? { aspectRatio: fullImageAspectRatio } : undefined}
                  className={cn(
                    "relative overflow-hidden",
                    isFullImagePresentation
                      ? [
                        mockViewport === "portrait"
                          ? "w-[220px] sm:w-[250px] lg:w-[280px]"
                          : "w-[300px] sm:w-[360px] lg:w-[440px]",
                        span === "full" &&
                        (mockViewport === "portrait"
                          ? "md:w-[290px] lg:w-[320px]"
                          : "md:w-[420px] lg:w-[540px]"),
                      ]
                      : [
                        "rounded-[1.6rem] bg-[rgba(17,24,39,0.05)]",
                        viewportStyles.frameClassName,
                        span === "full" && fullSpanViewportOverrides[mockViewport],
                      ],
                  )}
                >
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    sizes={
                      mockViewport === "portrait"
                        ? span === "full"
                          ? "(max-width: 640px) 200px, (max-width: 1024px) 250px, 275px"
                          : "(max-width: 640px) 200px, (max-width: 1024px) 220px, 240px"
                        : span === "full"
                          ? "(max-width: 640px) 260px, (max-width: 1024px) 420px, 540px"
                          : "(max-width: 640px) 260px, (max-width: 1024px) 320px, 380px"
                    }
                    className={cn(
                      isFullImagePresentation
                        ? "object-contain object-center"
                        : viewportStyles.imageClassName,
                      !isFullImagePresentation && variantStyles.mockImageClassName,
                      imageClassName,
                    )}
                    priority={false}
                    unoptimized={shouldSkipImageOptimization}
                  />
                </div>
              </motion.div>
            </div>

            {/* The service footer turns each capability into centered proof tags without adding a second CTA. */}
            <div
              className={cn(
                "mx-auto flex w-full justify-center",
                layoutStyles.footerClassName,
              )}
            >
              <div className="flex flex-wrap justify-center gap-2">
                {serviceTags.map((service) => (
                  <Badge key={`${title}-${service}`} variant="service">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PremiumSurface>
    </motion.div>
  );
}
