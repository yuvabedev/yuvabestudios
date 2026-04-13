import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  Bot,
  BrainCircuit,
  Code2,
  Compass,
  FlaskConical,
  Megaphone,
  SearchCheck,
  Sparkles,
} from "lucide-react";

import type { StudioHomepageNavItem } from "@/components/studio/studio-homepage-content";
import { StudioAiFirstSection } from "@/components/studio/studio-ai-first-section";
import { StudioCtaCard } from "@/components/studio/studio-cta-card";
import { StudioHeader } from "@/components/studio/studio-header";
import {
  StudioPageContainer,
  StudioPageRails,
} from "@/components/studio/studio-page-shell";
import { StudioTrustStripGuides } from "@/components/studio/studio-trust-strip";
import { Badge } from "@/components/ui/badge";
import { PremiumSurface } from "@/components/ui/premium-surface";

type WorkflowSurfaceTone =
  | "tintLavender"
  | "tintWarm"
  | "tintCyan"
  | "tintGreen";

type WorkflowStage = {
  step: string;
  title: string;
  eyebrow: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
  tone: WorkflowSurfaceTone;
};

type DisciplineArea = {
  title: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
};

type Guardrail = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const workflowStages: WorkflowStage[] = [
  {
    step: "01",
    title: "Frame",
    eyebrow: "Sharper problem selection",
    description:
      "We use AI to compress research, founder context, user signals, and adjacent patterns into a tighter point of view before roadmaps harden.",
    bullets: [
      "Synthesize messy inputs into testable assumptions",
      "Pressure-test wedges, priorities, and sequencing earlier",
    ],
    icon: Compass,
    tone: "tintLavender",
  },
  {
    step: "02",
    title: "Prototype",
    eyebrow: "Richer thinking, sooner",
    description:
      "Ideas become believable flows, interfaces, and lightweight concepts much faster, so we can learn from something concrete instead of debating abstractions.",
    bullets: [
      "Explore multiple directions before committing design effort",
      "Get to realistic product artifacts without full production cost",
    ],
    icon: Blocks,
    tone: "tintWarm",
  },
  {
    step: "03",
    title: "Test",
    eyebrow: "Faster evidence loops",
    description:
      "We turn early concepts into sharper experiments, feedback prompts, and validation passes so founders can learn what matters before scaling the build.",
    bullets: [
      "Use prototypes and launch surfaces to gather real signal",
      "Translate feedback into the next best decision, not more noise",
    ],
    icon: FlaskConical,
    tone: "tintCyan",
  },
  {
    step: "04",
    title: "Decide",
    eyebrow: "Judgment stays central",
    description:
      "AI expands the option space. Our job is to narrow it with product judgment, strategic clarity, and execution discipline so the next move is actually worth making.",
    bullets: [
      "Decide what not to build while the cost of change is still low",
      "Keep momentum tied to traction, not just output volume",
    ],
    icon: BrainCircuit,
    tone: "tintGreen",
  },
];

const disciplineAreas: DisciplineArea[] = [
  {
    title: "Strategy",
    description:
      "AI helps us move from scattered context to a clearer wedge, faster.",
    bullets: [
      "Research synthesis and founder context mapping",
      "Assumption ranking and experiment planning",
      "Sharper positioning and roadmap tradeoff discussions",
    ],
    icon: SearchCheck,
  },
  {
    title: "Design",
    description:
      "We generate, compare, and refine more directions before committing to one.",
    bullets: [
      "Concept exploration with tighter feedback loops",
      "Higher-fidelity MVP thinking much earlier",
      "Interfaces built to test clarity, trust, and behavior",
    ],
    icon: Sparkles,
  },
  {
    title: "Engineering",
    description:
      "Build speed increases, but the bigger win is a tighter path from idea to working system.",
    bullets: [
      "AI-assisted implementation, automation, and internal tooling",
      "Faster iteration on app logic and workflow-heavy products",
      "More room to focus engineering effort on what matters most",
    ],
    icon: Code2,
  },
  {
    title: "Growth",
    description:
      "Launches become learning systems when messaging, campaigns, and product loops stay connected.",
    bullets: [
      "Landing-page and campaign iteration with less production drag",
      "Faster copy, content, and experimentation support",
      "Growth execution tied back to what the product is learning",
    ],
    icon: Megaphone,
  },
];

const guardrails: Guardrail[] = [
  {
    title: "Problem framing still needs humans",
    description:
      "AI can expand possibilities quickly, but it cannot decide which founder problem is strategically worth solving next.",
    icon: Compass,
  },
  {
    title: "Judgment decides what ships",
    description:
      "We still need taste, prioritization, and context to filter what is coherent, trustworthy, and worth putting in front of users.",
    icon: BrainCircuit,
  },
  {
    title: "Evidence beats novelty",
    description:
      "The point is not to sprinkle AI across the workflow. The point is to create better bets, richer MVPs, and faster learning with less waste.",
    icon: Bot,
  },
];

type StudioAiWorkflowsPageProps = {
  navigationItems: StudioHomepageNavItem[];
};

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

