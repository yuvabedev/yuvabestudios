import uiuxDesignContent from "@/components/studio/data/studio-uiux-design-content.json";

export type StudioUiuxDesignHeroContent = {
  title: string;
  subtitle: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type StudioUiuxDesignCaseStudy = {
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

export type StudioUiuxDesignServiceItem = {
  title: string;
  description: string;
  iconKey: "palette" | "layout" | "smartphone" | "layoutDashboard";
};

export type StudioUiuxDesignBestFit = {
  label: string;
  description: string;
};

export type StudioUiuxDesignApproachPrinciple = {
  title: string;
  description: string;
};

export type StudioUiuxDesignApproach = {
  label: string;
  headline: string;
  principles: StudioUiuxDesignApproachPrinciple[];
};

export type StudioUiuxDesignPageTestimonial = {
  label: string;
  quote: string;
  name: string;
  attribution: string;
};

export type StudioUiuxDesignContent = {
  hero: StudioUiuxDesignHeroContent;
  bestFit?: StudioUiuxDesignBestFit;
  caseStudiesTitle: string;
  caseStudiesDescription: string;
  caseStudies: StudioUiuxDesignCaseStudy[];
  approach?: StudioUiuxDesignApproach;
  servicesTitle: string;
  services: StudioUiuxDesignServiceItem[];
  pageTestimonial?: StudioUiuxDesignPageTestimonial;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

export const studioUiuxDesignContent =
  uiuxDesignContent as StudioUiuxDesignContent;
