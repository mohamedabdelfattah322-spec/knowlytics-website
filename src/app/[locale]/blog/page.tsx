"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Search, Clock, ArrowRight, Tag } from "lucide-react";

interface BlogPageProps {
  params: { locale: string };
}

const posts = [
  { id: "1", slug: "power-bi-tips-2025", titleEn: "10 Power BI Tips Every Analyst Should Know in 2025", titleAr: "10 نصائح في Power BI يجب أن يعرفها كل محلل في 2025", excerptEn: "Discover the most powerful and time-saving Power BI techniques that top analysts use to build stunning dashboards in half the time.", excerptAr: "اكتشف أقوى تقنيات Power BI الموفرة للوقت التي يستخدمها كبار المحللين لبناء لوحات معلومات مذهلة في نصف الوقت.", category: "Power BI", readingTime: 8, publishedAt: "2025-01-15", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600", author: "Mohamed Abdelfattah", authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: "2", slug: "sql-window-functions", titleEn: "Mastering SQL Window Functions: A Complete Guide", titleAr: "إتقان دوال النافذة في SQL: دليل شامل", excerptEn: "Window functions are game-changers for data analysis. Learn ROW_NUMBER, RANK, LAG, LEAD, and more with practical examples.", excerptAr: "دوال النافذة تُغيّر قواعد اللعبة في تحليل البيانات. تعلّم ROW_NUMBER وRANK وLAG وLEAD والمزيد مع أمثلة عملية.", category: "SQL", readingTime: 12, publishedAt: "2025-01-08", image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600", author: "Mohamed Abdelfattah", authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: "3", slug: "python-pandas-tricks", titleEn: "15 Pandas Tricks to Speed Up Your Data Analysis", titleAr: "15 خدعة في Pandas لتسريع تحليل البيانات", excerptEn: "Stop writing slow Pandas code. These 15 advanced tricks will make your data transformations 10x faster and cleaner.", excerptAr: "توقف عن كتابة كود Pandas بطيء. ستجعل هذه الخدع الـ 15 المتقدمة تحويلات البيانات أسرع بـ 10 مرات وأنظف.", category: "Python", readingTime: 10, publishedAt: "2024-12-20", image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600", author: "Mohamed Abdelfattah", authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: "4", slug: "data-analyst-career-guide", titleEn: "The Complete Data Analyst Career Guide for 2025", titleAr: "الدليل الشامل للمسار المهني لمحلل البيانات 2025", excerptEn: "Everything you need to know to launch and grow your data analytics career – from skills to salary negotiation.", excerptAr: "كل ما تحتاج معرفته لإطلاق مسيرتك في تحليل البيانات وتنميتها – من المهارات إلى التفاوض على الراتب.", category: "Career", readingTime: 15, publishedAt: "2024-12-10", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600", author: "Mohamed Abdelfattah", authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: "5", slug: "excel-power-query-guide", titleEn: "Power Query: The Ultimate Excel Superpower", titleAr: "Power Query: القوة الخارقة في Excel", excerptEn: "Power Query will revolutionize how you handle data in Excel. Learn how to connect, clean, and transform data like a pro.", excerptAr: "سيُحدث Power Query ثورة في طريقة تعاملك مع البيانات في Excel. تعلّم كيفية الاتصال والتنظيف والتحويل كالمحترفين.", category: "Excel", readingTime: 9, publishedAt: "2024-11-25", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600", author: "Mohamed Abdelfattah", authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: "6", slug: "ai-tools-data-analysts", titleEn: "Top 10 AI Tools Every Data Analyst Must Use in 2025", titleAr: "أفضل 10 أدوات ذكاء اصطناعي يجب على كل محلل بيانات استخدامها في 2025", excerptEn: "AI is transforming data analytics. Here are the tools that will make you 3x more productive as an analyst.", excerptAr: "الذكاء الاصطناعي يُحوّل تحليل البيانات. إليك الأدوات التي ستجعلك أكثر إنتاجية بـ 3 مرات كمحلل.", category: "AI", readingTime: 7, publishedAt: "2024-11-15", image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600", author: "Mohamed Abdelfattah", authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg" },
];

const categories = ["All", "Power BI", "SQL", "Python", "Excel", "AI", "Career"];

const categoryColors: Record<string, string> = {
  "Power BI": "bg-yellow-500/10 text-yellow-400", SQL: "bg-blue-500/10 text-blue-400",
  Python: "bg-green-500/10 text-green-400", Excel: "bg-teal-500/10 text-teal-400",
  AI: "bg-purple-500/10 text-purple-400", Career: "bg-pink-500/10 text-pink-400",
};

export default function BlogPage({ params: { locale } }: BlogPageProps) {
  const t = useTranslations("blog");
  const isAr = locale === "ar";
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = posts.filter((p) => {
    const title = isAr ? p.titleAr : p.titleEn;
    const matchSearch = title.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 dots-bg opacity-20" />
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-violet-500/10 text-violet-400 border border-violet-500/20">
              📝 {isAr ? "المدونة" : "Blog"}
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-4">{t("title")}</h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">{t("subtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-slate-900 border-b border-white/10 sticky top-20 z-30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t("search")}
                className="w-full ps-9 pe-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 text-sm" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${activeCategory === cat ? "bg-blue-600 text-white" : "bg-white/5 border border-white/20 text-slate-400 hover:text-white"}`}>
                  {cat === "All" ? (isAr ? "الكل" : "All") : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-slate-400">{isAr ? "لا توجد مقالات تطابق بحثك" : "No posts match your search"}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filtered.map((post, i) => (
                <motion.article key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="group bg-slate-900 rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/30 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={post.image} alt={isAr ? post.titleAr : post.titleEn} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className={`absolute top-3 start-3 px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColors[post.category] || "bg-blue-500/10 text-blue-400"}`}>
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <Image src={post.authorAvatar} alt={post.author} width={24} height={24} className="rounded-full" />
                      <span className="text-xs text-slate-400">{post.author}</span>
                      <span className="text-slate-600">•</span>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="w-3 h-3" /> {post.readingTime} {t("minRead")}
                      </span>
                    </div>
                    <h2 className="text-base font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                      {isAr ? post.titleAr : post.titleEn}
                    </h2>
                    <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                      {isAr ? post.excerptAr : post.excerptEn}
                    </p>
                    <Link href={`/${locale}/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors group/link">
                      {t("readMore")}
                      <ArrowRight className={`w-4 h-4 transition-transform group-hover/link:translate-x-1 ${isAr ? "rotate-180" : ""}`} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
