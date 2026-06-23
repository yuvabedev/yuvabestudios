"use client";
// pages/blog/local-llm.js
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaTwitter, FaLinkedin, FaFacebook, FaLink } from "react-icons/fa";
import BlogSEO from "@/components/seo/BlogSEO";
import FaqSection from "@/components/FaqSection";

const codegenerationFaqs = [
  {
    question: "What are LLMs in software development?",
    answer:
      "LLMs, or Large Language Models, are AI systems trained on large code and text datasets that help developers generate, debug, and understand code using natural language prompts.",
  },
  {
    question: "How do LLMs help developers code faster?",
    answer:
      "LLMs automate repetitive tasks like boilerplate generation, CRUD operations, and scaffolding, allowing developers to focus on logic and problem-solving.",
  },
  {
    question: "Is GitHub Copilot powered by LLMs?",
    answer:
      "Yes. GitHub Copilot uses large language models trained on public code to provide context-aware code suggestions directly inside the editor.",
  },
  {
    question: "Can LLMs replace developers?",
    answer:
      "No. LLMs assist developers but do not replace human reasoning, architectural thinking, or business understanding. They amplify productivity rather than replace expertise.",
  },
  {
    question: "How do businesses benefit from LLM-powered development?",
    answer:
      "Businesses benefit through faster product launches, reduced engineering costs, improved code quality, and more efficient development workflows.",
  },
];

