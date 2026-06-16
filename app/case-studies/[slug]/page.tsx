import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { StudioCaseStudyDetail } from "@/components/studio/studio-case-study-detail";
import { StudioCaseStudyOutcomesStrip } from "@/components/studio/studio-case-study-outcomes-strip";
import { StudioCaseStudyPageHero } from "@/components/studio/studio-case-study-page-hero";
import { TvamCinematicHero } from "@/components/studio/tvam-cinematic-hero";
import { TvamCaseStudyContent } from "@/components/studio/tvam-case-study-content";
import { PrakritiSattvaCaseStudy } from "@/components/studio/prakriti-sattva-case-study";
import { GaCinematicCaseStudy } from "@/components/studio/ga-cinematic-case-study";
import { StudioHeader } from "@/components/studio/studio-header";
import {
  StudioPageContainer,
  StudioPageRails,
} from "@/components/studio/studio-page-shell";
import {
  applyStudioCaseStudyDisplayOverrides,
  getStudioCaseStudyHref,
  resolveStudioCaseStudyCoverSrc,
  resolveStudioCaseStudyDetail,
} from "@/components/studio/studio-case-study-content";
import { getAbsoluteUrl } from "@/lib/site";
import {
  getStudioCaseStudyById,
  getStudioHomepageContent,
} from "@/lib/studio-content";

export const dynamic = "force-dynamic";

type CaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getStudioCaseStudyById(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  const detail = resolveStudioCaseStudyDetail(caseStudy);
  const href = getStudioCaseStudyHref(caseStudy.id);
  const imageSrc = resolveStudioCaseStudyCoverSrc(caseStudy, "summary");
  const image = imageSrc ? getAbsoluteUrl(imageSrc) : undefined;

  return {
    title: detail.seoTitle,
    description: detail.seoDescription,
    alternates: {
      canonical: href,
    },
    openGraph: {
      title: detail.seoTitle,
      description: detail.seoDescription,
      url: href,
      type: "article",
      images: image
        ? [
            {
              url: image,
              alt: caseStudy.mockImageAlt ?? `${caseStudy.title} case study cover`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: detail.seoTitle,
      description: detail.seoDescription,
      images: image ? [image] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const [caseStudy, homepageContent] = await Promise.all([
    getStudioCaseStudyById(slug),
    getStudioHomepageContent(),
  ]);

  if (!caseStudy) {
    notFound();
  }

  // Prakriti Sattva gets a fully custom immersive page
  if (slug === "prakiti-sattva") {
    return (
      <main data-studio-shell className="relative min-h-screen bg-white text-foreground">
        <StudioHeader navigationItems={homepageContent.navigationItems} />
        <PrakritiSattvaCaseStudy />
      </main>
    );
  }

  // General Aeronautics — cinematic scroll experience
  if (slug === "general-aeronautics") {
    return (
      <main data-studio-shell className="relative min-h-screen bg-white text-foreground">
        <StudioHeader navigationItems={homepageContent.navigationItems} />
        <GaCinematicCaseStudy />
      </main>
    );
  }

  const displayCaseStudy = applyStudioCaseStudyDisplayOverrides(caseStudy);
  const detail = resolveStudioCaseStudyDetail(caseStudy);
  const href = getStudioCaseStudyHref(caseStudy.id);
  const structuredDataImageSrc = resolveStudioCaseStudyCoverSrc(caseStudy, "summary");
  const structuredDataImage = structuredDataImageSrc
    ? getAbsoluteUrl(structuredDataImageSrc)
    : undefined;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: detail.seoTitle,
    description: detail.seoDescription,
    articleSection: caseStudy.sector,
    keywords: caseStudy.services.join(", "),
    mainEntityOfPage: getAbsoluteUrl(href),
    image: structuredDataImage ? [structuredDataImage] : undefined,
    author: {
      "@type": "Organization",
      name: "Yuvabe Studios",
      url: getAbsoluteUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: "Yuvabe Studios",
      url: getAbsoluteUrl("/"),
    },
    about: [caseStudy.sector, ...caseStudy.services],
  };

  return (
    <main
      data-studio-shell
      className="relative min-h-screen overflow-x-clip overflow-y-visible bg-white text-foreground"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* The page rails keep the case-study route visually connected to the homepage shell. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <StudioPageRails />
        <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_18%_10%,rgba(88,41,199,0.07),rgba(255,255,255,0)_34%),radial-gradient(circle_at_82%_0%,rgba(255,202,45,0.08),rgba(255,255,255,0)_32%)]" />
      </div>

      {/* The detail route now reuses the homepage navbar so navigation stays on one shared contract. */}
      <StudioHeader navigationItems={homepageContent.navigationItems} />

      <article className="relative z-10">
        {slug !== "tvam" && (
          <StudioPageContainer className="py-5">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-label-sm uppercase tracking-[0.16em] text-(--color-text-tertiary)"
            >
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/#work">Case studies</Link>
              <span>/</span>
              <span className="text-(--color-text-brand)">{caseStudy.title}</span>
            </nav>
          </StudioPageContainer>
        )}

        {slug === "tvam" ? (
          <>
            <TvamCinematicHero />
            <TvamCaseStudyContent />
          </>
        ) : (
          <>
            <StudioCaseStudyPageHero caseStudy={displayCaseStudy} />
            <StudioCaseStudyOutcomesStrip caseStudy={displayCaseStudy} />
            <section className="py-10 md:py-12">
              <StudioPageContainer>
                <div className="px-2 sm:px-4 lg:px-6">
                  <StudioCaseStudyDetail
                    caseStudy={displayCaseStudy}
                    variant="page"
                    showHero={false}
                  />
                </div>
              </StudioPageContainer>
            </section>
          </>
        )}
      </article>
    </main>
  );
}
