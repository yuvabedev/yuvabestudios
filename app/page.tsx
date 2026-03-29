import { getHomepageCaseStudies } from "@/components/studio/studio-case-study-content";
import { StudioCaseStudies } from "@/components/studio/studio-case-studies";
import { StudioHeader } from "@/components/studio/studio-header";
import { StudioHero } from "@/components/studio/studio-hero";
import { StudioPageRails } from "@/components/studio/studio-page-shell";
import { StudioServices } from "@/components/studio/studio-services";
import { StudioTestimonials } from "@/components/studio/studio-testimonials";
import {
  getStudioCaseStudies,
  getStudioHomepageContent,
} from "@/lib/studio-content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [homepageContent, caseStudies] = await Promise.all([
    getStudioHomepageContent(),
    getStudioCaseStudies(),
  ]);
  const homepageCaseStudies = getHomepageCaseStudies(caseStudies);

  return (
    <main
      data-studio-shell
      className="relative min-h-screen overflow-hidden bg-white text-foreground"
    >
      {/* The page-level rails keep the outer frame continuous across every homepage section. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <StudioPageRails />
      </div>

      {/* The homepage starts with the Stripe-inspired hero and flows into proof. */}
      <StudioHeader navigationItems={homepageContent.navigationItems} />
      <StudioHero content={homepageContent.hero} />
      <StudioServices content={homepageContent.services} />
      <StudioCaseStudies
        caseStudies={homepageCaseStudies}
        workContent={homepageContent.work}
      />
      <StudioTestimonials content={homepageContent.testimonials} />
    </main>
  );
}
