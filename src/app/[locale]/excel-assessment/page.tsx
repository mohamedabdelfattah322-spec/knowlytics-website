"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { CheckCircle, XCircle, ChevronRight, RotateCcw, User, Mail, Phone } from "lucide-react";

interface ExcelAssessmentPageProps {
  params: { locale: string };
}

const questions = [
  { id: "1", category: "formulas", difficulty: "beginner", questionEn: "Which function returns the number of cells in a range that meet a given condition?", questionAr: "أي دالة تعيد عدد الخلايا في نطاق تستوفي شرطًا معينًا؟", options: { en: ["COUNT", "COUNTIF", "SUMIF", "COUNTA"], ar: ["COUNT", "COUNTIF", "SUMIF", "COUNTA"] }, correctAnswer: 1 },
  { id: "2", category: "lookup", difficulty: "advanced", questionEn: "What is the syntax for VLOOKUP?", questionAr: "ما صيغة دالة VLOOKUP؟", options: { en: ["VLOOKUP(value, table, col, [range])", "VLOOKUP(table, value, col)", "VLOOKUP(col, value, table)", "VLOOKUP(value, col, table, range)"], ar: ["VLOOKUP(value, table, col, [range])", "VLOOKUP(table, value, col)", "VLOOKUP(col, value, table)", "VLOOKUP(value, col, table, range)"] }, correctAnswer: 0 },
  { id: "3", category: "pivot", difficulty: "intermediate", questionEn: "What is a Pivot Table primarily used for?", questionAr: "ما الاستخدام الأساسي للجدول المحوري؟", options: { en: ["Formatting cells", "Summarizing and analyzing large datasets", "Creating charts only", "Writing macros"], ar: ["تنسيق الخلايا", "تلخيص وتحليل مجموعات البيانات الكبيرة", "إنشاء مخططات فقط", "كتابة الماكرو"] }, correctAnswer: 1 },
  { id: "4", category: "formulas", difficulty: "beginner", questionEn: "Which function combines text from multiple cells?", questionAr: "أي دالة تجمع النص من خلايا متعددة؟", options: { en: ["JOIN", "CONCATENATE", "MERGE", "COMBINE"], ar: ["JOIN", "CONCATENATE", "MERGE", "COMBINE"] }, correctAnswer: 1 },
  { id: "5", category: "charts", difficulty: "beginner", questionEn: "Which chart type is best for showing trends over time?", questionAr: "أي نوع مخطط هو الأفضل لإظهار الاتجاهات عبر الزمن؟", options: { en: ["Pie Chart", "Bar Chart", "Line Chart", "Scatter Plot"], ar: ["مخطط دائري", "مخطط شريطي", "مخطط خطي", "مخطط مبعثر"] }, correctAnswer: 2 },
  { id: "6", category: "conditional", difficulty: "beginner", questionEn: "What does conditional formatting do in Excel?", questionAr: "ما الذي يفعله التنسيق الشرطي في Excel؟", options: { en: ["Formats cells based on their values", "Locks cells", "Sorts data", "Creates formulas"], ar: ["ينسق الخلايا بناءً على قيمها", "يقفل الخلايا", "يرتب البيانات", "ينشئ صيغًا"] }, correctAnswer: 0 },
  { id: "7", category: "powerQuery", difficulty: "advanced", questionEn: "Power Query is primarily used for?", questionAr: "يُستخدم Power Query بشكل رئيسي لـ؟", options: { en: ["Creating presentations", "Data transformation and loading", "Email automation", "Database management"], ar: ["إنشاء عروض تقديمية", "تحويل البيانات وتحميلها", "أتمتة البريد الإلكتروني", "إدارة قواعد البيانات"] }, correctAnswer: 1 },
  { id: "8", category: "lookup", difficulty: "advanced", questionEn: "XLOOKUP can search in which direction?", questionAr: "في أي اتجاه يمكن لـ XLOOKUP البحث؟", options: { en: ["Only vertical", "Only horizontal", "Both vertical and horizontal", "Only diagonal"], ar: ["عموديًا فقط", "أفقيًا فقط", "عموديًا وأفقيًا كليهما", "قطريًا فقط"] }, correctAnswer: 2 },
  { id: "9", category: "dashboards", difficulty: "intermediate", questionEn: "Which element makes dashboards interactive in Excel?", questionAr: "أي عنصر يجعل لوحات المعلومات تفاعلية في Excel؟", options: { en: ["Tables only", "Slicers and Timelines", "Fonts", "Cell borders"], ar: ["الجداول فقط", "القطاعات والجداول الزمنية", "الخطوط", "حدود الخلايا"] }, correctAnswer: 1 },
  { id: "10", category: "formulas", difficulty: "beginner", questionEn: "The IF function syntax is:", questionAr: "صيغة دالة IF هي:", options: { en: ["IF(value, true)", "IF(condition, value_if_true, value_if_false)", "IF(condition, value)", "IF(true, false, condition)"], ar: ["IF(value, true)", "IF(condition, value_if_true, value_if_false)", "IF(condition, value)", "IF(true, false, condition)"] }, correctAnswer: 1 },
  { id: "11", category: "formulas", difficulty: "beginner", questionEn: "What does the SUMIF function do?", questionAr: "ماذا تفعل دالة SUMIF؟", options: { en: ["Sums all cells in a range", "Sums cells that meet a specified condition", "Counts cells meeting a condition", "Multiplies values in a range"], ar: ["تجمع كل الخلايا في النطاق", "تجمع الخلايا التي تستوفي شرطًا محددًا", "تحسب الخلايا المستوفية لشرط", "تضرب القيم في نطاق"] }, correctAnswer: 1 },
  { id: "12", category: "lookup", difficulty: "advanced", questionEn: "What advantage does INDEX-MATCH have over VLOOKUP?", questionAr: "ما ميزة INDEX-MATCH على VLOOKUP؟", options: { en: ["It is easier to write", "It can look up values to the left of the lookup column", "It only works with text", "It requires fewer arguments"], ar: ["أسهل في الكتابة", "يمكنه البحث عن قيم على يسار عمود البحث", "يعمل مع النصوص فقط", "يتطلب عددًا أقل من الوسيطات"] }, correctAnswer: 1 },
  { id: "13", category: "formulas", difficulty: "beginner", questionEn: "Which function prevents errors from displaying in a cell?", questionAr: "أي دالة تمنع ظهور الأخطاء في الخلية؟", options: { en: ["ISNUMBER", "IFERROR", "ISERROR", "IFNA"], ar: ["ISNUMBER", "IFERROR", "ISERROR", "IFNA"] }, correctAnswer: 1 },
  { id: "14", category: "formulas", difficulty: "beginner", questionEn: "Which function extracts a specific number of characters from the left of a text string?", questionAr: "أي دالة تستخرج عددًا محددًا من الأحرف من يسار نص؟", options: { en: ["MID", "RIGHT", "LEFT", "LEN"], ar: ["MID", "RIGHT", "LEFT", "LEN"] }, correctAnswer: 2 },
  { id: "15", category: "formulas", difficulty: "beginner", questionEn: "What does the TODAY() function return?", questionAr: "ماذا تعيد دالة TODAY()؟", options: { en: ["The current time only", "The current date and time", "The current date without time", "A fixed date"], ar: ["الوقت الحالي فقط", "التاريخ والوقت الحاليين", "التاريخ الحالي بدون وقت", "تاريخ ثابت"] }, correctAnswer: 2 },
  { id: "16", category: "formulas", difficulty: "beginner", questionEn: "In Excel, what does the $ symbol do in a cell reference like $A$1?", questionAr: "ما الذي يفعله الرمز $ في مرجع الخلية مثل $A$1؟", options: { en: ["Formats the cell as currency", "Makes the reference absolute so it does not change when copied", "Indicates a named range", "Locks the worksheet"], ar: ["ينسق الخلية كعملة", "يجعل المرجع مطلقًا حتى لا يتغير عند النسخ", "يشير إلى نطاق مسمى", "يقفل ورقة العمل"] }, correctAnswer: 1 },
  { id: "17", category: "dataTools", difficulty: "beginner", questionEn: "What does Data Validation in Excel allow you to do?", questionAr: "ماذا يتيح لك التحقق من صحة البيانات في Excel؟", options: { en: ["Automatically format cells", "Restrict the type of data users can enter in a cell", "Sort data alphabetically", "Remove duplicate values"], ar: ["تنسيق الخلايا تلقائيًا", "تقييد نوع البيانات التي يمكن للمستخدمين إدخالها في خلية", "ترتيب البيانات أبجديًا", "إزالة القيم المكررة"] }, correctAnswer: 1 },
  { id: "18", category: "dataTools", difficulty: "beginner", questionEn: "What is Flash Fill in Excel?", questionAr: "ما هو Flash Fill في Excel؟", options: { en: ["A way to highlight cells quickly", "Automatically fills data based on a detected pattern", "A shortcut for conditional formatting", "A chart animation feature"], ar: ["طريقة لتمييز الخلايا بسرعة", "يملأ البيانات تلقائيًا بناءً على نمط مكتشف", "اختصار للتنسيق الشرطي", "ميزة رسوم متحركة للمخطط"] }, correctAnswer: 1 },
  { id: "19", category: "dataTools", difficulty: "beginner", questionEn: "Where can you find the Remove Duplicates feature in Excel?", questionAr: "أين يمكن العثور على ميزة إزالة التكرارات في Excel؟", options: { en: ["Home tab", "Insert tab", "Data tab", "Review tab"], ar: ["تبويب الصفحة الرئيسية", "تبويب إدراج", "تبويب البيانات", "تبويب مراجعة"] }, correctAnswer: 2 },
  { id: "20", category: "formulas", difficulty: "beginner", questionEn: "What does the AVERAGEIF function calculate?", questionAr: "ماذا تحسب دالة AVERAGEIF؟", options: { en: ["The average of all values in a range", "The average of values that meet a specific condition", "The average ignoring zero values", "The weighted average"], ar: ["متوسط جميع القيم في نطاق", "متوسط القيم التي تستوفي شرطًا محددًا", "المتوسط مع تجاهل القيم الصفرية", "المتوسط الموزون"] }, correctAnswer: 1 },
  { id: "21", category: "formulas", difficulty: "intermediate", questionEn: "How is COUNTIFS different from COUNTIF?", questionAr: "كيف تختلف COUNTIFS عن COUNTIF؟", options: { en: ["COUNTIFS counts text only", "COUNTIFS allows multiple criteria across multiple ranges", "COUNTIFS is faster", "There is no difference"], ar: ["COUNTIFS تحسب النصوص فقط", "تتيح COUNTIFS معايير متعددة عبر نطاقات متعددة", "COUNTIFS أسرع", "لا يوجد فرق"] }, correctAnswer: 1 },
  { id: "22", category: "formulas", difficulty: "intermediate", questionEn: "Which formula correctly combines AND logic with IF?", questionAr: "أي صيغة تجمع منطق AND مع IF بشكل صحيح؟", options: { en: ["IF(A1>0, AND(B1>0))", "IF(AND(A1>0, B1>0), \"Yes\", \"No\")", "AND(IF(A1>0), IF(B1>0))", "IF(A1>0 AND B1>0, \"Yes\")"], ar: ["IF(A1>0, AND(B1>0))", "IF(AND(A1>0, B1>0), \"نعم\", \"لا\")", "AND(IF(A1>0), IF(B1>0))", "IF(A1>0 AND B1>0, \"نعم\")"] }, correctAnswer: 1 },
  { id: "23", category: "pivot", difficulty: "intermediate", questionEn: "What does GETPIVOTDATA do?", questionAr: "ماذا تفعل دالة GETPIVOTDATA؟", options: { en: ["Creates a new pivot table", "Retrieves specific data from a pivot table", "Refreshes all pivot tables", "Converts a pivot table to a range"], ar: ["تنشئ جدولًا محوريًا جديدًا", "تسترجع بيانات محددة من جدول محوري", "تحدث جميع الجداول المحورية", "تحول الجدول المحوري إلى نطاق"] }, correctAnswer: 1 },
  { id: "24", category: "powerQuery", difficulty: "advanced", questionEn: "What does the Unpivot Columns feature do in Power Query?", questionAr: "ماذا تفعل ميزة إلغاء الجدولة للأعمدة في Power Query؟", options: { en: ["Deletes selected columns", "Transforms column headers into row values", "Sorts columns alphabetically", "Merges two columns into one"], ar: ["تحذف الأعمدة المحددة", "تحول رؤوس الأعمدة إلى قيم صفوف", "ترتب الأعمدة أبجديًا", "تدمج عمودين في عمود واحد"] }, correctAnswer: 1 },
  { id: "25", category: "formulas", difficulty: "intermediate", questionEn: "What is the FILTER function used for in Excel?", questionAr: "ما استخدام دالة FILTER في Excel؟", options: { en: ["Applies conditional formatting to a range", "Returns an array of values that meet given criteria dynamically", "Removes blank rows from data", "Sorts a range by a column"], ar: ["تطبق تنسيقًا شرطيًا على نطاق", "تعيد مصفوفة من القيم التي تستوفي معايير محددة بشكل ديناميكي", "تزيل الصفوف الفارغة من البيانات", "ترتب نطاقًا حسب عمود"] }, correctAnswer: 1 },
  { id: "26", category: "charts", difficulty: "beginner", questionEn: "Which chart type is best for showing proportions of a whole?", questionAr: "أي نوع مخطط هو الأفضل لإظهار نسب الأجزاء من الكل؟", options: { en: ["Bar Chart", "Line Chart", "Pie or Donut Chart", "Scatter Plot"], ar: ["مخطط شريطي", "مخطط خطي", "مخطط دائري أو دونات", "مخطط مبعثر"] }, correctAnswer: 2 },
  { id: "27", category: "dataTools", difficulty: "beginner", questionEn: "What does Freeze Panes do in Excel?", questionAr: "ماذا تفعل ميزة تجميد الأجزاء في Excel؟", options: { en: ["Locks the workbook from editing", "Keeps specific rows or columns visible while scrolling", "Merges cells together", "Adds a border to selected cells"], ar: ["تقفل المصنف من التعديل", "تبقي صفوفًا أو أعمدة محددة مرئية أثناء التمرير", "تدمج الخلايا معًا", "تضيف حدودًا للخلايا المحددة"] }, correctAnswer: 1 },
  { id: "28", category: "formulas", difficulty: "beginner", questionEn: "What does the LEN() function return?", questionAr: "ماذا تعيد دالة LEN()؟", options: { en: ["The largest value in a range", "The number of characters in a text string", "The length of a selected range", "The number of words in a cell"], ar: ["أكبر قيمة في نطاق", "عدد الأحرف في نص", "طول النطاق المحدد", "عدد الكلمات في الخلية"] }, correctAnswer: 1 },
  { id: "29", category: "dashboards", difficulty: "intermediate", questionEn: "What are Slicers in Excel used for?", questionAr: "ما استخدام القطاعات (Slicers) في Excel؟", options: { en: ["Cutting cells from a worksheet", "Filtering pivot tables and charts interactively", "Adding borders to tables", "Splitting worksheets into sections"], ar: ["قطع الخلايا من ورقة العمل", "تصفية الجداول المحورية والمخططات بشكل تفاعلي", "إضافة حدود للجداول", "تقسيم أوراق العمل إلى أقسام"] }, correctAnswer: 1 },
  { id: "30", category: "formulas", difficulty: "beginner", questionEn: "What does the TRIM() function do?", questionAr: "ماذا تفعل دالة TRIM()؟", options: { en: ["Rounds a number to a specified decimal place", "Removes all extra spaces from a text string except single spaces between words", "Converts text to uppercase", "Deletes selected characters from a string"], ar: ["تقرب رقمًا إلى منازل عشرية محددة", "تزيل جميع المسافات الزائدة من النص إلا المسافات الفردية بين الكلمات", "تحول النص إلى أحرف كبيرة", "تحذف أحرفًا محددة من النص"] }, correctAnswer: 1 },
];

