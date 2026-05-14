"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { Job, JobLevel } from "@/types/careers";
import type { StudioHomepageNavItem } from "@/components/studio/studio-homepage-content";
import { StudioHeader } from "@/components/studio/studio-header";
import {
  StudioPageContainer,
  StudioPageRails,
} from "@/components/studio/studio-page-shell";
import { JobCard } from "@/components/careers/job-card";

const levelMeta = {
  entry: {
    label: "Entry Level",
    eyebrow: "Start your journey",
    headline: "Build your career at Yuvabe.",
    description:
      "Entry-level roles are designed for curious, driven people ready to grow fast. You will work on real client projects from week one, guided by senior practitioners who care about craft and outcomes.",
  },
  experienced: {
    label: "Experienced",
    eyebrow: "Senior talent",
    headline: "Lead meaningful work at Yuvabe.",
    description:
      "Experienced roles are for practitioners who want ownership, not just execution. You will define how disciplines operate at Yuvabe, mentor the team, and shape the direction of client engagements.",
  },
} as const;

type CareersListingPageProps = {
  navigationItems: StudioHomepageNavItem[];
  level: JobLevel;
  jobs: Job[];
};

export function CareersListingPage({
  navigationItems,
  level,
  jobs,
}: CareersListingPageProps) {
  const meta = levelMeta[level];

  return (
    <main
      data-studio-shell
      className="relative min-h-screen overflow-x-clip overflow-y-visible bg-white text-foreground"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <StudioPageRails />
        <div className="absolute inset-x-0 top-0 h-[20rem] bg-[radial-gradient(circle_at_18%_10%,rgba(88,41,199,0.06),rgba(255,255,255,0)_34%),radial-gradient(circle_at_82%_0%,rgba(255,202,45,0.06),rgba(255,255,255,0)_32%)]" />
      </div>

      <StudioHeader navigationItems={navigationItems} />

      <div className="relative z-10">
        <StudioPageContainer className="py-5">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]"
          >
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/careers">Careers</Link>
            <span>/</span>
            <span className="text-[var(--color-text-brand)]">{meta.label}</span>
          </nav>
        </StudioPageContainer>

        {/* Section hero */}
        <section className="pb-12 pt-10 md:pb-16 md:pt-14">
          <StudioPageContainer>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl"
            >
              <span className="mb-4 block text-label-sm font-medium uppercase tracking-[0.16em] text-[var(--color-text-brand)]">
                {meta.eyebrow}
              </span>
              <h1 className="text-heading-xl mb-5 text-[var(--color-text-primary)]">
                {meta.headline}
              </h1>
              <p className="text-body-lg text-[var(--color-text-secondary)]">
                {meta.description}
              </p>
            </motion.div>
          </StudioPageContainer>
        </section>

        {/* Job grid */}
        <section className="pb-24 md:pb-32">
          <StudioPageContainer>
            {jobs.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-body-md text-[var(--color-text-tertiary)]"
              >
                No open roles at the moment. Check back soon.
              </motion.p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job, i) => (
                  <JobCard key={job.slug} job={job} index={i} />
                ))}
              </div>
            )}
          </StudioPageContainer>
        </section>
      </div>
    </main>
  );
}
