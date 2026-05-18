"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatbotWidgetProps {
  locale: string;
}

const quickReplies = {
  en: [
    "What courses do you offer?",
    "Excel + Power BI + AI price?",
    "Do I get a certificate?",
    "Corporate training?",
    "Payment methods?",
  ],
  ar: [
    "ما الكورسات المتاحة؟",
    "سعر كورس Excel + Power BI؟",
    "هل فيه شهادة؟",
    "تدريب للشركات؟",
    "طرق الدفع؟",
  ],
};

// ─── Vague topic detection: when user sends just a tool/topic name ───────────
const vagueTopics: Record<string, { keywords: string[]; clarify: string }> = {
  python: {
    keywords: ["python", "بايثون", "بيثون", "بايثن", "py"],
    clarify: "بالنسبة لـ Python عايز تعرف إيه بالظبط؟ 🐍\n\n1️⃣ سعر الكورس\n2️⃣ محتوى الكورس\n3️⃣ موعد الجروب القادم\n4️⃣ المتطلبات المسبقة\n5️⃣ الفرق بين Python وSQL\n\nاكتب رقم الخيار أو اسأل بشكل مباشر 😊",
  },
  excel: {
    keywords: ["excel", "اكسيل", "إكسيل", "اكسل", "إكسل"],
    clarify: "بالنسبة لـ Excel عايز تعرف إيه؟ 📊\n\n1️⃣ سعر الكورس\n2️⃣ محتوى الكورس\n3️⃣ موعد الجروب القادم\n4️⃣ المتطلبات المسبقة\n5️⃣ الفرق بين Excel وPower BI\n\nاكتب رقم الخيار أو اسأل بشكل مباشر 😊",
  },
  powerbi: {
    keywords: ["power bi", "powerbi", "بور بي", "بوربي", "power-bi"],
    clarify: "بالنسبة لـ Power BI عايز تعرف إيه؟ 📈\n\n1️⃣ سعر الكورس\n2️⃣ محتوى الكورس\n3️⃣ موعد الجروب القادم\n4️⃣ المتطلبات المسبقة\n5️⃣ مقارنة بـ Tableau\n\nاكتب رقم الخيار أو اسأل بشكل مباشر 😊",
  },
  sql: {
    keywords: ["sql", "اس كيو ال", "سيكوال", "قاعدة بيانات", "قواعد بيانات"],
    clarify: "بالنسبة لـ SQL عايز تعرف إيه؟ 💾\n\n1️⃣ سعر الكورس\n2️⃣ محتوى الكورس\n3️⃣ موعد الجروب القادم\n4️⃣ المتطلبات المسبقة\n5️⃣ الفرق بين SQL وPython\n\nاكتب رقم الخيار أو اسأل بشكل مباشر 😊",
  },
  tableau: {
    keywords: ["tableau", "تابلو", "تابليو"],
    clarify: "بالنسبة لـ Tableau عايز تعرف إيه؟ 📊\n\n1️⃣ سعر الكورس\n2️⃣ محتوى الكورس\n3️⃣ موعد الجروب القادم\n4️⃣ الفرق بين Tableau وPower BI\n\nاكتب رقم الخيار أو اسأل بشكل مباشر 😊",
  },
  looker: {
    keywords: ["looker", "looker studio", "لوكر", "لوكر ستوديو", "google data studio"],
    clarify: "بالنسبة لـ Looker Studio عايز تعرف إيه؟ 📊\n\n1️⃣ سعر الكورس\n2️⃣ محتوى الكورس\n3️⃣ موعد الجروب القادم\n4️⃣ الفرق بين Looker وPower BI\n\nاكتب رقم الخيار أو اسأل بشكل مباشر 😊",
  },
  ai_tools: {
    keywords: ["ai tools", "prompt engineering", "ذكاء اصطناعي", "ai", "chatgpt", "برومبت"],
    clarify: "بالنسبة لكورس AI Tools عايز تعرف إيه؟ 🤖\n\n1️⃣ سعر الكورس\n2️⃣ محتوى الكورس\n3️⃣ موعد الجروب القادم\n4️⃣ مين الكورس ده مناسب له؟\n\nاكتب رقم الخيار أو اسأل بشكل مباشر 😊",
  },
};

