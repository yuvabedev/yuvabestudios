"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
// GSAP setup still runs before paint in the browser (avoids a reveal flash).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// ─── Curated Hemplanet imagery (web-sized webp) ──────────────────────────────
const BANNER = "/assets/hemplanet/web/banner.webp";
const PRODUCTS = [
  "/assets/hemplanet/web/p1.webp",
  "/assets/hemplanet/web/p2.webp",
  "/assets/hemplanet/web/p3.webp",
  "/assets/hemplanet/web/p4.webp",
];
const HERO_PRODUCT = "/assets/hemplanet/web/p7.webp";
// The workshop documentation — the filmstrip that carries the photography story.
const WORKSHOP = Array.from({ length: 9 }, (_, i) => `/assets/hemplanet/web/w${i + 1}.webp`);

// Hemp green. 6.1:1 behind white text, so it works as accent type and as a band.
const BRAND = "#4C6B3C";
const ACCENT = "text-[#4C6B3C]";

const easeOut = "power3.out";

// ─── Words rendered as spans so GSAP can animate them individually. Real text
// stays in the DOM for SEO, selection, and no-JS readers. ────────────────────
function Words({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className={`inline-block ${className}`}>
          {word}
          {" "}
        </span>
      ))}
    </>
  );
}

type HemplanetCaseStudyProps = {
  caseStudy: StudioCaseStudySummary;
  detail: ResolvedStudioCaseStudyDetail;
};

