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
// Cue points — progress 0→1 over the 600vh pin zone.
// Text swaps at these thresholds; video time is driven continuously by scroll.
// ─────────────────────────────────────────────────────────────────────────────
const CUES = [
  {
    at: 0,
    eyebrow: "Aviation Technology · Brand Identity · UI/UX Design",
    headline: ["Drone systems", "built for complexity."],
    body: "General Aeronautics turned a broad drone portfolio into a story buyers, partners, and operators could trust faster.",
  },
  {
    at: 0.27,
    eyebrow: "Portfolio",
    headline: ["Four verticals.", "One clear story."],
    body: "Agriculture, defense, humanitarian response, and warehouse automation — made navigable in a single digital experience.",
  },
  {
    at: 0.55,
    eyebrow: "Challenge",
    headline: ["Technical breadth,", "broken narrative."],
    body: "Without a clearer story, technical depth risks reading as fragmentation for every buyer and operator.",
  },
  {
    at: 0.80,
    eyebrow: "Work",
    headline: ["Brand, UX, content —", "unified."],
    body: "Website revamp, brand refresh, UI/UX direction, and supporting content — all reinforcing the same story.",
  },
] as const;

const OUTCOMES = [
  { num: "01", text: "Sharpened market story across four drone verticals" },
  { num: "02", text: "Unified website, product UI, and brand assets" },
  { num: "03", text: "Technical capabilities made accessible to non-technical buyers" },
  { num: "04", text: "Stronger platform for future launches and growth" },
];

const DOMAINS = [
  { icon: "🌾", label: "Agriculture",  desc: "Precision crop monitoring and targeted spray systems for modern farms." },
  { icon: "🛡️", label: "Defense",      desc: "Tactical ISR drones built for the demands of complex operational environments." },
  { icon: "🤝", label: "Humanitarian", desc: "Rapid-response aerial logistics for disaster relief and last-mile delivery." },
  { icon: "📦", label: "Logistics",    desc: "Autonomous warehouse inventory and indoor navigation drone systems." },
];

