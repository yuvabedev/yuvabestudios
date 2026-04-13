import type { Metadata } from "next";

import { StudioAiWorkflowsPage } from "@/components/studio/studio-ai-workflows-page";
import { getAbsoluteUrl } from "@/lib/site";
import {
  getStudioAiWorkflowsContent,
  getStudioHomepageContent,
} from "@/lib/studio-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AI Workflows",
  description:
    "See how Yuvabe Studios infuses AI into strategy, design, engineering, and growth workflows to help founders make better bets and learn faster.",
  alternates: {
    canonical: "/ai-workflows",
  },
  openGraph: {
    title: "AI Workflows | Yuvabe Studios",
    description:
      "AI-first workflows across strategy, design, engineering, and growth for founders who need sharper decisions and faster traction.",
    url: "/ai-workflows",
  },
  twitter: {
    title: "AI Workflows | Yuvabe Studios",
    description:
      "How Yuvabe Studios uses AI inside strategy, design, engineering, and growth workflows to create better bets and faster learning.",
  },
};

export default async function AiWorkflowsPage() {
  const [homepageContent, aiWorkflowsContent] = await Promise.all([
    getStudioHomepageContent(),
    getStudioAiWorkflowsContent(),
  ]);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "AI Workflows | Yuvabe Studios",
    url: getAbsoluteUrl("/ai-workflows"),
    description:
      "How Yuvabe Studios infuses AI into strategy, design, engineering, and growth workflows to help founders make better product bets.",
    isPartOf: {
      "@type": "WebSite",
      name: "Yuvabe Studios",
      url: getAbsoluteUrl("/"),
    },
    about: {
      "@type": "Thing",
      name: "AI-native product workflows",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <StudioAiWorkflowsPage
        navigationItems={homepageContent.navigationItems}
        content={aiWorkflowsContent}
      />
    </>
  );
}
