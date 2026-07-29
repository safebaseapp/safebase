import { checklistItems } from "../../app/[locale]/checklists/loto/checklistData";
import type { ChecklistDocument } from "./hot-work";

type SourceChecklistItem = {
  id: string;
  section: string;
  text: string;
  critical?: boolean;
};

const englishItems = checklistItems.en as SourceChecklistItem[];
const turkishItems = checklistItems.tr as SourceChecklistItem[];

const turkishItemMap = new Map(
  turkishItems.map((item) => [item.id, item]),
);

const sectionNames = Array.from(
  new Set(englishItems.map((item) => item.section)),
);

export const lotoChecklist = {
  id: "loto",
  title: {
    en: "Lockout Tagout Safety Checklist",
    tr: "Kilitleme Etiketleme Güvenlik Kontrol Listesi",
  },
  sections: sectionNames.map((sectionName, sectionIndex) => {
    const sectionItems = englishItems.filter(
      (item) => item.section === sectionName,
    );

    const firstTurkishItem = sectionItems
      .map((item) => turkishItemMap.get(item.id))
      .find(Boolean);

    return {
      id: `loto-section-${sectionIndex + 1}`,
      title: {
        en: sectionName,
        tr: firstTurkishItem?.section ?? sectionName,
      },
      items: sectionItems.map((item) => {
        const turkishItem = turkishItemMap.get(item.id);
        const critical = Boolean(item.critical);

        return {
          id: item.id,
          requirement: {
            en: item.text,
            tr: turkishItem?.text ?? item.text,
          },
          critical,
          riskLevel: critical ? "Critical" : "Medium",
          applicability: "LOTO",
          guidance: {
            en: critical
              ? "Do not proceed until this critical LOTO requirement has been verified and any deficiency has been corrected."
              : "Verify this LOTO requirement at the work location and record any identified deficiency.",
            tr: critical
              ? "Bu kritik LOTO gerekliliği doğrulanmadan ve eksiklik giderilmeden çalışmaya devam etmeyin."
              : "Bu LOTO gerekliliğini çalışma alanında doğrulayın ve tespit edilen eksikliği kayıt altına alın.",
          },
          correctiveAction: {
            en: critical
              ? "Stop the activity, isolate all hazardous energy sources and correct the deficiency before work resumes."
              : "Correct the identified LOTO deficiency and verify the control before continuing the activity.",
            tr: critical
              ? "Faaliyeti durdurun, tüm tehlikeli enerji kaynaklarını izole edin ve çalışma yeniden başlamadan önce eksikliği giderin."
              : "Tespit edilen LOTO eksikliğini giderin ve faaliyete devam etmeden önce kontrolü doğrulayın.",
          },
          references: [
            "OSHA 29 CFR 1910.147",
          ],
        };
      }),
    };
  }),
} as unknown as ChecklistDocument;
