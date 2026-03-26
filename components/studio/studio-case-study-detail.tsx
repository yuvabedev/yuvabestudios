import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ImageIcon, Sparkles } from "lucide-react";

import {
  CaseStudyIcon,
  getCaseStudyIcon,
  resolveStudioCaseStudyDetail,
  type StudioCaseStudySummary,
} from "@/components/studio/studio-case-study-content";
import galleryImageLibrary from "@/components/studio/studio-case-study-gallery-images.json";
import { Button, buttonVariants } from "@/components/ui/button";
import { PremiumSurface } from "@/components/ui/premium-surface";
import { cn } from "@/lib/utils";

const caseStudyVideoOverrides: Partial<Record<string, string>> = {
  bevolve: "/assets/bevolve/bevolve-AI-page.mp4",
};

const caseStudyImageOverrides: Partial<Record<string, string>> = {
  "general-aeronautics": "/assets/general-aeronautics/ga-home.png",
  ageshift: "/assets/ageshift/ageshift_cover.png",
};

const caseStudyDetailImageOverrides: Partial<Record<string, string>> = {
  "general-aeronautics": "/assets/general-aeronautics/cover-detail.jpeg",
};

const caseStudyDetailModalImageClassOverrides: Partial<Record<string, string>> = {
  "general-aeronautics": "scale-[1.16] object-[center_18%]",
};

const caseStudyBreakdownSectionOverrides: Partial<
  Record<string, readonly { title: string; body: string }[]>
> = {
  "general-aeronautics": [
    {
      title: "Context",
      body: "General Aeronautics had real depth across multiple drone categories, but that breadth was difficult to communicate clearly in one digital experience.",
    },
    {
      title: "Challenge",
      body: "Without a clearer narrative, technical breadth risked reading as fragmentation. Buyers, partners, and operators all needed a simpler path through what the company offered and why it mattered.",
    },
    {
      title: "What we changed",
      body: "Yuvabe paired a website revamp with brand refresh, UI/UX direction, and supporting content so product communication and credibility cues reinforced each other.",
    },
    {
      title: "Outcome",
      body: "The result was a clearer business story, more intuitive interfaces, and a stronger foundation for future launches and brand growth.",
    },
  ],
};

type StudioCaseStudyDetailProps = {
  caseStudy: StudioCaseStudySummary;
  variant?: "modal" | "page";
  showHero?: boolean;
  showGalleryCardFooter?: boolean;
};

type StudioCaseStudyGalleryImageAsset = {
  src: string;
  alt: string;
};

type StudioCaseStudyGalleryImageLibrary = Record<
  string,
  {
    badgeLabel: string;
    images: readonly StudioCaseStudyGalleryImageAsset[];
  }
>;

const caseStudyGalleryImageLibrary =
  galleryImageLibrary as StudioCaseStudyGalleryImageLibrary;
const shouldSkipImageOptimization = process.env.NODE_ENV === "development";
const shouldUseLocalCaseBreakdownOverrides =
  process.env.NODE_ENV === "development";
type DetailGalleryLayoutMode = "modal" | "page";
type DetailGalleryRowKind = "full" | "split";
type DetailGalleryViewport = "portrait" | "landscape";

const detailGalleryStageClassMap: Record<
  DetailGalleryLayoutMode,
  Record<DetailGalleryViewport, Record<DetailGalleryRowKind, string>>
> = {
  page: {
    portrait: {
      full: "aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9]",
      split: "aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/10]",
    },
    landscape: {
      full: "aspect-[16/9] sm:aspect-[16/8] lg:aspect-[16/7.5]",
      split: "aspect-[16/9] sm:aspect-[16/9] lg:aspect-[16/9]",
    },
  },
  modal: {
    portrait: {
      full: "aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9]",
      split: "aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/10]",
    },
    landscape: {
      full: "aspect-[16/9] sm:aspect-[16/8] lg:aspect-[16/8]",
      split: "aspect-[16/9] sm:aspect-[16/9] lg:aspect-[16/9]",
    },
  },
};

// Gallery rows own their layout: a single item becomes full width, while a pair becomes a split row.
function getGalleryItemSpan(itemCount: number) {
  return itemCount <= 1 ? "md:col-span-12" : "md:col-span-6";
}

// The detail gallery inherits viewport intent from the case study so mobile-first work reads taller than desktop-first work.
function getGalleryStageClass({
  isModal,
  mockViewport,
  itemCount,
}: {
  isModal: boolean;
  mockViewport?: StudioCaseStudySummary["mockViewport"];
  itemCount: number;
}) {
  const layoutMode: DetailGalleryLayoutMode = isModal ? "modal" : "page";
  const viewport: DetailGalleryViewport =
    mockViewport === "landscape" ? "landscape" : "portrait";
  const rowKind: DetailGalleryRowKind = itemCount <= 1 ? "full" : "split";

  return detailGalleryStageClassMap[layoutMode][viewport][rowKind];
}

