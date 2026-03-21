import type { LucideIcon } from "lucide-react";
import {
  Bot,
  LineChart,
  Sparkles,
} from "lucide-react";

import type {
  StudioHomepageServiceItem,
  StudioHomepageServicesContent,
} from "@/components/studio/studio-homepage-content";
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
    accentClassName: "text-[var(--purple-500)]",
  },
  {
    icon: Bot,
    accentClassName: "text-[var(--orange-500)]",
  },
  {
    icon: LineChart,
    accentClassName: "text-[var(--lavender-500)]",
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
      className="relative overflow-hidden bg-white px-6 py-14 md:px-10 md:py-20"
    >
      {/* The background keeps the same homepage rails while adding a softer aurora concentration near the lower edge. */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.042)_1px,transparent_1px)] bg-[size:120px_100%]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(148,163,184,0.021)_1px,transparent_1px)] bg-[size:100%_120px]" />
        <div className="absolute bottom-[-8rem] left-1/2 h-[24rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(88,41,199,0.16)_0%,rgba(203,195,223,0.16)_34%,rgba(255,202,45,0.12)_56%,rgba(255,255,255,0)_78%)] blur-3xl" />
        <div className="absolute inset-y-0 left-1/2 hidden w-full max-w-7xl -translate-x-1/2 px-6 md:block md:px-10">
          <div className="absolute inset-y-0 left-0 w-px bg-slate-200/80" />
          <div className="absolute inset-y-0 right-0 w-px bg-slate-200/80" />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10">
        {/* The intro now mirrors the work section's editorial hierarchy so both homepage sections feel cut from the same system. */}
        <div className="max-w-6xl space-y-5 lg:pl-10 xl:pl-14">
          <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
            {content.eyebrow}
          </p>
          <h2 className="text-hero-support max-w-5xl text-[var(--neutral-950)]">
            <strong>{content.headline}</strong>
          </h2>
          <p className="text-display-muted-editorial max-w-6xl">
            {content.supportPrefix}{" "}
            <span className="text-[var(--color-text-brand)]">
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

                return (
                  <PremiumSurface
                    key={service.title}
                    tone="glassSubtle"
                    elevation="none"
                    blur="sm"
                    radius="md"
                    className={[
                      "relative min-h-[18rem] rounded-none border-0 px-5 py-5 sm:p-5 md:min-h-[19rem] md:p-6 lg:p-7",
                      "border-b border-slate-200/80 md:border-b-0",
                      showDesktopDivider ? "md:border-r md:border-slate-200/80" : "",
                    ].join(" ")}
                  >
                    {/* Each column now reads more like an editorial metric block than a standard feature card. */}
                    <div className="space-y-5 text-left">
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-display text-[clamp(3.1rem,5vw,4.3rem)] leading-none tracking-[-0.08em] text-[color:color-mix(in_srgb,var(--neutral-700)_68%,white)]">
                          {`${index + 1}`.padStart(2, "0")}
                        </p>
                        <div className="flex size-11 items-center justify-center rounded-full border border-white/70 bg-white/88 shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
                          <Icon className={["size-5", service.accentClassName].join(" ")} />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="max-w-[10ch] font-display text-[clamp(1.8rem,3vw,2.7rem)] font-medium leading-[0.94] tracking-[-0.055em] text-[var(--neutral-950)]">
                          {service.title}
                        </h3>
                        <p className="max-w-[20ch] text-heading-sm font-medium text-[var(--neutral-700)]">
                          {service.shortLabel}
                        </p>
                        <p className="max-w-[30ch] text-body-md text-[var(--color-text-secondary)]">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </PremiumSurface>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
