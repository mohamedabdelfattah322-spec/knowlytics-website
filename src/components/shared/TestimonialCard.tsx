"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  locale: string;
  index?: number;
}

export default function TestimonialCard({ testimonial, locale, index = 0 }: TestimonialCardProps) {
  const isAr = locale === "ar";
  const t = testimonial as any;

  // If has screenshot image — show it directly
  if (t.screenshot) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/30 transition-all duration-300 group shadow-lg hover:shadow-blue-500/10"
      >
        <div className="h-64 overflow-hidden bg-white">
          <img
            src={t.screenshot}
            alt={isAr ? "رأي متدرب" : "Student review"}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </motion.div>
    );
  }

  // Fallback: text card
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative p-6 rounded-2xl glass bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300 group"
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-600"}`}
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-slate-300 text-sm leading-relaxed mb-6 line-clamp-4">
        &ldquo;{isAr ? testimonial.contentAr : testimonial.contentEn}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        {testimonial.avatar && (
          <img
            src={testimonial.avatar}
            alt={isAr ? testimonial.nameAr : testimonial.nameEn}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
        )}
        <div>
          <p className="text-white font font-semibold text-sm">{isAr ? testimonial.nameAr : testimonial.nameEn}</p>
          <p className="text-slate-400 text-xs">{isAr ? testimonial.titleAr : testimonial.titleEn}</p>
          {testimonial.company && <p className="text-blue-400 text-xs font-medium">{testimonial.company}</p>}
        </div>
      </div>
    </motion.div>
  );
}
