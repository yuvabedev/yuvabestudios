import type { StartProjectDraft } from "@/lib/start-project";
import { storeStartProjectSubmission } from "@/lib/start-project-submissions";

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
  let payload: Partial<StartProjectDraft>;

  try {
    payload = (await request.json()) as Partial<StartProjectDraft>;
  } catch {
    return Response.json(
      { error: "Invalid request payload." },
      { status: 400 },
    );
  }

  const submission = normalizeSubmission(payload);

  if (!submission.name || !submission.email) {
    return Response.json(
      { error: "Name and email are required." },
      { status: 400 },
    );
  }

  try {
    const storedSubmission = await storeStartProjectSubmission(submission);

    return Response.json({
      ok: true,
      id: storedSubmission.id,
      storage: "supabase_temp",
    });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to store your inquiry right now.",
      },
      { status: 500 },
    );
  }
}
