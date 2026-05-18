"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { CheckCircle, XCircle, ChevronRight, RotateCcw, Award, TrendingUp } from "lucide-react";

interface ExcelAssessmentPageProps {
  params: { locale: string };
}

const questions = [
  { id: "1", category: "formulas", questionEn: "Which function returns the number of cells in a range that meet a given condition?", questionAr: "أي دالة تعيد عدد الخلايا في نطاق تستوفي شرطًا معينًا؟", options: { en: ["COUNT", "COUNTIF", "SUMIF", "COUNTA"], ar: ["COUNT", "COUNTIF", "SUMIF", "COUNTA"] }, correctAnswer: 1 },
  { id: "2", category: "lookup", questionEn: "What is the syntax for VLOOKUP?", questionAr: "ما صيغة دالة VLOOKUP؟", options: { en: ["VLOOKUP(value, table, col, [range])", "VLOOKUP(table, value, col)", "VLOOKUP(col, value, table)", "VLOOKUP(value, col, table, range)"], ar: ["VLOOKUP(value, table, col, [range])", "VLOOKUP(table, value, col)", "VLOOKUP(col, value, table)", "VLOOKUP(value, col, table, range)"] }, correctAnswer: 0 },
  { id: "3", category: "pivot", questionEn: "What is a Pivot Table primarily used for?", questionAr: "ما الاستخدام الأساسي للجدول المحوري؟", options: { en: ["Formatting cells", "Summarizing and analyzing large datasets", "Creating charts only", "Writing macros"], ar: ["تنسيق الخلايا", "تلخيص وتحليل مجموعات البيانات الكبيرة", "إنشاء مخططات فقط", "كتابة الماكرو"] }, correctAnswer: 1 },
  { id: "4", category: "formulas", questionEn: "Which function combines text from multiple cells?", questionAr: "أي دالة تجمع النص من خلايا متعددة؟", options: { en: ["JOIN", "CONCATENATE", "MERGE", "COMBINE"], ar: ["JOIN", "CONCATENATE", "MERGE", "COMBINE"] }, correctAnswer: 1 },
  { id: "5", category: "charts", questionEn: "Which chart type is best for showing trends over time?", questionAr: "أي نوع مخطط هو الأفضل لإظهار الاتجاهات عبر الزمن؟", options: { en: ["Pie Chart", "Bar Chart", "Line Chart", "Scatter Plot"], ar: ["مخطط دائري", "مخطط شريطي", "مخطط خطي", "مخطط مبعثر"] }, correctAnswer: 2 },
  { id: "6", category: "conditional", questionEn: "What does conditional formatting do in Excel?", questionAr: "ما الذي يفعله التنسيق الشرطي في Excel؟", options: { en: ["Formats cells based on their values", "Locks cells", "Sorts data", "Creates formulas"], ar: ["ينسق الخلايا بناءً على قيمها", "يقفل الخلايا", "يرتب البيانات", "ينشئ صيغًا"] }, correctAnswer: 0 },
  { id: "7", category: "powerQuery", questionEn: "Power Query is primarily used for?", questionAr: "يُستخدم Power Query بشكل رئيسي لـ؟", options: { en: ["Creating presentations", "Data transformation and loading", "Email automation", "Database management"], ar: ["إنشاء عروض تقديمية", "تحويل البيانات وتحميلها", "أتمتة البريد الإلكتروني", "إدارة قواعد البيانات"] }, correctAnswer: 1 },
  { id: "8", category: "lookup", questionEn: "XLOOKUP can search in which direction?", questionAr: "في أي اتجاه يمكن لـ XLOOKUP البحث؟", options: { en: ["Only vertical", "Only horizontal", "Both vertical and horizontal", "Only diagonal"], ar: ["عموديًا فقط", "أفقيًا فقط", "عموديًا وأفقيًا كليهما", "قطريًا فقط"] }, correctAnswer: 2 },
  { id: "9", category: "dashboards", questionEn: "Which element makes dashboards interactive in Excel?", questionAr: "أي عنصر يجعل لوحات المعلومات تفاعلية في Excel؟", options: { en: ["Tables only", "Slicers and Timelines", "Fonts", "Cell borders"], ar: ["الجداول فقط", "القطاعات والجداول الزمنية", "الخطوط", "حدود الخلايا"] }, correctAnswer: 1 },
  { id: "10", category: "formulas", questionEn: "The IF function syntax is:", questionAr: "صيغة دالة IF هي:", options: { en: ["IF(value, true)", "IF(condition, value_if_true, value_if_false)", "IF(condition, value)", "IF(true, false, condition)"], ar: ["IF(value, true)", "IF(condition, value_if_true, value_if_false)", "IF(condition, value)", "IF(true, false, condition)"] }, correctAnswer: 1 },
];

const categories: Record<string, string> = {
  formulas: "Formulas", lookup: "Lookup Functions", pivot: "Pivot Tables",
  charts: "Charts", conditional: "Conditional Formatting", powerQuery: "Power Query", dashboards: "Dashboards"
};

