"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";

interface ContactSectionProps {
  locale: string;
}

export default function ContactSection({ locale }: ContactSectionProps) {
  const t = useTranslations("contact");
  const isAr = locale === "ar";

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: name, email, phone, message }),
      });

      if (res.ok) {
        toast.success(t("form.success"));
        setName(""); setEmail(""); setPhone(""); setMessage("");
      } else {
        toast.error(isAr ? "حدث خطأ. حاول مرة أخرى." : "Something went wrong. Please try again.");
      }
    } catch {
      toast.error(isAr ? "حدث خطأ. حاول مرة أخرى." : "Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      isAr
        ? `مرحباً، اسمي ${name || "..."} وأريد الاستفسار عن خدماتكم.`
        : `Hello, my name is ${name || "..."} and I'd like to inquire about your services.`
    );
    window.open(`https://wa.me/201226929392?text=${text}`, "_blank");
  };

  return (
    <section className="section-padding bg-white dark:bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 start-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-0 end-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
            📬 {isAr ? "تواصل معنا" : "Contact Us"}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Email */}
            <a
              href={`mailto:${t("info.email")}`}
              className="flex items-center gap-4 p-4 rounded-2xl glass border border-white/10 hover:border-blue-500/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-0.5">{isAr ? "البريد الإلكتروني" : "Email"}</p>
                <p className="text-slate-900 dark:text-white font-medium text-sm">{t("info.email")}</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/201226929392"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl glass border border-white/10 hover:border-green-500/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-0.5">WhatsApp</p>
                <p className="text-slate-900 dark:text-white font-medium text-sm">{t("info.whatsapp")}</p>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-4 p-4 rounded-2xl glass border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-0.5">{isAr ? "الموقع" : "Location"}</p>
                <p className="text-slate-900 dark:text-white font-medium text-sm">{t("info.location")}</p>
              </div>
            </div>

            {/* Quick WhatsApp CTA */}
            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-bold transition-all shadow-lg hover:shadow-green-500/30"
            >
              <MessageCircle className="w-5 h-5" />
              {isAr ? "تواصل عبر واتساب مباشرة" : "Chat on WhatsApp"}
            </button>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={t("form.name")}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/20 bg-white dark:bg-white/5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                />
                <input
                  type="email"
                  placeholder={t("form.email")}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/20 bg-white dark:bg-white/5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                />
              </div>
              <input
                type="tel"
                placeholder={t("form.phone")}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/20 bg-white dark:bg-white/5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              />
              <textarea
                placeholder={t("form.message")}
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/20 bg-white dark:bg-white/5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors text-sm resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-blue-500/30 disabled:opacity-60"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                {loading ? (isAr ? "جاري الإرسال..." : "Sending...") : t("form.submit")}
              </button>

              <div className="flex items-center gap-3 my-2">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-slate-400 text-xs">{isAr ? "أو" : "or"}</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-green-500/40 text-green-400 font-bold hover:bg-green-500/10 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                {isAr ? "أو راسلنا على واتساب" : "Or message us on WhatsApp"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
