"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Youtube, Linkedin, Facebook, Instagram, Globe, Award, Users, BookOpen, Trophy } from "lucide-react";

interface FounderSectionProps {
  locale: string;
}

const achievements = [
  { icon: Users, key: "students", color: "text-blue-400" },
  { icon: BookOpen, key: "courses", color: "text-purple-400" },
  { icon: Award, key: "experience", color: "text-yellow-400" },
  { icon: Trophy, key: "awards", color: "text-orange-400" },
];

export default function FounderSection({ locale }: FounderSectionProps) {
  const t = useTranslations("founder");
  const isAr = locale === "ar";

  return (
    <section className="section-padding relative overflow-hidden bg-slate-900">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 end-0 w-1/2 h-full bg-gradient-to-l from-blue-900/30 to-transparent" />
        <div className="absolute bottom-0 start-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="dots-bg absolute inset-0 opacity-20" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo side */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative max-w-md mx-auto">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl animate-pulse-slow" />
              <div className="absolute -top-4 -start-4 w-24 h-24 rounded-full border-2 border-blue-500/30 animate-spin-slow" />
              <div className="absolute -bottom-4 -end-4 w-16 h-16 rounded-full border-2 border-purple-500/30 animate-spin-slow" style={{ animationDirection: "reverse" }} />

              {/* Main image */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/profile.JPG"
                  alt="Mohamed Abdelfattah"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Overlay badges */}
                <div className="absolute top-4 start-4 glass border border-white/10 rounded-xl p-3 shadow-lg">
                  <p className="text-yellow-400 text-xl font-black">🏆</p>
                  <p className="text-white text-xs font-semibold mt-1">{t("awards")}</p>
                </div>
                <div className="absolute bottom-4 end-4 glass border border-white/10 rounded-xl p-3 shadow-lg">
                  <p className="text-green-400 font-bold">5,000+</p>
                  <p className="text-white text-xs">{isAr ? "طالب" : "Students"}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {t("title")}
            </span>

            <h2 className="text-4xl lg:text-5xl font-black text-white mb-2">
              {t("name")}
            </h2>
            <p className="text-xl gradient-text font-semibold mb-6">{t("role")}</p>

            <p className="text-slate-300 text-lg leading-relaxed mb-8">{t("bio")}</p>

            {/* Achievement cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {achievements.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass border border-white/10 rounded-xl p-4 hover:border-blue-500/30 transition-all"
                >
                  <item.icon className={`w-5 h-5 ${item.color} mb-2`} />
                  <p className="text-white font-bold text-sm">{t(item.key as any)}</p>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <a href="https://www.youtube.com/c/MohamedAbdelfattahYallaNet3alemM" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400 hover:bg-red-600/30 transition-all text-xs font-medium">
                <Youtube className="w-4 h-4" />
                YouTube
              </a>
              <a href="https://www.facebook.com/MohamedabdelfattahYallanet3alem1" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-all text-xs font-medium">
                <Facebook className="w-4 h-4" />
                Facebook
              </a>
              <a href="https://www.instagram.com/m._abdelfattah_knowlytics_hub?igsh=MWw2d3Y0ZHdoZzB0MQ==" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-pink-600/20 border border-pink-500/30 text-pink-400 hover:bg-pink-600/30 transition-all text-xs font-medium">
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
              <a href="https://www.linkedin.com/in/mohamed-abdelfattah-el-sayed/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-700/20 border border-blue-600/30 text-blue-300 hover:bg-blue-700/30 transition-all text-xs font-medium">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
            <Link href={`/${locale}/instructor`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-500 hover:to-purple-500 transition-all text-sm">
              {t("cta")}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
