import { ColorSwatch } from "@/components/design-system/color-swatch";
import { ScalePreview } from "@/components/design-system/scale-preview";
import { TokenSection } from "@/components/design-system/token-section";
import { TypeSample } from "@/components/design-system/type-sample";

const primitiveBrandColors = [
  ["purple/500", "#5829C7"],
  ["yellow/500", "#FFCA2D"],
  ["orange/500", "#F9A91F"],
  ["orange/200", "#FADF90"],
  ["green/500", "#90C645"],
  ["green/200", "#C8E3A2"],
  ["lavender/500", "#9688C0"],
  ["lavender/200", "#CBC3DF"],
  ["cyan/500", "#2BB7C7"],
  ["cyan/200", "#94DBE4"],
  ["red-orange/500", "#F04E28"],
  ["peach/200", "#F7A793"],
] as const;

const neutralColors = [
  ["neutral/0", "#FFFFFF"],
  ["neutral/25", "#FCFCFD"],
  ["neutral/50", "#F8F8FA"],
  ["neutral/100", "#F1F2F4"],
  ["neutral/200", "#E5E7EB"],
  ["neutral/300", "#D1D5DB"],
  ["neutral/400", "#9CA3AF"],
  ["neutral/500", "#6B7280"],
  ["neutral/600", "#4B5563"],
  ["neutral/700", "#374151"],
  ["neutral/800", "#1F2937"],
  ["neutral/900", "#111827"],
  ["neutral/950", "#0B0F19"],
] as const;

const semanticColors = [
  ["color/text/primary", "var(--color-text-primary)"],
  ["color/text/secondary", "var(--color-text-secondary)"],
  ["color/text/tertiary", "var(--color-text-tertiary)"],
  ["color/background/canvas", "var(--color-background-canvas)"],
  ["color/background/surface", "var(--color-background-surface)"],
  ["color/background/brand", "var(--color-background-brand)"],
  ["color/border/default", "var(--color-border-default)"],
  ["color/border/focus", "var(--color-border-focus)"],
  ["color/action/primary/bg", "var(--color-action-primary-bg)"],
  ["color/action/secondary/bg", "var(--color-action-secondary-bg)"],
  ["color/feedback/success/bg", "var(--color-feedback-success-bg)"],
  ["color/feedback/error/bg", "var(--color-feedback-error-bg)"],
] as const;

const typeSamples = [
  ["Text/Display/XL", "text-display-xl", "AI-first clarity for founders.", "Clash Display · 64/72 · 600 · -2%"],
  ["Text/Display/LG", "text-display-lg", "Premium systems with product momentum.", "Clash Display · 48/56 · 600 · -2%"],
  ["Text/Heading/XL", "text-heading-xl", "Make the right product bets sooner.", "Clash Display · 40/48 · 600 · -2%"],
  ["Text/Heading/LG", "text-heading-lg", "Foundations keep the site visually coherent.", "Clash Display · 32/40 · 600 · -1.5%"],
  ["Text/Heading/MD", "text-heading-md", "System thinking before component sprawl.", "Clash Display · 24/32 · 500 · -1%"],
  ["Text/Heading/SM", "text-heading-sm", "Readable hierarchy for supporting titles.", "Gilroy · 20/28 · 600 · -1%"],
  ["Text/Body/LG", "text-body-lg", "Use this for important supporting copy where readability and momentum matter equally.", "Gilroy · 18/28 · 400"],
  ["Text/Body/MD", "text-body-md", "Use this as the default body style for most product and marketing copy.", "Gilroy · 16/24 · 400"],
  ["Text/Body/SM", "text-body-sm", "Use this for denser supporting information without reducing clarity.", "Gilroy · 14/20 · 400"],
  ["Text/Label/LG", "text-label-lg", "Primary label", "Gilroy · 16/24 · 500"],
  ["Text/Label/MD", "text-label-md", "Field label", "Gilroy · 14/20 · 500"],
  ["Text/Label/SM", "text-label-sm", "Helper label", "Gilroy · 12/16 · 500 · 1%"],
  ["Text/Caption", "text-caption", "Caption and metadata treatment.", "Gilroy · 12/16 · 400 · 1%"],
] as const;

const spacingScale = [
  ["space/025", "2px"],
  ["space/050", "4px"],
  ["space/100", "8px"],
  ["space/150", "12px"],
  ["space/200", "16px"],
  ["space/300", "24px"],
  ["space/400", "32px"],
  ["space/500", "40px"],
  ["space/600", "48px"],
  ["space/800", "64px"],
  ["space/1000", "80px"],
  ["space/1200", "96px"],
] as const;

const radiusScale = [
  ["radius/none", "0px"],
  ["radius/sm", "4px"],
  ["radius/md", "8px"],
  ["radius/lg", "12px"],
  ["radius/xl", "16px"],
  ["radius/pill", "999px"],
] as const;

const shadowScale = [
  ["shadow/none", "none"],
  ["shadow/sm", "0 1px 2px rgb(11 15 25 / 0.06)"],
  ["shadow/md", "0 6px 16px rgb(11 15 25 / 0.08)"],
  ["shadow/lg", "0 16px 32px rgb(11 15 25 / 0.12)"],
] as const;

const gridPresets = [
  ["Desktop", "1440px · 12 columns · 80px margin · 24px gutter"],
  ["Tablet", "1024px · 8 columns · 40px margin · 20px gutter"],
  ["Mobile", "390px · 4 columns · 16px margin · 16px gutter"],
] as const;

