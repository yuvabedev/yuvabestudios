import aiWorkflowsContent from "@/components/studio/data/studio-ai-workflows-content.json";

export type StudioAiWorkflowsHeroContent = {
  eyebrow: string;
  titleLineOne: string;
  titleLineTwo: string;
  description: string;
};

export type StudioAiWorkflowsStageContent = {
  step: string;
  title: string;
  eyebrow: string;
  description: string;
  bullets: string[];
  iconKey: string;
  tone: "tintLavender" | "tintWarm" | "tintCyan" | "tintGreen";
};

export type StudioAiWorkflowsDisciplineItem = {
  title: string;
  description: string;
  bullets: string[];
  iconKey: string;
};

export type StudioAiWorkflowsGuardrailItem = {
  title: string;
  description: string;
  iconKey: string;
};

export type StudioAiWorkflowsCtaContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
};

export type StudioAiWorkflowsContent = {
  hero: StudioAiWorkflowsHeroContent;
  workflow: {
    eyebrow: string;
    title: string;
    description: string;
    stages: StudioAiWorkflowsStageContent[];
  };
  disciplines: {
    eyebrow: string;
    title: string;
    description: string;
    items: StudioAiWorkflowsDisciplineItem[];
  };
  guardrails: {
    eyebrow: string;
    title: string;
    description: string;
    items: StudioAiWorkflowsGuardrailItem[];
  };
  cta: StudioAiWorkflowsCtaContent;
};

// This JSON-backed contract keeps AI Workflows content aligned across local fallback, Supabase, and the internal editor.
export const studioAiWorkflowsContent =
  aiWorkflowsContent as StudioAiWorkflowsContent;
