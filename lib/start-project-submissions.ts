import "server-only";

import type { StartProjectDraft } from "@/lib/start-project";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

const contentDocumentsTable = "content_documents";
export const contactFormSubmissionsDocumentKey = "contact_form_submissions";
const maxStoredSubmissions = 500;

export type StoredStartProjectSubmission = StartProjectDraft & {
  id: string;
  submittedAt: string;
  status: "new";
};

type ContactFormSubmissionsDocument = {
  kind: "contact_form_submissions";
  updatedAt: string;
  submissions: StoredStartProjectSubmission[];
};

function normalizeString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function normalizeStringArray(value: unknown) {
  return Array.isArray(value)
    ? value.filter((entry): entry is string => typeof entry === "string")
    : [];
}

function normalizeStoredSubmission(
  value: unknown,
): StoredStartProjectSubmission | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Partial<StoredStartProjectSubmission>;

  if (!candidate.id || !candidate.submittedAt) {
    return null;
  }

  return {
    id: candidate.id,
    submittedAt: candidate.submittedAt,
    status: "new",
    name: normalizeString(candidate.name),
    email: normalizeString(candidate.email),
    phone: normalizeString(candidate.phone),
    needs: normalizeStringArray(candidate.needs),
    notes: normalizeString(candidate.notes),
    source: normalizeString(candidate.source),
  };
}

function parseSubmissionsDocument(payload: unknown): ContactFormSubmissionsDocument {
  if (!payload || typeof payload !== "object") {
    return {
      kind: "contact_form_submissions",
      updatedAt: "",
      submissions: [],
    };
  }

  const candidate = payload as Partial<ContactFormSubmissionsDocument> & {
    submissions?: unknown[];
  };

  return {
    kind: "contact_form_submissions",
    updatedAt: normalizeString(candidate.updatedAt),
    submissions: Array.isArray(candidate.submissions)
      ? candidate.submissions
          .map((submission) => normalizeStoredSubmission(submission))
          .filter(
            (submission): submission is StoredStartProjectSubmission =>
              submission !== null,
          )
      : [],
  };
}

// This temporary queue keeps lead submissions durable in Supabase while email delivery is still being finalized.
export async function storeStartProjectSubmission(
  draft: StartProjectDraft,
) {
  const supabase = getSupabaseAdminClient();
  const submittedAt = new Date().toISOString();
  const storedSubmission: StoredStartProjectSubmission = {
    ...draft,
    id: crypto.randomUUID(),
    submittedAt,
    status: "new",
  };

  const { data, error } = await supabase
    .from(contentDocumentsTable)
    .select("payload")
    .eq("key", contactFormSubmissionsDocumentKey)
    .maybeSingle<{ payload: unknown }>();

  if (error) {
    throw new Error(`Failed to load contact submissions: ${error.message}`);
  }

  const currentDocument = parseSubmissionsDocument(data?.payload);
  const nextDocument: ContactFormSubmissionsDocument = {
    kind: "contact_form_submissions",
    updatedAt: submittedAt,
    // We cap the buffer so the temporary document stays lightweight while leads are still routed manually.
    submissions: [storedSubmission, ...currentDocument.submissions].slice(
      0,
      maxStoredSubmissions,
    ),
  };

  const { error: saveError } = await supabase
    .from(contentDocumentsTable)
    .upsert(
      {
        key: contactFormSubmissionsDocumentKey,
        payload: nextDocument,
      },
      { onConflict: "key" },
    );

  if (saveError) {
    throw new Error(`Failed to store contact submission: ${saveError.message}`);
  }

  return storedSubmission;
}
