"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Play } from "lucide-react";

interface VideoSectionProps {
  locale: string;
}

export default function VideoSection({ locale }: VideoSectionProps) {
  const t = useTranslations("video");
  const [playing, setPlaying] = useState(false);

  return (
    <section className="section-padding bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dots-bg opacity-20" />

      <div className="relative container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">{t("subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative"
        >
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/10">
            {playing ? (
              <iframe
                src="https://www.youtube.com/embed?listType=user_uploads&list=MohamedAbdelfattahYallaNet3alemM&autoplay=1"
                title="Knowlytics Hub Introduction"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="relative w-full h-full bg-gradient-to-br from-blue-900 via-slate-900 to-purple-900 flex items-center justify-center cursor-pointer group"
                onClick={() => setPlaying(true)}>
                {/* Thumbnail overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-slate-900/80 to-purple-900/90" />

                {/* Play button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10 w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/50 transition-shadow"
                  aria-label="Play video"
                >
                  <Play className="w-8 h-8 text-blue-600 ms-1" />
                </motion.button>

                {/* Pulse rings */}
                <div className="absolute w-28 h-28 rounded-full bg-white/10 animate-ping" />
                <div className="absolute w-36 h-36 rounded-full bg-white/5 animate-ping" style={{ animationDelay: "0.5s" }} />

                {/* Text */}
                <div className="absolute bottom-8 text-center">
                  <p className="text-white font-bold text-xl mb-1">Knowlytics Hub</p>
                  <p className="text-slate-300 text-sm">Introduction Video • 3:45</p>
                </div>
              </div>
            )}
          </div>

          {/* Decorative border glow */}
          <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-transparent rounded-3xl blur-lg -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
