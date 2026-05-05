import type { Metadata } from "next";

import { UiuxDesignPage } from "@/components/uiux-design/uiux-design-page";
import { getAbsoluteUrl } from "@/lib/site";
import {
  getStudioHomepageContent,
  getStudioUiuxDesignContent,
} from "@/lib/studio-content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "UI/UX Design",
  description:
    "Research-led design, product flows, and visual systems built for clarity, conversion, and the real contexts founders are shipping into.",
  alternates: {
    canonical: "/uiux-design",
  },
  openGraph: {
    title: "UI/UX Design | Yuvabe Studios",
    description:
      "See how Yuvabe Studios designs product interfaces, design systems, and user flows that turn early products into trusted experiences.",
    url: "/uiux-design",
  },
  twitter: {
    title: "UI/UX Design | Yuvabe Studios",
    description:
      "Founder-focused product design across UX flows, design systems, user research, and high-fidelity prototyping.",
  },
};

export default async function UiuxDesignRoutePage() {
  const [homepageContent, uiuxContent] = await Promise.all([
    getStudioHomepageContent(),
    getStudioUiuxDesignContent(),
  ]);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "UI/UX Design | Yuvabe Studios",
    url: getAbsoluteUrl("/uiux-design"),
    description:
      "Research-led product design, interface systems, and visual language work shipped for founders who care about how things feel.",
    isPartOf: {
      "@type": "WebSite",
      name: "Yuvabe Studios",
      url: getAbsoluteUrl("/"),
    },
    about: {
      "@type": "Thing",
      name: "UI/UX design for startup products",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <UiuxDesignPage
        navigationItems={homepageContent.navigationItems}
        content={uiuxContent}
      />
    </>
  );
}
