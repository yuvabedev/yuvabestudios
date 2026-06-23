"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .tvam-gsap-reveal { opacity: 0; }

  /* ── Textures ── */
  .tvam-film-grain {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 50; opacity: 0.04; mix-blend-mode: overlay;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>');
  }

  .tvam-bg-grid {
    background-size: 60px 60px;
    background-image:
      linear-gradient(to right, rgba(239,136,41,0.06) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(239,136,41,0.06) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  /* ── Layout helpers ── */
  .tvam-perspective-1500 { perspective: 1500px; }
  .tvam-perspective-1000 { perspective: 1000px; }

  .tvam-color-blobs {
    background:
      radial-gradient(ellipse 70% 55% at 15% 10%, rgba(239,136,41,0.06) 0%, transparent 60%),
      radial-gradient(ellipse 50% 45% at 90% 85%, rgba(199,191,255,0.07) 0%, transparent 60%);
  }

  /* ── Hero background text ── */
  .tvam-text-3d {
    color: #111111;
    text-shadow: 0 10px 30px rgba(239,136,41,0.12), 0 2px 4px rgba(0,0,0,0.06);
  }

  .tvam-text-gradient {
    background: linear-gradient(180deg, #ef8829 0%, rgba(239,136,41,0.5) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
  }

  /* ── CTA section text ── */
  .tvam-cta-heading {
    font-size: clamp(36px, 5.5vw, 72px);
    background: linear-gradient(180deg, #111 0%, rgba(17,17,17,0.6) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
  }

  .tvam-cta-orange {
    background: linear-gradient(92deg, #ef8829, #f4a860);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
  }

  /* ── Amber + white card ── */
  .tvam-premium-card {
    background: linear-gradient(135deg,
      #FFFFFF   0%,
      #fef3e4  22%,
      #f9d09a  48%,
      #f4a860  74%,
      #ef8829 100%
    );
    box-shadow:
      0 40px 100px -20px rgba(239,136,41,0.30),
      0 20px 40px -20px rgba(220,110,20,0.20),
      inset 0 1px 2px rgba(255,255,255,0.90),
      inset 0 -2px 4px rgba(180,90,10,0.15);
    border: 1px solid rgba(244,200,150,0.40);
    position: relative;
  }

  .tvam-card-sheen {
    position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
    background: radial-gradient(800px circle at var(--mouse-x,50%) var(--mouse-y,50%), rgba(255,255,255,0.18) 0%, transparent 40%);
    mix-blend-mode: overlay; transition: opacity 0.3s ease;
  }

  /* ── iPhone hardware ── */
  .tvam-iphone-bezel {
    background-color: #1A1A1A;
    box-shadow:
      inset 0 0 0 2px #52525B,
      inset 0 0 0 7px #000,
      0 40px 80px -15px rgba(0,0,0,0.50),
      0 15px 25px -5px rgba(0,0,0,0.35);
    transform-style: preserve-3d;
  }

  .tvam-hardware-btn {
    background: linear-gradient(90deg, #404040 0%, #171717 100%);
    box-shadow: -2px 0 5px rgba(0,0,0,0.8), inset -1px 0 1px rgba(255,255,255,0.15), inset 1px 0 2px rgba(0,0,0,0.8);
    border-left: 1px solid rgba(255,255,255,0.05);
  }

  /* Screen background — shows during image load */
  .tvam-screen-bg { background: #0a0a0a; }

  .tvam-screen-glare {
    background: linear-gradient(110deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 45%);
  }

  /* ── Slide images inside phone ── */
  .tvam-mock-slide {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    pointer-events: none;
  }

  /* ── Slide indicator dots ── */
  .tvam-slide-dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    transition: transform 0.3s ease;
  }
  .tvam-dot-active   { background-color: #ef8829; }
  .tvam-dot-inactive { background-color: rgba(0,0,0,0.18); }

  /* ── Floating glass badges — light card variant ── */
  .tvam-floating-badge {
    background: rgba(255,255,255,0.82);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 4px 28px rgba(180,90,20,0.14), 0 1px 4px rgba(0,0,0,0.06), inset 0 1px 1px rgba(255,255,255,0.95);
    border: 1px solid rgba(255,255,255,0.92);
  }

  .tvam-badge-icon-orange {
    background: linear-gradient(135deg, rgba(239,136,41,0.18), rgba(239,136,41,0.06));
    border: 1px solid rgba(239,150,60,0.24);
  }

  .tvam-badge-icon-warm {
    background: linear-gradient(135deg, rgba(199,191,255,0.22), rgba(199,191,255,0.08));
    border: 1px solid rgba(199,191,255,0.30);
  }

  .tvam-badge-label { color: rgba(80,40,10,0.58); }

  /* ── Logo card ── */
  .tvam-logo-card {
    background: rgba(255,255,255,0.88);
    box-shadow:
      0 8px 40px rgba(180,90,20,0.12),
      0 2px 8px rgba(0,0,0,0.06),
      inset 0 1px 1px rgba(255,255,255,1);
    border: 1px solid rgba(244,200,150,0.50);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  /* ── Tactile CTA buttons ── */
  .tvam-btn-primary, .tvam-btn-secondary {
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .tvam-btn-primary {
    background: linear-gradient(180deg, #f4a060 0%, #ef8829 100%);
    color: #FFFFFF;
    box-shadow: 0 0 0 1px rgba(239,136,41,0.3), 0 2px 4px rgba(0,0,0,0.2), 0 12px 24px -4px rgba(239,136,41,0.5), inset 0 1px 1px rgba(255,255,255,0.35), inset 0 -3px 6px rgba(140,80,10,0.3);
  }
  .tvam-btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 0 1px rgba(239,136,41,0.4), 0 6px 12px -2px rgba(239,136,41,0.35), 0 20px 32px -6px rgba(239,136,41,0.55), inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(140,80,10,0.3);
  }
  .tvam-btn-primary:active {
    transform: translateY(1px);
    background: #ef8829;
    box-shadow: 0 0 0 1px rgba(239,136,41,0.4), inset 0 3px 6px rgba(0,0,0,0.3);
  }

  .tvam-btn-secondary {
    background: linear-gradient(180deg, #27272A 0%, #18181B 100%);
    color: #FFFFFF;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.4), 0 12px 24px -4px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .tvam-btn-secondary:hover {
    transform: translateY(-3px);
    background: linear-gradient(180deg, #3F3F46 0%, #27272A 100%);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.15), 0 6px 12px -2px rgba(0,0,0,0.5), 0 20px 32px -6px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .tvam-btn-secondary:active {
    transform: translateY(1px);
    background: #18181B;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.05), inset 0 3px 8px rgba(0,0,0,0.9);
  }

  /* ── End-of-scroll content reveal panel ── */
  .tvam-stat-num {
    display: block;
    font-size: clamp(38px, 5.5vw, 68px);
    font-weight: 900;
    line-height: 1;
    color: #ef8829;
  }
  .tvam-stat-label {
    display: block;
    font-size: 11px;
    font-weight: 500;
    color: rgba(90,48,16,0.52);
    letter-spacing: 0.06em;
    margin-top: 8px;
    max-width: 14ch;
    line-height: 1.4;
  }
  .tvam-stat-rule {
    width: 1px;
    height: 52px;
    background: rgba(90,48,16,0.12);
    align-self: center;
    flex-shrink: 0;
  }

`;

export function TvamCinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef  = useRef<HTMLDivElement>(null);
  const mockupRef    = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number>(0);

  // Mouse → card sheen + mockup tilt
  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!mainCardRef.current || !mockupRef.current) return;
        const rect = mainCardRef.current.getBoundingClientRect();
        mainCardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        mainCardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
        const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
        const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(mockupRef.current, { rotationY: xVal * 12, rotationX: -yVal * 12, ease: "power3.out", duration: 1.2 });
      });
    }
    window.addEventListener("mousemove", onMouseMove);
    return () => { window.removeEventListener("mousemove", onMouseMove); cancelAnimationFrame(rafRef.current); };
  }, []);

  // Full cinematic GSAP scroll timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // ── Initial states ────────────────────────────────────────────────
      gsap.set(".tvam-text-track",  { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".tvam-text-reveal", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".tvam-main-card",   { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".tvam-card-left", ".tvam-card-right", ".tvam-mockup-wrap", ".tvam-badge"], { autoAlpha: 0 });
      gsap.set(".tvam-cta-wrap", { autoAlpha: 0, scale: 0.88, filter: "blur(30px)" });

      // Slide images — slide 1 at rest, 2 & 3 queued off-screen right
      gsap.set(".tvam-mock-1", { x: "0%" });
      gsap.set(".tvam-mock-2", { x: "100%" });
      gsap.set(".tvam-mock-3", { x: "100%" });

      // ── Entry sequence (on load) ──────────────────────────────────────
      gsap.timeline({ delay: 0.3 })
        .to(".tvam-text-track",  { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".tvam-text-reveal", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      // ── Scroll-driven cinematic timeline ─────────────────────────────
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=6000",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })
        // Phase 1: bg text blurs, card rises
        .to([".tvam-hero-bg", ".tvam-bg-grid"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".tvam-main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)

        // Phase 2: card expands to full screen
        .to(".tvam-main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })

        // Phase 3: phone swoops in WITH the card (starts during the rise so the
        // panel never sits empty before the mockup arrives)
        .fromTo(".tvam-mockup-wrap",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 },
          1.2)

        // Phase 4: Hold on Slide 1
        .to({}, { duration: 1.0 })

        // Phase 5: Slide left → Slide 2
        .to(".tvam-mock-1", { x: "-100%", duration: 0.6, ease: "power2.inOut" })
        .to(".tvam-mock-2", { x: "0%",    duration: 0.6, ease: "power2.inOut" }, "<")
        .to(".tvam-dot-1",  { backgroundColor: "#ef8829", scale: 1.4, duration: 0.3 }, "<")
        .to(".tvam-dot-0",  { backgroundColor: "rgba(0,0,0,0.18)", scale: 1, duration: 0.3 }, "<")
        .to({}, { duration: 1.0 })

        // Phase 6: Slide left → Slide 3
        .to(".tvam-mock-2", { x: "-100%", duration: 0.6, ease: "power2.inOut" })
        .to(".tvam-mock-3", { x: "0%",    duration: 0.6, ease: "power2.inOut" }, "<")
        .to(".tvam-dot-2",  { backgroundColor: "#ef8829", scale: 1.4, duration: 0.3 }, "<")
        .to(".tvam-dot-1",  { backgroundColor: "rgba(0,0,0,0.18)", scale: 1, duration: 0.3 }, "<")
        .to({}, { duration: 0.6 })

        // Phase 7: Floating badges fly in
        .fromTo(".tvam-badge",
          { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 },
          { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 },
          "-=0.4")

        // Phase 8: Card copy slides in from sides
        .fromTo(".tvam-card-left",  { x: -50, autoAlpha: 0 },         { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".tvam-card-right", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")

        // Hold with everything visible
        .to({}, { duration: 1.2 })

        // Phase 9: Reveal content panel — hide bg text, show cta layer
        .set(".tvam-hero-bg",  { autoAlpha: 0 })
        .set(".tvam-cta-wrap", { autoAlpha: 1 })
        .to({}, { duration: 0.6 })

        // Phase 9b: Card content exits
        .to([".tvam-mockup-wrap", ".tvam-badge", ".tvam-card-left", ".tvam-card-right"], {
          scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05,
        })

        // Phase 9c: Card pulls back to reveal content panel behind it
        .to(".tvam-main-card", {
          width:        isMobile ? "92vw" : "85vw",
          height:       isMobile ? "92vh" : "85vh",
          borderRadius: isMobile ? "32px" : "40px",
          ease: "expo.inOut", duration: 1.8,
        }, "pullback")
        .to(".tvam-cta-wrap", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")

        // Phase 10: Card exits up, brief hold on cta then collapse
        .to(".tvam-main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 })
        .to({}, { duration: 0.8 })
        .to(containerRef.current, { autoAlpha: 0, duration: 0.6 })
        .to(containerRef.current, { height: 0, duration: 0.3, ease: "none" }, ">");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="tvam-perspective-1500 relative w-screen h-screen overflow-hidden flex items-center justify-center bg-white font-sans antialiased"
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      <div className="tvam-film-grain" aria-hidden="true" />
      <div className="tvam-bg-grid absolute inset-0 z-0 pointer-events-none opacity-60" aria-hidden="true" />
      <div aria-hidden className="tvam-color-blobs pointer-events-none absolute inset-0 z-0" />

      {/* ── Layer 1: background hero text ── */}
      <div className="tvam-hero-bg absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform">
        <h1 className="tvam-text-track tvam-gsap-reveal tvam-text-3d text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2">
          Health guidance,
        </h1>
        <h1 className="tvam-text-reveal tvam-gsap-reveal tvam-text-gradient text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter">
          powered by AI
        </h1>
      </div>

      {/* ── Layer 1b: end-of-scroll content panel (z-10, outside/behind the card) ── */}
      <div className="tvam-cta-wrap absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-auto will-change-transform">
        <p className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#ef8829]">
          TVAM &middot; Health Insurance AI
        </p>
        <h2 className="tvam-cta-heading mb-3 font-bold tracking-tight leading-[1.04]">
          Health guidance,<br />
          <span className="tvam-cta-orange">reimagined.</span>
        </h2>
        <div className="flex items-start justify-center gap-8 sm:gap-12 mt-10 mb-6">
          <div className="text-center">
            <span className="tvam-stat-num">40%</span>
            <span className="tvam-stat-label">Lower customer<br />acquisition cost</span>
          </div>
          <div className="tvam-stat-rule" aria-hidden="true" />
          <div className="text-center">
            <span className="tvam-stat-num">2L+</span>
            <span className="tvam-stat-label">Users on<br />the platform</span>
          </div>
          <div className="tvam-stat-rule" aria-hidden="true" />
          <div className="text-center">
            <span className="tvam-stat-num">RAG</span>
            <span className="tvam-stat-label">AI powering<br />health guidance</span>
          </div>
        </div>
        <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-[#5A3010]/45">
          Vector search · RAG pipeline · Cloud-native architecture
        </p>
      </div>

      {/* ── Layer 2: orange + white card ── */}
      <div className="tvam-perspective-1500 absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div
          ref={mainCardRef}
          className="tvam-main-card tvam-premium-card tvam-gsap-reveal relative overflow-hidden flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-4xl md:rounded-[40px]"
        >
          <div className="tvam-card-sheen" aria-hidden="true" />

          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">

            {/* Col A — TVAM logo (top mobile / right desktop) */}
            <div className="tvam-card-right tvam-gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <div className="tvam-logo-card rounded-3xl p-4 md:p-5 lg:p-7">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/tvam/tvam-logo.png"
                  alt="TVAM"
                  className="h-20 md:h-24 lg:h-32 w-auto"
                />
              </div>
            </div>

            {/* Col B — iPhone mockup with scroll-driven image slider */}
            <div className="tvam-mockup-wrap tvam-perspective-1000 order-2 relative w-full h-95 lg:h-150 flex items-center justify-center z-10">
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.65] md:scale-85 lg:scale-100">

                <div
                  ref={mockupRef}
                  className="relative w-70 h-145 rounded-[3rem] tvam-iphone-bezel flex flex-col will-change-transform"
                >
                  {/* Hardware buttons */}
                  <div className="absolute top-30 -left-0.75 w-0.75 h-6.25 tvam-hardware-btn rounded-l-md" aria-hidden="true" />
                  <div className="absolute top-40 -left-0.75 w-0.75 h-11.25 tvam-hardware-btn rounded-l-md" aria-hidden="true" />
                  <div className="absolute top-55 -left-0.75 w-0.75 h-11.25 tvam-hardware-btn rounded-l-md" aria-hidden="true" />
                  <div className="absolute top-42.5 -right-0.75 w-0.75 h-17.5 tvam-hardware-btn rounded-r-md scale-x-[-1]" aria-hidden="true" />

                  {/* Screen */}
                  <div className="tvam-screen-bg absolute inset-1.75 rounded-[2.5rem] overflow-hidden z-10">
                    <div className="tvam-screen-glare absolute inset-0 z-40 pointer-events-none" aria-hidden="true" />

                    {/* Dynamic Island */}
                    <div className="absolute top-1.25 left-1/2 -translate-x-1/2 w-25 h-7 bg-black rounded-full z-50" aria-hidden="true" />

                    {/* ── Slide 1 ── */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="tvam-mock-slide tvam-mock-1"
                      src="/assets/tvam/mock-1.png"
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                    />

                    {/* ── Slide 2 ── */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="tvam-mock-slide tvam-mock-2"
                      src="/assets/tvam/mock-2.jpeg"
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                    />

                    {/* ── Slide 3 ── */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="tvam-mock-slide tvam-mock-3"
                      src="/assets/tvam/mock-3.jpeg"
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                    />

                    {/* Slide indicator dots */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-50" aria-hidden="true">
                      <span className="tvam-dot-0 tvam-slide-dot tvam-dot-active" />
                      <span className="tvam-dot-1 tvam-slide-dot tvam-dot-inactive" />
                      <span className="tvam-dot-2 tvam-slide-dot tvam-dot-inactive" />
                    </div>
                  </div>
                </div>

                {/* Floating badge — AI Powered */}
                <div className="tvam-badge absolute flex top-6 lg:top-12 -left-3.75 lg:-left-20 tvam-floating-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 z-30">
                  <div className="tvam-badge-icon-orange w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center">
                    <span className="text-base lg:text-xl" aria-hidden="true">🧠</span>
                  </div>
                  <div>
                    <p className="text-[#1C0800] text-xs lg:text-sm font-bold tracking-tight">AI Powered</p>
                    <p className="tvam-badge-label text-[10px] lg:text-xs">RAG-enhanced advisor</p>
                  </div>
                </div>

                {/* Floating badge — Policy Expert */}
                <div className="tvam-badge absolute flex bottom-12 lg:bottom-20 -right-3.75 lg:-right-20 tvam-floating-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 z-30">
                  <div className="tvam-badge-icon-warm w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center">
                    <span className="text-base lg:text-lg" aria-hidden="true">🏥</span>
                  </div>
                  <div>
                    <p className="text-[#1C0800] text-xs lg:text-sm font-bold tracking-tight">Policy Expert</p>
                    <p className="tvam-badge-label text-[10px] lg:text-xs">Personalised for you</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Col C — heading + description (bottom mobile / left desktop) */}
            <div className="tvam-card-left tvam-gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full px-4 lg:px-0">
              <h3 className="text-[#1C0800] text-2xl md:text-3xl lg:text-4xl font-bold mb-0 lg:mb-5 tracking-tight">
                Your health advisor, always on.
              </h3>
              <p className="hidden md:block text-sm md:text-base lg:text-lg font-normal leading-relaxed max-w-sm lg:max-w-none text-[#5A3010]/70">
                <span className="font-semibold text-[#ef8829]">TVAM</span> built AI advisor workflows with RAG,
                vector search, cloud deployment, and secure chat history — all unified under a clearer
                product narrative that users trust.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
