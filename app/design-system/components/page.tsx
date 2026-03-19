import { Bot, LayoutGrid, Sparkles } from "lucide-react";

import { BillingSurfacePreview } from "@/app/design-system/components/billing-surface-preview";
import { StudioCaseStudyCard } from "@/components/studio/studio-case-study-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IllustrationCard } from "@/components/ui/illustration-card";
import { PremiumSurface } from "@/components/ui/premium-surface";
import { Spinner } from "@/components/ui/spinner";

// This tiny specimen proves the shared illustration card can hold authored HTML/CSS graphics instead of screenshots.
function IllustrationCardPreviewGraphic() {
  return (
    <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
      <div className="space-y-3">
        {["Signals", "Users", "Assumptions"].map((label) => (
          <div
            key={label}
            className="rounded-full border border-[rgb(203_195_223_/_0.12)] bg-[rgb(255_255_255_/_0.04)] px-4 py-2.5 text-label-md text-[var(--color-text-inverse-muted)]"
          >
            {label}
          </div>
        ))}
      </div>

      <div className="relative mx-auto h-28 w-full max-w-[11rem] sm:w-44">
        <div className="absolute left-0 right-8 top-1/2 h-px -translate-y-1/2 bg-[rgb(203_195_223_/_0.16)]" />
        <div className="absolute right-0 top-1/2 flex h-20 w-24 -translate-y-1/2 items-center justify-center rounded-[1.25rem] border border-[rgb(88_41_199_/_0.4)] bg-[rgb(88_41_199_/_0.16)] px-4 text-center text-label-md text-white shadow-[0_16px_36px_rgb(88_41_199_/_0.18)]">
          Right wedge
        </div>
      </div>
    </div>
  );
}

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

        {/* This specimen documents the reusable dark illustration card for coded founder-story visuals. */}
        <section>
          <IllustrationCard
            title="Illustration card"
            body="Use for premium dark cards that combine founder-facing copy with coded diagrams, workflows, or mini product visuals."
            illustration={<IllustrationCardPreviewGraphic />}
          />
        </section>

        {/* The frosted-glass preview documents the reusable pill and compact-panel family before it spreads to live sections. */}
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <PremiumSurface
            tone="glassPanelSubtle"
            elevation="sm"
            blur="lg"
            radius="xl"
            className="space-y-5 p-6"
          >
            <div className="space-y-2">
              <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">Premium / Frosted glass</p>
              <h2 className="text-heading-md text-foreground">Reusable pill and micro-panel family</h2>
              <p className="text-body-md text-muted-foreground">
                A lighter adaptation of the frosted-glass reference for service badges, compact filters, and quiet floating controls.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Badge variant="service">Positioning</Badge>
              <Badge variant="service">Branding</Badge>
              <Badge variant="service">Content system</Badge>
            </div>
          </PremiumSurface>

          <div className="grid gap-4">
            <PremiumSurface
              tone="glassPillSubtle"
              elevation="sm"
              blur="md"
              radius="full"
              className="inline-flex items-center justify-center px-4 py-2 text-label-md"
            >
              Glass pill subtle
            </PremiumSurface>

            <PremiumSurface
              tone="glassPillStrong"
              elevation="sm"
              blur="md"
              radius="full"
              className="inline-flex items-center justify-center px-4 py-2 text-label-md"
            >
              Glass pill strong
            </PremiumSurface>

            <PremiumSurface
              tone="glassPanelSubtle"
              elevation="sm"
              blur="lg"
              radius="lg"
              className="flex items-center justify-between gap-4 p-4"
            >
              <div className="space-y-1">
                <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">Compact panel</p>
                <p className="text-body-sm text-foreground">Use for quiet floating chrome and micro-controls.</p>
              </div>
              <span className="flex size-9 items-center justify-center rounded-full bg-white/40 text-[var(--purple-500)]">
                <Sparkles className="size-4" />
              </span>
            </PremiumSurface>
          </div>
        </section>

        {/* This specimen documents the shared loading state for buttons that trigger async work. */}
        <section className="space-y-[var(--space-200)] rounded-[var(--ds-radius-xl)] border bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,248,250,0.94))] p-[var(--space-400)] shadow-sm">
          <div className="max-w-3xl space-y-[var(--space-150)]">
            <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">Components / Button</p>
            <h2 className="text-heading-lg text-foreground">Loading state</h2>
            <p className="text-body-md text-muted-foreground">
              Buttons that trigger API work should use the shared spinner-backed loading state instead of one-off pending text or custom loaders.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button loading loadingText="Generating">Generate concept</Button>
            <Button variant="secondary" loading loadingText="Downloading" spinnerPlacement="end">
              Download report
            </Button>
            <Button variant="ghost" disabled>
              <Spinner data-icon="inline-start" />
              Preview only
            </Button>
          </div>
        </section>

        {/* This specimen captures the brighter aurora-style product backdrop as a reusable premium surface. */}
        <BillingSurfacePreview />

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
