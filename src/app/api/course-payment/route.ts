export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { createHash, timingSafeEqual } from "crypto";
import coursesData from "@/data/courses.json";
import { escapeHtml } from "@/lib/signedToken";
import { SITE_URL, page } from "@/lib/templateOrders";
import { purchaseEventId, sendPurchase } from "@/lib/metaCapi";

// Admin-only page: after checking a course payment receipt on WhatsApp, record it here so
// Meta gets a real Purchase (the browser pixel only sees the "I paid" click).
type Course = { slug: string; titleAr: string; price: number };
const COURSES = (coursesData as Course[]).filter((c) => c.price > 0);

function keyOk(given: string): boolean {
  const expected = process.env.ADMIN_PAYMENT_KEY?.trim();
  if (!expected || !given) return false;
  const a = createHash("sha256").update(given.trim()).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

function form(msg = "", values: Record<string, string> = {}) {
  const v = (k: string) => escapeHtml(values[k] || "");
  const options = COURSES.map((c) =>
    `<option value="${c.slug}" data-price="${c.price}"${values.slug === c.slug ? " selected" : ""}>${escapeHtml(c.titleAr)} — ${c.price} جنيه</option>`).join("");
  const input = "width:100%;box-sizing:border-box;padding:10px;border-radius:8px;border:1px solid #334155;background:#0f1a30;color:#e2e8f0;margin:4px 0 12px;font-size:15px";
  return `<h1>تسجيل دفع كورس</h1>
    <p class="muted">بعد ما تتأكد إن فلوس الحجز وصلت، سجّلها هنا عشان فيسبوك يعرف إن الإعلان جاب حجز حقيقي.</p>
    ${msg}
    <form method="post">
      <label>كلمة سر الأدمن</label><input name="key" type="password" autocomplete="current-password" required style="${input}">
      <label>الكورس</label><select name="slug" id="slug" required style="${input}">${options}</select>
      <label>قيمة الحجز (جنيه) <span class="muted">— لو دفع 50% بس، سيبها سعر الكورس كامل، وماتسجّلش الباقي لما يدفعه</span></label><input name="value" id="value" type="number" min="1" required value="${v("value") || COURSES[0]?.price || ""}" style="${input}">
      <label>موبايل المتدرب (الرقم اللي بعت منه على واتساب)</label><input name="phone" type="tel" required value="${v("phone")}" style="${input}">
      <label>اسم المتدرب <span class="muted">(اختياري)</span></label><input name="name" value="${v("name")}" style="${input}">
      <label>إيميل المتدرب <span class="muted">(اختياري — بيحسّن الربط بالإعلان)</span></label><input name="email" type="email" value="${v("email")}" style="${input}">
      <label>Test code <span class="muted">(للتجربة بس — سيبه فاضي في الدفع الحقيقي)</span></label><input name="test" value="${v("test")}" dir="ltr" style="${input}">
      <p style="text-align:center;margin-top:8px"><button type="submit">تسجيل الدفع</button></p>
    </form>
    <script>document.getElementById('slug').addEventListener('change',function(e){var o=e.target.selectedOptions[0];document.getElementById('value').value=o.dataset.price})</script>`;
}

export async function GET() {
  return page("تسجيل دفع كورس", form());
}

export async function POST(req: NextRequest) {
  const f = await req.formData();
  const values = Object.fromEntries(["slug", "value", "phone", "name", "email", "test"].map((k) => [k, String(f.get(k) || "").trim()]));
  const err = (m: string, status = 400) => page("تسجيل دفع كورس", form(`<p style="color:#fca5a5;font-weight:bold">${m}</p>`, values), status);

  if (!keyOk(String(f.get("key") || ""))) return err("كلمة السر غلط.", 401);
  const course = COURSES.find((c) => c.slug === values.slug);
  const value = Number(values.value);
  if (!course) return err("اختار الكورس.");
  if (!Number.isFinite(value) || value <= 0) return err("اكتب المبلغ المدفوع.");
  if (values.phone.replace(/\D/g, "").length < 10) return err("اكتب رقم موبايل صحيح.");

  const day = new Date().toISOString().slice(0, 10);
  const res = await sendPurchase({
    eventId: purchaseEventId("course", course.slug, values.phone.replace(/\D/g, ""), day),
    value, contentType: "course", contentId: course.slug, contentName: course.titleAr,
    phone: values.phone, name: values.name || undefined, email: values.email || undefined,
    sourceUrl: `${SITE_URL}/ar/courses/${course.slug}`,
    testEventCode: values.test || undefined,
  });
  if (!res.ok) return err(`ماتبعتش لفيسبوك: ${escapeHtml(res.reason)}`, 502);

  if (values.test) return page("تجربة", `<h1>🧪 اتبعت حدث تجربة</h1>
    <p>افتح Events Manager ← Knowlytics Hub ← Test events، هتلاقي Purchase بـ ${value} جنيه. ده مش هيتحسب في أرقام الإعلانات.</p>
    <p style="text-align:center"><a href="/api/course-payment" style="color:#5eead4">رجوع</a></p>`);
  return page("تم التسجيل", `<h1>✅ اتسجّل الدفع</h1>
    <p>اتبعت لفيسبوك Purchase بمبلغ <b>${value} جنيه</b> لكورس <b>${escapeHtml(course.titleAr)}</b>.</p>
    <p class="muted">لو سجّلت نفس المتدرب لنفس الكورس مرتين في نفس اليوم، فيسبوك هيحسبها مرة واحدة.</p>
    <p style="text-align:center"><a href="/api/course-payment" style="color:#5eead4">تسجيل دفع تاني</a></p>`);
}
