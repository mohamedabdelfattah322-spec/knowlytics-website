"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Youtube, Linkedin, Facebook, Instagram,
  Award, Users, BookOpen, Trophy, CheckCircle,
  Briefcase, Target, BarChart3, Brain, Database, TrendingUp
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface InstructorPageProps {
  params: { locale: string };
}

const skills = [
  { icon: BarChart3, labelAr: "Excel & Power BI", labelEn: "Excel & Power BI", color: "text-green-400", bg: "bg-green-400/10 border-green-500/20" },
  { icon: Database, labelAr: "SQL & قواعد البيانات", labelEn: "SQL & Databases", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-500/20" },
  { icon: Brain, labelAr: "Python & AI", labelEn: "Python & AI", color: "text-purple-400", bg: "bg-purple-400/10 border-purple-500/20" },
  { icon: TrendingUp, labelAr: "تحليل الأعمال", labelEn: "Business Analytics", color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-500/20" },
  { icon: Target, labelAr: "لوحات المعلومات", labelEn: "Dashboard Design", color: "text-orange-400", bg: "bg-orange-400/10 border-orange-500/20" },
  { icon: Briefcase, labelAr: "التدريب المؤسسي", labelEn: "Corporate Training", color: "text-cyan-400", bg: "bg-cyan-400/10 border-cyan-500/20" },
];

const stats = [
  { value: "17+", labelAr: "سنة في شركات متعددة الجنسيات", labelEn: "Years at multinationals" },
  { value: "7,000+", labelAr: "متدرب في العالم العربي", labelEn: "Trainees in the Arab world" },
  { value: "100+", labelAr: "شركة تدرّبت", labelEn: "Companies trained" },
  { value: "9", labelAr: "كورسات متخصصة", labelEn: "Specialized courses" },
  { value: "105K+", labelAr: "مشترك على يوتيوب", labelEn: "YouTube subscribers" },
  { value: "300+", labelAr: "مشروع فريلانس", labelEn: "Freelance projects" },
];

const milestones = [
  { icon: "🎓", titleAr: "بدأت التدريب منذ 2016", titleEn: "Training Since 2016", descAr: "بدأت مسيرة التدريب في معاهد داخل وخارج مصر — خبرة ميدانية حقيقية قبل إطلاق Knowlytics Hub", descEn: "Started training at institutes inside and outside Egypt — real field experience before launching Knowlytics Hub", color: "bg-purple-500" },
  { icon: "🏆", titleAr: "جائزة YouTube Creator", titleEn: "YouTube Creator Award", descAr: "حصلنا على جائزة يوتيوب Creator Award", descEn: "Received the YouTube Creator Award", color: "bg-yellow-500" },
  { icon: "📚", titleAr: "9 كورسات متخصصة", titleEn: "9 Specialized Courses", descAr: "أطلقنا 9 كورسات متخصصة شاملة في تحليل البيانات والـ AI", descEn: "Launched 9 comprehensive specialized courses in data analytics and AI", color: "bg-green-500" },
  { icon: "🚀", titleAr: "+7,000 متدرب", titleEn: "7,000+ Trainees", descAr: "تجاوزنا 7,000 متدرب من مصر والعالم العربي وأكثر من 100 شركة", descEn: "Surpassed 7,000 trainees from Egypt and the Arab world, 100+ companies", color: "bg-rose-500" },
  { icon: "📺", titleAr: "105,000 مشترك يوتيوب", titleEn: "105,000 YouTube Subscribers", descAr: "تجاوزنا 105,000 مشترك على يوتيوب وأكثر من 300 مشروع فريلانس منجز", descEn: "Surpassed 105,000 YouTube subscribers and 300+ freelance projects delivered", color: "bg-blue-500" },
];

const whyItems = [
  { ar: "خبرة +17 سنة في شركات متعددة الجنسيات", en: "17+ years at multinational companies" },
  { ar: "تدريب عملي 100% أثناء المحاضرات", en: "100% hands-on training during lectures" },
  { ar: "مشاريع حقيقية تضاف لبورتفوليوك", en: "Real projects that add to your portfolio" },
  { ar: "دعم مستمر بعد انتهاء الكورس", en: "Continuous support after course completion" },
  { ar: "شهادات معترف بها من الشركات", en: "Company-recognized certificates" },
  { ar: "محتوى بالعربية بجودة عالمية", en: "Arabic content with world-class quality" },
];

export default function InstructorPage({ params: { locale } }: InstructorPageProps) {
  const t = useTranslations("founder");
  const isAr = locale === "ar";

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950/30 to-slate-950">
        <div className="absolute inset-0 dots-bg opacity-20" />
        <div className="absolute top-0 end-0 w-1/2 h-full bg-gradient-to-l from-blue-900/20 to-transparent" />
        <div className="absolute bottom-0 start-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: isAr ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative max-w-sm mx-auto lg:mx-0">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl animate-pulse-slow" />
                <div className="absolute -top-4 -start-4 w-24 h-24 rounded-full border-2 border-blue-500/30 animate-spin-slow" />
                <div className="absolute -bottom-4 -end-4 w-16 h-16 rounded-full border-2 border-purple-500/30 animate-spin-slow" style={{ animationDirection: "reverse" }} />
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                  <Image src="/profile.JPG" alt="Mohamed Abdelfattah" fill className="object-cover object-top" sizes="(max-width: 768px) 90vw, 40vw" />
                  <div className="absolute top-4 start-4 glass border border-white/10 rounded-xl p-3 shadow-lg">
                    <p className="text-yellow-400 text-xl font-black">🏆</p>
                    <p className="text-white text-xs font-semibold mt-1">{isAr ? "جائزة يوتيوب" : "YouTube Award"}</p>
                  </div>
                  <div className="absolute bottom-4 end-4 glass border border-white/10 rounded-xl p-3 shadow-lg">
                    <p className="text-green-400 font-bold">7,000+</p>
                    <p className="text-white text-xs">{isAr ? "متدرب" : "Trainees"}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: isAr ? -60 : 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                👨‍🏫 {isAr ? "المدرب الرئيسي" : "Lead Instructor"}
              </span>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-2">{t("name")}</h1>
              <p className="text-xl gradient-text font-semibold mb-5">{t("role")}</p>
              <p className="text-slate-300 text-base leading-relaxed mb-6">{t("bio")}</p>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { v: "17+", l: isAr ? "سنة خبرة" : "Years exp." },
                  { v: "7K+", l: isAr ? "متدرب" : "Trainees" },
                  { v: "105K+", l: isAr ? "مشترك" : "Subscribers" },
                ].map((s, i) => (
                  <div key={i} className="glass border border-white/10 rounded-xl p-3 text-center">
                    <p className="text-2xl font-black gradient-text">{s.v}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { href: "https://www.youtube.com/c/MohamedAbdelfattahYallaNet3alemM", icon: Youtube, label: "YouTube", cls: "bg-red-600/20 border-red-500/30 text-red-400 hover:bg-red-600/30" },
                  { href: "https://www.facebook.com/MohamedabdelfattahYallanet3alem1", icon: Facebook, label: "Facebook", cls: "bg-blue-600/20 border-blue-500/30 text-blue-400 hover:bg-blue-600/30" },
                  { href: "https://www.instagram.com/m._abdelfattah_knowlytics_hub", icon: Instagram, label: "Instagram", cls: "bg-pink-600/20 border-pink-500/30 text-pink-400 hover:bg-pink-600/30" },
                  { href: "https://www.linkedin.com/in/mohamed-abdelfattah-el-sayed/", icon: Linkedin, label: "LinkedIn", cls: "bg-blue-700/20 border-blue-600/30 text-blue-300 hover:bg-blue-700/30" },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${s.cls}`}>
                    <s.icon className="w-3.5 h-3.5" />
                    {s.label}
                  </a>
                ))}
              </div>

              <Link href={`/${locale}/courses`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg text-sm">
                {isAr ? "تصفّح الكورسات" : "Browse Courses"}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Full Stats ────────────────────────────────────────── */}
      <section className="py-14 bg-slate-900 border-y border-white/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <p className="text-3xl lg:text-4xl font-black gradient-text mb-1">{s.value}</p>
                <p className="text-slate-400 text-xs leading-snug">{isAr ? s.labelAr : s.labelEn}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Expertise ─────────────────────────────────────────── */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-black text-white">{isAr ? "مجالات الخبرة" : "Areas of Expertise"}</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {skills.map((sk, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-3 p-4 rounded-2xl border ${sk.bg} transition-all hover:scale-105`}>
                <sk.icon className={`w-6 h-6 ${sk.color} flex-shrink-0`} />
                <p className="text-white font-semibold text-sm">{isAr ? sk.labelAr : sk.labelEn}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Milestones ────────────────────────────────────────── */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-black text-white">{isAr ? "رحلة النجاح" : "The Journey"}</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute start-6 top-0 bottom-0 w-px bg-white/10" />
            <div className="space-y-8">
              {milestones.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: isAr ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-5 ps-14 relative">
                  <div className={`absolute start-0 w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-xl shadow-lg flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <div className="glass border border-white/10 rounded-2xl p-5 flex-1 hover:border-blue-500/20 transition-all">
                    <p className="text-white font-bold mb-1">{isAr ? item.titleAr : item.titleEn}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{isAr ? item.descAr : item.descEn}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Learn With Me ─────────────────────────────────── */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-black text-white">{isAr ? "ليه تتعلم معايا؟" : "Why Learn With Me?"}</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-12">
            {whyItems.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: isAr ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-xl glass border border-white/10 hover:border-green-500/20 transition-all">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm">{isAr ? item.ar : item.en}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <div className="glass border border-blue-500/20 rounded-3xl p-10 max-w-2xl mx-auto">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-black text-white mb-3">
                {isAr ? "ابدأ رحلتك في تحليل البيانات" : "Start Your Data Analytics Journey"}
              </h3>
              <p className="text-slate-400 mb-6 text-sm">
                {isAr
                  ? "انضم لأكثر من 7,000 متدرب غيّروا مسيرتهم المهنية"
                  : "Join 7,000+ trainees who transformed their careers"}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href={`/${locale}/courses`}
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg text-sm">
                  {isAr ? "تصفّح الكورسات" : "Browse Courses"}
                </Link>
                <a href="https://wa.me/201226929392" target="_blank" rel="noopener noreferrer"
                  className="px-7 py-3 rounded-xl border border-white/20 text-slate-300 hover:bg-white/10 font-semibold transition-all text-sm">
                  {isAr ? "تواصل معنا" : "Contact Us"}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
