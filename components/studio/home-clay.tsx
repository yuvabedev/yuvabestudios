"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronRight, Play, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

import type {
  StudioHomepageHeroContent,
  StudioHomepageServicesContent,
  StudioHomepageWorkContent,
} from "@/components/studio/studio-homepage-content";
import { AboutHoverGallery } from "@/components/studio/about-interactive";
import {
  getStudioCaseStudyHref,
  resolveStudioCaseStudyCoverSrc,
  type StudioCaseStudySummary,
} from "@/components/studio/studio-case-study-content";
import type { PublicBlogPost } from "@/lib/blog";

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

// ─── Hero — big statement + scroll-revealed cover ────────────────────────────
export function HomeHero({ hero }: { hero: StudioHomepageHeroContent }) {
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

  // Showreel plays muted while it's in view, pauses when scrolled away.
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Click-to-watch: a play cursor trails the pointer over the reel, and
  // clicking opens the full showreel with sound and controls.
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springCfg = { stiffness: 600, damping: 40, mass: 0.4 };
  const trailX = useSpring(cursorX, springCfg);
  const trailY = useSpring(cursorY, springCfg);

  function handlePointerMove(event: React.MouseEvent) {
    const rect = mediaRef.current?.getBoundingClientRect();
    if (!rect) return;
    cursorX.set(event.clientX - rect.left);
    cursorY.set(event.clientY - rect.top);
  }

  // While the lightbox is open: lock scroll, close on Escape, and pause the
  // muted background reel so two copies never play at once.
  useEffect(() => {
    if (!open) return;
    const backgroundVideo = videoRef.current;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    backgroundVideo?.pause();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      backgroundVideo?.play().catch(() => {});
    };
  }, [open]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white text-[var(--neutral-950)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[40rem] rounded-full bg-[radial-gradient(circle_at_32%_30%,rgba(88,41,199,0.14),rgba(255,255,255,0)_70%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-24 size-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,202,45,0.16),rgba(255,255,255,0)_72%)] blur-3xl"
      />

      <Rail className="relative z-10 pt-32 pb-12 md:pt-44 md:pb-16">
        <h1 className="max-w-5xl text-display-xl text-(--neutral-950) ">
          <span>{hero.headlineIntro} </span>
          <span className="font-medium not-italic text-brand">
            {hero.headlineHighlight}
          </span>{" "}
          <span>{hero.headlineLineTwo}</span>
        </h1>
        <p className="mt-6 max-w-5xl text-[24px] leading-[1.5] text-(--color-text-secondary)">
          {hero.supportPrefix}{" "}
          <span className="font-semibold text-[var(--neutral-950)]">
            {hero.supportHighlight}
          </span>
        </p>
        <div className="mt-10">
          <Link
            href={hero.ctaHref}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(88,41,199,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(88,41,199,0.35)]"
          >
            {hero.ctaLabel}
            <ArrowRight size={16} />
          </Link>
        </div>
      </Rail>

      <div
        ref={mediaRef}
        className="relative z-10 px-6 pb-16 md:px-12 md:pb-24 lg:px-16"
      >
        <motion.div
          style={{ scale: imageScale, y: imageY }}
          className="relative mx-auto aspect-[16/9] w-full max-w-[1600px] overflow-hidden md:aspect-[16/8]"
        >
          <video
            ref={videoRef}
            src="/assets/video/showreel-low.mp4"
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-[center_38%]"
          />

          {/* Full-bleed hit area: hides the native cursor and opens the reel. */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={handlePointerMove}
            aria-label="Play the Yuvabe Studios showreel"
            className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/50 md:cursor-none"
          />
        </motion.div>

        {/* Trailing play cursor — desktop pointer devices only. */}
        <AnimatePresence>
          {hovered && !reduce && (
            <motion.div
              aria-hidden="true"
              style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "-50%" }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18, ease: easeOut }}
              className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block"
            >
              <span className="flex size-24 flex-col items-center justify-center gap-1 rounded-full bg-white/95 text-(--neutral-950) shadow-[0_10px_30px_rgba(17,17,17,0.25)] backdrop-blur">
                <Play size={20} fill="currentColor" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em]">
                  Play
                </span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Showreel lightbox — full video with sound and controls. */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Yuvabe Studios showreel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: easeOut }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-10"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close showreel"
              className="absolute right-5 top-5 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X size={20} />
            </button>

            <motion.video
              src="/assets/video/showreel-low.mp4"
              controls
              autoPlay
              playsInline
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.28, ease: easeOut }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-full w-full max-w-6xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Services — clay two-column list + hover carousel ────────────────────────
const HOME_SERVICE_GALLERY = [
  { src: "/assets/home-carousel/web/1.webp", alt: "Life at the Yuvabe studio" },
  { src: "/assets/home-carousel/web/2.webp", alt: "Life at the Yuvabe studio" },
  { src: "/assets/home-carousel/web/3.webp", alt: "Life at the Yuvabe studio" },
  { src: "/assets/home-carousel/web/4.webp", alt: "Life at the Yuvabe studio" },
  { src: "/assets/home-carousel/web/5.webp", alt: "Life at the Yuvabe studio" },
  { src: "/assets/home-carousel/web/6.webp", alt: "Life at the Yuvabe studio" },
  { src: "/assets/home-carousel/web/7.webp", alt: "Life at the Yuvabe studio" },
  { src: "/assets/home-carousel/web/8.webp", alt: "Life at the Yuvabe studio" },
  { src: "/assets/home-carousel/web/9.webp", alt: "Life at the Yuvabe studio" },
];

