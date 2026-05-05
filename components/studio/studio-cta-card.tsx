import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { StudioPageContainer } from "@/components/studio/studio-page-shell";
import { StartProjectButton } from "@/components/studio/start-project-button";
import { Button } from "@/components/ui/button";
import { PremiumSurface } from "@/components/ui/premium-surface";
import { isStartProjectHref } from "@/lib/start-project";
import { cn } from "@/lib/utils";

type StudioCtaCardProps = {
  eyebrow: string;
  title: string;
  description?: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  sectionClassName?: string;
  sectionOverlay?: ReactNode;
  containerClassName?: string;
  titleClassName?: string;
  titleStyle?: CSSProperties;
  descriptionClassName?: string;
  ctaWrapperClassName?: string;
  copyWrapperClassName?: string;
  contentLayout?: "split" | "stacked";
};

// This shared CTA card keeps homepage inserts and the About page aligned to one premium conversion surface.
export function StudioCtaCard({
  eyebrow,
  title,
  description,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  sectionClassName = "bg-white py-16 md:py-20",
  sectionOverlay,
  containerClassName = "lg:px-10 xl:px-14",
  titleClassName = "max-w-4xl text-display-muted-editorial text-(--neutral-950)",
  titleStyle = { wordSpacing: ".2rem" },
  descriptionClassName = "max-w-3xl text-body-lg text-(--color-text-secondary)",
  ctaWrapperClassName = "flex items-start justify-start lg:justify-center",
  copyWrapperClassName = "space-y-4",
  contentLayout = "split",
}: StudioCtaCardProps) {
  const opensStartProjectModal = isStartProjectHref(primaryCtaHref);
  const contentLayoutClassName =
    contentLayout === "stacked"
      ? "relative z-10 flex flex-col items-center gap-6 text-center"
      : "relative z-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end";

  return (
    <section className={cn("relative", sectionClassName)}>
      {sectionOverlay}
      <StudioPageContainer className={cn("relative z-10", containerClassName)}>
        <PremiumSurface
          tone="glass"
          elevation="lg"
          blur="lg"
          radius="xl"
          className="overflow-hidden border-white/85 p-8 shadow-[0_28px_80px_rgba(15,23,42,0.14)] transition-transform duration-300 ease-out hover:transform-[perspective(1600px)_rotateX(0.8deg)_rotateY(-1.8deg)] md:p-10"
        >
          <div aria-hidden="true" className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(252,248,255,0.96)_34%,rgba(255,249,236,0.95)_100%)]" />
            <div className="absolute inset-x-[18%] -top-36 h-72 rounded-full bg-[radial-gradient(circle,rgba(88,41,199,0.14)_0%,rgba(203,195,223,0.18)_34%,rgba(255,202,45,0.14)_58%,rgba(255,255,255,0)_82%)] blur-3xl" />
            <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,202,45,0.24)_0%,rgba(255,202,45,0)_72%)] blur-3xl" />
            <div className="absolute -left-32 -bottom-32 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(88,41,199,0.2)_0%,rgba(88,41,199,0)_72%)] blur-3xl" />
          </div>

          {/* The content column stays editorial while the action area keeps one clear next step. */}
          <div className={contentLayoutClassName}>
            <div className={copyWrapperClassName}>
              {eyebrow ? (
                <p className="text-label-sm uppercase tracking-[0.22em] text-(--color-text-tertiary)">
                  {eyebrow}
                </p>
              ) : null}
              <h2 className={titleClassName} style={titleStyle}>
                {title}
              </h2>
              {description ? (
                <p className={descriptionClassName}>{description}</p>
              ) : null}
            </div>

            {/* The CTA button reuses the shared contract so these inserts do not create a parallel action style. */}
            <div className="flex flex-col items-start gap-3 lg:items-center">
              <div className={ctaWrapperClassName}>
                {opensStartProjectModal ? (
                  <StartProjectButton
                    size="lg"
                    source="inline-cta-card"
                    className="min-w-55"
                  >
                    {primaryCtaLabel}
                    <ArrowRight className="size-4" />
                  </StartProjectButton>
                ) : (
                  <Button asChild size="lg" className="min-w-55">
                    <Link href={primaryCtaHref}>
                      {primaryCtaLabel}
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                )}
              </div>
              {secondaryCtaLabel && secondaryCtaHref ? (
                isStartProjectHref(secondaryCtaHref) ? (
                  <StartProjectButton
                    size="sm"
                    variant="secondary"
                    source="cta-card-secondary"
                    className="min-w-55"
                  >
                    {secondaryCtaLabel}
                  </StartProjectButton>
                ) : (
                  <Button asChild variant="secondary" size="sm" className="min-w-55 text-muted-foreground hover:text-foreground">
                    <Link href={secondaryCtaHref}>{secondaryCtaLabel}</Link>
                  </Button>
                )
              ) : null}
            </div>
          </div>
        </PremiumSurface>
      </StudioPageContainer>
    </section>
  );
}
