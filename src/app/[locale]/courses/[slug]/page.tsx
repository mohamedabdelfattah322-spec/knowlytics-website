"use client";

import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Clock,
  BarChart2,
  Star,
  Users,
  CheckCircle2,
  PlayCircle,
  Award,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Globe,
  Infinity,
  MessageSquare,
  Smartphone,
  ArrowLeft,
  ArrowRight,
  Lock,
} from "lucide-react";
import coursesData from "@/data/courses.json";
import { useState } from "react";

// Static curriculum data keyed by slug
const CURRICULA: Record<
  string,
  { titleEn: string; titleAr: string; lessons: { en: string; ar: string; duration: string; free?: boolean }[] }[]
> = {
  "excel-zero-to-hero": [
    {
      titleEn: "Excel Fundamentals",
      titleAr: "أساسيات إكسل",
      lessons: [
        { en: "Introduction & Interface Overview", ar: "المقدمة ونظرة عامة على الواجهة", duration: "12 min", free: true },
        { en: "Data Entry & Formatting", ar: "إدخال البيانات والتنسيق", duration: "18 min", free: true },
        { en: "Essential Formulas & Functions", ar: "الصيغ والدوال الأساسية", duration: "25 min" },
        { en: "Sorting, Filtering & Conditional Formatting", ar: "الفرز والتصفية والتنسيق الشرطي", duration: "20 min" },
      ],
    },
    {
      titleEn: "Data Analysis with Pivot Tables",
      titleAr: "تحليل البيانات بالجداول المحورية",
      lessons: [
        { en: "Creating Your First Pivot Table", ar: "إنشاء أول جدول محوري", duration: "22 min" },
        { en: "Advanced Pivot Table Techniques", ar: "تقنيات الجداول المحورية المتقدمة", duration: "28 min" },
        { en: "Pivot Charts & Slicers", ar: "مخططات المحور والشرائح", duration: "20 min" },
      ],
    },
    {
      titleEn: "Power Query",
      titleAr: "Power Query",
      lessons: [
        { en: "Introduction to Power Query", ar: "مقدمة إلى Power Query", duration: "15 min" },
        { en: "Data Cleaning & Transformation", ar: "تنظيف البيانات وتحويلها", duration: "35 min" },
        { en: "Merging & Appending Queries", ar: "دمج الاستعلامات وإلحاقها", duration: "25 min" },
      ],
    },
    {
      titleEn: "Professional Dashboards",
      titleAr: "لوحات المعلومات الاحترافية",
      lessons: [
        { en: "Dashboard Design Principles", ar: "مبادئ تصميم لوحة المعلومات", duration: "18 min" },
        { en: "Building Interactive Charts", ar: "بناء مخططات تفاعلية", duration: "30 min" },
        { en: "Final Project: Full Dashboard", ar: "المشروع النهائي: لوحة معلومات كاملة", duration: "45 min" },
      ],
    },
  ],
  "excel-powerbi-ai-freelance": [
    {
      titleEn: "Excel Fundamentals",
      titleAr: "القسم الأول: Excel Fundamentals",
      lessons: [
        { en: "Key Excel Tools & Functions", ar: "أهم الأدوات والدوال في Excel", duration: "30 min", free: true },
        { en: "Preparing Data Before Analysis", ar: "تجهيز المتدربين قبل الدخول في تحليل البيانات", duration: "25 min", free: true },
      ],
    },
    {
      titleEn: "Data Analysis with Excel",
      titleAr: "القسم الثاني: Data Analysis with Excel",
      lessons: [
        { en: "Power Query", ar: "Power Query", duration: "40 min" },
        { en: "Pivot Tables", ar: "Pivot Tables", duration: "35 min" },
        { en: "Data Visualization", ar: "Data Visualization", duration: "30 min" },
        { en: "Interactive Dashboards", ar: "Interactive Dashboards", duration: "45 min" },
        { en: "Statistical Functions", ar: "Statistical Functions", duration: "25 min" },
        { en: "Analysis Tools", ar: "Analysis Tools", duration: "20 min" },
        { en: "AI Integration", ar: "AI Integration", duration: "20 min" },
      ],
    },
    {
      titleEn: "Data Analysis with Power BI",
      titleAr: "القسم الثالث: Data Analysis with Power BI",
      lessons: [
        { en: "Program Interface", ar: "Program Interface", duration: "20 min" },
        { en: "Power Query", ar: "Power Query", duration: "30 min" },
        { en: "Data Visualization", ar: "Data Visualization", duration: "25 min" },
        { en: "Interactive Dashboards", ar: "Interactive Dashboards", duration: "35 min" },
        { en: "Data Modeling & Relationships", ar: "Data Modeling & Relationships", duration: "35 min" },
        { en: "DAX Functions", ar: "DAX Functions", duration: "45 min" },
        { en: "Power BI Service", ar: "Power BI Service", duration: "20 min" },
        { en: "AI Integration", ar: "AI Integration", duration: "20 min" },
      ],
    },
    {
      titleEn: "AI in Data Analysis",
      titleAr: "القسم الرابع: AI in Data Analysis",
      lessons: [
        { en: "Using AI in Analysis", ar: "استخدام الذكاء الاصطناعي في التحليل", duration: "30 min" },
        { en: "Practical Applications in Daily Projects", ar: "تطبيقات عملية في المشاريع اليومية", duration: "25 min" },
      ],
    },
    {
      titleEn: "Freelancing",
      titleAr: "القسم الخامس: Freelancing",
      lessons: [
        { en: "How to Work as a Freelance Data Analyst", ar: "كيفية العمل كمحلل بيانات مستقل", duration: "20 min" },
        { en: "Building a Strong Portfolio", ar: "بناء ملف أعمال قوي", duration: "25 min" },
        { en: "Getting Your First Client", ar: "طرق الحصول على أول عميل", duration: "20 min" },
      ],
    },
  ],
  "sql-data-analysis": [
    {
      titleEn: "Database Fundamentals",
      titleAr: "أساسيات قواعد البيانات",
      lessons: [
        { en: "What is a Database?", ar: "ما هي قاعدة البيانات؟", duration: "15 min", free: true },
        { en: "Criteria for Choosing a Database", ar: "معايير اختيار قاعدة البيانات", duration: "12 min", free: true },
        { en: "Download & Install SQL Server (Step by Step)", ar: "تحميل وتثبيت SQL Server خطوة بخطوة", duration: "15 min" },
        { en: "SQL Server Services and Security Types", ar: "خدمات SQL Server وأنواع الأمان", duration: "18 min" },
      ],
    },
    {
      titleEn: "Data Modeling",
      titleAr: "نمذجة البيانات",
      lessons: [
        { en: "Data Modeling (ERD, Relationships, Data Types, Constraints)", ar: "نمذجة البيانات (ERD، العلاقات، أنواع البيانات، القيود)", duration: "30 min" },
        { en: "Creating Databases & Tables", ar: "إنشاء قواعد البيانات والجداول", duration: "22 min" },
      ],
    },
    {
      titleEn: "SQL Statements",
      titleAr: "SQL Statements",
      lessons: [
        { en: "SQL Statements (DDL, DML, DCL)", ar: "SQL Statements (DDL, DML, DCL)", duration: "30 min" },
        { en: "Writing Queries: SELECT", ar: "كتابة الاستعلامات: SELECT", duration: "20 min" },
        { en: "Writing Queries: WHERE", ar: "كتابة الاستعلامات: WHERE", duration: "20 min" },
        { en: "Writing Queries: GROUP BY", ar: "كتابة الاستعلامات: GROUP BY", duration: "20 min" },
        { en: "Writing Queries: ORDER BY", ar: "كتابة الاستعلامات: ORDER BY", duration: "15 min" },
        { en: "Writing Queries: JOIN", ar: "كتابة الاستعلامات: JOIN", duration: "35 min" },
        { en: "Indexes & Performance Basics", ar: "الفهارس وأساسيات الأداء", duration: "25 min" },
      ],
    },
    {
      titleEn: "Advanced Applications",
      titleAr: "التطبيقات المتقدمة",
      lessons: [
        { en: "Backup & Restore Database", ar: "النسخ الاحتياطي واستعادة قاعدة البيانات", duration: "20 min" },
        { en: "Connecting SQL Server with Excel & Power BI", ar: "ربط SQL Server بـ Excel وPower BI", duration: "30 min" },
      ],
    },
  ],
  "python-data-analysis": [
    {
      titleEn: "Python Basics",
      titleAr: "Python Basics",
      lessons: [
        { en: "Python Basics", ar: "Python Basics", duration: "20 min", free: true },
        { en: "If Else Conditions & Loops", ar: "If Else Conditions & Loops", duration: "25 min", free: true },
        { en: "Lists, Sets, Dictionaries", ar: "Lists, Sets, Dictionaries", duration: "22 min" },
        { en: "Functions", ar: "Functions", duration: "20 min" },
      ],
    },
    {
      titleEn: "Data Libraries",
      titleAr: "مكتبات البيانات",
      lessons: [
        { en: "NumPy Library", ar: "NumPy Library", duration: "35 min" },
        { en: "Pandas Library", ar: "Pandas Library", duration: "45 min" },
      ],
    },
    {
      titleEn: "Data Visualization",
      titleAr: "تصور البيانات",
      lessons: [
        { en: "Matplotlib & Seaborn for Data Visualization", ar: "Matplotlib & Seaborn لتصور البيانات", duration: "45 min" },
      ],
    },
    {
      titleEn: "Real-World Projects",
      titleAr: "مشاريع حقيقية",
      lessons: [
        { en: "Real Data Analysis Projects", ar: "العمل على مشاريع حقيقية لتحليل البيانات", duration: "60 min" },
      ],
    },
  ],
  "tableau-beginners": [
    {
      titleEn: "Getting Started with Tableau",
      titleAr: "البداية مع Tableau",
      lessons: [
        { en: "Introduction to Tableau", ar: "مقدمة في Tableau", duration: "10 min", free: true },
        { en: "Connecting to Data Sources", ar: "الاتصال بمصادر البيانات", duration: "15 min", free: true },
        { en: "Data Cleaning Basics", ar: "أساسيات تنظيف البيانات", duration: "20 min" },
        { en: "Creating Charts and Visualizations", ar: "إنشاء المخططات والتصورات البيانية", duration: "30 min" },
      ],
    },
    {
      titleEn: "Analysis & Interactivity",
      titleAr: "التحليل والتفاعلية",
      lessons: [
        { en: "Filters and Parameters", ar: "الفلاتر والـ Parameters", duration: "25 min" },
        { en: "Calculated Fields", ar: "الحقول المحسوبة", duration: "25 min" },
        { en: "Interactive Reports", ar: "التقارير التفاعلية", duration: "25 min" },
      ],
    },
    {
      titleEn: "Dashboards & Publishing",
      titleAr: "لوحات المعلومات والنشر",
      lessons: [
        { en: "Dashboards", ar: "إنشاء Dashboards احترافية", duration: "35 min" },
        { en: "Storytelling with Data", ar: "سرد القصص بالبيانات", duration: "20 min" },
        { en: "Publishing and Sharing Reports", ar: "نشر ومشاركة التقارير", duration: "15 min" },
      ],
    },
  ],
  "looker-studio-beginners": [
    {
      titleEn: "Getting Started",
      titleAr: "البداية مع Looker Studio",
      lessons: [
        { en: "Introduction to Looker Studio", ar: "مقدمة في Looker Studio", duration: "10 min", free: true },
        { en: "Connecting to Data Sources (Excel, Google Sheets, SQL)", ar: "ربط مصادر البيانات (Excel, Google Sheets, SQL)", duration: "20 min", free: true },
        { en: "Creating Charts and Tables", ar: "إنشاء المخططات والجداول", duration: "25 min" },
      ],
    },
    {
      titleEn: "Advanced Features",
      titleAr: "الميزات المتقدمة",
      lessons: [
        { en: "Filters and Date Controls", ar: "الفلاتر وعناصر التحكم في التاريخ", duration: "20 min" },
        { en: "Calculated Fields", ar: "الحقول المحسوبة", duration: "25 min" },
        { en: "Data Blending", ar: "دمج البيانات من مصادر متعددة", duration: "20 min" },
      ],
    },
    {
      titleEn: "Dashboards & Publishing",
      titleAr: "لوحات المعلومات والنشر",
      lessons: [
        { en: "Interactive Dashboards", ar: "إنشاء Dashboards تفاعلية", duration: "30 min" },
        { en: "Sharing and Publishing Reports", ar: "مشاركة ونشر التقارير", duration: "15 min" },
      ],
    },
  ],
  "report-writing": [
    {
      titleEn: "Report Structure & Foundation",
      titleAr: "هيكل التقرير وأساسياته",
      lessons: [
        { en: "Types of Reports and Their Objectives", ar: "أنواع التقارير وأهدافها", duration: "15 min", free: true },
        { en: "Structure of a Professional Report", ar: "هيكل التقرير الاحترافي", duration: "20 min", free: true },
        { en: "Writing Executive Summary", ar: "كتابة الملخص التنفيذي", duration: "25 min" },
      ],
    },
    {
      titleEn: "Content & Data Presentation",
      titleAr: "المحتوى وعرض البيانات",
      lessons: [
        { en: "Presenting Data and Insights", ar: "عرض البيانات والنتائج بشكل واضح", duration: "30 min" },
        { en: "Writing Findings and Recommendations", ar: "كتابة النتائج والتوصيات (Recommendations)", duration: "30 min" },
        { en: "Tables and Charts Best Practices", ar: "استخدام الجداول والرسوم البيانية في التقارير", duration: "20 min" },
      ],
    },
    {
      titleEn: "Formatting, Mistakes & Practice",
      titleAr: "التنسيق والأخطاء والتطبيق",
      lessons: [
        { en: "Formatting and Design", ar: "التنسيق والتصميم الاحترافي", duration: "20 min" },
        { en: "Common Mistakes to Avoid", ar: "الأخطاء الشائعة وكيف تتجنبها", duration: "15 min" },
        { en: "Practical Exercises", ar: "تمارين عملية على تقارير حقيقية", duration: "45 min" },
      ],
    },
  ],
  "ai-tools-prompt-engineering": [
    {
      titleEn: "Popular AI Tools",
      titleAr: "أشهر أدوات الذكاء الاصطناعي",
      lessons: [
        { en: "ChatGPT", ar: "ChatGPT", duration: "30 min", free: true },
        { en: "Claude", ar: "Claude", duration: "25 min", free: true },
        { en: "Google Gemini", ar: "Google Gemini", duration: "20 min" },
        { en: "Gamma", ar: "Gamma", duration: "20 min" },
      ],
    },
    {
      titleEn: "Prompt Engineering",
      titleAr: "Prompt Engineering",
      lessons: [
        { en: "What is a Prompt?", ar: "ما هو الـ Prompt؟", duration: "15 min" },
        { en: "Components of an Effective Prompt", ar: "مكونات البرومبت الفعّال", duration: "20 min" },
        { en: "Role, Task, Context, Output Format", ar: "الدور، المهمة، السياق، صيغة الإخراج", duration: "25 min" },
        { en: "Practical Prompt Examples", ar: "أمثلة عملية على البرومبت", duration: "25 min" },
      ],
    },
    {
      titleEn: "Practical Applications",
      titleAr: "التطبيقات العملية",
      lessons: [
        { en: "Writing Reports", ar: "كتابة التقارير", duration: "20 min" },
        { en: "Creating Presentations", ar: "إعداد العروض التقديمية", duration: "15 min" },
        { en: "Data Analysis", ar: "تحليل البيانات", duration: "20 min" },
        { en: "Writing Code", ar: "كتابة الأكواد البرمجية", duration: "15 min" },
        { en: "CV Creation", ar: "إنشاء السيرة الذاتية", duration: "15 min" },
        { en: "Professional Emails", ar: "كتابة الإيميلات الاحترافية", duration: "10 min" },
        { en: "Translation and Rewriting", ar: "الترجمة وإعادة الصياغة", duration: "10 min" },
      ],
    },
    {
      titleEn: "Hands-on Projects",
      titleAr: "مشاريع عملية تطبيقية",
      lessons: [
        { en: "Creating Presentations with Gamma", ar: "إنشاء عرض تقديمي كامل بـ Gamma", duration: "30 min" },
        { en: "Writing Full Reports with AI", ar: "كتابة تقرير كامل باستخدام AI", duration: "35 min" },
        { en: "Data Analysis using AI Tools", ar: "تحليل بيانات حقيقية باستخدام أدوات AI", duration: "35 min" },
        { en: "Building a Personal Prompt Library", ar: "بناء مكتبة Prompts جاهزة للعمل", duration: "25 min" },
      ],
    },
  ],
  "full-data-analysis-bundle": [
    {
      titleEn: "Excel — From Zero to Hero",
      titleAr: "Excel من الصفر للاحتراف",
      lessons: [
        { en: "Excel Fundamentals & Key Functions", ar: "أساسيات Excel وأهم الدوال", duration: "45 min", free: true },
        { en: "Pivot Tables, Power Query & Dashboards", ar: "Pivot Tables وPower Query ولوحات المعلومات", duration: "60 min" },
      ],
    },
    {
      titleEn: "Power BI — Data Analysis & Reports",
      titleAr: "Power BI — التحليل والتقارير",
      lessons: [
        { en: "Power BI Interface & Data Modeling", ar: "واجهة Power BI ونمذجة البيانات", duration: "40 min" },
        { en: "DAX Functions & Advanced Reports", ar: "دوال DAX والتقارير المتقدمة", duration: "50 min" },
      ],
    },
    {
      titleEn: "SQL Server for Data Analysis",
      titleAr: "SQL Server لتحليل البيانات",
      lessons: [
        { en: "SQL Fundamentals & Database Design", ar: "أساسيات SQL وتصميم قواعد البيانات", duration: "45 min" },
        { en: "Advanced Queries & Integration", ar: "الاستعلامات المتقدمة والتكامل", duration: "40 min" },
      ],
    },
    {
      titleEn: "Python for Data Analysis",
      titleAr: "Python لتحليل البيانات",
      lessons: [
        { en: "Python, Pandas & NumPy", ar: "Python وPandas وNumPy", duration: "50 min" },
        { en: "Data Visualization & Projects", ar: "تصور البيانات والمشاريع", duration: "45 min" },
      ],
    },
    {
      titleEn: "AI Tools, Tableau & Looker Studio",
      titleAr: "أدوات AI وTableau وLooker Studio",
      lessons: [
        { en: "AI Tools & Prompt Engineering", ar: "أدوات AI وهندسة البرومبت", duration: "40 min" },
        { en: "Tableau & Looker Studio Dashboards", ar: "لوحات Tableau وLooker Studio", duration: "40 min" },
        { en: "Professional Report Writing", ar: "كتابة التقارير الاحترافية", duration: "35 min" },
      ],
    },
    {
      titleEn: "Final Projects & Portfolio",
      titleAr: "المشاريع النهائية والحافظة",
      lessons: [
        { en: "Real-World End-to-End Projects", ar: "مشاريع حقيقية من البداية للنهاية", duration: "90 min" },
        { en: "Building Your Portfolio", ar: "بناء ملف الأعمال", duration: "30 min" },
      ],
    },
  ],
};