export default function ExcelAssessmentPage({ params: { locale } }: ExcelAssessmentPageProps) {
  const t = useTranslations("excelAssessment");
  const isAr = locale === "ar";
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const score = answers.filter((a, i) => a === questions[i].correctAnswer).length;
  const pct = Math.round((score / questions.length) * 100);

  const handleAnswer = (idx: number) => {
    setSelected(idx);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    setShowExplanation(false);
    if (current + 1 >= questions.length) {
      setShowResult(true);
    } else {
      setCurrent(current + 1);
    }
  };

  const reset = () => {
    setStarted(false); setCurrent(0); setAnswers([]); setSelected(null); setShowResult(false); setShowExplanation(false);
  };

  const q = questions[current];
  const opts = isAr ? q.options.ar : q.options.en;

  if (!started) {
    return (
      <section className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-slate-950 via-teal-950/20 to-slate-950 relative overflow-hidden flex items-center">
        <div className="absolute inset-0 dots-bg opacity-20" />
        <div className="relative container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-teal-500 to-green-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-teal-500/30">
              <span className="text-4xl">&#128202;</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-black text-white mb-4">{t("title")}</h1>
            <p className="text-slate-400 text-lg mb-6">{t("subtitle")}</p>
            <div className="glass border border-white/10 rounded-2xl p-6 mb-8 text-start">
              <p className="text-slate-300 leading-relaxed mb-4">{t("instructions")}</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[{ v: questions.length, l: t("questions") }, { v: "45", l: t("minutes") }, { v: "✓", l: t("instant") }].map((s, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-3">
                    <div className="text-2xl font-black text-teal-400">{s.v}</div>
                    <div className="text-xs text-slate-400 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => setStarted(true)} className="px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-600 to-green-600 text-white font-bold text-lg hover:from-teal-500 hover:to-green-500 transition-all shadow-xl hover:shadow-teal-500/30">
              {t("start")}
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  if (showResult) {
    const categoryBreakdown = Object.keys(categories).map((cat) => {
      const catQs = questions.filter((q) => q.category === cat);
      const correct = catQs.filter((q) => answers[questions.indexOf(q)] === q.correctAnswer).length;
      return { cat, correct, total: catQs.length };
    }).filter((c) => c.total > 0);

    return (
      <section className="min-h-screen pt-28 pb-16 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 dots-bg opacity-20" />
        <div className="relative container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className={`text-8xl font-black mb-2 ${pct >= 80 ? "text-green-400" : pct >= 60 ? "text-yellow-400" : "text-red-400"}`}>{pct}%</div>
              <p className="text-2xl text-white font-bold mb-2">{t("yourScore")}: {score}/{questions.length}</p>
              <p className="text-slate-400">{pct >= 80 ? (isAr ? "أداء ممتاز! \u{1F389}" : "Excellent Performance! \u{1F389}") : pct >= 60 ? (isAr ? "أداء جيد! استمر في التعلم" : "Good job! Keep learning") : (isAr ? "يحتاج إلى تحسين. نوصي بمراجعة الدورة" : "Needs improvement. We recommend reviewing")}</p>
            </div>
            <div className="glass border border-white/10 rounded-2xl p-6 mb-6">
              <h3 className="text-white font-bold text-lg mb-4">{t("topicBreakdown")}</h3>
              <div className="space-y-3">
                {categoryBreakdown.map((c) => (
                  <div key={c.cat}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-slate-300">{categories[c.cat]}</span>
                      <span className="text-blue-400 font-medium">{c.correct}/{c.total}</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full progress-bar" style={{ width: `${(c.correct / c.total) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={reset} className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border border-white/20 text-slate-300 hover:bg-white/10 transition-all font-semibold">
                <RotateCcw className="w-5 h-5" /> {t("retake")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-28 pb-16 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 dots-bg opacity-20" />
      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>{t("question")} {current + 1} {t("of")} {questions.length}</span>
              <span className="text-blue-400 font-medium">{categories[q.category]}</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full progress-bar rounded-full"
                initial={{ width: `${(current / questions.length) * 100}%` }}
                animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={q.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass border border-white/10 rounded-3xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">
                {isAr ? q.questionAr : q.questionEn}
              </h2>
              <div className="space-y-3 mb-6">
                {opts.map((opt, i) => {
                  let cls = "question-option border border-white/20 bg-white/5 text-slate-300";
                  if (selected !== null) {
                    if (i === q.correctAnswer) cls = "question-option correct border-green-500 bg-green-500/10 text-green-300";
                    else if (i === selected && selected !== q.correctAnswer) cls = "question-option incorrect border-red-500 bg-red-500/10 text-red-300";
                    else cls = "question-option border border-white/10 bg-white/5 text-slate-500";
                  }
                  return (
                    <button key={i} onClick={() => handleAnswer(i)} disabled={selected !== null}
                      className={`w-full text-start px-4 py-3.5 rounded-xl transition-all text-sm font-medium flex items-center gap-3 ${cls}`}>
                      <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center text-xs flex-shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                      {selected !== null && i === q.correctAnswer && <CheckCircle className="w-5 h-5 text-green-400 ms-auto" />}
                      {selected !== null && i === selected && selected !== q.correctAnswer && <XCircle className="w-5 h-5 text-red-400 ms-auto" />}
                    </button>
                  );
                })}
              </div>
              {selected !== null && (
                <div className={`p-4 rounded-xl mb-6 text-sm ${selected === q.correctAnswer ? "bg-green-500/10 border border-green-500/20 text-green-300" : "bg-red-500/10 border border-red-500/20 text-red-300"}`}>
                  {selected === q.correctAnswer ? (isAr ? "✅ إجابة صحيحة!" : "✅ Correct!") : (isAr ? `❌ إجابة خاطئة. الإجابة الصحيحة: ${opts[q.correctAnswer]}` : `❌ Incorrect. The correct answer is: ${opts[q.correctAnswer]}`)}
                </div>
              )}
              <button onClick={handleNext} disabled={selected === null}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-green-600 text-white font-bold disabled:opacity-40 hover:from-teal-500 hover:to-green-500 transition-all">
                {current + 1 >= questions.length ? t("submit") : t("next")}
                <ChevronRight className={`w-5 h-5 ${isAr ? "rotate-180" : ""}`} />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
