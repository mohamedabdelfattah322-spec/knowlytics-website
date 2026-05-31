"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BookOpen, TrendingUp, FileCheck, Award, MessageSquare, ExternalLink } from "lucide-react";

interface LMSPageProps {
  params: { locale: string };
}

const features = [
  { icon: BookOpen, key: "courses", color: "from-blue-500 to-cyan-500" },
  { icon: TrendingUp, key: "progress", color: "from-purple-500 to-pink-500" },
  { icon: FileCheck, key: "exams", color: "from-orange-500 to-yellow-500" },
  { icon: Award, key: "certificates", color: "from-teal-500 to-green-500" },
  { icon: MessageSquare, key: "community", color: "from-red-500 to-rose-500" },
];

const LMS_URL = "https://learn.knowlyticshub.com";

export default function LMSPage({ params: { locale } }: LMSPageProps) {
  const t = useTranslations("lmsPortal");
  const lt = useTranslations("lms");
  const isAr = locale === "ar";

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 dots-bg opacity-20" />
        <div className="absolute top-1/4 start-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              🎓 {isAr ? "منصة التعلم" : "LMS Platform"}
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-4">{t("title")}</h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">{t("subtitle")}</p>
            <a
              href={LMS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg hover:from-blue-500 hover:to-purple-500 transition-all shadow-xl shadow-blue-900/40"
            >
              {isAr ? "دخول منصة التعلم" : "Go to Learning Platform"}
              <ExternalLink className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features + CTA */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Features */}
            <motion.div initial={{ opacity: 0, x: isAr ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold text-white mb-6">{lt("subtitle")}</h2>
              <div className="space-y-4">
                {features.map((f, i) => (
                  <motion.div key={f.key} initial={{ opacity: 0, x: isAr ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 glass border border-white/10 rounded-2xl hover:border-blue-500/30 transition-all group">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                      <f.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-slate-200 font-medium">{t(`features.${f.key}` as any)}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div initial={{ opacity: 0, x: isAr ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="glass border border-blue-500/20 rounded-3xl p-10 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-900/40">
                  <span className="text-4xl">🎓</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {isAr ? "منصة التعلم جاهزة!" : "Learning Platform is Live!"}
                </h3>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  {isAr
                    ? "سجّل دخولك على منصة التعلم الخاصة بنا للوصول إلى الكورسات المسجلة وتتبع تقدمك وتحميل شهاداتك."
                    : "Log in to our learning platform to access recorded courses, track your progress, and download your certificates."}
                </p>
                <a
                  href={LMS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-blue-900/40 mb-4"
                >
                  {isAr ? "دخول منصة التعلم" : "Enter Learning Platform"}
                </a>
                <a
                  href={LMS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3.5 rounded-2xl border border-blue-500/30 text-blue-400 font-semibold hover:bg-blue-500/10 transition-all text-sm"
                >
                  {isAr ? "تسجيل الدخول للمنصة" : "Sign In to Platform"}
                </a>
                <p className="text-xs text-slate-500 mt-4 flex items-center justify-center gap-1">
                  <span>🔗</span>
                  <span dir="ltr">learn.knowlyticshub.com</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
