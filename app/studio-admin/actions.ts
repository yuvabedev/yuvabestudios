"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  parseStudioAboutPageContentInput,
  parseStudioAiNativeEngineeringContentInput,
  parseStudioAiWorkflowsContentInput,
  parseStudioDigitalMarketingContentInput,
  parseStudioEditableCaseStudyInput,
  parseStudioHomepageContentInput,
  parseStudioUiuxDesignContentInput,
  saveStudioAboutPageContent,
  saveStudioAiNativeEngineeringContent,
  saveStudioAiWorkflowsContent,
  saveStudioCaseStudy,
  saveStudioDigitalMarketingContent,
  saveStudioHomepageContent,
  saveStudioUiuxDesignContent,
} from "@/lib/studio-content";

function expectString(value: FormDataEntryValue | null, label: string) {
  if (typeof value !== "string") {
    throw new Error(`${label} is required.`);
  }

  return value;
}

export async function saveHomepageContentAction(formData: FormData) {
  const payload = expectString(formData.get("payload"), "Homepage payload");
  const parsedPayload = parseStudioHomepageContentInput(JSON.parse(payload));

  await saveStudioHomepageContent(parsedPayload, { source: "supabase" });

  revalidatePath("/");
  revalidatePath("/studio-admin");
  redirect("/studio-admin?tab=homepage&saved=homepage");
}

export async function saveAboutContentAction(formData: FormData) {
  const payload = expectString(formData.get("payload"), "About payload");
  const parsedPayload = parseStudioAboutPageContentInput(JSON.parse(payload));

  await saveStudioAboutPageContent(parsedPayload, { source: "supabase" });

  revalidatePath("/about");
  revalidatePath("/studio-admin");
  redirect("/studio-admin?tab=about&saved=about");
}

export async function saveAiWorkflowsContentAction(formData: FormData) {
  const payload = expectString(formData.get("payload"), "AI workflows payload");
  const parsedPayload = parseStudioAiWorkflowsContentInput(JSON.parse(payload));

  await saveStudioAiWorkflowsContent(parsedPayload, { source: "supabase" });

  revalidatePath("/ai-workflows");
  revalidatePath("/studio-admin");
  redirect("/studio-admin?tab=ai-workflows&saved=ai-workflows");
}

export async function saveDigitalMarketingContentAction(formData: FormData) {
  const payload = expectString(formData.get("payload"), "Digital marketing payload");
  const parsedPayload = parseStudioDigitalMarketingContentInput(JSON.parse(payload));

  await saveStudioDigitalMarketingContent(parsedPayload, { source: "supabase" });

  revalidatePath("/digital-marketing");
  revalidatePath("/studio-admin");
  redirect("/studio-admin?tab=services&saved=digital-marketing");
}

export async function saveAiNativeEngineeringContentAction(formData: FormData) {
  const payload = expectString(formData.get("payload"), "AI Native Engineering payload");
  const parsedPayload = parseStudioAiNativeEngineeringContentInput(JSON.parse(payload));

  await saveStudioAiNativeEngineeringContent(parsedPayload, { source: "supabase" });

  revalidatePath("/ai-native-engineering");
  revalidatePath("/studio-admin");
  redirect("/studio-admin?tab=services&saved=ai-native-engineering");
}

export async function saveUiuxDesignContentAction(formData: FormData) {
  const payload = expectString(formData.get("payload"), "UI/UX Design payload");
  const parsedPayload = parseStudioUiuxDesignContentInput(JSON.parse(payload));

  await saveStudioUiuxDesignContent(parsedPayload, { source: "supabase" });

  revalidatePath("/uiux-design");
  revalidatePath("/studio-admin");
  redirect("/studio-admin?tab=services&saved=uiux-design");
}

export async function saveCaseStudyContentAction(formData: FormData) {
  const caseStudyId = expectString(formData.get("caseStudyId"), "Case study id");
  const payload = expectString(formData.get("payload"), "Case study payload");
  const parsedPayload = parseStudioEditableCaseStudyInput(JSON.parse(payload));

  await saveStudioCaseStudy(caseStudyId, parsedPayload, {
    source: "supabase",
  });

  revalidatePath("/");
  revalidatePath(`/case-studies/${caseStudyId}`);
  revalidatePath("/studio-admin");
  redirect(
    `/studio-admin?tab=case-studies&caseStudyId=${caseStudyId}&saved=case-study`,
  );
}
