"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import type { StudioAboutHeroContent } from "@/components/studio/studio-about-content";
import { StartProjectButton } from "@/components/studio/start-project-button";
import { isStartProjectHref } from "@/lib/start-project";

const easeOut = [0.22, 1, 0.36, 1] as const;

// Wide editorial rail (no studio page container).
function Rail({
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

// ─── Pillar image — slides down into view ────────────────────────────────────
export function AboutPillarImage({ src, alt }: { src: string; alt: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : -56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.75, ease: easeOut }}
      className="relative mx-auto aspect-[630/820] w-full max-w-[630px] overflow-hidden bg-[var(--neutral-100)] ring-1 ring-slate-200/80"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 630px, 100vw"
        className="object-cover"
      />
    </motion.div>
  );
}

// ─── Hero with a scroll-revealed team image ──────────────────────────────────
export function AboutHeroScroll({
  hero,
  coverSrc,
  coverAlt,
}: {
  hero: StudioAboutHeroContent;
  coverSrc: string;
  coverAlt: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : [0.9, 1.08],
  );
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["0%", "-6%"],
  );
  const opensStartProjectModal = isStartProjectHref(hero.primaryCtaHref);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white text-[var(--neutral-950)]"
    >
      {/* Soft brand glows. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[40rem] rounded-full bg-[radial-gradient(circle_at_32%_30%,rgba(88,41,199,0.14),rgba(255,255,255,0)_70%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-24 size-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,202,45,0.16),rgba(255,255,255,0)_72%)] blur-3xl"
      />

      <Rail className="relative z-10 pt-32 pb-12 md:pt-44 md:pb-16">
        <h1 className="max-w-6xl text-display-xl text-(--neutral-950)">
          <span>{hero.title} </span>
          <span className="font-medium not-italic text-brand">
            {hero.highlight}
          </span>
        </h1>
        <p className="mt-6 max-w-3xl text-[24px] leading-[1.5] text-[var(--color-text-secondary)]">
          {hero.description}
        </p>

        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          {opensStartProjectModal ? (
            <StartProjectButton
              source="about-hero-primary"
              className="inline-flex h-auto items-center gap-2 rounded-full bg-brand px-7 py-4 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(88,41,199,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(88,41,199,0.35)]"
            >
              {hero.primaryCtaLabel}
              <ArrowRight size={16} />
            </StartProjectButton>
          ) : (
            <Link
              href={hero.primaryCtaHref}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(88,41,199,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(88,41,199,0.35)]"
            >
              {hero.primaryCtaLabel}
              <ArrowRight size={16} />
            </Link>
          )}
          <Link
            href={hero.secondaryCtaHref}
            className="inline-flex items-center gap-2 rounded-full border border-(--color-border-default) bg-white px-6 py-4 text-[15px] font-semibold text-(--neutral-900) transition-colors hover:border-brand/40 hover:text-brand"
          >
            {hero.secondaryCtaLabel}
          </Link>
        </div>
      </Rail>

      {/* Scroll-revealed cover. */}
      <div className="relative z-10 px-6 pb-16 md:px-12 md:pb-24 lg:px-16">
        <motion.div
          style={{ scale: imageScale, y: imageY }}
          className="relative mx-auto aspect-[16/9] w-full max-w-[1600px] overflow-hidden md:aspect-[16/8]"
        >
          <Image
            src={coverSrc}
            alt={coverAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_38%]"
          />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Hover-steered image carousel (no autoplay) ──────────────────────────────
