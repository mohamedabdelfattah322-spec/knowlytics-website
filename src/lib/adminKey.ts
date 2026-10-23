import { createHash, timingSafeEqual } from "crypto";

// Shared password for the small admin pages (course payments, leads dashboard).
export function adminKeyOk(given: string): boolean {
  const expected = process.env.ADMIN_PAYMENT_KEY?.trim();
  if (!expected || !given) return false;
  const a = createHash("sha256").update(given.trim()).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}
