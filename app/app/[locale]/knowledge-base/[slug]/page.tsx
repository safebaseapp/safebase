import type { Metadata } from "next";
import { officialOshaReference } from "@/lib/seo/hse-sources";
import { notFound } from "next/navigation";
import GuideTemplate from "../components/GuideTemplate";
import { getGuideBySlug } from "../data/guides/all-guides";
import { generatedGuides } from "../data/guides/generated";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return ["tr", "en"].flatMap((locale) =>
    generatedGuides.map((guide) => ({ locale, slug: guide.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const language = locale === "tr" ? "tr" : "en";
  const guide = getGuideBySlug(slug);

  if (!guide) return {};

  const canonical = `https://www.sernem.com/${language}/knowledge-base/${guide.slug}`;
  const alternateLocale = language === "tr" ? "en" : "tr";

  const ctrOverrides: Record<string, {
    tr: { title: string; description: string };
    en: { title: string; description: string };
  }> = {
    "confined-space-attendant-duties": {
      tr: {
        title: "Kapalı Alan Gözcüsü Görevleri: Kontrol Listesi ve Saha Rehberi",
        description: "Kapalı alan gözcüsünün giriş takibi, iletişim, atmosferik risk ve acil durum sorumluluklarını inceleyin. İlgili risk değerlendirmesi ve saha araçlarına geçin.",
      },
      en: {
        title: "Confined Space Attendant Duties: Checklist & Field Guide",
        description: "Confined space attendant responsibilities: entrant monitoring, communication, changes in conditions and emergency response, with field-ready controls.",
      },
    },
    "stored-energy-hazards": {
      tr: {
        title: "Depolanmış Enerji Tehlikeleri | İzolasyon ve LOTO Kontrolleri",
        description: "Basınç, yerçekimi, yay ve mekanik sistemlerde depolanmış enerjiyi tanımlayın. İzolasyon, enerji boşaltma ve sıfır enerji kontrollerini inceleyin.",
      },
      en: {
        title: "Stored Energy Hazards | Pressure, Gravity & LOTO Controls",
        description: "Understand stored energy hazards involving pressure, gravity, springs and machinery. Review isolation, discharge and verification controls before work.",
      },
    },
    "hydraulic-system-safety": {
      tr: {
        title: "Hidrolik Sistem Güvenliği | Basınç ve Sıvı Enjeksiyonu Riski",
        description: "Hidrolik sistemlerde yüksek basınçlı sıvı enjeksiyonu, enerji boşaltma ve beklenmeyen hareket risklerini, temel kontrol önlemleriyle inceleyin.",
      },
      en: {
        title: "Hydraulic System Safety | Fluid Injection & Pressure Hazards",
        description: "Review hydraulic-system safety: high-pressure fluid injection, stored energy, unexpected movement, isolation and depressurization controls.",
      },
    },
    "suspended-load-exclusion-zones": {
      tr: {
        title: "Askıdaki Yük Güvenliği | Yasaklı Bölge ve Kaldırma Kontrolleri",
        description: "Askıdaki yükün altındaki tehlikeler, yük salınımı ve yasaklı bölge oluşturma kontrollerini inceleyin. Kaldırma çalışmalarında erişimi yönetin.",
      },
      en: {
        title: "Suspended Load Exclusion Zones | Lifting Safety Controls",
        description: "Learn how to manage lifting exclusion zones, unexpected load movement and access around suspended loads, with practical field control measures.",
      },
    },
  };
  const ctr = ctrOverrides[guide.slug]?.[language];

  return {
    title: ctr?.title ?? `${guide.title[language]} | SERNEM HSE Guide`,
    description: ctr?.description ?? guide.description[language],
    alternates: {
      canonical,
      languages: {
        tr: `https://www.sernem.com/tr/knowledge-base/${guide.slug}`,
        en: `https://www.sernem.com/en/knowledge-base/${guide.slug}`,
        "x-default": `https://www.sernem.com/en/knowledge-base/${guide.slug}`,
      },
    },
    openGraph: {
      title: guide.title[language],
      description: guide.description[language],
      url: canonical,
      siteName: "SERNEM",
      type: "article",
      locale: language === "tr" ? "tr_TR" : "en_US",
      alternateLocale: [alternateLocale === "tr" ? "tr_TR" : "en_US"],
    },
  };
}

export default async function KnowledgeGuidePage({ params }: Props) {
  const { locale, slug } = await params;
  if (locale !== "tr" && locale !== "en") notFound();

  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const language = locale === "tr" ? "tr" : "en";
  const url = `https://www.sernem.com/${language}/knowledge-base/${guide.slug}`;
  const article = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: guide.title[language],
    description: guide.description[language],
    url,
    mainEntityOfPage: url,
    inLanguage: language,
    publisher: {
      "@type": "Organization",
      name: "SERNEM",
      url: "https://www.sernem.com",
    },
    about: guide.category[language],
    citation: guide.references.map(name => {
      const sourceUrl = officialOshaReference(name);
      return sourceUrl ? { "@type": "CreativeWork", name, url: sourceUrl } : name;
    }),
    educationalUse: "Professional workplace safety training",
    isAccessibleForFree: true,
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "SERNEM",
        item: `https://www.sernem.com/${language}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: language === "tr" ? "Bilgi Bankası" : "Knowledge Base",
        item: `https://www.sernem.com/${language}/knowledge-base`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title[language],
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([article, breadcrumbs]).replace(/</g, "\\u003c"),
        }}
      />
      <GuideTemplate locale={locale} guide={guide} />
    </>
  );
}
