import "server-only";

import { unstable_noStore as noStore } from "next/cache";

import { getSupabaseAdminClient } from "@/lib/supabase-admin";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ServicesHeroContent = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

// One alternating service block: copy on one side, image on the other.
export type ServicesBlockContent = {
  slug: string;
  title: string;
  shortLabel: string;
  description: string;
  capabilities: string[];
  image: string;
  imageAlt: string;
  // Empty string means the "Explore" link is hidden for this block.
  href: string;
};

export type ServicesOverviewContent = {
  kicker: string;
  heading: string;
  items: ServicesBlockContent[];
};

export type ServicesProcessStep = {
  title: string;
  description: string;
};

export type ServicesProcessContent = {
  kicker: string;
  heading: string;
  description: string;
  steps: ServicesProcessStep[];
};

export type ServicesCtaContent = {
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix: string;
  description: string;
  primaryCtaLabel: string;
  contactEmail: string;
};

export type ServicesPageContent = {
  hero: ServicesHeroContent;
  overview: ServicesOverviewContent;
  process: ServicesProcessContent;
  cta: ServicesCtaContent;
};

// ─── Defaults (mirror the current hardcoded services page) ──────────────────────

export const defaultServicesHero: ServicesHeroContent = {
  title: "A full-service *digital innovation* partner",
  description:
    "We help founders decide what to build, ship it fast, and iterate toward traction — one team, fewer handoffs.",
  ctaLabel: "Explore our work",
  ctaHref: "/work",
};

export const defaultServicesBlocks: ServicesBlockContent[] = [
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortLabel: "Campaigns built for traction",
    description:
      "Positioning, landing pages, and growth loops that turn a launch into measurable momentum. We connect message, channel, and analytics so every campaign teaches you what to scale next.",
    capabilities: [
      "Positioning & Messaging",
      "Landing Pages & Conversion",
      "Performance Campaigns",
      "Content & Social Systems",
      "SEO & Organic Growth",
      "Analytics & Growth Loops",
    ],
    image: "/assets/av-marathon/cover.png",
    imageAlt: "Rangsutra brand and campaign work by Yuvabe Studios",
    href: "/digital-marketing",
  },
  {
    slug: "uiux-design",
    title: "UI/UX Design & Development",
    shortLabel: "Interfaces people actually use",
    description:
      "Research-led product design and front-end builds shaped around real user context. We move from flows and systems to shipped interfaces that stay clear, fast, and on-brand.",
    capabilities: [
      "UX Research & Discovery",
      "Product Flows & Wireframes",
      "Design Systems",
      "Interface & Visual Design",
      "Interactive Prototyping",
      "Front-end Development",
    ],
    image: "/assets/KK/mock-detail.png",
    imageAlt: "TVAM product interface design by Yuvabe Studios",
    href: "/uiux-design",
  },
  {
    slug: "ai-native-engineering",
    title: "AI-Native Engineering",
    shortLabel: "End-to-end build, shipped right",
    description:
      "Product strategy and AI-native apps engineered from brief to launch. RAG systems, full-stack web and mobile, and the cloud infrastructure to run them reliably at scale.",
    capabilities: [
      "AI Product Strategy",
      "RAG & LLM Systems",
      "Full-stack Web & Mobile Apps",
      "Backend & API Engineering",
      "Cloud Infrastructure & CI/CD",
      "Admin & Internal Platforms",
    ],
    image: "/assets/tvam/cover-detail.png",
    imageAlt: "AgeShift admin platform engineered by Yuvabe Studios",
    href: "/ai-native-engineering",
  },
  {
    slug: "market-research",
    title: "Market Research",
    shortLabel: "Decisions backed by evidence",
    description:
      "AI-assisted market and customer intelligence that turns messy signals into decision-ready clarity. We help founders frame the right problem before committing build resources to it.",
    capabilities: [
      "Market & Competitor Analysis",
      "Customer & User Research",
      "Opportunity Sizing",
      "Insight Synthesis",
      "Data Analysis",
      "Decision Support",
    ],
    image: "/assets/bevolve/cover-detail.png",
    imageAlt: "Bevolve ESG insights and benchmarking platform by Yuvabe Studios",
    href: "",
  },
];

export const defaultServicesOverview: ServicesOverviewContent = {
  kicker: "What we do",
  heading: "Four capabilities that compound when they run as one system.",
  items: defaultServicesBlocks,
};

export const defaultServicesProcess: ServicesProcessContent = {
  kicker: "How we work",
  heading: "The startup workflow changed. We're built for the new one.",
  description:
    "Making is cheaper than ever, so the edge moved upstream — to framing, judgment, and tighter loops. Every engagement runs on the same operating model.",
  steps: [
    {
      title: "Frame",
      description:
        "We pressure-test the problem, the wedge, and the assumptions worth betting on before anything gets built.",
    },
    {
      title: "Prototype",
      description:
        "AI compresses the path from idea to artifact, so richer, more believable versions arrive far earlier.",
    },
    {
      title: "Test",
      description:
        "Real users react to something concrete, generating evidence instead of opinions about what works.",
    },
    {
      title: "Decide",
      description:
        "We read the signal together and choose to persevere, refine, or pivot — sequencing the next bet with intent.",
    },
  ],
};

