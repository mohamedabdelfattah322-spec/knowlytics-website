"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Gift, Star, Users, Briefcase, MessageCircle, Phone, Mail, CheckCircle, ArrowRight } from "lucide-react";

interface HeroSliderProps {
  locale: string;
}

// ─── Slide 1: Featured Course ────────────────────────────────────────────
function CourseSlide({ isAr, locale }: { isAr: boolean; locale: string }) {
  const whatsappUrl = "https://wa.me/201226929392?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%AA%D8%B3%D8%AC%D9%8A%D9%84%20%D9%81%D9%8A%20%D9%83%D9%88%D8%B1%D8%B3%20Excel%20%2B%20Power%20BI%20%2B%20AI%20%2B%20Freelance";
  return (
    <div className="relative min-h-fit lg:min-h-screen flex items-start lg:items-center overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950">
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }}
      />
      <div className="absolute top-20 end-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 start-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 lg:px-8 pt-16 pb-16 lg:pt-28 lg:pb-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: isAr ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 border border-blue-500/40 text-blue-300 uppercase tracking-wider">
                &#128308; {isAr ? "لايف" : "LIVE"}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/20 border border-yellow-500/40 text-yellow-300">
                &#11088; {isAr ? "الأكثر طلبًا" : "Most Popular"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-3 leading-tight text-white">
              {isAr ? (
                <>تحليل البيانات<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Excel + Power BI</span><br />+ AI + فريلانس</>
              ) : (
                <>Data Analysis<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Excel + Power BI</span><br />+ AI + Freelance</>
              )}
            </h1>

            <p className="text-slate-300 text-base lg:text-lg mb-3 leading-relaxed max-w-lg">
              {isAr
                ? <>الكورس الأكثر شمولًا في تحليل البيانات. تعلم <span dir="ltr">Excel & Power BI & AI</span> وكيف تشتغل فريلانسر من الصفر.</>

                : "The most comprehensive data analysis course. Learn Excel, Power BI, AI, and how to freelance as a data analyst."}
            </p>

            <div className="flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl px-4 py-3 mb-3 w-fit">
              <Gift className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <span className="text-yellow-300 text-sm font-semibold">
                {isAr ? <>🎁 هدية مجانية: <span dir="ltr">Tableau + Looker Studio</span></> : <>🎁 Free Gift: Tableau + Looker Studio course</>}
              </span>
            </div>

            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-4 w-fit animate-pulse-slow">
              <span className="text-xl">📅</span>
              <div>
                <p className="text-red-300 text-xs font-semibold uppercase tracking-wide">{isAr ? "موعد الجروب القادم" : "Next Group Date"}</p>
                <p className="text-white font-black text-base">{isAr ? "7 يونيو 2026" : "June 7, 2026"}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-500/30 border border-red-400/40 text-red-300 whitespace-nowrap">
                {isAr ? "⚡ سارع بالتسجيل!" : "⚡ Limited Seats!"}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl lg:text-4xl font-black text-white">2,500 <span className="text-xl text-slate-400">ج.م</span></span>
              <span className="text-xl text-slate-500 line-through">4,000 ج.م</span>
              <span className="px-2 py-1 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-bold">37% {isAr ? "خصم" : "OFF"}</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 text-base lg:px-7 lg:py-3.5 lg:text-lg rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold hover:from-green-500 hover:to-emerald-500 transition-all shadow-xl shadow-green-500/30 hover:-translate-y-1"
              >
                <MessageCircle className="w-5 h-5" />
                {isAr ? "احجز الآن عبر واتساب" : "Book via WhatsApp"}
              </a>
              <Link
                href={`/${locale}/courses/excel-powerbi-ai-freelance`}
                className="flex items-center gap-2 px-5 py-3 text-base lg:px-7 lg:py-3.5 lg:text-lg rounded-2xl border-2 border-white/25 text-white font-semibold hover:bg-white/10 transition-all"
              >
                {isAr ? "تفاصيل الكورس" : "Course Details"}
                <ArrowRight className={`w-5 h-5 ${isAr ? "rotate-180" : ""}`} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex flex-col gap-4"
          >
            <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-4 backdrop-blur-sm flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-blue-500/40 shadow-lg shadow-blue-500/20">
                  <img
                    src="/profile.JPG"
                    alt="Mohamed Abdelfattah"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.currentTarget.src = "https://ui-avatars.com/api/?name=Mohamed&background=3b82f6&color=fff&size=80";
                    }}
                  />
                </div>
                <div className="absolute -bottom-1 -end-1 bg-green-500 rounded-full w-4 h-4 border-2 border-slate-800 flex items-center justify-center">
                  <span className="text-white text-xs">&#10003;</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs text-blue-400 font-semibold mb-0.5">{isAr ? "المدرب" : "Instructor"}</p>
                <h3 className="text-white font-bold text-base">محمد عبدالفتاح</h3>
                <p className="text-slate-400 text-xs">{isAr ? "خبير تحليل البيانات • +7,000 متدرب" : "Data Analytics Expert • 7,000+ Trainees"}</p>
                <div className="flex items-center gap-1 mt-1">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                  <span className="text-slate-400 text-xs ms-1">5.0</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5 backdrop-blur-sm shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="ms-2 text-slate-400 text-xs">{isAr ? "محتوى الكورس" : "Course Contents"}</span>
              </div>
              {[
                { icon: "&#128202;", label: isAr ? "Excel Fundamentals & Analysis" : "Excel Fundamentals & Analysis", done: true },
                { icon: "&#128200;", label: isAr ? "Power BI & DAX & Power Query" : "Power BI & DAX & Power Query", done: true },
                { icon: "&#129302;", label: isAr ? "AI in Data Analysis" : "AI in Data Analysis", done: false },
                { icon: "&#128188;", label: isAr ? "Freelancing & Portfolio" : "Freelancing & Portfolio", done: false },
                { icon: "&#127873;", label: isAr ? "هدية: Tableau + Looker Studio" : "Gift: Tableau + Looker Studio", done: false, gift: true },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl mb-1.5 ${item.gift ? "bg-yellow-500/10 border border-yellow-500/20" : "bg-slate-900/50"}`}>
                  <span className="text-lg" dangerouslySetInnerHTML={{ __html: item.icon }} />
                  <span className={`text-xs flex-1 ${item.gift ? "text-yellow-300 font-semibold" : "text-slate-300"}`}>{item.label}</span>
                  {item.done && <CheckCircle className="w-3.5 h-3.5 text-green-400" />}
                </div>
              ))}
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-slate-400 text-xs">13 {isAr ? "محاضرة" : "sessions"} • 39 {isAr ? "ساعة" : "hrs"}</span>
                <span className="text-green-400 text-xs font-semibold">&#128308; {isAr ? "لايف" : "LIVE"}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── Slide 2: Group Training ──────────────────────────────────────────────
function GroupsSlide({ isAr }: { isAr: boolean }) {
  const groups = ["/groups/g1.jpeg", "/groups/g2.jpeg", "/groups/g3.jpeg", "/groups/g4.jpeg", "/groups/g5.jpeg", "/groups/g6.jpeg"];
  return (
    <div className="relative min-h-fit lg:min-h-screen flex items-start lg:items-center overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.1),transparent_50%)]" />

      <div className="relative container mx-auto px-4 lg:px-8 pt-16 pb-16 lg:pt-24 lg:pb-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: isAr ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-semibold">
              <Users className="w-4 h-4" /> {isAr ? "تدريب الجروبات" : "Group Training"}
            </span>
            <h2 className="text-3xl lg:text-6xl font-black text-white mb-3 leading-tight">
              {isAr ? (
                <><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">+7,000 متدرب</span><br />تدربوا معنا</>
              ) : (
                <><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">7,000+ Trainees</span><br />Trained with Us</>
              )}
            </h2>
            <p className="text-slate-300 text-lg mb-5 leading-relaxed max-w-lg">
              {isAr
                ? <>من تدريباتنا المتخصصة في <span dir="ltr">Excel</span> و<span dir="ltr">Power BI</span> و<span dir="ltr">SQL</span> و<span dir="ltr">Python</span>. متدربون من مصر والعالم العربي حققوا نتائج حقيقية في مسيرتهم المهنية.</>
                : "From our specialized training sessions in Excel, Power BI, SQL and Python. Trainees from Egypt and the Arab world who achieved real career results."}
            </p>
            <div className="flex flex-wrap gap-4 mb-5">
              {[
                { icon: "&#127891;", labelAr: "+7,000 متدرب", labelEn: "7,000+ Trained" },
                { icon: "&#127970;", labelAr: "+8 شركات", labelEn: "8+ Companies" },
                { icon: "&#11088;", labelAr: "تقييم 5/5", labelEn: "5/5 Rating" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                  <span className="text-xl" dangerouslySetInnerHTML={{ __html: s.icon }} />
                  <span className="text-white font-semibold text-sm">{isAr ? s.labelAr : s.labelEn}</span>
                </div>
              ))}
            </div>
            <a
              href="https://wa.me/201226929392?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A7%D9%84%D8%AA%D8%AF%D8%B1%D9%8A%D8%A8%20%D8%A7%D9%84%D9%85%D8%AC%D9%85%D9%88%D8%B9%D9%8A"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg hover:from-emerald-500 hover:to-teal-500 transition-all shadow-xl hover:-translate-y-1"
            >
              <MessageCircle className="w-5 h-5" />
              {isAr ? "انضم للجروب القادم" : "Join the Next Group"}
            </a>
            <p className="text-emerald-300/70 text-sm mt-3 flex items-center gap-1.5">
              <span>📅</span>
              {isAr ? "موعد الجروب القادم: 7 يونيو 2026" : "Next group: June 7, 2026"}
            </p>
          </motion.div>

          {/* Desktop grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:grid grid-cols-3 gap-3"
          >
            {groups.map((src, i) => (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden bg-slate-800 border border-white/10 ${i === 0 ? "col-span-2 row-span-1 h-44" : "h-44"}`}
              >
                <img
                  src={src}
                  alt={`Group training ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.style.display = "none";
                    const parent = el.parentElement!;
                    parent.style.background = `linear-gradient(135deg, ${["#1e3a5f","#1a3a2a","#2d1b4e","#1a2e4a","#2a1a0a","#1a2a3a"][i]} 0%, #0f172a 100%)`;
                    parent.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.4);font-size:2rem;">&#128248;</div>`;
                  }}
                />
              </div>
            ))}
          </motion.div>

          {/* Mobile horizontal scroll */}
          <div className="flex lg:hidden gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {groups.map((src, i) => (
              <div key={i} className="flex-shrink-0 w-40 h-28 rounded-xl overflow-hidden bg-slate-800 border border-white/10">
                <img
                  src={src}
                  alt={`Group training ${i + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.style.display = "none";
                    el.parentElement!.style.background = `linear-gradient(135deg, ${["#1e3a5f","#1a3a2a","#2d1b4e","#1a2e4a","#2a1a0a","#1a2a3a"][i]} 0%, #0f172a 100%)`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Slide 3: Services ───────────────────────────────────────────────────────────────────
function ServicesSlide({ isAr, locale }: { isAr: boolean; locale: string }) {
  const services = [
    { icon: "&#128202;", titleAr: "تطوير لوحات المعلومات", titleEn: "Dashboard Development", descAr: "Power BI & Excel & Python", descEn: "Power BI & Excel & Python" },
    { icon: "&#127962;", titleAr: "التدريب المؤسسي", titleEn: "Corporate Training", descAr: "للشركات والمؤسسات", descEn: "For Companies & Organizations" },
    { icon: "&#129302;", titleAr: "حلول الذكاء الاصطناعي", titleEn: "AI Solutions", descAr: "أتمتة وتحليلات بالـ AI", descEn: "AI Automation & Analytics" },
    { icon: "&#128100;", titleAr: "استشارات فردية", titleEn: "Individual Consulting", descAr: "جلسات 1-on-1 مخصصة", descEn: "Personalized 1-on-1 Sessions" },
  ];

  return (
    <div className="relative min-h-fit lg:min-h-screen flex items-start lg:items-center overflow-hidden bg-gradient-to-br from-purple-950 via-slate-900 to-violet-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_60%)]" />

      <div className="relative container mx-auto px-4 lg:px-8 pt-16 pb-16 lg:pt-28 lg:pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-semibold">
            <Briefcase className="w-4 h-4" /> {isAr ? "خدماتنا الاحترافية" : "Our Professional Services"}
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-4">
            {isAr ? (
              <><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400">اكتشف خدماتنا</span></>
            ) : (
              <><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400">Discover Our Services</span></>
            )}
          </h2>
          <p className="text-slate-300 text-lg mb-12 max-w-xl mx-auto">
            {isAr
              ? "حلول متكاملة لتحليل البيانات والذكاء الاصطناعي للأفراد والشركات"
              : "Comprehensive data analytics and AI solutions for individuals and businesses"}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-purple-500/30 transition-all group cursor-pointer"
              >
                <div className="text-4xl mb-3" dangerouslySetInnerHTML={{ __html: s.icon }} />
                <h3 className="text-white font-bold mb-1 text-sm">{isAr ? s.titleAr : s.titleEn}</h3>
                <p className="text-slate-400 text-xs">{isAr ? s.descAr : s.descEn}</p>
              </motion.div>
            ))}
          </div>

          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold text-lg hover:from-purple-500 hover:to-violet-500 transition-all shadow-xl shadow-purple-500/30 hover:-translate-y-1"
          >
            {isAr ? "اكتشف كل الخدمات" : "Explore All Services"}
            <ArrowRight className={`w-5 h-5 ${isAr ? "rotate-180" : ""}`} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Slide 4: HR Data Analysis Course ─────────────────────────────────────────
function HRCourseSlide({ isAr }: { isAr: boolean }) {
  const waUrl = "https://wa.me/201226929392?text=" + encodeURIComponent("أريد معرفة تفاصيل كورس HR Data Analysis");

  const sections = [
    {
      num: "01",
      gradient: "from-blue-600 to-cyan-600",
      titleAr: "أهم الأدوات والدوال في Excel",
      titleEn: "Excel Tools & Functions",
      subAr: "تطوير مستواك قبل تحليل البيانات",
      subEn: "Level up before diving into analysis",
      items: [],
    },
    {
      num: "02",
      gradient: "from-emerald-600 to-teal-600",
      titleAr: "تحليل البيانات بـ Excel",
      titleEn: "Data Analysis with Excel",
      subAr: "", subEn: "",
      items: ["Power Query", "Pivot Table", "Data Visualization", "Interactive Dashboard", "Analysis Tools", "Statistics Functions", "AI"],
    },
    {
      num: "03",
      gradient: "from-yellow-500 to-orange-500",
      titleAr: "تحليل البيانات بـ Power BI",
      titleEn: "Data Analysis with Power BI",
      subAr: "", subEn: "",
      items: ["Power Query", "Visualization", "Interactive Dashboard", "Data Model", "DAX Functions", "Power BI Service", "AI"],
    },
    {
      num: "04",
      gradient: "from-purple-600 to-pink-600",
      titleAr: "الذكاء الاصطناعي في التحليل",
      titleEn: "AI in Data Analysis",
      subAr: "كيف يخدمك الـ AI في تقاريرك اليومية",
      subEn: "AI in your daily HR reports",
      items: [],
    },
  ];

  const dashboards = [
    "Headcount Report",
    "Turnover & Attrition Report",
    "Attendance & Absence Report",
    "Salary & Compensation Report",
    "Performance Appraisal Report",
    "Recruitment Report",
    "Training & Development Report",
    "Diversity & Gender Ratio Report",
    "Employee Satisfaction Report",
  ];

  return (
    <div className="relative min-h-fit lg:min-h-screen flex items-start lg:items-center overflow-hidden bg-gradient-to-br from-rose-950 via-slate-900 to-pink-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(244,63,94,0.2),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.1),transparent_50%)]" />
      <div className="absolute top-20 start-10 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 lg:px-8 pt-16 pb-16 lg:pt-24 lg:pb-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center flex-wrap gap-2 mb-3">
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-rose-500/20 border border-rose-500/40 text-rose-300">🏢 {isAr ? "كورس جديد" : "New Course"}</span>
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-yellow-500/20 border border-yellow-500/40 text-yellow-300">📅 {isAr ? "23 مايو 2026" : "May 23, 2026"}</span>
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">🎯 {isAr ? "عملي 100%" : "100% Practical"}</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-2 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">HR Data Analysis</span>
            </h2>
            <p className="text-slate-300 text-sm lg:text-base">
              {isAr
                ? <><span dir="ltr">Excel & Power BI & AI</span> — هنشتغل على تقارير الـ HR فقط</>
                : "Using Excel & Power BI & AI — focused exclusively on HR reports"}
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left: Curriculum Sections */}
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">{isAr ? "محتوى الكورس — 4 أقسام" : "Course Content — 4 Sections"}</p>
              <div className="space-y-2.5">
                {sections.map((sec, i) => (
                  <div key={i} className="flex gap-3 items-start bg-white/5 border border-white/10 rounded-xl p-3 hover:border-white/20 transition-colors">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${sec.gradient} flex items-center justify-center text-white text-xs font-black flex-shrink-0`}>
                      {sec.num}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm leading-snug">{isAr ? sec.titleAr : sec.titleEn}</p>
                      {(isAr ? sec.subAr : sec.subEn) && (
                        <p className="text-slate-400 text-xs mt-0.5">{isAr ? sec.subAr : sec.subEn}</p>
                      )}
                      {sec.items.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {sec.items.map((item, j) => (
                            <span key={j} className="px-1.5 py-0.5 rounded text-xs bg-white/10 text-slate-300 font-medium" dir="ltr">{item}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Dashboards */}
            <div className="hidden lg:block">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">📊 {isAr ? "داشبوردات هنبنيها في الكورس" : "Dashboards We'll Build"}</p>
              <div className="space-y-1.5">
                {dashboards.map((dash, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-lg px-3 py-2 hover:border-rose-500/20 transition-colors">
                    <span className="w-4 h-4 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 text-xs flex-shrink-0">✓</span>
                    <span className="text-slate-300 text-xs font-medium" dir="ltr">{dash}</span>
                  </div>
                ))}
              </div>
              <p className="text-rose-300 text-xs mt-3 font-semibold">
                🎯 {isAr ? "في النهاية: داشبورد كاملة بكل الماتريكس الشهرية" : "Final: Full dashboard with all monthly metrics"}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold hover:from-rose-500 hover:to-pink-500 transition-all shadow-xl shadow-rose-500/30 hover:-translate-y-1"
            >
              <MessageCircle className="w-5 h-5" />
              {isAr ? "احجز مقعدك الآن" : "Reserve Your Seat"}
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl border-2 border-white/25 text-white font-semibold hover:bg-white/10 transition-all"
            >
              {isAr ? "اعرف التفاصيل" : "Get Details"}
            </a>
          </div>
          <p className="text-center text-rose-300/70 text-xs mt-3">
            📅 {isAr ? "تاريخ الانطلاق: 23 مايو 2026 — الأماكن محدودة!" : "Start date: May 23, 2026 — Limited seats!"}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Slide 5: Consultation Booking ──────────────────────────────────────────────
interface ConsultationSlideProps {
  isAr: boolean;
  onFormFocus: () => void;
  onFormBlur: () => void;
}

function ConsultationSlide({ isAr, onFormFocus, onFormBlur }: ConsultationSlideProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `مرحبًا، أريد حجز استشارة.\nالاسم: ${name}\nالهاتف: ${phone}\nالموضوع: ${topic}`
    );
    window.open(`https://wa.me/201226929392?text=${msg}`, "_blank");
    setSent(true);
  };

  return (
    <div className="relative min-h-fit lg:min-h-screen flex items-start lg:items-center overflow-hidden bg-gradient-to-br from-orange-950 via-slate-900 to-rose-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(251,146,60,0.15),transparent_50%)]" />

      <div className="relative container mx-auto px-4 lg:px-8 pt-16 pb-16 lg:pt-28 lg:pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: isAr ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-start"
          >
            <div className="relative inline-block mb-3">
              <div className="w-36 h-36 lg:w-48 lg:h-48 rounded-3xl overflow-hidden border-4 border-orange-500/40 shadow-2xl shadow-orange-500/20 mx-auto lg:mx-0">
                <img
                  src="/profile.JPG"
                  alt="Mohamed Abdelfattah"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://ui-avatars.com/api/?name=Mohamed&background=f97316&color=fff&size=200";
                  }}
                />
              </div>
              <div className="absolute -bottom-2 -end-2 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full p-2 shadow-lg">
                <Star className="w-4 h-4 text-white fill-white" />
              </div>
            </div>

            <h2 className="text-3xl lg:text-5xl font-black text-white mb-3 leading-tight">
              {isAr ? (
                <><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">احجز استشارتك</span><br />الآن</>
              ) : (
                <><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">Book Your</span><br />Consultation Now</>
              )}
            </h2>
            <p className="text-slate-300 text-base mb-4 leading-relaxed max-w-md mx-auto lg:mx-0">
              {isAr
                ? "محمد عبدالفتاح — خبير تحليل البيانات. احجز جلسة استشارية واكتشف أفضل مسار لك في تحليل البيانات."
                : "Mohamed Abdelfattah — Data Analytics Expert. Book a consultation session and discover the best path for you in data analytics."}
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <a href="mailto:hello@knowlyticshub.com" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
                <Mail className="w-4 h-4" /> hello@knowlyticshub.com
              </a>
              <a href="https://wa.me/201226929392" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
                <Phone className="w-4 h-4" /> <span dir="ltr">+201226929392</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-slate-800/60 border border-white/10 rounded-3xl p-7 backdrop-blur-sm shadow-2xl">
              {sent ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-white font-bold text-xl mb-2">{isAr ? "تم إرسال طلبك!" : "Request Sent!"}</h3>
                  <p className="text-slate-400">{isAr ? "سيتواصل معك محمد قريبًا على واتساب." : "Mohamed will contact you soon on WhatsApp."}</p>
                  <button onClick={() => setSent(false)} className="mt-4 text-blue-400 hover:text-blue-300 text-sm underline">
                    {isAr ? "إرسال طلب آخر" : "Send another request"}
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-white font-bold text-xl mb-5">
                    {isAr ? "سجّل بياناتك وسيتواصل معك محمد" : "Fill in your details and Mohamed will contact you"}
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4" dir={isAr ? "rtl" : "ltr"}>
                    <div>
                      <label className="text-slate-400 text-sm mb-1 block">{isAr ? "الاسم" : "Your Name"} *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        onFocus={onFormFocus}
                        onBlur={onFormBlur}
                        placeholder={isAr ? "اسمك الكريم" : "Your full name"}
                        className="w-full bg-slate-900/80 border border-slate-600 focus:border-orange-500 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors placeholder-slate-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm mb-1 block">{isAr ? "رقم الواتساب" : "WhatsApp Number"} *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        onFocus={onFormFocus}
                        onBlur={onFormBlur}
                        placeholder="+201xxxxxxxxx"
                        dir="ltr"
                        className="w-full bg-slate-900/80 border border-slate-600 focus:border-orange-500 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors placeholder-slate-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm mb-1 block">{isAr ? "موضوع الاستشارة" : "Consultation Topic"}</label>
                      <select
                        value={topic}
                        onChange={e => setTopic(e.target.value)}
                        onFocus={onFormFocus}
                        onBlur={onFormBlur}
                        className="w-full bg-slate-900/80 border border-slate-600 focus:border-orange-500 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                      >
                        <option value="">{isAr ? "اختر الموضوع" : "Select topic"}</option>
                        <option value="اختيار الكورس المناسب">{isAr ? "اختيار الكورس المناسب" : "Choose the right course"}</option>
                        <option value="تدريب مؤسسي">{isAr ? "تدريب مؤسسي للشركة" : "Corporate training"}</option>
                        <option value="مسار تحليل البيانات">{isAr ? "مسار تحليل البيانات" : "Data analytics career path"}</option>
                        <option value="تطوير لوحة معلومات">{isAr ? "تطوير لوحة معلومات" : "Dashboard development"}</option>
                        <option value="أخرى">{isAr ? "أخرى" : "Other"}</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 text-white font-bold text-base hover:from-orange-500 hover:to-rose-500 transition-all shadow-lg shadow-orange-500/30 hover:-translate-y-0.5"
                    >
                      <MessageCircle className="w-5 h-5" />
                      {isAr ? "احجز عبر واتساب" : "Book via WhatsApp"}
                    </button>
                    <p className="text-slate-500 text-xs text-center">
                      {isAr ? "سيتم توجيهك لواتساب لتأكيد الحجز" : "You will be redirected to WhatsApp to confirm booking"}
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Slider ─────────────────────────────────────────────────────────────────────────────
const SLIDES = ["course", "groups", "services", "hr", "consultation"] as const;

export default function HeroSlider({ locale }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout>();
  const isAr = locale === "ar";

  const pauseSlider = () => setIsPlaying(false);
  const resumeSlider = () => setIsPlaying(true);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % SLIDES.length);
      }, 7000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  const goTo = (idx: number) => {
    setCurrent((idx + SLIDES.length) % SLIDES.length);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 15000);
  };
  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  const labels = {
    ar: ["كورس مميز", "تدريب الجروبات", "خدماتنا", "HR Data Analysis", "استشارتك"],
    en: ["Featured Course", "Group Training", "Our Services", "HR Data Analysis", "Consultation"],
  };

  return (
    <section className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {current === 0 && <CourseSlide isAr={isAr} locale={locale} />}
          {current === 1 && <GroupsSlide isAr={isAr} />}
          {current === 2 && <ServicesSlide isAr={isAr} locale={locale} />}
          {current === 3 && <HRCourseSlide isAr={isAr} />}
          {current === 4 && <ConsultationSlide isAr={isAr} onFormFocus={pauseSlider} onFormBlur={resumeSlider} />}
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prev}
        className="absolute start-4 top-1/2 -translate-y-1/2 w-10 h-10 z-20 rounded-full bg-black/30 border border-white/20 flex items-center justify-center text-white hover:bg-black/50 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className={`w-5 h-5 ${isAr ? "rotate-180" : ""}`} />
      </button>
      <button
        onClick={next}
        className="absolute end-4 top-1/2 -translate-y-1/2 w-10 h-10 z-20 rounded-full bg-black/30 border border-white/20 flex items-center justify-center text-white hover:bg-black/50 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className={`w-5 h-5 ${isAr ? "rotate-180" : ""}`} />
      </button>

      <div className="absolute bottom-4 start-0 end-0 z-20 flex items-center justify-center gap-2 px-4">
        {/* Mobile: dots only */}
        <div className="flex lg:hidden gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40"
              }`}
            />
          ))}
        </div>
        {/* Desktop: labeled pills */}
        <div className="hidden lg:flex gap-2 flex-wrap justify-center">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 text-xs font-semibold ${
                i === current
                  ? "bg-white text-slate-900 shadow-lg"
                  : "bg-white/15 text-white hover:bg-white/25 border border-white/20"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${i === current ? "bg-blue-600" : "bg-white/60"}`} />
              {(isAr ? labels.ar : labels.en)[i]}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
