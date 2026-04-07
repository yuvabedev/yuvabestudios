import { Resend } from "resend";

import {
  buildStartProjectMessage,
  buildStartProjectSubject,
  type StartProjectDraft,
} from "@/lib/start-project";

function normalizeSubmission(payload: Partial<StartProjectDraft>): StartProjectDraft {
  return {
    name: payload.name?.trim() ?? "",
    email: payload.email?.trim() ?? "",
    phone: payload.phone?.trim() ?? "",
    needs: Array.isArray(payload.needs)
      ? payload.needs
          .filter((value): value is string => typeof value === "string")
          .map((value) => value.trim())
          .filter(Boolean)
      : [],
    notes: payload.notes?.trim() ?? "",
    source: payload.source?.trim() ?? "",
  };
}

// This route keeps inquiry delivery on the server so visitors do not need a local mail app.
export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.START_PROJECT_TO_EMAIL || "sales@yuvabe.com";
  const fromEmail =
    process.env.START_PROJECT_FROM_EMAIL ||
    "Yuvabe Studios <noreply@yuvabe.com>";

  if (!resendApiKey) {
    return Response.json(
      { error: "Missing RESEND_API_KEY." },
      { status: 500 },
    );
  }

  try {
    const payload = (await request.json()) as Partial<StartProjectDraft>;
    const submission = normalizeSubmission(payload);
    const resend = new Resend(resendApiKey);

    if (!submission.name || !submission.email) {
      return Response.json(
        { error: "Name and email are required." },
        { status: 400 },
      );
    }

    // The email body mirrors the modal fields so the inbox stays easy to triage.
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: buildStartProjectSubject(submission),
      text: buildStartProjectMessage(submission),
      replyTo: submission.email,
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ ok: true, id: data?.id ?? null });
  } catch {
    return Response.json(
      { error: "Invalid request payload." },
      { status: 400 },
    );
  }
}
