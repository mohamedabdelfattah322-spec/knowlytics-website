export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { escapeHtml, signToken, verifyToken } from "@/lib/signedToken";
import {
  ApproveToken, DOWNLOAD_DAYS, FROM, SITE_URL, customerDownloadHtml, findProduct, orderRows, page, resend,
} from "@/lib/templateOrders";

function load(token: string | null) {
  const o = verifyToken<ApproveToken>(token, "approve");
  if (!o) return null;
  const p = findProduct(o.slug, o.c);
  return p ? { o, p } : null;
}

// GET only shows the order; email scanners that prefetch links can't approve anything.
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const found = load(token);
  if (!found) return page("رابط غير صالح", `<h1>الرابط غير صالح أو منتهي</h1><p class="muted">ارجع لإيميل الطلب الأصلي، أو تواصل مع العميل مباشرة.</p>`, 400);
  const { o, p } = found;
  return page("تأكيد دفع طلب قالب", `<h1>مراجعة طلب قالب</h1>
    <p class="muted">اتأكد إن المبلغ وصل في ${escapeHtml(o.method)} برقم العملية ده قبل ما تضغط تأكيد.</p>
    ${orderRows(o, p.tpl.titleEn, `${p.color.nameAr} (${p.color.nameEn})`)}
    <form method="post"><input type="hidden" name="token" value="${escapeHtml(token as string)}">
    <p style="text-align:center;margin-top:18px"><button type="submit">تأكيد الدفع وإرسال لينك التحميل</button></p></form>`);
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const found = load(form.get("token") as string | null);
  if (!found) return page("رابط غير صالح", `<h1>الرابط غير صالح أو منتهي</h1>`, 400);
  const { o, p } = found;

  const dl = signToken({ t: "dl", exp: Date.now() + DOWNLOAD_DAYS * 864e5, slug: o.slug, c: o.c, email: o.email });
  const url = `${SITE_URL}/api/template-download?token=${dl}`;
  try {
    await resend().emails.send({
      from: FROM, to: [o.email],
      subject: `قالبك جاهز للتحميل — ${p.tpl.titleEn}`,
      html: customerDownloadHtml(o.name, p.tpl.titleEn, `${p.color.nameAr} (${p.color.nameEn})`, url),
    });
  } catch (e) {
    console.error("approve email failed", e);
    return page("حصل خطأ", `<h1>ماقدرناش نبعت الإيميل</h1><p class="muted">جرّب تاني بعد دقيقة. لو المشكلة استمرت ابعت للعميل اللينك ده يدوياً:</p><p style="direction:ltr;word-break:break-all;font-size:12px">${escapeHtml(url)}</p>`, 502);
  }
  return page("تم التأكيد", `<h1>✅ تم تأكيد الدفع</h1>
    <p>اتبعت لينك التحميل لـ <b>${escapeHtml(o.email)}</b>، وصالح لمدة ${DOWNLOAD_DAYS} أيام.</p>
    <p class="muted">لو العميل ماوصلهوش الإيميل (يشوف الـ Spam الأول)، ابعتله اللينك ده على واتساب:</p>
    <p style="direction:ltr;word-break:break-all;font-size:12px;background:#0f1a30;padding:10px;border-radius:8px">${escapeHtml(url)}</p>`);
}
