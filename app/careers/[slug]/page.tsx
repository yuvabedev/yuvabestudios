import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CareersJobDetail } from "@/components/careers/careers-job-detail";
import { getJobBySlug, jobListings } from "@/lib/careers-data";
import { getAbsoluteUrl } from "@/lib/site";
import { getStudioHomepageContent } from "@/lib/studio-content";

type JobPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return jobListings.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    return { title: "Role Not Found" };
  }

  const title = `${job.title} — ${job.department}`;
  const description = job.summary;
  const href = `/careers/${job.slug}`;

  return {
    title,
    description,
    alternates: { canonical: href },
    openGraph: {
      title: `${job.title} | Yuvabe Studios`,
      description,
      url: href,
      type: "website",
    },
    twitter: {
      title: `${job.title} | Yuvabe Studios`,
      description,
    },
  };
}

export default async function JobDetailPage({ params }: JobPageProps) {
  const { slug } = await params;
  const [job, homepageContent] = await Promise.all([
    Promise.resolve(getJobBySlug(slug)),
    getStudioHomepageContent(),
  ]);

  if (!job) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.summary,
    datePosted: job.posted,
    employmentType: job.type.toUpperCase().replace("-", "_"),
    jobLocation: {
      "@type": "Place",
      name: job.location,
    },
    hiringOrganization: {
      "@type": "Organization",
      name: "Yuvabe Studios",
      sameAs: getAbsoluteUrl("/"),
    },
    url: getAbsoluteUrl(`/careers/${job.slug}`),
    occupationalCategory: job.department,
    ...(job.compensation ? { baseSalary: { "@type": "MonetaryAmount", description: job.compensation } } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CareersJobDetail
        navigationItems={homepageContent.navigationItems}
        job={job}
      />
    </>
  );
}
