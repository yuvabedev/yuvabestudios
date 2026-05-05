export type StudioHomepageNavItem = {
  label: string;
  href: string;
};

export type StudioHomepageHeroContent = {
  headlineIntro: string;
  headlineHighlight: string;
  headlineLineTwo: string;
  supportPrefix: string;
  supportHighlight: string;
  ctaLabel: string;
  ctaHref: string;
};

export type StudioHomepageWorkContent = {
  eyebrow: string;
  headline: string;
  supportPrefix: string;
  supportHighlight: string;
  supportSuffix: string;
};

export type StudioHomepageInlineCtaContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
};

export type StudioHomepageServiceItem = {
  title: string;
  shortLabel: string;
  description: string;
  href?: string;
};

export type StudioHomepageServicesContent = {
  eyebrow: string;
  headline: string;
  supportPrefix: string;
  supportHighlight: string;
  supportSuffix: string;
  items: StudioHomepageServiceItem[];
};

export type StudioHomepageTestimonialsContent = {
  eyebrow: string;
  headline: string;
  supportPrefix: string;
  supportHighlight: string;
  supportSuffix: string;
  items: Array<{
    quote: string;
    name: string;
    attribution?: string;
  }>;
};

export type StudioHomepageContent = {
  navigationItems: StudioHomepageNavItem[];
  hero: StudioHomepageHeroContent;
  services: StudioHomepageServicesContent;
  afterServicesCta: StudioHomepageInlineCtaContent;
  testimonials: StudioHomepageTestimonialsContent;
  beforeTestimonialsCta: StudioHomepageInlineCtaContent;
  work: StudioHomepageWorkContent;
};
