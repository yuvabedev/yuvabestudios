import type { StudioHomepageNavItem } from "@/components/studio/studio-homepage-content";
import type { AiNativeEngineeringPageContent } from "@/components/ai-native-engineering/ai-native-engineering-content";
import {
  Bot,
  Cloud,
  Cpu,
  Database,
  Quote,
  type LucideIcon,
} from "lucide-react";
import { ServiceCaseStudyGrid } from "@/components/shared/service-case-study-grid";
import { PageHero } from "@/components/digital-marketing/page-hero";
import { StudioCtaCard } from "@/components/studio/studio-cta-card";
import { StudioHeader } from "@/components/studio/studio-header";
import {
  StudioPageContainer,
  StudioPageRails,
} from "@/components/studio/studio-page-shell";
import { PremiumSurface } from "@/components/ui/premium-surface";

type AiNativeEngineeringPageProps = {
  navigationItems: StudioHomepageNavItem[];
  content: AiNativeEngineeringPageContent;
};

const serviceIconMap: Record<
  AiNativeEngineeringPageContent["services"][number]["iconKey"],
  LucideIcon
> = {
  cpu: Cpu,
  database: Database,
  bot: Bot,
  cloud: Cloud,
};

const aiClientLogosBase = [
  { name: "Bevolve AI", src: "/assets/bevolve/logo.svg", imageClass: "h-16 w-auto max-w-28" },
  { name: "TVAM", src: "/assets/tvam/logo.svg", imageClass: "h-14 w-auto max-w-28" },
  { name: "KittyKat", src: "/assets/KK/logo.svg", imageClass: "h-14 w-auto max-w-28" },
  { name: "AgeShift", src: "/assets/ageshift/logo.svg", imageClass: "h-14 w-auto max-w-28" },
];

// Tile 3× so the marquee group is wide enough to fill any viewport without gaps.
const aiClientLogos = [...aiClientLogosBase, ...aiClientLogosBase, ...aiClientLogosBase];

const logoClass = "object-contain opacity-60 grayscale transition-[opacity,filter] duration-200 hover:opacity-100 hover:grayscale-0";

const gridOverlay = (
  <div aria-hidden="true" className="absolute inset-0">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.042)_1px,transparent_1px)] bg-size-[120px_100%]" />
    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(148,163,184,0.021)_1px,transparent_1px)] bg-size-[100%_120px]" />
    <StudioPageRails />
  </div>
);

