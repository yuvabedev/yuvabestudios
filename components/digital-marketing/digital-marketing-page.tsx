import type { StudioHomepageNavItem } from "@/components/studio/studio-homepage-content";
import type { StudioDigitalMarketingContent } from "@/components/studio/studio-digital-marketing-content";
import {
  ArrowRight,
  LayoutTemplate,
  LineChart,
  Megaphone,
  PenTool,
  type LucideIcon,
} from "lucide-react";
import { ServiceWorkGrid } from "@/components/shared/service-work-grid";
import { PageHero } from "@/components/digital-marketing/page-hero";
import { StudioHeader } from "@/components/studio/studio-header";
import { StudioPageContainer } from "@/components/studio/studio-page-shell";
import { GlowCard } from "@/components/ui/spotlight-card";
import { StartProjectLink } from "@/components/studio/start-project-link";

type DigitalMarketingPageProps = {
  navigationItems: StudioHomepageNavItem[];
  content: StudioDigitalMarketingContent;
};

const serviceIconMap: Record<
  StudioDigitalMarketingContent["services"][number]["iconKey"],
  LucideIcon
> = {
  megaphone: Megaphone,
  layout: LayoutTemplate,
  penTool: PenTool,
  lineChart: LineChart,
};

const dmClientLogos = [
  { name: "NorthSouth Foundation", src: "/logos/nsf.svg", imageClass: "h-14 w-auto max-w-42" },
  { name: "Solitude Farm", src: "/logos/solitude-farm.svg", imageClass: "h-14 w-auto max-w-28" },
  { name: "Rangsutra", src: "/logos/rangsutra.svg", imageClass: "h-14 w-auto max-w-42" },
  { name: "Matrimandir", src: "/logos/matrimandir.svg", imageClass: "h-14 w-auto max-w-42" },
  { name: "TVAM", src: "/assets/tvam/logo.svg", imageClass: "h-14 w-auto max-w-28" },
  { name: "General Aeronautics", src: "/assets/general-aeronautics/logo.svg", imageClass: "h-9 w-auto max-w-32" },
  { name: "KittyKat", src: "/assets/KK/logo.svg", imageClass: "h-14 w-auto max-w-28" },
];

const logoClass = "object-contain opacity-60 grayscale transition-[opacity,filter] duration-200 hover:opacity-100 hover:grayscale-0";

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-5 inline-block font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-brand">
      {children}
    </span>
  );
}

