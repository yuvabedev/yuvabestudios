"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import type { StudioHomepageNavItem } from "@/components/studio/studio-homepage-content";
import { StudioHeader } from "@/components/studio/studio-header";
import { StudioPageContainer } from "@/components/studio/studio-page-shell";
import { StartProjectButton } from "@/components/studio/start-project-button";

type ServiceBlock = {
  slug: string;
  title: string;
  shortLabel: string;
  description: string;
  capabilities: string[];
  image: string;
  imageAlt: string;
  href?: string;
};

const services: ServiceBlock[] = [
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortLabel: "Campaigns built for traction",
    description:
      "Positioning, landing pages, and growth loops that turn a launch into measurable momentum. We connect message, channel, and analytics so every campaign teaches you what to scale next.",
    capabilities: [
      "Positioning & Messaging",
      "Landing Pages & Conversion",
      "Performance Campaigns",
      "Content & Social Systems",
      "SEO & Organic Growth",
      "Analytics & Growth Loops",
    ],
    image: "/assets/av-marathon/cover.png",
    imageAlt: "Rangsutra brand and campaign work by Yuvabe Studios",
    href: "/digital-marketing",
  },
  {
    slug: "uiux-design",
    title: "UI/UX Design & Development",
    shortLabel: "Interfaces people actually use",
    description:
      "Research-led product design and front-end builds shaped around real user context. We move from flows and systems to shipped interfaces that stay clear, fast, and on-brand.",
    capabilities: [
      "UX Research & Discovery",
      "Product Flows & Wireframes",
      "Design Systems",
      "Interface & Visual Design",
      "Interactive Prototyping",
      "Front-end Development",
    ],
    image: "/assets/KK/mock-detail.png",
    imageAlt: "TVAM product interface design by Yuvabe Studios",
    href: "/uiux-design",
  },
  {
    slug: "ai-native-engineering",
    title: "AI-Native Engineering",
    shortLabel: "End-to-end build, shipped right",
    description:
      "Product strategy and AI-native apps engineered from brief to launch. RAG systems, full-stack web and mobile, and the cloud infrastructure to run them reliably at scale.",
    capabilities: [
      "AI Product Strategy",
      "RAG & LLM Systems",
      "Full-stack Web & Mobile Apps",
      "Backend & API Engineering",
      "Cloud Infrastructure & CI/CD",
      "Admin & Internal Platforms",
    ],
    image: "/assets/tvam/cover-detail.png",
    imageAlt: "AgeShift admin platform engineered by Yuvabe Studios",
    href: "/ai-native-engineering",
  },
  {
    slug: "market-research",
    title: "Market Research",
    shortLabel: "Decisions backed by evidence",
    description:
      "AI-assisted market and customer intelligence that turns messy signals into decision-ready clarity. We help founders frame the right problem before committing build resources to it.",
    capabilities: [
      "Market & Competitor Analysis",
      "Customer & User Research",
      "Opportunity Sizing",
      "Insight Synthesis",
      "Data Analysis",
      "Decision Support",
    ],
    image: "/assets/bevolve/cover-detail.png",
    imageAlt:
      "Bevolve ESG insights and benchmarking platform by Yuvabe Studios",
  },
];

const processSteps = [
  {
    title: "Frame",
    description:
      "We pressure-test the problem, the wedge, and the assumptions worth betting on before anything gets built.",
  },
  {
    title: "Prototype",
    description:
      "AI compresses the path from idea to artifact, so richer, more believable versions arrive far earlier.",
  },
  {
    title: "Test",
    description:
      "Real users react to something concrete, generating evidence instead of opinions about what works.",
  },
  {
    title: "Decide",
    description:
      "We read the signal together and choose to persevere, refine, or pivot — sequencing the next bet with intent.",
  },
];

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

const viewportOnce = { once: true, amount: 0.3 } as const;

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-5 inline-block font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-brand">
      {children}
    </span>
  );
}

type ServicesPageProps = {
  navigationItems: StudioHomepageNavItem[];
};

export function ServicesPage({ navigationItems }: ServicesPageProps) {
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = shouldReduceMotion ?? false;

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
        <section className="pb-20 pt-36 md:pb-24 md:pt-48">
          <div className="mx-auto w-full max-w-[1720px] px-6 md:px-12 lg:px-16">
            <motion.div
              className="max-w-5xl"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut }}
            >
              <h1
                className="text-hero-display mb-8 text-(--neutral-950)"
                style={{ fontWeight: 600 }}
              >
                A full-service digital innovation partner
              </h1>
              <p className="max-w-xl text-[clamp(1.15rem,1.7vw,1.5rem)] leading-[1.45] text-(--color-text-secondary)">
                We help founders decide what to build, ship it fast, and iterate
                toward traction — one team, fewer handoffs.
              </p>
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
              <Kicker>What we do</Kicker>
              <h2 className="max-w-4xl text-display-muted-editorial text-(--neutral-950)">
                Four capabilities that compound when they run as one system.
              </h2>
            </div>

            <div className="space-y-28 md:space-y-40">
              {services.map((service, index) => {
                const imageFirst = index % 2 === 1;
                return (
                  <motion.div
                    key={service.title}
                    id={service.slug}
                    className="grid scroll-mt-28 items-center gap-12 lg:grid-cols-2 lg:gap-20 md:scroll-mt-32"
                    variants={blockStagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportOnce}
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
                      <div className="relative mx-auto aspect-630/820 w-full max-w-157.5 overflow-hidden rounded-3xl border border-(--color-border-default) bg-(--neutral-100) shadow-[0_32px_80px_rgba(17,17,17,0.10)]">
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
              <Kicker>How we work</Kicker>
              <h2 className="max-w-4xl text-display-muted-editorial text-(--neutral-950)">
                The startup workflow changed. We&apos;re built for the new one.
              </h2>
              <p className="mt-4 max-w-2xl text-body-lg text-(--color-text-secondary)">
                Making is cheaper than ever, so the edge moved upstream — to
                framing, judgment, and tighter loops. Every engagement runs on
                the same operating model.
              </p>
            </div>

            <motion.div
              className="grid gap-4 lg:grid-cols-4 lg:pl-4 xl:pl-6"
              variants={blockStagger}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              {processSteps.map((step, index) => (
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
                  Have a bet worth making?
                </span>
                <h2 className="careers-cta-heading mb-6 text-(--neutral-900)">
                  One team to{" "}
                  <em className="font-medium not-italic text-brand">
                    shape, ship, and grow
                  </em>{" "}
                  the product.
                </h2>
                <p className="mx-auto mb-10 max-w-130 text-base leading-relaxed text-(--neutral-600) md:text-lg">
                  Tell us what you&apos;re building. We&apos;ll help you decide
                  what matters, move fast, and turn early signal into traction.
                </p>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                  <StartProjectButton
                    size="lg"
                    source="services-page-cta"
                    className="w-full rounded-full px-7 py-4 text-[15px] sm:w-auto"
                  >
                    Start a project
                    <ArrowRight size={16} />
                  </StartProjectButton>
                  <a
                    href="mailto:sales@yuvabe.com"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-(--color-border-default) bg-white px-7 py-4 text-[13px] font-semibold text-(--neutral-700) transition-all hover:border-brand/30 hover:text-brand sm:w-auto sm:text-[15px]"
                  >
                    sales@yuvabe.com
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
