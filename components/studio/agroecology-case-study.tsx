"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ClipboardList, Database, Map as MapIcon, MapPin, Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import type {
  ResolvedStudioCaseStudyDetail,
  StudioCaseStudySummary,
} from "@/components/studio/studio-case-study-content";
import { StartProjectLink } from "@/components/studio/start-project-link";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// ─── Curated Agroecology India imagery (web-sized webp) ──────────────────────
const LOGO = "/assets/agroecological/cat.svg";
const HERO_SHOT = "/assets/agroecological/web/hero.webp";
const MAP_SCREEN = "/assets/agroecological/web/screen2.webp";
const HUB_SCREEN = "/assets/agroecological/web/screen1.webp";
// The survey-to-map pipeline that closes the loop.
const FLOW = [
  {
    icon: ClipboardList,
    title: "Submit",
    body: "Field teams add initiatives and research through survey workflows built into the platform.",
  },
  {
    icon: Database,
    title: "Structure",
    body: "Entries are validated and organised into the knowledge library — no manual re-keying.",
  },
  {
    icon: MapIcon,
    title: "Surface",
    body: "The Bharat Agroecology Tracker and library update in real time, so the picture stays current.",
  },
];
const TESTIMONIAL_POSTER = "/assets/agroecological/web/field.webp";
const TESTIMONIAL_VIDEO_ID = "2LkGlhTMgAQ";

// The scale of the mission and the platform, as headline figures.
const STATS = [
  { to: 40, suffix: "M", label: "Farmers targeted by 2030" },
  { to: 100, suffix: "+", label: "Research papers structured" },
  { to: 1000, suffix: "+", label: "Initiatives mapped across India" },
];

// Agroecology India's brand palette.
const TEAL = "#2E7574"; // 4.9:1 on white
const MINT = "#E0EDE8"; // pale section field
const ACCENT = "text-[#2E7574]";

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

function fmt(n: number) {
  return Math.round(n).toLocaleString("en-IN");
}

// Video testimonial — click-to-play facade; no third-party request until click.
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
          className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2E7574]/40"
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
            style={{ backgroundColor: TEAL }}
            className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg transition-transform duration-500 ease-out group-hover:scale-110 md:size-24"
          >
            <Play size={26} className="ml-1 text-white" fill="currentColor" />
          </span>
          <span className="absolute bottom-5 left-5 max-w-xs rounded-lg bg-white/90 px-4 py-3 backdrop-blur">
            <span className="block text-[13px] font-semibold text-(--neutral-950)">
              Minhaj Ameen
            </span>
            <span className="block text-[12px] text-(--neutral-600)">
              Operations Director, Agroecology India
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

type AgroecologyCaseStudyProps = {
  caseStudy: StudioCaseStudySummary;
  detail: ResolvedStudioCaseStudyDetail;
};

