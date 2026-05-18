"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { CheckCircle, XCircle, ChevronRight, RotateCcw, Award, TrendingUp, Briefcase } from "lucide-react";

interface InterviewAssessmentPageProps {
  params: { locale: string };
}

const questions = [
  { id: "1", topic: "excel", questionEn: "What is the difference between VLOOKUP and INDEX-MATCH?", questionAr: "ما الفرق بين VLOOKUP وINDEX-MATCH؟", options: { en: ["No difference", "INDEX-MATCH is more flexible and can look left", "VLOOKUP is faster always", "INDEX-MATCH only works with numbers"], ar: ["لا فرق", "INDEX-MATCH أكثر مرونة ويمكنه البحث يسارًا", "VLOOKUP دائمًا أسرع", "INDEX-MATCH يعمل مع الأرقام فقط"] }, correctAnswer: 1 },
  { id: "2", topic: "sql", questionEn: "What does a LEFT JOIN return?", questionAr: "ماذا يعيد LEFT JOIN؟", options: { en: ["Only matching rows", "All rows from left table + matching right rows", "Only right table rows", "All rows from both tables"], ar: ["الصفوف المطابقة فقط", "جميع صفوف الجدول الأيسر + الصفوف المطابقة من الأيمن", "صفوف الجدول الأيمن فقط", "جميع الصفوف من الجدولين"] }, correctAnswer: 1 },
  { id: "3", topic: "powerbi", questionEn: "What is DAX in Power BI?", questionAr: "ما هو DAX في Power BI؟", options: { en: ["A database system", "Data Analysis Expressions – formula language", "A chart type", "A data connector"], ar: ["نظام قاعدة بيانات", "تعبيرات تحليل البيانات – لغة صيغ", "نوع مخطط", "موصل بيانات"] }, correctAnswer: 1 },
  { id: "4", topic: "python", questionEn: "Which Python library is used for data manipulation?", questionAr: "أي مكتبة Python تُستخدم للتعامل مع البيانات؟", options: { en: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"], ar: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"] }, correctAnswer: 1 },
  { id: "5", topic: "concepts", questionEn: "What is the difference between structured and unstructured data?", questionAr: "ما الفرق بين البيانات المنظمة وغير المنظمة؟", options: { en: ["No difference", "Structured has defined schema, unstructured doesn't", "Unstructured is always bigger", "Structured is only numbers"], ar: ["لا فرق", "المنظمة لها مخطط محدد، وغير المنظمة لا", "غير المنظمة دائمًا أكبر", "المنظمة أرقام فقط"] }, correctAnswer: 1 },
  { id: "6", topic: "statistics", questionEn: "What does standard deviation measure?", questionAr: "ماذا يقيس الانحراف المعياري؟", options: { en: ["The average of data", "The middle value", "The spread of data around the mean", "The maximum value"], ar: ["متوسط البيانات", "القيمة الوسطى", "انتشار البيانات حول المتوسط", "القيمة القصوى"] }, correctAnswer: 2 },
  { id: "7", topic: "kpis", questionEn: "What makes a good KPI?", questionAr: "ما الذي يجعل مؤشر الأداء جيدًا؟", options: { en: ["It should be complex", "It should be Specific, Measurable, and Actionable", "It should cover everything", "It should only be financial"], ar: ["يجب أن يكون معقدًا", "يجب أن يكون محددًا وقابلًا للقياس وقابلًا للتنفيذ", "يجب أن يغطي كل شيء", "يجب أن يكون ماليًا فقط"] }, correctAnswer: 1 },
  { id: "8", topic: "reporting", questionEn: "What is the purpose of an executive summary in a business report?", questionAr: "ما الغرض من الملخص التنفيذي في تقرير الأعمال؟", options: { en: ["To include all data details", "To provide a high-level overview for decision makers", "To list all employees", "To show raw data"], ar: ["لتضمين جميع تفاصيل البيانات", "لتقديم نظرة عامة عالية المستوى لصانعي القرار", "لسرد جميع الموظفين", "لإظهار البيانات الخام"] }, correctAnswer: 1 },
  { id: "9", topic: "dashboards", questionEn: "What is the most important principle of dashboard design?", questionAr: "ما أهم مبدأ في تصميم لوحة المعلومات؟", options: { en: ["Use as many colors as possible", "Clarity and focusing on what matters", "Show all available data", "Use complex charts"], ar: ["استخدام أكبر عدد من الألوان", "الوضوح والتركيز على ما يهم", "إظهار جميع البيانات المتاحة", "استخدام مخططات معقدة"] }, correctAnswer: 1 },
  { id: "10", topic: "sql", questionEn: "What does GROUP BY do in SQL?", questionAr: "ماذا يفعل GROUP BY في SQL؟", options: { en: ["Sorts results", "Groups rows sharing a common value for aggregation", "Joins tables", "Filters rows"], ar: ["يرتب النتائج", "يجمع الصفوف التي تشترك في قيمة مشتركة للتجميع", "يربط الجداول", "يصفي الصفوف"] }, correctAnswer: 1 },
  { id: "11", topic: "powerbi", questionEn: "What is the difference between a measure and a calculated column in Power BI?", questionAr: "ما الفرق بين المقياس والعمود المحسوب في Power BI؟", options: { en: ["No difference", "Measures are calculated at query time; columns are static", "Columns are faster", "Measures are stored in tables"], ar: ["لا فرق", "تُحسب المقاييس عند الاستعلام؛ والأعمدة ثابتة", "الأعمدة أسرع", "المقاييس مخزنة في الجداول"] }, correctAnswer: 1 },
  { id: "12", topic: "concepts", questionEn: "What is ETL?", questionAr: "ما هو ETL؟", options: { en: ["A programming language", "Extract, Transform, Load – data pipeline process", "A database type", "A visualization tool"], ar: ["لغة برمجة", "استخراج وتحويل وتحميل – عملية خط بيانات", "نوع قاعدة بيانات", "أداة تصور بيانات"] }, correctAnswer: 1 },
];

