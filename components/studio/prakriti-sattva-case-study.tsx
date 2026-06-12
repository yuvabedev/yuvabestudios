"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────────────────────────────────────
// Scroll-driven video cue points.
// progress = 0→1 across the pinned hero zone.
// ─────────────────────────────────────────────────────────────────────────────
const CUES = [
  {
    at: 0,
    eyebrow: "Brand Identity · UI/UX Design · Web Redesign",
    headline: ["Pure.", "Ancient.", "Alive."],
    body: "An Ayurvedic skincare brand reimagined for the conscious consumer.",
  },
  {
    at: 0.28,
    eyebrow: "Heritage",
    headline: ["Rooted in five", "thousand years."],
    body: "Formulas that carry the weight of tradition — unchanged by trend.",
  },
  {
    at: 0.56,
    eyebrow: "Craft",
    headline: ["Every ingredient,", "a decision."],
    body: "Sourced from their native habitat. Verified by science. Trusted by skin.",
  },
  {
    at: 0.82,
    eyebrow: "Brand",
    headline: ["A brand built", "to endure."],
    body: "A complete identity system for the market that values authenticity.",
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// All injected styles — prefixed `ps-` to avoid global leaks
// ─────────────────────────────────────────────────────────────────────────────
const INJECTED_CSS = `
  /* ── Scroll-video hero ── */
  .ps-hero-pin {
    position: relative;
  }
  .ps-hero-sticky {
    position: sticky;
    top: 0;
    height: 100dvh;
    overflow: hidden;
    background: #0a0a08;
  }
  .ps-hero-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    will-change: transform;
  }
  /* bottom-to-top gradient — keeps text legible */
  .ps-hero-vignette {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(to top,  rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 45%),
      linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 30%);
  }

  /* ── Cue text panels ── */
  .ps-cue-wrap {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: clamp(1.75rem, 5vw, 4rem) clamp(1.5rem, 6vw, 5rem);
    padding-bottom: clamp(3rem, 7vw, 5.5rem);
    pointer-events: none;
  }
  .ps-cue {
    position: absolute;
    bottom: clamp(3rem, 7vw, 5.5rem);
    left: clamp(1.5rem, 6vw, 5rem);
    right: clamp(1.5rem, 6vw, 5rem);
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1);
    pointer-events: none;
    will-change: opacity, transform;
  }
  .ps-cue.is-active {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
  .ps-cue-eyebrow {
    display: block;
    font-family: ui-monospace, 'Cascadia Code', monospace;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    margin-bottom: 1rem;
  }
  .ps-cue-headline {
    font-size: clamp(42px, 7vw, 104px);
    font-weight: 700;
    line-height: 0.96;
    letter-spacing: -0.03em;
    color: #fff;
    margin: 0 0 1.25rem;
  }
  .ps-cue-body {
    font-size: clamp(14px, 1.3vw, 17px);
    line-height: 1.6;
    color: rgba(255,255,255,0.55);
    max-width: 36ch;
  }

  /* ── Progress bar (top edge) ── */
  .ps-progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    width: 0%;
    background: rgba(255,255,255,0.7);
    transition: width 0.1s linear;
    z-index: 20;
  }

  /* ── Scroll indicator ── */
  .ps-scroll-hint {
    position: absolute;
    bottom: clamp(1.5rem, 4vw, 2.5rem);
    right: clamp(1.5rem, 4vw, 2.5rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    opacity: 1;
    transition: opacity 0.5s ease;
    z-index: 20;
  }
  .ps-scroll-hint.is-hidden { opacity: 0; }
  .ps-scroll-hint-label {
    font-family: ui-monospace, monospace;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    writing-mode: vertical-rl;
  }
  .ps-scroll-line {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.5), transparent);
    animation: ps-line-pulse 1.6s ease-in-out infinite;
  }
  @keyframes ps-line-pulse {
    0%, 100% { transform: scaleY(1); opacity: 0.5; }
    50%       { transform: scaleY(0.6); opacity: 1; }
  }

  /* ── Cue counter (bottom-right corner) ── */
  .ps-cue-counter {
    position: absolute;
    bottom: clamp(2.5rem, 5vw, 4rem);
    right: clamp(1.5rem, 6vw, 5rem);
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 20;
  }
  .ps-counter-text {
    font-family: ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    color: rgba(255,255,255,0.35);
  }
  .ps-counter-dots {
    display: flex;
    gap: 5px;
  }
  .ps-counter-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(255,255,255,0.25);
    transition: background 0.4s ease, transform 0.4s ease;
  }
  .ps-counter-dot.is-active {
    background: rgba(255,255,255,0.85);
    transform: scale(1.4);
  }

  /* ── Sections below the hero ── */
  @keyframes ps-marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .ps-marquee-track {
    animation: ps-marquee 28s linear infinite;
    will-change: transform;
  }
  .ps-marquee-track:hover { animation-play-state: paused; }
  .ps-img-reveal { clip-path: inset(100% 0 0 0); }
  .ps-fade-up { opacity: 0; transform: translateY(56px); }
  .ps-scale-in { opacity: 0; transform: scale(0.94); }

  /* ── Reduced-motion: skip scroll control, just show the video ── */
  @media (prefers-reduced-motion: reduce) {
    .ps-hero-video { animation: none; }
    .ps-cue { transition: none; }
    .ps-scroll-line { animation: none; }
  }
`;

const LABELS = [
  "/assets/prakritisattva/label1.png",
  "/assets/prakritisattva/label2.png",
  "/assets/prakritisattva/label3.png",
  "/assets/prakritisattva/label4.png",
  "/assets/prakritisattva/label5.png",
  "/assets/prakritisattva/label6.png",
  "/assets/prakritisattva/label7.png",
  "/assets/prakritisattva/label8.png",
  "/assets/prakritisattva/label9.png",
  "/assets/prakritisattva/label10.png",
  "/assets/prakritisattva/label11.png",
  "/assets/prakritisattva/label12.png",
];

const OUTCOMES = [
  { num: "01", text: "Modernised brand identity" },
  { num: "02", text: "Trust-first visual system" },
  { num: "03", text: "Mobile-first web redesign" },
  { num: "04", text: "Ayurvedic credibility preserved" },
];

export function PrakritiSattvaCaseStudy() {
  const pageRef      = useRef<HTMLDivElement>(null);
  const heroPinRef   = useRef<HTMLElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const progressRef  = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const cueRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs      = useRef<(HTMLSpanElement | null)[]>([]);
  const counterRef   = useRef<HTMLSpanElement>(null);
  const activeCueIdx = useRef(0);
  const videoReady   = useRef(false);

  // ── Wire up cue ref array ───────────────────────────────────────────────
  const setCueRef = (el: HTMLDivElement | null, i: number) => {
    cueRefs.current[i] = el;
  };
  const setDotRef = (el: HTMLSpanElement | null, i: number) => {
    dotRefs.current[i] = el;
  };

  // ── Switch to a cue by index (DOM-direct for zero-rerender cost) ────────
  const switchCue = (next: number) => {
    if (next === activeCueIdx.current) return;
    const prev = activeCueIdx.current;

    cueRefs.current[prev]?.classList.remove("is-active");
    dotRefs.current[prev]?.classList.remove("is-active");

    cueRefs.current[next]?.classList.add("is-active");
    dotRefs.current[next]?.classList.add("is-active");

    if (counterRef.current) {
      counterRef.current.textContent = `${String(next + 1).padStart(2, "0")} / ${String(CUES.length).padStart(2, "0")}`;
    }

    activeCueIdx.current = next;
  };

  // ── Resolve which cue is active from scroll progress ───────────────────
  const cueForProgress = (p: number): number => {
    let idx = 0;
    for (let i = CUES.length - 1; i >= 0; i--) {
      if (p >= CUES[i].at) { idx = i; break; }
    }
    return idx;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Show first cue immediately
    cueRefs.current[0]?.classList.add("is-active");
    dotRefs.current[0]?.classList.add("is-active");
    if (counterRef.current) counterRef.current.textContent = `01 / 0${CUES.length}`;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── Reduced-motion / fallback: just autoplay ──────────────────────────
    if (prefersReduced) {
      video.autoplay = true;
      video.loop     = true;
      video.play().catch(() => {});
      return;
    }

    // ── Prepare for scroll-driven scrubbing ──────────────────────────────
    video.preload  = "auto";
    video.muted    = true;
    video.playsInline = true;
    video.pause();

    const onMeta = () => { videoReady.current = true; };
    video.addEventListener("loadedmetadata", onMeta);
    video.load();

    // ── ScrollTrigger on the pin section ─────────────────────────────────
    const st = ScrollTrigger.create({
      trigger: heroPinRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate(self) {
        const p = self.progress;

        // Drive video time
        if (videoReady.current && video.duration && isFinite(video.duration)) {
          const targetTime = video.duration * p;
          // Clamp to valid range
          video.currentTime = Math.max(0, Math.min(targetTime, video.duration - 0.016));
        }

        // Progress bar
        if (progressRef.current) {
          progressRef.current.style.width = `${p * 100}%`;
        }

        // Switch cue text
        switchCue(cueForProgress(p));

        // Hide scroll hint once user starts scrolling
        if (p > 0.04 && scrollHintRef.current) {
          scrollHintRef.current.classList.add("is-hidden");
        } else if (p <= 0.01 && scrollHintRef.current) {
          scrollHintRef.current.classList.remove("is-hidden");
        }
      },
    });

    // ── Section animations below the hero ────────────────────────────────
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".ps-fade-up").forEach((el) => {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        });
      });
      gsap.utils.toArray<HTMLElement>(".ps-img-reveal").forEach((el) => {
        gsap.to(el, {
          clipPath: "inset(0% 0 0 0)", duration: 1.3, ease: "expo.inOut",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        });
      });
      gsap.utils.toArray<HTMLElement>(".ps-scale-in").forEach((el) => {
        gsap.to(el, {
          opacity: 1, scale: 1, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        });
      });
      gsap.utils.toArray<HTMLElement>(".ps-grid-stagger").forEach((grid) => {
        gsap.from(grid.children, {
          opacity: 0, y: 40, stagger: 0.1, duration: 0.9, ease: "expo.out",
          scrollTrigger: { trigger: grid, start: "top 85%", toggleActions: "play none none none" },
        });
      });
    }, pageRef);

    return () => {
      st.kill();
      ctx.revert();
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, []);

  return (
    <div ref={pageRef} className="bg-[#F7F2EA] text-[#1C1108]">
      <style dangerouslySetInnerHTML={{ __html: INJECTED_CSS }} />

      {/* ── Back nav ── */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-[12px] font-medium backdrop-blur-md shadow-sm transition hover:bg-white text-[#1C1108]"
        >
          <ArrowLeft size={13} />
          Work
        </Link>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 1 — Scroll-driven video hero
          600vh pin zone → 100dvh sticky viewport
      ══════════════════════════════════════════ */}
      <section
        ref={heroPinRef}
        className="ps-hero-pin"
        style={{ height: "600vh" }}
      >
        <div className="ps-hero-sticky">
          {/* Video — full bleed, scroll-controlled */}
          <video
            ref={videoRef}
            className="ps-hero-video"
            src="/assets/prakritisattva/product.mp4"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />

          {/* Gradient vignette */}
          <div className="ps-hero-vignette" aria-hidden="true" />

          {/* Progress bar */}
          <div ref={progressRef} className="ps-progress-bar" aria-hidden="true" />

          {/* ── 4 text cue panels ── */}
          {CUES.map((cue, i) => (
            <div
              key={i}
              ref={(el) => setCueRef(el, i)}
              className="ps-cue"
              aria-hidden={i !== 0}
            >
              <span className="ps-cue-eyebrow">{cue.eyebrow}</span>
              <h1 className="ps-cue-headline">
                {cue.headline.map((line, li) => (
                  <span key={li} style={{ display: "block" }}>{line}</span>
                ))}
              </h1>
              <p className="ps-cue-body">{cue.body}</p>
            </div>
          ))}

          {/* ── Cue counter + dots (bottom-right) ── */}
          <div className="ps-cue-counter" aria-hidden="true">
            <span ref={counterRef} className="ps-counter-text">01 / 04</span>
            <div className="ps-counter-dots">
              {CUES.map((_, i) => (
                <span
                  key={i}
                  ref={(el) => setDotRef(el, i)}
                  className="ps-counter-dot"
                />
              ))}
            </div>
          </div>

          {/* ── Scroll hint (fades once scrolling starts) ── */}
          <div ref={scrollHintRef} className="ps-scroll-hint" aria-hidden="true">
            <span className="ps-scroll-hint-label">Scroll</span>
            <div className="ps-scroll-line" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — Statement + cover image
      ══════════════════════════════════════════ */}
      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <p
            className="ps-fade-up mb-14 max-w-4xl font-bold leading-[1.1] tracking-tight text-[#1C1108]"
            style={{ fontSize: "clamp(32px, 4.5vw, 64px)" }}
          >
            Honouring tradition.<br />
            <span className="text-[#5A7A3A]">Embracing clarity.</span>
          </p>

          <div className="ps-img-reveal overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/prakritisattva/cover.png"
              alt="Prakriti Sattva brand cover"
              className="h-[60vh] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — Project context
      ══════════════════════════════════════════ */}
      <section className="px-6 py-10 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.6fr] lg:items-start">
          <div className="ps-fade-up space-y-6">
            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-[#5A7A3A]">Client</p>
              <p className="text-base font-semibold">Prakriti Sattva LLC</p>
            </div>
            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-[#5A7A3A]">Category</p>
              <p className="text-base font-semibold">Wellness UX · Brand Identity</p>
            </div>
            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-[#5A7A3A]">Services</p>
              <p className="text-base font-semibold">Brand Identity · Tagline · UI/UX · Web Design</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="ps-fade-up">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#5A7A3A]">Challenge</p>
              <p className="text-[clamp(16px,1.5vw,20px)] leading-relaxed text-[#3A2C1A]/80">
                Modernising an Ayurvedic brand without diluting its essence or alienating its existing audience.
              </p>
            </div>
            <div className="ps-fade-up">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#5A7A3A]">Win</p>
              <p className="text-[clamp(16px,1.5vw,20px)] leading-relaxed text-[#3A2C1A]/80">
                A refreshed brand identity and website that feel contemporary yet deeply rooted in Ayurveda — a strong foundation for long-term brand trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4 — Product showcase
      ══════════════════════════════════════════ */}
      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <p className="ps-fade-up mb-10 font-mono text-[10px] uppercase tracking-widest text-[#5A7A3A]">
            Product Identity
          </p>
          <div className="ps-grid-stagger grid gap-4 sm:grid-cols-2">
            <div className="ps-img-reveal overflow-hidden rounded-2xl bg-[#EDE4D3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/prakritisattva/product.png"
                alt="Prakriti Sattva product"
                className="h-[55vh] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="ps-img-reveal overflow-hidden rounded-2xl bg-[#EDE4D3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/prakritisattva/product2.png"
                alt="Prakriti Sattva product range"
                className="h-[55vh] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 5 — Label marquee
      ══════════════════════════════════════════ */}
      <section className="overflow-hidden border-y border-[#D8CDB8] py-8">
        <div className="flex w-max">
          <div className="ps-marquee-track flex gap-6 px-3">
            {[...LABELS, ...LABELS].map((src, i) => (
              <div key={i} className="h-32 w-28 shrink-0 overflow-hidden rounded-xl bg-white shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Product label ${(i % 12) + 1}`}
                  className="h-full w-full object-contain p-2"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 6 — Category imagery
      ══════════════════════════════════════════ */}
      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <p className="ps-fade-up mb-10 font-mono text-[10px] uppercase tracking-widest text-[#5A7A3A]">
            Product Range
          </p>
          <div className="space-y-4">
            <div className="ps-img-reveal overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/prakritisattva/haircare.webp"
                alt="Haircare range"
                className="h-[50vh] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="ps-img-reveal overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/prakritisattva/bodycare.webp"
                  alt="Bodycare range"
                  className="h-[42vh] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
              <div className="ps-img-reveal overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/prakritisattva/lipcare.webp"
                  alt="Lipcare range"
                  className="h-[42vh] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 7 — Website snapshots
      ══════════════════════════════════════════ */}
      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <p className="ps-fade-up mb-10 font-mono text-[10px] uppercase tracking-widest text-[#5A7A3A]">
            Website Redesign
          </p>
          <div className="ps-img-reveal mb-4 overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/prakritisattva/snapshot1.png" alt="Website homepage" className="w-full object-cover" />
          </div>
          <div className="ps-grid-stagger mb-4 grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/prakritisattva/snapshot2.png" alt="Website inner page" className="w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/prakritisattva/snapshot3.png" alt="Website product page" className="w-full object-cover" />
            </div>
          </div>
          <div className="ps-img-reveal overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/prakritisattva/snapshot4.png" alt="Website mobile view" className="w-full object-cover" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 8 — Outcomes
      ══════════════════════════════════════════ */}
      <section className="border-y border-[#D8CDB8] px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <p className="ps-fade-up mb-10 font-mono text-[10px] uppercase tracking-widest text-[#5A7A3A]">
            What we delivered
          </p>
          <div className="ps-grid-stagger grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {OUTCOMES.map((o) => (
              <div key={o.num} className="border-t-2 border-[#5A7A3A] pt-5">
                <span className="block font-mono text-[11px] text-[#5A7A3A] mb-2">{o.num}</span>
                <p className="text-[17px] font-semibold leading-snug text-[#1C1108]">{o.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 9 — Hair image + testimonial
      ══════════════════════════════════════════ */}
      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="ps-img-reveal overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/prakritisattva/hair.png"
              alt="Prakriti Sattva hair product"
              className="h-[60vh] w-full object-cover"
            />
          </div>
          <div className="ps-fade-up">
            <div className="mb-6 flex size-10 items-center justify-center rounded-full bg-[#5A7A3A]/15">
              <svg viewBox="0 0 24 24" className="size-5 fill-[#5A7A3A]" aria-hidden="true">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
            <blockquote
              className="mb-6 font-medium italic leading-relaxed text-[#1C1108]"
              style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
            >
              &ldquo;Yuvabe Studios truly understood the soul of Prakriti Sattva. They translated our vision into a cohesive brand and website that feel authentic, inspiring, and transformative. They don&apos;t just build brands — they help you build a legacy with heart.&rdquo;
            </blockquote>
            <div>
              <p className="font-semibold text-[#1C1108]">Supriya Bhat</p>
              <p className="text-sm text-[#6B5A3A]">Founder, Prakriti Sattva LLC</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 10 — CTA footer card
      ══════════════════════════════════════════ */}
      <section className="px-6 pb-24 pt-10 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="ps-scale-in flex flex-col items-center justify-between gap-8 rounded-3xl bg-[#1C1108] px-8 py-14 text-center sm:px-14 md:flex-row md:text-left">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/prakritisattva/logo.png"
                alt="Prakriti Sattva"
                className="mb-4 h-10 w-auto brightness-0 invert md:mb-0"
              />
            </div>
            <p className="max-w-sm text-[17px] leading-relaxed text-white/65">
              A brand rooted in Ayurveda — now ready for the conscious consumer.
            </p>
            <Link
              href="/#process"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#5A7A3A] px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_6px_20px_rgba(90,122,58,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(90,122,58,0.5)]"
            >
              Start your project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
