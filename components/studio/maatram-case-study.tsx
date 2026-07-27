"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import type {
  ResolvedStudioCaseStudyDetail,
  StudioCaseStudySummary,
} from "@/components/studio/studio-case-study-content";

gsap.registerPlugin(ScrollTrigger);

// useLayoutEffect warns during SSR; fall back to useEffect on the server so the
// GSAP setup still runs before paint in the browser (avoids a reveal flash).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// ─── Curated Maatram imagery ─────────────────────────────────────────────────
// NOTE: the asset folder is capitalised "Maatram" — must match exactly on Linux.
const LOGO = "/assets/maatram.svg";
const TESTIMONIAL_POSTER = "/assets/Maatram/web/testimonial.webp";
const TESTIMONIAL_VIDEO_ID = "4KL8YMZ-spU";
const HERO_SHOT = "/assets/Maatram/web/s31.webp";
const IDENTITY = [
  "/assets/Maatram/web/s26.webp",
  "/assets/Maatram/web/s27.webp",
  "/assets/Maatram/web/s28.webp",
  "/assets/Maatram/web/s29.webp",
];
const SITE_SHOT = "/assets/Maatram/web/s32.webp";
const PORTRAIT = "/assets/Maatram/web/s30.webp";

// The site structure Maatram asked for, and the spine of this page.
const STRUCTURE = [
  { key: "What", body: "What Maatram is, and the support it offers the community." },
  { key: "Why", body: "Why a systemic view of mental health matters beyond symptoms." },
  { key: "How", body: "How the work happens — the approach, in plain language." },
  { key: "Who", body: "Who it is for, and who stands behind it." },
];

// A calm teal. 6:1 behind white text — deliberately quiet for the subject.
const BRAND = "#3D6B6E";
const ACCENT = "text-[#3D6B6E]";

// ─── Words as spans so GSAP can animate them individually. Real text stays in
// the DOM for SEO, selection, and no-JS readers. ─────────────────────────────
function Words({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className={`inline-block ${className}`}>
          {word}
          {" "}
        </span>
      ))}
    </>
  );
}

// Click-to-play facade: nothing is requested from YouTube until the visitor
// opts in, and the local poster keeps the section calm until then.
function TestimonialVideo({ title }: { title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-(--neutral-100)">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${TESTIMONIAL_VIDEO_ID}?autoplay=1&rel=0`}
          title={`${title} testimonial`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#3D6B6E]/40"
          aria-label={`Play the ${title} testimonial video`}
        >
          <Image
            src={TESTIMONIAL_POSTER}
            alt=""
            fill
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-(--neutral-950)/25 transition-colors duration-500 group-hover:bg-(--neutral-950)/35" />
          <span className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform duration-500 ease-out group-hover:scale-110 md:size-24">
            <Play size={26} className="ml-1" style={{ color: BRAND }} fill="currentColor" />
          </span>
          <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-(--neutral-700) backdrop-blur transition-transform duration-500 group-hover:-translate-y-0.5">
            Watch —
            {" "}
            <span style={{ color: BRAND }}>Play video</span>
          </span>
        </button>
      )}
    </div>
  );
}

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

// Kolam begins with a grid of dots (pulli). This is a restrained nod to that
// foundation rather than an imitation of the artform itself.
function PulliGrid({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      width="100%"
      height="100%"
    >
      <defs>
        <pattern id="maatram-pulli" width="34" height="34" patternUnits="userSpaceOnUse">
          <circle cx="17" cy="17" r="1.6" fill={BRAND} fillOpacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#maatram-pulli)" />
    </svg>
  );
}

type MaatramCaseStudyProps = {
  caseStudy: StudioCaseStudySummary;
  detail: ResolvedStudioCaseStudyDetail;
};

