import type { Metadata } from "next";

import { CareersLandingPage } from "@/components/careers/careers-landing-page";
import { getJobsByLevel } from "@/lib/careers-data";
import { getAbsoluteUrl } from "@/lib/site";
import { getStudioHomepageContent } from "@/lib/studio-content";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Yuvabe Studios — an AI-first strategy, design, engineering, and growth studio for startups. Explore open roles across entry-level and experienced tracks.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers at Yuvabe Studios",
    description:
      "Build your career at an AI-first studio that works directly with ambitious startup founders.",
    url: "/careers",
  },
  twitter: {
    title: "Careers at Yuvabe Studios",
    description:
      "Build your career at an AI-first studio that works directly with ambitious startup founders.",
  },
};

export default async function CareersPage() {
  const homepageContent = await getStudioHomepageContent();
  const entryJobs = getJobsByLevel("entry");
  const experiencedJobs = getJobsByLevel("experienced");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Careers at Yuvabe Studios",
    url: getAbsoluteUrl("/careers"),
    description:
      "Open roles at Yuvabe Studios — AI-first strategy, design, engineering, and growth studio.",
    mainEntity: {
      "@type": "Organization",
      name: "Yuvabe Studios",
      url: getAbsoluteUrl("/"),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CareersLandingPage
        navigationItems={homepageContent.navigationItems}
        entryCount={entryJobs.length}
        experiencedCount={experiencedJobs.length}
      />
    </>
  );
}
