import { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "مدونة تحليل البيانات | Excel, Power BI, SQL, Python, AI"
      : "Data Analytics Blog | Excel, Power BI, SQL, Python, AI",
    description: isAr
      ? "مقالات احترافية في تحليل البيانات، Power BI, Excel, SQL, Python والذكاء الاصطناعي. محتوى عربي مجاني من خبراء Knowlytics Hub."
      : "Professional articles on data analytics, Power BI, Excel, SQL, Python and AI. Free Arabic content from Knowlytics Hub experts.",
    alternates: {
      canonical: isAr ? "https://knowlyticshub.com/blog" : "https://knowlyticshub.com/en/blog",
      languages: {
        ar: "https://knowlyticshub.com/blog",
        en: "https://knowlyticshub.com/en/blog",
      },
    },
    openGraph: {
      title: isAr ? "مدونة Knowlytics Hub | تحليل البيانات" : "Knowlytics Hub Blog | Data Analytics",
      description: isAr
        ? "مقالات ونصائح احترافية في تحليل البيانات والذكاء الاصطناعي"
        : "Professional articles and tips on data analytics and AI",
      url: isAr ? "https://knowlyticshub.com/blog" : "https://knowlyticshub.com/en/blog",
    },
  };
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
