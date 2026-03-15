"use client";

import { useState } from "react";
import { BarChart3, Bot, LayoutGrid, ScanSearch, Sparkles, type LucideIcon } from "lucide-react";

import { StudioCaseStudyMockCard } from "@/components/studio/studio-case-study-mock-card";
import {
  studioCaseStudies,
  type StudioCaseStudySummary,
} from "@/components/studio/studio-case-study-content";
import { StudioCaseStudySummaryDialog } from "@/components/studio/studio-case-study-summary-dialog";

function ProofIcon({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon className="size-24 stroke-[1.4] text-[color:color-mix(in_srgb,var(--neutral-700)_82%,var(--lavender-500)_18%)]" />;
}

const additionalCaseStudies: StudioCaseStudySummary[] = [
  {
    id: "tvam",
    sector: "Health insurance AI",
    title: "TVAM",
    summary: "Built advisor-style AI tools that simplified health, policy, and exam-prep workflows through one clearer product system.",
    services: ["AI integration", "Website design", "Cloud deployment"],
    media: <ProofIcon icon={Bot} />,
    mockImageSrc: "/assets/illustration1.png",
    mockImageAlt: "TVAM product proof illustration",
    mockVariant: "aurora",
    mockLayout: "compact",
    modalIntro:
      "TVAM focused on simplifying health, policy, and exam-prep workflows through advisor-style AI tools. The opportunity was to turn multiple AI capabilities into one product experience that felt useful, reliable, and easy to navigate.",
    modalOutcomes: [
      "Built AI-powered Health and Policy Advisors plus a USMLE preparation tool.",
      "Integrated chat-based AI, secure conversation storage, TTS/STT support, vector search, and file uploads.",
      "Used Retrieval-Augmented Generation patterns and cloud deployment workflows for scale.",
      "Made complex health and policy workflows easier to use through clearer product orchestration.",
    ],
    modalProofPoints: [
      {
        title: "Delivered AI product execution",
        description: "Turned multiple advisor-style workflows into one more coherent AI product experience.",
        icon: Bot,
      },
      {
        title: "Integrated a real RAG stack",
        description: "Combined retrieval, secure storage, and AI workflow orchestration into a scalable system.",
        icon: ScanSearch,
      },
      {
        title: "Shipped cloud-ready infrastructure",
        description: "Paired product work with deployment patterns built for secure growth and iteration.",
        icon: Sparkles,
      },
    ],
  },
  {
    id: "kittykat",
    sector: "Fashion AI visuals",
    title: "KittyKat",
    summary: "Built a generative AI fashion workflow that turned product photos into scalable model visuals with faster turnaround and better quality.",
    services: ["Generative AI", "Image workflows", "Model refinement"],
    media: <ProofIcon icon={Sparkles} />,
    mockImageSrc: "/assets/kittykat.svg",
    mockImageAlt: "KittyKat brand mark",
    mockVariant: "sunrise",
    mockLayout: "compact",
    mockImageClassName: "bg-white/70 p-10 object-contain",
    modalIntro:
      "KittyKat needed a way to generate premium fashion visuals at scale without the delay and cost of repeated production shoots. The work centered on turning AI image generation into a more realistic, reliable branded workflow.",
    modalOutcomes: [
      "Built a generative AI fashion platform for product-to-model image generation.",
      "Improved facial alignment, body proportions, and final output quality through refinement workflows.",
      "Reduced image creation time and unlocked more scalable branded visual production.",
      "Enabled stronger storytelling and engagement through faster visual experimentation.",
    ],
    modalProofPoints: [
      {
        title: "Automated visual production",
        description: "Replaced slower production cycles with a faster AI-generated image pipeline.",
        icon: Sparkles,
      },
      {
        title: "Refined output quality",
        description: "Used preprocessing and hierarchical refinement to improve realism and premium presentation.",
        icon: LayoutGrid,
      },
      {
        title: "Scaled branded visuals",
        description: "Made it easier for the brand to produce larger volumes of usable creative assets.",
        icon: ScanSearch,
      },
    ],
  },
  {
    id: "ageshift",
    sector: "AI wellness platform",
    title: "AgeShift",
    summary: "Delivered an AI-enabled wellness platform spanning mobile app, backend APIs, admin tools, and cloud infrastructure.",
    services: ["Mobile app", "Backend API", "AI integration"],
    media: <ProofIcon icon={BarChart3} />,
    mockImageSrc: "/assets/illustration3.png",
    mockImageAlt: "AgeShift wellness platform illustration",
    mockVariant: "prism",
    mockLayout: "compact",
    modalIntro:
      "AgeShift needed a connected wellness product ecosystem that could guide users through routines, protocol tracking, and AI-powered recommendations while also giving administrators stronger operational visibility.",
    modalOutcomes: [
      "Built a Flutter mobile app, FastAPI backend, and Next.js admin panel on Google Cloud Platform.",
      "Added AI-driven recommendations, structured protocol tracking, and unified user/admin workflows.",
      "Implemented CI/CD pipelines for more reliable builds, testing, and deployment.",
      "Created a secure, scalable product base for ongoing growth and behavior-driven insights.",
    ],
    modalProofPoints: [
      {
        title: "Shipped cross-platform product systems",
        description: "Connected mobile, backend, and admin experiences into one operational platform.",
        icon: LayoutGrid,
      },
      {
        title: "Integrated AI recommendations",
        description: "Used AI to make routine guidance and wellness insights more personalized and actionable.",
        icon: Bot,
      },
      {
        title: "Built for secure scaling",
        description: "Paired product execution with cloud infrastructure and CI/CD for long-term reliability.",
        icon: Sparkles,
      },
    ],
  },
  {
    id: "general-aeronautics-ops",
    sector: "Aviation operations UX",
    title: "General Aeronautics Ops",
    summary: "Extended the General Aeronautics system into clearer interface and proof layers that made operational workflows feel more tangible and easier to trust.",
    services: ["Product UX", "Interface direction", "Campaign assets"],
    media: <ProofIcon icon={LayoutGrid} />,
    mockImageSrc: "/assets/GA_bg.png",
    mockImageAlt: "General Aeronautics operations interface proof",
    mockVariant: "prism",
    mockLayout: "wide",
    modalIntro:
      "Beyond the main brand and website work, the General Aeronautics engagement also pushed into interface direction and proof assets that helped operational workflows feel clearer, more intuitive, and easier to communicate.",
    modalOutcomes: [
      "Carried the broader case-study system into more product-facing operational views.",
      "Made proof artifacts more tangible for product, campaign, and stakeholder communication.",
      "Improved clarity around how the drone experience works in real applied contexts.",
      "Created stronger continuity between brand story, product UX, and supporting assets.",
    ],
    modalProofPoints: [
      {
        title: "Made operations easier to read",
        description: "Turned more technical workflow views into clearer interface-led storytelling.",
        icon: LayoutGrid,
      },
      {
        title: "Connected proof and product",
        description: "Used visual proof layers to strengthen how the operational product story is understood.",
        icon: ScanSearch,
      },
      {
        title: "Expanded the system",
        description: "Extended the same design logic across interface, communication, and campaign touchpoints.",
        icon: Sparkles,
      },
    ],
  },
];

const homepageCaseStudies = [...studioCaseStudies, ...additionalCaseStudies];

// The case-studies section turns named proof into a scannable homepage evidence block.
export function StudioCaseStudies() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<StudioCaseStudySummary | null>(null);
  const featuredCaseStudies = homepageCaseStudies.slice(0, 2);
  const secondaryCaseStudies = homepageCaseStudies.slice(2, 5);
  const spotlightCaseStudy = homepageCaseStudies[5];

  return (
    <>
      <section id="work" className="relative overflow-hidden bg-white px-6 py-10 md:px-10 md:py-2">
        {/* The section background extends the hero's light grid so the frame line continues below the fold. */}
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.042)_1px,transparent_1px)] bg-[size:120px_100%]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(148,163,184,0.021)_1px,transparent_1px)] bg-[size:100%_120px]" />
          <div className="absolute inset-y-0 left-1/2 hidden w-full max-w-7xl -translate-x-1/2 px-6 md:block md:px-10">
            <div className="absolute inset-y-0 left-0 w-px bg-slate-200/80" />
            <div className="absolute inset-y-0 right-0 w-px bg-slate-200/80" />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10">
          {/* The section heading uses the dark reference's editorial contrast with one dominant line and one quieter display block. */}
          <div className="max-w-6xl space-y-5 lg:pl-10 xl:pl-14">
            <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">Work</p>
            <h2 className="text-hero-support max-w-5xl text-[var(--neutral-950)]">
              <strong>Launch faster. Reach revenue sooner.</strong>
            </h2>
            <p className="text-display-muted-editorial max-w-6xl">
              Turn roadmap bets into <span className="text-[var(--color-text-brand)]">shipped releases</span>, adoption, and compounding traction with one execution partner.
            </p>
          </div>

          {/* The work grid now follows a 2 / 3 / 1 rhythm so featured proof and supporting projects each get the right visual weight. */}
          <div className="space-y-6 lg:px-10 xl:px-14">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
              {featuredCaseStudies.map((caseStudy) => (
                <StudioCaseStudyMockCard
                  key={caseStudy.id}
                  sector={caseStudy.sector}
                  title={caseStudy.title}
                  summary={caseStudy.summary}
                  services={caseStudy.services}
                  imageSrc={caseStudy.mockImageSrc ?? "/assets/GA_cover.png"}
                  imageAlt={caseStudy.mockImageAlt ?? `${caseStudy.title} case study mock`}
                  imageClassName={caseStudy.mockImageClassName}
                  variant={caseStudy.mockVariant}
                  layout={caseStudy.mockLayout}
                  onOpenDetails={() => setActiveCaseStudy(caseStudy)}
                />
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
              {secondaryCaseStudies.map((caseStudy) => (
                <StudioCaseStudyMockCard
                  key={caseStudy.id}
                  sector={caseStudy.sector}
                  title={caseStudy.title}
                  summary={caseStudy.summary}
                  services={caseStudy.services}
                  imageSrc={caseStudy.mockImageSrc ?? "/assets/GA_cover.png"}
                  imageAlt={caseStudy.mockImageAlt ?? `${caseStudy.title} case study mock`}
                  imageClassName={caseStudy.mockImageClassName}
                  variant={caseStudy.mockVariant}
                  layout={caseStudy.mockLayout}
                  onOpenDetails={() => setActiveCaseStudy(caseStudy)}
                />
              ))}
            </div>

            {spotlightCaseStudy ? (
              <div className="grid gap-6">
                <StudioCaseStudyMockCard
                  sector={spotlightCaseStudy.sector}
                  title={spotlightCaseStudy.title}
                  summary={spotlightCaseStudy.summary}
                  services={spotlightCaseStudy.services}
                  imageSrc={spotlightCaseStudy.mockImageSrc ?? "/assets/GA_cover.png"}
                  imageAlt={spotlightCaseStudy.mockImageAlt ?? `${spotlightCaseStudy.title} case study mock`}
                  imageClassName={spotlightCaseStudy.mockImageClassName}
                  variant={spotlightCaseStudy.mockVariant}
                  layout={spotlightCaseStudy.mockLayout}
                  onOpenDetails={() => setActiveCaseStudy(spotlightCaseStudy)}
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <StudioCaseStudySummaryDialog
        caseStudy={activeCaseStudy}
        open={Boolean(activeCaseStudy)}
        onOpenChange={(open) => {
          if (!open) {
            setActiveCaseStudy(null);
          }
        }}
      />
    </>
  );
}


