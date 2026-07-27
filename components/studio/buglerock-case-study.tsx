"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  type Variants,
} from "framer-motion";
import { useState } from "react";

import type {
  ResolvedStudioCaseStudyDetail,
  StudioCaseStudySummary,
} from "@/components/studio/studio-case-study-content";

// ─── Curated Buglerock imagery (web-sized webp) ──────────────────────────────
const LOGO = "/assets/buglerock/logo.svg";
const COVER_IMAGE = "/assets/buglerock/web/cover.webp";
const CHAPTER_IMAGES = [
  "/assets/buglerock/web/m1.webp",
  "/assets/buglerock/web/m3.webp",
  "/assets/buglerock/web/m4.webp",
  "/assets/buglerock/web/m5.webp",
];
const COLLAGE = {
  tall: "/assets/buglerock/web/homepage.webp",
  square: "/assets/buglerock/web/m2.webp",
  wide: "/assets/buglerock/web/brand.webp",
};

// BugleRock's brand colour. Reads 11.5:1 on white and behind white text, so it
// works as both accent type and a full band.
const BRAND = "#3E3452";
const ACCENT = "text-[#3E3452]";

// The firm's service lines — run as a ticker under the hero.
const TICKER = [
  "Wealth Management",
  "Asset Management",
  "Equity Broking",
  "Investment Advisory",
  "Global Advisory",
];

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const viewportOnce = { once: true, margin: "-12% 0px -12% 0px" } as const;

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

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress, backgroundColor: BRAND }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
      aria-hidden="true"
    />
  );
}

