"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import type {
  ResolvedStudioCaseStudyDetail,
  StudioCaseStudySummary,
} from "@/components/studio/studio-case-study-content";

// ─── Curated Quilt.AI imagery (web-sized webp) ───────────────────────────────
const LOGO = "/assets/quilt/web/logo.webp";
const HERO_SHOT = "/assets/quilt/web/hero.webp";
const WIDE = "/assets/quilt/web/wide.webp";
const SCREENS = [
  "/assets/quilt/web/s1.webp",
  "/assets/quilt/web/s2.webp",
  "/assets/quilt/web/s3.webp",
  "/assets/quilt/web/s4.webp",
];

// Quilt.AI's brand purple. 5.4:1 on white; strong behind white text.
const BRAND = "#9A1FCB";

const STATS = [
  { value: "2,500+", label: "Trends quantified for a cosmetics brand" },
  { value: "18", label: "Global markets tracked" },
  { value: "50+", label: "Social brand profiles built" },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const viewportOnce = { once: true, margin: "-8% 0px -8% 0px" } as const;

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

// Shared tile shell for the bento grid.
function Tile({
  children,
  className = "",
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <motion.div
      variants={rise}
      className={`relative overflow-hidden rounded-2xl border border-(--color-border-default) bg-white ${
        interactive
          ? "transition-all duration-300 hover:-translate-y-1 hover:border-[#9A1FCB]/40 hover:shadow-[0_18px_40px_-24px_rgba(154,31,203,0.4)]"
          : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ─── Scramble value — digits "decode" into place when scrolled into view ─────
function ScrambleValue({ value }: { value: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    let started = false;
    let interval = 0;
    const glyphs = "0123456789";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        setDisplay(value.replace(/[0-9]/g, () => "0"));
        const total = 26;
        let frame = 0;
        interval = window.setInterval(() => {
          frame += 1;
          const progress = frame / total;
          const out = value
            .split("")
            .map((ch, i) => {
              if (!/[0-9]/.test(ch)) return ch;
              if (i / value.length < progress) return ch;
              return glyphs[Math.floor(Math.random() * glyphs.length)];
            })
            .join("");
          setDisplay(out);
          if (frame >= total) {
            setDisplay(value);
            window.clearInterval(interval);
          }
        }, 45);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(interval);
    };
  }, [value, reduce]);

  return <span ref={ref}>{display}</span>;
}

type QuiltAiCaseStudyProps = {
  caseStudy: StudioCaseStudySummary;
  detail: ResolvedStudioCaseStudyDetail;
};

export function QuiltAiCaseStudy({ caseStudy, detail }: QuiltAiCaseStudyProps) {
  const { title, sector, summary, services } = caseStudy;
  const { intro, outcomes, sections, proofPoints } = detail;

  return (
    <main className="relative min-h-screen overflow-x-clip bg-white text-(--neutral-950) antialiased">
      {/* Soft purple field behind the hero. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
        style={{
          background: `radial-gradient(55% 45% at 82% 0%, ${BRAND}14, transparent 70%), radial-gradient(45% 35% at 8% 4%, ${BRAND}0d, transparent 70%)`,
        }}
      />

      {/* ── 01 Hero ──────────────────────────────────────────────────────── */}
      <section className="relative pt-32 md:pt-40">
        <Shell>
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={rise}>
              <Image
                src={LOGO}
                alt={`${title} logo`}
                width={500}
                height={121}
                priority
                className="h-8 w-auto md:h-9"
              />
            </motion.div>

            <motion.p
              variants={rise}
              className="mt-10 font-mono text-[12px] font-medium uppercase tracking-[0.18em]"
              style={{ color: BRAND }}
            >
              {sector}
            </motion.p>

            <motion.h1
              variants={rise}
              className="mt-5 max-w-5xl font-(family-name:--font-display-family) text-[clamp(2.4rem,5.8vw,4.8rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
            >
              Human insights,{" "}
              <span style={{ color: BRAND }}>decoded by AI.</span>
            </motion.h1>

            <motion.p
              variants={rise}
              className="mt-8 max-w-2xl text-[clamp(1.1rem,1.6vw,1.4rem)] leading-[1.6] text-(--color-text-secondary)"
            >
              {summary}
            </motion.p>

            <motion.div
              variants={rise}
              className="mt-10 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[12px] uppercase tracking-[0.12em] text-(--neutral-500)"
            >
              {services.map((s, i) => (
                <span key={s}>
                  {s}
                  {i < services.length - 1 && <span className="ml-3 text-(--neutral-300)">/</span>}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </Shell>

        <div className="mt-16 md:mt-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: easeOut }}
            className="relative aspect-[16/10] w-full overflow-hidden bg-(--neutral-100) md:aspect-[16/7]"
          >
            <Image
              src={HERO_SHOT}
              alt={`${title} insight platform`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ── 02 The bento — the engagement as an insights dashboard ───────── */}
      <section className="py-20 md:py-28">
        <Shell>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={stagger}
            className="grid auto-rows-[minmax(11rem,auto)] grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 lg:[grid-auto-flow:dense]"
          >
            {/* Intro statement */}
            <Tile className="col-span-2 flex flex-col justify-center p-8 sm:col-span-4 lg:col-span-4 lg:row-span-2 md:p-10">
              <p className="font-(family-name:--font-display-family) text-[clamp(1.4rem,2.4vw,2.2rem)] font-medium leading-[1.34] tracking-[-0.02em] text-(--neutral-900)">
                {intro}
              </p>
            </Tile>

            {/* Brand premise tile */}
            <Tile
              className="col-span-2 flex flex-col justify-between p-8 text-white lg:col-span-2 lg:row-span-2"
              interactive
            >
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: `linear-gradient(150deg, ${BRAND}, #5B0E86)` }}
              />
              <div className="relative">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
                  The premise
                </p>
                <p className="mt-4 font-(family-name:--font-display-family) text-[clamp(1.5rem,2.6vw,2.2rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
                  We don&apos;t track behaviour — we decode the why behind it.
                </p>
              </div>
              <ArrowUpRight className="relative mt-6 opacity-80" size={22} />
            </Tile>

            {/* Stats */}
            {STATS.map((stat) => (
              <Tile key={stat.label} className="col-span-1 flex flex-col justify-center p-7 sm:col-span-2 lg:col-span-2">
                <p
                  className="font-(family-name:--font-display-family) text-[clamp(2.4rem,5vw,3.4rem)] font-semibold leading-none tracking-[-0.04em] tabular-nums"
                  style={{ color: BRAND }}
                >
                  <ScrambleValue value={stat.value} />
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-(--color-text-secondary)">
                  {stat.label}
                </p>
              </Tile>
            ))}

            {/* Image tile (tall) */}
            <Tile className="col-span-2 bg-(--neutral-100) lg:col-span-2 lg:row-span-2">
              <Image
                src={SCREENS[0]}
                alt={`${title} insight visual`}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover"
              />
            </Tile>

            {/* Capability tiles */}
            {proofPoints.map((p, i) => (
              <Tile
                key={p.title}
                interactive
                className="col-span-2 flex flex-col p-7 lg:col-span-2 lg:row-span-2 md:p-8"
              >
                <span className="font-mono text-[12px] tabular-nums" style={{ color: BRAND }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-(family-name:--font-display-family) text-[19px] font-semibold leading-tight tracking-[-0.02em]">
                  {p.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-(--color-text-secondary)">
                  {p.description}
                </p>
              </Tile>
            ))}

            {/* Wide image tile */}
            <Tile className="col-span-2 min-h-[16rem] bg-(--neutral-100) sm:col-span-4 lg:col-span-4 lg:row-span-2">
              <Image
                src={WIDE}
                alt={`${title} dashboards and reports`}
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover"
              />
            </Tile>

            {/* Square image */}
            <Tile className="col-span-2 bg-(--neutral-100) lg:col-span-2 lg:row-span-2">
              <Image
                src={SCREENS[2]}
                alt={`${title} insight visual`}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover"
              />
            </Tile>
          </motion.div>
        </Shell>
      </section>

      {/* ── 03 Chapters ──────────────────────────────────────────────────── */}
      <section className="pb-4 md:pb-8">
        <Shell>
          <div className="border-t border-(--color-border-default)">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={rise}
                className="grid gap-4 border-b border-(--color-border-default) py-9 lg:grid-cols-[0.08fr_0.24fr_1fr] lg:gap-10"
              >
                <span className="font-mono text-[12px] tabular-nums text-(--neutral-400)">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-mono text-[12px] font-medium uppercase tracking-[0.18em]" style={{ color: BRAND }}>
                  {section.title}
                </h2>
                <p className="max-w-3xl text-[clamp(1.05rem,1.35vw,1.25rem)] leading-[1.66] text-(--neutral-800)">
                  {section.body}
                </p>
              </motion.div>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── 04 Outcomes ──────────────────────────────────────────────────── */}
      {outcomes.length > 0 && (
        <section className="py-24 md:py-32">
          <Shell>
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={rise}
              className="mb-10 font-mono text-[12px] font-medium uppercase tracking-[0.18em]"
              style={{ color: BRAND }}
            >
              Outcomes
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={stagger}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {outcomes.map((o, i) => (
                <Tile key={o} interactive className="flex flex-col p-7">
                  <span className="font-mono text-[13px] tabular-nums" style={{ color: BRAND }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-[15px] font-medium leading-[1.45] text-(--neutral-800)">
                    {o}
                  </p>
                </Tile>
              ))}
            </motion.div>
          </Shell>
        </section>
      )}

      {/* ── 05 Footer CTA ────────────────────────────────────────────────── */}
      <footer className="border-t border-(--color-border-default) py-20 md:py-28">
        <Shell className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <h2 className="max-w-2xl font-(family-name:--font-display-family) text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
            Have a story worth
            <br />
            telling well?
          </h2>
          <div className="flex flex-wrap items-center gap-3">
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
