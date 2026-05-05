import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  LineChart,
  Palette,
  Sparkles,
} from "lucide-react";

import type {
  StudioHomepageServiceItem,
  StudioHomepageServicesContent,
} from "@/components/studio/studio-homepage-content";
import {
  StudioPageContainer,
  StudioPageRails,
} from "@/components/studio/studio-page-shell";
import { PremiumSurface } from "@/components/ui/premium-surface";

type StudioServiceItem = StudioHomepageServiceItem & {
  icon: LucideIcon;
  accentClassName: string;
};

const serviceDecorators: Array<
  Pick<StudioServiceItem, "icon" | "accentClassName">
> = [
    {
      icon: Sparkles,
      accentClassName: "text-(--purple-500)",
    },
    {
      icon: Palette,
      accentClassName: "text-(--orange-500)",
    },
    {
      icon: LineChart,
      accentClassName: "text-(--lavender-500)",
    },
  ];

function getDecoratedServices(items: StudioHomepageServiceItem[]) {
  return items.map((item, index) => ({
    ...item,
    ...serviceDecorators[index % serviceDecorators.length],
  }));
}

type StudioServicesProps = {
  content: StudioHomepageServicesContent;
};

// The services grid adapts the cleaner Stripe-style backbone layout into Yuvabe's light premium system.
export function StudioServices({ content }: StudioServicesProps) {
  const studioServices = getDecoratedServices(content.items);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white py-14 md:py-20"
    >
      <div id="process" aria-hidden="true" className="absolute top-0" />

      {/* The background keeps the same homepage rails while adding a softer aurora concentration near the lower edge. */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.042)_1px,transparent_1px)] bg-size-[120px_100%]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(148,163,184,0.021)_1px,transparent_1px)] bg-size-[100%_120px]" />
        <div className="-bottom-32 absolute left-1/2 h-96 w-160 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(88,41,199,0.16)_0%,rgba(203,195,223,0.16)_34%,rgba(255,202,45,0.12)_56%,rgba(255,255,255,0)_78%)] blur-3xl" />
        <StudioPageRails />
      </div>

      <StudioPageContainer className="relative z-10 flex flex-col gap-10">
        {/* The intro now mirrors the work section's editorial hierarchy so both homepage sections feel cut from the same system. */}
        <div className="max-w-6xl space-y-5 lg:pl-10 xl:pl-14">
          <p className="text-label-sm uppercase tracking-[0.22em] text-(--color-text-tertiary)">
            {content.eyebrow}
          </p>
          <h2
            className="max-w-5xl text-display-muted-editorial tracking-[-0.032em] [word-spacing:0.02em] text-(--neutral-950)"
            style={{ fontSize: "3.5rem", fontWeight: 600, wordSpacing: ".2rem" }}
          >
            <strong style={{ fontWeight: "inherit" }}>{content.headline}</strong>
          </h2>
          <p className="text-hero-support max-w-6xl">
            {content.supportPrefix}{" "}
            <span className="text-(--color-text-brand)">
              {content.supportHighlight}
            </span>{" "}
            {content.supportSuffix}
          </p>
        </div>

        {/* The bordered frame mirrors the reference more closely while the cards stay on Yuvabe's lighter premium surface contract. */}
        <div className="lg:px-10 xl:px-14">
          <div className="overflow-hidden border-y border-slate-200/80">
            <div className="grid md:grid-cols-3">
              {studioServices.map((service, index) => {
                const Icon = service.icon;
                const showDesktopDivider = index < studioServices.length - 1;
                const cardClassName = [
                  "relative min-h-[18rem] rounded-none border-0 px-5 py-5 sm:p-5 md:min-h-[19rem] md:p-6 lg:p-7",
                  "border-b border-slate-200/80 md:border-b-0",
                  showDesktopDivider
                    ? "md:border-r md:border-slate-200/80"
                    : "",
                ].join(" ");

                const cardInner = (
                  <div className="space-y-5 text-left">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-heading-lg text-[color-mix(in_srgb,var(--neutral-700)_68%,white)]">
                        {`${index + 1}`.padStart(2, "0")}
                      </p>
                      <div className="flex size-11 items-center justify-center rounded-full border border-white/70 bg-white/88 shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
                        <Icon
                          className={["size-5", service.accentClassName].join(
                            " ",
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="max-w-[8.5ch] text-display-muted-editorial leading-[0.9]">
                        {service.title}
                      </h3>
                      <p className="max-w-[20ch] text-body-md font-bold text-(--color-text-brand)">
                        <strong>{service.shortLabel}</strong>
                      </p>
                      <p className="max-w-[30ch] text-body-md text-(--color-text-secondary)">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );

                return (
                  service.href ? (
                    <PremiumSurface
                      key={service.title}
                      asChild
                      tone="glassSubtle"
                      elevation="none"
                      blur="sm"
                      radius="md"
                      className={cardClassName}
                    >
                      <Link
                        href={service.href}
                        className="group block h-full transition-transform duration-300 ease-out hover:transform-[perspective(1200px)_rotateX(0.4deg)_translateY(-2px)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/20 focus-visible:ring-offset-2"
                      >
                        {/* Linked service cards keep the same structure while adding a subtle premium hover response. */}
                        {cardInner}
                      </Link>
                    </PremiumSurface>
                  ) : (
                    <PremiumSurface
                      key={service.title}
                      tone="glassSubtle"
                      elevation="none"
                      blur="sm"
                      radius="md"
                      className={cardClassName}
                    >
                      {/* Each column now reads more like an editorial metric block than a standard feature card. */}
                      {cardInner}
                    </PremiumSurface>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </StudioPageContainer>
    </section>
  );
}