"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { getAttribution, trackPixel } from "@/components/layout/MetaPixel";
import { WA_COURSE, waCourseUrl } from "@/lib/whatsapp";

const LEVELS = [
  { ar: "مبتدئ", en: "Beginner" },
  { ar: "بعرف أستخدم Excel", en: "I can use Excel" },
  { ar: "عندي خبرة في تحليل البيانات", en: "I have data analysis experience" },
];

type Status = "idle" | "sending" | "done" | "error";

export default function CourseLeadForm({ slug, title, isAr }: { slug: string; title: string; isAr: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [level, setLevel] = useState(LEVELS[0].ar);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/course-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug, level, consent: f.get("consent") === "on",
          name: f.get("name"), phone: f.get("phone"), website: f.get("website") || undefined,
          ...getAttribution(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      trackPixel("Lead", { content_type: "course", content_ids: [slug], lead_type: "course_form" });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const isWaCourse = slug === WA_COURSE.slug;
  const wa = isWaCourse ? waCourseUrl() : `https://wa.me/201226929392?text=${encodeURIComponent(isAr ? `سيبت بياناتي على الموقع بخصوص كورس: ${title}` : `I left my details on the website about: ${title}`)}`;
  const field = "w-full rounded-xl bg-slate-900/60 border border-white/15 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-400";

  return (
    <div className="glass rounded-2xl p-6 border border-teal-500/30">
      <h2 className="text-xl font-bold text-white mb-2">
        {isAr ? "عايز تعرف الكورس مناسب لمستواك؟" : "Not sure the course fits your level?"}
      </h2>
      <p className="text-slate-300 text-sm mb-5">
        {isAr ? "سيب اسمك ورقم واتساب، وهنكلمك نساعدك تقرر — من غير أي التزام." : "Leave your name and WhatsApp number and we'll help you decide — no commitment."}
      </p>

      {status === "done" ? (
        <div className="text-center py-4">
          <CheckCircle2 className="w-12 h-12 text-teal-400 mx-auto mb-3" />
          <p className="text-white font-bold mb-1">{isAr ? "وصلتنا بياناتك 👌" : "We got your details 👌"}</p>
          <p className="text-slate-300 text-sm mb-4">{isAr ? "هنكلمك على واتساب قريب. لو مستعجل كلمنا دلوقتي:" : "We'll message you on WhatsApp soon. In a hurry? Message us now:"}</p>
          <a href={wa} target="_blank" rel="noopener noreferrer" data-wa-location="lead_form_thanks" data-wa-course={isWaCourse ? WA_COURSE.name : title} className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-bold text-white hover:bg-green-500">
            <MessageCircle className="w-5 h-5" /> {isAr ? "كلمنا على واتساب" : "WhatsApp us"}
          </a>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="text-sm text-slate-300">{isAr ? "الاسم" : "Name"}</span>
              <input name="name" required minLength={2} maxLength={80} autoComplete="name" className={`${field} mt-1`} placeholder={isAr ? "اسمك" : "Your name"} />
            </label>
            <label className="block">
              <span className="text-sm text-slate-300">{isAr ? "رقم واتساب" : "WhatsApp number"}</span>
              <input name="phone" required type="tel" inputMode="tel" minLength={10} maxLength={20} autoComplete="tel" dir="ltr" className={`${field} mt-1 text-start`} placeholder="01xxxxxxxxx" />
            </label>
          </div>
          <fieldset>
            <legend className="text-sm text-slate-300 mb-2">{isAr ? "مستواك الحالي" : "Your current level"}</legend>
            <div className="grid sm:grid-cols-3 gap-2">
              {LEVELS.map((l) => (
                <label key={l.ar} className={`cursor-pointer rounded-xl border px-3 py-2.5 text-sm text-center ${level === l.ar ? "border-teal-400 bg-teal-400/10 text-white" : "border-white/15 text-slate-300"}`}>
                  <input type="radio" name="level" value={l.ar} checked={level === l.ar} onChange={() => setLevel(l.ar)} className="sr-only" />
                  {isAr ? l.ar : l.en}
                </label>
              ))}
            </div>
          </fieldset>
          <label className="flex items-start gap-2 text-sm text-slate-300">
            <input type="checkbox" name="consent" required className="mt-1 accent-teal-500" />
            {isAr ? "موافق إن Knowlytics Hub تتواصل معايا على واتساب بخصوص الكورس." : "I agree that Knowlytics Hub may contact me on WhatsApp about the course."}
          </label>
          {status === "error" && (
            <p className="text-sm text-red-300">{isAr ? "حصلت مشكلة في الإرسال. جرّب تاني أو كلمنا على واتساب." : "Something went wrong. Try again or message us on WhatsApp."}</p>
          )}
          <button type="submit" disabled={status === "sending"} className="w-full rounded-xl bg-teal-500 py-3 font-bold text-slate-900 hover:bg-teal-400 disabled:opacity-60 inline-flex items-center justify-center gap-2">
            {status === "sending" && <Loader2 className="w-4 h-4 animate-spin" />}
            {isAr ? "ابعت بياناتي" : "Send my details"}
          </button>
        </form>
      )}
    </div>
  );
}
