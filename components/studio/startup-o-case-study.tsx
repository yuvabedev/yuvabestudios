"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import type {
  ResolvedStudioCaseStudyDetail,
  StudioCaseStudySummary,
} from "@/components/studio/studio-case-study-content";

// ─── Curated Startup-O imagery (web-sized webp) ──────────────────────────────
// NOTE: the asset folder is "startup-O" — must match exactly on Linux.
const HERO_SHOT = "/assets/startup-O/web/hero.webp";
const FEATURE = "/assets/startup-O/web/tall.webp";
const CARD_IMAGES = [
  "/assets/startup-O/web/s1.webp",
  "/assets/startup-O/web/s2.webp",
  "/assets/startup-O/web/s3.webp",
  "/assets/startup-O/web/s4.webp",
];

// Startup-O's brand teal.
const BRAND = "#027D82";
const INK = "#141210";

// Three attributed quotes — cycled in the rotator.
const TESTIMONIALS = [
  {
    quote:
      "The depth of analysis and clarity in the investment memos gave us a clear vision of potential opportunities. The insights were invaluable in our decision-making.",
    who: "Senior Investment Analyst",
  },
  {
    quote:
      "Their research on the Indian tech sector was truly eye-opening — breaking complex trends into actionable strategies made all the difference for us.",
    who: "Tech Sector Investor",
  },
  {
    quote:
      "The defence-tech investment thesis was a game-changer. From government policy to key investment areas, the analysis helped us navigate the sector with confidence.",
    who: "Venture Capital Partner",
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const viewportOnce = { once: true, margin: "-10% 0px -10% 0px" } as const;

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

// ─── Magnetic button — the primary CTA drifts toward the cursor ──────────────
function MagneticButton({ href, children }: { href: string; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });

  function onMove(e: React.MouseEvent) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      href={href}
      onMouseMove={reduce ? undefined : onMove}
      onMouseLeave={reset}
      style={{ backgroundColor: BRAND, color: "#FFFFFF", ...(reduce ? {} : { x: sx, y: sy }) }}
      className="group inline-flex items-center gap-2 rounded-full px-7 py-4 text-[15px] font-semibold"
    >
      {children}
      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
    </motion.a>
  );
}

