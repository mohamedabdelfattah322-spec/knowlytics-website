"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Tag, Clock, Zap } from "lucide-react";

interface OffersSliderProps {
  locale: string;
}

const offers = [
  {
    id: "1",
    discount: 37,
    titleEn: "Excel + Power BI + AI + Freelance",
    titleAr: "Excel + Power BI + AI + فريلانس",
    descEn: "The most comprehensive data analysis course — 39 hours live",
    descAr: "أشمل كورس لتحليل البيانات — 39 ساعة لايف",
    bg: "from-blue-600 to-cyan-600",
    validUntil: "2026-06-30",
    slug: "excel-powerbi-ai-freelance",
  },
  {
    id: "2",
    discount: 33,
    titleEn: "SQL Server for Data Analysis",
    titleAr: "تحليل البيانات بـ SQL Server",
    descEn: "Master SQL from scratch — 25 hours of expert training",
    descAr: "أتقن SQL من الصفر — 25 ساعة تدريب متخصص",
    bg: "from-purple-600 to-pink-600",
    validUntil: "2026-06-30",
    slug: "sql-data-analysis",
  },
  {
    id: "3",
    discount: 33,
    titleEn: "Python for Data Analysis",
    titleAr: "تحليل البيانات بـ Python",
    descEn: "Pandas, NumPy, Matplotlib & real-world projects",
    descAr: "Pandas وNumPy وMatplotlib ومشاريع حقيقية",
    bg: "from-orange-600 to-yellow-500",
    validUntil: "2026-06-30",
    slug: "python-data-analysis",
  },
  {
    id: "4",
    discount: 50,
    titleEn: "Full Data Analytics Bundle",
    titleAr: "الباقة الكاملة لتحليل البيانات",
    descEn: "Excel + Power BI + SQL + Python + AI + Tableau + Looker Studio",
    descAr: "Excel + Power BI + SQL + Python + AI + Tableau + Looker Studio",
    bg: "from-teal-600 to-green-500",
    validUntil: "2026-06-30",
    slug: "full-data-analysis-bundle",
  },
];

export default function OffersSlider({ locale }: OffersSliderProps) {
  const t = useTranslations("offers");
  const isAr = locale === "ar";

  return (
    <section className="section-padding bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20">
            <Zap className="w-3.5 h-3.5" />
            {isAr ? "عروض حصرية" : "Exclusive Deals"}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{t("title")}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Gradient header */}
              <div className={`bg-gradient-to-br ${offer.bg} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 end-0 w-32 h-32 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4" />
                    <span className="text-sm font-medium opacity-90">{isAr ? "خصم" : "Discount"}</span>
                  </div>
                  <div className="text-5xl font-black mb-1">{offer.discount}%</div>
                  <div className="text-sm font-bold opacity-90">{t("off")}</div>
                </div>
              </div>

              {/* Content */}
              <div className="bg-slate-900 p-5">
                <h3 className="text-white font-bold text-base mb-2">
                  {isAr ? offer.titleAr : offer.titleEn}
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  {isAr ? offer.descAr : offer.descEn}
                </p>

                {/* Valid until */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                  <Clock className="w-3.5 h-3.5" />
                  {t("validUntil")}: {isAr ? "30 يونيو 2026" : "Jun 30, 2026"}
                </div>

                <Link
                  href={`/${locale}/courses/${offer.slug}`}
                  className={`block w-full text-center py-2.5 rounded-xl bg-gradient-to-r ${offer.bg} text-white text-sm font-semibold hover:opacity-90 transition-opacity`}
                >
                  {t("claimOffer")}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
