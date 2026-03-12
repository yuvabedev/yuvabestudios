import { Bot, LayoutGrid } from "lucide-react";

import { StudioCaseStudyCard } from "@/components/studio/studio-case-study-card";

// The case-studies section turns named proof into a scannable homepage evidence block.
export function StudioCaseStudies() {
  return (
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
          <h2 className="text-section-display max-w-5xl text-[var(--neutral-950)]">
            Launch faster. Reach revenue sooner.
          </h2>
          <p className="text-display-muted-editorial max-w-6xl">
            Turn roadmap bets into <span className="font-semibold text-[var(--color-text-primary)]">shipped releases</span>, adoption, and compounding traction with one execution partner.
          </p>
        </div>

        {/* The card grid carries named proof in the same premium system as the rest of the homepage. */}
        <div className="grid gap-6 sm:gap-7 lg:px-10 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] xl:px-14">
          <StudioCaseStudyCard
            size="feature"
            sector="Aviation technology"
            title="General Aeronautics"
            summary="Turned a complex drone portfolio into a clearer digital story buyers, partners, and operators could trust faster."
            services={["Positioning", "UX/UI", "Brand system"]}
            href="#"
            media={
              <LayoutGrid className="size-24 stroke-[1.4] text-[color:color-mix(in_srgb,var(--neutral-700)_82%,var(--lavender-500)_18%)]" />
            }
          />

          <StudioCaseStudyCard
            sector="ESG intelligence"
            title="Bevolve.ai"
            summary="Turned fragmented sustainability reporting into an AI-guided system teams could trust for faster, evidence-based decisions."
            services={["AI integration", "ML", "ESG reporting"]}
            href="#"
            media={
              <Bot className="size-24 stroke-[1.4] text-[color:color-mix(in_srgb,var(--neutral-700)_82%,var(--lavender-500)_18%)]" />
            }
          />
        </div>
      </div>
    </section>
  );
}








