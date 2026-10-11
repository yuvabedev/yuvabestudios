"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

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

// ─── Curated Indic-AI imagery (web-sized webp) ───────────────────────────────
// NOTE: the asset folder is "Indic-AI" — must match exactly on Linux.
const WEB_HERO = "/assets/Indic-AI/web/web-hero.webp";
const WEB_SHOWCASE = "/assets/Indic-AI/web/web1.webp";
const PRINT = [
  "/assets/Indic-AI/web/print1.webp",
  "/assets/Indic-AI/web/print2.webp",
  "/assets/Indic-AI/web/print3.webp",
];

// The four pillars the story was reframed around — the spine of both the
// client's site and this page.
const PILLARS = [
  {
    key: "Education",
    body: "Learning pathways built so Persons with Disabilities can access training on equal terms.",
    image: "/assets/Indic-AI/web/s1.webp",
  },
  {
    key: "Employment",
    body: "Routes into meaningful work, framed around capability rather than limitation.",
    image: "/assets/Indic-AI/web/s2.webp",
  },
  {
    key: "Healthcare",
    body: "Support that treats access to care as a baseline, not an exception.",
    image: "/assets/Indic-AI/web/s3.webp",
  },
  {
    key: "AI & Technology",
    body: "AI applied to inclusion — the enabling layer beneath the other three pillars.",
    image: "/assets/Indic-AI/web/s4.webp",
  },
];

// Indic-AI's brand palette. Navy carries text and bands (14.7:1 on white);
// blue is the interactive/accent tone (4.6:1 on white — AA for body text).
const NAVY = "#0E2654";
const BLUE = "#2B79BE";

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

