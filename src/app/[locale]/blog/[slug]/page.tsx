"use client";

import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Tag,
  ChevronRight,
  Share2,
  Twitter,
  Linkedin,
  Link2,
  ArrowLeft,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import blogData from "@/data/blog.json";
import { useState } from "react";
import { toast } from "sonner";

// Rich article content by slug
const ARTICLE_CONTENT: Record<
  string,
  { en: string[]; ar: string[] }
> = {
  "power-bi-tips-2025": {
    en: [
      "Power BI has transformed how organizations make data-driven decisions. Whether you're a seasoned analyst or just starting your journey, these 10 tips will dramatically improve your dashboards and workflow in 2025.",
      "## 1. Use Calculation Groups Instead of Repeated Measures\nCalculation groups allow you to apply the same calculation logic across multiple measures without duplicating DAX code. Instead of writing separate Year-to-Date, Quarter-to-Date, and Month-to-Date measures for every KPI, create one calculation group that handles all time intelligence dynamically.",
      "## 2. Leverage Field Parameters for Dynamic Axes\nField parameters (introduced in Power BI 2022) let users switch between dimensions on a chart axis at runtime. This creates truly interactive reports where stakeholders can explore data from any angle without requiring you to build separate pages.",
      "## 3. Master the CALCULATE Function\nCACLULATE is the most powerful function in DAX. It evaluates an expression in a modified filter context. Understanding how filter context propagation works — and how CALCULATE overrides it — is the single biggest leap in Power BI mastery.",
      "## 4. Use Bookmarks for Guided Navigation\nCombine bookmarks with buttons to create app-like navigation experiences. You can show/hide visuals, switch pages, reset slicers, and create drill-through workflows — all without any code.",
      "## 5. Optimize with Query Folding\nQuery folding means your Power Query transformations are pushed down to the source database as a single SQL query rather than loading all data first. Always check the step by right-clicking in Power Query Editor — if 'View Native Query' is grayed out, folding stopped.",
      "## 6. Design for Mobile First\nWith Power BI mobile reports, you can define separate layouts for phones. Use the phone layout view in Desktop to stack your most important visuals vertically. Your CEO checking reports on their phone will thank you.",
      "## 7. Use Composite Models Wisely\nComposite models let you mix DirectQuery sources with Import mode tables. Put high-cardinality, frequently-refreshed tables in DirectQuery and smaller dimension tables in Import mode for best performance.",
      "## 8. Implement Row-Level Security (RLS)\nFor shared reports with sensitive data, RLS filters data based on the logged-in user's identity. Define roles in Power BI Desktop, then assign users or groups in the Power BI Service.",
      "## 9. Annotate with Smart Narrative Visuals\nThe Smart Narrative visual automatically generates natural-language summaries of your data. Customize it with dynamic values using the formula editor to create executive-ready key-insight callouts.",
      "## 10. Monitor Report Performance\nUse the Performance Analyzer pane (View → Performance Analyzer) to identify slow visuals. DAX queries that take more than 200ms often indicate an unoptimized measure or a missing aggregation table.",
      "## Conclusion\nMastering these techniques separates good Power BI developers from great ones. Start with one tip per week, practice on real datasets, and share your dashboards with peers for feedback. The Power BI community is one of the most active in the BI space — leverage it.",
    ],
    ar: [
      "غيّر Power BI الطريقة التي تتخذ بها المنظمات قراراتها المبنية على البيانات. سواء كنت محللاً متمرساً أو بدأت رحلتك للتو، ستحسّن هذه النصائح العشر لوحات معلوماتك وسير عملك بشكل كبير في 2025.",
      "## 1. استخدم Calculation Groups بدلاً من تكرار المقاييس\nتتيح لك مجموعات الحساب تطبيق نفس منطق الحساب عبر مقاييس متعددة دون تكرار كود DAX. بدلاً من كتابة مقاييس منفصلة للفترة من بداية العام والربع والشهر لكل مؤشر أداء، أنشئ مجموعة حساب واحدة تتعامل مع جميع ذكاء الوقت ديناميكياً.",
      "## 2. استفد من Field Parameters للمحاور الديناميكية\nتتيح معامِلات الحقول (المُدخلة في Power BI 2022) للمستخدمين التبديل بين الأبعاد على محور المخطط في وقت التشغيل. يُنشئ هذا تقارير تفاعلية حقيقية يمكن لأصحاب المصلحة فيها استكشاف البيانات من أي زاوية.",
      "## 3. أتقن دالة CALCULATE\nCACLULATE هي أقوى دالة في DAX. إنها تُقيّم تعبيراً في سياق تصفية معدّل. فهم كيفية انتشار سياق التصفية — وكيف تُلغي CALCULATE ذلك — هو أكبر قفزة في إتقان Power BI.",
      "## 4. استخدم Bookmarks للتنقل الموجّه\nادمج الإشارات المرجعية مع الأزرار لإنشاء تجارب تنقل تشبه التطبيقات. يمكنك إظهار/إخفاء المرئيات والتبديل بين الصفحات وإعادة تعيين شرائح البيانات وإنشاء مسارات عمل التفصيل.",
      "## 5. حسّن الأداء مع Query Folding\nطي الاستعلام يعني أن تحويلات Power Query تُدفع إلى قاعدة البيانات المصدر كاستعلام SQL واحد بدلاً من تحميل جميع البيانات أولاً. تحقق دائماً بالنقر بزر الماوس الأيمن في محرر Power Query.",
      "## 6. صمّم مع مراعاة الهاتف المحمول أولاً\nمع تقارير Power BI للهاتف، يمكنك تحديد تخطيطات منفصلة للهواتف. استخدم عرض تخطيط الهاتف في Desktop لترتيب أهم المرئيات عمودياً.",
      "## 7. استخدم Composite Models بحكمة\nتتيح لك النماذج المركبة خلط مصادر DirectQuery مع جداول وضع الاستيراد. ضع الجداول عالية التقلب في DirectQuery وجداول الأبعاد الأصغر في وضع الاستيراد.",
      "## 8. طبّق Row-Level Security\nللتقارير المشتركة التي تحتوي على بيانات حساسة، يقوم RLS بتصفية البيانات بناءً على هوية المستخدم المسجل الدخول. حدد الأدوار في Power BI Desktop ثم عيّن المستخدمين في خدمة Power BI.",
      "## 9. استخدم Smart Narrative لإضافة التعليقات\nيُنشئ المرئي الذكي تلقائياً ملخصات باللغة الطبيعية لبياناتك. خصّصه بقيم ديناميكية باستخدام محرر الصيغة.",
      "## 10. راقب أداء التقارير\nاستخدم لوحة Performance Analyzer (عرض → محلل الأداء) لتحديد المرئيات البطيئة. استعلامات DAX التي تستغرق أكثر من 200 مللي ثانية غالباً ما تشير إلى مقياس غير محسّن.",
      "## خاتمة\nإتقان هذه التقنيات يُميّز مطوّري Power BI الجيدين عن الرائعين. ابدأ بنصيحة واحدة في الأسبوع، ومارس على مجموعات بيانات حقيقية، وشارك لوحات المعلومات الخاصة بك مع الزملاء للحصول على ملاحظات.",
    ],
  },
};

