import { StudioCaseStudies } from "@/components/studio/studio-case-studies";
import { StudioHeader } from "@/components/studio/studio-header";
import { StudioHero } from "@/components/studio/studio-hero";

export default function Home() {
  return (
    <main data-studio-shell className="relative min-h-screen overflow-hidden bg-white text-foreground">
      {/* The page-level rails keep the outer frame continuous across every homepage section. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-y-0 left-1/2 hidden w-full max-w-7xl -translate-x-1/2 px-6 md:block md:px-10">
          <div className="absolute inset-y-0 left-0 w-px bg-slate-200/80" />
          <div className="absolute inset-y-0 right-0 w-px bg-slate-200/80" />
        </div>
      </div>

      {/* The homepage starts with the Stripe-inspired hero and flows into proof. */}
      <StudioHeader />
      <StudioHero />
      <StudioCaseStudies />
    </main>
  );
}