// ─────────────────────────────────────────────────────────────────────────────
// Injected styles — all ga- prefixed
// ─────────────────────────────────────────────────────────────────────────────
const INJECTED_CSS = `
  /* ── Pin zone: 600vh scroll drives the sticky viewport ── */
  .ga-pin {
    position: relative;
    height: 600vh;
  }
  .ga-sticky {
    position: sticky;
    top: 0;
    height: 100dvh;
    overflow: hidden;
    background: #0c0e10; /* visible before first video frame */
  }

  /* ── Canvas: the display surface.
     Video element is kept off-screen as the decode source only.
     Canvas checks readyState before every blit, so the last clean
     frame persists during seeks — eliminating pixel break-up. ── */
  .ga-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
  }
  .ga-video-src {
    /* off-screen decode source — not rendered, just decoded */
    position: absolute;
    width: 1px;
    height: 1px;
    top: -1px;
    left: -1px;
    opacity: 0;
    pointer-events: none;
  }

  /* ── Gradient vignette over canvas ── */
  .ga-vignette {
    position: absolute;
    inset: 0;
    /* White fade at bottom for smooth transition into light content sections */
    background:
      linear-gradient(to top,    #ffffff 0%, rgba(255,255,255,0) 42%),
      linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 22%),
      linear-gradient(to right,  rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 36%);
    pointer-events: none;
  }

  /* ── Progress bar (top edge) ── */
  .ga-progress {
    position: absolute;
    top: 0; left: 0;
    height: 2px;
    width: 0%;
    background: rgba(255,255,255,0.7);
    z-index: 40;
  }

  /* ── Cue text panels ── */
  .ga-cue {
    position: absolute;
    bottom: clamp(5rem, 11vw, 9rem);
    left:   clamp(1.5rem, 6vw, 5rem);
    right:  clamp(1.5rem, 6vw, 5rem);
    max-width: 560px;
    opacity: 0;
    transform: translateY(26px);
    transition:
      opacity   0.55s cubic-bezier(0.16,1,0.3,1),
      transform 0.55s cubic-bezier(0.16,1,0.3,1);
    will-change: opacity, transform;
    pointer-events: none;
    z-index: 20;
  }
  .ga-cue.is-active {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
  .ga-eyebrow {
    display: block;
    font-family: ui-monospace, monospace;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.50);
    margin-bottom: 1rem;
  }
  .ga-headline {
    font-size: clamp(36px, 5.8vw, 88px);
    font-weight: 800;
    line-height: 0.97;
    letter-spacing: -0.03em;
    color: #ffffff;
    margin: 0 0 1.25rem;
    text-shadow: 0 2px 28px rgba(0,0,0,0.5);
  }
  .ga-headline-line { display: block; }
  .ga-cue-body {
    font-size: clamp(13px, 1.2vw, 16px);
    line-height: 1.65;
    color: rgba(255,255,255,0.50);
    max-width: 38ch;
  }

  /* ── Counter + dots (bottom-right, on dark video) ── */
  .ga-counter {
    position: absolute;
    bottom: clamp(4rem, 8vw, 7rem);
    right:  clamp(1.5rem, 6vw, 5rem);
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 20;
  }
  .ga-counter-text {
    font-family: ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    color: rgba(255,255,255,0.28);
  }
  .ga-dots { display: flex; gap: 5px; }
  .ga-dot {
    width: 4px; height: 4px; border-radius: 50%;
    background: rgba(255,255,255,0.20);
    transition: background 0.35s ease, transform 0.35s ease;
  }
  .ga-dot.is-active {
    background: rgba(255,255,255,0.85);
    transform: scale(1.5);
  }

  /* ── Scroll hint (right side vertical) ── */
  .ga-scroll-hint {
    position: absolute;
    bottom: clamp(2rem, 4vw, 3rem);
    right:  clamp(1.5rem, 4vw, 2.5rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    opacity: 1;
    transition: opacity 0.5s ease;
    z-index: 20;
  }
  .ga-scroll-hint.is-hidden { opacity: 0; }
  .ga-hint-label {
    font-family: ui-monospace, monospace;
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    writing-mode: vertical-rl;
  }
  .ga-hint-line {
    width: 1px; height: 38px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.48), transparent);
    animation: ga-pulse 1.7s ease-in-out infinite;
  }
  @keyframes ga-pulse {
    0%,100% { transform: scaleY(1);    opacity: 0.48; }
    50%      { transform: scaleY(0.5); opacity: 1;    }
  }

  /* ── Logo in hero (inverted for dark bg) ── */
  .ga-logo-hero { filter: brightness(0) invert(1); opacity: 0.82; }

  /* ── Below-hero sections — light theme ── */
  .ga-fade-up    { opacity: 0; transform: translateY(48px); }
  .ga-img-reveal { clip-path: inset(100% 0 0 0); }
  .ga-scale-in   { opacity: 0; transform: scale(0.94); }

  .ga-domain-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 1rem;
    transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
  }
  .ga-domain-card:hover {
    border-color: #cbd5e1;
    box-shadow: 0 8px 24px rgba(15,23,42,0.07);
    transform: translateY(-2px);
  }

  .ga-statement {
    font-size: clamp(28px, 4vw, 58px);
    font-weight: 700;
    line-height: 1.08;
    letter-spacing: -0.025em;
  }

  .ga-testimonial-quote {
    font-size: clamp(17px, 1.9vw, 24px);
    font-style: italic;
    font-weight: 500;
    line-height: 1.65;
  }

  .ga-logo-content { height: 2.25rem; width: auto; opacity: 0.5; }

  .ga-cta-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 1.5rem;
  }
  .ga-cta-link {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 9999px;
    padding: 0.875rem 1.75rem;
    font-size: 13.5px;
    font-weight: 600;
    color: #0f172a;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    box-shadow: 0 2px 8px rgba(15,23,42,0.06);
    transition: box-shadow 0.25s ease, transform 0.25s ease;
  }
  .ga-cta-link:hover {
    box-shadow: 0 6px 20px rgba(15,23,42,0.12);
    transform: translateY(-2px);
  }

  /* ── Reduced-motion: skip animation ── */
  @media (prefers-reduced-motion: reduce) {
    .ga-cue       { transition: none; }
    .ga-hint-line { animation: none; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export function GaCinematicCaseStudy() {
  const pageRef       = useRef<HTMLDivElement>(null);
  const heroPinRef    = useRef<HTMLElement>(null);
  const videoRef      = useRef<HTMLVideoElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const progressRef   = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const cueRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs       = useRef<(HTMLSpanElement | null)[]>([]);
  const counterRef    = useRef<HTMLSpanElement>(null);

  // Mutable state kept in refs (avoids re-renders)
  const activeCueIdx  = useRef(0);
  const videoReady    = useRef(false);
  const drawLoopId    = useRef(0);
  const seekRafId     = useRef(0);
  const pendingTime   = useRef<number | null>(null);

  const setCueRef = (el: HTMLDivElement | null, i: number) => { cueRefs.current[i] = el; };
  const setDotRef = (el: HTMLSpanElement | null, i: number) => { dotRefs.current[i] = el; };

  const switchCue = (next: number) => {
    if (next === activeCueIdx.current) return;
    const prev = activeCueIdx.current;
    cueRefs.current[prev]?.classList.remove("is-active");
    dotRefs.current[prev]?.classList.remove("is-active");
    cueRefs.current[next]?.classList.add("is-active");
    dotRefs.current[next]?.classList.add("is-active");
    if (counterRef.current) {
      counterRef.current.textContent =
        `${String(next + 1).padStart(2, "0")} / ${String(CUES.length).padStart(2, "0")}`;
    }
    activeCueIdx.current = next;
  };

  const cueForProgress = (p: number): number => {
    let idx = 0;
    for (let i = CUES.length - 1; i >= 0; i--) {
      if (p >= CUES[i].at) { idx = i; break; }
    }
    return idx;
  };

  useEffect(() => {
    const video  = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // ── Activate first cue immediately ──────────────────────────────────
    cueRefs.current[0]?.classList.add("is-active");
    dotRefs.current[0]?.classList.add("is-active");
    if (counterRef.current) counterRef.current.textContent = `01 / 0${CUES.length}`;

    // ── Reduced-motion: just autoplay the video directly ─────────────────
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      // Show canvas-less video at full size
      video.style.cssText =
        "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:1;";
      video.autoplay    = true;
      video.loop        = true;
      video.play().catch(() => {});
      return;
    }

    // ── Canvas setup ─────────────────────────────────────────────────────
    // alpha:false → black initial fill, faster composite (no alpha channel)
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const sizeCanvas = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    sizeCanvas();
    window.addEventListener("resize", sizeCanvas, { passive: true });

    // ── Cover-fit blit ───────────────────────────────────────────────────
    // Replicates CSS object-fit: cover.
    // Only draws when the video has a complete, non-corrupted frame.
    // During seeks the canvas keeps the previous frame — no pixel break-up.
    const blit = () => {
      if (
        !video.videoWidth ||
        video.readyState < 2 /* HAVE_CURRENT_DATA */ ||
        video.seeking
      ) return;

      const vw = video.videoWidth;
      const vh = video.videoHeight;
      const cw = canvas.width;
      const ch = canvas.height;
      const vr = vw / vh;
      const cr = cw / ch;

      // Source crop so the video fills the canvas without letterboxing
      let sx = 0, sy = 0, sw = vw, sh = vh;
      if (vr > cr) {
        sw = vh * cr;
        sx = (vw - sw) / 2;
      } else {
        sh = vw / cr;
        sy = (vh - sh) / 2;
      }
      ctx.drawImage(video, sx, sy, sw, sh, 0, 0, cw, ch);
    };

    const drawLoop = () => {
      blit();
      drawLoopId.current = requestAnimationFrame(drawLoop);
    };
    drawLoopId.current = requestAnimationFrame(drawLoop);

    // ── Video as a decode source ─────────────────────────────────────────
    video.preload     = "auto";
    video.muted       = true;
    video.playsInline = true;
    video.pause();

    const onMeta = () => { videoReady.current = true; };
    video.addEventListener("loadedmetadata", onMeta);
    video.load();

    // ── RAF-batched seek ─────────────────────────────────────────────────
    // Coalesces all scroll events within a single animation frame into
    // one seek call. Canvas readyState guard handles any residual artifacts.
    const flushSeek = () => {
      const t = pendingTime.current;
      if (t !== null && videoReady.current && video.duration && isFinite(video.duration)) {
        const clamped = Math.max(0, Math.min(t, video.duration - 0.016));
        // fastSeek() (Firefox only): snaps to nearest keyframe, zero decode lag.
        // Falls back to currentTime; canvas guard makes artifacts invisible.
        if (typeof (video as HTMLVideoElement & { fastSeek?(t: number): void }).fastSeek === "function") {
          (video as HTMLVideoElement & { fastSeek(t: number): void }).fastSeek(clamped);
        } else {
          video.currentTime = clamped;
        }
        pendingTime.current = null;
      }
      seekRafId.current = 0;
    };

    // ── ScrollTrigger ────────────────────────────────────────────────────
    const st = ScrollTrigger.create({
      trigger: heroPinRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate(self) {
        const p = self.progress;

        // Queue one seek per rAF tick (coalesces rapid scroll events)
        pendingTime.current = p * (video.duration || 0);
        if (!seekRafId.current) seekRafId.current = requestAnimationFrame(flushSeek);

        // Progress bar: update every tick (cheap DOM write)
        if (progressRef.current) progressRef.current.style.width = `${p * 100}%`;

        // Cue switch
        switchCue(cueForProgress(p));

        // Scroll hint visibility
        if (scrollHintRef.current) {
          if (p > 0.04) scrollHintRef.current.classList.add("is-hidden");
          else if (p <= 0.01) scrollHintRef.current.classList.remove("is-hidden");
        }
      },
    });

    // ── Below-hero reveal animations ─────────────────────────────────────
    const gsapCtx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".ga-fade-up").forEach((el) => {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        });
      });
      gsap.utils.toArray<HTMLElement>(".ga-img-reveal").forEach((el) => {
        gsap.to(el, {
          clipPath: "inset(0% 0 0 0)", duration: 1.4, ease: "expo.inOut",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        });
      });
      gsap.utils.toArray<HTMLElement>(".ga-scale-in").forEach((el) => {
        gsap.to(el, {
          opacity: 1, scale: 1, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        });
      });
      gsap.utils.toArray<HTMLElement>(".ga-grid-stagger").forEach((grid) => {
        gsap.from((grid as HTMLElement).children, {
          opacity: 0, y: 40, stagger: 0.09, duration: 0.95, ease: "expo.out",
          scrollTrigger: { trigger: grid, start: "top 84%", toggleActions: "play none none none" },
        });
      });
    }, pageRef);

    return () => {
      st.kill();
      gsapCtx.revert();
      cancelAnimationFrame(drawLoopId.current);
      if (seekRafId.current) cancelAnimationFrame(seekRafId.current);
      window.removeEventListener("resize", sizeCanvas);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, []);

  return (
    <div ref={pageRef} className="bg-white text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: INJECTED_CSS }} />

      {/* ── Back nav ── */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-[12px] font-medium backdrop-blur-md shadow-sm border border-slate-200 transition hover:bg-white text-slate-700"
        >
          <ArrowLeft size={13} />
          Work
        </Link>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          HERO — 600vh pin zone, 100dvh sticky viewport
          Canvas renders video frames. Video element is the decode source.
      ══════════════════════════════════════════════════════════════ */}
      <section ref={heroPinRef} className="ga-pin">
        <div className="ga-sticky">

          {/* Display canvas — blit only on clean frames */}
          <canvas ref={canvasRef} className="ga-canvas" aria-hidden="true" />

          {/* Video — decode source, not rendered directly */}
          <video
            ref={videoRef}
            className="ga-video-src"
            src="/assets/general-aeronautics/drone.mp4"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />

          {/* Vignette + white fade at bottom */}
          <div className="ga-vignette" aria-hidden="true" />

          {/* Progress bar */}
          <div ref={progressRef} className="ga-progress" aria-hidden="true" />

          {/* Logo — centered top */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/general-aeronautics/logo.svg"
              alt="General Aeronautics"
              className="ga-logo-hero h-7 md:h-9 w-auto"
            />
          </div>

          {/* Cue text panels */}
          {CUES.map((cue, i) => (
            <div
              key={i}
              ref={(el) => setCueRef(el, i)}
              className="ga-cue"
            >
              <span className="ga-eyebrow">{cue.eyebrow}</span>
              <h1 className="ga-headline">
                {cue.headline.map((line, li) => (
                  <span key={li} className="ga-headline-line">{line}</span>
                ))}
              </h1>
              <p className="ga-cue-body">{cue.body}</p>
            </div>
          ))}

          {/* Counter + dots */}
          <div className="ga-counter" aria-hidden="true">
            <span ref={counterRef} className="ga-counter-text">01 / 04</span>
            <div className="ga-dots">
              {CUES.map((_, i) => (
                <span key={i} ref={(el) => setDotRef(el, i)} className="ga-dot" />
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <div ref={scrollHintRef} className="ga-scroll-hint" aria-hidden="true">
            <span className="ga-hint-label">Scroll</span>
            <div className="ga-hint-line" />
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CONTENT SECTIONS — light theme
      ══════════════════════════════════════════════════════════════ */}

      {/* Statement */}
      <section className="px-6 py-20 md:px-12 lg:px-20 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl">
          <p className="ga-fade-up ga-statement text-slate-900">
            Complex drone portfolio.<br />
            <span className="text-slate-400">Clear digital story.</span>
          </p>
        </div>
      </section>

      {/* Cover image */}
      <section className="px-6 pb-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="ga-img-reveal overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/general-aeronautics/cover-detail.png"
              alt="General Aeronautics — cover"
              className="h-[62vh] w-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* Project context */}
      <section className="px-6 py-16 md:px-12 lg:px-20 border-t border-slate-200/80">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.7fr] lg:items-start">
          <div className="ga-fade-up space-y-7">
            {[
              { label: "Client",   value: "General Aeronautics" },
              { label: "Sector",   value: "Aviation Technology" },
              { label: "Services", value: "Market Positioning · Brand Identity · Content & UX" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-slate-400">{label}</p>
                <p className="text-base font-semibold text-slate-800">{value}</p>
              </div>
            ))}
          </div>
          <div className="space-y-9">
            <div className="ga-fade-up">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-slate-400">Context</p>
              <p className="text-[clamp(15px,1.4vw,19px)] leading-relaxed text-slate-600">
                General Aeronautics builds drone systems across agriculture, defense, humanitarian response,
                and warehouse automation. As the portfolio expanded, communicating that breadth clearly
                became the critical challenge.
              </p>
            </div>
            <div className="ga-fade-up">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-slate-400">What we changed</p>
              <p className="text-[clamp(15px,1.4vw,19px)] leading-relaxed text-slate-600">
                Yuvabe paired a website revamp with brand refresh, UI/UX direction, and supporting
                content — so product communication and credibility cues reinforced each other
                across every touchpoint instead of fragmenting it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Work gallery */}
      <section className="px-6 py-16 md:px-12 lg:px-20 border-t border-slate-200/80 bg-slate-50/50">
        <div className="mx-auto max-w-7xl">
          <p className="ga-fade-up mb-10 font-mono text-[10px] uppercase tracking-widest text-slate-400">
            The Work
          </p>
          <div className="ga-img-reveal mb-4 overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/general-aeronautics/cover-home.png"
              alt="General Aeronautics — drone hero"
              className="h-[55vh] w-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
          <div className="ga-grid-stagger grid gap-4 sm:grid-cols-2 mb-4">
            {["mock1", "mock3"].map((name) => (
              <div key={name} className="overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/assets/general-aeronautics/${name}.png`}
                  alt=""
                  className="h-[42vh] w-full object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            ))}
          </div>
          <div className="ga-grid-stagger grid gap-4 sm:grid-cols-3">
            <div className="overflow-hidden rounded-2xl sm:col-span-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/general-aeronautics/mock13.png"
                alt=""
                className="h-[36vh] w-full object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
            <div className="overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/general-aeronautics/mock5.png"
                alt=""
                className="h-[36vh] w-full object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Domain verticals */}
      <section className="px-6 py-16 md:px-12 lg:px-20 border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl">
          <p className="ga-fade-up mb-10 font-mono text-[10px] uppercase tracking-widest text-slate-400">
            Verticals
          </p>
          <div className="ga-grid-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DOMAINS.map((d) => (
              <div key={d.label} className="ga-domain-card p-6 space-y-4">
                <span className="text-3xl" role="img" aria-label={d.label}>{d.icon}</span>
                <div>
                  <p className="font-bold text-slate-800 text-base mb-1.5">{d.label}</p>
                  <p className="text-[13px] leading-relaxed text-slate-500">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="px-6 py-16 md:px-12 lg:px-20 border-t border-slate-200/80 bg-slate-50/50">
        <div className="mx-auto max-w-7xl">
          <p className="ga-fade-up mb-10 font-mono text-[10px] uppercase tracking-widest text-slate-400">
            What we delivered
          </p>
          <div className="ga-grid-stagger grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {OUTCOMES.map((o) => (
              <div key={o.num} className="border-t-2 border-slate-200 pt-5">
                <span className="block font-mono text-[11px] text-slate-400 mb-2.5">{o.num}</span>
                <p className="text-[16px] font-semibold leading-snug text-slate-800">{o.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-6 py-20 md:px-12 lg:px-20 border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl">
          <div className="ga-img-reveal mb-12 overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/general-aeronautics/cover-summary.jpeg"
              alt="General Aeronautics — aerial view"
              className="h-[48vh] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
          <div className="ga-fade-up max-w-3xl">
            <div className="mb-6 flex size-10 items-center justify-center rounded-full bg-slate-100 border border-slate-200">
              <svg viewBox="0 0 24 24" className="size-4 fill-slate-500" aria-hidden="true">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <blockquote className="ga-testimonial-quote mb-6 font-medium italic leading-relaxed text-slate-700">
              &ldquo;The work made a technically complex drone business easier to understand and
              easier to trust. Website, product UX, and supporting assets finally reinforced
              the same story instead of fragmenting it.&rdquo;
            </blockquote>
            <p className="font-semibold text-slate-800">General Aeronautics team</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 pt-10 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="ga-cta-card ga-scale-in flex flex-col items-center justify-between gap-8 px-8 py-14 text-center sm:px-14 md:flex-row md:text-left">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/general-aeronautics/logo.svg"
                alt="General Aeronautics"
                className="ga-logo-content"
              />
            </div>
            <p className="max-w-sm text-[16px] leading-relaxed text-slate-500">
              A drone portfolio made navigable — the same story across every touchpoint.
            </p>
            <Link href="/#process" className="ga-cta-link">
              Start your project
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
