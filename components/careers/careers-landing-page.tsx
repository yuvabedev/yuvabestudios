"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Trophy } from "lucide-react";
import { motion } from "framer-motion";

import type { StudioHomepageNavItem } from "@/components/studio/studio-homepage-content";
import { StudioHeader } from "@/components/studio/studio-header";
import {
  StudioPageContainer,
  StudioPageRails,
} from "@/components/studio/studio-page-shell";
import { PremiumSurface } from "@/components/ui/premium-surface";

const values = [
  {
    title: "Outcomes over output",
    description:
      "We measure success by founder traction, not hours logged. Every role at Yuvabe is tied directly to results that matter.",
  },
  {
    title: "AI-native by default",
    description:
      "We use AI to amplify human judgment — not replace it. You will learn to work with frontier tools as part of daily practice.",
  },
  {
    title: "Craft without ceremony",
    description:
      "High quality work, low bureaucracy. We ship fast, iterate with feedback, and keep processes lean so the actual work stays the focus.",
  },
  {
    title: "Small team, large leverage",
    description:
      "Each person at Yuvabe has meaningful scope. We hire for ownership — people who define problems, not just solve assigned tickets.",
  },
];

type CareersLandingPageProps = {
  navigationItems: StudioHomepageNavItem[];
  entryCount: number;
  experiencedCount: number;
};

