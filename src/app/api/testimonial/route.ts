export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = "Reviews";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, title, rating, content, courseName, linkedin } = body;

    if (!name || !content || !rating) {
      return NextResponse.json({ error: "Name, rating, and review are required" }, { status: 400 });
    }

    // Save to Airtable
    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            name,
            title: title || "Knowlytics Hub Student",
            rating: Number(rating),
            Feedback: content,
            "Course Name": courseName || "",
            Linkedin: linkedin || "",
            Date: new Date().toISOString().split("T")[0],
            status: "Pending",
          },
        }),
      }
    );

    if (!airtableRes.ok) {
      const err = await airtableRes.json();
      console.error("Airtable error:", err);
      return NextResponse.json({ error: "Failed to save review" }, { status: 500 });
    }

    // Send email notification
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Knowlytics Hub <onboarding@resend.dev>",
      to: ["Sales@knowlyticshub.com"],
      subject: `⭐ رأي جديد من ${name} - بانتظار الموافقة`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #f59e0b; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">⭐ رأي جديد بانتظار موافقتك</h2>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background: #f8fafc;">
              <td style="padding: 12px; font-weight: bold; width: 35%; border: 1px solid #e5e7eb;">الاسم</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; border: 1px solid #e5e7eb;">المسمى الوظيفي</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${title || "—"}</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 12px; font-weight: bold; border: 1px solid #e5e7eb;">التقييم</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${"⭐".repeat(Number(rating))} (${rating}/5)</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; border: 1px solid #e5e7eb;">الدورة</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${courseName || "—"}</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 12px; font-weight: bold; border: 1px solid #e5e7eb; vertical-align: top;">الرأي</td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${content}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; text-align: center;">
            <p style="color: #374151; margin-bottom: 12px;">للموافقة أو الرفض، افتح Airtable:</p>
            <a href="https://airtable.com/${AIRTABLE_BASE_ID}"
               style="display: inline-block; padding: 12px 28px; background: #f59e0b; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
              📋 فتح Airtable للمراجعة
            </a>
          </div>

          <p style="margin-top: 20px; color: #6b7280; font-size: 12px; text-align: center;">
            غيّر الـ status لـ <strong>Published</strong> للنشر أو <strong>Rejected</strong> للرفض
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Testimonial submission error:", error);
    return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 });
  }
}
