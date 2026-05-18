"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  locale: string;
}

const navItems = [
  { key: "home", href: "/" },
  { key: "courses", href: "/courses" },
  {
    key: "services",
    href: "/services",
    children: [
      { key: "corporate", href: "/services#corporate" },
      { key: "companiesConsult", href: "/services#corporate" },
      { key: "individual", href: "/services#individual" },
      { key: "dashboard", href: "/services#dashboard" },
    ],
  },
  { key: "about", href: "/about" },
  { key: "instructor", href: "/instructor" },
  { key: "testimonials", href: "/testimonials" },
  { key: "companies", href: "/companies" },
  {
    key: "assessments",
    href: "#",
    children: [
      { key: "excelAssessment", href: "/excel-assessment" },
      { key: "interviewAssessment", href: "/interview-assessment" },
    ],
  },
  { key: "projects", href: "/student-projects" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
];

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations("nav");
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const isRTL = locale === "ar";
  const otherLocale = locale === "en" ? "ar" : "en";
  const otherLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getHref = (href: string) => `/${locale}${href}`;

  const isActive = (href: string) => {
    if (href === "/") return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(`/${locale}${href}`);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "glass dark:bg-slate-950/80 shadow-lg border-b border-white/10"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href={getHref("/")} className="flex items-center group">
              <img
                src="/logo.png"
                alt="Knowlytics"
                className="w-auto object-contain"
                style={{ height: "64px" }}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.key}
                  className="relative group"
                  onMouseEnter={() => item.children && setActiveDropdown(item.key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.children ? (
                    <button
                      className={cn(
                        "nav-link flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                        "text-slate-300 hover:text-white hover:bg-white/10",
                        activeDropdown === item.key && "text-white bg-white/10"
                      )}
                    >
                      {t(item.key as keyof typeof t)}
                      <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
                    </button>
                  ) : (
                    <Link
                      href={getHref(item.href)}
                      className={cn(
                        "nav-link flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                        isActive(item.href)
                          ? "text-blue-400 bg-blue-500/10"
                          : "text-slate-300 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {t(item.key as keyof typeof t)}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {item.children && (
                    <AnimatePresence>
                      {activeDropdown === item.key && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className={cn(
                            "absolute top-full mt-1 glass dark:bg-slate-900/95 rounded-xl shadow-xl border border-white/10 overflow-hidden min-w-[180px]",
                            isRTL ? "right-0" : "left-0"
                          )}
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.key}
                              href={getHref(child.href)}
                              className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-blue-500/20 transition-all duration-150"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {t(child.key as keyof typeof t)}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <Link
                href={otherLocalePath}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg border border-white/20 text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-200"
              >
                <Globe className="w-4 h-4" />
                <span>{locale === "en" ? "العربية" : "English"}</span>
              </Link>

              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-9 h-9 rounded-lg border border-white/20 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              )}

              {/* Enroll CTA */}
              <Link
                href={getHref("/courses")}
                className="hidden md:flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
              >
                {t("enroll")}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="xl:hidden w-9 h-9 rounded-lg border border-white/20 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 300 : -300 }}
            animate={{ opacity: 0.98, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? 300 : -300 }}
            transition={{ type: "spring", damping: 25 }}
            className={cn(
              "fixed top-0 bottom-0 z-40 w-[280px] bg-slate-950 border-e border-white/10 overflow-y-auto",
              isRTL ? "right-0" : "left-0"
            )}
          >
            <div className="p-6 pt-20">
              {/* Logo */}
              <div className="mb-6 pb-6 border-b border-white/10">
                <img src="/logo.png" alt="Knowlytics" className="w-auto object-contain" style={{ height: "64px" }} />
              </div>

              {/* Nav items */}
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <div key={item.key}>
                    {item.children ? (
                      <>
                        <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          {t(item.key as keyof typeof t)}
                        </div>
                        {item.children.map((child) => (
                          <Link
                            key={child.key}
                            href={getHref(child.href)}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center px-3 py-2 ps-6 text-sm text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-150"
                          >
                            {t(child.key as keyof typeof t)}
                          </Link>
                        ))}
                      </>
                    ) : (
                      <Link
                        href={getHref(item.href)}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-150",
                          isActive(item.href)
                            ? "text-blue-400 bg-blue-500/10"
                            : "text-slate-300 hover:text-white hover:bg-white/10"
                        )}
                      >
                        {t(item.key as keyof typeof t)}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile Actions */}
              <div className="mt-8 space-y-3 pt-6 border-t border-white/10">
                <Link
                  href={otherLocalePath}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-300 rounded-lg border border-white/20 hover:bg-white/10 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  <Globe className="w-4 h-4" />
                  {locale === "en" ? "العربية" : "English"}
                </Link>
                <Link
                  href={getHref("/courses")}
                  className="flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-500 hover:to-purple-500 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("enroll")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/60 xl:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
