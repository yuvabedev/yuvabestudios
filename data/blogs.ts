// data/blogs.ts
// Static blog content. The blog renders from this list instead of Supabase.
// Images live in /public/blog. To add a post, append an entry below (newest first).

export type BlogPost = {
  slug: string;
  title: string;
  subheading: string;
  image: string;
  author: string;
  readingTime: string;
  category: string;
};

export const blogs: BlogPost[] = [
  {
    slug: "security-flaw-in-animations",
    title:
      "The Overlooked Security Flaw in Front-End Animations You Need to Know",
    subheading:
      "Motion design makes interfaces feel alive — but if implemented carelessly, it can also expose user behavior, states, and data. Here’s how to secure your animations and build safer UIs.",
    image: "/blog/securityflaw.jpg",
    author: "Roopan R",
    readingTime: "Published on November 18, 2025 · 10 minute read",
    category: "Design & Development",
  },
  {
    slug: "local-llm",
    title: "The Rise of Local AI: Running LLMs on Your Device",
    subheading:
      "Running LLMs locally isn’t just about saving costs — it’s about privacy, speed, and control. Here’s how this shift is reshaping the AI landscape.",
    image: "/blog/rise-of-local-ai.jpg",
    author: "Thamarai Kannan",
    readingTime: "Published on November 11, 2025 · 8 minute read",
    category: "AI/ML",
  },
  {
    slug: "seo-in-the-age-of-ai",
    title:
      "SEO in the Age of AI & AEO: The End of an Era or a Smarter Beginning?",
    subheading:
      "Why AI isn’t killing SEO — it’s forcing it to evolve into something more strategic, semantic, and human.",
    image: "/blog/seo-banner.png",
    author: "Priya",
    readingTime: "Published on November 4, 2025 · 8 minute read",
    category: "Digital Marketing",
  },
  {
    slug: "measuring-ux-beyond-usability",
    title: "From Clicks to Emotions: Measuring UX Beyond Usability",
    subheading:
      "Why the future of great design lies not just in what users do, but in how they feel",
    image: "/blog/clicks-to-emotions.jpg",
    author: "Sagar",
    readingTime: "Published on October 28, 2025 · 8 minute read",
    category: "Design & Development",
  },
  {
    slug: "future-of-fashion",
    title: "Future of Fashion: How to Spot Viral Trends Before They Explode",
    subheading:
      "“The art of beauty lives in the glow of your skin, the play of color, the shine of your hair, and the memory of your scent.”",
    image: "/blog/viral-trends.png",
    author: "Arthi",
    readingTime: "Published on October 21, 2025 · 8 minute read",
    category: "Market Research",
  },
  {
    slug: "hugging-face",
    title: "Exploring Hugging Face: The AI Platform Democratizing Innovation",
    subheading:
      "A Platform That Changed How We Build AI: Hugging Face is transforming AI from a niche for experts into a playground where anyone can build, experiment, and innovate.",
    image: "/blog/hugging-face.png",
    author: "Abinesh Kumar",
    readingTime: "Published on October 14, 2025 · 8 minute read",
    category: "AI/ML",
  },
  {
    slug: "object-detection-system-in-flutter",
    title: "Building an AI-Powered Object Detection System in Flutter",
    subheading:
      "From self-driving cars to smart shopping apps, object detection is quietly powering the world around us — and now, you can build it into your own app.",
    image: "/blog/object-Detection-System.png",
    author: "Hariprasath",
    readingTime: "Published on October 7, 2025 · 7 minute read",
    category: "AI/ML",
  },
  {
    slug: "creating-marketing-copy",
    title: "Creating Marketing Copy That Converts",
    subheading:
      "How small tweaks in copy can make a big impact on your audience",
    image: "/blog/marketing-copy.png",
    author: "Anjali",
    readingTime: "Published on September 30, 2025 · 8 minute read",
    category: "Digital Marketing",
  },
  {
    slug: "virtual-try-on",
    title: "The Future of Fashion Shopping: Virtual Try-On with AI and AR",
    subheading:
      "From online shopping to metaverse fashion, Virtual Try-On (VTO) is reshaping how we interact with clothing.",
    image: "/blog/future-of-Fashion.png",
    author: "Keerthana",
    readingTime: "Published on September 23, 2025 · 7 minute read",
    category: "AI/ML",
  },
  {
    slug: "code-generation-LLMs",
    title:
      "Code Smarter, Not Harder: How LLMs Are Transforming Everyday Development",
    subheading:
      "LLMs are changing the game — turning hours of manual coding into minutes of smart automation.",
    image: "/blog/code-smarter.jpg",
    author: "Mohamed Safiq S",
    readingTime: "Published on September 16, 2025 · 7 minute read",
    category: "AI/ML",
  },
  {
    slug: "social-media-marketing-for-local-business",
    title:
      "Mastering Social Media Marketing for Local Businesses in 2025: Strategy and Tools",
    subheading:
      "How local brands can thrive in the digital-first era by embracing strategic storytelling, AI tools, and hyper-local engagement.",
    image: "/blog/socialmedia-marketing.png",
    author: "Balaji",
    readingTime: "Published on September 9, 2025 · 8 minute read",
    category: "Digital Marketing",
  },
  {
    slug: "content-pillars",
    title: "Content Pillars: Why Every Brand Needs Them",
    subheading:
      "How clarity and consistency in content can transform your marketing strategy",
    image: "/blog/content-pillars.png",
    author: "Anjali",
    readingTime: "Published on September 2, 2025 · 8 minute read",
    category: "Digital Marketing",
  },
  {
    slug: "data-to-connection",
    title:
      "From Data to Connection: Why Smart Segmentation Drives Real Marketing ROI",
    subheading:
      "Trying to reach everyone with the same message is like tossing spaghetti at the wall and hoping something sticks.",
    image: "/blog/data-to-connection.png",
    author: "Velmurugan",
    readingTime: "Published on August 26, 2025 · 8 minute read",
    category: "Market Research",
  },
];

// "All Posts" first, then the categories in first-seen order.
export const blogCategories: string[] = [
  "All Posts",
  ...Array.from(new Set(blogs.map((post) => post.category))),
];

export function getBlogPosts(): BlogPost[] {
  return blogs;
}

export function getBlogBySlug(slug: string): BlogPost | null {
  return blogs.find((post) => post.slug === slug) ?? null;
}
