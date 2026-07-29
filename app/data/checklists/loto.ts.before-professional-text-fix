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
              ? `Stop the activity and verify the critical requirement: "${item.text}". Work must not resume until the requirement is fully satisfied.`
              : `Verify the following requirement at the work location: "${item.text}". Record and communicate any identified deficiency.`,
            tr: critical
              ? `Faaliyeti durdurun ve şu kritik gerekliliği doğrulayın: "${turkishItem?.text ?? item.text}". Gereklilik tamamen sağlanmadan çalışma yeniden başlatılmamalıdır.`
              : `Şu gerekliliği çalışma alanında doğrulayın: "${turkishItem?.text ?? item.text}". Tespit edilen eksikliği kayıt altına alın ve ilgili kişilere bildirin.`,
          },
          correctiveAction: {
            en: critical
              ? `Stop work, maintain hazardous-energy isolation and correct the deficiency related to: "${item.text}". Reverify the isolation before work resumes.`
              : `Correct the deficiency related to: "${item.text}". Confirm the control is effective before continuing the activity.`,
            tr: critical
              ? `Çalışmayı durdurun, tehlikeli enerji izolasyonunu koruyun ve şu maddeyle ilgili eksikliği giderin: "${turkishItem?.text ?? item.text}". Çalışma yeniden başlamadan önce izolasyonu tekrar doğrulayın.`
              : `Şu maddeyle ilgili eksikliği giderin: "${turkishItem?.text ?? item.text}". Faaliyete devam etmeden önce kontrolün etkili olduğunu doğrulayın.`,
          },
          references: [
            "OSHA 29 CFR 1910.147",
          ],
        };
      }),
    };
  }),
} as unknown as ChecklistDocument;