const categories: Record<string, string> = {
  formulas: "Formulas", lookup: "Lookup Functions", pivot: "Pivot Tables",
  charts: "Charts", conditional: "Conditional Formatting", powerQuery: "Power Query",
  dashboards: "Dashboards", dataTools: "Data Tools"
};

const categoriesAr: Record<string, string> = {
  formulas: "الصيغ", lookup: "دوال البحث", pivot: "الجداول المحورية",
  charts: "المخططات", conditional: "التنسيق الشرطي", powerQuery: "Power Query",
  dashboards: "لوحات المعلومات", dataTools: "أدوات البيانات"
};

function determineLevel(percentage: number, categoryBreakdown: Record<string, { correct: number; total: number }>) {
  const advancedCats = ['powerQuery', 'lookup', 'pivot', 'dashboards'];
  const advancedEntries = Object.entries(categoryBreakdown).filter(([cat]) => advancedCats.includes(cat));
  const advancedScore = advancedEntries.length > 0
    ? advancedEntries.reduce((sum, [, v]) => sum + (v.total > 0 ? (v.correct / v.total) * 100 : 0), 0) / advancedEntries.length
    : 100;

  if (percentage >= 85) return { level: 'Advanced', levelAr: 'متقدم', color: '#10b981' };
  if (percentage >= 65 && advancedScore < 60) return { level: 'Intermediate – Needs Advanced Training', levelAr: 'متوسط – يحتاج تدريب متقدم', color: '#f59e0b' };
  if (percentage >= 65) return { level: 'Intermediate', levelAr: 'متوسط', color: '#3b82f6' };
  if (percentage >= 40) return { level: 'Beginner – Needs Practice', levelAr: 'مبتدئ – يحتاج تدريب', color: '#f97316' };
  return { level: 'Needs Full Training', levelAr: 'يحتاج تدريب شامل', color: '#ef4444' };
}

