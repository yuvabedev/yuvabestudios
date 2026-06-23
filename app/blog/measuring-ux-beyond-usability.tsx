"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaTwitter, FaLinkedin, FaFacebook, FaLink } from "react-icons/fa";
import BlogSEO from "@/components/seo/BlogSEO";
import FaqSection from "@/components/FaqSection";

const MeasuringUXFaqs = [
  {
    question: "What is emotional UX?",
    answer:
      "Emotional UX focuses on how users feel during interactions, not just whether tasks are completed successfully.",
  },
  {
    question: "Why is usability alone no longer enough in UX design?",
    answer:
      "Usability ensures functionality, but emotional response drives retention, trust, and long-term engagement.",
  },
  {
    question: "How can emotions be measured in UX research?",
    answer:
      "Through methods like emotion mapping, affective testing, sentiment analysis, and qualitative user feedback.",
  },
  {
    question: "What industries benefit most from emotional UX design?",
    answer:
      "Fintech, wellness, gaming, education, and e-commerce benefit significantly because trust and engagement are emotionally driven.",
  },
  {
    question: "How does Yuvabe Studios approach emotional UX?",
    answer:
      "Yuvabe Studios blends research, emotional intelligence, and design strategy to create experiences that feel meaningful while delivering measurable business impact.",
  },
];

const images = [
  {
    src: "/blog/Ui-blog/snapshot01.png",
    alt: "North South Foundation Event 1",
    caption: "(Source:https://www.calm.com/)",
  },
  {
    src: "/blog/Ui-blog/snapshot02.jpg",
    alt: "North South Foundation Event 2",
    caption: "(Source: Airbnb on App Store)",
  },
  {
    src: "/blog/Ui-blog/snapshot03.png",
    alt: "North South Foundation Event 3",
    caption: "Duolingo’s streaks improve user engagement (Source: Duolingo)",
  },
];