export function HomeServices({
  content,
}: {
  content: StudioHomepageServicesContent;
}) {
  return (
    <section className="border-y border-slate-200/80 bg-white py-16 md:py-24">
        <Rail>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="max-w-xl">
              <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
                {content.eyebrow}
              </p>
              <h2
                className="mt-4 text-display-muted-editorial tracking-[-0.032em] text-[var(--neutral-950)]"
                style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 600 }}
              >
                {content.headline}
              </h2>
              <p className="mt-5 text-body-lg leading-[1.5] text-[var(--color-text-secondary)]">
                {content.supportPrefix}{" "}
                <span className="font-semibold text-[var(--neutral-950)]">
                  {content.supportHighlight}
                </span>
                {content.supportSuffix}
              </p>
            </div>

            <div className="lg:pt-1">
              {content.items.map((item) => (
                <Link
                  key={item.title}
                  href={item.href ?? "/services"}
                  className="group flex items-center justify-between gap-6 border-b border-slate-200/80 py-5 first:border-t"
                >
                  <span className="font-[family-name:var(--font-display-family)] text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em] text-[var(--neutral-950)] transition-colors duration-200 group-hover:text-brand">
                    {item.title}
                  </span>
                  <ChevronRight
                    size={26}
                    className="shrink-0 text-(--neutral-400) transition-all duration-200 group-hover:translate-x-1 group-hover:text-brand"
                  />
                </Link>
              ))}
            </div>
          </div>
        </Rail>
      </section>
  );
}

// ─── Hover carousel band (reused from the About page) ────────────────────────
// The four pillars that sit beneath the approach carousel.
const HOME_APPROACH_CARDS = [
  {
    title: "Business-First Thinking",
    description:
      "We look beyond the brief to understand your business, your customers and your goals—so every solution creates lasting value.",
  },
  {
    title: "AI at the Core",
    description:
      "We don't bolt AI onto projects—we build with it from the start. By integrating AI across every stage of execution, we create smarter workflows, faster delivery and better business outcomes.",
  },
  {
    title: "Integrated Execution",
    description:
      "One collaborative team. Fewer handoffs. Faster decisions. Better outcomes.",
  },
  {
    title: "Built for Long-Term Growth",
    description:
      "Launching is just the beginning. We help you measure, optimise and evolve your digital products and marketing so your business continues to grow with confidence.",
  },
];