export default function ExcelAssessmentPage({ params: { locale } }: ExcelAssessmentPageProps) {
  const t = useTranslations("excelAssessment");
  const isAr = locale === "ar";

  // screen: 0 = registration, 1 = quiz, 2 = results
  const [screen, setScreen] = useState(0);
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regError, setRegError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const score = answers.filter((a, i) => a === questions[i]?.correctAnswer).length;
  const pct = answers.length === questions.length ? Math.round((score / questions.length) * 100) : 0;

  const handleRegSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) {
      setRegError(isAr ? "الاسم والبريد الإلكتروني مطلوبان" : "Name and email are required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail)) {
      setRegError(isAr ? "يرجى إدخال بريد إلكتروني صحيح" : "Please enter a valid email");
      return;
    }
    setRegError("");
    setScreen(1);
  };

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
      finishQuiz(newAnswers);
    } else {
      setCurrent(current + 1);
    }
  };

  const finishQuiz = useCallback(async (finalAnswers: number[]) => {
    setScreen(2);
    const finalScore = finalAnswers.filter((a, i) => a === questions[i]?.correctAnswer).length;
    const finalPct = Math.round((finalScore / questions.length) * 100);

    // Build category breakdown
    const catBreakdown: Record<string, { correct: number; total: number }> = {};
    questions.forEach((q, i) => {
      if (!catBreakdown[q.category]) catBreakdown[q.category] = { correct: 0, total: 0 };
      catBreakdown[q.category].total++;
      if (finalAnswers[i] === q.correctAnswer) catBreakdown[q.category].correct++;
    });

    const weakAreas = Object.entries(catBreakdown)
      .filter(([, v]) => v.total > 0 && (v.correct / v.total) < 0.6)
      .map(([cat]) => isAr ? (categoriesAr[cat] || cat) : (categories[cat] || cat));

    const levelInfo = determineLevel(finalPct, catBreakdown);

    // Submit to API
    try {
      await fetch("/api/assessment-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          phone: regPhone,
          assessmentType: "Excel Assessment",
          score: finalScore,
          total: questions.length,
          percentage: finalPct,
          level: levelInfo.level,
          weakAreas,
          categoryBreakdown: catBreakdown,
        }),
      });
      setSubmitted(true);
    } catch {
      // silently continue
    }
  }, [regName, regEmail, regPhone, isAr]);

  const reset = () => {
    setScreen(0); setCurrent(0); setAnswers([]); setSelected(null);
    setShowExplanation(false); setSubmitted(false);
    setRegName(""); setRegEmail(""); setRegPhone(""); setRegError("");
  };

  // ── Registration Screen ──
  if (screen === 0) {
    return (
      <section className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-slate-950 via-teal-950/20 to-slate-950 relative overflow-hidden flex items-center">
        <div className="absolute inset-0 dots-bg opacity-20" />
        <div className="relative container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-teal-500 to-green-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-teal-500/30">
                <span className="text-4xl">📊</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black text-white mb-3">{t("title")}</h1>
              <p className="text-slate-400">{isAr ? "أدخل بياناتك للبدء في الاختبار وستصلك نتيجتك على بريدك الإلكتروني" : "Enter your details to start the assessment. Your results will be sent to your email."}</p>
            </div>

            <div className="glass border border-white/10 rounded-3xl p-8">
              <h2 className="text-white font-bold text-lg mb-6 text-center">{isAr ? "التسجيل للاختبار" : "Register for the Assessment"}</h2>
              <form onSubmit={handleRegSubmit} className="space-y-4">
                <div>
                  <label className="block text-slate-400 text-sm mb-2">{isAr ? "الاسم الكامل *" : "Full Name *"}</label>
                  <div className="relative">
                    <User className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={regName}
                      onChange={e => setRegName(e.target.value)}
                      placeholder={isAr ? "أدخل اسمك الكامل" : "Enter your full name"}
                      className="w-full ps-10 pe-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 text-sm mb-2">{isAr ? "البريد الإلكتروني *" : "Email Address *"}</label>
                  <div className="relative">
                    <Mail className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      value={regEmail}
                      onChange={e => setRegEmail(e.target.value)}
                      placeholder={isAr ? "example@email.com" : "example@email.com"}
                      className="w-full ps-10 pe-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 text-sm mb-2">{isAr ? "رقم الهاتف (اختياري)" : "Phone Number (optional)"}</label>
                  <div className="relative">
                    <Phone className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={e => setRegPhone(e.target.value)}
                      placeholder="+966 5X XXX XXXX"
                      className="w-full ps-10 pe-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                      dir="ltr"
                    />
                  </div>
                </div>

                {regError && (
                  <p className="text-red-400 text-sm text-center">{regError}</p>
                )}

                <div className="glass border border-white/10 rounded-2xl p-4 mt-2">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {[{ v: questions.length, l: isAr ? "سؤال" : "Questions" }, { v: "45", l: isAr ? "دقيقة" : "Minutes" }, { v: "✓", l: isAr ? "نتيجة فورية" : "Instant Result" }].map((s, i) => (
                      <div key={i} className="bg-white/5 rounded-xl p-2.5">
                        <div className="text-xl font-black text-teal-400">{s.v}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <button type="submit" className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-600 to-green-600 text-white font-bold text-lg hover:from-teal-500 hover:to-green-500 transition-all shadow-xl hover:shadow-teal-500/30 mt-2">
                  {isAr ? "ابدأ الاختبار ←" : "Start Assessment →"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // ── Results Screen ──
  if (screen === 2) {
    const catBreakdown: Record<string, { correct: number; total: number }> = {};
    questions.forEach((q, i) => {
      if (!catBreakdown[q.category]) catBreakdown[q.category] = { correct: 0, total: 0 };
      catBreakdown[q.category].total++;
      if (answers[i] === q.correctAnswer) catBreakdown[q.category].correct++;
    });

    const categoryBreakdownArr = Object.entries(catBreakdown).map(([cat, val]) => ({
      cat, ...val, pct: val.total > 0 ? Math.round((val.correct / val.total) * 100) : 0
    }));

    const weakAreas = categoryBreakdownArr.filter(c => c.pct < 60).map(c => isAr ? (categoriesAr[c.cat] || c.cat) : (categories[c.cat] || c.cat));
    const levelInfo = determineLevel(pct, catBreakdown);

    return (
      <section className="min-h-screen pt-28 pb-16 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 dots-bg opacity-20" />
        <div className="relative container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl mx-auto">

            {/* Score circle + level */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}
                className="w-36 h-36 rounded-full border-4 flex flex-col items-center justify-center mx-auto mb-5 shadow-2xl"
                style={{ borderColor: levelInfo.color, boxShadow: `0 0 40px ${levelInfo.color}44` }}
              >
                <div className="text-4xl font-black" style={{ color: levelInfo.color }}>{pct}%</div>
                <div className="text-xs text-slate-400">{score}/{questions.length}</div>
              </motion.div>

              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-bold mb-3" style={{ borderColor: levelInfo.color, color: levelInfo.color, background: levelInfo.color + '22' }}>
                {isAr ? levelInfo.levelAr : levelInfo.level}
              </div>

              <p className="text-2xl text-white font-bold mb-2">{isAr ? `مرحبًا ${regName}` : `Hello, ${regName}`}</p>
              <p className="text-slate-400 text-sm">{isAr ? "نتائجك التفصيلية:" : "Your detailed results:"}</p>
            </div>

            {/* Category breakdown */}
            <div className="glass border border-white/10 rounded-2xl p-6 mb-5">
              <h3 className="text-white font-bold text-base mb-4">{isAr ? "الأداء حسب الفئة" : "Performance by Category"}</h3>
              <div className="space-y-3">
                {categoryBreakdownArr.map((c) => (
                  <div key={c.cat}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-slate-300">{isAr ? (categoriesAr[c.cat] || c.cat) : (categories[c.cat] || c.cat)}</span>
                      <span className="font-medium" style={{ color: c.pct >= 70 ? '#10b981' : c.pct >= 40 ? '#f59e0b' : '#ef4444' }}>{c.correct}/{c.total} ({c.pct}%)</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${c.pct}%` }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{ background: c.pct >= 70 ? '#10b981' : c.pct >= 40 ? '#f59e0b' : '#ef4444' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weak areas */}
            {weakAreas.length > 0 && (
              <div className="glass border border-amber-500/20 rounded-2xl p-5 mb-5">
                <h3 className="text-amber-400 font-bold text-sm mb-3">{isAr ? "المجالات التي تحتاج تطوير" : "Areas That Need Improvement"}</h3>
                <div className="flex flex-wrap gap-2">
                  {weakAreas.map((area, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">{area}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Email confirmation */}
            {submitted && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 mb-5">
                <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <p className="text-teal-300 text-sm font-medium">
                  {isAr ? `نتيجتك على إيميلك ✅ تم إرسال شهادتك إلى ${regEmail}` : `✅ Your certificate has been sent to ${regEmail}`}
                </p>
              </motion.div>
            )}

            <button onClick={reset} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-white/20 text-slate-300 hover:bg-white/10 transition-all font-semibold">
              <RotateCcw className="w-5 h-5" /> {t("retake")}
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  // ── Quiz Screen ──
  const q = questions[current];
  const opts = isAr ? q.options.ar : q.options.en;

  return (
    <section className="min-h-screen pt-28 pb-16 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 dots-bg opacity-20" />
      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>{t("question")} {current + 1} {t("of")} {questions.length}</span>
              <span className="text-blue-400 font-medium">{isAr ? (categoriesAr[q.category] || categories[q.category]) : categories[q.category]}</span>
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
