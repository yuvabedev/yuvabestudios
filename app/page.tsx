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
import { getPublicBlogPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [homepageContent, caseStudies, blogPosts] = await Promise.all([
    getStudioHomepageContent(),
    getStudioCaseStudies().catch(() => []),
    getPublicBlogPosts().catch(() => []),
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
      <HomeCaseStudies caseStudies={caseStudies} work={homepageContent.work} />

      {/* 06 — Hover carousel (with View our services inside) */}
      <HomeCarousel />

      {/* 07 — Featured blogs */}
      <HomeFeaturedBlogs posts={blogPosts} />

      {/* 08 — FAQs */}
      <section className="border-t border-slate-200/80 bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-16">
          <h2
            className="mb-10 text-display-muted-editorial tracking-[-0.032em] text-[var(--neutral-950)] md:mb-14"
            style={{ fontSize: "clamp(2.25rem,5vw,3.5rem)", fontWeight: 600 }}
          >
            Frequently asked questions
          </h2>
          <FaqSection faqs={homepageContent.faqs} />
        </div>
      </section>
    </main>
  );
}
