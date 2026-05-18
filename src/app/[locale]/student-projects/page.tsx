"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ProjectCard from "@/components/shared/ProjectCard";
import projects from "@/data/projects.json";

interface StudentProjectsPageProps {
  params: { locale: string };
}

const categories = ["All", "Power BI", "SQL", "Python", "Excel"];

export default function StudentProjectsPage({ params: { locale } }: StudentProjectsPageProps) {
  const t = useTranslations("studentProjects");
  const isAr = locale === "ar";
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-slate-950 via-green-950/20 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 dots-bg opacity-20" />
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-green-500/10 text-green-400 border border-green-500/20">
              {isAr ? "\u0635 \u0645\u0639\u0631\u0636 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639" : "Project Showcase"}
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-4">{t("title")}</h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">{t("subtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 bg-slate-900 border-b border-white/10 sticky top-20 z-30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={"px-5 py-2 rounded-xl text-sm font-semibold transition-all " + (activeCategory === cat ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" : "bg-white/5 border border-white/20 text-slate-400 hover:text-white hover:bg-white/10")}
              >
                {cat === "All" ? (isAr ? "\u0627\u0644\u0643\u0644" : "All Projects") : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-slate-400 text-sm mb-6">
            {filtered.length} {isAr ? "\u0645\u0634\u0631\u0648\u0639" : "projects"} {activeCategory !== "All" ? (isAr ? ("\u0641\u064a " + activeCategory) : ("in " + activeCategory)) : ""}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(filtered as any[]).map((p, i) => (
              <ProjectCard key={p.id} project={p} locale={locale} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 text-center">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-4">
              {isAr ? "\u0647\u0644 \u062a\u0631\u064a\u062f \u0623\u0646 \u064a\u064f\u0639\u0631\u0636 \u0645\u0634\u0631\u0648\u0639\u0643 \u0647\u0646\u0627\u061f" : "Want Your Project Featured Here?"}
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              {isAr ? "\u0623\u062a\u0645\u0651 \u0623\u064a \u062f\u0648\u0631\u0629 \u0645\u0646 \u062f\u0648\u0631\u0627\u062a\u0646\u0627 \u0648\u0627\u0628\u0646\u0650 \u0645\u0634\u0631\u0648\u0639\u064b\u0627 \u062d\u0642\u064a\u0642\u064a\u064b\u0627 \u0644\u064a\u062a\u0645 \u0639\u0631\u0636\u0647 \u0641\u064a \u0645\u0639\u0631\u0636\u0646\u0627." : "Complete any of our courses, build a real project, and get featured in our showcase."}
            </p>
            <a href={"/" + locale + "/courses"} className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:from-blue-500 hover:to-purple-500 transition-all shadow-xl">
              {isAr ? "\u0627\u0633\u062a\u0639\u0631\u0636 \u062f\u0648\u0631\u0627\u062a\u0646\u0627" : "Browse Courses"}
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
