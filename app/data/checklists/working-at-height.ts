import { checklistItems } from "../../app/[locale]/checklists/work-at-height/checklistData";
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

export const workingAtHeightChecklist = {
  id: "working-at-height",
  title: {
    en: "Working at Height Safety Checklist",
    tr: "Yüksekte Çalışma Güvenlik Kontrol Listesi",
  },
  sections: sectionNames.map((sectionName, sectionIndex) => {
    const sectionItems = englishItems.filter(
      (item) => item.section === sectionName,
    );

    const firstTurkishItem = sectionItems
      .map((item) => turkishItemMap.get(item.id))
      .find(Boolean);

    return {
      id: `working-at-height-section-${sectionIndex + 1}`,
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
          applicability: "Working at Height",
          guidance: {
            en: critical
              ? `Stop the activity and verify the critical working-at-height requirement: "${item.text}". Work must not resume until effective fall-prevention or fall-protection controls are confirmed.`
              : `Verify the following working-at-height requirement at the work location: "${item.text}". Record and communicate any identified deficiency.`,
            tr: critical
              ? `Faaliyeti durdurun ve şu kritik yüksekte çalışma gerekliliğini doğrulayın: "${turkishText}". Etkili düşmeyi önleme veya düşüşten korunma tedbirleri doğrulanmadan çalışma yeniden başlatılmamalıdır.`
              : `Şu yüksekte çalışma gerekliliğini çalışma alanında doğrulayın: "${turkishText}". Tespit edilen eksikliği kayıt altına alın ve ilgili kişilere bildirin.`,
          },
          correctiveAction: {
            en: critical
              ? `Stop work and correct the deficiency related to: "${item.text}". Establish effective fall-prevention or fall-protection controls and reverify them before work resumes.`
              : `Correct the deficiency related to: "${item.text}". Confirm the control is effective before continuing the activity.`,
            tr: critical
              ? `Çalışmayı durdurun ve şu maddeyle ilgili eksikliği giderin: "${turkishText}". Etkili düşmeyi önleme veya düşüşten korunma tedbirlerini sağlayın ve çalışmaya başlamadan önce tekrar doğrulayın.`
              : `Şu maddeyle ilgili eksikliği giderin: "${turkishText}". Faaliyete devam etmeden önce kontrolün etkili olduğunu doğrulayın.`,
          },
          references: [
            "OSHA 29 CFR 1926.501",
            "OSHA 29 CFR 1926.502",
            "OSHA 29 CFR 1926.503",
          ],
        };
      }),
    };
  }),
} as unknown as ChecklistDocument;
