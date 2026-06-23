import { getBlogPosts } from "@/data/blogs";
import { getStudioHomepageContent } from "@/lib/studio-content";
import { BlogListingPage } from "@/components/blog/blog-listing-page";

export const metadata = {
  title: "Blog — Yuvabe Studios",
  description:
    "News and insights on AI, design, engineering, and growth — field notes from Yuvabe Studios.",
};

export default async function BlogPage() {
  const homepageContent = await getStudioHomepageContent({ source: "supabase" });

  return (
    <BlogListingPage
      navigationItems={homepageContent.navigationItems}
      posts={getBlogPosts()}
    />
  );
}
