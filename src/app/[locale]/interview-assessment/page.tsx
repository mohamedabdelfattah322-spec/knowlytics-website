"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { CheckCircle, XCircle, ChevronRight, RotateCcw, Briefcase, User, Mail, Phone } from "lucide-react";

interface InterviewAssessmentPageProps {
  params: { locale: string };
}

interface Question {
  id: string;
  questionEn: string;
  questionAr: string;
  options: { en: string[]; ar: string[] };
  correctAnswer: number;
}

interface Part {
  key: string;
  nameEn: string;
  nameAr: string;
  icon: string;
  color: string;
  questions: Question[];
}

const parts: Part[] = [
  {
    key: "excel",
    nameEn: "Excel",
    nameAr: "Excel",
    icon: "📊",
    color: "from-teal-600 to-green-600",
    questions: [
      { id: "e1", questionEn: "What is the difference between VLOOKUP and INDEX-MATCH?", questionAr: "ما الفرق بين VLOOKUP وINDEX-MATCH؟", options: { en: ["No difference", "INDEX-MATCH is more flexible and can look left", "VLOOKUP is always faster", "INDEX-MATCH only works with numbers"], ar: ["لا فرق", "INDEX-MATCH أكثر مرونة ويمكنه البحث يسارًا", "VLOOKUP دائمًا أسرع", "INDEX-MATCH يعمل مع الأرقام فقط"] }, correctAnswer: 1 },
      { id: "e2", questionEn: "Which Excel feature automatically detects a pattern and fills data accordingly?", questionAr: "أي ميزة في Excel تكتشف النمط تلقائيًا وتملأ البيانات وفقًا لذلك؟", options: { en: ["AutoSum", "Flash Fill", "AutoFill", "Quick Fill"], ar: ["الجمع التلقائي", "Flash Fill", "AutoFill", "Quick Fill"] }, correctAnswer: 1 },
      { id: "e3", questionEn: "What does the IFERROR function do?", questionAr: "ماذا تفعل دالة IFERROR؟", options: { en: ["Checks if a cell is empty", "Returns a specified value if a formula results in an error", "Counts errors in a range", "Highlights error cells"], ar: ["تتحقق إذا كانت الخلية فارغة", "تعيد قيمة محددة إذا أسفرت الصيغة عن خطأ", "تحسب الأخطاء في نطاق", "تسلط الضوء على خلايا الخطأ"] }, correctAnswer: 1 },
      { id: "e4", questionEn: "What does the $ symbol do in a cell reference like $B$5?", questionAr: "ماذا يفعل رمز $ في مرجع الخلية مثل $B$5؟", options: { en: ["Formats as currency", "Makes the reference absolute", "Marks as a named range", "Locks the sheet"], ar: ["ينسق كعملة", "يجعل المرجع مطلقًا", "يحدده كنطاق مسمى", "يقفل الورقة"] }, correctAnswer: 1 },
      { id: "e5", questionEn: "Which function sums values that meet multiple conditions?", questionAr: "أي دالة تجمع القيم التي تستوفي شروطًا متعددة؟", options: { en: ["SUMIF", "SUMIFS", "COUNTIFS", "AVERAGEIF"], ar: ["SUMIF", "SUMIFS", "COUNTIFS", "AVERAGEIF"] }, correctAnswer: 1 },
      { id: "e6", questionEn: "What does TRIM() do in Excel?", questionAr: "ماذا تفعل دالة TRIM() في Excel؟", options: { en: ["Rounds a number", "Removes extra spaces from text", "Converts text to numbers", "Removes duplicate rows"], ar: ["تقرب رقمًا", "تزيل المسافات الزائدة من النص", "تحول النص إلى أرقام", "تزيل الصفوف المكررة"] }, correctAnswer: 1 },
      { id: "e7", questionEn: "What is the purpose of Freeze Panes?", questionAr: "ما الغرض من تجميد الأجزاء؟", options: { en: ["Locks the workbook", "Keeps rows/columns visible while scrolling", "Merges cells", "Protects data"], ar: ["يقفل المصنف", "يبقي الصفوف/الأعمدة مرئية أثناء التمرير", "يدمج الخلايا", "يحمي البيانات"] }, correctAnswer: 1 },
      { id: "e8", questionEn: "Which function returns only the data that meets given criteria as a dynamic array?", questionAr: "أي دالة تعيد فقط البيانات التي تستوفي معايير محددة كمصفوفة ديناميكية؟", options: { en: ["SORT", "FILTER", "UNIQUE", "XLOOKUP"], ar: ["SORT", "FILTER", "UNIQUE", "XLOOKUP"] }, correctAnswer: 1 },
      { id: "e9", questionEn: "How do Slicers enhance an Excel dashboard?", questionAr: "كيف تعزز القطاعات لوحة معلومات Excel؟", options: { en: ["By adding colors to charts", "By providing interactive filtering for pivot tables and charts", "By sorting data automatically", "By removing blank rows"], ar: ["بإضافة ألوان للمخططات", "بتوفير تصفية تفاعلية للجداول المحورية والمخططات", "بترتيب البيانات تلقائيًا", "بإزالة الصفوف الفارغة"] }, correctAnswer: 1 },
      { id: "e10", questionEn: "What does LEN() return?", questionAr: "ماذا تعيد دالة LEN()؟", options: { en: ["The largest value in a range", "The number of characters in a text string", "The length of a selected range in rows", "The number of words in a cell"], ar: ["أكبر قيمة في نطاق", "عدد الأحرف في نص", "طول النطاق المحدد بالصفوف", "عدد الكلمات في الخلية"] }, correctAnswer: 1 },
      { id: "e11", questionEn: "What is the main advantage of converting data to an Excel Table (Ctrl+T)?", questionAr: "ما الميزة الرئيسية لتحويل البيانات إلى جدول Excel (Ctrl+T)؟", options: { en: ["It encrypts the data", "Formulas and formatting automatically expand with new data", "It creates a pivot table", "It removes duplicate values"], ar: ["يشفر البيانات", "تتوسع الصيغ والتنسيق تلقائيًا مع البيانات الجديدة", "ينشئ جدولًا محوريًا", "يزيل القيم المكررة"] }, correctAnswer: 1 },
      { id: "e12", questionEn: "Which function counts cells that meet multiple conditions across multiple ranges?", questionAr: "أي دالة تحسب الخلايا التي تستوفي شروطًا متعددة عبر نطاقات متعددة؟", options: { en: ["COUNTIF", "COUNT", "COUNTIFS", "COUNTA"], ar: ["COUNTIF", "COUNT", "COUNTIFS", "COUNTA"] }, correctAnswer: 2 },
    ],
  },
  {
    key: "powerbi",
    nameEn: "Power BI",
    nameAr: "Power BI",
    icon: "📈",
    color: "from-yellow-500 to-orange-600",
    questions: [
      { id: "pb1", questionEn: "What is DAX in Power BI?", questionAr: "ما هو DAX في Power BI؟", options: { en: ["A database system", "Data Analysis Expressions – Power BI's formula language", "A chart type", "A data connector"], ar: ["نظام قاعدة بيانات", "تعبيرات تحليل البيانات – لغة صيغ Power BI", "نوع مخطط", "موصل بيانات"] }, correctAnswer: 1 },
      { id: "pb2", questionEn: "What is the difference between a measure and a calculated column in Power BI?", questionAr: "ما الفرق بين المقياس والعمود المحسوب في Power BI؟", options: { en: ["No difference", "Measures are calculated at query time; calculated columns are stored in the model", "Calculated columns are faster", "Measures are stored in tables"], ar: ["لا فرق", "تُحسب المقاييس عند الاستعلام؛ والأعمدة المحسوبة مخزنة في النموذج", "الأعمدة المحسوبة أسرع", "المقاييس مخزنة في الجداول"] }, correctAnswer: 1 },
      { id: "pb3", questionEn: "What does Power Query do in Power BI?", questionAr: "ماذا يفعل Power Query في Power BI؟", options: { en: ["Creates DAX measures", "Connects, transforms, and loads data into the data model", "Designs report visuals", "Publishes reports to the web"], ar: ["ينشئ مقاييس DAX", "يتصل بالبيانات ويحولها ويحملها في نموذج البيانات", "يصمم المرئيات في التقارير", "ينشر التقارير على الويب"] }, correctAnswer: 1 },
      { id: "pb4", questionEn: "What is a relationship in Power BI?", questionAr: "ما هي العلاقة في Power BI؟", options: { en: ["A link between two tables based on a common column", "A type of visual", "A DAX function", "A report page"], ar: ["رابط بين جدولين يستند إلى عمود مشترك", "نوع من المرئيات", "دالة DAX", "صفحة تقرير"] }, correctAnswer: 0 },
      { id: "pb5", questionEn: "Which DAX function calculates a running total?", questionAr: "أي دالة DAX تحسب الإجمالي التراكمي؟", options: { en: ["CALCULATE", "SUMX", "TOTALYTD", "FILTER"], ar: ["CALCULATE", "SUMX", "TOTALYTD", "FILTER"] }, correctAnswer: 2 },
      { id: "pb6", questionEn: "What does the CALCULATE function do in DAX?", questionAr: "ماذا تفعل دالة CALCULATE في DAX؟", options: { en: ["Counts rows in a table", "Evaluates an expression in a modified filter context", "Joins two tables", "Sorts a column"], ar: ["تحسب الصفوف في جدول", "تقيّم تعبيرًا في سياق تصفية معدّل", "تدمج جدولين", "ترتب عمودًا"] }, correctAnswer: 1 },
      { id: "pb7", questionEn: "What is a slicer in Power BI?", questionAr: "ما هو القطاع (Slicer) في Power BI؟", options: { en: ["A DAX function", "An interactive visual used to filter other visuals on the page", "A data transformation step", "A type of chart"], ar: ["دالة DAX", "مرئي تفاعلي يُستخدم لتصفية المرئيات الأخرى في الصفحة", "خطوة تحويل بيانات", "نوع من المخططات"] }, correctAnswer: 1 },
      { id: "pb8", questionEn: "What does 'Publish to Web' do in Power BI?", questionAr: "ماذا تفعل ميزة 'نشر على الويب' في Power BI؟", options: { en: ["Exports the report as PDF", "Makes the report publicly accessible via a URL", "Sends the report by email", "Publishes to Power BI Premium only"], ar: ["تصدّر التقرير كـ PDF", "تجعل التقرير متاحًا للجمهور عبر رابط", "ترسل التقرير بالبريد الإلكتروني", "تنشر إلى Power BI Premium فقط"] }, correctAnswer: 1 },
      { id: "pb9", questionEn: "Which storage mode stores data directly in Power BI Desktop?", questionAr: "أي وضع تخزين يخزن البيانات مباشرة في Power BI Desktop؟", options: { en: ["DirectQuery", "Live Connection", "Import", "Composite"], ar: ["DirectQuery", "الاتصال المباشر", "Import", "Composite"] }, correctAnswer: 2 },
      { id: "pb10", questionEn: "What is the purpose of bookmarks in Power BI?", questionAr: "ما الغرض من الإشارات المرجعية في Power BI؟", options: { en: ["Save DAX formulas", "Capture a view state of a report page for navigation or storytelling", "Export the report", "Lock visuals from editing"], ar: ["حفظ صيغ DAX", "التقاط حالة عرض لصفحة تقرير للتنقل أو سرد القصص", "تصدير التقرير", "قفل المرئيات من التعديل"] }, correctAnswer: 1 },
      { id: "pb11", questionEn: "What does RELATED() do in DAX?", questionAr: "ماذا تفعل دالة RELATED() في DAX؟", options: { en: ["Filters a table", "Retrieves a value from a related table", "Creates a relationship", "Counts related rows"], ar: ["تصفي جدولًا", "تسترجع قيمة من جدول ذي صلة", "تنشئ علاقة", "تحسب الصفوف المرتبطة"] }, correctAnswer: 1 },
      { id: "pb12", questionEn: "What is a star schema in Power BI data modeling?", questionAr: "ما هو مخطط النجمة في نمذجة بيانات Power BI؟", options: { en: ["A visual showing KPIs", "A model with one central fact table linked to multiple dimension tables", "A DAX calculation pattern", "A Power Query transformation"], ar: ["مرئي يُظهر مؤشرات الأداء", "نموذج بجدول حقائق مركزي مرتبط بجداول أبعاد متعددة", "نمط حساب DAX", "تحويل في Power Query"] }, correctAnswer: 1 },
    ],
  },
  {
    key: "tableau",
    nameEn: "Tableau",
    nameAr: "Tableau",
    icon: "🎨",
    color: "from-blue-500 to-cyan-600",
    questions: [
      { id: "tb1", questionEn: "What are Dimensions in Tableau?", questionAr: "ما هي الأبعاد في Tableau؟", options: { en: ["Numerical measures", "Categorical fields used to segment data", "Calculated fields only", "Date fields only"], ar: ["مقاييس رقمية", "حقول فئوية تُستخدم لتقسيم البيانات", "الحقول المحسوبة فقط", "حقول التاريخ فقط"] }, correctAnswer: 1 },
      { id: "tb2", questionEn: "What is the difference between a live connection and an extract in Tableau?", questionAr: "ما الفرق بين الاتصال المباشر والمقتطف في Tableau؟", options: { en: ["No difference", "Live queries the source in real time; extract is a cached snapshot", "Extracts are always more accurate", "Live connections cannot handle large data"], ar: ["لا فرق", "الاتصال المباشر يستعلم المصدر في الوقت الحقيقي؛ والمقتطف نسخة مخزنة مؤقتًا", "المقتطفات دائمًا أكثر دقة", "الاتصال المباشر لا يتعامل مع البيانات الكبيرة"] }, correctAnswer: 1 },
      { id: "tb3", questionEn: "What does LOD stand for in Tableau?", questionAr: "ماذا يرمز LOD في Tableau؟", options: { en: ["Level of Data", "Level of Detail", "Layer of Dimensions", "Limit of Display"], ar: ["مستوى البيانات", "مستوى التفاصيل", "طبقة الأبعاد", "حد العرض"] }, correctAnswer: 1 },
      { id: "tb4", questionEn: "Which LOD expression computes a value at a coarser level than the view?", questionAr: "أي تعبير LOD يحسب قيمة على مستوى أكثر خشونة من العرض؟", options: { en: ["INCLUDE", "EXCLUDE", "FIXED", "TOTAL"], ar: ["INCLUDE", "EXCLUDE", "FIXED", "TOTAL"] }, correctAnswer: 1 },
      { id: "tb5", questionEn: "What is a dashboard action in Tableau?", questionAr: "ما هو إجراء لوحة المعلومات في Tableau؟", options: { en: ["A scheduled refresh", "An interaction that links sheets for filtering, highlighting, or navigation", "A calculated field", "A data source update"], ar: ["تحديث مجدول", "تفاعل يربط الأوراق للتصفية أو التمييز أو التنقل", "حقل محسوب", "تحديث مصدر البيانات"] }, correctAnswer: 1 },
      { id: "tb6", questionEn: "What is the purpose of a calculated field in Tableau?", questionAr: "ما الغرض من الحقل المحسوب في Tableau؟", options: { en: ["To connect to a new data source", "To create new fields by writing formulas on existing data", "To schedule data refreshes", "To publish to Tableau Server"], ar: ["للاتصال بمصدر بيانات جديد", "لإنشاء حقول جديدة بكتابة صيغ على البيانات الموجودة", "لجدولة تحديثات البيانات", "للنشر على خادم Tableau"] }, correctAnswer: 1 },
      { id: "tb7", questionEn: "Which Tableau feature allows you to combine data from multiple sources on a single sheet?", questionAr: "أي ميزة في Tableau تسمح بدمج البيانات من مصادر متعددة في ورقة واحدة؟", options: { en: ["Data Blending", "Cross-database Join", "Union", "Pivot"], ar: ["مزج البيانات", "الربط عبر قواعد البيانات", "الاتحاد", "الجدولة"] }, correctAnswer: 0 },
      { id: "tb8", questionEn: "What is a set in Tableau?", questionAr: "ما هو المجموعة (Set) في Tableau؟", options: { en: ["A type of chart", "A custom field defining a subset of data based on conditions", "A data source connection", "A filter type"], ar: ["نوع من المخططات", "حقل مخصص يحدد مجموعة فرعية من البيانات بناءً على شروط", "اتصال بمصدر بيانات", "نوع من المرشحات"] }, correctAnswer: 1 },
      { id: "tb9", questionEn: "What does 'Show Me' panel do in Tableau?", questionAr: "ماذا يفعل لوح 'أرني' في Tableau؟", options: { en: ["Displays the data preview", "Suggests appropriate chart types based on the fields selected", "Opens a help menu", "Filters the view"], ar: ["يعرض معاينة البيانات", "يقترح أنواع المخططات المناسبة بناءً على الحقول المحددة", "يفتح قائمة مساعدة", "يصفي العرض"] }, correctAnswer: 1 },
      { id: "tb10", questionEn: "What is Tableau Public?", questionAr: "ما هو Tableau Public؟", options: { en: ["A paid enterprise version", "A free platform to publish and share visualizations publicly", "A desktop-only version", "A database tool"], ar: ["إصدار مؤسسي مدفوع", "منصة مجانية لنشر ومشاركة التصورات البيانية بشكل عام", "إصدار سطح المكتب فقط", "أداة قاعدة بيانات"] }, correctAnswer: 1 },
      { id: "tb11", questionEn: "What does the WINDOW_AVG function do in Tableau?", questionAr: "ماذا تفعل دالة WINDOW_AVG في Tableau؟", options: { en: ["Calculates the average of a single row", "Calculates the average of an expression across a specified window of rows", "Filters rows by average", "Groups data by average value"], ar: ["تحسب متوسط صف واحد", "تحسب متوسط تعبير عبر نافذة محددة من الصفوف", "تصفي الصفوف حسب المتوسط", "تجمع البيانات حسب قيمة المتوسط"] }, correctAnswer: 1 },
      { id: "tb12", questionEn: "Which file format saves a Tableau workbook including the data?", questionAr: "أي تنسيق ملف يحفظ مصنف Tableau بما في ذلك البيانات؟", options: { en: [".twb", ".twbx", ".tds", ".tde"], ar: [".twb", ".twbx", ".tds", ".tde"] }, correctAnswer: 1 },
    ],
  },
  {
    key: "looker",
    nameEn: "Looker Studio",
    nameAr: "Looker Studio",
    icon: "🔍",
    color: "from-green-500 to-emerald-600",
    questions: [
      { id: "ls1", questionEn: "What is Looker Studio (formerly Google Data Studio)?", questionAr: "ما هو Looker Studio (المعروف سابقًا بـ Google Data Studio)؟", options: { en: ["A paid BI platform", "A free web-based tool for creating interactive reports and dashboards", "A database system", "A Python library"], ar: ["منصة BI مدفوعة", "أداة ويب مجانية لإنشاء تقارير ولوحات معلومات تفاعلية", "نظام قاعدة بيانات", "مكتبة Python"] }, correctAnswer: 1 },
      { id: "ls2", questionEn: "What is a data source in Looker Studio?", questionAr: "ما هو مصدر البيانات في Looker Studio؟", options: { en: ["A chart type", "A connection to a dataset that powers the report", "A report template", "A filter control"], ar: ["نوع مخطط", "اتصال بمجموعة بيانات تُشغّل التقرير", "قالب تقرير", "عنصر تحكم في التصفية"] }, correctAnswer: 1 },
      { id: "ls3", questionEn: "Which connector allows Looker Studio to pull data from Google Sheets?", questionAr: "أي موصل يتيح لـ Looker Studio سحب البيانات من Google Sheets؟", options: { en: ["BigQuery connector", "Google Sheets connector", "CSV upload", "MySQL connector"], ar: ["موصل BigQuery", "موصل Google Sheets", "رفع CSV", "موصل MySQL"] }, correctAnswer: 1 },
      { id: "ls4", questionEn: "What is a blended data source in Looker Studio?", questionAr: "ما هو مصدر البيانات المدمج في Looker Studio؟", options: { en: ["A single data source", "A combined view from multiple data sources joined on a common field", "An exported dataset", "A filtered view"], ar: ["مصدر بيانات واحد", "عرض مدمج من مصادر بيانات متعددة مرتبطة بحقل مشترك", "مجموعة بيانات مُصدَّرة", "عرض مُصفَّى"] }, correctAnswer: 1 },
      { id: "ls5", questionEn: "What are 'controls' in Looker Studio?", questionAr: "ما هي 'عناصر التحكم' في Looker Studio؟", options: { en: ["Dashboard themes", "Interactive filters that let viewers filter the report", "Chart components", "Data source settings"], ar: ["سمات لوحة المعلومات", "مرشحات تفاعلية تتيح للمشاهدين تصفية التقرير", "مكونات المخطط", "إعدادات مصدر البيانات"] }, correctAnswer: 1 },
      { id: "ls6", questionEn: "How can you make a Looker Studio report available to others?", questionAr: "كيف يمكنك إتاحة تقرير Looker Studio للآخرين؟", options: { en: ["By exporting to PDF only", "By sharing a link or embedding it in a website", "By downloading the .lookml file", "By emailing the raw data"], ar: ["بالتصدير إلى PDF فقط", "بمشاركة رابط أو تضمينه في موقع ويب", "بتنزيل ملف .lookml", "بإرسال البيانات الخام بالبريد الإلكتروني"] }, correctAnswer: 1 },
      { id: "ls7", questionEn: "What does a scorecard chart display in Looker Studio?", questionAr: "ما الذي يعرضه مخطط بطاقة الأداء في Looker Studio؟", options: { en: ["A comparison of multiple dimensions", "A single key metric value", "A trend line over time", "A pie breakdown of categories"], ar: ["مقارنة أبعاد متعددة", "قيمة مقياس رئيسية واحدة", "خط اتجاه عبر الزمن", "تفصيل دائري للفئات"] }, correctAnswer: 1 },
      { id: "ls8", questionEn: "What is a calculated field in Looker Studio?", questionAr: "ما هو الحقل المحسوب في Looker Studio؟", options: { en: ["A field copied from another source", "A custom field created using formulas on existing data", "An imported field from BigQuery", "A dimension converted to a metric"], ar: ["حقل منسوخ من مصدر آخر", "حقل مخصص تم إنشاؤه باستخدام صيغ على البيانات الموجودة", "حقل مستورد من BigQuery", "بُعد محوّل إلى مقياس"] }, correctAnswer: 1 },
      { id: "ls9", questionEn: "What does 'View-level filter' mean in Looker Studio?", questionAr: "ماذا تعني 'مرشح على مستوى العرض' في Looker Studio؟", options: { en: ["A filter applied to one chart only", "A filter that affects all charts in the report page", "A filter on the data source", "A permanent filter that cannot be changed"], ar: ["مرشح يُطبَّق على مخطط واحد فقط", "مرشح يؤثر على جميع المخططات في صفحة التقرير", "مرشح على مصدر البيانات", "مرشح دائم لا يمكن تغييره"] }, correctAnswer: 1 },
      { id: "ls10", questionEn: "Which chart type is NOT available natively in Looker Studio?", questionAr: "أي نوع مخطط غير متاح بشكل أصلي في Looker Studio؟", options: { en: ["Bar chart", "Funnel chart (native)", "Time series chart", "Scatter chart"], ar: ["مخطط شريطي", "مخطط قمع (أصلي)", "مخطط سلاسل زمنية", "مخطط مبعثر"] }, correctAnswer: 1 },
      { id: "ls11", questionEn: "What is the Community Visualizations feature in Looker Studio?", questionAr: "ما ميزة التصورات المجتمعية في Looker Studio؟", options: { en: ["Built-in charts only", "Custom chart types built by third-party developers", "Charts shared by Google", "A gallery of report templates"], ar: ["المخططات المدمجة فقط", "أنواع مخططات مخصصة بناها مطورون خارجيون", "مخططات مشتركة من Google", "معرض قوالب التقارير"] }, correctAnswer: 1 },
      { id: "ls12", questionEn: "What happens when you embed a Looker Studio report in a website?", questionAr: "ماذا يحدث عند تضمين تقرير Looker Studio في موقع ويب؟", options: { en: ["It exports as a static image", "It shows a live interactive report inside the webpage", "It downloads a PDF", "It requires a paid account"], ar: ["يُصدَّر كصورة ثابتة", "يعرض تقريرًا تفاعليًا مباشرًا داخل صفحة الويب", "يُنزَّل كـ PDF", "يتطلب حسابًا مدفوعًا"] }, correctAnswer: 1 },
    ],
  },
  {
    key: "python",
    nameEn: "Python",
    nameAr: "Python",
    icon: "🐍",
    color: "from-blue-600 to-indigo-600",
    questions: [
      { id: "py1", questionEn: "Which Python library is primarily used for data manipulation and analysis?", questionAr: "أي مكتبة Python تُستخدم بشكل رئيسي لمعالجة البيانات وتحليلها؟", options: { en: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"], ar: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"] }, correctAnswer: 1 },
      { id: "py2", questionEn: "What does df.head() do in Pandas?", questionAr: "ماذا تفعل df.head() في Pandas؟", options: { en: ["Shows the last 5 rows", "Shows the first 5 rows of the DataFrame", "Shows the column headers only", "Counts all rows"], ar: ["تعرض آخر 5 صفوف", "تعرض أول 5 صفوف من DataFrame", "تعرض رؤوس الأعمدة فقط", "تحسب جميع الصفوف"] }, correctAnswer: 1 },
      { id: "py3", questionEn: "Which method removes missing values in a Pandas DataFrame?", questionAr: "أي طريقة تزيل القيم المفقودة في Pandas DataFrame؟", options: { en: ["df.remove_na()", "df.dropna()", "df.fillna()", "df.clean()"], ar: ["df.remove_na()", "df.dropna()", "df.fillna()", "df.clean()"] }, correctAnswer: 1 },
      { id: "py4", questionEn: "What does groupby() do in Pandas?", questionAr: "ماذا تفعل groupby() في Pandas؟", options: { en: ["Sorts the DataFrame", "Groups data by one or more columns for aggregation", "Filters rows by value", "Merges two DataFrames"], ar: ["ترتب DataFrame", "تجمع البيانات حسب عمود أو أكثر للتجميع", "تصفي الصفوف بالقيمة", "تدمج DataFrames اثنين"] }, correctAnswer: 1 },
      { id: "py5", questionEn: "Which library is used to create static visualizations in Python?", questionAr: "أي مكتبة تُستخدم لإنشاء تصورات بيانية ثابتة في Python؟", options: { en: ["Pandas", "Seaborn / Matplotlib", "Scikit-learn", "SQLAlchemy"], ar: ["Pandas", "Seaborn / Matplotlib", "Scikit-learn", "SQLAlchemy"] }, correctAnswer: 1 },
      { id: "py6", questionEn: "What does the merge() function in Pandas do?", questionAr: "ماذا تفعل دالة merge() في Pandas؟", options: { en: ["Concatenates rows vertically", "Joins two DataFrames based on a common column or index", "Removes duplicate rows", "Renames columns"], ar: ["تسلسل الصفوف عموديًا", "تدمج DataFrame اثنين بناءً على عمود أو فهرس مشترك", "تزيل الصفوف المكررة", "تعيد تسمية الأعمدة"] }, correctAnswer: 1 },
      { id: "py7", questionEn: "What is a lambda function in Python?", questionAr: "ما هي دالة lambda في Python؟", options: { en: ["A built-in sorting function", "An anonymous single-expression function defined inline", "A type of loop", "A class method"], ar: ["دالة ترتيب مدمجة", "دالة مجهولة أحادية التعبير محددة بشكل مضمّن", "نوع من الحلقات", "طريقة فئة"] }, correctAnswer: 1 },
      { id: "py8", questionEn: "What does value_counts() return in Pandas?", questionAr: "ماذا تعيد value_counts() في Pandas؟", options: { en: ["The sum of all values", "A Series with frequency counts of unique values", "The number of columns", "Unique values only"], ar: ["مجموع جميع القيم", "سلسلة بعد تكرارات القيم الفريدة", "عدد الأعمدة", "القيم الفريدة فقط"] }, correctAnswer: 1 },
      { id: "py9", questionEn: "Which Python library is best suited for machine learning models?", questionAr: "أي مكتبة Python الأنسب لنماذج التعلم الآلي؟", options: { en: ["Pandas", "Seaborn", "Scikit-learn", "Openpyxl"], ar: ["Pandas", "Seaborn", "Scikit-learn", "Openpyxl"] }, correctAnswer: 2 },
      { id: "py10", questionEn: "What does df.describe() return?", questionAr: "ماذا تعيد df.describe()؟", options: { en: ["Column data types", "Summary statistics (count, mean, std, min, max) for numeric columns", "The first row of the DataFrame", "Column names only"], ar: ["أنواع بيانات الأعمدة", "إحصاءات ملخصة (العدد، المتوسط، الانحراف المعياري، الحد الأدنى، الأقصى) للأعمدة الرقمية", "الصف الأول من DataFrame", "أسماء الأعمدة فقط"] }, correctAnswer: 1 },
      { id: "py11", questionEn: "How do you select a specific column from a Pandas DataFrame called df?", questionAr: "كيف تختار عمودًا محددًا من Pandas DataFrame باسم df؟", options: { en: ["df.column_name", "df['column_name'] or df.column_name", "df.get('column_name')", "df.select('column_name')"], ar: ["df.column_name", "df['column_name'] أو df.column_name", "df.get('column_name')", "df.select('column_name')"] }, correctAnswer: 1 },
      { id: "py12", questionEn: "Which method handles duplicate rows in a Pandas DataFrame?", questionAr: "أي طريقة تتعامل مع الصفوف المكررة في Pandas DataFrame؟", options: { en: ["df.unique()", "df.drop_duplicates()", "df.remove_dups()", "df.deduplicate()"], ar: ["df.unique()", "df.drop_duplicates()", "df.remove_dups()", "df.deduplicate()"] }, correctAnswer: 1 },
    ],
  },
  {
    key: "sql",
    nameEn: "SQL",
    nameAr: "SQL",
    icon: "🗄️",
    color: "from-purple-600 to-violet-600",
    questions: [
      { id: "sq1", questionEn: "What does a LEFT JOIN return?", questionAr: "ماذا يعيد LEFT JOIN؟", options: { en: ["Only matching rows", "All rows from the left table + matching rows from the right", "Only right table rows", "All rows from both tables"], ar: ["الصفوف المطابقة فقط", "جميع صفوف الجدول الأيسر + الصفوف المطابقة من الأيمن", "صفوف الجدول الأيمن فقط", "جميع الصفوف من الجدولين"] }, correctAnswer: 1 },
      { id: "sq2", questionEn: "What does GROUP BY do in SQL?", questionAr: "ماذا يفعل GROUP BY في SQL؟", options: { en: ["Sorts the result set", "Groups rows sharing a common value for aggregation", "Joins tables together", "Filters individual rows"], ar: ["يرتب مجموعة النتائج", "يجمع الصفوف التي تشترك في قيمة مشتركة للتجميع", "يربط الجداول معًا", "يصفي الصفوف الفردية"] }, correctAnswer: 1 },
      { id: "sq3", questionEn: "What is the difference between WHERE and HAVING?", questionAr: "ما الفرق بين WHERE وHAVING؟", options: { en: ["No difference", "WHERE filters rows before grouping; HAVING filters groups after aggregation", "HAVING is used for joins only", "WHERE works only with strings"], ar: ["لا فرق", "WHERE يصفي الصفوف قبل التجميع؛ HAVING يصفي المجموعات بعد التجميع", "HAVING يُستخدم للربط فقط", "WHERE يعمل مع النصوص فقط"] }, correctAnswer: 1 },
      { id: "sq4", questionEn: "What does DISTINCT do in a SQL query?", questionAr: "ماذا يفعل DISTINCT في استعلام SQL؟", options: { en: ["Sorts results alphabetically", "Returns only unique values, removing duplicates", "Counts all rows", "Joins two tables"], ar: ["يرتب النتائج أبجديًا", "يعيد القيم الفريدة فقط، مزيلًا التكرارات", "يحسب جميع الصفوف", "يربط جدولين"] }, correctAnswer: 1 },
      { id: "sq5", questionEn: "What is a subquery in SQL?", questionAr: "ما هو الاستعلام الفرعي في SQL؟", options: { en: ["A stored procedure", "A query nested inside another query", "A view definition", "An index on a table"], ar: ["إجراء مخزن", "استعلام مضمّن داخل استعلام آخر", "تعريف عرض", "فهرس على جدول"] }, correctAnswer: 1 },
      { id: "sq6", questionEn: "Which aggregate function returns the highest value in a column?", questionAr: "أي دالة تجميع تعيد أعلى قيمة في عمود؟", options: { en: ["AVG()", "SUM()", "MAX()", "COUNT()"], ar: ["AVG()", "SUM()", "MAX()", "COUNT()"] }, correctAnswer: 2 },
      { id: "sq7", questionEn: "What does a window function like ROW_NUMBER() do?", questionAr: "ماذا تفعل دالة نافذة مثل ROW_NUMBER()؟", options: { en: ["Deletes duplicate rows", "Assigns a sequential number to rows within a partition without collapsing them", "Sorts the entire table", "Filters rows by number"], ar: ["تحذف الصفوف المكررة", "تُعيّن رقمًا تسلسليًا للصفوف داخل قسم دون طيّها", "ترتب الجدول بأكمله", "تصفي الصفوف بالرقم"] }, correctAnswer: 1 },
      { id: "sq8", questionEn: "What does COALESCE() do in SQL?", questionAr: "ماذا تفعل COALESCE() في SQL؟", options: { en: ["Counts NULL values", "Returns the first non-NULL value from a list of arguments", "Converts data types", "Joins two tables"], ar: ["تحسب قيم NULL", "تعيد أول قيمة غير NULL من قائمة الوسيطات", "تحول أنواع البيانات", "تربط جدولين"] }, correctAnswer: 1 },
      { id: "sq9", questionEn: "What is the purpose of an index in SQL?", questionAr: "ما الغرض من الفهرس في SQL؟", options: { en: ["To enforce foreign key constraints", "To speed up data retrieval on a column", "To store backup data", "To encrypt column values"], ar: ["لفرض قيود المفتاح الأجنبي", "لتسريع استرداد البيانات في عمود", "لتخزين البيانات الاحتياطية", "لتشفير قيم الأعمدة"] }, correctAnswer: 1 },
      { id: "sq10", questionEn: "What does the CASE statement do in SQL?", questionAr: "ماذا يفعل تعبير CASE في SQL؟", options: { en: ["Creates a new table", "Implements conditional logic similar to IF-THEN-ELSE", "Joins multiple tables", "Calculates running totals"], ar: ["ينشئ جدولًا جديدًا", "ينفذ منطقًا شرطيًا مشابهًا لـ IF-THEN-ELSE", "يربط جداول متعددة", "يحسب الإجماليات التراكمية"] }, correctAnswer: 1 },
      { id: "sq11", questionEn: "What is a CTE (Common Table Expression)?", questionAr: "ما هو CTE (تعبير الجدول المشترك)؟", options: { en: ["A permanent table", "A named temporary result set defined within a WITH clause", "A stored procedure", "A type of join"], ar: ["جدول دائم", "مجموعة نتائج مؤقتة مسماة محددة داخل عبارة WITH", "إجراء مخزن", "نوع من الربط"] }, correctAnswer: 1 },
      { id: "sq12", questionEn: "What is the difference between INNER JOIN and FULL OUTER JOIN?", questionAr: "ما الفرق بين INNER JOIN وFULL OUTER JOIN؟", options: { en: ["No difference", "INNER JOIN returns only matching rows; FULL OUTER JOIN returns all rows from both tables", "FULL OUTER JOIN is faster", "INNER JOIN includes NULLs"], ar: ["لا فرق", "INNER JOIN يعيد الصفوف المطابقة فقط؛ FULL OUTER JOIN يعيد جميع الصفوف من الجدولين", "FULL OUTER JOIN أسرع", "INNER JOIN يتضمن قيم NULL"] }, correctAnswer: 1 },
    ],
  },
  {
    key: "statistics",
    nameEn: "Statistics",
    nameAr: "الإحصاء",
    icon: "📐",
    color: "from-rose-500 to-pink-600",
    questions: [
      { id: "st1", questionEn: "What does standard deviation measure?", questionAr: "ماذا يقيس الانحراف المعياري؟", options: { en: ["The average of data", "The middle value in sorted data", "The spread of data around the mean", "The maximum value"], ar: ["متوسط البيانات", "القيمة الوسطى في البيانات المرتبة", "انتشار البيانات حول المتوسط", "القيمة القصوى"] }, correctAnswer: 2 },
      { id: "st2", questionEn: "What is the median?", questionAr: "ما هو الوسيط؟", options: { en: ["The most frequent value", "The middle value when data is sorted", "The average of all values", "The difference between max and min"], ar: ["القيمة الأكثر تكرارًا", "القيمة الوسطى عند ترتيب البيانات", "متوسط جميع القيم", "الفرق بين الحد الأقصى والأدنى"] }, correctAnswer: 1 },
      { id: "st3", questionEn: "What is a p-value used for in hypothesis testing?", questionAr: "ما استخدام القيمة p في اختبار الفرضيات؟", options: { en: ["To measure data spread", "To determine the probability of observing results if the null hypothesis is true", "To calculate the mean", "To find outliers"], ar: ["لقياس انتشار البيانات", "لتحديد احتمالية مشاهدة النتائج إذا كانت الفرضية الصفرية صحيحة", "لحساب المتوسط", "للعثور على القيم الشاذة"] }, correctAnswer: 1 },
      { id: "st4", questionEn: "What does correlation measure?", questionAr: "ماذا يقيس الارتباط؟", options: { en: ["The average of two variables", "The strength and direction of the linear relationship between two variables", "The difference between two means", "The variance of a dataset"], ar: ["متوسط متغيرين", "قوة واتجاه العلاقة الخطية بين متغيرين", "الفرق بين متوسطين", "تباين مجموعة بيانات"] }, correctAnswer: 1 },
      { id: "st5", questionEn: "What is a normal distribution?", questionAr: "ما هو التوزيع الطبيعي؟", options: { en: ["A skewed distribution", "A symmetric bell-shaped distribution where mean = median = mode", "A uniform distribution", "A distribution with only two outcomes"], ar: ["توزيع منحرف", "توزيع متماثل على شكل جرس حيث المتوسط = الوسيط = المنوال", "توزيع منتظم", "توزيع بنتيجتين فقط"] }, correctAnswer: 1 },
      { id: "st6", questionEn: "What is variance?", questionAr: "ما هو التباين؟", options: { en: ["The square root of the standard deviation", "The average of squared deviations from the mean", "The range of the data", "The most frequent value"], ar: ["الجذر التربيعي للانحراف المعياري", "متوسط الانحرافات المربعة عن المتوسط", "مدى البيانات", "القيمة الأكثر تكرارًا"] }, correctAnswer: 1 },
      { id: "st7", questionEn: "What does R-squared (R²) represent in regression?", questionAr: "ما الذي يمثله R-squared (R²) في الانحدار؟", options: { en: ["The slope of the regression line", "The proportion of variance in the dependent variable explained by the model", "The number of predictors", "The error term"], ar: ["ميل خط الانحدار", "نسبة التباين في المتغير التابع التي يفسرها النموذج", "عدد المتنبئات", "حد الخطأ"] }, correctAnswer: 1 },
      { id: "st8", questionEn: "What is an outlier?", questionAr: "ما هو القيمة الشاذة (Outlier)؟", options: { en: ["The most common value in a dataset", "A data point significantly different from the rest of the data", "The average of all values", "A missing value"], ar: ["القيمة الأكثر شيوعًا في مجموعة البيانات", "نقطة بيانات تختلف اختلافًا كبيرًا عن بقية البيانات", "متوسط جميع القيم", "قيمة مفقودة"] }, correctAnswer: 1 },
      { id: "st9", questionEn: "What is the interquartile range (IQR)?", questionAr: "ما هو النطاق الربيعي (IQR)؟", options: { en: ["The range of the full dataset", "The difference between the 75th and 25th percentiles", "The average of the middle 50% of data", "The standard deviation of the median"], ar: ["مدى مجموعة البيانات الكاملة", "الفرق بين الشريحة المئوية 75 والشريحة 25", "متوسط الـ 50% الوسطى من البيانات", "الانحراف المعياري للوسيط"] }, correctAnswer: 1 },
      { id: "st10", questionEn: "What does a confidence interval represent?", questionAr: "ما الذي يمثله فترة الثقة؟", options: { en: ["The exact population parameter", "A range of values likely to contain the true population parameter", "The sample size needed", "The p-value threshold"], ar: ["معامل التجمع الدقيق", "نطاق من القيم من المرجح أن يحتوي على معامل التجمع الحقيقي", "حجم العينة المطلوب", "عتبة القيمة p"] }, correctAnswer: 1 },
      { id: "st11", questionEn: "What is the difference between descriptive and inferential statistics?", questionAr: "ما الفرق بين الإحصاء الوصفي والإحصاء الاستنتاجي؟", options: { en: ["No difference", "Descriptive summarizes existing data; inferential draws conclusions about a population from a sample", "Inferential is used for small datasets only", "Descriptive uses hypothesis testing"], ar: ["لا فرق", "الوصفي يلخص البيانات الموجودة؛ الاستنتاجي يستخلص استنتاجات حول التجمع من عينة", "الاستنتاجي يُستخدم فقط لمجموعات البيانات الصغيرة", "الوصفي يستخدم اختبار الفرضيات"] }, correctAnswer: 1 },
      { id: "st12", questionEn: "What does a box plot (box-and-whisker plot) show?", questionAr: "ماذا يُظهر مخطط الصندوق (Box Plot)؟", options: { en: ["The frequency of each value", "The distribution summary including median, quartiles, and outliers", "The correlation between two variables", "The trend over time"], ar: ["تكرار كل قيمة", "ملخص التوزيع بما في ذلك الوسيط والأرباع والقيم الشاذة", "الارتباط بين متغيرين", "الاتجاه عبر الزمن"] }, correctAnswer: 1 },
    ],
  },
  {
    key: "caseStudy",
    nameEn: "Case Study",
    nameAr: "دراسة الحالة",
    icon: "💼",
    color: "from-amber-500 to-yellow-600",
    questions: [
      { id: "cs1", questionEn: "A retail store sees a 20% drop in sales in Q3. What is your first step in analyzing this?", questionAr: "يشهد متجر للبيع بالتجزئة انخفاضًا بنسبة 20% في المبيعات في الربع الثالث. ما هي خطوتك الأولى في التحليل؟", options: { en: ["Immediately recommend a discount campaign", "Segment the data by product, region, and time to identify the source of the drop", "Blame external factors", "Increase the marketing budget"], ar: ["التوصية فورًا بحملة تخفيضات", "تقسيم البيانات حسب المنتج والمنطقة والوقت لتحديد مصدر الانخفاض", "إلقاء اللوم على العوامل الخارجية", "زيادة ميزانية التسويق"] }, correctAnswer: 1 },
      { id: "cs2", questionEn: "You are asked to build a dashboard for a CEO. What is the most important principle?", questionAr: "طُلب منك بناء لوحة معلومات لمدير تنفيذي. ما أهم مبدأ؟", options: { en: ["Include all available data", "Focus on the key metrics that support strategic decisions, keeping it simple", "Use as many chart types as possible", "Show raw data tables"], ar: ["تضمين جميع البيانات المتاحة", "التركيز على المقاييس الرئيسية التي تدعم القرارات الاستراتيجية مع إبقائها بسيطة", "استخدام أكبر عدد من أنواع المخططات", "عرض جداول البيانات الخام"] }, correctAnswer: 1 },
      { id: "cs3", questionEn: "A dataset has 30% missing values in a key column. What should you do?", questionAr: "تحتوي مجموعة بيانات على 30% قيم مفقودة في عمود رئيسي. ماذا يجب أن تفعل؟", options: { en: ["Delete the entire dataset", "Investigate the pattern of missing data and choose an appropriate strategy (imputation, removal, or flagging)", "Replace all with zeros", "Ignore the missing values"], ar: ["حذف مجموعة البيانات بأكملها", "فحص نمط البيانات المفقودة واختيار استراتيجية مناسبة (الإسناد، الإزالة، أو التعليم)", "استبدالها جميعًا بأصفار", "تجاهل القيم المفقودة"] }, correctAnswer: 1 },
      { id: "cs4", questionEn: "A stakeholder says 'the data shows X.' How do you validate their claim?", questionAr: "يقول أحد أصحاب المصلحة 'البيانات تُظهر X'. كيف تتحقق من ادعائه؟", options: { en: ["Accept it immediately", "Examine the underlying data, methodology, and context before confirming", "Dismiss it without analysis", "Ask another stakeholder"], ar: ["قبوله فورًا", "فحص البيانات الأساسية والمنهجية والسياق قبل التأكيد", "رفضه دون تحليل", "سؤال صاحب مصلحة آخر"] }, correctAnswer: 1 },
      { id: "cs5", questionEn: "You discover two data sources with conflicting numbers for the same KPI. What do you do?", questionAr: "تكتشف مصدرَي بيانات بأرقام متعارضة لنفس مؤشر الأداء. ماذا تفعل؟", options: { en: ["Pick the higher number", "Investigate the definitions, sources, and time periods to reconcile the discrepancy", "Pick the lower number", "Report both without explanation"], ar: ["اختيار الرقم الأعلى", "فحص التعريفات والمصادر والفترات الزمنية لتسوية التناقض", "اختيار الرقم الأدنى", "الإبلاغ عن كليهما بدون شرح"] }, correctAnswer: 1 },
      { id: "cs6", questionEn: "An e-commerce company wants to reduce customer churn. What analytical approach would you suggest?", questionAr: "تريد شركة تجارة إلكترونية تقليل معدل انسحاب العملاء. ما النهج التحليلي الذي تقترحه؟", options: { en: ["Increase advertising spend", "Segment customers by behavior, identify at-risk groups, and build a predictive churn model", "Lower product prices", "Add more products"], ar: ["زيادة الإنفاق الإعلاني", "تقسيم العملاء حسب السلوك وتحديد المجموعات المعرضة للخطر وبناء نموذج تنبؤي للانسحاب", "خفض أسعار المنتجات", "إضافة المزيد من المنتجات"] }, correctAnswer: 1 },
      { id: "cs7", questionEn: "How do you present complex analytical findings to a non-technical audience?", questionAr: "كيف تعرض نتائج تحليلية معقدة أمام جمهور غير تقني؟", options: { en: ["Share raw data tables", "Use simple language, visual storytelling, and focus on business impact rather than methodology", "Explain all technical details", "Use only statistical terminology"], ar: ["مشاركة جداول البيانات الخام", "استخدام لغة بسيطة وسرد قصصي بصري والتركيز على الأثر التجاري بدلًا من المنهجية", "شرح جميع التفاصيل التقنية", "استخدام المصطلحات الإحصائية فقط"] }, correctAnswer: 1 },
      { id: "cs8", questionEn: "A project requires data from 5 different systems. What is your first priority?", questionAr: "يتطلب مشروع بيانات من 5 أنظمة مختلفة. ما أولويتك الأولى؟", options: { en: ["Start analysis immediately", "Assess data quality and consistency across all sources before integrating", "Use only one source", "Ask for more time"], ar: ["بدء التحليل فورًا", "تقييم جودة البيانات واتساقها عبر جميع المصادر قبل الدمج", "استخدام مصدر واحد فقط", "طلب مزيد من الوقت"] }, correctAnswer: 1 },
      { id: "cs9", questionEn: "Sales data shows a spike every December. How do you account for this in your analysis?", questionAr: "تُظهر بيانات المبيعات ذروة كل ديسمبر. كيف تأخذ هذا في حسبانك في تحليلك؟", options: { en: ["Ignore the December data", "Apply seasonal adjustment or use year-over-year comparisons", "Delete December records", "Report it as an error"], ar: ["تجاهل بيانات ديسمبر", "تطبيق التعديل الموسمي أو استخدام مقارنات من عام لآخر", "حذف سجلات ديسمبر", "الإبلاغ عنها كخطأ"] }, correctAnswer: 1 },
      { id: "cs10", questionEn: "You have limited time and many data requests. How do you prioritize?", questionAr: "لديك وقت محدود وطلبات بيانات كثيرة. كيف تحدد الأولويات؟", options: { en: ["Work on the easiest requests first", "Prioritize by business impact, urgency, and strategic alignment", "Refuse some requests", "Work on all simultaneously"], ar: ["العمل على أسهل الطلبات أولًا", "تحديد الأولويات حسب الأثر التجاري والإلحاحية والتوافق الاستراتيجي", "رفض بعض الطلبات", "العمل على الجميع في آنٍ واحد"] }, correctAnswer: 1 },
      { id: "cs11", questionEn: "A metric improved this month but the business result didn't. What might this indicate?", questionAr: "تحسّن مقياس هذا الشهر لكن نتيجة الأعمال لم تتحسن. ماذا قد يشير هذا؟", options: { en: ["The data is wrong", "The metric may not be the right KPI or there is a lagging effect", "The improvement should be ignored", "The business is always slow"], ar: ["البيانات خاطئة", "قد لا يكون المقياس هو مؤشر الأداء الصحيح أو هناك تأثير متأخر", "يجب تجاهل التحسن", "الأعمال دائمًا بطيئة"] }, correctAnswer: 1 },
      { id: "cs12", questionEn: "What is the best way to communicate a negative finding to leadership?", questionAr: "ما أفضل طريقة للتواصل بشأن نتيجة سلبية مع القيادة؟", options: { en: ["Avoid mentioning it", "Present it clearly with supporting data, context, root cause analysis, and proposed next steps", "Downplay the finding", "Blame the data quality"], ar: ["تجنب ذكرها", "عرضها بوضوح مع البيانات الداعمة والسياق وتحليل الأسباب الجذرية والخطوات التالية المقترحة", "التهوين من النتيجة", "إلقاء اللوم على جودة البيانات"] }, correctAnswer: 1 },
    ],
  },
  {
    key: "dataAnalysis",
    nameEn: "Data Analysis",
    nameAr: "تحليل البيانات",
    icon: "🔬",
    color: "from-cyan-500 to-teal-600",
    questions: [
      { id: "da1", questionEn: "What is the difference between structured and unstructured data?", questionAr: "ما الفرق بين البيانات المنظمة وغير المنظمة؟", options: { en: ["No difference", "Structured has a defined schema (like tables); unstructured does not (like text, images)", "Unstructured is always larger", "Structured is only numbers"], ar: ["لا فرق", "المنظمة لها مخطط محدد (كالجداول)؛ وغير المنظمة لا (كالنصوص والصور)", "غير المنظمة دائمًا أكبر", "المنظمة أرقام فقط"] }, correctAnswer: 1 },
      { id: "da2", questionEn: "What is ETL?", questionAr: "ما هو ETL؟", options: { en: ["A programming language", "Extract, Transform, Load – the data pipeline process", "A database type", "A visualization tool"], ar: ["لغة برمجة", "استخراج وتحويل وتحميل – عملية خط البيانات", "نوع قاعدة بيانات", "أداة تصور بيانات"] }, correctAnswer: 1 },
      { id: "da3", questionEn: "What makes a good KPI?", questionAr: "ما الذي يجعل مؤشر الأداء جيدًا؟", options: { en: ["It should be complex", "It should be Specific, Measurable, and Actionable", "It should cover everything", "It should be financial only"], ar: ["يجب أن يكون معقدًا", "يجب أن يكون محددًا وقابلًا للقياس وقابلًا للتنفيذ", "يجب أن يغطي كل شيء", "يجب أن يكون ماليًا فقط"] }, correctAnswer: 1 },
      { id: "da4", questionEn: "What is data cleaning?", questionAr: "ما هو تنظيف البيانات؟", options: { en: ["Deleting all old data", "The process of detecting and fixing errors, inconsistencies, and missing values", "Formatting data as tables", "Copying data to a new location"], ar: ["حذف جميع البيانات القديمة", "عملية اكتشاف الأخطاء وعدم الاتساق والقيم المفقودة وإصلاحها", "تنسيق البيانات كجداول", "نسخ البيانات إلى موقع جديد"] }, correctAnswer: 1 },
      { id: "da5", questionEn: "What is the difference between qualitative and quantitative data?", questionAr: "ما الفرق بين البيانات النوعية والكمية؟", options: { en: ["No difference", "Qualitative is descriptive (non-numeric); quantitative is numerical and measurable", "Quantitative is always bigger", "Qualitative uses statistics"], ar: ["لا فرق", "النوعية وصفية (غير رقمية)؛ والكمية رقمية وقابلة للقياس", "الكمية دائمًا أكبر", "النوعية تستخدم الإحصاء"] }, correctAnswer: 1 },
      { id: "da6", questionEn: "What is data granularity?", questionAr: "ما هو دقة البيانات (Granularity)؟", options: { en: ["The size of a dataset in MB", "The level of detail or precision in the data", "The number of columns in a table", "The speed of data processing"], ar: ["حجم مجموعة البيانات بالميغابايت", "مستوى التفصيل أو الدقة في البيانات", "عدد الأعمدة في الجدول", "سرعة معالجة البيانات"] }, correctAnswer: 1 },
      { id: "da7", questionEn: "What is the purpose of data normalization?", questionAr: "ما الغرض من تطبيع البيانات؟", options: { en: ["To make data look visually appealing", "To scale numeric features to a common range, preventing certain features from dominating", "To remove all duplicates", "To sort data alphabetically"], ar: ["لجعل البيانات جذابة بصريًا", "لتحجيم الميزات الرقمية إلى نطاق مشترك، مما يمنع هيمنة ميزات معينة", "لإزالة جميع التكرارات", "لترتيب البيانات أبجديًا"] }, correctAnswer: 1 },
      { id: "da8", questionEn: "What is a data dictionary?", questionAr: "ما هو قاموس البيانات؟", options: { en: ["A translation tool", "A document that describes the meaning, format, and relationships of data fields", "A type of database", "A visualization template"], ar: ["أداة ترجمة", "وثيقة تصف معنى وتنسيق وعلاقات حقول البيانات", "نوع من قواعد البيانات", "قالب تصور بياني"] }, correctAnswer: 1 },
      { id: "da9", questionEn: "What does data aggregation mean?", questionAr: "ماذا يعني تجميع البيانات؟", options: { en: ["Splitting data into smaller parts", "Combining multiple data values into a summary (sum, average, count, etc.)", "Visualizing data points individually", "Filtering data by criteria"], ar: ["تقسيم البيانات إلى أجزاء أصغر", "دمج قيم بيانات متعددة في ملخص (المجموع، المتوسط، العد، إلخ.)", "تصور نقاط البيانات بشكل فردي", "تصفية البيانات بمعايير"] }, correctAnswer: 1 },
      { id: "da10", questionEn: "What is the purpose of an executive summary in an analysis report?", questionAr: "ما الغرض من الملخص التنفيذي في تقرير التحليل؟", options: { en: ["To include all data tables", "To provide key findings and recommendations for decision makers without technical detail", "To list all team members", "To show all code used"], ar: ["لتضمين جميع جداول البيانات", "لتقديم النتائج الرئيسية والتوصيات لصانعي القرار دون تفاصيل تقنية", "لسرد جميع أعضاء الفريق", "لعرض كل الأكواد المستخدمة"] }, correctAnswer: 1 },
      { id: "da11", questionEn: "What is A/B testing used for in data analysis?", questionAr: "لماذا يُستخدم اختبار A/B في تحليل البيانات؟", options: { en: ["To compare two database systems", "To compare two versions of something to determine which performs better", "To clean data automatically", "To visualize trends over time"], ar: ["لمقارنة نظامَي قاعدة بيانات", "لمقارنة نسختين من شيء لتحديد أيهما يؤدي أداءً أفضل", "لتنظيف البيانات تلقائيًا", "لتصور الاتجاهات عبر الزمن"] }, correctAnswer: 1 },
      { id: "da12", questionEn: "What is the primary difference between correlation and causation?", questionAr: "ما الفرق الأساسي بين الارتباط والسببية؟", options: { en: ["They are the same", "Correlation means two variables move together; causation means one directly causes the other", "Causation is weaker than correlation", "Correlation always implies causation"], ar: ["هما نفس الشيء", "الارتباط يعني تحرك متغيرين معًا؛ السببية تعني أن أحدهما يسبب الآخر مباشرة", "السببية أضعف من الارتباط", "الارتباط يعني دائمًا السببية"] }, correctAnswer: 1 },
    ],
  },
];

