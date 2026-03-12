import { Bot, LayoutGrid, Sparkles } from "lucide-react";

import { StudioCaseStudyCard } from "@/components/studio/studio-case-study-card";
import { PremiumSurface } from "@/components/ui/premium-surface";

// This preview route documents the light case-study card and premium surface shells as part of the shared component system.
export default function ComponentsPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground md:px-10 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-[var(--space-500)]">
        {/* The intro frames the cards as reusable proof components instead of one-off page art. */}
        <section className="space-y-[var(--space-200)] rounded-[var(--ds-radius-xl)] border bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,248,250,0.94))] p-[var(--space-400)] shadow-sm">
          <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">Components / Card</p>
          <div className="max-w-4xl space-y-[var(--space-150)]">
            <h1 className="text-heading-xl text-foreground">Light case-study cards</h1>
            <p className="text-body-lg text-muted-foreground">
              A light-surface adaptation of the darker work-card reference, built on top of the shared shadcn card primitive for founder-facing proof blocks.
            </p>
          </div>
        </section>

        {/* The premium surface preview documents the reusable glass and warm shells before they spread across the site. */}
        <section className="grid gap-6 lg:grid-cols-3">
          <PremiumSurface tone="glass" elevation="lg" blur="lg" radius="xl" className="space-y-4 p-6">
            <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">Premium / Glass</p>
            <h2 className="text-heading-md text-foreground">Overlay-ready shell</h2>
            <p className="text-body-md text-muted-foreground">
              Use for navigation overlays, floating proof modules, and modal-like panels that need strong separation from the page.
            </p>
          </PremiumSurface>

          <PremiumSurface tone="glassSubtle" elevation="md" blur="md" radius="lg" className="flex items-center justify-between gap-4 p-6">
            <div className="space-y-2">
              <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">Premium / Subtle</p>
              <p className="text-body-md text-foreground">Use for compact controls and quiet floating chrome.</p>
            </div>
            <div className="flex size-10 items-center justify-center rounded-full bg-white/70 text-[var(--purple-500)]">
              <Sparkles className="size-4" />
            </div>
          </PremiumSurface>

          <PremiumSurface tone="warm" elevation="sm" blur="sm" radius="full" className="inline-grid grid-cols-[auto,minmax(0,1fr)] items-center gap-3 p-4 sm:px-5 sm:py-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-white/70 text-[var(--purple-500)]">
              <Sparkles className="size-4" />
            </span>
            <span className="text-[0.92rem] leading-[1.32] font-medium uppercase tracking-[0.16em] text-[var(--neutral-800)]">
              AI-first product studio for startups
            </span>
          </PremiumSurface>
        </section>

        {/* The preview grid shows the feature and standard sizes together so their rhythm can be reviewed side by side. */}
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
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
        </section>
      </div>
    </main>
  );
}
