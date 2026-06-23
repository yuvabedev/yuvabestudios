import { createStudioEditableCaseStudy } from "@/components/studio/studio-case-study-content";
import { StudioAdminEditor } from "@/components/studio/studio-admin-editor";
import { logoutAction } from "@/app/studio-admin/login/actions";
import {
  getStudioAboutPageContent,
  getStudioAiNativeEngineeringContent,
  getStudioAiWorkflowsContent,
  getStudioCaseStudies,
  getStudioDigitalMarketingContent,
  getStudioHomepageContent,
  getStudioUiuxDesignContent,
} from "@/lib/studio-content";
import { getStudioCareersPageContent } from "@/lib/careers-content";
import { getAllBlogPosts } from "@/lib/blog";

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
    aiNativeEngineeringContent,
    digitalMarketingContent,
    uiuxDesignContent,
    caseStudies,
    careersContent,
    blogPosts,
  ] = await Promise.all([
    searchParams,
    getStudioHomepageContent({ source: "supabase" }),
    getStudioAboutPageContent({ source: "supabase" }),
    getStudioAiWorkflowsContent(),
    getStudioAiNativeEngineeringContent({ source: "supabase" }),
    getStudioDigitalMarketingContent({ source: "supabase" }),
    getStudioUiuxDesignContent({ source: "supabase" }),
    getStudioCaseStudies({ source: "supabase" }),
    getStudioCareersPageContent(),
    getAllBlogPosts().catch(() => []),
  ]);

  const editableCaseStudies = caseStudies.map(createStudioEditableCaseStudy);
  const defaultCaseStudyId = editableCaseStudies[0]?.id;
  const selectedCaseStudyId =
    caseStudyId && editableCaseStudies.some((cs) => cs.id === caseStudyId)
      ? caseStudyId
      : defaultCaseStudyId;
  const initialTab =
    tab === "case-studies"
      ? "case-studies"
      : tab === "about"
        ? "about"
        : tab === "ai-workflows"
          ? "ai-workflows"
          : tab === "services" || tab === "digital-marketing" || tab === "ai-native-engineering"
            ? "services"
            : tab === "careers"
              ? "careers"
              : tab === "blog"
                ? "blog"
                : "homepage";

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,247,250,0.98))] px-6 py-10 text-foreground md:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* The route intro keeps the internal editor focused on the current studio content sources. */}
        <section className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <p className="text-label-sm uppercase tracking-[0.22em] text-(--color-text-tertiary)">
                Internal / Content editor
              </p>
              <h1 className="text-heading-xl text-foreground">
                Minimal content CMS
              </h1>
              <p className="max-w-3xl text-body-lg text-muted-foreground">
                Edit homepage, about-page, AI Workflows, and case-study content,
                save to Supabase, then refresh the site to review the change
                immediately.
              </p>
            </div>
            <form action={logoutAction}>
              <button
                type="submit"
                className="shrink-0 rounded-xl border border-(--color-border-default) bg-white px-4 py-2 text-sm font-medium text-(--neutral-600) shadow-sm transition hover:border-(--neutral-400) hover:text-(--neutral-900)"
              >
                Sign out
              </button>
            </form>
          </div>
        </section>

        <StudioAdminEditor
          homepageContent={homepageContent}
          aboutContent={aboutContent}
          aiWorkflowsContent={aiWorkflowsContent}
          aiNativeEngineeringContent={aiNativeEngineeringContent}
          digitalMarketingContent={digitalMarketingContent}
          uiuxDesignContent={uiuxDesignContent}
          caseStudies={editableCaseStudies}
          careersContent={careersContent}
          blogPosts={blogPosts}
          initialCaseStudyId={selectedCaseStudyId}
          initialTab={initialTab}
          savedState={saved}
        />
      </div>
    </main>
  );
}
