"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { FAQ } from "@/types";

interface FAQSectionProps {
  faq: FAQ[];
  locale: string;
}

export default function FAQSection({ faq, locale }: FAQSectionProps) {
  const t = useTranslations("faq");
  const [openId, setOpenId] = useState<string | null>("1");
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
            ❓ {isAr ? "الأسئلة الشائعة" : "FAQs"}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{t("title")}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faq.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openId === item.id
                  ? "border-blue-500/40 bg-blue-500/5"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <button
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="w-full flex items-center justify-between p-5 text-start"
              >
                <span className="text-white font-semibold text-sm pe-4">
                  {isAr ? item.questionAr : item.questionEn}
                </span>
                <motion.div
                  animate={{ rotate: openId === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-blue-400" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5">
                      <div className="h-px w-full bg-white/10 mb-4" />
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {isAr ? item.answerAr : item.answerEn}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
