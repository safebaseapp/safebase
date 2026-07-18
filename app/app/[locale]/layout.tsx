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