export function DigitalMarketingPage({
  navigationItems,
  content,
}: DigitalMarketingPageProps) {
  return (
    <main
      data-studio-shell
      className="relative min-h-screen overflow-x-clip overflow-y-visible bg-(--neutral-50) text-foreground"
    >
      <StudioHeader navigationItems={navigationItems} />

      <article className="relative">
        <PageHero content={content.hero} />

        {/* 02 — Client logos (static grid) */}
        <section className="relative border-b border-(--color-border-default) bg-white py-14 md:py-20">
          <div className="mx-auto w-full max-w-[1720px] px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-14 sm:grid-cols-3 md:gap-y-20 lg:grid-cols-5">
              {dmClientLogos.map((logo) => (
                <span
                  key={logo.name}
                  className="inline-flex items-center justify-center"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className={`${logo.imageClass} ${logoClass}`}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 03 — Case studies (work-page editorial layout) */}
        <section id="case-studies" className="relative overflow-hidden border-b border-(--color-border-default) bg-white py-14 md:py-20">
          <div className="mx-auto w-full max-w-[1720px] space-y-12 px-6 md:space-y-16 md:px-12 lg:px-16">
            <div className="max-w-4xl space-y-4">
              <Kicker>Case studies</Kicker>
              <h2 className="max-w-5xl text-display-muted-editorial text-(--neutral-950)">
                {content.caseStudiesTitle}
              </h2>
              <p className="text-body-lg text-(--color-text-secondary)">
                {content.caseStudiesDescription}
              </p>
            </div>
            <ServiceWorkGrid
              items={content.caseStudies.map((caseStudy) => ({
                key: caseStudy.slug,
                title: caseStudy.title,
                summary: caseStudy.description,
                href: `/case-studies/${caseStudy.slug}`,
                imageSrc: caseStudy.thumbnailSrc ?? null,
                category: caseStudy.category,
                tags: caseStudy.services,
              }))}
            />
          </div>
        </section>

        {/* 04 — How we approach it */}
        {content.approach && (
          <section className="relative overflow-hidden border-b border-(--color-border-default) bg-white py-14 md:py-20">
            <StudioPageContainer className="space-y-10">
              <div className="max-w-4xl space-y-3 lg:pl-4 xl:pl-6">
                <Kicker>{content.approach.label}</Kicker>
                <h2 className="text-display-muted-editorial text-(--neutral-950)">
                  {content.approach.headline}
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-3 lg:pl-4 xl:pl-6">
                {content.approach.principles.map((principle, index) => (
                  <GlowCard
                    key={principle.title}
                    customSize
                    glowColor="purple"
                    className="h-full bg-white! p-7!"
                  >
                    <div className="flex h-full flex-col">
                      <div className="mb-5 flex items-center gap-3">
                        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-brand/10 font-mono text-[11px] font-semibold text-brand">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="h-px flex-1 bg-(--neutral-200)" />
                      </div>
                      <h3 className="mb-3 text-heading-md font-semibold tracking-wide text-(--neutral-950)">
                        {principle.title}
                      </h3>
                      <p className="text-body-md leading-relaxed text-(--color-text-secondary)">
                        {principle.description}
                      </p>
                    </div>
                  </GlowCard>
                ))}
              </div>
            </StudioPageContainer>
          </section>
        )}

        {/* 05 — Services list */}
        <section className="relative overflow-hidden border-b border-(--color-border-default) bg-white py-14 md:py-20">
          <StudioPageContainer className="space-y-8">
            <div className="lg:pl-4 xl:pl-6">
              <Kicker>Our services</Kicker>
              <h2 className="max-w-4xl text-display-muted-editorial text-(--neutral-950)">
                {content.servicesTitle}
              </h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-2 lg:pl-4 xl:pl-6">
              {content.services.map((service) => {
                const Icon = serviceIconMap[service.iconKey];
                return (
                  <GlowCard
                    key={service.title}
                    customSize
                    glowColor="purple"
                    className="h-full bg-white! p-6!"
                  >
                    <div className="flex h-full items-start gap-4">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
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
                  </GlowCard>
                );
              })}
            </div>
          </StudioPageContainer>
        </section>

        {/* 07 — CTA */}
        <section className="px-6 py-16 md:px-10 md:py-20 bg-white">
          <StudioPageContainer>
            <div className="careers-cta-surface relative overflow-hidden rounded-4xl px-6 py-14 text-center sm:px-10 sm:py-20 md:px-16 md:py-28">
              <div
                className="careers-cta-glow-primary pointer-events-none absolute -left-32 -top-48 size-150 rounded-full opacity-70"
                aria-hidden="true"
              />
              <div
                className="careers-cta-glow-accent pointer-events-none absolute -bottom-52 -right-40 size-150 rounded-full opacity-50"
                aria-hidden="true"
              />
              <div className="relative">
                <span className="mb-6 inline-block font-mono text-[12px] font-medium uppercase tracking-[0.04em] text-brand">
                  Need digital growth momentum?
                </span>
                <h2 className="careers-cta-heading mb-6 text-(--neutral-900)">
                  Growth campaigns built around{" "}
                  <em className="font-medium not-italic text-brand">
                    what you need to scale
                  </em>{" "}
                  — not vanity metrics.
                </h2>
                <p className="mx-auto mb-10 max-w-130 text-base leading-relaxed text-(--neutral-600) md:text-lg">
                  We align positioning, landing pages, campaign execution, and analytics so every launch teaches you what to scale next.
                </p>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                  <StartProjectLink
                    source="digital-marketing-page"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(88,41,199,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(88,41,199,0.35)] sm:w-auto"
                  >
                    Start a project
                    <ArrowRight size={16} />
                  </StartProjectLink>
                  <a
                    href="mailto:hello@yuvabestudios.com"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-(--color-border-default) bg-white px-7 py-4 text-[13px] font-semibold text-(--neutral-700) transition-all hover:border-brand/30 hover:text-brand sm:w-auto sm:text-[15px]"
                  >
                    hello@yuvabestudios.com
                  </a>
                </div>
              </div>
            </div>
          </StudioPageContainer>
        </section>
      </article>
    </main>
  );
}
