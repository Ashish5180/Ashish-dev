import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Types ───────────────────────────────────────────────────────────────────

interface BookingRequest {
  name: string;
  email: string;
  date: string;   // YYYY-MM-DD
  time: string;   // HH:MM (24hr)
  message?: string;
}

// ─── Email Template ──────────────────────────────────────────────────────────

function buildHostEmailHtml({
  name,
  email,
  date,
  time,
  message,
}: BookingRequest): string {
  const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const [h, m] = time.split(":");
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  const formattedTime = `${displayHour}:${m} ${ampm}`;

  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%); padding: 28px 32px;">
        <h1 style="color: #ffffff; font-size: 20px; font-weight: 700; margin: 0;">📅 New Booking Request</h1>
        <p style="color: rgba(255,255,255,0.85); font-size: 13px; margin: 6px 0 0;">Someone wants to connect with you</p>
      </div>
      <div style="padding: 28px 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px; font-weight: 600; width: 90px;">Name</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 15px; font-weight: 700;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px; font-weight: 600;">Email</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">
              <a href="mailto:${email}" style="color: #DC2626; text-decoration: none; font-weight: 600;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px; font-weight: 600;">Date</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px; font-weight: 600;">${formattedDate}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px; font-weight: 600;">Time</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px; font-weight: 600;">${formattedTime}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #6b7280; font-size: 13px; font-weight: 600;">Message</td>
            <td style="padding: 12px 0; color: #111827; font-size: 14px;">${message || "—"}</td>
          </tr>
        </table>

        <div style="margin-top: 24px; text-align: center;">
          <a href="mailto:${email}?subject=Re: Your booking on ${formattedDate} at ${formattedTime}&body=Hi ${name},%0A%0AThanks for booking a call! Here's your Google Meet link:%0A%0A[Paste Meet link here]%0A%0ASee you on ${formattedDate} at ${formattedTime}!%0A%0ABest,%0AAshish"
             style="display: inline-block; background: #DC2626; color: #ffffff; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 14px;">
            Reply to ${name} →
          </a>
        </div>
      </div>
      <div style="padding: 16px 32px; background: #fafafa; border-top: 1px solid #f3f4f6;">
        <p style="color: #9ca3af; font-size: 11px; margin: 0; text-align: center;">Create a Google Meet link and reply with it · Portfolio Booking</p>
      </div>
    </div>
  `;
}

// ─── POST Handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as Partial<BookingRequest>;

    // Validate required fields
    if (!body.name || !body.email || !body.date || !body.time) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, date, time" },
        { status: 400 }
      );
    }

    const { name, email, date, time, message } = body as BookingRequest;

    // Send booking notification to host
    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.CONTACT_EMAIL as string,
      subject: `📅 New Booking: ${name} — ${date}`,
      html: buildHostEmailHtml({ name, email, date, time, message }),
    });

    console.log("📧 Email result:", JSON.stringify(result));

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Booking API error:", errMessage);
    return NextResponse.json(
      { error: "Failed to process booking. Please try again." },
      { status: 500 }
    );
  }
}