export function CareersLandingPage({
  navigationItems,
  entryCount,
  experiencedCount,
}: CareersLandingPageProps) {
  return (
    <main
      data-studio-shell
      className="relative min-h-screen overflow-x-clip overflow-y-visible bg-white text-foreground"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <StudioPageRails />
        <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_18%_10%,rgba(88,41,199,0.08),rgba(255,255,255,0)_36%),radial-gradient(circle_at_82%_0%,rgba(255,202,45,0.09),rgba(255,255,255,0)_32%)]" />
      </div>

      <StudioHeader navigationItems={navigationItems} />

      <div className="relative z-10">
        {/* Hero */}
        <section className="pb-16 pt-20 md:pb-24 md:pt-28">
          <StudioPageContainer>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <span className="mb-5 inline-block text-label-sm font-medium uppercase tracking-[0.16em] text-[var(--color-text-brand)]">
                Careers at Yuvabe
              </span>
              <h1 className="text-display-xl mb-6 text-[var(--color-text-primary)]">
                Build the future{" "}
                <span className="text-[var(--color-text-brand)]">with us.</span>
              </h1>
              <p className="text-body-lg max-w-xl text-[var(--color-text-secondary)]">
                Yuvabe is an AI-first strategy, design, engineering, and growth
                studio for startups. We help founders figure out what to build
                next, execute it well, and create traction that compounds.
              </p>
            </motion.div>
          </StudioPageContainer>
        </section>

        {/* Who we are + What it's like — single section, two rows with bottom borders */}
        <section className="pb-20 md:pb-28">
          <StudioPageContainer>
            {/* Row 1: content left, image right — image bottom-aligns to the divider */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-10 border-b border-[var(--color-border-default)] md:grid-cols-2 md:gap-16"
            >
              {/* Content carries the bottom padding to set row height */}
              <div className="flex flex-col justify-center gap-4 pb-14">
                <h2 className="text-heading-xl text-[var(--color-text-primary)]">
                  Who we are
                </h2>
                <p className="text-body-lg text-[var(--color-text-secondary)]">
                  Founded in Auroville, India, Yuvabe brings together
                  product thinkers, engineers, designers, and growth
                  specialists who care about outcomes. We partner deeply
                  with startup founders — embedded, not outsourced — to
                  make better decisions and ship work that creates real
                  traction.
                </p>
              </div>
              {/* Image self-stretches to fill column height, no bottom rounding — aligns flush to the border */}
              <div className="self-stretch overflow-hidden rounded-t-2xl">
                <Image
                  src="/assets/careers/people.png"
                  alt="The Yuvabe team"
                  width={640}
                  height={480}
                  className="h-full min-h-64 w-full object-cover "
                />
              </div>
            </motion.div>

            {/* Row 2: image left, content right — same border treatment as row 1 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-10 border-b border-[var(--color-border-default)] md:grid-cols-2 md:gap-16 pt-20"
            >
              {/* Image self-stretches flush to the bottom border, no bottom rounding */}
              <div className="self-stretch overflow-hidden rounded-t-2xl">
                <Image
                  src="/assets/careers/group.png"
                  alt="People working at Yuvabe"
                  width={640}
                  height={480}
                  className="h-full min-h-64 w-full object-cover "
                />
              </div>
              {/* Content carries the bottom padding to set row height */}
              <div className="flex flex-col justify-center gap-4 pb-14 pt-14">
                <h2 className="text-heading-xl text-[var(--color-text-primary)]">
                  What it is like to work here
                </h2>
                <p className="text-body-lg text-[var(--color-text-secondary)]">
                  Work at Yuvabe is fast, focused, and high-ownership.
                  You will tackle ambiguous founder problems, use AI as
                  a daily accelerant, and grow through direct feedback
                  from senior practitioners. Every role has real scope
                  from week one.
                </p>
              </div>
            </motion.div>
          </StudioPageContainer>
        </section>

        {/* Category cards */}
        <section className="pb-20 md:pb-28">
          <StudioPageContainer>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10"
            >
              <span className="mb-3 block text-label-sm font-medium uppercase tracking-[0.16em] text-[var(--color-text-brand)]">
                Open roles
              </span>
              <h2 className="text-heading-xl text-[var(--color-text-primary)]">
                Find your track.
              </h2>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Entry Level — cyan tint, matching about page workflow card style */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <PremiumSurface
                  asChild
                  tone="tintCyan"
                  elevation="sm"
                  blur="sm"
                  radius="xl"
                  className="h-full"
                >
                  <Link
                    href="/careers/entry-level"
                    className="group flex h-full flex-col gap-6 p-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] md:p-10"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex size-11 items-center justify-center rounded-full border border-white/80 bg-white/[0.78] shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
                        <Sparkles size={20} className="text-[var(--cyan-500)]" />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-heading-md text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-text-brand)]">
                          Entry Level
                        </h3>
                        <ArrowRight
                          size={18}
                          className="text-[var(--color-text-tertiary)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-text-brand)]"
                        />
                      </div>
                      <p className="text-body-md text-[var(--color-text-secondary)]">
                        For curious starters ready to grow fast. Real projects,
                        real mentorship, real scope from day one.
                      </p>
                      <p className="text-label-sm text-[var(--color-text-tertiary)]">
                        Experience: 0–2 years
                      </p>
                    </div>
                    <div className="border-t border-[var(--color-border-default)] pt-5">
                      <span className="text-label-md font-semibold text-[var(--color-text-brand)]">
                        {entryCount} open role{entryCount !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </Link>
                </PremiumSurface>
              </motion.div>

              {/* Experienced — lavender/purple tint, matching about page workflow card style */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <PremiumSurface
                  asChild
                  tone="tintLavender"
                  elevation="sm"
                  blur="sm"
                  radius="xl"
                  className="h-full"
                >
                  <Link
                    href="/careers/experienced"
                    className="group flex h-full flex-col gap-6 p-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] md:p-10"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex size-11 items-center justify-center rounded-full border border-white/80 bg-white/[0.78] shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
                        <Trophy size={20} className="text-[var(--purple-500)]" />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-heading-md text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-text-brand)]">
                          Experienced
                        </h3>
                        <ArrowRight
                          size={18}
                          className="text-[var(--color-text-tertiary)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-text-brand)]"
                        />
                      </div>
                      <p className="text-body-md text-[var(--color-text-secondary)]">
                        For senior practitioners who want ownership. Lead
                        engagements, shape the discipline, and mentor the next
                        generation.
                      </p>
                      <p className="text-label-sm text-[var(--color-text-tertiary)]">
                        Experience: 2+ years
                      </p>
                    </div>
                    <div className="border-t border-[var(--color-border-default)] pt-5">
                      <span className="text-label-md font-semibold text-[var(--color-text-brand)]">
                        {experiencedCount} open role
                        {experiencedCount !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </Link>
                </PremiumSurface>
              </motion.div>
            </div>
          </StudioPageContainer>
        </section>

        {/* Values */}
        <section className="pb-28 md:pb-36">
          <StudioPageContainer>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10"
            >
              <span className="mb-3 block text-label-sm font-medium uppercase tracking-[0.16em] text-[var(--color-text-brand)]">
                How we work
              </span>
              <h2 className="text-heading-xl text-[var(--color-text-primary)]">
                What we believe in.
              </h2>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.25 + i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex flex-col gap-3 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-background-surface-subtle)] p-6"
                >
                  <h3 className="text-heading-sm text-[var(--color-text-brand)]">
                    {v.title}
                  </h3>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">
                    {v.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </StudioPageContainer>
        </section>
      </div>
    </main>
  );
}
