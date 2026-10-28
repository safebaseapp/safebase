import type { Metadata } from "next";
import SimopsPlanner from "../../../components/SimopsPlanner";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "tr" ? "tr" : "en";
  const title = locale === "tr" ? "SIMOPS Planlayıcı | Eş Zamanlı Operasyon Güvenliği | SERNEM" : "SIMOPS Planner | Simultaneous Operations Safety | SERNEM";
  const description = locale === "tr" ? "SIMOPS planlayıcıyla eş zamanlı saha operasyonlarında çakışan işlerin risklerini ve koordinasyon ihtiyaçlarını değerlendirin." : "Plan simultaneous operations, identify intersecting work activities and assess HSE coordination using the SIMOPS planner.";
  const canonical = `https://www.sernem.com/${locale}/tools/simops`;
  return {
    title, description,
    openGraph: { title, description, url: canonical, siteName: "SERNEM", type: "website", locale: locale === "tr" ? "tr_TR" : "en_US" },
    alternates: {
      canonical,
      languages: {
        tr: "https://www.sernem.com/tr/tools/simops",
        en: "https://www.sernem.com/en/tools/simops",
        "x-default": "https://www.sernem.com/en/tools/simops"
      }
    }
  };
}

export default async function SimopsPage({ params }: Props) {
  const { locale: rawLocale } = await params;

  const locale: "tr" | "en" =
    rawLocale === "tr" ? "tr" : "en";

  return <SimopsPlanner locale={locale} />;
}
