import { Resend } from "resend";
import templates from "@/data/templates.json";
import templateFiles from "@/data/template-files.json";
import { escapeHtml } from "@/lib/signedToken";

export const SITE_URL = process.env.SITE_URL || "https://knowlyticshub.com";
export const ADMIN_EMAIL = process.env.ORDERS_ADMIN_EMAIL || "Sales@knowlyticshub.com";
export const FROM = "Knowlytics Hub <noreply@knowlyticshub.com>";
export const DOWNLOAD_DAYS = 7;

export const PAYMENT_METHODS = ["InstaPay", "Vodafone Cash", "EasyKash"] as const;

type FileEntry = { dir: string; files: string[] };
const FILES = templateFiles as Record<string, FileEntry>;

export type ApproveToken = {
  t: "approve"; exp: number; slug: string; c: number;
  name: string; email: string; phone: string; method: string; ref: string; price: number; at: number;
};
export type DownloadToken = { t: "dl"; exp: number; slug: string; c: number; email: string };

export function findProduct(slug: string, colorIndex: number) {
  const tpl = templates.find((t) => t.slug === slug);
  const entry = FILES[slug];
  if (!tpl || !entry) return null;
  const color = tpl.colors[colorIndex];
  const file = entry.files[colorIndex];
  if (!color || !file) return null;
  return { tpl, color, path: `${entry.dir}/${file}`, fileName: file };
}

export function hasDownload(slug: string) {
  return Boolean(FILES[slug]);
}

export function resend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is missing");
  return new Resend(key);
}

const wrap = (inner: string) =>
  `<div dir="rtl" style="font-family:Tahoma,Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;color:#1f2937;line-height:1.7">${inner}<p style="margin-top:24px;color:#6b7280;font-size:12px">Knowlytics Hub · knowlyticshub.com · واتساب 00201226929392</p></div>`;

export function orderRows(o: Omit<ApproveToken, "t" | "exp">, title: string, colorName: string) {
  const rows: [string, string][] = [
    ["القالب", title], ["اللون", colorName], ["المبلغ", `${o.price} جنيه`], ["طريقة الدفع", o.method],
    ["رقم العملية / رقم المحوِّل", o.ref], ["الاسم", o.name], ["الإيميل", o.email], ["الموبايل", o.phone],
  ];
  return `<table style="width:100%;border-collapse:collapse;margin:12px 0">${rows
    .map(([k, v], i) => `<tr style="background:${i % 2 ? "#fff" : "#f8fafc"}"><td style="padding:9px 12px;border:1px solid #e5e7eb;font-weight:bold;width:38%">${k}</td><td style="padding:9px 12px;border:1px solid #e5e7eb">${escapeHtml(v)}</td></tr>`)
    .join("")}</table>`;
}

export function adminEmailHtml(o: Omit<ApproveToken, "t" | "exp">, title: string, colorName: string, approveUrl: string) {
  return wrap(`<h2 style="margin:0 0 8px;color:#0f766e">🧾 طلب قالب جديد</h2>
    <p>راجع إن المبلغ وصل فعلاً، وبعدها اضغط تأكيد الدفع — العميل هيوصله لينك التحميل تلقائياً.</p>
    ${orderRows(o, title, colorName)}
    <p style="text-align:center;margin:20px 0"><a href="${approveUrl}" style="background:#0f766e;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:bold;display:inline-block">مراجعة الطلب وتأكيد الدفع</a></p>
    <p style="font-size:12px;color:#6b7280">اللينك صالح لمدة 30 يوم. لو الدفع ماوصلش، تجاهل الإيميل ده.</p>`);
}

export function customerReceivedHtml(name: string, title: string, colorName: string, price: number) {
  return wrap(`<h2 style="margin:0 0 8px">استلمنا طلبك يا ${escapeHtml(name)} 👋</h2>
    <p>طلب <b>${escapeHtml(title)}</b> — اللون <b>${escapeHtml(colorName)}</b> — بمبلغ <b>${price} جنيه</b>.</p>
    <p>هنراجع الدفع، وأول ما يتأكد هيوصلك إيميل تاني فيه لينك التحميل. عادةً خلال ساعات قليلة في مواعيد العمل.</p>
    <p>لو عايز التأكيد يبقى أسرع، ابعت صورة التحويل على واتساب 00201226929392.</p>`);
}

export function customerDownloadHtml(name: string, title: string, colorName: string, url: string) {
  return wrap(`<h2 style="margin:0 0 8px;color:#0f766e">✅ تم تأكيد الدفع — قالبك جاهز</h2>
    <p>أهلاً ${escapeHtml(name)}، شكراً لثقتك. ده لينك تحميل <b>${escapeHtml(title)}</b> باللون <b>${escapeHtml(colorName)}</b>:</p>
    <p style="text-align:center;margin:22px 0"><a href="${url}" style="background:#0f766e;color:#fff;text-decoration:none;padding:13px 32px;border-radius:8px;font-weight:bold;display:inline-block">تحميل الملفات</a></p>
    <p>الملف المضغوط فيه نسخة Excel ونسخة Power BI ودليل استخدام PDF بالعربي.</p>
    <p style="font-size:12px;color:#6b7280">اللينك صالح لمدة ${DOWNLOAD_DAYS} أيام. لو انتهى أو احتجت مساعدة، كلمنا على واتساب.</p>`);
}

export function page(title: string, inner: string, status = 200) {
  const html = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
<style>body{margin:0;background:#0f172a;color:#e2e8f0;font-family:Tahoma,Arial,sans-serif;padding:24px 16px;line-height:1.7}main{max-width:620px;margin:0 auto;background:#111c33;border:1px solid #1e293b;border-radius:16px;padding:24px}
table{width:100%;border-collapse:collapse;margin:12px 0}td{padding:9px 12px;border:1px solid #1e293b}tr:nth-child(odd) td{background:#0f1a30}td:first-child{font-weight:bold;width:38%;color:#94a3b8}
button{background:#14b8a6;color:#04201d;border:0;border-radius:10px;padding:12px 26px;font-weight:bold;font-size:15px;cursor:pointer}h1{font-size:20px;margin:0 0 10px}.muted{color:#94a3b8;font-size:13px}</style></head>
<body><main>${inner}</main></body></html>`;
  return new Response(html, { status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });
}