export function HomeCarousel() {
  return (
    <AboutHoverGallery
      images={HOME_SERVICE_GALLERY}
      eyebrow="Our Approach"
      title="One partner. Every stage of growth."
      subheading="Managing multiple agencies slows progress. Yuvabe brings strategy, design, engineering, AI and marketing together under one roof, giving you a seamless team that thinks strategically, executes efficiently and grows with your business."
      beforeGallery={
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {HOME_APPROACH_CARDS.map((card, index) => (
            <div
              key={card.title}
              className="border-t-2 border-brand/70 pt-6 transition-transform duration-300 hover:-translate-y-1.5"
            >
              <span className="font-mono text-[12px] font-medium text-(--neutral-400)">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-heading-md font-semibold leading-tight tracking-[-0.02em] text-(--neutral-950)">
                {card.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-(--color-text-secondary)">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      }
      footer={
        <Link
          href="/services"
          className="group inline-flex items-center gap-2 border-b border-(--neutral-300) pb-1 text-lg font-medium text-(--neutral-950) transition-colors hover:border-brand hover:text-brand"
        >
          View our services
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      }
    />
  );
}

// ─── Client logo wall ─────────────────────────────────────────────────────────
const HOME_CLIENT_LOGOS = [
  { name: "Rangsutra", src: "/logos/rangsutra.svg" },
  { name: "Quilt AI", src: "/logos/quilt.ai.svg" },
  { name: "Hemplanet", src: "/logos/hemplanet.svg" },
  { name: "Buglerock", src: "/logos/buglerock.svg" },
  { name: "Prakriti Sattva", src: "/logos/prakriti-sattva.svg" },
  { name: "Matrimandir", src: "/logos/matrimandir.svg" },
  { name: "Solitude Farm", src: "/logos/solitude-farm.svg" },
  { name: "AV Marathon", src: "/logos/av-marathon.svg" },
  { name: "Shraddha Yoga", src: "/logos/shraddha-yoga.svg" },
  { name: "Maatram", src: "/logos/maatram.svg" },
  { name: "Startup-O", src: "/logos/startup-o.svg" },
  { name: "Indic", src: "/logos/indic.svg" },
  { name: "BMH", src: "/logos/bmh.svg" },
  { name: "NSF", src: "/logos/nsf.svg" },
  { name: "CAT", src: "/logos/cat.svg" },
];

export function HomeClientLogos() {
  return (
    <section className="border-y border-slate-200/80 bg-white py-16 md:py-24">
      <Rail>
        <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
          Our clients
        </p>
        <h2
          className="mt-3 max-w-3xl tracking-[-0.032em] text-[var(--neutral-950)]"
          style={{ fontSize: "clamp(2.25rem,5vw,3.5rem)", fontWeight: 600 }}
        >
          Teams we&apos;ve built alongside.
        </h2>

        <div className="mt-16 grid grid-cols-2 items-center gap-x-12 gap-y-20 sm:grid-cols-3 md:mt-20 md:gap-x-16 md:gap-y-28 lg:grid-cols-5 lg:gap-x-20">
          {HOME_CLIENT_LOGOS.map((logo) => (
            <div key={logo.name} className="flex items-center justify-center">
              <div className="relative h-10 w-full md:h-12">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  sizes="(min-width: 1024px) 16vw, 40vw"
                  className="object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                />
              </div>
            </div>
          ))}
        </div>
      </Rail>
    </section>
  );
}

// ─── Case studies grid (6) with view all work ────────────────────────────────
const HOME_WORK_ORDER = [
  "general-aeronautics",
  "tvam",
  "kittykat",
  "bevolve",
  "ageshift",
  "hemplanet",
] as const;

const HOME_WORK_COVERS: Record<string, string> = {
  "general-aeronautics": "/assets/general-aeronautics/cover-summary.jpeg",
  tvam: "/assets/tvam/cover.png",
  kittykat: "/assets/KK/mock-detail.png",
  bevolve: "/assets/bevolve/cover-detail.png",
  ageshift: "/assets/ageshift/ageshift_cover.png",
  hemplanet: "/assets/hemplanet/cover.png",
};

export function HomeCaseStudies({
  caseStudies,
  work,
}: {
  caseStudies: StudioCaseStudySummary[];
  work: StudioHomepageWorkContent;
}) {
  const byId = new Map(caseStudies.map((cs) => [cs.id, cs]));
  const items = HOME_WORK_ORDER.map((id) => byId.get(id)).filter(
    (cs): cs is StudioCaseStudySummary => Boolean(cs),
  );

  return (
    <section className="border-t border-slate-200/80 bg-white py-16 md:py-24">
      <Rail>
        <div className="mb-12 max-w-3xl md:mb-16">
          <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
            {work.eyebrow}
          </p>
          <h2
            className="mt-3 text-display-muted-editorial tracking-[-0.032em] text-[var(--neutral-950)]"
            style={{ fontSize: "clamp(2.25rem,5vw,3.5rem)", fontWeight: 600 }}
          >
            {work.headline}
          </h2>
          <p className="mt-4 text-body-lg text-[var(--color-text-secondary)]">
            {work.supportPrefix}{" "}
            <span className="font-semibold text-[var(--neutral-950)]">
              {work.supportHighlight}
            </span>
            {work.supportSuffix}
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger}
          className="grid grid-cols-1 items-start gap-x-8 gap-y-14 md:gap-y-20 lg:grid-cols-12"
        >
          {items.map((cs, index) => {
            const cover =
              HOME_WORK_COVERS[cs.id] ??
              resolveStudioCaseStudyCoverSrc(cs, "summary") ??
              null;

            // Asymmetric 7/5 rhythm that flips each row — matching the work page
            // cadence, without a full-width feature lead.
            const pairIndex = Math.floor(index / 2);
            const isRowStart = index % 2 === 0;
            const wideOnLeft = pairIndex % 2 === 0;
            const isWide = isRowStart ? wideOnLeft : !wideOnLeft;
            const colClass = isWide ? "lg:col-span-7" : "lg:col-span-5";
            const offsetClass = !isWide ? "lg:mt-16" : "";

            return (
              <motion.div
                key={cs.id}
                variants={fadeUp}
                className={`${colClass} ${offsetClass}`}
              >
                <Link
                  href={getStudioCaseStudyHref(cs.id)}
                  className="group block"
                  aria-label={`View the ${cs.title} case study`}
                >
                  <div className="relative aspect-[9/16] max-h-[78vh] w-full overflow-hidden bg-(--neutral-100) ring-1 ring-slate-200/80">
                    {cover ? (
                      <Image
                        src={cover}
                        alt={`${cs.title} — ${cs.summary}`}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : null}
                    <div className="pointer-events-none absolute right-4 top-4 translate-y-2 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-black/85 px-4 py-2 text-[12px] font-medium text-white backdrop-blur">
                        View case study
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                  <div className="mt-5">
                    <h3 className="text-xl font-semibold leading-tight text-(--neutral-950) transition-colors duration-200 group-hover:text-brand sm:text-2xl">
                      {cs.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-(--color-text-secondary)">
                      {cs.summary}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-2 font-mono text-[11px] uppercase tracking-[0.12em] text-(--neutral-500)">
                      <span className="text-(--color-text-brand)">{cs.sector}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 border-b border-(--neutral-300) pb-1 text-lg font-medium text-(--neutral-950) transition-colors hover:border-brand hover:text-brand"
          >
            View all work
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </Rail>
    </section>
  );
}

// ─── Featured blogs ───────────────────────────────────────────────────────────
export function HomeFeaturedBlogs({ posts }: { posts: PublicBlogPost[] }) {
  const featured = posts.slice(0, 3);
  if (featured.length === 0) return null;

  return (
    <section className="border-t border-slate-200/80 bg-white py-16 md:py-24">
      <Rail>
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <h2
            className="text-display-muted-editorial tracking-[-0.032em] text-[var(--neutral-950)]"
            style={{ fontSize: "clamp(2.25rem,5vw,3.5rem)", fontWeight: 600 }}
          >
            Featured writing
          </h2>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-[15px] font-semibold text-(--neutral-900) transition-colors hover:text-brand"
          >
            View all posts
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger}
          className="divide-y divide-slate-200/80 border-y border-slate-200/80"
        >
          {featured.map((post) => (
            <motion.div key={post.slug} variants={fadeUp}>
              <Link
                href={`/blog/${post.slug}`}
                className="group grid items-center gap-6 py-8 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:gap-10"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-(--neutral-100) ring-1 ring-slate-200/80">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 768px) 22rem, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-(--color-text-brand)">
                    {post.category}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight text-(--neutral-950) transition-colors duration-200 group-hover:text-brand md:text-3xl">
                    {post.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-(--color-text-secondary)">
                    {post.subheading}
                  </p>
                  <p className="mt-4 font-mono text-[12px] text-(--neutral-500)">
                    {post.readingTime}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Rail>
    </section>
  );
}

// ─── "View our services" link band ────────────────────────────────────────────
export function HomeViewServices() {
  return (
    <section className="bg-white py-6">
      <Rail className="flex justify-center">
        <Link
          href="/services"
          className="group inline-flex items-center gap-2 border-b border-(--neutral-300) pb-1 text-lg font-medium text-(--neutral-950) transition-colors hover:border-brand hover:text-brand"
        >
          View our services
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </Rail>
    </section>
  );
}