// ─── Tilt card — a workstream that responds to the cursor in 3D ─────────────
function TiltCard({
  index,
  title,
  body,
  image,
}: {
  index: number;
  title: string;
  body: string;
  image: string;
}) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), {
    stiffness: 200,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), {
    stiffness: 200,
    damping: 18,
  });
  // Sheen follows the pointer.
  const shineX = useTransform(px, [-0.5, 0.5], ["0%", "100%"]);

  function onMove(e: React.MouseEvent) {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }
  function reset() {
    px.set(0);
    py.set(0);
  }

  return (
    <motion.article
      variants={rise}
      onMouseMove={reduce ? undefined : onMove}
      onMouseLeave={reset}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      className="group relative overflow-hidden rounded-2xl border border-(--color-border-default) bg-white [transform-style:preserve-3d]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-(--neutral-100)">
        <Image
          src={image}
          alt={`${title} — Startup-O`}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        {!reduce && (
          <motion.span
            aria-hidden="true"
            style={{
              left: shineX,
              background:
                "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)",
            }}
            className="pointer-events-none absolute -inset-y-4 w-40 -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
      </div>
      <div className="p-7 md:p-8" style={reduce ? undefined : { transform: "translateZ(30px)" }}>
        <span className="font-mono text-[12px] tabular-nums" style={{ color: BRAND }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-3 font-(family-name:--font-display-family) text-[22px] font-semibold leading-tight tracking-[-0.02em]">
          {title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-(--color-text-secondary)">{body}</p>
      </div>
    </motion.article>
  );
}

// ─── Testimonial rotator — auto-advancing, pausable, keyboard-navigable ──────
function TestimonialRotator() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => window.clearInterval(id);
  }, [paused, reduce, count]);

  const current = TESTIMONIALS[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative min-h-[13rem] md:min-h-[11rem]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -18 }}
            transition={{ duration: 0.45, ease: easeOut }}
            className="max-w-4xl"
          >
            <Quote aria-hidden="true" size={34} style={{ color: BRAND }} fill="currentColor" className="opacity-40" />
            <p className="mt-5 font-(family-name:--font-display-family) text-[clamp(1.3rem,2.4vw,2rem)] font-medium leading-[1.4] tracking-[-0.02em] text-(--neutral-900)">
              {current.quote}
            </p>
            <footer className="mt-6 flex items-center gap-3">
              <span aria-hidden="true" style={{ backgroundColor: BRAND }} className="h-8 w-1" />
              <span className="text-[15px] font-medium text-(--neutral-700)">{current.who}</span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <div className="flex gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === index}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === index ? 28 : 8,
                backgroundColor: i === index ? BRAND : "rgba(20,18,16,0.18)",
              }}
            />
          ))}
        </div>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex size-11 items-center justify-center rounded-full border border-(--color-border-default) transition-colors hover:border-[#027D82] hover:text-[#027D82]"
          >
            <ArrowRight size={16} className="rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex size-11 items-center justify-center rounded-full border border-(--color-border-default) transition-colors hover:border-[#027D82] hover:text-[#027D82]"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

type StartupOCaseStudyProps = {
  caseStudy: StudioCaseStudySummary;
  detail: ResolvedStudioCaseStudyDetail;
};

export function StartupOCaseStudy({ caseStudy, detail }: StartupOCaseStudyProps) {
  const { title, sector, summary, services } = caseStudy;
  const { intro, outcomes, proofPoints } = detail;

  // Lightweight scroll progress via a passive listener (avoids a full useScroll).
  const scrollProgress = useMotionValue(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      scrollProgress.set(max > 0 ? h.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollProgress]);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-white text-(--neutral-950) antialiased">
      <motion.div
        aria-hidden="true"
        style={{ scaleX: scrollProgress, backgroundColor: BRAND }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
      />

      {/* ── 01 Hero ──────────────────────────────────────────────────────── */}
      <section className="pt-32 md:pt-40">
        <Shell>
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p
              variants={rise}
              className="font-mono text-[12px] font-medium uppercase tracking-[0.18em]"
              style={{ color: BRAND }}
            >
              {sector}
            </motion.p>
            <motion.h1
              variants={rise}
              className="mt-5 max-w-5xl font-(family-name:--font-display-family) text-[clamp(2.4rem,5.6vw,4.6rem)] font-semibold leading-[1.04] tracking-[-0.04em]"
            >
              Smarter startup funding,{" "}
              <span style={{ color: BRAND }}>data-driven.</span>
            </motion.h1>
            <motion.p
              variants={rise}
              className="mt-8 max-w-2xl text-[clamp(1.1rem,1.6vw,1.4rem)] leading-[1.6] text-(--color-text-secondary)"
            >
              {summary}
            </motion.p>

            <motion.div variants={rise} className="mt-10 flex flex-wrap items-center gap-6">
              <MagneticButton href="#work">See the work</MagneticButton>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[14px] font-medium text-(--neutral-600)">
                {services.map((s, i) => (
                  <span key={s}>
                    {s}
                    {i < services.length - 1 && <span className="ml-3 text-(--neutral-300)">·</span>}
                  </span>
                ))}
              </div>
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
              alt={`${title} investment research platform`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ── 02 Intro ─────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <Shell>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={rise}
            className="max-w-4xl font-(family-name:--font-display-family) text-[clamp(1.45rem,2.8vw,2.4rem)] font-medium leading-[1.36] tracking-[-0.02em] text-(--neutral-800)"
          >
            {intro}
          </motion.p>
        </Shell>
      </section>

      {/* ── 03 The engine — tilt cards ───────────────────────────────────── */}
      <section id="work" className="pb-24 md:pb-32">
        <Shell>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={rise}
            className="mb-12 max-w-2xl"
          >
            <p className="font-mono text-[12px] font-medium uppercase tracking-[0.18em]" style={{ color: BRAND }}>
              The engine
            </p>
            <h2 className="mt-4 font-(family-name:--font-display-family) text-[clamp(1.8rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
              Four workstreams, one signal.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={stagger}
            className="grid gap-6 md:grid-cols-2"
          >
            {proofPoints.map((p, i) => (
              <TiltCard
                key={p.title}
                index={i}
                title={p.title}
                body={p.description}
                image={CARD_IMAGES[i % CARD_IMAGES.length]}
              />
            ))}
          </motion.div>
        </Shell>
      </section>

      {/* ── 04 Feature — the thesis, in ink ──────────────────────────────── */}
      <section style={{ backgroundColor: INK }} className="py-24 text-white md:py-32">
        <Shell>
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={stagger}
            >
              <motion.p
                variants={rise}
                className="font-mono text-[12px] font-medium uppercase tracking-[0.18em]"
                style={{ color: BRAND }}
              >
                Thought leadership
              </motion.p>
              <motion.h2
                variants={rise}
                className="mt-4 font-(family-name:--font-display-family) text-[clamp(1.8rem,3.6vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
              >
                From raw market data to a defensible thesis.
              </motion.h2>
              <motion.p
                variants={rise}
                className="mt-6 max-w-lg text-[1.05rem] leading-[1.6] text-white/70"
              >
                Deep articles on the Indian tech landscape (2023–2030) and a
                full investment thesis on India&apos;s defence-tech sector —
                policy, risk, and the opportunities worth backing.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: easeOut }}
              className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-xl bg-white/5"
            >
              <Image
                src={FEATURE}
                alt={`${title} research report`}
                fill
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="object-cover object-top"
              />
            </motion.div>
          </div>
        </Shell>
      </section>

      {/* ── 05 What we changed ───────────────────────────────────────────── */}
      {outcomes.length > 0 && (
        <section className="py-24 md:py-32">
          <Shell>
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={rise}
              className="max-w-3xl font-(family-name:--font-display-family) text-[clamp(1.8rem,3.6vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
            >
              What we changed.
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={stagger}
              className="mt-14 grid gap-x-12 gap-y-8 sm:grid-cols-2"
            >
              {outcomes.map((o, i) => (
                <motion.div
                  key={o}
                  variants={rise}
                  className="group flex gap-5 border-t pt-6 transition-colors duration-300"
                  style={{ borderColor: "rgba(234,140,44,0.35)" }}
                >
                  <span className="font-mono text-[13px] tabular-nums" style={{ color: BRAND }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[clamp(1.05rem,1.4vw,1.3rem)] font-medium leading-[1.4] text-(--neutral-800)">
                    {o}
                  </p>
                  <ArrowUpRight
                    size={18}
                    className="ml-auto shrink-0 -translate-y-0.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                    style={{ color: BRAND }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </Shell>
        </section>
      )}

      {/* ── 06 Testimonials — rotator ────────────────────────────────────── */}
      <section style={{ backgroundColor: "#E7F1F1" }} className="py-24 md:py-32">
        <Shell>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={rise}
            className="mb-10 font-mono text-[12px] font-medium uppercase tracking-[0.18em]"
            style={{ color: BRAND }}
          >
            In their words
          </motion.p>
          <TestimonialRotator />
        </Shell>
      </section>

      {/* ── 07 Footer CTA ────────────────────────────────────────────────── */}
      <footer className="border-t border-(--color-border-default) py-20 md:py-28">
        <Shell className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <h2 className="max-w-2xl font-(family-name:--font-display-family) text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
            Great ideas deserve
            <br />
            great backing.
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton href="mailto:sales@yuvabe.com">Start a project</MagneticButton>
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
