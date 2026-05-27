export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = "Assessment Results";

interface CategoryBreakdown {
  [key: string]: { correct: number; total: number };
}

interface QuestionDetail {
  questionEn?: string;
  questionAr?: string;
  question?: string;
  category?: string;
  difficulty?: string;
  userAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  userAnswerText?: string;
  correctAnswerText?: string;
}

function determineLevel(percentage: number, categoryBreakdown: CategoryBreakdown) {
  const advancedCats = ['powerQuery', 'lookup', 'pivot', 'dashboards', 'sql_advanced', 'dax', 'python_advanced', 'statistics'];
  const basicCats = ['formulas', 'charts', 'conditional', 'dataTools', 'basics'];

  const advancedEntries = Object.entries(categoryBreakdown).filter(([cat]) => advancedCats.includes(cat));
  const basicEntries = Object.entries(categoryBreakdown).filter(([cat]) => basicCats.includes(cat));

  const advancedScore = advancedEntries.length > 0
    ? advancedEntries.reduce((sum, [, v]) => sum + (v.total > 0 ? (v.correct / v.total) * 100 : 0), 0) / advancedEntries.length
    : 100;

  void basicEntries;

  if (percentage >= 85) {
    return { level: 'Advanced', levelAr: 'متقدم', color: '#10b981', recommendation: 'Excellent! You have strong skills in this area.' };
  }
  if (percentage >= 65 && advancedScore < 60) {
    return { level: 'Intermediate – Needs Advanced Training', levelAr: 'متوسط – يحتاج تدريب متقدم', color: '#f59e0b', recommendation: 'Good basics but needs to strengthen advanced topics.' };
  }
  if (percentage >= 65) {
    return { level: 'Intermediate', levelAr: 'متوسط', color: '#3b82f6', recommendation: 'Good level, keep practicing.' };
  }
  if (percentage >= 40) {
    return { level: 'Beginner – Needs Practice', levelAr: 'مبتدئ – يحتاج تدريب', color: '#f97316', recommendation: 'Focus on fundamentals first.' };
  }
  return { level: 'Needs Full Training', levelAr: 'يحتاج تدريب شامل', color: '#ef4444', recommendation: 'We recommend starting from scratch.' };
}

