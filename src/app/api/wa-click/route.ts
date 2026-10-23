export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { z } from "zod";
import { cairoNow } from "@/lib/leads";
import { saveWaClick } from "@/lib/waClicks";

// Receives the browser's beacon for a WhatsApp button click (one per click; analytics tools are fired separately).
const s = (max: number) => z.string().trim().max(max).optional().default("");
const Click = z.object({
  course_name: s(80), page_path: s(200), button_location: s(60),
  utm_source: s(100), utm_medium: s(100), utm_campaign: s(150), utm_content: s(150),
});

export async function POST(req: NextRequest) {
  const raw = await req.text();
  if (raw.length > 2000) return new Response(null, { status: 413 });
  let body: unknown;
  try { body = JSON.parse(raw); } catch { return new Response(null, { status: 400 }); }
  const p = Click.safeParse(body);
  if (!p.success) return new Response(null, { status: 400 });
  const c = p.data;
  try {
    await saveWaClick({
      date: cairoNow(), course: c.course_name, page: c.page_path.split("?")[0], location: c.button_location || "other",
      source: c.utm_source || "direct", medium: c.utm_medium, campaign: c.utm_campaign, ad: c.utm_content,
    });
  } catch (e) {
    console.error("wa click not saved", e);
  }
  return new Response(null, { status: 204 });
}
