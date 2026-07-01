import Image from "next/image";

import type { StudioHomepageNavItem } from "@/components/studio/studio-homepage-content";
import {
  type StudioAboutPageContent,
  type StudioAboutStoryContent,
} from "@/components/studio/studio-about-content";
import {
  AboutHeroScroll,
  AboutHoverGallery,
  AboutPillarImage,
  AboutTestimonials,
  type AboutTestimonial,
} from "@/components/studio/about-interactive";
import { StudioCtaCard } from "@/components/studio/studio-cta-card";
import { StudioHeader } from "@/components/studio/studio-header";
import { StudioPageRails } from "@/components/studio/studio-page-shell";

type StudioAboutPageProps = {
  navigationItems: StudioHomepageNavItem[];
  content: StudioAboutPageContent;
};

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

const aboutAssets = {
  cover: {
    src: "/assets/about/yuvabe-cover.jpeg",
    alt: "The Yuvabe team gathered outdoors on the studio campus in Auroville.",
  },
} as const;

// Clay-style stat metrics — factual studio numbers, not fabricated counts.
const ABOUT_STATS = [
  { value: "2020", label: "Founded in Auroville" },
  { value: "40+", label: "Yuvabeans on the team" },
  { value: "4", label: "Disciplines, one connected loop" },
] as const;
const ABOUT_HOME = { value: "Auroville", label: "Where we're based" } as const;

// Horizontal culture/work gallery imagery.
const ABOUT_GALLERY_IMAGES = [
  { src: "/assets/careers/group.png", alt: "Yuvabeans building together at the studio" },
  { src: "/assets/about/saracon_02.jpg", alt: "The Auroville campus where we work" },
  { src: "/assets/careers/people.png", alt: "A team huddle around an early prototype" },
  { src: "/assets/about/yuvabe-image.jpeg", alt: "An earlier Yuvabe team photo under a tree" },
  { src: "/assets/KK/Cover-home.png", alt: "KittyKat product visuals" },
  { src: "/assets/bevolve/cover-detail.png", alt: "Bevolve ESG platform" },
  { src: "/assets/tvam/cover.png", alt: "TVAM wellness product" },
  { src: "/assets/general-aeronautics/cover-summary.jpeg", alt: "General Aeronautics drone platform" },
];

// "Why Yuvabe" pillar imagery, paired by index with the operating principles.
const WHY_PILLAR_IMAGES = [
  { src: "/assets/careers/group.png", alt: "Yuvabe team working side by side" },
  { src: "/assets/careers/people.png", alt: "Reviewing an early prototype together" },
  { src: "/assets/about/saracon_02.jpg", alt: "The Auroville campus" },
] as const;

// Placeholder testimonials — replace with real, attributed client quotes.
const ABOUT_TESTIMONIALS: AboutTestimonial[] = [
  {
    quote:
      "Yuvabe felt like part of our team. They helped us decide what to build, not just build it — and that changed how fast we found traction.",
    name: "Founder",
    role: "Early-stage SaaS",
  },
  {
    quote:
      "One team carried us from strategy to a shipped product. Fewer handoffs, sharper decisions, and people who stayed close as things changed.",
    name: "Co-founder",
    role: "Climate-tech startup",
  },
  {
    quote:
      "They brought real product judgment, not just execution. The AI work was genuinely useful, and the thinking behind it was even better.",
    name: "Product lead",
    role: "Fintech platform",
  },
];

// Client logo wall — sourced from /public/logos.
const ABOUT_CLIENT_LOGOS = [
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
] as const;