function buildCertificateEmail(data: {
  name: string;
  assessmentType: string;
  score: number;
  total: number;
  percentage: number;
  level: string;
  levelAr: string;
  levelColor: string;
  weakAreas: string[];
  categoryBreakdown: CategoryBreakdown;
  recommendation: string;
}): string {
  // Category table with correct/incorrect counts
  const categoryRows = Object.entries(data.categoryBreakdown)
    .map(([cat, val]) => {
      const pct = val.total > 0 ? Math.round((val.correct / val.total) * 100) : 0;
      const incorrect = val.total - val.correct;
      const barColor = pct >= 70 ? '#10b981' : pct >= 40 ? '#f59e0b' : '#ef4444';
      return (
        '<tr>' +
        '<td style="padding:8px 12px; color:#cbd5e1; font-size:13px; border-bottom:1px solid #1e293b;">' + cat + '</td>' +
        '<td style="padding:8px 12px; color:#10b981; font-size:13px; font-weight:bold; border-bottom:1px solid #1e293b; text-align:center;">✅ ' + val.correct + '</td>' +
        '<td style="padding:8px 12px; color:#ef4444; font-size:13px; font-weight:bold; border-bottom:1px solid #1e293b; text-align:center;">❌ ' + incorrect + '</td>' +
        '<td style="padding:8px 12px; color:' + barColor + '; font-size:13px; font-weight:bold; border-bottom:1px solid #1e293b; text-align:right;">' + pct + '%</td>' +
        '</tr>'
      );
    })
    .join('');

  const weakAreasHtml = data.weakAreas.length > 0
    ? data.weakAreas.map(a => '<span style="display:inline-block; background:#fef3c7; color:#92400e; padding:4px 10px; border-radius:20px; font-size:12px; margin:3px;">' + a + '</span>').join('')
    : '<span style="color:#10b981;">No weak areas detected</span>';

  const scoreCircleColor = data.percentage >= 85 ? '#10b981' : data.percentage >= 65 ? '#3b82f6' : data.percentage >= 40 ? '#f97316' : '#ef4444';

  return '<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>شهادة نتيجة اختبار - Knowlytics Hub</title></head>' +
    '<body style="margin:0;padding:0;background:#0f172a;font-family:Segoe UI,Arial,sans-serif;">' +
    '<div style="max-width:650px;margin:0 auto;background:#0f172a;">' +

    // Header
    '<div style="background:linear-gradient(135deg,#1e293b 0%,#0f172a 50%,#1a1a2e 100%);padding:40px 40px 30px;border-bottom:3px solid #f59e0b;text-align:center;">' +
    '<img src="https://www.knowlyticshub.com/logo.png" alt="Knowlytics Hub" style="height:60px;width:auto;margin-bottom:16px;display:block;margin-left:auto;margin-right:auto;" />' +
    '<div style="width:2px;height:30px;background:linear-gradient(to bottom,#f59e0b,transparent);margin:0 auto 20px;"></div>' +
    '<h1 style="font-size:22px;color:#f1f5f9;font-weight:900;margin:0 0 6px;">شهادة نتيجة اختبار</h1>' +
    '<h2 style="font-size:14px;color:#94a3b8;font-weight:400;margin:0;">Assessment Result Certificate</h2>' +
    '</div>' +

    // Student name + assessment type
    '<div style="background:#1e293b;padding:30px 40px;text-align:center;border-bottom:1px solid #334155;">' +
    '<p style="color:#94a3b8;font-size:13px;margin:0 0 8px;">هذا يُقر بأن / This certifies that</p>' +
    '<h2 style="font-size:28px;font-weight:900;color:#f59e0b;margin:0 0 8px;">' + data.name + '</h2>' +
    '<p style="color:#cbd5e1;font-size:14px;margin:0;">أتم اختبار / completed the assessment: <strong style="color:#e2e8f0;">' + data.assessmentType + '</strong></p>' +
    '</div>' +

    // Score circle + level
    '<div style="padding:36px 40px;text-align:center;background:#0f172a;">' +
    '<div style="display:inline-block;width:130px;height:130px;border-radius:50%;border:6px solid ' + scoreCircleColor + ';display:flex;align-items:center;justify-content:center;margin:0 auto 20px;box-shadow:0 0 30px ' + scoreCircleColor + '44;">' +
    '<div style="text-align:center;padding:20px;">' +
    '<div style="font-size:36px;font-weight:900;color:' + scoreCircleColor + ';">' + data.percentage + '%</div>' +
    '<div style="font-size:11px;color:#94a3b8;">' + data.score + '/' + data.total + '</div>' +
    '</div>' +
    '</div>' +
    '<div style="display:inline-block;background:' + data.levelColor + '22;border:1.5px solid ' + data.levelColor + ';border-radius:30px;padding:8px 24px;margin-bottom:8px;">' +
    '<span style="color:' + data.levelColor + ';font-weight:700;font-size:15px;">' + data.levelAr + '</span>' +
    '</div>' +
    '<p style="color:#94a3b8;font-size:13px;margin:4px 0 0;">' + data.level + '</p>' +
    '</div>' +

    // Category breakdown table with correct/incorrect counts
    (categoryRows ? (
      '<div style="padding:0 40px 30px;">' +
      '<h3 style="color:#f59e0b;font-size:14px;font-weight:700;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #1e293b;">الأداء حسب الفئة / Category Performance</h3>' +
      '<table style="width:100%;border-collapse:collapse;">' +
      '<thead><tr>' +
      '<th style="text-align:right;padding:8px 12px;color:#64748b;font-size:11px;font-weight:600;border-bottom:1px solid #1e293b;">الفئة</th>' +
      '<th style="padding:8px 12px;color:#10b981;font-size:11px;font-weight:600;border-bottom:1px solid #1e293b;text-align:center;">صحيح ✅</th>' +
      '<th style="padding:8px 12px;color:#ef4444;font-size:11px;font-weight:600;border-bottom:1px solid #1e293b;text-align:center;">خاطئ ❌</th>' +
      '<th style="text-align:right;padding:8px 12px;color:#64748b;font-size:11px;font-weight:600;border-bottom:1px solid #1e293b;">النسبة</th>' +
      '</tr></thead>' +
      '<tbody>' + categoryRows + '</tbody>' +
      '</table>' +
      '</div>'
    ) : '') +

    // Weak areas
    '<div style="padding:0 40px 30px;">' +
    '<h3 style="color:#f59e0b;font-size:14px;font-weight:700;margin-bottom:10px;">المجالات التي تحتاج تطوير / Areas to Improve</h3>' +
    '<div style="background:#1e293b;border-radius:12px;padding:16px;">' + weakAreasHtml + '</div>' +
    '</div>' +

    // Recommendation
    '<div style="margin:0 40px 30px;background:linear-gradient(135deg,#1e293b,#0f172a);border:1px solid #334155;border-radius:12px;padding:20px;">' +
    '<h3 style="color:#f59e0b;font-size:13px;font-weight:700;margin:0 0 8px;">التوصية / Recommendation</h3>' +
    '<p style="color:#cbd5e1;font-size:13px;margin:0;line-height:1.6;">' + data.recommendation + '</p>' +
    '</div>' +

    // Footer
    '<div style="background:#1e293b;padding:24px 40px;text-align:center;border-top:1px solid #334155;">' +
    '<p style="color:#64748b;font-size:12px;margin:0 0 6px;">للاستفسار والتسجيل في الدورات</p>' +
    '<a href="https://www.knowlyticshub.com" style="color:#f59e0b;font-size:13px;font-weight:600;text-decoration:none;">www.knowlyticshub.com</a>' +
    '<p style="color:#475569;font-size:11px;margin:12px 0 0;">Knowlytics Hub © 2025 – جميع الحقوق محفوظة</p>' +
    '</div>' +

    '</div></body></html>';
}

