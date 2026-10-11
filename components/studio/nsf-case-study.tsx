"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef } from "react";

import type {
  ResolvedStudioCaseStudyDetail,
  StudioCaseStudySummary,
} from "@/components/studio/studio-case-study-content";
import { StartProjectLink } from "@/components/studio/start-project-link";

gsap.registerPlugin(ScrollTrigger);

// useLayoutEffect warns during SSR; fall back to useEffect on the server so the
// GSAP setup still runs before paint in the browser.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// ─── Curated NSF imagery (web-sized webp) ────────────────────────────────────
// NOTE: the asset folder is capitalised "Nsf" — must match exactly on Linux.
const LOGO = "/assets/Nsf/web/logo.webp";
const HERO_SHOT = "/assets/Nsf/web/wide.webp";
const MOSAIC = Array.from({ length: 10 }, (_, i) => `/assets/Nsf/web/poster${i + 1}.webp`);

// The storytelling formats built for the content framework: the three groups of
// people the work set out to make visible.
const PEOPLE = [
  {
    key: "Volunteers",
    lead: "The people who run it",
    body: "NSF is volunteer-driven. The framework put the people doing the work at the front of the story, rather than leaving them behind the organisation's name.",
    image: "/assets/Nsf/web/s1.webp",
  },
  {
    key: "Mentors",
    lead: "The people who guide it",
    body: "Mentor-led formats gave the programs a human voice, showing the guidance behind academic outcomes instead of only the outcomes themselves.",
    image: "/assets/Nsf/web/s2.webp",
  },
  {
    key: "Scholars",
    lead: "The people it's for",
    body: "Scholar stories connected the mission to the students it supports, giving the community a reason to stay engaged between campaigns.",
    image: "/assets/Nsf/web/s3.webp",
  },
];

// NSF's brand green, sampled from the logo (5.3:1 behind white text).
const BRAND = "#307860";
const ACCENT = "text-[#307860]";

function Shell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}

type NsfCaseStudyProps = {
  caseStudy: StudioCaseStudySummary;
  detail: ResolvedStudioCaseStudyDetail;
};

