"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, FileSpreadsheet, BarChart2, Palette, MessageCircle, Wrench, Star, ChevronDown, ChevronUp, Maximize2, X, Download } from "lucide-react";
import templatesData from "@/data/templates.json";
import templateFiles from "@/data/template-files.json";
import CheckoutModal, { type CheckoutItem } from "./CheckoutModal";

type Template = (typeof templatesData)[number];
type Zoom = { src: string; title: string } | null;

const previewSrc = (t: Template, colorIndex: number) => `/templates/${t.preview}-${colorIndex}.webp`;

const CATEGORIES = [
  { key: "all", labelAr: "الكل", labelEn: "All" },
  { key: "hr", labelAr: "الموارد البشرية", labelEn: "HR" },
  { key: "sales", labelAr: "المبيعات", labelEn: "Sales" },
  { key: "finance", labelAr: "المالية", labelEn: "Finance" },
  { key: "call-center", labelAr: "Call Center", labelEn: "Call Center" },
  { key: "customer-service", labelAr: "خدمة العملاء", labelEn: "Customer Service" },
  { key: "hospital", labelAr: "المستشفيات", labelEn: "Hospital" },
  { key: "pharmacy", labelAr: "الصيدلية", labelEn: "Pharmacy" },
  { key: "marketing", labelAr: "التسويق", labelEn: "Marketing" },
  { key: "restaurant", labelAr: "المطاعم", labelEn: "Restaurant" },
  { key: "real-estate", labelAr: "العقارات", labelEn: "Real Estate" },
  { key: "operations", labelAr: "العمليات", labelEn: "Operations" },
  { key: "executive", labelAr: "الإدارة العليا", labelEn: "Executive" },
  { key: "it", labelAr: "تكنولوجيا المعلومات", labelEn: "IT" },
  { key: "education", labelAr: "المدارس", labelEn: "Schools" },
];

