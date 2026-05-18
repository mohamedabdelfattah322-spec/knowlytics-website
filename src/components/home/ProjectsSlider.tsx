"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/shared/ProjectCard";
import { Project } from "@/types";

interface ProjectsSliderProps {
  projects: Project[];
  locale: string;
}

export default function ProjectsSlider({ projects, locale }: ProjectsSliderProps) {
  const t = useTranslations("projects");
  const isAr = locale === "ar";

  return (
    <section className="section-padding bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 dots-bg opacity-20" />

      <div className="relative container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-green-500/10 text-green-400 border border-green-500/20">
            🚀 {isAr ? "مشاريع الطلاب" : "Student Work"}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {projects.slice(0, 6).map((p, i) => (
            <ProjectCard key={p.id} project={p} locale={locale} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Link
            href={`/${locale}/student-projects`}
            className="group flex items-center gap-2 px-8 py-3.5 rounded-2xl border-2 border-green-500/30 text-green-400 font-semibold hover:bg-green-500/10 transition-all duration-300"
          >
            {t("viewAll")}
            <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isAr ? "rotate-180" : ""}`} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
