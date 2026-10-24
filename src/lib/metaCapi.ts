import { createHash } from "crypto";

// Server-side Meta Conversions API: sends confirmed purchases that the browser pixel can't see
// (payments are verified manually, after the visitor has left the site).
const PIXEL_ID = "1687611866220606";
const GRAPH = "https://graph.facebook.com/v21.0";

const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");

// Meta expects lowercase emails and phones as digits with country code (Egypt: 20).
function normPhone(phone: string): string {
  let d = phone.replace(/\D/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  if (d.startsWith("0")) d = "20" + d.slice(1);
  return d;
}

export type PurchaseInput = {
  eventId: string;
  value: number;
  contentType: "course" | "template";
  contentId: string;
  contentName: string;
  email?: string;
  phone?: string;
  name?: string;
  sourceUrl: string;
  // From Events Manager > Test events: the event shows there only, not in ad reporting.
  testEventCode?: string;
};

// `meta` is Meta's own reply (events_received, fbtrace_id, messages) so a test run can show what Meta accepted.
export type CapiResult = { ok: true; meta: string } | { ok: false; reason: string };

export async function sendPurchase(p: PurchaseInput): Promise<CapiResult> {
  const token = process.env.META_CAPI_TOKEN;
  if (!token) return { ok: false, reason: "META_CAPI_TOKEN is not set" };

  const user_data: Record<string, string[]> = {};
  if (p.email) user_data.em = [sha256(p.email.trim().toLowerCase())];
  if (p.phone) user_data.ph = [sha256(normPhone(p.phone))];
  if (p.name) {
    const [fn, ...rest] = p.name.trim().toLowerCase().split(/\s+/);
    if (fn) user_data.fn = [sha256(fn)];
    if (rest.length) user_data.ln = [sha256(rest.join(" "))];
  }
  user_data.country = [sha256("eg")];

  const body = {
    data: [{
      event_name: "Purchase",
      event_time: Math.floor(Date.now() / 1000),
      event_id: p.eventId,
      action_source: "system_generated",
      event_source_url: p.sourceUrl,
      user_data,
      custom_data: {
        currency: "EGP", value: p.value,
        content_type: p.contentType, content_ids: [p.contentId], content_name: p.contentName,
      },
    }],
    ...(p.testEventCode ? { test_event_code: p.testEventCode } : {}),
  };

  try {
    const res = await fetch(`${GRAPH}/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
    });
    if (res.ok) return { ok: true, meta: JSON.stringify(await res.json().catch(() => ({}))) };
    const err = await res.json().catch(() => ({}));
    return { ok: false, reason: err?.error?.message || `HTTP ${res.status}` };
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : "network error" };
  }
}

// Same order approved twice -> same id, so Meta keeps one Purchase.
export const purchaseEventId = (...parts: string[]) => sha256(parts.join("|")).slice(0, 32);
