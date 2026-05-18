import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CoursesPageClient from "./CoursesPageClient";
import courses from "@/data/courses.json";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "courses" });
  return { title: t("title"), description: t("subtitle") };
}

export default function CoursesPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <CoursesPageClient courses={courses as any} locale={locale} />;
}
