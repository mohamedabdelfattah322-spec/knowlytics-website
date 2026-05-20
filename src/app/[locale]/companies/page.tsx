"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import companies from "@/data/companies.json";

interface CompaniesPageProps {
  params: { locale: string };
}

export default function CompaniesPage({ params: { locale } }: CompaniesPageProps) {
  const t = useTranslations("companies");
  const isAr = locale === "ar";

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 dots-bg opacity-20" />
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
              🏢 {isAr ? "شركاؤنا" : "Our Partners"}
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-4">{t("title")}</h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">{t("subtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-slate-900 border-y border-white/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-6 text-center max-w-xs mx-auto">
            {[
              { value: "15+", labelEn: "Companies Trained", labelAr: "شركة دُرِّبت" },
            ].map((s, i) => (
              <motion.div
                key={s.labelEn}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl font-black gradient-text mb-1">{s.value}</div>
                <p className="text-slate-400 text-sm">{isAr ? s.labelAr : s.labelEn}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {companies.map((company, i) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center hover:border-blue-500/30 transition-all hover:-translate-y-1 group"
              >
                <div className="w-20 h-16 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  {company.logo ? (
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="max-h-14 max-w-[100px] object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                        (e.currentTarget.nextSibling as HTMLElement).style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div className="hidden w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 items-center justify-center">
                    <span className="text-white font-black text-xl">{company.name.charAt(0)}</span>
                  </div>
                </div>
                <span className="text-slate-300 text-sm font-semibold text-center">{company.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
