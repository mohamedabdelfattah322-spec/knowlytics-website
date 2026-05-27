"use client";

import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar, Clock, Tag, ChevronRight, Share2,
  Twitter, Linkedin, Link2, ArrowLeft, ArrowRight, BookOpen,
} from "lucide-react";
import blogData from "@/data/blog.json";
import { useState } from "react";
import { toast } from "sonner";

interface BlogPageProps {
  params: { locale: string };
}

// Supported block types in content:
// "## Heading"  → h2
// "### Sub"     → h3
// "[IMG:url|caption]" → image
// otherwise     → paragraph
const ARTICLE_CONTENT: Record<string, { en: string[]; ar: string[] }> = {

  "become-data-analyst-2025": {
    en: [
      "Data analytics is one of the fastest-growing professions in the Arab world. Companies across Saudi Arabia, UAE, and Egypt are actively hiring — and most roles don't require a computer science degree. What they require is the right skill set, built in the right order.",
      "[IMG:https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900|Data analytics dashboard showing business insights]",
      "## Why Now Is the Best Time to Enter the Field",
      "According to LinkedIn's 2025 Jobs Report, data analyst roles in MENA grew by 38% year-over-year. Saudi Vision 2030 alone has created thousands of data positions across healthcare, finance, government, and tourism. The tools are cheaper than ever, the learning resources are abundant — and competition is still manageable for well-prepared candidates.",
      "## The 6-Month Learning Roadmap",
      "**Months 1–2: Excel**\nStart with Microsoft Excel — the universal language of data. Focus on: Pivot Tables, VLOOKUP & XLOOKUP, SUMIF/COUNTIF, Power Query for data cleaning, and basic charting. Excel alone will get you through the door at most companies in the Arab market.",
      "**Month 3: SQL**\nSQL is the second most requested skill on every data job posting. Learn SELECT, WHERE, GROUP BY, JOIN, and aggregate functions. Practice on free platforms like SQLZoo and Mode Analytics. Write 50 real queries and SQL becomes natural.",
      "**Months 4–5: Power BI or Tableau**\nPower BI dominates the Arab corporate market. Learn to connect data sources, build relationships, write basic DAX, and design interactive dashboards. Aim to complete 3 full projects by the end of month 5.",
      "[IMG:https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900|Learning progression from Excel to advanced analytics tools]",
      "**Month 6: Python Basics**\nPandas and Matplotlib are enough to start. Python is most valuable for automating repetitive tasks and cleaning messy data that would take hours in Excel. You don't need to become a programmer — you need to be effective.",
      "## Building a Portfolio That Actually Gets You Hired",
      "Certificates alone won't land you a job. Employers want to see real work. Build three portfolio projects:\n1. A sales performance dashboard in Excel with slicers and dynamic charts\n2. A SQL analysis answering a real business question on a public dataset\n3. A Power BI report connected to a live data source",
      "Host everything on GitHub. Add a README to each project explaining the business problem, your approach, and your findings. This is what separates candidates who get interviews from those who don't.",
      "## What the Arab Job Market Actually Pays",
      "Entry-level salaries in 2025 range from EGP 12,000–25,000/month in Egypt, SAR 7,000–15,000 in Saudi Arabia, and AED 8,000–18,000 in UAE. Mid-level analysts with 2–3 years of experience and a strong portfolio can command significantly higher packages — especially with Power BI and SQL expertise.",
      "## The Most Common Mistake",
      "Trying to learn everything at once. Pick one tool, go deep, build something real, then move to the next. Breadth without depth produces analysts who know a little about everything but can't solve real problems independently. Depth first — breadth follows naturally.",
    ],
    ar: [
      "تحليل البيانات من أسرع المهن نمواً في العالم العربي. الشركات في السعودية والإمارات ومصر تبحث بنشاط عن محللين — ومعظم الأدوار لا تشترط شهادة في علوم الحاسوب. ما تشترطه هو مجموعة المهارات الصحيحة، مبنية بالترتيب الصحيح.",
      "[IMG:https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900|لوحة تحليل بيانات تعرض رؤى الأعمال]",
      "## لماذا الآن هو أفضل وقت للدخول إلى هذا المجال",
      "وفقاً لتقرير LinkedIn للوظائف 2025، نمت أدوار محللي البيانات في منطقة الشرق الأوسط وشمال أفريقيا بنسبة 38% سنوياً. رؤية السعودية 2030 وحدها أوجدت آلاف المناصب في البيانات عبر قطاعات الصحة والمال والحكومة والسياحة. الأدوات أرخص من أي وقت مضى، موارد التعلم وفيرة — والمنافسة لا تزال قابلة للإدارة للمرشحين المستعدين جيداً.",
      "## خارطة الطريق للتعلم في 6 أشهر",
      "**الشهران 1–2: Excel**\nابدأ بـ Microsoft Excel — اللغة الشاملة للبيانات. ركز على: الجداول المحورية، VLOOKUP وXLOOKUP، SUMIF/COUNTIF، Power Query لتنظيف البيانات، والرسوم البيانية الأساسية. Excel وحده سيفتح لك أبواب معظم الشركات في السوق العربية.",
      "**الشهر 3: SQL**\nSQL هي ثاني أكثر مهارة مطلوبة في كل إعلان وظيفي للبيانات. تعلّم SELECT وWHERE وGROUP BY وJOIN ودوال التجميع. مارس على منصات مجانية مثل SQLZoo وMode Analytics. اكتب 50 استعلاماً حقيقياً وستصبح SQL طبيعية.",
      "**الشهران 4–5: Power BI أو Tableau**\nPower BI يهيمن على سوق الشركات العربية. تعلّم ربط مصادر البيانات وبناء العلاقات وكتابة DAX الأساسي وتصميم لوحات المعلومات التفاعلية. اهدف إلى إنجاز 3 مشاريع كاملة بنهاية الشهر الخامس.",
      "[IMG:https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900|مسار التعلم من Excel إلى أدوات التحليل المتقدمة]",
      "**الشهر 6: أساسيات Python**\nPandas وMatplotlib كافيان للبدء. Python الأكثر قيمة في أتمتة المهام المتكررة وتنظيف البيانات الفوضوية التي تستغرق ساعات في Excel. لا تحتاج أن تصبح مبرمجاً — تحتاج أن تكون فعّالاً.",
      "## بناء معرض أعمال يوصلك للتوظيف فعلاً",
      "الشهادات وحدها لن تحصّل لك وظيفة. أصحاب العمل يريدون رؤية عمل حقيقي. ابنِ ثلاثة مشاريع:\n1. لوحة أداء المبيعات في Excel مع شرائح ومخططات ديناميكية\n2. تحليل SQL يجيب على سؤال تجاري حقيقي على مجموعة بيانات عامة\n3. تقرير Power BI متصل بمصدر بيانات مباشر",
      "استضف كل شيء على GitHub. أضف README لكل مشروع يشرح المشكلة التجارية ونهجك ونتائجك. هذا ما يميز المرشحين الذين يحصلون على مقابلات عن أولئك الذين لا يحصلون عليها.",
      "## ما يدفعه سوق العمل العربي فعلاً",
      "تتراوح رواتب المستوى المبتدئ في 2025 بين 12,000–25,000 جنيه شهرياً في مصر، و7,000–15,000 ريال في السعودية، و8,000–18,000 درهم في الإمارات. المحللون المتوسطون ذوو الخبرة 2–3 سنوات ومعرض أعمال قوي يمكنهم المطالبة برواتب أعلى بكثير.",
      "## الخطأ الأكثر شيوعاً",
      "محاولة تعلم كل شيء دفعة واحدة. اختر أداة واحدة، تعمّق فيها، ابنِ شيئاً حقيقياً، ثم انتقل للتالية. الاتساع بدون عمق ينتج محللين يعرفون القليل عن كل شيء لكنهم لا يستطيعون حل المشكلات الحقيقية بشكل مستقل.",
    ],
  },

  "excel-vs-power-bi": {
    en: [
      "If you're starting your data analytics journey, you'll face this question early: Excel or Power BI first? Both are Microsoft products. Both appear on job descriptions. Both build dashboards. But they are fundamentally different tools designed for different jobs — and choosing wrong wastes months.",
      "[IMG:https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900|Comparison of Excel and Power BI interfaces on screen]",
      "## What Excel Does That Power BI Can't Replace",
      "Excel is a flexible calculation environment. Its strength lies in:\n**Ad hoc analysis** — build a model, adjust assumptions, answer a one-off question in minutes.\n**Financial modeling** — DCF models, scenario analysis, budgets, forecasts. CFOs live in Excel.\n**Small to medium datasets** — up to ~500K rows comfortably.\n**Editability** — send a file to a client or colleague who can modify it without any login or license.",
      "Pivot Tables summarize millions of rows in seconds. Power Query automates data cleaning workflows. XLOOKUP, SUMIFS, and dynamic arrays make Excel powerful enough to handle 80% of business analytics needs.",
      "## What Power BI Does That Excel Can't",
      "Power BI is a dedicated business intelligence platform built for scale and sharing:\n**Live data** — connect to databases, APIs, cloud services and refresh reports automatically on a schedule.\n**Millions of rows** — the VertiPaq in-memory engine handles data volumes that would crash Excel.\n**Sharing without files** — publish once to the Power BI Service, everyone sees the same live, updated report via browser.\n**Complex time intelligence** — DAX functions like SAMEPERIODLASTYEAR, DATESYTD, and DATEADD are purpose-built for business reporting that would require complex workarounds in Excel.",
      "[IMG:https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900|Power BI dashboard with interactive charts and KPI cards]",
      "## Head-to-Head Comparison",
      "**Data Volume:** Excel handles up to 1 million rows. Power BI handles hundreds of millions.\n**Refresh:** Excel is manual. Power BI can refresh automatically every 30 minutes.\n**Sharing:** Excel requires sending files. Power BI shares via a URL.\n**Cost:** Excel comes with Microsoft 365. Power BI Desktop is free; sharing requires $10/user/month (Pro).\n**Learning curve:** Excel is more intuitive. Power BI requires understanding data modeling concepts.",
      "## The Definitive Recommendation",
      "**Learn Excel first. Always.** Power BI assumes you already understand pivot logic, aggregation, filtering, and data relationships. Struggling with these in Excel means you'll be lost in Power BI's abstract data model environment.",
      "Spend 2–3 months becoming genuinely solid at Excel — especially Pivot Tables, Power Query, and VLOOKUP/XLOOKUP. Then move to Power BI. Your transition will be 3× faster because every concept maps directly.",
      "## Which One Gets You Hired Faster?",
      "In the Arab market, Excel skills alone will get you hired at most SMEs and many large corporations. Adding Power BI to your profile raises your salary expectation by 20–30% and opens enterprise and multinational roles. The best analysts are strong in both — and know exactly when to use each one.",
    ],
    ar: [
      "إذا كنت تبدأ رحلتك في تحليل البيانات، ستواجه هذا السؤال مبكراً: Excel أم Power BI أولاً؟ كلاهما من Microsoft. كلاهما يظهر في الأوصاف الوظيفية. كلاهما يبني لوحات معلومات. لكنهما أداتان مختلفتان جوهرياً مصممتان لوظائف مختلفة — والاختيار الخاطئ يضيع أشهراً.",
      "[IMG:https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900|مقارنة بين واجهتي Excel وPower BI على الشاشة]",
      "## ما يفعله Excel ولا يمكن لـ Power BI استبداله",
      "Excel بيئة حساب مرنة. قوته تكمن في:\n**التحليل الآني** — ابنِ نموذجاً، اضبط الافتراضات، أجب على سؤال عارض في دقائق.\n**النمذجة المالية** — نماذج DCF وتحليل السيناريوهات والميزانيات. المديرون الماليون يعيشون في Excel.\n**مجموعات البيانات الصغيرة إلى المتوسطة** — حتى ~500 ألف صف بسهولة.\n**قابلية التعديل** — أرسل ملفاً لعميل أو زميل يمكنه تعديله دون أي تسجيل دخول أو ترخيص.",
      "الجداول المحورية تلخص ملايين الصفوف في ثوانٍ. Power Query يؤتمت مهام سير عمل تنظيف البيانات. XLOOKUP وSUMIFS والمصفوفات الديناميكية تجعل Excel قوياً بما يكفي لتلبية 80% من احتياجات تحليل الأعمال.",
      "## ما يفعله Power BI ولا يستطيع Excel فعله",
      "Power BI منصة ذكاء أعمال مخصصة مبنية للحجم والمشاركة:\n**البيانات المباشرة** — اتصل بقواعد البيانات وAPIs والخدمات السحابية وحدّث التقارير تلقائياً.\n**ملايين الصفوف** — محرك VertiPaq في الذاكرة يتعامل مع أحجام البيانات التي ستعطّل Excel.\n**المشاركة دون ملفات** — انشر مرة واحدة على خدمة Power BI، يرى الجميع نفس التقرير الحي عبر المتصفح.\n**ذكاء الوقت المعقد** — دوال DAX كـSAMEPERIODLASTYEAR وDATESYTD مبنية خصيصاً لتقارير الأعمال.",
      "[IMG:https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900|لوحة معلومات Power BI مع مخططات تفاعلية وبطاقات KPI]",
      "## مقارنة مباشرة",
      "**حجم البيانات:** Excel يتعامل مع مليون صف. Power BI مئات الملايين.\n**التحديث:** Excel يدوي. Power BI يمكنه التحديث تلقائياً كل 30 دقيقة.\n**المشاركة:** Excel يتطلب إرسال ملفات. Power BI يشارك عبر URL.\n**التكلفة:** Excel يأتي مع Microsoft 365. Power BI Desktop مجاني؛ المشاركة تتطلب 10$/مستخدم/شهر.\n**منحنى التعلم:** Excel أكثر سهولة. Power BI يتطلب فهم مفاهيم نمذجة البيانات.",
      "## التوصية القاطعة",
      "**تعلّم Excel أولاً. دائماً.** Power BI يفترض أنك تفهم بالفعل منطق الجدولة والتجميع والتصفية وعلاقات البيانات. الصراع مع هذه المفاهيم في Excel يعني أنك ستضيع في بيئة نموذج البيانات المجردة لـ Power BI.",
      "أمضِ 2–3 أشهر لتصبح قوياً حقاً في Excel — خاصة الجداول المحورية وPower Query وVLOOKUP/XLOOKUP. ثم انتقل إلى Power BI. انتقالك سيكون أسرع 3 مرات لأن كل مفهوم ينقل مباشرة.",
      "## أيهما يحصّل لك التوظيف أسرع؟",
      "في السوق العربية، مهارات Excel وحدها ستحصّل لك التوظيف في معظم الشركات الصغيرة والمتوسطة وكثير من الكبيرة. إضافة Power BI لملفك الشخصي يرفع توقع راتبك 20–30% ويفتح أمامك أدوار الشركات الكبرى والمتعددة الجنسيات.",
    ],
  },

  "top-10-sql-functions": {
    en: [
      "SQL is the language every data analyst must speak fluently. Whether you're working with MySQL, PostgreSQL, SQL Server, or BigQuery — these 10 functions appear in real analytical work every single day. Master them and you'll handle 90% of business data questions confidently.",
      "[IMG:https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=900|Database schema visualization with connected tables]",
      "## 1. SELECT with WHERE and ORDER BY",
      "The foundation of every query. SELECT specifies columns, WHERE filters rows by condition, ORDER BY sorts results. Always filter as early as possible — it reduces data volume and speeds up execution. Use `LIMIT` during development to avoid accidentally pulling millions of rows.",
      "## 2. GROUP BY with Aggregate Functions",
      "GROUP BY collapses rows into groups and aggregate functions calculate summary statistics per group:\n`SUM()` — total values\n`COUNT()` — number of rows (use COUNT(*) to include NULLs)\n`AVG()` — average\n`MAX()` / `MIN()` — highest and lowest values\n\nExample: `SELECT region, SUM(revenue) FROM sales GROUP BY region ORDER BY 2 DESC`",
      "## 3. INNER JOIN",
      "Combines rows from two tables where a key matches in both. This is the most common join in practice. Always specify which table each column belongs to using aliases to avoid ambiguity — especially when column names repeat across tables.",
      "## 4. LEFT JOIN",
      "Returns all rows from the left table and matching rows from the right. When there's no match, right-side columns return NULL. Invaluable for finding customers with no orders, products with no sales, or employees with no manager assigned.",
      "[IMG:https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900|Visual diagram showing JOIN types in SQL]",
      "## 5. CASE WHEN",
      "SQL's conditional logic, equivalent to IF/ELSE. Used to create custom categories, labels, or calculated columns:\n`CASE WHEN revenue > 100000 THEN 'High' WHEN revenue > 50000 THEN 'Medium' ELSE 'Low' END AS tier`\n\nUse inside aggregate functions to count or sum by condition without filtering rows out.",
      "## 6. COALESCE",
      "Returns the first non-NULL value from a list of arguments. Essential for replacing NULLs with defaults to prevent calculation errors: `COALESCE(phone_number, 'Not provided')`",
      "## 7. HAVING",
      "Filters groups after aggregation — WHERE cannot filter on aggregate results. Use HAVING when your condition involves SUM, COUNT, AVG, etc:\n`SELECT product, COUNT(*) as orders FROM sales GROUP BY product HAVING COUNT(*) > 100`",
      "## 8. Subqueries",
      "A query nested inside another query. Use subqueries when you need to filter on an aggregated value that isn't available in the outer query. For readability, prefer CTEs (below) over deeply nested subqueries.",
      "## 9. CTEs (WITH Clause)",
      "CTEs let you define temporary named result sets and reference them later in the same query. They make complex logic readable and maintainable — like breaking a long formula into named intermediate steps. Always prefer CTEs over repeated subqueries.",
      "## 10. Window Functions",
      "The most powerful SQL feature most analysts learn last. Window functions calculate values across rows without collapsing the result set:\n`ROW_NUMBER()` — unique sequential number per partition\n`RANK()` — rank with gaps for ties\n`LAG() / LEAD()` — access previous/next row values\n`SUM() OVER (PARTITION BY ...)` — running totals\n\nExample: `SELECT name, salary, RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank FROM employees`",
      "## How to Actually Learn These",
      "Don't just read — practice on real data immediately. Use Mode Analytics, SQLZoo, or LeetCode's SQL section. Solve 50 problems covering all 10 functions. At that point, SQL stops feeling like a language you're translating and starts feeling like thinking.",
    ],
    ar: [
      "SQL هي اللغة التي يجب أن يتقنها كل محلل بيانات. سواء كنت تعمل مع MySQL أو PostgreSQL أو SQL Server أو BigQuery — هذه الدوال العشر تظهر في العمل التحليلي الحقيقي كل يوم. أتقنها وستتعامل مع 90% من أسئلة بيانات الأعمال بثقة.",
      "[IMG:https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=900|تصور مخطط قاعدة البيانات مع الجداول المترابطة]",
      "## 1. SELECT مع WHERE وORDER BY",
      "أساس كل استعلام. SELECT يحدد الأعمدة، WHERE يفلتر الصفوف بالشرط، ORDER BY يرتب النتائج. فلتر دائماً في أقرب وقت ممكن — يقلل حجم البيانات ويسرّع التنفيذ. استخدم `LIMIT` أثناء التطوير لتجنب سحب ملايين الصفوف بالخطأ.",
      "## 2. GROUP BY مع دوال التجميع",
      "GROUP BY يطوي الصفوف في مجموعات ودوال التجميع تحسب إحصاءات ملخصة لكل مجموعة:\n`SUM()` — إجمالي القيم\n`COUNT()` — عدد الصفوف\n`AVG()` — المتوسط\n`MAX()` / `MIN()` — الأعلى والأدنى\n\nمثال: `SELECT region, SUM(revenue) FROM sales GROUP BY region ORDER BY 2 DESC`",
      "## 3. INNER JOIN",
      "يدمج صفوفاً من جدولين حيث يتطابق مفتاح في كليهما. هذا أكثر الربط شيوعاً في الممارسة. حدد دائماً الجدول الذي ينتمي إليه كل عمود باستخدام الأسماء المستعارة لتجنب الغموض.",
      "## 4. LEFT JOIN",
      "يعيد جميع صفوف الجدول الأيسر والصفوف المطابقة من الأيمن. حين لا يوجد تطابق، تعيد الأعمدة الجانبية اليمنى NULL. لا يقدر بثمن لإيجاد العملاء بدون طلبات، أو المنتجات بدون مبيعات.",
      "[IMG:https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=900|مخطط بصري يوضح أنواع JOIN في SQL]",
      "## 5. CASE WHEN",
      "المنطق الشرطي في SQL، مكافئ لـ IF/ELSE. يُستخدم لإنشاء فئات مخصصة أو تسميات:\n`CASE WHEN revenue > 100000 THEN 'High' WHEN revenue > 50000 THEN 'Medium' ELSE 'Low' END AS tier`",
      "## 6. COALESCE",
      "يعيد أول قيمة غير NULL من قائمة الوسيطات. ضروري لاستبدال NULLs بقيم افتراضية لمنع أخطاء الحساب: `COALESCE(phone_number, 'Not provided')`",
      "## 7. HAVING",
      "يفلتر المجموعات بعد التجميع — WHERE لا يمكنه تصفية نتائج التجميع. استخدم HAVING حين يتضمن شرطك SUM أو COUNT أو AVG.",
      "## 8. الاستعلامات الفرعية",
      "استعلام متداخل داخل استعلام آخر. استخدمها حين تحتاج التصفية على قيمة مجمّعة غير متاحة في الاستعلام الخارجي. للقراءة، فضّل CTEs على الاستعلامات الفرعية المتداخلة عميقاً.",
      "## 9. CTEs (جملة WITH)",
      "تتيح لك CTEs تعريف مجموعات نتائج مؤقتة مسماة والإشارة إليها لاحقاً في نفس الاستعلام. تجعل المنطق المعقد قابلاً للقراءة والصيانة — كتقسيم صيغة طويلة إلى خطوات وسيطة مسماة.",
      "## 10. دوال النوافذ",
      "أقوى ميزة في SQL يتعلمها معظم المحللين أخيراً. تحسب دوال النوافذ قيماً عبر الصفوف دون طي مجموعة النتائج:\n`ROW_NUMBER()` — رقم تسلسلي فريد\n`RANK()` — ترتيب مع فجوات للتعادلات\n`LAG() / LEAD()` — الوصول لقيم الصف السابق/التالي\n`SUM() OVER (PARTITION BY ...)` — الإجماليات التراكمية",
      "## كيف تتعلم هذه الدوال فعلاً",
      "لا تكتفِ بالقراءة — مارس على بيانات حقيقية فوراً. استخدم Mode Analytics أو SQLZoo أو قسم SQL في LeetCode. حلّ 50 مسألة تغطي الدوال العشر. عند تلك النقطة، يتوقف SQL عن الشعور بأنه لغة تترجمها ويبدأ في الشعور بأنه تفكير.",
    ],
  },

  "power-bi-dax-beginners": {
    en: [
      "DAX (Data Analysis Expressions) is the formula language of Power BI. It looks like Excel formulas — but it operates on tables and relationships, not individual cells. This single difference in thinking is what trips up every beginner. Once you internalize it, DAX becomes logical and powerful.",
      "[IMG:https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900|Power BI report with DAX measures and KPI visuals]",
      "## The Core Concept: Filter Context",
      "Every DAX measure is evaluated inside a filter context — the combination of filters applied by report slicers, visual filters, and row/column selections. When a user clicks a region on a map, DAX recalculates every measure on the page for that region automatically. Understanding this is 80% of understanding DAX.",
      "## Measure vs. Calculated Column",
      "Always prefer measures over calculated columns. Measures are calculated on-the-fly using the current filter context. Calculated columns are computed once during refresh and stored in memory. Use calculated columns only when you need row-level values for filtering or relationships.",
      "## The 5 Measures Every Dashboard Needs",
      "**1. Total Sales (Basic SUM)**\n`Total Sales = SUM(Sales[Amount])`\nAlways create measures, never drag raw columns into values. This gives you filter context control.",
      "**2. Sales Last Year**\n`Sales LY = CALCULATE([Total Sales], SAMEPERIODLASTYEAR(Dates[Date]))`\nRequires a proper date table with continuous dates. Mark it as a Date Table in Power BI Desktop.",
      "[IMG:https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900|DAX formula bar in Power BI with measure definition]",
      "**3. Year-over-Year Growth %**\n`YoY % = DIVIDE([Total Sales] - [Sales LY], [Sales LY], 0)`\nDIVIDE handles division by zero automatically and returns the third argument (0) instead of an error.",
      "**4. Year-to-Date Total**\n`YTD Sales = CALCULATE([Total Sales], DATESYTD(Dates[Date]))`\nShows cumulative performance from January 1st to the currently selected date.",
      "**5. % of Total (ignores current filter)**\n`% of Total = DIVIDE([Total Sales], CALCULATE([Total Sales], ALL(Products[Category])))`\nALL() removes the category filter, so the denominator always equals grand total — giving you the correct contribution percentage per category.",
      "## The CALCULATE Function",
      "CALCULATE is the most important function in DAX. It evaluates an expression in a modified filter context. Every time intelligence function (SAMEPERIODLASTYEAR, DATESYTD, etc.) works by wrapping the base measure in CALCULATE with a modified date filter. Once you truly understand CALCULATE, advanced DAX becomes a matter of knowing which filter modifier to apply.",
      "## Building Your First Date Table",
      "Time intelligence functions require a dedicated date table with one row per day, no gaps. Use Power Query to generate it:\n`= List.Dates(#date(2020,1,1), Number.From(DateTime.LocalNow()) - Number.From(#date(2020,1,1)) + 1, #duration(1,0,0,0))`\nAdd Year, Month, Quarter, Week Number columns. Mark it as a Date Table and link it to your fact table on the date key.",
    ],
    ar: [
      "DAX (تعبيرات تحليل البيانات) هو لغة الصيغ في Power BI. يبدو مثل صيغ Excel — لكنه يعمل على الجداول والعلاقات، لا على الخلايا الفردية. هذا الاختلاف الواحد في التفكير هو ما يربك كل مبتدئ. بمجرد استيعابه، يصبح DAX منطقياً وقوياً.",
      "[IMG:https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900|تقرير Power BI مع قياسات DAX ومرئيات KPI]",
      "## المفهوم الأساسي: سياق الفلتر",
      "كل قياس DAX يُقيَّم داخل سياق فلتر — مجموعة الفلاتر المطبّقة بواسطة شرائح التقرير وفلاتر المرئيات والصفوف/الأعمدة المحددة. حين ينقر المستخدم على منطقة على الخريطة، يعيد DAX حساب كل قياس في الصفحة لتلك المنطقة تلقائياً. فهم هذا هو 80% من فهم DAX.",
      "## القياس مقابل العمود المحسوب",
      "دائماً فضّل القياسات على الأعمدة المحسوبة. تُحسب القياسات في الوقت الفعلي باستخدام سياق الفلتر الحالي. تُحسب الأعمدة المحسوبة مرة واحدة أثناء التحديث وتُخزن في الذاكرة.",
      "## القياسات الخمس التي تحتاجها كل لوحة معلومات",
      "**1. إجمالي المبيعات**\n`Total Sales = SUM(Sales[Amount])`\nأنشئ القياسات دائماً، لا تسحب الأعمدة الخام إلى القيم. هذا يمنحك التحكم في سياق الفلتر.",
      "**2. مبيعات العام الماضي**\n`Sales LY = CALCULATE([Total Sales], SAMEPERIODLASTYEAR(Dates[Date]))`\nيتطلب جدول تواريخ صحيح بتواريخ متواصلة. ضعه علامة كجدول تاريخ في Power BI Desktop.",
      "[IMG:https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900|شريط صيغة DAX في Power BI مع تعريف القياس]",
      "**3. نسبة النمو السنوي**\n`YoY % = DIVIDE([Total Sales] - [Sales LY], [Sales LY], 0)`\nDIVIDE تتعامل مع القسمة على الصفر تلقائياً وتعيد الوسيطة الثالثة (0) بدلاً من خطأ.",
      "**4. الإجمالي من بداية العام**\n`YTD Sales = CALCULATE([Total Sales], DATESYTD(Dates[Date]))`\nيُظهر الأداء التراكمي من 1 يناير حتى التاريخ المحدد حالياً.",
      "**5. النسبة من الإجمالي**\n`% of Total = DIVIDE([Total Sales], CALCULATE([Total Sales], ALL(Products[Category])))`\nALL() تزيل فلتر الفئة، لذا يساوي المقام دائماً الإجمالي الكلي.",
      "## دالة CALCULATE",
      "CALCULATE هي أهم دالة في DAX. تُقيّم تعبيراً في سياق فلتر معدّل. كل دالة ذكاء وقت تعمل بلفّ القياس الأساسي في CALCULATE مع فلتر تاريخ معدّل. بمجرد فهمك الحقيقي لـ CALCULATE، يصبح DAX المتقدم مسألة معرفة معدّل الفلتر الذي يجب تطبيقه.",
      "## بناء جدول التاريخ الأول",
      "تتطلب دوال ذكاء الوقت جدول تاريخ مخصصاً بصف واحد لكل يوم، بدون فجوات. استخدم Power Query لإنشائه وأضف أعمدة السنة والشهر والربع ورقم الأسبوع. ضعه علامة كجدول تاريخ واربطه بجدول الحقائق على مفتاح التاريخ.",
    ],
  },

  "python-pandas-data-cleaning": {
    en: [
      "Data cleaning is unglamorous, time-consuming, and absolutely essential. Studies consistently show that data professionals spend 60–80% of their time cleaning and preparing data before any analysis can begin. Pandas makes this process faster, repeatable, and auditable — the three qualities that matter in professional data work.",
      "[IMG:https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=900|Python code editor showing Pandas data cleaning operations]",
      "## Always Start With These Three Commands",
      "Before touching any dataset, run:\n`df.info()` — data types, non-null counts, memory usage\n`df.describe()` — statistical summary of numeric columns\n`df.isnull().sum()` — count of missing values per column\n\nThese three commands reveal 90% of data quality issues in under 30 seconds.",
      "## Handling Missing Values",
      "Missing values are the most common data quality issue. Your strategy depends on the context:\n`df.dropna(subset=['critical_column'])` — drop rows where a key column is null\n`df.fillna(0)` — replace NULLs with zero (for numeric columns where 0 is meaningful)\n`df.fillna(df['column'].median())` — fill with median (better than mean for skewed data)\n`df.fillna(method='ffill')` — forward fill (useful for time series data)",
      "[IMG:https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900|Data quality visualization showing missing values heatmap]",
      "## Fixing Data Types",
      "Wrong data types cause silent errors — calculations that return NaN instead of numbers, date comparisons that fail silently. Always fix types early:\n`df['date'] = pd.to_datetime(df['date'], errors='coerce')`\n`df['revenue'] = pd.to_numeric(df['revenue'], errors='coerce')`\n`df['category'] = df['category'].astype('category')`\n\nThe `errors='coerce'` argument converts unparseable values to NaN instead of crashing.",
      "## Standardizing Text",
      "Inconsistent text destroys GROUP BY accuracy. 'Egypt', 'egypt', 'EGYPT', and ' Egypt ' will be counted as four different countries:\n`df['country'] = df['country'].str.strip().str.title()`\n`df['email'] = df['email'].str.strip().str.lower()`\n\nAlways strip whitespace and standardize case before any text-based grouping.",
      "## Removing Duplicates",
      "`df.duplicated().sum()` shows how many duplicate rows exist.\n`df.drop_duplicates()` removes exact duplicates.\n`df.drop_duplicates(subset=['customer_id', 'order_date'])` removes duplicates based on specific columns — useful when you want to keep only the first or last occurrence.",
      "## Detecting and Handling Outliers",
      "The IQR method identifies statistical outliers without assuming a distribution:\n```python\nQ1 = df['sales'].quantile(0.25)\nQ3 = df['sales'].quantile(0.75)\nIQR = Q3 - Q1\ndf_clean = df[(df['sales'] >= Q1 - 1.5*IQR) & (df['sales'] <= Q3 + 1.5*IQR)]\n```\nAlways investigate outliers before removing them — they might be data entry errors or genuinely extreme events that need different treatment.",
      "## Build a Reusable Pipeline",
      "The real efficiency gain comes from packaging all cleaning steps into a function:\n```python\ndef clean_sales_data(df):\n    df = df.copy()\n    df.drop_duplicates(inplace=True)\n    df['date'] = pd.to_datetime(df['date'], errors='coerce')\n    df['revenue'] = pd.to_numeric(df['revenue'], errors='coerce')\n    df['region'] = df['region'].str.strip().str.title()\n    df.dropna(subset=['date', 'revenue'], inplace=True)\n    return df\n```\nCall this function every time you load the dataset. Consistent, reproducible, auditable.",
    ],
    ar: [
      "تنظيف البيانات غير جذاب ويستغرق وقتاً طويلاً وضروري تماماً. تُظهر الدراسات باستمرار أن محترفي البيانات يقضون 60–80% من وقتهم في تنظيف البيانات وإعدادها قبل أن يبدأ أي تحليل. Pandas يجعل هذه العملية أسرع وقابلة للتكرار وقابلة للتدقيق.",
      "[IMG:https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=900|محرر كود Python يعرض عمليات تنظيف البيانات بـ Pandas]",
      "## ابدأ دائماً بهذه الأوامر الثلاثة",
      "قبل لمس أي مجموعة بيانات، شغّل:\n`df.info()` — أنواع البيانات وعدد القيم غير الفارغة واستخدام الذاكرة\n`df.describe()` — ملخص إحصائي للأعمدة الرقمية\n`df.isnull().sum()` — عدد القيم المفقودة لكل عمود\n\nهذه الأوامر الثلاثة تكشف 90% من مشكلات جودة البيانات في أقل من 30 ثانية.",
      "## التعامل مع القيم المفقودة",
      "القيم المفقودة هي أكثر مشكلات جودة البيانات شيوعاً. استراتيجيتك تعتمد على السياق:\n`df.dropna(subset=['critical_column'])` — احذف الصفوف حيث عمود رئيسي فارغ\n`df.fillna(0)` — استبدل NULLs بالصفر\n`df.fillna(df['column'].median())` — املأ بالوسيط\n`df.fillna(method='ffill')` — الملء للأمام (مفيد لبيانات السلاسل الزمنية)",
      "[IMG:https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900|تصور جودة البيانات يعرض خريطة حرارة للقيم المفقودة]",
      "## إصلاح أنواع البيانات",
      "أنواع البيانات الخاطئة تسبب أخطاء صامتة. أصلحها مبكراً:\n`df['date'] = pd.to_datetime(df['date'], errors='coerce')`\n`df['revenue'] = pd.to_numeric(df['revenue'], errors='coerce')`\n\nوسيطة `errors='coerce'` تحوّل القيم غير القابلة للتحليل إلى NaN بدلاً من التعطّل.",
      "## توحيد النص",
      "النص غير المتسق يدمر دقة GROUP BY. 'Egypt' و'egypt' و'EGYPT' و' Egypt ' ستُعدّ أربع دول مختلفة:\n`df['country'] = df['country'].str.strip().str.title()`\n`df['email'] = df['email'].str.strip().str.lower()`",
      "## إزالة التكرارات",
      "`df.duplicated().sum()` يُظهر كم صف مكرر موجود.\n`df.drop_duplicates()` يزيل التكرارات المطابقة.\n`df.drop_duplicates(subset=['customer_id', 'order_date'])` يزيل التكرارات بناءً على أعمدة محددة.",
      "## اكتشاف القيم الشاذة والتعامل معها",
      "طريقة IQR تحدد القيم الشاذة الإحصائية دون افتراض توزيع:\n```python\nQ1 = df['sales'].quantile(0.25)\nQ3 = df['sales'].quantile(0.75)\nIQR = Q3 - Q1\ndf_clean = df[(df['sales'] >= Q1 - 1.5*IQR) & (df['sales'] <= Q3 + 1.5*IQR)]\n```\nافحص القيم الشاذة دائماً قبل إزالتها — قد تكون أخطاء إدخال بيانات أو أحداث متطرفة حقيقية.",
      "## ابنِ خط أنابيب قابل لإعادة الاستخدام",
      "المكسب الحقيقي في الكفاءة يأتي من تعبئة جميع خطوات التنظيف في دالة:\n```python\ndef clean_sales_data(df):\n    df = df.copy()\n    df.drop_duplicates(inplace=True)\n    df['date'] = pd.to_datetime(df['date'], errors='coerce')\n    df['revenue'] = pd.to_numeric(df['revenue'], errors='coerce')\n    df['region'] = df['region'].str.strip().str.title()\n    df.dropna(subset=['date', 'revenue'], inplace=True)\n    return df\n```\nاستدع هذه الدالة في كل مرة تحمّل فيها مجموعة البيانات. متسقة وقابلة للتكرار وقابلة للتدقيق.",
    ],
  },

  "professional-dashboard-design": {
    en: [
      "Most dashboards fail not because of bad data or wrong calculations — but because of poor design. A dashboard that people can't read quickly, can't understand at a glance, or can't trust visually has failed its core purpose. These 7 rules will immediately upgrade your reports from cluttered to executive-ready.",
      "[IMG:https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900|Professional business dashboard with clean layout and KPI cards]",
      "## Rule 1: One Dashboard, One Business Question",
      "Every dashboard should answer one primary question. 'How is our sales performance this month vs. last month?' is a good dashboard. 'Everything about sales, marketing, operations, HR, and finance' is a disaster. When stakeholders ask for more, build a second dashboard — don't cram everything into one.",
      "## Rule 2: Most Important KPI Goes Top-Left",
      "Humans read screens like text — left to right, top to bottom (in LTR layouts). Your most critical metric should be the first thing eyes land on. In Arabic RTL layouts, this means top-right. Secondary KPIs follow. Supporting charts and tables go below.",
      "[IMG:https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900|Dashboard layout showing KPI placement hierarchy]",
      "## Rule 3: Maximum 3 Colors",
      "Color overload is the most common design mistake. Pick: one primary brand color, one accent for alerts and highlights (usually red or amber), one neutral for backgrounds and borders. Every additional color adds cognitive load and dilutes the impact of the important ones.",
      "## Rule 4: Remove Everything That Doesn't Add Information",
      "Go through your dashboard and ask of every element: 'Does this help the reader understand the data faster?' If the answer is no, remove it.\n- Grid lines: lighter or remove entirely\n- Border on every card: remove\n- 3D effects on charts: always remove\n- Background colors on every visual: remove\n- Excessive decimal places: round to the nearest meaningful unit\n\nWhite space is not wasted space — it's breathing room that makes data readable.",
      "## Rule 5: Choose the Right Chart Type",
      "**Trend over time** → Line chart\n**Comparing categories** → Horizontal bar chart (easier to read long labels)\n**Part of a whole** → Donut or pie chart (maximum 5 segments; use bar for more)\n**Distribution** → Histogram or box plot\n**Relationship between two variables** → Scatter plot\n**Single KPI vs. target** → Card with conditional formatting or gauge\n\nNever use pie charts with more than 5 slices — they become unreadable. Never use 3D charts — they distort perception.",
      "## Rule 6: Always Provide Context",
      "A number without context is meaningless. Instead of showing just 'Revenue: 2.4M', show:\n- vs. Target: 2.0M (✅ +20%)\n- vs. Last Year: 2.8M (↓ -14%)\n- vs. Last Month: 2.1M (↑ +14%)\n\nContext transforms a number into an insight. The goal of a dashboard is not to display data — it's to trigger a decision or action.",
      "## Rule 7: Test on Real Users Before Finalizing",
      "Show your dashboard to someone who hasn't seen the data before. Give them 10 seconds. Ask: 'What is the main message?' If they can't answer correctly, the design needs work — not the data. The best dashboard is the one the intended audience can read and act on independently, without needing you to explain it.",
    ],
    ar: [
      "معظم لوحات المعلومات تفشل ليس بسبب بيانات سيئة أو حسابات خاطئة — بل بسبب تصميم رديء. لوحة المعلومات التي لا يستطيع الناس قراءتها بسرعة أو فهمها بنظرة واحدة أو الوثوق بها بصرياً فشلت في هدفها الأساسي. هذه القواعد السبع ستطوّر تقاريرك فوراً من الفوضى إلى الجاهزية التنفيذية.",
      "[IMG:https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900|لوحة معلومات أعمال احترافية بتخطيط نظيف وبطاقات KPI]",
      "## القاعدة 1: لوحة معلومات واحدة، سؤال أعمال واحد",
      "كل لوحة معلومات يجب أن تجيب على سؤال رئيسي واحد. 'كيف أداء مبيعاتنا هذا الشهر مقارنة بالشهر الماضي؟' لوحة معلومات جيدة. 'كل شيء عن المبيعات والتسويق والعمليات والموارد البشرية والمالية' كارثة. حين يطلب أصحاب المصلحة المزيد، ابنِ لوحة معلومات ثانية.",
      "## القاعدة 2: أهم مؤشر KPI في الأعلى",
      "البشر يقرؤون الشاشات كالنص. في التخطيطات العربية RTL، يعني هذا أعلى اليمين. مؤشراتك الأكثر أهمية يجب أن تكون أول ما تقع عليه العيون. المؤشرات الثانوية تليها. المخططات والجداول الداعمة تكون أسفل.",
      "[IMG:https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900|تخطيط لوحة المعلومات يُظهر تسلسل ترتيب KPI]",
      "## القاعدة 3: 3 ألوان كحد أقصى",
      "الإفراط في الألوان هو أكثر أخطاء التصميم شيوعاً. اختر: لون علامة تجارية رئيسي واحد، لون تمييز للتنبيهات والإبرازات (عادةً أحمر أو كهرماني)، لون محايد للخلفيات والحدود. كل لون إضافي يزيد العبء المعرفي ويخفف تأثير الألوان المهمة.",
      "## القاعدة 4: أزل كل ما لا يضيف معلومة",
      "مرّ على لوحة المعلومات واسأل عن كل عنصر: 'هل هذا يساعد القارئ على فهم البيانات بشكل أسرع؟' إذا كانت الإجابة لا، أزله.\n- خطوط الشبكة: أخفّها أو أزلها تماماً\n- حدود كل بطاقة: أزلها\n- تأثيرات ثلاثية الأبعاد: أزلها دائماً\n- ألوان الخلفية على كل مرئي: أزلها\n\nالمساحة البيضاء ليست مساحة مهدرة — إنها مساحة تنفّس تجعل البيانات قابلة للقراءة.",
      "## القاعدة 5: اختر نوع المخطط الصحيح",
      "**الاتجاه عبر الزمن** ← مخطط خطي\n**مقارنة الفئات** ← مخطط شريطي أفقي\n**جزء من الكل** ← مخطط دونات أو دائري (5 شرائح كحد أقصى)\n**التوزيع** ← رسم بياني تكراري أو مخطط صندوقي\n**علاقة بين متغيرين** ← مخطط مبعثر\n\nلا تستخدم المخططات الدائرية بأكثر من 5 شرائح — تصبح غير مقروءة. لا تستخدم المخططات ثلاثية الأبعاد أبداً.",
      "## القاعدة 6: قدّم السياق دائماً",
      "رقم بدون سياق لا معنى له. بدلاً من عرض 'الإيرادات: 2.4 مليون' فقط، أظهر:\n- مقابل الهدف: 2.0 مليون (✅ +20%)\n- مقابل العام الماضي: 2.8 مليون (↓ -14%)\n- مقابل الشهر الماضي: 2.1 مليون (↑ +14%)\n\nالسياق يحوّل الرقم إلى رؤية. هدف لوحة المعلومات ليس عرض البيانات — بل تحفيز قرار أو إجراء.",
      "## القاعدة 7: اختبر على مستخدمين حقيقيين",
      "أرِ لوحة المعلومات لشخص لم يرَ البيانات من قبل. أعطه 10 ثوانٍ. اسأل: 'ما الرسالة الرئيسية؟' إذا لم يستطع الإجابة بشكل صحيح، التصميم يحتاج عملاً — لا البيانات. أفضل لوحة معلومات هي التي يستطيع الجمهور المقصود قراءتها والتصرف بناءً عليها باستقلالية.",
    ],
  },

  "statistics-for-data-analysts": {
    en: [
      "You don't need a statistics degree to be a great data analyst. But you do need specific statistical concepts — the ones that appear in real analytical work, stakeholder presentations, and job interviews every week. This article covers exactly those concepts, with practical examples you can use immediately.",
      "[IMG:https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=900|Statistical charts and distribution curves visualization]",
      "## Mean, Median, and Mode — and When to Use Each",
      "**Mean (average):** Sum divided by count. Useful when data is symmetric with no extreme outliers.\n**Median:** Middle value when sorted. Use this when data is skewed or contains outliers. A dataset of 10 employee salaries plus one CEO salary of 10M will produce a misleading mean — the median tells the true story.\n**Mode:** Most frequent value. Most useful for categorical data.",
      "The rule: default to median for salary, house prices, time-based metrics, and any dataset where extreme values exist. Use mean only when the distribution is roughly symmetric.",
      "## Standard Deviation — Understanding Spread",
      "Standard deviation measures how spread out values are around the mean. Low SD = values cluster tightly around the average. High SD = values are widely dispersed.\n\nPractical use: if average delivery time is 5 days with SD of 0.5, most deliveries arrive 4.5–5.5 days. If SD is 3, deliveries range widely from 2 to 8 days — the process is unreliable.",
      "[IMG:https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900|Normal distribution bell curve with standard deviation markers]",
      "## Correlation vs. Causation",
      "This is the most important statistical concept for analysts who present findings to business leaders. Two variables can move together (correlation) without one causing the other (causation).\n\nClassic example: ice cream sales and drowning rates both peak in summer — but ice cream doesn't cause drowning. The hidden variable is temperature.\n\nWhenever you find a correlation, ask: 'What third variable could explain both?' and 'Does this relationship make logical sense?' Before presenting correlation as insight, test whether a causal mechanism actually exists.",
      "## Percentiles — More Useful Than Averages for Skewed Data",
      "Percentiles tell you where a value falls relative to the distribution. The 75th percentile means 75% of values fall below this point. This is far more useful than an average for describing performance:\n- A student scoring in the 92nd percentile tells you more than their raw score of 87/100\n- A server with P95 response time of 800ms tells you 95% of requests complete within 800ms\n- NPS scores, salary benchmarks, and delivery SLAs are all better expressed in percentiles",
      "## A/B Testing — The Basics Every Analyst Needs",
      "A/B testing is how organizations make data-driven decisions about changes. Two versions (A and B) are shown to different user groups. The question isn't just 'which version won?' — it's 'is the difference statistically significant, or could it be random chance?'\n\nThe p-value answers this. A p-value below 0.05 means there's less than a 5% probability the observed difference happened by chance. Always report confidence intervals alongside p-values — they communicate the magnitude of uncertainty, not just whether the result is significant.",
      "## Linear Regression — Predicting and Explaining",
      "Linear regression fits a line through data to model the relationship between an input variable (X) and an output variable (Y). In business analytics, it's used to:\n- Predict next month's revenue based on historical trends\n- Quantify the impact of price changes on demand\n- Identify which factors most strongly predict customer churn\n\nThe R-squared value (0 to 1) tells you how much of the variation in Y is explained by X. An R² of 0.85 means 85% of the variation in Y is explained by your model — a strong relationship.",
    ],
    ar: [
      "لا تحتاج إلى شهادة في الإحصاء لتكون محللاً رائعاً للبيانات. لكنك تحتاج إلى مفاهيم إحصائية محددة — تلك التي تظهر في العمل التحليلي الحقيقي وعروض أصحاب المصلحة ومقابلات العمل كل أسبوع. هذا المقال يغطي بالضبط تلك المفاهيم، مع أمثلة عملية يمكنك استخدامها فوراً.",
      "[IMG:https://images.unsplash.com/photo-1509228468518-180dd4864904?w=900|تصور المخططات الإحصائية ومنحنيات التوزيع]",
      "## الوسط والوسيط والمنوال — ومتى تستخدم كلاً منهما",
      "**الوسط الحسابي:** المجموع مقسوماً على العدد. مفيد حين البيانات متماثلة دون قيم شاذة متطرفة.\n**الوسيط:** القيمة الوسطى عند الترتيب. استخدمه حين البيانات منحرفة أو تحتوي على قيم شاذة. مجموعة بيانات من 10 رواتب موظفين بالإضافة لراتب مدير تنفيذي 10 مليون ستنتج وسطاً حسابياً مضلّلاً — الوسيط يحكي القصة الحقيقية.\n**المنوال:** القيمة الأكثر تكراراً. الأكثر فائدة للبيانات الفئوية.",
      "## الانحراف المعياري — فهم الانتشار",
      "يقيس الانحراف المعياري مدى انتشار القيم حول الوسط. انحراف منخفض = القيم متمركزة بشكل محكم حول المتوسط. انحراف مرتفع = القيم منتشرة على نطاق واسع.\n\nاستخدام عملي: إذا كان متوسط وقت التسليم 5 أيام مع انحراف 0.5، معظم التسليمات تصل في 4.5–5.5 أيام. إذا كان الانحراف 3، التسليمات تتراوح بشكل واسع من 2 إلى 8 أيام — العملية غير موثوقة.",
      "[IMG:https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900|منحنى التوزيع الطبيعي مع علامات الانحراف المعياري]",
      "## الارتباط مقابل السببية",
      "هذا أهم مفهوم إحصائي للمحللين الذين يعرضون النتائج لقادة الأعمال. متغيران يمكن أن يتحركا معاً (ارتباط) دون أن يتسبب أحدهما في الآخر (سببية).\n\nمثال كلاسيكي: مبيعات الآيس كريم ومعدلات الغرق كلاهما يبلغان ذروتهما في الصيف — لكن الآيس كريم لا يسبب الغرق. المتغير الخفي هو درجة الحرارة.\n\nكلما وجدت ارتباطاً، اسأل: 'ما المتغير الثالث الذي يمكنه تفسير كليهما؟'",
      "## المئينات — أكثر فائدة من المتوسطات للبيانات المنحرفة",
      "المئينات تخبرك بمكان سقوط قيمة ما نسبةً للتوزيع. المئين الـ75 يعني أن 75% من القيم تقع أسفل هذه النقطة. هذا أكثر فائدة بكثير من المتوسط لوصف الأداء:\n- طالب في المئين الـ92 يخبرك أكثر من درجته الخام 87/100\n- خادم بوقت استجابة P95 بـ800 مللي ثانية يخبرك أن 95% من الطلبات تكتمل خلال 800 مللي ثانية",
      "## اختبار A/B — الأساسيات التي يحتاجها كل محلل",
      "اختبار A/B هو كيف تتخذ المنظمات قرارات مبنية على البيانات حول التغييرات. يُعرض نسختان (A و B) لمجموعات مستخدمين مختلفة. السؤال ليس فقط 'أي نسخة فازت؟' — بل 'هل الفرق ذو دلالة إحصائية، أم يمكن أن يكون صدفة عشوائية؟'\n\nقيمة p تجيب على هذا. قيمة p أقل من 0.05 تعني احتمالاً أقل من 5% بأن الفرق المُلاحظ حدث بالصدفة.",
      "## الانحدار الخطي — التنبؤ والتفسير",
      "يضع الانحدار الخطي خطاً عبر البيانات لنمذجة العلاقة بين متغير مدخل (X) ومتغير مخرج (Y). في تحليل الأعمال، يُستخدم لـ:\n- التنبؤ بإيرادات الشهر القادم بناءً على الاتجاهات التاريخية\n- تحديد تأثير تغييرات الأسعار على الطلب\n- تحديد العوامل التي تتنبأ بقوة أكبر بتذبذب العملاء\n\nقيمة R² (0 إلى 1) تخبرك كم من التباين في Y تفسره X. R² بقيمة 0.85 يعني أن 85% من التباين في Y يفسره نموذجك.",
    ],
  },

  "tableau-vs-looker-studio": {
    en: [
      "Most data analysts in the Arab market choose Power BI as their primary visualization tool — and for good reason. But Tableau and Looker Studio fill important gaps that Power BI doesn't address well. Understanding when to use each tool makes you significantly more versatile and valuable as an analyst.",
      "[IMG:https://images.unsplash.com/photo-1543286386-713bdd548da4?w=900|Data visualization tool comparison on laptop screens]",
      "## Tableau: The Global Standard for Visual Analytics",
      "Tableau is widely considered the most capable visualization tool in the world for exploring and presenting data. Its advantages are significant:\n\n**Visual flexibility:** Tableau can build virtually any chart type imaginable — from basic bar charts to advanced geospatial maps, network diagrams, statistical visualizations, and custom SVG-based graphics. Power BI and Looker Studio are more constrained.\n\n**Drag-and-drop exploration:** Tableau's interface is built for analytical exploration. You can pivot, filter, drill, and reconfigure visualizations in seconds — making it ideal for discovering insights you didn't know to look for.\n\n**Tableau Public:** Completely free for published dashboards. The Tableau Public gallery is the world's largest repository of data visualization portfolios. For anyone building a career in analytics, a strong Tableau Public profile is a significant differentiator.",
      "[IMG:https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900|Tableau dashboard showing geospatial and advanced analytics]",
      "## Tableau's Limitations",
      "**Cost:** Tableau Creator license costs $75/month per user — one of the most expensive BI tools on the market. For teams of 10+, this adds up to $9,000/year minimum. Tableau Public is free but data must be public.\n\n**Learning curve:** Tableau's calculation syntax (LOD expressions) is powerful but has a steep learning curve. Concepts like FIXED, INCLUDE, and EXCLUDE LOD calculations take time to internalize.\n\n**Arab market penetration:** Despite global dominance, Tableau's adoption in the Arab market is lower than Power BI. Most local job postings request Power BI first.",
      "## Looker Studio: Google's Free Reporting Platform",
      "Looker Studio (formerly Google Data Studio) is completely free and integrates natively with Google's entire ecosystem:\n\n**Native Google connectors:** Google Analytics 4, Google Ads, Google Search Console, Google Sheets, BigQuery — all connect with one click, no additional setup.\n\n**URL-based sharing:** Reports are web pages. Share via a URL, embed in websites, or export to PDF. No software installation, no login required for viewers.\n\n**Unlimited reports and users:** Unlike Power BI's $10/user/month sharing cost, Looker Studio is free for unlimited users forever.\n\n**Real-time collaboration:** Multiple users can edit the same report simultaneously, Google Docs-style.",
      "## Looker Studio's Limitations",
      "Less powerful for complex analytics. Calculated fields are simpler than DAX or Tableau's LOD expressions. Data blending (combining multiple sources) is less flexible. For data outside the Google ecosystem, paid third-party connectors are often required.",
      "## The Decision Framework",
      "**Use Tableau when:** building portfolio pieces for job applications, working at international companies with Tableau licenses, doing advanced visual storytelling, or needing chart types Power BI doesn't support.\n\n**Use Looker Studio when:** your data lives in Google Analytics or Google Ads, you need to share reports with clients who shouldn't need a login, budget is zero, or you're a freelancer who needs to embed reports in client websites.\n\n**Use Power BI when:** working in a corporate environment in the Arab market, building enterprise dashboards with complex DAX, or working with large datasets from Microsoft data sources.",
      "## The Bottom Line for Arab Market Analysts",
      "Priority order: **Power BI → Tableau Public (for portfolio) → Looker Studio (for Google data)**. All three tools are worth knowing — but invest 80% of your learning time in Power BI first. Add Tableau Public projects to your portfolio to stand out, and learn Looker Studio in a week when a client project requires it.",
    ],
    ar: [
      "معظم محللي البيانات في السوق العربية يختارون Power BI أداةً رئيسية للتصور — ولأسباب وجيهة. لكن Tableau وLooker Studio يملآن فجوات مهمة لا تعالجها Power BI جيداً. فهم متى تستخدم كل أداة يجعلك أكثر تنوعاً وقيمة كمحلل.",
      "[IMG:https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900|مقارنة أدوات تصور البيانات على شاشات الحاسوب المحمول]",
      "## Tableau: المعيار العالمي للتحليلات البصرية",
      "يُعتبر Tableau على نطاق واسع أكثر أدوات التصور قدرةً في العالم لاستكشاف البيانات وتقديمها:\n\n**مرونة بصرية:** يستطيع Tableau بناء تقريباً أي نوع مخطط يمكن تخيله — من المخططات الشريطية الأساسية إلى الخرائط الجغرافية المتقدمة والتصورات الإحصائية.\n\n**استكشاف السحب والإفلات:** واجهة Tableau مبنية للاستكشاف التحليلي. يمكنك تغيير المحاور والتصفية والتفصيل وإعادة تكوين التصورات في ثوانٍ.\n\n**Tableau Public:** مجاني تماماً للوحات المعلومات المنشورة. معرض Tableau Public هو أكبر مستودع لمحافظ تصور البيانات في العالم.",
      "[IMG:https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900|لوحة معلومات Tableau تعرض تحليلات جغرافية ومتقدمة]",
      "## قيود Tableau",
      "**التكلفة:** ترخيص Tableau Creator يكلف 75 دولاراً شهرياً للمستخدم. للفرق المؤلفة من 10 أشخاص أو أكثر، يصل ذلك إلى 9,000 دولار سنوياً كحد أدنى.\n\n**منحنى التعلم:** بنية حساب Tableau (تعبيرات LOD) قوية لكن لها منحنى تعلم حاد.\n\n**انتشار في السوق العربية:** على الرغم من الهيمنة العالمية، انتشار Tableau في السوق العربية أقل من Power BI.",
      "## Looker Studio: منصة تقارير Google المجانية",
      "Looker Studio (المعروف سابقاً بـ Google Data Studio) مجاني تماماً ويتكامل بشكل أصلي مع منظومة Google:\n\n**موصلات Google الأصلية:** Google Analytics 4 وGoogle Ads وGoogle Sheets وBigQuery — تتصل بنقرة واحدة.\n\n**المشاركة عبر URL:** التقارير صفحات ويب. شارك عبر URL أو ضمّنها في المواقع. لا تثبيت برنامج، لا تسجيل دخول مطلوب من المشاهدين.\n\n**تقارير ومستخدمون غير محدودين:** على عكس تكلفة مشاركة Power BI بـ10$/مستخدم/شهر، Looker Studio مجاني لمستخدمين غير محدودين إلى الأبد.",
      "## قيود Looker Studio",
      "أقل قوة للتحليلات المعقدة. الحقول المحسوبة أبسط من DAX أو تعبيرات LOD لـ Tableau. مزج البيانات (دمج مصادر متعددة) أقل مرونة. للبيانات خارج منظومة Google، غالباً ما تكون موصلات جهات خارجية مدفوعة مطلوبة.",
      "## إطار القرار",
      "**استخدم Tableau حين:** بناء معرض أعمال لطلبات التوظيف، أو العمل في شركات دولية لديها تراخيص Tableau، أو تحتاج أنواع مخططات لا يدعمها Power BI.\n\n**استخدم Looker Studio حين:** بياناتك في Google Analytics أو Google Ads، أو تحتاج مشاركة تقارير مع عملاء لا يحتاجون تسجيل دخول، أو الميزانية صفر.\n\n**استخدم Power BI حين:** العمل في بيئة مؤسسية في السوق العربية، أو بناء لوحات معلومات مؤسسية بـ DAX معقد.",
      "## الخلاصة لمحللي السوق العربية",
      "ترتيب الأولويات: **Power BI → Tableau Public (لمعرض الأعمال) → Looker Studio (لبيانات Google)**. الأدوات الثلاثة تستحق المعرفة — لكن استثمر 80% من وقت تعلّمك في Power BI أولاً. أضف مشاريع Tableau Public لمعرض أعمالك للتميز، وتعلّم Looker Studio في أسبوع حين يتطلبه مشروع عميل.",
    ],
  },
};

