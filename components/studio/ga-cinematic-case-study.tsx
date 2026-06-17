"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const OUTCOMES = [
  { num: "01", text: "Sharpened market story across four drone verticals" },
  { num: "02", text: "Unified website, product UI, and brand assets" },
  { num: "03", text: "Technical capabilities made accessible to non-technical buyers" },
  { num: "04", text: "Stronger platform for future launches and growth" },
];

const DOMAINS = [
  { label: "Agriculture",  desc: "Precision crop monitoring and targeted spray systems for modern farms." },
  { label: "Defense",      desc: "Tactical ISR drones built for the demands of complex operational environments." },
  { label: "Humanitarian", desc: "Rapid-response aerial logistics for disaster relief and last-mile delivery." },
  { label: "Logistics",    desc: "Autonomous warehouse inventory and indoor navigation drone systems." },
];

// Clay-style editorial meta + services
const META = [
  { label: "Client",   value: "General Aeronautics" },
  { label: "Industry", value: "Aviation Technology" },
  { label: "Year",     value: "2025" },
];

const SERVICES = [
  "Market Positioning",
  "Brand Identity",
  "UI / UX Design",
  "Website Design & Build",
  "Content & Messaging",
];

// ─────────────────────────────────────────────────────────────────────────────
// Editorial styles — all ga- prefixed
// ─────────────────────────────────────────────────────────────────────────────
const INJECTED_CSS = `
  /* ── Reveal initial states (driven by GSAP) ── */
  .ga-fade-up    { opacity: 0; transform: translateY(48px); }
  .ga-img-reveal { clip-path: inset(100% 0 0 0); }

  /* ── Clay-style editorial typography ── */
  .ga-display {
    font-size: clamp(44px, 9vw, 132px);
    font-weight: 800;
    letter-spacing: -0.045em;
    line-height: 0.9;
  }
  .ga-section-head {
    font-size: clamp(28px, 4.6vw, 64px);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.03;
  }
  .ga-lead {
    font-size: clamp(19px, 2.1vw, 30px);
    font-weight: 500;
    line-height: 1.45;
    letter-spacing: -0.01em;
  }
  .ga-bigquote {
    font-size: clamp(26px, 3.4vw, 48px);
    font-weight: 600;
    line-height: 1.18;
    letter-spacing: -0.025em;
  }

  /* Break an element out to the full viewport width inside a centered container */
  .ga-fullbleed {
    width: 100vw;
    margin-left: 50%;
    transform: translateX(-50%);
  }

  /* Editorial divided list (services / verticals) */
  .ga-row {
    border-top: 1px solid #e2e8f0;
    transition: background-color 0.25s ease;
  }
  .ga-row:hover { background-color: #f8fafc; }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export function GaCinematicCaseStudy() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Below-hero reveal animations
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
      gsap.utils.toArray<HTMLElement>(".ga-grid-stagger").forEach((grid) => {
        gsap.from((grid as HTMLElement).children, {
          opacity: 0, y: 40, stagger: 0.09, duration: 0.95, ease: "expo.out",
          scrollTrigger: { trigger: grid, start: "top 84%", toggleActions: "play none none none" },
        });
      });
    }, pageRef);

    return () => gsapCtx.revert();
  }, []);

  return (
    <div ref={pageRef} className="overflow-x-clip bg-white text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: INJECTED_CSS }} />

      {/* ══════════════════════════════════════════════════════════════
          HERO — scroll-to-expand drone video
      ══════════════════════════════════════════════════════════════ */}
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/assets/general-aeronautics/drone.mp4"
        posterSrc="/assets/general-aeronautics/cover-home.png"
        bgImageSrc="/assets/ga/background.jpg"
        title="General Aeronautics"
        date="Aviation Technology"
        scrollToExpand="Scroll to expand"
        textBlend
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="ga-lead text-slate-600">
            A brand system and digital experience for a multi-vertical drone
            manufacturer — turning technical breadth into one clear story.
          </p>
        </div>
      </ScrollExpandMedia>

      {/* ══════════════════════════════════════════════════════════════
          CASE STUDY BODY — Clay-style editorial, light theme
      ══════════════════════════════════════════════════════════════ */}

      {/* ─── Full-bleed lead image ─── */}
      <section className="pb-20 md:pb-28">
        <div className="ga-img-reveal ga-fullbleed overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/general-aeronautics/cover.png"
            alt="General Aeronautics — drone system"
            className="h-[56vh] w-full object-contain object-bottom-center md:h-[88vh]"
          />
        </div>
      </section>

      {/* ─── Overview + meta + services ─── */}
      <section className="px-6 pb-20 md:px-12 lg:px-20 md:pb-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Meta + services */}
          <div className="ga-fade-up space-y-12">
            <dl className="space-y-6">
              {META.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between gap-6 border-b border-slate-200 pb-4"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                    {label}
                  </dt>
                  <dd className="text-right text-base font-semibold text-slate-800">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                Services
              </p>
              <ul>
                {SERVICES.map((s) => (
                  <li
                    key={s}
                    className="ga-row px-1 py-4 text-[15px] font-medium text-slate-700"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Overview lead */}
          <div className="ga-fade-up">
            <p className="ga-lead text-slate-800">
              General Aeronautics builds drone systems across agriculture,
              defense, humanitarian response, and warehouse automation. As the
              portfolio grew, communicating that breadth clearly became the
              defining challenge.
            </p>
            <p className="mt-7 text-[clamp(15px,1.4vw,19px)] leading-relaxed text-slate-500">
              Yuvabe paired a website revamp with a brand refresh, UI/UX
              direction, and supporting content — so product communication and
              credibility cues reinforced each other across every touchpoint
              instead of fragmenting it.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Narrative 01 — The Challenge ─── */}
      <section className="px-6 pt-20 md:px-12 lg:px-20 md:pt-28 border-t border-slate-200/80">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div className="ga-fade-up">
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
              01 — The Challenge
            </p>
            <h3 className="ga-section-head text-slate-900">
              Technical breadth,
              <br />
              <span className="text-slate-400">broken narrative.</span>
            </h3>
          </div>
          <p className="ga-fade-up text-[clamp(15px,1.4vw,19px)] leading-relaxed text-slate-500">
            Across four very different verticals, depth of engineering was the
            strength — but without a single story to hold it together, that
            breadth risked reading as fragmentation to buyers, partners, and
            operators alike.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="ga-img-reveal overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/general-aeronautics/cover-home.png"
              alt="General Aeronautics — website hero"
              className="h-[58vh] w-full object-cover object-center transition-transform duration-700 hover:scale-[1.02] md:h-[72vh]"
            />
          </div>
        </div>
      </section>

      {/* ─── Narrative 02 — Four verticals, one story ─── */}
      <section className="px-6 pt-12 md:px-12 lg:px-20 md:pt-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div className="ga-fade-up">
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
              02 — The Approach
            </p>
            <h3 className="ga-section-head text-slate-900">
              Four verticals,
              <br />
              <span className="text-slate-400">one clear story.</span>
            </h3>
          </div>
          <p className="ga-fade-up text-[clamp(15px,1.4vw,19px)] leading-relaxed text-slate-500">
            We built a navigation and messaging system that lets each vertical
            stand on its own while laddering up to a single, confident brand —
            so a defense buyer and an agriculture operator each find their story
            without losing the whole.
          </p>
        </div>
      </section>

      <section className="px-6 py-14 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <ul className="ga-grid-stagger">
            {DOMAINS.map((d, i) => (
              <li
                key={d.label}
                className="ga-row flex flex-col gap-2 py-7 md:flex-row md:items-baseline md:gap-10"
              >
                <div className="flex items-baseline gap-5 md:w-1/3">
                  <span className="font-mono text-[11px] text-slate-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[clamp(20px,2.4vw,30px)] font-semibold tracking-tight text-slate-900">
                    {d.label}
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed text-slate-500 md:w-2/3">
                  {d.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-10 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="ga-grid-stagger grid gap-4 sm:grid-cols-2">
            {["mock1", "mock3"].map((name) => (
              <div key={name} className="overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/assets/general-aeronautics/${name}.png`}
                  alt="General Aeronautics — interface"
                  className="h-[46vh] w-full object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Narrative 03 — A site that sells the system ─── */}
      <section className="px-6 pt-16 md:px-12 lg:px-20 md:pt-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div className="ga-fade-up">
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
              03 — The Work
            </p>
            <h3 className="ga-section-head text-slate-900">
              A site that sells
              <br />
              <span className="text-slate-400">the whole system.</span>
            </h3>
          </div>
          <p className="ga-fade-up text-[clamp(15px,1.4vw,19px)] leading-relaxed text-slate-500">
            Website, product UI, and brand assets were rebuilt to reinforce the
            same story — pairing credible engineering detail with a clean,
            modern interface that non-technical buyers can navigate with
            confidence.
          </p>
        </div>
      </section>

      <section className="px-6 py-14 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="ga-img-reveal overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/general-aeronautics/cover-mock.png"
              alt="General Aeronautics — product UI"
              className="h-[44vh] w-full object-cover object-top transition-transform duration-700 hover:scale-[1.02] md:h-[60vh]"
            />
          </div>
          <div className="ga-grid-stagger grid gap-4 sm:grid-cols-2">
            {["mock5", "mock13"].map((name) => (
              <div key={name} className="overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/assets/general-aeronautics/${name}.png`}
                  alt="General Aeronautics — interface"
                  className="h-[40vh] w-full object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Results ─── */}
      <section className="px-6 py-20 md:px-12 lg:px-20 md:py-28 border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl">
          <p className="ga-fade-up mb-12 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
            The Outcome
          </p>
          <div className="ga-grid-stagger grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {OUTCOMES.map((o) => (
              <div key={o.num} className="border-t-2 border-slate-900 pt-6">
                <span className="mb-4 block font-mono text-[12px] text-slate-400">
                  {o.num}
                </span>
                <p className="text-[clamp(17px,1.6vw,21px)] font-semibold leading-snug text-slate-900">
                  {o.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonial (image + quote) ─── */}
      <section className="px-6 py-20 md:px-12 lg:px-20 md:py-28 border-t border-slate-200/80">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="ga-img-reveal overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/general-aeronautics/cover-detail.png"
              alt="General Aeronautics — drone system"
              className="h-[60vh] w-full object-cover object-center"
            />
          </div>
          <div className="ga-fade-up">
            <div className="mb-6 flex size-10 items-center justify-center rounded-full bg-slate-900/10">
              <svg
                viewBox="0 0 24 24"
                className="size-5 fill-slate-900"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <blockquote
              className="mb-6 font-medium italic leading-relaxed text-slate-900"
              style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
            >
              &ldquo;The work made a technically complex drone business easier
              to understand and easier to trust — website, product UX, and brand
              finally reinforcing the same story instead of fragmenting
              it.&rdquo;
            </blockquote>
            <div>
              <p className="font-semibold text-slate-900">
                General Aeronautics team
              </p>
              <p className="text-sm text-slate-500">Aviation Technology</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── End CTA ─── */}
      <section className="px-6 pb-24 pt-4 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="ga-fade-up flex flex-col items-center justify-between gap-8 rounded-3xl bg-[#333333] px-8 py-14 text-center sm:px-14 md:flex-row md:text-left">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/general-aeronautics/logo.svg"
                alt="General Aeronautics"
                className="mb-4 h-10 w-auto brightness-0 invert md:mb-0"
              />
            </div>
            <p className="max-w-sm text-[17px] leading-relaxed text-white/60">
              Technical breadth made legible — one clear story, ready to scale
              across every vertical.
            </p>
            <Link
              href="/#process"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14px] font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(15,23,42,0.4)]"
            >
              Start your project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
