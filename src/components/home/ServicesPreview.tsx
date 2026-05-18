"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Building2, User, LayoutDashboard, Bot, GraduationCap, ArrowRight } from "lucide-react";

interface ServicesPreviewProps {
  locale: string;
}

const services = [
  { key: "corporate", Icon: Building2, color: "from-blue-500 to-cyan-500", bg: "bg-blue-500/10" },
  { key: "individual", Icon: User, color: "from-purple-500 to-pink-500", bg: "bg-purple-500/10" },
  { key: "dashboard", Icon: LayoutDashboard, color: "from-orange-500 to-yellow-500", bg: "bg-orange-500/10" },
  { key: "ai", Icon: Bot, color: "from-teal-500 to-green-500", bg: "bg-teal-500/10" },
  { key: "training", Icon: GraduationCap, color: "from-red-500 to-pink-500", bg: "bg-red-500/10" },
];

export default function ServicesPreview({ locale }: ServicesPreviewProps) {
  const t = useTranslations("services");
  const isAr = locale === "ar";

  return (
    <section className="section-padding bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 dots-bg opacity-20" />

      <div className="relative container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
            💼 {isAr ? "ما نقدمه" : "What We Offer"}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{t("title")}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
          {services.map((svc, i) => (
            <motion.div
              key={svc.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative glass border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-2 text-center"
            >
              <div className={`w-14 h-14 ${svc.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <svc.Icon className={`w-7 h-7 bg-gradient-to-r ${svc.color} [&>*]:fill-current`} style={{ color: "transparent", stroke: "url(#grad)" }} />
                <svc.Icon className={`w-7 h-7 text-blue-400`} />
              </div>
              <h3 className="text-white font-bold text-base mb-2">{t(svc.key as any)}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                {t(`${svc.key}Desc` as any)}
              </p>

              {/* Hover glow */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${svc.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Link
            href={`/${locale}/services`}
            className="group flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
          >
            {t("viewAll")}
            <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isAr ? "rotate-180" : ""}`} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
