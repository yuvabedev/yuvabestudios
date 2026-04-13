import {
  createStudioEditableCaseStudy,
  isStudioCaseStudyId,
} from "@/components/studio/studio-case-study-content";
import { StudioAdminEditor } from "@/components/studio/studio-admin-editor";
import {
  getStudioAboutPageContent,
  getStudioAiWorkflowsContent,
  getStudioCaseStudies,
  getStudioHomepageContent,
} from "@/lib/studio-content";

export const dynamic = "force-dynamic";

type StudioAdminPageProps = {
  searchParams: Promise<{
    caseStudyId?: string;
    saved?: string;
    tab?: string;
  }>;
};

export default async function StudioAdminPage({
  searchParams,
}: StudioAdminPageProps) {
  const [
    { caseStudyId, saved, tab },
    homepageContent,
    aboutContent,
    aiWorkflowsContent,
    caseStudies,
  ] = await Promise.all([
    searchParams,
    getStudioHomepageContent({ source: "supabase" }),
    getStudioAboutPageContent({ source: "supabase" }),
    getStudioAiWorkflowsContent(),
    getStudioCaseStudies({ source: "supabase" }),
  ]);

  const editableCaseStudies = caseStudies.map(createStudioEditableCaseStudy);
  const defaultCaseStudyId = editableCaseStudies[0]?.id;
  const selectedCaseStudyId =
    caseStudyId && isStudioCaseStudyId(caseStudyId)
      ? caseStudyId
      : defaultCaseStudyId;
  const initialTab =
    tab === "case-studies"
      ? "case-studies"
      : tab === "about"
        ? "about"
        : tab === "ai-workflows"
          ? "ai-workflows"
          : "homepage";

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,247,250,0.98))] px-6 py-10 text-foreground md:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* The route intro keeps the internal editor focused on the current studio content sources. */}
        <section className="space-y-3">
          <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
            Internal / Content editor
          </p>
          <h1 className="text-heading-xl text-foreground">Minimal content CMS</h1>
          <p className="max-w-3xl text-body-lg text-muted-foreground">
            Edit homepage, about-page, AI Workflows, and case-study content,
            save to Supabase, then refresh the site to review the change
            immediately.
          </p>
        </section>

        <StudioAdminEditor
          homepageContent={homepageContent}
          aboutContent={aboutContent}
          aiWorkflowsContent={aiWorkflowsContent}
          caseStudies={editableCaseStudies}
          initialCaseStudyId={selectedCaseStudyId}
          initialTab={initialTab}
          savedState={saved}
        />
      </div>
    </main>
  );
}
