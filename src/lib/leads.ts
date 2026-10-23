// Course leads live in the Airtable base the site already uses (testimonials, newsletter, assessments).
const TABLE = "Course Leads";
const API = "https://api.airtable.com/v0";

export const LEAD_STATUSES = ["مهتم", "تم التواصل", "دفع مقدم", "دفع كامل", "مش مهتم"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type Lead = {
  id: string;
  name: string; phone: string; course: string; level: string; status: LeadStatus | string;
  source: string; medium: string; campaign: string; ad: string; landing: string;
  paid: number; date: string; notes: string;
};

export type Attribution = { source?: string; medium?: string; campaign?: string; content?: string; landing?: string };

const base = () => process.env.AIRTABLE_BASE_ID;
const headers = () => ({ Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`, "Content-Type": "application/json" });
const tableUrl = () => `${API}/${base()}/${encodeURIComponent(TABLE)}`;

// Digits with Egypt's country code, so "010…", "+2010…" and "002010…" match the same person.
export function phoneKey(phone: string): string {
  let d = phone.replace(/\D/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  if (d.startsWith("0")) d = "20" + d.slice(1);
  return d;
}

export function cairoNow(): string {
  return new Date().toLocaleString("sv-SE", { timeZone: "Africa/Cairo" }).slice(0, 16);
}

type Fields = Record<string, string | number>;

function toLead(r: { id: string; fields: Record<string, unknown> }): Lead {
  const f = r.fields;
  const s = (k: string) => (typeof f[k] === "string" ? (f[k] as string) : "");
  return {
    id: r.id, name: s("Name"), phone: s("Phone"), course: s("Course"), level: s("Level"), status: s("Status") || "مهتم",
    source: s("Source"), medium: s("Medium"), campaign: s("Campaign"), ad: s("Ad"), landing: s("Landing"),
    paid: typeof f.Paid === "number" ? f.Paid : 0, date: s("Date"), notes: s("Notes"),
  };
}

export class LeadsTableMissing extends Error {}

async function airtable(url: string, init?: RequestInit) {
  const res = await fetch(url, { ...init, headers: headers(), cache: "no-store" });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const type = data?.error?.type || data?.error || "";
    if (res.status === 404 || type === "TABLE_NOT_FOUND" || type === "NOT_FOUND") throw new LeadsTableMissing(String(type));
    throw new Error(`Airtable ${res.status}: ${data?.error?.message || type}`);
  }
  return data;
}

export async function createLead(fields: Fields): Promise<string> {
  const data = await airtable(tableUrl(), { method: "POST", body: JSON.stringify({ fields, typecast: true }) });
  return data.id as string;
}

export async function listLeads(max = 300): Promise<Lead[]> {
  const out: Lead[] = [];
  let offset = "";
  do {
    const q = new URLSearchParams({ pageSize: "100", "sort[0][field]": "Date", "sort[0][direction]": "desc" });
    if (offset) q.set("offset", offset);
    const data = await airtable(`${tableUrl()}?${q}`);
    out.push(...(data.records as { id: string; fields: Record<string, unknown> }[]).map(toLead));
    offset = data.offset || "";
  } while (offset && out.length < max);
  return out;
}

export async function updateLead(id: string, fields: Fields) {
  await airtable(`${tableUrl()}/${id}`, { method: "PATCH", body: JSON.stringify({ fields, typecast: true }) });
}

export async function findLeadByPhone(phone: string): Promise<Lead | null> {
  const q = new URLSearchParams({ filterByFormula: `{PhoneKey}='${phoneKey(phone)}'`, maxRecords: "1" });
  const data = await airtable(`${tableUrl()}?${q}`);
  const r = data.records?.[0];
  return r ? toLead(r) : null;
}

// Creates the table the first time; needs the token to have schema.bases:write.
export async function createLeadsTable(): Promise<{ ok: true } | { ok: false; reason: string }> {
  const text = (name: string) => ({ name, type: "singleLineText" });
  const res = await fetch(`${API}/meta/bases/${base()}/tables`, {
    method: "POST", headers: headers(),
    body: JSON.stringify({
      name: TABLE,
      fields: [
        text("Name"), { name: "Phone", type: "phoneNumber" }, text("PhoneKey"), text("Course"), text("Level"),
        { name: "Status", type: "singleSelect", options: { choices: LEAD_STATUSES.map((name) => ({ name })) } },
        text("Source"), text("Medium"), text("Campaign"), text("Ad"), text("Landing"),
        { name: "Paid", type: "number", options: { precision: 0 } }, text("Date"), { name: "Notes", type: "multilineText" },
      ],
    }),
  });
  if (res.ok) return { ok: true };
  const data = await res.json().catch(() => ({}));
  return { ok: false, reason: data?.error?.message || data?.error?.type || `HTTP ${res.status}` };
}

// After a confirmed payment: move the matching lead forward, or add the payer if they never filled the form.
export async function recordPaymentOnLead(p: { phone: string; name?: string; course: string; value: number; deposit: boolean }) {
  const status: LeadStatus = p.deposit ? "دفع مقدم" : "دفع كامل";
  const existing = await findLeadByPhone(p.phone);
  if (existing) {
    await updateLead(existing.id, { Status: status, Paid: p.value, Course: existing.course || p.course });
    return;
  }
  await createLead({
    Name: p.name || "—", Phone: p.phone, PhoneKey: phoneKey(p.phone), Course: p.course, Status: status,
    Paid: p.value, Source: "مباشر / واتساب", Date: cairoNow(),
  });
}
