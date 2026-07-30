import { checklistItems } from "../../app/[locale]/checklists/lifting/checklistData";
import type { ChecklistDocument } from "./hot-work";

type SourceChecklistItem = {
  id: string;
  section: string;
  text: string;
  critical?: boolean;
};

const englishItems = checklistItems.en as SourceChecklistItem[];
const turkishItems = checklistItems.tr as SourceChecklistItem[];

const turkishItemMap = new Map(turkishItems.map((item) => [item.id, item]));

const sectionNames = Array.from(
  new Set(englishItems.map((item) => item.section)),
);

export const liftingChecklist = {
  id: "lifting",
  title: {
    en: "Lifting Operations Inspection Checklist",
    tr: "Kaldırma Operasyonları Denetim Kontrol Listesi",
  },
  sections: sectionNames.map((sectionName, sectionIndex) => {
    const sectionItems = englishItems.filter(
      (item) => item.section === sectionName,
    );

    const firstTurkishItem = sectionItems
      .map((item) => turkishItemMap.get(item.id))
      .find(Boolean);

    return {
      id: `lifting-section-${sectionIndex + 1}`,
      title: {
        en: sectionName,
        tr: firstTurkishItem?.section ?? sectionName,
      },
      items: sectionItems.map((item) => {
        const turkishItem = turkishItemMap.get(item.id);
        const critical = Boolean(item.critical);
        const turkishText = turkishItem?.text ?? item.text;

        return {
          id: item.id,
          requirement: {
            en: item.text,
            tr: turkishText,
          },
          critical,
          riskLevel: critical ? "Critical" : "Medium",
          applicability: "Lifting Operations",
          guidance: {
            en: critical
              ? `Stop the lifting operation and verify the critical requirement: "${item.text}". The lift must not continue until the requirement is fully satisfied.`
              : `Verify the following lifting requirement: "${item.text}". Record and communicate any deficiency.`,
            tr: critical
              ? `Kaldırma operasyonunu durdurun ve şu kritik gerekliliği doğrulayın: "${turkishText}". Gereklilik tamamen sağlanmadan operasyona devam edilmemelidir.`
              : `Şu kaldırma gerekliliğini doğrulayın: "${turkishText}". Tespit edilen eksikliği kayıt altına alın ve bildirin.`,
          },
          correctiveAction: {
            en: critical
              ? `Stop the lift, secure the load and correct the deficiency related to: "${item.text}". Reverify all controls before resuming.`
              : `Correct the deficiency related to: "${item.text}". Confirm the control is effective before continuing.`,
            tr: critical
              ? `Kaldırmayı durdurun, yükü güvenli hale getirin ve şu maddeyle ilgili eksikliği giderin: "${turkishText}". Devam etmeden önce tüm kontrolleri yeniden doğrulayın.`
              : `Şu maddeyle ilgili eksikliği giderin: "${turkishText}". Devam etmeden önce kontrolün etkili olduğunu doğrulayın.`,
          },
          references: [
            "OSHA 29 CFR 1926 Subpart CC",
            "OSHA 29 CFR 1926.1417",
            "OSHA 29 CFR 1926.1425",
          ],
        };
      }),
    };
  }),
} as unknown as ChecklistDocument;
