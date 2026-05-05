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

export const studioCaseStudyIds: readonly string[] = [
  "general-aeronautics",
  "bevolve",
  "tvam",
  "kittykat",
  "ageshift",
  "av-marathon",
  "rangasutra",
  "hemplanet",
  "matrimandir",
  "buglerock",
  "prakiti-sattva",
  "bevikve",
  "yuvanext",
];

export type StudioCaseStudyId = string;

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
  imageKey?: string;
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

export type StudioCaseStudyCoverImages = {
  card?: string;
  summary?: string;
  detail?: string;
};

export type StudioCaseStudyHeroPalette = {
  topWash: string;
  strip: string;
  logoGlow: string;
  logoLine: string;
};

export type StudioCaseStudyProofTone =
  | "tintWarm"
  | "tintGreen"
  | "tintLavender"
  | "tintPurple"
  | "tintCyan";

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
  coverImages?: StudioCaseStudyCoverImages;
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

// The hero palette contract breaks the branded opening into four reusable layers:
// `topWash` colors the soft ambient background behind the hero,
// `strip` drives the angled gradient band at the bottom edge,
// `logoGlow` adds the blurred halo behind logo-led hero art,
// and `logoLine` controls the thin accent rule used under wider wordmarks.
const defaultStudioCaseStudyHeroPalette: StudioCaseStudyHeroPalette = {
  topWash:
    "radial-gradient(circle_at_18%_22%,color-mix(in srgb,var(--purple-500) 11%,white),rgba(255,255,255,0)_30%),radial-gradient(circle_at_76%_18%,color-mix(in srgb,var(--yellow-500) 11%,white),rgba(255,255,255,0)_24%),radial-gradient(circle_at_62%_72%,color-mix(in srgb,var(--lavender-500) 8%,white),rgba(255,255,255,0)_34%)",
  strip:
    "linear-gradient(90deg,color-mix(in srgb,var(--purple-500) 78%,white) 0%,color-mix(in srgb,var(--lavender-500) 74%,var(--purple-500)) 36%,color-mix(in srgb,var(--cyan-500) 48%,white) 72%,color-mix(in srgb,var(--cyan-200) 88%,white) 100%)",
  logoGlow:
    "radial-gradient(circle,color-mix(in srgb,var(--purple-500) 16%,white),color-mix(in srgb,var(--lavender-500) 12%,white) 34%,color-mix(in srgb,var(--cyan-500) 8%,white) 56%,rgba(255,255,255,0) 74%)",
  logoLine:
    "linear-gradient(90deg,rgba(255,255,255,0),color-mix(in srgb,var(--lavender-500) 72%,white),color-mix(in srgb,var(--cyan-500) 52%,white),rgba(255,255,255,0))",
};

const defaultStudioCaseStudyProofTone: StudioCaseStudyProofTone =
  "tintLavender";

const studioCaseStudyProofToneMap: Record<string, StudioCaseStudyProofTone> = {
  tvam: "tintWarm",
  bevolve: "tintGreen",
  kittykat: "tintLavender",
  quiltai: "tintPurple",
  ageshift: "tintCyan",
  generalaeronautics: "tintGreen",
};

const studioCaseStudyLabelToIdMap: Partial<Record<string, StudioCaseStudyId>> = {
  tvam: "tvam",
  bevolve: "bevolve",
  kittykat: "kittykat",
  generalaeronautics: "general-aeronautics",
};

