import aboutContent from "@/components/studio/data/studio-about-content.json";

export type StudioAboutHeroContent = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  supportingLine: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  callouts: Array<{
    label: string;
    value: string;
    description: string;
  }>;
};

export type StudioAboutStoryContent = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  operatingPrinciples: Array<{
    title: string;
    description: string;
  }>;
};

export type StudioAboutStatItem = {
  value: string;
  label: string;
};

export type StudioAboutStatsContent = {
  items: StudioAboutStatItem[];
  feature: StudioAboutStatItem;
};

export type StudioAboutNameMeaningContent = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
};

export type StudioAboutPhilosophyContent = {
  eyebrow: string;
  title: string;
  intro: string;
  principles: Array<{
    title: string;
    description: string;
  }>;
};

export type StudioAboutTestimonialItem = {
  quote: string;
  name: string;
  role: string;
};

export type StudioAboutTestimonialsContent = {
  eyebrow: string;
  items: StudioAboutTestimonialItem[];
};

export type StudioAboutWorkflowContent = {
  eyebrow: string;
  title: string;
  description: string;
  stages: Array<{
    label: string;
    description: string;
  }>;
};

export type StudioAboutProofContent = {
  eyebrow: string;
  title: string;
  description: string;
  entries: Array<{
    client: string;
    sector: string;
    summary: string;
  }>;
};

export type StudioAboutValuesContent = {
  eyebrow: string;
  title: string;
  description: string;
  values: Array<{
    title: string;
    description: string;
  }>;
  principles: string[];
};

export type StudioAboutTeamTeaserContent = {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
};

export type StudioAboutCtaContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

export type StudioAboutPageContent = {
  hero: StudioAboutHeroContent;
  stats: StudioAboutStatsContent;
  nameMeaning: StudioAboutNameMeaningContent;
  philosophy: StudioAboutPhilosophyContent;
  story: StudioAboutStoryContent;
  testimonials: StudioAboutTestimonialsContent;
  workflow: StudioAboutWorkflowContent;
  proof: StudioAboutProofContent;
  values: StudioAboutValuesContent;
  teamTeaser: StudioAboutTeamTeaserContent;
  cta: StudioAboutCtaContent;
};

// This JSON-backed contract keeps About content aligned across local fallback, Supabase, and the internal editor.
export const studioAboutPageContent =
  aboutContent as StudioAboutPageContent;