// The browser image-size hint stays aligned to the row shape so single panels can claim the full canvas width.
function getGalleryImageSizes({
  isModal,
  itemCount,
}: {
  isModal: boolean;
  itemCount: number;
}) {
  if (itemCount <= 1) {
    return "100vw";
  }

  return isModal ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 50vw, 100vw";
}

// The gallery uses one clearer section label when rows are really just different visual cuts of the same work.
function getGalleryRowTitle(title: string) {
  switch (title.toLowerCase()) {
    case "brand and product views":
    case "product views":
    case "platform story":
      return "Work Gallery";
    default:
      return title;
  }
}

// This shared detail body keeps the modal summary and SEO page aligned around the same case-study narrative.
export function StudioCaseStudyDetail({
  caseStudy,
  variant = "page",
  showHero = true,
  showGalleryCardFooter = true,
}: StudioCaseStudyDetailProps) {
  const detail = resolveStudioCaseStudyDetail(caseStudy);
  const galleryAssets =
    caseStudyGalleryImageLibrary[caseStudy.id] ??
    caseStudyGalleryImageLibrary.bevolve;
  const isModal = variant === "modal";
  const detailVisualSrc =
    caseStudy.detailImageSrc ??
    caseStudyDetailImageOverrides[caseStudy.id] ??
    caseStudyImageOverrides[caseStudy.id] ??
    caseStudy.mockImageSrc;
  const detailVideoSrc =
    caseStudy.mockVideoSrc ?? caseStudyVideoOverrides[caseStudy.id];
  const detailModalImageClassName =
    caseStudyDetailModalImageClassOverrides[caseStudy.id];
  const caseBreakdownSections =
    shouldUseLocalCaseBreakdownOverrides
      ? caseStudyBreakdownSectionOverrides[caseStudy.id] ?? detail.sections
      : detail.sections;
  const contactHref = "/#process";
  const returnHref = "/#work";

  return (
    <div className="relative isolate overflow-visible rounded-[1.85rem]">
      {showHero ? (
        <div className="relative z-10 border-b border-(--color-border-default)/80 pb-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.8fr)] lg:items-start">
            <div>
              <p className="text-label-sm uppercase tracking-[0.22em] text-(--color-text-tertiary)">
                {caseStudy.sector}
              </p>
              <h1
                className={cn(
                  "mt-2 max-w-2xl font-display leading-[0.92] tracking-[-0.05em] text-(--neutral-950)",
                  isModal
                    ? "text-[clamp(2.25rem,4vw,4.25rem)]"
                    : "text-[clamp(2.75rem,5vw,5rem)]",
                )}
              >
                {caseStudy.title}
              </h1>
              <p className="mt-4 max-w-2xl text-body-lg leading-8 text-(--color-text-secondary)">
                {detail.intro}
              </p>

              {/* The top action turns the summary into a crawlable route while keeping the founder CTA close by on the full page. */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {isModal ? (
                  <Button asChild size="lg" className="rounded-full px-6">
                    <Link href={detail.href}>
                      Read full case study
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild size="lg" className="rounded-full px-6">
                      <Link href={contactHref}>
                        Start a project
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="secondary"
                      size="lg"
                      className="rounded-full px-6"
                    >
                      <Link href={returnHref}>Back to work</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* The right rail keeps the outcomes concise so the page still feels skimmable. */}
            <div className="space-y-3">
              <p className="text-label-sm uppercase tracking-[0.16em] text-(--color-text-tertiary)">
                Outcomes
              </p>
              <ul className="space-y-3 text-body-md leading-7 text-(--color-text-secondary)">
                {detail.outcomes.map((point) => (
                  <li key={point} className="flex gap-3">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-brand" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}

      {/* The modal shifts this section to a full-width cover image, while the page keeps the side-by-side proof layout. */}
      {isModal ? (
        <div className="relative z-10 space-y-8 border-b border-(--color-border-default)/80 py-8">
          <div className="relative flex min-h-[21.5rem] items-center justify-center overflow-hidden sm:min-h-[29.5rem] lg:min-h-[43.5rem]">
            {detailVideoSrc ? (
              <video
                src={detailVideoSrc}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : detailVisualSrc ? (
              <Image
                src={detailVisualSrc}
                alt={caseStudy.mockImageAlt ?? caseStudy.title}
                fill
                sizes="(min-width: 1280px) 70rem, (min-width: 768px) 90vw, 100vw"
                className={cn(
                  "object-cover object-top",
                  detailModalImageClassName,
                )}
                unoptimized={shouldSkipImageOptimization}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-(--neutral-700)">
                <CaseStudyIcon iconKey={caseStudy.mediaIconKey} />
              </div>
            )}
          </div>

          <div className="relative px-2 py-1 sm:px-3">
            <div className="relative space-y-5">
              <p className="text-label-sm uppercase tracking-[0.16em] text-(--color-text-tertiary)">
                Case breakdown
              </p>
              <div className="grid gap-0 border-t border-(--color-border-default)/80 sm:grid-cols-2 xl:grid-cols-4">
                {caseBreakdownSections.map((section, index) => (
                  <section
                    key={section.title}
                    className="border-b border-(--color-border-default)/80 px-0 py-5 sm:border-b-0 sm:px-5 sm:first:pl-0 xl:border-l xl:px-6 xl:first:border-l-0 xl:first:pl-0"
                  >
                    <p className="text-label-sm uppercase tracking-[0.16em] text-(--color-text-brand)">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-2 text-heading-sm text-(--neutral-950)">
                      {section.title}
                    </h2>
                    <p className="mt-2 text-body-sm leading-7 text-(--color-text-secondary)">
                      {section.body}
                    </p>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 grid gap-4 border-b border-(--color-border-default)/80 py-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]">
          <PremiumSurface
            tone="glass"
            elevation="sm"
            blur="lg"
            radius="xl"
            className="min-h-72 overflow-visible border-white/42 bg-[linear-gradient(180deg,rgba(255,255,255,0.36),rgba(255,255,255,0.18))] p-5 shadow-[0_12px_28px_rgba(15,23,42,0.04)] sm:min-h-96 sm:p-6 lg:sticky lg:top-6 lg:min-h-[42rem]"
          >
            <div className="relative flex h-full min-h-[16rem] items-end justify-center overflow-hidden rounded-[1.1rem] border border-white/46 bg-[radial-gradient(circle_at_28%_72%,rgba(129,103,255,0.16),rgba(129,103,255,0.03)_34%,rgba(129,103,255,0)_62%),linear-gradient(160deg,rgba(255,255,255,0.34),rgba(255,255,255,0.14))] p-2 backdrop-blur-md sm:min-h-[22rem] sm:p-3 lg:min-h-[calc(42rem-3rem)]">
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[0.85rem] text-(--neutral-700)">
                {detailVideoSrc ? (
                  <video
                    src={detailVideoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : detailVisualSrc ? (
                  <Image
                    src={detailVisualSrc}
                    alt={caseStudy.mockImageAlt ?? caseStudy.title}
                    fill
                    className="object-cover object-center"
                    unoptimized={shouldSkipImageOptimization}
                  />
                ) : (
                  <CaseStudyIcon iconKey={caseStudy.mediaIconKey} />
                )}
              </div>
            </div>
          </PremiumSurface>

          <div className="relative min-h-72 px-4 py-5 sm:min-h-96 sm:p-6">
            <div className="relative space-y-5">
              <p className="text-label-sm uppercase tracking-[0.16em] text-(--color-text-tertiary)">
                Case breakdown
              </p>
              <div className="space-y-6">
                {caseBreakdownSections.map((section, index) => (
                  <section key={section.title} className="pt-1">
                    <p className="text-label-sm uppercase tracking-[0.16em] text-(--color-text-brand)">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-2 text-heading-sm text-(--neutral-950)">
                      {section.title}
                    </h2>
                    <p className="mt-2 text-body-sm leading-7 text-(--color-text-secondary)">
                      {section.body}
                    </p>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* The gallery rows switch between a wider page showcase and a denser modal proof grid. */}
      <div className="relative z-10 space-y-6 border-b border-(--color-border-default)/80 py-8">
        {detail.galleryRows.map((row, rowIndex) => (
          <section key={`${row.title}-${rowIndex}`} className="space-y-4">
            {(() => {
              const currentRowTitle = getGalleryRowTitle(row.title);
              const previousRowTitle =
                rowIndex > 0
                  ? getGalleryRowTitle(detail.galleryRows[rowIndex - 1]?.title ?? "")
                  : null;
              const shouldShowRowTitle = currentRowTitle !== previousRowTitle;

              return shouldShowRowTitle ? (
                <div className="flex items-center gap-3">
                  <p className="text-label-sm uppercase tracking-[0.16em] text-(--color-text-tertiary)">
                    {currentRowTitle}
                  </p>
                </div>
              ) : null;
            })()}
            <div className="grid gap-6 md:grid-cols-12 md:items-stretch">
              {row.items.map((item, itemIndex) => {
                const galleryImage =
                  galleryAssets.images[
                  (rowIndex * 2 + itemIndex) % galleryAssets.images.length
                  ];

                return (
                  <article
                    key={item.title}
                    className={cn(
                      "flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-(--color-border-default)/80 bg-white shadow-[0_18px_42px_rgba(15,23,42,0.055)]",
                      getGalleryItemSpan(row.items.length),
                    )}
                  >
                    {/* The gallery visual stays cleaner now: one image stage, one badge, and no extra inset frame. */}
                    <div className="relative overflow-hidden border-b border-(--color-border-default)/70 bg-[linear-gradient(180deg,rgba(252,252,253,0.96),rgba(248,248,250,0.9))]">
                      <div className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-(--color-border-default)/90 bg-white/94 px-3 py-2 text-[0.66rem] uppercase tracking-[0.16em] text-(--color-text-tertiary) shadow-[0_8px_18px_rgba(15,23,42,0.05)]">
                        <ImageIcon className="size-3.5" strokeWidth={1.9} />
                        {galleryAssets.badgeLabel}
                      </div>
                      <div
                        className={cn(
                          "relative w-full",
                          getGalleryStageClass({
                            isModal,
                            mockViewport: caseStudy.mockViewport,
                            itemCount: row.items.length,
                          }),
                        )}
                      >
                        <Image
                          src={galleryImage.src}
                          alt={galleryImage.alt}
                          fill
                          sizes={getGalleryImageSizes({
                            isModal,
                            itemCount: row.items.length,
                          })}
                          className="object-contain"
                          unoptimized={shouldSkipImageOptimization}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0)_28%,rgba(11,15,25,0.045)_100%)]" />
                      </div>
                    </div>

                    {showGalleryCardFooter ? (
                      <>
                        {/* The caption bar stays consistent so the page and modal use the same proof-panel contract. */}
                        <div className="grid flex-1 items-start gap-4 bg-white px-5 py-5 sm:px-6 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-7">
                          <div className="flex flex-col items-start justify-start gap-2">
                            <p className="text-[1.35rem] font-semibold leading-[1.04] tracking-[-0.035em] text-(--neutral-950)">
                              {item.title}
                            </p>
                            <div className="h-px w-12 bg-(--color-text-brand)/70" />
                          </div>
                          <p className="max-w-3xl pt-0.5 text-body-sm leading-7 text-(--color-text-secondary)">
                            {item.description}
                          </p>
                        </div>
                      </>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* The proof grid closes the main story with compact credibility signals. */}
      <div className="relative z-10 grid gap-5 border-b border-(--color-border-default)/80 py-8 md:grid-cols-3">
        {detail.proofPoints.map((point) => {
          const ProofIcon = point.iconKey
            ? getCaseStudyIcon(point.iconKey)
            : Sparkles;

          return (
            <section key={point.title} className="space-y-4 pt-1">
              <div
                className={cn(
                  buttonVariants({ variant: "secondary", size: "icon" }),
                  "pointer-events-none h-11 w-11 rounded-[0.95rem] border-white/80 bg-white/80 text-brand shadow-[0_10px_24px_rgba(15,23,42,0.06)]",
                )}
              >
                <ProofIcon className="size-4" strokeWidth={1.9} />
              </div>
              <div>
                <h3 className="text-body-lg font-semibold text-(--neutral-950)">
                  {point.title}
                </h3>
                <p className="mt-3 max-w-sm text-body-sm leading-7 text-(--color-text-secondary)">
                  {point.description}
                </p>
              </div>
            </section>
          );
        })}
      </div>

      {/* The closing CTA keeps the detailed route connected to the next founder action. */}
      <div className="relative z-10 py-10 sm:py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-label-sm uppercase tracking-[0.16em] text-(--color-text-tertiary)">
            Client perspective
          </p>
          <p className="mt-5 text-[clamp(1.65rem,3vw,2.75rem)] leading-[1.16] tracking-[-0.04em] text-(--color-text-secondary) sm:text-balance">
            &quot;{detail.testimonial.quote}&quot;
          </p>
          <p className="mt-6 text-body-lg text-(--neutral-950)">
            <span className="font-semibold">{detail.testimonial.attribution}</span>
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {isModal ? (
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href={detail.href}>
                  Read full case study
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href={contactHref}>
                  Start a project
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            )}
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="rounded-full px-6"
            >
              <Link href={isModal ? contactHref : returnHref}>
                {isModal ? "Get in touch" : "Back to work"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
