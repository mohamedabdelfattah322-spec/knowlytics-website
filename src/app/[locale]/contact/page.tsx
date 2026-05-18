"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Send, Youtube, Linkedin, Instagram, Facebook, Globe } from "lucide-react";
import { toast } from "sonner";

interface ContactPageProps {
  params: { locale: string };
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  );
}

const socialLinks = [
  { icon: Youtube, href: "https://www.youtube.com/c/MohamedAbdelfattahYallaNet3alemM", label: "YouTube", color: "hover:text-red-400 hover:border-red-400/30" },
  { icon: Facebook, href: "https://www.facebook.com/MohamedabdelfattahYallanet3alem1", label: "Facebook", color: "hover:text-blue-400 hover:border-blue-400/30" },
  { icon: Instagram, href: "https://www.instagram.com/m._abdelfattah_knowlytics_hub?igsh=MWw2d3Y0ZHdoZzB0MQ==", label: "Instagram", color: "hover:text-pink-400 hover:border-pink-400/30" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/mohamed-abdelfattah-el-sayed/", label: "LinkedIn", color: "hover:text-blue-500 hover:border-blue-500/30" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@mohamedabdelfattah23?is_from_webapp=1&sender_device=pc", label: "TikTok", color: "hover:text-white hover:border-white/30" },
];

export default function ContactPage({ params: { locale } }: ContactPageProps) {
  const t = useTranslations("contact");
  const isAr = locale === "ar";
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success(t("form.success"));
    (e.target as HTMLFormElement).reset();
    setLoading(false);
  };

  return (
    <>
      <section className="pt-28 pb-16 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 dots-bg opacity-20" />
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
              &#128236; {isAr ? "تواصل معنا" : "Get In Touch"}
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-4">{t("title")}</h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">{t("subtitle")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, x: isAr ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              {[
                { icon: Mail, label: t("info.email"), href: `mailto:${t("info.email")}`, color: "from-blue-500 to-cyan-500", bg: "bg-blue-500/10" },
                { icon: Phone, label: t("info.whatsapp"), href: "https://wa.me/201226929392", color: "from-green-500 to-teal-500", bg: "bg-green-500/10" },
                { icon: MapPin, label: t("info.location"), href: "#map", color: "from-red-500 to-rose-500", bg: "bg-red-500/10" },
              ].map((item, i) => (
                <motion.a key={i} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-5 glass border border-white/10 rounded-2xl hover:border-blue-500/30 transition-all group">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{item.label}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{isAr ? "انقر للتواصل" : "Click to connect"}</p>
                  </div>
                </motion.a>
              ))}

              <div>
                <h3 className="text-white font-semibold mb-4 text-sm">{t("social")}</h3>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                      className={`w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center text-slate-400 transition-all duration-200 ${s.color}`}>
                      <s.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

              <div id="map" className="rounded-2xl overflow-hidden border border-white/10 h-44 bg-slate-900 flex items-center justify-center relative">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-red-400 mx-auto mb-2" />
                  <p className="text-white font-semibold text-sm">{isAr ? "القاهرة، مصر" : "Cairo, Egypt"}</p>
                  <p className="text-slate-400 text-xs mt-1">{isAr ? "نعمل عن بُعد في العالم العربي" : "Remote across the Arab World"}</p>
                </div>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: isAr ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="glass border border-white/10 rounded-3xl p-8 space-y-5">
                <h2 className="text-xl font-bold text-white mb-2">{isAr ? "أرسل لنا رسالة" : "Send Us a Message"}</h2>
                <p className="text-slate-400 text-sm mb-6">{isAr ? "سنرد على رسالتك خلال 24 ساعة." : "We'll respond to your message within 24 hours."}</p>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">{t("form.name")} *</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">{t("form.email")} *</label>
                    <input type="email" required className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">{t("form.phone")}</label>
                  <input type="tel" dir="ltr" className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">{isAr ? "الموضوع" : "Subject"}</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-white/20 bg-slate-900 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm">
                    <option>{isAr ? "استفسار عن دورة" : "Course Inquiry"}</option>
                    <option>{isAr ? "طلب خدمة" : "Service Request"}</option>
                    <option>{isAr ? "شراكة مؤسسية" : "Corporate Partnership"}</option>
                    <option>{isAr ? "دعم تقني" : "Technical Support"}</option>
                    <option>{isAr ? "أخرى" : "Other"}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">{t("form.message")} *</label>
                  <textarea required rows={6} className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm resize-none" />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-blue-500/30 disabled:opacity-60">
                  {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-5 h-5" />}
                  {loading ? (isAr ? "جاري الإرسال..." : "Sending...") : t("form.submit")}
                </button>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-slate-500 text-xs text-center mb-3">{isAr ? "أو تواصل معنا مباشرة" : "Or reach us directly"}</p>
                  <div className="flex gap-3">
                    <a href="https://wa.me/201226929392" target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-600/20 border border-green-500/30 text-green-400 hover:bg-green-600/30 transition-all text-sm font-medium">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.864 9.864 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" /></svg>
                      WhatsApp
                    </a>
                    <a href="mailto:hello@knowlyticshub.com"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-all text-sm font-medium">
                      <Mail className="w-4 h-4" />
                      {isAr ? "البريد الإلكتروني" : "Email Us"}
                    </a>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
