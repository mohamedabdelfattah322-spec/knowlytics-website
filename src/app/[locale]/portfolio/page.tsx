"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Youtube, Users, BookOpen, Award, Star, ChevronRight,
  MessageCircle, Mail, Globe, BarChart2, Briefcase, CheckCircle2
} from "lucide-react";

// ── Social Links ─────────────────────────────────────────────
const SOCIAL_LINKS = [
  {
    label: "YouTube",
    handle: "@MohamedAbdelfattah",
    sub: { ar: "+100,000 مشترك", en: "100K+ Subscribers" },
    href: "https://www.youtube.com/c/MohamedAbdelfattahYallaNet3alemM",
    bg: "from-red-600/20 to-red-800/20",
    border: "border-red-500/30",
    color: "text-red-400",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    handle: "Mohamed Abdelfattah",
    sub: { ar: "تابعنا على فيسبوك", en: "Follow on Facebook" },
    href: "https://www.facebook.com/MohamedabdelfattahYallanet3alem1",
    bg: "from-blue-600/20 to-blue-800/20",
    border: "border-blue-500/30",
    color: "text-blue-400",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    handle: "@m._abdelfattah",
    sub: { ar: "تابعنا على انستجرام", en: "Follow on Instagram" },
    href: "https://www.instagram.com/m._abdelfattah_knowlytics_hub",
    bg: "from-pink-600/20 to-purple-800/20",
    border: "border-pink-500/30",
    color: "text-pink-400",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    handle: "Mohamed Abdelfattah El-Sayed",
    sub: { ar: "تواصل معنا على لينكدإن", en: "Connect on LinkedIn" },
    href: "https://www.linkedin.com/in/mohamed-abdelfattah-el-sayed/",
    bg: "from-sky-600/20 to-sky-800/20",
    border: "border-sky-500/30",
    color: "text-sky-400",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    handle: "@mohamedabdelfattah23",
    sub: { ar: "شاهد مقاطعنا على تيك توك", en: "Watch us on TikTok" },
    href: "https://www.tiktok.com/@mohamedabdelfattah23",
    bg: "from-slate-600/20 to-slate-800/20",
    border: "border-slate-400/30",
    color: "text-white",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    handle: "00201226929392",
    sub: { ar: "تواصل معنا مباشرة", en: "Contact us directly" },
    href: "https://wa.me/201226929392",
    bg: "from-green-600/20 to-green-800/20",
    border: "border-green-500/30",
    color: "text-green-400",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.864 9.864 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "Website",
    handle: "knowlyticshub.com",
    sub: { ar: "الموقع الرسمي", en: "Official Website" },
    href: "https://knowlyticshub.com",
    bg: "from-blue-600/20 to-indigo-800/20",
    border: "border-blue-400/30",
    color: "text-blue-300",
    icon: <Globe className="w-6 h-6" />,
  },
  {
    label: "Email",
    handle: "Sales@knowlyticshub.com",
    sub: { ar: "راسلنا على الإيميل", en: "Send us an email" },
    href: "mailto:Sales@knowlyticshub.com",
    bg: "from-orange-600/20 to-red-800/20",
    border: "border-orange-500/30",
    color: "text-orange-400",
    icon: <Mail className="w-6 h-6" />,
  },
  {
    label: "Learning Platform",
    handle: "learn.knowlyticshub.com",
    sub: { ar: "منصة الكورسات المسجّلة", en: "Recorded Courses Platform" },
    href: "https://learn.knowlyticshub.com/",
    bg: "from-purple-600/20 to-indigo-800/20",
    border: "border-purple-500/30",
    color: "text-purple-400",
    icon: <BookOpen className="w-6 h-6" />,
  },
];

// ── Companies ─────────────────────────────────────────────────
const COMPANIES = [
  { name: "Saint-Gobain", logo: "/company-logo/Saint-Gobain.png", dark: false },
  { name: "AFRAS KSA", logo: "/company-logo/AFRAS KSA.jpg", dark: false },
  { name: "Alyoum", logo: "/company-logo/Alyoum.png", dark: false },
  { name: "Cinnabon", logo: "/company-logo/Cinnabon.png", dark: false },
  { name: "EFS", logo: "/company-logo/EFS.jpg", dark: false },
  { name: "Asfour Crystal", logo: "/company-logo/ASFOUR.png", dark: false },
  { name: "Apleona", logo: "/company-logo/Apleona.png", dark: false },
  { name: "Symphony Development", logo: "/company-logo/Symphony Development.webp", dark: true },
  { name: "Elsewedy Watanya", logo: "/company-logo/Elsewedy Watanya.png", dark: false },
];