// Default curriculum for courses without a specific one
function getDefaultCurriculum(titleEn: string, titleAr: string) {
  return [
    {
      titleEn: "Getting Started",
      titleAr: "البدء",
      lessons: [
        { en: `Introduction to ${titleEn}`, ar: `مقدمة إلى ${titleAr}`, duration: "10 min", free: true },
        { en: "Course Overview & Goals", ar: "نظرة عامة على الدورة والأهداف", duration: "8 min", free: true },
        { en: "Setting Up Your Environment", ar: "إعداد بيئتك", duration: "15 min" },
      ],
    },
    {
      titleEn: "Core Concepts",
      titleAr: "المفاهيم الأساسية",
      lessons: [
        { en: "Fundamentals & Theory", ar: "الأساسيات والنظرية", duration: "30 min" },
        { en: "Hands-on Practice", ar: "التدريب العملي", duration: "40 min" },
        { en: "Real-World Case Studies", ar: "دراسات حالة من العالم الحقيقي", duration: "35 min" },
      ],
    },
    {
      titleEn: "Advanced Topics",
      titleAr: "المواضيع المتقدمة",
      lessons: [
        { en: "Advanced Techniques", ar: "التقنيات المتقدمة", duration: "45 min" },
        { en: "Best Practices & Tips", ar: "أفضل الممارسات والنصائح", duration: "25 min" },
        { en: "Industry Applications", ar: "التطبيقات الصناعية", duration: "30 min" },
      ],
    },
    {
      titleEn: "Final Project",
      titleAr: "المشروع النهائي",
      lessons: [
        { en: "Project Planning & Setup", ar: "التخطيط للمشروع والإعداد", duration: "20 min" },
        { en: "Building the Project", ar: "بناء المشروع", duration: "60 min" },
        { en: "Review & Submission", ar: "المراجعة والتقديم", duration: "15 min" },
      ],
    },
  ];
}