const topics: Record<string, { en: string; ar: string }> = {
  excel: { en: "Excel", ar: "Excel" },
  sql: { en: "SQL", ar: "SQL" },
  powerbi: { en: "Power BI", ar: "Power BI" },
  python: { en: "Python", ar: "Python" },
  concepts: { en: "Data Concepts", ar: "مفاهيم البيانات" },
  statistics: { en: "Statistics", ar: "الإحصاء" },
  kpis: { en: "KPIs", ar: "مؤشرات الأداء" },
  reporting: { en: "Reporting", ar: "التقارير" },
  dashboards: { en: "Dashboards", ar: "لوحات المعلومات" },
};

export default function InterviewAssessmentPage({ params: { locale } }: InterviewAssessmentPageProps) {
  const t = useTranslations("interviewAssessment");
  const isAr = locale === "ar";
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const score = answers.filter((a, i) => a === questions[i]?.correctAnswer).length;
  const pct = Math.round((score / questions.length) * 100);

  const handleAnswer = (idx: number) => setSelected(idx);

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    if (current + 1 >= questions.length) setShowResult(true);
    else setCurrent(current + 1);
  };

  const reset = () => { setStarted(false); setCurrent(0); setAnswers([]); setSelected(null); setShowResult(false); };

  const topicBreakdown = Object.keys(topics).map((key) => {
    const topicQs = questions.filter((q) => q.topic === key);
    if (!topicQs.length) return null;
    const correct = topicQs.filter((q) => answers[questions.indexOf(q)] === q.correctAnswer).length;
    return { key, correct, total: topicQs.length, pct: Math.round((correct / topicQs.length) * 100) };
  }).filter(Boolean) as { key: string; correct: number; total: number; pct: number }[];

  if (!started) {
    return (
      <section className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-slate-950 via-blue-950/30 to-slate-950 relative overflow-hidden flex items-center">
        <div className="absolute inset-0 dots-bg opacity-20" />
        <div className="relative container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/30">
              <Briefcase className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl lg:text-5xl font-black text-white mb-4">{t("title")}</h1>
            <p className="text-slate-400 text-lg mb-6">{t("subtitle")}</p>
            <div className="glass border border-white/10 rounded-2xl p-6 mb-8 text-start">
              <p className="text-slate-300 leading-relaxed mb-4">{t("instructions")}</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[{ v: questions.length, l: isAr ? "سؤال" : "Questions" }, { v: "60", l: isAr ? "دقيقة" : "Minutes" }, { v: "✓", l: isAr ? "نتائج فورية" : "Instant Results" }].map((s, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-3">
                    <div className="text-2xl font-black text-blue-400">{s.v}</div>
                    <div className="text-xs text-slate-400 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Topics covered */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {Object.entries(topics).map(([k, v]) => (
                <span key={k} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {isAr ? v.ar : v.en}
                </span>
              ))}
            </div>
            <button onClick={() => setStarted(true)} className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg hover:from-blue-500 hover:to-purple-500 transition-all shadow-xl hover:shadow-blue-500/30">
              {t("start")}
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  if (showResult) {
    const readinessLevel = pct >= 80 ? (isAr ? "جاهز للمقابلة! 🎯" : "Interview Ready! 🎯") : pct >= 60 ? (isAr ? "قريب جدًا! 💪" : "Almost There! 💪") : (isAr ? "يحتاج مزيد من التدريب 📚" : "Needs More Practice 📚");
    return (
      <section className="min-h-screen pt-28 pb-16 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 dots-bg opacity-20" />
        <div className="relative container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-slate-400 text-sm mb-2">{t("readinessScore")}</p>
              <div className={`text-8xl font-black mb-3 ${pct >= 80 ? "text-green-400" : pct >= 60 ? "text-yellow-400" : "text-red-400"}`}>{pct}%</div>
              <p className="text-2xl text-white font-bold">{readinessLevel}</p>
              <p className="text-slate-400 mt-2">{score}/{questions.length} {isAr ? "إجابات صحيحة" : "correct answers"}</p>
            </div>

            <div className="glass border border-white/10 rounded-2xl p-6 mb-6">
              <h3 className="text-white font-bold text-lg mb-5">{t("breakdown")}</h3>
              <div className="space-y-4">
                {topicBreakdown.map((c) => (
                  <div key={c.key}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-slate-300">{isAr ? topics[c.key]?.ar : topics[c.key]?.en}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400 font-medium">{c.correct}/{c.total}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${c.pct >= 70 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                          {c.pct >= 70 ? t("strong") : t("needsWork")}
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${c.pct >= 70 ? "bg-green-500" : "bg-red-500"}`} style={{ width: `${c.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={reset} className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border border-white/20 text-slate-300 hover:bg-white/10 transition-all font-semibold">
                <RotateCcw className="w-5 h-5" /> {isAr ? "إعادة التقييم" : "Retake"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  const q = questions[current];
  const opts = isAr ? q.options.ar : q.options.en;

  return (
    <section className="min-h-screen pt-28 pb-16 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 dots-bg opacity-20" />
      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>{isAr ? "السؤال" : "Question"} {current + 1} / {questions.length}</span>
              <span className="text-blue-400 font-medium">{isAr ? topics[q.topic]?.ar : topics[q.topic]?.en}</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div className="h-full progress-bar rounded-full" animate={{ width: `${((current + 1) / questions.length) * 100}%` }} transition={{ duration: 0.4 }} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={q.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass border border-white/10 rounded-3xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">{isAr ? q.questionAr : q.questionEn}</h2>
              <div className="space-y-3 mb-6">
                {opts.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)}
                    className={`w-full text-start px-4 py-3.5 rounded-xl transition-all text-sm font-medium flex items-center gap-3 border ${selected === i ? "border-blue-500 bg-blue-500/10 text-white" : "border-white/20 bg-white/5 text-slate-300 hover:border-blue-500/40 hover:bg-blue-500/5"}`}>
                    <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center text-xs flex-shrink-0">{String.fromCharCode(65 + i)}</span>
                    {opt}
                  </button>
                ))}
              </div>
              <button onClick={handleNext} disabled={selected === null}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold disabled:opacity-40 hover:from-blue-500 hover:to-purple-500 transition-all">
                {current + 1 >= questions.length ? (isAr ? "إرسال التقييم" : "Submit") : (isAr ? "التالي" : "Next")}
                <ChevronRight className={`w-5 h-5 ${isAr ? "rotate-180" : ""}`} />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
