"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, BarChart, Star } from "lucide-react";
import { Course } from "@/types";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface CourseCardProps {
  course: Course;
  locale: string;
  index?: number;
}

const levelColors = {
  Beginner: "text-green-400 bg-green-400/10 border-green-400/20",
  Intermediate: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Advanced: "text-red-400 bg-red-400/10 border-red-400/20",
};

export default function CourseCard({ course, locale, index = 0 }: CourseCardProps) {
  const t = useTranslations("courses");
  const isAr = locale === "ar";

  const title = isAr ? course.titleAr : course.titleEn;
  const description = isAr ? course.descriptionAr : course.descriptionEn;
  const levelKey = course.level.toLowerCase() as "beginner" | "intermediate" | "advanced";
  const discountPct =
    course.originalPrice && course.originalPrice > course.price
      ? Math.round((1 - course.price / course.originalPrice) * 100)
      : null;

  const detailUrl = `/${locale}/courses/${course.slug}`;
  const enrollUrl = `https://wa.me/201226929392?text=${encodeURIComponent(
    isAr ? `أريد التسجيل في: ${course.titleAr}` : `I want to enroll in: ${course.titleEn}`
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 card-hover"
    >
      {/* Image — clickable */}
      <Link href={detailUrl} className="block relative h-48 overflow-hidden">
        <Image
          src={course.image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 start-3 flex flex-wrap gap-2">
          {(course as any).type === "live" && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-600 text-white shadow-lg animate-pulse">
              {"🔴"} {isAr ? "لايف" : "LIVE"}
            </span>
          )}
          {(course as any).comingSoon && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-600 text-white shadow-lg">
              {"🎬"} {isAr ? "قريباً" : "Coming Soon"}
            </span>
          )}
          {course.featured && !(course as any).comingSoon && !(course as any).type && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg">
              {"⭐"} {t("featured")}
            </span>
          )}
          {discountPct && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-600 text-white shadow-lg">
              {discountPct}% {t("off")}
            </span>
          )}
        </div>

        {/* Level badge */}
        <div className="absolute bottom-3 end-3">
          <span
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm",
              levelColors[course.level]
            )}
          >
            {t(levelKey)}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
          {course.category}
        </span>

        {/* Title — clickable */}
        <Link href={detailUrl}>
          <h3 className="mt-1.5 text-base font-bold text-slate-900 dark:text-white leading-tight mb-2 line-clamp-2 hover:text-blue-400 transition-colors">
            {title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
          {description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500 mb-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {course.duration.replace("hours", t("hours"))}
          </span>
          <span className="flex items-center gap-1">
            <BarChart className="w-3.5 h-3.5" />
            {t(levelKey)}
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            4.9
          </span>
        </div>

        {/* Price & CTA */}
        <div className="pt-4 border-t border-slate-100 dark:border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div>
              {course.price > 0 ? (
                <>
                  <span className="text-xl font-bold gradient-text">
                    {course.price.toLocaleString()} {isAr ? "ج.م" : "EGP"}
                  </span>
                  {(course.originalPrice ?? 0) > course.price && (
                    <span className="ms-2 text-sm text-slate-400 line-through">
                      {(course.originalPrice ?? 0).toLocaleString()} {isAr ? "ج.م" : "EGP"}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-sm text-slate-400">
                  {isAr ? "تواصل للسعر" : "Contact for price"}
                </span>
              )}
            </div>
            {(course as any).gift && (
              <span className="text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded-full">
                {"🎁"} {isAr ? "هدية" : "Gift"}
              </span>
            )}
          </div>

          {/* Payment options */}
          <div className="flex items-center gap-1.5 mb-3 flex-wrap">
            <span className="text-xs text-slate-500">{isAr ? "الدفع:" : "Pay via:"}</span>
            <a
              href={enrollUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-green-600/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full hover:bg-green-600/30 transition-colors"
            >
              WhatsApp
            </a>
            <span className="text-xs bg-blue-600/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full">
              InstaPay
            </span>
            <span className="text-xs bg-red-600/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full">
              Vodafone Cash
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mb-2">
            <Link
              href={detailUrl}
              className="flex-1 text-center px-4 py-2.5 rounded-xl border border-blue-500/50 text-blue-400 text-sm font-semibold hover:bg-blue-500/10 transition-all duration-300"
            >
              {isAr ? "تفاصيل الكورس" : "Course Details"}
            </Link>
            <a
              href={enrollUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow hover:shadow-blue-500/30"
            >
              {isAr ? "سجّل الآن" : "Enroll Now"}
            </a>
          </div>
          {/* Reviews link */}
          <Link
            href={`/${locale}/testimonials`}
            className="flex items-center justify-center gap-1 text-xs text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-yellow-400" />)}
            <span className="ms-1">{isAr ? "آراء المتدربين" : "Student Reviews"}</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