function getDefaultContent(titleEn: string, titleAr: string, isAr: boolean) {
  if (isAr) {
    return [
      `يُعدّ هذا الموضوع أحد أهم المجالات في تحليل البيانات الحديث. في هذا المقال سنستعرض المفاهيم الأساسية والتقنيات المتقدمة التي يحتاجها كل محلل بيانات محترف.`,
      `## لماذا يهمّ هذا الموضوع\nفي عالم يتزايد فيه اعتماد المنظمات على البيانات، يُصبح إتقان هذه المهارات ميزةً تنافسية حقيقية. المحللون الذين يتقنون ${titleAr} يحظون بفرص وظيفية أكثر وأجور أعلى.`,
      `## المفاهيم الأساسية\nقبل الخوض في التفاصيل، من الضروري فهم المبادئ الجوهرية. هذه الأسس ستُمكّنك من بناء معرفة متينة وتطبيق المهارات على مجموعة واسعة من السيناريوهات الواقعية.`,
      `## التطبيق العملي\nالفهم النظري ضروري، لكن القيمة الحقيقية تأتي من التطبيق. خصّص وقتاً كل يوم للتدريب العملي على مجموعات بيانات حقيقية. كلما مارست أكثر، كلما رسّخت المهارة بشكل أسرع.`,
      `## الخطوات التالية\nالآن بعد أن استوعبت هذه المفاهيم، حان وقت التطبيق. انضم إلى مجتمع Knowlytics Hub وشارك مشاريعك واحصل على ملاحظات من محترفين متمرسين.`,
    ];
  }
  return [
    `This topic is one of the most important areas in modern data analytics. In this article, we'll explore the core concepts and advanced techniques every professional analyst needs to know.`,
    `## Why This Matters\nIn a world where organizations increasingly rely on data, mastering these skills is a genuine competitive advantage. Analysts who excel at ${titleEn} command better opportunities and higher salaries.`,
    `## Core Concepts\nBefore diving into the details, it's essential to understand the foundational principles. These fundamentals will enable you to build solid knowledge and apply skills across a wide range of real-world scenarios.`,
    `## Practical Application\nTheoretical understanding is necessary, but real value comes from application. Set aside daily practice time on real datasets. The more you practice, the faster the skill becomes second nature.`,
    `## Next Steps\nNow that you've absorbed these concepts, it's time to apply them. Join the Knowlytics Hub community, share your projects, and get feedback from experienced professionals.`,
  ];
}

