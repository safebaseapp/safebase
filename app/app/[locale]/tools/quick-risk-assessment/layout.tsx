import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const isTurkish = locale === "tr";

  const title = isTurkish
    ? "Risk Değerlendirmesi Oluşturucu – Profesyonel İSG Risk Analizi | SERNEM"
    : "Risk Assessment Generator – Professional HSE Risk Analysis | SERNEM";

  const description = isTurkish
    ? "Hazır risk kütüphanesiyle profesyonel iş sağlığı ve güvenliği risk değerlendirmesi oluşturun. Tehlikeleri seçin, risk skorlarını hesaplayın, kontrolleri yönetin ve rapor hazırlayın."
    : "Create professional workplace risk assessments using a structured HSE risk library. Identify hazards, calculate risk scores, manage controls and generate professional reports.";

  const canonical = `https://www.sernem.com/${locale}/tools/quick-risk-assessment`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: "https://www.sernem.com/en/tools/quick-risk-assessment",
        tr: "https://www.sernem.com/tr/tools/quick-risk-assessment",
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "SERNEM",
      type: "website",
      locale: isTurkish ? "tr_TR" : "en_US",
    },
  };
}

export default function QuickRiskAssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