// ─── Topic-specific responses ─────────────────────────────────────────────────
const topicDetails: Record<string, Record<string, string>> = {
  python: {
    price: "سعر كورس Python 🐍\n\n💰 السعر: 2,000 ج.م\n\nيشمل:\n✅ محاضرات لايف على Zoom\n✅ التسجيلات تتبعتلك بعد كل محاضرة\n✅ شهادة معتمدة\n✅ مواد ومشاريع حقيقية\n\nللحجز: https://wa.me/201226929392",
    content: "محتوى كورس Python لتحليل البيانات 🐍\n\n📌 الوحدات:\n• Python Basics & Data Types\n• Pandas & NumPy\n• Data Cleaning & Wrangling\n• Matplotlib & Seaborn\n• Exploratory Data Analysis (EDA)\n• مشاريع حقيقية\n\n⏱️ لايف على Zoom — التسجيل بيتبعتلك\n\nللتسجيل: https://wa.me/201226929392",
    date: "الجروب القادم لـ Python 📅\n\nتواصل معنا على واتساب لمعرفة أقرب موعد:\nhttps://wa.me/201226929392",
    requirements: "متطلبات كورس Python 🐍\n\n✅ لا يشترط خبرة مسبقة بالـ Python\n✅ يُفضّل أن تكون جربت Excel من قبل\n✅ جهاز كمبيوتر مع اتصال بالإنترنت\n\nالكورس مناسب للمبتدئين تمامًا! 💪",
    compare: "Python vs SQL 🤔\n\nSQL: لاستخراج وتحليل البيانات من قواعد البيانات — أساسي لكل محلل\nPython: للتحليل المتقدم، الأتمتة، وML\n\nالاثنين مكمّلين لبعض — ابدأ بـ Excel ثم SQL ثم Python!\n• Python: 2,000 ج.م\n• SQL: 2,000 ج.م\n\nللحجز: https://wa.me/201226929392",
  },
  excel: {
    price: "سعر كورس Excel 📊\n\n💰 Excel + Power BI + AI + Freelance: 2,500 ج.م\n(بدلاً من 4,000 ج.م — خصم 37% 🔥)\n\n🎁 هدية مجانية: كورس Tableau + Looker Studio\n\nالجروب القادم: 7 يونيو 2026 📅\n\nللحجز: https://wa.me/201226929392",
    content: "محتوى كورس Excel + Power BI + AI 📊\n\n📌 Excel:\n• من الصفر للاحتراف\n• Pivot Tables & Charts\n• VLOOKUP, INDEX/MATCH\n• Data Cleaning\n\n📌 Power BI:\n• DAX & Power Query\n• داشبوردات تفاعلية\n• Data Modeling\n\n📌 AI في التحليل\n📌 فريلانس ومشاريع حقيقية\n\nللتسجيل: https://wa.me/201226929392",
    date: "الجروب القادم لكورس Excel + Power BI 📅\n\n🗓️ موعد الجروب القادم: 7 يونيو 2026\n\nالأماكن محدودة — سارع بالتسجيل!\nhttps://wa.me/201226929392",
    requirements: "متطلبات كورس Excel 📊\n\n✅ لا يشترط أي خبرة مسبقة\n✅ الكورس يبدأ من الصفر تمامًا\n✅ جهاز كمبيوتر مع Office\n\nمناسب للمبتدئين 100%! 💪",
    compare: "Excel vs Power BI 🤔\n\nExcel: لتحليل البيانات اليدوي والتقارير البسيطة\nPower BI: للداشبوردات التفاعلية والبيانات الضخمة\n\nكورسنا بيعلمك الاثنين + AI + فريلانس في حزمة واحدة!\n\n💰 السعر: 2,500 ج.م (بدلاً من 4,000)\nhttps://wa.me/201226929392",
  },
  powerbi: {
    price: "سعر كورس Power BI 📈\n\nPower BI جزء من الحزمة الكاملة:\n💰 Excel + Power BI + AI + Freelance: 2,500 ج.م 🔥\n\n🎁 هدية: Tableau + Looker Studio\n📅 الجروب القادم: 7 يونيو 2026\n\nللحجز: https://wa.me/201226929392",
    content: "محتوى Power BI في الكورس 📈\n\n• Power Query (تنظيف البيانات)\n• DAX (الحسابات المتقدمة)\n• Data Modeling\n• داشبوردات تفاعلية\n• تحليل KPIs\n• مشاريع حقيقية\n\nضمن حزمة Excel + Power BI + AI\nللتسجيل: https://wa.me/201226929392",
    date: "الجروب القادم لـ Power BI 📅\n\n🗓️ موعد الجروب القادم: 7 يونيو 2026\nالأماكن محدودة!\n\nhttps://wa.me/201226929392",
    requirements: "متطلبات Power BI 📈\n\n✅ يُفضّل أن يكون عندك Excel أساسي\n✅ لا يشترط خبرة بـ Power BI\n✅ جهاز كمبيوتر Windows\n\nالكورس بيعلمك من الصفر! 💪",
    compare: "Power BI vs Tableau 🤔\n\nPower BI: أكثر انتشاراً في الشركات، مجاني للاستخدام الأساسي\nTableau: أقوى في التصور البصري، أغلى\n\nننصح بـ Power BI للمبتدئين ثم Tableau لمن يريد التخصص\n\nعندنا كورسات للاثنين 😊\nhttps://wa.me/201226929392",
  },
  sql: {
    price: "سعر كورس SQL 💾\n\n💰 السعر: 2,000 ج.م\n\nيشمل:\n✅ محاضرات لايف على Zoom\n✅ التسجيلات تتبعتلك\n✅ شهادة معتمدة\n✅ مشاريع حقيقية\n\nللحجز: https://wa.me/201226929392",
    content: "محتوى كورس SQL Server 💾\n\n📌 الوحدات:\n• SQL Basics & SELECT\n• Joins & Subqueries\n• Aggregate Functions\n• Window Functions (ROW_NUMBER, RANK, etc.)\n• Stored Procedures & Views\n• مشاريع تحليل بيانات حقيقية\n\n⏱️ لايف على Zoom\nللتسجيل: https://wa.me/201226929392",
    date: "الجروب القادم لـ SQL 📅\n\nتواصل معنا على واتساب لمعرفة أقرب موعد:\nhttps://wa.me/201226929392",
    requirements: "متطلبات كورس SQL 💾\n\n✅ لا يشترط خبرة مسبقة\n✅ معرفة Excel الأساسية مفيدة بس مش شرط\n✅ جهاز Windows (يُفضّل)\n\nمناسب للمبتدئين! 💪",
    compare: "SQL vs Python 🤔\n\nSQL: لاستخراج وتحليل البيانات من قواعد البيانات — أساسي لكل محلل\nPython: للتحليل المتقدم، الأتمتة، والـ Machine Learning\n\nابدأ بـ SQL ثم Python — الاثنين مطلوبين في السوق!\n• SQL: 2,000 ج.م\n• Python: 2,000 ج.م\n\nhttps://wa.me/201226929392",
  },
  tableau: {
    price: "سعر كورس Tableau 📊\n\n💰 السعر: 1,000 ج.م\n\nأو احصل عليه مجاناً كهدية مع:\n🎁 Excel + Power BI + AI + Freelance (2,500 ج.م)\n\nللحجز: https://wa.me/201226929392",
    content: "محتوى كورس Tableau 📊\n\n• Tableau Desktop Basics\n• Connecting to Data Sources\n• Charts & Visualizations\n• Dashboards & Stories\n• Filters & Parameters\n• Publishing to Tableau Public\n\n⏱️ لايف على Zoom\nللتسجيل: https://wa.me/201226929392",
    date: "الجروب القادم لـ Tableau 📅\n\nتواصل معنا على واتساب لمعرفة أقرب موعد:\nhttps://wa.me/201226929392",
    compare: "Tableau vs Power BI 🤔\n\nTableau: أقوى في التصور البصري، مرن جداً\nPower BI: أكثر انتشاراً في الشركات، مجاني\n\nعندنا كورس لكل منهم:\n• Tableau: 1,000 ج.م\n• Power BI: جزء من حزمة Excel (2,500 ج.م)\n\nhttps://wa.me/201226929392",
  },
  looker: {
    price: "سعر كورس Looker Studio 📊\n\n💰 السعر: 1,000 ج.م\n\nأو احصل عليه مجاناً كهدية مع:\n🎁 Excel + Power BI + AI + Freelance (2,500 ج.م)\n\nللحجز: https://wa.me/201226929392",
    content: "محتوى كورس Looker Studio 📊\n\n• ربط مصادر البيانات (Google Sheets, BigQuery, ...)\n• Charts & Visualizations\n• داشبوردات تفاعلية\n• Filters & Date Ranges\n• مشاركة التقارير\n\n⏱️ لايف على Zoom\nللتسجيل: https://wa.me/201226929392",
    date: "الجروب القادم لـ Looker Studio 📅\n\nتواصل معنا على واتساب لمعرفة أقرب موعد:\nhttps://wa.me/201226929392",
    compare: "Looker Studio vs Power BI 🤔\n\nLooker Studio: مجاني تماماً، مرتبط بنظام Google\nPower BI: مدفوع للمؤسسات، أقوى في النمذجة\n\nللمبتدئين: Looker Studio نقطة بداية ممتازة 😊\nhttps://wa.me/201226929392",
  },
  ai_tools: {
    price: "سعر كورس AI Tools 🤖\n\n💰 السعر: 1,500 ج.م (بدلاً من 4,000 ج.م) 🔥\n\nيشمل:\n✅ ChatGPT, Gemini, Copilot في التحليل\n✅ Prompt Engineering\n✅ أتمتة المهام بالـ AI\n✅ شهادة معتمدة\n\nللحجز: https://wa.me/201226929392",
    content: "محتوى كورس AI Tools & Prompt Engineering 🤖\n\n• ChatGPT للمحللين\n• Prompt Engineering للحصول على أفضل نتائج\n• Copilot في Excel & Power BI\n• Gemini لتحليل البيانات\n• أتمتة التقارير بالـ AI\n• مشاريع تطبيقية\n\n⏱️ لايف على Zoom\nللتسجيل: https://wa.me/201226929392",
    date: "الجروب القادم لكورس AI Tools 📅\n\nتواصل معنا على واتساب لمعرفة أقرب موعد:\nhttps://wa.me/201226929392",
    suitable: "مناسب لمين كورس AI Tools؟ 🤖\n\n✅ المحللين اللي عايزين يتسرّعوا بالـ AI\n✅ أي حد بيشتغل مع بيانات أو تقارير\n✅ المدراء اللي عايزين يوفروا وقت\n✅ الفريلانسرز\n\nالكورس مش للمبرمجين فقط — مناسب للجميع! 💪\nhttps://wa.me/201226929392",
  },
};

