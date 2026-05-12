"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

import type { StudioHomepageNavItem } from "@/components/studio/studio-homepage-content";
import { StudioHeader } from "@/components/studio/studio-header";
import {
  StudioPageContainer,
  StudioPageRails,
} from "@/components/studio/studio-page-shell";
import { jobListings, type Job } from "@/lib/careers-data";

// ── DATA ────────────────────────────────────────────────────────────────────

const benefits = [
  { k: "01", title: "Competitive salary", body: "Aligned with your skills and experience, reviewed as you grow within the team." },
  { k: "02", title: "Free lunch daily", body: "Nourishment covered every working day — on us, no exceptions." },
  { k: "03", title: "eBike for commute", body: "Roll in sustainably. A perk that fits the Auroville ethos perfectly." },
  { k: "04", title: "Mentor network", body: "Direct access to experienced builders, designers, and founders from day one." },
  { k: "05", title: "Real client work", body: "Hands-on exposure to live products shipped for real, ambitious founders." },
  { k: "06", title: "Career growth", body: "Clear advancement paths with increasing ownership and responsibility over time." },
];

const processSteps = [
  { k: "01", title: "Apply", body: "Send your portfolio, not just a CV. We read everything within five business days.", when: "Day 0" },
  { k: "02", title: "Intro call", body: "30 minutes, two-way. We want you to interview us as much as we interview you.", when: "Week 1" },
  { k: "03", title: "Portfolio deep-dive", body: "We go deep on your work, your thinking, and your craft. No trick questions.", when: "Week 2" },
  { k: "04", title: "Team meet", body: "Meet the people you'd work alongside. Real projects, real context, real vibes.", when: "Week 3" },
  { k: "05", title: "Offer", body: "Decision within a week. Transparent, direct, no negotiation games.", when: "Week 4" },
];

const testimonials = [
  {
    quote: "I shipped to real clients in my first month. The trust here is genuine — you're given the tools and room to do your best work.",
    name: "Priya Raman",
    role: "UI/UX Designer · 1 year",
  },
  {
    quote: "Three of my closest mentors now feel like teammates. That tells you everything about how Yuvabe invests in the people it hires.",
    name: "Arjun Mehta",
    role: "Full Stack Developer · 2 years",
  },
  {
    quote: "I joined fresh out of college. A year in, I'm leading client projects and still learning every single day.",
    name: "Sara Thomas",
    role: "Content Strategist · 1 year",
  },
];

// ── JOB FILTER HELPERS ───────────────────────────────────────────────────────

const DEPT_FILTERS = ["All", "Design", "Engineering", "Sales", "Remote"] as const;
type DeptFilter = (typeof DEPT_FILTERS)[number];

function matchesFilter(job: Job, filter: DeptFilter): boolean {
  if (filter === "All") return true;
  if (filter === "Remote") return job.location.toLowerCase().includes("remote") || job.location.toLowerCase() === "flexible";
  if (filter === "Design") return job.department === "Design & Marketing";
  if (filter === "Engineering") return job.department === "AI/ML & Development";
  if (filter === "Sales") return job.department === "Sales & Business Development";
  return true;
}

function getDeptLabel(dept: string): string {
  if (dept === "AI/ML & Development") return "Engineering";
  if (dept === "Design & Marketing") return "Design";
  if (dept === "Sales & Business Development") return "Sales";
  return dept;
}

// ── COMPONENT ────────────────────────────────────────────────────────────────

type CareersLandingPageProps = {
  navigationItems: StudioHomepageNavItem[];
  entryCount: number;
  experiencedCount: number;
};