function SectionIntro({ eyebrow, title, description }: SectionIntroProps) {
  return (
    <div className="max-w-4xl space-y-4 lg:pl-4 xl:pl-6">
      <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
        {eyebrow}
      </p>
      <h2 className="max-w-5xl text-display-muted-editorial text-[var(--neutral-950)]">
        {title}
      </h2>
      <p className="text-body-lg text-[var(--color-text-secondary)]">
        {description}
      </p>
    </div>
  );
}

function WorkflowStageCard({ stage }: { stage: WorkflowStage }) {
  const Icon = stage.icon;

  return (
    <PremiumSurface
      tone={stage.tone}
      elevation="sm"
      blur="sm"
      radius="xl"
      className="h-full p-5 md:p-6"
    >
      {/* The header gives each stage a clear role before the tactical bullets unpack how AI changes it. */}
      <div className="flex h-full flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-label-sm uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
              {stage.eyebrow}
            </p>
            <p className="text-heading-lg text-[var(--neutral-950)]">{stage.title}</p>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/88 text-[var(--color-text-brand)] shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
            <Icon className="size-5" />
          </div>
        </div>

        {/* The body keeps the narrative short, then uses two bullets as the concrete scan anchors. */}
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-heading-sm text-[var(--color-text-brand)]">
              {stage.step}
            </p>
            <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(88,41,199,0.24),rgba(203,195,223,0))]" />
          </div>
          <p className="text-body-md text-[var(--color-text-secondary)]">
            {stage.description}
          </p>
          <div className="space-y-3">
            {stage.bullets.map((bullet) => (
              <div
                key={bullet}
                className="grid grid-cols-[0.875rem_minmax(0,1fr)] items-start gap-3"
              >
                <span className="mt-[0.7rem] flex size-3 rounded-full bg-[var(--purple-500)]" />
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  {bullet}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PremiumSurface>
  );
}

function DisciplineCard({ area }: { area: DisciplineArea }) {
  const Icon = area.icon;

  return (
    <PremiumSurface
      tone="glass"
      elevation="md"
      blur="md"
      radius="xl"
      className="h-full overflow-hidden p-6 md:p-7"
    >
      {/* Each discipline card shows where AI lives in the actual operating model, not as a detached tool list. */}
      <div className="flex h-full flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/90 text-[var(--color-text-brand)] shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
            <Icon className="size-5" />
          </div>
          <h3 className="text-heading-lg text-[var(--neutral-950)]">{area.title}</h3>
        </div>

        <p className="text-body-md text-[var(--color-text-secondary)]">
          {area.description}
        </p>

        <div className="space-y-3">
          {area.bullets.map((bullet) => (
            <div
              key={bullet}
              className="grid grid-cols-[0.875rem_minmax(0,1fr)] items-start gap-3"
            >
              <span className="mt-[0.7rem] flex size-3 rounded-full bg-[var(--yellow-500)]" />
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                {bullet}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PremiumSurface>
  );
}

function GuardrailCard({ item }: { item: Guardrail }) {
  const Icon = item.icon;

  return (
    <PremiumSurface
      tone="neutral"
      elevation="sm"
      blur="none"
      radius="xl"
      className="h-full p-6"
    >
      {/* These cards keep the page grounded in Yuvabe's point of view: AI raises leverage, but humans keep the judgment. */}
      <div className="flex h-full flex-col gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-background-surface-subtle)] text-[var(--color-text-brand)]">
          <Icon className="size-5" />
        </div>
        <div className="space-y-3">
          <h3 className="text-heading-md text-[var(--neutral-950)]">{item.title}</h3>
          <p className="text-body-md text-[var(--color-text-secondary)]">
            {item.description}
          </p>
        </div>
      </div>
    </PremiumSurface>
  );
}

function AiWorkflowsHero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-white pb-14 pt-14 md:pb-20 md:pt-16">
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        {/* The hero now uses the same shared frame guides as the homepage hero instead of a custom local grid. */}
        <StudioTrustStripGuides />
        <div className="absolute left-[-10rem] top-[-6rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(88,41,199,0.12)_0%,rgba(88,41,199,0)_72%)] blur-3xl" />
        <div className="absolute right-[-10rem] top-[-9rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(255,202,45,0.18)_0%,rgba(255,202,45,0)_72%)] blur-3xl" />
      </div>

      <StudioPageContainer className="relative z-10">
        {/* The restored copy halo keeps the hero soft and readable without bringing back the removed panel or CTA clutter. */}
        <div className="relative max-w-4xl overflow-visible lg:pl-4 xl:pl-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 -top-14 h-[calc(100%+10rem)] w-[calc(100%+20rem)] max-w-[54rem] overflow-visible sm:-left-20 sm:-top-16 sm:h-[calc(100%+13rem)] sm:w-[calc(100%+26rem)] sm:max-w-[64rem] lg:-left-28 lg:-top-24 lg:h-[calc(100%+18rem)] lg:w-[calc(100%+38rem)] lg:max-w-[88rem] xl:-left-32 xl:w-[calc(100%+44rem)] xl:max-w-[96rem]"
          >
            <div className="ds-overlay-hero-copy-halo absolute inset-0" />
            <div className="ds-overlay-hero-copy-wash absolute inset-0" />
          </div>

          <div className="relative z-10 space-y-5">
            <Badge variant="brandTagSubtle" className="w-fit">
              AI Workflows
            </Badge>

            <div className="space-y-5">
              <h1 className="max-w-5xl text-hero-display text-[var(--neutral-950)]">
                AI belongs inside every
                <br />
                product loop.
              </h1>
              <p className="max-w-4xl text-hero-support text-[var(--color-text-secondary)]">
                AI compresses the path from ambiguity to traction, helping
                founders frame better bets, test sooner, and decide with more
                confidence.
              </p>
            </div>
          </div>
        </div>
      </StudioPageContainer>
    </section>
  );
}

function AiWorkflowStagesSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-[var(--color-background-canvas)] py-14 md:py-20">
      {/* This section redraws the page rails locally so they stay visible through its own canvas background. */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.042)_1px,transparent_1px)] bg-[size:120px_100%]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(148,163,184,0.021)_1px,transparent_1px)] bg-[size:100%_120px]" />
        <StudioPageRails />
      </div>

      <StudioPageContainer className="space-y-10">
        <SectionIntro
          eyebrow="How We Infuse AI"
          title="AI is woven into the loop, not bolted on afterward."
          description="The point is not to replace product thinking. It is to move faster through the moments that matter most: framing, prototyping, testing, and deciding."
        />

        {/* The four cards turn the research into a founder-readable operating model instead of a tools page. */}
        <div className="grid gap-4 lg:grid-cols-2 lg:pl-4 xl:pl-6">
          {workflowStages.map((stage) => (
            <WorkflowStageCard key={stage.title} stage={stage} />
          ))}
        </div>
      </StudioPageContainer>
    </section>
  );
}

function AiDisciplineSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-white py-14 md:py-20">
      {/* The discipline section mirrors the homepage pattern by owning its own rail/grid layer. */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.042)_1px,transparent_1px)] bg-[size:120px_100%]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(148,163,184,0.021)_1px,transparent_1px)] bg-[size:100%_120px]" />
        <StudioPageRails />
      </div>

      <StudioPageContainer className="space-y-10">
        <SectionIntro
          eyebrow="Across The Stack"
          title="Strategy, design, engineering, and growth stay in one learning system."
          description="We use AI across the full delivery chain so the product direction, the build, and the go-to-market work reinforce each other instead of drifting apart."
        />

        {/* This grid shows where AI creates leverage in each discipline while keeping the story outcome-first. */}
        <div className="grid gap-4 lg:grid-cols-2 lg:pl-4 xl:pl-6">
          {disciplineAreas.map((area) => (
            <DisciplineCard key={area.title} area={area} />
          ))}
        </div>
      </StudioPageContainer>
    </section>
  );
}

function AiGuardrailsSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-[var(--color-background-canvas)] py-14 md:py-20">
      {/* The closing section keeps the rails visible by drawing them inside the section background layer too. */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.042)_1px,transparent_1px)] bg-[size:120px_100%]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(148,163,184,0.021)_1px,transparent_1px)] bg-[size:100%_120px]" />
        <StudioPageRails />
      </div>

      <StudioPageContainer className="space-y-10">
        <SectionIntro
          eyebrow="What Stays Human"
          title="AI raises leverage. Judgment keeps the work valuable."
          description="We are AI-first by DNA, but that does not mean outsourcing the hard decisions. The strongest outcomes still come from better framing, sharper prioritization, and honest evidence."
        />

        {/* The closing guardrails keep the page aligned to the brand thesis: faster making increases the value of judgment. */}
        <div className="grid gap-4 lg:grid-cols-3 lg:pl-4 xl:pl-6">
          {guardrails.map((item) => (
            <GuardrailCard key={item.title} item={item} />
          ))}
        </div>
      </StudioPageContainer>
    </section>
  );
}

export function StudioAiWorkflowsPage({
  navigationItems,
}: StudioAiWorkflowsPageProps) {
  return (
    <main
      data-studio-shell
      className="relative min-h-screen overflow-x-clip overflow-y-visible bg-white text-foreground"
    >
      {/* The rails and soft background glows keep the new route visually tied to the rest of the studio site. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <StudioPageRails />
        <div className="absolute inset-x-0 top-0 h-[26rem] bg-[radial-gradient(circle_at_14%_0%,rgba(88,41,199,0.08),rgba(255,255,255,0)_34%),radial-gradient(circle_at_88%_0%,rgba(255,202,45,0.1),rgba(255,255,255,0)_30%)]" />
      </div>

      <StudioHeader navigationItems={navigationItems} />

      <article className="relative">
        <AiWorkflowsHero />
        <AiWorkflowStagesSection />
        <StudioAiFirstSection />
        <AiDisciplineSection />
        <AiGuardrailsSection />
        <StudioCtaCard
          eyebrow="AI-first execution"
          title="If you want AI inside the operating model, not added as theater."
          description="We help founders use AI to tighten decisions, move faster through product loops, and ship with stronger conviction."
          primaryCtaLabel="Start Your Project"
          primaryCtaHref="#"
        />
      </article>
    </main>
  );
}
