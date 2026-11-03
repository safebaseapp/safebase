import type { SafetyGuide, LocalizedText } from "../../components/GuideTemplate";
import { specialistRelatedGuide } from "./specialist-related";

export type Pair = LocalizedText;
export type IndustrialFieldTopic = {
  slug: string;
  title: Pair;
  category: Pair;
  description: Pair;
  overview: Pair;
  hazards: Pair[];
  controls: Pair[];
  mistakes: Pair[];
  checks: Pair[];
  ppe: Pair[];
  stop: Pair;
  references: string[];
  related: string[];
  keywords: { en: string[]; tr: string[] };
  readTime?: number;
};

const toLanguage = (value: Pair[], locale: "tr" | "en") => value.map(item => item[locale]);

/** Converts distinct, expert-authored bilingual field controls into the established
 *  SafetyGuide contract. No routes, permissions or additional content hubs.
 *  Every guide is a planning aid, never an operating authorization.
 */
export function industrialFieldGuides(items: IndustrialFieldTopic[]): SafetyGuide[] {
  return items.map(item => ({
    slug: item.slug,
    title: item.title,
    category: item.category,
    description: item.description,
    overview: item.overview,
    readTime: item.readTime ?? 9,
    riskLevel: { en: "High Risk", tr: "Yüksek Risk" },
    standard: "OSHA",
    hazards: { en: toLanguage(item.hazards, "en"), tr: toLanguage(item.hazards, "tr") },
    controls: { en: toLanguage(item.controls, "en"), tr: toLanguage(item.controls, "tr") },
    requiredPPE: { en: toLanguage(item.ppe, "en"), tr: toLanguage(item.ppe, "tr") },
    commonMistakes: { en: toLanguage(item.mistakes, "en"), tr: toLanguage(item.mistakes, "tr") },
    checklist: {
      title: { en: "Pre-start and handback verification", tr: "İş öncesi ve teslim doğrulaması" },
      en: toLanguage(item.checks, "en"),
      tr: toLanguage(item.checks, "tr"),
    },
    emergencySection: {
      title: { en: "Stop-work / abnormal conditions", tr: "İşi durdurma / olağan dışı durum" },
      content: item.stop,
    },
    references: item.references,
    relatedGuides: item.related.map(specialistRelatedGuide),
    searchKeywords: item.keywords,
    aiText: {
      en: `Use this ${item.title.en.toLowerCase()} field guide alongside the approved engineering procedure, permit, risk assessment and isolation record. Ask SERNEM AI to identify missing site-specific controls; never replace competent authorization with an AI suggestion.`,
      tr: `Bu ${item.title.tr.toLocaleLowerCase("tr-TR")} saha rehberini onaylı mühendislik prosedürü, iş izni, risk değerlendirmesi ve izolasyon kaydıyla birlikte kullanın. Sahaya özgü eksik önlemleri SERNEM AI ile gözden geçirin; yapay zekâ önerisi yetkili onayının yerini tutmaz.`,
    },
  } satisfies SafetyGuide));
}
