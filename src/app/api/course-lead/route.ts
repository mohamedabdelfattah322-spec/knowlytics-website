export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import coursesData from "@/data/courses.json";
import { escapeHtml } from "@/lib/signedToken";
import { ADMIN_EMAIL, FROM, SITE_URL, resend } from "@/lib/templateOrders";
import { cairoNow, createLead, phoneKey } from "@/lib/leads";

const COURSES = coursesData as { slug: string; titleAr: string }[];
const short = z.string().trim().max(120).optional().default("");

const LeadInput = z.object({
  slug: z.string().min(1).max(80),
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(8).max(20).refine((p) => p.replace(/\D/g, "").length >= 10),
  level: z.string().trim().max(60),
  consent: z.literal(true),
  source: short, medium: short, campaign: short, content: short, landing: short,
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "invalid_json" }, { status: 400 }); }
  if (body && typeof body === "object" && (body as { website?: unknown }).website) return NextResponse.json({ ok: true });
  const parsed = LeadInput.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  const l = parsed.data;
  const course = COURSES.find((c) => c.slug === l.slug);
  if (!course) return NextResponse.json({ error: "unknown_course" }, { status: 404 });

  const source = l.source || "مباشر";
  let saved = true;
  try {
    await createLead({
      Name: l.name, Phone: l.phone, PhoneKey: phoneKey(l.phone), Course: course.titleAr, Level: l.level, Status: "مهتم",
      Source: source, Medium: l.medium, Campaign: l.campaign, Ad: l.content, Landing: l.landing, Date: cairoNow(),
    });
  } catch (e) {
    saved = false;
    console.error("course lead not saved to Airtable", e);
  }

  // The email is the safety net: even if Airtable is down the lead isn't lost.
  const wa = `https://wa.me/${phoneKey(l.phone)}`;
  const rows: [string, string][] = [
    ["الاسم", l.name], ["الموبايل", l.phone], ["الكورس", course.titleAr], ["المستوى", l.level || "—"],
    ["المصدر", [source, l.medium, l.campaign, l.content].filter(Boolean).join(" / ")],
  ];
  try {
    await resend().emails.send({
      from: FROM, to: [ADMIN_EMAIL],
      subject: `مهتم جديد بكورس: ${course.titleAr} — ${l.name}`,
      html: `<div dir="rtl" style="font-family:Tahoma,Arial,sans-serif;max-width:560px;margin:auto">
        <h2 style="color:#0f766e">🙋 مهتم جديد بالكورس</h2>
        <table style="width:100%;border-collapse:collapse">${rows.map(([k, v]) =>
          `<tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;width:30%">${k}</td><td style="padding:8px;border:1px solid #e5e7eb">${escapeHtml(v)}</td></tr>`).join("")}</table>
        <p style="text-align:center;margin:18px 0"><a href="${wa}" style="background:#16a34a;color:#fff;padding:10px 22px;border-radius:8px;text-decoration:none;font-weight:bold">كلّمه على واتساب</a></p>
        <p style="text-align:center"><a href="${SITE_URL}/api/leads">لوحة متابعة المهتمين</a></p>
        ${saved ? "" : `<p style="color:#b91c1c">⚠️ ماتحفظش في Airtable — اتأكد إن جدول Course Leads موجود.</p>`}
      </div>`,
    });
  } catch (e) {
    console.error("course lead email failed", e);
    if (!saved) return NextResponse.json({ error: "not_saved" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