export function HemplanetCaseStudy({ caseStudy, detail }: HemplanetCaseStudyProps) {
  const { title, sector, summary, services } = caseStudy;
  const { intro, outcomes, sections, proofPoints, testimonial } = detail;

  const root = useRef<HTMLElement | null>(null);
  const strip = useRef<HTMLDivElement | null>(null);
  const stripSection = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // All motion is gated behind prefers-reduced-motion.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1 — Hero: each word rises from behind its own mask.
        gsap.from(".hp-hero-word", {
          yPercent: 120,
          duration: 1,
          ease: easeOut,
          stagger: 0.045,
        });

        gsap.from(".hp-hero-meta", {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: easeOut,
          delay: 0.35,
          stagger: 0.08,
        });

        // 2 — Reading highlight: words illuminate as the block scrolls past.
        gsap.utils.toArray<HTMLElement>(".hp-read").forEach((block) => {
          gsap.fromTo(
            block.querySelectorAll(".hp-read-word"),
            { opacity: 0.18 },
            {
              opacity: 1,
              ease: "none",
              stagger: 1,
              scrollTrigger: {
                trigger: block,
                start: "top 78%",
                end: "bottom 55%",
                scrub: true,
              },
            },
          );
        });

        // 3 — Chapters and cards lift in on entry.
        gsap.utils.toArray<HTMLElement>(".hp-rise").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 48,
            duration: 0.9,
            ease: easeOut,
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });

        // 4 — Product tiles drift at differing rates for depth.
        gsap.utils.toArray<HTMLElement>(".hp-drift").forEach((el, i) => {
          gsap.fromTo(
            el,
            { y: i % 2 === 0 ? 40 : 70 },
            {
              y: i % 2 === 0 ? -40 : -70,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });
      });

      // 5 — Workshop filmstrip: the section sticks (CSS) while the track slides
      // sideways. Desktop only — on touch it stays a normal swipe-scroll list.
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = strip.current;
          const section = stripSection.current;
          if (!track || !section) return;

          // Recomputed on refresh so resizes and font loads stay correct.
          const distance = () => track.scrollWidth - window.innerWidth + 96;

          const tween = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
            gsap.set(track, { clearProps: "x" });
          };
        },
      );

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={root}
      className="relative min-h-screen overflow-x-clip bg-white text-(--neutral-950) antialiased"
    >
      {/* ── 01 Hero — masked word reveal ─────────────────────────────────── */}
      <section className="pt-32 md:pt-40">
        <div className="mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-16">
          <p
            className={`hp-hero-meta font-mono text-[12px] font-medium uppercase tracking-[0.18em] ${ACCENT}`}
          >
            {sector}
          </p>

          {/* Each word sits in an overflow-hidden wrapper so it can rise from a mask. */}
          <h1 className="mt-6 font-(family-name:--font-display-family) text-[clamp(3rem,11vw,10rem)] font-semibold leading-[0.9] tracking-[-0.045em]">
            {title.split(" ").map((word, i) => (
              <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em]">
                <span className="hp-hero-word inline-block">{word}</span>
              </span>
            ))}
          </h1>

          <p className="hp-hero-meta mt-8 max-w-2xl text-[clamp(1.15rem,1.8vw,1.6rem)] font-medium leading-[1.45] text-(--color-text-secondary)">
            {summary}
          </p>

          <dl className="hp-hero-meta mt-14 grid grid-cols-2 gap-8 border-t border-(--color-border-default) pt-8 sm:grid-cols-3 lg:max-w-3xl">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-(--neutral-400)">
                Industry
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
        </div>

        <div className="mt-16 md:mt-20">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-(--neutral-100) md:aspect-[16/7]">
            <Image
              src={BANNER}
              alt={`${title} — sustainable hemp lifestyle brand`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── 02 Intro — scroll-scrubbed reading highlight ─────────────────── */}
      <section className="py-28 md:py-40">
        <div className="mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-16">
          <p className="hp-read max-w-5xl font-(family-name:--font-display-family) text-[clamp(1.5rem,3.2vw,2.8rem)] font-medium leading-[1.32] tracking-[-0.02em]">
            <Words text={intro} className="hp-read-word" />
          </p>
        </div>
      </section>

      {/* ── 03 Workshop filmstrip — sticky horizontal documentary ────────── */}
      <section
        ref={stripSection}
        aria-label="Hemp workshop documentation"
        className="relative bg-(--neutral-50) py-16 lg:h-screen lg:py-0"
      >
        <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center">
          <div className="mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-16">
            <p className={`font-mono text-[12px] font-medium uppercase tracking-[0.14em] ${ACCENT}`}>
              From the workshops
            </p>
            <h2 className="mt-4 max-w-2xl font-(family-name:--font-display-family) text-[clamp(1.7rem,3.4vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              Documenting hemp, hand to product.
            </h2>
          </div>

          {/* Desktop: GSAP slides this track. Touch: plain swipe-scroll. */}
          <div className="mt-10 overflow-x-auto pb-4 lg:mt-14 lg:overflow-visible lg:pb-0">
            <div
              ref={strip}
              className="flex w-max gap-4 px-6 md:gap-6 md:px-12 lg:px-16"
            >
              {WORKSHOP.map((src, i) => (
                <figure
                  key={src}
                  className="relative aspect-[4/3] w-[260px] shrink-0 overflow-hidden bg-(--neutral-100) sm:w-[320px] lg:w-[420px]"
                >
                  <Image
                    src={src}
                    alt={`${title} hemp workshop documentation ${i + 1}`}
                    fill
                    sizes="(min-width: 1024px) 420px, 320px"
                    className="object-cover"
                  />
                  <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-(--neutral-700) backdrop-blur">
                    {String(i + 1).padStart(2, "0")}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 Chapters ──────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1600px] space-y-20 px-6 md:space-y-28 md:px-12 lg:px-16">
          {sections.map((section, i) => (
            <div
              key={section.title}
              className="hp-rise grid gap-6 border-t border-(--color-border-default) pt-10 lg:grid-cols-[0.4fr_1fr] lg:gap-16"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[13px] font-medium tabular-nums text-(--neutral-400)">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-(family-name:--font-display-family) text-[clamp(1.5rem,2.6vw,2.2rem)] font-semibold leading-[1.06] tracking-[-0.03em]">
                  {section.title}
                </h3>
              </div>
              <p className="hp-read max-w-3xl text-[clamp(1.05rem,1.35vw,1.3rem)] leading-[1.6]">
                <Words text={section.body} className="hp-read-word" />
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 05 Product photography — drifting grid ───────────────────────── */}
      <section className="overflow-hidden py-8 md:py-16">
        <div className="mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            <div className="hp-drift relative col-span-2 aspect-[16/10] overflow-hidden bg-(--neutral-100) lg:col-span-4">
              <Image
                src={HERO_PRODUCT}
                alt={`${title} product photography`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            {PRODUCTS.map((src, i) => (
              <div
                key={src}
                className="hp-drift relative aspect-square overflow-hidden bg-(--neutral-100)"
              >
                <Image
                  src={src}
                  alt={`${title} product photography ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 What changed — proof points ───────────────────────────────── */}
      {proofPoints.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-16">
            <h2 className="hp-rise max-w-3xl font-(family-name:--font-display-family) text-[clamp(1.9rem,4vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
              What we changed.
            </h2>
            <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {proofPoints.map((p, i) => (
                <div
                  key={p.title}
                  className="hp-rise border-t-2 pt-6 transition-transform duration-300 hover:-translate-y-1.5"
                  style={{ borderTopColor: BRAND }}
                >
                  <span className="font-mono text-[12px] font-medium text-(--neutral-400)">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-(family-name:--font-display-family) text-[24px] font-semibold leading-tight tracking-[-0.02em]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-(--color-text-secondary)">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 07 Outcomes ──────────────────────────────────────────────────── */}
      {outcomes.length > 0 && (
        <section style={{ backgroundColor: BRAND }} className="py-24 text-white md:py-32">
          <div className="mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-16">
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-white/70">
              Outcomes
            </span>
            <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {outcomes.map((o, i) => (
                <div key={o} className="hp-rise flex gap-5 border-t border-white/25 pt-6">
                  <span className="font-mono text-[13px] text-white/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[clamp(1.15rem,1.6vw,1.5rem)] font-medium leading-[1.35] tracking-[-0.01em]">
                    {o}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 08 Testimonial ───────────────────────────────────────────────── */}
      {testimonial?.quote && (
        <section className="py-28 md:py-40">
          <div className="mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-16">
            <blockquote className="hp-rise mx-auto max-w-5xl text-center">
              <p className="font-(family-name:--font-display-family) text-[clamp(1.7rem,3.6vw,3.2rem)] font-medium leading-[1.18] tracking-[-0.025em]">
                <span className={ACCENT}>“</span>
                {testimonial.quote}
                <span className={ACCENT}>”</span>
              </p>
              {testimonial.attribution && (
                <footer className="mt-10 font-mono text-[13px] uppercase tracking-[0.14em] text-(--neutral-500)">
                  {testimonial.attribution}
                </footer>
              )}
            </blockquote>
          </div>
        </section>
      )}

      {/* ── 09 Footer CTA ────────────────────────────────────────────────── */}
      <footer style={{ backgroundColor: BRAND }} className="py-20 text-white md:py-28">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col items-start justify-between gap-10 px-6 md:flex-row md:items-end md:px-12 lg:px-16">
          <h2 className="max-w-2xl font-(family-name:--font-display-family) text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
            Have a story worth
            <br />
            telling well?
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <StartProjectLink
              source="hemplanet-case-study"
              style={{ color: BRAND }}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-[15px] font-semibold transition-transform duration-200 hover:-translate-y-0.5"
            >
              Start a project
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </StartProjectLink>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-white/10"
            >
              See more work
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
