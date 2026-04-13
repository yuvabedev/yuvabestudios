import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";

import { unstable_noStore as noStore } from "next/cache";

import {
  isStudioCaseStudyId,
  type StudioCaseStudyGalleryItem,
  type StudioCaseStudyGalleryRow,
  type StudioCaseStudyIconKey,
  type StudioCaseStudyProofPoint,
  type StudioCaseStudySection,
  type StudioCaseStudySummary,
  type StudioCaseStudyTestimonial,
  type StudioEditableCaseStudy,
} from "@/components/studio/studio-case-study-content";
import type {
  StudioHomepageContent,
  StudioHomepageHeroContent,
  StudioHomepageInlineCtaContent,
  StudioHomepageNavItem,
  StudioHomepageServiceItem,
  StudioHomepageServicesContent,
  StudioHomepageTestimonialsContent,
  StudioHomepageWorkContent,
} from "@/components/studio/studio-homepage-content";
import type {
  StudioAboutCtaContent,
  StudioAboutHeroContent,
  StudioAboutPageContent,
  StudioAboutProofContent,
  StudioAboutStoryContent,
  StudioAboutTeamTeaserContent,
  StudioAboutValuesContent,
  StudioAboutWorkflowContent,
} from "@/components/studio/studio-about-content";
import type {
  StudioAiWorkflowsContent,
  StudioAiWorkflowsCtaContent,
  StudioAiWorkflowsDisciplineItem,
  StudioAiWorkflowsGuardrailItem,
  StudioAiWorkflowsHeroContent,
  StudioAiWorkflowsStageContent,
} from "@/components/studio/studio-ai-workflows-content";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

const dataDirectory = path.join(process.cwd(), "components", "studio", "data");
const caseStudiesFilePath = path.join(dataDirectory, "studio-case-studies.json");
const homepageFilePath = path.join(dataDirectory, "studio-homepage-content.json");
const aboutFilePath = path.join(dataDirectory, "studio-about-content.json");
const aiWorkflowsFilePath = path.join(
  dataDirectory,
  "studio-ai-workflows-content.json",
);
const contentDocumentsTable = "content_documents";
type StudioContentDocumentKey =
  | "homepage"
  | "case_studies"
  | "about"
  | "ai_workflows";
type StudioContentSource = "auto" | "local" | "supabase";
type StudioContentOptions = {
  source?: StudioContentSource;
};

const defaultServicesContent: StudioHomepageServicesContent = {
  eyebrow: "Services",
  headline: "One execution system for startup growth.",
  supportPrefix: "From product strategy to",
  supportHighlight: "AI-native apps and growth execution,",
  supportSuffix:
    "we help founders decide what to build, launch it well, and scale what works.",
  items: [
    {
      title: "Product Engineering",
      shortLabel: "From product strategy to launch",
      description:
        "Product shaping, roadmap planning, launch clarity, and scaling support for what starts working.",
    },
    {
      title: "AI-Native Apps",
      shortLabel: "AI-native apps and workflows",
      description:
        "Complex AI workflows, copilots, and application-layer products for B2B and B2C teams.",
    },
    {
      title: "Digital Marketing",
      shortLabel: "Campaigns built for traction",
      description:
        "Positioning, landing pages, campaigns, and analytics that turn launches into growth.",
    },
  ],
};

const defaultAfterServicesCtaContent: StudioHomepageInlineCtaContent = {
  eyebrow: "",
  title:
    "If you need one team to shape, ship, and grow the product",
  description:
    "We work best with founders who want honest thinking, fast execution, and fewer handoffs between strategy and delivery.",
  primaryCtaLabel: "Talk to us",
  primaryCtaHref: "/#process",
};

const defaultBeforeTestimonialsCtaContent: StudioHomepageInlineCtaContent = {
  eyebrow: "Need a close partner?",
  title: "If you want more momentum and less vendor drag, let's talk.",
  description:
    "The strongest work happens when strategy, design, engineering, and growth stay connected from the first bet onward.",
  primaryCtaLabel: "Start Your Project",
  primaryCtaHref: "/#process",
};

const defaultTestimonialsContent: StudioHomepageTestimonialsContent = {
  eyebrow: "Testimonials",
  headline: "Proof that the work feels clearer, sharper, and easier to trust.",
  supportPrefix: "Founders and teams feel the shift when",
  supportHighlight: "product, story, and execution start reinforcing each other,",
  supportSuffix:
    "not competing for attention across disconnected touchpoints.",
  items: [
    {
      quote:
        "Partnering with Yuvabe Studios for over a year, we've seen exceptional results. Their deep understanding of our vision and customer segments, combined with prompt responsiveness, has strengthened our brand.",
      name: "Aruna Sampige",
      attribution: "tvam Technologies Pvt. Ltd.",
    },
  ],
};

const aiWorkflowsNavLabel = "AI Workflows";
const aiWorkflowsNavHref = "/ai-workflows";

