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
import { StartProjectButton } from "@/components/studio/start-project-button";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const caseStudyVideoOverrides: Partial<Record<string, string>> = {
  bevolve: "/assets/bevolve/bevolve-AI-page.mp4",
};

const caseStudyImageOverrides: Partial<Record<string, string>> = {
  "general-aeronautics": "/assets/general-aeronautics/cover-home.png",
  ageshift: "/assets/ageshift/ageshift_cover.png",
};

const caseStudyDetailImageOverrides: Partial<Record<string, string>> = {
  "general-aeronautics": "/assets/general-aeronautics/cover-detail.jpeg",
};

const caseStudyDetailImageClassOverrides: Partial<Record<string, string>> = {
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
  showCaseBreakdown?: boolean;
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
    itemImages?: Partial<
      Record<string, readonly StudioCaseStudyGalleryImageAsset[]>
    >;
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
      full: "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/9]",
      split: "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/9]",
    },
    landscape: {
      full: "aspect-[16/9] sm:aspect-[16/9] lg:aspect-[16/9]",
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

type StudioCaseStudyHeroMedia = {
  visualSrc?: string;
  videoSrc?: string;
  imageClassName?: string;
};

// The page hero and detail view share one media resolver so case-study art direction stays consistent across both entry points.
export function resolveStudioCaseStudyHeroMedia(
  caseStudy: StudioCaseStudySummary,
): StudioCaseStudyHeroMedia {
  return {
    visualSrc:
      caseStudy.detailImageSrc ??
      caseStudyDetailImageOverrides[caseStudy.id] ??
      caseStudyImageOverrides[caseStudy.id] ??
      caseStudy.mockImageSrc,
    videoSrc: caseStudy.mockVideoSrc ?? caseStudyVideoOverrides[caseStudy.id],
    imageClassName: caseStudyDetailImageClassOverrides[caseStudy.id],
  };
}

// This shared detail body keeps the modal summary and SEO page aligned around the same case-study narrative.
export function StudioCaseStudyDetail({
  caseStudy,
  variant = "page",
  showHero = true,
  showCaseBreakdown = true,
  showGalleryCardFooter = true,
}: StudioCaseStudyDetailProps) {
  const detail = resolveStudioCaseStudyDetail(caseStudy);
  const galleryAssets =
    caseStudyGalleryImageLibrary[caseStudy.id] ??
    caseStudyGalleryImageLibrary.bevolve;
  const isModal = variant === "modal";
  const heroMedia = resolveStudioCaseStudyHeroMedia(caseStudy);
  const detailVisualSrc = heroMedia.visualSrc;
  const detailVideoSrc = heroMedia.videoSrc;
  const detailImageClassName = heroMedia.imageClassName;
  const caseBreakdownSections =
    shouldUseLocalCaseBreakdownOverrides
      ? caseStudyBreakdownSectionOverrides[caseStudy.id] ?? detail.sections
      : detail.sections;
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
                  <Button asChild size="lg" className="px-6">
                    <Link href={detail.href}>
                      Read full case study
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <StartProjectButton
                      size="lg"
                      source={`case-study-hero:${caseStudy.id}`}
                      className="px-6"
                    >
                      Start a project
                      <ArrowUpRight className="size-4" />
                    </StartProjectButton>
                    <Button
                      asChild
                      variant="secondary"
                      size="lg"
                      className="px-6"
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

      {/* The case breakdown is optional in modal summaries, but it stays on the full page where the longer narrative needs more structure. */}
      {showCaseBreakdown ? (
        isModal ? (
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
                    detailImageClassName,
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
            <div className="min-h-72 overflow-hidden rounded-[1.65rem] bg-white sm:min-h-96 lg:sticky lg:top-6 lg:min-h-[42rem]">
              <div className="relative flex h-full min-h-[16rem] items-center justify-center overflow-hidden text-(--neutral-700) sm:min-h-[22rem] lg:min-h-[42rem]">
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
        )
      ) : (
        <div className="relative z-10 border-b border-(--color-border-default)/80 py-8">
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
                  detailImageClassName,
                )}
                unoptimized={shouldSkipImageOptimization}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-(--neutral-700)">
                <CaseStudyIcon iconKey={caseStudy.mediaIconKey} />
              </div>
            )}
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
                const fallbackImageIndex =
                  detail.galleryRows
                    .slice(0, rowIndex)
                    .reduce((count, currentRow) => count + currentRow.items.length, 0) +
                  itemIndex;
                const galleryImage =
                  galleryAssets.itemImages?.[item.title]?.[0] ??
                  galleryAssets.images[
                    fallbackImageIndex % galleryAssets.images.length
                  ];

                return (
                  <article
                    key={item.title}
                    className={cn(
                      "flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-white/85 bg-white/96 shadow-[0_18px_40px_rgba(15,23,42,0.09),0_4px_14px_rgba(15,23,42,0.05)]",
                      getGalleryItemSpan(row.items.length),
                    )}
                  >
                    {/* The gallery visual stays cleaner now: one image stage, one badge, and no extra inset frame. */}
                    <div className="relative overflow-hidden border-b border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.985),rgba(248,248,250,0.95))] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:ring-1 before:ring-white/55 before:content-['']">
                      <div className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-(--color-border-default) bg-white/96 px-3 py-2 text-[0.66rem] uppercase tracking-[0.16em] text-(--color-text-tertiary) shadow-[0_8px_18px_rgba(15,23,42,0.05)]">
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
                          className="object-cover"
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
              <Button asChild size="lg" className="px-6">
                <Link href={detail.href}>
                  Read full case study
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            ) : (
              <StartProjectButton
                size="lg"
                source={`case-study-footer:${caseStudy.id}`}
                className="px-6"
              >
                Start a project
                <ArrowUpRight className="size-4" />
              </StartProjectButton>
            )}
            {isModal ? (
              <StartProjectButton
                variant="secondary"
                size="lg"
                source={`case-study-modal-secondary:${caseStudy.id}`}
                className="px-6"
              >
                Get in touch
              </StartProjectButton>
            ) : (
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="px-6"
              >
                <Link href={returnHref}>Back to work</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
