import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 70;

export async function POST(req: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_YUVABE_PEOPLE_SUPABASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_YUVABE_PEOPLE_SUPABASE_KEY;

  if (!supabaseUrl || !apiKey) {
    return NextResponse.json({ error: "Service unavailable." }, { status: 503 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart form data." }, { status: 400 });
  }

  try {
    const upstream = await fetch(`${supabaseUrl}/functions/v1/apply-function`, {
      method: "POST",
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    });
    const data = await upstream.json();
    return NextResponse.json(data, { status: upstream.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[careers/apply]", message);
    return NextResponse.json({ error: "Failed to submit application." }, { status: 500 });
  }
}