function buildSalesNotificationEmail(data: {
  name: string;
  email: string;
  phone: string;
  assessmentType: string;
  score: number;
  total: number;
  percentage: number;
  finalLevel: string;
  weakAreas: string[];
  categoryBreakdown: CategoryBreakdown;
  interests: string;
  questionDetails: QuestionDetail[];
}): string {
  const catRows = Object.entries(data.categoryBreakdown).map(([cat, val]) => {
    const pct = val.total > 0 ? Math.round((val.correct / val.total) * 100) : 0;
    const incorrect = val.total - val.correct;
    return `<tr style="background:#f8fafc;">
      <td style="padding:8px 12px;border:1px solid #e5e7eb;">${cat}</td>
      <td style="padding:8px 12px;border:1px solid #e5e7eb;color:#10b981;font-weight:bold;">✅ ${val.correct}</td>
      <td style="padding:8px 12px;border:1px solid #e5e7eb;color:#ef4444;font-weight:bold;">❌ ${incorrect}</td>
      <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:bold;">${pct}%</td>
    </tr>`;
  }).join('');

  const qDetailsHtml = data.questionDetails.length > 0
    ? '<h3 style="color:#f59e0b;margin-top:24px;">تفاصيل الأسئلة / Question Details</h3>' +
      '<table style="width:100%;border-collapse:collapse;font-size:12px;">' +
      '<thead><tr style="background:#1e293b;color:#fff;">' +
      '<th style="padding:6px 8px;border:1px solid #334155;text-align:right;">#</th>' +
      '<th style="padding:6px 8px;border:1px solid #334155;text-align:right;">السؤال</th>' +
      '<th style="padding:6px 8px;border:1px solid #334155;text-align:right;">الفئة</th>' +
      '<th style="padding:6px 8px;border:1px solid #334155;text-align:right;">إجابة المستخدم</th>' +
      '<th style="padding:6px 8px;border:1px solid #334155;text-align:right;">الإجابة الصحيحة</th>' +
      '<th style="padding:6px 8px;border:1px solid #334155;text-align:center;">النتيجة</th>' +
      '</tr></thead><tbody>' +
      data.questionDetails.map((q, i) => {
        const questionText = q.questionAr || q.questionEn || q.question || `Q${i + 1}`;
        return `<tr style="background:${q.isCorrect ? '#f0fdf4' : '#fef2f2'};">
          <td style="padding:5px 8px;border:1px solid #e5e7eb;">${i + 1}</td>
          <td style="padding:5px 8px;border:1px solid #e5e7eb;max-width:200px;">${questionText.substring(0, 80)}${questionText.length > 80 ? '...' : ''}</td>
          <td style="padding:5px 8px;border:1px solid #e5e7eb;">${q.category || '—'}</td>
          <td style="padding:5px 8px;border:1px solid #e5e7eb;">${q.userAnswerText || String(q.userAnswer)}</td>
          <td style="padding:5px 8px;border:1px solid #e5e7eb;">${q.correctAnswerText || String(q.correctAnswer)}</td>
          <td style="padding:5px 8px;border:1px solid #e5e7eb;text-align:center;">${q.isCorrect ? '✅' : '❌'}</td>
        </tr>`;
      }).join('') +
      '</tbody></table>'
    : '';

  return `
    <div dir="rtl" style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;border:1px solid #e5e7eb;border-radius:8px;background:#fff;">
      <h2 style="color:#f59e0b;border-bottom:2px solid #f59e0b;padding-bottom:10px;">🎯 نتيجة اختبار جديدة</h2>
      <table style="width:100%;border-collapse:collapse;margin-top:16px;">
        <tr style="background:#f8fafc;"><td style="padding:10px 12px;font-weight:bold;width:35%;border:1px solid #e5e7eb;">الاسم</td><td style="padding:10px 12px;border:1px solid #e5e7eb;">${data.name}</td></tr>
        <tr><td style="padding:10px 12px;font-weight:bold;border:1px solid #e5e7eb;">البريد الإلكتروني</td><td style="padding:10px 12px;border:1px solid #e5e7eb;">${data.email}</td></tr>
        <tr style="background:#f8fafc;"><td style="padding:10px 12px;font-weight:bold;border:1px solid #e5e7eb;">الهاتف</td><td style="padding:10px 12px;border:1px solid #e5e7eb;">${data.phone || "—"}</td></tr>
        <tr><td style="padding:10px 12px;font-weight:bold;border:1px solid #e5e7eb;">الاختبار</td><td style="padding:10px 12px;border:1px solid #e5e7eb;">${data.assessmentType || "—"}</td></tr>
        <tr style="background:#f8fafc;"><td style="padding:10px 12px;font-weight:bold;border:1px solid #e5e7eb;">النتيجة</td><td style="padding:10px 12px;border:1px solid #e5e7eb;">${data.score}/${data.total} (${data.percentage}%)</td></tr>
        <tr><td style="padding:10px 12px;font-weight:bold;border:1px solid #e5e7eb;">المستوى</td><td style="padding:10px 12px;border:1px solid #e5e7eb;">${data.finalLevel}</td></tr>
        <tr style="background:#f8fafc;"><td style="padding:10px 12px;font-weight:bold;border:1px solid #e5e7eb;">المجالات الضعيفة</td><td style="padding:10px 12px;border:1px solid #e5e7eb;">${data.weakAreas.join(", ") || "—"}</td></tr>
        <tr><td style="padding:10px 12px;font-weight:bold;border:1px solid #e5e7eb;">الاهتمامات</td><td style="padding:10px 12px;border:1px solid #e5e7eb;">${data.interests || "—"}</td></tr>
      </table>

      <h3 style="color:#f59e0b;margin-top:24px;">الأداء حسب الفئة</h3>
      <table style="width:100%;border-collapse:collapse;">
        <thead><tr style="background:#1e293b;color:#fff;">
          <th style="padding:8px 12px;border:1px solid #334155;text-align:right;">الفئة</th>
          <th style="padding:8px 12px;border:1px solid #334155;text-align:center;">صحيح ✅</th>
          <th style="padding:8px 12px;border:1px solid #334155;text-align:center;">خاطئ ❌</th>
          <th style="padding:8px 12px;border:1px solid #334155;text-align:right;">النسبة</th>
        </tr></thead>
        <tbody>${catRows}</tbody>
      </table>

      ${qDetailsHtml}

      <div style="margin-top:20px;text-align:center;">
        <a href="https://airtable.com/${AIRTABLE_BASE_ID}" style="display:inline-block;padding:12px 28px;background:#f59e0b;color:white;text-decoration:none;border-radius:8px;font-weight:bold;">📋 فتح Airtable</a>
      </div>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, assessmentType, score, total, percentage, level, weakAreas, categoryBreakdown, questionDetails } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const levelData = determineLevel(percentage, categoryBreakdown || {});
    const finalLevel = level || levelData.level;
    const weakAreasArr: string[] = weakAreas || [];
    const questionDetailsArr: QuestionDetail[] = questionDetails || [];

    // Derive interests from categoryBreakdown keys
    const interests = Object.keys(categoryBreakdown || {}).join(", ");

    // Save to Airtable
    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(TABLE_NAME)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Name: name,
            Email: email,
            Phone: phone || "",
            "Assessment Type": assessmentType || "",
            Score: Number(score) || 0,
            Level: `${finalLevel} (${Number(percentage) || 0}% – ${Number(score) || 0}/${Number(total) || 0})`,
            "Weak Areas": weakAreasArr.join(", "),
            Date: new Date().toISOString().split("T")[0],
            Status: "Completed",
            "Question Details": questionDetailsArr.length > 0 ? JSON.stringify(questionDetailsArr) : "",
            Interests: interests,
          },
        }),
      }
    );

    if (!airtableRes.ok) {
      const err = await airtableRes.json();
      console.error("Airtable error:", JSON.stringify(err));
      return NextResponse.json({ error: "Airtable error: " + (err?.error?.message || JSON.stringify(err)) }, { status: 500 });
    }

    // Send certificate + notification emails
    const resend = new Resend(process.env.RESEND_API_KEY);

    const certificateHtml = buildCertificateEmail({
      name,
      assessmentType: assessmentType || "Assessment",
      score: Number(score) || 0,
      total: Number(total) || 0,
      percentage: Number(percentage) || 0,
      level: finalLevel,
      levelAr: levelData.levelAr,
      levelColor: levelData.color,
      weakAreas: weakAreasArr,
      categoryBreakdown: categoryBreakdown || {},
      recommendation: levelData.recommendation,
    });

    // Certificate to student
    await resend.emails.send({
      from: "Knowlytics Hub <noreply@knowlyticshub.com>",
      to: [email],
      subject: `شهادة نتيجة اختبارك – ${assessmentType || "Assessment"} | Knowlytics Hub`,
      html: certificateHtml,
    });

    // Full breakdown notification to sales
    const salesHtml = buildSalesNotificationEmail({
      name,
      email,
      phone: phone || "",
      assessmentType: assessmentType || "",
      score: Number(score) || 0,
      total: Number(total) || 0,
      percentage: Number(percentage) || 0,
      finalLevel,
      weakAreas: weakAreasArr,
      categoryBreakdown: categoryBreakdown || {},
      interests,
      questionDetails: questionDetailsArr,
    });

    await resend.emails.send({
      from: "Knowlytics Hub <noreply@knowlyticshub.com>",
      to: ["Sales@knowlyticshub.com"],
      subject: `🎯 نتيجة اختبار جديدة – ${name} – ${assessmentType || "Assessment"}`,
      html: salesHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Assessment result submission error:", error);
    return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 });
  }
}
