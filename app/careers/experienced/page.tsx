import type { Metadata } from "next";

import { CareersListingPage } from "@/components/careers/careers-listing-page";
import { getJobsByLevel } from "@/services/careers.service";
import { getAbsoluteUrl } from "@/lib/site";
import { getStudioHomepageContent } from "@/lib/studio-content";

export const metadata: Metadata = {
  title: "Experienced Roles",
  description:
    "Senior openings at Yuvabe Studios — for practitioners who want ownership, not just execution. Lead engagements and shape the discipline.",
  alternates: {
    canonical: "/careers/experienced",
  },
  openGraph: {
    title: "Experienced Careers at Yuvabe Studios",
    description:
      "Lead client engagements, mentor the team, and shape how disciplines operate at an AI-first studio.",
    url: "/careers/experienced",
  },
  twitter: {
    title: "Experienced Careers at Yuvabe Studios",
    description:
      "Lead client engagements, mentor the team, and shape how disciplines operate at an AI-first studio.",
  },
};

export default async function ExperiencedCareersPage() {
  const [homepageContent, jobs] = await Promise.all([
    getStudioHomepageContent(),
    getJobsByLevel("experienced"),
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Experienced Roles — Yuvabe Studios",
    url: getAbsoluteUrl("/careers/experienced"),
    description: "Senior openings at Yuvabe Studios.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CareersListingPage
        navigationItems={homepageContent.navigationItems}
        level="experienced"
        jobs={jobs}
      />
    </>
  );
}
