import type { Metadata } from "next";

import type { StudioAboutPageContent } from "@/components/studio/studio-about-content";
import { StudioAboutPage } from "@/components/studio/studio-about-page";
import { getAbsoluteUrl } from "@/lib/site";
import { getStudioHomepageContent } from "@/lib/studio-content";

export const metadata: Metadata = {
  title: "About Preview POV",
  description:
    "Internal preview of the POV-led Yuvabe About page direction.",
  alternates: {
    canonical: "/about-preview-pov",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "About Preview POV | Yuvabe Studios",
    description:
      "Internal preview of the POV-led Yuvabe About page direction.",
    url: getAbsoluteUrl("/about-preview-pov"),
  },
  twitter: {
    title: "About Preview POV | Yuvabe Studios",
    description:
      "Internal preview of the POV-led Yuvabe About page direction.",
  },
};

// This preview payload isolates the sharper POV-led About direction so it can be reviewed without touching production content.
const previewContent: StudioAboutPageContent = {
  hero: {
    eyebrow: "About Preview / POV",
    title: "Most startups do not fail from bad",
    highlight: "execution.",
    description:
      "They fail from executing clearly on the wrong thing. Yuvabe is an AI-first studio from Auroville built to help founders figure out which bet is actually worth making before speed turns into waste.",
    supportingLine: "",
    primaryCtaLabel: "Start Your Project",
    primaryCtaHref: "/#process",
    secondaryCtaLabel: "See Our Work",
    secondaryCtaHref: "/#work",
    callouts: [
      {
        label: "What changed",
        value: "Building got cheaper",
        description:
          "AI has lowered the mechanics of shipping. More teams can build faster than ever before.",
      },
      {
        label: "What got harder",
        value: "Knowing what matters",
        description:
          "The real risk now is making the wrong call early and scaling it with confidence.",
      },
      {
        label: "Why Yuvabe",
        value: "A sharper operating model",
        description:
          "We keep strategy, design, engineering, and growth close enough that the original thinking survives contact with reality.",
      },
    ],
  },
  story: {
    eyebrow: "Why this studio exists",
    title: "Started in Auroville. Built to correct drift",
    paragraphs: [
      "We started in Auroville in 2020, a place that takes long-term thinking seriously. That shaped how we work. We care about decisions made on day one still holding up on day three hundred.",
      "What pushed Yuvabe into its current form was simple: AI changed the economics of building, but not the quality of the bets teams make. Shipping got faster. Deciding what deserved to be shipped did not.",
      "That is the problem we care about now. Help founders shorten the distance between we have an idea and we know which direction is worth committing to.",
    ],
    operatingPrinciples: [
      {
        title: "Question the obvious answer",
        description:
          "The first solution is often just the familiar one. We look for the bet underneath it.",
      },
      {
        title: "Keep the risk visible",
        description:
          "We do not hide the hard call behind velocity. If the assumption is weak, we say it early.",
      },
      {
        title: "Learn in the work",
        description:
          "Strategy should keep getting sharper as design, engineering, launch, and growth produce real signal.",
      },
    ],
  },
  workflow: {
    eyebrow: "How we work",
    title: "Built for founders, not handoffs",
    description:
      "Most agencies are designed to execute a brief. We are designed to keep thinking, building, and learning in one loop.",
    stages: [
      {
        label: "Strategy",
        description:
          "Pressure-test the idea, surface the core assumption, and decide what is actually worth solving first.",
      },
      {
        label: "Design",
        description:
          "Turn the bet into an experience people can understand, trust, and respond to.",
      },
      {
        label: "Engineering",
        description:
          "Build the product, systems, and AI workflows that make the decision real instead of theoretical.",
      },
      {
        label: "Growth",
        description:
          "Watch the signal after launch and use it to decide what the next move should be.",
      },
    ],
  },
  proof: {
    eyebrow: "Selected work",
    title: "A few bets we helped make clearer.",
    description:
      "The sectors differ. The pattern does not. Find the real constraint, build around it, and keep the learning loop alive.",
    entries: [
      {
        client: "TVAM",
        sector: "Health, insurance, and AI",
        summary:
          "Instead of scaling advisory through more people, we helped turn the capability into an AI advisor with RAG, secure chat flows, and cloud infrastructure.",
      },
      {
        client: "Bevolve",
        sector: "ESG intelligence and compliance",
        summary:
          "Rather than digitize a reporting mess, we helped shape a product that unified ESG data, benchmarking, and automated workflows into one system.",
      },
      {
        client: "KittyKat",
        sector: "Fashion ecommerce and generative AI",
        summary:
          "The obvious answer was a better photoshoot workflow. The stronger bet was a product-to-model generative pipeline built for speed and scale.",
      },
      {
        client: "General Aeronautics",
        sector: "Drone technology, web, and marketing",
        summary:
          "The work spanned product UI, website, branding, and content so the company could present a clearer story as it matured.",
      },
    ],
  },
  values: {
    eyebrow: "What this feels like",
    title: "Opinionated where it matters",
    description:
      "We are calm in execution, but not neutral about bad assumptions, weak briefs, or avoidable drift.",
    values: [
      {
        title: "Clarity",
        description:
          "We would rather make the real problem obvious than hide it behind polished deliverables.",
      },
      {
        title: "Courage",
        description:
          "We say the harder thing early, especially when the easy answer would be more comfortable.",
      },
      {
        title: "Leverage",
        description:
          "AI matters when it improves decisions, speed, and economics, not when it is just a label added to the deck.",
      },
    ],
    principles: ["QuestionTheBrief", "MakeTheBetClear", "LearnFast", "StayUseful"],
  },
  teamTeaser: {
    eyebrow: "Who this suits",
    title: "Best for founders who want pushback, not just output.",
    description:
      "We work best with teams building something genuinely hard and willing to hear the sharper call when the brief is off.",
    points: [
      "Founders who want help deciding what to build, not only how to ship it",
      "Teams that value context, honesty, and direct involvement over process theatre",
      "Projects where product, engineering, and growth need to stay aligned after launch",
    ],
  },
  cta: {
    eyebrow: "Start the conversation",
    title: "Tell us what bet you are trying to make.",
    description:
      "If the direction is still taking shape, that is exactly when we are most useful.",
    primaryCtaLabel: "Start Your Project",
    primaryCtaHref: "/#process",
    secondaryCtaLabel: "See Our Work",
    secondaryCtaHref: "/#work",
  },
};

export default async function AboutPreviewPovPage() {
  const homepageContent = await getStudioHomepageContent();

  return (
    <StudioAboutPage
      navigationItems={homepageContent.navigationItems}
      content={previewContent}
    />
  );
}
