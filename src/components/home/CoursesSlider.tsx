"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import CourseCard from "@/components/shared/CourseCard";
import SectionTitle from "@/components/shared/SectionTitle";
import { Course } from "@/types";

interface CoursesSliderProps {
  courses: Course[];
  locale: string;
}

export default function CoursesSlider({ courses, locale }: CoursesSliderProps) {
  const t = useTranslations("courses");
  const isAr = locale === "ar";
  const featured = courses.filter((c) => c.featured).slice(0, 4);

  return (
    <section className="section-padding bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionTitle
          title={t("upcoming")}
          subtitle={t("upcomingSubtitle")}
          badge="📚 Upcoming Courses"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {featured.map((course, i) => (
            <CourseCard key={course.id} course={course} locale={locale} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Link
            href={`/${locale}/courses`}
            className="group flex items-center gap-2 px-8 py-3.5 rounded-2xl border-2 border-blue-500/40 text-blue-400 font-semibold hover:bg-blue-500/10 transition-all duration-300"
          >
            {t("viewAll")}
            <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isAr ? "rotate-180" : ""}`} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
