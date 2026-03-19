import { StudioCaseStudyEditorialCard } from "@/components/studio/studio-case-study-editorial-card";

// This preview documents the exploratory editorial card as a separate component so production usage can remain unchanged.
export function EditorialCaseStudyPreview() {
  // The preview keeps its sample copy local so exploratory design-system work does not depend on production data loading.
  const generalAeronauticsSummary =
    "Brand identity, product storytelling, and interface design for a deep-tech drone portfolio built to communicate complex capability clearly.";
  const bevolveSummary =
    "Product design and AI-focused UX for ESG reporting workflows that help teams move from scattered data to usable operational insight.";

  return (
    <section className="space-y-6">
      {/* The section intro makes it explicit that these are testable alternatives rather than silent production changes. */}
      <div className="max-w-4xl space-y-3">
        <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">Components / Explorations</p>
        <h2 className="text-heading-lg text-foreground">Editorial proof card</h2>
        <p className="text-body-lg text-muted-foreground">
          A quieter poster-style case-study variant with a short summary headline, small brand logo, and one large artwork field over a subtle branded gradient.
        </p>
      </div>

      {/* The preview grid shows both cards on the new layout while the original card component remains intact above. */}
      <div className="grid gap-6 lg:grid-cols-2">
        <StudioCaseStudyEditorialCard
          size="feature"
          title="General Aeronautics"
          headline="Branding for a deep-tech drone portfolio"
          subtext={generalAeronauticsSummary}
          brandName="General Aeronautics"
          logoSrc="/assets/general-aeronautics.svg"
          heroSrc="/assets/GA_cover.png"
          href="#"
        />

        <StudioCaseStudyEditorialCard
          title="Bevolve.ai"
          headline="AI platform for ESG reporting"
          subtext={bevolveSummary}
          brandName="Bevolve.ai"
          logoSrc="/assets/bevolve-ai.svg"
          heroSrc="/assets/Bevolve_cover.png"
          href="#"
        />
      </div>
    </section>
  );
}


