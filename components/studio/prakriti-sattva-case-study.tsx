"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroParallax } from "@/components/ui/hero-parallax";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────────────────────────────────────
// Parallax hero showcase — real Prakriti Sattva case-study imagery.
// 15 items → three rows of five (see HeroParallax).
// ─────────────────────────────────────────────────────────────────────────────
const HERO_PRODUCTS = [
  { title: "Brand Identity",     link: "#", thumbnail: "/assets/prakritisattva/cover.png" },
  { title: "Product Identity",   link: "#", thumbnail: "/assets/prakritisattva/product.png" },
  { title: "Product Range",      link: "#", thumbnail: "/assets/prakritisattva/product2.png" },
  { title: "Haircare",           link: "#", thumbnail: "/assets/prakritisattva/haircare.webp" },
  { title: "Bodycare",           link: "#", thumbnail: "/assets/prakritisattva/bodycare.webp" },
  { title: "Lipcare",            link: "#", thumbnail: "/assets/prakritisattva/lipcare.webp" },
  { title: "Website — Home",     link: "#", thumbnail: "/assets/prakritisattva/snapshot1.png" },
  { title: "Website — Range",    link: "#", thumbnail: "/assets/prakritisattva/snapshot2.png" },
  { title: "Website — Product",  link: "#", thumbnail: "/assets/prakritisattva/snapshot3.png" },
  { title: "Website — Mobile",   link: "#", thumbnail: "/assets/prakritisattva/snapshot4.png" },
  { title: "Hair Care",          link: "#", thumbnail: "/assets/prakritisattva/hair.png" },
  { title: "Label Design",       link: "#", thumbnail: "/assets/prakritisattva/label1.png" },
  { title: "Packaging",          link: "#", thumbnail: "/assets/prakritisattva/label2.png" },
  { title: "Identity System",    link: "#", thumbnail: "/assets/prakritisattva/label3.png" },
  { title: "Brand Assets",       link: "#", thumbnail: "/assets/prakritisattva/label4.png" },
];

