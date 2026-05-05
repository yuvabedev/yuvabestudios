import digitalMarketingContent from "@/components/studio/data/studio-digital-marketing-content.json";

export type StudioDigitalMarketingHeroContent = {
  title: string;
  subtitle: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type StudioDigitalMarketingCaseStudy = {
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

export type StudioDigitalMarketingServiceItem = {
  title: string;
  description: string;
  iconKey: "megaphone" | "layout" | "penTool" | "lineChart";
};

export type StudioDigitalMarketingBestFit = {
  label: string;
  description: string;
};

export type StudioDigitalMarketingApproachPrinciple = {
  title: string;
  description: string;
};

export type StudioDigitalMarketingApproach = {
  label: string;
  headline: string;
  principles: StudioDigitalMarketingApproachPrinciple[];
};

export type StudioDigitalMarketingPageTestimonial = {
  label: string;
  quote: string;
  name: string;
  attribution: string;
};

export type StudioDigitalMarketingContent = {
  hero: StudioDigitalMarketingHeroContent;
  bestFit?: StudioDigitalMarketingBestFit;
  caseStudiesTitle: string;
  caseStudiesDescription: string;
  caseStudies: StudioDigitalMarketingCaseStudy[];
  approach?: StudioDigitalMarketingApproach;
  servicesTitle: string;
  services: StudioDigitalMarketingServiceItem[];
  pageTestimonial?: StudioDigitalMarketingPageTestimonial;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

// JSON-backed contract keeps Digital Marketing content aligned across local fallback, Supabase, and the internal editor.
export const studioDigitalMarketingContent =
  digitalMarketingContent as StudioDigitalMarketingContent;
