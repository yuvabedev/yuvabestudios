import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import { StudioCaseStudyDetail } from "@/components/studio/studio-case-study-detail";
import { StudioCaseStudyOutcomesStrip } from "@/components/studio/studio-case-study-outcomes-strip";
import { StudioCaseStudyPageHero } from "@/components/studio/studio-case-study-page-hero";
import {
  getStudioCaseStudyHref,
  resolveStudioCaseStudyDetail,
} from "@/components/studio/studio-case-study-content";
import { Button } from "@/components/ui/button";
import { getAbsoluteUrl } from "@/lib/site";
import { getStudioCaseStudyById } from "@/lib/studio-content";

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
  const image = caseStudy.mockImageSrc
    ? getAbsoluteUrl(caseStudy.mockImageSrc)
    : undefined;

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
  const caseStudy = await getStudioCaseStudyById(slug);

  if (!caseStudy) {
    notFound();
  }

  const detail = resolveStudioCaseStudyDetail(caseStudy);
  const href = getStudioCaseStudyHref(caseStudy.id);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: detail.seoTitle,
    description: detail.seoDescription,
    articleSection: caseStudy.sector,
    keywords: caseStudy.services.join(", "),
    mainEntityOfPage: getAbsoluteUrl(href),
    image: caseStudy.mockImageSrc ? [getAbsoluteUrl(caseStudy.mockImageSrc)] : undefined,
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
    <main className="relative min-h-screen overflow-hidden bg-white text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* The page rails keep the case-study route visually connected to the homepage shell. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-y-0 left-1/2 hidden w-full max-w-7xl -translate-x-1/2 px-6 md:block md:px-10">
          <div className="absolute inset-y-0 left-0 w-px bg-slate-200/80" />
          <div className="absolute inset-y-0 right-0 w-px bg-slate-200/80" />
        </div>
        <div className="absolute inset-x-0 top-0 h-[24rem] bg-[radial-gradient(circle_at_18%_10%,rgba(88,41,199,0.07),rgba(255,255,255,0)_34%),radial-gradient(circle_at_82%_0%,rgba(255,202,45,0.08),rgba(255,255,255,0)_32%)]" />
      </div>

      {/* The route header keeps the user close to home and the primary founder CTA. */}
      <section className="relative z-10 border-b border-slate-200/80 bg-white/82 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-10">
          <div className="space-y-1">
            <Link
              href="/"
              className="font-display text-[1.9rem] leading-none tracking-[-0.04em] text-[var(--neutral-950)]"
            >
              Yuvabe
            </Link>
            <p className="text-body-sm text-[var(--color-text-secondary)]">
              AI-first strategy, design, engineering, and growth marketing for startups.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="secondary" className="rounded-full px-5">
              <Link href="/#work">All case studies</Link>
            </Button>
            <Button asChild className="rounded-full px-5">
              <Link href="/#process">
                Start a project
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <article className="relative z-10">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-6 py-5 text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)] md:px-10"
        >
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/#work">Case studies</Link>
          <span>/</span>
          <span className="text-[var(--color-text-brand)]">{caseStudy.title}</span>
        </nav>

        <StudioCaseStudyPageHero caseStudy={caseStudy} />
        <StudioCaseStudyOutcomesStrip caseStudy={caseStudy} />

        {/* The rest of the page keeps the deeper proof content, but it now starts below a dedicated landing-style hero. */}
        <section className="px-6 py-10 md:px-10 md:py-12">
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">
            <StudioCaseStudyDetail
              caseStudy={caseStudy}
              variant="page"
              showHero={false}
            />
          </div>
        </section>
      </article>
    </main>
  );
}
