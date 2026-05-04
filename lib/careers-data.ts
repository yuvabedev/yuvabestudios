export type JobLevel = "entry" | "experienced";
export type JobType = "Full-time" | "Part-time" | "Contract" | "Remote";

export type JobBenefits = {
  remote?: string[];
  inPerson?: string[];
};

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
  portfolioRequirement?: string;
  benefits?: JobBenefits;
  compensation?: string;
};

export const jobListings: Job[] = [
  // --- Entry Level ---
  {
    slug: "junior-video-editor",
    title: "Junior Video Editor (with Design Skills)",
    level: "entry",
    department: "Design & Marketing",
    location: "Auroville, India",
    type: "Full-time",
    posted: "2026-05-04",
    summary:
      "We are seeking a Junior Video Editor who is passionate about visual storytelling and digital content creation. Video editing will be the primary responsibility in this role, with design skills supporting the creation of cohesive and engaging visual assets. This position offers an excellent opportunity to gain hands-on experience, learn from mentors, and grow within a collaborative and creative team.",
    responsibilities: [
      "Edit short-form and long-form videos for social media, marketing campaigns, and digital platforms.",
      "Assemble raw footage into high-quality, engaging video outputs.",
      "Add text, transitions, basic motion graphics, sound effects, and background music.",
      "Ensure videos align with brand guidelines, storytelling, and campaign objectives.",
      "Support the design team with basic graphic design tasks when required.",
      "Create thumbnails, posters, and simple visual creatives to complement video content.",
      "Collaborate with designers, marketers, and content teams for smooth execution.",
      "Stay updated with video editing tools, motion trends, and digital content best practices.",
    ],
    requirements: [
      "Freshers or candidates with up to 2 years of relevant experience.",
      "Degree or certification in Media, Film, Animation, Graphic Design, or a related field.",
      "Strong familiarity with video editing tools such as Adobe Premiere Pro, After Effects, CapCut, or DaVinci Resolve.",
      "Working knowledge of design tools like Figma, Illustrator, Photoshop, or Canva.",
      "Basic understanding of video formats, frame rates, and visual storytelling.",
      "Good design sense, attention to detail, and willingness to learn.",
    ],
    niceToHave: [],
    benefits: {
      inPerson: [
        "Competitive salary aligned with skills and experience",
        "Free lunch provided on working days",
        "Access to a strong mentor network for continuous learning and guidance",
        "Hands-on exposure through real-time projects and campaigns",
        "Clear growth and career advancement opportunities within the organisation",
      ],
    },
  },
  {
    slug: "junior-designer",
    title: "Junior Designer",
    level: "entry",
    department: "Design & Marketing",
    location: "Auroville, India",
    type: "Full-time",
    posted: "2026-05-04",
    summary:
      "We're seeking a Junior Designer to join the Design & Marketing team at Yuvabe. This role is ideal for someone passionate about visual communication, digital design, and brand storytelling. Graphic design will be the primary responsibility, supporting the creation of engaging visual assets across digital and print platforms. The ideal candidate is creative, detail-oriented, and eager to learn in a collaborative environment. This position offers hands-on exposure to real-time campaigns, mentorship, and strong growth opportunities within the organisation.",
    responsibilities: [
      "Design engaging visuals for social media, marketing campaigns, and digital platforms.",
      "Create posters, social media creatives, banners, presentations, and other brand assets.",
      "Design pamphlets, brochures, print materials, and other marketing collaterals for campaigns and events.",
      "Work on printables such as flyers, standees, certificates, and promotional materials.",
      "Support basic product design and packaging design for marketing and branding needs.",
      "Ensure all designs follow brand guidelines and maintain visual consistency across platforms.",
      "Collaborate with the marketing and content teams to translate ideas into effective visual communication.",
      "Assist in creating campaign creatives and marketing materials for digital promotions.",
      "Support the video and content team with design assets such as thumbnails, overlays, and simple graphics.",
      "Use AI-assisted design tools to support ideation, visual generation, and workflow efficiency where relevant.",
      "Organise and maintain design files and asset libraries.",
      "Stay updated with design trends, AI-powered creative tools, visual storytelling techniques, and digital content best practices.",
    ],
    requirements: [
      "1–2 years of relevant experience in graphic design or visual communication (Freshers welcome).",
      "Degree or certification in Graphic Design, Visual Communication, Media, or a related field.",
      "Proficiency in design tools such as Adobe Illustrator, Photoshop, and Figma.",
      "Basic understanding of AI-assisted design tools, layout design, typography, colour theory, and brand design principles.",
      "Familiarity with AI tools for design support, including image generation, creative ideation, and workflow optimisation, is a plus.",
      "Strong attention to detail with a good visual aesthetic and sense of composition.",
      "Ability to create social media creatives, marketing materials, and print-ready designs.",
      "Good understanding of branding and maintaining consistency across different platforms and formats.",
      "Ability to work collaboratively in a team, take feedback constructively, and iterate on designs.",
      "Strong communication skills and a proactive approach to problem-solving and execution.",
    ],
    niceToHave: [
      "Experience creating social media creatives and digital marketing assets.",
      "Experience designing brochures, pamphlets, print collaterals, or product packaging.",
      "Basic knowledge of motion graphics, video editing, or animation is an added advantage.",
      "Experience working in a creative or marketing team environment.",
      "Portfolio showcasing a range of design work including social media creatives, branding, print materials, and campaign assets.",
    ],
    benefits: {
      inPerson: [
        "Competitive salary, aligned with skills and experience",
        "Access to mentorship and learning resources",
        "Work from Auroville in a collaborative environment",
        "eBike and free lunch",
        "Direct access to team, mentors, and real-time learning",
      ],
    },
  },
  {
    slug: "content-strategist-creator",
    title: "Content Strategist & Creator",
    level: "entry",
    department: "Design & Marketing",
    location: "Auroville, India",
    type: "Full-time",
    posted: "2026-05-04",
    summary:
      "Yuvabe Studios is looking for a Content Strategist & Creator to plan and execute content across digital platforms. Based in Auroville, this role focuses on storytelling, education, and meaningful communication across Yuvabe initiatives and partner projects. You will work closely with designers, marketing teams, and program leads to create content that builds awareness, communicates clearly, and drives engagement. This role combines strategy and execution, with full ownership of content from idea to output.",
    responsibilities: [
      "Develop and execute content strategies and calendars across platforms like Instagram and LinkedIn.",
      "Create engaging content including posts, captions, blogs, and campaign narratives.",
      "Use AI tools for research, ideation, structuring, and optimization while maintaining quality and originality.",
      "Collaborate with designers and video editors to produce visual and multimedia content.",
      "Ensure consistency in messaging, tone, and brand voice across all content.",
      "Monitor content performance and optimize based on engagement insights and analytics.",
      "Support marketing campaigns through storytelling and content execution.",
      "Work independently with ownership while handling team and client communication when required.",
    ],
    requirements: [
      "1+ year of experience in content strategy, content marketing, or social media management.",
      "Strong writing skills with the ability to create clear, engaging, and structured content.",
      "Familiarity with AI tools such as ChatGPT, Claude, or Perplexity for content workflows.",
      "Experience managing content calendars and platform formats (posts, carousels, reels/shorts, LinkedIn).",
      "Ability to simplify complex ideas into engaging and accessible content.",
      "Basic understanding of content performance metrics and audience engagement.",
      "Ability to work independently with ownership and communicate effectively with teams and clients.",
      "Willingness to work from Auroville and be part of the Yuvabe ecosystem.",
    ],
    niceToHave: [
      "Experience with Canva, Figma, or basic design tools.",
      "Experience creating short-form video content.",
      "Basic understanding of SEO and blog writing.",
      "Experience in education, social impact, or creative fields.",
    ],
    portfolioRequirement:
      "Portfolio showcasing content strategy and execution across platforms, including social media posts, campaigns, or long-form content, along with examples of performance, growth, or engagement outcomes.",
    benefits: {
      inPerson: [
        "Competitive salary aligned with skills and experience",
        "Work from Auroville in a collaborative, learning-focused environment",
        "Exposure to projects across education, design, and technology",
        "Access to mentorship and creative growth opportunities",
        "eBike and free lunch",
      ],
    },
  },

  // --- Experienced ---
  {
    slug: "uiux-designer-ai-focus",
    title: "UI/UX Designer (AI Focus)",
    level: "experienced",
    department: "Design & Marketing",
    location: "Auroville, India",
    type: "Full-time",
    posted: "2026-05-04",
    summary:
      "Yuvabe Studios is looking for a UI/UX Designer (AI Focus) who is passionate about creating meaningful digital experiences using modern design tools and AI-assisted workflows. Based in Auroville, a global township centered on collaboration and conscious living, this role focuses on designing user-centric, impactful digital products. You will work with a multidisciplinary team on real-world projects for startups, social enterprises, and global brands. This is a hands-on role for someone curious, adaptable, and excited to explore how AI enhances UI/UX design, product thinking, and creative workflows.",
    responsibilities: [
      "Design user-centric digital experiences across web and mobile, from wireframes to high-fidelity UI.",
      "Translate research and briefs into user journeys, flows, prototypes, and scalable design systems while maintaining brand consistency.",
      "Leverage AI tools for ideation, layout generation, rapid prototyping, design variations, and workflow optimization.",
      "Create interactive prototypes, visual systems, and UI elements, exploring multiple design directions for validation.",
      "Collaborate with developers, content teams, and stakeholders to deliver cohesive and high-quality digital products.",
      "Continuously iterate designs using feedback, usability testing, analytics, and A/B testing.",
      "Stay updated with UI/UX trends, emerging technologies, and AI-driven design workflows.",
    ],
    requirements: [
      "Minimum 2 years of experience in UI/UX or product design (agency, startup, or product-based environment preferred).",
      "Strong portfolio demonstrating UI/UX thinking, clean visual design, product work, and interactive prototypes.",
      "Proficiency in tools like Figma and Adobe Creative Suite (Photoshop, Illustrator; After Effects is a plus).",
      "Familiarity with AI-assisted design tools and workflows.",
      "Strong understanding of user-centered design principles, usability, layout, typography, and visual hierarchy.",
      "Ability to conduct UX research and apply insights within fast-paced sprint workflows.",
      "Good communication skills and ability to collaborate in feedback-driven environments.",
      "Willingness to work from Auroville as part of the Yuvabe ecosystem.",
    ],
    niceToHave: [
      "Experience with AI tools such as Firefly, Lovable, Claude, or similar.",
      "Knowledge of motion design, micro-interactions, or animation.",
      "Basic understanding of frontend concepts (HTML, CSS, responsive design).",
      "Experience with design systems, accessibility, or inclusive design.",
      "Interest in AI workflows, product design, or creative automation.",
      "Exposure to impact-driven domains like education, sustainability, or social innovation.",
      "Curiosity for emerging tools, AI workflows, and evolving design trends.",
    ],
    compensation: "Competitive, commensurate with experience",
  },
  {
    slug: "full-stack-developer",
    title: "Full Stack Developer",
    level: "experienced",
    department: "AI/ML & Development",
    location: "Auroville, India",
    type: "Full-time",
    posted: "2026-05-04",
    summary:
      "Yuvabe Studios is looking for a Full Stack Developer (AI Engineer) to build modern, AI-enabled web applications for real client and product use cases. Engineering at Yuvabe is hands-on and outcome-driven, with a strong focus on building reliable systems, clean interfaces, and practical AI solutions. You will work closely with designers, product thinkers, and engineers on active client projects, owning features end-to-end — from frontend interfaces to backend APIs and AI integrations.",
    responsibilities: [
      "Develop and maintain full-stack web applications using Next.js and TypeScript.",
      "Build backend services and APIs using FastAPI or TypeScript-based backend frameworks.",
      "Design clean, scalable API architectures and data flows.",
      "Integrate and manage LLM APIs such as OpenAI and Claude in production systems.",
      "Implement frontend state management using Zustand.",
      "Build responsive and maintainable UI components using Tailwind CSS.",
      "Work actively on client projects, contributing to feature development, fixes, and iterations.",
      "Collaborate with designers, product leads, and developers to deliver production-ready outcomes.",
      "Write clear, maintainable, and well-structured code.",
    ],
    requirements: [
      "Minimum 2+ years of professional experience in full-stack development.",
      "Hands-on experience with Next.js, TypeScript, Python, Tailwind CSS, and Zustand.",
      "Experience building backend systems using FastAPI or any TypeScript-based backend framework.",
      "Strong understanding of API design, request/response handling, and backend fundamentals.",
      "Experience integrating LLM APIs such as OpenAI or Claude.",
      "Comfort working on real client projects with evolving requirements.",
      "Willingness to work from Auroville and be part of the Yuvabe ecosystem.",
    ],
    niceToHave: [
      "Prior experience building multi-agent AI systems using LangGraph, CrewAI, or similar frameworks.",
      "Exposure to cloud infrastructure such as GCP, AWS, or Azure.",
      "Understanding of AI workflows, prompt engineering, or agent orchestration.",
      "Experience working in early-stage products or fast-moving teams.",
    ],
    benefits: {
      inPerson: [
        "Competitive salary, aligned with skills and experience",
        "Work from Auroville, a globally unique environment focused on learning and collaboration",
        "Work closely with a small, focused team building real-world systems",
        "Exposure to client projects across startups, products, and AI-driven platforms",
        "Access to a mentor network for technical and professional growth",
        "eBike and free lunch",
        "A work culture aligned with Yuvabe's ethos: Work with integrity and technical depth, build useful systems, and learn continuously through real work",
      ],
    },
    compensation: "Competitive, aligned with skills and experience",
  },
  {
    slug: "digital-marketing-performance-specialist",
    title: "Digital Marketing & Performance Specialist",
    level: "experienced",
    department: "Design & Marketing",
    location: "Remote · Auroville, India",
    type: "Full-time",
    posted: "2026-05-04",
    summary:
      "Yuvabe Studios is looking for a Digital Marketing & Performance Specialist to plan, execute, and optimize digital campaigns across multiple channels. This is a flexible role — work remotely or from Auroville, a global experimental township focused on collaboration, learning, and conscious living. Marketing at Yuvabe is practical and outcome-driven. You will work on real campaigns across Yuvabe initiatives and client projects, with a strong focus on lead generation, performance metrics, and continuous optimization. You will collaborate with designers, content creators, and product teams to drive measurable growth, not just activity.",
    responsibilities: [
      "Plan and execute campaigns across Meta Ads (Facebook & Instagram), Google Ads (Search, Display, YouTube), Google My Business, and LinkedIn Ads.",
      "Track, analyze, and improve performance using GA4, Looker Studio, and platform dashboards, optimizing key metrics such as CTR, CPA, cost per lead, conversion rate, and ROAS, and translating insights into actionable improvements.",
      "Create and iterate ad creatives and variations using tools like Canva, Figma, or similar, while running A/B tests across creatives, audiences, and funnels.",
      "Collaborate with content, design, and product teams to improve campaign assets, landing pages, and overall funnel performance.",
      "Build and present performance reports, insights, and recommendations, while managing client communication when required.",
      "Work independently with full ownership of campaigns and outcomes.",
    ],
    requirements: [
      "2–3 years of experience in digital marketing and campaign management.",
      "Hands-on experience with Meta Ads, Google Ads (Search, Display, YouTube), and LinkedIn Ads.",
      "Proven experience in lead generation campaigns with measurable results.",
      "Experience with GA4, Looker Studio, and performance analytics tools.",
      "Strong understanding of CPC, CPA, CTR, cost per lead, ROAS, and conversion funnels.",
      "Experience with A/B testing and campaign optimization.",
      "Basic design skills to modify creatives and create ad variations independently.",
      "Familiarity with AI tools in marketing workflows (research, ad copy, analysis, efficiency).",
      "Ability to work independently with ownership and communicate effectively in client-facing situations.",
    ],
    niceToHave: [],
    portfolioRequirement:
      "Portfolio demonstrating end-to-end campaign ownership (targeting, setup, budgeting, optimization, and scaling), along with lead generation results, performance metrics (CPL, ROAS, CTR), and optimization approach.",
    benefits: {
      remote: [
        "Competitive salary aligned with skills and experience",
        "Flexible, outcome-focused work environment",
        "Exposure to diverse campaigns across industries",
        "Access to mentorship and learning resources",
      ],
      inPerson: [
        "Competitive salary aligned with skills and experience",
        "Work from Auroville in a collaborative environment",
        "Direct access to team, mentors, and real-time learning",
        "eBike and free lunch",
      ],
    },
    compensation: "Competitive, aligned with skills and experience",
  },
];

export function getJobBySlug(slug: string): Job | undefined {
  return jobListings.find((j) => j.slug === slug);
}

export function getJobsByLevel(level: JobLevel): Job[] {
  return jobListings.filter((j) => j.level === level);
}
