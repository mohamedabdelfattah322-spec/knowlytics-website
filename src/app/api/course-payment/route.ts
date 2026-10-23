export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import coursesData from "@/data/courses.json";
import { escapeHtml } from "@/lib/signedToken";
import { SITE_URL, page } from "@/lib/templateOrders";
import { purchaseEventId, sendPurchase } from "@/lib/metaCapi";
import { adminKeyOk } from "@/lib/adminKey";
import { recordPaymentOnLead } from "@/lib/leads";

// Admin-only page: after checking a course payment receipt on WhatsApp, record it here so
// Meta gets a real Purchase (the browser pixel only sees the "I paid" click) and the lead moves to "paid".
type Course = { slug: string; titleAr: string; price: number };
const COURSES = (coursesData as Course[]).filter((c) => c.price > 0);

function form(msg = "", values: Record<string, string> = {}) {
  const v = (k: string) => escapeHtml(values[k] || "");
  const options = COURSES.map((c) =>
    `<option value="${c.slug}" data-price="${c.price}"${values.slug === c.slug ? " selected" : ""}>${escapeHtml(c.titleAr)} — ${c.price} جنيه</option>`).join("");
  const input = "width:100%;box-sizing:border-box;padding:10px;border-radius:8px;border:1px solid #334155;background:#0f1a30;color:#e2e8f0;margin:4px 0 12px;font-size:15px";
  const type = values.type || "full";
  const opt = (v: string, label: string) => `<option value="${v}"${type === v ? " selected" : ""}>${label}</option>`;
  return `<h1>تسجيل دفع كورس</h1>
    <p class="muted">بعد ما تتأكد إن فلوس الحجز وصلت، سجّلها هنا عشان فيسبوك يعرف إن الإعلان جاب حجز حقيقي. <a href="/api/leads" style="color:#5eead4">لوحة المهتمين</a></p>
    ${msg}
    <form method="post">
      <label>كلمة سر الأدمن</label><input name="key" type="password" autocomplete="current-password" required style="${input}">
      <label>الكورس</label><select name="slug" id="slug" required style="${input}">${options}</select>
      <label>نوع الدفعة</label><select name="type" id="type" style="${input}">
        ${opt("full", "دفع كامل")}${opt("deposit", "دفع مقدم (50%)")}${opt("remainder", "باقي المبلغ (بعد المقدم)")}</select>
      <label>المبلغ اللي اتدفع فعلاً (جنيه)</label><input name="value" id="value" type="number" min="1" required value="${v("value") || COURSES[0]?.price || ""}" style="${input}">
      <label>موبايل المتدرب (الرقم اللي بعت منه على واتساب)</label><input name="phone" type="tel" required value="${v("phone")}" style="${input}">
      <label>اسم المتدرب <span class="muted">(اختياري)</span></label><input name="name" value="${v("name")}" style="${input}">
      <label>إيميل المتدرب <span class="muted">(اختياري — بيحسّن الربط بالإعلان)</span></label><input name="email" type="email" value="${v("email")}" style="${input}">
      <label>Test code <span class="muted">(للتجربة بس — سيبه فاضي في الدفع الحقيقي)</span></label><input name="test" value="${v("test")}" dir="ltr" style="${input}">
      <p style="text-align:center;margin-top:8px"><button type="submit">تسجيل الدفع</button></p>
    </form>
    <script>(function(){var s=document.getElementById('slug'),t=document.getElementById('type'),v=document.getElementById('value');
      function fill(){var p=+s.selectedOptions[0].dataset.price;v.value=t.value==='full'?p:t.value==='deposit'?Math.round(p/2):p-Math.round(p/2)}
      s.addEventListener('change',fill);t.addEventListener('change',fill)})()</script>`;
}

export async function GET() {
  return page("تسجيل دفع كورس", form());
}

export async function POST(req: NextRequest) {
  const f = await req.formData();
  const values = Object.fromEntries(["slug", "type", "value", "phone", "name", "email", "test"].map((k) => [k, String(f.get(k) || "").trim()]));
  const err = (m: string, status = 400) => page("تسجيل دفع كورس", form(`<p style="color:#fca5a5;font-weight:bold">${m}</p>`, values), status);

  if (!adminKeyOk(String(f.get("key") || ""))) return err("كلمة السر غلط.", 401);
  const course = COURSES.find((c) => c.slug === values.slug);
  const value = Number(values.value);
  if (!course) return err("اختار الكورس.");
  if (!Number.isFinite(value) || value <= 0) return err("اكتب المبلغ المدفوع.");
  if (values.phone.replace(/\D/g, "").length < 10) return err("اكتب رقم موبايل صحيح.");

  const type = (["full", "deposit", "remainder"] as const).find((t) => t === values.type) || "full";

  // One booking = one Purchase worth the course price, sent with the first payment (full or deposit).
  // The remainder is cash only: it updates the dashboard but never creates a second booking in Meta.
  let metaNote = "";
  if (type !== "remainder") {
    const res = await sendPurchase({
      eventId: purchaseEventId("course", course.slug, values.phone.replace(/\D/g, "")),
      value: course.price, contentType: "course", contentId: course.slug, contentName: course.titleAr,
      phone: values.phone, name: values.name || undefined, email: values.email || undefined,
      sourceUrl: `${SITE_URL}/ar/courses/${course.slug}`,
      testEventCode: values.test || undefined,
    });
    if (!res.ok) return err(`ماتبعتش لفيسبوك: ${escapeHtml(res.reason)}`, 502);
    metaNote = values.test
      ? `اتبعت لفيسبوك Purchase <b>تجريبي</b> (Test events بس) بقيمة الحجز ${course.price} جنيه.`
      : `اتبعت لفيسبوك Purchase واحد بقيمة الحجز <b>${course.price} جنيه</b>.`;
  } else {
    metaNote = "ده باقي مبلغ، فمااتبعتش حجز جديد لفيسبوك.";
  }

  let leadNote = "";
  try {
    const lead = await recordPaymentOnLead({ phone: values.phone, name: values.name, course: course.titleAr, amount: value, type });
    leadNote = `المحصّل من المتدرب ده لحد دلوقتي: <b>${lead.paid} جنيه</b> — الحالة: <b>${lead.status}</b>.`;
  } catch (e) {
    console.error("lead status not updated", e);
    leadNote = "بس ماتحدثتش لوحة المهتمين (افتحها واتأكد إن جدول Course Leads موجود).";
  }
  return page("تم التسجيل", `<h1>✅ اتسجّل الدفع (${value} جنيه)</h1>
    <p>${metaNote}</p><p>${leadNote}</p>
    <p style="text-align:center"><a href="/api/course-payment" style="color:#5eead4">تسجيل دفع تاني</a> · <a href="/api/leads" style="color:#5eead4">لوحة المهتمين</a></p>`);
}
