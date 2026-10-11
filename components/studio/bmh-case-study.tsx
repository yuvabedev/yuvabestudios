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
import { StartProjectLink } from "@/components/studio/start-project-link";

gsap.registerPlugin(ScrollTrigger);

// useLayoutEffect warns during SSR; fall back to useEffect on the server so the
// GSAP setup still runs before paint in the browser.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// ─── Curated BMH imagery (web-sized webp) ────────────────────────────────────
const SOCIAL = [
  "/assets/bmh/web/s1.webp",
  "/assets/bmh/web/s2.webp",
  "/assets/bmh/web/s3.webp",
  "/assets/bmh/web/s4.webp",
];
// The HubSpot newsletter editions sent across the B2B network.
const NEWSLETTER_EDITIONS = [
  "/assets/bmh/web/poster1.webp",
  "/assets/bmh/web/poster2.webp",
  "/assets/bmh/web/poster3.webp",
];
const WEBSITE = ["/assets/bmh/web/wide1.webp", "/assets/bmh/web/wide2.webp"];
const TESTIMONIAL_POSTER = "/assets/bmh/web/wide2.webp";
const TESTIMONIAL_VIDEO_ID = "FssqEYEdbfo";

// BMH's brand red, sampled from the newsletter artwork (6.4:1 behind white).
const BRAND = "#B82028";
const ACCENT = "text-[#B82028]";

// The three channels the work ran across. Rendered as a tab switcher, since the
// point of the engagement was one strategy expressed through three surfaces.
type ChannelKey = "social" | "newsletter" | "website";

const CHANNELS: {
  key: ChannelKey;
  label: string;
  spec: string;
  body: string;
}[] = [
  {
    key: "social",
    label: "Social",
    spec: "Content strategy · Visual guidelines",
    body: "A structured B2B content strategy and visual guidelines highlighting product innovation, industry expertise, and practical use cases for industrial buyers.",
  },
  {
    key: "newsletter",
    label: "Newsletter",
    spec: "HubSpot template · Lead nurturing",
    body: "A custom HubSpot newsletter template supporting regular communication, client education, and lead nurturing across BMH's B2B network.",
  },
  {
    key: "website",
    label: "Website",
    spec: "Bespoke illustration · Maintenance",
    body: "Bespoke illustrations and ongoing website updates for a modern, professional, user-friendly experience aligned with BMH's brand identity.",
  },
];

// Click-to-play facade: nothing is requested from YouTube until the visitor
// opts in, so the page loads no third-party scripts or cookies by default.
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
          aria-label={`Play the ${title} testimonial video`}
          className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#B82028]/40"
        >
          <Image
            src={TESTIMONIAL_POSTER}
            alt=""
            fill
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-(--neutral-950)/45 transition-colors duration-500 group-hover:bg-(--neutral-950)/55" />
          <span
            style={{ backgroundColor: BRAND }}
            className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg transition-transform duration-500 ease-out group-hover:scale-110 md:size-24"
          >
            <Play size={26} className="ml-1 text-white" fill="currentColor" />
          </span>
          <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-(--neutral-700) backdrop-blur transition-transform duration-500 group-hover:-translate-y-0.5">
            Watch — <span style={{ color: BRAND }}>Play video</span>
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

// A faint blueprint rule grid — industrial drafting, not decoration.
function Blueprint({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={`pointer-events-none ${className}`} width="100%" height="100%">
      <defs>
        <pattern id="bmh-grid" width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M64 0H0V64" fill="none" stroke={BRAND} strokeOpacity="0.14" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bmh-grid)" />
    </svg>
  );
}

