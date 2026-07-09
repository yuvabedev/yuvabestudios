import type { Metadata } from "next";

import { WorkPage } from "@/components/work/work-page";
import {
  getStudioCaseStudies,
  getStudioHomepageContent,
} from "@/lib/studio-content";
import { getStudioWorkPageContent } from "@/lib/work-content";
import { getAbsoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Work — Yuvabe Studios",
  description:
    "Products, platforms, and brands we've shipped with founders — built with AI-native execution across strategy, design, engineering, and growth.",
  alternates: {
    canonical: getAbsoluteUrl("/work"),
  },
  openGraph: {
    title: "Work — Yuvabe Studios",
    description:
      "Selected case studies from Yuvabe Studios — AI-native products, platforms, and brands.",
    url: getAbsoluteUrl("/work"),
    type: "website",
  },
};

export default async function WorkRoutePage() {
  const [caseStudies, homepageContent, workContent] = await Promise.all([
    getStudioCaseStudies().catch(() => []),
    getStudioHomepageContent(),
    getStudioWorkPageContent(),
  ]);

  return (
    <WorkPage
      navigationItems={homepageContent.navigationItems}
      caseStudies={caseStudies}
      content={workContent}
    />
  );
}
