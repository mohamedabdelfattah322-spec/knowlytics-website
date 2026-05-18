export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, message, serviceType } = body;

    if (!fullName || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Knowlytics Hub <onboarding@resend.dev>",
      to: ["Sales@knowlyticshub.com"],
      subject: `رسالة جديدة من ${fullName} - Knowlytics Hub`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">📩 رسالة جديدة من الموقع</h2>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background: #f8fafc;">
              <td style="padding: 12px; font-weight: bold; width: 35%; border: 1px solid #e5e7eb;">الاسم</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; border: 1px solid #e5e7eb;">البريد الإلكتروني</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${phone ? `<tr style="background: #f8fafc;">
              <td style="padding: 12px; font-weight: bold; border: 1px solid #e5e7eb;">الهاتف</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${phone}</td>
            </tr>` : ""}
            ${serviceType ? `<tr>
              <td style="padding: 12px; font-weight: bold; border: 1px solid #e5e7eb;">نوع الخدمة</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${serviceType}</td>
            </tr>` : ""}
            ${message ? `<tr style="background: #f8fafc;">
              <td style="padding: 12px; font-weight: bold; border: 1px solid #e5e7eb;">الرسالة</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${message}</td>
            </tr>` : ""}
          </table>

          <p style="margin-top: 20px; color: #6b7280; font-size: 12px; text-align: center;">
            تم إرسال هذه الرسالة من موقع <strong>Knowlytics Hub</strong>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 });
  }
}