export const defaultServicesCta: ServicesCtaContent = {
  eyebrow: "Have a bet worth making?",
  headingPrefix: "One team to",
  headingHighlight: "shape, ship, and grow",
  headingSuffix: "the product.",
  description:
    "Tell us what you're building. We'll help you decide what matters, move fast, and turn early signal into traction.",
  primaryCtaLabel: "Start a project",
  contactEmail: "sales@yuvabe.com",
};

export const defaultServicesPageContent: ServicesPageContent = {
  hero: defaultServicesHero,
  overview: defaultServicesOverview,
  process: defaultServicesProcess,
  cta: defaultServicesCta,
};

// ─── Parsers (tolerant — missing fields fall back to defaults) ──────────────────

function str(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

function strArray(value: unknown, fallback: string[]): string[] {
  if (!Array.isArray(value)) return fallback;
  const items = value.filter((item): item is string => typeof item === "string");
  return items;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function parseHero(raw: unknown): ServicesHeroContent {
  const r = asRecord(raw);
  return {
    title: str(r?.title, defaultServicesHero.title),
    description: str(r?.description, defaultServicesHero.description),
    ctaLabel: str(r?.ctaLabel, defaultServicesHero.ctaLabel),
    ctaHref: str(r?.ctaHref, defaultServicesHero.ctaHref),
  };
}

function parseBlocks(raw: unknown): ServicesBlockContent[] {
  if (!Array.isArray(raw)) return defaultServicesBlocks;
  const items = raw
    .map((entry, index): ServicesBlockContent | null => {
      const r = asRecord(entry);
      if (!r) return null;
      const fallback = defaultServicesBlocks[index] ?? defaultServicesBlocks[0];
      return {
        slug: str(r.slug, fallback.slug),
        title: str(r.title, fallback.title),
        shortLabel: str(r.shortLabel, fallback.shortLabel),
        description: str(r.description, fallback.description),
        capabilities: strArray(r.capabilities, fallback.capabilities),
        image: str(r.image, fallback.image),
        imageAlt: str(r.imageAlt, fallback.imageAlt),
        href: str(r.href, ""),
      };
    })
    .filter((item): item is ServicesBlockContent => item !== null);
  return items.length > 0 ? items : defaultServicesBlocks;
}

function parseOverview(raw: unknown): ServicesOverviewContent {
  const r = asRecord(raw);
  return {
    kicker: str(r?.kicker, defaultServicesOverview.kicker),
    heading: str(r?.heading, defaultServicesOverview.heading),
    items: parseBlocks(r?.items),
  };
}

function parseSteps(raw: unknown): ServicesProcessStep[] {
  if (!Array.isArray(raw)) return defaultServicesProcess.steps;
  const steps = raw
    .map((entry): ServicesProcessStep | null => {
      const r = asRecord(entry);
      if (!r) return null;
      return {
        title: str(r.title, ""),
        description: str(r.description, ""),
      };
    })
    .filter((item): item is ServicesProcessStep => item !== null)
    .filter((item) => item.title || item.description);
  return steps.length > 0 ? steps : defaultServicesProcess.steps;
}

function parseProcess(raw: unknown): ServicesProcessContent {
  const r = asRecord(raw);
  return {
    kicker: str(r?.kicker, defaultServicesProcess.kicker),
    heading: str(r?.heading, defaultServicesProcess.heading),
    description: str(r?.description, defaultServicesProcess.description),
    steps: parseSteps(r?.steps),
  };
}

function parseCta(raw: unknown): ServicesCtaContent {
  const r = asRecord(raw);
  return {
    eyebrow: str(r?.eyebrow, defaultServicesCta.eyebrow),
    headingPrefix: str(r?.headingPrefix, defaultServicesCta.headingPrefix),
    headingHighlight: str(r?.headingHighlight, defaultServicesCta.headingHighlight),
    headingSuffix: str(r?.headingSuffix, defaultServicesCta.headingSuffix),
    description: str(r?.description, defaultServicesCta.description),
    primaryCtaLabel: str(r?.primaryCtaLabel, defaultServicesCta.primaryCtaLabel),
    contactEmail: str(r?.contactEmail, defaultServicesCta.contactEmail),
  };
}

export function parseServicesPageContentInput(input: unknown): ServicesPageContent {
  const r = asRecord(input);
  if (!r) return defaultServicesPageContent;
  return {
    hero: parseHero(r.hero),
    overview: parseOverview(r.overview),
    process: parseProcess(r.process),
    cta: parseCta(r.cta),
  };
}

// ─── Supabase I/O ───────────────────────────────────────────────────────────────

const DOCUMENT_KEY = "services_page";

async function readServicesDocument(): Promise<unknown> {
  noStore();
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("content_documents")
    .select("payload")
    .eq("key", DOCUMENT_KEY)
    .maybeSingle<{ payload: unknown }>();

  if (error) throw new Error(`Failed to load services content: ${error.message}`);
  return data?.payload;
}

async function writeServicesDocument(payload: unknown): Promise<void> {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase
    .from("content_documents")
    .upsert({ key: DOCUMENT_KEY, payload }, { onConflict: "key" });

  if (error) throw new Error(`Failed to save services content: ${error.message}`);
}

export async function getStudioServicesPageContent(): Promise<ServicesPageContent> {
  try {
    const raw = await readServicesDocument();
    return parseServicesPageContentInput(raw ?? defaultServicesPageContent);
  } catch (error) {
    console.warn("Could not load services content from Supabase, using defaults.", error);
    return defaultServicesPageContent;
  }
}

export async function saveStudioServicesPageContent(content: ServicesPageContent): Promise<void> {
  await writeServicesDocument(content);
}
