export type DigitalMarketingHeroContent = {
  title: string;
  subtitle: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type CaseStudyGalleryImage = {
  src: string;
  alt: string;
  label: string;
};

export type CaseStudyProofPoint = {
  iconKey: "barChart3" | "bot" | "layoutGrid" | "scanSearch" | "sparkles";
  title: string;
  description: string;
};

export type CaseStudyTestimonial = {
  quote: string;
  attribution: string;
};

export type DigitalMarketingCaseStudy = {
  slug: string;
  title: string;
  description: string;
  category: string;
  /** Service tag pills shown on the card and in the preview modal. */
  services?: string[];
  /** Outcome bullet points shown in the preview modal right rail. */
  outcomes?: string[];
  thumbnailSrc?: string;
  ctaLabel: string;
  /** Work gallery images shown in the modal below the cover image. */
  workGallery?: CaseStudyGalleryImage[];
  /** Three proof-point cards shown below the gallery. */
  proofPoints?: CaseStudyProofPoint[];
  /** Client testimonial shown at the bottom of the modal. */
  testimonial?: CaseStudyTestimonial;
};

export type DigitalMarketingPageContent = {
  hero: DigitalMarketingHeroContent;
  caseStudiesTitle: string;
  caseStudiesDescription: string;
  caseStudies: DigitalMarketingCaseStudy[];
  servicesTitle: string;
  services: Array<{
    title: string;
    description: string;
    iconKey: "megaphone" | "layout" | "penTool" | "lineChart";
  }>;
};

export const digitalMarketingPageContent: DigitalMarketingPageContent = {
  hero: {
    title: "Digital Marketing",
    subtitle: "Campaigns built for traction",
    description:
      "Positioning, landing pages, campaigns, and analytics systems that turn launches into measurable growth.",
    ctaLabel: "Start Your Project",
    ctaHref: "/#process",
  },
  caseStudiesTitle: "Digital Marketing Case Studies",
  caseStudiesDescription:
    "Proof from launch campaigns, positioning systems, and growth loops built for founders moving fast.",
  caseStudies: [
    {
      slug: "av-marathon",
      title: "AV Marathon",
      description:
        "Built a full-funnel campaign system for a city running community — turning each race season into repeatable growth.",
      category: "Sports Marketing",
      services: ["Campaign Strategy", "Brand Activation", "Community Growth"],
      outcomes: [
        "Doubled race season registrations with a community-first campaign system.",
        "Built repeatable email and social templates used across 4 race editions.",
        "Increased sponsor visibility through a professional brand identity rollout.",
        "Created word-of-mouth growth loops through post-race content.",
      ],
      thumbnailSrc: "/assets/av-marathon/marathon.png",
      ctaLabel: "View Case Study",
    },
    {
      slug: "rangasutra",
      title: "Rangasutra",
      description:
        "Crafted a digital brand narrative for an artisan collective turning Rajasthani craft heritage into a modern lifestyle story.",
      category: "Brand Storytelling",
      services: ["Brand Strategy", "Content System", "Community Growth"],
      outcomes: [
        "Elevated artisan stories into a premium lifestyle narrative.",
        "Built a content system connecting craft heritage to modern buyers.",
        "Increased community engagement through authentic visual storytelling.",
        "Created assets usable across e-commerce, social, and wholesale.",
      ],
      thumbnailSrc: "/assets/rangsutra/banner.png",
      ctaLabel: "View Case Study",
    },
    {
      slug: "tvam",
      title: "tvam",
      description:
        "Unified product narrative and campaign touchpoints to improve trust, response quality, and acquisition efficiency.",
      category: "Campaign Strategy",
      services: ["Positioning", "Landing Pages", "Analytics"],
      outcomes: [
        "Unified product messaging across all digital touchpoints.",
        "Improved lead quality through clearer positioning on landing pages.",
        "Reduced cost-per-acquisition with tighter campaign targeting.",
        "Built a scalable analytics foundation for ongoing optimization.",
      ],
      thumbnailSrc: "/assets/tvam/cover-summary.png",
      ctaLabel: "View Case Study",
    },
    {
      slug: "hemplanet",
      title: "Hemplanet",
      description:
        "Positioned a hemp-first lifestyle brand for digital growth with SEO-led content and performance campaigns.",
      category: "Sustainable Growth",
      services: ["Content Strategy", "SEO", "Campaign Ops"],
      outcomes: [
        "Grew organic search traffic through a structured SEO content system.",
        "Improved brand clarity for a hemp-first category still building trust.",
        "Launched performance campaigns that improved ROAS quarter over quarter.",
        "Built a content and distribution system usable across product launches.",
      ],
      thumbnailSrc: "/assets/hemplanet/hemplanet.webp",
      ctaLabel: "View Case Study",
    },
  ],
  servicesTitle: "Digital Marketing Services",
  services: [
    {
      title: "Positioning and launch messaging",
      description:
        "Craft category-aware launch narratives, value framing, and message hierarchy founders can scale across channels.",
      iconKey: "megaphone",
    },
    {
      title: "Landing pages and conversion systems",
      description:
        "Design and ship conversion-focused page systems with clear CTA hierarchy, offer sequencing, and trust architecture.",
      iconKey: "layout",
    },
    {
      title: "Campaign planning and creative operations",
      description:
        "Build repeatable campaign calendars, creative workflows, and channel execution loops that keep teams shipping.",
      iconKey: "penTool",
    },
    {
      title: "Analytics and growth experimentation",
      description:
        "Set up tracking, experiment design, and insight loops to turn campaign data into smarter growth decisions.",
      iconKey: "lineChart",
    },
  ],
};