// This route acts as the internal source of truth for the new foundation layer.
export default function FoundationsPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground md:px-10 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-[var(--space-400)]">
        {/* The hero frames the route as internal documentation instead of public marketing UI. */}
        <section className="rounded-[var(--ds-radius-xl)] border bg-card p-[var(--space-300)] shadow-sm md:p-[var(--space-500)]">
          <p className="text-label-sm uppercase tracking-[0.2em] text-brand">Yuvabe design system</p>
          <div className="mt-[var(--space-150)] max-w-4xl space-y-[var(--space-200)]">
            <h1 className="text-display-xl text-foreground">
              Foundation tokens before component expansion.
            </h1>
            <p className="text-body-lg text-muted-foreground">
              This route translates the spec into a documented code foundation: semantic color tokens,
              typography utilities, spacing, radius, shadow, and grid references that later components
              can inherit without visual drift.
            </p>
          </div>
        </section>

        {/* The color section previews both raw palette tokens and the semantic layer built on top of them. */}
        <TokenSection
          title="Color foundations"
          description="Primitive swatches preserve the brand palette, while semantic tokens define how components should consume those colors."
        >
          <div className="space-y-[var(--space-300)]">
            <div>
              <h3 className="mb-[var(--space-150)] text-heading-sm text-foreground">Primitive brand palette</h3>
              <div className="grid gap-[var(--space-200)] md:grid-cols-3 xl:grid-cols-4">
                {primitiveBrandColors.map(([name, value]) => (
                  <ColorSwatch key={name} name={name} value={value} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-[var(--space-150)] text-heading-sm text-foreground">Neutral palette</h3>
              <div className="grid gap-[var(--space-200)] md:grid-cols-3 xl:grid-cols-4">
                {neutralColors.map(([name, value]) => (
                  <ColorSwatch
                    key={name}
                    name={name}
                    value={value}
                    textColor={value === "#0B0F19" || value === "#111827" ? "var(--color-text-inverse)" : undefined}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-[var(--space-150)] text-heading-sm text-foreground">Semantic tokens</h3>
              <div className="grid gap-[var(--space-200)] md:grid-cols-3 xl:grid-cols-4">
                {semanticColors.map(([name, value]) => (
                  <ColorSwatch key={name} name={name} value={value} />
                ))}
              </div>
            </div>
          </div>
        </TokenSection>

        {/* The typography section documents the utility classes that map back to the spec names. */}
        <TokenSection
          title="Typography scale"
          description="The utilities below are the code-safe aliases for the spec’s `Text/*` styles, ready to be reused across sections and later components."
        >
          <div className="grid gap-[var(--space-200)] lg:grid-cols-2">
            {typeSamples.map(([label, utilityClass, preview, meta]) => (
              <TypeSample
                key={label}
                label={label}
                utilityClass={utilityClass}
                preview={preview}
                meta={meta}
              />
            ))}
          </div>
        </TokenSection>

        {/* The scale section makes token steps visible before they get embedded in components. */}
        <TokenSection
          title="Spacing, radius, and shadow"
          description="These tokens set the visual rhythm of the system and should be reused instead of re-invented at the component level."
        >
          <div className="grid gap-[var(--space-300)] xl:grid-cols-3">
            <div>
              <h3 className="mb-[var(--space-150)] text-heading-sm text-foreground">Spacing scale</h3>
              <div className="space-y-[var(--space-150)]">
                {spacingScale.map(([label, value]) => (
                  <ScalePreview key={label} label={label} value={value} preview="space" />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-[var(--space-150)] text-heading-sm text-foreground">Radius scale</h3>
              <div className="space-y-[var(--space-150)]">
                {radiusScale.map(([label, value]) => (
                  <ScalePreview key={label} label={label} value={value} preview="radius" />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-[var(--space-150)] text-heading-sm text-foreground">Shadow scale</h3>
              <div className="space-y-[var(--space-150)]">
                {shadowScale.map(([label, value]) => (
                  <ScalePreview key={label} label={label} value={value} preview="shadow" />
                ))}
              </div>
            </div>
          </div>
        </TokenSection>

        {/* The reference section captures non-token guidance that still informs later layouts and reviews. */}
        <TokenSection
          title="Foundation references"
          description="These reference blocks preserve the rest of the spec’s foundation guidance without turning them into page-level components yet."
        >
          <div className="grid gap-[var(--space-300)] lg:grid-cols-[1.2fr_0.8fr]">
            <article className="rounded-[var(--ds-radius-lg)] border bg-background p-[var(--space-300)] shadow-sm">
              <h3 className="text-heading-sm text-foreground">Base frame presets</h3>
              <div className="mt-[var(--space-200)] grid gap-[var(--space-150)] md:grid-cols-3">
                {gridPresets.map(([name, value]) => (
                  <div key={name} className="rounded-[var(--ds-radius-md)] border bg-muted p-[var(--space-200)]">
                    <p className="text-label-lg text-foreground">{name}</p>
                    <p className="mt-[var(--space-100)] text-body-sm text-muted-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[var(--ds-radius-lg)] border bg-background p-[var(--space-300)] shadow-sm">
              <h3 className="text-heading-sm text-foreground">Foundations page checklist</h3>
              <ul className="mt-[var(--space-200)] space-y-[var(--space-150)] text-body-sm text-muted-foreground">
                <li>Logo on light and dark backgrounds</li>
                <li>Primary, accent, and neutral palette previews</li>
                <li>Gradient, typography, radius, and shadow references</li>
                <li>Icon size guidance at 16, 20, and 24 pixels</li>
              </ul>
            </article>
          </div>
        </TokenSection>
      </div>
    </main>
  );
}
