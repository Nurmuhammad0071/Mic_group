import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import { locales, type Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import MetaPixel from "@/components/MetaPixel";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    icons: {
      icon: "/icon.png",
      apple: "/icon.png",
    },
  };
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  return (
    <html lang={locale} className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
