import Image from "next/image";

import type { StudioHomepageNavItem } from "@/components/studio/studio-homepage-content";
import {
  type StudioAboutNameMeaningContent,
  type StudioAboutPageContent,
  type StudioAboutPhilosophyContent,
  type StudioAboutStatsContent,
  type StudioAboutStoryContent,
} from "@/components/studio/studio-about-content";
import {
  AboutHeroScroll,
  AboutHoverGallery,
  AboutPillarImage,
  AboutTestimonials,
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
    src: "/assets/about-cover.jpeg",
    alt: "The full Yuvabe team gathered on the studio campus in Auroville.",
  },
} as const;

// Horizontal culture/work gallery imagery.
const ABOUT_GALLERY_IMAGES = [
  { src: "/assets/about-carousel/web/1.webp", alt: "Life at the Yuvabe studio" },
  { src: "/assets/about-carousel/web/2.webp", alt: "Life at the Yuvabe studio" },
  { src: "/assets/about-carousel/web/3.webp", alt: "Life at the Yuvabe studio" },
  { src: "/assets/about-carousel/web/4.webp", alt: "Life at the Yuvabe studio" },
  { src: "/assets/about-carousel/web/5.webp", alt: "Life at the Yuvabe studio" },
  { src: "/assets/about-carousel/web/6.webp", alt: "Life at the Yuvabe studio" },
  { src: "/assets/about-carousel/web/7.webp", alt: "Life at the Yuvabe studio" },
  { src: "/assets/about-carousel/web/8.webp", alt: "Life at the Yuvabe studio" },
  { src: "/assets/about-carousel/web/9.webp", alt: "Life at the Yuvabe studio" },
];

// "What drives us" pillar imagery, paired by index with the operating principles.
const WHY_PILLAR_IMAGES = [
  { src: "/assets/about/web/thinkdeep.webp", alt: "Thinking deeply about the right problem to solve" },
  { src: "/assets/about/web/intentionally.webp", alt: "Building intentionally, with craft and judgment" },
  { src: "/assets/about/web/learnsooner.webp", alt: "Learning sooner by putting work in front of people" },
] as const;

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
function AboutStatsStrip({ stats }: { stats: StudioAboutStatsContent }) {
  return (
    <section className="border-b border-slate-200/80 bg-white py-16 md:py-24">
      <Rail>
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:gap-x-12 lg:pl-4 xl:pl-6">
          {[...stats.items, stats.feature].map((stat, index) => (
            <div key={`${stat.label}-${index}`}>
              <p className="font-[family-name:var(--font-display-family)] text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-none tracking-[-0.03em] text-[var(--neutral-950)]">
                {stat.value}
              </p>
              <p className="mt-3 text-body-lg text-[var(--color-text-secondary)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Rail>
    </section>
  );
}

// ─── What does Yuvabe mean — name origin, paired with the "Who we are" band ────
function AboutNameMeaning({
  content,
}: {
  content: StudioAboutNameMeaningContent;
}) {
  return (
    <section className="border-b border-slate-200/80 bg-white py-16 text-[var(--neutral-950)] md:py-24">
      <Rail>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:pl-4 xl:pl-6">
          <div>
            <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
              {content.eyebrow}
            </p>
            <h2
              className="mt-4 max-w-xl leading-[1.05] tracking-[-0.032em] text-[var(--neutral-950)]"
              style={{ fontSize: "clamp(2.25rem,5vw,3.5rem)", fontWeight: 600 }}
            >
              {content.title}
            </h2>
            <div className="mt-8 space-y-6">
              {content.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="max-w-2xl text-body-lg leading-[1.6] text-[var(--color-text-secondary)]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/yb-logo.png"
              alt="Yuvabe Studios"
              width={2000}
              height={730}
              sizes="(min-width: 1024px) 40vw, 80vw"
              className="h-auto w-full max-w-md"
            />
          </div>
        </div>
      </Rail>
    </section>
  );
}

// ─── Our philosophy — Work. Serve. Evolve. principle trio ─────────────────────
function AboutPhilosophy({
  content,
}: {
  content: StudioAboutPhilosophyContent;
}) {
  return (
    <section className="border-b border-slate-200/80 bg-[var(--color-background-canvas)] py-16 text-[var(--neutral-950)] md:py-24">
      <Rail>
        <div className="lg:pl-4 xl:pl-6">
          <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
            {content.eyebrow}
          </p>
          <h2
            className="mt-4 max-w-2xl tracking-[-0.032em] text-[var(--neutral-950)]"
            style={{ fontSize: "clamp(2.25rem,5vw,3.5rem)", fontWeight: 600 }}
          >
            {content.title}
          </h2>
          {content.intro ? (
            <p className="mt-5 max-w-2xl text-body-lg leading-[1.6] text-[var(--color-text-secondary)]">
              {content.intro}
            </p>
          ) : null}
        </div>

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-3 lg:gap-14 lg:pl-4 xl:pl-6">
          {content.principles.map((principle) => (
            <div key={principle.title}>
              <h3 className="text-heading-lg text-[var(--color-text-brand)]">
                {principle.title}
              </h3>
              <p className="mt-4 text-body-lg leading-[1.6] text-[var(--color-text-secondary)]">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </Rail>
    </section>
  );
}

// ─── What drives us — clay-style numbered pillars with large imagery ──────────
function AboutWhyPillars({ story }: { story: StudioAboutStoryContent }) {
  return (
    <section className="border-b border-slate-200/80 bg-[var(--color-background-canvas)] py-14 md:py-24">
      <Rail className="space-y-14 md:space-y-24">
        <div className="lg:pl-4 xl:pl-6">
          <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
            {story.eyebrow}
          </p>
          <h2
            className="mt-4 text-display-muted-editorial tracking-[-0.032em] text-[var(--neutral-950)]"
            style={{ fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 600 }}
          >
            {story.title}
          </h2>
        </div>

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
  const { hero, stats, nameMeaning, philosophy, story, testimonials, cta } =
    content;

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
        <AboutStatsStrip stats={stats} />
        <AboutHoverGallery
          images={ABOUT_GALLERY_IMAGES}
          eyebrow="Who we are"
          title="A collective of thinkers, creators and builders."
          subheading="A multidisciplinary team united by curiosity, craft and the drive to create impact."
        />
        <AboutNameMeaning content={nameMeaning} />
        <AboutPhilosophy content={philosophy} />
        <AboutWhyPillars story={story} />
        <AboutClients />
        <AboutTestimonials
          eyebrow={testimonials.eyebrow}
          testimonials={testimonials.items}
        />
        <AboutFinalCta content={cta} />
      </article>
    </main>
  );
}