export function AgroecologyCaseStudy({ caseStudy, detail }: AgroecologyCaseStudyProps) {
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

        gsap.from(".ag-word", {
          yPercent: 118,
          duration: 1.05,
          ease: "power3.out",
          stagger: 0.045,
        });
        gsap.from(".ag-hero-item", {
          opacity: 0,
          y: 18,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.3,
          stagger: 0.09,
        });

        // Data platform → the figures count up as the band scrolls in.
        gsap.utils.toArray<HTMLElement>(".ag-stat-value").forEach((el) => {
          const to = Number(el.dataset.to || "0");
          const suffix = el.dataset.suffix || "";
          const obj = { v: 0 };
          gsap.to(obj, {
            v: to,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
            onUpdate: () => {
              el.textContent = fmt(obj.v) + suffix;
            },
          });
        });

        gsap.utils.toArray<HTMLElement>(".ag-rise").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 26,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });

        gsap.utils.toArray<HTMLElement>(".ag-stagger").forEach((el) => {
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
        style={{ backgroundColor: TEAL }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0"
      />

      {/* ── 01 Hero ──────────────────────────────────────────────────────── */}
      <section className="pt-32 md:pt-40">
        <Shell>
          <div className="ag-hero-item">
            <Image
              src={LOGO}
              alt={`${title} logo`}
              width={120}
              height={120}
              priority
              className="h-12 w-auto md:h-14"
            />
          </div>

          <p className={`ag-hero-item mt-10 font-mono text-[12px] font-medium uppercase tracking-[0.18em] ${ACCENT}`}>
            {sector}
          </p>

          <h1 className="mt-5 max-w-5xl font-(family-name:--font-display-family) text-[clamp(2.3rem,5.4vw,4.4rem)] font-semibold leading-[1.06] tracking-[-0.035em]">
            {"Building a digital knowledge hub for sustainable food and farming"
              .split(" ")
              .map((word, i) => (
                <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                  <span className="ag-word inline-block">{word}&nbsp;</span>
                </span>
              ))}
          </h1>

          <p className="ag-hero-item mt-8 max-w-2xl text-[clamp(1.1rem,1.6vw,1.4rem)] leading-[1.6] text-(--color-text-secondary)">
            {summary}
          </p>

          <dl className="ag-hero-item mt-14 grid grid-cols-2 gap-8 border-t border-(--color-border-default) pt-8 sm:grid-cols-3 lg:max-w-4xl">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-(--neutral-400)">
                Sector
              </dt>
              <dd className="mt-2 text-[15px] font-medium text-(--neutral-900)">{sector}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-(--neutral-400)">
                Stack
              </dt>
              <dd className="mt-2 text-[15px] font-medium text-(--neutral-900)">Next.js · Supabase</dd>
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
          <div className="ag-rise relative aspect-[16/10] w-full overflow-hidden bg-(--neutral-100) md:aspect-[16/8]">
            <Image
              src={HERO_SHOT}
              alt={`${title} knowledge hub`}
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
          <p className="ag-rise max-w-5xl font-(family-name:--font-display-family) text-[clamp(1.45rem,2.8vw,2.5rem)] font-medium leading-[1.34] tracking-[-0.02em] text-(--neutral-800)">
            {intro}
          </p>
        </Shell>
      </section>

      {/* ── 03 Stats band — the scale, counted up ────────────────────────── */}
      <section style={{ backgroundColor: MINT }} className="py-20 md:py-28">
        <Shell>
          <div className="grid gap-12 sm:grid-cols-3 sm:gap-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p
                  className="ag-stat-value font-(family-name:--font-display-family) text-[clamp(3rem,7vw,5.5rem)] font-semibold leading-none tracking-[-0.04em]"
                  style={{ color: TEAL }}
                  data-to={stat.to}
                  data-suffix={stat.suffix}
                >
                  0{stat.suffix}
                </p>
                <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-(--neutral-700)">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── 04 The Bharat Agroecology Tracker — the signature feature ────── */}
      <section className="py-24 md:py-32">
        <Shell>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
            <div className="ag-rise">
              <span
                className="inline-flex items-center gap-2 font-mono text-[12px] font-medium uppercase tracking-[0.14em]"
                style={{ color: TEAL }}
              >
                <MapPin size={15} />
                The signature feature
              </span>
              <h2 className="mt-4 font-(family-name:--font-display-family) text-[clamp(1.8rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
                The Bharat Agroecology Tracker.
              </h2>
              <p className="mt-5 max-w-md text-[1.05rem] leading-[1.6] text-(--color-text-secondary)">
                An interactive map visualising more than a thousand agroecology
                initiatives across India — with survey workflows that update it
                in real time, so the picture stays current as the movement grows.
              </p>
            </div>
            <div className="ag-rise relative aspect-[16/10] w-full overflow-hidden border border-(--color-border-default) bg-(--neutral-100)">
              <Image
                src={MAP_SCREEN}
                alt={`${title} Bharat Agroecology Tracker`}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Shell>
      </section>

      {/* ── 05 Chapters ──────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: MINT }} className="py-24 md:py-32">
        <Shell>
          <div>
            {sections.map((section, i) => (
              <div
                key={section.title}
                className="ag-rise grid gap-4 border-b py-10 lg:grid-cols-[0.08fr_0.24fr_1fr] lg:gap-10"
                style={{ borderColor: "rgba(46,117,116,0.18)" }}
              >
                <span className="font-mono text-[12px] tabular-nums text-(--neutral-500)">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-mono text-[12px] font-medium uppercase tracking-[0.18em]" style={{ color: TEAL }}>
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

      {/* ── 06 The knowledge hub + gallery ───────────────────────────────── */}
      <section className="py-24 md:py-32">
        <Shell>
          <div className="ag-rise mb-14 max-w-2xl">
            <p className="font-mono text-[12px] font-medium uppercase tracking-[0.18em]" style={{ color: TEAL }}>
              How it flows
            </p>
            <h2 className="mt-4 font-(family-name:--font-display-family) text-[clamp(1.8rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
              From a field survey to a live map.
            </h2>
            <p className="mt-5 text-[1.05rem] leading-[1.6] text-(--color-text-secondary)">
              The whole point was to close the loop — so what a field team submits
              shows up on the national map and in the library without a manual step.
            </p>
          </div>

          {/* Three-step pipeline. A connecting rule runs behind the nodes on desktop. */}
          <div className="ag-stagger relative grid gap-8 md:grid-cols-3 md:gap-6">
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-7 hidden h-px md:block"
              style={{ background: `linear-gradient(90deg, ${TEAL}00, ${TEAL}66 12%, ${TEAL}66 88%, ${TEAL}00)` }}
            />
            {FLOW.map((step, i) => (
              <div key={step.title} className="relative">
                <span
                  className="flex size-14 items-center justify-center rounded-full text-white shadow-sm"
                  style={{ backgroundColor: TEAL }}
                >
                  <step.icon size={22} />
                </span>
                <span className="mt-6 block font-mono text-[12px] tabular-nums text-(--neutral-400)">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-(family-name:--font-display-family) text-[22px] font-semibold tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-(--color-text-secondary)">
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          {/* The library the flow feeds into. */}
          <figure className="ag-rise mt-16 overflow-hidden">
            <div className="relative aspect-[16/9] w-full overflow-hidden border border-(--color-border-default) bg-(--neutral-100)">
              <Image
                src={HUB_SCREEN}
                alt={`${title} knowledge library`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 font-mono text-[12px] uppercase tracking-[0.14em] text-(--neutral-500)">
              The knowledge library — 100+ papers, structured and searchable.
            </figcaption>
          </figure>
        </Shell>
      </section>

      {/* ── 07 What we changed ───────────────────────────────────────────── */}
      {proofPoints.length > 0 && (
        <section className="border-t border-(--color-border-default) py-24 md:py-32">
          <Shell>
            <h2 className="ag-rise max-w-3xl font-(family-name:--font-display-family) text-[clamp(1.8rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
              What we changed.
            </h2>
            <div className="ag-stagger mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {proofPoints.map((p, i) => (
                <div
                  key={p.title}
                  className="border-t-2 pt-6 transition-transform duration-500 ease-out hover:-translate-y-1"
                  style={{ borderTopColor: TEAL }}
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

      {/* ── 08 Testimonial video ─────────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <Shell>
          <div className="ag-rise flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={`font-mono text-[12px] font-medium uppercase tracking-[0.18em] ${ACCENT}`}>
                In their words
              </p>
              <h2 className="mt-4 max-w-xl font-(family-name:--font-display-family) text-[clamp(1.8rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
                Hear it from Agroecology India.
              </h2>
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed text-(--color-text-secondary)">
              Minhaj Ameen, Operations Director, on what it was like building the
              knowledge hub with Yuvabe Studios.
            </p>
          </div>

          <div className="ag-rise mt-12">
            <TestimonialVideo title={title} />
          </div>
        </Shell>
      </section>

      {/* ── 09 Outcomes ──────────────────────────────────────────────────── */}
      {outcomes.length > 0 && (
        <section style={{ backgroundColor: TEAL }} className="py-24 text-white md:py-32">
          <Shell>
            <p className="ag-rise font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-white/70">
              Outcomes
            </p>
            <ul className="ag-stagger mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
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

      {/* ── 10 Footer CTA ────────────────────────────────────────────────── */}
      <footer className="border-t border-(--color-border-default) py-20 md:py-28">
        <Shell className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <h2 className="ag-rise max-w-2xl font-(family-name:--font-display-family) text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
            Have a story worth
            <br />
            telling well?
          </h2>
          <div className="ag-rise flex flex-wrap items-center gap-3">
            <StartProjectLink
              source="agroecology-case-study"
              style={{ backgroundColor: TEAL }}
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
