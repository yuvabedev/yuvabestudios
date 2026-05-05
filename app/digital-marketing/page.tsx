import type { Metadata } from "next";

import { DigitalMarketingPage } from "@/components/digital-marketing/digital-marketing-page";
import { getAbsoluteUrl } from "@/lib/site";
import {
  getStudioDigitalMarketingContent,
  getStudioHomepageContent,
} from "@/lib/studio-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Digital Marketing",
  description:
    "Campaigns built for traction across positioning, landing pages, growth loops, and analytics for startup teams.",
  alternates: {
    canonical: "/digital-marketing",
  },
  openGraph: {
    title: "Digital Marketing | Yuvabe Studios",
    description:
      "See how Yuvabe Studios builds digital marketing systems that turn launches into measurable traction.",
    url: "/digital-marketing",
  },
  twitter: {
    title: "Digital Marketing | Yuvabe Studios",
    description:
      "Founder-focused digital marketing across positioning, campaigns, landing pages, and analytics loops.",
  },
};

export default async function DigitalMarketingRoutePage() {
  const [homepageContent, digitalMarketingContent] = await Promise.all([
    getStudioHomepageContent(),
    getStudioDigitalMarketingContent(),
  ]);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Digital Marketing | Yuvabe Studios",
    url: getAbsoluteUrl("/digital-marketing"),
    description:
      "Founder-focused campaign systems built for traction, from positioning and landing pages to analytics and growth loops.",
    isPartOf: {
      "@type": "WebSite",
      name: "Yuvabe Studios",
      url: getAbsoluteUrl("/"),
    },
    about: {
      "@type": "Thing",
      name: "Digital marketing for startup traction",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <DigitalMarketingPage
        navigationItems={homepageContent.navigationItems}
        content={digitalMarketingContent}
      />
    </>
  );
}
