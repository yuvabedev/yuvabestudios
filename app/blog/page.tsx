import { deriveBlogCategories, getPublicBlogPosts } from "@/lib/blog";
import { getStudioHomepageContent } from "@/lib/studio-content";
import { BlogListingPage } from "@/components/blog/blog-listing-page";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog — Yuvabe Studios",
  description:
    "News and insights on AI, design, engineering, and growth — field notes from Yuvabe Studios.",
};

export default async function BlogPage() {
  const [homepageContent, posts] = await Promise.all([
    getStudioHomepageContent(),
    getPublicBlogPosts(),
  ]);

  return (
    <BlogListingPage
      navigationItems={homepageContent.navigationItems}
      posts={posts}
      categories={deriveBlogCategories(posts)}
    />
  );
}
