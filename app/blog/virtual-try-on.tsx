"use client";
// pages/blog/local-llm.js
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaTwitter, FaLinkedin, FaFacebook, FaLink } from "react-icons/fa";
import BlogSEO from "@/components/seo/BlogSEO";
import FaqSection from "@/components/FaqSection";

const virtualtryonFaqs = [
  {
    question: "What is Virtual Try-On in fashion?",
    answer:
      "Virtual Try-On uses AI and AR to let users digitally preview clothing on their body using images or live camera input.",
  },
  {
    question: "How does AI improve virtual try-on accuracy?",
    answer:
      "AI models use computer vision, segmentation, and diffusion techniques to align garments realistically with different body types.",
  },
  {
    question: "Can startups build Virtual Try-On apps?",
    answer:
      "Yes. Using frameworks like Next.js and APIs such as Pixelcut, startups can prototype VTO apps quickly without training models from scratch.",
  },
  {
    question: "Does Virtual Try-On reduce fashion returns?",
    answer:
      "Yes. By helping customers visualize fit and style before purchase, VTO significantly reduces return rates and waste.",
  },
  {
    question: "How does Yuvabe Studios work with fashion AI?",
    answer:
      "Yuvabe Studios designs AI-powered fashion solutions including virtual try-on, generative visuals, and predictive trend tools tailored for real business use.",
  },
];

