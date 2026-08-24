import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import LocalizedNavbar from "./components/LocalizedNavbar";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTurkish = locale === "tr";

  const title = isTurkish
    ? "SERNEM | Profesyonel İSG Araçları ve Güvenlik Kaynakları"
    : "SERNEM | Professional HSE Tools & Safety Resources";

  const description = isTurkish
    ? "Risk analizi, Method Statement, İSG hesaplayıcıları, denetim araçları, Toolbox içerikleri ve yapay zekâ destekli profesyonel HSE kaynakları."
    : "Professional risk assessments, Method Statements, HSE calculators, inspection tools, Toolbox Talks and AI-powered safety resources.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "SERNEM",
      type: "website",
      locale: isTurkish ? "tr_TR" : "en_US",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const safeLocale = locale as "tr" | "en";

  return (
    <NextIntlClientProvider>
      <LocalizedNavbar locale={safeLocale} />
      {children}
    </NextIntlClientProvider>
  );
}
