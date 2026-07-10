"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef } from "react";

import type {
  ResolvedStudioCaseStudyDetail,
  StudioCaseStudySummary,
} from "@/components/studio/studio-case-study-content";

// ─── Curated Bevolve imagery ─────────────────────────────────────────────────
const HERO_IMAGE = "/assets/bevolve/cover-summary.png";
const BLEED_IMAGE = "/assets/bevolve/mock4.png";
const SECTION_IMAGES = [
  "/assets/bevolve/mock5.png",
  "/assets/bevolve/mock6.png",
  "/assets/bevolve/mock7.png",
  "/assets/bevolve/mock8.png",
];
// nuant-style "optimized widgets" — two product screens side by side.
const WIDGET_PAIR = ["/assets/bevolve/mock1.png", "/assets/bevolve/mock3.png"];
const GALLERY_IMAGES = [
  "/assets/bevolve/mock2.png",
  "/assets/bevolve/cover-mock.png",
];

// Bevolve is a sustainability brand — a green accent gives the page its own
// identity while neutrals stay dominant (brand-safe supporting use).
const ACCENT = "text-(--green-500)";

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
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-(--green-500)"
      aria-hidden="true"
    />
  );
}

// Scroll-reveal media: images sit flush as object-cover (no parallax/zoom).
// `wipe` reveals with a retracting curtain panel; big covers fade-up instead.
function RevealImage({
  src,
  alt,
  aspect,
  sizes,
  priority,
  className = "",
  wipe = true,
  fit = "cover",
}: {
  src: string;
  alt: string;
  aspect: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  wipe?: boolean;
  fit?: "cover" | "contain";
}) {
  const reduce = useReducedMotion();

  const useFade = !wipe || reduce;

  return (
    <motion.div
      initial={useFade ? { opacity: 0, y: reduce ? 0 : 36 } : false}
      whileInView={useFade ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: easeOut }}
      className={`group relative overflow-hidden ${fit === "contain" ? "" : "bg-(--neutral-100)"} ${className}`}
    >
      <div className={`relative ${aspect}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={fit === "contain" ? "object-contain" : "object-cover"}
        />
      </div>

      {!useFade && (
        <motion.div
          aria-hidden="true"
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: easeOut }}
          style={{ transformOrigin: "top" }}
          className="absolute inset-0 z-10 bg-(--neutral-100)"
        />
      )}
    </motion.div>
  );
}

type BevolveCaseStudyProps = {
  caseStudy: StudioCaseStudySummary;
  detail: ResolvedStudioCaseStudyDetail;
};

export function BevolveCaseStudy({ caseStudy, detail }: BevolveCaseStudyProps) {
  const { title, sector, summary, services } = caseStudy;
  const { intro, outcomes, sections, proofPoints, testimonial } = detail;

  const reduce = useReducedMotion();

  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], reduce ? [0, 0] : [0, -90]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, reduce ? 1 : 0]);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-white text-(--neutral-950) antialiased">
      <ScrollProgress />

      {/* ── 01 Hero ───────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="pt-32 md:pt-40">
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <Shell>
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.span
                variants={fadeUp}
                className={`inline-block font-mono text-[12px] font-medium uppercase tracking-[0.18em] ${ACCENT}`}
              >
                {sector}
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="mt-6 font-(family-name:--font-display-family) text-[clamp(3.5rem,13vw,12rem)] font-semibold leading-[0.86] tracking-[-0.045em]"
              >
                {title}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mt-8 max-w-2xl text-[clamp(1.2rem,2vw,1.7rem)] font-medium leading-[1.4] text-(--color-text-secondary)"
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
                <div className="sm:col-span-2">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-(--neutral-400)">
                    Services
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[15px] font-medium text-(--neutral-900)">
                    {services.map((s, i) => (
                      <span
                        key={s}
                        className="cursor-default transition-colors duration-200 hover:text-(--green-500)"
                      >
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
        </motion.div>

        <div className="mt-16 md:mt-24">
          <div className="relative left-1/2 w-screen -translate-x-1/2">
            <RevealImage
              src={HERO_IMAGE}
              alt={`${title} — product landing experience`}
              aspect="aspect-[16/10] md:aspect-[16/8]"
              sizes="100vw"
              priority
              wipe={false}
            />
          </div>
        </div>
      </section>

      {/* ── 02 Overview ───────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              className="font-(family-name:--font-display-family) text-[clamp(1.9rem,4vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.03em] lg:sticky lg:top-28 lg:self-start"
            >
              Overview
            </motion.h2>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={stagger}
            >
              <motion.p
                variants={fadeUp}
                className="text-[clamp(1.25rem,1.8vw,1.6rem)] leading-[1.5] text-(--neutral-800)"
              >
                {intro}
              </motion.p>

              <motion.ul
                variants={fadeUp}
                className="mt-12 grid grid-cols-1 gap-x-12 sm:grid-cols-2"
              >
                {services.map((s) => (
                  <li
                    key={s}
                    className="group flex items-center gap-3 border-b border-(--color-border-default) py-4 text-[17px] font-medium text-(--neutral-900) transition-colors duration-200 hover:text-(--green-500)"
                  >
                    <span className="size-1.5 rounded-full bg-(--green-500) transition-transform duration-200 group-hover:scale-150" />
                    {s}
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </Shell>
      </section>

      {/* ── 03 Full-bleed showcase ────────────────────────────────────────── */}
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <RevealImage
          src={BLEED_IMAGE}
          alt={`${title} dashboard in context`}
          aspect="aspect-[16/10] md:aspect-[16/8]"
          sizes="100vw"
          wipe={false}
        />
      </div>

      {/* ── 04 Optimized widgets (nuant-style two-up) ─────────────────────── */}
      <section className="py-24 md:py-36">
        <Shell>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mb-12 max-w-3xl md:mb-16"
          >
            <span className={`font-mono text-[12px] font-medium uppercase tracking-[0.14em] ${ACCENT}`}>
              Inside the product
            </span>
            <h2 className="mt-4 font-(family-name:--font-display-family) text-[clamp(1.9rem,4vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
              Dashboards built to be configured.
            </h2>
          </motion.div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {WIDGET_PAIR.map((src, i) => (
              <RevealImage
                key={src}
                src={src}
                alt={`${title} product widget ${i + 1}`}
                aspect="aspect-[16/11]"
                sizes="(min-width: 768px) 50vw, 100vw"
                fit="contain"
              />
            ))}
          </div>
        </Shell>
      </section>

      {/* ── 05 Narrative sections (alternating) ───────────────────────────── */}
      <section className="pb-24 md:pb-36">
        <Shell className="space-y-28 md:space-y-40">
          {sections.map((s, i) => {
            const img = SECTION_IMAGES[i % SECTION_IMAGES.length];
            const imageFirst = i % 2 === 1;
            return (
              <motion.div
                key={s.title}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={stagger}
                className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
              >
                <motion.div
                  variants={fadeUp}
                  className={imageFirst ? "lg:order-2" : "lg:order-1"}
                >
                  <span className={`font-mono text-[12px] font-medium uppercase tracking-[0.14em] ${ACCENT}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-(family-name:--font-display-family) text-[clamp(1.8rem,3.4vw,3rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
                    {s.title}
                  </h3>
                  <p className="mt-6 max-w-xl text-[clamp(1.05rem,1.3vw,1.25rem)] leading-[1.55] text-(--color-text-secondary)">
                    {s.body}
                  </p>
                </motion.div>

                <div className={imageFirst ? "lg:order-1" : "lg:order-2"}>
                  <RevealImage
                    src={img}
                    alt={`${title} — ${s.title}`}
                    aspect="aspect-[4/3]"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    fit="contain"
                  />
                </div>
              </motion.div>
            );
          })}
        </Shell>
      </section>

      {/* ── 06 What changed — proof points ────────────────────────────────── */}
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
                  className="border-t-2 border-(--green-500)/70 pt-6 transition-transform duration-300 hover:-translate-y-1.5"
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

      {/* ── 07 Gallery grid ───────────────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <Shell>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            {GALLERY_IMAGES.map((src, i) => (
              <RevealImage
                key={src}
                src={src}
                alt={`${title} product gallery ${i + 1}`}
                aspect="aspect-[16/10]"
                sizes="(min-width: 640px) 50vw, 100vw"
                fit="contain"
              />
            ))}
          </div>
        </Shell>
      </section>

      {/* ── 08 Outcomes strip ─────────────────────────────────────────────── */}
      {outcomes.length > 0 && (
        <section className="bg-[#5ac35d] py-24 text-white md:py-32">
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

      {/* ── 09 Testimonial ────────────────────────────────────────────────── */}
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

      {/* ── 10 Footer CTA ─────────────────────────────────────────────────── */}
      <footer className="bg-[#5ac35d] py-20 text-white md:py-28">
        <Shell className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <h2 className="max-w-2xl font-(family-name:--font-display-family) text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
              Have a product worth
              <br />
              building right?
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
