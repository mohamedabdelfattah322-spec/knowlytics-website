// WhatsApp button clicks, stored in the same Airtable base as course leads. Interest signal only —
// never a lead, purchase or booking, and no personal data (no phone numbers, names or IPs).
const TABLE = "WhatsApp Clicks";
const API = "https://api.airtable.com/v0";

export type WaClick = { date: string; course: string; page: string; location: string; source: string; medium: string; campaign: string; ad: string };

const base = () => process.env.AIRTABLE_BASE_ID;
const headers = () => ({ Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`, "Content-Type": "application/json" });
const tableUrl = () => `${API}/${base()}/${encodeURIComponent(TABLE)}`;

export class WaTableMissing extends Error {}

async function airtable(url: string, init?: RequestInit) {
  const res = await fetch(url, { ...init, headers: headers(), cache: "no-store" });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const type = data?.error?.type || data?.error || "";
    if (res.status === 404 || ["TABLE_NOT_FOUND", "NOT_FOUND", "INVALID_PERMISSIONS_OR_MODEL_NOT_FOUND"].includes(type)) throw new WaTableMissing(String(type));
    throw new Error(`Airtable ${res.status}: ${data?.error?.message || type}`);
  }
  return data;
}

export async function saveWaClick(c: WaClick) {
  await airtable(tableUrl(), {
    method: "POST",
    body: JSON.stringify({ fields: { Date: c.date, Course: c.course, Page: c.page, Location: c.location, Source: c.source, Medium: c.medium, Campaign: c.campaign, Ad: c.ad } }),
  });
}

export async function listWaClicks(max = 5000): Promise<WaClick[]> {
  const out: WaClick[] = [];
  let offset = "";
  do {
    const q = new URLSearchParams({ pageSize: "100" });
    if (offset) q.set("offset", offset);
    const data = await airtable(`${tableUrl()}?${q}`);
    for (const r of data.records as { fields: Record<string, string> }[]) {
      const f = r.fields;
      out.push({ date: f.Date || "", course: f.Course || "", page: f.Page || "", location: f.Location || "", source: f.Source || "", medium: f.Medium || "", campaign: f.Campaign || "", ad: f.Ad || "" });
    }
    offset = data.offset || "";
  } while (offset && out.length < max);
  return out;
}

export async function createWaTable(): Promise<{ ok: true } | { ok: false; reason: string }> {
  const fields = ["Date", "Course", "Page", "Location", "Source", "Medium", "Campaign", "Ad"].map((name) => ({ name, type: "singleLineText" }));
  const res = await fetch(`${API}/meta/bases/${base()}/tables`, { method: "POST", headers: headers(), body: JSON.stringify({ name: TABLE, fields }) });
  if (res.ok) return { ok: true };
  const data = await res.json().catch(() => ({}));
  return { ok: false, reason: data?.error?.message || data?.error?.type || `HTTP ${res.status}` };
}
