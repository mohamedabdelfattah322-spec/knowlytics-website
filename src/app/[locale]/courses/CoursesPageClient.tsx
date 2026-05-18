"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Search, MessageCircle, CheckCircle } from "lucide-react";
import CourseCard from "@/components/shared/CourseCard";
import { Course } from "@/types";

const officeCoursesAr = [
  {
    icon: "📊",
    title: "Microsoft Excel",
    color: "from-green-600 to-emerald-600",
    border: "border-green-500/30",
    badge: "bg-green-500/10 text-green-400 border-green-500/20",
    topics: [
      "واجهة البرنامج والأساسيات",
      "الصيغ والدوال الأساسية والمتقدمة",
      "تنسيق الخلايا والجداول",
      "الرسوم البيانية والمخططات",
      "الجداول المحورية (Pivot Tables)",
      "التنسيق الشرطي",
      "فلترة وترتيب البيانات",
      "مشاركة وحماية الملفات",
    ],
  },
  {
    icon: "📝",
    title: "Microsoft Word",
    color: "from-blue-600 to-cyan-600",
    border: "border-blue-500/30",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    topics: [
      "واجهة البرنامج وأدوات الكتابة",
      "تنسيق النصوص والفقرات",
      "إنشاء الجداول وتنسيقها",
      "إدراج الصور والأشكال",
      "أنماط العناوين وجدول المحتويات",
      "التذييل والترقيم والهوامش",
      "كتابة التقارير الاحترافية",
      "مشاركة وطباعة المستندات",
    ],
  },
  {
    icon: "🎨",
    title: "Microsoft PowerPoint",
    color: "from-orange-600 to-red-600",
    border: "border-orange-500/30",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    topics: [
      "واجهة البرنامج والشرائح",
      "تصميم القوالب والثيمات",
      "إدراج النصوص والصور والأشكال",
      "الرسوم البيانية وعرض البيانات",
      "التأثيرات والانتقالات (Animations)",
      "تقديم البيانات بصرياً",
      "عروض احترافية ومقنعة",
      "نصائح تقديم العروض أمام الجمهور",
    ],
  },
  {
    icon: "🗄️",
    title: "Microsoft Access",
    color: "from-purple-600 to-violet-600",
    border: "border-purple-500/30",
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    topics: [
      "مفاهيم قواعد البيانات",
      "إنشاء الجداول وتحديد الأنواع",
      "العلاقات بين الجداول",
      "الاستعلامات (Queries)",
      "النماذج (Forms) لإدخال البيانات",
      "التقارير (Reports) الاحترافية",
      "ماكروز الأتمتة",
      "تصدير البيانات وتكاملها مع Excel",
    ],
  },
];

const officeCoursesEn = [
  {
    icon: "📊",
    title: "Microsoft Excel",
    color: "from-green-600 to-emerald-600",
    border: "border-green-500/30",
    badge: "bg-green-500/10 text-green-400 border-green-500/20",
    topics: [
      "Program Interface & Basics",
      "Basic & Advanced Formulas",
      "Cell & Table Formatting",
      "Charts & Graphs",
      "Pivot Tables",
      "Conditional Formatting",
      "Filtering & Sorting Data",
      "Sharing & Protecting Files",
    ],
  },
  {
    icon: "📝",
    title: "Microsoft Word",
    color: "from-blue-600 to-cyan-600",
    border: "border-blue-500/30",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    topics: [
      "Interface & Writing Tools",
      "Text & Paragraph Formatting",
      "Creating & Formatting Tables",
      "Inserting Images & Shapes",
      "Heading Styles & Table of Contents",
      "Footers, Numbering & Margins",
      "Professional Report Writing",
      "Sharing & Printing Documents",
    ],
  },
  {
    icon: "🎨",
    title: "Microsoft PowerPoint",
    color: "from-orange-600 to-red-600",
    border: "border-orange-500/30",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    topics: [
      "Interface & Slide Management",
      "Templates & Themes Design",
      "Text, Images & Shapes",
      "Charts & Data Visualization",
      "Animations & Transitions",
      "Visual Data Presentation",
      "Professional & Persuasive Decks",
      "Presentation Tips & Delivery",
    ],
  },
  {
    icon: "🗄️",
    title: "Microsoft Access",
    color: "from-purple-600 to-violet-600",
    border: "border-purple-500/30",
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    topics: [
      "Database Concepts",
      "Creating Tables & Data Types",
      "Table Relationships",
      "Queries",
      "Forms for Data Entry",
      "Professional Reports",
      "Macro Automation",
      "Exporting & Integration with Excel",
    ],
  },
];

interface CoursesPageClientProps {
  courses: Course[];
  locale: string;
}

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const levelLabelsAr: Record<string, string> = {
  "All Levels": "\u0627\u0644\u0643\u0644",
  "Beginner": "\u0645\u0628\u062a\u062f\u0626",
  "Intermediate": "\u0645\u062a\u0648\u0633\u0637",
  "Advanced": "\u0645\u062a\u0642\u062f\u0645",
};
const categories = ["All", "Excel", "SQL", "Power BI", "Python", "AI", "Business"];