// ── Courses ───────────────────────────────────────────────────
const COURSES = [
  { icon: "📊", titleAr: "Excel + Power BI + AI + Freelance", titleEn: "Excel + Power BI + AI + Freelance", slug: "excel-powerbi-ai-freelance", featured: true },
  { icon: "🟢", titleAr: "Excel للمبتدئين", titleEn: "Excel for Beginners", slug: "excel-zero-to-hero" },
  { icon: "⚡", titleAr: "Excel المتقدم", titleEn: "Advanced Excel", slug: "" },
  { icon: "📉", titleAr: "Excel تحليل البيانات", titleEn: "Excel Data Analysis", slug: "" },
  { icon: "📊", titleAr: "Power BI", titleEn: "Power BI", slug: "" },
  { icon: "🗄️", titleAr: "SQL Server لتحليل البيانات", titleEn: "SQL Server for Data Analysis", slug: "sql-data-analysis" },
  { icon: "🐍", titleAr: "Python لتحليل البيانات", titleEn: "Python for Data Analysis", slug: "python-data-analysis" },
  { icon: "📈", titleAr: "Tableau للمبتدئين", titleEn: "Tableau for Beginners", slug: "tableau-beginners" },
  { icon: "🔵", titleAr: "Looker Studio للمبتدئين", titleEn: "Looker Studio for Beginners", slug: "looker-studio-beginners" },
  { icon: "📝", titleAr: "كتابة التقارير الاحترافية", titleEn: "Professional Report Writing", slug: "report-writing" },
  { icon: "🤖", titleAr: "أدوات AI وهندسة البرومبت", titleEn: "AI Tools & Prompt Engineering", slug: "ai-tools-prompt-engineering" },
  { icon: "🎓", titleAr: "HR Data Analysis", titleEn: "HR Data Analysis", slug: "" },
  { icon: "📦", titleAr: "الباقة الكاملة", titleEn: "Full Data Analytics Bundle", slug: "full-data-analysis-bundle" },
];

// ── What We Offer ─────────────────────────────────────────────
const OFFERINGS = [
  {
    icon: "🎓",
    titleAr: "تدريب أفراد",
    titleEn: "Individual Training",
    descAr: "كورسات لايف على Zoom مع تسجيلات ومتابعة شخصية",
    descEn: "Live courses on Zoom with recordings and personal follow-up",
  },
  {
    icon: "🏢",
    titleAr: "تدريب مؤسسي",
    titleEn: "Corporate Training",
    descAr: "برامج تدريب مخصصة للشركات والمؤسسات الكبرى",
    descEn: "Customized training programs for companies and enterprises",
  },
  {
    icon: "📊",
    titleAr: "تحليل البيانات",
    titleEn: "Data Analysis Services",
    descAr: "خدمات تحليل البيانات وبناء الداشبوردات للشركات",
    descEn: "Data analysis and dashboard building services for businesses",
  },
  {
    icon: "🤖",
    titleAr: "حلول الذكاء الاصطناعي",
    titleEn: "AI Solutions",
    descAr: "استشارات ودمج الذكاء الاصطناعي في بيئة العمل",
    descEn: "AI consulting and integration into work environments",
  },
  {
    icon: "📋",
    titleAr: "كتابة التقارير",
    titleEn: "Report Writing",
    descAr: "تصميم وكتابة تقارير احترافية وبيزنس كيس",
    descEn: "Designing and writing professional reports and business cases",
  },
  {
    icon: "🎯",
    titleAr: "استشارات مهنية",
    titleEn: "Career Consulting",
    descAr: "إرشاد للراغبين في الدخول لمجال تحليل البيانات",
    descEn: "Guidance for those looking to enter the data analytics field",
  },
];

