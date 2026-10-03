import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import TemplatesClient from "./TemplatesClient";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "قوالب داشبوردات جاهزة | Excel و Power BI | Knowlytics Hub"
      : "Ready-Made Dashboard Templates | Excel & Power BI | Knowlytics Hub",
    description: isAr
      ? "قوالب داشبوردات احترافية جاهزة للتحميل في كل المجالات — HR، مبيعات، مالية، مستشفيات، صيدليات، مطاعم وأكثر. Excel و Power BI. اختار لونك وابدأ فوراً."
      : "Professional ready-made dashboard templates for all industries — HR, Sales, Finance, Hospitals, Pharmacy, Restaurants & more. Excel & Power BI. Pick your color and start immediately.",
    openGraph: {
      title: isAr ? "قوالب داشبوردات جاهزة | Knowlytics Hub" : "Dashboard Templates | Knowlytics Hub",
      url: isAr
        ? "https://knowlyticshub.com/templates"
        : "https://knowlyticshub.com/en/templates",
    },
  };
}

export default function TemplatesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <TemplatesClient locale={locale} />;
}