function assertRecord(
  value: unknown,
  label: string,
): asserts value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be an object.`);
  }
}

function expectString(value: unknown, label: string) {
  if (typeof value !== "string") {
    throw new Error(`${label} must be a string.`);
  }

  return value;
}

function optionalString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function resolveStudioAssetPath(value: unknown) {
  return optionalString(value);
}

function normalizeOptionalString(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function expectArray(value: unknown, label: string) {
  if (!Array.isArray(value)) {
    throw new Error(`${label} must be an array.`);
  }

  return value;
}

function expectStringArray(value: unknown, label: string) {
  return expectArray(value, label).map((item, index) =>
    expectString(item, `${label}[${index}]`),
  );
}

function normalizeStringArray(value: unknown, label: string) {
  return expectStringArray(value, label)
    .map((item) => item.trim())
    .filter(Boolean);
}

function isAiWorkflowsNavItem(label: string, href: string) {
  const normalizedLabel = label.trim().toLowerCase();
  const normalizedHref = href.trim().toLowerCase().replace(/\/$/, "");

  return (
    normalizedLabel === "ai-first dna" ||
    normalizedLabel === "ai workflows" ||
    normalizedHref === "#ai-first-dna" ||
    normalizedHref === "/#ai-first-dna" ||
    normalizedHref === aiWorkflowsNavHref
  );
}

function buildStudioNavItem(
  label: string,
  href: string,
): StudioHomepageNavItem | null {
  const nextLabel = label.trim();
  const nextHref = normalizeStudioNavHref(href);

  if (!nextLabel || !nextHref) {
    return null;
  }

  if (isAiWorkflowsNavItem(nextLabel, nextHref)) {
    return {
      label: aiWorkflowsNavLabel,
      href: aiWorkflowsNavHref,
    };
  }

  return {
    label: nextLabel,
    href: nextHref,
  };
}

function parseNavItem(value: unknown, label: string): StudioHomepageNavItem {
  assertRecord(value, label);

  const navItem = buildStudioNavItem(
    expectString(value.label, `${label}.label`),
    expectString(value.href, `${label}.href`),
  );

  if (!navItem) {
    throw new Error(`${label} is missing a valid navigation label or href.`);
  }

  return navItem;
}

// Keep legacy About nav payloads from falling back to homepage hash links in production.
function normalizeStudioNavHref(href: string) {
  const trimmedHref = href.trim();
  const normalizedHref = trimmedHref.toLowerCase();

  if (
    normalizedHref === "ai-workflows" ||
    normalizedHref === "./ai-workflows" ||
    normalizedHref === "/ai-workflows/" ||
    normalizedHref === "#ai-first-dna" ||
    normalizedHref === "/#ai-first-dna"
  ) {
    return aiWorkflowsNavHref;
  }

  if (
    normalizedHref === "about" ||
    normalizedHref === "./about" ||
    normalizedHref === "about/" ||
    normalizedHref === "#about" ||
    normalizedHref === "/#about" ||
    normalizedHref === "/about/"
  ) {
    return "/about";
  }

  if (trimmedHref.startsWith("#") && trimmedHref.length > 1) {
    return `/${trimmedHref}`;
  }

  return trimmedHref;
}

function normalizeNavItem(
  value: unknown,
  label: string,
): StudioHomepageNavItem | null {
  assertRecord(value, label);

  return buildStudioNavItem(
    expectString(value.label, `${label}.label`),
    expectString(value.href, `${label}.href`),
  );
}

function parseHeroContent(
  value: unknown,
  label: string,
): StudioHomepageHeroContent {
  assertRecord(value, label);

  return {
    headlineIntro: expectString(value.headlineIntro, `${label}.headlineIntro`),
    headlineHighlight: expectString(
      value.headlineHighlight,
      `${label}.headlineHighlight`,
    ),
    headlineLineTwo: expectString(
      value.headlineLineTwo,
      `${label}.headlineLineTwo`,
    ),
    supportPrefix: expectString(value.supportPrefix, `${label}.supportPrefix`),
    supportHighlight: expectString(
      value.supportHighlight,
      `${label}.supportHighlight`,
    ),
    ctaLabel: expectString(value.ctaLabel, `${label}.ctaLabel`),
    ctaHref: expectString(value.ctaHref, `${label}.ctaHref`),
  };
}

function normalizeHeroContent(
  value: unknown,
  label: string,
): StudioHomepageHeroContent {
  const parsed = parseHeroContent(value, label);

  return {
    headlineIntro: parsed.headlineIntro.trim(),
    headlineHighlight: parsed.headlineHighlight.trim(),
    headlineLineTwo: parsed.headlineLineTwo.trim(),
    supportPrefix: parsed.supportPrefix.trim(),
    supportHighlight: parsed.supportHighlight.trim(),
    ctaLabel: parsed.ctaLabel.trim(),
    ctaHref: parsed.ctaHref.trim(),
  };
}

function parseWorkContent(
  value: unknown,
  label: string,
): StudioHomepageWorkContent {
  assertRecord(value, label);

  return {
    eyebrow: expectString(value.eyebrow, `${label}.eyebrow`),
    headline: expectString(value.headline, `${label}.headline`),
    supportPrefix: expectString(value.supportPrefix, `${label}.supportPrefix`),
    supportHighlight: expectString(
      value.supportHighlight,
      `${label}.supportHighlight`,
    ),
    supportSuffix: expectString(value.supportSuffix, `${label}.supportSuffix`),
  };
}

function normalizeWorkContent(
  value: unknown,
  label: string,
): StudioHomepageWorkContent {
  const parsed = parseWorkContent(value, label);

  return {
    eyebrow: parsed.eyebrow.trim(),
    headline: parsed.headline.trim(),
    supportPrefix: parsed.supportPrefix.trim(),
    supportHighlight: parsed.supportHighlight.trim(),
    supportSuffix: parsed.supportSuffix.trim(),
  };
}

function parseInlineCtaContent(
  value: unknown,
  label: string,
): StudioHomepageInlineCtaContent {
  assertRecord(value, label);

  return {
    eyebrow: expectString(value.eyebrow, `${label}.eyebrow`),
    title: expectString(value.title, `${label}.title`),
    description: expectString(value.description, `${label}.description`),
    primaryCtaLabel: expectString(
      value.primaryCtaLabel,
      `${label}.primaryCtaLabel`,
    ),
    primaryCtaHref: expectString(value.primaryCtaHref, `${label}.primaryCtaHref`),
  };
}

function normalizeInlineCtaContent(
  value: unknown,
  label: string,
): StudioHomepageInlineCtaContent {
  const parsed = parseInlineCtaContent(value, label);

  return {
    eyebrow: parsed.eyebrow.trim(),
    title: parsed.title.trim(),
    description: parsed.description.trim(),
    primaryCtaLabel: parsed.primaryCtaLabel.trim(),
    primaryCtaHref: parsed.primaryCtaHref.trim(),
  };
}

function parseServiceItem(
  value: unknown,
  label: string,
): StudioHomepageServiceItem {
  assertRecord(value, label);

  return {
    title: expectString(value.title, `${label}.title`),
    shortLabel: expectString(value.shortLabel, `${label}.shortLabel`),
    description: expectString(value.description, `${label}.description`),
  };
}

function normalizeServiceItem(
  value: unknown,
  label: string,
): StudioHomepageServiceItem | null {
  const parsed = parseServiceItem(value, label);

  const title = parsed.title.trim();
  const shortLabel = parsed.shortLabel.trim();
  const description = parsed.description.trim();

  if (!title && !shortLabel && !description) {
    return null;
  }

  return {
    title,
    shortLabel,
    description,
  };
}

function parseServicesContent(
  value: unknown,
  label: string,
): StudioHomepageServicesContent {
  assertRecord(value, label);

  return {
    eyebrow: expectString(value.eyebrow, `${label}.eyebrow`),
    headline: expectString(value.headline, `${label}.headline`),
    supportPrefix: expectString(value.supportPrefix, `${label}.supportPrefix`),
    supportHighlight: expectString(
      value.supportHighlight,
      `${label}.supportHighlight`,
    ),
    supportSuffix: expectString(value.supportSuffix, `${label}.supportSuffix`),
    items: expectArray(value.items, `${label}.items`).map((item, index) =>
      parseServiceItem(item, `${label}.items[${index}]`),
    ),
  };
}

function normalizeServicesContent(
  value: unknown,
  label: string,
): StudioHomepageServicesContent {
  const parsed = parseServicesContent(value, label);

  return {
    eyebrow: parsed.eyebrow.trim(),
    headline: parsed.headline.trim(),
    supportPrefix: parsed.supportPrefix.trim(),
    supportHighlight: parsed.supportHighlight.trim(),
    supportSuffix: parsed.supportSuffix.trim(),
    items: parsed.items
      .map((item, index) =>
        normalizeServiceItem(item, `${label}.items[${index}]`),
      )
      .filter((item): item is StudioHomepageServiceItem => Boolean(item)),
  };
}

function parseTestimonialsContent(
  value: unknown,
  label: string,
): StudioHomepageTestimonialsContent {
  assertRecord(value, label);

  return {
    eyebrow: expectString(value.eyebrow, `${label}.eyebrow`),
    headline: expectString(value.headline, `${label}.headline`),
    supportPrefix: expectString(value.supportPrefix, `${label}.supportPrefix`),
    supportHighlight: expectString(
      value.supportHighlight,
      `${label}.supportHighlight`,
    ),
    supportSuffix: expectString(value.supportSuffix, `${label}.supportSuffix`),
    items: expectArray(value.items, `${label}.items`).map((item, index) => {
      assertRecord(item, `${label}.items[${index}]`);

      return {
        quote: expectString(item.quote, `${label}.items[${index}].quote`),
        name: expectString(item.name, `${label}.items[${index}].name`),
        attribution: optionalString(item.attribution),
      };
    }),
  };
}

function normalizeTestimonialsContent(
  value: unknown,
  label: string,
): StudioHomepageTestimonialsContent {
  const parsed = parseTestimonialsContent(value, label);

  return {
    eyebrow: parsed.eyebrow.trim(),
    headline: parsed.headline.trim(),
    supportPrefix: parsed.supportPrefix.trim(),
    supportHighlight: parsed.supportHighlight.trim(),
    supportSuffix: parsed.supportSuffix.trim(),
    items: parsed.items.map((item) => ({
      quote: item.quote.trim(),
      name: item.name.trim(),
      attribution: normalizeOptionalString(item.attribution),
    })),
  };
}

function parseHomepageContent(value: unknown): StudioHomepageContent {
  assertRecord(value, "homepage content");

  return {
    navigationItems: expectArray(
      value.navigationItems,
      "homepage content.navigationItems",
    ).map((item, index) =>
      parseNavItem(item, `homepage content.navigationItems[${index}]`),
    ),
    hero: parseHeroContent(value.hero, "homepage content.hero"),
    afterServicesCta: value.afterServicesCta
      ? parseInlineCtaContent(
          value.afterServicesCta,
          "homepage content.afterServicesCta",
        )
      : defaultAfterServicesCtaContent,
    services: value.services
      ? parseServicesContent(value.services, "homepage content.services")
      : defaultServicesContent,
    beforeTestimonialsCta: value.beforeTestimonialsCta
      ? parseInlineCtaContent(
          value.beforeTestimonialsCta,
          "homepage content.beforeTestimonialsCta",
        )
      : defaultBeforeTestimonialsCtaContent,
    testimonials: value.testimonials
      ? parseTestimonialsContent(
          value.testimonials,
          "homepage content.testimonials",
        )
      : defaultTestimonialsContent,
    work: parseWorkContent(value.work, "homepage content.work"),
  };
}

// This merge keeps newly added local homepage proof visible when the remote content document is older.
function mergeHomepageContentWithFallback(
  remoteContent: StudioHomepageContent,
  fallbackContent: StudioHomepageContent,
): StudioHomepageContent {
  const hasAiWorkflowsNavItem = remoteContent.navigationItems.some(
    (item) => item.href === aiWorkflowsNavHref,
  );
  const fallbackAiWorkflowsNavItems = fallbackContent.navigationItems.filter(
    (item) => item.href === aiWorkflowsNavHref,
  );
  const shouldUseFallbackTestimonials =
    remoteContent.testimonials.items.length <
    fallbackContent.testimonials.items.length;
  const shouldUseFallbackAfterServicesCta =
    JSON.stringify(remoteContent.afterServicesCta) ===
      JSON.stringify(defaultAfterServicesCtaContent) &&
    JSON.stringify(fallbackContent.afterServicesCta) !==
      JSON.stringify(defaultAfterServicesCtaContent);
  const shouldUseFallbackBeforeTestimonialsCta =
    JSON.stringify(remoteContent.beforeTestimonialsCta) ===
      JSON.stringify(defaultBeforeTestimonialsCtaContent) &&
    JSON.stringify(fallbackContent.beforeTestimonialsCta) !==
      JSON.stringify(defaultBeforeTestimonialsCtaContent);

  return {
    ...remoteContent,
    navigationItems: hasAiWorkflowsNavItem
      ? remoteContent.navigationItems
      : [
          ...remoteContent.navigationItems,
          ...fallbackAiWorkflowsNavItems,
        ],
    afterServicesCta: shouldUseFallbackAfterServicesCta
      ? fallbackContent.afterServicesCta
      : remoteContent.afterServicesCta,
    beforeTestimonialsCta: shouldUseFallbackBeforeTestimonialsCta
      ? fallbackContent.beforeTestimonialsCta
      : remoteContent.beforeTestimonialsCta,
    testimonials: shouldUseFallbackTestimonials
      ? fallbackContent.testimonials
      : remoteContent.testimonials,
  };
}

export function parseStudioHomepageContentInput(
  value: unknown,
): StudioHomepageContent {
  assertRecord(value, "homepage content payload");

  return {
    navigationItems: expectArray(
      value.navigationItems,
      "homepage content payload.navigationItems",
    )
      .map((item, index) =>
        normalizeNavItem(item, `homepage content payload.navigationItems[${index}]`),
      )
      .filter((item): item is StudioHomepageNavItem => Boolean(item)),
    hero: normalizeHeroContent(value.hero, "homepage content payload.hero"),
    afterServicesCta: value.afterServicesCta
      ? normalizeInlineCtaContent(
          value.afterServicesCta,
          "homepage content payload.afterServicesCta",
        )
      : defaultAfterServicesCtaContent,
    services: value.services
      ? normalizeServicesContent(
          value.services,
          "homepage content payload.services",
        )
      : defaultServicesContent,
    beforeTestimonialsCta: value.beforeTestimonialsCta
      ? normalizeInlineCtaContent(
          value.beforeTestimonialsCta,
          "homepage content payload.beforeTestimonialsCta",
        )
      : defaultBeforeTestimonialsCtaContent,
    testimonials: value.testimonials
      ? normalizeTestimonialsContent(
          value.testimonials,
          "homepage content payload.testimonials",
        )
      : defaultTestimonialsContent,
    work: normalizeWorkContent(value.work, "homepage content payload.work"),
  };
}

function parseAboutHeroContent(
  value: unknown,
  label: string,
): StudioAboutHeroContent {
  assertRecord(value, label);

  return {
    eyebrow: expectString(value.eyebrow, `${label}.eyebrow`),
    title: expectString(value.title, `${label}.title`),
    highlight: expectString(value.highlight, `${label}.highlight`),
    description: expectString(value.description, `${label}.description`),
    supportingLine: expectString(value.supportingLine, `${label}.supportingLine`),
    primaryCtaLabel: expectString(value.primaryCtaLabel, `${label}.primaryCtaLabel`),
    primaryCtaHref: expectString(value.primaryCtaHref, `${label}.primaryCtaHref`),
    secondaryCtaLabel: expectString(value.secondaryCtaLabel, `${label}.secondaryCtaLabel`),
    secondaryCtaHref: expectString(value.secondaryCtaHref, `${label}.secondaryCtaHref`),
    callouts: expectArray(value.callouts, `${label}.callouts`).map((callout, index) => {
      assertRecord(callout, `${label}.callouts[${index}]`);

      return {
        label: expectString(callout.label, `${label}.callouts[${index}].label`),
        value: expectString(callout.value, `${label}.callouts[${index}].value`),
        description: expectString(
          callout.description,
          `${label}.callouts[${index}].description`,
        ),
      };
    }),
  };
}

function normalizeAboutHeroContent(
  value: unknown,
  label: string,
): StudioAboutHeroContent {
  const parsed = parseAboutHeroContent(value, label);

  return {
    eyebrow: parsed.eyebrow.trim(),
    title: parsed.title.trim(),
    highlight: parsed.highlight.trim(),
    description: parsed.description.trim(),
    supportingLine: parsed.supportingLine.trim(),
    primaryCtaLabel: parsed.primaryCtaLabel.trim(),
    primaryCtaHref: parsed.primaryCtaHref.trim(),
    secondaryCtaLabel: parsed.secondaryCtaLabel.trim(),
    secondaryCtaHref: parsed.secondaryCtaHref.trim(),
    callouts: parsed.callouts.map((callout) => ({
      label: callout.label.trim(),
      value: callout.value.trim(),
      description: callout.description.trim(),
    })),
  };
}

function parseAboutStoryContent(
  value: unknown,
  label: string,
): StudioAboutStoryContent {
  assertRecord(value, label);

  return {
    eyebrow: expectString(value.eyebrow, `${label}.eyebrow`),
    title: expectString(value.title, `${label}.title`),
    paragraphs: expectStringArray(value.paragraphs, `${label}.paragraphs`),
    operatingPrinciples: expectArray(
      value.operatingPrinciples,
      `${label}.operatingPrinciples`,
    ).map((principle, index) => {
      assertRecord(principle, `${label}.operatingPrinciples[${index}]`);

      return {
        title: expectString(
          principle.title,
          `${label}.operatingPrinciples[${index}].title`,
        ),
        description: expectString(
          principle.description,
          `${label}.operatingPrinciples[${index}].description`,
        ),
      };
    }),
  };
}

function normalizeAboutStoryContent(
  value: unknown,
  label: string,
): StudioAboutStoryContent {
  const parsed = parseAboutStoryContent(value, label);

  return {
    eyebrow: parsed.eyebrow.trim(),
    title: parsed.title.trim(),
    paragraphs: parsed.paragraphs.map((paragraph) => paragraph.trim()),
    operatingPrinciples: parsed.operatingPrinciples.map((principle) => ({
      title: principle.title.trim(),
      description: principle.description.trim(),
    })),
  };
}

function parseAboutWorkflowContent(
  value: unknown,
  label: string,
): StudioAboutWorkflowContent {
  assertRecord(value, label);

  return {
    eyebrow: expectString(value.eyebrow, `${label}.eyebrow`),
    title: expectString(value.title, `${label}.title`),
    description: expectString(value.description, `${label}.description`),
    stages: expectArray(value.stages, `${label}.stages`).map((stage, index) => {
      assertRecord(stage, `${label}.stages[${index}]`);

      return {
        label: expectString(stage.label, `${label}.stages[${index}].label`),
        description: expectString(
          stage.description,
          `${label}.stages[${index}].description`,
        ),
      };
    }),
  };
}

function normalizeAboutWorkflowContent(
  value: unknown,
  label: string,
): StudioAboutWorkflowContent {
  const parsed = parseAboutWorkflowContent(value, label);

  return {
    eyebrow: parsed.eyebrow.trim(),
    title: parsed.title.trim(),
    description: parsed.description.trim(),
    stages: parsed.stages.map((stage) => ({
      label: stage.label.trim(),
      description: stage.description.trim(),
    })),
  };
}

function parseAboutProofContent(
  value: unknown,
  label: string,
): StudioAboutProofContent {
  assertRecord(value, label);

  return {
    eyebrow: expectString(value.eyebrow, `${label}.eyebrow`),
    title: expectString(value.title, `${label}.title`),
    description: expectString(value.description, `${label}.description`),
    entries: expectArray(value.entries, `${label}.entries`).map((entry, index) => {
      assertRecord(entry, `${label}.entries[${index}]`);

      return {
        client: expectString(entry.client, `${label}.entries[${index}].client`),
        sector: expectString(entry.sector, `${label}.entries[${index}].sector`),
        summary: expectString(entry.summary, `${label}.entries[${index}].summary`),
      };
    }),
  };
}

function normalizeAboutProofContent(
  value: unknown,
  label: string,
): StudioAboutProofContent {
  const parsed = parseAboutProofContent(value, label);

  return {
    eyebrow: parsed.eyebrow.trim(),
    title: parsed.title.trim(),
    description: parsed.description.trim(),
    entries: parsed.entries.map((entry) => ({
      client: entry.client.trim(),
      sector: entry.sector.trim(),
      summary: entry.summary.trim(),
    })),
  };
}

function parseAboutValuesContent(
  value: unknown,
  label: string,
): StudioAboutValuesContent {
  assertRecord(value, label);

  return {
    eyebrow: expectString(value.eyebrow, `${label}.eyebrow`),
    title: expectString(value.title, `${label}.title`),
    description: expectString(value.description, `${label}.description`),
    values: expectArray(value.values, `${label}.values`).map((item, index) => {
      assertRecord(item, `${label}.values[${index}]`);

      return {
        title: expectString(item.title, `${label}.values[${index}].title`),
        description: expectString(
          item.description,
          `${label}.values[${index}].description`,
        ),
      };
    }),
    principles: expectStringArray(value.principles, `${label}.principles`),
  };
}

function normalizeAboutValuesContent(
  value: unknown,
  label: string,
): StudioAboutValuesContent {
  const parsed = parseAboutValuesContent(value, label);

  return {
    eyebrow: parsed.eyebrow.trim(),
    title: parsed.title.trim(),
    description: parsed.description.trim(),
    values: parsed.values.map((item) => ({
      title: item.title.trim(),
      description: item.description.trim(),
    })),
    principles: parsed.principles.map((principle) => principle.trim()),
  };
}

function parseAboutTeamTeaserContent(
  value: unknown,
  label: string,
): StudioAboutTeamTeaserContent {
  assertRecord(value, label);

  return {
    eyebrow: expectString(value.eyebrow, `${label}.eyebrow`),
    title: expectString(value.title, `${label}.title`),
    description: expectString(value.description, `${label}.description`),
    points: expectStringArray(value.points, `${label}.points`),
  };
}

function normalizeAboutTeamTeaserContent(
  value: unknown,
  label: string,
): StudioAboutTeamTeaserContent {
  const parsed = parseAboutTeamTeaserContent(value, label);

  return {
    eyebrow: parsed.eyebrow.trim(),
    title: parsed.title.trim(),
    description: parsed.description.trim(),
    points: parsed.points.map((point) => point.trim()),
  };
}

function parseAboutCtaContent(
  value: unknown,
  label: string,
): StudioAboutCtaContent {
  assertRecord(value, label);

  return {
    eyebrow: expectString(value.eyebrow, `${label}.eyebrow`),
    title: expectString(value.title, `${label}.title`),
    description: expectString(value.description, `${label}.description`),
    primaryCtaLabel: expectString(value.primaryCtaLabel, `${label}.primaryCtaLabel`),
    primaryCtaHref: expectString(value.primaryCtaHref, `${label}.primaryCtaHref`),
    secondaryCtaLabel: expectString(
      value.secondaryCtaLabel,
      `${label}.secondaryCtaLabel`,
    ),
    secondaryCtaHref: expectString(
      value.secondaryCtaHref,
      `${label}.secondaryCtaHref`,
    ),
  };
}

function normalizeAboutCtaContent(
  value: unknown,
  label: string,
): StudioAboutCtaContent {
  const parsed = parseAboutCtaContent(value, label);

  return {
    eyebrow: parsed.eyebrow.trim(),
    title: parsed.title.trim(),
    description: parsed.description.trim(),
    primaryCtaLabel: parsed.primaryCtaLabel.trim(),
    primaryCtaHref: parsed.primaryCtaHref.trim(),
    secondaryCtaLabel: parsed.secondaryCtaLabel.trim(),
    secondaryCtaHref: parsed.secondaryCtaHref.trim(),
  };
}

function parseAboutPageContent(value: unknown): StudioAboutPageContent {
  assertRecord(value, "about content");

  return {
    hero: parseAboutHeroContent(value.hero, "about content.hero"),
    story: parseAboutStoryContent(value.story, "about content.story"),
    workflow: parseAboutWorkflowContent(value.workflow, "about content.workflow"),
    proof: parseAboutProofContent(value.proof, "about content.proof"),
    values: parseAboutValuesContent(value.values, "about content.values"),
    teamTeaser: parseAboutTeamTeaserContent(
      value.teamTeaser,
      "about content.teamTeaser",
    ),
    cta: parseAboutCtaContent(value.cta, "about content.cta"),
  };
}

export function parseStudioAboutPageContentInput(
  value: unknown,
): StudioAboutPageContent {
  assertRecord(value, "about content payload");

  return {
    hero: normalizeAboutHeroContent(value.hero, "about content payload.hero"),
    story: normalizeAboutStoryContent(value.story, "about content payload.story"),
    workflow: normalizeAboutWorkflowContent(
      value.workflow,
      "about content payload.workflow",
    ),
    proof: normalizeAboutProofContent(value.proof, "about content payload.proof"),
    values: normalizeAboutValuesContent(value.values, "about content payload.values"),
    teamTeaser: normalizeAboutTeamTeaserContent(
      value.teamTeaser,
      "about content payload.teamTeaser",
    ),
    cta: normalizeAboutCtaContent(value.cta, "about content payload.cta"),
  };
}

function parseAiWorkflowsHeroContent(
  value: unknown,
  label: string,
): StudioAiWorkflowsHeroContent {
  assertRecord(value, label);

  return {
    eyebrow: expectString(value.eyebrow, `${label}.eyebrow`),
    titleLineOne: expectString(value.titleLineOne, `${label}.titleLineOne`),
    titleLineTwo: expectString(value.titleLineTwo, `${label}.titleLineTwo`),
    description: expectString(value.description, `${label}.description`),
  };
}

function normalizeAiWorkflowsHeroContent(
  value: unknown,
  label: string,
): StudioAiWorkflowsHeroContent {
  const parsed = parseAiWorkflowsHeroContent(value, label);

  return {
    eyebrow: parsed.eyebrow.trim(),
    titleLineOne: parsed.titleLineOne.trim(),
    titleLineTwo: parsed.titleLineTwo.trim(),
    description: parsed.description.trim(),
  };
}

function parseAiWorkflowsStageContent(
  value: unknown,
  label: string,
): StudioAiWorkflowsStageContent {
  assertRecord(value, label);

  return {
    step: expectString(value.step, `${label}.step`),
    title: expectString(value.title, `${label}.title`),
    eyebrow: expectString(value.eyebrow, `${label}.eyebrow`),
    description: expectString(value.description, `${label}.description`),
    bullets: expectStringArray(value.bullets, `${label}.bullets`),
    iconKey: expectString(value.iconKey, `${label}.iconKey`),
    tone: expectString(value.tone, `${label}.tone`) as StudioAiWorkflowsStageContent["tone"],
  };
}

function normalizeAiWorkflowsStageContent(
  value: unknown,
  label: string,
): StudioAiWorkflowsStageContent | null {
  const parsed = parseAiWorkflowsStageContent(value, label);
  const step = parsed.step.trim();
  const title = parsed.title.trim();
  const eyebrow = parsed.eyebrow.trim();
  const description = parsed.description.trim();
  const bullets = parsed.bullets.map((bullet) => bullet.trim()).filter(Boolean);

  if (!step && !title && !eyebrow && !description && bullets.length === 0) {
    return null;
  }

  return {
    step,
    title,
    eyebrow,
    description,
    bullets,
    iconKey: parsed.iconKey.trim(),
    tone: parsed.tone,
  };
}

function parseAiWorkflowsDisciplineItem(
  value: unknown,
  label: string,
): StudioAiWorkflowsDisciplineItem {
  assertRecord(value, label);

  return {
    title: expectString(value.title, `${label}.title`),
    description: expectString(value.description, `${label}.description`),
    bullets: expectStringArray(value.bullets, `${label}.bullets`),
    iconKey: expectString(value.iconKey, `${label}.iconKey`),
  };
}

function normalizeAiWorkflowsDisciplineItem(
  value: unknown,
  label: string,
): StudioAiWorkflowsDisciplineItem | null {
  const parsed = parseAiWorkflowsDisciplineItem(value, label);
  const title = parsed.title.trim();
  const description = parsed.description.trim();
  const bullets = parsed.bullets.map((bullet) => bullet.trim()).filter(Boolean);

  if (!title && !description && bullets.length === 0) {
    return null;
  }

  return {
    title,
    description,
    bullets,
    iconKey: parsed.iconKey.trim(),
  };
}

function parseAiWorkflowsGuardrailItem(
  value: unknown,
  label: string,
): StudioAiWorkflowsGuardrailItem {
  assertRecord(value, label);

  return {
    title: expectString(value.title, `${label}.title`),
    description: expectString(value.description, `${label}.description`),
    iconKey: expectString(value.iconKey, `${label}.iconKey`),
  };
}

function normalizeAiWorkflowsGuardrailItem(
  value: unknown,
  label: string,
): StudioAiWorkflowsGuardrailItem | null {
  const parsed = parseAiWorkflowsGuardrailItem(value, label);
  const title = parsed.title.trim();
  const description = parsed.description.trim();

  if (!title && !description) {
    return null;
  }

  return {
    title,
    description,
    iconKey: parsed.iconKey.trim(),
  };
}

function parseAiWorkflowsCtaContent(
  value: unknown,
  label: string,
): StudioAiWorkflowsCtaContent {
  assertRecord(value, label);

  return {
    eyebrow: expectString(value.eyebrow, `${label}.eyebrow`),
    title: expectString(value.title, `${label}.title`),
    description: expectString(value.description, `${label}.description`),
    primaryCtaLabel: expectString(
      value.primaryCtaLabel,
      `${label}.primaryCtaLabel`,
    ),
    primaryCtaHref: expectString(value.primaryCtaHref, `${label}.primaryCtaHref`),
  };
}

function normalizeAiWorkflowsCtaContent(
  value: unknown,
  label: string,
): StudioAiWorkflowsCtaContent {
  const parsed = parseAiWorkflowsCtaContent(value, label);

  return {
    eyebrow: parsed.eyebrow.trim(),
    title: parsed.title.trim(),
    description: parsed.description.trim(),
    primaryCtaLabel: parsed.primaryCtaLabel.trim(),
    primaryCtaHref: parsed.primaryCtaHref.trim(),
  };
}

function parseAiWorkflowsContent(value: unknown): StudioAiWorkflowsContent {
  assertRecord(value, "ai workflows content");
  assertRecord(value.workflow, "ai workflows content.workflow");
  assertRecord(value.disciplines, "ai workflows content.disciplines");
  assertRecord(value.guardrails, "ai workflows content.guardrails");

  return {
    hero: parseAiWorkflowsHeroContent(value.hero, "ai workflows content.hero"),
    workflow: {
      eyebrow: expectString(value.workflow.eyebrow, "ai workflows content.workflow.eyebrow"),
      title: expectString(value.workflow.title, "ai workflows content.workflow.title"),
      description: expectString(
        value.workflow.description,
        "ai workflows content.workflow.description",
      ),
      stages: expectArray(value.workflow.stages, "ai workflows content.workflow.stages").map(
        (stage, index) =>
          parseAiWorkflowsStageContent(
            stage,
            `ai workflows content.workflow.stages[${index}]`,
          ),
      ),
    },
    disciplines: {
      eyebrow: expectString(
        value.disciplines.eyebrow,
        "ai workflows content.disciplines.eyebrow",
      ),
      title: expectString(
        value.disciplines.title,
        "ai workflows content.disciplines.title",
      ),
      description: expectString(
        value.disciplines.description,
        "ai workflows content.disciplines.description",
      ),
      items: expectArray(value.disciplines.items, "ai workflows content.disciplines.items").map(
        (item, index) =>
          parseAiWorkflowsDisciplineItem(
            item,
            `ai workflows content.disciplines.items[${index}]`,
          ),
      ),
    },
    guardrails: {
      eyebrow: expectString(
        value.guardrails.eyebrow,
        "ai workflows content.guardrails.eyebrow",
      ),
      title: expectString(
        value.guardrails.title,
        "ai workflows content.guardrails.title",
      ),
      description: expectString(
        value.guardrails.description,
        "ai workflows content.guardrails.description",
      ),
      items: expectArray(value.guardrails.items, "ai workflows content.guardrails.items").map(
        (item, index) =>
          parseAiWorkflowsGuardrailItem(
            item,
            `ai workflows content.guardrails.items[${index}]`,
          ),
      ),
    },
    cta: parseAiWorkflowsCtaContent(value.cta, "ai workflows content.cta"),
  };
}

export function parseStudioAiWorkflowsContentInput(
  value: unknown,
): StudioAiWorkflowsContent {
  assertRecord(value, "ai workflows content payload");
  assertRecord(value.workflow, "ai workflows content payload.workflow");
  assertRecord(value.disciplines, "ai workflows content payload.disciplines");
  assertRecord(value.guardrails, "ai workflows content payload.guardrails");

  return {
    hero: normalizeAiWorkflowsHeroContent(value.hero, "ai workflows content payload.hero"),
    workflow: {
      eyebrow: expectString(
        value.workflow.eyebrow,
        "ai workflows content payload.workflow.eyebrow",
      ).trim(),
      title: expectString(
        value.workflow.title,
        "ai workflows content payload.workflow.title",
      ).trim(),
      description: expectString(
        value.workflow.description,
        "ai workflows content payload.workflow.description",
      ).trim(),
      stages: expectArray(
        value.workflow.stages,
        "ai workflows content payload.workflow.stages",
      )
        .map((stage, index) =>
          normalizeAiWorkflowsStageContent(
            stage,
            `ai workflows content payload.workflow.stages[${index}]`,
          ),
        )
        .filter(
          (stage): stage is StudioAiWorkflowsStageContent => Boolean(stage),
        ),
    },
    disciplines: {
      eyebrow: expectString(
        value.disciplines.eyebrow,
        "ai workflows content payload.disciplines.eyebrow",
      ).trim(),
      title: expectString(
        value.disciplines.title,
        "ai workflows content payload.disciplines.title",
      ).trim(),
      description: expectString(
        value.disciplines.description,
        "ai workflows content payload.disciplines.description",
      ).trim(),
      items: expectArray(
        value.disciplines.items,
        "ai workflows content payload.disciplines.items",
      )
        .map((item, index) =>
          normalizeAiWorkflowsDisciplineItem(
            item,
            `ai workflows content payload.disciplines.items[${index}]`,
          ),
        )
        .filter(
          (item): item is StudioAiWorkflowsDisciplineItem => Boolean(item),
        ),
    },
    guardrails: {
      eyebrow: expectString(
        value.guardrails.eyebrow,
        "ai workflows content payload.guardrails.eyebrow",
      ).trim(),
      title: expectString(
        value.guardrails.title,
        "ai workflows content payload.guardrails.title",
      ).trim(),
      description: expectString(
        value.guardrails.description,
        "ai workflows content payload.guardrails.description",
      ).trim(),
      items: expectArray(
        value.guardrails.items,
        "ai workflows content payload.guardrails.items",
      )
        .map((item, index) =>
          normalizeAiWorkflowsGuardrailItem(
            item,
            `ai workflows content payload.guardrails.items[${index}]`,
          ),
        )
        .filter(
          (item): item is StudioAiWorkflowsGuardrailItem => Boolean(item),
        ),
    },
    cta: normalizeAiWorkflowsCtaContent(value.cta, "ai workflows content payload.cta"),
  };
}

function parseProofPoint(
  value: unknown,
  label: string,
): StudioCaseStudyProofPoint {
  assertRecord(value, label);

  return {
    title: expectString(value.title, `${label}.title`),
    description: expectString(value.description, `${label}.description`),
    iconKey: optionalString(value.iconKey) as StudioCaseStudyIconKey | undefined,
  };
}

function normalizeProofPoint(
  value: unknown,
  label: string,
): StudioCaseStudyProofPoint | null {
  const parsed = parseProofPoint(value, label);
  const title = parsed.title.trim();
  const description = parsed.description.trim();

  if (!title && !description) {
    return null;
  }

  return {
    title,
    description,
    iconKey: parsed.iconKey,
  };
}

function parseSection(value: unknown, label: string): StudioCaseStudySection {
  assertRecord(value, label);

  return {
    title: expectString(value.title, `${label}.title`),
    body: expectString(value.body, `${label}.body`),
  };
}

function normalizeSection(
  value: unknown,
  label: string,
): StudioCaseStudySection | null {
  const parsed = parseSection(value, label);
  const title = parsed.title.trim();
  const body = parsed.body.trim();

  if (!title && !body) {
    return null;
  }

  return {
    title,
    body,
  };
}

function parseGalleryItem(
  value: unknown,
  label: string,
): StudioCaseStudyGalleryItem {
  assertRecord(value, label);

  return {
    imageKey: optionalString(value.imageKey),
    title: expectString(value.title, `${label}.title`),
    description: expectString(value.description, `${label}.description`),
  };
}

function normalizeGalleryItem(
  value: unknown,
  label: string,
): StudioCaseStudyGalleryItem | null {
  const parsed = parseGalleryItem(value, label);
  const imageKey = normalizeOptionalString(parsed.imageKey);
  const title = parsed.title.trim();
  const description = parsed.description.trim();

  if (!title && !description) {
    return null;
  }

  return {
    imageKey,
    title,
    description,
  };
}

function parseGalleryRow(
  value: unknown,
  label: string,
): StudioCaseStudyGalleryRow {
  assertRecord(value, label);

  return {
    title: expectString(value.title, `${label}.title`),
    items: expectArray(value.items, `${label}.items`).map((item, index) =>
      parseGalleryItem(item, `${label}.items[${index}]`),
    ),
  };
}

function normalizeGalleryRow(
  value: unknown,
  label: string,
): StudioCaseStudyGalleryRow | null {
  const parsed = parseGalleryRow(value, label);
  const title = parsed.title.trim();
  const items = parsed.items
    .map((item, index) =>
      normalizeGalleryItem(item, `${label}.items[${index}]`),
    )
    .filter((item): item is StudioCaseStudyGalleryItem => Boolean(item));

  if (!title && items.length === 0) {
    return null;
  }

  return {
    title,
    items,
  };
}

function parseTestimonial(
  value: unknown,
  label: string,
): StudioCaseStudyTestimonial {
  assertRecord(value, label);

  return {
    quote: expectString(value.quote, `${label}.quote`),
    attribution: expectString(value.attribution, `${label}.attribution`),
    ctaLabel: optionalString(value.ctaLabel),
    ctaHref: optionalString(value.ctaHref),
  };
}

function normalizeTestimonial(
  value: unknown,
  label: string,
): StudioCaseStudyTestimonial {
  const parsed = parseTestimonial(value, label);

  return {
    quote: parsed.quote.trim(),
    attribution: parsed.attribution.trim(),
    ctaLabel: normalizeOptionalString(parsed.ctaLabel),
    ctaHref: normalizeOptionalString(parsed.ctaHref),
  };
}

function parseCaseStudySummary(value: unknown, label: string): StudioCaseStudySummary {
  assertRecord(value, label);

  const id = expectString(value.id, `${label}.id`);

  if (!isStudioCaseStudyId(id)) {
    throw new Error(`${label}.id is not a supported case-study id.`);
  }

  return {
    id,
    sector: expectString(value.sector, `${label}.sector`),
    title: expectString(value.title, `${label}.title`),
    summary: expectString(value.summary, `${label}.summary`),
    heroMockHeadline: optionalString(value.heroMockHeadline),
    services: expectStringArray(value.services, `${label}.services`),
    mediaIconKey: expectString(
      value.mediaIconKey,
      `${label}.mediaIconKey`,
    ) as StudioCaseStudyIconKey,
    // Normalize legacy Supabase asset paths so local preview stays aligned with the checked-in public bundle.
    mockImageSrc: resolveStudioAssetPath(value.mockImageSrc),
    mockVideoSrc: optionalString(value.mockVideoSrc),
    mockImageAlt: optionalString(value.mockImageAlt),
    coverImages:
      value.coverImages && typeof value.coverImages === "object"
        ? {
            card: resolveStudioAssetPath((value.coverImages as Record<string, unknown>).card),
            summary: resolveStudioAssetPath((value.coverImages as Record<string, unknown>).summary),
            detail: resolveStudioAssetPath((value.coverImages as Record<string, unknown>).detail),
          }
        : undefined,
    heroImageSrc: optionalString(value.heroImageSrc),
    detailImageSrc: optionalString(value.detailImageSrc),
    mockVariant: optionalString(value.mockVariant) as
      | StudioCaseStudySummary["mockVariant"]
      | undefined,
    mockLayout: optionalString(value.mockLayout) as
      | StudioCaseStudySummary["mockLayout"]
      | undefined,
    mockViewport: optionalString(value.mockViewport) as
      | StudioCaseStudySummary["mockViewport"]
      | undefined,
    mockImageClassName: optionalString(value.mockImageClassName),
    size: optionalString(value.size) as StudioCaseStudySummary["size"] | undefined,
    modalIntro: optionalString(value.modalIntro),
    modalOutcomes: value.modalOutcomes
      ? expectStringArray(value.modalOutcomes, `${label}.modalOutcomes`)
      : undefined,
    modalSections: value.modalSections
      ? expectArray(value.modalSections, `${label}.modalSections`).map(
          (section, index) =>
            parseSection(section, `${label}.modalSections[${index}]`),
        )
      : undefined,
    modalProofPoints: value.modalProofPoints
      ? expectArray(value.modalProofPoints, `${label}.modalProofPoints`).map(
          (point, index) =>
            parseProofPoint(point, `${label}.modalProofPoints[${index}]`),
        )
      : undefined,
    modalGalleryRows: value.modalGalleryRows
      ? expectArray(value.modalGalleryRows, `${label}.modalGalleryRows`).map(
          (row, index) =>
            parseGalleryRow(row, `${label}.modalGalleryRows[${index}]`),
        )
      : undefined,
    modalTestimonial: value.modalTestimonial
      ? parseTestimonial(value.modalTestimonial, `${label}.modalTestimonial`)
      : undefined,
    seoTitle: optionalString(value.seoTitle),
    seoDescription: optionalString(value.seoDescription),
  };
}

export function parseStudioEditableCaseStudyInput(
  value: unknown,
): Omit<StudioEditableCaseStudy, "id"> {
  assertRecord(value, "case-study payload");

  return {
    sector: expectString(value.sector, "case-study payload.sector").trim(),
    title: expectString(value.title, "case-study payload.title").trim(),
    summary: expectString(value.summary, "case-study payload.summary").trim(),
    heroMockHeadline: normalizeOptionalString(value.heroMockHeadline),
    services: normalizeStringArray(value.services, "case-study payload.services"),
    modalIntro: normalizeOptionalString(value.modalIntro),
    modalOutcomes: normalizeStringArray(
      value.modalOutcomes,
      "case-study payload.modalOutcomes",
    ),
    modalSections: expectArray(
      value.modalSections,
      "case-study payload.modalSections",
    )
      .map((section, index) =>
        normalizeSection(section, `case-study payload.modalSections[${index}]`),
      )
      .filter((section): section is StudioCaseStudySection => Boolean(section)),
    modalProofPoints: expectArray(
      value.modalProofPoints,
      "case-study payload.modalProofPoints",
    )
      .map((point, index) =>
        normalizeProofPoint(point, `case-study payload.modalProofPoints[${index}]`),
      )
      .filter(
        (point): point is StudioCaseStudyProofPoint => Boolean(point),
      ),
    modalGalleryRows: expectArray(
      value.modalGalleryRows,
      "case-study payload.modalGalleryRows",
    )
      .map((row, index) =>
        normalizeGalleryRow(row, `case-study payload.modalGalleryRows[${index}]`),
      )
      .filter((row): row is StudioCaseStudyGalleryRow => Boolean(row)),
    modalTestimonial: normalizeTestimonial(
      value.modalTestimonial,
      "case-study payload.modalTestimonial",
    ),
    seoTitle: normalizeOptionalString(value.seoTitle),
    seoDescription: normalizeOptionalString(value.seoDescription),
  };
}

async function readJsonFile<T>(filePath: string): Promise<T> {
  const rawFile = await fs.readFile(filePath, "utf8");
  return JSON.parse(rawFile) as T;
}

// Keep local-mode edits durable by writing the same prettified JSON shape the repo already uses.
async function writeJsonFile(filePath: string, payload: unknown) {
  await fs.writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

async function readContentDocument(key: StudioContentDocumentKey) {
  noStore();

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from(contentDocumentsTable)
    .select("payload")
    .eq("key", key)
    .maybeSingle<{ payload: unknown }>();

  if (error) {
    throw new Error(`Failed to load content document "${key}": ${error.message}`);
  }

  return data?.payload;
}

function shouldUseLocalContentFallback(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message.toLowerCase();

  return (
    message.includes("fetch failed") ||
    message.includes("eacces") ||
    message.includes("enotfound") ||
    message.includes("econnrefused") ||
    message.includes("network")
  );
}

async function writeContentDocument(
  key: StudioContentDocumentKey,
  payload: unknown,
) {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase
    .from(contentDocumentsTable)
    .upsert({ key, payload }, { onConflict: "key" });

  if (error) {
    throw new Error(`Failed to save content document "${key}": ${error.message}`);
  }
}

async function getOrBootstrapDocument<T>(
  key: StudioContentDocumentKey,
  fallbackFilePath: string,
) {
  // Prefer Supabase when it's reachable, but keep the site renderable when local
  // development runs without network access or the content store is temporarily down.
  let existingPayload: unknown;

  try {
    existingPayload = await readContentDocument(key);
  } catch (error) {
    if (!shouldUseLocalContentFallback(error)) {
      throw error;
    }

    console.warn(
      `Falling back to local ${key} content because Supabase could not be reached.`,
      error,
    );

    return readJsonFile<T>(fallbackFilePath);
  }

  if (existingPayload !== undefined) {
    return existingPayload as T;
  }

  const fallbackPayload = await readJsonFile<T>(fallbackFilePath);

  // Bootstrap missing documents when Supabase is available, but don't block page
  // rendering if the initial write cannot complete in local development.
  try {
    await writeContentDocument(key, fallbackPayload);
  } catch (error) {
    if (!shouldUseLocalContentFallback(error)) {
      throw error;
    }

    console.warn(
      `Loaded local ${key} content without bootstrapping Supabase because the write failed.`,
      error,
    );
  }

  return fallbackPayload;
}

function getStudioContentSource(): StudioContentSource {
  const configuredSource =
    process.env.STUDIO_CONTENT_SOURCE?.trim().toLowerCase() ?? "auto";

  if (
    configuredSource === "auto" ||
    configuredSource === "local" ||
    configuredSource === "supabase"
  ) {
    return configuredSource;
  }

  console.warn(
    `Unsupported STUDIO_CONTENT_SOURCE "${configuredSource}" received. Falling back to "auto".`,
  );

  return "auto";
}

async function getStudioContentDocument<T>(
  key: StudioContentDocumentKey,
  fallbackFilePath: string,
  options?: StudioContentOptions,
) {
  const contentSource = options?.source ?? getStudioContentSource();

  if (contentSource === "local") {
    return readJsonFile<T>(fallbackFilePath);
  }

  if (contentSource === "supabase") {
    const payload = await readContentDocument(key);

    if (payload === undefined) {
      throw new Error(`Missing Supabase content document "${key}".`);
    }

    return payload as T;
  }

  return getOrBootstrapDocument<T>(key, fallbackFilePath);
}

// Saving follows the active content source so local development edits do not disappear after the redirect.
async function saveStudioContentDocument(
  key: StudioContentDocumentKey,
  fallbackFilePath: string,
  payload: unknown,
  options?: StudioContentOptions,
) {
  const contentSource = options?.source ?? getStudioContentSource();

  if (contentSource === "local") {
    await writeJsonFile(fallbackFilePath, payload);
    return;
  }

  if (contentSource === "supabase") {
    await writeContentDocument(key, payload);
    return;
  }

  try {
    await writeContentDocument(key, payload);
  } catch (error) {
    if (!shouldUseLocalContentFallback(error)) {
      throw error;
    }

    console.warn(
      `Saved ${key} content locally because Supabase could not be reached.`,
      error,
    );
    await writeJsonFile(fallbackFilePath, payload);
  }
}

export async function getStudioHomepageContent(options?: StudioContentOptions) {
  const rawContent = await getStudioContentDocument<unknown>(
    "homepage",
    homepageFilePath,
    options,
  );
  const parsedContent = parseHomepageContent(rawContent);
  const fallbackContent = parseHomepageContent(
    await readJsonFile<unknown>(homepageFilePath),
  );

  return mergeHomepageContentWithFallback(parsedContent, fallbackContent);
}

export async function saveStudioHomepageContent(
  content: StudioHomepageContent,
  options?: StudioContentOptions,
) {
  await saveStudioContentDocument("homepage", homepageFilePath, content, options);
}

export async function getStudioAboutPageContent(options?: StudioContentOptions) {
  const rawContent = await getStudioContentDocument<unknown>(
    "about",
    aboutFilePath,
    options,
  );
  return parseAboutPageContent(rawContent);
}

export async function saveStudioAboutPageContent(
  content: StudioAboutPageContent,
  options?: StudioContentOptions,
) {
  await saveStudioContentDocument("about", aboutFilePath, content, options);
}

export async function getStudioAiWorkflowsContent(
  options?: StudioContentOptions,
) {
  const rawContent = await getStudioContentDocument<unknown>(
    "ai_workflows",
    aiWorkflowsFilePath,
    options,
  );

  return parseAiWorkflowsContent(rawContent);
}

export async function saveStudioAiWorkflowsContent(
  content: StudioAiWorkflowsContent,
  options?: StudioContentOptions,
) {
  await saveStudioContentDocument(
    "ai_workflows",
    aiWorkflowsFilePath,
    content,
    options,
  );
}

export async function getStudioCaseStudies(options?: StudioContentOptions) {
  const rawCaseStudies = await getStudioContentDocument<unknown[]>(
    "case_studies",
    caseStudiesFilePath,
    options,
  );
  const caseStudies = expectArray(rawCaseStudies, "studio case studies");

  return caseStudies.map((caseStudy, index) =>
    parseCaseStudySummary(caseStudy, `studio case studies[${index}]`),
  );
}

export async function getStudioCaseStudyById(
  id: string,
  options?: StudioContentOptions,
) {
  const caseStudies = await getStudioCaseStudies(options);
  return caseStudies.find((caseStudy) => caseStudy.id === id);
}

export async function saveStudioCaseStudy(
  id: string,
  updates: Omit<StudioEditableCaseStudy, "id">,
  options?: StudioContentOptions,
) {
  const caseStudies = await getStudioCaseStudies(options);
  const caseStudyIndex = caseStudies.findIndex((caseStudy) => caseStudy.id === id);

  if (caseStudyIndex === -1) {
    throw new Error(`Case study "${id}" was not found.`);
  }

  const currentCaseStudy = caseStudies[caseStudyIndex];
  const nextCaseStudies = [...caseStudies];
  nextCaseStudies[caseStudyIndex] = {
    ...currentCaseStudy,
    ...updates,
  };

  await saveStudioContentDocument(
    "case_studies",
    caseStudiesFilePath,
    nextCaseStudies,
    options,
  );
  return nextCaseStudies[caseStudyIndex];
}
