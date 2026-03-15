import {
  BarChart3,
  Bot,
  LayoutGrid,
  type LucideIcon,
  ScanSearch,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";

import type { StudioCaseStudyMockCardLayout, StudioCaseStudyMockVariant } from "@/components/studio/studio-case-study-mock-card";

export type StudioCaseStudyId = "general-aeronautics" | "bevolve" | "tvam" | "kittykat" | "ageshift" | "general-aeronautics-ops";

export type StudioCaseStudySection = {
  title: string;
  body: string;
};

export type StudioCaseStudyProofPoint = {
  title: string;
  description: string;
  icon?: LucideIcon;
};

export type StudioCaseStudyGalleryItem = {
  title: string;
  description: string;
};

export type StudioCaseStudyGalleryRow = {
  title: string;
  items: StudioCaseStudyGalleryItem[];
};

export type StudioCaseStudyTestimonial = {
  quote: string;
  attribution: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type StudioCaseStudySummary = {
  id: StudioCaseStudyId;
  sector: string;
  title: string;
  summary: string;
  services: string[];
  media: ReactNode;
  mockImageSrc?: string;
  mockImageAlt?: string;
  mockVariant?: StudioCaseStudyMockVariant;
  mockLayout?: StudioCaseStudyMockCardLayout;
  mockImageClassName?: string;
  size?: "default" | "feature";
  modalIntro?: string;
  modalOutcomes?: string[];
  modalSections?: StudioCaseStudySection[];
  modalProofPoints?: StudioCaseStudyProofPoint[];
  modalGalleryRows?: StudioCaseStudyGalleryRow[];
  modalTestimonial?: StudioCaseStudyTestimonial;
};

function CaseStudyIcon({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon className="size-24 stroke-[1.4] text-[color:color-mix(in_srgb,var(--neutral-700)_82%,var(--lavender-500)_18%)]" />;
}

// This shared content keeps the cards and the expanded light modal synchronized around the same named proof.
export const studioCaseStudies: StudioCaseStudySummary[] = [
  {
    id: "general-aeronautics",
    sector: "Aviation technology",
    title: "General Aeronautics",
    summary: "Turned a complex drone portfolio into a clearer digital story buyers, partners, and operators could trust faster.",
    services: ["Positioning", "UX/UI", "Brand system"],
    mockImageSrc: "/assets/GA_cover.png",
    mockImageAlt: "General Aeronautics mobile product mock",
    mockVariant: "aurora",
    modalIntro:
      "General Aeronautics builds drone systems across agriculture, defense, humanitarian response, and warehouse automation. As the business expanded, its digital presence needed to explain that breadth with more clarity, confidence, and usability.",
    modalOutcomes: [
      "Reframed a broad product portfolio into a sharper market story.",
      "Made technical capabilities easier for non-technical audiences to understand.",
      "Improved credibility across web, applications, and communication assets.",
      "Created a stronger base for future product and growth decisions.",
    ],
    modalSections: [
      {
        title: "Context",
        body: "General Aeronautics had real depth across multiple drone use cases, but that range was hard to communicate cleanly in one digital experience. The company needed a presence that could reflect both engineering sophistication and real-world relevance.",
      },
      {
        title: "Challenge",
        body: "Without a clearer narrative, technical breadth risked reading as fragmentation. Buyers, partners, and operators needed a simpler path through what the company offered and why it mattered.",
      },
      {
        title: "What we changed",
        body: "Yuvabe paired a website revamp with brand refresh, UI/UX work, and supporting content systems so product, communication, and credibility cues reinforced each other instead of competing for attention.",
      },
      {
        title: "Outcome",
        body: "The result was a sharper story for the business, more intuitive interfaces, and a stronger platform for future launches, product communication, and brand growth.",
      },
    ],
    modalGalleryRows: [
      {
        title: "Brand and product views",
        items: [
          {
            title: "Positioning-led homepage",
            description: "A clearer first impression that communicates the scope of the drone portfolio without overwhelming buyers.",
          },
          {
            title: "Product communication system",
            description: "A more structured way to present agricultural, defense, and automation capabilities across web and supporting assets.",
          },
        ],
      },
      {
        title: "Interface and proof layers",
        items: [
          {
            title: "Application UX direction",
            description: "Research and interface decisions that made complex workflows easier to understand and navigate.",
          },
          {
            title: "Content and campaign assets",
            description: "Illustrations, video, blogs, and social creatives built to keep the story consistent beyond the website.",
          },
        ],
      },
    ],
    modalProofPoints: [
      {
        title: "Sharpened market story",
        description: "Turned a complex product portfolio into a clearer business narrative buyers and partners could trust faster.",
        icon: ScanSearch,
      },
      {
        title: "Unified touchpoints",
        description: "Aligned website, product UX, and supporting communication assets into one more coherent system.",
        icon: LayoutGrid,
      },
      {
        title: "Built for scale",
        description: "Created a stronger base for future launches, campaigns, and product communication decisions.",
        icon: Sparkles,
      },
    ],
    modalTestimonial: {
      quote:
        "The engagement turned a technically strong business into a much clearer market story. Product, brand, and communication started working together instead of asking buyers to piece it together on their own.",
      attribution: "General Aeronautics engagement",
      ctaLabel: "See more work",
      ctaHref: "#work",
    },
    media: <CaseStudyIcon icon={LayoutGrid} />,
    size: "feature",
  },
  {
    id: "bevolve",
    sector: "ESG intelligence",
    title: "Bevolve.ai",
    summary:
      "Turned fragmented sustainability reporting into an AI-guided system teams could trust for faster, evidence-based decisions.",
    services: ["AI integration", "ML", "ESG reporting"],
    mockImageSrc: "/assets/Bevolve_cover.png",
    mockImageAlt: "Bevolve.ai product experience mock",
    mockVariant: "sunrise",
    modalIntro:
      "Bevolve.ai needed a product experience that could bring together fragmented ESG and sustainability data, automate reporting workflows, and make decision support easier for teams navigating compliance pressure.",
    modalOutcomes: [
      "Unified structured and unstructured ESG data into one clearer workflow.",
      "Accelerated reporting, validation, and compliance monitoring through automation.",
      "Improved transparency with natural-language querying and AI-assisted analysis.",
      "Enabled stronger benchmarking across sectors, regions, and peer groups.",
    ],
    modalSections: [
      {
        title: "Context",
        body: "Bevolve.ai sits at the intersection of ESG reporting, sustainability intelligence, and compliance automation. The product needed to handle complex data while still giving teams a usable, credible decision-making experience.",
      },
      {
        title: "Challenge",
        body: "The core problem was not just data volume but trust. Teams needed reporting workflows that could connect multiple data sources, maintain accuracy, and stay understandable as standards evolved.",
      },
      {
        title: "What we changed",
        body: "Yuvabe helped shape an AI sustainability platform with GPT-powered assistance, benchmarking workflows, AI-guided insights, and automation across reporting, validation, and compliance monitoring.",
      },
      {
        title: "Outcome",
        body: "The resulting system gave teams a faster, more transparent path through ESG reporting and benchmarking while improving confidence in evidence-based decisions.",
      },
    ],
    modalGalleryRows: [
      {
        title: "Platform experience",
        items: [
          {
            title: "Reporting workflow",
            description: "A clearer system for collecting, validating, and automating ESG reporting across multiple data sources.",
          },
          {
            title: "AI-assisted review",
            description: "Natural-language querying and GPT-powered guidance to help teams move through analysis faster.",
          },
        ],
      },
      {
        title: "Insight layers",
        items: [
          {
            title: "Benchmarking engine",
            description: "A decision-support layer for comparing ESG performance across industries, peers, and geographies.",
          },
          {
            title: "Heat maps and signals",
            description: "AI-driven visibility layers that make patterns easier to read without forcing users through raw spreadsheets.",
          },
        ],
      },
    ],
    modalProofPoints: [
      {
        title: "Connected fragmented data",
        description: "Unified diverse ESG and GHG inputs into one more manageable reporting and compliance flow.",
        icon: Bot,
      },
      {
        title: "Improved decision support",
        description: "Added AI-guided insight generation, benchmarking, and natural-language access to speed up review workflows.",
        icon: BarChart3,
      },
      {
        title: "Raised trust and usability",
        description: "Made complex sustainability reporting easier to understand while preserving transparency and rigor.",
        icon: Sparkles,
      },
    ],
    modalTestimonial: {
      quote:
        "The platform became easier to trust because the reporting flow, AI guidance, and decision support finally felt like one system. That clarity made complex ESG work faster to navigate and easier to act on.",
      attribution: "Bevolve.ai engagement",
      ctaLabel: "See more work",
      ctaHref: "#work",
    },
    media: <CaseStudyIcon icon={Bot} />,
  },
];




