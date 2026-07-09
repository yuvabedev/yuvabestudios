"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import type { StudioHomepageNavItem } from "@/components/studio/studio-homepage-content";
import type { ServicesPageContent } from "@/lib/services-content";
import { StudioHeader } from "@/components/studio/studio-header";
import { StudioPageContainer } from "@/components/studio/studio-page-shell";
import { StartProjectButton } from "@/components/studio/start-project-button";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const blockStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const copyReveal: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } },
};

// once: false so blocks re-animate every time they scroll back into view.
const viewportReveal = { once: false, amount: 0.3 } as const;

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-5 inline-block font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-brand">
      {children}
    </span>
  );
}

// Words wrapped in *asterisks* in the CMS render in brand color.
function renderHighlightedTitle(title: string) {
  return title.split(/(\*[^*]+\*)/g).map((part, index) => {
    if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
      return (
        <span key={index} className="font-medium text-brand">
          {part.slice(1, -1)}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

type ServicesPageProps = {
  navigationItems: StudioHomepageNavItem[];
  content: ServicesPageContent;
};

export function ServicesPage({ navigationItems, content }: ServicesPageProps) {
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = shouldReduceMotion ?? false;
  const { hero, overview, process, cta } = content;

  // Images slide in from the side they sit on, falling back to a plain fade when motion is reduced.
  const imageReveal = (fromLeft: boolean): Variants => ({
    hidden: { opacity: 0, x: reduceMotion ? 0 : fromLeft ? -44 : 44 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeOut } },
  });

  return (
    <main
      data-studio-shell
      className="relative min-h-screen overflow-x-clip overflow-y-visible bg-white text-foreground"
    >
      <StudioHeader navigationItems={navigationItems} />

      <article className="relative">
        {/* 01 — Hero */}
        <section className="relative overflow-hidden pb-20 pt-36 md:pb-24 md:pt-48">
          {/* Ambient gradient blush so the open right side reads intentional, matching the homepage hero. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-24 size-[44rem] rounded-full bg-[radial-gradient(circle_at_32%_30%,rgba(88,41,199,0.16),rgba(255,255,255,0)_70%)] blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-10 top-64 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,202,45,0.16),rgba(255,255,255,0)_72%)] blur-3xl"
          />
          <div className="relative z-10 mx-auto w-full max-w-[1720px] px-6 md:px-12 lg:px-16">
            <motion.div
              className="max-w-5xl"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut }}
            >
              <h1
                className="mb-8 text-[64px] leading-[1.05] tracking-[-0.03em] text-(--neutral-950)"
                style={{ fontWeight: 600 }}
              >
                {renderHighlightedTitle(hero.title)}
              </h1>
              <p className="max-w-xl text-[clamp(1.15rem,1.7vw,1.5rem)] leading-[1.45] text-(--color-text-secondary)">
                {hero.description}
              </p>
              {hero.ctaLabel && hero.ctaHref && (
                <Link
                  href={hero.ctaHref}
                  className="group mt-10 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-[15px] font-semibold text-white transition-all hover:opacity-90"
                >
                  {hero.ctaLabel}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              )}
            </motion.div>
          </div>
        </section>

        {/* 02 — Services (Clay-style alternating blocks) */}
        <section
          id="services"
          className="relative overflow-hidden border-b border-(--color-border-default) bg-white py-16 md:py-24"
        >
          <div className="mx-auto w-full max-w-[1720px] px-6 md:px-12 lg:px-16">
            <div className="mb-16 max-w-4xl lg:mb-24">
              <Kicker>{overview.kicker}</Kicker>
              <h2 className="max-w-4xl text-display-muted-editorial text-(--neutral-950)">
                {overview.heading}
              </h2>
            </div>

            <div className="space-y-28 md:space-y-40">
              {overview.items.map((service, index) => {
                const imageFirst = index % 2 === 1;
                return (
                  <motion.div
                    key={service.title}
                    id={service.slug}
                    className="grid scroll-mt-28 items-center gap-12 lg:grid-cols-2 lg:gap-20 md:scroll-mt-32"
                    variants={blockStagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportReveal}
                  >
                    {/* Copy column */}
                    <motion.div
                      variants={copyReveal}
                      className={imageFirst ? "lg:order-2" : "lg:order-1"}
                    >
                      <span className="mb-5 inline-flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.04em] text-brand">
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <span className="h-px w-8 bg-brand/40" />
                        {service.shortLabel}
                      </span>
                      <h3 className="text-heading-xl font-semibold text-(--neutral-950) md:text-[52px] md:leading-[1.05]">
                        {service.title}
                      </h3>
                      <p className="mt-6 max-w-xl text-[26px] font-medium leading-[1.45] text-(--color-text-secondary)">
                        {service.description}
                      </p>

                      <ul className="mt-8 max-w-md border-t border-(--color-border-default)">
                        {service.capabilities.map((capability) => (
                          <li
                            key={capability}
                            className="border-b border-(--color-border-default) py-3.5 text-[20px] font-semibold text-(--neutral-900)"
                          >
                            {capability}
                          </li>
                        ))}
                      </ul>

                      {service.href && (
                        <Link
                          href={service.href}
                          className="group mt-8 inline-flex items-center gap-2 rounded-full border border-(--color-border-default) bg-white px-6 py-3 text-[14px] font-semibold text-(--neutral-900) transition-all hover:border-brand/30 hover:text-brand"
                        >
                          Explore {service.title}
                          <ArrowRight
                            size={16}
                            className="transition-transform group-hover:translate-x-0.5"
                          />
                        </Link>
                      )}
                    </motion.div>

                    {/* Visual column */}
                    <motion.div
                      variants={imageReveal(imageFirst)}
                      className={imageFirst ? "lg:order-1" : "lg:order-2"}
                    >
                      <div className="relative mx-auto aspect-630/820 w-full max-w-157.5 overflow-hidden border border-(--color-border-default) bg-(--neutral-100) shadow-[0_32px_80px_rgba(17,17,17,0.10)]">
                        <Image
                          src={service.image}
                          alt={service.imageAlt}
                          fill
                          sizes="(min-width: 1024px) 630px, 100vw"
                          className="object-cover"
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 04 — How we work */}
        <section className="relative overflow-hidden border-b border-(--color-border-default) bg-white py-16 md:py-24">
          <StudioPageContainer className="space-y-10">
            <div className="max-w-4xl lg:pl-4 xl:pl-6">
              <Kicker>{process.kicker}</Kicker>
              <h2 className="max-w-4xl text-display-muted-editorial text-(--neutral-950)">
                {process.heading}
              </h2>
              <p className="mt-4 max-w-2xl text-body-lg text-(--color-text-secondary)">
                {process.description}
              </p>
            </div>

            <motion.div
              className="grid gap-4 lg:grid-cols-4 lg:pl-4 xl:pl-6"
              variants={blockStagger}
              initial="hidden"
              whileInView="show"
              viewport={viewportReveal}
            >
              {process.steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  variants={fadeUp}
                  className="relative overflow-hidden rounded-2xl border border-(--color-border-default) bg-(--neutral-50) p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_20px_40px_rgba(17,17,17,0.08)]"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-brand/10 font-mono text-[11px] font-semibold text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-(--neutral-200)" />
                  </div>
                  <h3 className="mb-3 text-heading-md font-semibold tracking-wide text-(--neutral-950)">
                    {step.title}
                  </h3>
                  <p className="text-body-md leading-relaxed text-(--color-text-secondary)">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </StudioPageContainer>
        </section>

        {/* 05 — CTA */}
        <section className="px-6 py-16 md:px-10 md:py-20">
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
                  {cta.eyebrow}
                </span>
                <h2 className="careers-cta-heading mb-6 text-(--neutral-900)">
                  {cta.headingPrefix}{" "}
                  <em className="font-medium not-italic text-brand">
                    {cta.headingHighlight}
                  </em>{" "}
                  {cta.headingSuffix}
                </h2>
                <p className="mx-auto mb-10 max-w-130 text-base leading-relaxed text-(--neutral-600) md:text-lg">
                  {cta.description}
                </p>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                  <StartProjectButton
                    size="lg"
                    source="services-page-cta"
                    className="w-full rounded-full px-7 py-4 text-[15px] sm:w-auto"
                  >
                    {cta.primaryCtaLabel}
                    <ArrowRight size={16} />
                  </StartProjectButton>
                  <a
                    href={`mailto:${cta.contactEmail}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-(--color-border-default) bg-white px-7 py-4 text-[13px] font-semibold text-(--neutral-700) transition-all hover:border-brand/30 hover:text-brand sm:w-auto sm:text-[15px]"
                  >
                    {cta.contactEmail}
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
