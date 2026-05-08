import { getSupabasePeopleClient } from "@/lib/supabase-people";
import { jobSchema } from "@/lib/schemas/job.schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = jobSchema.parse(body);

    // Create Supabase client
    const supabase = getSupabasePeopleClient();

    // Insert into jobs_duplicate table
    const { data, error } = await supabase
      .from("jobs_duplicate")
      .insert([
        {
          title: validatedData.title,
          department: validatedData.department,
          location: validatedData.location,
          type: validatedData.type,
          level: validatedData.level,
          posted: validatedData.posted,
          summary: validatedData.summary,
          responsibilities: validatedData.responsibilities,
          requirements: validatedData.requirements,
          niceToHave: validatedData.niceToHave,
          portfolioRequirement: validatedData.portfolioRequirement,
          benefits_remote: validatedData.benefits_remote,
          benefits_inperson: validatedData.benefits_inperson,
          workCulture: validatedData.workCulture,
          description: validatedData.description,
        },
      ])
      .select();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    return Response.json(
      { message: "Job created successfully", data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating job:", error);

    if (error instanceof Error && error.message.includes("validation")) {
      return Response.json(
        { error: "Invalid job data: " + error.message },
        { status: 400 }
      );
    }

    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create job",
      },
      { status: 500 }
    );
  }
}