export default function CoursesPageClient({ courses, locale }: CoursesPageClientProps) {
  const t = useTranslations("courses");
  const isAr = locale === "ar";
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All Levels");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const title = isAr ? c.titleAr : c.titleEn;
      const matchSearch = title.toLowerCase().includes(search.toLowerCase());
      const matchLevel = level === "All Levels" || c.level === level;
      const matchCat = category === "All" || c.category === category;
      return matchSearch && matchLevel && matchCat;
    });
  }, [courses, search, level, category, isAr]);

  return (
    <>
      {/* Page Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-slate-950 via-blue-950/30 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 dots-bg opacity-20" />
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {isAr ? "\u0580 \u062c\u0645\u064a\u0639 \u0627\u0644\u062f\u0648\u0631\u0627\u062a" : "All Courses"}
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-4">{t("title")}</h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">{t("subtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-slate-950 border-b border-white/10 sticky top-20 z-30 backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full ps-9 pe-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {levels.map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={"px-3 py-2 rounded-lg text-xs font-medium transition-all " + (level === l ? "bg-blue-600 text-white" : "bg-white/5 border border-white/20 text-slate-400 hover:text-white")}
                >
                  {isAr ? levelLabelsAr[l] : l}
                </button>
              ))}
            </div>

            <div className="flex gap-2 flex-wrap">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={"px-3 py-2 rounded-lg text-xs font-medium transition-all " + (category === c ? "bg-purple-600 text-white" : "bg-white/5 border border-white/20 text-slate-400 hover:text-white")}
                >
                  {c === "All" ? (isAr ? "\u0627\u0644\u0643\u0644" : "All") : c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">&#128269;</p>
              <p className="text-slate-400">
                {isAr ? "\u0644\u0627 \u062a\u0648\u062c\u062f \u062f\u0648\u0631\u0627\u062a \u062a\u0637\u0627\u0628\u0642 \u0628\u062d\u062b\u0643" : "No courses match your search"}
              </p>
            </div>
          ) : (
            <>
              <p className="text-slate-400 text-sm mb-6">
                {filtered.length} {isAr ? "\u062f\u0648\u0631\u0629 \u0645\u062a\u0627\u062d\u0629" : "courses found"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((course, i) => (
                  <CourseCard key={course.id} course={course} locale={locale} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Microsoft Office Section */}
      <section className="py-16 bg-slate-900 border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
              \ud83d\udda5\ufe0f {isAr ? "\u0643\u0648\u0631\u0633\u0627\u062a \u0645\u0627\u064a\u0643\u0631\u0648\u0633\u0648\u0641\u062a \u0623\u0648\u0641\u064a\u0633" : "Microsoft Office Courses"}
            </span>
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
              {isAr ? "\u0623\u062a\u0642\u0646 \u062d\u0632\u0645\u0629 \u0645\u0627\u064a\u0643\u0631\u0648\u0633\u0648\u0641\u062a \u0623\u0648\u0641\u064a\u0633" : "Master Microsoft Office Suite"}
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              {isAr
                ? "\u0643\u0648\u0631\u0633\u0627\u062a \u0627\u062d\u062a\u0631\u0627\u0641\u064a\u0629 \u0641\u064a Excel \u0648Word \u0648PowerPoint \u0648Access \u2014 \u062a\u0639\u0644\u0651\u0645 \u0645\u0646 \u0627\u0644\u0635\u0641\u0631 \u062d\u062a\u0649 \u0627\u0644\u0627\u062d\u062a\u0631\u0627\u0641 \u0628\u0623\u0633\u0644\u0648\u0628 \u0639\u0645\u0644\u064a 100%"
                : "Professional courses in Excel, Word, PowerPoint & Access \u2014 learn from zero to pro with 100% hands-on approach"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {(isAr ? officeCoursesAr : officeCoursesEn).map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-slate-950 border ${course.border} rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 flex flex-col`}
              >
                {/* Header */}
                <div className={`bg-gradient-to-br ${course.color} p-6 text-center`}>
                  <div className="text-5xl mb-3">{course.icon}</div>
                  <h3 className="text-white font-black text-lg">{course.title}</h3>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold border ${course.badge}`}>
                    {isAr ? "\u0643\u0648\u0631\u0633 \u0623\u0648\u0641\u064a\u0633" : "Office Course"}
                  </span>
                </div>

                {/* Topics */}
                <div className="p-5 flex-1">
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
                    {isAr ? "\u0645\u062d\u062a\u0648\u0649 \u0627\u0644\u0643\u0648\u0631\u0633" : "Course Content"}
                  </p>
                  <ul className="space-y-2">
                    {course.topics.map((topic, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300 text-xs leading-snug">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="p-5 pt-0">
                  <a
                    href={`https://wa.me/201226929392?text=${encodeURIComponent(`\u0623\u0631\u064a\u062f \u0627\u0644\u0627\u0633\u062a\u0641\u0633\u0627\u0631 \u0639\u0646 \u0643\u0648\u0631\u0633 ${course.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r ${course.color} text-white font-bold text-sm hover:opacity-90 transition-all`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    {isAr ? "\u0627\u0633\u062a\u0641\u0633\u0631 \u0639\u0646 \u0627\u0644\u0643\u0648\u0631\u0633" : "Enquire via WhatsApp"}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
