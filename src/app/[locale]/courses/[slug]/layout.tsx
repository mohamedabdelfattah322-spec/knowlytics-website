import { Metadata } from "next";
import courses from "@/data/courses.json";

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const course = courses.find((c) => c.slug === slug);
  if (!course) return { title: "Course Not Found" };

  const isAr = locale === "ar";
  const title = isAr ? course.titleAr : course.titleEn;
  const description = isAr ? course.descriptionAr : course.descriptionEn;
  const canonicalAr = `https://knowlyticshub.com/courses/${slug}`;
  const canonicalEn = `https://knowlyticshub.com/en/courses/${slug}`;

  // Build structured data for Course
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.titleEn,
    description: course.descriptionEn,
    url: canonicalEn,
    provider: {
      "@type": "Organization",
      name: "Knowlytics Hub",
      url: "https://knowlyticshub.com",
    },
    instructor: {
      "@type": "Person",
      name: "Mohamed Abdelfattah",
      url: "https://knowlyticshub.com/instructor",
    },
    inLanguage: ["ar", "en"],
    educationalLevel: course.level,
    timeRequired: course.duration,
    offers: {
      "@type": "Offer",
      price: course.price,
      priceCurrency: "EGP",
      availability: "https://schema.org/InStock",
      url: `https://wa.me/201226929392`,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      instructor: { "@type": "Person", name: "Mohamed Abdelfattah" },
    },
  };

  return {
    title: isAr
      ? `${title} | Knowlytics Hub`
      : `${title} | Knowlytics Hub`,
    description,
    alternates: {
      canonical: isAr ? canonicalAr : canonicalEn,
      languages: {
        ar: canonicalAr,
        en: canonicalEn,
      },
    },
    openGraph: {
      title: `${title} | Knowlytics Hub`,
      description,
      url: isAr ? canonicalAr : canonicalEn,
      images: [{ url: course.image, width: 800, height: 450, alt: title }],
      type: "website",
    },
    other: {
      "script:ld+json": JSON.stringify(courseJsonLd),
    },
  };
}

export default function CourseSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
