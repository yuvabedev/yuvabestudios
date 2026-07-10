import "server-only";

import { unstable_noStore as noStore } from "next/cache";

import { getSupabaseAdminClient } from "@/lib/supabase-admin";

// ─── Types ────────────────────────────────────────────────────────────────────

export type WorkHeroContent = {
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix: string;
  subheading: string;
};

export type WorkCtaContent = {
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  contactEmail: string;
};

// Per-case-study display config: order is the array order, category drives the
// filter rail, and coverSrc overrides the resolved cover for the grid.
export type WorkItemConfig = {
  id: string;
  category: string;
  coverSrc?: string;
};

export type WorkPageContent = {
  hero: WorkHeroContent;
  cta: WorkCtaContent;
  items: WorkItemConfig[];
};

// ─── Defaults (mirror the current hardcoded work page) ──────────────────────────

export const defaultWorkHero: WorkHeroContent = {
  headingPrefix: "Transforming ambitious visions into",
  headingHighlight: "digital",
  headingSuffix: "realities.",
  subheading:
    "Products, platforms, and brands we've shipped with founders — built with AI-native execution across strategy, design, engineering, and growth.",
};

export const defaultWorkCta: WorkCtaContent = {
  eyebrow: "Got a project in mind?",
  headingPrefix: "Let's build something",
  headingHighlight: "extraordinary",
  headingSuffix: "together.",
  primaryCtaLabel: "Start a project",
  primaryCtaHref: "/#process",
  contactEmail: "hello@yuvabestudios.com",
};

const WORK_CATEGORY = {
  product: "AI & Product",
  web: "Web & Brand",
  growth: "Growth & Marketing",
} as const;

export const defaultWorkItems: WorkItemConfig[] = [
  { id: "general-aeronautics", category: WORK_CATEGORY.web, coverSrc: "/assets/general-aeronautics/cover-summary.jpeg" },
  { id: "tvam", category: WORK_CATEGORY.product, coverSrc: "/assets/tvam/cover.png" },
  { id: "kittykat", category: WORK_CATEGORY.product, coverSrc: "/assets/KK/mock-detail.png" },
  { id: "bevolve", category: WORK_CATEGORY.product, coverSrc: "/assets/bevolve/cover-detail.png" },
  // Asset folders are spelled rangsutra/martimandir (IDs use rangasutra/matrimandir).
  { id: "av-marathon", category: WORK_CATEGORY.growth, coverSrc: "/assets/av-marathon/web/cover.webp" },
  { id: "matrimandir", category: WORK_CATEGORY.web, coverSrc: "/assets/martimandir/web/bg.webp" },
  { id: "prakiti-sattva", category: WORK_CATEGORY.web, coverSrc: "/assets/prakritisattva/hair-care.webp" },
  { id: "buglerock", category: WORK_CATEGORY.product, coverSrc: "/assets/buglerock/homepage.png" },
  { id: "rangasutra", category: WORK_CATEGORY.web, coverSrc: "/assets/rangsutra/poster_1.jpg" },
  // yuvanext temporarily removed from the grid.
  { id: "ageshift", category: WORK_CATEGORY.product, coverSrc: "/assets/ageshift/ageshift_cover.png" },
  { id: "hemplanet", category: WORK_CATEGORY.growth, coverSrc: "/assets/hemplanet/cover.png" },
];

export const defaultWorkPageContent: WorkPageContent = {
  hero: defaultWorkHero,
  cta: defaultWorkCta,
  items: defaultWorkItems,
};

// ─── Parsers ────────────────────────────────────────────────────────────────────

function str(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function parseHero(raw: unknown): WorkHeroContent {
  const r = asRecord(raw);
  return {
    headingPrefix: str(r?.headingPrefix, defaultWorkHero.headingPrefix),
    headingHighlight: str(r?.headingHighlight, defaultWorkHero.headingHighlight),
    headingSuffix: str(r?.headingSuffix, defaultWorkHero.headingSuffix),
    subheading: str(r?.subheading, defaultWorkHero.subheading),
  };
}

function parseCta(raw: unknown): WorkCtaContent {
  const r = asRecord(raw);
  return {
    eyebrow: str(r?.eyebrow, defaultWorkCta.eyebrow),
    headingPrefix: str(r?.headingPrefix, defaultWorkCta.headingPrefix),
    headingHighlight: str(r?.headingHighlight, defaultWorkCta.headingHighlight),
    headingSuffix: str(r?.headingSuffix, defaultWorkCta.headingSuffix),
    primaryCtaLabel: str(r?.primaryCtaLabel, defaultWorkCta.primaryCtaLabel),
    primaryCtaHref: str(r?.primaryCtaHref, defaultWorkCta.primaryCtaHref),
    contactEmail: str(r?.contactEmail, defaultWorkCta.contactEmail),
  };
}

function parseItems(raw: unknown): WorkItemConfig[] {
  if (!Array.isArray(raw)) return defaultWorkItems;
  const items = raw
    .map((entry): WorkItemConfig | null => {
      const r = asRecord(entry);
      if (!r || typeof r.id !== "string" || !r.id) return null;
      return {
        id: r.id,
        category: str(r.category, WORK_CATEGORY.product),
        coverSrc: typeof r.coverSrc === "string" ? r.coverSrc : undefined,
      };
    })
    .filter((item): item is WorkItemConfig => item !== null);
  return items.length > 0 ? items : defaultWorkItems;
}

export function parseWorkPageContentInput(input: unknown): WorkPageContent {
  const r = asRecord(input);
  if (!r) return defaultWorkPageContent;
  return {
    hero: parseHero(r.hero),
    cta: parseCta(r.cta),
    items: parseItems(r.items),
  };
}

// ─── Supabase I/O ───────────────────────────────────────────────────────────────

const DOCUMENT_KEY = "work_page";

async function readWorkDocument(): Promise<unknown> {
  noStore();
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("content_documents")
    .select("payload")
    .eq("key", DOCUMENT_KEY)
    .maybeSingle<{ payload: unknown }>();

  if (error) throw new Error(`Failed to load work content: ${error.message}`);
  return data?.payload;
}

async function writeWorkDocument(payload: unknown): Promise<void> {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase
    .from("content_documents")
    .upsert({ key: DOCUMENT_KEY, payload }, { onConflict: "key" });

  if (error) throw new Error(`Failed to save work content: ${error.message}`);
}

export async function getStudioWorkPageContent(): Promise<WorkPageContent> {
  try {
    const raw = await readWorkDocument();
    return parseWorkPageContentInput(raw ?? defaultWorkPageContent);
  } catch (error) {
    console.warn("Could not load work content from Supabase, using defaults.", error);
    return defaultWorkPageContent;
  }
}

export async function saveStudioWorkPageContent(content: WorkPageContent): Promise<void> {
  await writeWorkDocument(content);
}