// ─── Service ticker — a restrained tape of the firm's practice lines ────────
// Pauses for reduced-motion.
function Marquee({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  // Duplicated once so translating -50% lands exactly on the seam.
  const loop = [...items, ...items];

  return (
    <div
      aria-hidden="true"
      style={{ backgroundColor: BRAND }}
      className="flex overflow-hidden py-4 text-white"
    >
      <motion.div
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        className="flex shrink-0 items-center gap-8 whitespace-nowrap pr-8"
      >
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-8 font-(family-name:--font-display-family) text-[clamp(1rem,1.6vw,1.4rem)] font-medium uppercase tracking-[0.06em]"
          >
            {item}
            <span className="text-white/35">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Chapter index — the story as an expandable, scannable list ─────────────
// The interaction is the point: rows collapse to an index and open one at a
// time, so the story is browsable rather than a forced linear scroll.
function ChapterIndex({
  sections,
  title,
}: {
  sections: ResolvedStudioCaseStudyDetail["sections"];
  title: string;
}) {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();

  return (
    <div className="border-t border-(--color-border-default)">
      {sections.map((section, i) => {
        const isOpen = open === i;
        return (
          <div key={section.title} className="border-b border-(--color-border-default)">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={`chapter-panel-${i}`}
                className="group flex w-full items-center gap-6 py-7 text-left transition-colors duration-300 hover:text-[#3E3452] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3E3452]/40 md:py-9"
              >
                <span
                  className={`font-mono text-[13px] font-medium tabular-nums transition-colors duration-300 ${
                    isOpen ? "text-[#3E3452]" : "text-(--neutral-400)"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-(family-name:--font-display-family) text-[clamp(1.6rem,4vw,3.2rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
                  {section.title}
                </span>
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    isOpen
                      ? "rotate-45 border-[#3E3452] text-[#3E3452]"
                      : "border-(--color-border-default) text-(--neutral-500) group-hover:border-[#3E3452]/60"
                  }`}
                >
                  <Plus size={18} />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`chapter-panel-${i}`}
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: easeOut }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-8 pb-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
                    <p className="max-w-xl text-[clamp(1.05rem,1.3vw,1.25rem)] leading-[1.6] text-(--color-text-secondary) lg:pl-[3.5rem]">
                      {section.body}
                    </p>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-(--neutral-100)">
                      <Image
                        src={CHAPTER_IMAGES[i % CHAPTER_IMAGES.length]}
                        alt={`${title} — ${section.title}`}
                        fill
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

type BuglerockCaseStudyProps = {
  caseStudy: StudioCaseStudySummary;
  detail: ResolvedStudioCaseStudyDetail;
};

export function BuglerockCaseStudy({ caseStudy, detail }: BuglerockCaseStudyProps) {
  const { title, sector, summary, services } = caseStudy;
  const { intro, outcomes, sections, proofPoints, testimonial } = detail;

  return (
    <main className="relative min-h-screen overflow-x-clip bg-white text-(--neutral-950) antialiased">
      <ScrollProgress />

      {/* ── 01 Hero — the client wordmark leads a brand-identity story ────── */}
      <section className="pt-32 md:pt-40">
        <Shell>
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp}>
              <Image
                src={LOGO}
                alt={`${title} logo`}
                width={206}
                height={58}
                priority
                className="h-9 w-auto md:h-11"
              />
            </motion.div>

            <motion.span
              variants={fadeUp}
              className={`mt-10 inline-block font-mono text-[12px] font-medium uppercase tracking-[0.18em] ${ACCENT}`}
            >
              {sector}
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="mt-6 font-(family-name:--font-display-family) text-[clamp(3.5rem,14vw,13rem)] font-semibold leading-[0.84] tracking-[-0.05em]"
            >
              {title}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-2xl text-[clamp(1.15rem,1.8vw,1.6rem)] font-medium leading-[1.45] text-(--color-text-secondary)"
            >
              {summary}
            </motion.p>

            <motion.dl
              variants={fadeUp}
              className="mt-14 grid grid-cols-2 gap-8 border-t border-(--color-border-default) pt-8 sm:grid-cols-3 lg:max-w-3xl"
            >
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-(--neutral-400)">
                  Industry
                </dt>
                <dd className="mt-2 text-[15px] font-medium text-(--neutral-900)">
                  {sector}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-(--neutral-400)">
                  Regions
                </dt>
                <dd className="mt-2 text-[15px] font-medium text-(--neutral-900)">
                  Asia
                  <span className="mx-2 text-(--neutral-300)">·</span>
                  Singapore
                </dd>
              </div>
              <div className="sm:col-span-3">
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
            </motion.dl>
          </motion.div>
        </Shell>

        <div className="mt-16 md:mt-20">
          <Marquee items={TICKER} />
        </div>
      </section>

      {/* ── 02 Full-bleed cover ──────────────────────────────────────────── */}
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: easeOut }}
          className="relative aspect-[16/10] w-full overflow-hidden bg-(--neutral-100) md:aspect-[16/7]"
        >
          <Image
            src={COVER_IMAGE}
            alt={`${title} — redesigned website homepage`}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* ── 03 Intro statement ───────────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <Shell>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="max-w-5xl font-(family-name:--font-display-family) text-[clamp(1.5rem,3vw,2.6rem)] font-medium leading-[1.3] tracking-[-0.02em] text-(--neutral-800)"
          >
            {intro}
          </motion.p>
        </Shell>
      </section>

      {/* ── 04 Chapter index — the story, browsable ──────────────────────── */}
      <section className="pb-24 md:pb-32">
        <Shell>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mb-10 flex items-end justify-between gap-6"
          >
            <h2 className="font-(family-name:--font-display-family) text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-[-0.03em]">
              Inside the project
            </h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-(--neutral-400)">
              {String(sections.length).padStart(2, "0")} chapters
            </span>
          </motion.div>
          <ChapterIndex sections={sections} title={title} />
        </Shell>
      </section>

      {/* ── 05 Collage — asymmetric product wall ─────────────────────────── */}
      <section className="pb-24 md:pb-32">
        <Shell>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={stagger}
            className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-12"
          >
            <motion.div
              variants={fadeUp}
              className="relative col-span-2 aspect-[3/4] overflow-hidden bg-(--neutral-100) lg:col-span-5 lg:row-span-2"
            >
              <Image
                src={COLLAGE.tall}
                alt={`${title} homepage design`}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-top"
              />
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="relative col-span-2 aspect-[16/9] overflow-hidden bg-(--neutral-100) lg:col-span-7"
            >
              <Image
                src={COLLAGE.wide}
                alt={`${title} website layout`}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="relative col-span-2 aspect-[4/5] overflow-hidden bg-(--neutral-100) lg:col-span-7 lg:aspect-[16/11]"
            >
              <Image
                src={COLLAGE.square}
                alt={`${title} responsive page layout`}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </Shell>
      </section>

      {/* ── 06 What changed — proof points ───────────────────────────────── */}
      {proofPoints.length > 0 && (
        <section className="bg-(--neutral-50) py-24 md:py-32">
          <Shell>
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              className="max-w-3xl font-(family-name:--font-display-family) text-[clamp(1.9rem,4vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
            >
              What we changed.
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={stagger}
              className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
            >
              {proofPoints.map((p, i) => (
                <motion.div
                  key={p.title}
                  variants={fadeUp}
                  className="border-t-2 border-[#3E3452]/70 pt-6 transition-transform duration-300 hover:-translate-y-1.5"
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
                </motion.div>
              ))}
            </motion.div>
          </Shell>
        </section>
      )}

      {/* ── 07 Outcomes — brand band ─────────────────────────────────────── */}
      {outcomes.length > 0 && (
        <section
          style={{ backgroundColor: BRAND }}
          className="py-24 text-white md:py-32"
        >
          <Shell>
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-white/70">
              Outcomes
            </span>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={stagger}
              className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2"
            >
              {outcomes.map((o, i) => (
                <motion.div
                  key={o}
                  variants={fadeUp}
                  className="flex gap-5 border-t border-white/25 pt-6"
                >
                  <span className="font-mono text-[13px] text-white/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[clamp(1.15rem,1.6vw,1.5rem)] font-medium leading-[1.35] tracking-[-0.01em]">
                    {o}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </Shell>
        </section>
      )}

      {/* ── 08 Testimonial ───────────────────────────────────────────────── */}
      {testimonial?.quote && (
        <section className="py-28 md:py-40">
          <Shell>
            <motion.blockquote
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              className="mx-auto max-w-5xl text-center"
            >
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
            </motion.blockquote>
          </Shell>
        </section>
      )}

      {/* ── 09 Footer CTA — brand band ───────────────────────────────────── */}
      <footer style={{ backgroundColor: BRAND }} className="py-20 text-white md:py-28">
        <Shell className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <h2 className="max-w-2xl font-(family-name:--font-display-family) text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
            Have a product worth
            <br />
            building right?
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="mailto:sales@yuvabe.com"
              style={{ color: BRAND }}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-[15px] font-semibold transition-transform duration-200 hover:-translate-y-0.5"
            >
              Start a project
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-white/10"
            >
              See more work
            </Link>
          </div>
        </Shell>
      </footer>
    </main>
  );
}