// ─── General responses ────────────────────────────────────────────────────────
const botResponses: Record<string, string> = {
  courses:
    "كورساتنا المتاحة 🎓\n• Excel + Power BI + AI + Freelance — 2,500 ج.م 🔥\n• SQL Server — 2,000 ج.م\n• Python — 2,000 ج.م\n• أدوات AI وPrompt Engineering — 1,500 ج.م\n• Tableau — 1,000 ج.م\n• Looker Studio — 1,000 ج.م\n• كتابة التقارير الاحترافية — 3,000 ج.م\n• الباقة الكاملة — 6,000 ج.م\n\nكل الكورسات لايف على Zoom 🔴\n📅 الجروب القادم: 7 يونيو 2026\n\nللحجز: https://wa.me/201226929392",
  price:
    "أسعار كورساتنا 💰\n• Excel + Power BI + AI: 2,500 ج.م (بدلاً من 4,000) 🔥\n• SQL Server: 2,000 ج.م\n• Python: 2,000 ج.م\n• أدوات AI: 1,500 ج.م (بدلاً من 4,000)\n• Tableau: 1,000 ج.م\n• Looker Studio: 1,000 ج.م\n• الباقة الكاملة: 6,000 ج.م\n\nالدفع: InstaPay أو Vodafone Cash 💳\nhttps://wa.me/201226929392",
  certificate:
    "نعم! ✅ بعد إنهاء أي كورس ستحصل على شهادة معتمدة من Knowlytics يمكنك إضافتها على LinkedIn 🏆\n\nالشهادات معترف بها من كبرى الشركات في المنطقة.",
  corporate:
    "نقدم تدريباً مؤسسياً واستشارات شركات 🏢\n\nدربنا بالفعل:\n• Saint-Gobain\n• AFRAS\n• Cinnabon\n• EFS\n• وشركات أخرى\n\nنقدم تدريباً مخصصاً لاحتياجات فريقك.\nللاستفسار: https://wa.me/201226929392",
  whatIsDA:
    "تحليل البيانات هو عملية فحص البيانات وتنظيفها واستخلاص معلومات تساعد في اتخاذ قرارات أفضل 📊\n\nالمحلل بيحوّل الأرقام الخام لرؤى حقيقية تساعد الشركات تنمو.\n\nالأدوات الأساسية: Excel، Power BI، SQL، Python، Tableau.\n\nعايز تبدأ؟ https://wa.me/201226929392",
  market:
    "السوق محتاج محللين بيانات بشدة! 🚀\n\nكل شركة دلوقتي محتاجة محلل بيانات — من الشركات الناشئة للمتعددة الجنسيات.\n\nالطلب بيزيد مع انتشار الـ AI والتحول الرقمي.\nبالعكس في نقص كبير في المتخصصين المؤهلين في السوق العربي!",
  salary:
    "مرتبات محللي البيانات في مصر 💵\n\n• مبتدئ: 8,000 - 15,000 ج.م\n• متوسط: 15,000 - 30,000 ج.م\n• خبير: 30,000 - 60,000+ ج.م\n\nفريلانس دولياً: 50-150 دولار/ساعة 🌍\n\nابدأ مسيرتك معنا: https://wa.me/201226929392",
  roadmap:
    "رود ماب تحليل البيانات 🗺️\n\n1️⃣ افهم المجال وأهميته\n2️⃣ Excel + Power BI (الأساس)\n3️⃣ SQL + Python (التحليل المتقدم)\n4️⃣ Tableau + Looker Studio (التصور)\n5️⃣ إحصاء أساسي + كتابة تقارير\n6️⃣ مهارات شخصية وLinkedIn\n\nعندنا كورسات لكل خطوة! 🎓\nhttps://wa.me/201226929392",
  aiVsDA:
    "AI مش هيلغي محللي البيانات! 🤖\n\nهيحوّل الدور — بدل ما المحلل يعمل حسابات يدوية، هيركز على تفسير النتائج واتخاذ قرارات استراتيجية.\n\nالمحلل اللي بيستخدم AI هيكون أقوى بـ10 أضعاف.\n\nعندنا كورس AI Tools خصيصاً لده! 💡\nhttps://wa.me/201226929392",
  job:
    "إزاي تلاقي شغل كمحلل بيانات؟ 💼\n\n✅ اتقن الأدوات (Excel, Power BI, SQL, Python)\n✅ اعمل مشاريع حقيقية وPortfolio قوي\n✅ ابني Personal Brand على LinkedIn\n✅ احتك بالسوق في أي مجال\n\nفي Knowlytics بنساعدك تبني Portfolio حقيقي من اليوم الأول! 🚀\nhttps://wa.me/201226929392",
  payment:
    "طرق الدفع 💳\n\n• InstaPay\n• Vodafone Cash\n\nبعد الدفع ابعت صورة الإيصال على واتساب وهيتأكد تسجيلك فوراً ✅\n\nhttps://wa.me/201226929392",
  nextGroup:
    "موعد الجروب القادم 📅\n\n🗓️ كورس Excel + Power BI + AI + Freelance: 7 يونيو 2026\n\nالأماكن محدودة — سارع بالتسجيل!\nhttps://wa.me/201226929392",
  default:
    "شكراً لتواصلك! 😊\n\nأقدر أساعدك في:\n• معلومات الكورسات والأسعار\n• رود ماب تحليل البيانات\n• فرص العمل والمرتبات\n• مواعيد الجروبات\n• تدريب الشركات\n\nأو تواصل مباشرة:\nhttps://wa.me/201226929392",
};

