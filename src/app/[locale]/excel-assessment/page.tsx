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
  { id: "11", category: "formulas", questionEn: "What does the SUMIF function do?", questionAr: "ماذا تفعل دالة SUMIF؟", options: { en: ["Sums all cells in a range", "Sums cells that meet a specified condition", "Counts cells meeting a condition", "Multiplies values in a range"], ar: ["تجمع كل الخلايا في النطاق", "تجمع الخلايا التي تستوفي شرطًا محددًا", "تحسب الخلايا المستوفية لشرط", "تضرب القيم في نطاق"] }, correctAnswer: 1 },
  { id: "12", category: "lookup", questionEn: "What advantage does INDEX-MATCH have over VLOOKUP?", questionAr: "ما ميزة INDEX-MATCH على VLOOKUP؟", options: { en: ["It is easier to write", "It can look up values to the left of the lookup column", "It only works with text", "It requires fewer arguments"], ar: ["أسهل في الكتابة", "يمكنه البحث عن قيم على يسار عمود البحث", "يعمل مع النصوص فقط", "يتطلب عددًا أقل من الوسيطات"] }, correctAnswer: 1 },
  { id: "13", category: "formulas", questionEn: "Which function prevents errors from displaying in a cell?", questionAr: "أي دالة تمنع ظهور الأخطاء في الخلية؟", options: { en: ["ISNUMBER", "IFERROR", "ISERROR", "IFNA"], ar: ["ISNUMBER", "IFERROR", "ISERROR", "IFNA"] }, correctAnswer: 1 },
  { id: "14", category: "formulas", questionEn: "Which function extracts a specific number of characters from the left of a text string?", questionAr: "أي دالة تستخرج عددًا محددًا من الأحرف من يسار نص؟", options: { en: ["MID", "RIGHT", "LEFT", "LEN"], ar: ["MID", "RIGHT", "LEFT", "LEN"] }, correctAnswer: 2 },
  { id: "15", category: "formulas", questionEn: "What does the TODAY() function return?", questionAr: "ماذا تعيد دالة TODAY()؟", options: { en: ["The current time only", "The current date and time", "The current date without time", "A fixed date"], ar: ["الوقت الحالي فقط", "التاريخ والوقت الحاليين", "التاريخ الحالي بدون وقت", "تاريخ ثابت"] }, correctAnswer: 2 },
  { id: "16", category: "formulas", questionEn: "In Excel, what does the $ symbol do in a cell reference like $A$1?", questionAr: "ما الذي يفعله الرمز $ في مرجع الخلية مثل $A$1؟", options: { en: ["Formats the cell as currency", "Makes the reference absolute so it does not change when copied", "Indicates a named range", "Locks the worksheet"], ar: ["ينسق الخلية كعملة", "يجعل المرجع مطلقًا حتى لا يتغير عند النسخ", "يشير إلى نطاق مسمى", "يقفل ورقة العمل"] }, correctAnswer: 1 },
  { id: "17", category: "dataTools", questionEn: "What does Data Validation in Excel allow you to do?", questionAr: "ماذا يتيح لك التحقق من صحة البيانات في Excel؟", options: { en: ["Automatically format cells", "Restrict the type of data users can enter in a cell", "Sort data alphabetically", "Remove duplicate values"], ar: ["تنسيق الخلايا تلقائيًا", "تقييد نوع البيانات التي يمكن للمستخدمين إدخالها في خلية", "ترتيب البيانات أبجديًا", "إزالة القيم المكررة"] }, correctAnswer: 1 },
  { id: "18", category: "dataTools", questionEn: "What is Flash Fill in Excel?", questionAr: "ما هو Flash Fill في Excel؟", options: { en: ["A way to highlight cells quickly", "Automatically fills data based on a detected pattern", "A shortcut for conditional formatting", "A chart animation feature"], ar: ["طريقة لتمييز الخلايا بسرعة", "يملأ البيانات تلقائيًا بناءً على نمط مكتشف", "اختصار للتنسيق الشرطي", "ميزة رسوم متحركة للمخطط"] }, correctAnswer: 1 },
  { id: "19", category: "dataTools", questionEn: "Where can you find the Remove Duplicates feature in Excel?", questionAr: "أين يمكن العثور على ميزة إزالة التكرارات في Excel؟", options: { en: ["Home tab", "Insert tab", "Data tab", "Review tab"], ar: ["تبويب الصفحة الرئيسية", "تبويب إدراج", "تبويب البيانات", "تبويب مراجعة"] }, correctAnswer: 2 },
  { id: "20", category: "formulas", questionEn: "What does the AVERAGEIF function calculate?", questionAr: "ماذا تحسب دالة AVERAGEIF؟", options: { en: ["The average of all values in a range", "The average of values that meet a specific condition", "The average ignoring zero values", "The weighted average"], ar: ["متوسط جميع القيم في نطاق", "متوسط القيم التي تستوفي شرطًا محددًا", "المتوسط مع تجاهل القيم الصفرية", "المتوسط الموزون"] }, correctAnswer: 1 },
  { id: "21", category: "formulas", questionEn: "How is COUNTIFS different from COUNTIF?", questionAr: "كيف تختلف COUNTIFS عن COUNTIF؟", options: { en: ["COUNTIFS counts text only", "COUNTIFS allows multiple criteria across multiple ranges", "COUNTIFS is faster", "There is no difference"], ar: ["COUNTIFS تحسب النصوص فقط", "تتيح COUNTIFS معايير متعددة عبر نطاقات متعددة", "COUNTIFS أسرع", "لا يوجد فرق"] }, correctAnswer: 1 },
  { id: "22", category: "formulas", questionEn: "Which formula correctly combines AND logic with IF?", questionAr: "أي صيغة تجمع منطق AND مع IF بشكل صحيح؟", options: { en: ["IF(A1>0, AND(B1>0))", "IF(AND(A1>0, B1>0), \"Yes\", \"No\")", "AND(IF(A1>0), IF(B1>0))", "IF(A1>0 AND B1>0, \"Yes\")"], ar: ["IF(A1>0, AND(B1>0))", "IF(AND(A1>0, B1>0), \"نعم\", \"لا\")", "AND(IF(A1>0), IF(B1>0))", "IF(A1>0 AND B1>0, \"نعم\")"] }, correctAnswer: 1 },
  { id: "23", category: "pivot", questionEn: "What does GETPIVOTDATA do?", questionAr: "ماذا تفعل دالة GETPIVOTDATA؟", options: { en: ["Creates a new pivot table", "Retrieves specific data from a pivot table", "Refreshes all pivot tables", "Converts a pivot table to a range"], ar: ["تنشئ جدولًا محوريًا جديدًا", "تسترجع بيانات محددة من جدول محوري", "تحدث جميع الجداول المحورية", "تحول الجدول المحوري إلى نطاق"] }, correctAnswer: 1 },
  { id: "24", category: "powerQuery", questionEn: "What does the Unpivot Columns feature do in Power Query?", questionAr: "ماذا تفعل ميزة إلغاء الجدولة للأعمدة في Power Query؟", options: { en: ["Deletes selected columns", "Transforms column headers into row values", "Sorts columns alphabetically", "Merges two columns into one"], ar: ["تحذف الأعمدة المحددة", "تحول رؤوس الأعمدة إلى قيم صفوف", "ترتب الأعمدة أبجديًا", "تدمج عمودين في عمود واحد"] }, correctAnswer: 1 },
  { id: "25", category: "formulas", questionEn: "What is the FILTER function used for in Excel?", questionAr: "ما استخدام دالة FILTER في Excel؟", options: { en: ["Applies conditional formatting to a range", "Returns an array of values that meet given criteria dynamically", "Removes blank rows from data", "Sorts a range by a column"], ar: ["تطبق تنسيقًا شرطيًا على نطاق", "تعيد مصفوفة من القيم التي تستوفي معايير محددة بشكل ديناميكي", "تزيل الصفوف الفارغة من البيانات", "ترتب نطاقًا حسب عمود"] }, correctAnswer: 1 },
  { id: "26", category: "charts", questionEn: "Which chart type is best for showing proportions of a whole?", questionAr: "أي نوع مخطط هو الأفضل لإظهار نسب الأجزاء من الكل؟", options: { en: ["Bar Chart", "Line Chart", "Pie or Donut Chart", "Scatter Plot"], ar: ["مخطط شريطي", "مخطط خطي", "مخطط دائري أو دونات", "مخطط مبعثر"] }, correctAnswer: 2 },
  { id: "27", category: "dataTools", questionEn: "What does Freeze Panes do in Excel?", questionAr: "ماذا تفعل ميزة تجميد الأجزاء في Excel؟", options: { en: ["Locks the workbook from editing", "Keeps specific rows or columns visible while scrolling", "Merges cells together", "Adds a border to selected cells"], ar: ["تقفل المصنف من التعديل", "تبقي صفوفًا أو أعمدة محددة مرئية أثناء التمرير", "تدمج الخلايا معًا", "تضيف حدودًا للخلايا المحددة"] }, correctAnswer: 1 },
  { id: "28", category: "formulas", questionEn: "What does the LEN() function return?", questionAr: "ماذا تعيد دالة LEN()؟", options: { en: ["The largest value in a range", "The number of characters in a text string", "The length of a selected range", "The number of words in a cell"], ar: ["أكبر قيمة في نطاق", "عدد الأحرف في نص", "طول النطاق المحدد", "عدد الكلمات في الخلية"] }, correctAnswer: 1 },
  { id: "29", category: "dashboards", questionEn: "What are Slicers in Excel used for?", questionAr: "ما استخدام القطاعات (Slicers) في Excel؟", options: { en: ["Cutting cells from a worksheet", "Filtering pivot tables and charts interactively", "Adding borders to tables", "Splitting worksheets into sections"], ar: ["قطع الخلايا من ورقة العمل", "تصفية الجداول المحورية والمخططات بشكل تفاعلي", "إضافة حدود للجداول", "تقسيم أوراق العمل إلى أقسام"] }, correctAnswer: 1 },
  { id: "30", category: "formulas", questionEn: "What does the TRIM() function do?", questionAr: "ماذا تفعل دالة TRIM()؟", options: { en: ["Rounds a number to a specified decimal place", "Removes all extra spaces from a text string except single spaces between words", "Converts text to uppercase", "Deletes selected characters from a string"], ar: ["تقرب رقمًا إلى منازل عشرية محددة", "تزيل جميع المسافات الزائدة من النص إلا المسافات الفردية بين الكلمات", "تحول النص إلى أحرف كبيرة", "تحذف أحرفًا محددة من النص"] }, correctAnswer: 1 },
];

const categories: Record<string, string> = {
  formulas: "Formulas", lookup: "Lookup Functions", pivot: "Pivot Tables",
  charts: "Charts", conditional: "Conditional Formatting", powerQuery: "Power Query",
  dashboards: "Dashboards", dataTools: "Data Tools"
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