function determineLevelForPart(percentage: number) {
  if (percentage >= 85) return { level: 'Advanced', levelAr: 'متقدم', color: '#10b981' };
  if (percentage >= 65) return { level: 'Intermediate', levelAr: 'متوسط', color: '#3b82f6' };
  if (percentage >= 40) return { level: 'Beginner – Needs Practice', levelAr: 'مبتدئ – يحتاج تدريب', color: '#f97316' };
  return { level: 'Needs Full Training', levelAr: 'يحتاج تدريب شامل', color: '#ef4444' };
}

export default function InterviewAssessmentPage({ params: { locale } }: InterviewAssessmentPageProps) {
  const t = useTranslations("interviewAssessment");
  const isAr = locale === "ar";

  // screen: "register" | "parts" | "quiz" | "result"
  const [screen, setScreen] = useState<"register" | "parts" | "quiz" | "result">("register");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regError, setRegError] = useState("");

  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

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
    setScreen("parts");
  };

  const startPart = (part: Part) => {
    setSelectedPart(part);
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setSubmitted(false);
    setScreen("quiz");
  };

  const handleAnswer = (idx: number) => setSelected(idx);

  const handleNext = useCallback(async () => {
    if (selected === null || !selectedPart) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    if (current + 1 >= selectedPart.questions.length) {
      setScreen("result");
      // Submit results
      const finalScore = newAnswers.filter((a, i) => a === selectedPart.questions[i]?.correctAnswer).length;
      const finalPct = Math.round((finalScore / selectedPart.questions.length) * 100);
      const levelInfo = determineLevelForPart(finalPct);

      try {
        await fetch("/api/assessment-result", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: regName,
            email: regEmail,
            phone: regPhone,
            assessmentType: `Interview Assessment – ${isAr ? selectedPart.nameAr : selectedPart.nameEn}`,
            score: finalScore,
            total: selectedPart.questions.length,
            percentage: finalPct,
            level: levelInfo.level,
            weakAreas: [],
            categoryBreakdown: { [selectedPart.key]: { correct: finalScore, total: selectedPart.questions.length } },
          }),
        });
        setSubmitted(true);
      } catch {
        // continue silently
      }
    } else {
      setCurrent(current + 1);
    }
  }, [selected, answers, current, selectedPart, regName, regEmail, regPhone, isAr]);

  const backToParts = () => {
    setScreen("parts");
    setSelectedPart(null);
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setSubmitted(false);
  };

  const retryPart = () => {
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setSubmitted(false);
    setScreen("quiz");
  };

  // ── Registration Screen ──
  if (screen === "register") {
    return (
      <section className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-slate-950 via-blue-950/30 to-slate-950 relative overflow-hidden flex items-center">
        <div className="absolute inset-0 dots-bg opacity-20" />
        <div className="relative container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/30">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-black text-white mb-3">{t("title")}</h1>
              <p className="text-slate-400">{isAr ? "أدخل بياناتك للبدء في الاختبار وستصلك نتيجتك على بريدك الإلكتروني" : "Enter your details to start. Your results will be sent to your email."}</p>
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
                      className="w-full ps-10 pe-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
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
                      placeholder="example@email.com"
                      className="w-full ps-10 pe-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
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
                      className="w-full ps-10 pe-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                      dir="ltr"
                    />
                  </div>
                </div>

                {regError && (
                  <p className="text-red-400 text-sm text-center">{regError}</p>
                )}

                <button type="submit" className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg hover:from-blue-500 hover:to-purple-500 transition-all shadow-xl hover:shadow-blue-500/30 mt-2">
                  {isAr ? "تابع إلى الاختبار ←" : "Continue to Assessment →"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // ── Parts Selection Screen ──
  if (screen === "parts") {
    return (
      <section className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-slate-950 via-blue-950/30 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 dots-bg opacity-20" />
        <div className="relative container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/30">
              <Briefcase className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl lg:text-5xl font-black text-white mb-4">{t("title")}</h1>
            <p className="text-slate-400 text-lg">{isAr ? "اختر القسم الذي تريد تقييمه" : "Choose a section to assess"}</p>
            {regName && <p className="text-blue-400 text-sm mt-2">{isAr ? `مرحبًا ${regName}` : `Welcome, ${regName}`}</p>}
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {parts.map((part, i) => (
              <motion.div
                key={part.key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="glass border border-white/10 rounded-2xl p-6 hover:border-white/25 transition-all hover:-translate-y-1 group"
              >
                <div className="text-3xl mb-3">{part.icon}</div>
                <h3 className="text-white font-bold text-lg mb-1">{isAr ? part.nameAr : part.nameEn}</h3>
                {part.nameAr !== part.nameEn && (
                  <p className="text-slate-500 text-sm mb-3">{isAr ? part.nameEn : part.nameAr}</p>
                )}
                <p className="text-slate-400 text-sm mb-4">
                  {isAr ? `${part.questions.length} سؤال` : `${part.questions.length} Questions`}
                </p>
                <button
                  onClick={() => startPart(part)}
                  className={`w-full py-2.5 rounded-xl bg-gradient-to-r ${part.color} text-white font-semibold text-sm hover:opacity-90 transition-all`}
                >
                  {isAr ? "ابدأ" : "Start"}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── Result Screen ──
  if (screen === "result" && selectedPart) {
    const score = answers.filter((a, i) => a === selectedPart.questions[i]?.correctAnswer).length;
    const pct = Math.round((score / selectedPart.questions.length) * 100);
    const levelInfo = determineLevelForPart(pct);

    return (
      <section className="min-h-screen pt-28 pb-16 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 dots-bg opacity-20" />
        <div className="relative container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-slate-400 text-sm mb-3">{isAr ? selectedPart.nameAr : selectedPart.nameEn}</p>

              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}
                className="w-36 h-36 rounded-full border-4 flex flex-col items-center justify-center mx-auto mb-5"
                style={{ borderColor: levelInfo.color, boxShadow: `0 0 40px ${levelInfo.color}44` }}
              >
                <div className="text-4xl font-black" style={{ color: levelInfo.color }}>{pct}%</div>
                <div className="text-xs text-slate-400">{score}/{selectedPart.questions.length}</div>
              </motion.div>

              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-bold mb-3" style={{ borderColor: levelInfo.color, color: levelInfo.color, background: levelInfo.color + '22' }}>
                {isAr ? levelInfo.levelAr : levelInfo.level}
              </div>

              <p className="text-xl text-white font-bold mb-1">{isAr ? `مرحبًا ${regName}` : `Hello, ${regName}`}</p>
              <p className="text-slate-400">{score}/{selectedPart.questions.length} {isAr ? "إجابات صحيحة" : "correct answers"}</p>
            </div>

            {/* Email confirmation */}
            {submitted && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-5">
                <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="text-blue-300 text-sm font-medium">
                  {isAr ? `نتيجتك على إيميلك ✅ تم إرسال شهادتك إلى ${regEmail}` : `✅ Your certificate has been sent to ${regEmail}`}
                </p>
              </motion.div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={retryPart} className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border border-white/20 text-slate-300 hover:bg-white/10 transition-all font-semibold">
                <RotateCcw className="w-5 h-5" /> {isAr ? "إعادة المحاولة" : "Retry"}
              </button>
              <button onClick={backToParts} className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:from-blue-500 hover:to-purple-500 transition-all">
                {isAr ? "العودة إلى الأقسام" : "Back to Sections"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // ── Quiz Screen ──
  if (screen === "quiz" && selectedPart) {
    const q = selectedPart.questions[current];
    const opts = isAr ? q.options.ar : q.options.en;

    return (
      <section className="min-h-screen pt-28 pb-16 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 dots-bg opacity-20" />
        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="flex justify-between text-sm text-slate-400 mb-2">
                <span>{isAr ? "السؤال" : "Question"} {current + 1} / {selectedPart.questions.length}</span>
                <span className="text-blue-400 font-medium">{isAr ? selectedPart.nameAr : selectedPart.nameEn}</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full progress-bar rounded-full"
                  animate={{ width: `${((current + 1) / selectedPart.questions.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
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
                  {current + 1 >= selectedPart.questions.length ? (isAr ? "إرسال التقييم" : "Submit") : (isAr ? "التالي" : "Next")}
                  <ChevronRight className={`w-5 h-5 ${isAr ? "rotate-180" : ""}`} />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