// Hovering the left edge scrolls left; hovering the right edge scrolls right.
// Three copies keep the strip looping seamlessly in either direction.
export function AboutHoverGallery({
  images,
  eyebrow,
  title,
  subheading,
  footer,
}: {
  images: { src: string; alt: string }[];
  eyebrow: string;
  title: string;
  subheading?: string;
  footer?: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const directionRef = useRef(0);
  const COPIES = 3;
  const loop = Array.from({ length: COPIES }, () => images).flat();

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const speed = 2.4;
    let started = false;
    let frame = 0;

    const tick = () => {
      frame = requestAnimationFrame(tick);
      const setWidth = el.scrollWidth / COPIES;
      if (setWidth === 0) return;

      // Park in the middle copy once layout/images are ready.
      if (!started) {
        el.scrollLeft = setWidth;
        started = true;
      }

      if (directionRef.current !== 0) {
        el.scrollLeft += directionRef.current * speed;
      }

      // Keep the position inside the middle copy for an endless loop.
      if (el.scrollLeft < setWidth * 0.5) el.scrollLeft += setWidth;
      else if (el.scrollLeft > setWidth * 1.5) el.scrollLeft -= setWidth;
    };
    tick();

    return () => cancelAnimationFrame(frame);
  }, [images]);

  return (
    <section className="overflow-hidden border-b border-slate-200/80 bg-white py-14 md:py-20">
      <Rail className="mb-10 md:mb-14">
        <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
          {eyebrow}
        </p>
        <h2
          className="mt-3 max-w-3xl text-display-muted-editorial tracking-[-0.032em] text-[var(--neutral-950)]"
          style={{ fontSize: "3.5rem", fontWeight: 600 }}
        >
          {title}
        </h2>
        {subheading ? (
          <p className="mt-4 max-w-2xl text-body-lg text-[var(--color-text-secondary)]">
            {subheading}
          </p>
        ) : null}
      </Rail>

      <div className="group relative">
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-hidden px-6 md:gap-6 md:px-12 lg:px-16"
        >
          {loop.map((image, i) => (
            <div
              key={`${image.src}-${i}`}
              className="relative aspect-[3/4] w-[240px] shrink-0 overflow-hidden  bg-[var(--neutral-100)] ring-1 ring-slate-200/80 md:w-[300px]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="300px"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Invisible hover zones — left scrolls back, right scrolls forward. */}
        <button
          type="button"
          aria-label="Scroll gallery left"
          onMouseEnter={() => (directionRef.current = -1)}
          onMouseLeave={() => (directionRef.current = 0)}
          onFocus={() => (directionRef.current = -1)}
          onBlur={() => (directionRef.current = 0)}
          className="absolute inset-y-0 left-0 z-10 w-1/5 cursor-w-resize"
        />
        <button
          type="button"
          aria-label="Scroll gallery right"
          onMouseEnter={() => (directionRef.current = 1)}
          onMouseLeave={() => (directionRef.current = 0)}
          onFocus={() => (directionRef.current = 1)}
          onBlur={() => (directionRef.current = 0)}
          className="absolute inset-y-0 right-0 z-10 w-1/5 cursor-e-resize"
        />
      </div>

      {footer ? (
        <Rail className="mt-12 flex justify-center md:mt-16">{footer}</Rail>
      ) : null}
    </section>
  );
}

// ─── Testimonials carousel ───────────────────────────────────────────────────
export type AboutTestimonial = {
  quote: string;
  name: string;
  role: string;
};

export function AboutTestimonials({
  eyebrow,
  testimonials,
}: {
  eyebrow: string;
  testimonials: AboutTestimonial[];
}) {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;
  const current = testimonials[index];

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count);

  if (count === 0) return null;

  return (
    <section className="border-b border-slate-200/80 bg-white py-20 text-[var(--neutral-950)] md:py-28">
      <Rail>
        <div className="flex items-center justify-between gap-6">
          <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
            {eyebrow}
          </p>
          {count > 1 && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="flex size-11 items-center justify-center rounded-full border border-slate-200/80 text-[var(--neutral-900)] transition-colors hover:border-[var(--purple-500)]/40 hover:text-[var(--color-text-brand)]"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="flex size-11 items-center justify-center rounded-full border border-slate-200/80 text-[var(--neutral-900)] transition-colors hover:border-[var(--purple-500)]/40 hover:text-[var(--color-text-brand)]"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>

        <div className="relative mt-10 min-h-[16rem] md:min-h-[18rem]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="max-w-5xl"
            >
              <p className="font-(family-name:--font-display-family) text-[clamp(1.6rem,3.2vw,2.8rem)] font-medium leading-[1.22] tracking-[-0.02em] text-[var(--neutral-950)]">
                <span className="text-[var(--color-text-brand)]">“</span>
                {current.quote}
                <span className="text-[var(--color-text-brand)]">”</span>
              </p>
              <footer className="mt-8">
                <p className="text-heading-md text-[var(--neutral-950)]">{current.name}</p>
                <p className="mt-1 text-body-md text-[var(--color-text-secondary)]">{current.role}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </Rail>
    </section>
  );
}
