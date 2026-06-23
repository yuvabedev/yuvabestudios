"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaTwitter, FaLinkedin, FaFacebook, FaLink } from "react-icons/fa";
import FaqSection from "@/components/FaqSection";
import BlogSEO from "@/components/seo/BlogSEO";

const seoFaqs = [
  {
    question: "What is AEO (AI Engine Optimization)?",
    answer:
      "AEO is the practice of optimizing content so AI tools and answer engines can understand, trust, and surface it as a direct answer.",
  },
  {
    question: "Is SEO still relevant in the age of AI?",
    answer:
      "Yes. SEO is evolving from keyword ranking to semantic authority, structured data, and brand trust.",
  },
  {
    question: "What is the difference between SEO and AEO?",
    answer:
      "SEO focuses on ranking pages, while AEO focuses on being selected as the answer by AI systems.",
  },
  {
    question: "How does Google SGE affect SEO strategy?",
    answer:
      "Google SGE prioritizes entity understanding, context, and trusted sources over traditional keyword-based ranking.",
  },
  {
    question: "How does Yuvabe Studios approach SEO and AEO?",
    answer:
      "Yuvabe Studios blends technical SEO, semantic architecture, UX, and AI insights to help brands stay visible in AI-first search environments.",
  },
];
export default function seo() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <BlogSEO
        title="Is SEO Still Relevant in the Age of AI & AEO? | Yuvabe Studios"
        description="Discover why SEO is evolving — not dying — in the AI era. Learn how semantic structure, AEO, and trust signals define the new search game."
        slug="seo-in-the-age-of-ai"
        image="https://yuvabestudios.com/blog/marketing/aeo.png"
        author="Priya"
        role="UI/UX Mentor & Practice Lead - Digital Marketing"
        date="2025-11-04"
        readTime="8"
      />

      {/* Breadcrumbs */}
      <nav className="max-w-6xl mx-auto px-6 py-4 text-sm text-gray-600">
        <ul className="flex space-x-2">
          <li>
            <Link href="/" className="hover:text-[#5829C7]">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/blog" className="hover:text-[#5829C7]">
              Blog
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-800">SEO in the Age of AI & AEO</li>
        </ul>
      </nav>

      {/* Meta Info */}
      <div className="max-w-6xl mx-auto px-6 text-black text-sm mb-4">
        <p>
          Published on <span className="text-gray-800">November 4, 2025</span> ·
          8 min read
        </p>
      </div>

      {/* Title */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.h1
          className="text-3xl md:text-5xl font-semibold text-black font-secondary leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          SEO in the Age of AI & AEO: The End of an Era or a Smarter Beginning?
        </motion.h1>

        <p className="text-lg italic text-black font-secondary my-4">
          Why AI isn’t killing SEO — it’s forcing it to evolve into something
          more strategic, semantic, and human.
        </p>

        {/* Author field */}
        <p className="text-[16px] font-medium text-gray-500 mb-4">
          – By <span className="text-[#5829C7]">Priya</span>, Ui/Ux Mentor &
          Pratice Lead - Digital Marketing, Yuvabe Studios
        </p>

        <h3 className="text-xl font-medium font-secondary text-gray-800">
          Answer Summary:
        </h3>
        <p className="text-lg  text-black font-secondary mb-4">
          Measuring UX beyond usability means understanding not just what users
          do, but how they feel while interacting with digital products.
          Emotional UX helps drive retention, trust, and advocacy by aligning
          design decisions with human emotion and business outcomes.
        </p>
      </div>

      {/* Blog Content */}
      <main className="max-w-6xl mx-auto  px-6 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="prose prose-lg prose-indigo"
        >
          {/* Intro Section with Bigger Font */}
          <section className=" rounded-2xl mb-12">
            <h2 className="text-3xl font-semibold  font-secondary text-[#000] mb-4">
              The Quiet Disruption Happening in Search
            </h2>
            <p className="text-lg leading-relaxed text-black font-secondary">
              Search behavior is undergoing a seismic shift — not because
              keywords have lost their power, but because the way people
              discover, consume, and trust information has evolved.
            </p>
            <p className="text-lg leading-relaxed text-black font-secondary mt-4">
              Today, that&apos;s changing. In a world where digital experiences
              shape brand perception more than ever, emotional response has
              become a core UX metric. Whether it&apos;s the sense of calm in a
              meditation app, the confidence you feel making a banking
              transaction, or the thrill of unlocking a gaming reward —
              emotional resonance determines whether users return, advocate, and
              ultimately, trust your brand.
            </p>
            <p className="text-lg leading-relaxed text-black font-secondary mt-4">
              This isn&apos;t a small update. It&apos;s a structural shift.
            </p>
            <ul className="list-disc list-inside space-y-2 text-black font-secondary">
              <li>Traditional SEO was about ranking in the top 10.</li>
              <li>
                Modern SEO is about being the answer — not just a blue link.
              </li>
            </ul>
            <p className="text-lg leading-relaxed text-black font-secondary mt-4">
              And this is where <strong>AI Engine Optimization (AEO) </strong>{" "}
              enters the picture.
            </p>

            <div className="max-w-4xl mx-auto h-auto px-6  py-6">
              <div className="relative w-full h-[200px] md:h-[500px]  overflow-hidden ">
                <Image
                  src="/blog/marketing/seo-banner.png"
                  alt="SEO to AEO FUnnel"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <p className="mt-4 text-sm font-medium italic text-gray-700 font-secondary text-center max-w-2xl mx-auto">
                Caption: Traditional keyword-based strategies (left) are giving
                way to structured data and semantic relationships (center),
                ultimately powering AI engines that deliver entity-based answers
                (right)
              </p>
            </div>
          </section>
          {/* Why Run LLMs Locally Section */}
          <section className=" mb-12">
            <div className="mb-6">
              <h3 className="text-xl md:text-3xl font-semibold font-secondary mb-4">
                From SEO to AEO: The New Search Battlefield
              </h3>
              <p className="text-black mb-4">
                AEO (AI Engine Optimization) is the emerging discipline of
                optimizing content and brand presence for AI models and answer
                engines, not just for search crawlers.
              </p>
              <ul className="list-disc list-inside space-y-2 text-black font-secondary">
                <li>
                  <strong> Structured, semantically rich content </strong> that
                  LLMs can easily parse and summarize.
                </li>
                <li>
                  <strong>Authoritativeness and entity recognition </strong> —
                  so AI engines can confidently surface your content as a
                  “trusted source.”
                </li>
                <li>
                  <strong>Conversational clarity </strong>— phrasing answers the
                  way a human (or AI assistant) would.
                </li>
                <li>
                  <strong>Context over keywords </strong> — because AI ranks
                  based on relationships between concepts, not just keyword
                  frequency.
                </li>
              </ul>
              <p className="text-black mt-4 font-secondary font-medium">
                This is why brands that cling to old SEO tactics such as keyword
                stuffing, thin content, shallow listicles are slowly becoming
                invisible in the AI layer of search.
              </p>
            </div>

            <div className="max-w-4xl mx-auto h-auto px-6  py-6">
              <div className="relative w-full h-[200px] md:h-[600px]  overflow-hidden ">
                <Image
                  src="/blog/marketing/leonardo.png"
                  alt="SEO to AEO FUnnel"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <p className="mt-4 text-sm font-medium italic text-gray-700 font-secondary text-center max-w-3xl mx-auto">
                (Caption: Google’s Knowledge Graph in action p: A search for
                “Leonardo da Vinci” surfaces interconnected entities (person,
                artworks, periods, influences) — a clear example of semantic
                search at work.)
              </p>
            </div>
          </section>
          {/* Callout Box */}
          <h3 className="text-xl font-semibold font-secondary ">
            Callout Box: Three Things to Fix on Your Website Before AEO
          </h3>
          <div className="border-2 border-gray-300 p-6 my-4 shadow-sm max-w-2xl   justify-start">
            <ul className="list-disc list-inside font-secondary text-gray-700 space-y-2">
              <li>
                <strong>Broken Schema & Metadata:</strong> Run a structured data
                audit. Ensure FAQ, HowTo, and Product markups are valid and
                crawlable.
              </li>
              <li>
                <strong>Content Without Clear Entities:</strong> Rewrite content
                to center key entities (people, brands, places, concepts). This
                makes your site “AI-readable.”
              </li>
              <li>
                <strong>Siloed Pages:</strong> Build topic clusters and internal
                links. AI thrives on semantic relationships, not isolated blog
                posts.
              </li>
            </ul>
          </div>
          <div className="max-w-4xl mx-auto h-auto px-6  py-6">
            <div className="relative w-full h-[200px] md:h-[500px]  overflow-hidden ">
              <Image
                src="/blog/marketing/aeo.png"
                alt="3 things on aeo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          {/* Inline Section Image */}
          <section className=" mb-6">
            <div className="mb-6">
              <h2 className="text-3xl font-semibold mb-4 font-secondary">
                Why SEO Isn’t Dead — But It Is Growing Up{" "}
              </h2>

              <p className="text-gray-600 mb-4 font-secondary">
                Every time a new technology emerges, we hear “SEO is dead.” We
                heard it during the rise of mobile first strategies. During
                voice search. During the Core Web Vitals rollout. Each time,{" "}
                <strong>SEO didn&apos;t die — it evolved. </strong>
              </p>

              <p className="text-gray-600 mb-6 font-secondary">
                But this moment is different because the{" "}
                <strong>discovery interface itself is changing</strong>. Users
                are:
              </p>

              <ul className="list-disc list-inside text-gray-700 space-y-3 mb-6 font-secondary">
                <li>
                  <strong>Asking questions conversationally, </strong> not
                  typing disjointed keywords.
                </li>
                <li>
                  <strong>Relying on AI summaries</strong> to filter noise and
                  save time.
                </li>
                <li>
                  <strong>
                    Choosing fewer sources, but more trusted ones,
                  </strong>{" "}
                  because AI pre-screens the options.
                </li>
              </ul>

              <p className="text-gray-600 font-secondary">
                This means SEO is moving from a game of “traffic volume” to a
                discipline of
                <strong>
                  {" "}
                  “information architecture + semantic authority + brand trust.”
                </strong>
              </p>
              <p className="text-gray-600 font-secondary">
                If traditional SEO was about ranking higher, the future is about{" "}
                <strong>being the most trusted entity in your domain </strong>—
                the one AI answers with.
              </p>
            </div>

            <div className="max-w-4xl mx-auto h-auto px-6  py-6">
              <div className="relative w-full h-[200px] md:h-[550px]  overflow-hidden ">
                <Image
                  src="/blog/marketing/picture2.png"
                  alt="bagless vacuum technology"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <p className="mt-4 text-sm font-medium italic text-gray-700 font-secondary text-center max-w-3xl mx-auto">
                (Caption: An example of Google&apos;s Search Generative
                Experience (SGE) displaying an AI Overview on top of traditional
                search results — marking the shift from keyword-based ranking to
                AI-powered entity answers.)
              </p>
            </div>
          </section>

          <section className="max-w-6xl mx-auto  py-10 text-gray-800">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 font-secondary">
              The Strategic Core of Modern SEO + AEO
            </h2>

            <p className="text-gray-600 mb-8 font-secondary text-base md:text-lg leading-relaxed">
              SEO in 2025 should be approached as a three-layer strategy:
            </p>

            {/* Foundational Layer */}
            <article className="mb-8">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4 font-secondary">
                1. Foundational Layer: Technical SEO + Schema + Accessibility
              </h3>
              <p className="text-gray-600 font-secondary mb-4 text-base md:text-lg leading-relaxed">
                The basics haven’t gone away. Clean site structure,
                crawlability, Core Web Vitals, schema markup — these are
                non-negotiable hygiene factors. AI can’t use what it can’t
                understand.
              </p>
            </article>

            {/* Semantic Layer */}
            <article className="mb-8">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4 font-secondary">
                2. Semantic Layer: Topic Graphs, Entities & Context
              </h3>
              <p className="text-gray-600 font-secondary mb-4 text-base md:text-lg leading-relaxed">
                Instead of chasing hundreds of keywords, we build structured
                knowledge architectures. This includes:
              </p>

              <ul className="list-disc list-inside text-gray-700 space-y-3 mb-6 font-secondary text-base md:text-lg">
                <li>Creating topic clusters around core entities.</li>
                <li>
                  Using internal linking to mirror conceptual relationships.
                </li>
                <li>
                  Embedding structured data and clear hierarchies so AI models
                  know what’s connected to what.
                </li>
              </ul>

              <p className="text-gray-600 font-secondary text-base md:text-lg leading-relaxed">
                This approach turns your website from a “collection of pages”
                into a <span className="font-semibold">semantic graph</span>{" "}
                that AI can map, summarize, and trust.
              </p>
            </article>

            {/* Human Layer */}
            <article>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4 font-secondary">
                3. Human Layer: Voice, Depth & Brand Authority
              </h3>
              <p className="text-gray-600 font-secondary mb-4 text-base md:text-lg leading-relaxed">
                This is where many fail. AI tools can generate content — but
                they cannot replicate lived expertise, case studies, point of
                view, or trust signals. We inject:
              </p>

              <ul className="list-disc list-inside text-gray-700 space-y-3 mb-6 font-secondary text-base md:text-lg">
                <li>Original research and data points.</li>
                <li>Industry POV and commentary.</li>
                <li>
                  Clean, conversational language optimized for AI understanding.
                </li>
                <li>
                  Author profiles and signals of{" "}
                  <span className="font-semibold">E-E-A-T</span> (Experience,
                  Expertise, Authoritativeness, Trustworthiness).
                </li>
              </ul>

              <p className="text-gray-600 font-secondary text-base md:text-lg leading-relaxed">
                This combination of{" "}
                <span className="font-semibold">
                  machine readability + semantic structure + human depth
                </span>{" "}
                is what AEO thrives on.
              </p>
            </article>
          </section>

          <section className="max-w-6xl mx-auto  py-6 text-gray-800">
            <h2 className="text-xl md:text-3xl font-semibold mb-4">
              Callout Box: AEO vs SEO — Quick Comparison
            </h2>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 text-sm md:text-base">
                <thead className="bg-gray-100 font-secondary">
                  <tr>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Aspect
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Traditional SEO
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      AEO (AI Engine Optimization)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50 font-secondary">
                    <td className="border border-gray-300 px-4 py-3">Focus</td>
                    <td className="border border-gray-300 px-4 py-3">
                      Keywords & Rankings
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Entities, Semantic Structure & Authority
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 font-secondary">
                    <td className="border border-gray-300 px-4 py-3">Output</td>
                    <td className="border border-gray-300 px-4 py-3">
                      SERP Results (Top 10)
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      AI Answers / Summaries / Featured Citations
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 font-secondary">
                    <td className="border border-gray-300 px-4 py-3">
                      Optimization Unit
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Individual pages
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Topic clusters / Knowledge graphs
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 font-secondary">
                    <td className="border border-gray-300 px-4 py-3">
                      Language Style
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Keyword-optimized
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Conversational, clear, answer-focused
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 font-secondary">
                    <td className="border border-gray-300 px-4 py-3">
                      Trust Signals
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Backlinks, domain authority
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      E-E-A-T, structured data, entity linking
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-600 mt-8 font-secondary leading-relaxed">
              Designing <span className="italic">“for feelings”</span> doesn’t
              mean adding decorative elements — it means orchestrating every
              interaction to evoke a specific emotional state, consistently and
              intentionally.
            </p>
          </section>

          <section className="max-w-6xl mx-auto py-16 text-gray-800">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-semibold mb-8 font-secondary">
              5 Strategic Shifts Smart Brands Are Making Right Now
            </h2>

            {/* Strategic Shifts List */}
            <ol className="list-decimal pl-6 space-y-8 font-secondary font-medium text-base md:text-lg leading-relaxed">
              <li>
                <div className="pl-2">
                  <h3 className="inline font-semibold text-xl md:text-2xl font-secondary">
                    From Keywords to Questions & Context:
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Focus less on “best CRM tools” and more on “How can small
                    businesses automate customer engagement in 2025?” because AI
                    surfaces answers, not keyword matches.
                  </p>
                </div>
              </li>

              <li>
                <div className="pl-2">
                  <h3 className="inline font-semibold text-xl md:text-2xl font-secondary">
                    From Content Volume to Content Authority:
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Instead of 100 thin blogs, invest in 10 deep, structured,
                    reference-worthy content pieces that become the “go-to” for
                    AI engines.
                  </p>
                </div>
              </li>

              <li>
                <div className="pl-2">
                  <h3 className="inline font-semibold text-xl md:text-2xl font-secondary">
                    From Ranking Pages to Owning Topics:
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Build interconnected hubs around themes (e.g., “sustainable
                    beauty,” “on-device AI,” “emotional UX”), so AI recognizes
                    your site as an{" "}
                    <span className="italic">authority graph</span>.
                  </p>
                </div>
              </li>

              <li>
                <div className="pl-2">
                  <h3 className="inline font-semibold text-xl md:text-2xl font-secondary">
                    From Metadata Tweaks to Structured Knowledge:
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Use schema, FAQs, HowTo markup, and entity-based
                    optimization to feed AI with clean signals, not just hope it
                    “gets it.”
                  </p>
                </div>
              </li>

              <li>
                <div className="pl-2">
                  <h3 className="inline font-semibold text-xl md:text-2xl font-secondary">
                    From SEO in Silos to Cross-functional AEO:
                  </h3>
                  <p className="text-gray-600 text-md mt-2">
                    SEO now involves content strategists, UX designers,
                    developers, data analysts, and AI specialists working
                    together. It’s no longer a marketing bolt-on; it’s a
                    strategic layer of brand visibility.
                  </p>
                </div>
              </li>
            </ol>

            {/* Brand Advantage in AEO Era */}
            <article className="mt-10">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 font-secondary">
                The Brand Advantage in the AEO Era
              </h2>
              <p className="text-gray-600 mb-4 font-secondary text-base md:text-md leading-relaxed">
                Here’s the twist: As AI intermediates search, brand recognition
                and emotional trust become even more important. When users see a
                summary or a single recommended source, they’re more likely to
                click on a brand they already trust.
              </p>
              <p className="text-gray-600 mb-4 font-secondary text-base md:text-md leading-relaxed">
                So ironically, AI is making strong brands stronger — and
                invisible brands more invisible. This means SEO in 2025 is not
                just about optimizing for search engines, but also about
                building{" "}
                <span className="font-semibold">reputation capital</span> that
                AI respects.
              </p>
            </article>

            {/* Final Thoughts */}
            <article className="mt-10">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 font-secondary">
                Final Thoughts: SEO is Evolving, Not Erasing
              </h2>
              <p className="text-gray-600 mb-4 font-secondary text-base md:text-md leading-relaxed">
                SEO is not dying — the way we do SEO is. In the age of AI
                optimization and AEO, ranking well means structuring your
                content like a knowledge graph, writing like a trusted human,
                and thinking like an AI.
              </p>
              <p className="text-gray-600 mb-4 font-secondary text-base md:text-md leading-relaxed">
                At <span className="font-semibold">Yuvabe Studios</span>, we’re
                helping forward-thinking brands build future-proof
                discoverability systems — blending technical SEO, semantic
                architecture, and AI-led insights to not just keep up, but lead.
              </p>
              <p className="text-gray-600 font-secondary text-base md:text-md leading-relaxed">
                If you’re ready to make your brand visible in the AI-first
                search landscape,{" "}
                <Link
                  href="/contact"
                  className="text-blue-600 hover:underline hover:text-blue-700 transition-colors duration-200"
                >
                  let’s talk.
                </Link>
              </p>
            </article>
          </section>

          <FaqSection
            title="Frequently Asked Questions (FAQ)"
            description="Here’s Few things you need to know about SEO in the Age of AI"
            faqs={seoFaqs}
          />

          {/* Share Section */}
          <div className="border-t pt-6 my-10 ">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Share this article:
            </h4>
            <div className="flex flex-wrap gap-4">
              {/* Twitter/X */}
              <a
                href="https://twitter.com/intent/tweet?url=https://www.yuvabestudios.com/blog/seo-in-the-age-of-ai/&text=Check%20out%20this%20article%20about%20Running%20LLMs%20Locally!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:opacity-80 transition"
              >
                <FaTwitter className="text-white" />
                <span>Twitter</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.yuvabestudios.com/blog/seo-in-the-age-of-ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:opacity-80 transition"
              >
                <FaLinkedin className="text-white" />
                <span>LinkedIn</span>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://www.yuvabestudios.com/blog/seo-in-the-age-of-ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:opacity-80 transition"
              >
                <FaFacebook className="text-white" />
                <span>Facebook</span>
              </a>

              {/* Copy Link */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    "https://www.yuvabestudios.com/blog/seo-in-the-age-of-ai/",
                  );
                  alert("Link copied to clipboard!");
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:opacity-80 transition"
              >
                <FaLink className="text-white" />
                <span>Copy Link</span>
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