export function AiNativeEngineeringPage({
  navigationItems,
  content,
}: AiNativeEngineeringPageProps) {
  return (
    <main
      data-studio-shell
      className="relative min-h-screen overflow-x-clip overflow-y-visible bg-white text-foreground"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <StudioPageRails />
        <div className="absolute inset-x-0 top-0 h-104 bg-[radial-gradient(circle_at_14%_0%,rgba(88,41,199,0.08),rgba(255,255,255,0)_34%),radial-gradient(circle_at_88%_0%,rgba(43,183,199,0.08),rgba(255,255,255,0)_30%)]" />
      </div>

      <StudioHeader navigationItems={navigationItems} />

      <article className="relative">
        <PageHero content={content.hero} />

        {/* 02 — Best fit + client logos */}
        {content.bestFit && (
          <section className="relative border-b border-slate-200/80 bg-white py-12 md:py-16">
            {gridOverlay}
            <StudioPageContainer className="relative z-10">
              <div className="max-w-4xl space-y-3 lg:pl-4 xl:pl-6">
                <p className="text-label-sm uppercase tracking-[0.22em] text-(--color-text-tertiary)">
                  {content.bestFit.label}
                </p>
                <p className="text-body-lg text-(--color-text-secondary)">
                  {content.bestFit.description}
                </p>
              </div>
            </StudioPageContainer>

            {/* Marquee logo strip — identical structure to the homepage StudioTrustStrip */}
            <div className="relative z-10 mt-8">
              <StudioPageContainer className="relative md:px-0">
                <div className="relative overflow-hidden">
                  <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-20 w-px bg-slate-200/80" />
                  <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-20 w-px bg-slate-200/80" />
                  <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.84),rgba(255,255,255,0))] md:w-28" />
                  <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-[linear-gradient(to_left,rgba(255,255,255,0.84),rgba(255,255,255,0))] md:w-28" />

                  <div className="marquee-viewport">
                    <div className="marquee-track py-6">
                      <div className="marquee-group">
                        {aiClientLogos.map((logo, i) => (
                          <span key={i} className="inline-flex flex-none items-center justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={logo.src} alt={logo.name} className={`${logo.imageClass} ${logoClass}`} loading="lazy" decoding="async" />
                          </span>
                        ))}
                      </div>
                      <div aria-hidden className="marquee-group">
                        {aiClientLogos.map((logo, i) => (
                          <span key={i} className="inline-flex flex-none items-center justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={logo.src} alt={logo.name} className={`${logo.imageClass} ${logoClass}`} loading="lazy" decoding="async" />
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </StudioPageContainer>
            </div>
          </section>
        )}

        {/* 03 — Case studies */}
        <section className="relative overflow-hidden border-b border-slate-200/80 bg-(--color-background-canvas) py-14 md:py-20">
          {gridOverlay}
          <StudioPageContainer className="relative z-10 space-y-10">
            <div className="max-w-4xl space-y-4 lg:pl-4 xl:pl-6">
              <h2 className="max-w-5xl text-display-muted-editorial text-(--neutral-950)">
                {content.caseStudiesTitle}
              </h2>
              <p className="text-body-lg text-(--color-text-secondary)">
                {content.caseStudiesDescription}
              </p>
            </div>
            <div className="lg:pl-4 xl:pl-6">
              <ServiceCaseStudyGrid items={content.caseStudies} heroClickable />
            </div>
          </StudioPageContainer>
        </section>

        {/* 04 — How we build it */}
        {content.approach && (
          <section className="relative overflow-hidden border-b border-slate-200/80 bg-white py-14 md:py-20">
            {gridOverlay}
            <StudioPageContainer className="relative z-10 space-y-10">
              <div className="max-w-4xl space-y-3 lg:pl-4 xl:pl-6">
                <p className="text-label-sm uppercase tracking-[0.22em] text-(--color-text-tertiary)">
                  {content.approach.label}
                </p>
                <h2 className="text-display-muted-editorial text-(--neutral-950)">
                  {content.approach.headline}
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-3 lg:pl-4 xl:pl-6">
                {content.approach.principles.map((principle, index) => (
                  <div key={principle.title} className="group relative">
                    {index < content.approach!.principles.length - 1 && (
                      <div
                        aria-hidden="true"
                        className="absolute top-8 left-full z-10 hidden h-px w-6 bg-linear-to-r from-slate-200 to-transparent md:block"
                      />
                    )}
                    <PremiumSurface
                      tone={(["tintLavender", "tintWarm", "tintCyan"] as const)[index % 3]}
                      elevation="sm"
                      blur="md"
                      radius="xl"
                      className="h-full space-y-5 p-7"
                    >
                      <div className="flex items-center gap-3">
                        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(88,41,199,0.12),rgba(88,41,199,0.06))] text-[11px] font-semibold tracking-wider text-(--color-text-brand) ring-1 ring-[rgba(88,41,199,0.16)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="h-px flex-1 bg-linear-to-r from-[rgba(88,41,199,0.12)] to-transparent" />
                      </div>

                      <h3 className="text-heading-md font-semibold tracking-wide text-(--neutral-950)">
                        {principle.title}
                      </h3>
                      <p className="text-body-md leading-relaxed text-(--color-text-secondary)">
                        {principle.description}
                      </p>
                    </PremiumSurface>
                  </div>
                ))}
              </div>
            </StudioPageContainer>
          </section>
        )}

        {/* 05 — Services list */}
        <section className="relative overflow-hidden border-b border-slate-200/80 bg-(--color-background-canvas) py-14 md:py-20">
          {gridOverlay}
          <StudioPageContainer className="relative z-10 space-y-8">
            <h2 className="max-w-4xl text-display-muted-editorial text-(--neutral-950) lg:pl-4 xl:pl-6">
              {content.servicesTitle}
            </h2>
            <div className="grid gap-4 lg:grid-cols-2 lg:pl-4 xl:pl-6">
              {content.services.map((service) => {
                const Icon = serviceIconMap[service.iconKey];

                return (
                  <PremiumSurface
                    key={service.title}
                    tone="glass"
                    elevation="sm"
                    blur="md"
                    radius="xl"
                    className="p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/88 text-(--color-text-brand) shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
                        <Icon className="size-5" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-heading-md font-semibold tracking-wide text-(--neutral-950)">
                          {service.title}
                        </h3>
                        <p className="text-body-md text-(--color-text-secondary)">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </PremiumSurface>
                );
              })}
            </div>
          </StudioPageContainer>
        </section>

        {/* 06 — Testimonial */}
        {content.pageTestimonial && (
          <section className="relative overflow-hidden border-b border-slate-200/80 bg-white py-14 md:py-20">
            {gridOverlay}
            <StudioPageContainer className="relative z-10">
              <PremiumSurface
                tone="glass"
                elevation="sm"
                blur="md"
                radius="xl"
                className="mx-auto max-w-3xl overflow-hidden p-8 text-center md:p-10"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(88,41,199,0.06),rgba(255,255,255,0)_60%),radial-gradient(circle_at_100%_100%,rgba(43,183,199,0.06),rgba(255,255,255,0)_60%)]"
                />

                <div className="relative space-y-6">
                  <div className="flex items-center justify-center gap-3">
                    <p className="text-label-sm uppercase tracking-[0.22em] text-(--color-text-tertiary)">
                      {content.pageTestimonial.label}
                    </p>
                    <Quote
                      className="size-6 text-(--color-text-tertiary) opacity-30"
                      strokeWidth={1.5}
                    />
                  </div>

                  <blockquote className="text-body-lg leading-[1.7] text-(--neutral-800) md:text-body-xl">
                    &ldquo;{content.pageTestimonial.quote}&rdquo;
                  </blockquote>

                  <div className="mx-auto h-px w-16 bg-linear-to-r from-transparent via-[rgba(88,41,199,0.3)] to-transparent" />

                  <div className="flex flex-col items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/assets/tvam/logo.svg"
                      alt="tvam"
                      className="h-12 w-auto shrink-0 object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                    <div>
                      <p className="text-body-sm font-semibold text-foreground">
                        {content.pageTestimonial.name}
                      </p>
                      <p className="text-body-sm text-(--color-text-secondary)">
                        {content.pageTestimonial.attribution}
                      </p>
                    </div>
                  </div>
                </div>
              </PremiumSurface>
            </StudioPageContainer>
          </section>
        )}

        {/* 07 — CTA */}
        <StudioCtaCard
          eyebrow="Have an AI product to build or an integration to fix?"
          title="We scope AI systems from architecture to deployment — so you ship something that works, not just something that demos."
          primaryCtaLabel="Start a project"
          primaryCtaHref="/#process"
          sectionOverlay={gridOverlay}
          sectionClassName="border-t border-slate-200/80 bg-white py-16 md:py-20"
        />
      </article>
    </main>
  );
}