function renderContent(paragraphs: string[], isAr: boolean) {
  return paragraphs.map((para, i) => {
    // Image block: [IMG:url|caption]
    const imgMatch = para.match(/^\[IMG:(.+?)\|(.+?)\]$/);
    if (imgMatch) {
      return (
        <figure key={i} className="my-8 rounded-2xl overflow-hidden border border-white/10">
          <div className="relative w-full h-56 md:h-72">
            <Image
              src={imgMatch[1]}
              alt={imgMatch[2]}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 700px"
            />
          </div>
          <figcaption className="text-center text-xs text-slate-500 py-2 px-4 bg-slate-900">
            {imgMatch[2]}
          </figcaption>
        </figure>
      );
    }
    // H2
    if (para.startsWith("## ")) {
      const content = para.replace("## ", "");
      const [h, ...rest] = content.split("\n");
      return (
        <div key={i}>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-10 mb-3 border-b border-white/10 pb-2">{h}</h2>
          {rest.length > 0 && <p className="text-slate-300 leading-relaxed mb-4 whitespace-pre-line">{rest.join("\n")}</p>}
        </div>
      );
    }
    // H3
    if (para.startsWith("### ")) {
      return <h3 key={i} className="text-lg font-bold text-blue-300 mt-6 mb-2">{para.replace("### ", "")}</h3>;
    }
    // Code block (triple backtick)
    if (para.includes("```")) {
      const parts = para.split(/```(?:\w+)?/);
      return (
        <div key={i}>
          {parts.map((part, j) =>
            j % 2 === 1 ? (
              <pre key={j} className="bg-slate-900 border border-white/10 rounded-xl p-4 my-4 overflow-x-auto text-sm text-green-300 font-mono leading-relaxed">
                <code>{part.trim()}</code>
              </pre>
            ) : part.trim() ? (
              <p key={j} className="text-slate-300 leading-relaxed mb-3 whitespace-pre-line">{part.trim()}</p>
            ) : null
          )}
        </div>
      );
    }
    // Inline code with backtick lines (no triple backtick but has single backtick)
    // Regular paragraph
    return (
      <p key={i} className="text-slate-300 leading-relaxed mb-4 whitespace-pre-line">
        {para.split(/(`[^`]+`)/).map((chunk, j) =>
          chunk.startsWith("`") && chunk.endsWith("`") ? (
            <code key={j} className="bg-slate-800 text-green-300 px-1.5 py-0.5 rounded text-sm font-mono">
              {chunk.slice(1, -1)}
            </code>
          ) : (
            chunk.split(/(\*\*[^*]+\*\*)/).map((c, k) =>
              c.startsWith("**") && c.endsWith("**") ? (
                <strong key={k} className="text-white font-semibold">{c.slice(2, -2)}</strong>
              ) : (
                <span key={k}>{c}</span>
              )
            )
          )
        )}
      </p>
    );
  });
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const locale = useLocale();
  const isAr = locale === "ar";
  const [copied, setCopied] = useState(false);

  const BackIcon = isAr ? ArrowRight : ArrowLeft;

  const post = blogData.find((p) => p.slug === slug);
  const relatedPosts = blogData.filter((p) => p.slug !== slug).slice(0, 2);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <p className="text-slate-400 mb-8">{isAr ? "المقال غير موجود" : "Post not found"}</p>
          <Link href={`/${locale}/blog`} className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">
            {isAr ? "عرض جميع المقالات" : "Browse All Posts"}
          </Link>
        </div>
      </div>
    );
  }

  const title = isAr ? post.titleAr : post.titleEn;
  const excerpt = isAr ? post.excerptAr : post.excerptEn;
  const contentKey = post.slug as keyof typeof ARTICLE_CONTENT;
  const contentParagraphs = ARTICLE_CONTENT[contentKey]
    ? isAr ? ARTICLE_CONTENT[contentKey].ar : ARTICLE_CONTENT[contentKey].en
    : [isAr ? "محتوى المقال قريباً..." : "Article content coming soon..."];

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success(isAr ? "تم نسخ الرابط!" : "Link copied!");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="min-h-screen bg-slate-950 pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-72 md:h-96">
          <Image src={post.image} alt={title} fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-900/30" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 -mt-40 md:-mt-52">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">{isAr ? "الرئيسية" : "Home"}</Link>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            <Link href={`/${locale}/blog`} className="hover:text-white transition-colors">{isAr ? "المدونة" : "Blog"}</Link>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            <span className="text-slate-300 truncate max-w-xs">{title}</span>
          </nav>
          <div className="glass rounded-3xl border border-slate-700/50 p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-sm font-medium">{post.category}</span>
              <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString(isAr ? "ar-EG" : "en-US", { year: "numeric", month: "long", day: "numeric" })}
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                <Clock className="w-4 h-4" />
                {post.readingTime} {isAr ? "دقائق قراءة" : "min read"}
              </div>
            </div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {title}
            </motion.h1>
            <p className="text-lg text-slate-400 mb-6 leading-relaxed">{excerpt}</p>
            <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-slate-700/50">
              <div className="flex items-center gap-3">
                <Image src="/my-pic.jpg" alt={post.author} width={40} height={40} className="rounded-full object-cover w-10 h-10" />
                <div>
                  <p className="text-white font-medium text-sm">{post.author}</p>
                  <p className="text-slate-400 text-xs">{isAr ? "مؤسس Knowlytics Hub" : "Founder, Knowlytics Hub"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm me-1">{isAr ? "شارك:" : "Share:"}</span>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-[#1DA1F2] hover:bg-slate-700 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-[#0A66C2] hover:bg-slate-700 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <button onClick={handleCopyLink} className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                  {copied ? <span className="text-green-400 text-xs px-1">✓</span> : <Link2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <article className="lg:col-span-3">
            <div className="glass rounded-2xl border border-slate-700/50 p-8">
              {renderContent(contentParagraphs, isAr)}
              <div className="mt-10 pt-6 border-t border-slate-700/50">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="w-4 h-4 text-slate-400" />
                  {post.tags.map((tag) => (
                    <span key={tag} className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-sm border border-slate-700 hover:border-blue-500/50 hover:text-blue-400 transition-colors cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
          <aside className="space-y-6">
            <div className="glass rounded-2xl border border-slate-700/50 p-5">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-white">{isAr ? "عن المقال" : "About"}</span>
              </div>
              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex justify-between"><span>{isAr ? "وقت القراءة" : "Reading time"}</span><span className="text-white">{post.readingTime} {isAr ? "دقيقة" : "min"}</span></div>
                <div className="flex justify-between"><span>{isAr ? "التصنيف" : "Category"}</span><span className="text-blue-400">{post.category}</span></div>
                <div className="flex justify-between"><span>{isAr ? "الكاتب" : "Author"}</span><span className="text-white">Mohamed A.</span></div>
              </div>
            </div>
            <div className="glass rounded-2xl border border-blue-500/30 p-5 bg-blue-950/20">
              <p className="text-sm font-semibold text-white mb-2">{isAr ? "هل تريد تعلم المزيد؟" : "Want to learn more?"}</p>
              <p className="text-xs text-slate-400 mb-4">{isAr ? "استعرض دوراتنا الاحترافية في تحليل البيانات" : "Browse our professional data analytics courses"}</p>
              <Link href={`/${locale}/courses`} className="block text-center bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition-colors">
                {isAr ? "عرض الدورات" : "View Courses"}
              </Link>
            </div>
          </aside>
        </div>

        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8">{isAr ? "مقالات ذات صلة" : "Related Articles"}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((rp) => (
                <motion.div key={rp.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="glass rounded-2xl overflow-hidden border border-slate-700/50 hover:-translate-y-1 transition-all group">
                  <div className="relative h-48">
                    <Image src={rp.image} alt={isAr ? rp.titleAr : rp.titleEn} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    <span className="absolute top-3 start-3 bg-blue-600/80 text-white text-xs px-2 py-1 rounded-full">{rp.category}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">{isAr ? rp.titleAr : rp.titleEn}</h3>
                    <Link href={`/${locale}/blog/${rp.slug}`} className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors flex items-center gap-1">
                      {isAr ? "اقرأ المزيد" : "Read more"} <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href={`/${locale}/blog`} className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <BackIcon className="w-4 h-4" />
            {isAr ? "العودة إلى المدونة" : "Back to Blog"}
          </Link>
        </div>
      </section>
    </main>
  );
}
