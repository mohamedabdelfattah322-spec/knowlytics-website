export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Knowlytics Hub <onboarding@resend.dev>",
      to: ["Sales@knowlyticshub.com"],
      subject: `📬 مشترك جديد في النشرة البريدية`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">📬 مشترك جديد في النشرة البريدية</h2>

          <p style="font-size: 16px; margin: 20px 0;">
            انضم مشترك جديد إلى قائمة النشرة البريدية لـ <strong>Knowlytics Hub</strong>
          </p>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background: #f8fafc;">
              <td style="padding: 12px; font-weight: bold; width: 35%; border: 1px solid #e5e7eb;">البريد الإلكتروني</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; border: 1px solid #e5e7eb;">تاريخ الاشتراك</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${new Date().toLocaleString("ar-EG")}</td>
            </tr>
          </table>

          <p style="margin-top: 20px; color: #6b7280; font-size: 12px; text-align: center;">
            تم إرسال هذا الإشعار من موقع <strong>Knowlytics Hub</strong>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Subscription failed. Please try again." }, { status: 500 });
  }
}
