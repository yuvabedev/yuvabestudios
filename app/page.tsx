import FaqSection from "@/components/FaqSection";
import {
  HomeCarousel,
  HomeCaseStudies,
  HomeClientLogos,
  HomeFeaturedBlogs,
  HomeHero,
  HomeServices,
} from "@/components/studio/home-clay";
import { StudioCtaCard } from "@/components/studio/studio-cta-card";
import { StudioHeader } from "@/components/studio/studio-header";
import {
  getStudioCaseStudies,
  getStudioHomepageContent,
} from "@/lib/studio-content";

export const dynamic = "force-dynamic";

// Homepage FAQs — plain-language answers to what founders ask first.
const HOME_FAQS = [
  {
    question: "What does Yuvabe actually do?",
    answer:
      "We're an AI-first studio for founders. We help you decide what to build, then design, engineer, and grow it — strategy, product, and delivery in one connected team instead of scattered handoffs.",
  },
  {
    question: "Who do you work best with?",
    answer:
      "0-to-1 and traction-stage startups that need clarity and speed — teams who want a close partner that can move from idea to shipped product without losing context.",
  },
  {
    question: "How does an engagement start?",
    answer:
      "It starts with a conversation about what you're building and the decision you're facing. From there we frame the real priority, agree on scope, and get moving quickly.",
  },
  {
    question: "How is AI part of your process?",
    answer:
      "Practically, not as a buzzword. We use frontier AI to compress the path from idea to artifact, sharpen research and decisions, and build AI-native features where they genuinely help the product.",
  },
  {
    question: "Do you only work with early-stage startups?",
    answer:
      "That's our sweet spot, but we also partner with traction-stage teams and established organizations on focused product, design, and growth work.",
  },
  {
    question: "Where are you based, and can you work remotely?",
    answer:
      "We're based in Auroville, India, and work closely with founders across timezones. The people shaping the product stay in the conversation throughout.",
  },
];

export default async function Home() {
  const [homepageContent, caseStudies] = await Promise.all([
    getStudioHomepageContent(),
    getStudioCaseStudies().catch(() => []),
  ]);

  return (
    <main
      data-studio-shell
      className="relative min-h-screen overflow-x-clip overflow-y-visible bg-white text-foreground"
    >
      <StudioHeader navigationItems={homepageContent.navigationItems} />

      {/* 01 — Scroll-animation hero */}
      <HomeHero hero={homepageContent.hero} />

      {/* 02 — Our services (two-column list + hover carousel + view services) */}
      <HomeServices content={homepageContent.services} />

      {/* 03 — Client logos */}
      <HomeClientLogos />

      {/* 04 — CTA banner */}
      <StudioCtaCard
        eyebrow={homepageContent.afterServicesCta.eyebrow}
        title={homepageContent.afterServicesCta.title}
        description={homepageContent.afterServicesCta.description}
        primaryCtaLabel={homepageContent.afterServicesCta.primaryCtaLabel}
        primaryCtaHref={homepageContent.afterServicesCta.primaryCtaHref}
      />

      {/* 05 — Case studies + view all work */}
      <HomeCaseStudies
        caseStudies={caseStudies}
        eyebrow={homepageContent.work.eyebrow}
        headline={homepageContent.work.headline}
      />

      {/* 06 — Hover carousel (with View our services inside) */}
      <HomeCarousel />

      {/* 07 — Featured blogs */}
      <HomeFeaturedBlogs />

      {/* 08 — FAQs */}
      <section className="border-t border-slate-200/80 bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-16">
          <h2
            className="mb-10 text-display-muted-editorial tracking-[-0.032em] text-[var(--neutral-950)] md:mb-14"
            style={{ fontSize: "clamp(2.25rem,5vw,3.5rem)", fontWeight: 600 }}
          >
            Frequently asked questions
          </h2>
          <FaqSection faqs={HOME_FAQS} />
        </div>
      </section>
    </main>
  );
}
