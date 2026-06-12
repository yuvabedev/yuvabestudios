// Server component — clay.global editorial layout
import Link from "next/link";
import { ScaleReveal } from "@/components/studio/scale-reveal";
import { TvamInViewVideo } from "@/components/studio/tvam-inview-video";

const FACTS = [
  { idx: "01", label: "Year",     value: "2024" },
  { idx: "02", label: "Sector",   value: "Health & Fintech" },
  { idx: "03", label: "Services", value: "Brand · UI/UX · Product Design" },
  { idx: "04", label: "Platform", value: "iOS · Android" },
];

const SCREENS = [
  { src: "/assets/tvam/mock2.png",  alt: "Health module" },
  { src: "/assets/tvam/mock3.png",  alt: "Policy advisor" },
  { src: "/assets/tvam/mock4.png",  alt: "Wealth module" },
];

const OUTCOMES = [
  { stat: "40%",  label: "Lower customer acquisition cost" },
  { stat: "2L+",  label: "Users on the platform" },
  { stat: "3",    label: "Core modules unified" },
  { stat: "RAG",  label: "AI powering health guidance" },
];

export function TvamCaseStudyContent() {
  return (
    <div className="bg-white text-[#0A0A0A] overflow-x-hidden">
      {/* ══════════════════════════════════════════════════
          1 — Project facts + opening statement
      ══════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20 pt-20 pb-16">
        {/* Facts row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 border-t border-[#E5E5E5] pt-10">
          {FACTS.map((f) => (
            <div key={f.idx}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#999] mb-2">
                {f.idx} — {f.label}
              </p>
              <p className="text-[15px] font-medium text-[#0A0A0A] leading-snug">
                {f.value}
              </p>
            </div>
          ))}
        </div>

        {/* Opening statement */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-end">
          <h2
            className="font-bold tracking-tight text-[#0A0A0A] leading-[0.95]"
            style={{ fontSize: "clamp(40px, 5.5vw, 80px)" }}
          >
            Making health and wealth guidance feel effortless.
          </h2>
          <p className="text-[clamp(16px,1.4vw,20px)] leading-relaxed text-[#555] max-w-xl lg:pb-2">
            TVAM set out to unify health insurance advisory, doctor
            consultations, and gold investments under one trusted super-app —
            built for India&apos;s next 200 million smartphone users.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2 — Full-bleed cover
      ══════════════════════════════════════════════════ */}
      <ScaleReveal className="w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/tvam/cover.png"
          alt="TVAM brand overview"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </ScaleReveal>

      {/* ══════════════════════════════════════════════════
          3 — Challenge / Approach columns
      ══════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ef8829] mb-6">
              The Challenge
            </p>
            <h3 className="text-[clamp(24px,2.8vw,38px)] font-bold leading-[1.15] mb-6 tracking-tight">
              One platform, three worlds — none of them connected.
            </h3>
            <p className="text-[16px] leading-relaxed text-[#555]">
              Users faced a fragmented experience across health, insurance, and
              investment features. There was no coherent visual language, the
              onboarding felt clinical, and the AI advisor had no clear identity
              to anchor user trust.
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ef8829] mb-6">
              Our Approach
            </p>
            <h3 className="text-[clamp(24px,2.8vw,38px)] font-bold leading-[1.15] mb-6 tracking-tight">
              Build a product identity as unified as the platform itself.
            </h3>
            <p className="text-[16px] leading-relaxed text-[#555]">
              We rebuilt the brand architecture from the ground up — creating a
              design system that works across all three modules, positioning the
              AI advisor as a trusted companion, and shipping a UI that reduced
              CPA by 40%.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4 — Product design: 5 app screens
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#efedf8] py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20 mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#999] mb-4">
            Product Design
          </p>
          <h2
            className="font-bold tracking-tight text-[#0A0A0A] leading-none"
            style={{ fontSize: "clamp(48px, 7vw, 100px)" }}
          >
            App Screens
          </h2>
        </div>

        {/* Horizontal scroll on mobile, 5-col grid on desktop */}
        <div className="flex gap-3 md:gap-4 px-6 md:px-12 lg:px-20 overflow-x-auto lg:overflow-visible lg:grid lg:grid-cols-3 pb-4 lg:pb-0">
          {SCREENS.map((s, i) => (
            <div
              key={i}
              className="shrink-0 w-[220px] md:w-[260px] lg:w-auto overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.src}
                alt={s.alt}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5 — 3D brand in motion
      ══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20 mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#999] mb-4">
            Brand Expression
          </p>
          <h2
            className="font-bold tracking-tight text-[#0A0A0A] leading-none"
            style={{ fontSize: "clamp(48px, 7vw, 100px)" }}
          >
            The Brand
            <br />
            in Motion.
          </h2>
        </div>

        <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          <div className="overflow-hidden rounded-3xl bg-[#efedf8]">
            <TvamInViewVideo src="/assets/tvam/health.mp4" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6 — Cover detail (contained, not full-bleed)
      ══════════════════════════════════════════════════ */}
    

      <ScaleReveal className="w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/tvam/mock1.png"
          alt="TVAM brand overview"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </ScaleReveal>

      {/* ══════════════════════════════════════════════════
          7 — Real app experience: Health + Wealth
      ══════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="mb-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#999] mb-4">
            Real App Experience
          </p>
          <h2
            className="font-bold tracking-tight text-[#0A0A0A] leading-none"
            style={{ fontSize: "clamp(48px, 6vw, 88px)" }}
          >
            Every module,
            <br />
            designed to trust.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Health screen */}
          <div className="group overflow-hidden rounded-3xl bg-[#efedf8]">
            <div className="px-8 pt-8 pb-0 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/tvam/mock-2.jpeg"
                alt="TVAM Health module — online doctor consultation"
                className="w-50 md:w-60 h-auto rounded-t-2xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-transform duration-700 group-hover:-translate-y-2"
                loading="lazy"
              />
            </div>
            <div className="px-8 pb-8 pt-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c7bfff] mb-1">
                Health
              </p>
              <p className="text-[15px] font-semibold text-[#2D1F6E]">
                Doctor Consultation
              </p>
            </div>
          </div>

          {/* Wealth screen */}
          <div className="group overflow-hidden rounded-3xl bg-[#eee5f8]">
            <div className="px-8 pt-8 pb-0 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/tvam/mock-3.jpeg"
                alt="TVAM Wealth module — gold investment"
                className="w-50 md:w-60 h-auto rounded-t-2xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-transform duration-700 group-hover:-translate-y-2"
                loading="lazy"
              />
            </div>
            <div className="px-8 pb-8 pt-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ef8829] mb-1">
                Wealth
              </p>
              <p className="text-[15px] font-semibold text-[#2D1F6E]">
                Gold Investment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          8 — Outcomes strip
      ══════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20 pt-4 pb-24 ">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#999] mb-16">
          Outcomes
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-[#E5E5E5] pt-12">
          {OUTCOMES.map((o, i) => (
            <div key={i}>
              <p
                className="font-bold tracking-tight text-[#ef8829] leading-none mb-3"
                style={{ fontSize: "clamp(40px, 4.5vw, 64px)" }}
              >
                {o.stat}
              </p>
              <p className="text-[14px] leading-snug text-[#555]">{o.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          11 —  closing card
      ══════════════════════════════════════════════════ */}
      <section className="px-6 pb-24 pt-12 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="rounded-3xl bg-[#efedf8] border border-[#e2dff5] px-10 py-20 md:px-20 md:py-24 flex flex-col md:flex-row items-center md:items-end justify-between gap-12">
            <div className="flex-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/tvam/logo.svg"
                alt="TVAM"
                className="h-16 w-auto mb-8"
              />
              <h2
                className="font-bold text-[#0A0A0A] tracking-tight leading-[1.05]"
                style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
              >
                Healthier decisions.
                <br />
                Richer lives.
              </h2>
            </div>

            <div className="flex-shrink-0 text-center md:text-right">
              <p className="text-[15px] text-[#555] mb-8 max-w-xs">
                An AI-first health and wealth super-app, built for India&apos;s
                next wave of digital users.
              </p>
              <Link
                href="/#process"
                className="inline-flex items-center gap-3 rounded-full bg-[#ef8829] px-8 py-4 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(239,136,41,0.50)]"
              >
                Start a project
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
