import type { Metadata } from "next";

import { CareersListingPage } from "@/components/careers/careers-listing-page";
import { getJobsByLevel } from "@/lib/careers-data";
import { getAbsoluteUrl } from "@/lib/site";
import { getStudioHomepageContent } from "@/lib/studio-content";

export const metadata: Metadata = {
  title: "Entry Level Roles",
  description:
    "Entry-level openings at Yuvabe Studios — for curious starters ready to grow fast. Design, engineering, and growth roles available.",
  alternates: {
    canonical: "/careers/entry-level",
  },
  openGraph: {
    title: "Entry Level Careers at Yuvabe Studios",
    description:
      "Start your career at an AI-first studio. Real projects, real mentorship, and real scope from day one.",
    url: "/careers/entry-level",
  },
  twitter: {
    title: "Entry Level Careers at Yuvabe Studios",
    description:
      "Start your career at an AI-first studio. Real projects, real mentorship, and real scope from day one.",
  },
};

export default async function EntryLevelCareersPage() {
  const [homepageContent, jobs] = await Promise.all([
    getStudioHomepageContent(),
    Promise.resolve(getJobsByLevel("entry")),
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Entry Level Roles — Yuvabe Studios",
    url: getAbsoluteUrl("/careers/entry-level"),
    description: "Entry-level openings at Yuvabe Studios.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CareersListingPage
        navigationItems={homepageContent.navigationItems}
        level="entry"
        jobs={jobs}
      />
    </>
  );
}
