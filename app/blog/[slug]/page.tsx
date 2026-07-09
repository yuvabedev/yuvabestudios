import { notFound } from "next/navigation";

import { blogs, getBlogBySlug } from "@/data/blogs";
import { articleRegistry } from "@/app/blog/article-registry";
import { getStudioHomepageContent } from "@/lib/studio-content";
import { StudioHeader } from "@/components/studio/studio-header";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Yuvabe Studios`,
    description: post.subheading,
    openGraph: post.image ? { images: [{ url: post.image }] } : undefined,
  };
}

export function generateStaticParams() {
  return blogs.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const Article = articleRegistry[slug];

  if (!Article) notFound();

  const homepageContent = await getStudioHomepageContent();

  return (
    <main
      data-studio-shell
      className="relative min-h-screen overflow-x-clip bg-(--neutral-50) text-foreground"
    >
      <StudioHeader navigationItems={homepageContent.navigationItems} />
      <div className="pt-24 md:pt-28">
        <Article />
      </div>
    </main>
  );
}