// Each case study can override the shared hero contract with logo-led colors while still using the same layout and markup.
const studioCaseStudyHeroPalettes: Partial<Record<string, StudioCaseStudyHeroPalette>> = {
  "general-aeronautics": {
    topWash:
      "radial-gradient(circle_at_18%_22%,color-mix(in srgb,var(--cyan-500) 14%,white),rgba(255,255,255,0)_30%),radial-gradient(circle_at_76%_18%,color-mix(in srgb,var(--green-500) 12%,white),rgba(255,255,255,0)_24%),radial-gradient(circle_at_62%_72%,color-mix(in srgb,var(--cyan-200) 14%,white),rgba(255,255,255,0)_34%)",
    strip:
      "linear-gradient(90deg,color-mix(in srgb,var(--cyan-500) 74%,white) 0%,color-mix(in srgb,var(--cyan-500) 78%,var(--green-500)) 48%,color-mix(in srgb,var(--green-200) 86%,white) 100%)",
    logoGlow:
      "radial-gradient(circle,color-mix(in srgb,var(--cyan-500) 18%,white),color-mix(in srgb,var(--green-500) 14%,white) 38%,color-mix(in srgb,var(--cyan-200) 18%,white) 60%,rgba(255,255,255,0) 76%)",
    logoLine:
      "linear-gradient(90deg,rgba(255,255,255,0),color-mix(in srgb,var(--cyan-500) 54%,white),color-mix(in srgb,var(--green-500) 42%,white),rgba(255,255,255,0))",
  },
  bevolve: {
    topWash:
      "radial-gradient(circle_at_18%_22%,color-mix(in srgb,var(--green-500) 16%,white),rgba(255,255,255,0)_30%),radial-gradient(circle_at_76%_18%,color-mix(in srgb,var(--cyan-500) 12%,white),rgba(255,255,255,0)_24%),radial-gradient(circle_at_62%_72%,color-mix(in srgb,var(--green-200) 16%,white),rgba(255,255,255,0)_34%)",
    strip:
      "linear-gradient(90deg,color-mix(in srgb,var(--green-500) 74%,white) 0%,color-mix(in srgb,var(--green-500) 76%,var(--cyan-500)) 44%,color-mix(in srgb,var(--cyan-200) 84%,white) 100%)",
    logoGlow:
      "radial-gradient(circle,color-mix(in srgb,var(--green-500) 20%,white),color-mix(in srgb,var(--cyan-500) 14%,white) 36%,color-mix(in srgb,var(--green-200) 18%,white) 58%,rgba(255,255,255,0) 76%)",
    logoLine:
      "linear-gradient(90deg,rgba(255,255,255,0),color-mix(in srgb,var(--green-500) 56%,white),color-mix(in srgb,var(--cyan-500) 48%,white),rgba(255,255,255,0))",
  },
  tvam: {
    topWash:
      "radial-gradient(circle_at_18%_22%,color-mix(in srgb,var(--orange-500) 18%,white),rgba(255,255,255,0)_30%),radial-gradient(circle_at_76%_18%,color-mix(in srgb,var(--yellow-500) 12%,white),rgba(255,255,255,0)_24%),radial-gradient(circle_at_62%_72%,color-mix(in srgb,var(--orange-200) 18%,white),rgba(255,255,255,0)_34%)",
    strip:
      "linear-gradient(90deg,color-mix(in srgb,var(--orange-500) 82%,white) 0%,color-mix(in srgb,var(--orange-500) 84%,var(--yellow-500)) 46%,color-mix(in srgb,var(--orange-200) 72%,white) 78%,color-mix(in srgb,var(--neutral-0) 92%,var(--orange-200)) 100%)",
    logoGlow:
      "radial-gradient(circle,color-mix(in srgb,var(--orange-500) 20%,white),color-mix(in srgb,var(--yellow-500) 16%,white) 34%,color-mix(in srgb,var(--orange-200) 20%,white) 58%,rgba(255,255,255,0) 76%)",
    logoLine:
      "linear-gradient(90deg,rgba(255,255,255,0),color-mix(in srgb,var(--orange-500) 58%,white),color-mix(in srgb,var(--orange-200) 68%,white),rgba(255,255,255,0))",
  },
  kittykat: {
    topWash:
      "radial-gradient(circle_at_18%_22%,color-mix(in srgb,var(--purple-500) 18%,white),rgba(255,255,255,0)_30%),radial-gradient(circle_at_76%_18%,color-mix(in srgb,var(--peach-200) 12%,white),rgba(255,255,255,0)_24%),radial-gradient(circle_at_62%_72%,color-mix(in srgb,var(--lavender-500) 16%,white),rgba(255,255,255,0)_34%)",
    strip:
      "linear-gradient(90deg,color-mix(in srgb,var(--purple-500) 84%,white) 0%,color-mix(in srgb,var(--lavender-500) 82%,var(--purple-500)) 44%,color-mix(in srgb,var(--peach-200) 80%,white) 84%,color-mix(in srgb,var(--neutral-0) 94%,var(--peach-200)) 100%)",
    logoGlow:
      "radial-gradient(circle,color-mix(in srgb,var(--purple-500) 20%,white),color-mix(in srgb,var(--lavender-500) 18%,white) 34%,color-mix(in srgb,var(--peach-200) 22%,white) 58%,rgba(255,255,255,0) 76%)",
    logoLine:
      "linear-gradient(90deg,rgba(255,255,255,0),color-mix(in srgb,var(--lavender-500) 68%,white),color-mix(in srgb,var(--peach-200) 74%,white),rgba(255,255,255,0))",
  },
  ageshift: {
    topWash:
      "radial-gradient(circle_at_18%_22%,color-mix(in srgb,var(--green-500) 14%,white),rgba(255,255,255,0)_30%),radial-gradient(circle_at_76%_18%,color-mix(in srgb,var(--cyan-500) 12%,white),rgba(255,255,255,0)_24%),radial-gradient(circle_at_62%_72%,color-mix(in srgb,var(--lavender-500) 10%,white),rgba(255,255,255,0)_34%)",
    strip:
      "linear-gradient(90deg,color-mix(in srgb,var(--green-500) 74%,white) 0%,color-mix(in srgb,var(--cyan-500) 68%,var(--green-500)) 42%,color-mix(in srgb,var(--lavender-500) 66%,white) 72%,color-mix(in srgb,var(--cyan-200) 86%,white) 100%)",
    logoGlow:
      "radial-gradient(circle,color-mix(in srgb,var(--green-500) 18%,white),color-mix(in srgb,var(--cyan-500) 14%,white) 36%,color-mix(in srgb,var(--lavender-500) 12%,white) 58%,rgba(255,255,255,0) 76%)",
    logoLine:
      "linear-gradient(90deg,rgba(255,255,255,0),color-mix(in srgb,var(--green-500) 56%,white),color-mix(in srgb,var(--cyan-500) 48%,white),rgba(255,255,255,0))",
  },
};