// ─────────────────────────────────────────────────────────────────────────────
// All injected styles — prefixed `ps-` to avoid global leaks
// ─────────────────────────────────────────────────────────────────────────────
const INJECTED_CSS = `
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

  @media (prefers-reduced-motion: reduce) {
    .ps-marquee-track { animation: none; }
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
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── Section reveal animations below the hero ─────────────────────────
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

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-[#F7F2EA] text-[#1C1108]">
      <style dangerouslySetInnerHTML={{ __html: INJECTED_CSS }} />

      {/* ══════════════════════════════════════════
          SECTION 1 — Parallax hero (white / off-white)
      ══════════════════════════════════════════ */}
      <HeroParallax
        products={HERO_PRODUCTS}
        title={
          <>
            Pure. Ancient. <br /> Alive.
          </>
        }
        description="An Ayurvedic skincare brand reimagined for the conscious consumer — a complete brand identity and website redesign that honour five thousand years of tradition while embracing modern clarity."
      />

      {/* ══════════════════════════════════════════
          SECTION 2 — Statement + cover image
      ══════════════════════════════════════════ */}
      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <p
            className="ps-fade-up mb-14 max-w-4xl font-bold leading-[1.1] tracking-tight text-[#1C1108]"
            style={{ fontSize: "clamp(32px, 4.5vw, 64px)" }}
          >
            Honouring tradition.
            <br />
            <span className="text-[#5A7A3A]">Embracing clarity.</span>
          </p>

          <div className="ps-img-reveal overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/prakritisattva/products.png"
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
              <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-[#5A7A3A]">
                Client
              </p>
              <p className="text-base font-semibold">Prakriti Sattva LLC</p>
            </div>
            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-[#5A7A3A]">
                Category
              </p>
              <p className="text-base font-semibold">
                Wellness UX · Brand Identity
              </p>
            </div>
            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-[#5A7A3A]">
                Services
              </p>
              <p className="text-base font-semibold">
                Brand Identity · Tagline · UI/UX · Web Design
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="ps-fade-up">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#5A7A3A]">
                Challenge
              </p>
              <p className="text-[clamp(16px,1.5vw,20px)] leading-relaxed text-[#3A2C1A]/80">
                Modernising an Ayurvedic brand without diluting its essence or
                alienating its existing audience.
              </p>
            </div>
            <div className="ps-fade-up">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#5A7A3A]">
                Win
              </p>
              <p className="text-[clamp(16px,1.5vw,20px)] leading-relaxed text-[#3A2C1A]/80">
                A refreshed brand identity and website that feel contemporary
                yet deeply rooted in Ayurveda — a strong foundation for
                long-term brand trust.
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
                src="/assets/prakritisattva/balm.png"
                alt="Prakriti Sattva product"
                className="h-[55vh] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="ps-img-reveal overflow-hidden rounded-2xl bg-[#EDE4D3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/prakritisattva/cream.png"
                alt="Prakriti Sattva product range"
                className="h-[55vh] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
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
                src="/assets/prakritisattva/hair-care.webp"
                alt="Haircare range"
                className="h-[50vh] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="ps-img-reveal overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/prakritisattva/bodyoil.webp"
                  alt="Bodycare range"
                  className="h-[42vh] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
              <div className="ps-img-reveal overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/prakritisattva/body.png"
                  alt="Body range"
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
            <img
              src="/assets/prakritisattva/snapshot1.png"
              alt="Website homepage"
              className="w-full object-cover"
            />
          </div>
          <div className="ps-grid-stagger mb-4 grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/prakritisattva/snapshot2.png"
                alt="Website inner page"
                className="w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/prakritisattva/snapshot3.png"
                alt="Website product page"
                className="w-full object-cover"
              />
            </div>
          </div>
          <div className="ps-img-reveal overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/prakritisattva/snapshot4.png"
              alt="Website mobile view"
              className="w-full object-cover"
            />
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
                <span className="block font-mono text-[11px] text-[#5A7A3A] mb-2">
                  {o.num}
                </span>
                <p className="text-[17px] font-semibold leading-snug text-[#1C1108]">
                  {o.text}
                </p>
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
              src="/assets/prakritisattva/hairoil.webp"
              alt="Prakriti Sattva hair product"
              className="h-[60vh] w-full object-cover"
            />
          </div>
          <div className="ps-fade-up">
            <div className="mb-6 flex size-10 items-center justify-center rounded-full bg-[#5A7A3A]/15">
              <svg
                viewBox="0 0 24 24"
                className="size-5 fill-[#5A7A3A]"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <blockquote
              className="mb-6 font-medium italic leading-relaxed text-[#1C1108]"
              style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
            >
              &ldquo;Yuvabe Studios truly understood the soul of Prakriti
              Sattva. They translated our vision into a cohesive brand and
              website that feel authentic, inspiring, and transformative. They
              don&apos;t just build brands — they help you build a legacy with
              heart.&rdquo;
            </blockquote>
            <div>
              <p className="font-semibold text-[#1C1108]">Supriya Bhat</p>
              <p className="text-sm text-[#6B5A3A]">
                Founder, Prakriti Sattva LLC
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 10 — CTA footer card
      ══════════════════════════════════════════ */}
      <section className="px-6 pb-24 pt-10 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="ps-scale-in flex flex-col items-center justify-between gap-8 rounded-3xl bg-[#606d1d] px-8 py-14 text-center sm:px-14 md:flex-row md:text-left">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/prakritisattva/logo.png"
                alt="Prakriti Sattva"
                className="mb-4 h-24 w-auto brightness-0 invert md:mb-0"
              />
            </div>
            <p className="max-w-sm text-[17px] leading-relaxed text-white/65">
              A brand rooted in Ayurveda — now ready for the conscious consumer.
            </p>
            <Link
              href="/#process"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#d37f6e] px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_6px_20px_rgba(90,122,58,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(90,122,58,0.5)]"
            >
              Start your project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
