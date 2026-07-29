import "server-only";

import { getSupabaseAdminClient } from "@/lib/supabase-admin";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image: string;
  author: string;
  category: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type BlogPostInput = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image: string;
  author: string;
  category: string;
  published: boolean;
  published_at: string | null;
};

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Failed to load blog posts: ${error.message}`);
  return data ?? [];
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) throw new Error(`Failed to load blog posts: ${error.message}`);
  return data ?? [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) throw new Error(`Failed to load blog post: ${error.message}`);
  return data;
}

export async function saveBlogPost(post: BlogPostInput): Promise<BlogPost> {
  const supabase = getSupabaseAdminClient();
  const { id, ...fields } = post;

  if (id) {
    const { data, error } = await supabase
      .from("blog_posts")
      .update({ ...fields, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single<BlogPost>();
    if (error) throw new Error(`Failed to update blog post: ${error.message}`);
    return data;
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .insert(fields)
    .select()
    .single<BlogPost>();
  if (error) throw new Error(`Failed to create blog post: ${error.message}`);
  return data;
}

export async function deleteBlogPost(id: string): Promise<void> {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw new Error(`Failed to delete blog post: ${error.message}`);
}

// ─── Public view model ────────────────────────────────────────────────────────
// The public blog UI (listing, cards, homepage) was built against the legacy
// static shape. We map Supabase rows onto that shape so the components stay
// unchanged and both content sources speak the same language.

export type PublicBlogPost = {
  slug: string;
  title: string;
  subheading: string; // <- excerpt
  image: string; // <- cover_image
  author: string;
  category: string;
  date: string; // formatted publish date, e.g. "November 18, 2025"
  readingTime: string; // "Published on <date> · <N> minute read"
  body: string;
  publishedAt: string | null;
};

function formatPublishDate(iso: string | null): string {
  if (!iso) return "";
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// ~200 wpm is the common reading-speed estimate; legacy posts carry no body
// here (their prose lives in the article component), so we omit the read count.
function estimateReadingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function buildReadingTimeLabel(post: Pick<BlogPost, "body" | "published_at">): string {
  const date = formatPublishDate(post.published_at);
  const hasBody = post.body.trim().length > 0;
  const readPart = hasBody ? `${estimateReadingMinutes(post.body)} minute read` : "";
  const datePart = date ? `Published on ${date}` : "";
  return [datePart, readPart].filter(Boolean).join(" · ");
}

export function toPublicBlogPost(post: BlogPost): PublicBlogPost {
  return {
    slug: post.slug,
    title: post.title,
    subheading: post.excerpt,
    image: post.cover_image,
    author: post.author,
    category: post.category,
    date: formatPublishDate(post.published_at),
    readingTime: buildReadingTimeLabel(post),
    body: post.body,
    publishedAt: post.published_at,
  };
}

export async function getPublicBlogPosts(): Promise<PublicBlogPost[]> {
  const posts = await getPublishedBlogPosts();
  return posts.map(toPublicBlogPost);
}

export async function getPublicBlogPost(slug: string): Promise<PublicBlogPost | null> {
  const post = await getBlogPostBySlug(slug);
  return post ? toPublicBlogPost(post) : null;
}

// Unique categories in first-seen order — feeds the listing's category rail.
export function deriveBlogCategories(posts: PublicBlogPost[]): string[] {
  const seen = new Set<string>();
  const categories: string[] = [];
  for (const post of posts) {
    const category = post.category.trim();
    if (category && !seen.has(category)) {
      seen.add(category);
      categories.push(category);
    }
  }
  return categories;
}
