"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Testimonial } from "@/types";

function LinkedInAvatar({ name, linkedin }: { name: string; linkedin?: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const colors = [
    "from-blue-500 to-blue-700",
    "from-purple-500 to-purple-700",
    "from-teal-500 to-teal-700",
    "from-orange-500 to-orange-700",
    "from-pink-500 to-pink-700",
  ];
  const color = colors[name.charCodeAt(0) % colors.length];

  const avatar = (
    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 text-white font-bold text-sm shadow-lg`}>
      {initials}
    </div>
  );

  if (linkedin) {
    return (
      <a href={linkedin} target="_blank" rel="noopener noreferrer" className="relative group/li flex-shrink-0">
        {avatar}
        {/* LinkedIn badge */}
        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#0A66C2] rounded-full flex items-center justify-center shadow">
          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </span>
      </a>
    );
  }

  return avatar;
}

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
      <div className="flex items-center gap-3 mt-auto">
        <LinkedInAvatar
          name={isAr ? (testimonial.nameAr || t.name || "") : (testimonial.nameEn || t.name || "")}
          linkedin={t.linkedin}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-white font-semibold text-sm truncate">
              {isAr ? (testimonial.nameAr || t.name) : (testimonial.nameEn || t.name)}
            </p>
            {t.linkedin && (
              <a href={t.linkedin} target="_blank" rel="noopener noreferrer"
                className="text-[#0A66C2] hover:text-blue-400 transition-colors flex-shrink-0"
                title="LinkedIn Profile">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            )}
          </div>
          <p className="text-slate-400 text-xs truncate">
            {isAr ? (testimonial.titleAr || t.title) : (testimonial.titleEn || t.title)}
          </p>
          {t.courseName && (
            <p className="text-yellow-500/80 text-xs mt-0.5 truncate">📚 {t.courseName}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
