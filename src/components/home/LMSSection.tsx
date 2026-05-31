"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BookOpen, TrendingUp, Award, FileCheck, MessageSquare } from "lucide-react";

interface LMSSectionProps {
  locale: string;
}

const features = [
  { icon: BookOpen, key: "feature1" },
  { icon: TrendingUp, key: "feature2" },
  { icon: FileCheck, key: "feature3" },
  { icon: Award, key: "feature4" },
  { icon: MessageSquare, key: "feature5" },
];

export default function LMSSection({ locale }: LMSSectionProps) {
  const t = useTranslations("lms");
  const isAr = locale === "ar";

  return (
    <section className="section-padding bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 start-0 w-1/2 h-full bg-gradient-to-e from-blue-900/20 to-transparent dark:from-blue-900/30 dark:to-transparent" />
        <div className="absolute bottom-0 end-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
              🎬 {isAr ? "الكورسات المسجلة" : "Recorded Courses"}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {t("title")}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">{t("subtitle")}</p>

            <div className="space-y-4 mb-8">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {t(feature.key as any)}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://learn.knowlyticshub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-blue-500/30"
              >
                {t("cta")}
              </a>
              <a
                href="https://learn.knowlyticshub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl border border-blue-500/30 text-blue-400 font-semibold hover:bg-blue-500/10 transition-all"
              >
                {t("login")}
              </a>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* LMS Dashboard Mockup */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/10 bg-slate-950">
              {/* Header bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ms-3 text-xs text-slate-500">learn.knowlyticshub.com</span>
              </div>

              {/* Dashboard content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
                  <div>
                    <div className="h-3 w-24 bg-slate-700 rounded mb-1" />
                    <div className="h-2 w-16 bg-slate-800 rounded" />
                  </div>
                </div>

                {/* Progress bars */}
                <div className="space-y-4 mb-6">
                  {["Power BI Mastery", "SQL Fundamentals", "Python Analytics"].map((course, i) => (
                    <div key={course}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs text-slate-400">{course}</span>
                        <span className="text-xs text-blue-400">{[75, 45, 90][i]}%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full progress-bar rounded-full"
                          style={{ width: `${[75, 45, 90][i]}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: isAr ? "الدورات" : "Courses", value: "3" },
                    { label: isAr ? "الشهادات" : "Certs", value: "2" },
                    { label: isAr ? "الساعات" : "Hours", value: "48" },
                  ].map((s) => (
                    <div key={s.label} className="bg-slate-900 rounded-xl p-3 text-center">
                      <div className="text-xl font-bold gradient-text">{s.value}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -end-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -start-4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
