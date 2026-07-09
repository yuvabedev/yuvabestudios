import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { blogs, type BlogPost } from "@/data/blogs";
import type { StudioHomepageNavItem } from "@/components/studio/studio-homepage-content";
import { StudioHeader } from "@/components/studio/studio-header";

type BlogDetailPageProps = {
  navigationItems: StudioHomepageNavItem[];
  post: BlogPost;
};

// "Published on November 18, 2025 · 10 minute read" → { date, read }
function splitMeta(readingTime: string): { date: string; read: string } {
  const cleaned = readingTime.replace(/^Published on\s*/i, "");
  const [date, read] = cleaned.split("·").map((part) => part.trim());
  return { date: date ?? "", read: read ?? "" };
}

export function BlogDetailPage({ navigationItems, post }: BlogDetailPageProps) {
  const { date, read } = splitMeta(post.readingTime);
  const related = blogs.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main
      data-studio-shell
      className="relative min-h-screen overflow-x-clip overflow-y-visible bg-(--neutral-50) text-foreground"
    >
      <StudioHeader navigationItems={navigationItems} />

      <article className="relative">
        {/* Header */}
        <section className="pb-12 pt-32 md:pb-16 md:pt-40">
          <div className="mx-auto w-full max-w-[1720px] px-6 md:px-12 lg:px-16">
            <div className="max-w-3xl lg:pl-4 xl:pl-6">
              <Link
                href="/blog"
                className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-(--neutral-500) transition-colors hover:text-brand"
              >
                <ArrowLeft size={13} />
                Back to blog
              </Link>

              {post.category && (
                <div className="mb-5">
                  <span className="rounded-full bg-brand/10 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-widest text-brand">
                    {post.category}
                  </span>
                </div>
              )}

              <h1 className="text-display-xl mb-6 text-(--color-text-primary)">
                {post.title}
              </h1>

              {post.subheading && (
                <p className="text-body-lg mb-8 text-(--color-text-secondary)">
                  {post.subheading}
                </p>
              )}

              <div className="flex items-center gap-4 border-t border-(--color-border-default) pt-6">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand/10 font-mono text-[13px] font-semibold text-brand">
                  {post.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-(--neutral-900)">{post.author}</p>
                  <p className="text-xs text-(--neutral-500)">
                    {[date, read].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cover image */}
        {post.image && (
          <section className="border-b border-(--color-border-default) bg-white py-0">
            <div className="mx-auto w-full max-w-[1720px] px-6 md:px-12 lg:px-16">
              <div className="overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="aspect-[21/9] w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </section>
        )}

        {/* Lead */}
        <section className="py-14 md:py-20">
          <div className="mx-auto w-full max-w-[1720px] px-6 md:px-12 lg:px-16">
            <div className="max-w-3xl lg:pl-4 xl:pl-6">
              <p className="text-[20px] leading-[1.7] text-(--neutral-700) md:text-[22px]">
                {post.subheading}
              </p>

              <div className="mt-14 border-t border-(--color-border-default) pt-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-(--neutral-500) transition-colors hover:text-brand"
                >
                  <ArrowLeft size={13} />
                  All posts
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="border-t border-(--color-border-default) bg-white py-14 md:py-20">
            <div className="mx-auto w-full max-w-[1720px] px-6 md:px-12 lg:px-16">
              <div className="lg:pl-4 xl:pl-6">
                <h2 className="mb-8 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-(--neutral-500)">
                  More articles
                </h2>
                <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((item) => (
                    <Link key={item.slug} href={`/blog/${item.slug}`} className="group flex flex-col">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-(--neutral-100) ring-1 ring-(--color-border-default)">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <span className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-(--color-text-brand)">
                        {item.category}
                      </span>
                      <h3 className="mt-2 text-lg font-semibold leading-snug text-(--neutral-950) transition-colors duration-200 group-hover:text-brand">
                        {item.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto w-full max-w-[1720px] px-6 md:px-12 lg:px-16">
            <div className="careers-cta-surface relative overflow-hidden rounded-4xl px-6 py-14 text-center sm:px-10 sm:py-20 md:px-16 md:py-24">
              <div className="careers-cta-glow-primary pointer-events-none absolute -left-32 -top-48 size-150 rounded-full opacity-70" aria-hidden="true" />
              <div className="careers-cta-glow-accent pointer-events-none absolute -bottom-52 -right-40 size-150 rounded-full opacity-50" aria-hidden="true" />
              <div className="relative">
                <span className="mb-6 inline-block font-mono text-[12px] font-medium uppercase tracking-[0.04em] text-brand">
                  Ready to build?
                </span>
                <h2 className="careers-cta-heading mb-6 text-(--neutral-900)">
                  Let&apos;s turn your idea into{" "}
                  <em className="font-medium not-italic text-brand">something real.</em>
                </h2>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href="/#process"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(88,41,199,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(88,41,199,0.35)] sm:w-auto"
                  >
                    Start a project
                    <ArrowRight size={16} />
                  </Link>
                  <a
                    href="mailto:hello@yuvabestudios.com"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-(--color-border-default) bg-white px-7 py-4 text-[13px] font-semibold text-(--neutral-700) transition-all hover:border-brand/30 hover:text-brand sm:w-auto sm:text-[15px]"
                  >
                    hello@yuvabestudios.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