export function MaatramCaseStudy({ caseStudy, detail }: MaatramCaseStudyProps) {
  const { title, sector, summary, services } = caseStudy;
  const { intro, outcomes, sections, proofPoints } = detail;

  const root = useRef<HTMLElement | null>(null);
  const progress = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Scroll progress rail.
        if (progress.current) {
          gsap.fromTo(
            progress.current,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
            },
          );
        }

        // 1 — Hero headline: words rise from behind their own mask. Slower and
        // softer than the studio's other pages; the subject calls for calm.
        gsap.from(".mm-hero-word", {
          yPercent: 115,
          duration: 1.15,
          ease: "power3.out",
          stagger: 0.04,
        });

        gsap.from(".mm-hero-item", {
          opacity: 0,
          y: 18,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
          stagger: 0.1,
        });

        // 2 — "Clarity through care" was the brief, so the copy resolves from
        // soft-focus into clarity as it enters view.
        gsap.utils.toArray<HTMLElement>(".mm-clarity").forEach((block) => {
          gsap.from(block.querySelectorAll(".mm-clarity-word"), {
            opacity: 0,
            y: 14,
            filter: "blur(6px)",
            duration: 1.1,
            ease: "power2.out",
            stagger: 0.018,
            scrollTrigger: { trigger: block, start: "top 82%" },
          });
        });

        // 3 — Everything else settles in gently.
        gsap.utils.toArray<HTMLElement>(".mm-rise").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 24,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });

        // 4 — Grids stagger their children.
        gsap.utils.toArray<HTMLElement>(".mm-stagger").forEach((el) => {
          gsap.from(el.children, {
            opacity: 0,
            y: 26,
            duration: 0.95,
            ease: "power3.out",
            stagger: 0.1,
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
      {/* Scroll progress rail */}
      <div
        ref={progress}
        aria-hidden="true"
        style={{ backgroundColor: BRAND }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0"
      />

      {/* ── 01 Hero — asymmetric split: copy left, pulli field right ─────── */}
      <section className="relative pt-32 md:pt-40">
        <div className="absolute right-0 top-24 hidden h-[380px] w-[46%] opacity-60 lg:block">
          <PulliGrid className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/40 to-white" />
        </div>

        <Shell className="relative">
          <div className="mm-hero-item">
            <Image
              src={LOGO}
              alt={`${title} logo`}
              width={170}
              height={70}
              priority
              className="h-12 w-auto md:h-14"
            />
          </div>

          <p
            className={`mm-hero-item mt-10 font-mono text-[12px] font-medium uppercase tracking-[0.18em] ${ACCENT}`}
          >
            {sector}
          </p>

          <h1 className="mt-5 max-w-4xl font-(family-name:--font-display-family) text-[clamp(2.3rem,5.6vw,4.6rem)] font-semibold leading-[1.06] tracking-[-0.035em]">
            {"Designing a digital presence for mental health support in Auroville"
              .split(" ")
              .map((word, i) => (
                <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.06em]">
                  <span className="mm-hero-word inline-block">{word}&nbsp;</span>
                </span>
              ))}
          </h1>

          <p className="mm-hero-item mt-8 max-w-2xl text-[clamp(1.1rem,1.6vw,1.4rem)] leading-[1.6] text-(--color-text-secondary)">
            {summary}
          </p>

          <dl className="mm-hero-item mt-14 grid grid-cols-2 gap-8 border-t border-(--color-border-default) pt-8 sm:grid-cols-3 lg:max-w-3xl">
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
        </Shell>

        <div className="mt-16 md:mt-20">
          <div className="mm-rise relative aspect-[16/10] w-full overflow-hidden bg-(--neutral-100) md:aspect-[16/8]">
            <Image
              src={HERO_SHOT}
              alt={`${title} website in context`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── 02 Intro — resolves from soft focus into clarity ─────────────── */}
      <section className="py-24 md:py-32">
        <Shell>
          <p className="mm-clarity max-w-5xl font-(family-name:--font-display-family) text-[clamp(1.45rem,2.8vw,2.5rem)] font-medium leading-[1.34] tracking-[-0.02em] text-(--neutral-800)">
            <Words text={intro} className="mm-clarity-word" />
          </p>
        </Shell>
      </section>

      {/* ── 03 Chapters — label rail left, body right ────────────────────── */}
      <section className="pb-24 md:pb-32">
        <Shell>
          <div className="space-y-14 md:space-y-20">
            {sections.map((section, i) => (
              <div
                key={section.title}
                className="mm-rise group grid gap-4 border-t border-(--color-border-default) pt-8 transition-colors duration-500 hover:border-[#3D6B6E]/40 lg:grid-cols-[0.32fr_1fr] lg:gap-16"
              >
                <div className="flex items-baseline gap-4 transition-transform duration-500 ease-out lg:group-hover:translate-x-1">
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
            ))}
          </div>
        </Shell>
      </section>

      {/* ── 04 Identity work ─────────────────────────────────────────────── */}
      <section className="pb-24 md:pb-32">
        <Shell>
          <div className="mm-stagger grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {IDENTITY.map((src, i) => (
              <div
                key={src}
                className="group relative aspect-square overflow-hidden bg-(--neutral-100)"
              >
                <Image
                  src={src}
                  alt={`${title} brand identity ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── 05 The structure — the site IA we designed ───────────────────── */}
      <section
        style={{ backgroundColor: `${BRAND}0D` }}
        className="border-y border-(--color-border-default) py-24 md:py-32"
      >
        <Shell>
          <div className="mm-rise max-w-2xl">
            <p className={`font-mono text-[12px] font-medium uppercase tracking-[0.18em] ${ACCENT}`}>
              The structure
            </p>
            <h2 className="mt-4 font-(family-name:--font-display-family) text-[clamp(1.8rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
              Four questions, answered in order.
            </h2>
            <p className="mt-5 text-[1.05rem] leading-[1.6] text-(--color-text-secondary)">
              Content was organised so a visitor can understand Maatram at a
              glance — without overwhelm, and without stigma.
            </p>
          </div>

          <ol className="mm-stagger mt-14 grid gap-px overflow-hidden border border-(--color-border-default) bg-(--color-border-default) sm:grid-cols-2 lg:grid-cols-4">
            {STRUCTURE.map((item, i) => (
              <li
                key={item.key}
                className="group relative bg-white p-8 transition-colors duration-500 hover:bg-(--neutral-50)"
              >
                {/* Accent bar grows on hover — a quiet affordance, not a jump. */}
                <span
                  aria-hidden="true"
                  style={{ backgroundColor: BRAND }}
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
                <span className="font-mono text-[12px] tabular-nums text-(--neutral-400)">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="mt-4 font-(family-name:--font-display-family) text-[2rem] font-semibold leading-none tracking-[-0.03em] transition-transform duration-500 ease-out group-hover:translate-x-1"
                  style={{ color: BRAND }}
                >
                  {item.key}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-(--color-text-secondary)">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </Shell>
      </section>

      {/* ── 06 The website ───────────────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <Shell>
          <div className="mm-rise group relative aspect-[16/9] w-full overflow-hidden bg-(--neutral-100)">
            <Image
              src={SITE_SHOT}
              alt={`${title} website design`}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
            />
          </div>

          <div className="mm-stagger mt-6 grid gap-6 lg:grid-cols-[1fr_0.55fr]">
            <div className="group relative aspect-[16/10] overflow-hidden bg-(--neutral-100)">
              <Image
                src={IDENTITY[0]}
                alt={`${title} identity applied`}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div className="group relative aspect-[3/4] overflow-hidden bg-(--neutral-100) lg:aspect-auto">
              <Image
                src={PORTRAIT}
                alt={`${title} brand collateral`}
                fill
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              />
            </div>
          </div>
        </Shell>
      </section>

      {/* ── 07 What we changed ───────────────────────────────────────────── */}
      {proofPoints.length > 0 && (
        <section className="border-t border-(--color-border-default) py-24 md:py-32">
          <Shell>
            <h2 className="mm-rise max-w-3xl font-(family-name:--font-display-family) text-[clamp(1.8rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
              What we changed.
            </h2>
            <div className="mm-stagger mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {proofPoints.map((p, i) => (
                <div
                  key={p.title}
                  className="group border-t pt-6 transition-transform duration-500 ease-out hover:-translate-y-1"
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

      {/* ── 08 Outcomes ──────────────────────────────────────────────────── */}
      {outcomes.length > 0 && (
        <section style={{ backgroundColor: BRAND }} className="py-24 text-white md:py-32">
          <Shell>
            <p className="mm-rise font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-white/70">
              Outcomes
            </p>
            <ul className="mm-stagger mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
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

      {/* ── 09 Testimonial — its own section, ahead of the CTA ───────────── */}
      <section className="py-24 md:py-32">
        <Shell>
          <div className="mm-rise flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={`font-mono text-[12px] font-medium uppercase tracking-[0.18em] ${ACCENT}`}>
                In their words
              </p>
              <h2 className="mt-4 max-w-xl font-(family-name:--font-display-family) text-[clamp(1.8rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
                Hear it from the Maatram team.
              </h2>
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed text-(--color-text-secondary)">
              A short conversation about the work, the approach, and what changed
              for the community.
            </p>
          </div>

          <div className="mm-rise mt-12">
            <TestimonialVideo title={title} />
          </div>
        </Shell>
      </section>

      {/* ── 10 Footer CTA ────────────────────────────────────────────────── */}
      <footer className="border-t border-(--color-border-default) py-20 md:py-28">
        <Shell className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <h2 className="mm-rise max-w-2xl font-(family-name:--font-display-family) text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
            Have a story worth
            <br />
            telling well?
          </h2>
          <div className="mm-rise flex flex-wrap items-center gap-3">
            <a
              href="mailto:sales@yuvabe.com"
              style={{ backgroundColor: BRAND }}
              className="group inline-flex items-center gap-2 rounded-full px-7 py-4 text-[15px] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              Start a project
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
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
