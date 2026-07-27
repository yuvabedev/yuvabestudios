"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import type {
  ResolvedStudioCaseStudyDetail,
  StudioCaseStudySummary,
} from "@/components/studio/studio-case-study-content";

// ─── Curated Rangasutra imagery (web-sized webp) ─────────────────────────────
// The artisan photography is tall portrait (4480x6720), so this page pins it in
// a half-screen column at full height rather than cropping it into a wide band.
// Line-art brand illustration (351x319, transparent) — shown contained at close
// to its native size so the linework stays crisp.
const HERO_ILLUSTRATION = "/assets/rangsutra/women-1.png";
const CHAPTER_IMAGES = [
  "/assets/rangsutra/web/hero.webp",
  "/assets/rangsutra/web/bleed.webp",
  "/assets/rangsutra/web/s1.webp",
  "/assets/rangsutra/web/s2.webp",
];
const POSTER_WALL = [
  "/assets/rangsutra/web/poster_1.webp",
  "/assets/rangsutra/web/poster_2.webp",
  "/assets/rangsutra/web/poster_3.webp",
  "/assets/rangsutra/web/poster_4.webp",
  "/assets/rangsutra/web/poster_5.webp",
  "/assets/rangsutra/web/poster_6.webp",
  "/assets/rangsutra/web/poster_7.webp",
  "/assets/rangsutra/web/poster_8.webp",
  "/assets/rangsutra/web/poster_9.webp",
  "/assets/rangsutra/web/poster_10.webp",
];

// Rangasutra turns Rajasthani craft heritage into a modern commerce story — a
// deep madder red carries that while neutrals stay dominant.
const ACCENT = "text-[#9F3A3D]";

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
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[#9F3A3D]"
      aria-hidden="true"
    />
  );
}

