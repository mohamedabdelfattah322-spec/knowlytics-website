"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Building2, User, LayoutDashboard, Bot, GraduationCap, CheckCircle, Send } from "lucide-react";
import { toast } from "sonner";

interface ServicesPageProps {
  params: { locale: string };
}

const services = [
  {
    key: "corporate",
    Icon: Building2,
    color: "from-blue-500 to-cyan-500",
    bg: "from-blue-900/50 to-cyan-900/50",
    id: "corporate",
    features: { en: ["Strategic data roadmap", "KPI framework design", "Data governance setup", "Team capability assessment"], ar: ["خارطة طريق البيانات الاستراتيجية", "تصميم إطار مؤشرات الأداء", "إعداد حوكمة البيانات", "تقييم قدرات الفريق"] }
  },
  {
    key: "individual",
    Icon: User,
    color: "from-purple-500 to-pink-500",
    bg: "from-purple-900/50 to-pink-900/50",
    id: "individual",
    features: { en: ["Step-by-step implementation guidance", "Hands-on help applying what you learned", "Career roadmap & portfolio review", "1-on-1 mentoring sessions"], ar: ["شرح إزاي تطبق اللي اتعلمته خطوة بخطوة", "مساعدة مباشرة في تنفيذ مشاريعك", "مراجعة المسار المهني والبورتفوليو", "جلسات فردية 1-on-1 مخصصة"] }
  },
  {
    key: "dashboard",
    Icon: LayoutDashboard,
    color: "from-orange-500 to-yellow-500",
    bg: "from-orange-900/50 to-yellow-900/50",
    id: "dashboard",
    features: { en: ["Custom Power BI dashboards", "Excel interactive reports", "Python data visualizations", "Automated reporting pipelines"], ar: ["لوحات معلومات Power BI مخصصة", "تقارير Excel تفاعلية", "تصورات بيانات Python", "خطوط تقارير آلية"] }
  },
  {
    key: "ai",
    Icon: Bot,
    color: "from-teal-500 to-green-500",
    bg: "from-teal-900/50 to-green-900/50",
    id: "ai",
    features: { en: ["AI chatbot development", "Predictive analytics models", "Process automation", "LLM integration & fine-tuning"], ar: ["تطوير روبوت محادثة AI", "نماذج التحليلات التنبؤية", "أتمتة العمليات", "تكامل وضبط نماذج اللغة"] }
  },
  {
    key: "training",
    Icon: GraduationCap,
    color: "from-red-500 to-rose-500",
    bg: "from-red-900/50 to-rose-900/50",
    id: "training",
    features: { en: ["Customized curriculum", "On-site or remote delivery", "Team assessments", "Post-training support"], ar: ["منهج مخصص", "تقديم في الموقع أو عن بُعد", "تقييمات الفريق", "دعم ما بعد التدريب"] }
  },
];

export default function ServicesPage({ params: { locale } }: ServicesPageProps) {
  const t = useTranslations("services");
  const isAr = locale === "ar";
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");
  const [timeline, setTimeline] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const waText = encodeURIComponent(
      `🔔 طلب خدمة جديد من الموقع\n\n👤 الاسم: ${name}\n🏢 الشركة: ${company || "—"}\n📧 الإيميل: ${email}\n📱 الهاتف: ${phone || "—"}\n\n🛠️ الخدمة: ${serviceType}\n⏱️ الجدول الزمني: ${timeline || "—"}\n\n📝 التفاصيل:\n${description}`
    );
    const emailBody = encodeURIComponent(
      `طلب خدمة جديد من الموقع\n\nالاسم: ${name}\nالشركة: ${company || "—"}\nالإيميل: ${email}\nالهاتف: ${phone || "—"}\nالخدمة: ${serviceType}\nالجدول الزمني: ${timeline || "—"}\n\nالتفاصيل:\n${description}`
    );

    window.open(`https://wa.me/201226929392?text=${waText}`, "_blank");
    setTimeout(() => {
      window.open(`mailto:hello@knowlyticshub.com?subject=${encodeURIComponent("طلب خدمة جديد — " + serviceType)}&body=${emailBody}`, "_blank");
    }, 400);

    await new Promise((r) => setTimeout(r, 800));
    toast.success(isAr ? "تم إرسال طلبك عبر واتساب والإيميل ✅" : "Request sent via WhatsApp & Email ✅");
    setName(""); setCompany(""); setEmail(""); setPhone(""); setServiceType(""); setDescription(""); setTimeline("");
    setLoading(false);
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 dots-bg opacity-20" />
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
              💼 {isAr ? "خدماتنا" : "Our Services"}
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-4">{t("title")}</h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">{t("subtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((svc, i) => (
              <motion.div
                key={svc.key}
                id={svc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all hover:-translate-y-2 group`}
              >
                {/* Header */}
                <div className={`bg-gradient-to-br ${svc.bg} p-6 relative overflow-hidden`}>
                  <div className="absolute top-0 end-0 w-32 h-32 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${svc.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <svc.Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{t(svc.key as any)}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{t(`${svc.key}Desc` as any)}</p>
                </div>

                {/* Features */}
                <div className="bg-slate-900 p-6">
                  <ul className="space-y-2.5">
                    {(isAr ? svc.features.ar : svc.features.en).map((feat, fi) => (
                      <li key={fi} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <a href="#service-form"
                    className={`mt-6 block w-full text-center py-3 rounded-xl bg-gradient-to-r ${svc.color} text-white font-semibold text-sm hover:opacity-90 transition-opacity`}>
                    {t("requestService")}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Request Form */}
      <section id="service-form" className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{t("form.title")}</h2>
              <p className="text-slate-600 dark:text-slate-400">{t("form.subtitle")}</p>
            </div>

            <form onSubmit={handleSubmit} className="glass border border-white/10 rounded-3xl p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t("form.fullName")} *</label>
                  <input type="text" required value={name} onChange={e => setName(e.target.value)} dir="auto"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/20 bg-white dark:bg-white/5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t("form.companyName")}</label>
                  <input type="text" value={company} onChange={e => setCompany(e.target.value)} dir="auto"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/20 bg-white dark:bg-white/5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t("form.email")} *</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} dir="ltr"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/20 bg-white dark:bg-white/5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t("form.phone")}</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} dir="ltr"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/20 bg-white dark:bg-white/5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t("form.serviceType")} *</label>
                <select required value={serviceType} onChange={e => setServiceType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/20 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors text-sm">
                  <option value="">{t("form.selectService")}</option>
                  {services.map((s) => (
                    <option key={s.key} value={t(s.key as any)}>{t(s.key as any)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t("form.description")} *</label>
                <textarea required rows={4} value={description} onChange={e => setDescription(e.target.value)} dir="auto"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/20 bg-white dark:bg-white/5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors text-sm resize-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t("form.timeline")}</label>
                <select value={timeline} onChange={e => setTimeline(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/20 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors text-sm">
                  <option value="">{t("form.selectTimeline")}</option>
                  <option value="في أقرب وقت">{t("form.timelineOptions.asap")}</option>
                  <option value="خلال شهر">{t("form.timelineOptions.1month")}</option>
                  <option value="خلال 3 أشهر">{t("form.timelineOptions.3months")}</option>
                  <option value="مرن">{t("form.timelineOptions.flexible")}</option>
                </select>
              </div>

              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg disabled:opacity-60 text-sm">
                {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-5 h-5" />}
                {loading ? (isAr ? "جاري الإرسال..." : "Submitting...") : t("form.submit")}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
