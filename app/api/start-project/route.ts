import { Resend } from "resend";

import type { StartProjectDraft } from "@/lib/start-project";
import { storeStartProjectSubmission } from "@/lib/start-project-submissions";

const resend = new Resend(process.env.RESEND_API_KEY);

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

async function sendAdminEmail(submission: StartProjectDraft) {
  const needsList =
    submission.needs.length > 0
      ? `<ul style="margin:8px 0;padding-left:20px;color:#374151;font-size:14px;">${submission.needs.map((n) => `<li>${n}</li>`).join("")}</ul>`
      : "<p style='color:#6b7280;font-size:14px;margin:0;'>None selected</p>";

  return resend.emails.send({
    from: "Yuvabe Studios <noreply@mail.yuvabe.com>",
    to: ["sales@yuvabe.com"],
    replyTo: submission.email,
    subject: `New Inquiry from ${submission.name}`,
    html: `
      <h2 style="color:#111827;">New Start-Project Inquiry</h2>
      <p><b>Name:</b> ${submission.name}</p>
      <p><b>Email:</b> ${submission.email}</p>
      <p><b>Phone / WhatsApp:</b> ${submission.phone || "—"}</p>
      <p><b>Support needed:</b></p>
      ${needsList}
      <p><b>Extra context:</b></p>
      <p style="color:#374151;font-size:14px;line-height:1.6;">${submission.notes || "—"}</p>
      ${submission.source ? `<p style="color:#9ca3af;font-size:12px;">Source: ${submission.source}</p>` : ""}
    `,
  });
}

async function sendUserReply(submission: StartProjectDraft) {
  return resend.emails.send({
    from: "Yuvabe Sales Team <sales@mail.yuvabe.com>",
    to: [submission.email],
    subject: "Thank you for contacting Yuvabe Studios 🙌",
    html: `
<div style="background:#f5f7fb;padding:40px 20px;font-family:Arial,Helvetica,sans-serif;">
  <table align="center" width="100%" style="max-width:600px;background:#ffffff;border-radius:10px;padding:40px;border:1px solid #e5e7eb;">

    <tr>
      <td style="text-align:center;padding-bottom:25px;">
        <img src="https://www.yuvabestudios.com/logo.svg" width="160" alt="Yuvabe Studios" />
      </td>
    </tr>

    <tr>
      <td style="text-align:center;padding-bottom:20px;">
        <h1 style="margin:0;color:#111827;font-size:24px;font-weight:600;">
          Thank you for reaching out!
        </h1>
        <p style="margin-top:8px;color:#6b7280;font-size:14px;">
          Digital &bull; Design &bull; AI &bull; Innovation
        </p>
      </td>
    </tr>

    <tr>
      <td style="padding-top:10px;">
        <p style="color:#374151;font-size:15px;line-height:1.6;margin:0;">
          Hi <strong>${submission.name}</strong>,
        </p>
        <p style="color:#374151;font-size:15px;line-height:1.6;margin-top:10px;">
          We've received your inquiry and our team will review it shortly.
          One of our specialists will get back to you as soon as possible.
        </p>
      </td>
    </tr>

    ${submission.needs.length > 0 ? `
    <tr>
      <td style="padding-top:25px;">
        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:18px;">
          <p style="margin:0;color:#6b7280;font-size:13px;">You asked about</p>
          <p style="margin-top:8px;color:#111827;font-size:14px;line-height:1.6;">
            ${submission.needs.join(" &bull; ")}
          </p>
        </div>
      </td>
    </tr>` : ""}

    <tr>
      <td style="padding-top:30px;text-align:center;">
        <a href="https://yuvabe.com/"
          style="display:inline-block;background:#5829C7;color:#ffffff;
          text-decoration:none;padding:12px 24px;border-radius:6px;
          font-size:14px;font-weight:600;">
          Visit Our Website
        </a>
      </td>
    </tr>

    <tr>
      <td style="padding-top:35px;border-top:1px solid #e5e7eb;text-align:center;">
        <p style="margin:0;color:#6b7280;font-size:13px;">Yuvabe Studios Sales Team</p>
        <p style="margin:5px 0 0;color:#9ca3af;font-size:12px;">Auroville, Tamil Nadu, India</p>
      </td>
    </tr>

  </table>
</div>
    `,
  });
}

export async function POST(request: Request) {
  let payload: Partial<StartProjectDraft>;

  try {
    payload = (await request.json()) as Partial<StartProjectDraft>;
  } catch {
    return Response.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const submission = normalizeSubmission(payload);

  if (!submission.name || !submission.email) {
    return Response.json({ error: "Name and email are required." }, { status: 400 });
  }

  try {
    const [storedSubmission, adminEmail] = await Promise.all([
      storeStartProjectSubmission(submission),
      sendAdminEmail(submission),
    ]);

    if (adminEmail.error) {
      console.error("Admin email error:", adminEmail.error);
    }

    // Fire-and-forget — a failed auto-reply should not block the success response.
    sendUserReply(submission).catch((err) => console.error("User reply error:", err));

    return Response.json({ ok: true, id: storedSubmission.id });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unable to store your inquiry right now." },
      { status: 500 },
    );
  }
}
