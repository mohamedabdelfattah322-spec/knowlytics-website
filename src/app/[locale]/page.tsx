import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import HeroSlider from "@/components/home/HeroSlider";
import StatsCounter from "@/components/home/StatsCounter";
import CoursesSlider from "@/components/home/CoursesSlider";
import FounderSection from "@/components/home/FounderSection";
import VideoSection from "@/components/home/VideoSection";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";
import ProjectsSlider from "@/components/home/ProjectsSlider";
import CompaniesSlider from "@/components/home/CompaniesSlider";
import ServicesPreview from "@/components/home/ServicesPreview";
import LMSSection from "@/components/home/LMSSection";
import AssessmentSection from "@/components/home/AssessmentSection";
import AIAssistantSection from "@/components/home/AIAssistantSection";
import OffersSlider from "@/components/home/OffersSlider";
import FAQSection from "@/components/home/FAQSection";
import ContactSection from "@/components/home/ContactSection";

import courses from "@/data/courses.json";
import testimonials from "@/data/testimonials.json";
import projects from "@/data/projects.json";
import companies from "@/data/companies.json";
import faq from "@/data/faq.json";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "Knowlytics Hub | كورسات تحليل البيانات Excel Power BI SQL Python AI"
      : "Knowlytics Hub | Data Analytics Courses Excel Power BI SQL Python AI",
    description: isAr
      ? "تعلم تحليل البيانات من الصفر مع محمد عبدالفتاح. كورسات لايف في Excel, Power BI, SQL, Python, AI وفريلانس. أكثر من 7,000 متدرب. سجّل الآن!"
      : "Learn Data Analytics with Mohamed Abdelfattah. Live courses in Excel, Power BI, SQL, Python, AI and Freelancing. 7,000+ trainees. Enroll now!",
    alternates: {
      canonical: isAr ? "https://knowlyticshub.com" : "https://knowlyticshub.com/en",
      languages: {
        ar: "https://knowlyticshub.com",
        en: "https://knowlyticshub.com/en",
      },
    },
    openGraph: {
      title: isAr ? "Knowlytics Hub | كورسات تحليل البيانات" : "Knowlytics Hub | Data Analytics Courses",
      description: isAr
        ? "تعلم تحليل البيانات من الصفر — Excel, Power BI, SQL, Python, AI. أكثر من 7,000 متدرب في مصر والعالم العربي."
        : "Learn Data Analytics — Excel, Power BI, SQL, Python, AI. 7,000+ trainees across Egypt and the Arab World.",
      url: isAr ? "https://knowlyticshub.com" : "https://knowlyticshub.com/en",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Knowlytics Hub" }],
    },
  };
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return (
    <>
      <HeroSlider locale={locale} />
      <StatsCounter locale={locale} />
      <CoursesSlider courses={courses as any} locale={locale} />
      <FounderSection locale={locale} />
      <VideoSection locale={locale} />
      <TestimonialsSlider testimonials={testimonials as any} locale={locale} />
      <ProjectsSlider projects={projects as any} locale={locale} />
      <CompaniesSlider companies={companies} locale={locale} />
      <ServicesPreview locale={locale} />
      <OffersSlider locale={locale} />
      <LMSSection locale={locale} />
      <AssessmentSection locale={locale} />
      <FAQSection faq={faq as any} locale={locale} />
      <AIAssistantSection locale={locale} />
      <ContactSection locale={locale} />
    </>
  );
}