// ─── Channel switcher — the signature interaction. Implements the ARIA tabs
// pattern including arrow-key roving focus. ──────────────────────────────────
function ChannelTabs({ title }: { title: string }) {
  const [active, setActive] = useState<ChannelKey>("social");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  function onKeyDown(event: React.KeyboardEvent) {
    const i = CHANNELS.findIndex((c) => c.key === active);
    let next = i;
    if (event.key === "ArrowRight") next = (i + 1) % CHANNELS.length;
    else if (event.key === "ArrowLeft") next = (i - 1 + CHANNELS.length) % CHANNELS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = CHANNELS.length - 1;
    else return;

    event.preventDefault();
    const key = CHANNELS[next].key;
    setActive(key);
    tabRefs.current[key]?.focus();
  }

  const current = CHANNELS.find((c) => c.key === active)!;

  return (
    <div>
      <div
        role="tablist"
        aria-label="Channels this work ran across"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-px border border-(--color-border-default) bg-(--color-border-default)"
      >
        {CHANNELS.map((channel) => {
          const selected = channel.key === active;
          return (
            <button
              key={channel.key}
              ref={(node) => {
                tabRefs.current[channel.key] = node;
              }}
              role="tab"
              id={`bmh-tab-${channel.key}`}
              aria-selected={selected}
              aria-controls={`bmh-panel-${channel.key}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(channel.key)}
              style={selected ? { backgroundColor: BRAND } : undefined}
              className={`relative flex-1 basis-40 px-6 py-5 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#B82028] ${
                selected ? "text-white" : "bg-white text-(--neutral-900) hover:bg-(--neutral-50)"
              }`}
            >
              <span
                className={`font-mono text-[11px] uppercase tracking-[0.16em] ${
                  selected ? "text-white/60" : "text-(--neutral-400)"
                }`}
              >
                {String(CHANNELS.indexOf(channel) + 1).padStart(2, "0")}
              </span>
              <span className="mt-2 block font-(family-name:--font-display-family) text-[clamp(1.15rem,2vw,1.6rem)] font-semibold tracking-[-0.02em]">
                {channel.label}
              </span>
              <span
                className={`mt-1 block font-mono text-[11px] tracking-[0.04em] ${
                  selected ? "text-white/70" : "text-(--neutral-500)"
                }`}
              >
                {channel.spec}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`bmh-panel-${active}`}
        aria-labelledby={`bmh-tab-${active}`}
        className="border border-t-0 border-(--color-border-default) p-6 md:p-10"
      >
        <p className="max-w-2xl text-[clamp(1.05rem,1.35vw,1.25rem)] leading-[1.65] text-(--neutral-800)">
          {current.body}
        </p>

        <div className="mt-8">
          {active === "social" && (
            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
              {SOCIAL.map((src, i) => (
                <div
                  key={src}
                  className="group relative aspect-square overflow-hidden bg-(--neutral-100)"
                >
                  <Image
                    src={src}
                    alt={`${title} social campaign ${i + 1}`}
                    fill
                    sizes="(min-width: 1024px) 22vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
              ))}
            </div>
          )}

          {active === "newsletter" && (
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-(--neutral-400)">
                Editions
              </p>
              {/* Capped width: the source artwork is ~320px wide, so a full-bleed
                  three-up would upscale it into softness. */}
              <div className="mt-4 grid max-w-5xl grid-cols-3 gap-4 md:gap-6">
                {NEWSLETTER_EDITIONS.map((src, i) => (
                  <div
                    key={src}
                    className="group relative aspect-[3/4] overflow-hidden border border-(--color-border-default) bg-white"
                  >
                    <Image
                      src={src}
                      alt={`${title} newsletter edition ${i + 1}`}
                      fill
                      sizes="(min-width: 1024px) 22vw, 30vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "website" && (
            <div className="grid gap-4 md:gap-6">
              {WEBSITE.map((src, i) => (
                <div
                  key={src}
                  className="group relative aspect-[16/9] w-full overflow-hidden bg-(--neutral-100)"
                >
                  <Image
                    src={src}
                    alt={`${title} website and illustration work ${i + 1}`}
                    fill
                    sizes="(min-width: 1024px) 70vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type BmhCaseStudyProps = {
  caseStudy: StudioCaseStudySummary;
  detail: ResolvedStudioCaseStudyDetail;
};

export function BmhCaseStudy({ caseStudy, detail }: BmhCaseStudyProps) {
  const { title, sector, summary, services } = caseStudy;
  const { intro, outcomes, sections, proofPoints } = detail;

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

        // Hero: title lines wipe up from a mask, spec rows tick in after.
        gsap.from(".bmh-hero-line", {
          yPercent: 115,
          duration: 1,
          ease: "power3.out",
          stagger: 0.07,
        });
        gsap.from(".bmh-hero-item", {
          opacity: 0,
          y: 18,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.25,
          stagger: 0.09,
        });

        // Spec rows draw in from the left, like a datasheet filling out.
        gsap.utils.toArray<HTMLElement>(".bmh-row").forEach((row) => {
          gsap.from(row, {
            opacity: 0,
            x: -18,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 88%" },
          });
        });

        gsap.utils.toArray<HTMLElement>(".bmh-rise").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 26,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });

        gsap.utils.toArray<HTMLElement>(".bmh-stagger").forEach((el) => {
          gsap.from(el.children, {
            opacity: 0,
            y: 24,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.09,
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

      {/* ── 01 Hero — datasheet header on a blueprint field ──────────────── */}
      <section className="relative pt-32 md:pt-40">
        <div className="absolute inset-x-0 top-0 h-[520px] opacity-60">
          <Blueprint className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white" />
        </div>

        <Shell className="relative">
          <p className={`bmh-hero-item font-mono text-[12px] font-medium uppercase tracking-[0.18em] ${ACCENT}`}>
            {sector}
          </p>

          <h1 className="mt-6 max-w-5xl font-(family-name:--font-display-family) text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            {["Driving B2B growth through", "strategic digital marketing"].map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span className="bmh-hero-line block">{line}</span>
              </span>
            ))}
          </h1>

          <p className="bmh-hero-item mt-8 max-w-2xl text-[clamp(1.1rem,1.6vw,1.4rem)] leading-[1.6] text-(--color-text-secondary)">
            {summary}
          </p>

          {/* Spec table rather than prose meta — the industrial register. */}
          <dl className="bmh-hero-item mt-14 grid grid-cols-2 border-t border-(--color-border-default) sm:grid-cols-4">
            {[
              ["Sector", sector],
              ["Experience", "40+ years"],
              ["Channels", "Social · Email · Web"],
              ["Services", `${services.length} workstreams`],
            ].map(([label, value]) => (
              <div key={label} className="border-b border-(--color-border-default) py-5 pr-6">
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-(--neutral-400)">
                  {label}
                </dt>
                <dd className="mt-2 text-[15px] font-medium text-(--neutral-900)">{value}</dd>
              </div>
            ))}
          </dl>
        </Shell>
      </section>

      {/* ── 02 Intro ─────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <Shell>
          <p className="bmh-rise max-w-5xl font-(family-name:--font-display-family) text-[clamp(1.45rem,2.8vw,2.5rem)] font-medium leading-[1.34] tracking-[-0.02em] text-(--neutral-800)">
            {intro}
          </p>
        </Shell>
      </section>

      {/* ── 03 Channels — the tab switcher ───────────────────────────────── */}
      <section className="pb-24 md:pb-32">
        <Shell>
          <div className="bmh-rise mb-10 max-w-2xl">
            <p className={`font-mono text-[12px] font-medium uppercase tracking-[0.18em] ${ACCENT}`}>
              The channels
            </p>
            <h2 className="mt-4 font-(family-name:--font-display-family) text-[clamp(1.8rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
              One strategy, three surfaces.
            </h2>
          </div>
          <div className="bmh-rise">
            <ChannelTabs title={title} />
          </div>
        </Shell>
      </section>

      {/* ── 04 Chapters — numbered spec rows ─────────────────────────────── */}
      <section className="border-t border-(--color-border-default) py-24 md:py-32">
        <Shell>
          <div>
            {sections.map((section, i) => (
              <div
                key={section.title}
                className="bmh-row group grid gap-4 border-b border-(--color-border-default) py-10 transition-colors duration-500 hover:bg-(--neutral-50) lg:grid-cols-[0.08fr_0.24fr_1fr] lg:gap-10"
              >
                <span className="font-mono text-[12px] tabular-nums text-(--neutral-400)">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2
                  className={`font-mono text-[12px] font-medium uppercase tracking-[0.18em] transition-transform duration-500 ease-out lg:group-hover:translate-x-1 ${ACCENT}`}
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

      {/* ── 05 What we changed ───────────────────────────────────────────── */}
      {proofPoints.length > 0 && (
        <section className="py-24 md:py-32">
          <Shell>
            <h2 className="bmh-rise max-w-3xl font-(family-name:--font-display-family) text-[clamp(1.8rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
              What we changed.
            </h2>
            <div className="bmh-stagger mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* ── 06 Outcomes ──────────────────────────────────────────────────── */}
      {outcomes.length > 0 && (
        <section style={{ backgroundColor: BRAND }} className="py-24 text-white md:py-32">
          <Shell>
            <p className="bmh-rise font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-white/70">
              Outcomes
            </p>
            <ul className="bmh-stagger mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
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

      {/* ── 07 Testimonial — its own section, ahead of the CTA ───────────── */}
      <section className="py-24 md:py-32">
        <Shell>
          <div className="bmh-rise flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={`font-mono text-[12px] font-medium uppercase tracking-[0.18em] ${ACCENT}`}>
                In their words
              </p>
              <h2 className="mt-4 max-w-xl font-(family-name:--font-display-family) text-[clamp(1.8rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
                Hear it from the BMH team.
              </h2>
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed text-(--color-text-secondary)">
              A short conversation about the work, the approach, and what changed
              across their B2B channels.
            </p>
          </div>

          <div className="bmh-rise mt-12">
            <TestimonialVideo title={title} />
          </div>
        </Shell>
      </section>

      {/* ── 08 Footer CTA ────────────────────────────────────────────────── */}
      <footer className="border-t border-(--color-border-default) py-20 md:py-28">
        <Shell className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <h2 className="bmh-rise max-w-2xl font-(family-name:--font-display-family) text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
            Have a story worth
            <br />
            telling well?
          </h2>
          <div className="bmh-rise flex flex-wrap items-center gap-3">
            <StartProjectLink
              source="bmh-case-study"
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
