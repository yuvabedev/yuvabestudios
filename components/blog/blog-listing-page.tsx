"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { blogCategories, type BlogPost } from "@/data/blogs";
import type { StudioHomepageNavItem } from "@/components/studio/studio-homepage-content";
import { StudioHeader } from "@/components/studio/studio-header";

type BlogListingPageProps = {
  navigationItems: StudioHomepageNavItem[];
  posts: BlogPost[];
};

const easeOut = [0.22, 1, 0.36, 1] as const;

// Short tagline shown under each category heading.
const categoryDescriptions: Record<string, string> = {
  "Design & Development": "Where craft meets code — building interfaces that work.",
  "AI/ML": "Practical notes on building with AI, from models to real products.",
  "Digital Marketing": "Positioning, campaigns, and growth that actually converts.",
  "Market Research": "Understanding people, trends, and the market before you build.",
};

// "Published on November 18, 2025 · 10 minute read" → { date, read }
function splitMeta(readingTime: string): { date: string; read: string } {
  const cleaned = readingTime.replace(/^Published on\s*/i, "");
  const [date, read] = cleaned.split("·").map((part) => part.trim());
  return { date: date ?? "", read: read ?? "" };
}

function MetaRow({
  post,
  showCategory = false,
  className = "",
}: {
  post: BlogPost;
  showCategory?: boolean;
  className?: string;
}) {
  const { date, read } = splitMeta(post.readingTime);
  return (
    <div
      className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-(--neutral-500) ${className}`}
    >
      {showCategory && <span className="text-(--color-text-brand)">{post.category}</span>}
      {date && (
        <span className={showCategory ? "before:mr-2 before:content-['·']" : ""}>{date}</span>
      )}
      {read && <span className="before:mr-2 before:content-['·']">{read}</span>}
    </div>
  );
}

// The single most-recent post, shown as a large two-column hero.
function LatestCard({ post }: { post: BlogPost }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeOut }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
        aria-label={post.title}
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-(--neutral-100) ring-1 ring-(--color-border-default)">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
            Latest
          </span>
          <h2 className="text-display-muted-editorial text-(--neutral-950) transition-colors duration-200 group-hover:text-brand">
            {post.title}
          </h2>
          <p className="max-w-xl text-body-lg text-(--color-text-secondary)">
            {post.subheading}
          </p>
          <MetaRow post={post} showCategory className="mt-1" />
          <span className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold text-(--neutral-900) transition-colors group-hover:text-brand">
            Read article
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

// Large lead card inside a category section.
function BigCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-(--neutral-100) ring-1 ring-(--color-border-default)">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      </div>
      <h3 className="mt-5 text-2xl font-semibold leading-snug text-(--neutral-950) transition-colors duration-200 group-hover:text-brand">
        {post.title}
      </h3>
      <MetaRow post={post} className="mt-3" />
    </Link>
  );
}

// Compact card used in the category grids.
function CompactCard({ post, index = 0 }: { post: BlogPost; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.5, ease: easeOut, delay: (index % 3) * 0.06 }}
    >
      <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-(--neutral-100) ring-1 ring-(--color-border-default)">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </div>
        <h3 className="mt-4 text-lg font-semibold leading-snug text-(--neutral-950) transition-colors duration-200 group-hover:text-brand">
          {post.title}
        </h3>
        <MetaRow post={post} className="mt-2" />
      </Link>
    </motion.div>
  );
}

function CategorySection({
  title,
  description,
  posts,
}: {
  title: string;
  description?: string;
  posts: BlogPost[];
}) {
  if (posts.length === 0) return null;

  const [lead, second, ...others] = posts;
  const bottom = others.slice(0, 3);

  return (
    <section className="border-t border-(--color-border-default) pt-14 md:pt-20">
      <div className="mb-8 max-w-3xl space-y-2">
        <h2 className="text-heading-xl font-semibold text-(--neutral-950)">{title}</h2>
        {description && (
          <p className="text-body-md text-(--color-text-secondary)">{description}</p>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BigCard post={lead} />
        </div>
        {second && (
          <div className="lg:col-span-1">
            <CompactCard post={second} />
          </div>
        )}
      </div>

      {bottom.length > 0 && (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 md:mt-12">
          {bottom.map((post, index) => (
            <CompactCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}

export function BlogListingPage({ navigationItems, posts }: BlogListingPageProps) {
  const [latest, ...rest] = posts;

  // Group the remaining posts by category, following the canonical category order.
  const groups = blogCategories
    .filter((category) => category !== "All Posts")
    .map((category) => ({
      category,
      description: categoryDescriptions[category],
      posts: rest.filter((post) => post.category === category),
    }))
    .filter((group) => group.posts.length > 0);

  return (
    <main
      data-studio-shell
      className="relative min-h-screen overflow-x-clip overflow-y-visible bg-(--neutral-50) text-foreground"
    >
      <StudioHeader navigationItems={navigationItems} />

      <article className="relative">
        {/* Hero */}
        <section className="pb-10 pt-32 md:pb-14 md:pt-40">
          <div className="mx-auto w-full max-w-[1720px] px-6 md:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="max-w-6xl"
            >
              <span className="mb-6 inline-block font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
                Blog
              </span>
              <h1 className="text-hero-display font-semibold text-(--neutral-950)">
                News and insights on{" "}
                <em className="font-medium not-italic text-brand">AI, design, and growth.</em>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Latest + category sections */}
        <section className="pb-16 md:pb-24">
          <div className="mx-auto w-full max-w-[1720px] space-y-14 px-6 md:space-y-20 md:px-12 lg:px-16">
            {latest && <LatestCard post={latest} />}

            {groups.map((group) => (
              <CategorySection
                key={group.category}
                title={group.category}
                description={group.description}
                posts={group.posts}
              />
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
