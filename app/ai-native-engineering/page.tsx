import type { Metadata } from "next";

import { AiNativeEngineeringPage } from "@/components/ai-native-engineering/ai-native-engineering-page";
import { getAbsoluteUrl } from "@/lib/site";
import {
  getStudioAiNativeEngineeringContent,
  getStudioHomepageContent,
} from "@/lib/studio-content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "AI-Native Engineering",
  description:
    "Product strategy, AI-native apps, and launch-ready engineering for B2B and B2C teams — one connected system from brief to build.",
  alternates: {
    canonical: "/ai-native-engineering",
  },
  openGraph: {
    title: "AI-Native Engineering | Yuvabe Studios",
    description:
      "See how Yuvabe Studios builds AI-native products, copilots, and full-stack systems for founders moving fast.",
    url: "/ai-native-engineering",
  },
  twitter: {
    title: "AI-Native Engineering | Yuvabe Studios",
    description:
      "Founder-focused AI engineering across product strategy, full-stack builds, workflow design, and technical architecture.",
  },
};

export default async function AiNativeEngineeringRoutePage() {
  const [homepageContent, aiNativeContent] = await Promise.all([
    getStudioHomepageContent(),
    getStudioAiNativeEngineeringContent(),
  ]);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "AI-Native Engineering | Yuvabe Studios",
    url: getAbsoluteUrl("/ai-native-engineering"),
    description:
      "Founder-focused AI product builds, copilot deployments, and full-stack engineering systems shipped for B2B and B2C teams.",
    isPartOf: {
      "@type": "WebSite",
      name: "Yuvabe Studios",
      url: getAbsoluteUrl("/"),
    },
    about: {
      "@type": "Thing",
      name: "AI-native engineering for startup products",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AiNativeEngineeringPage
        navigationItems={homepageContent.navigationItems}
        content={aiNativeContent}
      />
    </>
  );
}
