import { getJobsByLevel, getAllJobs } from "@/lib/services/jobs";
import type { JobLevel } from "@/lib/types/jobs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const level = searchParams.get("level") as JobLevel | null;

  try {
    const jobs = level ? await getJobsByLevel(level) : await getAllJobs();

    return Response.json({ jobs });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to load jobs.",
      },
      { status: 500 },
    );
  }
}
