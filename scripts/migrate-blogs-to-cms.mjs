// One-time seed: move the 13 legacy static blog posts into the Supabase
// `blog_posts` table so they appear in the CMS list and the (now CMS-driven)
// public blog. Their rich prose still renders from the bespoke article
// components via the slug→component registry, so `body` is intentionally left
// empty here — only the metadata is seeded.
//
// Idempotent: upserts on `slug`. Run with:  node scripts/migrate-blogs-to-cms.mjs
//
// NOTE: re-running overwrites title/excerpt/cover/category/published_at for
// these slugs back to the values below. It does NOT touch posts authored later
// in the admin (different slugs). Safe to run once after deploy.

import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

// ── Load .env (simple KEY=VALUE parser; ignores quotes/comments) ──────────────
try {
  const env = readFileSync(new URL("../.env", import.meta.url), "utf8");
  for (const line of env.split(/\r?\n/)) {
    const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
    if (!match) continue;
    const key = match[1];
    let value = match[2];
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
} catch {
  // .env is optional if the vars are already in the environment.
}

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in the environment / .env.",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

// ── Legacy posts (mirror of data/blogs.ts) ────────────────────────────────────
const legacyPosts = [
  { slug: "security-flaw-in-animations", title: "The Overlooked Security Flaw in Front-End Animations You Need to Know", subheading: "Motion design makes interfaces feel alive — but if implemented carelessly, it can also expose user behavior, states, and data. Here’s how to secure your animations and build safer UIs.", image: "/blog/securityflaw.jpg", author: "Roopan R", date: "November 18, 2025", category: "Design & Development" },
  { slug: "local-llm", title: "The Rise of Local AI: Running LLMs on Your Device", subheading: "Running LLMs locally isn’t just about saving costs — it’s about privacy, speed, and control. Here’s how this shift is reshaping the AI landscape.", image: "/blog/rise-of-local-ai.jpg", author: "Thamarai Kannan", date: "November 11, 2025", category: "AI/ML" },
  { slug: "seo-in-the-age-of-ai", title: "SEO in the Age of AI & AEO: The End of an Era or a Smarter Beginning?", subheading: "Why AI isn’t killing SEO — it’s forcing it to evolve into something more strategic, semantic, and human.", image: "/blog/seo-banner.png", author: "Priya", date: "November 4, 2025", category: "Digital Marketing" },
  { slug: "measuring-ux-beyond-usability", title: "From Clicks to Emotions: Measuring UX Beyond Usability", subheading: "Why the future of great design lies not just in what users do, but in how they feel", image: "/blog/clicks-to-emotions.jpg", author: "Sagar", date: "October 28, 2025", category: "Design & Development" },
  { slug: "future-of-fashion", title: "Future of Fashion: How to Spot Viral Trends Before They Explode", subheading: "“The art of beauty lives in the glow of your skin, the play of color, the shine of your hair, and the memory of your scent.”", image: "/blog/viral-trends.png", author: "Arthi", date: "October 21, 2025", category: "Market Research" },
  { slug: "hugging-face", title: "Exploring Hugging Face: The AI Platform Democratizing Innovation", subheading: "A Platform That Changed How We Build AI: Hugging Face is transforming AI from a niche for experts into a playground where anyone can build, experiment, and innovate.", image: "/blog/hugging-face.png", author: "Abinesh Kumar", date: "October 14, 2025", category: "AI/ML" },
  { slug: "object-detection-system-in-flutter", title: "Building an AI-Powered Object Detection System in Flutter", subheading: "From self-driving cars to smart shopping apps, object detection is quietly powering the world around us — and now, you can build it into your own app.", image: "/blog/object-Detection-System.png", author: "Hariprasath", date: "October 7, 2025", category: "AI/ML" },
  { slug: "creating-marketing-copy", title: "Creating Marketing Copy That Converts", subheading: "How small tweaks in copy can make a big impact on your audience", image: "/blog/marketing-copy.png", author: "Anjali", date: "September 30, 2025", category: "Digital Marketing" },
  { slug: "virtual-try-on", title: "The Future of Fashion Shopping: Virtual Try-On with AI and AR", subheading: "From online shopping to metaverse fashion, Virtual Try-On (VTO) is reshaping how we interact with clothing.", image: "/blog/future-of-Fashion.png", author: "Keerthana", date: "September 23, 2025", category: "AI/ML" },
  { slug: "code-generation-LLMs", title: "Code Smarter, Not Harder: How LLMs Are Transforming Everyday Development", subheading: "LLMs are changing the game — turning hours of manual coding into minutes of smart automation.", image: "/blog/code-smarter.jpg", author: "Mohamed Safiq S", date: "September 16, 2025", category: "AI/ML" },
  { slug: "social-media-marketing-for-local-business", title: "Mastering Social Media Marketing for Local Businesses in 2025: Strategy and Tools", subheading: "How local brands can thrive in the digital-first era by embracing strategic storytelling, AI tools, and hyper-local engagement.", image: "/blog/socialmedia-marketing.png", author: "Balaji", date: "September 9, 2025", category: "Digital Marketing" },
  { slug: "content-pillars", title: "Content Pillars: Why Every Brand Needs Them", subheading: "How clarity and consistency in content can transform your marketing strategy", image: "/blog/content-pillars.png", author: "Anjali", date: "September 2, 2025", category: "Digital Marketing" },
  { slug: "data-to-connection", title: "From Data to Connection: Why Smart Segmentation Drives Real Marketing ROI", subheading: "Trying to reach everyone with the same message is like tossing spaghetti at the wall and hoping something sticks.", image: "/blog/data-to-connection.png", author: "Velmurugan", date: "August 26, 2025", category: "Market Research" },
];

const rows = legacyPosts.map((post) => ({
  slug: post.slug,
  title: post.title,
  excerpt: post.subheading,
  body: "", // prose lives in the bespoke article component (registry bridge)
  cover_image: post.image,
  author: post.author,
  category: post.category,
  published: true,
  published_at: new Date(`${post.date} 09:00:00 UTC`).toISOString(),
}));

const { data, error } = await supabase
  .from("blog_posts")
  .upsert(rows, { onConflict: "slug" })
  .select("slug");

if (error) {
  console.error("Migration failed:", error.message);
  process.exit(1);
}

console.log(`✓ Seeded ${data?.length ?? rows.length} blog posts into the CMS:`);
for (const row of data ?? []) console.log(`  · ${row.slug}`);
