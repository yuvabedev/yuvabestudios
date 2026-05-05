import aiNativeContent from "@/components/studio/data/studio-ai-native-engineering-content.json";

export type StudioAiNativeEngineeringHeroContent = {
  title: string;
  subtitle: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type StudioAiNativeEngineeringCaseStudy = {
  slug: string;
  title: string;
  description: string;
  category: string;
  services?: string[];
  outcomes?: string[];
  thumbnailSrc?: string;
  ctaLabel: string;
  workGallery?: Array<{ src: string; alt: string; label: string }>;
  proofPoints?: Array<{ iconKey: "barChart3" | "bot" | "layoutGrid" | "scanSearch" | "sparkles"; title: string; description: string }>;
  testimonial?: { quote: string; attribution: string };
};

export type StudioAiNativeEngineeringServiceItem = {
  title: string;
  description: string;
  iconKey: "cpu" | "database" | "bot" | "cloud";
};

export type StudioAiNativeEngineeringBestFit = {
  label: string;
  description: string;
};

export type StudioAiNativeEngineeringApproachPrinciple = {
  title: string;
  description: string;
};

export type StudioAiNativeEngineeringApproach = {
  label: string;
  headline: string;
  principles: StudioAiNativeEngineeringApproachPrinciple[];
};

export type StudioAiNativeEngineeringPageTestimonial = {
  label: string;
  quote: string;
  name: string;
  attribution: string;
};

export type StudioAiNativeEngineeringContent = {
  hero: StudioAiNativeEngineeringHeroContent;
  bestFit?: StudioAiNativeEngineeringBestFit;
  caseStudiesTitle: string;
  caseStudiesDescription: string;
  caseStudies: StudioAiNativeEngineeringCaseStudy[];
  approach?: StudioAiNativeEngineeringApproach;
  servicesTitle: string;
  services: StudioAiNativeEngineeringServiceItem[];
  pageTestimonial?: StudioAiNativeEngineeringPageTestimonial;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

export const studioAiNativeEngineeringContent =
  aiNativeContent as StudioAiNativeEngineeringContent;
