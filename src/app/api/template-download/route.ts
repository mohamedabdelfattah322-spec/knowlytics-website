export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextRequest } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { createDecipheriv } from "crypto";
import { verifyToken } from "@/lib/signedToken";
import { DownloadToken, findProduct, page } from "@/lib/templateOrders";

// Product zips are committed encrypted (AES-256-GCM: iv(12) | tag(16) | ciphertext) under private-files/.
function decrypt(blob: Buffer): Buffer {
  const hex = process.env.TEMPLATE_FILES_KEY;
  if (!hex || hex.length !== 64) throw new Error("TEMPLATE_FILES_KEY is missing or invalid");
  const d = createDecipheriv("aes-256-gcm", Buffer.from(hex, "hex"), blob.subarray(0, 12));
  d.setAuthTag(blob.subarray(12, 28));
  return Buffer.concat([d.update(blob.subarray(28)), d.final()]);
}

export async function GET(req: NextRequest) {
  const t = verifyToken<DownloadToken>(req.nextUrl.searchParams.get("token"), "dl");
  if (!t) {
    return page("رابط التحميل غير صالح", `<h1>رابط التحميل غير صالح أو انتهت صلاحيته</h1>
      <p>كلمنا على واتساب <span dir="ltr">00201226929392</span> وابعت الإيميل اللي اشتريت بيه، وهنبعتلك لينك جديد.</p>`, 410);
  }
  const p = findProduct(t.slug, t.c);
  if (!p) return page("غير متاح", `<h1>الملف مش متاح حالياً</h1><p>كلمنا على واتساب وهنبعتهولك.</p>`, 404);

  let file: Buffer;
  try {
    file = decrypt(await readFile(join(process.cwd(), "private-files", `${p.path}.enc`)));
  } catch (e) {
    console.error("product decrypt failed", p.path, e);
    return page("غير متاح", `<h1>حصلت مشكلة في تجهيز الملف</h1><p>كلمنا على واتساب وهنبعتهولك فوراً.</p>`, 500);
  }
  return new Response(new Uint8Array(file), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Length": String(file.length),
      "Content-Disposition": `attachment; filename="${p.fileName}"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