function renderContent(paragraphs: string[]) {
  return paragraphs.map((para, i) => {
    if (para.startsWith("## ")) {
      const heading = para.replace("## ", "");
      const [h, ...rest] = heading.split("\n");
      return (
        <div key={i}>
          <h2 className="text-xl font-bold text-white mt-8 mb-3">{h}</h2>
          {rest.length > 0 && <p className="text-slate-300 leading-relaxed mb-4">{rest.join(" ")}</p>}
        </div>
      );
    }
    return (
      <p key={i} className="text-slate-300 leading-relaxed mb-4">
        {para}
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
          <Link
            href={`/${locale}/blog`}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
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
    ? isAr
      ? ARTICLE_CONTENT[contentKey].ar
      : ARTICLE_CONTENT[contentKey].en
    : getDefaultContent(post.titleEn, post.titleAr, isAr);

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
          <Image
            src={post.image}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-900/30" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 -mt-40 md:-mt-52">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">
              {isAr ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            <Link href={`/${locale}/blog`} className="hover:text-white transition-colors">
              {isAr ? "المدونة" : "Blog"}
            </Link>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            <span className="text-slate-300 truncate max-w-xs">{title}</span>
          </nav>

          <div className="glass rounded-3xl border border-slate-700/50 p-8 md:p-12">
            {/* Category & meta */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString(isAr ? "ar-EG" : "en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                <Clock className="w-4 h-4" />
                {post.readingTime} {isAr ? "دقائق قراءة" : "min read"}
              </div>
            </div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
            >
              {title}
            </motion.h1>

            {/* Excerpt */}
            <p className="text-lg text-slate-400 mb-6 leading-relaxed">{excerpt}</p>

            {/* Author + Share */}
            <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  MA
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{post.author}</p>
                  <p className="text-slate-400 text-xs">{isAr ? "مؤسس Knowlytics Hub" : "Founder, Knowlytics Hub"}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm me-1">{isAr ? "شارك:" : "Share:"}</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-[#1DA1F2] hover:bg-slate-700 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-[#0A66C2] hover:bg-slate-700 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <button
                  onClick={handleCopyLink}
                  className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                  aria-label="Copy link"
                >
                  {copied ? (
                    <span className="text-green-400 text-xs px-1">{isAr ? "✓ تم" : "✓"}</span>
                  ) : (
                    <Link2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-3 prose prose-invert max-w-none">
            <div className="glass rounded-2xl border border-slate-700/50 p-8">
              {renderContent(contentParagraphs)}

              {/* Tags */}
              <div className="mt-10 pt-6 border-t border-slate-700/50">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="w-4 h-4 text-slate-400" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-sm border border-slate-700 hover:border-blue-500/50 hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Reading Progress hint */}
            <div className="glass rounded-2xl border border-slate-700/50 p-5">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-white">{isAr ? "عن المقال" : "About"}</span>
              </div>
              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>{isAr ? "وقت القراءة" : "Reading time"}</span>
                  <span className="text-white">{post.readingTime} {isAr ? "دقيقة" : "min"}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isAr ? "التصنيف" : "Category"}</span>
                  <span className="text-blue-400">{post.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isAr ? "الكاتب" : "Author"}</span>
                  <span className="text-white">Mohamed A.</span>
                </div>
              </div>
            </div>

            {/* CTA: Take a Course */}
            <div className="glass rounded-2xl border border-blue-500/30 p-5 bg-blue-950/20">
              <p className="text-sm font-semibold text-white mb-2">
                {isAr ? "هل تريد تعلم المزيد؟" : "Want to learn more?"}
              </p>
              <p className="text-xs text-slate-400 mb-4">
                {isAr
                  ? "استعرض دوراتنا الاحترافية في تحليل البيانات"
                  : "Browse our professional data analytics courses"}
              </p>
              <Link
                href={`/${locale}/courses`}
                className="block text-center bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isAr ? "عرض الدورات" : "View Courses"}
              </Link>
            </div>
          </aside>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8">
              {isAr ? "مقالات ذات صلة" : "Related Articles"}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((rp) => (
                <motion.div
                  key={rp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass rounded-2xl overflow-hidden border border-slate-700/50 card-hover group"
                >
                  <div className="relative h-48">
                    <Image
                      src={rp.image}
                      alt={isAr ? rp.titleAr : rp.titleEn}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    <div className="absolute top-3 start-3">
                      <span className="bg-blue-600/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                        {rp.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {rp.readingTime} {isAr ? "دقائق" : "min"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(rp.publishedAt).toLocaleDateString(isAr ? "ar-EG" : "en-US", { month: "short", year: "numeric" })}
                      </span>
                    </div>
                    <h3 className="font-semibold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                      {isAr ? rp.titleAr : rp.titleEn}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                      {isAr ? rp.excerptAr : rp.excerptEn}
                    </p>
                    <Link
                      href={`/${locale}/blog/${rp.slug}`}
                      className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors flex items-center gap-1"
                    >
                      {isAr ? "اقرأ المزيد" : "Read more"}
                      <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Back to Blog */}
        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <BackIcon className="w-4 h-4" />
            {isAr ? "العودة إلى المدونة" : "Back to Blog"}
          </Link>
        </div>
      </section>
    </main>
  );
}
