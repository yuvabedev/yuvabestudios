import { notFound } from "next/navigation";

import { getPublicBlogPost, getPublicBlogPosts } from "@/lib/blog";
import { getBlogBySlug } from "@/data/blogs";
import { articleRegistry } from "@/app/blog/article-registry";
import { getStudioHomepageContent } from "@/lib/studio-content";
import { StudioHeader } from "@/components/studio/studio-header";
import { BlogDetailPage } from "@/components/blog/blog-detail-page";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const post = await getPublicBlogPost(slug);
  if (post) {
    return {
      title: `${post.title} — Yuvabe Studios`,
      description: post.subheading,
      openGraph: post.image ? { images: [{ url: post.image }] } : undefined,
    };
  }

  // Fallback for bespoke articles not yet seeded into the CMS.
  const legacy = getBlogBySlug(slug);
  if (legacy) {
    return {
      title: `${legacy.title} — Yuvabe Studios`,
      description: legacy.subheading,
      openGraph: legacy.image ? { images: [{ url: legacy.image }] } : undefined,
    };
  }

  return {};
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  // A bespoke article component wins over the CMS body: the 13 migrated posts
  // keep their hand-built layouts while their metadata lives in the CMS.
  const Article = articleRegistry[slug];
  const post = await getPublicBlogPost(slug);

  if (!Article && !post) notFound();

  const homepageContent = await getStudioHomepageContent();

  if (Article) {
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

  // CMS-authored post — render the generic article from the stored body.
  const allPosts = await getPublicBlogPosts();
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <BlogDetailPage
      navigationItems={homepageContent.navigationItems}
      post={post!}
      related={related}
    />
  );
}