// ─── Detect if user sent just a vague topic keyword ──────────────────────────
function detectVagueTopic(msg: string): string | null {
  const lower = msg.toLowerCase().trim().replace(/[؟?!،,]/g, "");
  for (const [topic, data] of Object.entries(vagueTopics)) {
    if (data.keywords.some((k) => lower === k)) return topic;
  }
  return null;
}

// ─── Match user clarification to topic-specific response ─────────────────────
function getTopicResponse(topic: string, clarification: string): string {
  const msg = clarification.toLowerCase();
  const r = topicDetails[topic];
  if (!r) return botResponses.default;

  if (msg === "1" || msg.includes("سعر") || msg.includes("كم") || msg.includes("price") || msg.includes("تكلفة") || msg.includes("فلوس"))
    return r.price ?? botResponses.price;
  if (msg === "2" || msg.includes("محتوى") || msg.includes("content") || msg.includes("مواضيع") || msg.includes("ايه بيتعلم") || msg.includes("بيتعلم"))
    return r.content ?? botResponses.courses;
  if (msg === "3" || msg.includes("موعد") || msg.includes("جروب") || msg.includes("تاريخ") || msg.includes("date") || msg.includes("امتى") || msg.includes("متى"))
    return r.date ?? botResponses.nextGroup;
  if (msg === "4" || msg.includes("متطلب") || msg.includes("requirement") || msg.includes("خبرة") || msg.includes("لازم") || msg.includes("مناسب"))
    return r.requirements ?? r.suitable ?? botResponses.default;
  if (msg === "5" || msg.includes("فرق") || msg.includes("compare") || msg.includes("مقارنة") || msg.includes("vs") || msg.includes("ولا"))
    return r.compare ?? botResponses.default;

  // fallback: general topic info
  return r.content ?? botResponses.default;
}

