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
    ? "Method Statement Oluşturucu – Güvenli Çalışma Metodu | SERNEM"
    : "Method Statement Generator – Safe Work Method | SERNEM";

  const description = isTurkish
    ? "Profesyonel Method Statement oluşturun. İş adımları, tehlikeler, kontrol önlemleri ve sorumlulukları yapılandırın ve saha kullanımı için profesyonel çıktı hazırlayın."
    : "Create professional HSE Method Statements with structured work steps, hazards, control measures and responsibilities for safe work planning and field use.";

  const canonical = `https://www.sernem.com/${locale}/tools/method-statement`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: "https://www.sernem.com/en/tools/method-statement",
        tr: "https://www.sernem.com/tr/tools/method-statement",
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

export default function MethodStatementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
