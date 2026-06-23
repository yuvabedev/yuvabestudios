"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import type { StudioHomepageNavItem } from "@/components/studio/studio-homepage-content";
import {
  getStudioCaseStudyHref,
  resolveStudioCaseStudyCoverSrc,
  type StudioCaseStudySummary,
} from "@/components/studio/studio-case-study-content";
import { StudioHeader } from "@/components/studio/studio-header";
import { StudioPageContainer } from "@/components/studio/studio-page-shell";

type WorkPageProps = {
  navigationItems: StudioHomepageNavItem[];
  caseStudies: StudioCaseStudySummary[];
};

// Curated discipline buckets keep the filter rail clean instead of exposing the
// long, inconsistent service-tag list stored per case study.
const WORK_CATEGORY = {
  product: "AI & Product",
  web: "Web & Brand",
  growth: "Growth & Marketing",
} as const;

type WorkCategory = (typeof WORK_CATEGORY)[keyof typeof WORK_CATEGORY];

const categoryById: Record<string, WorkCategory> = {
  "general-aeronautics": WORK_CATEGORY.web,
  tvam: WORK_CATEGORY.product,
  kittykat: WORK_CATEGORY.product,
  bevolve: WORK_CATEGORY.product,
  "prakiti-sattva": WORK_CATEGORY.web,
  ageshift: WORK_CATEGORY.product,
  hemplanet: WORK_CATEGORY.growth,
  "av-marathon": WORK_CATEGORY.growth,
  buglerock: WORK_CATEGORY.product,
  rangasutra: WORK_CATEGORY.web,
  matrimandir: WORK_CATEGORY.web,
  yuvanext: WORK_CATEGORY.product,
};

// Display order leads with the strongest visual covers, then fills out the roster.
const workOrder = [
  "general-aeronautics",
  "tvam",
  "kittykat",
  "bevolve",
  "prakiti-sattva",
  "ageshift",
  "hemplanet",
  "av-marathon",
  "buglerock",
  "rangasutra",
  "matrimandir",
  "yuvanext",
] as const;

// Hand-picked wide covers for the work grid. Falls back to the shared cover
// resolver, then to a branded gradient when no asset exists yet.
const workCoverOverrides: Record<string, string> = {
  "general-aeronautics": "/assets/general-aeronautics/cover-summary.jpeg",
  tvam: "/assets/tvam/cover.png",
  kittykat: "/assets/KK/mock-detail.png",
  bevolve: "/assets/bevolve/cover-detail.png",
  "prakiti-sattva": "/assets/prakritisattva/hair-care.webp",
  ageshift: "/assets/ageshift/ageshift_cover.png",
  hemplanet: "/assets/hemplanet/cover.png",
  "av-marathon": "/assets/av-marathon/cover.png",
  buglerock: "/assets/buglerock/homepage.png",
  // Asset folders are spelled rangsutra/martimandir (IDs use rangasutra/matrimandir).
  rangasutra: "/assets/rangsutra/poster_1.jpg",
  matrimandir: "/assets/martimandir/bg.png",
};

// Covers that come alive on hover. The still cover above acts as the poster.
const workVideoOverrides: Record<string, string> = {};

const gradientFallbacks = [
  "bg-[radial-gradient(circle_at_30%_25%,rgba(88,41,199,0.22),transparent_62%),radial-gradient(circle_at_82%_75%,rgba(249,169,31,0.18),transparent_58%)]",
  "bg-[radial-gradient(circle_at_75%_20%,rgba(88,41,199,0.18),transparent_60%),radial-gradient(circle_at_18%_80%,rgba(56,189,248,0.16),transparent_58%)]",
  "bg-[radial-gradient(circle_at_25%_80%,rgba(249,169,31,0.2),transparent_60%),radial-gradient(circle_at_80%_18%,rgba(88,41,199,0.2),transparent_58%)]",
];

type WorkItem = {
  id: string;
  title: string;
  summary: string;
  sector: string;
  services: string[];
  href: string;
  category: WorkCategory;
  imageSrc: string | null;
  videoSrc?: string;
};

const ALL_WORK = "All Work" as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

type WorkCardVariant = "feature" | "wide" | "narrow";