// ─── General keyword matching ─────────────────────────────────────────────────
function getBotResponse(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("course") || m.includes("كورس") || m.includes("دورة") || m.includes("دورات") || m.includes("متاح") || m.includes("عندكم"))
    return botResponses.courses;
  if (m.includes("price") || m.includes("cost") || m.includes("سعر") || m.includes("تكلفة") || m.includes("كم ") || m.includes("فلوس") || m.includes("أسعار"))
    return botResponses.price;
  if (m.includes("certificate") || m.includes("شهادة") || m.includes("cert"))
    return botResponses.certificate;
  if (m.includes("corporate") || m.includes("company") || m.includes("شركة") || m.includes("مؤسسي") || m.includes("استشار") || m.includes("شركات"))
    return botResponses.corporate;
  if (m.includes("تحليل البيانات") || m.includes("data analysis") || m.includes("يعني ايه") || m.includes("ما هو") || m.includes("ايه هو"))
    return botResponses.whatIsDA;
  if (m.includes("سوق") || m.includes("تشبع") || m.includes("market") || m.includes("طلب") || m.includes("فرص"))
    return botResponses.market;
  if (m.includes("مرتب") || m.includes("راتب") || m.includes("salary") || m.includes("كسب") || m.includes("دخل") || m.includes("ربح"))
    return botResponses.salary;
  if (m.includes("رود ماب") || m.includes("roadmap") || m.includes("ابدأ") || m.includes("خطوات") || m.includes("اتعلم") || m.includes("أبدأ"))
    return botResponses.roadmap;
  if (m.includes("يلغي") || m.includes("مستقبل") || m.includes("replace") || m.includes("هيلغي"))
    return botResponses.aiVsDA;
  if (m.includes("شغل") || m.includes("وظيفة") || m.includes("job") || m.includes("توظيف") || m.includes("hire") || m.includes("اشتغل"))
    return botResponses.job;
  if (m.includes("دفع") || m.includes("payment") || m.includes("instapay") || m.includes("vodafone") || m.includes("فودافون") || m.includes("ادفع"))
    return botResponses.payment;
  if (m.includes("موعد") || m.includes("جروب") || m.includes("تاريخ") || m.includes("7 يون") || m.includes("june") || m.includes("امتى") || m.includes("متى الجروب"))
    return botResponses.nextGroup;
  return botResponses.default;
}

