import type { Metadata } from "next";

import { ServicesPage } from "@/components/services/services-page";
import { getAbsoluteUrl } from "@/lib/site";
import { getStudioHomepageContent } from "@/lib/studio-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Digital marketing, UI/UX design and development, AI-native engineering, and market research — one AI-native studio helping founders decide, build, and grow.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | Yuvabe Studios",
    description:
      "One AI-native studio for strategy, design, engineering, and growth. Explore Yuvabe Studios' services for startup teams.",
    url: "/services",
  },
  twitter: {
    title: "Services | Yuvabe Studios",
    description:
      "Digital marketing, UI/UX, AI-native engineering, and market research — one connected studio for founders.",
  },
};

export default async function ServicesRoutePage() {
  const homepageContent = await getStudioHomepageContent();

  const services = [
    "Digital Marketing",
    "UI/UX Design & Development",
    "AI-Native Engineering",
    "Market Research",
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Services | Yuvabe Studios",
    url: getAbsoluteUrl("/services"),
    description:
      "One AI-native studio for strategy, design, engineering, and growth: digital marketing, UI/UX design and development, AI-native engineering, and market research.",
    isPartOf: {
      "@type": "WebSite",
      name: "Yuvabe Studios",
      url: getAbsoluteUrl("/"),
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: services.map((name, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ServicesPage navigationItems={homepageContent.navigationItems} />
    </>
  );
}
