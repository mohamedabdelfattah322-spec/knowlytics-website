export type Locale = "en" | "ar";

export interface Course {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  featured: boolean;
  enrollUrl?: string;
}

export interface Testimonial {
  id: string;
  nameEn: string;
  nameAr: string;
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
  rating: number;
  avatar: string;
  videoUrl?: string;
  company?: string;
}

export interface Project {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  student: string;
  category: "Power BI" | "SQL" | "Python" | "Excel";
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  tools: string[];
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry?: string;
}

export interface FAQ {
  id: string;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
  category?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  contentEn: string;
  contentAr: string;
  author: string;
  authorAvatar: string;
  publishedAt: string;
  category: string;
  image: string;
  readingTime: number;
  tags: string[];
}

export interface Service {
  id: string;
  icon: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  features: { en: string; ar: string }[];
}

export interface HeroSlide {
  id: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  image: string;
  ctaEn: string;
  ctaAr: string;
  ctaUrl: string;
  badge?: string;
}

export interface AssessmentQuestion {
  id: string;
  category: string;
  questionEn: string;
  questionAr: string;
  options: {
    en: string[];
    ar: string[];
  };
  correctAnswer: number;
  explanation?: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  labelEn: string;
  labelAr: string;
  icon: string;
}