export function CareersLandingPage({ navigationItems }: CareersLandingPageProps) {
  const [filter, setFilter] = useState<DeptFilter>("All");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(
    processSteps.length - 1,
  );

  const filteredJobs = useMemo(() => {
    let list = jobListings.filter((j) => matchesFilter(j, filter));
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.department.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q),
      );
    }
    return list;
  }, [filter, query]);

  return (
    <main className="relative overflow-x-clip bg-[#fafaf8] text-[#111]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <StudioPageRails />
      </div>

      <StudioHeader navigationItems={navigationItems} />

      <div className="relative z-10">
        {/* ── HERO ────────────────────────────────────────────────────────── */}
        <section className="relative pb-16 pt-28 md:pt-36">
          {/* Ambient glows */}
          <div
            aria-hidden="true"
            className="careers-glow-purple pointer-events-none absolute right-0 top-[10%] h-[520px] w-[520px] -translate-x-[15%] rounded-full opacity-70"
          />
          <div
            aria-hidden="true"
            className="careers-glow-yellow pointer-events-none absolute bottom-[5%] left-0 h-[380px] w-[380px] translate-x-[20%] rounded-full opacity-70"
          />

          <StudioPageContainer>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[680px]"
            >
              <h1 className="text-careers-hero mb-7 text-[#111]">
                Build the
                <br />
                future{" "}
                <em className="font-medium italic text-[#5829c7]">with us.</em>
              </h1>

              <p className="mb-9 max-w-[620px] text-[19px] leading-relaxed text-[#5a5a5a]">
                Yuvabe Studios is an AI-first studio building real products for
                ambitious founders. We hire makers who care, ship fast, and grow
                through doing.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="#open-roles"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#5829c7] px-[22px] py-[14px] text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(88,41,199,0.25)] transition hover:-translate-y-px hover:shadow-[0_10px_24px_rgba(88,41,199,0.32)]"
                >
                  View open roles <ArrowUpRight size={15} />
                </Link>
                <Link
                  href="#culture"
                  className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(17,17,17,0.14)] px-[22px] py-[14px] text-[15px] font-semibold text-[#111] transition hover:border-[#111] hover:bg-[#f4f3ee]"
                >
                  Life at Yuvabe
                </Link>
              </div>
            </motion.div>
          </StudioPageContainer>
        </section>

        {/* ── CULTURE ─────────────────────────────────────────────────────── */}
        <section id="culture" className="py-24 md:py-32">
          <StudioPageContainer>
            <div className="mb-14 max-w-[720px]">
              <span className="mb-[18px] inline-block font-mono text-[12px] font-medium uppercase tracking-[0.04em] text-[#5829c7]">
                — Life at Yuvabe
              </span>
              <h2 className="text-heading-xl tracking-tight text-[#111]">
                The principles we hire for.
              </h2>
              <p className="mt-5 max-w-[460px] text-[17.5px] leading-[1.55] text-[#5a5a5a]">
                We don&apos;t have a careers page to fill seats. We have one so
                the right people find us.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {/* Row 1 — full-width primary card */}
              <div className="flex flex-col overflow-hidden rounded-[28px] bg-[#5829c7] p-[34px] text-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(17,17,17,0.06),0_20px_48px_rgba(17,17,17,0.08)] md:flex-row md:items-center md:gap-16 md:p-[48px]">
                <div className="flex-1">
                  <div className="mb-7 flex items-center justify-between">
                    <span className="font-mono text-[11.5px] font-medium uppercase tracking-[0.04em] opacity-60">
                      01 — Principle
                    </span>
                    <span className="font-display text-[22px] opacity-45 md:hidden">
                      ①
                    </span>
                  </div>
                  <h3 className="text-heading-xl mb-4 tracking-tight text-white">
                    AI-first mindset.
                  </h3>
                  <p className="max-w-[480px] text-[16px] leading-[1.55] opacity-85">
                    We build at the intersection of design, engineering, and AI.
                    Every person ships real things to real clients from week one
                    — including you.
                  </p>
                </div>
                <div className="mt-8 shrink-0 md:mt-0 md:w-[44%]">
                  <div className="relative aspect-video overflow-hidden rounded-[20px] bg-[#1a1a1a]">
                    <Image
                      src="/assets/careers/group.png"
                      alt="Yuvabe team"
                      fill
                      className="object-cover opacity-70"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2 — three equal cards */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {/* Card 2 — white */}
                <div className="flex flex-col overflow-hidden rounded-[28px] border border-[rgba(17,17,17,0.08)] bg-white p-[34px] transition duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(17,17,17,0.06),0_20px_48px_rgba(17,17,17,0.08)]">
                  <div className="mb-7 flex items-center justify-between">
                    <span className="font-mono text-[11.5px] font-medium uppercase tracking-[0.04em] text-[#5a5a5a]/60">
                      02 — Principle
                    </span>
                    <span className="font-display text-[22px] text-[#111]/45">
                      ②
                    </span>
                  </div>
                  <h3 className="text-heading-lg mb-3.5 tracking-tight text-[#111]">
                    Rooted in Auroville.
                  </h3>
                  <p className="text-[15.5px] leading-[1.5] text-[#5a5a5a]/85">
                    Our studio sits inside one of the world&apos;s most unique
                    townships — where deep work meets purpose, and great
                    thinking meets real execution.
                  </p>
                  <div className="mt-auto flex flex-wrap gap-6 border-t border-[rgba(17,17,17,0.08)] pt-6 mt-8">
                    {[
                      ["Auroville", "HQ"],
                      ["Async", "Friendly"],
                      ["Flexible", "Hours"],
                    ].map(([label, desc]) => (
                      <div
                        key={label}
                        className="flex flex-col text-sm text-[#5a5a5a]"
                      >
                        <b className="font-display text-[22px] font-semibold leading-none tracking-[-0.02em] text-[#111]">
                          {label}
                        </b>
                        <span className="mt-1">{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card 3 — soft */}
                <div className="flex flex-col overflow-hidden rounded-[28px] border border-[rgba(17,17,17,0.08)] bg-[#f4f3ee] p-[34px] transition duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(17,17,17,0.06),0_20px_48px_rgba(17,17,17,0.08)]">
                  <div className="mb-7 flex items-center justify-between">
                    <span className="font-mono text-[11.5px] font-medium uppercase tracking-[0.04em] text-[#5a5a5a]/60">
                      03 — Principle
                    </span>
                    <span className="font-display text-[22px] text-[#111]/45">
                      ③
                    </span>
                  </div>
                  <h3 className="text-heading-lg mb-3.5 tracking-tight text-[#111]">
                    Real ownership.
                  </h3>
                  <p className="text-[15.5px] leading-[1.5] text-[#5a5a5a]/85">
                    No tickets without context. No work without purpose. Every
                    person owns their craft end-to-end, from first brief to
                    shipped product.
                  </p>
                  <div className="mt-8 aspect-4/3 overflow-hidden rounded-[20px]">
                    <Image
                      src="/assets/careers/people.png"
                      alt="Yuvabe team"
                      width={400}
                      height={300}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Card 4 — accent */}
                <div className="flex flex-col overflow-hidden rounded-[28px] bg-[#ffca2d] p-[34px] transition duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(17,17,17,0.06),0_20px_48px_rgba(17,17,17,0.08)]">
                  <div className="mb-7 flex items-center justify-between">
                    <span className="font-mono text-[11.5px] font-medium uppercase tracking-[0.04em] text-[#111]/60">
                      04 — Principle
                    </span>
                    <span className="font-display text-[22px] text-[#111]/45">
                      ④
                    </span>
                  </div>
                  <h3 className="text-heading-lg mb-3.5 tracking-tight text-[#111]">
                    Always learning.
                  </h3>
                  <p className="flex-1 text-[15.5px] leading-normal text-[#111]/85">
                    Mentorship, real client projects, and a culture where growth
                    comes from making — not just watching. Your mentor is your
                    teammate.
                  </p>
                  <div className="mt-8 border-t border-[rgba(17,17,17,0.15)] pt-5">
                    <div className="font-display text-[28px] font-semibold leading-none tracking-[-0.03em] text-[#111]">
                      100%
                    </div>
                    <div className="mt-2 text-[13px] text-[#111]/75">
                      of the team works on live client projects
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </StudioPageContainer>
        </section>

        {/* ── BENEFITS ────────────────────────────────────────────────────── */}
        <section id="benefits" className="bg-[#f4f3ee] py-24 md:py-32">
          <StudioPageContainer>
            <div className="mb-14 grid gap-[60px] md:grid-cols-2 md:items-end">
              <div>
                <span className="mb-[18px] inline-block font-mono text-[12px] font-medium uppercase tracking-[0.04em] text-[#5829c7]">
                  — Why join us
                </span>
                <h2 className="text-heading-xl tracking-tight text-[#111]">
                  Built for people
                  <br />
                  who plan to stay.
                </h2>
              </div>
              <p className="max-w-[460px] text-[17.5px] leading-[1.55] text-[#5a5a5a]">
                Benefits aren&apos;t a hiring lever — they&apos;re a signal of
                what we believe. Great work comes from people who are
                well-supported and deeply invested.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.k}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative flex min-h-[220px] flex-col rounded-[28px] border border-[rgba(17,17,17,0.08)] bg-white p-8 transition duration-300 hover:-translate-y-0.5 hover:border-[#8c8b86] hover:shadow-[0_4px_16px_rgba(17,17,17,0.06),0_20px_48px_rgba(17,17,17,0.08)]"
                >
                  <div className="mb-7 flex items-center justify-between">
                    <span className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-[#5829c7]">
                      {b.k}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-[#ffca2d] shadow-[0_0_0_4px_#fff4d1]" />
                  </div>
                  <h3 className="text-heading-md mb-2.5 tracking-tight text-[#111]">
                    {b.title}
                  </h3>
                  <p className="text-[15px] leading-[1.5] text-[#5a5a5a]">
                    {b.body}
                  </p>
                  <span
                    aria-hidden="true"
                    className="absolute right-7 top-8 text-[18px] text-[#8c8b86] opacity-0 transition-all duration-200 group-hover:opacity-100"
                  >
                    ↗
                  </span>
                </motion.div>
              ))}
            </div>
          </StudioPageContainer>
        </section>

        {/* ── OPEN ROLES ──────────────────────────────────────────────────── */}
        <section id="open-roles" className="py-24 md:py-32">
          <StudioPageContainer>
            <div className="mb-14 grid gap-[60px] md:grid-cols-2 md:items-end">
              <div>
                <span className="mb-[18px] inline-block font-mono text-[12px] font-medium uppercase tracking-[0.04em] text-[#5829c7]">
                  — Open positions
                </span>
                <h2 className="text-heading-xl tracking-tight text-[#111]">
                  {jobListings.length}&nbsp;roles open
                  <br />
                  right now.
                </h2>
              </div>
              <p className="max-w-[460px] text-[17.5px] leading-[1.55] text-[#5a5a5a]">
                We hire deliberately. If you don&apos;t see the right fit, reach
                out — we open new roles every month and love hearing from
                makers.
              </p>
            </div>

            {/* Controls */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <div className="relative min-w-[280px] flex-1">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[18px] text-[#8c8b86]">
                  ⌕
                </span>
                <input
                  type="text"
                  placeholder="Search by role, team, or skill"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  suppressHydrationWarning
                  className="w-full rounded-full border border-[rgba(17,17,17,0.14)] bg-white py-[18px] pl-[52px] pr-[52px] text-[15px] outline-none transition focus:border-[#5829c7] focus:shadow-[0_0_0_4px_#efe9fe]"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    suppressHydrationWarning
                    className="absolute right-4 top-1/2 flex h-[26px] w-[26px] -translate-y-1/2 items-center justify-center rounded-full bg-[#edebe3] text-[18px] text-[#2e2e2e]"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {DEPT_FILTERS.map((f) => (
                  <button
                    type="button"
                    key={f}
                    onClick={() => setFilter(f)}
                    suppressHydrationWarning
                    className={`inline-flex items-center gap-2 rounded-full border px-[18px] py-3 text-sm font-medium transition ${
                      filter === f
                        ? "border-[#111] bg-[#111] text-white"
                        : "border-[rgba(17,17,17,0.14)] bg-white text-[#2e2e2e] hover:border-[#111]"
                    }`}
                  >
                    {f}
                    {filter === f && (
                      <span className="rounded-full bg-[#ffca2d] px-1.5 py-0.5 font-mono text-[11px] font-semibold text-[#111]">
                        {filteredJobs.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Job cards */}
            <div className="flex flex-col gap-3.5">
              {filteredJobs.map((job, i) => (
                <motion.div
                  key={job.slug}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div
                    className={`cursor-pointer rounded-[28px] border bg-white p-7 transition duration-300 ${
                      expanded === job.slug
                        ? "border-[#5829c7] shadow-[0_16px_40px_rgba(88,41,199,0.12)]"
                        : "border-[rgba(17,17,17,0.08)] hover:-translate-y-0.5 hover:border-[#5829c7] hover:shadow-[0_12px_32px_rgba(88,41,199,0.10)]"
                    }`}
                    onClick={() =>
                      setExpanded(expanded === job.slug ? null : job.slug)
                    }
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="min-w-65 flex-1">
                        <div className="mb-1.5 font-mono text-[11.5px] font-medium uppercase tracking-[0.06em] text-[#5829c7]">
                          {getDeptLabel(job.department)}
                        </div>
                        <h3 className="text-heading-md mb-2 tracking-tight text-[#111]">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-2.5 text-sm text-[#5a5a5a]">
                          <span>{job.location}</span>
                          <span className="text-[#8c8b86]">·</span>
                          <span>{job.type}</span>
                          {job.compensation && (
                            <>
                              <span className="text-[#8c8b86]">·</span>
                              <span>{job.compensation}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(17,17,17,0.14)] text-[#5a5a5a] transition duration-300 hover:border-[#5829c7] hover:text-[#5829c7]">
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-300 ${expanded === job.slug ? "rotate-180" : ""}`}
                        />
                      </div>
                    </div>

                    {expanded === job.slug && (
                      <div className="mt-7 grid gap-9 border-t border-[rgba(17,17,17,0.08)] pt-6 md:grid-cols-[1.4fr_1fr]">
                        <div>
                          <div className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.06em] text-[#8c8b86]">
                            About the role
                          </div>
                          <p className="text-[14.5px] leading-[1.55] text-[#2e2e2e]">
                            {job.summary}
                          </p>
                        </div>
                        <div>
                          <div className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.06em] text-[#8c8b86]">
                            What we offer
                          </div>
                          <ul className="mb-6 space-y-1.5">
                            {(
                              job.benefits?.inPerson ??
                              job.benefits?.remote ?? [
                                "Competitive salary",
                                "Mentor network access",
                                "Real project exposure",
                                "Career growth opportunities",
                              ]
                            )
                              .slice(0, 4)
                              .map((benefit) => (
                                <li
                                  key={benefit}
                                  className="relative pl-4 text-[14.5px] leading-[1.55] text-[#2e2e2e] before:absolute before:left-0 before:top-2.25 before:h-2 before:w-2 before:rounded-full before:bg-[#ffca2d] before:content-['']"
                                >
                                  {benefit}
                                </li>
                              ))}
                          </ul>
                          <Link
                            href={`/careers/${job.slug}`}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 rounded-full bg-[#5829c7] px-5.5 py-3.5 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(88,41,199,0.25)] transition hover:-translate-y-px"
                          >
                            Apply now <ArrowUpRight size={15} />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {filteredJobs.length === 0 && (
                <div className="flex flex-col items-center gap-4 rounded-[28px] border border-dashed border-[rgba(17,17,17,0.14)] px-10 py-10 text-center text-[#5a5a5a]">
                  No roles match that filter — but we&apos;d still love to hear
                  from you.
                  <a
                    href="mailto:join@yuvabestudios.com"
                    className="inline-flex items-center gap-2 rounded-full border border-[rgba(17,17,17,0.14)] px-4 py-2 text-sm font-medium text-[#111] transition hover:border-[#111]"
                  >
                    Send a note <ArrowUpRight size={14} />
                  </a>
                </div>
              )}
            </div>
          </StudioPageContainer>
        </section>

        {/* ── TESTIMONIALS ────────────────────────────────────────────────── */}
        <section className="bg-[#f4f3ee] py-24 md:py-32">
          <StudioPageContainer>
            <div className="mb-14 max-w-[720px]">
              <span className="mb-[18px] inline-block font-mono text-[12px] font-medium uppercase tracking-[0.04em] text-[#5829c7]">
                — In their words
              </span>
              <h2 className="text-heading-xl tracking-tight text-[#111]">
                The team,
                <br />
                unfiltered.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`flex cursor-default flex-col rounded-[28px] border bg-white p-9 transition duration-300 ${
                    activeTestimonial === i
                      ? "-translate-y-1 border-[#5829c7] shadow-[0_4px_16px_rgba(17,17,17,0.06),0_20px_48px_rgba(17,17,17,0.08)]"
                      : "border-[rgba(17,17,17,0.08)]"
                  }`}
                  onMouseEnter={() => setActiveTestimonial(i)}
                >
                  <div
                    className={`mb-4 font-display text-[64px] leading-[0.7] ${
                      activeTestimonial === i
                        ? "text-[#ffca2d]"
                        : "text-[#5829c7]"
                    }`}
                  >
                    &ldquo;
                  </div>
                  <blockquote className="mb-8 flex-1 font-display text-[19px] font-medium leading-[1.35] tracking-[-0.015em] text-[#111]">
                    {t.quote}
                  </blockquote>
                  <div className="flex items-center gap-3.5 border-t border-[rgba(17,17,17,0.08)] pt-5">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#edebe3] font-mono text-[12px] font-medium text-[#5a5a5a]">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="text-[15px] font-semibold tracking-[-0.01em] text-[#111]">
                        {t.name}
                      </div>
                      <div className="mt-0.5 text-[13px] text-[#8c8b86]">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </StudioPageContainer>
        </section>

        {/* ── PROCESS TIMELINE ────────────────────────────────────────────── */}
        <section id="process" className="py-24 md:py-32">
          <StudioPageContainer>
            <div className="mb-14 grid gap-[60px] md:grid-cols-2 md:items-end">
              <div>
                <span className="text-label-sm mb-[18px] inline-block uppercase tracking-[0.04em] text-[#5829c7]">
                  — Hiring process
                </span>
                <h2 className="text-heading-xl tracking-tight text-[#111]">
                  Five steps,
                  <br />
                  four weeks.
                </h2>
              </div>
              <p className="text-body-lg max-w-[460px] text-[#5a5a5a]">
                We respect your time. No ghosting, no endless rounds, no
                take-homes longer than a few hours. You&apos;ll always know
                where you stand.
              </p>
            </div>

            <div className="relative grid grid-cols-1 gap-7 pt-7 md:grid-cols-5 md:gap-4">
              {/* Track line */}
              <div className="absolute left-[8%] right-[8%] top-15 hidden h-0.5 rounded-full bg-[rgba(17,17,17,0.08)] md:block" />
              {/* Progress fill */}
              <div
                className="careers-process-progress absolute left-[8%] top-15 hidden h-0.5 max-w-[84%] rounded-full transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] md:block"
                style={{
                  width:
                    hoveredStep !== null
                      ? `${((hoveredStep + 1) / processSteps.length) * 100}%`
                      : "100%",
                }}
              />

              {processSteps.map((step, i) => (
                <div
                  key={step.k}
                  className={`flex cursor-default flex-row items-start gap-5 text-left transition duration-300 md:flex-col md:items-center md:p-3 md:text-center ${
                    hoveredStep === i ? "md:-translate-y-1" : ""
                  }`}
                  onMouseEnter={() => setHoveredStep(i)}
                  onMouseLeave={() => setHoveredStep(processSteps.length - 1)}
                >
                  <div
                    className={`text-label-sm relative z-10 mb-0 flex h-[60px] w-[60px] flex-shrink-0 items-center justify-center rounded-full border-2 font-semibold transition duration-300 md:mb-6 ${
                      hoveredStep === i
                        ? "scale-110 border-[#5829c7] bg-[#5829c7] text-white shadow-[0_12px_24px_rgba(88,41,199,0.3)]"
                        : "border-[rgba(17,17,17,0.08)] bg-white text-[#5a5a5a]"
                    }`}
                  >
                    {step.k}
                  </div>
                  <div>
                    <div
                      className={`text-label-sm mb-2 uppercase tracking-[0.06em] transition duration-300 ${
                        hoveredStep === i ? "text-[#5829c7]" : "text-[#8c8b86]"
                      }`}
                    >
                      {step.when}
                    </div>
                    <h3 className="text-heading-sm mb-2 tracking-tight text-[#111]">
                      {step.title}
                    </h3>
                    <p className="text-body-sm max-w-[220px] text-[#5a5a5a]">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </StudioPageContainer>
        </section>

        {/* ── CTA BANNER ──────────────────────────────────────────────────── */}
        <section id="apply" className="px-6 py-16 md:px-10">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-white px-8 py-25 text-center ring-1 ring-[rgba(88,41,199,0.12)] md:px-15 md:py-27.5">
            {/* Light purple glow */}
            <div
              aria-hidden="true"
              className="careers-glow-purple pointer-events-none absolute -left-20 -top-20 h-120 w-120 rounded-full opacity-60"
            />
            {/* Light yellow glow */}
            <div
              aria-hidden="true"
              className="careers-glow-yellow pointer-events-none absolute -bottom-20 -right-20 h-120 w-120 rounded-full opacity-70"
            />

            <span className="relative mb-6 inline-block font-mono text-[12px] uppercase tracking-[0.04em] text-[#5829c7]">
              — Open invitation
            </span>
            <h2 className="text-careers-cta relative mb-6 text-[#111]">
              Let&apos;s build something
              <br />
              <em className="font-medium italic text-[#5829c7]">
                extraordinary
              </em>
              &nbsp;together.
            </h2>
            <p className="relative mx-auto mb-10 max-w-[560px] text-[19px] leading-[1.5] text-[#5a5a5a]">
              The roles you see are the ones we know we need. The role you
              imagine? Tell us about it.
            </p>

            <div className="relative flex flex-wrap justify-center gap-3">
              <Link
                href="#open-roles"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#5829c7] px-5.5 py-3.5 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(88,41,199,0.28)] transition hover:-translate-y-px hover:shadow-[0_10px_24px_rgba(88,41,199,0.38)]"
              >
                Apply now <ArrowUpRight size={15} />
              </Link>
              <a
                href="mailto:join@yuvabestudios.com"
                className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(88,41,199,0.25)] bg-[rgba(88,41,199,0.05)] px-5.5 py-3.5 text-[15px] font-semibold text-[#5829c7] transition hover:border-[#5829c7] hover:bg-[rgba(88,41,199,0.08)]"
              >
                info@yuvabe.com
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
