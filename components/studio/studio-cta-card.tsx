import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { StudioPageContainer } from "@/components/studio/studio-page-shell";
import { StartProjectButton } from "@/components/studio/start-project-button";
import { Button } from "@/components/ui/button";
import { PremiumSurface } from "@/components/ui/premium-surface";
import { isStartProjectHref } from "@/lib/start-project";

type StudioCtaCardProps = {
  eyebrow: string;
  title: string;
  description?: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  sectionClassName?: string;
  containerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  contentLayout?: "split" | "stacked";
};

// This shared CTA card keeps homepage inserts and the About page aligned to one premium conversion surface.
export function StudioCtaCard({
  eyebrow,
  title,
  description,
  primaryCtaLabel,
  primaryCtaHref,
  sectionClassName = "bg-white py-16 md:py-20",
  containerClassName = "lg:px-10 xl:px-14",
  titleClassName = "max-w-4xl text-section-display text-[var(--neutral-950)]",
  descriptionClassName = "max-w-3xl text-body-lg text-[var(--color-text-secondary)]",
  contentLayout = "split",
}: StudioCtaCardProps) {
  const opensStartProjectModal = isStartProjectHref(primaryCtaHref);
  const contentLayoutClassName =
    contentLayout === "stacked"
      ? "relative z-10 flex flex-col items-center gap-6 text-center"
      : "relative z-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end";

  return (
    <section className={sectionClassName}>
      <StudioPageContainer className={containerClassName}>
        <PremiumSurface
          tone="glass"
          elevation="lg"
          blur="lg"
          radius="xl"
          className="overflow-hidden p-8 transition-transform duration-300 ease-out hover:[transform:perspective(1600px)_rotateX(0.8deg)_rotateY(-1.8deg)] md:p-10"
        >
          <div aria-hidden="true" className="absolute inset-0">
            <div className="absolute right-[-8rem] top-[-8rem] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(255,202,45,0.18)_0%,rgba(255,202,45,0)_72%)] blur-3xl" />
            <div className="absolute left-[-8rem] bottom-[-8rem] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(88,41,199,0.16)_0%,rgba(88,41,199,0)_72%)] blur-3xl" />
          </div>

          {/* The content column stays editorial while the action area keeps one clear next step. */}
          <div className={contentLayoutClassName}>
            <div className="space-y-4">
              {eyebrow ? (
                <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
                  {eyebrow}
                </p>
              ) : null}
              <h2 className={titleClassName}>{title}</h2>
              {description ? (
                <p className={descriptionClassName}>{description}</p>
              ) : null}
            </div>

            {/* The CTA button reuses the shared contract so these inserts do not create a parallel action style. */}
            <div className="flex items-start justify-center">
              {opensStartProjectModal ? (
                <StartProjectButton
                  size="lg"
                  source="inline-cta-card"
                  className="min-w-[220px]"
                >
                  {primaryCtaLabel}
                  <ArrowRight className="size-4" />
                </StartProjectButton>
              ) : (
                <Button asChild size="lg" className="min-w-[220px]">
                  <Link href={primaryCtaHref}>
                    {primaryCtaLabel}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </PremiumSurface>
      </StudioPageContainer>
    </section>
  );
}
