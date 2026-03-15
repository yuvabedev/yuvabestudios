import { StudioCaseStudyMockCard } from "@/components/studio/studio-case-study-mock-card";

const caseStudyPreviewCards = [
  {
    sector: "Aviation technology",
    title: "General Aeronautics",
    summary: "Turned a complex drone portfolio into a clearer digital story buyers, partners, and operators could trust faster.",
    services: ["Positioning", "UX/UI", "Brand system"],
    imageSrc: "/assets/GA_cover.png",
    imageAlt: "General Aeronautics mobile product mock",
    variant: "aurora" as const,
  },
  {
    sector: "ESG intelligence",
    title: "Bevolve.ai",
    summary: "Turned fragmented sustainability reporting into an AI-guided system teams could trust for faster, evidence-based decisions.",
    services: ["AI integration", "ML", "ESG reporting"],
    imageSrc: "/assets/Bevolve_cover.png",
    imageAlt: "Bevolve.ai product experience mock",
    variant: "sunrise" as const,
  },
  {
    sector: "Aviation technology",
    title: "General Aeronautics Ops",
    summary: "Extended the case-study system into clearer interface and proof layers that made the product story feel more tangible and scalable.",
    services: ["Product UX", "Interface direction", "Campaign assets"],
    imageSrc: "/assets/GA_bg.png",
    imageAlt: "General Aeronautics interface and proof layer mock",
    variant: "prism" as const,
  },
];

// This wrapper scopes the thicker white hover bloom to the design-system preview only.
function PreviewBloomCard(props: (typeof caseStudyPreviewCards)[number]) {
  return (
    <div className="group/preview relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[2rem] border-2 border-white/0 opacity-0 shadow-[inset_0_1px_0_rgba(255,255,255,0),0_0_0_1px_rgba(255,255,255,0),0_0_0_rgba(255,255,255,0)] transition-[opacity,box-shadow,border-color] duration-300 ease-out group-hover/preview:border-white/88 group-hover/preview:opacity-100 group-hover/preview:shadow-[inset_0_1px_0_rgba(255,255,255,0.94),0_0_0_1px_rgba(255,255,255,0.78),0_0_38px_rgba(255,255,255,0.38)]"
      />
      <StudioCaseStudyMockCard
        sector={props.sector}
        title={props.title}
        summary={props.summary}
        services={props.services}
        imageSrc={props.imageSrc}
        imageAlt={props.imageAlt}
        variant={props.variant}
      />
    </div>
  );
}

// This preview compares three gradient directions around real case-study content so the system reads like production proof instead of placeholder art.
export function BillingSurfacePreview() {
  return (
    <section className="space-y-6">
      {/* The section intro clarifies that these are case-study mock cards built on the premium gradient surface system. */}
      <div className="max-w-4xl space-y-2">
        <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">Premium / Gradient case-study cards</p>
        <h2 className="text-heading-lg text-foreground">Three image-led directions</h2>
        <p className="text-body-md text-muted-foreground">
          These cards preserve the premium mockup layout, but the content now follows the real case-study card model with sector labels, project names, summaries, and service tags.
        </p>
      </div>

      {/* The responsive grid keeps the variants comparable at a glance while still collapsing cleanly on smaller screens. */}
      <div className="grid gap-6 xl:grid-cols-3">
        {caseStudyPreviewCards.map((card) => (
          <PreviewBloomCard key={`${card.sector}-${card.title}`} {...card} />
        ))}
      </div>
    </section>
  );
}
