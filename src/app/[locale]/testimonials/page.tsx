"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Star, Send, Linkedin } from "lucide-react";
import TestimonialCard from "@/components/shared/TestimonialCard";
import testimonials from "@/data/testimonials.json";
import { useState } from "react";

function ReviewForm({ isAr }: { isAr: boolean }) {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [course, setCourse] = useState("");
  const [review, setReview] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `⭐ رأي جديد من موقع Knowlytics\n\nالاسم: ${name}\nالوظيفة: ${job}\nLinkedIn: ${linkedin}\nالكورس: ${course}\n\nالرأي:\n${review}`
    );
    window.open(`https://wa.me/201226929392?text=${msg}`, "_blank");
    setSent(true);
  };

  return (
    <section className="py-20 bg-slate-900 border-t border-white/10">
      <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-bold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
            ✍️ {isAr ? "شارك رأيك" : "Share Your Experience"}
          </span>
          <h2 className="text-3xl font-black text-white mb-3">
            {isAr ? "هل أتممت أحد كورساتنا؟" : "Did you complete one of our courses?"}
          </h2>
          <p className="text-slate-400">
            {isAr
              ? "شارك تجربتك وسنراجعها وننشرها بعد موافقتنا"
              : "Share your experience — we'll review and publish it after approval"}
          </p>
        </motion.div>

        {sent ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center glass border border-green-500/20 rounded-2xl p-10">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-white mb-2">{isAr ? "تم إرسال رأيك!" : "Review Submitted!"}</h3>
            <p className="text-slate-400">{isAr ? "سيتم نشر رأيك قريبًا ✨" : "Your review will be published soon ✨"}</p>
          </motion.div>
        ) : (
          <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onSubmit={handleSubmit} className="glass border border-white/10 rounded-2xl p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">{isAr ? "الاسم الكامل *" : "Full Name *"}</label>
                <input required value={name} onChange={e => setName(e.target.value)} dir="auto"
                  className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 transition-colors text-sm"
                  placeholder={isAr ? "اسمك الكامل" : "Your full name"} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">{isAr ? "المسمى الوظيفي *" : "Job Title *"}</label>
                <input required value={job} onChange={e => setJob(e.target.value)} dir="auto"
                  className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 transition-colors text-sm"
                  placeholder={isAr ? "محلل بيانات / مدير..." : "Data Analyst / Manager..."} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" /> {isAr ? "رابط LinkedIn" : "LinkedIn Profile"}
                </label>
                <input value={linkedin} onChange={e => setLinkedin(e.target.value)} dir="ltr" type="url"
                  className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 transition-colors text-sm"
                  placeholder="https://linkedin.com/in/..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">{isAr ? "الكورس الذي أتممته *" : "Course You Completed *"}</label>
                <select required value={course} onChange={e => setCourse(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/20 bg-slate-900 text-white focus:outline-none focus:border-yellow-500 transition-colors text-sm">
                  <option value="">{isAr ? "اختر الكورس" : "Select course"}</option>
                  <option>Excel + Power BI + AI + Freelance</option>
                  <option>SQL Server for Data Analysis</option>
                  <option>Python for Data Analysis</option>
                  <option>AI Tools &amp; Prompt Engineering</option>
                  <option>Tableau for Beginners</option>
                  <option>Looker Studio for Beginners</option>
                  <option>{isAr ? "كتابة التقارير الاحترافية" : "Professional Report Writing"}</option>
                  <option>{isAr ? "الباقة الكاملة" : "Full Data Analytics Bundle"}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">{isAr ? "رأيك في الكورس *" : "Your Review *"}</label>
              <textarea required rows={4} value={review} onChange={e => setReview(e.target.value)} dir="auto"
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 transition-colors text-sm resize-none"
                placeholder={isAr ? "شارك تجربتك مع الكورس..." : "Share your course experience..."} />
            </div>

            <p className="text-xs text-slate-500 text-center">
              {isAr ? "سيتم نشر رأيك قريبًا ✨" : "Your review will be published soon ✨"}
            </p>

            <button type="submit" className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold hover:from-yellow-400 hover:to-orange-400 transition-all shadow-lg">
              <Send className="w-5 h-5" />
              {isAr ? "إرسال رأيي" : "Submit My Review"}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}

interface TestimonialsPageProps {
  params: { locale: string };
}

export default function TestimonialsPage({ params: { locale } }: TestimonialsPageProps) {
  const t = useTranslations("testimonials");
  const isAr = locale === "ar";

  const avgRating = (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1);

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-slate-950 via-yellow-950/20 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 dots-bg opacity-20" />
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-7 h-7 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-4">{t("title")}</h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">{t("subtitle")}</p>
            <div className="mt-6 inline-flex items-center gap-3 glass border border-yellow-500/20 rounded-2xl px-6 py-3">
              <span className="text-4xl font-black text-yellow-400">{avgRating}</span>
              <div className="text-start">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-400 text-sm">{testimonials.length} {isAr ? "تقييم" : "reviews"}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {(testimonials as any[]).map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} locale={locale} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Submit Your Review */}
      <ReviewForm isAr={isAr} />
    </>
  );
}