// ─── Pillars — expanding panels. On desktop, hover or keyboard focus grows a
// pillar; on mobile everything is stacked and fully visible, since expand-on-
// hover has no touch equivalent. Copy stays in the DOM either way. ───────────
function Pillars() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3 lg:h-[30rem] lg:flex-row">
      {PILLARS.map((pillar, i) => {
        const isActive = active === i;
        return (
          <button
            key={pillar.key}
            type="button"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-label={`${pillar.key}: ${pillar.body}`}
            style={{ flexGrow: isActive ? 2.6 : 1 }}
            className="group relative min-h-[13rem] flex-1 overflow-hidden text-left transition-[flex-grow] duration-700 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2B79BE]/50 lg:min-h-0"
          >
            <Image
              src={pillar.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            {/* Navy scrim keeps the white copy legible on any photograph. */}
            <span
              aria-hidden="true"
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: `linear-gradient(to top, ${NAVY}F2 0%, ${NAVY}A6 45%, ${NAVY}59 100%)`,
              }}
            />
            <span
              aria-hidden="true"
              style={{ backgroundColor: BLUE }}
              className={`absolute inset-x-0 top-0 h-1 origin-left transition-transform duration-500 ease-out ${
                isActive ? "scale-x-100" : "scale-x-0"
              }`}
            />

            <span className="relative flex h-full flex-col justify-end p-6 md:p-8">
              <span className="font-mono text-[11px] tabular-nums text-white/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-3 block font-(family-name:--font-display-family) text-[clamp(1.35rem,2.2vw,1.9rem)] font-semibold leading-tight tracking-[-0.02em] text-white">
                {pillar.key}
              </span>
              {/* Always visible on mobile (no hover there); fades in with the
                  active panel on desktop. Literal classes so Tailwind's JIT
                  can see them — `lg:${...}` interpolation would not compile. */}
              <span
                className={`mt-3 block max-w-xs text-[14px] leading-relaxed text-white/80 transition-opacity duration-500 ${
                  isActive ? "lg:opacity-100" : "lg:opacity-0"
                }`}
              >
                {pillar.body}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

type IndicAiCaseStudyProps = {
  caseStudy: StudioCaseStudySummary;
  detail: ResolvedStudioCaseStudyDetail;
};

export function IndicAiCaseStudy({ caseStudy, detail }: IndicAiCaseStudyProps) {
  const { title, sector, summary, services } = caseStudy;
  const { intro, outcomes, sections, proofPoints, testimonial } = detail;

  const root = useRef<HTMLElement | null>(null);
  const progress = useRef<HTMLDivElement | null>(null);

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

        gsap.from(".ia-word", {
          yPercent: 118,
          duration: 1.05,
          ease: "power3.out",
          stagger: 0.045,
        });
        gsap.from(".ia-hero-item", {
          opacity: 0,
          y: 18,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.3,
          stagger: 0.09,
        });

        // The brochure spreads drift gently against the scroll.
        gsap.utils.toArray<HTMLElement>(".ia-drift-slow").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 40 },
            {
              y: -40,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
        gsap.utils.toArray<HTMLElement>(".ia-rise").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 26,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });

        gsap.utils.toArray<HTMLElement>(".ia-stagger").forEach((el) => {
          gsap.from(el.children, {
            opacity: 0,
            y: 24,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.08,
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
        style={{ backgroundColor: BLUE }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0"
      />

      {/* ── 01 Hero ──────────────────────────────────────────────────────── */}
      <section className="pt-32 md:pt-40">
        <Shell>
          <p
            className="ia-hero-item font-mono text-[12px] font-medium uppercase tracking-[0.18em]"
            style={{ color: NAVY }}
          >
            {sector}
          </p>

          <h1 className="mt-6 max-w-5xl font-(family-name:--font-display-family) text-[clamp(2.3rem,5.4vw,4.4rem)] font-semibold leading-[1.06] tracking-[-0.035em]">
            {"Designing clarity, trust, and action for a mission-driven nonprofit"
              .split(" ")
              .map((word, i) => (
                // pb keeps descenders out of the mask; -mb cancels its effect on
                // the line box so `leading` still governs the spacing.
                <span
                  key={`${word}-${i}`}
                  className="inline-block overflow-hidden pb-[0.2em] -mb-[0.2em] align-bottom"
                >
                  <span className="ia-word inline-block">{word}&nbsp;</span>
                </span>
              ))}
          </h1>

          <p className="ia-hero-item mt-8 max-w-2xl text-[clamp(1.1rem,1.6vw,1.4rem)] leading-[1.6] text-(--color-text-secondary)">
            {summary}
          </p>

          <dl className="ia-hero-item mt-14 grid grid-cols-2 gap-8 border-t border-(--color-border-default) pt-8 sm:grid-cols-3 lg:max-w-4xl">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-(--neutral-400)">
                Sector
              </dt>
              <dd className="mt-2 text-[15px] font-medium text-(--neutral-900)">{sector}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-(--neutral-400)">
                Surfaces
              </dt>
              <dd className="mt-2 text-[15px] font-medium text-(--neutral-900)">Web · Print</dd>
            </div>
            <div>
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
          <div className="ia-rise relative aspect-[16/10] w-full overflow-hidden bg-(--neutral-100) md:aspect-[16/8]">
            <Image
              src={WEB_HERO}
              alt={`${title} redesigned website`}
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
          <p className="ia-rise max-w-5xl font-(family-name:--font-display-family) text-[clamp(1.45rem,2.8vw,2.5rem)] font-medium leading-[1.34] tracking-[-0.02em] text-(--neutral-800)">
            {intro}
          </p>
        </Shell>
      </section>

      {/* ── 03 The four pillars ──────────────────────────────────────────── */}
      <section className="pb-24 md:pb-32">
        <Shell>
          <div className="ia-rise mb-10 max-w-2xl">
            <p
              className="font-mono text-[12px] font-medium uppercase tracking-[0.18em]"
              style={{ color: NAVY }}
            >
              The pillars
            </p>
            <h2 className="mt-4 font-(family-name:--font-display-family) text-[clamp(1.8rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
              One mission, told in four parts.
            </h2>
            <p className="mt-5 text-[1.05rem] leading-[1.6] text-(--color-text-secondary)">
              The story was reframed around four pillars so a complex,
              multi-strand mission could be understood at a glance.
            </p>
          </div>
          <div className="ia-rise">
            <Pillars />
          </div>
        </Shell>
      </section>

      {/* ── 04 The brochure ──────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: `${NAVY}0A` }}
        className="overflow-hidden border-y border-(--color-border-default) py-24 md:py-32"
      >
        <Shell>
          <div className="ia-rise mb-14 max-w-2xl">
            <p
              className="font-mono text-[12px] font-medium uppercase tracking-[0.18em]"
              style={{ color: NAVY }}
            >
              The brochure
            </p>
            <h2 className="mt-4 font-(family-name:--font-display-family) text-[clamp(1.8rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
              The same story, in hand.
            </h2>
            <p className="mt-5 text-[1.05rem] leading-[1.6] text-(--color-text-secondary)">
              A print-ready and digital brochure aligned with the website&apos;s
              visual language — covering mission, programs, impact highlights,
              testimonials, and partner recognition.
            </p>
          </div>

          <div className="ia-drift-slow grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-8">
            {PRINT.map((src, i) => (
              <figure
                key={src}
                className="group relative aspect-[1545/2000] overflow-hidden border border-(--color-border-default) bg-white"
              >
                <Image
                  src={src}
                  alt={`${title} brochure page ${i + 1}`}
                  fill
                  sizes="(min-width: 640px) 30vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </figure>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── 05 Chapters ──────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <Shell>
          <div>
            {sections.map((section, i) => (
              <div
                key={section.title}
                className="ia-rise grid gap-4 border-b border-(--color-border-default) py-10 lg:grid-cols-[0.08fr_0.24fr_1fr] lg:gap-10"
              >
                <span className="font-mono text-[12px] tabular-nums text-(--neutral-400)">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2
                  className="font-mono text-[12px] font-medium uppercase tracking-[0.18em]"
                  style={{ color: NAVY }}
                >
                  {section.title}
                </h2>
                <p className="max-w-3xl text-[clamp(1.05rem,1.35vw,1.25rem)] leading-[1.68] text-(--neutral-800)">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── 06 Accessibility — the constraint that shaped everything ─────── */}
      <section style={{ backgroundColor: NAVY }} className="py-20 text-white md:py-24">
        <Shell>
          <div className="ia-rise grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p
                className="font-mono text-[12px] font-medium uppercase tracking-[0.18em]"
                style={{ color: BLUE }}
              >
                Accessibility-led
              </p>
              <h2 className="mt-4 font-(family-name:--font-display-family) text-[clamp(1.7rem,3.2vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
                Inclusion had to be built in, not bolted on.
              </h2>
            </div>
            <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {[
                "High-contrast colour throughout",
                "Clear typographic hierarchy",
                "Semantic heading structure",
                "Screen-reader-friendly layouts",
              ].map((item) => (
                <li key={item} className="flex gap-3 border-t border-white/20 pt-4">
                  <span aria-hidden="true" style={{ color: BLUE }}>
                    —
                  </span>
                  <span className="text-[15px] leading-relaxed text-white/85">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Shell>
      </section>

      {/* ── 07 What we changed ───────────────────────────────────────────── */}
      {proofPoints.length > 0 && (
        <section className="py-24 md:py-32">
          <Shell>
            <h2 className="ia-rise max-w-3xl font-(family-name:--font-display-family) text-[clamp(1.8rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
              What we changed.
            </h2>
            <div className="ia-stagger mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {proofPoints.map((p, i) => (
                <div
                  key={p.title}
                  className="border-t-2 pt-6 transition-transform duration-500 ease-out hover:-translate-y-1"
                  style={{ borderTopColor: BLUE }}
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

      {/* ── 08 The website build ─────────────────────────────────────────── */}
      <section className="pb-24 md:pb-32">
        <Shell>
          <div className="ia-rise mb-10 max-w-2xl">
            <p
              className="font-mono text-[12px] font-medium uppercase tracking-[0.18em]"
              style={{ color: NAVY }}
            >
              The website
            </p>
            <h2 className="mt-4 font-(family-name:--font-display-family) text-[clamp(1.8rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
              A responsive build the team can run themselves.
            </h2>
          </div>
          <div className="ia-rise relative aspect-[16/10] w-full overflow-hidden bg-(--neutral-100) md:aspect-[16/9]">
            <Image
              src={WEB_SHOWCASE}
              alt={`${title} redesigned website`}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Shell>
      </section>

      {/* ── 09 Outcomes ──────────────────────────────────────────────────── */}
      {outcomes.length > 0 && (
        <section style={{ backgroundColor: NAVY }} className="py-24 text-white md:py-32">
          <Shell>
            <p className="ia-rise font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-white/70">
              Outcomes
            </p>
            <ul className="ia-stagger mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {outcomes.map((o, i) => (
                <li key={o} className="flex gap-5 border-t border-white/25 pt-6">
                  <span className="font-mono text-[13px]" style={{ color: BLUE }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[clamp(1.1rem,1.5vw,1.4rem)] font-medium leading-[1.4]">{o}</p>
                </li>
              ))}
            </ul>
          </Shell>
        </section>
      )}

      {/* ── 10 Testimonial ───────────────────────────────────────────────── */}
      {testimonial?.quote && (
        <section className="py-24 md:py-32">
          <Shell>
            <figure className="ia-rise mx-auto max-w-4xl">
              <Quote
                aria-hidden="true"
                size={40}
                style={{ color: BLUE }}
                className="opacity-40"
                fill="currentColor"
              />
              <blockquote className="mt-6 font-(family-name:--font-display-family) text-[clamp(1.3rem,2.4vw,2.05rem)] font-medium leading-[1.42] tracking-[-0.02em] text-(--neutral-900)">
                {testimonial.quote}
              </blockquote>
              {testimonial.attribution && (
                <figcaption className="mt-8 flex items-center gap-4 border-t border-(--color-border-default) pt-6">
                  <span
                    aria-hidden="true"
                    style={{ backgroundColor: BLUE }}
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

      {/* ── 11 Footer CTA ────────────────────────────────────────────────── */}
      <footer className="border-t border-(--color-border-default) py-20 md:py-28">
        <Shell className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <h2 className="ia-rise max-w-2xl font-(family-name:--font-display-family) text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
            Have a story worth
            <br />
            telling well?
          </h2>
          <div className="ia-rise flex flex-wrap items-center gap-3">
            <StartProjectLink
              source="indic-ai-case-study"
              style={{ backgroundColor: NAVY }}
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
