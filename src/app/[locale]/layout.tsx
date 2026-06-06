import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import ChatbotWidget from "@/components/layout/ChatbotWidget";
import { Toaster } from "sonner";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Knowlytics Hub",
    default: "Knowlytics Hub | تحليل البيانات والذكاء الاصطناعي",
  },
  description:
    "Knowlytics Hub — أفضل منصة تدريب تحليل البيانات في مصر والعالم العربي. كورسات Excel, Power BI, SQL, Python, AI بإشراف محمد عبدالفتاح. أكثر من 7,000 متدرب.",
  keywords: [
    // Arabic keywords
    "تحليل البيانات",
    "كورس تحليل البيانات",
    "كورس Power BI",
    "كورس Excel",
    "كورس SQL",
    "كورس Python",
    "دورات تحليل البيانات مصر",
    "محمد عبدالفتاح",
    "Knowlytics Hub",
    "كورسات أون لاين مصر",
    "تعلم Power BI بالعربي",
    "شهادة تحليل البيانات",
    "دورة Excel احترافية",
    "تحليل البيانات بالذكاء الاصطناعي",
    "فريلانس تحليل بيانات",
    // English keywords
    "data analytics egypt",
    "power bi course arabic",
    "excel training egypt",
    "sql course arabic",
    "python data analysis arabic",
    "data analytics certification",
    "business intelligence training",
    "knowlytics hub",
    "online data courses egypt",
    "AI tools course arabic",
  ],
  authors: [{ name: "Mohamed Abdelfattah", url: "https://knowlyticshub.com/instructor" }],
  creator: "Mohamed Abdelfattah",
  publisher: "Knowlytics Hub",
  metadataBase: new URL("https://knowlyticshub.com"),
  alternates: {
    canonical: "https://knowlyticshub.com",
    languages: {
      "ar": "https://knowlyticshub.com",
      "en": "https://knowlyticshub.com/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    alternateLocale: "en_US",
    url: "https://knowlyticshub.com",
    siteName: "Knowlytics Hub",
    title: "Knowlytics Hub | تحليل البيانات والذكاء الاصطناعي",
    description: "أفضل منصة تدريب تحليل البيانات في مصر والعالم العربي. كورسات Excel, Power BI, SQL, Python, AI — أكثر من 7,000 متدرب.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Knowlytics Hub - Data Analytics Training",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@knowlyticshub",
    creator: "@knowlyticshub",
    title: "Knowlytics Hub | تحليل البيانات والذكاء الاصطناعي",
    description: "أفضل منصة تدريب تحليل البيانات في مصر. كورسات Excel, Power BI, SQL, Python, AI.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "add-your-google-search-console-verification-code-here",
  },
  category: "education",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = params;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Cairo:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://knowlyticshub.com/#organization",
                  name: "Knowlytics Hub",
                  url: "https://knowlyticshub.com",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://knowlyticshub.com/logo.png",
                  },
                  description: "أفضل منصة تدريب تحليل البيانات في مصر والعالم العربي",
                  founder: {
                    "@type": "Person",
                    name: "Mohamed Abdelfattah",
                    jobTitle: "Data Analytics Expert & Founder",
                    url: "https://knowlyticshub.com/instructor",
                  },
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+201226929392",
                    contactType: "customer service",
                    availableLanguage: ["Arabic", "English"],
                  },
                  sameAs: [
                    "https://www.youtube.com/@Knowlytics_Hub",
                    "https://www.instagram.com/knowlytics_hub",
                  ],
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "EG",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://knowlyticshub.com/#website",
                  url: "https://knowlyticshub.com",
                  name: "Knowlytics Hub",
                  publisher: { "@id": "https://knowlyticshub.com/#organization" },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: "https://knowlyticshub.com/courses?q={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "EducationalOrganization",
                  "@id": "https://knowlyticshub.com/#edu",
                  name: "Knowlytics Hub",
                  url: "https://knowlyticshub.com",
                  description: "منصة تدريب متخصصة في تحليل البيانات والذكاء الاصطناعي",
                  numberOfStudents: 7000,
                  teaches: ["Data Analytics", "Power BI", "Excel", "SQL", "Python", "AI Tools", "Freelancing"],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange={false}
          >
            <Header locale={locale} />
            <main>{children}</main>
            <Footer locale={locale} />
            <FloatingWhatsApp phoneNumber="+201226929392" />
            <ChatbotWidget locale={locale} />
            <Toaster position={locale === "ar" ? "bottom-left" : "bottom-right"} richColors />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
