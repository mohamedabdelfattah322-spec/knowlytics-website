"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, Wrench, Linkedin, User } from "lucide-react";
import { Project } from "@/types";
import { useTranslations } from "next-intl";

interface ProjectCardProps {
  project: Project;
  locale: string;
  index?: number;
}

const categoryColors: Record<string, string> = {
  "Power BI": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  SQL: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Python: "bg-green-500/10 text-green-400 border-green-500/20",
  Excel: "bg-teal-500/10 text-teal-400 border-teal-500/20",
};

export default function ProjectCard({ project, locale, index = 0 }: ProjectCardProps) {
  const t = useTranslations("projects");
  const isAr = locale === "ar";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 card-hover"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={isAr ? project.titleAr : project.titleEn}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      <div className="p-5">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
          {isAr ? project.titleAr : project.titleEn}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
          {isAr ? project.descriptionAr : project.descriptionEn}
        </p>

        {/* Student */}
        {(project.student || (project as any).linkedinUrl) && (
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <User className="w-3 h-3 text-blue-400" />
            </div>
            {(project as any).linkedinUrl ? (
              <a
                href={(project as any).linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                <Linkedin className="w-3 h-3" />
                {project.student || (isAr ? "رابط المتدرب" : "Trainee Profile")}
              </a>
            ) : (
              <span className="text-xs text-slate-400">
                {t("student")}: <span className="text-blue-400 font-medium">{project.student}</span>
              </span>
            )}
          </div>
        )}


        {/* Links */}
        {(project.demoUrl || project.githubUrl || (project as any).linkedinUrl) && (
          <div className="flex gap-2 pt-4 border-t border-slate-100 dark:border-white/10">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {t("viewDemo")}
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-white/20 text-slate-300 hover:bg-white/10 text-xs font-semibold transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                {t("viewCode")}
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
