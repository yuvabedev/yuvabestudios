import "server-only";

import { unstable_noStore as noStore } from "next/cache";
import { unstable_rethrow } from "next/navigation";

import { getSupabaseAdminClient } from "@/lib/supabase-admin";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CareersHeroContent = {
  headingLine1: string;
  headingHighlight: string;
  subheading: string;
};

export type CareersPrincipleItem = {
  eyebrow: string;
  title: string;
  body: string;
};

export type CareersBenefitItem = {
  title: string;
  body: string;
};

export type CareersTestimonialItem = {
  quote: string;
  name: string;
  role: string;
};

export type CareersProcessStepItem = {
  title: string;
  body: string;
};

export type CareersCtaContent = {
  kicker: string;
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix: string;
  body: string;
};

export type CareersPageContent = {
  hero: CareersHeroContent;
  principles: CareersPrincipleItem[];
  benefits: CareersBenefitItem[];
  testimonials: CareersTestimonialItem[];
  process: CareersProcessStepItem[];
  cta: CareersCtaContent;
};

// ─── Defaults ─────────────────────────────────────────────────────────────────

export const defaultCareersHero: CareersHeroContent = {
  headingLine1: "Build the future",
  headingHighlight: "with us.",
  subheading:
    "Yuvabe Studios is an AI-first strategy, design, engineering, and growth studio for startups. We help founders figure out what to build next, execute it well, and create traction that compounds.",
};

export const defaultCareersPrinciples: CareersPrincipleItem[] = [
  {
    eyebrow: "01 — Principle",
    title: "Innovation first, always.",
    body: "We invest in unproven ideas before they're obvious. Every team member ships real work to real clients in their first week — including everyone who joins us.",
  },
  {
    eyebrow: "02 — Principle",
    title: "AI-native by design.",
    body: "We use frontier AI to amplify human judgment — not replace it. You'll learn to work with cutting-edge tools as part of daily practice.",
  },
  {
    eyebrow: "03 — Principle",
    title: "Ownership, not theatre.",
    body: "Every Yuvabean owns their roadmap. No politics, no hiding behind committees. Real scope from week one.",
  },
  {
    eyebrow: "04 — Principle",
    title: "Always learning.",
    body: "Weekly research sessions, regular knowledge shares, and a culture that treats growth as a shared responsibility.",
  },
];

export const defaultCareersBenefits: CareersBenefitItem[] = [
  { title: "Competitive salary", body: "Fair, market-aligned compensation recalibrated regularly." },
  { title: "Meaningful equity", body: "Options with extended exercise windows for every hire." },
  { title: "Wellness program", body: "Dedicated budget for gym, therapy, and whatever keeps you well." },
  { title: "Learning budget", body: "Annual allocation for books, courses, conferences, and coaches." },
  { title: "Global team", body: "Distributed across timezones with regular team meetups." },
  { title: "Flexible hours", body: "Async-first by default. Show up when you do your best work." },
];

export const defaultCareersTestimonials: CareersTestimonialItem[] = [
  {
    quote:
      "I shipped to two million users in my first month. The trust here is real — and it's earned by giving you the tools and the room to do the best work of your career.",
    name: "Amara Okafor",
    role: "Senior Engineer · 2 years",
  },
  {
    quote:
      "Three of my closest friends now work here. That tells you everything about the culture — we'd genuinely choose each other again.",
    name: "Lukas Behr",
    role: "Product Manager · 3 years",
  },
  {
    quote:
      "I joined as a junior. Two promotions and one country later, I still feel like the team is invested in where I'm going next.",
    name: "Priya Raman",
    role: "Staff Designer · 4 years",
  },
];

export const defaultCareersProcess: CareersProcessStepItem[] = [
  { title: "Apply", body: "Send your work, not a polished CV. We read everything within five business days." },
  { title: "Intro call", body: "A 30-minute conversation with the hiring lead — we want you to interview us too." },
  { title: "Work sample", body: "A paid take-home or live working session. No leetcode, no whiteboard theatre." },
  { title: "Team interview", body: "Meet future teammates. Real problems, real context." },
  { title: "Offer", body: "Decision within 48 hours. Transparent compensation, no negotiation games." },
];

export const defaultCareersCta: CareersCtaContent = {
  kicker: "— Open invitation",
  headingPrefix: "Let's build something",
  headingHighlight: "extraordinary",
  headingSuffix: "together.",
  body: "The roles you see are the roles we know we need. The role you imagine? Tell us about it.",
};

export const defaultCareersPageContent: CareersPageContent = {
  hero: defaultCareersHero,
  principles: defaultCareersPrinciples,
  benefits: defaultCareersBenefits,
  testimonials: defaultCareersTestimonials,
  process: defaultCareersProcess,
  cta: defaultCareersCta,
};

