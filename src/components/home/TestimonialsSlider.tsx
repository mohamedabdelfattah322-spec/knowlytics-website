"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import TestimonialCard from "@/components/shared/TestimonialCard";
import { Testimonial } from "@/types";

interface TestimonialsSliderProps {
  testimonials: Testimonial[];
  locale: string;
}

export default function TestimonialsSlider({ testimonials, locale }: TestimonialsSliderProps) {
  const t = useTranslations("testimonials");
  const isAr = locale === "ar";

  return (
    <section className="section-padding bg-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 start-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 end-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
            ⭐ {isAr ? "آراء العملاء" : "Student Reviews"}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{t("title")}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {testimonials.slice(0, 6).map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} locale={locale} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Link
            href={`/${locale}/testimonials`}
            className="group flex items-center gap-2 px-8 py-3.5 rounded-2xl border-2 border-yellow-500/30 text-yellow-400 font-semibold hover:bg-yellow-500/10 transition-all duration-300"
          >
            {t("viewAll")}
            <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isAr ? "rotate-180" : ""}`} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
