export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, phone, serviceType, description, timeline } = body;

    if (!name || !email || !serviceType) {
      return NextResponse.json({ error: "Name, email, and service type are required" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Knowlytics Hub <onboarding@resend.dev>",
      to: ["Sales@knowlyticshub.com"],
      subject: `🛠️ طلب خدمة جديد: ${serviceType} — ${name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #7c3aed; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">🛠️ طلب خدمة جديد من الموقع</h2>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background: #f8fafc;">
              <td style="padding: 12px; font-weight: bold; width: 35%; border: 1px solid #e5e7eb;">الاسم</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; border: 1px solid #e5e7eb;">الشركة</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${company || "—"}</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 12px; font-weight: bold; border: 1px solid #e5e7eb;">البريد الإلكتروني</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; border: 1px solid #e5e7eb;">الهاتف</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${phone || "—"}</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 12px; font-weight: bold; border: 1px solid #e5e7eb;">نوع الخدمة</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb; color: #7c3aed; font-weight: bold;">${serviceType}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; border: 1px solid #e5e7eb;">الجدول الزمني</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${timeline || "—"}</td>
            </tr>
            ${description ? `<tr style="background: #f8fafc;">
              <td style="padding: 12px; font-weight: bold; border: 1px solid #e5e7eb; vertical-align: top;">تفاصيل المشروع</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb; white-space: pre-line;">${description}</td>
            </tr>` : ""}
          </table>

          <div style="margin-top: 20px; padding: 15px; background: #ede9fe; border-radius: 8px; text-align: center;">
            <a href="mailto:${email}" style="display: inline-block; padding: 10px 24px; background: #7c3aed; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
              الرد على ${name}
            </a>
          </div>

          <p style="margin-top: 20px; color: #6b7280; font-size: 12px; text-align: center;">
            تم إرسال هذا الطلب من موقع <strong>Knowlytics Hub</strong>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Service request error:", error);
    return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 });
  }
}
