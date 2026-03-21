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

export type StudioHomepageServiceItem = {
  title: string;
  shortLabel: string;
  description: string;
};

export type StudioHomepageServicesContent = {
  eyebrow: string;
  headline: string;
  supportPrefix: string;
  supportHighlight: string;
  supportSuffix: string;
  items: StudioHomepageServiceItem[];
};

export type StudioHomepageContent = {
  navigationItems: StudioHomepageNavItem[];
  hero: StudioHomepageHeroContent;
  services: StudioHomepageServicesContent;
  work: StudioHomepageWorkContent;
};
