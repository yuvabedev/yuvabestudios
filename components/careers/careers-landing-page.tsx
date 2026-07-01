"use client";

import Link from "next/link";
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  ArrowRight,
  Search,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Wallet,
  PieChart,
  HeartPulse,
  GraduationCap,
  Globe,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import type { StudioHomepageNavItem } from "@/components/studio/studio-homepage-content";
import type { Job } from "@/types/careers";
import type { CareersPageContent } from "@/lib/careers-content";
import { StudioHeader } from "@/components/studio/studio-header";
import { StudioPageContainer } from "@/components/studio/studio-page-shell";
import { ArcGalleryHero } from "@/components/ui/arc-gallery-hero";

// Curated arc images — culture/team photos lead, a few case-study covers fill
// out the fan so the hero reads as "life + the work we ship".
const ARC_IMAGES = [
  "/assets/careers/group.png",
  "/assets/general-aeronautics/cover-summary.jpeg",
  "/assets/careers/people.png",
  "/assets/tvam/cover.png",
  "/assets/about/yuvabe-cover.jpeg",
  "/assets/KK/mock-detail.png",
  "/assets/about/saracon_02.jpg",
  "/assets/bevolve/cover-detail.png",
  "/assets/about/yuvabe-image.jpeg",
  "/assets/ageshift/ageshift_cover.png",
  "/assets/hemplanet/cover.png",
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

// ─── Shared bits ──────────────────────────────────────────────────────────────

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-5 inline-block font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-brand">
      {children}
    </span>
  );
}

// Editorial wide rail used by the work and services pages — wider than the
// default studio container so imagery can breathe.
function WideRail({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1720px] px-6 md:px-12 lg:px-16">
      {children}
    </div>
  );
}

// ─── Open roles board ──────────────────────────────────────────────────────────