function WorkCard({
  item,
  index,
  variant,
  fallbackIndex,
}: {
  item: WorkItem;
  index: number;
  variant: WorkCardVariant;
  fallbackIndex: number;
}) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reduceMotion = useReducedMotion();
  const feature = variant === "feature";

  // The cover video stays paused on its first frame until the card is hovered.
  function playVideo() {
    const video = videoRef.current;
    if (video) void video.play().catch(() => {});
  }

  function resetVideo() {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }

  // Per-card scroll progress drives a gentle parallax drift on the cover.
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [34, -34]);
  const imageY = reduceMotion ? 0 : rawY;

  // Cap the media height to the viewport so the tall portrait covers never
  // overflow the screen on wide columns; object-cover handles the crop.
  const aspect =
    variant === "feature"
      ? "aspect-[16/9] max-h-[80vh]"
      : "aspect-[9/16] max-h-[78vh]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: easeOut, delay: (index % 2) * 0.08 }}
    >
      <Link
        ref={cardRef}
        href={item.href}
        className="group block focus-visible:outline-none"
        aria-label={`View the ${item.title} case study`}
        onMouseEnter={item.videoSrc ? playVideo : undefined}
        onMouseLeave={item.videoSrc ? resetVideo : undefined}
        onFocus={item.videoSrc ? playVideo : undefined}
        onBlur={item.videoSrc ? resetVideo : undefined}
      >
        <div
          className={`relative ${aspect} w-full overflow-hidden rounded-3xl bg-(--neutral-100) ring-1 ring-(--color-border-default) transition-shadow duration-500 group-hover:shadow-[0_30px_70px_-30px_rgba(17,17,17,0.45)]`}
        >
          {item.videoSrc ? (
            <motion.div
              style={{ y: imageY }}
              className="absolute inset-0 -top-[8%] h-[116%] w-full"
            >
              <video
                ref={videoRef}
                src={item.videoSrc}
                poster={item.imageSrc ?? undefined}
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                className="h-full w-full scale-[1.04] object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.1]"
              />
            </motion.div>
          ) : item.imageSrc ? (
            <motion.div
              style={{ y: imageY }}
              className="absolute inset-0 -top-[8%] h-[116%] w-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageSrc}
                alt={`${item.title} — ${item.summary}`}
                className="h-full w-full scale-[1.04] object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.1]"
                loading={feature ? "eager" : "lazy"}
                decoding="async"
              />
            </motion.div>
          ) : (
            <div
              className={`absolute inset-0 flex items-center justify-center bg-(--neutral-950) ${
                gradientFallbacks[fallbackIndex % gradientFallbacks.length]
              }`}
            >
              <span className="px-8 text-center font-mono text-2xl font-semibold uppercase tracking-[0.12em] text-white/85 transition-transform duration-700 ease-out group-hover:scale-105 sm:text-4xl">
                {item.title}
              </span>
            </div>
          )}

          {/* Hover scrim keeps the floating CTA legible over any cover. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Floating "view case study" pill — the clay-style micro reveal. */}
          <div className="pointer-events-none absolute right-4 top-4 translate-y-2 opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/85 px-4 py-2 text-[12px] font-medium text-white backdrop-blur">
              View case study
              <ArrowUpRight size={14} />
            </span>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <h3
            className={`font-semibold leading-tight text-(--neutral-950) transition-colors duration-200 group-hover:text-brand ${
              feature ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
            }`}
          >
            {item.title}
          </h3>
          <p className="max-w-2xl text-[15px] leading-relaxed text-(--color-text-secondary)">
            {item.summary}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-(--neutral-500)">
            <span className="text-(--color-text-brand)">{item.category}</span>
            {item.services.slice(0, 3).map((service) => (
              <span key={service} className="before:mr-2 before:content-['·']">
                {service}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function WorkPage({ navigationItems, caseStudies }: WorkPageProps) {
  const items = useMemo<WorkItem[]>(() => {
    const byId = new Map(caseStudies.map((cs) => [cs.id, cs]));
    return workOrder
      .map((id) => byId.get(id))
      .filter((cs): cs is StudioCaseStudySummary => Boolean(cs))
      .map((cs) => ({
        id: cs.id,
        title: cs.title,
        summary: cs.summary,
        sector: cs.sector,
        services: cs.services,
        href: getStudioCaseStudyHref(cs.id),
        category: categoryById[cs.id] ?? WORK_CATEGORY.product,
        imageSrc:
          workCoverOverrides[cs.id] ??
          resolveStudioCaseStudyCoverSrc(cs, "summary") ??
          null,
        videoSrc: workVideoOverrides[cs.id],
      }));
  }, [caseStudies]);

  const filters = useMemo(() => {
    const counts = new Map<string, number>();
    items.forEach((item) => {
      counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    });
    return [
      { label: ALL_WORK as string, count: items.length },
      ...Object.values(WORK_CATEGORY)
        .filter((category) => counts.has(category))
        .map((category) => ({ label: category, count: counts.get(category) ?? 0 })),
    ];
  }, [items]);

  const [activeFilter, setActiveFilter] = useState<string>(ALL_WORK);

  const visibleItems =
    activeFilter === ALL_WORK
      ? items
      : items.filter((item) => item.category === activeFilter);

  return (
    <main
      data-studio-shell
      className="relative min-h-screen overflow-x-clip overflow-y-visible bg-(--neutral-50) text-foreground"
    >
      <StudioHeader navigationItems={navigationItems} />

      <article className="relative">
        {/* Hero — big editorial statement with a clay-style filter rail. */}
        <section className="relative pb-10 pt-32 md:pb-14 md:pt-40">
          <div className="mx-auto w-full max-w-[1720px] px-6 md:px-12 lg:px-16">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: easeOut }}
                className="max-w-4xl"
              >
                <h1 className="text-display-xl text-(--neutral-950)">
                  Transforming ambitious visions into{" "}
                  <em className="font-medium not-italic text-brand">digital</em>{" "}
                  realities.
                </h1>
                <p className="text-body-lg mt-6 max-w-xl text-(--color-text-secondary)">
                  Products, platforms, and brands we&apos;ve shipped with
                  founders — built with AI-native execution across strategy,
                  design, engineering, and growth.
                </p>
              </motion.div>

              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: easeOut, delay: 0.12 }}
                className="flex flex-col gap-2 lg:min-w-56 lg:text-right"
              >
                {filters.map((filter) => {
                  const isActive = activeFilter === filter.label;
                  return (
                    <li key={filter.label} className="lg:flex lg:justify-end">
                      <button
                        type="button"
                        onClick={() => setActiveFilter(filter.label)}
                        className={`group inline-flex items-baseline gap-1.5 text-left text-lg font-medium transition-colors duration-200 lg:text-xl ${
                          isActive
                            ? "text-(--neutral-950)"
                            : "text-(--neutral-400) hover:text-(--neutral-700)"
                        }`}
                      >
                        <span
                          className={`relative ${
                            isActive
                              ? "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-(--neutral-950)"
                              : ""
                          }`}
                        >
                          {filter.label}
                        </span>
                        <span className="font-mono text-[11px] text-(--neutral-400)">
                          {filter.count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </motion.ul>
            </div>
          </div>
        </section>

        {/* Work grid — feature lead, then a staggered two-up editorial rhythm. */}
        <section className="pb-16 md:pb-24">
          <div className="mx-auto w-full max-w-[1720px] px-6 md:px-12 lg:px-16">
            <motion.div
              layout
              className="grid grid-cols-1 items-start gap-x-8 gap-y-14 md:gap-y-20 lg:grid-cols-12"
            >
              {visibleItems.map((item, index) => {
                // First study leads as a full-bleed feature row.
                if (index === 0) {
                  return (
                    <div key={item.id} className="lg:col-span-12">
                      <WorkCard
                        item={item}
                        index={index}
                        variant="feature"
                        fallbackIndex={index}
                      />
                    </div>
                  );
                }

                // The rest fall into an asymmetric 7/5 rhythm that flips each row,
                // so no two pairs share the same weighting — an editorial cadence.
                const position = index - 1;
                const pairIndex = Math.floor(position / 2);
                const isRowStart = position % 2 === 0;
                const wideOnLeft = pairIndex % 2 === 0;
                const isWide = isRowStart ? wideOnLeft : !wideOnLeft;

                return (
                  <div
                    key={item.id}
                    className={`${isWide ? "lg:col-span-7" : "lg:col-span-5"} ${
                      // Drop the lighter column to break the top alignment.
                      !isWide ? "lg:mt-16" : ""
                    }`}
                  >
                    <WorkCard
                      item={item}
                      index={index}
                      variant={isWide ? "wide" : "narrow"}
                      fallbackIndex={index}
                    />
                  </div>
                );
              })}
            </motion.div>

            {visibleItems.length === 0 && (
              <div className="flex flex-col items-center py-24 text-center">
                <h3 className="mb-2 text-lg font-semibold text-(--neutral-700)">
                  Nothing here yet
                </h3>
                <p className="text-sm text-(--neutral-500)">
                  More work in this discipline is on the way.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-20 md:px-10 md:pb-28">
          <StudioPageContainer>
            <div className="careers-cta-surface relative overflow-hidden rounded-4xl px-6 py-14 text-center sm:px-10 sm:py-20 md:px-16 md:py-24">
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
                  Got a project in mind?
                </span>
                <h2 className="careers-cta-heading mb-6 text-(--neutral-900)">
                  Let&apos;s build something{" "}
                  <em className="font-medium not-italic text-brand">
                    extraordinary
                  </em>{" "}
                  together.
                </h2>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href="/#process"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(88,41,199,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(88,41,199,0.35)] sm:w-auto"
                  >
                    Start a project
                    <ArrowRight size={16} />
                  </Link>
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
