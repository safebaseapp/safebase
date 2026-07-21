import { KnowledgeItem } from "./types";

export const scaffoldKnowledge: Record<string, KnowledgeItem> = {
  "foundation-undermining": {
    id: "foundation-undermining",

    title: {
      en: "Foundation Undermining",
      tr: "Temel Oyulması",
    },

    risk: "critical",

    difficulty: 3,

    inspectionTime: "30 sec",

    why: {
      en: "Excavation or heavy vehicle movement can weaken the scaffold foundation and lead to collapse.",
      tr: "Kazı çalışmaları veya ağır araç hareketleri iskele temelini zayıflatabilir ve çökmesine neden olabilir.",
    },

    howToInspect: [
      {
        en: "Inspect the ground around all base plates.",
        tr: "Tüm taban plakalarının çevresindeki zemini kontrol edin.",
      },
      {
        en: "Look for excavation, erosion or settlement.",
        tr: "Kazı, erozyon veya zemin oturmasını kontrol edin.",
      },
      {
        en: "Verify nearby vehicle movement has not affected stability.",
        tr: "Yakındaki araç hareketlerinin stabiliteyi etkilemediğini doğrulayın.",
      },
    ],

    commonMistakes: [
      {
        en: "Ignoring recent excavation work.",
        tr: "Yakın zamanda yapılan kazıyı dikkate almamak.",
      },
      {
        en: "Inspecting only one side of the scaffold.",
        tr: "İskelenin yalnızca bir tarafını kontrol etmek.",
      },
    ],

    requiredPPE: [
      {
        en: "Safety Helmet",
        tr: "Baret",
      },
      {
        en: "Safety Shoes",
        tr: "İş Ayakkabısı",
      },
    ],

    requiredCompetency: {
      en: "Competent Scaffold Inspector",
      tr: "Yetkili İskele Denetçisi",
    },

    references: ["OSHA 1926.451", "EN 12811-1"],

    relatedDocuments: [
      {
        en: "Scaffold Inspection Report",
        tr: "İskele Denetim Formu",
      },
    ],

    aiPrompt: {
      en: "Explain scaffold foundation inspection requirements.",
      tr: "İskele temel denetimi gerekliliklerini açıkla.",
    },
  },
};