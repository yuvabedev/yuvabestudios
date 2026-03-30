import type { Metadata } from "next";

import type { StudioAboutPageContent } from "@/components/studio/studio-about-content";
import { StudioAboutPage } from "@/components/studio/studio-about-page";
import { getAbsoluteUrl } from "@/lib/site";
import { getStudioHomepageContent } from "@/lib/studio-content";

export const metadata: Metadata = {
  title: "About Preview",
  description:
    "Internal preview of the alternate Yuvabe About page copy direction.",
  alternates: {
    canonical: "/about-preview",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "About Preview | Yuvabe Studios",
    description:
      "Internal preview of the alternate Yuvabe About page copy direction.",
    url: getAbsoluteUrl("/about-preview"),
  },
  twitter: {
    title: "About Preview | Yuvabe Studios",
    description:
      "Internal preview of the alternate Yuvabe About page copy direction.",
  },
};

// This preview payload keeps the alternate About direction local to the route so production content stays Supabase-backed.
const previewContent: StudioAboutPageContent = {
  hero: {
    eyebrow: "About Preview",
    title: "You will work with the people who built",
    highlight: "it.",
    description:
      "Yuvabe is an AI-first studio from Auroville for founders who need sharper decisions, faster execution, and a team that stays close as the work gets real.",
    supportingLine: "",
    primaryCtaLabel: "Start Your Project",
    primaryCtaHref: "/#process",
    secondaryCtaLabel: "See Our Work",
    secondaryCtaHref: "/#work",
    callouts: [
      {
        label: "Founded",
        value: "2020, Auroville",
        description:
          "We started with a simple principle: slow down before speeding up, ask the harder question, and stay close to the problem.",
      },
      {
        label: "How we work",
        value: "One connected loop",
        description:
          "Strategy, design, engineering, and growth stay in the same room instead of getting split across handoffs.",
      },
      {
        label: "Best fit",
        value: "0-to-1 and traction-stage startups",
        description:
          "Founders who want a partner to help make the right bet, not just execute the brief faster.",
      },
    ],
  },
  story: {
    eyebrow: "How Yuvabe began",
    title: "Started in Auroville. Built for sharper bets",
    paragraphs: [
      "We started in Auroville in 2020 with a simple operating principle: slow down before speeding up, ask the harder question, and stay close to the problem. That place taught us to care about the long view, the craft, and the quality of the decisions made before momentum takes over.",
      "What changed is the environment around us. AI has made shipping faster and cheaper, but it has also made it easier for teams to move quickly in the wrong direction. Yuvabe evolved into an AI-first studio because founders now need more than execution. They need help deciding what is worth building in the first place.",
      "What we care about now is keeping strategy, product thinking, engineering, and growth connected so the original thinking holds up once the work starts moving.",
    ],
    operatingPrinciples: [
      {
        title: "Stay close to the problem",
        description:
          "We look for the real constraint early, before the roadmap fills up with expensive guesses.",
      },
      {
        title: "Push for the sharper call",
        description:
          "If the brief is wrong, we would rather say it in week two than discover it after the product is already built.",
      },
      {
        title: "Keep context intact",
        description:
          "The people shaping the direction stay involved through design, engineering, launch, and the next round of learning.",
      },
    ],
  },
  workflow: {
    eyebrow: "How we work",
    title: "A connected loop, not a handoff wall",
    description:
      "Most teams split strategy, design, engineering, and growth into separate tracks. We keep them connected.",
    stages: [
      {
        label: "Strategy",
        description:
          "Pressure-test the assumption, define the problem clearly, and decide what matters before the roadmap fills up.",
      },
      {
        label: "Design",
        description:
          "Shape the experience, interface, and product story people actually interact with, not a deck to be handed off.",
      },
      {
        label: "Engineering",
        description:
          "Build the product, systems, and AI workflows that turn the strategy into something usable, reliable, and ready to ship.",
      },
      {
        label: "Growth",
        description:
          "Launch, read the signal, and make the next move clearer based on what users actually do, not what we hoped they would do.",
      },
    ],
  },
  proof: {
    eyebrow: "Selected work",
    title: "A few places we've done this.",
    description:
      "Different sectors, same job: help teams make a stronger bet and build it well.",
    entries: [
      {
        client: "TVAM",
        sector: "Health, insurance, and AI",
        summary:
          "Built an AI advisor using RAG, secure chat flows, and cloud infrastructure so complex advisory workflows could scale without adding more friction.",
      },
      {
        client: "Bevolve",
        sector: "ESG intelligence and compliance",
        summary:
          "Turned fragmented ESG reporting into a product with automated workflows, benchmarking, and clearer decision support.",
      },
      {
        client: "KittyKat",
        sector: "Fashion ecommerce and generative AI",
        summary:
          "Reframed fashion production from optimizing the photoshoot to replacing it with a product-to-model generative pipeline built for scale.",
      },
      {
        client: "AgeShift",
        sector: "AI wellness platform",
        summary:
          "Delivered the mobile app, backend, admin tooling, and AI recommendation workflows as one product system instead of separate workstreams.",
      },
    ],
  },
  values: {
    eyebrow: "What founders notice",
    title: "Standards that show up in the work",
    description:
      "We are less interested in sounding impressive than in being useful when the decisions are hard.",
    values: [
      {
        title: "Care",
        description:
          "We pay attention to people, product decisions, and the details that usually get dismissed as someone else's problem.",
      },
      {
        title: "Courage",
        description:
          "We say the uncomfortable thing early, question assumptions, and push back on the brief when that is what the work needs.",
      },
      {
        title: "Creativity",
        description:
          "We look for the simpler, stronger path through hard product and technical problems, especially when the obvious answer is the wrong one.",
      },
    ],
    principles: ["MakeBetterBets", "StayClose", "SayTheHardThing", "BuildWithCare"],
  },
  teamTeaser: {
    eyebrow: "Small team, deep involvement",
    title: "You do not get a pitch team and a delivery team.",
    description:
      "The people shaping the product stay in the conversation from the first call to the first launch. That is deliberate.",
    points: [
      "Small, senior team with direct involvement from strategy through launch",
      "Cross-functional collaboration across product, design, engineering, and growth",
      "A close working style built for founders who want honesty, momentum, and fewer handoff gaps",
    ],
  },
  cta: {
    eyebrow: "Start the conversation",
    title: "Tell us what you are building.",
    description:
      "We work best with founders who want honest thinking, close collaboration, and help figuring out the right move before the work gets expensive.",
    primaryCtaLabel: "Start Your Project",
    primaryCtaHref: "/#process",
    secondaryCtaLabel: "See Our Work",
    secondaryCtaHref: "/#work",
  },
};

export default async function AboutPreviewPage() {
  const homepageContent = await getStudioHomepageContent();

  return (
    <StudioAboutPage
      navigationItems={homepageContent.navigationItems}
      content={previewContent}
    />
  );
}
