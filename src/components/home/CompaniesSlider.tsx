"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Company } from "@/types";

interface CompaniesSliderProps {
  companies: Company[];
  locale: string;
}

export default function CompaniesSlider({ companies, locale }: CompaniesSliderProps) {
  const t = useTranslations("companies");
  const isAr = locale === "ar";
  const doubled = [...companies, ...companies];

  return (
    <section className="py-16 bg-slate-900 border-y border-white/10 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">{t("title")}</h2>
          <p className="text-slate-400">{t("subtitle")}</p>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        {/* Gradient masks */}
        <div className="absolute top-0 start-0 w-24 h-full bg-gradient-to-e from-slate-900 to-transparent z-10" />
        <div className="absolute top-0 end-0 w-24 h-full bg-gradient-to-s from-slate-900 to-transparent z-10" />

        <motion.div
          animate={{ x: isAr ? [0, 600] : [0, -600] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-8 whitespace-nowrap"
        >
          {doubled.map((company, i) => (
            <div
              key={`${company.id}-${i}`}
              className="flex-shrink-0 glass border border-white/10 rounded-xl px-5 py-4 hover:border-blue-500/30 transition-all group flex flex-col items-center justify-center gap-2 min-w-[160px] h-28"
            >
              {company.logo && company.logo.startsWith("/") ? (
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-h-10 max-w-[110px] object-contain filter brightness-75 group-hover:brightness-100 transition-all duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{company.name.charAt(0)}</span>
                </div>
              )}
              <span className="text-slate-400 group-hover:text-white text-xs font-semibold text-center whitespace-normal leading-tight max-w-[140px]">
                {company.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
