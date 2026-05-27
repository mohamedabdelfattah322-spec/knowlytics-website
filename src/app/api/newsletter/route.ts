export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const SUBSCRIBERS_TABLE = "Subscribers";

function buildWelcomeEmail(email: string, name?: string): string {
  const greeting = name ? `مرحباً ${name}،` : "مرحباً،";
  return `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>مرحباً بك في Knowlytics Hub!</title>
</head>
<body style="margin:0;padding:0;background:#0f172a;font-family:Segoe UI,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#0f172a;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1e293b 0%,#0f172a 50%,#1a1a2e 100%);padding:40px 40px 30px;border-bottom:3px solid #f59e0b;text-align:center;">
      <div style="font-size:30px;font-weight:900;color:#f59e0b;letter-spacing:1px;margin-bottom:4px;">Knowlytics Hub</div>
      <div style="font-size:13px;color:#94a3b8;margin-bottom:16px;">knowlyticshub.com</div>
      <div style="font-size:40px;margin-bottom:8px;">🎉</div>
      <h1 style="font-size:24px;color:#f1f5f9;font-weight:900;margin:0;">مرحباً بك في Knowlytics Hub!</h1>
    </div>

    <!-- Greeting -->
    <div style="padding:36px 40px 24px;text-align:center;">
      <p style="color:#e2e8f0;font-size:18px;font-weight:600;margin:0 0 8px;">${greeting}</p>
      <p style="color:#94a3b8;font-size:15px;margin:0 0 24px;line-height:1.7;">
        شكراً لاشتراكك في نشرتنا البريدية.<br>
        <strong style="color:#f59e0b;">سيصلك أحدث الكورسات والمقالات أولاً</strong> — مباشرةً إلى بريدك الإلكتروني.
      </p>
    </div>

    <!-- What you'll receive -->
    <div style="margin:0 40px 32px;background:#1e293b;border-radius:16px;padding:28px;border:1px solid #334155;">
      <h2 style="color:#f59e0b;font-size:15px;font-weight:700;margin:0 0 18px;text-align:center;">ماذا ستتلقى في نشرتنا؟</h2>
      <div style="space-y:12px;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;padding:12px;background:#0f172a;border-radius:10px;border:1px solid #334155;">
          <span style="font-size:22px;flex-shrink:0;">📚</span>
          <div>
            <div style="color:#e2e8f0;font-weight:600;font-size:14px;">كورسات جديدة</div>
            <div style="color:#64748b;font-size:12px;">أحدث الدورات في Excel وPower BI وSQL وPython</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;padding:12px;background:#0f172a;border-radius:10px;border:1px solid #334155;">
          <span style="font-size:22px;flex-shrink:0;">✍️</span>
          <div>
            <div style="color:#e2e8f0;font-weight:600;font-size:14px;">مقالات وتقنيات</div>
            <div style="color:#64748b;font-size:12px;">نصائح عملية وأدلة من خبراء تحليل البيانات</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#0f172a;border-radius:10px;border:1px solid #334155;">
          <span style="font-size:22px;flex-shrink:0;">🎁</span>
          <div>
            <div style="color:#e2e8f0;font-weight:600;font-size:14px;">عروض حصرية</div>
            <div style="color:#64748b;font-size:12px;">خصومات وعروض خاصة للمشتركين فقط</div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div style="text-align:center;padding:0 40px 36px;">
      <a href="https://www.knowlyticshub.com" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#f59e0b,#d97706);color:#0f172a;font-weight:900;font-size:15px;text-decoration:none;border-radius:12px;box-shadow:0 4px 20px #f59e0b44;">
        زيارة الموقع →
      </a>
    </div>

    <!-- Footer -->
    <div style="background:#1e293b;padding:24px 40px;text-align:center;border-top:1px solid #334155;">
      <p style="color:#64748b;font-size:12px;margin:0 0 6px;">Knowlytics Hub – تحليل البيانات بالعربي</p>
      <a href="https://www.knowlyticshub.com" style="color:#f59e0b;font-size:13px;font-weight:600;text-decoration:none;">www.knowlyticshub.com</a>
      <p style="color:#475569;font-size:11px;margin:12px 0 0;">
        تم إرسال هذا البريد إلى ${email}<br>
        Knowlytics Hub © 2025 – جميع الحقوق محفوظة
      </p>
    </div>

  </div>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, source } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const today = new Date().toISOString().split("T")[0];

    // 1. Save to Airtable Subscribers table
    try {
      const airtableRes = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(SUBSCRIBERS_TABLE)}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${AIRTABLE_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: {
              Email: email,
              Name: name || "",
              Date: today,
              Source: source || "website",
              Status: "Active",
            },
          }),
        }
      );

      if (!airtableRes.ok) {
        const err = await airtableRes.json();
        console.error("Airtable subscribers error:", JSON.stringify(err));
      }
    } catch (airtableErr) {
      console.error("Airtable request failed:", airtableErr);
    }

    // 2. Notify sales team
    await resend.emails.send({
      from: "Knowlytics Hub <noreply@knowlyticshub.com>",
      to: ["Sales@knowlyticshub.com"],
      subject: `📬 مشترك جديد في النشرة البريدية`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">📬 مشترك جديد في النشرة البريدية</h2>
          <p style="font-size: 16px; margin: 20px 0;">انضم مشترك جديد إلى قائمة النشرة البريدية لـ <strong>Knowlytics Hub</strong></p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background: #f8fafc;">
              <td style="padding: 12px; font-weight: bold; width: 35%; border: 1px solid #e5e7eb;">البريد الإلكتروني</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${name ? `<tr><td style="padding:12px;font-weight:bold;border:1px solid #e5e7eb;">الاسم</td><td style="padding:12px;border:1px solid #e5e7eb;">${name}</td></tr>` : ""}
            <tr>
              <td style="padding: 12px; font-weight: bold; border: 1px solid #e5e7eb;">تاريخ الاشتراك</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${new Date().toLocaleString("ar-EG")}</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 12px; font-weight: bold; border: 1px solid #e5e7eb;">المصدر</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${source || "website"}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; color: #6b7280; font-size: 12px; text-align: center;">
            تم إرسال هذا الإشعار من موقع <strong>Knowlytics Hub</strong>
          </p>
        </div>
      `,
    });

    // 3. Send welcome email to subscriber
    await resend.emails.send({
      from: "Knowlytics Hub <noreply@knowlyticshub.com>",
      to: [email],
      subject: "مرحباً بك في Knowlytics Hub! 🎉",
      html: buildWelcomeEmail(email, name),
    });

    return NextResponse.json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Subscription failed. Please try again." }, { status: 500 });
  }
}
