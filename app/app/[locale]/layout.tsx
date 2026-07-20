import type {Metadata} from "next";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {routing} from "../../i18n/routing";
import LocalizedNavbar from "./components/LocalizedNavbar";

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const isTurkish = locale === "tr";

  return {
    title: isTurkish
      ? "SafeBase | Global İSG Bilgi Platformu"
      : "SafeBase | Global HSE Knowledge Platform",
    description: isTurkish
      ? "Profesyonel İSG hesaplayıcıları, yapay zekâ asistanı, bilgi merkezi ve indirilebilir güvenlik kaynakları."
      : "Professional HSE calculators, AI assistant, knowledge base and downloadable safety resources.",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const {locale} = await params;

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
