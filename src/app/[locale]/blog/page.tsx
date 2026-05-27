"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Search, Clock, ArrowRight } from "lucide-react";
import blogData from "@/data/blog.json";

interface BlogPageProps {
  params: { locale: string };
}

const categoryColors: Record<string, string> = {
  "Power BI": "bg-yellow-500/10 text-yellow-400",
  SQL: "bg-blue-500/10 text-blue-400",
  Python: "bg-green-500/10 text-green-400",
  Excel: "bg-teal-500/10 text-teal-400",
  Statistics: "bg-purple-500/10 text-purple-400",
  Career: "bg-pink-500/10 text-pink-400",
  Tools: "bg-orange-500/10 text-orange-400",
  Design: "bg-cyan-500/10 text-cyan-400",
};

export default function BlogPage({ params: { locale } }: BlogPageProps) {
  const t = useTranslations("blog");
  const isAr = locale === "ar";
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(blogData.map((p) => p.category)))];

  const filtered = blogData.filter((p) => {
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
                      <Image src="/my-pic.jpg" alt={post.author} width={28} height={28} className="rounded-full object-cover w-7 h-7" />
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
