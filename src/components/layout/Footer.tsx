"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Youtube, Linkedin, Instagram, Facebook,
  Mail, Phone, MapPin, ArrowRight, Globe
} from "lucide-react";

// TikTok SVG icon (not in lucide-react)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  );
}
import { useState } from "react";
import { toast } from "sonner";

interface FooterProps {
  locale: string;
}

const footerLinks = {
  quickLinks: [
    { key: "home", href: "/" },
    { key: "courses", href: "/courses" },
    { key: "services", href: "/services" },
    { key: "about", href: "/about" },
    { key: "blog", href: "/blog" },
    { key: "contact", href: "/contact" },
  ],
  courses: [
    { labelEn: "Excel — Zero to Hero", labelAr: "Excel من الصفر للاحتراف", href: "/courses/excel-zero-to-hero" },
    { labelEn: "Excel + Power BI + AI + Freelance", labelAr: "Excel + Power BI + AI + فريلانس", href: "/courses/excel-powerbi-ai-freelance" },
    { labelEn: "SQL for Data Analysis", labelAr: "SQL لتحليل البيانات", href: "/courses/sql-data-analysis" },
    { labelEn: "Python for Data Analysis", labelAr: "Python لتحليل البيانات", href: "/courses/python-data-analysis" },
    { labelEn: "Full Data Analytics Bundle", labelAr: "الباقة الكاملة", href: "/courses/full-data-analysis-bundle" },
  ],
};

const socialLinks = [
  { icon: Youtube, href: "https://www.youtube.com/c/MohamedAbdelfattahYallaNet3alemM", label: "YouTube", color: "hover:text-red-500" },
  { icon: Facebook, href: "https://www.facebook.com/MohamedabdelfattahYallanet3alem1", label: "Facebook", color: "hover:text-blue-500" },
  { icon: Instagram, href: "https://www.instagram.com/m._abdelfattah_knowlytics_hub?igsh=MWw2d3Y0ZHdoZzB0MQ==", label: "Instagram", color: "hover:text-pink-500" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/mohamed-abdelfattah-el-sayed/", label: "LinkedIn", color: "hover:text-blue-400" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@mohamedabdelfattah23?is_from_webapp=1&sender_device=pc", label: "TikTok", color: "hover:text-white" },
];

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const [email, setEmail] = useState("");
  const isAr = locale === "ar";

  const getHref = (href: string) => `/${locale}${href}`;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success(isAr ? "تم الاشتراك بنجاح!" : "Subscribed successfully!");
      setEmail("");
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-white/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="xl:col-span-1">
            <Link href={getHref("/")} className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">{t("tagline")}</p>

            {/* Social links */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-9 h-9 rounded-lg border border-white/20 flex items-center justify-center text-slate-400 transition-all duration-200 hover:border-transparent hover:bg-white/10 ${social.color}`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={getHref(link.href)}
                    className="flex items-center gap-2 text-slate-400 hover:text-blue-400 text-sm transition-colors duration-200 group"
                  >
                    <ArrowRight className={`w-3 h-3 text-blue-500 transition-transform duration-200 group-hover:translate-x-1 ${isAr ? "rotate-180" : ""}`} />
                    {tn(link.key as Parameters<typeof tn>[0])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Courses */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t("ourCourses")}
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.courses.map((course) => (
                <li key={course.href}>
                  <Link
                    href={getHref(course.href)}
                    className="flex items-center gap-2 text-slate-400 hover:text-blue-400 text-sm transition-colors duration-200 group"
                  >
                    <ArrowRight className={`w-3 h-3 text-blue-500 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${isAr ? "rotate-180" : ""}`} />
                    {isAr ? course.labelAr : course.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t("newsletter")}
            </h3>
            <form onSubmit={handleSubscribe} className="mb-6">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("newsletterPlaceholder")}
                  className="flex-1 min-w-0 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors flex-shrink-0"
                >
                  {t("subscribe")}
                </button>
              </div>
            </form>

            {/* Contact Info */}
            <div className="space-y-2">
              <a
                href="mailto:hello@knowlyticshub.com"
                className="flex items-center gap-2.5 text-slate-400 hover:text-white text-sm transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                hello@knowlyticshub.com
              </a>
              <a
                href="https://wa.me/201226929392"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-400 hover:text-white text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span dir="ltr">+201226929392</span>
              </a>
              <p className="flex items-center gap-2.5 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-red-400 flex-shrink-0" />
                {isAr ? "القاهرة، مصر" : "Cairo, Egypt"}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Knowlytics Hub. {t("rights")}
          </p>
          <div className="flex items-center gap-4">
            <Link href={getHref("/privacy")} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
              {t("privacy")}
            </Link>
            <span className="text-slate-700">•</span>
            <Link href={getHref("/terms")} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