export default function MeasuringUX() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <BlogSEO
        title="From Clicks to Emotions: Measuring UX Beyond Usability | Yuvabe Studios"
        description="Discover why emotional UX is the new frontier. Learn methods like emotion mapping & affective testing to design experiences that truly connect."
        slug="measuring-ux-beyond-usability"
        image="https://yuvabestudios.com/blog/ui-design.png"
        author="Priya & Sagar"
        role="UI/UX Leadership Team"
        date="2025-10-28"
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
          <li className="text-gray-800">From Clicks to Emotions</li>
        </ul>
      </nav>

      {/* Meta Info */}
      <div className="max-w-6xl mx-auto px-6 text-black text-sm mb-10">
        <p>
          Published on <span className="text-gray-800">October 28, 2025</span> ·
          8 mins read
        </p>
      </div>

      {/* Title */}
      <div className="max-w-6xl mx-auto px-6 mb-6">
        <motion.h1
          className="text-3xl md:text-5xl font-semibold font-secondary text-black leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          From Clicks to Emotions: Measuring UX Beyond Usability
        </motion.h1>

        <p className="text-lg italic text-black font-secondary my-4">
          Why the future of great design lies not just in what users do, but in
          how they feel
        </p>

        {/* Author field */}
        <p className="text-[16px] font-medium text-gray-500 mb-4">
          – By <span className="text-[#5829C7]">Priya</span>, UI/UX Mentor &
          Pratice Lead and <span className="text-[#5829C7]">Sagar</span>, UI/UX
          Design Lead, Yuvabe Studios
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

      {/* Hero Banner Image */}
      <div className="max-w-4xl mx-auto h-auto px-6 mb-12">
        <div className="relative w-full h-[200px] md:h-[500px]  overflow-hidden ">
          <Image
            src="/blog/ui-design.png"
            alt="Running LLMs Locally"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Blog Content */}
      <main className="max-w-6xl mx-auto py-4 px-6 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="prose prose-lg prose-indigo"
        >
          {/* Introduction Section */}
          <section className=" rounded-2xl mb-12">
            <h2 className="text-xl font-medium text-[#5829C7] mb-4 font-secondary">
              Why Measuring UX Beyond Usability Matters
            </h2>
            <p className="text-lg leading-relaxed text-black font-secondary">
              In 2025, designing only for usability is like measuring music with
              a stopwatch. Accurate but incomplete. For years, UX success was
              defined by clean, rational metrics: click-through rates, task
              completion times, bounce rates, heatmaps. These numbers told us
              what users did, but rarely how they felt while doing it.
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
              At Yuvabe Studios, we&apos;ve seen this shift firsthand across
              industries and platforms. As seasoned designers, the challenge
              before us is clear:{" "}
              <strong>
                move from designing for clicks to designing for connection.{" "}
              </strong>
            </p>

            <div className="relative w-full flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-4 my-10">
              <motion.div
                className="w-[80%] md:w-[546px] h-auto rounded-[16px] overflow-hidden"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Image
                  src="/blog/Ui-blog/image02.png"
                  alt="Mockup 2"
                  width={546}
                  height={362}
                  className="object-cover w-full h-full"
                />
              </motion.div>
            </div>
          </section>
          {/* Why Run LLMs Locally Section */}
          <section className=" mb-12">
            <div className="mb-6">
              <h2 className="text-xl font-medium font-secondary mb-4">
                The Business Impact of Emotional UX
              </h2>
              <p className="text-black mb-4">
                Emotion isn&apos;t just a design flourish — it&apos;s a growth
                driver. Data shows that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-black font-secondary">
                <li>
                  A 1-point increase in positive emotional response can boost
                  retention by 10–15% across sectors.
                </li>
                <li>
                  Emotionally resonant brands experience 3× higher advocacy and
                  word-of-mouth compared to feature-led competitors.
                </li>
                <li>
                  Companies that measure and design for emotion are 2.5× more
                  likely to outperform competitors in customer satisfaction.
                  <br />
                  (Sources: Forrester, Nielsen Norman Group)
                </li>
              </ul>
              <p className="text-black mt-4 font-secondary font-medium">
                In an era where functional parity is the norm, emotion is what
                moves the needle.
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-medium mb-4">
                Why Emotional Response Is Now a Core UX Metric
              </h2>
              <p className="text-black mb-4">
                Think about your favorite apps. Chances are, what makes them
                memorable isn&apos;t just their functionality — it&apos;s how
                they make you feel.
              </p>
              <ul className="list-disc list-inside space-y-2 text-black font-secondary">
                <li>
                  <strong>Airbnb </strong> doesn&apos;t just let you book a
                  stay; it gives you a sense of belonging.
                </li>
                <li>
                  <strong>Calm </strong> doesn&apos;t just play sounds; it
                  guides your mood.
                </li>
                <li>
                  <strong> Duolingo</strong> isn&apos;t just about language
                  learning; it makes learning feel like a game.
                  <br />
                  (Sources: Forrester, Nielsen Norman Group)
                </li>
              </ul>
              <p className="text-black mt-4 font-secondary font-medium">
                This emotional layer is no longer optional. In a saturated
                digital landscape where usability is table stakes, emotion is
                the differentiator.
              </p>
            </div>
          </section>

          <section className=" py-8 px-4 md:px-12 lg:px-18">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-[300px] h-[600px] relative">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <p className="mt-4 text-sm font-medium text-gray-700 italic font-secondary">
                      {img.caption}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          {/* Inline Section Image */}
          <section className=" mb-12">
            <div className="mb-6">
              <h2 className="text-xl font-medium font-secondary mb-4">
                Key reasons why emotional UX is becoming critical:
              </h2>

              <ul className="list-disc list-inside space-y-2 text-black font-secondary">
                <li>
                  <strong>Retention & Loyalty: </strong> Positive emotional
                  experiences drive repeat usage more effectively than discounts
                  or features.
                </li>
                <li>
                  <strong>Brand Differentiation: </strong> Competing on features
                  is temporary; competing on how users feel builds enduring
                  value.
                </li>
                <li>
                  <strong>Virality & Advocacy: </strong> People don’t just share
                  functional tools — they share experiences that move them.
                </li>
              </ul>
              <p className="text-black mt-4 font-secondary font-medium italic">
                “Usability gets users through the door. Emotion makes them
                stay.”
              </p>
            </div>
          </section>

          <section className="max-w-6xl mx-auto  pb-12 text-gray-800">
            <header className="mb-10">
              <h2 className="text-4xl font-semibold font-secondary mb-4">
                Tools and Methods for Measuring Emotional UX
              </h2>
              <p className="text-lg leading-relaxed text-gray-600 font-secondary">
                Quantifying feelings may sound abstract — but in modern UX
                practice,
                <span className="font-semibold">
                  {" "}
                  emotion is increasingly measurable
                </span>
                . Leading design teams and researchers are using a combination
                of qualitative and AI-assisted methods to bring emotional
                intelligence into UX strategy.
              </p>
              <p className="mt-4 font-secondary text-gray-600">
                At <span className="font-semibold">Yuvabe Studios</span>, we
                draw on these emerging best practices to inform how we approach
                emotional design for different sectors and use cases.
              </p>
            </header>

            {/* 1. Emotion Mapping Workshops */}
            <article className="mb-16">
              <h2 className="text-2xl font-semibold font-secondary mb-4">
                1. Emotion Mapping Workshops
              </h2>
              <p className="text-gray-600 font-secondary mb-4 text-xl">
                One of the most effective ways to surface emotional dynamics is
                through <span className="font-semibold">emotion mapping</span> —
                collaborative sessions where users, stakeholders, and designers
                chart emotional journeys through key flows.
              </p>
              <ul className="list-disc font-secondary list-inside text-[16px] text-gray-600 space-y-2 mb-6">
                <li>
                  Identify emotional peaks and troughs during interactions
                  (e.g., onboarding, checkout, task success).
                </li>
                <li>
                  Use tools like{" "}
                  <span className="font-semibold">
                    Plutchik’s Wheel of Emotions
                  </span>{" "}
                  or{" "}
                  <span className="font-semibold">valence–arousal grids</span>{" "}
                  to label states precisely (e.g., “reassured,” “tense,”
                  “delighted”).
                </li>
                <li>
                  Align emotional goals with business outcomes — for example,
                  reducing “frustration spikes” during checkout can directly
                  increase conversion.
                </li>
              </ul>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
                <Image
                  src="/blog/Ui-blog/plutchik's.jpg"
                  alt="Plutchik’s Wheel of Emotions"
                  width={500}
                  height={400}
                  className="rounded-xl object-contain"
                />
                <Image
                  src="/blog/Ui-blog/arousal.png"
                  alt="Valence-Arousal Emotion Grid"
                  width={600}
                  height={400}
                  className="rounded-xl object-contain"
                />
              </div>
            </article>

            {/* 2. Affective Design Testing */}
            <article className="mb-16">
              <h2 className="text-2xl font-semibold font-secondary mb-4">
                2. Affective Design Testing
              </h2>
              <p className="text-gray-600 font-secondary text-xl  mb-4">
                Beyond traditional usability testing,{" "}
                <span className="font-semibold">affective testing</span>{" "}
                incorporates structured probes to gauge real-time emotional
                response:
              </p>
              <ul className="list-disc list-inside font-secondary text-[16px] text-gray-600 space-y-2 mb-6">
                <li>
                  Facial expression analysis using AI tools during prototype
                  sessions.
                </li>
                <li>
                  Self-assessment manikins (SAM) to capture nuanced emotional
                  reactions non-verbally.
                </li>
                <li>
                  Physiological measures (e.g., heart rate variability, galvanic
                  skin response) in high-stakes contexts like healthcare or
                  fintech.
                </li>
              </ul>
              <p className="text-gray-600 mb-6">
                These methods provide designers with a more holistic picture of
                user experience, blending emotional and functional data.
              </p>

              <div className="flex justify-center my-8">
                <Image
                  src="/blog/Ui-blog/affective.png"
                  alt="Affective Design Testing in Action"
                  width={600}
                  height={500}
                  className="rounded-xl object-contain"
                />
              </div>
            </article>

            {/* 3. Sentiment Analysis */}
            <article className="mb-16">
              <h2 className="text-2xl font-semibold font-secondary mb-4">
                3. Sentiment Analysis on User Feedback
              </h2>
              <p className="text-gray-600 font-secondary text-xl mb-4">
                AI tools can now analyze open-text feedback, app store reviews,
                and support tickets to extract emotional tone at scale.
              </p>
              <ul className="list-disc list-inside font-secondary text-[16px] text-gray-600 space-y-2 mb-6">
                <li>Detect patterns of delight, frustration, or confusion.</li>
                <li>
                  Feed these insights into design sprints to close the loop
                  between emotion and iteration.
                </li>
              </ul>
              <p className="text-gray-600 font-secondary text-[16px]">
                Emotion mapping turns vague “user feelings” into concrete,
                actionable design insights — guiding teams toward experiences
                that not only work well but feel right.
              </p>

              {/* Callout Box */}
              <div className="border-2 border-gray-300 p-6 mt-10 shadow-sm max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold font-secondary mb-4">
                  Quick Wins to Improve Emotional UX
                </h2>
                <ul className="list-disc list-inside font-secondary text-gray-700 space-y-2 mb-4">
                  <li>
                    <strong>Map Emotional Peaks:</strong> Run a short
                    emotion-mapping exercise on one critical flow. Find one
                    frustration point and redesign it.
                  </li>
                  <li>
                    <strong>Language Audit:</strong> Review microcopy. Replace
                    neutral text with language that reassures, excites, or
                    delights.
                  </li>
                  <li>
                    <strong>Micro-interaction Pass:</strong> Add or refine
                    subtle animations or haptic feedback at moments of success
                    or waiting.
                  </li>
                </ul>
                <p className="text-gray-600 italic">
                  These small changes often yield disproportionate impact on
                  retention and brand recall.
                </p>
              </div>
            </article>
          </section>

          <section className="max-w-6xl mx-auto  pb-10 text-gray-800">
            <h2 className="text-3xl font-semibold mb-4 font-secondary">
              Designing for Feelings Across Different Domains
            </h2>

            <p className="text-gray-600 mb-8 font-secondary text-xl leading-relaxed">
              Different contexts demand different emotional outcomes. Here’s how
              leading apps (and our design strategies at{" "}
              <span className="font-semibold">Yuvabe</span>) align emotion with
              intent:
            </p>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 text-sm md:text-base">
                <thead className="bg-gray-100 font-secondary">
                  <tr>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Domain
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Desired Emotional Response
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Design Strategies
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50 font-secondary">
                    <td className="border border-gray-300 px-4 py-3">
                      Banking & Fintech
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Safety & Trust
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Minimal UI, strong visual hierarchies, reassuring
                      microcopy (“Your transaction is secure”), consistent
                      feedback loops
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 font-secondary">
                    <td className="border border-gray-300 px-4 py-3">
                      Gaming & EdTech
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Joy & Motivation
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Gamification, progress rewards, playful animations,
                      immediate feedback
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 font-secondary">
                    <td className="border border-gray-300 px-4 py-3">
                      Wellness & Meditation
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Calm & Presence
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Gentle motion design, neutral palettes, generous white
                      space, intuitive flow without cognitive overload
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 font-secondary">
                    <td className="border border-gray-300 px-4 py-3">
                      E-commerce & Retail
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Excitement & Anticipation
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Personalization, emotionally intelligent product
                      recommendations, micro-interactions that feel “human”
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

          <section className="max-w-6xl mx-auto  py-10 text-gray-800 leading-relaxed">
            {/* Balancing Functional and Emotional UX */}
            <article className="mb-10">
              <h2 className="text-3xl font-semibold  mb-4 font-secondary">
                Balancing Functional and Emotional UX
              </h2>

              <p className="text-gray-600 mb-4 font-secondary">
                A common misconception is that emotion comes after
                functionality. In reality, they’re intertwined. A payment form
                that works perfectly but looks cold and intimidating fails just
                as much as one that looks warm but throws errors.
              </p>

              <p className="text-gray-600 mb-6 font-secondary">
                Our framework at{" "}
                <span className="font-semibold">Yuvabe Studios</span> focuses on
                three layers:
              </p>

              <ul className="list-disc list-inside text-gray-700 space-y-3 mb-6 font-secondary">
                <li>
                  <strong>Foundational UX Layer</strong> – Reliability,
                  usability, accessibility.
                </li>
                <li>
                  <strong>Interaction and Feedback Layer Layer</strong> –
                  Micro-interactions, feedback, clarity.
                </li>
                <li>
                  <strong>Emotional and Experiential Layer</strong> – Tone,
                  atmosphere, personality, story.
                </li>
              </ul>

              <p className="text-gray-600 font-secondary">
                The key is to balance these layers, ensuring emotion enhances —
                not overshadows — usability. Emotional design must always serve
                user goals and business outcomes, not distract from them.
              </p>
            </article>

            {/* Final Thoughts */}
            <article className="mb-10">
              <h2 className="text-3xl font-semibold font-secondary mb-4 ">
                Final Thoughts: The Future of UX Is Emotional
              </h2>
              <p className="text-gray-600 mb-4 font-secondary">
                The next wave of digital experiences will be judged less by how
                quickly users complete tasks, and more by how those tasks made
                them feel. As AI, AR, and ambient computing blur the boundaries
                between digital and physical, emotion will become the secondary
                differentiator between good design and great design.
              </p>
              <p className="text-gray-600 mb-4 font-secondary">
                At <span className="font-semibold">Yuvabe Studios</span>,
                we&apos;re pushing this frontier — blending design research,
                emotional intelligence, and technology to build experiences that
                connect deeply and convert consistently.
              </p>
              <p className="text-gray-600 font-secondary">
                Whether you’re building a fintech platform, a meditation app, or
                the next big e-commerce experience, ask yourself not just{" "}
                <span className="italic">“Is it usable?”</span> but{" "}
                <span className="italic">
                  “Does it make them feel something?”
                </span>
              </p>
            </article>

            {/* Partner with Yuvabe Studios */}
            <article className="bg-gray-50 border border-gray-200 rounded-2xl p-8 mb-16 shadow-sm">
              <h3 className="text-2xl font-semibold mb-4 font-secondary text-[#5829C7]">
                Partner with Yuvabe Studios
              </h3>
              <p className="text-gray-700 mb-4 font-secondary">
                Whether you’re reimagining your app experience or launching a
                new digital platform, our UX team blends strategic research,
                emotional design methods, and cutting-edge technology to create
                experiences that connect deeply and convert consistently.
              </p>
              <p className="text-gray-700 font-secondary font-medium">
                Let’s design experiences people feel — not just use.{" "}
                <Link
                  href="/contact"
                  className="text-indigo-600 underline hover:text-indigo-800 transition"
                >
                  Talk to our UI/UX experts today.
                </Link>{" "}
              </p>
            </article>

            {/* About the Authors */}
            <article>
              <h3 className="text-2xl font-semibold text-[#5829C7] mb-6 font-secondary">
                About the Authors
              </h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-[#5829C7] text-lg mb-2 font-secondary">
                    Priya
                  </h4>
                  <p className="text-gray-600 font-secondary">
                    Priya is the <strong>UI/UX Mentor & Practice Head</strong>{" "}
                    at Yuvabe Studios, with over 15 years of experience leading
                    design strategy and execution for global brands. Her work
                    spans fintech, edtech, wellness, and consumer experiences —
                    with a focus on crafting emotionally intelligent,
                    high-impact digital products that drive measurable business
                    outcomes.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#5829C7] text-lg mb-2 font-secondary">
                    Sagar
                  </h4>
                  <p className="text-gray-600 font-secondary">
                    Sagar is the{" "}
                    <strong>Design Lead – UI/UX Design Practice</strong> at
                    Yuvabe Studios, where he spearheads user-centered product
                    design and interface innovation across multiple sectors. His
                    approach blends creative experimentation with structured
                    design systems to deliver seamless, engaging user
                    experiences.
                  </p>
                </div>
              </div>
            </article>
          </section>

          <FaqSection
            title="Frequently Asked Questions (FAQ)"
            description="Here’s Few things you need to know about Measuring UX"
            faqs={MeasuringUXFaqs}
          />

          {/* Share Section */}
          <div className="border-t pt-6 mt-10">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Share this article:
            </h4>
            <div className="flex flex-wrap gap-4">
              {/* Twitter/X */}
              <a
                href="https://twitter.com/intent/tweet?url=https://www.yuvabestudios.com/blog/measuring-ux-beyond-usability&text=Check%20out%20this%20article%20about%20Running%20LLMs%20Locally!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:opacity-80 transition"
              >
                <FaTwitter className="text-white" />
                <span>Twitter</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.yuvabestudios.com/blog/measuring-ux-beyond-usability"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:opacity-80 transition"
              >
                <FaLinkedin className="text-white" />
                <span>LinkedIn</span>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://www.yuvabestudios.com/blog/measuring-ux-beyond-usability"
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
                    "https://www.yuvabestudios.com/blog/measuring-ux-beyond-usability/",
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
