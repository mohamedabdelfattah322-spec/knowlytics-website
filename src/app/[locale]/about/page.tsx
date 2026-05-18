"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Target, Eye, Award, Users, BookOpen, CheckCircle, Lightbulb, Heart, TrendingUp } from "lucide-react";
import Link from "next/link";

interface AboutPageProps {
  params: { locale: string };
}

const values = [
  { icon: Award, key: "value1", color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-500/20" },
  { icon: Lightbulb, key: "value2", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-500/20" },
  { icon: Users, key: "value3", color: "text-green-400", bg: "bg-green-400/10 border-green-500/20" },
  { icon: BookOpen, key: "value4", color: "text-purple-400", bg: "bg-purple-400/10 border-purple-500/20" },
];

const stats = [
  { value: "7,000+", labelAr: "متدرب في مصر والعالم العربي", labelEn: "Trainees across the Arab world" },
  { value: "15+", labelAr: "شركة تدرّبت", labelEn: "Companies trained" },
  { value: "9", labelAr: "كورسات متخصصة", labelEn: "Specialized courses" },
  { value: "300+", labelAr: "مشروع فريلانس", labelEn: "Freelance projects" },
];

const whyItems = [
  { ar: "خبرة +17 سنة في شركات متعددة الجنسيات", en: "17+ years experience at multinational companies" },
  { ar: "تدريب عملي 100% أثناء المحاضرات", en: "100% hands-on training during lectures" },
  { ar: "مشاريع حقيقية تضاف لبورتفوليوك", en: "Real projects that add to your portfolio" },
  { ar: "دعم مستمر بعد انتهاء الكورس", en: "Continuous support after course completion" },
  { ar: "شهادات معترف بها من الشركات", en: "Company-recognized certificates" },
  { ar: "محتوى بالعربية بجودة عالمية", en: "Arabic content with world-class quality" },
];

export default function AboutPage({ params: { locale } }: AboutPageProps) {
  const t = useTranslations("about");
  const isAr = locale === "ar";

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-slate-950 via-teal-950/20 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 dots-bg opacity-20" />
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/20">
              🏢 {isAr ? "من نحن" : "About Us"}
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-4">{t("title")}</h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">{t("subtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-slate-900 border-y border-white/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <p className="text-3xl lg:text-4xl font-black gradient-text mb-1">{s.value}</p>
                <p className="text-slate-400 text-sm">{isAr ? s.labelAr : s.labelEn}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: isAr ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative glass border border-blue-500/20 rounded-3xl p-8 overflow-hidden"
            >
              <div className="absolute top-0 end-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{t("mission")}</h2>
              <p className="text-slate-300 leading-relaxed">{t("missionText")}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isAr ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative glass border border-purple-500/20 rounded-3xl p-8 overflow-hidden"
            >
              <div className="absolute top-0 end-0 w-32 h-32 bg-purple-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{t("vision")}</h2>
              <p className="text-slate-300 leading-relaxed">{t("visionText")}</p>
            </motion.div>
          </div>

          {/* Values */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white">{t("values")}</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {values.map((v, i) => (
              <motion.div
                key={v.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass border rounded-2xl p-6 text-center hover:scale-105 transition-all ${v.bg}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${v.bg}`}>
                  <v.icon className={`w-6 h-6 ${v.color}`} />
                </div>
                <p className="text-white font-semibold text-sm">{t(v.key as any)}</p>
              </motion.div>
            ))}
          </div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass border border-white/10 rounded-3xl p-8 lg:p-12 mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-6">{t("storyTitle")}</h2>
            <p className="text-slate-300 leading-relaxed text-lg">{t("storyText")}</p>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white text-center mb-10">{t("whyUs")}</h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-12">
              {whyItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl glass border border-white/10 hover:border-green-500/20 transition-all"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-300 text-sm">{isAr ? item.ar : item.en}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA to Instructor */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <div className="glass border border-blue-500/20 rounded-3xl p-10 max-w-2xl mx-auto">
              <div className="text-5xl mb-4">👨‍🏫</div>
              <h3 className="text-2xl font-black text-white mb-3">
                {isAr ? "تعرّف على المدرب" : "Meet the Instructor"}
              </h3>
              <p className="text-slate-400 mb-6 text-sm">
                {isAr
                  ? "محمد عبدالفتاح — خبير تحليل البيانات بخبرة +17 سنة في شركات متعددة الجنسيات"
                  : "Mohamed Abdelfattah — Data analytics expert with 17+ years at multinational companies"}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href={`/${locale}/instructor`}
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg text-sm">
                  {isAr ? "صفحة المدرب" : "Instructor Profile"}
                </Link>
                <Link href={`/${locale}/courses`}
                  className="px-7 py-3 rounded-xl border border-white/20 text-slate-300 hover:bg-white/10 font-semibold transition-all text-sm">
                  {isAr ? "تصفّح الكورسات" : "Browse Courses"}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
