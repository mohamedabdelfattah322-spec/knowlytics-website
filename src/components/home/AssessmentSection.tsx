"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FileSpreadsheet, Briefcase, Clock, CheckCircle, Award } from "lucide-react";

interface AssessmentSectionProps {
  locale: string;
}

export default function AssessmentSection({ locale }: AssessmentSectionProps) {
  const t = useTranslations("assessment");
  const isAr = locale === "ar";

  const cards = [
    {
      icon: FileSpreadsheet,
      title: t("excelTitle"),
      desc: t("excelDesc"),
      href: `/${locale}/excel-assessment`,
      cta: t("startExcel"),
      color: "from-teal-600 to-green-600",
      bg: "bg-teal-500/10",
      border: "border-teal-500/20 hover:border-teal-500/50",
      glow: "bg-teal-500",
      questions: 30,
      duration: 45,
    },
    {
      icon: Briefcase,
      title: t("interviewTitle"),
      desc: t("interviewDesc"),
      href: `/${locale}/interview-assessment`,
      cta: t("startInterview"),
      color: "from-blue-600 to-purple-600",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20 hover:border-blue-500/50",
      glow: "bg-blue-500",
      questions: 108,
      duration: 90,
    },
  ];

  return (
    <section className="section-padding bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="dots-bg opacity-20 absolute inset-0" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
            📊 {isAr ? "قيّم نفسك" : "Self Assessment"}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{t("title")}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className={`relative glass border ${card.border} rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 group overflow-hidden`}
            >
              {/* Glow on hover */}
              <div className={`absolute inset-0 ${card.glow}/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl`} />

              {/* Icon */}
              <div className={`w-16 h-16 ${card.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <card.icon className="w-8 h-8 text-white opacity-80" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{card.desc}</p>

              {/* Meta */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center py-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-lg font-bold text-white">{card.questions}</div>
                  <div className="text-xs text-slate-500">{t("questions")}</div>
                </div>
                <div className="text-center py-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-sm font-bold text-white">{card.duration}</span>
                  </div>
                  <div className="text-xs text-slate-500">{t("minutes")}</div>
                </div>
                <div className="text-center py-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-center">
                    <Award className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div className="text-xs text-slate-500">{t("certificate")}</div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {[t("instant"), t("certificate")].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>

              <Link
                href={card.href}
                className={`block w-full text-center py-3.5 rounded-2xl bg-gradient-to-r ${card.color} text-white font-bold hover:opacity-90 transition-all shadow-lg group-hover:shadow-blue-500/20`}
              >
                {card.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