export const homepageCaseStudyIds: StudioCaseStudyId[] = [
  "general-aeronautics",
  "bevolve",
  "kittykat",
  "tvam",
];

export function isStudioCaseStudyId(value: string): boolean {
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(value);
}

export function getStudioCaseStudyHref(id: string) {
  return `/case-studies/${id}`;
}

// This label resolver lets editorial content link to named case studies without repeating slug logic in page components.
export function resolveStudioCaseStudyHrefFromLabel(label: string) {
  const caseStudyId = studioCaseStudyLabelToIdMap[normalizeStudioCaseStudyLabel(label)];

  return caseStudyId ? getStudioCaseStudyHref(caseStudyId) : undefined;
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

// The hero palette map keeps logo-led case-study accents centralized so page strips stay brand-specific without page-level drift.
export function resolveStudioCaseStudyHeroPalette(
  caseStudyId: StudioCaseStudyId,
) {
  return (
    studioCaseStudyHeroPalettes[caseStudyId] ??
    defaultStudioCaseStudyHeroPalette
  );
}

function normalizeStudioCaseStudyLabel(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

// This proof-tone resolver keeps logo-led About grid accents tied to the shared case-study palette contract.
export function resolveStudioCaseStudyProofTone(
  label: string,
): StudioCaseStudyProofTone {
  return (
    studioCaseStudyProofToneMap[normalizeStudioCaseStudyLabel(label)] ??
    defaultStudioCaseStudyProofTone
  );
}

export type StudioCaseStudyCoverSlot = keyof StudioCaseStudyCoverImages;

// Preferred asset suffixes per case study are `cover-card`, `cover-summary`, and `cover-detail`.
// The cover resolver makes the homepage card, summary modal, and detail page read from one explicit image contract.
export function resolveStudioCaseStudyCoverSrc(
  caseStudy: StudioCaseStudySummary,
  slot: StudioCaseStudyCoverSlot,
) {
  const covers = caseStudy.coverImages;

  switch (slot) {
    case "card":
      return covers?.card ?? caseStudy.heroImageSrc ?? caseStudy.mockImageSrc;
    case "summary":
      return (
        covers?.summary ??
        covers?.card ??
        caseStudy.heroImageSrc ??
        caseStudy.mockImageSrc
      );
    case "detail":
      return (
        covers?.detail ??
        caseStudy.detailImageSrc ??
        covers?.summary ??
        covers?.card ??
        caseStudy.heroImageSrc ??
        caseStudy.mockImageSrc
      );
    default:
      return caseStudy.mockImageSrc;
  }
}

// This helper keeps case-study presentation overrides shared between the modal summary and the full detail route.
export function applyStudioCaseStudyDisplayOverrides(
  caseStudy: StudioCaseStudySummary,
): StudioCaseStudySummary {
  return caseStudy;
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
      // Preserve a stable image lookup key so admin copy edits do not remap gallery visuals.
      items: row.items.map((item) => ({
        ...item,
        imageKey: item.imageKey ?? item.title,
      })),
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
