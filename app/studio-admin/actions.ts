"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  parseStudioEditableCaseStudyInput,
  parseStudioHomepageContentInput,
  saveStudioCaseStudy,
  saveStudioHomepageContent,
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

  await saveStudioHomepageContent(parsedPayload);

  revalidatePath("/");
  revalidatePath("/studio-admin");
  redirect("/studio-admin?tab=homepage&saved=homepage");
}

export async function saveCaseStudyContentAction(formData: FormData) {
  const caseStudyId = expectString(formData.get("caseStudyId"), "Case study id");
  const payload = expectString(formData.get("payload"), "Case study payload");
  const parsedPayload = parseStudioEditableCaseStudyInput(JSON.parse(payload));

  await saveStudioCaseStudy(caseStudyId, parsedPayload);

  revalidatePath("/");
  revalidatePath(`/case-studies/${caseStudyId}`);
  revalidatePath("/studio-admin");
  redirect(
    `/studio-admin?tab=case-studies&caseStudyId=${caseStudyId}&saved=case-study`,
  );
}