// ─── Parsers ──────────────────────────────────────────────────────────────────

function str(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function parsePrinciple(raw: unknown, i: number): CareersPrincipleItem {
  const def = defaultCareersPrinciples[i] ?? { eyebrow: "", title: "", body: "" };
  const r = asRecord(raw);
  if (!r) return def;
  return { eyebrow: str(r.eyebrow, def.eyebrow), title: str(r.title, def.title), body: str(r.body, def.body) };
}

function parseBenefit(raw: unknown, i: number): CareersBenefitItem {
  const def = defaultCareersBenefits[i] ?? { title: "", body: "" };
  const r = asRecord(raw);
  if (!r) return def;
  return { title: str(r.title, def.title), body: str(r.body, def.body) };
}

function parseTestimonial(raw: unknown, i: number): CareersTestimonialItem {
  const def = defaultCareersTestimonials[i] ?? { quote: "", name: "", role: "" };
  const r = asRecord(raw);
  if (!r) return def;
  return { quote: str(r.quote, def.quote), name: str(r.name, def.name), role: str(r.role, def.role) };
}

function parseProcessStep(raw: unknown, i: number): CareersProcessStepItem {
  const def = defaultCareersProcess[i] ?? { title: "", body: "" };
  const r = asRecord(raw);
  if (!r) return def;
  return { title: str(r.title, def.title), body: str(r.body, def.body) };
}

function parseCareersContent(raw: unknown): CareersPageContent {
  const r = asRecord(raw);
  if (!r) return defaultCareersPageContent;

  const heroRaw = asRecord(r.hero);
  const hero: CareersHeroContent = {
    headingLine1: str(heroRaw?.headingLine1, defaultCareersHero.headingLine1),
    headingHighlight: str(heroRaw?.headingHighlight, defaultCareersHero.headingHighlight),
    subheading: str(heroRaw?.subheading, defaultCareersHero.subheading),
  };

  const ctaRaw = asRecord(r.cta);
  const cta: CareersCtaContent = {
    kicker: str(ctaRaw?.kicker, defaultCareersCta.kicker),
    headingPrefix: str(ctaRaw?.headingPrefix, defaultCareersCta.headingPrefix),
    headingHighlight: str(ctaRaw?.headingHighlight, defaultCareersCta.headingHighlight),
    headingSuffix: str(ctaRaw?.headingSuffix, defaultCareersCta.headingSuffix),
    body: str(ctaRaw?.body, defaultCareersCta.body),
  };

  const principles = Array.isArray(r.principles) && r.principles.length === 4
    ? r.principles.map(parsePrinciple)
    : defaultCareersPrinciples;

  const benefits = Array.isArray(r.benefits) && r.benefits.length > 0
    ? r.benefits.map(parseBenefit)
    : defaultCareersBenefits;

  const testimonials = Array.isArray(r.testimonials) && r.testimonials.length > 0
    ? r.testimonials.map(parseTestimonial)
    : defaultCareersTestimonials;

  const process = Array.isArray(r.process) && r.process.length === 5
    ? r.process.map(parseProcessStep)
    : defaultCareersProcess;

  return { hero, principles, benefits, testimonials, process, cta };
}

export function parseCareersPageContentInput(input: unknown): CareersPageContent {
  return parseCareersContent(input);
}

// ─── Supabase I/O ─────────────────────────────────────────────────────────────

const DOCUMENT_KEY = "careers_page";

async function readCareersDocument(): Promise<unknown> {
  noStore();
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("content_documents")
    .select("payload")
    .eq("key", DOCUMENT_KEY)
    .maybeSingle<{ payload: unknown }>();

  if (error) throw new Error(`Failed to load careers content: ${error.message}`);
  return data?.payload;
}

async function writeCareersDocument(payload: unknown): Promise<void> {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase
    .from("content_documents")
    .upsert({ key: DOCUMENT_KEY, payload }, { onConflict: "key" });

  if (error) throw new Error(`Failed to save careers content: ${error.message}`);
}

export async function getStudioCareersPageContent(): Promise<CareersPageContent> {
  try {
    const raw = await readCareersDocument();
    return parseCareersContent(raw ?? defaultCareersPageContent);
  } catch (error) {
    // Let Next.js render-control signals (e.g. noStore during prerender) propagate.
    unstable_rethrow(error);
    console.warn("Could not load careers content from Supabase, using defaults.", error);
    return defaultCareersPageContent;
  }
}

export async function saveStudioCareersPageContent(content: CareersPageContent): Promise<void> {
  await writeCareersDocument(content);
}
