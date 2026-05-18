"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Bot, Sparkles, Zap, Brain } from "lucide-react";

interface AIAssistantSectionProps {
  locale: string;
}

const bubbles = [
  { en: "What's the best way to learn Power BI?", ar: "ما أفضل طريقة لتعلم Power BI؟", delay: 0 },
  { en: "How do I write a VLOOKUP formula?", ar: "كيف أكتب دالة VLOOKUP؟", delay: 1.5 },
  { en: "What's the difference between SQL and NoSQL?", ar: "ما الفرق بين SQL وNoSQL؟", delay: 3 },
];

export default function AIAssistantSection({ locale }: AIAssistantSectionProps) {
  const t = useTranslations("ai");
  const isAr = locale === "ar";

  return (
    <section className="section-padding bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 start-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 end-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Chat UI mockup */}
            <div className="relative max-w-md mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/10 dark:bg-slate-950 bg-slate-100">
              {/* Chat header */}
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Knowlytics AI</p>
                  <p className="text-blue-200 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    Online
                  </p>
                </div>
                <Sparkles className="w-5 h-5 text-yellow-300 ms-auto animate-pulse" />
              </div>

              {/* Chat messages */}
              <div className="p-4 space-y-4 min-h-[300px]">
                {bubbles.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.2 }}
                    className="space-y-2"
                  >
                    {/* User message */}
                    <div className="flex justify-end">
                      <div className="max-w-[80%] bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-2xl rounded-ee-none px-3.5 py-2.5">
                        {isAr ? b.ar : b.en}
                      </div>
                    </div>
                    {/* Bot response */}
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0 flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="max-w-[80%] bg-white/10 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded-2xl rounded-es-none px-3.5 py-2.5">
                        {isAr
                          ? "سؤال ممتاز! دعني أوضح ذلك بطريقة مبسطة..."
                          : "Great question! Let me break that down for you..."}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-white/10 dark:bg-slate-800 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <span key={i} className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <div className="flex-1 bg-white/5 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-slate-400">
                    {t("placeholder")}
                  </div>
                  <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-4 -end-4 glass border border-white/10 rounded-2xl p-3 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                <span className="text-white text-xs font-bold">{isAr ? "ذكاء اصطناعي" : "AI Powered"}</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -bottom-4 -start-4 glass border border-white/10 rounded-2xl p-3 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-white text-xs font-bold">24/7 {isAr ? "متاح" : "Available"}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
              🤖 {isAr ? "مساعد ذكي" : "AI Assistant"}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {t("title")}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">{t("subtitle")}</p>

            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: "🎯", en: "Instant answers to any data analytics question", ar: "إجابات فورية على أي سؤال في تحليل البيانات" },
                { icon: "📚", en: "Course recommendations based on your skill level", ar: "توصيات الدورات بناءً على مستواك" },
                { icon: "💡", en: "Code help, formula explanations, and concept clarifications", ar: "مساعدة في الكود وشرح الصيغ وتوضيح المفاهيم" },
                { icon: "🔄", en: "Available 24/7 in both Arabic and English", ar: "متاح على مدار الساعة بالعربية والإنجليزية" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/5 dark:bg-slate-800/50 border border-white/10 hover:border-purple-500/20 transition-all"
                >
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                    {isAr ? item.ar : item.en}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-6 text-sm text-slate-500 dark:text-slate-500"
            >
              💬 {isAr ? "انقر على زر المحادثة في الزاوية لبدء الدردشة!" : "Click the chat button in the corner to start chatting!"}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
