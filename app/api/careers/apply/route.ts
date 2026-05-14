import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 70;

export async function POST(req: Request) {
  const baseUrl = process.env.YUVABE_PEOPLE_API_URL;
  if (!baseUrl) {
    return NextResponse.json(
      { error: "Service unavailable." },
      { status: 503 }
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json(
      { error: "Expected multipart form data." },
      { status: 400 }
    );
  }

  try {
    const upstream = await fetch(`${baseUrl}/api/applications`, {
      method: "POST",
      body: formData,
    });
    const data = await upstream.json();
    return NextResponse.json(data, { status: upstream.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[careers/apply]", message);
    return NextResponse.json(
      { error: "Failed to submit application." },
      { status: 500 }
    );
  }
}