// ─── Sticky media + scrolling chapters ───────────────────────────────────────
// On large screens the photo column pins and crossfades as each chapter scrolls
// into view. On small screens it collapses to a plain stacked read, with each
// chapter carrying its own image inline.
function StickyChapters({
  sections,
  title,
}: {
  sections: ResolvedStudioCaseStudyDetail["sections"];
  title: string;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const nodes = chapterRefs.current.filter(Boolean) as HTMLDivElement[];
    if (nodes.length === 0) return;

    // Collapse the root to a zero-height line across the middle of the viewport:
    // exactly one chapter can cross it at a time, so the pinned image and the
    // counter always match the chapter being read. (Ratio-based thresholds are
    // unreliable here — a full-height chapter never reaches a high ratio against
    // a thin band, so the callback fires erratically.)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = nodes.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) setActive(index);
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [sections.length]);

  const activeImage = CHAPTER_IMAGES[active % CHAPTER_IMAGES.length];

  return (
    <section className="py-20 md:py-28">
      <Shell>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Pinned photo column (desktop only) */}
          <div className="hidden lg:block">
            {/* Height drives the 3/4 ratio (not width) so the photo always fits
                the viewport and clears the floating header. */}
            <div className="sticky top-28 flex h-[calc(100vh-9rem)] items-center justify-center">
              <div className="relative aspect-[3/4] h-full max-h-[78vh] w-auto overflow-hidden bg-(--neutral-100)">
                <AnimatePresence mode="sync">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0, scale: reduce ? 1 : 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: easeOut }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeImage}
                      alt={`${title} — ${sections[active]?.title ?? "craft"}`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Chapter counter sits on the image, tying the two columns together. */}
                <div className="absolute bottom-5 left-5 z-10 flex items-center gap-2 rounded-full bg-black/70 px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur">
                  {String(active + 1).padStart(2, "0")}
                  <span className="text-white/40">/</span>
                  <span className="text-white/60">
                    {String(sections.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Scrolling chapters */}
          <div>
            {sections.map((section, i) => (
              <div
                key={section.title}
                ref={(node) => {
                  chapterRefs.current[i] = node;
                }}
                className="flex flex-col justify-center border-b border-(--color-border-default) py-14 last:border-b-0 lg:min-h-[78vh] lg:border-b-0 lg:py-20"
              >
                <span
                  className={`font-mono text-[12px] font-medium uppercase tracking-[0.14em] ${ACCENT}`}
                >
                  {String(i + 1).padStart(2, "0")} — {section.title}
                </span>
                <h3 className="mt-5 font-(family-name:--font-display-family) text-[clamp(1.9rem,3.6vw,3.2rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
                  {section.title}
                </h3>
                <p className="mt-6 max-w-xl text-[clamp(1.05rem,1.3vw,1.25rem)] leading-[1.6] text-(--color-text-secondary)">
                  {section.body}
                </p>

                {/* Mobile: each chapter carries its own image inline. */}
                <div className="relative mt-8 aspect-[3/4] w-full overflow-hidden bg-(--neutral-100) lg:hidden">
                  <Image
                    src={CHAPTER_IMAGES[i % CHAPTER_IMAGES.length]}
                    alt={`${title} — ${section.title}`}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}

type RangasutraCaseStudyProps = {
  caseStudy: StudioCaseStudySummary;
  detail: ResolvedStudioCaseStudyDetail;
};

export function RangasutraCaseStudy({ caseStudy, detail }: RangasutraCaseStudyProps) {
  const { title, sector, summary, services } = caseStudy;
  const { intro, outcomes, sections, proofPoints, testimonial } = detail;

  return (
    <main className="relative min-h-screen overflow-x-clip bg-white text-(--neutral-950) antialiased">
      <ScrollProgress />

      {/* ── 01 Hero — asymmetric split, portrait photo shown at full height ── */}
      <section className="pt-32 md:pt-40">
        <Shell>
          <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.span
                variants={fadeUp}
                className={`inline-block font-mono text-[12px] font-medium uppercase tracking-[0.18em] ${ACCENT}`}
              >
                {sector}
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="mt-6 font-(family-name:--font-display-family) text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.045em]"
              >
                {title}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mt-8 max-w-xl text-[clamp(1.15rem,1.7vw,1.5rem)] font-medium leading-[1.45] text-(--color-text-secondary)"
              >
                {summary}
              </motion.p>

              <motion.dl
                variants={fadeUp}
                className="mt-12 grid grid-cols-2 gap-8 border-t border-(--color-border-default) pt-8"
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
                    Services
                  </dt>
                  <dd className="mt-2 flex flex-col gap-1 text-[15px] font-medium text-(--neutral-900)">
                    {services.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </dd>
                </div>
              </motion.dl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: easeOut, delay: 0.1 }}
              className="flex items-center justify-center lg:justify-end"
            >
              <Image
                src={HERO_ILLUSTRATION}
                alt={`${title} — artisan at the loom`}
                width={351}
                height={319}
                priority
                className="h-auto w-full max-w-[240px] sm:max-w-[300px] lg:max-w-[351px]"
              />
            </motion.div>
          </div>
        </Shell>
      </section>

      {/* ── 02 Intro statement ────────────────────────────────────────────── */}
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

      {/* ── 03 Chapters — pinned photo, scrolling story ───────────────────── */}
      <StickyChapters sections={sections} title={title} />

      {/* ── 04 Social wall — the brand story in feed form ─────────────────── */}
      <section className="bg-(--neutral-50) py-24 md:py-32">
        <Shell>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mb-12 max-w-3xl md:mb-16"
          >
            <span className={`font-mono text-[12px] font-medium uppercase tracking-[0.14em] ${ACCENT}`}>
              The story, in feed
            </span>
            <h2 className="mt-4 font-(family-name:--font-display-family) text-[clamp(1.9rem,4vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
              Heritage, told one post at a time.
            </h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={stagger}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-5"
          >
            {POSTER_WALL.map((src, i) => (
              <motion.div
                key={src}
                variants={fadeUp}
                className="relative aspect-square overflow-hidden bg-(--neutral-100)"
              >
                <Image
                  src={src}
                  alt={`${title} social post ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </Shell>
      </section>

      {/* ── 05 What changed — proof points ────────────────────────────────── */}
      {proofPoints.length > 0 && (
        <section className="py-24 md:py-32">
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
                  className="border-t-2 border-[#9F3A3D]/70 pt-6 transition-transform duration-300 hover:-translate-y-1.5"
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

      {/* ── 06 Outcomes strip ─────────────────────────────────────────────── */}
      {outcomes.length > 0 && (
        <section className="bg-[#9F3A3D] py-24 text-white md:py-32">
          <Shell>
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-white/80">
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

      {/* ── 07 Testimonial ────────────────────────────────────────────────── */}
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

      {/* ── 08 Footer CTA ─────────────────────────────────────────────────── */}
      <footer className="bg-[#9F3A3D] py-20 text-white md:py-28">
        <Shell className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <h2 className="max-w-2xl font-(family-name:--font-display-family) text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
              Have a story worth
              <br />
              telling well?
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="mailto:sales@yuvabe.com"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-[15px] font-semibold text-(--neutral-950) transition-transform duration-200 hover:-translate-y-0.5"
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
