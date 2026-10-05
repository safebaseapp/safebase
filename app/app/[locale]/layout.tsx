import type { Metadata } from "next";
import { headers } from "next/headers";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import LocalizedNavbar from "./components/LocalizedNavbar";
import NavbarLegacyPremiumCleanup from "./components/NavbarLegacyPremiumCleanup";
import MobileAuthBar from "./components/MobileAuthBar";
import MobileQuickNav from "./components/MobileQuickNav";
import UserActivityCapture from "./components/UserActivityCapture";
import DashboardReturnBar from "./components/DashboardReturnBar";
import WorkspaceUxEnhancer from "./components/WorkspaceUxEnhancer";
import HomeLabsBridge from "./components/HomeLabsBridge";
import "./navbar-responsive-fix.css";
import "./premium-live-polish.css";
import "./core-content-visual-system.css";
import "./core-content-image-cards.css";
import "./topic-match-refinement.css";
import "./topic-match-refinement-supplement.css";
import "./toolbox-visual-spot-fixes.css";
import "./public-pages-polish.css";
import "./ai-assistant/ai-mobile.css";

const SITE_URL = "https://www.sernem.com";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

function normalizedLocalizedPath(pathname: string | null, locale: string) {
  const fallback = `/${locale}`;
  const raw = pathname?.startsWith("/") ? pathname : fallback;
  const withoutTrailingSlash =
    raw.length > 1 && raw.endsWith("/") ? raw.slice(0, -1) : raw;
  const match = withoutTrailingSlash.match(/^\/(?:tr|en)(\/.*)?$/);
  const suffix = match?.[1] ?? "";

  return {
    canonical: `${SITE_URL}/${locale}${suffix}`,
    en: `${SITE_URL}/en${suffix}`,
    tr: `${SITE_URL}/tr${suffix}`,
  };
}

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
  const requestHeaders = await headers();
  const localized = normalizedLocalizedPath(
    requestHeaders.get("x-sernem-pathname"),
    locale,
  );

  const title = isTurkish
    ? "SERNEM | Profesyonel İSG Araçları ve Güvenlik Kaynakları"
    : "SERNEM | Professional HSE Tools & Safety Resources";

  const description = isTurkish
    ? "Risk analizi, Method Statement, İSG hesaplayıcıları, denetim araçları, Toolbox içerikleri ve yapay zekâ destekli profesyonel HSE kaynakları."
    : "Professional risk assessments, Method Statements, HSE calculators, inspection tools, Toolbox Talks and AI-powered safety resources.";

  return {
    title,
    description,
    alternates: {
      canonical: localized.canonical,
      languages: {
        en: localized.en,
        tr: localized.tr,
        "x-default": localized.en,
      },
    },
    openGraph: {
      title,
      description,
      siteName: "SERNEM",
      type: "website",
      url: localized.canonical,
      locale: isTurkish ? "tr_TR" : "en_US",
      alternateLocale: isTurkish ? ["en_US"] : ["tr_TR"],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const safeLocale = locale as "tr" | "en";

  return (
    <NextIntlClientProvider>
      <LocalizedNavbar locale={safeLocale} />
      <HomeLabsBridge locale={safeLocale} />
      <NavbarLegacyPremiumCleanup />
      <MobileAuthBar locale={safeLocale} />
      <MobileQuickNav locale={safeLocale} />
      <UserActivityCapture />
      <DashboardReturnBar locale={safeLocale} />
      <WorkspaceUxEnhancer locale={safeLocale} />
      {children}
    </NextIntlClientProvider>
  );
}
