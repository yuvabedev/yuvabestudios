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
