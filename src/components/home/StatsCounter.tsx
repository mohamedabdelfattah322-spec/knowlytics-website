"use client";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Users, Building2, LayoutDashboard, Youtube } from "lucide-react";

interface StatsCounterProps {
  locale: string;
}

const stats = [
  { icon: Users, value: 7000, suffix: "+", key: "students", color: "from-blue-500 to-cyan-500", bg: "bg-blue-500/10" },
  { icon: Building2, value: 15, suffix: "+", key: "companies", color: "from-purple-500 to-pink-500", bg: "bg-purple-500/10" },
  { icon: Youtube, value: 105, suffix: "K+", key: "views", color: "from-red-500 to-rose-500", bg: "bg-red-500/10" },
  { icon: LayoutDashboard, value: 300, suffix: "+", key: "dashboards", color: "from-orange-500 to-yellow-500", bg: "bg-orange-500/10" },
];

export default function StatsCounter({ locale }: StatsCounterProps) {
  const t = useTranslations("stats");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="relative py-16 lg:py-24 bg-slate-950 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 start-0 end-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="absolute bottom-0 start-0 end-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">{t("title")}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        {/* Stats Grid */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative glass border border-white/10 rounded-2xl p-6 text-center hover:border-blue-500/30 transition-all duration-300 group overflow-hidden"
            >
              {/* Glow on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${stat.color} opacity-5`} />

              {/* Icon */}
              <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text`} style={{ color: "transparent" }} />
                <stat.icon className="w-6 h-6 text-blue-400 absolute" />
              </div>

              {/* Counter */}
              <div className={`text-4xl lg:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                {inView ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2.5}
                    delay={i * 0.15}
                    separator=","
                    suffix={stat.suffix}
                  />
                ) : (
                  "0" + stat.suffix
                )}
              </div>

              {/* Label */}
              <p className="text-slate-400 text-sm font-medium">{t(stat.key as any)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