export default function PortfolioPage() {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <main className="min-h-screen bg-slate-950 pt-20" dir={isAr ? "rtl" : "ltr"}>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 py-20">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        <div className="absolute top-10 end-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 start-10 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-blue-500/20 border border-blue-500/40 text-blue-300 uppercase tracking-wider mb-6">
              {isAr ? "بورتفوليو Knowlytics Hub" : "Knowlytics Hub Portfolio"}
            </span>

            <div className="flex justify-center mb-6">
              <Image src="/logo.png" alt="Knowlytics Hub" width={80} height={80} className="rounded-2xl" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              {isAr ? <>احنا مين؟<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Knowlytics Hub</span></> : <>Who Are We?<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Knowlytics Hub</span></>}
            </h1>

            <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
              {isAr
                ? "منصة تحليل البيانات الرائدة في العالم العربي. بندرّب الأفراد والشركات على Excel وPower BI وSQL وPython والذكاء الاصطناعي منذ 2016 — وخلّفنا أكثر من 7,000 متدرب من شركات كبرى."
                : "The leading data analytics platform in the Arab world. We train individuals and companies on Excel, Power BI, SQL, Python, and AI since 2016 — with 7,000+ trainees from top companies."}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { num: "7,000+", labelAr: "متدرب أفراد وشركات", labelEn: "Individuals & Companies" },
                { num: "9+", labelAr: "كورس", labelEn: "Courses" },
                { num: "8+", labelAr: "شركة كبرى", labelEn: "Companies" },
                { num: "17+", labelAr: "سنة خبرة", labelEn: "Years Exp." },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <p className="text-2xl font-black text-white">{s.num}</p>
                  <p className="text-slate-400 text-sm">{isAr ? s.labelAr : s.labelEn}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-20">

        {/* ── INSTRUCTOR ───────────────────────────────────────── */}
        <section>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass rounded-3xl border border-slate-700/50 p-8 flex flex-col md:flex-row gap-8 items-center">
            <div className="relative flex-shrink-0">
              <div className="w-36 h-36 rounded-3xl overflow-hidden border-4 border-blue-500/40 shadow-2xl shadow-blue-500/20">
                <Image src="/profile.JPG" alt="Mohamed Abdelfattah" width={144} height={144} className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute -bottom-2 -end-2 bg-green-500 rounded-full w-6 h-6 border-2 border-slate-900 flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
            <div className="flex-1 text-center md:text-start">
              <p className="text-blue-400 text-sm font-semibold mb-1">{isAr ? "المؤسس والمدرب الرئيسي" : "Founder & Lead Trainer"}</p>
              <h2 className="text-2xl font-black text-white mb-3">محمد عبدالفتاح</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                {isAr
                  ? "خبير تحليل البيانات مع أكثر من 17 سنة خبرة في شركات Multinational كبرى. بيدرّب من 2016 وكوّن أكثر من 7,000 متدرب."
                  : "Data analytics expert with 17+ years of experience in major multinational companies. Training since 2016, with 7,000+ trainees."}
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {["Excel", "Power BI", "SQL", "Python", "AI", "Tableau", "Looker Studio"].map(t => (
                  <span key={t} className="px-3 py-1 rounded-full text-xs bg-blue-500/15 border border-blue-500/30 text-blue-300">{t}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-slate-400 text-sm text-center">4.9 / 5.0</p>
            </div>
          </motion.div>
        </section>

        {/* ── COMPANIES ────────────────────────────────────────── */}
        <section>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-purple-500/20 border border-purple-500/40 text-purple-300 uppercase tracking-wider mb-3">
                {isAr ? "شركاؤنا" : "Our Partners"}
              </span>
              <h2 className="text-3xl font-black text-white mb-3">{isAr ? "شركات دربناها" : "Companies We Trained"}</h2>
              <p className="text-slate-400">{isAr ? "من أبرز الشركات المتعددة الجنسيات التي استفادت من برامجنا" : "Top multinational companies that benefited from our programs"}</p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {COMPANIES.map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="flex flex-col items-center gap-2 border border-white/10 rounded-2xl p-3 bg-slate-800/40 hover:bg-slate-800/70 transition-colors">
                  <div className={`w-full h-14 relative rounded-lg p-1.5 ${c.dark ? "bg-slate-700" : "bg-white"}`}>
                    <Image src={c.logo} alt={c.name} fill className="object-contain p-1" sizes="120px" />
                  </div>
                  <p className="text-xs text-slate-400 text-center leading-tight">{c.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── GROUP PHOTOS ─────────────────────────────────────── */}
        <section>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-green-500/20 border border-green-500/40 text-green-300 uppercase tracking-wider mb-3">
                {isAr ? "جروباتنا" : "Our Groups"}
              </span>
              <h2 className="text-3xl font-black text-white mb-3">{isAr ? "من جروباتنا السابقة" : "From Our Training Groups"}</h2>
              <p className="text-slate-400">{isAr ? "صور حقيقية من جروبات تدريبية سابقة" : "Real photos from our previous training groups"}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[1,2,3,4,5,6,7,8].map(n => (
                <motion.div key={n} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (n-1) * 0.07 }}
                  className="rounded-2xl overflow-hidden border border-slate-700/50 aspect-video relative group">
                  <Image src={`/groups/g${n}.jpeg`} alt={`Training group ${n}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 50vw, 25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── TRAINEE FEEDBACK ─────────────────────────────────── */}
        <section>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 uppercase tracking-wider mb-3">
                {isAr ? "آراء المتدربين" : "Trainee Feedback"}
              </span>
              <h2 className="text-3xl font-black text-white mb-3">{isAr ? "فيدباك المتدربين" : "What Trainees Say"}</h2>
              <p className="text-slate-400">{isAr ? "آراء حقيقية من متدربينا" : "Real reviews from our trainees"}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[1,2,3,4,5].map((n, i) => (
                <motion.div key={n} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="rounded-2xl overflow-hidden border border-slate-700/50">
                  <Image src={`/feedback/f${n}.${n === 5 ? "png" : "jpeg"}`} alt={`Feedback ${n}`} width={400} height={300} className="w-full h-auto object-contain bg-white" sizes="(max-width: 640px) 50vw, 25vw" />
                </motion.div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href={`/${locale}/testimonials`}
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium">
                {isAr ? "شوف كل الآراء" : "View All Reviews"}
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ── COURSES ──────────────────────────────────────────── */}
        <section>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-blue-500/20 border border-blue-500/40 text-blue-300 uppercase tracking-wider mb-3">
                {isAr ? "كورساتنا" : "Our Courses"}
              </span>
              <h2 className="text-3xl font-black text-white mb-3">{isAr ? "الكورسات اللي بنقدمها" : "Courses We Offer"}</h2>
              <p className="text-slate-400">{isAr ? "9 كورسات لايف على Zoom — لايف + تسجيلات + أكسيس على المنصة" : "9 live Zoom courses — live sessions + recordings + platform access"}</p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {COURSES.map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                  {c.slug ? (
                    <Link href={`/${locale}/courses/${c.slug}`}
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all hover:scale-[1.02] ${c.featured ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/40" : "bg-slate-800/50 border-slate-700/50 hover:border-slate-600"}`}>
                      <span className="text-3xl">{c.icon}</span>
                      <div className="flex-1">
                        <p className="text-white font-semibold text-sm leading-snug">{isAr ? c.titleAr : c.titleEn}</p>
                      </div>
                      {c.featured && <span className="text-xs bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 px-2 py-0.5 rounded-full">⭐</span>}
                    </Link>
                  ) : (
                    <div className="flex items-center gap-4 p-4 rounded-2xl border bg-slate-800/50 border-slate-700/50">
                      <span className="text-3xl">{c.icon}</span>
                      <div className="flex-1">
                        <p className="text-white font-semibold text-sm leading-snug">{isAr ? c.titleAr : c.titleEn}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href={`/${locale}/courses`}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                {isAr ? "عرض جميع الكورسات" : "View All Courses"}
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ── WHAT WE OFFER ────────────────────────────────────── */}
        <section>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-orange-500/20 border border-orange-500/40 text-orange-300 uppercase tracking-wider mb-3">
                {isAr ? "خدماتنا" : "Our Services"}
              </span>
              <h2 className="text-3xl font-black text-white mb-3">{isAr ? "إيه اللي بنقدمه" : "What We Provide"}</h2>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {OFFERINGS.map((o, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="glass rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                  <span className="text-4xl mb-4 block">{o.icon}</span>
                  <h3 className="text-white font-bold mb-2">{isAr ? o.titleAr : o.titleEn}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{isAr ? o.descAr : o.descEn}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── SOCIAL LINKS ─────────────────────────────────────── */}
        <section>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-pink-500/20 border border-pink-500/40 text-pink-300 uppercase tracking-wider mb-3">
                {isAr ? "تواصل معنا" : "Connect With Us"}
              </span>
              <h2 className="text-3xl font-black text-white mb-3">{isAr ? "لينكاتنا كلها" : "All Our Links"}</h2>
              <p className="text-slate-400">{isAr ? "تابعنا على كل منصة أو تواصل معنا مباشرة" : "Follow us on every platform or contact us directly"}</p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {SOCIAL_LINKS.map((s, i) => (
                <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className={`flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br ${s.bg} border ${s.border} hover:scale-[1.03] transition-all duration-300 group`}>
                  <div className={`${s.color} flex-shrink-0`}>{s.icon}</div>
                  <div className="min-w-0">
                    <p className="text-white font-bold text-sm">{s.label}</p>
                    <p className="text-slate-400 text-xs truncate">{s.handle}</p>
                    <p className={`text-xs ${s.color} mt-0.5`}>{isAr ? s.sub.ar : s.sub.en}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 border border-blue-500/30 p-10 text-center">
            <h2 className="text-3xl font-black text-white mb-4">
              {isAr ? "مستعد تبدأ رحلتك في تحليل البيانات؟" : "Ready to Start Your Data Analytics Journey?"}
            </h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              {isAr ? "تواصل معنا على واتساب أو سجّل في الكورس مباشرة" : "Contact us on WhatsApp or enroll directly in the course"}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="https://wa.me/201226929392" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3.5 rounded-2xl transition-colors shadow-lg shadow-green-900/40">
                <MessageCircle className="w-5 h-5" />
                {isAr ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
              </a>
              <Link href={`/${locale}/courses`}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-2xl transition-colors shadow-lg shadow-blue-900/40">
                <BookOpen className="w-5 h-5" />
                {isAr ? "تصفح الكورسات" : "Browse Courses"}
              </Link>
            </div>
          </motion.div>
        </section>

      </div>
    </main>
  );
}