export default function VirtualTryOn() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <BlogSEO
        title="Build a Virtual Try-On App with Next.js & Pixelcut API"
        description="Build a Virtual Try-On app using Next.js and Pixelcut API. Try garments digitally, enhance e-commerce, and boost engagement in fashion tech."
        slug="future-of-fashion"
        image="https://yuvabestudios.com/blog/fashion-banner.jpg"
        author="Keerthana"
        role="AI/ML Developer"
        date="2025-09-23"
        readTime="7"
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
          <li className="text-gray-800">Future - of - Fashion</li>
        </ul>
      </nav>

      {/* Meta Info */}
      <div className="max-w-6xl mx-auto px-6 text-black text-sm mb-4">
        <p>
          Published on <span className="text-gray-800">September 23, 2025</span>{" "}
          · 7 mins read
        </p>
      </div>

      {/* Title */}
      <div className="max-w-6xl mx-auto px-6 mb-6">
        <motion.h1
          className="text-3xl md:text-5xl font-medium font-primary text-black leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          The Future of Fashion Shopping: Virtual Try-On with AI and AR
        </motion.h1>

        <p className="text-lg italic text-black font-secondary my-4">
          From online shopping to metaverse fashion, Virtual Try-On (VTO) is
          reshaping how we interact with clothing. What once required a fitting
          room now happens instantly on your screen — and you can build it into
          your own app today.
        </p>

        {/* Author field */}
        <p className="text-[16px] font-medium text-gray-500 mb-4">
          – By <span className="text-[#5829C7]">Keerthana</span>, AI/ML
          Developer, Yuvabe Studios
        </p>

        <h3 className="text-xl font-medium font-secondary text-gray-800">
          Answer Summary:
        </h3>
        <p className="text-lg  text-black font-secondary mb-4">
          Virtual Try-On (VTO) uses AI and AR to let shoppers preview clothing
          digitally before purchase. This blog explains why VTO matters for
          fashion e-commerce, the AI technologies behind it, and how to build a
          simple virtual try-on app using Next.js and Pixelcut API.
        </p>
      </div>

      {/* Hero Banner Image */}
      <div className="max-w-6xl h-auto mx-auto px-6 mb-8">
        <div className="relative w-full h-[600px]  overflow-hidden ">
          <Image
            src="/blog/fashion-banner.jpg"
            alt="Running LLMs Locally"
            fill
            className="object-cover "
            priority
          />
        </div>
      </div>

      {/* Blog Content */}
      <main className="max-w-6xl mx-auto py-8 px-6 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="prose prose-lg prose-indigo"
        >
          {/* Why Run LLMs Locally Section */}
          <div className="mb-6">
            <h3 className="text-xl md:text-3xl font-medium font-primary text-[#5829C7] mb-6">
              Why Virtual Try-On Matters
            </h3>
            <p className="text-black font-secondary text-lg mb-4">
              E-commerce fashion faces a challenge: returns. Shoppers often
              hesitate because they can&apos;t imagine how a garment will look
              or fit, which leads to wasted resources and lost revenue. Virtual
              Try-On solves this problem — and offers much more:
            </p>
            <ul className="list-disc list-inside space-y-2 text-black font-secondary text-[16px]">
              <li>
                <strong>Confidence in Online Shopping:</strong> Customers can
                preview styles before purchase, leading to higher conversions.
              </li>
              <li>
                <strong>Higher Engagement and Conversion:</strong>Like Instagram
                filters, VTO lets shoppers play with multiple looks in minutes.
              </li>
              <li>
                <strong>Sustainability Through Fewer Returns:</strong> Fewer
                returns mean lower carbon footprints and reduced textile waste.
              </li>
              <li>
                <strong>Innovation in Fashion and Metaverse Commerce:</strong>
                From AR filters to metaverse wearables, VTO is shaping the
                future of fashion.
              </li>
            </ul>
            <p className="text-black font-secondary mt-4 text-lg">
              For fashion brands, this isn&apos;t just about convenience.
              It&apos;s about redefining the shopping experience and creating
              deeper trust with consumers.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl md:text-3xl font-medium font-primary text-[#5829C7] mb-6">
              Research Driving Modern Virtual Try-On
            </h3>
            <p className="text-black font-secondary text-lg mb-4">
              Recent breakthroughs in AI and computer vision have taken virtual
              try-on from clunky to hyper-realistic:
            </p>
            <ul className="list-disc list-inside space-y-2 text-black font-secondary text-[16px]">
              <li>
                <strong>Outfit Anyone:</strong> Flexible try-on across body
                types and garment styles.{" "}
                <a
                  href="https://arxiv.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Paper Link
                </a>
              </li>

              <li>
                <strong>TryOnDiffusion:</strong> Diffusion models with parallel
                UNets for detail + warping.{" "}
                <a
                  href="https://arxiv.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Paper Link
                </a>
              </li>

              <li>
                <strong>StableVITON:</strong> Solves semantic alignment between
                body and garment.{" "}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  GitHub Repository
                </a>
              </li>

              <li>
                <strong>DCI-VTON:</strong> Conditional inpainting for
                ultra-high-resolution outputs.
              </li>
            </ul>
            <p className="text-black font-secondary mt-4 text-lg">
              These research models combine GANs, diffusion models, and semantic
              segmentation to make fashion try-on scalable and lifelike.
            </p>
          </div>
          <div className="mt-6 mx-auto items-center justify-center">
            <Image
              src="/blog/modern-vto.png"
              alt="Modern VTO illustration"
              width={600}
              height={450}
              className="rounded-lg mx-auto"
            />
          </div>

          <div className="my-8">
            <h3 className="text-xl md:text-3xl font-medium font-primary text-[#5829C7] mb-4">
              The Technology Behind Virtual Try-On
            </h3>
            <p className="text-black font-secondary text-lg mb-4">
              Recent breakthroughs in AI and computer vision have taken virtual
              try-on from clunky to hyper-realistic:
            </p>
            <ul className="list-disc list-inside space-y-2 text-black font-secondary text-[16px]">
              <li>
                <strong>Augmented Reality for Real-Time Overlay:</strong>{" "}
                Overlays digital clothing on your real-time image.
              </li>
              <li>
                <strong>3D Body Scanning and Fit Estimation:</strong> Creates
                accurate models of your body for perfect fit visualization.
              </li>
              <li>
                <strong>Artificial Intelligence for Realism:</strong> Improves
                recommendations and realism by learning your preferences.
              </li>
              <li>
                <strong>Computer Vision for Movement Tracking:</strong> Tracks
                movement so clothes adjust naturally when you move on camera.
              </li>
            </ul>
            <p className="text-black font-secondary mt-4 text-lg">
              These research models combine GANs, diffusion models, and semantic
              segmentation to make fashion try-on scalable and lifelike.
            </p>
          </div>

          <div className="my-8">
            <h3 className="text-xl md:text-3xl font-medium font-primary text-[#5829C7] mb-4">
              How Virtual Try-On Works
            </h3>
            <p className="text-black font-secondary text-lg mb-4">
              At its core, a virtual try-on system follows four steps:
            </p>
            <ul className="list-disc list-inside space-y-2 text-black font-secondary text-[16px]">
              <li>
                <strong>Image Capture or Upload:</strong> Customer uploads a
                photo or uses the camera.
              </li>
              <li>
                <strong>Body Detection Using AI:</strong> AI identifies the
                person in the image.
              </li>
              <li>
                <strong>Garment Alignment and Overlay:</strong> Clothing is
                aligned and placed realistically.
              </li>
              <li>
                <strong>Final Try-On Result Display:</strong> Final try-on image
                is shown or downloaded.
              </li>
            </ul>
            <p className="text-black font-secondary mt-4 text-lg">
              Think of it like asking a digital mirror:{" "}
              <span className="italic font-semibold">
                “How do I look in this?”{" "}
              </span>
            </p>
          </div>

          <div className="my-8">
            <h2 className="text-xl md:text-3xl font-medium font-secondary text-[#5829C7] mb-4">
              Our Experiment at Yuvabe Studios
            </h2>
            <p className="text-black font-secondary text-lg mb-4">
              To demonstrate how accessible this tech has become, we built a
              <strong> simple VTO app</strong> using Next.js and the{" "}
              <strong> Pixelcut Free API</strong>. Instead of training models
              from scratch, the API handles garment alignment and fitting.
            </p>
            <h5 className="mb-2 font-secondary ">Our goal was simple :</h5>
            <ul className="list-disc list-inside space-y-2 text-black font-secondary text-[16px">
              <li>Let users upload a photo of themselves (or a model).</li>
              <li>Upload a clothing image.</li>
              <li>Instantly generate a try-on preview.</li>
            </ul>
          </div>

          <div className="my-8">
            <h2 className="text-xl md:text-3xl font-medium font-primary text-[#5829C7] mb-4">
              Technology Stack Used
            </h2>
            <ul className="list-disc list-inside space-y-2 text-black font-secondary text-[16px]">
              <li>
                <strong>
                  Next.js for Front-End Interactivity (React framework):
                </strong>{" "}
                Front-end for interactivity.{" "}
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Next.js
                </a>
              </li>

              <li>
                <strong>Pixelcut Free API for Garment Fitting:</strong>{" "}
                AI-powered garment fitting.{" "}
                <a
                  href="https://www.pixelcut.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Pixelcut API
                </a>
              </li>

              <li>
                <strong>Tailwind CSS for Responsive UI:</strong> Clean,
                responsive design.{" "}
                <a
                  href="https://tailwindcss.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Tailwind CSS
                </a>
              </li>

              <li>
                <strong>Node.js and Vercel for Secure API Calls:</strong> Secure
                backend calls to Pixelcut API.
              </li>
            </ul>
            <p className="text-black font-secondary mt-4">
              This stack ensured fast development, scalability, and a smooth
              user experience. Our approach made it possible to go from{" "}
              <strong>concept to prototype in days, not months. </strong>
            </p>
          </div>

          <section className="my-12">
            <h2 className="text md:text-3xl font-medium font-primary text-[#5829C7] mb-6">
              Building the Virtual Try-On App in Next.js
              <Link
                href="https://nextjs.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#784DFF] transition-colors"
              >
                Next.js
              </Link>
            </h2>
            <h4 className="text-xl font-medium text-gray-900 mt-6 mb-2">
              1. Frontend Implementation
            </h4>
            <p className="font-secondary mb-2">
              We built a form where users can input person and garment image
              URLs, select garment mode, and toggle background removal.
            </p>
            <div className="relative">
              <pre className="bg-gray-900 text-green-400 text-sm p-4 mb-6 overflow-x-auto">
                <code>{`// page.tsx 
'use client';
import { useState } from 'react';

export default function Home() {
  const [personImageUrl, setPersonImageUrl] = useState('');
  const [garmentImageUrl, setGarmentImageUrl] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/try-on', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ personImageUrl, garmentImageUrl }),
    });
    const data = await response.json();
    setResult(data.result_url);
  };

  return (
    <main>
      <h1>Virtual Try-On Studio</h1>
      <form onSubmit={handleSubmit}>
        <input value={personImageUrl} onChange={(e) => setPersonImageUrl(e.target.value)} placeholder="Person Image URL" />
        <input value={garmentImageUrl} onChange={(e) => setGarmentImageUrl(e.target.value)} placeholder="Garment Image URL" />
        <button type="submit">Try On</button>
      </form>
      {result && <img src={result} alt="Try-On Result" />}
    </main>
  );
}
`}</code>
              </pre>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(`// page.tsx 
'use client';
import { useState } from 'react';

export default function Home() {
  const [personImageUrl, setPersonImageUrl] = useState('');
  const [garmentImageUrl, setGarmentImageUrl] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/try-on', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ personImageUrl, garmentImageUrl }),
    });
    const data = await response.json();
    setResult(data.result_url);
  };

  return (
    <main>
      <h1>Virtual Try-On Studio</h1>
      <form onSubmit={handleSubmit}>
        <input value={personImageUrl} onChange={(e) => setPersonImageUrl(e.target.value)} placeholder="Person Image URL" />
        <input value={garmentImageUrl} onChange={(e) => setGarmentImageUrl(e.target.value)} placeholder="Garment Image URL" />
        <button type="submit">Try On</button>
      </form>
      {result && <img src={result} alt="Try-On Result" />}
    </main>
  );
}
`)
                }
                className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded hover:bg-gray-600"
              >
                Copy
              </button>
            </div>
            <h4 className="text-xl font-medium text-gray-900 mt-6 mb-2">
              2. Server-Side API Route
            </h4>
            <p className="mb-4 font-secondary">
              Next.js API routes securely call Pixelcut Free API with your key:
              <code className="text-green-600">sentiment-analysis</code>{" "}
              pipeline:
            </p>
            <div className="relative">
              <pre className="bg-gray-900 text-green-400 text-sm p-4 mb-6 overflow-x-auto">
                <code>{`// pages/api/try-on.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { personImageUrl, garmentImageUrl } = req.body;

  const response = await fetch('https://api.developer.pixelcut.ai/v1/try-on', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-API-KEY': process.env.PIXELCUT_API_KEY || '',
    },
    body: JSON.stringify({
      person_image_url: personImageUrl,
      garment_image_url: garmentImageUrl,
      garment_mode: 'auto',
      preprocess_garment: true,
      remove_background: false,
      wait_for_result: true,
    }),
  });

  const data = await response.json();
  res.status(200).json(data);
}
`}</code>
              </pre>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(`// pages/api/try-on.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { personImageUrl, garmentImageUrl } = req.body;

  const response = await fetch('https://api.developer.pixelcut.ai/v1/try-on', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-API-KEY': process.env.PIXELCUT_API_KEY || '',
    },
    body: JSON.stringify({
      person_image_url: personImageUrl,
      garment_image_url: garmentImageUrl,
      garment_mode: 'auto',
      preprocess_garment: true,
      remove_background: false,
      wait_for_result: true,
    }),
  });

  const data = await response.json();
  res.status(200).json(data);
}
`)
                }
                className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded hover:bg-gray-600"
              >
                Copy
              </button>
            </div>
            <div className="mb-6">
              <h3 className="text-xl md:text-3xl font-medium font-primary text-[#5829C7] mb-6">
                Final Thoughts: Why This Matters Beyond the Demo
              </h3>
              <p className="text-black font-secondary text-md mb-4">
                This project shows that you don’t need to be a big tech giant to
                build fashion AI apps. With the right APIs and frameworks:
              </p>
              <ul className="list-disc list-inside space-y-2 text-black font-secondary text-[16px">
                <li>
                  <strong>Developers </strong> can spin up prototypes quickly.
                </li>
                <li>
                  <strong>Startups </strong> can add virtual fitting rooms to
                  e-commerce platforms.
                </li>
                <li>
                  <strong>Designers </strong> can preview collections instantly
                  on digital models.
                </li>
                <li>
                  <strong>Marketers </strong> can create campaigns without
                  costly photoshoots.
                </li>
              </ul>
              <p className="text-black font-secondary mt-4">
                At Yuvabe Studios, we see VTO as more than a feature — it&apos;s
                a<strong> business advantage </strong> . By blending{" "}
                <strong> AI, AR, and creativity,</strong> fashion brands can
                increase conversions, reduce returns, and build sustainable
                customer trust.
              </p>

              <p className="text-gray-800 font-secondary font-medium text-md mt-8">
                Curious how a Virtual Try-On experience can be tailored to your
                fashion brand?
                <Link
                  href="/contact"
                  className="text-indigo-600 underline hover:text-indigo-800 transition"
                >
                  Let&apos;s talk.
                </Link>{" "}
              </p>
            </div>
            <div className="mb-6">
              <p className="text-black font-secondary text-lg mb-4">
                This project proves you don’t need to be a big tech company to
                experiment with <strong>fashion AI. </strong> Using Next.js and
                Pixelcut API:
              </p>
              <ul className="list-disc list-inside space-y-2 text-black font-secondary text-[16px]">
                <li>
                  Developers can{" "}
                  <strong>prototype VTO apps in days, not months</strong>.
                </li>
                <li>
                  Startups can add <strong> virtual fitting rooms </strong>to
                  their online stores.
                </li>
                <li>
                  Designers can{" "}
                  <strong>preview garments on models instantly</strong>.
                </li>
                <li>
                  Marketers can create <strong>dynamic campaigns</strong>{" "}
                  without expensive photoshoots.
                </li>
              </ul>
              <p className="text-black font-secondary mt-4">
                At Yuvabe Studios, we see this as a{" "}
                <strong>sneak peek into fashion&apos;s future </strong> —
                blending AI, AR, and creativity to make fashion more immersive
                and sustainable.
              </p>

              <p className="text-gray-800 font-secondary font-medium text-md mt-8">
                Want to build AI-powered fashion apps tailored to your business?
                <Link
                  href="/contact"
                  className="text-indigo-600 underline hover:text-indigo-800 transition"
                >
                  Let&apos;s talk.
                </Link>{" "}
              </p>
            </div>
          </section>

          <h2 className="text-3xl font-medium font-secondary text-[#5829C7] mb-6">
            Outcomes and Real-World Applications :{" "}
          </h2>

          {/* Full-width Image */}
          <div className="relative w-[60%] h-96 mb-10 mx-auto">
            <Image
              src="/blog/outcomes-1.png"
              alt="Hugging Face Collaboration"
              fill
              className="object-contain rounded-lg"
            />
          </div>
          <div className="relative w-[60% h-96 mb-10">
            <Image
              src="/blog/outcomes-2.png"
              alt="Hugging Face Collaboration"
              fill
              className="object-contain rounded-lg"
            />
          </div>

          <p className="text-gray-800 font-secondary mb-4">
            At Yuvabe Studios, our AI/ML team turns complex ideas into
            purposeful innovations. From on-device AI, virtual try-on apps, and
            predictive trend engines, to data pipelines, model optimization, and
            intelligent user experiences — we bridge research and real-world
            impact. We partner with beauty, healthcare, consumer, and fashion
            brands, helping them adopt AI solutions that are scalable,
            privacy-first, and built for real business growth.
          </p>

          <FaqSection
            title="Frequently Asked Questions (FAQ)"
            description="Here’s Few things you need to know about Virtual Try-On"
            faqs={virtualtryonFaqs}
          />

          {/* Share Section */}
          <div className="border-t pt-6 mt-10">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Share this article:
            </h4>
            <div className="flex flex-wrap gap-4">
              {/* Twitter/X */}
              <a
                href="https://twitter.com/intent/tweet?url=https://www.yuvabestudios.com/blog/virtual-try-on&text=Check%20out%20this%20article%20about%20Running%20LLMs%20Locally!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:opacity-80 transition"
              >
                <FaTwitter className="text-white" />
                <span>Twitter</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.yuvabestudios.com/blog/virtual-try-on"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:opacity-80 transition"
              >
                <FaLinkedin className="text-white" />
                <span>LinkedIn</span>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://www.yuvabestudios.com/blog/virtual-try-on"
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
                    "https://www.yuvabestudios.com/blog/virtual-try-on/",
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
