"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { ArrowRight, Search, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import type { StudioHomepageNavItem } from "@/components/studio/studio-homepage-content";
import type { Job } from "@/types/careers";
import type { CareersPageContent } from "@/lib/careers-content";
import { StudioHeader } from "@/components/studio/studio-header";
import {
  StudioPageContainer,
  StudioPageRails,
} from "@/components/studio/studio-page-shell";

// ─── Visual-only constants (tone/span/meta are not CMS-editable) ─────────────

const PRINCIPLE_VARIANTS = [
  { tone: "primary" as const, span: "full" as const },
  {
    tone: "white" as const,
    span: "wide" as const,
    meta: [
      { value: "10+", label: "Yuvabeans" },
      { value: "AI", label: "daily tooling" },
      { value: "2×", label: "yearly offsites" },
    ],
  },
  { tone: "soft" as const, span: "normal" as const },
  { tone: "accent" as const, span: "normal" as const },
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-5 inline-block font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-(--purple-500)">
      {children}
    </span>
  );
}

type PrincipleCardProps = {
  eyebrow: string;
  title: string;
  body: string;
  tone: "primary" | "white" | "soft" | "accent";
  span: "full" | "wide" | "normal";
  meta?: ReadonlyArray<{ readonly value: string; readonly label: string }>;
};