export default function ChatbotWidget({ locale }: ChatbotWidgetProps) {
  const t = useTranslations("ai");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [pendingTopic, setPendingTopic] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isAr = locale === "ar";

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "1",
          role: "assistant",
          content: t("greeting"),
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 700));

    let responseContent: string;

    if (pendingTopic) {
      // User is clarifying a previously detected vague topic
      responseContent = getTopicResponse(pendingTopic, content);
      setPendingTopic(null);
    } else {
      // Check if this is a vague topic keyword
      const vague = detectVagueTopic(content);
      if (vague) {
        responseContent = vagueTopics[vague].clarify;
        setPendingTopic(vague);
      } else {
        responseContent = getBotResponse(content);
      }
    }

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: responseContent,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMsg]);
    setIsTyping(false);
  };

  return (
    <div className={cn("fixed bottom-24 z-50", isAr ? "start-6" : "start-6")}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-16 start-0 w-80 sm:w-96 glass bg-slate-900/98 rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col"
            style={{ height: "460px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Knowlytics AI</p>
                  <p className="text-green-400 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-2",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm",
                      msg.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-ee-none"
                        : "bg-white/10 text-slate-200 rounded-es-none"
                    )}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="w-4 h-4 text-slate-300" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white/10 rounded-2xl rounded-es-none px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-1.5">
                  {(isAr ? quickReplies.ar : quickReplies.en).map((reply) => (
                    <button
                      key={reply}
                      onClick={() => sendMessage(reply)}
                      className="px-2.5 py-1 rounded-full border border-blue-500/40 text-blue-400 text-xs hover:bg-blue-500/10 transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  dir="auto"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isAr ? "اكتب رسالتك هنا..." : "Type your message..."}
                  className="flex-1 min-w-0 bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Chat"
        className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-xl shadow-blue-500/30 chatbot-bubble"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