// ─── Clay-style stats strip — big factual numbers + a large location word ─────
function AboutStatsStrip() {
  return (
    <section className="border-b border-slate-200/80 bg-white py-16 md:py-24">
      <Rail>
        <div className="grid gap-12 sm:grid-cols-3 lg:gap-16 lg:pl-4 xl:pl-6">
          {ABOUT_STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-[family-name:var(--font-display-family)] text-[clamp(3.5rem,7vw,6rem)] font-semibold leading-none tracking-[-0.04em] text-[var(--neutral-950)]">
                {stat.value}
              </p>
              <p className="mt-4 text-body-md text-[var(--color-text-secondary)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-14 lg:pl-4 xl:pl-6">
          <p className="font-[family-name:var(--font-display-family)] text-[clamp(3rem,11vw,8rem)] font-semibold leading-none tracking-[-0.05em] text-[var(--neutral-950)]">
            {ABOUT_HOME.value}
          </p>
          <p className="mt-3 text-body-md text-[var(--color-text-secondary)]">
            {ABOUT_HOME.label}
          </p>
        </div>
      </Rail>
    </section>
  );
}

// ─── Why Yuvabe — clay-style numbered pillars with large imagery ──────────────
function AboutWhyPillars({ story }: { story: StudioAboutStoryContent }) {
  return (
    <section className="border-b border-slate-200/80 bg-[var(--color-background-canvas)] py-14 md:py-24">
      <Rail className="space-y-14 md:space-y-24">
        <h2
          className="text-display-muted-editorial tracking-[-0.032em] text-[var(--neutral-950)] lg:pl-4 xl:pl-6"
          style={{ fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 600 }}
        >
          Why Yuvabe
        </h2>

        {story.operatingPrinciples.map((principle, index) => {
          const asset = WHY_PILLAR_IMAGES[index % WHY_PILLAR_IMAGES.length];
          const imageFirst = index % 2 === 1;
          return (
            <div
              key={principle.title}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 lg:pl-4 xl:pl-6"
            >
              <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
                <p className="font-[family-name:var(--font-display-family)] text-heading-xl text-[var(--lavender-500)]">
                  {`${index + 1}`.padStart(2, "0")}
                </p>
                <h3 className="mt-5 text-display-muted-editorial leading-[1.02] text-[var(--neutral-950)]">
                  {principle.title}
                </h3>
                <p className="mt-5 max-w-xl text-body-lg text-[var(--color-text-secondary)]">
                  {principle.description}
                </p>
              </div>
              <div className={imageFirst ? "lg:order-1" : "lg:order-2"}>
                <AboutPillarImage src={asset.src} alt={asset.alt} />
              </div>
            </div>
          );
        })}
      </Rail>
    </section>
  );
}

// ─── Our clients — monochrome logo wall ───────────────────────────────────────
function AboutClients() {
  return (
    <section className="border-b border-slate-200/80 bg-white py-16 text-[var(--neutral-950)] md:py-24">
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
          {ABOUT_CLIENT_LOGOS.map((logo) => (
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

// The final CTA closes the page on one clear next step while preserving a lower-friction proof path.
function AboutFinalCta({ content }: { content: StudioAboutPageContent["cta"] }) {
  return (
    <StudioCtaCard
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
      copyWrapperClassName="space-y-4 text-center md:text-left"
      descriptionClassName="hidden max-w-3xl text-body-lg text-[var(--color-text-secondary)] md:block"
      ctaWrapperClassName="flex items-start justify-center"
      primaryCtaLabel={content.primaryCtaLabel}
      primaryCtaHref={content.primaryCtaHref}
    />
  );
}

export function StudioAboutPage({ navigationItems, content }: StudioAboutPageProps) {
  const { hero, story, cta } = content;

  return (
    <main
      data-studio-shell
      className="relative min-h-screen overflow-x-clip overflow-y-visible bg-white text-foreground"
    >
      {/* The page-level rails keep the dedicated route visually tied to the homepage shell. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <StudioPageRails />
      </div>

      <StudioHeader navigationItems={navigationItems} />

      <article className="relative z-10">
        <AboutHeroScroll
          hero={hero}
          coverSrc={aboutAssets.cover.src}
          coverAlt={aboutAssets.cover.alt}
        />
        <AboutStatsStrip />
        <AboutHoverGallery
          images={ABOUT_GALLERY_IMAGES}
          eyebrow="Life at the studio"
          title="A close team, in one room."
        />
        <AboutWhyPillars story={story} />
        <AboutClients />
        <AboutTestimonials eyebrow="What partners say" testimonials={ABOUT_TESTIMONIALS} />
        <AboutFinalCta content={cta} />
      </article>
    </main>
  );
}
