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
  return {
    title: "Knowlytics Hub – تحليل البيانات والذكاء الاصطناعي",
    description: "أكبر منصة تدريبية لتحليل البيانات في العالم العربي. دورات Excel وSQL وPower BI وPython والذكاء الاصطناعي.",
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
