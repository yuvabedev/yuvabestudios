export type JobLevel = "entry" | "experienced";
export type JobType = "Full-time" | "Part-time" | "Contract" | "Remote";

export type Job = {
  slug: string;
  title: string;
  level: JobLevel;
  department: string;
  location: string;
  type: JobType;
  posted: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  compensation?: string;
};

export const jobListings: Job[] = [
  // --- Entry Level ---
  {
    slug: "junior-ui-ux-designer",
    title: "Junior UI/UX Designer",
    level: "entry",
    department: "Design",
    location: "Auroville, India · Remote-friendly",
    type: "Full-time",
    posted: "2026-04-20",
    summary:
      "Join our design team and help shape digital product experiences for early-stage startups. You will work closely with senior designers and contribute to real client projects from day one.",
    responsibilities: [
      "Create wireframes, prototypes, and high-fidelity UI designs under mentorship",
      "Participate in discovery sessions and synthesize user insights",
      "Contribute to and maintain the Yuvabe design system in Figma",
      "Collaborate with engineers to ensure pixel-accurate implementation",
      "Document design decisions and component specs for handoff",
    ],
    requirements: [
      "Portfolio demonstrating strong visual design fundamentals",
      "Proficiency in Figma — layout, components, variants, prototyping",
      "Understanding of responsive design and mobile-first principles",
      "Comfort working in a fast-moving, feedback-driven environment",
      "Strong communication skills and genuine curiosity for product thinking",
    ],
    niceToHave: [
      "Exposure to design systems or component library work",
      "Basic knowledge of HTML/CSS to support handoff conversations",
      "Interest in AI-powered product design workflows",
    ],
  },
  {
    slug: "junior-frontend-developer",
    title: "Junior Frontend Developer",
    level: "entry",
    department: "Engineering",
    location: "Auroville, India · Remote-friendly",
    type: "Full-time",
    posted: "2026-04-22",
    summary:
      "Contribute to building polished, production-ready interfaces for Yuvabe's clients. Write clean React/Next.js code, implement design system components, and grow rapidly under the guidance of senior engineers.",
    responsibilities: [
      "Build and iterate on UI components using React, Next.js, and Tailwind CSS",
      "Translate Figma designs into pixel-accurate, accessible implementations",
      "Participate in code reviews and implement feedback constructively",
      "Maintain and extend the Yuvabe frontend design system",
      "Write clean, well-structured code with an eye for performance",
    ],
    requirements: [
      "Solid understanding of HTML, CSS, and JavaScript",
      "Familiarity with React and component-based architecture",
      "Comfort with version control (Git) and basic pull request workflows",
      "Eagerness to learn and adapt in an AI-first engineering environment",
      "Attention to detail in both code quality and visual implementation",
    ],
    niceToHave: [
      "Exposure to Next.js App Router and server components",
      "Experience with Tailwind CSS and design token systems",
      "Interest in exploring AI-assisted coding tools",
    ],
  },
  {
    slug: "growth-marketing-associate",
    title: "Growth Marketing Associate",
    level: "entry",
    department: "Growth",
    location: "Remote",
    type: "Full-time",
    posted: "2026-04-25",
    summary:
      "Support Yuvabe's growth marketing team executing data-driven campaigns for startup clients. You will learn how to build measurable growth systems across paid, organic, and lifecycle channels.",
    responsibilities: [
      "Assist in planning and executing digital marketing campaigns across Meta, Google, and LinkedIn",
      "Draft and refine copy for ads, emails, and landing pages",
      "Track campaign performance using analytics platforms and generate weekly reports",
      "Research competitor strategies and market trends to inform campaign direction",
      "Support A/B testing setup and data collection for ongoing experiments",
    ],
    requirements: [
      "Solid understanding of marketing fundamentals and digital channels",
      "Comfort with spreadsheets, basic data analysis, and metric tracking",
      "Strong written communication and copywriting instincts",
      "Curiosity for what drives user behavior and conversion",
      "Ability to take initiative and work independently with clear goals",
    ],
    niceToHave: [
      "Exposure to ad platforms (Meta Ads Manager, Google Ads)",
      "Familiarity with CRM tools or email marketing platforms",
      "Interest in applying AI tools to content creation and campaign optimization",
    ],
  },

  // --- Experienced ---
  {
    slug: "senior-product-designer",
    title: "Senior Product Designer",
    level: "experienced",
    department: "Design",
    location: "Auroville, India · Remote-friendly",
    type: "Full-time",
    posted: "2026-04-18",
    summary:
      "Lead design for multiple startup client engagements, owning everything from discovery and strategy through polished delivery. Define how design operates at Yuvabe and mentor the growing design team.",
    responsibilities: [
      "Own the design process end-to-end: discovery, IA, wireframing, prototyping, and handoff",
      "Facilitate discovery workshops and translate founder insights into product direction",
      "Lead design critiques and establish quality standards for the team",
      "Evolve and scale the Yuvabe design system across client projects",
      "Collaborate directly with engineering leads to ensure design intent is fully realized",
      "Mentor junior designers and contribute to a culture of strong craft",
    ],
    requirements: [
      "5+ years of product design experience, preferably in startup or agency contexts",
      "Exceptional Figma skills including advanced prototyping and design system management",
      "Demonstrated ability to drive product thinking, not just visual execution",
      "Strong communication skills to align stakeholders and defend design decisions",
      "Experience working across the full product lifecycle from 0 to 1",
    ],
    niceToHave: [
      "Experience designing AI-native product interfaces or workflows",
      "Familiarity with frontend implementation (HTML/CSS/React awareness)",
      "Background in brand design or motion design",
    ],
    compensation: "Competitive, commensurate with experience",
  },
  {
    slug: "ai-engineering-lead",
    title: "AI Engineering Lead",
    level: "experienced",
    department: "Engineering",
    location: "Auroville, India · Remote-friendly",
    type: "Full-time",
    posted: "2026-04-15",
    summary:
      "Define and build Yuvabe's AI-native engineering capabilities. Architect scalable AI-powered systems for clients, prototype with frontier models, and set the technical direction for how Yuvabe integrates AI into product development.",
    responsibilities: [
      "Architect and implement AI-powered features using LLMs, agents, and data pipelines",
      "Evaluate and integrate frontier AI APIs (Anthropic, OpenAI, Gemini, open-source)",
      "Collaborate with product and design to identify where AI creates the most leverage for clients",
      "Build internal AI tooling to accelerate Yuvabe's own delivery speed",
      "Set engineering standards, review code, and mentor engineers on AI-first patterns",
      "Stay at the leading edge of applied AI research and bring relevant advances into production",
    ],
    requirements: [
      "5+ years of software engineering with 2+ years in applied AI/ML",
      "Hands-on experience building production systems with LLMs and AI APIs",
      "Strong proficiency in Python and TypeScript/JavaScript",
      "Deep understanding of prompt engineering, RAG, and agent system design",
      "Track record of shipping complex AI features in real products",
    ],
    niceToHave: [
      "Experience with Next.js, Supabase, and modern full-stack deployment (Vercel)",
      "Contributions to open-source AI projects or published research",
      "Familiarity with multimodal models and vision APIs",
    ],
    compensation: "Competitive, commensurate with experience",
  },
  {
    slug: "growth-strategy-lead",
    title: "Growth Strategy Lead",
    level: "experienced",
    department: "Growth",
    location: "Remote",
    type: "Full-time",
    posted: "2026-04-20",
    summary:
      "Own and drive growth strategy for Yuvabe's startup clients. Design acquisition, activation, and retention systems, and build repeatable growth playbooks that clients can execute and scale.",
    responsibilities: [
      "Develop end-to-end growth strategies across paid, organic, content, and lifecycle channels",
      "Identify the highest-leverage growth levers for each client through data and discovery",
      "Design and run structured growth experiments with clear hypotheses and measurement",
      "Build dashboards and reporting systems to keep clients focused on the right metrics",
      "Lead client strategy sessions and present findings with clear, actionable direction",
      "Mentor junior growth team members and standardize playbook development",
    ],
    requirements: [
      "6+ years of growth marketing experience, ideally in startup or DTC contexts",
      "Proven track record of driving measurable growth across multiple channels",
      "Strong analytical ability — comfortable with attribution, cohort analysis, and funnel optimization",
      "Experience managing paid budgets of $50K+ per month with positive ROI",
      "Excellent written and verbal communication with executive stakeholders",
    ],
    niceToHave: [
      "Experience using AI tools to scale content, research, and campaign operations",
      "Background in product-led growth (PLG) or self-serve acquisition",
      "Familiarity with B2B SaaS growth motions",
    ],
    compensation: "Competitive, commensurate with experience",
  },
];

export function getJobBySlug(slug: string): Job | undefined {
  return jobListings.find((j) => j.slug === slug);
}

export function getJobsByLevel(level: JobLevel): Job[] {
  return jobListings.filter((j) => j.level === level);
}
