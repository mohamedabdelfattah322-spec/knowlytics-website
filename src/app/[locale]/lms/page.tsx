"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BookOpen, TrendingUp, FileCheck, Award, MessageSquare, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface LMSPageProps {
  params: { locale: string };
}

const features = [
  { icon: BookOpen, key: "courses", color: "from-blue-500 to-cyan-500" },
  { icon: TrendingUp, key: "progress", color: "from-purple-500 to-pink-500" },
  { icon: FileCheck, key: "exams", color: "from-orange-500 to-yellow-500" },
  { icon: Award, key: "certificates", color: "from-teal-500 to-green-500" },
  { icon: MessageSquare, key: "community", color: "from-red-500 to-rose-500" },
];

export default function LMSPage({ params: { locale } }: LMSPageProps) {
  const t = useTranslations("lmsPortal");
  const lt = useTranslations("lms");
  const isAr = locale === "ar";
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.info(isAr ? "سيتم إطلاق منصة LMS قريبًا! سنُبلّغك عند الإطلاق." : "LMS Platform launching soon! We'll notify you.");
    setLoading(false);
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 dots-bg opacity-20" />
        <div className="absolute top-1/4 start-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              🎓 {isAr ? "منصة التعلم" : "LMS Platform"}
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-4">{t("title")}</h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">{t("subtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* Features + Login */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            {/* Features */}
            <motion.div initial={{ opacity: 0, x: isAr ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold text-white mb-6">{lt("subtitle")}</h2>
              <div className="space-y-4 mb-8">
                {features.map((f, i) => (
                  <motion.div key={f.key} initial={{ opacity: 0, x: isAr ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 glass border border-white/10 rounded-2xl hover:border-blue-500/30 transition-all group">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                      <f.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-slate-200 font-medium">{t(`features.${f.key}` as any)}</span>
                  </motion.div>
                ))}
              </div>

              {/* Coming Soon badge */}
              <div className="glass border border-yellow-500/20 rounded-2xl p-5 text-center">
                <span className="text-3xl mb-2 block">🚀</span>
                <p className="text-yellow-400 font-bold mb-1">{isAr ? "قادم قريبًا!" : "Coming Soon!"}</p>
                <p className="text-slate-400 text-sm">{isAr ? "نعمل بجدية على إطلاق المنصة. انضم للقائمة الانتظار للحصول على وصول مبكر." : "We're working hard on the platform launch. Join the waitlist for early access."}</p>
              </div>
            </motion.div>

            {/* Login Form */}
            <motion.div initial={{ opacity: 0, x: isAr ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div id="login" className="glass border border-white/10 rounded-3xl p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{t("login")}</h3>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">{t("email")}</label>
                    <div className="relative">
                      <Mail className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="email" required className="w-full ps-10 pe-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm" placeholder="you@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">{t("password")}</label>
                    <div className="relative">
                      <Lock className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type={showPass ? "text" : "password"} required className="w-full ps-10 pe-10 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm" placeholder="••••••••" />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute end-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      {isAr ? "تذكرني" : "Remember me"}
                    </label>
                    <button type="button" className="text-blue-400 hover:text-blue-300 transition-colors">{t("forgotPassword")}</button>
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg disabled:opacity-60 flex items-center justify-center gap-2">
                    {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
                    {lt("login")}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-slate-400 text-sm">
                    {t("noAccount")}{" "}
                    <button className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">{t("register")}</button>
                  </p>
                </div>

                {/* Social login */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-center text-slate-500 text-xs mb-4">{isAr ? "أو ادخل عبر" : "Or continue with"}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {["Google", "LinkedIn"].map((provider) => (
                      <button key={provider} className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/20 text-slate-300 hover:bg-white/10 transition-all text-sm font-medium">
                        {provider}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