function PrincipleCard({ p }: { p: PrincipleCardProps }) {
  const tones: Record<string, string> = {
    primary:
      "bg-(--purple-500) text-white hover:shadow-[0_20px_48px_rgba(88,41,199,0.3)]",
    white:
      "bg-white border border-(--color-border-default) hover:shadow-[0_20px_40px_rgba(17,17,17,0.08)]",
    soft: "bg-(--neutral-100) border border-(--color-border-default) hover:shadow-[0_20px_40px_rgba(17,17,17,0.08)]",
    accent:
      "bg-(--yellow-500) text-(--neutral-900) hover:shadow-[0_20px_40px_rgba(255,202,45,0.4)]",
  };

  const eyebrowColor: Record<string, string> = {
    primary: "text-white/60",
    white: "text-(--neutral-500)",
    soft: "text-(--neutral-500)",
    accent: "text-(--neutral-700)",
  };

  const titleColor: Record<string, string> = {
    primary: "text-white",
    white: "text-(--neutral-900)",
    soft: "text-(--neutral-900)",
    accent: "text-(--neutral-900)",
  };

  const bodyColor: Record<string, string> = {
    primary: "text-white/80",
    white: "text-(--neutral-600)",
    soft: "text-(--neutral-600)",
    accent: "text-(--neutral-700)",
  };

  const base = `relative overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 ${tones[p.tone]}`;

  /* ── Full-width hero card ── */
  if (p.span === "full") {
    return (
      <article className={`${base} flex h-full flex-col gap-10 p-10 md:p-14`}>
        {/* Text content */}
        <div className="flex flex-col md:w-3/5">
          <span className={`mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.04em] ${eyebrowColor[p.tone]}`}>
            {p.eyebrow}
          </span>
          <h3 className={`mb-4 font-(family-name:--font-display-family) text-[clamp(36px,4vw,56px)] font-semibold leading-none tracking-[-0.025em] ${titleColor[p.tone]}`}>
            {p.title}
          </h3>
          <p className={`max-w-md text-[17px] leading-[1.55] ${bodyColor[p.tone]}`}>{p.body}</p>
        </div>
        {/* Team image — bottom-right corner on desktop */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/careers/group.png"
          alt="Yuvabe team"
          className="h-44 w-full rounded-2xl object-cover md:absolute md:inset-y-0 md:right-0 md:h-full md:w-2/5 md:rounded-none md:rounded-r-3xl md:object-center"
        />
      </article>
    );
  }

  /* ── Standard card ── */
  return (
    <article className={`${base} flex h-full flex-col p-8`}>
      <div className="mb-7 flex items-center justify-between">
        <span
          className={`font-mono text-[11px] font-medium uppercase tracking-[0.04em] ${eyebrowColor[p.tone]}`}
        >
          {p.eyebrow}
        </span>
      </div>
      <h3
        className={`mb-3 font-(family-name:--font-display-family) text-[clamp(26px,2.4vw,36px)] font-semibold leading-[1.02] tracking-tight ${titleColor[p.tone]}`}
      >
        {p.title}
      </h3>
      <p className={`text-sm leading-relaxed ${bodyColor[p.tone]}`}>{p.body}</p>

    </article>
  );
}

function BenefitCard({ b }: { b: { title: string; body: string; k: string } }) {
  return (
    <article className="group relative flex min-h-[200px] flex-col rounded-3xl border border-(--color-border-default) bg-white p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-(--neutral-400) hover:shadow-[0_20px_40px_rgba(17,17,17,0.06)]">
      <div className="mb-7 flex items-center justify-between">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-(--purple-500)">
          {b.k}
        </span>
        <span className="size-2 rounded-full bg-(--yellow-500) shadow-[0_0_0_4px_color-mix(in_srgb,var(--yellow-500)_20%,white)]" />
      </div>
      <h3 className="mb-2.5 font-[family-name:var(--font-display-family)] text-2xl font-semibold leading-tight tracking-[-0.02em]">
        {b.title}
      </h3>
      <p className="text-sm leading-relaxed text-(--neutral-600)">{b.body}</p>
      <span
        className="absolute right-7 top-7 translate-x-1 -translate-y-1 text-lg text-(--neutral-400) opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
        aria-hidden="true"
      >
        ↗
      </span>
    </article>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

// ─── Job board ───────────────────────────────────────────────────────────────

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
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
  const principles = content.principles.map((p, i) => ({ ...p, ...PRINCIPLE_VARIANTS[i] }));
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  // Precomputed width classes for each of the 5 steps — avoids inline style for dynamic width.
  const PROGRESS_WIDTHS = [
    "w-[16.8%]",
    "w-[33.6%]",
    "w-[50.4%]",
    "w-[67.2%]",
    "w-[84%]",
  ] as const;
  const progressWidthClass =
    hoveredStep !== null ? PROGRESS_WIDTHS[hoveredStep] : PROGRESS_WIDTHS[0];

  return (
    <main
      data-studio-shell
      className="relative min-h-screen overflow-x-clip overflow-y-visible bg-(--neutral-50) text-(--neutral-900)"
    >
      {/* Background rails */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <StudioPageRails />
        <div className="absolute inset-x-0 top-0 h-128 bg-[radial-gradient(circle_at_72%_12%,rgba(88,41,199,0.07),rgba(255,255,255,0)_36%),radial-gradient(circle_at_18%_8%,rgba(255,202,45,0.09),rgba(255,255,255,0)_32%)]" />
      </div>

      <StudioHeader navigationItems={navigationItems} />

      <div className="relative z-10">
        {/* ── 01 Hero ──────────────────────────────────────────────────────── */}
        <section className="pb-20 pt-32 md:pb-28 md:pt-40">
          <StudioPageContainer>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <h1 className="text-display-xl mb-7 text-(--color-text-primary)">
                {content.hero.headingLine1}{" "}
                <em className="relative font-medium not-italic text-(--purple-500)">
                  {content.hero.headingHighlight}
                </em>
              </h1>
              <p className="text-body-lg mb-10 max-w-xl text-(--color-text-secondary)">
                {content.hero.subheading}
              </p>
              <div className="mb-12 flex flex-wrap gap-3">
                <Link
                  href="#roles"
                  className="inline-flex items-center gap-2 rounded-full bg-(--purple-500) px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(88,41,199,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(88,41,199,0.32)]"
                >
                  View open roles
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="#culture"
                  className="inline-flex items-center gap-2 rounded-full border border-(--color-border-default) bg-transparent px-6 py-3.5 text-[15px] font-semibold text-(--neutral-900) transition-all hover:border-(--neutral-400) hover:bg-(--neutral-100)"
                >
                  Life at Yuvabe
                </Link>
              </div>

            </motion.div>
          </StudioPageContainer>
        </section>

        {/* ── 02 Culture / Principles ───────────────────────────────────────── */}
        <section className="py-24 md:pb-32 md:pt:-24" id="culture">
          <StudioPageContainer>
            <div className="mb-14">
              <Kicker>— Life at Yuvabe</Kicker>
              <h2 className="text-heading-xl max-w-lg text-(--color-text-primary)">
                The principles
                <br />
                we hire for.
              </h2>
              <p className="mt-5 max-w-md text-[17px] leading-[1.55] text-(--neutral-600)">
                We don&apos;t have a careers page to fill seats. We have one so
                the right people find us. These four ideas show up in every
                hiring decision we make.
              </p>
            </div>

            {/* Hero card full-width, then 3-col row */}
            <div className="flex flex-col gap-5">
              {/* Card 1 — full-width hero */}
              <PrincipleCard p={principles[0]} />
              {/* Cards 2, 3, 4 — equal 3 columns */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <PrincipleCard p={principles[1]} />
                <PrincipleCard p={principles[2]} />
                <PrincipleCard p={principles[3]} />
              </div>
            </div>
          </StudioPageContainer>
        </section>

        {/* ── 04 Benefits ───────────────────────────────────────────────────── */}
        <section className="bg-(--neutral-100) py-24 md:py-32" id="benefits">
          <StudioPageContainer>
            <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <Kicker>— Why join us</Kicker>
                <h2 className="text-heading-xl text-(--color-text-primary)">
                  Built for people
                  <br />
                  who plan to stay.
                </h2>
              </div>
              <p className="max-w-sm text-[17px] leading-[1.55] text-(--neutral-600) md:mb-1">
                Benefits aren&apos;t a hiring lever — they&apos;re a signal of
                what we believe. Great work comes from rested, well-cared-for
                humans.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {content.benefits.map((b, i) => (
                <BenefitCard key={i} b={{ ...b, k: String(i + 1).padStart(2, "0") }} />
              ))}
            </div>
          </StudioPageContainer>
        </section>

        {/* ── 05 Open Roles ─────────────────────────────────────────────────── */}
        <section className="py-24 md:py-32" id="roles">
          <StudioPageContainer>
            <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <Kicker>— Open positions</Kicker>
                <h2 className="text-heading-xl text-(--color-text-primary)">
                  Open roles,
                  <br />
                  right now.
                </h2>
              </div>
              <p className="max-w-sm text-[17px] leading-[1.55] text-(--neutral-600) md:mb-1">
                We hire slowly and intentionally. If you don&apos;t see your
                dream role, send us a note — we open new positions every month.
              </p>
            </div>

            <JobBoard jobs={jobs} />
          </StudioPageContainer>
        </section>

        {/* ── 07 Process Timeline ───────────────────────────────────────────── */}
        <section className="bg-(--neutral-100) py-24 md:py-32" id="process">
          <StudioPageContainer>
            <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <Kicker>— Hiring process</Kicker>
                <h2 className="text-heading-xl text-(--color-text-primary)">
                  Five steps,
                  <br />
                  four weeks.
                </h2>
              </div>
              <p className="max-w-sm text-[17px] leading-[1.55] text-(--neutral-600) md:mb-1">
                We respect your time. No ghosting, no twelve-round interviews.
                You will always know where you stand.
              </p>
            </div>

            {/* Desktop: horizontal timeline */}
            <div className="relative hidden pt-8 md:grid md:grid-cols-5 md:gap-4">
              {/* Track line */}
              <div
                className="absolute left-[8%] right-[8%] top-18 h-0.5 rounded-full bg-(--neutral-200)"
                aria-hidden="true"
              />
              {/* Animated progress — width switches between precomputed Tailwind classes */}
              <div
                className={`careers-timeline-progress absolute left-[8%] top-18 h-0.5 rounded-full ${progressWidthClass}`}
                aria-hidden="true"
              />
              {content.process.map((p, i) => {
                const k = String(i + 1).padStart(2, "0");
                return (
                  <div
                    key={k}
                    className="flex flex-col items-center px-3 text-center"
                    onMouseEnter={() => setHoveredStep(i)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    <div
                      className={`relative z-10 mb-6 flex size-15 items-center justify-center rounded-full border-2 font-mono text-sm font-semibold transition-all duration-300 ${
                        hoveredStep === i
                          ? "scale-110 border-brand bg-brand text-white shadow-[0_12px_24px_rgba(88,41,199,0.3)]"
                          : "border-(--color-border-default) bg-white text-(--neutral-500)"
                      }`}
                    >
                      {k}
                    </div>
                    <h3 className="mb-2 font-(family-name:--font-display-family) text-xl font-semibold leading-tight tracking-[-0.02em]">
                      {p.title}
                    </h3>
                    <p className="max-w-50 text-sm leading-relaxed text-(--neutral-600)">
                      {p.body}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Mobile: vertical timeline */}
            <div className="flex flex-col gap-8 md:hidden">
              {content.process.map((p, i) => {
                const k = String(i + 1).padStart(2, "0");
                return (
                  <div key={k} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-(--color-border-default) bg-white font-mono text-sm font-semibold text-(--neutral-500)">
                        {k}
                      </div>
                      {i < content.process.length - 1 && (
                        <div className="mt-2 w-0.5 flex-1 bg-(--neutral-200)" />
                      )}
                    </div>
                    <div className="pb-8 pt-1">
                      <h3 className="mb-2 font-(family-name:--font-display-family) text-xl font-semibold leading-tight tracking-[-0.02em]">
                        {p.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-(--neutral-600)">
                        {p.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </StudioPageContainer>
        </section>

        {/* ── 07 CTA ────────────────────────────────────────────────────────── */}
        <section className="px-6 py-16 md:px-10 md:py-20" id="apply">
          <StudioPageContainer>
            <div className="careers-cta-surface relative overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-10 sm:py-20 md:px-16 md:py-28">
              {/* Glow blobs */}
              <div
                className="careers-cta-glow-primary pointer-events-none absolute -left-32 -top-48 size-[600px] rounded-full opacity-70"
                aria-hidden="true"
              />
              <div
                className="careers-cta-glow-accent pointer-events-none absolute -bottom-52 -right-40 size-[600px] rounded-full opacity-50"
                aria-hidden="true"
              />

              {/* Content */}
              <div className="relative">
                <span className="mb-6 inline-block font-mono text-[12px] font-medium uppercase tracking-[0.04em] text-(--purple-500)">
                  {content.cta.kicker}
                </span>
                <h2 className="careers-cta-heading mb-6 text-(--neutral-900)">
                  {content.cta.headingPrefix}{" "}
                  <em className="font-medium not-italic text-(--purple-500)">
                    {content.cta.headingHighlight}
                  </em>{" "}
                  {content.cta.headingSuffix}
                </h2>
                <p className="mx-auto mb-10 max-w-[520px] text-base leading-relaxed text-(--neutral-600) md:text-lg">
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
                 
                </div>
              </div>
            </div>
          </StudioPageContainer>
        </section>
      </div>
    </main>
  );
}
