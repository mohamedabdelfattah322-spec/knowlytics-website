import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CoursesPageClient from "./CoursesPageClient";
import courses from "@/data/courses.json";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  setRequestLocale(locale);
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "كورسات تحليل البيانات | Excel, Power BI, SQL, Python, AI"
      : "Data Analytics Courses | Excel, Power BI, SQL, Python, AI",
    description: isAr
      ? "اختر من 9 كورسات لايف في تحليل البيانات: Excel, Power BI, SQL Server, Python, Tableau, Looker Studio, AI, كتابة التقارير. أسعار تبدأ من 1,000 ج.م."
      : "Choose from 9 live data analytics courses: Excel, Power BI, SQL Server, Python, Tableau, Looker Studio, AI, Report Writing. Prices from EGP 1,000.",
    alternates: {
      canonical: isAr ? "https://knowlyticshub.com/courses" : "https://knowlyticshub.com/en/courses",
      languages: {
        ar: "https://knowlyticshub.com/courses",
        en: "https://knowlyticshub.com/en/courses",
      },
    },
    openGraph: {
      title: isAr ? "كورسات تحليل البيانات | Knowlytics Hub" : "Data Analytics Courses | Knowlytics Hub",
      description: isAr
        ? "9 كورسات لايف على Zoom — Excel, Power BI, SQL, Python, AI. سجّل الآن!"
        : "9 live courses on Zoom — Excel, Power BI, SQL, Python, AI. Enroll now!",
      url: isAr ? "https://knowlyticshub.com/courses" : "https://knowlyticshub.com/en/courses",
    },
  };
}

export default function CoursesPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <CoursesPageClient courses={courses as any} locale={locale} />;
}