function ZoomModal({ zoom, onClose, isAr }: { zoom: Zoom; onClose: () => void; isAr: boolean }) {
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom, onClose]);

  return (
    <AnimatePresence>
      {zoom && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={zoom.title}
        >
          <button
            onClick={onClose}
            className="absolute top-4 end-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            aria-label={isAr ? "إغلاق" : "Close"}
          >
            <X className="w-5 h-5" />
          </button>
          <motion.img
            initial={{ scale: 0.96 }}
            animate={{ scale: 1 }}
            src={zoom.src}
            alt={zoom.title}
            className="max-w-full max-h-[90vh] rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TemplateCard({ template, isAr, onZoom, onBuy }: { template: Template; isAr: boolean; onZoom: (z: Zoom) => void; onBuy: (i: CheckoutItem) => void }) {
  const canCheckout = template.slug in templateFiles;
  const [selectedColor, setSelectedColor] = useState(0);
  const [showFeatures, setShowFeatures] = useState(false);
  const color = template.colors[selectedColor];
  const features = isAr ? template.featuresAr : template.featuresEn;
  const toolLabel = template.tool === "excel" ? "Excel" : "Power BI";
  const toolColor =
    template.tool === "excel"
      ? "text-green-400 border-green-500/40 bg-green-500/10"
      : "text-yellow-400 border-yellow-500/40 bg-yellow-500/10";

  const discount = template.originalPrice > 0
    ? Math.round((1 - template.price / template.originalPrice) * 100)
    : 0;

  const whatsappBuy = `https://wa.me/201226929392?text=${encodeURIComponent(
    `مرحباً، أريد شراء قالب داشبورد:\n\n• القالب: ${template.titleAr}\n• الأداة: ${toolLabel}\n• اللون: ${isAr ? color.nameAr : color.nameEn}\n• السعر: ${template.price} جنيه`
  )}`;
  const whatsappCustom = `https://wa.me/201226929392?text=${encodeURIComponent(
    `مرحباً، أريد تعديل على قالب:\n• القالب: ${template.titleAr}\n• اللون: ${isAr ? color.nameAr : color.nameEn}\n\nالتعديل المطلوب: `
  )}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="relative rounded-2xl border flex flex-col overflow-hidden"
      style={{ borderColor: `${color.primary}2a`, background: "rgba(15,23,42,0.95)" }}
    >
      {/* top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${color.primary}88, transparent)`,
        }}
      />

      {/* preview area */}
      <div className="relative p-3">
        <button
          type="button"
          onClick={() => onZoom({ src: previewSrc(template, selectedColor), title: template.titleEn })}
          className="group relative block w-full aspect-[16/10] rounded-xl overflow-hidden bg-slate-800 ring-1 ring-white/5"
          aria-label={isAr ? `تكبير معاينة ${template.titleEn}` : `Enlarge ${template.titleEn} preview`}
        >
          <Image
            src={previewSrc(template, selectedColor)}
            alt={`${template.titleEn} preview`}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-white text-xs font-semibold bg-black/60 px-3 py-1.5 rounded-full">
              <Maximize2 className="w-3.5 h-3.5" />
              {isAr ? "عرض بالحجم الكامل" : "View full size"}
            </span>
          </span>
        </button>
        <div className="absolute top-5 left-5 flex gap-1.5">
          <span
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${toolColor}`}
          >
            {template.tool === "excel" ? (
              <FileSpreadsheet className="w-3 h-3" />
            ) : (
              <BarChart2 className="w-3 h-3" />
            )}
            {toolLabel}
          </span>
        </div>
        <div className="absolute top-5 right-5">
          <span
            className="text-[10px] px-2 py-0.5 rounded-full font-medium"
            style={{
              background: `${color.primary}18`,
              color: color.primary,
              border: `1px solid ${color.primary}33`,
            }}
          >
            {template.pages === 1
              ? (isAr ? "صفحة واحدة" : "1 page")
              : `${template.pages} ${isAr ? "صفحات" : "pages"}`}
          </span>
        </div>
      </div>

      {/* card body */}
      <div className="flex flex-col flex-1 p-4 pt-2 gap-3">
        {/* title + desc */}
        <div>
          <h3 className="font-bold text-white text-sm leading-snug mb-1">
            {template.titleAr}
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
            {isAr ? template.descriptionAr : template.descriptionEn}
          </p>
        </div>

        {/* color picker */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Palette className="w-3 h-3 text-slate-500" />
            <span className="text-[11px] text-slate-400">
              {isAr ? "اللون:" : "Color:"}{" "}
              <span className="font-semibold" style={{ color: color.primary }}>
                {isAr ? color.nameAr : color.nameEn}
              </span>
            </span>
          </div>
          <div className="flex gap-2">
            {template.colors.map((c, i) => (
              <button
                key={i}
                onClick={() => setSelectedColor(i)}
                title={isAr ? c.nameAr : c.nameEn}
                className="relative w-6 h-6 rounded-full transition-transform hover:scale-110 flex-shrink-0"
                style={{
                  background: c.primary,
                  boxShadow:
                    selectedColor === i
                      ? `0 0 0 2px #0f172a, 0 0 0 4px ${c.primary}`
                      : "none",
                }}
              >
                {selectedColor === i && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* features toggle */}
        <div>
          <button
            onClick={() => setShowFeatures(!showFeatures)}
            className="flex items-center gap-1.5 text-xs font-medium transition-colors"
            style={{ color: color.primary }}
          >
            {showFeatures ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
            {isAr ? "ما يوجد في القالب" : "What's included"}
          </button>
          <AnimatePresence>
            {showFeatures && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden mt-2 space-y-1.5"
              >
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                    <span
                      className="mt-0.5 w-3.5 h-3.5 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{ background: `${color.primary}22` }}
                    >
                      <Check className="w-2 h-2" style={{ color: color.primary }} />
                    </span>
                    {f}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* price row */}
        <div className="flex items-baseline gap-2 mt-auto pt-3 border-t border-white/5">
          <span className="text-xl font-bold text-white">
            {template.price.toLocaleString()}{" "}
            <span className="text-sm font-normal text-slate-400">جنيه</span>
          </span>
          {template.originalPrice > 0 && (
            <span className="text-sm text-slate-500 line-through">
              {template.originalPrice.toLocaleString()}
            </span>
          )}
          {discount > 0 && (
            <span
              className="ms-auto text-[11px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: `${color.primary}18`, color: color.primary }}
            >
              -{discount}%
            </span>
          )}
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-2 gap-2">
          {canCheckout ? (
            <button
              type="button"
              onClick={() => onBuy({ slug: template.slug, colorIndex: selectedColor, title: template.titleEn, colorName: isAr ? color.nameAr : color.nameEn, colorHex: color.primary, price: template.price })}
              className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: `linear-gradient(135deg, ${color.primary}ee, ${color.primary}88)` }}
            >
              <Download className="w-3.5 h-3.5" />
              {isAr ? "اشتري وحمل الملفات" : "Buy & Download"}
            </button>
          ) : (
            <a
              href={whatsappBuy}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: `linear-gradient(135deg, ${color.primary}ee, ${color.primary}88)` }}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              {isAr ? "اطلب على واتساب" : "Order on WhatsApp"}
            </a>
          )}
          <a
            href={whatsappCustom}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all hover:bg-white/5 active:scale-95"
            style={{ border: `1px solid ${color.primary}44`, color: color.primary }}
          >
            <Wrench className="w-3.5 h-3.5" />
            {isAr ? "طلب تعديل" : "Customize"}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function TemplatesClient({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const [tool, setTool] = useState<"all" | "excel" | "powerbi">("all");
  const [category, setCategory] = useState("all");
  const [zoom, setZoom] = useState<Zoom>(null);
  const [checkout, setCheckout] = useState<CheckoutItem | null>(null);

  const toolTabs = [
    { key: "all" as const, labelAr: "الكل", labelEn: "All", count: templatesData.length },
    {
      key: "excel" as const,
      labelAr: "Excel",
      labelEn: "Excel",
      count: templatesData.filter((t) => t.tool === "excel").length,
    },
    {
      key: "powerbi" as const,
      labelAr: "Power BI",
      labelEn: "Power BI",
      count: templatesData.filter((t) => t.tool === "powerbi").length,
    },
  ];

  const filtered = useMemo(() => {
    return templatesData.filter((t) => {
      const toolMatch = tool === "all" || t.tool === tool;
      const catMatch = category === "all" || t.category === category;
      return toolMatch && catMatch;
    });
  }, [tool, category]);

  return (
    <div className="min-h-screen bg-slate-950 text-white" dir={isAr ? "rtl" : "ltr"}>
      {/* ─── Hero ─────────────────────────────── */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }}
          />
          <div
            className="absolute top-10 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-8"
            style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }}
          />
        </div>
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            {isAr ? "قوالب جاهزة وقابلة للتعديل" : "Ready-to-use & customizable templates"}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            {isAr ? (
              <>
                قوالب داشبوردات{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  جاهزة
                </span>
              </>
            ) : (
              <>
                Ready-Made{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Dashboard Templates
                </span>
              </>
            )}
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
            {isAr
              ? "اشتري القالب المناسب لمجالك — Excel أو Power BI — اختار اللون اللي يناسب شركتك، وابدأ تشتغل فوراً."
              : "Buy the right template for your industry — Excel or Power BI — pick your brand color and start immediately."}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
            {[
              isAr ? "البيانات قابلة للتعديل" : "Editable data",
              isAr ? "4 ألوان لكل قالب" : "4 color themes",
              isAr ? "تسليم فوري على واتساب" : "Instant WhatsApp delivery",
              isAr ? "دعم فني بعد الشراء" : "Post-purchase support",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-green-400" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Filters ─────────────────────────── */}
      <section className="sticky top-16 z-30 bg-slate-950/95 backdrop-blur-md border-b border-white/5 py-4">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center flex-wrap">
          {/* Tool tabs */}
          <div className="flex gap-1 p-1 rounded-xl bg-slate-900 border border-white/5 flex-shrink-0">
            {toolTabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTool(t.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  tool === t.key
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t.key === "excel" && <FileSpreadsheet className="w-3.5 h-3.5" />}
                {t.key === "powerbi" && <BarChart2 className="w-3.5 h-3.5" />}
                {isAr ? t.labelAr : t.labelEn}
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    tool === t.key ? "bg-white/20" : "bg-white/5"
                  }`}
                >
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((c) => {
              const count =
                c.key === "all"
                  ? templatesData.length
                  : templatesData.filter((t) => t.category === c.key).length;
              if (count === 0) return null;
              return (
                <button
                  key={c.key}
                  onClick={() => setCategory(c.key)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                    category === c.key
                      ? "bg-blue-500/20 border-blue-500/50 text-blue-300"
                      : "border-white/10 text-slate-400 hover:text-white hover:border-white/30"
                  }`}
                >
                  {isAr ? c.labelAr : c.labelEn}
                </button>
              );
            })}
          </div>

          <span className="text-xs text-slate-500 sm:ms-auto whitespace-nowrap">
            {filtered.length} {isAr ? "قالب" : "templates"}
          </span>
        </div>
      </section>

      {/* ─── Grid ────────────────────────────── */}
      <section className="container mx-auto px-4 py-12">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 text-slate-500"
            >
              {isAr
                ? "لا توجد قوالب بهذه المواصفات حالياً"
                : "No templates match this filter yet"}
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filtered.map((t) => (
                <TemplateCard key={t.id} template={t} isAr={isAr} onZoom={setZoom} onBuy={setCheckout} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <ZoomModal zoom={zoom} onClose={() => setZoom(null)} isAr={isAr} />
      <CheckoutModal item={checkout} onClose={() => setCheckout(null)} />

      {/* ─── Custom CTA ─────────────────────── */}
      <section className="container mx-auto px-4 pb-20">
        <div
          className="relative rounded-2xl overflow-hidden border border-white/10 p-8 md:p-12 text-center"
          style={{
            background:
              "linear-gradient(135deg, #1e1b4b 0%, #0f172a 50%, #064e3b 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, #6366f1, transparent 60%)",
            }}
          />
          <h2 className="relative text-2xl md:text-3xl font-bold mb-3">
            {isAr ? "مش لاقي القالب المناسب؟" : "Can't find the right template?"}
          </h2>
          <p className="relative text-slate-400 mb-6 max-w-lg mx-auto">
            {isAr
              ? "ابعت لنا على واتساب وهنعمل لك قالب مخصص لمجالك وبياناتك بالضبط."
              : "Message us on WhatsApp and we'll build a custom dashboard tailored to your industry and data."}
          </p>
          <a
            href={`https://wa.me/201226929392?text=${encodeURIComponent(
              "مرحباً، أريد قالب داشبورد مخصص لمجال: "
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-blue-500/20"
          >
            <MessageCircle className="w-5 h-5" />
            {isAr ? "اطلب قالب مخصص" : "Request Custom Template"}
          </a>
        </div>
      </section>
    </div>
  );
}
