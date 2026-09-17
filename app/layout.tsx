import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "خدمات التحكيم الهندسي | استشاريون الشرق — الرياض",
  description:
    "خدمات هندسية وفنية مساندة في قضايا التحكيم والمنازعات الإنشائية والعقارية: دراسة المستندات والمخططات والعقود والمطالبات، وتحليل الأعمال ونسب الإنجاز، وإعداد التقارير الهندسية لملف التحكيم.",
  keywords: [
    "التحكيم الهندسي",
    "المنازعات الإنشائية",
    "تقرير فني هندسي",
    "الخبرة الفنية",
    "تحليل التأخير",
    "المستخلصات والمطالبات",
    "مكتب هندسي الرياض",
  ],
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: site.firm,
    title: "خدمات التحكيم الهندسي | استشاريون الشرق",
    description:
      "دراسة المستندات وتحليل الأعمال وإعداد التقارير الهندسية اللازمة لدعم موقفك أمام جهة التحكيم.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "خدمات التحكيم الهندسي — استشاريون الشرق",
  description:
    "خدمات هندسية وفنية مساندة في قضايا التحكيم والمنازعات الإنشائية والعقارية.",
  telephone: site.phone.intl,
  email: site.email.display,
  areaServed: "SA",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.display,
    addressLocality: "الرياض",
    addressCountry: "SA",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${plexArabic.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