const LEARN_OUTCOMES: Record<string, { en: string; ar: string }[]> = {
  "excel-zero-to-hero": [
    { en: "Build professional dashboards from scratch", ar: "بناء لوحات معلومات احترافية من الصفر" },
    { en: "Master Pivot Tables and Power Query", ar: "إتقان جداول البيانات المحورية وPower Query" },
    { en: "Write complex formulas and functions confidently", ar: "كتابة الصيغ والدوال المعقدة بثقة" },
    { en: "Clean and transform messy data", ar: "تنظيف البيانات الفوضوية وتحويلها" },
    { en: "Create dynamic charts and visualizations", ar: "إنشاء مخططات وتصورات ديناميكية" },
    { en: "Use Conditional Formatting for insights", ar: "استخدام التنسيق الشرطي لاستخلاص الرؤى" },
  ],
  "excel-powerbi-ai-freelance": [
    { en: "Analyze data professionally with Excel & Power BI", ar: "تحليل البيانات باحترافية باستخدام Excel وPower BI" },
    { en: "Build interactive dashboards in both tools", ar: "بناء لوحات معلومات تفاعلية في كلا الأداتين" },
    { en: "Write DAX formulas for advanced calculations", ar: "كتابة صيغ DAX للحسابات المتقدمة" },
    { en: "Integrate AI tools into your daily analysis workflow", ar: "دمج أدوات AI في سير العمل اليومي" },
    { en: "Land freelance clients as a data analyst", ar: "الحصول على عملاء فريلانس كمحلل بيانات" },
    { en: "Get a free Tableau + Looker Studio bonus course", ar: "الحصول على كورس Tableau + Looker Studio مجانًا" },
  ],
  "sql-data-analysis": [
    { en: "Design and create databases from scratch", ar: "تصميم وإنشاء قواعد البيانات من الصفر" },
    { en: "Write complex SQL queries with JOINs and GROUP BY", ar: "كتابة استعلامات SQL معقدة بـ JOINs وGROUP BY" },
    { en: "Optimize query performance with indexes", ar: "تحسين أداء الاستعلامات بالفهارس" },
    { en: "Connect SQL Server to Excel & Power BI", ar: "ربط SQL Server بـ Excel وPower BI" },
    { en: "Perform data analysis using SQL", ar: "إجراء تحليل البيانات باستخدام SQL" },
    { en: "Back up and restore databases confidently", ar: "النسخ الاحتياطي واستعادة قواعد البيانات بثقة" },
  ],
  "python-data-analysis": [
    { en: "Write clean Python code for data analysis", ar: "كتابة كود Python نظيف لتحليل البيانات" },
    { en: "Manipulate datasets with Pandas and NumPy", ar: "معالجة مجموعات البيانات بـ Pandas وNumPy" },
    { en: "Clean and transform real-world messy data", ar: "تنظيف وتحويل البيانات الفوضوية الواقعية" },
    { en: "Create professional charts with Matplotlib & Seaborn", ar: "إنشاء مخططات احترافية بـ Matplotlib وSeaborn" },
    { en: "Complete end-to-end data analysis projects", ar: "إتمام مشاريع تحليل بيانات من البداية للنهاية" },
    { en: "Build a portfolio with real Python projects", ar: "بناء محفظة بمشاريع Python حقيقية" },
  ],
  "tableau-beginners": [
    { en: "Connect Tableau to multiple data sources", ar: "ربط Tableau بمصادر بيانات متعددة" },
    { en: "Build professional reports and dashboards", ar: "بناء تقارير ولوحات معلومات احترافية" },
    { en: "Use filters, parameters and calculated fields", ar: "استخدام الفلاتر والمعاملات والحقول المحسوبة" },
    { en: "Tell compelling data stories", ar: "رواية قصص بيانات مقنعة" },
    { en: "Publish and share interactive reports", ar: "نشر ومشاركة التقارير التفاعلية" },
    { en: "Apply Tableau in real business scenarios", ar: "تطبيق Tableau في سيناريوهات الأعمال الحقيقية" },
  ],
  "looker-studio-beginners": [
    { en: "Create professional reports with the free Google tool", ar: "إنشاء تقارير احترافية باستخدام الأداة المجانية من Google" },
    { en: "Connect to Excel, Google Sheets, SQL, and more", ar: "الربط بـ Excel وGoogle Sheets وSQL وغيرها" },
    { en: "Use filters, date controls, and calculated fields", ar: "استخدام الفلاتر وعناصر التحكم في التاريخ والحقول المحسوبة" },
    { en: "Blend multiple data sources in one report", ar: "دمج مصادر بيانات متعددة في تقرير واحد" },
    { en: "Build and share interactive dashboards", ar: "بناء ومشاركة لوحات معلومات تفاعلية" },
    { en: "Apply Looker Studio in real business use cases", ar: "تطبيق Looker Studio في حالات أعمال حقيقية" },
  ],
  "report-writing": [
    { en: "Write professional reports in English with confidence", ar: "كتابة تقارير احترافية باللغة الإنجليزية بثقة" },
    { en: "Present findings clearly and in an organized structure", ar: "عرض النتائج بشكل واضح ومنظم" },
    { en: "Write effective, actionable Recommendations", ar: "كتابة Recommendations فعالة وقابلة للتنفيذ" },
    { en: "Improve your professional communication skills", ar: "تحسين مهارات التواصل المهني" },
    { en: "Use tables and charts to reinforce your message", ar: "استخدام الجداول والرسوم البيانية لتعزيز رسالتك" },
    { en: "Apply professional formatting and avoid common mistakes", ar: "تطبيق التنسيق الاحترافي وتجنب الأخطاء الشائعة" },
  ],
  "ai-tools-prompt-engineering": [
    { en: "Use ChatGPT, Claude, Gemini & Gamma like a pro", ar: "استخدام ChatGPT وClaude وGemini وGamma باحترافية" },
    { en: "Write powerful prompts using the R-T-C framework", ar: "كتابة برومبت قوي باستخدام إطار الدور والمهمة والسياق" },
    { en: "Automate reports, presentations, and code with AI", ar: "أتمتة التقارير والعروض التقديمية والأكواد بالـ AI" },
    { en: "Apply AI in real daily work tasks and projects", ar: "تطبيق AI في المهام اليومية والمشاريع الحقيقية" },
    { en: "Build a ready-to-use personal prompt library", ar: "بناء مكتبة Prompts جاهزة للاستخدام الفوري" },
    { en: "Complete an end-to-end data analysis project with AI", ar: "إنجاز مشروع تحليل بيانات كامل باستخدام الذكاء الاصطناعي" },
  ],
  "full-data-analysis-bundle": [
    { en: "Master Excel, Power BI, SQL, Python — all in one bundle", ar: "إتقان Excel وPower BI وSQL وPython في باقة واحدة" },
    { en: "Build dashboards with every major BI tool", ar: "بناء لوحات معلومات بكل أدوات BI الرئيسية" },
    { en: "Analyze data end-to-end across multiple platforms", ar: "تحليل البيانات من البداية للنهاية عبر منصات متعددة" },
    { en: "Use AI tools to work faster and smarter", ar: "استخدام أدوات AI للعمل بشكل أسرع وأذكى" },
    { en: "Write professional English reports", ar: "كتابة تقارير إنجليزية احترافية" },
    { en: "Build a complete portfolio to land your dream job", ar: "بناء محفظة متكاملة للحصول على وظيفة أحلامك" },
  ],
};

