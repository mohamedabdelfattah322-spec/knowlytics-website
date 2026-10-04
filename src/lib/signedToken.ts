import { createHmac, timingSafeEqual } from "crypto";

const b64url = (buf: Buffer) => buf.toString("base64url");

function secret(): string {
  const s = process.env.TEMPLATE_ORDER_SECRET;
  if (!s || s.length < 32) throw new Error("TEMPLATE_ORDER_SECRET is missing or too short");
  return s;
}

export function signToken(payload: Record<string, unknown>): string {
  const body = b64url(Buffer.from(JSON.stringify(payload), "utf8"));
  const sig = b64url(createHmac("sha256", secret()).update(body).digest());
  return `${body}.${sig}`;
}

export function verifyToken<T extends { exp: number; t: string }>(token: string | null, type: T["t"]): T | null {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = createHmac("sha256", secret()).update(body).digest();
  const given = Buffer.from(sig, "base64url");
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
  try {
    const data = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as T;
    if (data.t !== type || typeof data.exp !== "number" || data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}
