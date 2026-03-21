import {
  BarChart3,
  Bot,
  LayoutGrid,
  type LucideIcon,
  ScanSearch,
  Sparkles,
} from "lucide-react";

import type {
  StudioCaseStudyMockCardLayout,
  StudioCaseStudyMockPresentation,
  StudioCaseStudyMockVariant,
  StudioCaseStudyMockViewport,
} from "@/components/studio/studio-case-study-mock-card";

export const studioCaseStudyIds = [
  "general-aeronautics",
  "bevolve",
  "tvam",
  "kittykat",
  "ageshift",
] as const;

export type StudioCaseStudyId = (typeof studioCaseStudyIds)[number];

export type StudioCaseStudyIconKey =
  | "barChart3"
  | "bot"
  | "layoutGrid"
  | "scanSearch"
  | "sparkles";

export type StudioCaseStudySection = {
  title: string;
  body: string;
};

export type StudioCaseStudyProofPoint = {
  title: string;
  description: string;
  iconKey?: StudioCaseStudyIconKey;
};

export type StudioCaseStudyGalleryItem = {
  title: string;
  description: string;
};

export type StudioCaseStudyGalleryRow = {
  title: string;
  items: StudioCaseStudyGalleryItem[];
};

export type StudioCaseStudyTestimonial = {
  quote: string;
  attribution: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type StudioCaseStudySummary = {
  id: StudioCaseStudyId;
  sector: string;
  title: string;
  summary: string;
  heroMockHeadline?: string;
  services: string[];
  mediaIconKey: StudioCaseStudyIconKey;
  mockImageSrc?: string;
  mockVideoSrc?: string;
  mockImageAlt?: string;
  heroImageSrc?: string;
  detailImageSrc?: string;
  mockVariant?: StudioCaseStudyMockVariant;
  mockLayout?: StudioCaseStudyMockCardLayout;
  mockViewport?: StudioCaseStudyMockViewport;
  mockPresentation?: StudioCaseStudyMockPresentation;
  mockImageAspectRatio?: string;
  mockImageClassName?: string;
  size?: "default" | "feature";
  modalIntro?: string;
  modalOutcomes?: string[];
  modalSections?: StudioCaseStudySection[];
  modalProofPoints?: StudioCaseStudyProofPoint[];
  modalGalleryRows?: StudioCaseStudyGalleryRow[];
  modalTestimonial?: StudioCaseStudyTestimonial;
  seoTitle?: string;
  seoDescription?: string;
};

export type StudioEditableCaseStudy = Pick<
  StudioCaseStudySummary,
  | "id"
  | "sector"
  | "title"
  | "summary"
  | "heroMockHeadline"
  | "services"
  | "modalIntro"
  | "modalOutcomes"
  | "modalSections"
  | "modalProofPoints"
  | "modalGalleryRows"
  | "modalTestimonial"
  | "seoTitle"
  | "seoDescription"
>;

export type ResolvedStudioCaseStudyDetail = {
  href: string;
  intro: string;
  outcomes: string[];
  sections: StudioCaseStudySection[];
  proofPoints: StudioCaseStudyProofPoint[];
  galleryRows: StudioCaseStudyGalleryRow[];
  testimonial: StudioCaseStudyTestimonial;
  seoTitle: string;
  seoDescription: string;
};

const caseStudyIcons: Record<StudioCaseStudyIconKey, LucideIcon> = {
  barChart3: BarChart3,
  bot: Bot,
  layoutGrid: LayoutGrid,
  scanSearch: ScanSearch,
  sparkles: Sparkles,
};

export const homepageCaseStudyIds: StudioCaseStudyId[] = [
  "general-aeronautics",
  "bevolve",
  "tvam",
  "ageshift",
  "kittykat",
];

export function isStudioCaseStudyId(value: string): value is StudioCaseStudyId {
  return studioCaseStudyIds.includes(value as StudioCaseStudyId);
}

export function getStudioCaseStudyHref(id: string) {
  return `/case-studies/${id}`;
}

export function getHomepageCaseStudies(caseStudies: StudioCaseStudySummary[]) {
  return homepageCaseStudyIds
    .map((id) => caseStudies.find((caseStudy) => caseStudy.id === id))
    .filter((caseStudy): caseStudy is StudioCaseStudySummary => Boolean(caseStudy));
}

export function getCaseStudyIcon(
  iconKey: StudioCaseStudyIconKey = "sparkles",
) {
  return caseStudyIcons[iconKey];
}

export function CaseStudyIcon({
  iconKey,
  className = "size-24 stroke-[1.4] text-[color:color-mix(in_srgb,var(--neutral-700)_82%,var(--lavender-500)_18%)]",
}: {
  iconKey: StudioCaseStudyIconKey;
  className?: string;
}) {
  const Icon = getCaseStudyIcon(iconKey);

  return <Icon className={className} />;
}

// This helper expands fallback copy so the editor can display the exact narrative users see on the site.
export function createStudioEditableCaseStudy(
  caseStudy: StudioCaseStudySummary,
): StudioEditableCaseStudy {
  const detail = resolveStudioCaseStudyDetail(caseStudy);

  return {
    id: caseStudy.id,
    sector: caseStudy.sector,
    title: caseStudy.title,
    summary: caseStudy.summary,
    heroMockHeadline:
      caseStudy.heroMockHeadline ?? `${caseStudy.sector} product snapshot`,
    services: [...caseStudy.services],
    modalIntro: detail.intro,
    modalOutcomes: [...detail.outcomes],
    modalSections: detail.sections.map((section) => ({ ...section })),
    modalProofPoints: detail.proofPoints.map((point) => ({ ...point })),
    modalGalleryRows: detail.galleryRows.map((row) => ({
      ...row,
      items: row.items.map((item) => ({ ...item })),
    })),
    modalTestimonial: { ...detail.testimonial },
    seoTitle: detail.seoTitle,
    seoDescription: detail.seoDescription,
  };
}

// Resolve fallback copy once so modal and page variants stay aligned around the same narrative.
export function resolveStudioCaseStudyDetail(
  caseStudy: StudioCaseStudySummary,
): ResolvedStudioCaseStudyDetail {
  return {
    href: getStudioCaseStudyHref(caseStudy.id),
    intro: caseStudy.modalIntro ?? caseStudy.summary,
    outcomes: caseStudy.modalOutcomes ?? [
      "Created a clearer story around the product, team, and strategic value.",
      `Focused the experience around ${caseStudy.services.join(", ").toLowerCase()} to reduce friction and improve comprehension.`,
      "Built a stronger foundation for future launches, iteration, and growth.",
    ],
    sections: caseStudy.modalSections ?? [
      {
        title: "Context",
        body: `${caseStudy.title} needed a more coherent narrative across product, experience, and communication as the scope of the work expanded.`,
      },
      {
        title: "Challenge",
        body: "The opportunity was not just to ship assets, but to help the business communicate value faster and with more confidence.",
      },
      {
        title: "What we changed",
        body: "We aligned the experience, supporting systems, and communication touchpoints around what users and stakeholders needed to understand next.",
      },
      {
        title: "Outcome",
        body: "The result was a sharper story, a more usable experience, and a stronger platform for future growth decisions.",
      },
    ],
    proofPoints: caseStudy.modalProofPoints ?? [
      {
        title: "Sharpened the narrative",
        description: "Brought the product story, interaction model, and supporting experience into one clearer point of view.",
      },
      {
        title: "Reduced decision friction",
        description: "Turned scattered workflows into a more understandable path for users, operators, or internal teams.",
      },
      {
        title: "Built for what comes next",
        description: "Created a stronger base for future iteration instead of treating the engagement like a one-off delivery.",
      },
    ],
    galleryRows: caseStudy.modalGalleryRows ?? [
      {
        title: "Selected screens",
        items: [
          {
            title: "Hero view placeholder",
            description: "Reserved for the main case-study visual or landing screen.",
          },
          {
            title: "Workflow placeholder",
            description: "Reserved for a supporting product or process screenshot.",
          },
        ],
      },
      {
        title: "Product views",
        items: [
          {
            title: "Dashboard placeholder",
            description: "Reserved for a key interface or data view.",
          },
          {
            title: "Detail placeholder",
            description: "Reserved for a secondary screen, flow, or artifact.",
          },
        ],
      },
    ],
    testimonial: caseStudy.modalTestimonial ?? {
      quote:
        "The work brought the story, product direction, and user experience into tighter alignment, making the next stage of growth easier to communicate and easier to build toward.",
      attribution: `${caseStudy.title} engagement`,
    },
    seoTitle: caseStudy.seoTitle ?? `${caseStudy.title} Case Study`,
    seoDescription:
      caseStudy.seoDescription ?? caseStudy.modalIntro ?? caseStudy.summary,
  };
}