function JobBoard({ jobs }: { jobs: Job[] }) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const departments = ["All", "AI Developer", "Design", "Market & Content", "Market Researcher", "Remote"] as const;

  const filtered = useMemo(() => {
    let list = jobs;
    if (filter === "Remote") {
      list = list.filter((j) => j.location === "Remote" || j.location === "Flexible");
    } else if (filter !== "All") {
      list = list.filter((j) => j.department === filter);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.department.toLowerCase().includes(q) ||
          j.summary.toLowerCase().includes(q),
      );
    }
    return list;
  }, [jobs, filter, query]);

  return (
    <div>
      {/* Controls */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-64 flex-1">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-(--neutral-400)"
          />
          <input
            suppressHydrationWarning
            type="text"
            placeholder="Search by role, team, or skill"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full border border-(--color-border-default) bg-white py-3 pl-10 pr-10 text-[15px] outline-none transition focus:border-(--purple-500) focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--purple-500)_10%,transparent)]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full bg-(--neutral-100) text-(--neutral-500) transition hover:bg-(--neutral-200)"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {departments.map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => setFilter(dept)}
              className={`rounded-full border px-4 py-2.5 text-[14px] font-medium transition-all ${
                filter === dept
                  ? "border-brand bg-[color-mix(in_srgb,var(--purple-500)_12%,white)] text-brand"
                  : "border-(--color-border-default) bg-white text-(--neutral-700) hover:border-brand/40 hover:text-brand"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Job list */}
      <div className="flex flex-col gap-3.5">
        {filtered.map((job) => {
          const isOpen = expanded === job.slug;
          return (
            <article
              key={job.slug}
              className={`cursor-pointer rounded-3xl border bg-white transition-all duration-300 ${
                isOpen
                  ? "border-(--purple-500) shadow-[0_16px_40px_rgba(88,41,199,0.12)]"
                  : "border-(--color-border-default) hover:-translate-y-0.5 hover:border-(--purple-500) hover:shadow-[0_12px_32px_rgba(88,41,199,0.10)]"
              }`}
              onClick={() => setExpanded(isOpen ? null : job.slug)}
            >
              <div className="flex flex-wrap items-center gap-6 px-8 py-7">
                {/* Left */}
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-(--purple-500)">
                    {job.department}
                  </div>
                  <h3 className="font-[family-name:var(--font-display-family)] text-2xl font-semibold leading-tight tracking-[-0.02em]">
                    {job.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2 text-[14px] text-(--neutral-500)">
                    <span>{job.location}</span>
                    <span className="text-(--neutral-300)">·</span>
                    <span>{job.type}</span>
                    {job.compensation && (
                      <>
                        <span className="text-(--neutral-300)">·</span>
                        <span>{job.compensation}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Right */}
                <div className="flex shrink-0 items-center gap-3">
                  <ChevronDown
                    size={18}
                    className={`text-(--neutral-400) transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </div>
              </div>

              {/* Expanded panel */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="expand"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: easeOut }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-8 border-t border-(--color-border-default) px-8 py-7 md:grid-cols-[1.4fr_1fr_auto]">
                      <div>
                        <div className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-(--neutral-400)">
                          About the role
                        </div>
                        <p className="text-[14.5px] leading-relaxed text-(--neutral-700)">
                          {job.summary ||
                            `Join our ${job.department.toLowerCase()} team to deliver impactful work for ambitious startup founders. You'll own meaningful scope from week one.`}
                        </p>
                      </div>
                      <div>
                        <div className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-(--neutral-400)">
                          What we offer
                        </div>
                        <ul className="space-y-2 text-[14.5px] text-(--neutral-700)">
                          {(job.benefits?.remote ?? job.benefits?.inPerson ?? [
                            "Competitive compensation",
                            "Learning & growth budget",
                            "Quarterly team offsites",
                            "Flexible, async-first culture",
                          ]).slice(0, 4).map((b) => (
                            <li key={b} className="flex items-start gap-2.5">
                              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-(--yellow-500)" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col gap-2.5">
                        <Link
                          href={`/careers/${job.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-(--purple-500) px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_6px_18px_rgba(88,41,199,0.25)] transition-all hover:shadow-[0_10px_24px_rgba(88,41,199,0.32)]"
                        >
                          Apply now <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          );
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-(--color-border-default) bg-white px-8 py-12 text-center text-(--neutral-500)">
            No roles match — but we&apos;d still love to hear from you.
            <Link
              href="mailto:join@yuvabestudios.com"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-(--purple-500) hover:underline"
            >
              Send a note <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Benefits carousel ──────────────────────────────────────────────────────────

// Icons cycle by index — the CMS benefits carry no icon field, so we map a
// sensible lucide set onto whatever order the content arrives in.
const BENEFIT_ICONS: LucideIcon[] = [
  Wallet,
  PieChart,
  HeartPulse,
  GraduationCap,
  Globe,
  Clock,
];

function BenefitCard({
  benefit,
  Icon,
}: {
  benefit: { title: string; body: string };
  Icon: LucideIcon;
}) {
  return (
    <div className="w-[280px] shrink-0 sm:w-[320px]">
      <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
        <Icon size={24} strokeWidth={1.8} />
      </span>
      <h3 className="mt-6 font-(family-name:--font-display-family) text-[24px] font-semibold leading-tight tracking-[-0.02em] text-(--neutral-950)">
        {benefit.title}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-(--color-text-secondary)">
        {benefit.body}
      </p>
    </div>
  );
}

function BenefitsScroller({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  // Render three copies so the user can scroll either direction without ever
  // reaching an edge — we keep the scroll position parked in the middle copy.
  const COPIES = 3;
  const loop = useMemo(
    () => Array.from({ length: COPIES }, () => items).flat(),
    [items],
  );

  // Whenever the scroll drifts out of the middle copy, jump it back by exactly
  // one set width. The jump is instant (no smooth scroll) so it's invisible.
  const recenter = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const setWidth = el.scrollWidth / COPIES;
    if (setWidth === 0) return;
    if (el.scrollLeft < setWidth * 0.5) {
      el.scrollLeft += setWidth;
    } else if (el.scrollLeft > setWidth * 1.5) {
      el.scrollLeft -= setWidth;
    }
  }, []);

  // Start parked at the middle copy.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth / COPIES;
  }, [loop.length]);

  // Step by roughly one card (card width + gap) in either direction.
  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-benefit-card]");
    const gap = 40; // matches the gap-10 track spacing
    const amount = (card?.offsetWidth ?? 320) + gap;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Edge fades blend the loop into the white section. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-28" />

      <div
        ref={trackRef}
        onScroll={recenter}
        className="benefits-scroll flex gap-10 overflow-x-auto overscroll-x-contain pb-2 sm:gap-14"
      >
        {loop.map((b, i) => (
          <div key={`${b.title}-${i}`} data-benefit-card>
            <BenefitCard
              benefit={b}
              Icon={BENEFIT_ICONS[i % BENEFIT_ICONS.length]}
            />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <div className="relative z-20 mt-10 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous perks"
          className="flex size-11 items-center justify-center rounded-full border border-(--color-border-default) bg-white text-(--neutral-900) transition-all hover:border-brand/40 hover:text-brand"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next perks"
          className="flex size-11 items-center justify-center rounded-full border border-(--color-border-default) bg-white text-(--neutral-900) transition-all hover:border-brand/40 hover:text-brand"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <style>{`
        .benefits-scroll { scrollbar-width: none; }
        .benefits-scroll::-webkit-scrollbar { display: none; }
        [data-benefit-card] { flex: 0 0 auto; }
      `}</style>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────────

type CareersLandingPageProps = {
  navigationItems: StudioHomepageNavItem[];
  jobs: Job[];
  content: CareersPageContent;
};

export function CareersLandingPage({
  navigationItems,
  jobs,
  content,
}: CareersLandingPageProps) {
  return (
    <main
      data-studio-shell
      className="relative min-h-screen overflow-x-clip overflow-y-visible bg-(--neutral-50) text-foreground"
    >
      <StudioHeader navigationItems={navigationItems} />

      <article className="relative">
        {/* ── 01 Hero — arc gallery ─────────────────────────────────────────── */}
        <section
          className="bg-white pt-28 pb-16 md:pt-32 md:pb-24"
          id="culture"
        >
          <ArcGalleryHero
            images={[...ARC_IMAGES]}
            className="bg-white"
            radiusLg={640}
            radiusMd={460}
            radiusSm={280}
            cardSizeLg={172}
            cardSizeMd={130}
            cardSizeSm={96}
          >
            <h1 className="text-display-xl text-(--neutral-950)">
              {content.hero.headingLine1}{" "}
              <em className="font-medium not-italic text-brand">
                {content.hero.headingHighlight}
              </em>
            </h1>
            <p className="text-body-lg mx-auto mt-6 max-w-xl text-(--color-text-secondary)">
              {content.hero.subheading}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="#roles"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(88,41,199,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(88,41,199,0.32)]"
              >
                View open roles
                <ArrowRight size={16} />
              </Link>
              <span className="inline-flex items-center gap-2 rounded-full border border-(--color-border-default) bg-white px-5 py-3.5 text-[14px] font-medium text-(--neutral-700)">
                <span className="size-2 rounded-full bg-(--yellow-500)" />
                {jobs.length} open {jobs.length === 1 ? "role" : "roles"}
              </span>
            </div>
          </ArcGalleryHero>
        </section>

        <section
          className="border-y border-(--color-border-default) bg-white py-20 md:py-28"
          id="benefits"
        >
          <WideRail>
            <div className="mb-12 max-w-2xl md:mb-16">
              <Kicker>Why join us</Kicker>
              <h2 className="text-display-muted-editorial text-(--neutral-950)">
                The perks of staying.
              </h2>
            </div>
            <BenefitsScroller items={content.benefits} />
          </WideRail>
        </section>

        {/* ── 04 Open roles ─────────────────────────────────────────────────── */}
        <section className="py-20 md:py-28" id="roles">
          <WideRail>
            <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <Kicker>Open positions</Kicker>
                <h2 className="text-display-muted-editorial text-(--neutral-950)">
                  Open roles, right now.
                </h2>
              </div>
              <p className="max-w-sm text-[16px] leading-[1.55] text-(--color-text-secondary) md:mb-2">
                Don&apos;t see your role? We open new positions every month —
                send us a note.
              </p>
            </div>

            <JobBoard jobs={jobs} />
          </WideRail>
        </section>

        {/* ── 05 Benefits ───────────────────────────────────────────────────── */}

        {/* ── 06 Hiring process ─────────────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-white" id="process">
          <WideRail>
            <div className="mb-12 max-w-2xl">
              <Kicker>Hiring process</Kicker>
              <h2 className="text-display-muted-editorial text-(--neutral-950)">
                Five steps
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {content.process.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{
                    duration: 0.5,
                    ease: easeOut,
                    delay: (i % 5) * 0.06,
                  }}
                  className="rounded-2xl border border-(--color-border-default) bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_20px_40px_rgba(17,17,17,0.08)]"
                >
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-brand/10 font-mono text-[12px] font-semibold text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-(family-name:--font-display-family) text-xl font-semibold leading-tight tracking-[-0.02em] text-(--neutral-950)">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-(--color-text-secondary)">
                    {p.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </WideRail>
        </section>

        {/* ── 07 CTA ────────────────────────────────────────────────────────── */}
        <section className="px-6 py-20 md:px-10 md:py-28" id="apply">
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
                  {content.cta.kicker.replace(/^—\s*/, "")}
                </span>
                <h2 className="careers-cta-heading mb-6 text-(--neutral-900)">
                  {content.cta.headingPrefix}{" "}
                  <em className="font-medium not-italic text-brand">
                    {content.cta.headingHighlight}
                  </em>{" "}
                  {content.cta.headingSuffix}
                </h2>
                <p className="mx-auto mb-10 max-w-130 text-base leading-relaxed text-(--neutral-600) md:text-lg">
                  {content.cta.body}
                </p>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href="#roles"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(88,41,199,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(88,41,199,0.35)] sm:w-auto"
                  >
                    Apply now
                    <ArrowRight size={16} />
                  </Link>
                  <a
                    href="mailto:join@yuvabestudios.com"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-(--color-border-default) bg-white px-7 py-4 text-[13px] font-semibold text-(--neutral-700) transition-all hover:border-brand/30 hover:text-brand sm:w-auto sm:text-[15px]"
                  >
                    join@yuvabestudios.com
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
