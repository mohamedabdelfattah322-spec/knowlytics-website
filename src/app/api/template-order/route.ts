export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { signToken } from "@/lib/signedToken";
import { ADMIN_EMAIL, FROM, PAYMENT_METHODS, SITE_URL, adminEmailHtml, customerReceivedHtml, findProduct, resend } from "@/lib/templateOrders";

const Order = z.object({
  slug: z.string().min(1).max(80),
  colorIndex: z.number().int().min(0).max(9),
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().min(8).max(20),
  method: z.enum(PAYMENT_METHODS),
  reference: z.string().trim().min(3).max(80),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "invalid_json" }, { status: 400 }); }
  if (body && typeof body === "object" && (body as { website?: unknown }).website) return NextResponse.json({ ok: true });
  const parsed = Order.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid_fields", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  const o = parsed.data;

  const product = findProduct(o.slug, o.colorIndex);
  if (!product) return NextResponse.json({ error: "unknown_product" }, { status: 404 });
  const { tpl, color } = product;

  const order = { slug: o.slug, c: o.colorIndex, name: o.name, email: o.email, phone: o.phone, method: o.method, ref: o.reference, price: tpl.price, at: Date.now() };
  const approveToken = signToken({ t: "approve", exp: Date.now() + 30 * 864e5, ...order });
  const approveUrl = `${SITE_URL}/api/template-order/approve?token=${approveToken}`;
  const colorName = `${color.nameAr} (${color.nameEn})`;

  try {
    const mail = resend();
    await mail.emails.send({
      from: FROM, to: [ADMIN_EMAIL], replyTo: o.email,
      subject: `طلب قالب جديد: ${tpl.titleEn} — ${o.name} — ${tpl.price} جنيه`,
      html: adminEmailHtml(order, tpl.titleEn, colorName, approveUrl),
    });
    await mail.emails.send({
      from: FROM, to: [o.email],
      subject: `استلمنا طلبك — ${tpl.titleEn}`,
      html: customerReceivedHtml(o.name, tpl.titleEn, colorName, tpl.price),
    });
  } catch (e) {
    console.error("template-order email failed", e);
    return NextResponse.json({ error: "email_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
