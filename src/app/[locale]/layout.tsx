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
    default: "Knowlytics Hub – Data Analytics & AI Training",
  },
  description:
    "Master Data Analytics, Business Intelligence, and AI with Knowlytics Hub. Expert-led courses in Excel, SQL, Power BI, Python, and more.",
  keywords: [
    "data analytics",
    "business intelligence",
    "power bi training",
    "sql courses",
    "excel training",
    "python for data analysis",
    "knowlytics hub",
    "تحليل البيانات",
    "دورات BI",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://knowlyticshub.com",
    siteName: "Knowlytics Hub",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@knowlyticshub",
  },
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