export function NsfCaseStudy({ caseStudy, detail }: NsfCaseStudyProps) {
  const { title, sector, summary, services } = caseStudy;
  const { intro, outcomes, sections, proofPoints, testimonial } = detail;

  const root = useRef<HTMLElement | null>(null);
  const progress = useRef<HTMLDivElement | null>(null);
  const thread = useRef<HTMLDivElement | null>(null);
  const threadWrap = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (progress.current) {
          gsap.fromTo(
            progress.current,
            { scaleX: 0 },
            { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } },
          );
        }

        // Hero: words rise from behind their own mask.
        gsap.from(".nsf-word", {
          yPercent: 118,
          duration: 1.05,
          ease: "power3.out",
          stagger: 0.045,
        });
        gsap.from(".nsf-hero-item", {
          opacity: 0,
          y: 18,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.3,
          stagger: 0.09,
        });

        // The thread: a continuous line drawn down the chapters as you scroll —
        // the through-line of a community-run organisation.
        if (thread.current && threadWrap.current) {
          gsap.fromTo(
            thread.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: threadWrap.current,
                start: "top 65%",
                end: "bottom 75%",
                scrub: 0.4,
              },
            },
          );
        }

        // Nodes light up as the thread reaches them.
        gsap.utils.toArray<HTMLElement>(".nsf-node").forEach((node) => {
          gsap.fromTo(
            node,
            { backgroundColor: "#FFFFFF", scale: 1 },
            {
              backgroundColor: BRAND,
              scale: 1.25,
              duration: 0.4,
              ease: "power2.out",
              scrollTrigger: { trigger: node, start: "top 62%", toggleActions: "play none none reverse" },
            },
          );
        });

        // Stacking story cards scale back slightly as the next one covers them.
        gsap.utils.toArray<HTMLElement>(".nsf-stack-card").forEach((card, i, all) => {
          if (i === all.length - 1) return;
          gsap.to(card, {
            scale: 0.95,
            opacity: 0.75,
            ease: "none",
            scrollTrigger: {
              trigger: all[i + 1],
              start: "top 90%",
              end: "top 45%",
              scrub: true,
            },
          });
        });

        gsap.utils.toArray<HTMLElement>(".nsf-rise").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 26,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });

        gsap.utils.toArray<HTMLElement>(".nsf-stagger").forEach((el) => {
          gsap.from(el.children, {
            opacity: 0,
            y: 24,
            scale: 0.97,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.06,
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={root}
      className="relative min-h-screen overflow-x-clip bg-white text-(--neutral-950) antialiased"
    >
      <div
        ref={progress}
        aria-hidden="true"
        style={{ backgroundColor: BRAND }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0"
      />

      {/* ── 01 Hero ──────────────────────────────────────────────────────── */}
      <section className="pt-32 md:pt-40">
        <Shell>
          <div className="nsf-hero-item">
            <Image
              src={LOGO}
              alt={`${title} logo`}
              width={300}
              height={147}
              priority
              className="h-12 w-auto md:h-14"
            />
          </div>

          <p className={`nsf-hero-item mt-10 font-mono text-[12px] font-medium uppercase tracking-[0.18em] ${ACCENT}`}>
            {sector}
          </p>

          <h1 className="mt-5 max-w-5xl font-(family-name:--font-display-family) text-[clamp(2.3rem,5.4vw,4.4rem)] font-semibold leading-[1.06] tracking-[-0.035em]">
            {"Strengthening community engagement through digital storytelling"
              .split(" ")
              .map((word, i) => (
                // The mask needs bottom padding so descenders aren't clipped,
                // but that padding would also inflate every line box — the
                // negative margin cancels it so `leading` is what actually wins.
                <span
                  key={`${word}-${i}`}
                  className="inline-block overflow-hidden pb-[0.2em] -mb-[0.2em] align-bottom"
                >
                  <span className="nsf-word inline-block">{word}&nbsp;</span>
                </span>
              ))}
          </h1>

          <p className="nsf-hero-item mt-8 max-w-2xl text-[clamp(1.1rem,1.6vw,1.4rem)] leading-[1.6] text-(--color-text-secondary)">
            {summary}
          </p>

          <dl className="nsf-hero-item mt-14 grid grid-cols-2 gap-8 border-t border-(--color-border-default) pt-8 sm:grid-cols-3 lg:max-w-4xl">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-(--neutral-400)">
                Sector
              </dt>
              <dd className="mt-2 text-[15px] font-medium text-(--neutral-900)">{sector}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-(--neutral-400)">
                Services
              </dt>
              <dd className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[15px] font-medium text-(--neutral-900)">
                {services.map((s, i) => (
                  <span key={s}>
                    {s}
                    {i < services.length - 1 && (
                      <span className="ml-3 text-(--neutral-300)">·</span>
                    )}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </Shell>

        <div className="mt-16 md:mt-20">
          <div className="nsf-rise relative aspect-[16/10] w-full overflow-hidden bg-(--neutral-100) md:aspect-[16/8]">
            <Image
              src={HERO_SHOT}
              alt={`${title} community storytelling`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── 02 Intro ─────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <Shell>
          <p className="nsf-rise max-w-5xl font-(family-name:--font-display-family) text-[clamp(1.45rem,2.8vw,2.5rem)] font-medium leading-[1.34] tracking-[-0.02em] text-(--neutral-800)">
            {intro}
          </p>
        </Shell>
      </section>

      {/* ── 03 Chapters on a drawn thread ────────────────────────────────── */}
      <section className="pb-24 md:pb-32">
        <Shell>
          <div ref={threadWrap} className="relative pl-10 md:pl-16">
            {/* The rail the thread is drawn along. Starts at the first node's
                centre (9px) so the line emerges from the dot, not above it. */}
            <div
              aria-hidden="true"
              className="absolute left-[7px] top-[9px] h-[calc(100%-9px)] w-px bg-(--color-border-default) md:left-[15px]"
            />
            <div
              ref={thread}
              aria-hidden="true"
              style={{ backgroundColor: BRAND }}
              className="absolute left-[7px] top-[9px] h-[calc(100%-9px)] w-px origin-top scale-y-0 md:left-[15px]"
            />

            <div className="space-y-14 md:space-y-20">
              {sections.map((section, i) => (
                <div key={section.title} className="relative">
                  <span
                    aria-hidden="true"
                    // Offsets are tuned so the 15px dot's centre lands exactly on
                    // the rail: 7.5px (mobile) and 15.5px (md+).
                    className="nsf-node absolute -left-10 top-[2px] block size-[15px] rounded-full border border-(--color-border-default) bg-white md:-left-14"
                    style={{ borderColor: BRAND }}
                  />
                  <div className="nsf-rise grid gap-4 lg:grid-cols-[0.28fr_1fr] lg:gap-14">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-[12px] tabular-nums text-(--neutral-400)">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2
                        className={`font-mono text-[12px] font-medium uppercase tracking-[0.18em] ${ACCENT}`}
                      >
                        {section.title}
                      </h2>
                    </div>
                    <p className="max-w-3xl text-[clamp(1.05rem,1.35vw,1.25rem)] leading-[1.68] text-(--neutral-800)">
                      {section.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Shell>
      </section>

      {/* ── 04 The people — stacking story cards ─────────────────────────── */}
      <section
        style={{ backgroundColor: `${BRAND}0D` }}
        className="border-y border-(--color-border-default) py-24 md:py-32"
      >
        <Shell>
          <div className="nsf-rise max-w-2xl">
            <p className={`font-mono text-[12px] font-medium uppercase tracking-[0.18em] ${ACCENT}`}>
              The formats
            </p>
            <h2 className="mt-4 font-(family-name:--font-display-family) text-[clamp(1.8rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
              Put the people first.
            </h2>
            <p className="mt-5 text-[1.05rem] leading-[1.6] text-(--color-text-secondary)">
              Storytelling formats built around the three groups that make NSF
              work — so the organisation reads as a community, not an acronym.
            </p>
          </div>

          {/* Cards stack as you scroll: each sticks a little lower than the last. */}
          <div className="mt-14 space-y-6">
            {PEOPLE.map((person, i) => (
              <article
                key={person.key}
                className="nsf-stack-card sticky overflow-hidden border border-(--color-border-default) bg-white"
                style={{ top: `${88 + i * 26}px` }}
              >
                <div className="grid gap-0 md:grid-cols-[1fr_0.8fr]">
                  <div className="p-8 md:p-12">
                    <span className="font-mono text-[12px] tabular-nums text-(--neutral-400)">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className="mt-4 font-(family-name:--font-display-family) text-[clamp(1.9rem,3.4vw,2.8rem)] font-semibold leading-none tracking-[-0.03em]"
                      style={{ color: BRAND }}
                    >
                      {person.key}
                    </h3>
                    <p className="mt-3 text-[15px] font-medium text-(--neutral-700)">
                      {person.lead}
                    </p>
                    <p className="mt-5 max-w-md text-[15px] leading-relaxed text-(--color-text-secondary)">
                      {person.body}
                    </p>
                  </div>
                  <div className="relative aspect-[4/3] md:aspect-auto">
                    <Image
                      src={person.image}
                      alt={`${title} — ${person.key} storytelling format`}
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── 05 The content framework — the published run ─────────────────── */}
      <section className="py-24 md:py-32">
        <Shell>
          <div className="nsf-rise mb-12 max-w-2xl">
            <p className={`font-mono text-[12px] font-medium uppercase tracking-[0.18em] ${ACCENT}`}>
              The framework, published
            </p>
            <h2 className="mt-4 font-(family-name:--font-display-family) text-[clamp(1.8rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
              Recurring themes, consistently made.
            </h2>
          </div>

          <div className="nsf-stagger grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-5">
            {MOSAIC.map((src, i) => (
              <div
                key={src}
                className="group relative aspect-square overflow-hidden bg-(--neutral-100)"
              >
                <Image
                  src={src}
                  alt={`${title} social content ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 20vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── 06 What we changed ───────────────────────────────────────────── */}
      {proofPoints.length > 0 && (
        <section className="border-t border-(--color-border-default) py-24 md:py-32">
          <Shell>
            <h2 className="nsf-rise max-w-3xl font-(family-name:--font-display-family) text-[clamp(1.8rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
              What we changed.
            </h2>
            <div className="nsf-stagger mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {proofPoints.map((p, i) => (
                <div
                  key={p.title}
                  className="border-t-2 pt-6 transition-transform duration-500 ease-out hover:-translate-y-1"
                  style={{ borderTopColor: BRAND }}
                >
                  <span className="font-mono text-[12px] tabular-nums text-(--neutral-400)">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-(family-name:--font-display-family) text-[20px] font-semibold leading-tight tracking-[-0.02em]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-(--color-text-secondary)">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </Shell>
        </section>
      )}

      {/* ── 07 Outcomes ──────────────────────────────────────────────────── */}
      {outcomes.length > 0 && (
        <section style={{ backgroundColor: BRAND }} className="py-24 text-white md:py-32">
          <Shell>
            <p className="nsf-rise font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-white/70">
              Outcomes
            </p>
            <ul className="nsf-stagger mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {outcomes.map((o, i) => (
                <li key={o} className="flex gap-5 border-t border-white/25 pt-6">
                  <span className="font-mono text-[13px] text-white/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[clamp(1.1rem,1.5vw,1.4rem)] font-medium leading-[1.4]">{o}</p>
                </li>
              ))}
            </ul>
          </Shell>
        </section>
      )}

      {/* ── 08 Testimonial — a real, attributed client quote ─────────────── */}
      {testimonial?.quote && (
        <section className="py-24 md:py-32">
          <Shell>
            <figure className="nsf-rise mx-auto max-w-4xl">
              <Quote
                aria-hidden="true"
                size={40}
                style={{ color: BRAND }}
                className="opacity-30"
                fill="currentColor"
              />
              <blockquote className="mt-6 font-(family-name:--font-display-family) text-[clamp(1.3rem,2.4vw,2.05rem)] font-medium leading-[1.42] tracking-[-0.02em] text-(--neutral-900)">
                {testimonial.quote}
              </blockquote>
              {testimonial.attribution && (
                <figcaption className="mt-8 flex items-center gap-4 border-t border-(--color-border-default) pt-6">
                  <span
                    aria-hidden="true"
                    style={{ backgroundColor: BRAND }}
                    className="h-10 w-1 shrink-0"
                  />
                  <span className="text-[15px] font-medium text-(--neutral-800)">
                    {testimonial.attribution}
                  </span>
                </figcaption>
              )}
            </figure>
          </Shell>
        </section>
      )}

      {/* ── 09 Footer CTA ────────────────────────────────────────────────── */}
      <footer className="border-t border-(--color-border-default) py-20 md:py-28">
        <Shell className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <h2 className="nsf-rise max-w-2xl font-(family-name:--font-display-family) text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
            Have a story worth
            <br />
            telling well?
          </h2>
          <div className="nsf-rise flex flex-wrap items-center gap-3">
            <StartProjectLink
              source="nsf-case-study"
              style={{ backgroundColor: BRAND }}
              className="group inline-flex items-center gap-2 rounded-full px-7 py-4 text-[15px] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              Start a project
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </StartProjectLink>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-(--color-border-default) px-7 py-4 text-[15px] font-semibold text-(--neutral-800) transition-colors duration-200 hover:bg-(--neutral-50)"
            >
              See more work
            </Link>
          </div>
        </Shell>
      </footer>
    </main>
  );
}
