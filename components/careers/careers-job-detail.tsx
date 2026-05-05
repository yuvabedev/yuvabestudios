"use client";

import Link from "next/link";
import { MapPin, Briefcase, Building2, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

import type { Job } from "@/lib/careers-data";
import type { StudioHomepageNavItem } from "@/components/studio/studio-homepage-content";
import { StudioHeader } from "@/components/studio/studio-header";
import {
  StudioPageContainer,
  StudioPageRails,
} from "@/components/studio/studio-page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type CareersJobDetailProps = {
  navigationItems: StudioHomepageNavItem[];
  job: Job;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-heading-md mb-4 text-[var(--color-text-primary)]">
      {children}
    </h2>
  );
}

function ListSection({
  heading,
  items,
}: {
  heading: string;
  items: string[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <SectionHeading>{heading}</SectionHeading>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-body-md text-[var(--color-text-secondary)]"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-text-brand)]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CareersJobDetail({
  navigationItems,
  job,
}: CareersJobDetailProps) {
  const levelPath = job.level === "entry" ? "entry-level" : "experienced";
  const levelLabel = job.level === "entry" ? "Entry Level" : "Experienced";

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

      <article className="relative z-10">
        {/* Breadcrumb */}
        <StudioPageContainer className="py-5">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]"
          >
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/careers">Careers</Link>
            <span>/</span>
            <Link href={`/careers/${levelPath}`}>{levelLabel}</Link>
            <span>/</span>
            <span className="text-[var(--color-text-brand)]">{job.title}</span>
          </nav>
        </StudioPageContainer>

        {/* Job hero */}
        <section className="pb-10 pt-8 md:pb-14 md:pt-12">
          <StudioPageContainer>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <span className="mb-4 block text-label-sm font-medium uppercase tracking-[0.16em] text-[var(--color-text-brand)]">
                {job.department}
              </span>
              <h1 className="text-heading-xl mb-6 text-[var(--color-text-primary)]">
                {job.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                <Badge variant="brandTagSubtle" className="gap-1.5 text-label-sm">
                  <Briefcase size={12} />
                  {job.type}
                </Badge>
                <Badge variant="brandTagSubtle" className="gap-1.5 text-label-sm">
                  <MapPin size={12} />
                  {job.location}
                </Badge>
                <Badge variant="brandTagSubtle" className="gap-1.5 text-label-sm">
                  <Building2 size={12} />
                  {job.department}
                </Badge>
              </div>
            </motion.div>
          </StudioPageContainer>
        </section>

        {/* Body: main content + sidebar */}
        <section className="pb-28 md:pb-36">
          <StudioPageContainer>
            <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
              {/* Main content */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-10 divide-y divide-[var(--color-border-default)]"
              >
                {/* Overview */}
                <div className="flex flex-col gap-3">
                  <SectionHeading>Overview</SectionHeading>
                  <p className="text-body-lg text-[var(--color-text-secondary)]">
                    {job.summary}
                  </p>
                </div>

                <div className="pt-10">
                  <ListSection
                    heading="Responsibilities"
                    items={job.responsibilities}
                  />
                </div>

                <div className="pt-10">
                  <ListSection
                    heading="Requirements"
                    items={job.requirements}
                  />
                </div>

                {job.niceToHave.length > 0 && (
                  <div className="pt-10">
                    <ListSection
                      heading="Nice to Have"
                      items={job.niceToHave}
                    />
                  </div>
                )}

                {job.portfolioRequirement && (
                  <div className="pt-10 flex flex-col gap-3">
                    <SectionHeading>Portfolio Requirement</SectionHeading>
                    <p className="text-body-md text-[var(--color-text-secondary)]">
                      {job.portfolioRequirement}
                    </p>
                  </div>
                )}

                {job.benefits && (
                  <div className="pt-10 flex flex-col gap-6">
                    <SectionHeading>Benefits</SectionHeading>
                    <div className="flex flex-col gap-6">
                      {job.benefits.remote && job.benefits.remote.length > 0 && (
                        <div className="flex flex-col gap-3">
                          <h3 className="text-label-md font-semibold text-[var(--color-text-primary)]">
                            Remote
                          </h3>
                          <ul className="flex flex-col gap-2.5">
                            {job.benefits.remote.map((item) => (
                              <li
                                key={item}
                                className="flex gap-3 text-body-md text-[var(--color-text-secondary)]"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-text-brand)]" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {job.benefits.inPerson && job.benefits.inPerson.length > 0 && (
                        <div className="flex flex-col gap-3">
                          <h3 className="text-label-md font-semibold text-[var(--color-text-primary)]">
                            In-Person (Auroville)
                          </h3>
                          <ul className="flex flex-col gap-2.5">
                            {job.benefits.inPerson.map((item) => (
                              <li
                                key={item}
                                className="flex gap-3 text-body-md text-[var(--color-text-secondary)]"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-text-brand)]" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Sidebar */}
              <motion.aside
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="lg:sticky lg:top-28 h-fit"
              >
                <div className="flex flex-col gap-6 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-background-surface-subtle)] p-6 shadow-[var(--ds-shadow-sm)]">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-label-lg font-semibold text-[var(--color-text-primary)]">
                      Role details
                    </h3>

                    <dl className="flex flex-col gap-3">
                      {[
                        { icon: Building2, label: "Department", value: job.department },
                        { icon: MapPin, label: "Location", value: job.location },
                        { icon: Briefcase, label: "Type", value: job.type },
                        {
                          icon: CalendarDays,
                          label: "Posted",
                          value: formatDate(job.posted),
                        },
                        ...(job.compensation
                          ? [{ icon: Briefcase, label: "Compensation", value: job.compensation }]
                          : []),
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-start gap-3">
                          <Icon
                            size={15}
                            className="mt-0.5 shrink-0 text-[var(--color-icon-secondary)]"
                          />
                          <div>
                            <dt className="text-label-sm text-[var(--color-text-tertiary)]">
                              {label}
                            </dt>
                            <dd className="text-body-sm text-[var(--color-text-secondary)]">
                              {value}
                            </dd>
                          </div>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="border-t border-[var(--color-border-default)] pt-5">
                    <Button
                      asChild
                      size="lg"
                      className="w-full justify-center"
                    >
                      <a
                        href={`mailto:careers@yuvabestudios.com?subject=Application: ${job.title}`}
                      >
                        Apply for this role
                      </a>
                    </Button>
                    <p className="mt-3 text-center text-caption text-[var(--color-text-tertiary)]">
                      Send your portfolio and a brief intro.
                    </p>
                  </div>
                </div>
              </motion.aside>
            </div>
          </StudioPageContainer>
        </section>
      </article>
    </main>
  );
}
