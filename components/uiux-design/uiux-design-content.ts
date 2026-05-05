export type UiuxDesignHeroContent = {
  title: string;
  subtitle: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type UiuxDesignPageContent = {
  hero: UiuxDesignHeroContent;
  bestFit?: { label: string; description: string };
  caseStudiesTitle: string;
  caseStudiesDescription: string;
  caseStudies: Array<{
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
  }>;
  approach?: {
    label: string;
    headline: string;
    principles: Array<{ title: string; description: string }>;
  };
  servicesTitle: string;
  services: Array<{
    title: string;
    description: string;
    iconKey: "palette" | "layout" | "smartphone" | "layoutDashboard";
  }>;
  pageTestimonial?: {
    label: string;
    quote: string;
    name: string;
    attribution: string;
  };
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};
