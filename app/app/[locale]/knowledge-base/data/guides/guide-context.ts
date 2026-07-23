import type { SafetyGuide } from "../../components/GuideTemplate";

export type SupportedGuideLocale = "en" | "tr";

function createList(title: string, items?: string[]): string {
  if (!items || items.length === 0) {
    return "";
  }

  return `${title}:\n${items.map((item) => `- ${item}`).join("\n")}`;
}

export function guideToAIContext(
  guide: SafetyGuide,
  locale: SupportedGuideLocale,
): string {
  const language: SupportedGuideLocale = locale === "tr" ? "tr" : "en";

  const sections: string[] = [
    `SOURCE SLUG: ${guide.slug}`,
    `TITLE: ${guide.title[language]}`,
    `CATEGORY: ${guide.category[language]}`,
    `DESCRIPTION: ${guide.description[language]}`,
    `OVERVIEW: ${guide.overview[language]}`,

    guide.riskLevel
      ? `RISK LEVEL: ${guide.riskLevel[language]}`
      : "",

    guide.standard
      ? `STANDARD: ${guide.standard}`
      : "",

    createList(
      language === "tr" ? "TEHLİKELER" : "HAZARDS",
      guide.hazards[language],
    ),

    createList(
      language === "tr" ? "GEREKLİ KKD" : "REQUIRED PPE",
      guide.requiredPPE?.[language],
    ),

    createList(
      language === "tr" ? "KONTROL ÖNLEMLERİ" : "CONTROL MEASURES",
      guide.controls[language],
    ),

    createList(
      language === "tr" ? "YAYGIN HATALAR" : "COMMON MISTAKES",
      guide.commonMistakes?.[language],
    ),

    guide.checklist
      ? createList(
          guide.checklist.title[language],
          guide.checklist[language],
        )
      : "",

    guide.emergencySection
      ? `${guide.emergencySection.title[language]}:\n${guide.emergencySection.content[language]}`
      : "",

    createList(
      language === "tr" ? "REFERANSLAR" : "REFERENCES",
      guide.references ?? [],
    ),

    guide.relatedGuides?.length
      ? createList(
          language === "tr" ? "İLGİLİ REHBERLER" : "RELATED GUIDES",
          guide.relatedGuides.map(
            (relatedGuide) =>
              `${relatedGuide.title[language]} (${relatedGuide.slug})`,
          ),
        )
      : "",
  ];

  return sections.filter(Boolean).join("\n\n");
}

export function guidesToAIContext(
  guides: SafetyGuide[],
  locale: SupportedGuideLocale,
): string {
  return guides
    .map(
      (guide, index) =>
        `===== SAFEBASE GUIDE ${index + 1} =====\n\n${guideToAIContext(
          guide,
          locale,
        )}`,
    )
    .join("\n\n");
}
