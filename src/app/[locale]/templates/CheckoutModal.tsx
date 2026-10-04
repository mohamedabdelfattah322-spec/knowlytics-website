"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, ExternalLink, Loader2, CheckCircle2, MessageCircle } from "lucide-react";

export type CheckoutItem = {
  slug: string;
  colorIndex: number;
  title: string;
  colorName: string;
  colorHex: string;
  price: number;
};

const METHODS = [
  { key: "InstaPay", label: "InstaPay", href: "https://ipn.eg/S/msara/instapay/9Z2HJW", refHint: "رقم العملية في InstaPay" },
  { key: "Vodafone Cash", label: "Vodafone Cash", number: "01020945719", refHint: "رقم الموبايل اللي حوّلت منه" },
  { key: "EasyKash", label: "EasyKash (كارت / طرق تانية)", href: "https://www.easykash.net/Knowlytics%20Hub%20/pay", refHint: "رقم العملية في EasyKash" },
] as const;

type Status = "idle" | "sending" | "done" | "error";

export default function CheckoutModal({ item, onClose }: { item: CheckoutItem | null; onClose: () => void }) {
  const [method, setMethod] = useState<(typeof METHODS)[number]["key"]>("InstaPay");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!item) return;
    setStatus("idle"); setError("");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onClose]);

  const m = METHODS.find((x) => x.key === method)!;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!item) return;
    const f = new FormData(e.currentTarget);
    setStatus("sending"); setError("");
    try {
      const res = await fetch("/api/template-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: item.slug, colorIndex: item.colorIndex, method,
          name: f.get("name"), email: f.get("email"), phone: f.get("phone"),
          reference: f.get("reference"), website: f.get("website") || undefined,
        }),
      });
      if (res.ok) { setStatus("done"); return; }
      const data = await res.json().catch(() => ({}));
      setError(data.error === "invalid_fields"
        ? "راجع البيانات: الاسم، وإيميل صحيح، ورقم موبايل، ورقم العملية."
        : "حصلت مشكلة في الإرسال. جرّب تاني أو كلمنا على واتساب.");
      setStatus("error");
    } catch {
      setError("مفيش اتصال بالإنترنت. جرّب تاني.");
      setStatus("error");
    }
  }

  async function copyNumber(n: string) {
    try { await navigator.clipboard.writeText(n); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {}
  }

  const input = "w-full rounded-xl bg-slate-800/80 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-400";

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="checkout-title" dir="rtl"
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}
            className="w-full sm:max-w-lg max-h-[92vh] overflow-y-auto bg-slate-900 border border-white/10 rounded-t-2xl sm:rounded-2xl p-5 sm:p-6 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-1 min-w-0">
                <h2 id="checkout-title" className="text-lg font-bold leading-snug">{item.title}</h2>
                <p className="text-sm text-slate-400 flex items-center gap-2 mt-1">
                  <span className="w-3 h-3 rounded-full inline-block" style={{ background: item.colorHex }} />
                  اللون: {item.colorName}
                </p>
              </div>
              <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center" aria-label="إغلاق">
                <X className="w-4 h-4" />
              </button>
            </div>

            {status === "done" ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-14 h-14 text-teal-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold mb-2">وصلنا طلبك</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-5">
                  هنراجع الدفع، وأول ما يتأكد هيوصلك إيميل فيه لينك التحميل (اتأكد من الـ Spam كمان).
                  لو عايز التأكيد أسرع، ابعت صورة التحويل على واتساب.
                </p>
                <a href="https://wa.me/201226929392" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600/20 border border-green-500/40 text-green-300 text-sm font-semibold">
                  <MessageCircle className="w-4 h-4" /> ابعت صورة التحويل
                </a>
              </div>
            ) : (
              <>
                <div className="rounded-xl bg-teal-500/10 border border-teal-500/30 p-3 mb-4 flex items-center justify-between">
                  <span className="text-sm text-teal-200">المبلغ المطلوب</span>
                  <span className="text-xl font-bold">{item.price.toLocaleString("en-US")} <span className="text-sm font-normal text-slate-300">جنيه</span></span>
                </div>

                <p className="text-sm font-semibold mb-2">1. ادفع بأي طريقة</p>
                <div className="grid gap-2 mb-3" role="radiogroup" aria-label="طريقة الدفع">
                  {METHODS.map((x) => (
                    <button key={x.key} type="button" role="radio" aria-checked={method === x.key} onClick={() => setMethod(x.key)}
                      className={`text-start rounded-xl border px-3 py-2.5 text-sm transition-colors ${method === x.key ? "border-teal-400 bg-teal-500/10" : "border-white/10 bg-slate-800/60 hover:border-white/25"}`}>
                      {x.label}
                    </button>
                  ))}
                </div>
                <div className="rounded-xl bg-slate-800/60 border border-white/10 p-3 mb-5 text-sm">
                  {"number" in m ? (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-300">حوّل على رقم</span>
                      <button type="button" onClick={() => copyNumber(m.number)} className="flex items-center gap-2 font-mono text-base select-all" dir="ltr">
                        {m.number} {copied ? <Check className="w-4 h-4 text-teal-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                      </button>
                    </div>
                  ) : (
                    <a href={m.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-teal-300 hover:text-teal-200">
                      <span>افتح صفحة الدفع وادفع {item.price} جنيه</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <p className="text-sm font-semibold mb-2">2. ابعتلنا بيانات الدفع</p>
                <form onSubmit={submit} className="grid gap-2.5">
                  <input name="name" required minLength={2} maxLength={80} placeholder="الاسم" className={input} autoComplete="name" />
                  <input name="email" type="email" required maxLength={120} placeholder="الإيميل (هيوصل عليه لينك التحميل)" className={input} autoComplete="email" dir="ltr" />
                  <input name="phone" type="tel" required minLength={8} maxLength={20} placeholder="رقم الموبايل / واتساب" className={input} autoComplete="tel" dir="ltr" />
                  <input name="reference" required minLength={3} maxLength={80} placeholder={m.refHint} className={input} />
                  <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                  {status === "error" && <p className="text-sm text-red-400" role="alert">{error}</p>}
                  <button type="submit" disabled={status === "sending"}
                    className="mt-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-60 text-slate-900 font-bold">
                    {status === "sending" && <Loader2 className="w-4 h-4 animate-spin" />}
                    دفعت — ابعت الطلب
                  </button>
                  <p className="text-xs text-slate-500 text-center">بعد مراجعة الدفع يوصلك لينك التحميل على الإيميل، وصالح 7 أيام.</p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