export default function CodeGenerationLLMs() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <>
        <BlogSEO
          title="Boost Coding Efficiency with LLMs & GitHub Copilot"
          description="Boost coding efficiency with LLMs & GitHub Copilot. Automate tasks, prototype apps, debug errors, and code smarter with AI-assisted development."
          slug="code-generation-LLMs"
          image="https://yuvabestudios.com/blog/code-generation-banner.png"
          author="Mohamed Safiq S"
          role="AI/ML Developer"
          date="2025-09-16"
          readTime="7"
        />
      </>

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
          <li className="text-gray-800">Code - Generation - LLMs</li>
        </ul>
      </nav>

      {/* Meta Info */}
      <div className="max-w-6xl mx-auto px-6 text-black text-sm mb-4">
        <p>
          Published on <span className="text-gray-800">September 16, 2025</span>{" "}
          · 7 mins read
        </p>
      </div>

      {/* Title */}
      <div className="max-w-6xl mx-auto px-6 my-6">
        <motion.h1
          className="text-3xl md:text-5xl font-medium font-primary text-black leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Code Smarter, Not Harder: How LLMs Are Transforming Everyday
          Development
        </motion.h1>

        <p className="text-lg italic text-black font-secondary my-4">
          LLMs are changing the game — turning hours of manual coding into
          minutes of smart automation. At Yuvabe Studios, we see them not just
          as coding assistants, but as catalysts for faster innovation, cleaner
          code, and real business impact.
        </p>

        {/* Author field */}
        <p className="text-[16px] font-medium text-gray-500 mb-4">
          – By <span className="text-[#5829C7]">Mohamed Safiq S</span>, AI/ML
          Developer, Yuvabe Studios
        </p>

        <h3 className="text-xl font-medium font-secondary text-gray-800">
          Answer Summary:
        </h3>
        <p className="text-lg  text-black font-secondary mb-4">
          Large Language Models are transforming everyday software development
          by automating repetitive coding tasks, accelerating prototyping, and
          improving debugging workflows. By acting as intelligent coding
          assistants, LLMs help developers build faster, reduce errors, and
          deliver higher-quality software with less effort.
        </p>
      </div>

      {/* Hero Banner Image */}
      <div className="max-w-6xl h-auto mx-auto px-6 my-8">
        <div className="relative w-full h-[700px]  overflow-hidden ">
          <Image
            src="/blog/code-generation-banner.png"
            alt="Running LLMs Locally"
            fill
            className="object-contain"
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
          {/* Introduction Section */}
          <section className=" rounded-2xl mb-8">
            <h3 className="text-xl md:text-3xl font-medium font-primary text-[#5829C7] mb-6">
              A New Era of Coding with Large Language Models
            </h3>
            <p className="text-md  text-black font-secondary">
              Not long ago, I&apos;d spend hours debugging boilerplate code or
              setting up repetitive CRUD operations before I could even start
              solving the real problem. Today, thanks to Large Language Models
              (LLMs), those hours have turned into minutes. What once felt like
              grunt work has become a collaborative process, where I experiment,
              build, and innovate with ease.
            </p>
            <p className="text-md  text-black font-secondary mt-2">
              And this shift isn&apos;t just personal. Across the software
              world, AI-powered tools like OpenAI&apos;s GPT series,
              Google&apos;s Gemini, and Meta&apos;s LLaMA are reshaping how
              developers — and the businesses they work for — approach
              development. Faster code means faster launches. Cleaner code means
              fewer bugs in production. And smarter workflows mean teams spend
              more time building features that matter.At Yuvabe Studios, we see
              LLMs as more than productivity boosters — they&apos;re enablers of
              creativity, faster learning, and smarter engineering.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl md:text-3xl font-medium font-primary text-[#5829C7] mb-6">
              How LLMs Improve Everyday Developer Workflows
            </h2>
            <p className="mb-4 font-secondary text-md text-black">
              Instead of wrestling with boilerplate code or repetitive patterns,
              I use LLMs to do:
            </p>
            <h4 className="text-xl font-medium text-[#5829C7] mt-6 mb-2">
              1. Rapid Prototyping with LLMs
            </h4>
            <p className="text-md  text-black font-secondary">
              One of the most significant benefits of AI-assisted code
              generation is rapid prototyping. Developers can quickly spin up
              proofs of concept without writing every line of code manually. By
              providing a natural language description, an LLM can generate the
              skeleton of an application, including core functions, database
              schemas, or API endpoints. This approach allows teams to
              experiment with ideas faster, gather feedback, and iterate on
              designs more efficiently.
            </p>
            <p className="text-md  text-black font-secondary mt-2">
              Example: During a recent Yuvabe prototype sprint, I used
              LLM-assisted code to set up an entire FastAPI backend in half a
              day. That speed meant we could test client feedback instantly and
              refine the design faster than ever before.
            </p>
            <p className="text-md  text-black font-secondary my-8">
              For businesses, this kind of speed translates directly into
              quicker go-to-market timelines and faster ROI on innovation.
            </p>
            <div className="relative w-full h-96 overflow-hidden mb-8">
              <Image
                src="/blog/flow-diagram.png"
                alt="Hugging Face Interface"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-xl font-medium text-[#5829C7] mt-6 mb-2">
              2. Automating Repetitive Development Tasks Using LLMs
            </h2>
            <p className="mb-4 font-secondary text-md text-black ">
              Some tasks in development feel like déjà vu — writing CRUD
              operations, boilerplate functions, or unit tests. This is where
              LLMs shine: they generate complete, ready-to-use functions in
              seconds — freeing you to focus on unique parts of the problem,
              architecture, and business logic instead of typing out patterns
              you’ve written a hundred times.
            </p>
            <p className="mb-4 text-secondary text-md text-black">
              For businesses, fewer developer hours wasted on repetition means
              lower costs and higher productivity.
            </p>
            <h4 className="text-xl font-medium text-black mt-6 mb-2">
              Example: MongoDB CRUD Functions
            </h4>
            <p className="mb-2 font-medium">Prompt:</p>
            <p className="mb-4">
              Generate CRUD functions for a MongoDB collection named{" "}
              <code className="text-green-600">&quot;users&quot;</code> using
              Motor in FastAPI.
            </p>
            <div className="mb-6">
              {/* ChatGPT-style code header */}
              <div className="flex justify-between items-center bg-gray-800 rounded-t-md px-4 py-2">
                <span className="text-gray-300 text-sm font-mono">Python</span>
                <button
                  onClick={() =>
                    navigator.clipboard
                      .writeText(`from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client.mydatabase
users = db.users

async def create_user(user_data: dict):
    return await users.insert_one(user_data)

async def get_user(user_id: str):
    return await users.find_one({"_id": user_id})

async def update_user(user_id: str, new_data: dict):
    return await users.update_one({"_id": user_id}, {"$set": new_data})

async def delete_user(user_id: str):
    return await users.delete_one({"_id": user_id})`)
                  }
                  className="text-gray-300 text-xs font-mono hover:text-white"
                >
                  Copy
                </button>
              </div>

              {/* Colorful code block */}
              <pre className="bg-black font-mono text-sm p-4 rounded-b-md overflow-x-auto">
                <code className="text-white">
                  <span className="text-red-400">from</span>{" "}
                  <span className="text-blue-400">motor.motor_asyncio</span>{" "}
                  <span className="text-red-400">import</span>{" "}
                  <span className="text-green-400">AsyncIOMotorClient</span>
                  {"\n\n"}
                  <span className="text-blue-400">client</span> ={" "}
                  <span className="text-green-400">AsyncIOMotorClient</span>(
                  <span className="text-yellow-400">
                    {"mongodb://localhost:27017"}
                  </span>
                  ){"\n"}
                  <span className="text-blue-400">db</span> ={" "}
                  <span className="text-blue-400">client</span>.mydatabase
                  {"\n"}
                  <span className="text-blue-400">users</span> ={" "}
                  <span className="text-blue-400">db</span>.users
                  {"\n\n"}
                  <span className="text-red-400">async def</span>{" "}
                  <span className="text-green-400">create_user</span>(user_data:
                  dict):
                  {"\n    "}
                  <span className="text-red-400">return await</span>{" "}
                  users.insert_one(user_data)
                  {"\n\n"}
                  <span className="text-red-400">async def</span>{" "}
                  <span className="text-green-400">get_user</span>(user_id:
                  str):
                  {"\n    "}
                  <span className="text-red-400">return await</span>{" "}
                  users.find_one({"{"}
                  {"_id"}: user_id{"}"}){"\n\n"}
                  <span className="text-red-400">async def</span>{" "}
                  <span className="text-green-400">update_user</span>(user_id:
                  str, new_data: dict):
                  {"\n    "}
                  <span className="text-red-400">return await</span>{" "}
                  users.update_one({"{"}
                  {"_id"}: user_id{"}"},{"{"}
                  {"$set"}: new_data{"}"}){"\n\n"}
                  <span className="text-red-400">async def</span>{" "}
                  <span className="text-green-400">delete_user</span>(user_id:
                  str):
                  {"\n    "}
                  <span className="text-red-400">return await</span>{" "}
                  users.delete_one({"{"}
                  {"_id"}: user_id{"}"})
                </code>
              </pre>
            </div>
            {/* Step-3 */}
            <h2 className="text-xl font-medium font-secondary text-[#5829C7] mb-6 mt-8">
              3. GitHub Copilot and Context-Aware Code Completion
            </h2>
            <p className="mb-4 text-black">
              GitHub Copilot sits in your editor and predicts the next lines of
              code based on context, much like an autocomplete powered by LLMs.
              Hit <code className="text-green-400">Tab</code> to accept
              suggestions, saving minutes of repetitive typing.
            </p>
            <h4 className="text-lg font-medium text-gray-900 mt-6 mb-2">
              Example: Python Function Generation
            </h4>
            <p className="mb-2 text-black">I start typing:</p>
            <div className="relative">
              <pre className="bg-gray-900 font-mono text-white text-sm p-4 mb-6 overflow-x-auto rounded-md">
                <code>
                  <span className="text-blue-400">def</span>{" "}
                  <span className="text-green-400">get_users_from_db</span>
                  (collection):
                </code>
              </pre>

              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    `def get_users_from_db(collection):`,
                  )
                }
                className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded hover:bg-gray-600"
              >
                Copy
              </button>
            </div>
            <p className="mb-4 text-black">Copilot immediately suggests:</p>
            <div className="relative">
              <pre className="bg-gray-900 font-mono text-white text-sm p-4 mb-6 overflow-x-auto rounded-md">
                <code>
                  <span className="text-blue-400">users</span> = []
                  {"\n"}
                  <span className="text-red-400">async for</span> user in
                  collection.find({}):
                  {"\n"} users.append(user)
                  {"\n"}
                  <span className="text-blue-400">return</span> users
                </code>
              </pre>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    ` users = []
    async for user in collection.find({}):
        users.append(user)
    return users
`,
                  )
                }
                className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded hover:bg-gray-600"
              >
                Copy
              </button>
            </div>
            <h4 className="text-xl font-medium text-gray-900 mt-6 mb-2">
              Example: React Component
            </h4>
            <p className="mb-4 text-black">Typing:</p>
            <div className="relative">
              <pre className="bg-gray-900 font-mono text-white text-sm p-4 mb-6 overflow-x-auto rounded-md">
                <code>
                  <span className="text-blue-400">if</span>{" "}
                  <span className="text-green-400">
                    (parameters.referenceImageParameterArray)
                  </span>
                  :
                </code>
              </pre>

              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    `def get_users_from_db(collection):`,
                  )
                }
                className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded hover:bg-gray-600"
              >
                Copy
              </button>
            </div>
            <div className="mt-6 ">
              <Image
                src="/blog/code.png"
                alt="Fine-tuning example illustration"
                width={800}
                height={450}
                className=" "
              />
            </div>
            <p className="my-4 text-black">
              Beyond snippets, Copilot excels at multi-line edits, refactoring,
              and even generating docstrings. The more context I provide —
              through variable names or comments — the smarter its suggestions
              get. Whether it’s completing an async loop in Python or
              auto-building a React search filter component, Copilot reduces
              interruptions and keeps the flow intact. For developers, that
              means staying in the zone; for businesses, it translates into
              faster delivery without compromising quality.
            </p>
            <h2 className="text-xl md:text-3xl font-medium font-primary text-[#5829C7] mb-6 mt-8">
              Debugging, Learning, and Reasoning with LLMs
            </h2>
            <p className="mb-4">
              While building a dashboard that fetches multiple datasets, I asked
              an LLM to generate the{" "}
              <code className="text-indigo-600">useEffect</code> logic:
            </p>
            <h4 className="text-xl font-medium text-gray-900 mt-6 mb-2">
              LLM Generated:
            </h4>
            <div className="relative">
              <pre className="bg-gray-900 font-mono text-green-400 text-sm p-4 mb-6 overflow-x-auto rounded-md">
                <code>
                  {`useEffect(() => {
  async function fetchData() {
    const usersRes = await fetch("/api/users");
    const ordersRes = await fetch("/api/orders");
    const usersData = await usersRes.json();
    const ordersData = await ordersRes.json();
    setUsers(usersData);
    setOrders(ordersData);
  }
  fetchData();
}, [users, orders]);`}
                </code>
              </pre>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(`useEffect(() => {
  async function fetchData() {
    const usersRes = await fetch("/api/users");
    const ordersRes = await fetch("/api/orders");
    const usersData = await usersRes.json();
    const ordersData = await ordersRes.json();
    setUsers(usersData);
    setOrders(ordersData);
  }
  fetchData();
}, [users, orders]);`)
                }
                className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded hover:bg-gray-600"
              >
                Copy
              </button>
            </div>
            <p className="mb-4">It looked fine, but caused issues:</p>
            <ul className="list-disc list-inside mb-6 text-gray-700">
              <li>Infinite loop from state updates retriggering the effect.</li>
              <li>Race condition when orders loaded before users.</li>
              <li>Unnecessary re-renders from repeated API calls.</li>
            </ul>
            <h4 className="text-xl font-medium text-gray-900 mt-6 mb-2">Fix</h4>
            <p className="mb-4">
              I debugged step by step—logging state, checking dependencies, and
              realizing orders must load after users. The fix was to run the
              effect once, fetch sequentially, and guard with an{" "}
              <code className="text-indigo-600">isMounted</code> flag:
            </p>
            <div className="relative">
              <pre className="bg-gray-900 font-mono text-green-400 text-sm p-4 mb-6 overflow-x-auto rounded-md">
                <code>
                  {`useEffect(() => {
  let isMounted = true;
  async function fetchData() {
    const usersRes = await fetch("/api/users");
    const usersData = await usersRes.json();
    if (!isMounted) return;
    setUsers(usersData);

    const ordersRes = await fetch(\`/api/orders?userIds=\${usersData.map(u => u.id).join(",")}\`);
    const ordersData = await ordersRes.json();
    if (!isMounted) return;
    setOrders(ordersData);
  }
  fetchData();
  return () => { isMounted = false; };
}, []);`}
                </code>
              </pre>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(`useEffect(() => {
  let isMounted = true;
  async function fetchData() {
    const usersRes = await fetch("/api/users");
    const usersData = await usersRes.json();
    if (!isMounted) return;
    setUsers(usersData);

    const ordersRes = await fetch(\`/api/orders?userIds=\${usersData.map(u => u.id).join(",")}\`);
    const ordersData = await ordersRes.json();
    if (!isMounted) return;
    setOrders(ordersData);
  }
  fetchData();
  return () => { isMounted = false; };
}, []);`)
                }
                className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded hover:bg-gray-600"
              >
                Copy
              </button>
            </div>
            <hr className="my-6 border-gray-300" />
            <div className="mb-6">
              <h3 className="text-xl md:text-3xl font-medium font-primary text-[#5829C7] mb-6">
                Lesson Learned:
              </h3>
              <p className="text-black font-secondary text-md mb-4">
                LLMs can produce valid-looking code but miss context. Logical
                thinking is what:
              </p>
              <ul className="list-disc list-inside space-y-2 text-black font-secondary text-[16px">
                <li>Spots infinite loops and race conditions,</li>
                <li>Designs data-aware fetching,</li>
                <li>Prevents subtle bugs.</li>
              </ul>
              <p className="text-black mt-4">
                AI speeds coding, but reasoning ensures correctness and
                reliability.
              </p>
            </div>

            {/* Highlight Box */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-xl shadow-sm">
              <h3 className="font-secondary text-lg md:text-2xl font-semibold text-gray-900 mb-4">
                Business Benefits of Using LLMs in Software Development
              </h3>

              <ul className="font-secondary list-disc list-inside text-xl  text-gray-700 leading-relaxed">
                <li>
                  <span className="font-semibold">Faster Time-to-Market:</span>{" "}
                  Launch products and features weeks sooner by using LLMs to
                  automate prototyping, scaffolding, and repetitive coding.
                </li>
                <li>
                  <span className="font-semibold">
                    Reduced Development Costs:
                  </span>{" "}
                  Cut unnecessary engineering hours — let AI handle boilerplate
                  while your team focuses on solving unique business problems.
                </li>
                <li>
                  <span className="font-semibold">
                    Smarter Teams, Better Output:
                  </span>{" "}
                  Use LLMs act as both assistants and learning tools, helping
                  developers debug faster, learn new frameworks on the fly, and
                  consistently deliver cleaner, more reliable code.
                </li>
              </ul>
            </div>
          </section>

          <h2 className="text-xl md:text-3xl font-medium font-primary text-[#5829C7] mb-6">
            Final Thoughts: LLMs as Creative Development Partners
          </h2>

          {/* Full-width Image */}
          <div className="relative w-full h-[400px] mb-10">
            <Image
              src="/blog/final-thought-banner.jpg"
              alt="Hugging Face Collaboration"
              fill
              className="object-contain "
            />
          </div>

          <p className="text-black font-secondary mb-4">
            With LLMs and GitHub Copilot, my daily workflow at Yuvabe Studios
            has transformed. From rapid prototyping to repetitive task
            automation, smarter debugging, and scaffolding tests, AI helps me
            focus on what truly matters: creative problem-solving.
          </p>

          <p className="text-black font-secondary mb-4">
            For developers, this means coding faster, learning quicker, and
            writing cleaner code. For businesses, it means faster product
            launches, reduced development costs, and happier clients.
          </p>

          <p className="text-black font-secondary mb-4">
            The future of software development won’t be defined by humans or
            machines alone — but by the collaboration between them. At Yuvabe
            Studios, we believe AI doesn’t replace human ingenuity; it amplifies
            it, creating a new era where ideas scale at the speed of
            imagination.
          </p>

          <section
            className="max-w-6xl mx-auto my-12
"
          >
            <h2 className="text-xl md:text-3xl font-medium font-primary text-[#5829C7] mb-6">
              About Yuvabe Studios
            </h2>

            <p className="text-black font-secondary text-md mb-4">
              At <strong>Yuvabe Studios</strong>, our AI/ML team transforms
              complex ideas into purposeful innovations. From on-device AI and
              predictive trend engines to developer tools, virtual try-on apps,
              and intelligent user experiences, we bridge cutting-edge research
              with real-world applications.
            </p>

            <p className="text-black font-secondary text-md">
              We partner with startups, enterprises, and consumer brands to
              build AI solutions that are{" "}
              <strong>scalable, secure, and designed for growth</strong>.
            </p>
          </section>

          <FaqSection
            title="Frequently Asked Questions (FAQ)"
            description="Here’s Few things you need to know about Code Generation with LLMs"
            faqs={codegenerationFaqs}
          />

          {/* Share Section */}
          <div className="border-t pt-6 mt-10">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Share this article:
            </h4>
            <div className="flex flex-wrap gap-4">
              {/* Twitter/X */}
              <a
                href="https://twitter.com/intent/tweet?url=https://yourdomain.com/blog/local-llm&text=Check%20out%20this%20article%20about%20Running%20LLMs%20Locally!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:opacity-80 transition"
              >
                <FaTwitter className="text-white" />
                <span>Twitter</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/sharing/share-offsite/?url=https://yourdomain.com/blog/local-llm"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:opacity-80 transition"
              >
                <FaLinkedin className="text-white" />
                <span>LinkedIn</span>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://yourdomain.com/blog/local-llm"
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
                    "https://yourdomain.com/blog/local-llm",
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