function getDefaultOutcomes(titleEn: string) {
  return [
    { en: `Master all core concepts of ${titleEn}`, ar: `إتقان جميع المفاهيم الأساسية` },
    { en: "Apply skills to real-world business problems", ar: "تطبيق المهارات على مشاكل الأعمال الواقعية" },
    { en: "Build a portfolio-ready final project", ar: "بناء مشروع نهائي جاهز للحافظة" },
    { en: "Earn an industry-recognized certificate", ar: "الحصول على شهادة معترف بها في الصناعة" },
    { en: "Join a community of 2,000+ graduates", ar: "الانضمام إلى مجتمع من أكثر من 2000 خريج" },
    { en: "Get lifetime access to all materials", ar: "الوصول مدى الحياة إلى جميع المواد" },
  ];
}

const LEVEL_LABELS: Record<string, { en: string; ar: string; color: string }> = {
  Beginner: { en: "Beginner", ar: "مبتدئ", color: "text-green-400 bg-green-400/10" },
  Intermediate: { en: "Intermediate", ar: "متوسط", color: "text-yellow-400 bg-yellow-400/10" },
  Advanced: { en: "Advanced", ar: "متقدم", color: "text-red-400 bg-red-400/10" },
};

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const locale = useLocale();
  const isAr = locale === "ar";

  const course = coursesData.find((c) => c.slug === slug);
  const [openSection, setOpenSection] = useState<number | null>(0);

  const BackIcon = isAr ? ArrowRight : ArrowLeft;

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <p className="text-slate-400 mb-8">{isAr ? "الدورة غير موجودة" : "Course not found"}</p>
          <Link
            href={`/${locale}/courses`}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            {isAr ? "عرض جميع الدورات" : "Browse All Courses"}
          </Link>
        </div>
      </div>
    );
  }

  const title = isAr ? course.titleAr : course.titleEn;
  const description = isAr ? course.descriptionAr : course.descriptionEn;
  const level = LEVEL_LABELS[course.level] || { en: course.level, ar: course.level, color: "text-blue-400 bg-blue-400/10" };
  const curriculum = CURRICULA[course.slug] || getDefaultCurriculum(course.titleEn, course.titleAr);
  const outcomes = LEARN_OUTCOMES[course.slug] || getDefaultOutcomes(course.titleEn);
  const isFree = course.price === 0;
  const discount =
    course.originalPrice > 0 && course.originalPrice > course.price
      ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
      : 0;

  const totalLessons = curriculum.reduce((acc, s) => acc + s.lessons.length, 0);

  const relatedCourses = coursesData.filter((c) => c.slug !== course.slug && c.category === course.category).slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-950 pt-20">
      {/* Page Layout — single unified grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <Link href={`/${locale}`} className="hover:text-white transition-colors">
            {isAr ? "الرئيسية" : "Home"}
          </Link>
          <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          <Link href={`/${locale}/courses`} className="hover:text-white transition-colors">
            {isAr ? "الدورات" : "Courses"}
          </Link>
          <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          <span className="text-white">{title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-10 items-start">
          {/* ── LEFT: All content ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Course Header */}
            <div>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-sm font-medium">
                  {course.category}
                </span>
                  {isFree ? (
                  <span className="bg-green-600/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full text-sm font-medium">
                    {isAr ? "مجاني" : "Free"}
                  </span>
                ) : discount > 0 && (
                  <span className="bg-green-600/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full text-sm font-medium">
                    {discount}% {isAr ? "خصم" : "OFF"}
                  </span>
                )}
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
              >
                {title}
              </motion.h1>
              <p className="text-lg text-slate-300 mb-5 leading-relaxed">{description}</p>
              <div className="flex flex-wrap gap-5 text-sm text-slate-300 mb-5">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-white">4.9</span>
                  <span className="text-slate-400">(284 {isAr ? "تقييم" : "ratings"})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>1,240+ {isAr ? "طالب" : "students"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span>{course.duration.replace("hours", isAr ? "ساعة" : "hours")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-green-400" />
                  <span>{totalLessons} {isAr ? "درس" : "lessons"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <span>{isAr ? "عربي / English" : "Arabic / English"}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  MA
                </div>
                <div>
                  <p className="text-xs text-slate-400">{isAr ? "المدرب" : "Instructor"}</p>
                  <p className="text-white font-medium text-sm">Mohamed Abdelfattah</p>
                </div>
              </div>
            </div>

            {/* Mobile Enrollment Card */}
            <div className="lg:hidden">
              <EnrollmentCard
                course={course}
                isAr={isAr}
                title={title}
                discount={discount}
                totalLessons={totalLessons}
                locale={locale}
              />
            </div>

            {/* What You'll Learn */}
            <div className="glass rounded-2xl p-6 border border-slate-700/50">
              <h2 className="text-xl font-bold text-white mb-5">
                {isAr ? "ماذا ستتعلم" : "What You'll Learn"}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {outcomes.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{isAr ? item.ar : item.en}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Course Curriculum */}
            <div>
              <h2 className="text-xl font-bold text-white mb-1">
                {isAr ? "محتوى الدورة" : "Course Curriculum"}
              </h2>
              <p className="text-slate-400 text-sm mb-4">
                {curriculum.length} {isAr ? "أقسام" : "sections"} • {totalLessons} {isAr ? "درس" : "lessons"} • {course.duration.replace("hours", isAr ? "ساعة" : "hours")} {isAr ? "إجمالي" : "total"}
              </p>
              <div className="space-y-3">
                {curriculum.map((section, sIdx) => (
                  <div key={sIdx} className="glass rounded-xl border border-slate-700/50 overflow-hidden">
                    <button
                      onClick={() => setOpenSection(openSection === sIdx ? null : sIdx)}
                      className="w-full flex items-center justify-between p-4 text-start hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-white font-semibold text-sm">
                          {isAr ? section.titleAr : section.titleEn}
                        </span>
                        <span className="text-xs text-slate-400">
                          {section.lessons.length} {isAr ? "دروس" : "lessons"}
                        </span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openSection === sIdx ? "rotate-180" : ""}`} />
                    </button>
                    {openSection === sIdx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-slate-700/50"
                      >
                        {section.lessons.map((lesson, lIdx) => (
                          <div
                            key={lIdx}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors border-b border-slate-800/50 last:border-0"
                          >
                            {lesson.free ? (
                              <PlayCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                            ) : (
                              <Lock className="w-4 h-4 text-slate-500 flex-shrink-0" />
                            )}
                            <span className={`text-sm ${lesson.free ? "text-white" : "text-slate-400"}`}>
                              {isAr ? lesson.ar : lesson.en}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="glass rounded-2xl p-6 border border-slate-700/50">
              <h2 className="text-xl font-bold text-white mb-4">
                {isAr ? "المتطلبات" : "Requirements"}
              </h2>
              <ul className="space-y-2">
                {[
                  isAr ? "لا توجد متطلبات مسبقة — الدورة تبدأ من الصفر" : "No prior experience required — starts from scratch",
                  isAr ? "جهاز كمبيوتر (Windows أو Mac)" : "A computer (Windows or Mac)",
                  isAr ? "الرغبة في التعلم والتطبيق" : "Willingness to learn and practice",
                ].map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                    <span className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructor */}
            <div className="glass rounded-2xl p-6 border border-slate-700/50">
              <h2 className="text-xl font-bold text-white mb-5">
                {isAr ? "عن المدرب" : "About the Instructor"}
              </h2>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  MA
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Mohamed Abdelfattah</h3>
                  <p className="text-blue-400 text-sm mb-3">
                    {isAr ? "مؤسس Knowlytics Hub | خبير تحليل البيانات" : "Founder of Knowlytics Hub | Data Analytics Expert"}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-3">
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> 4.9</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-blue-400" /> 2,000+</span>
                    <span className="flex items-center gap-1"><PlayCircle className="w-3.5 h-3.5 text-purple-400" /> 9 {isAr ? "دورات" : "Courses"}</span>
                    <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-yellow-400" /> 7+ {isAr ? "سنوات" : "Years"}</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {isAr
                      ? "خبير تحليل بيانات بخبرة 7+ سنوات، عمل مع شركات Fortune 500 وقدّم التدريب لأكثر من 50 شركة في مصر والخليج."
                      : "Data analytics expert with 7+ years of experience, trained 50+ organizations across Egypt and the Gulf."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Sticky Enrollment Card (desktop only) ── */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <EnrollmentCard
                course={course}
                isAr={isAr}
                title={title}
                discount={discount}
                totalLessons={totalLessons}
                locale={locale}
              />
            </div>
          </div>
        </div>

        {/* Related Courses */}
        {relatedCourses.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8">
              {isAr ? "دورات ذات صلة" : "Related Courses"}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedCourses.map((rc) => (
                <motion.div
                  key={rc.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass rounded-2xl overflow-hidden border border-slate-700/50 card-hover"
                >
                  <div className="relative h-44">
                    <Image
                      src={rc.image}
                      alt={isAr ? rc.titleAr : rc.titleEn}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-white mb-2 line-clamp-2">
                      {isAr ? rc.titleAr : rc.titleEn}
                    </h3>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-blue-400 font-bold">{isAr ? "ج.م" : "EGP"} {rc.price.toLocaleString()}</span>
                      <Link
                        href={`/${locale}/courses/${rc.slug}`}
                        className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {isAr ? "عرض الدورة" : "View Course"}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Back to Courses */}
        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/courses`}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <BackIcon className="w-4 h-4" />
            {isAr ? "العودة إلى جميع الدورات" : "Back to All Courses"}
          </Link>
        </div>
      </section>
    </main>
  );
}

// ── Enrollment Card Component ────────────────────────────────────────────
function EnrollmentCard({
  course,
  isAr,
  title,
  discount,
  totalLessons,
  locale,
}: {
  course: (typeof coursesData)[0];
  isAr: boolean;
  title: string;
  discount: number;
  totalLessons: number;
  locale: string;
}) {
  const isFree = course.price === 0;
  const includes = [
    { icon: PlayCircle, en: "Live sessions — recordings sent after each lecture", ar: "محاضرات لايف — التسجيلات تُرسل بعد كل محاضرة" },
    { icon: Smartphone, en: "Access on mobile & desktop", ar: "الوصول على الهاتف وسطح المكتب" },
    { icon: Infinity, en: "Lifetime access", ar: "وصول مدى الحياة" },
    { icon: Award, en: "Certificate of completion", ar: "شهادة إتمام الدورة" },
    { icon: MessageSquare, en: "Direct instructor support", ar: "دعم مباشر من المدرب" },
  ];

  return (
    <div className="glass rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl shadow-blue-900/20">
      {/* Course Image */}
      <div className="relative h-48">
        <Image
          src={course.image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
      </div>

      {/* Price & CTA */}
      <div className="p-6">
        <div className="flex items-baseline gap-3 mb-1">
          {isFree ? (
            <span className="text-3xl font-bold text-green-400">{isAr ? "مجاني" : "Free"}</span>
          ) : (
            <>
              <span className="text-3xl font-bold text-white">{isAr ? "ج.م" : "EGP"} {course.price.toLocaleString()}</span>
              {discount > 0 && (
                <span className="text-slate-500 line-through text-lg">{isAr ? "ج.م" : "EGP"} {course.originalPrice.toLocaleString()}</span>
              )}
            </>
          )}
        </div>
        {discount > 0 && (
          <p className="text-green-400 text-sm mb-4">
            {isAr ? `وفّر ${discount}% - عرض محدود!` : `Save ${discount}% — Limited offer!`}
          </p>
        )}

        <Link
          href={`/${locale}/contact`}
          className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3.5 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-900/40 mb-3"
        >
          {isAr ? "سجّل الآن" : "Enroll Now"}
        </Link>

        <a
          href={`https://wa.me/201226929392?text=${encodeURIComponent(isAr ? `أريد التسجيل في دورة: ${title}` : `I want to enroll in: ${title}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-green-600/20 border border-green-500/40 text-green-400 font-medium py-3 rounded-xl hover:bg-green-600/30 transition-colors text-sm"
        >
          {isAr ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
        </a>

        {/* Payment Methods */}
        <div className="mt-4 p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
          <p className="text-xs font-semibold text-slate-300 mb-3 text-center">
            {isAr ? "&#128179; طرق الدفع المتاحة" : "&#128179; Payment Methods"}
          </p>
          <div className="space-y-2">
            <a
              href="https://ipn.eg/S/msara/instapay/9Z2HJW"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg bg-purple-600/15 border border-purple-500/30 text-purple-300 hover:bg-purple-600/25 transition-colors text-sm font-medium"
            >
              <span className="text-base">&#128179;</span>
              <span>InstaPay</span>
              <span className="ms-auto text-xs text-purple-400 opacity-70">&#128279;</span>
            </a>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-red-600/15 border border-red-500/30 text-red-300 text-sm font-medium">
              <span className="text-base">&#128242;</span>
              <span>Vodafone Cash</span>
              <span className="ms-auto text-xs font-mono" dir="ltr">01020945719</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3 text-center leading-relaxed">
            {isAr
              ? "&#128247; بعد الدفع، أرسل صورة الإيصال على واتساب"
              : "&#128247; After payment, send your receipt screenshot on WhatsApp"}
          </p>
          <a
            href="https://wa.me/201226929392"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-green-600/20 border border-green-500/30 text-green-400 hover:bg-green-600/30 transition-colors text-xs font-medium"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.864 9.864 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" /></svg>
            <span dir="ltr">00201226929392</span>
          </a>
        </div>

        <p className="text-xs text-center text-slate-500 mt-3">
          {isAr ? "ضمان استرداد المال خلال 7 أيام" : "7-day money-back guarantee"}
        </p>

        {/* Includes */}
        <div className="mt-6 pt-6 border-t border-slate-700/50">
          <p className="text-sm font-semibold text-white mb-4">{isAr ? "تشمل الدورة:" : "This course includes:"}</p>
          <ul className="space-y-3">
            {includes.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                <item.icon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                {isAr ? item.ar : item.en}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
