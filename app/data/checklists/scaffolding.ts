import { checklistItems } from "../../app/[locale]/checklists/scaffold/checklistData";
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

export const scaffoldingChecklist = {
  id: "scaffolding",
  title: {
    en: "Scaffold Inspection Checklist",
    tr: "İskele Denetim Kontrol Listesi",
  },
  sections: sectionNames.map((sectionName, sectionIndex) => {
    const sectionItems = englishItems.filter(
      (item) => item.section === sectionName,
    );

    const firstTurkishItem = sectionItems
      .map((item) => turkishItemMap.get(item.id))
      .find(Boolean);

    return {
      id: `scaffolding-section-${sectionIndex + 1}`,
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
          applicability: "Scaffolding",
          guidance: {
            en: critical
              ? `Stop use of the scaffold and verify the critical requirement: "${item.text}". The scaffold must not be released until the requirement is fully satisfied.`
              : `Verify the following scaffold requirement at the work location: "${item.text}". Record and communicate any identified deficiency.`,
            tr: critical
              ? `İskelenin kullanımını durdurun ve şu kritik gerekliliği doğrulayın: "${turkishText}". Gereklilik tamamen sağlanmadan iskele kullanıma açılmamalıdır.`
              : `Şu iskele gerekliliğini çalışma alanında doğrulayın: "${turkishText}". Tespit edilen eksikliği kayıt altına alın ve ilgili kişilere bildirin.`,
          },
          correctiveAction: {
            en: critical
              ? `Prevent use of the scaffold and correct the deficiency related to: "${item.text}". Reinspect and formally release the scaffold before use resumes.`
              : `Correct the deficiency related to: "${item.text}". Confirm the control is effective before allowing continued use.`,
            tr: critical
              ? `İskelenin kullanımını engelleyin ve şu maddeyle ilgili eksikliği giderin: "${turkishText}". Kullanıma devam edilmeden önce iskeleyi yeniden denetleyin ve resmi olarak kullanıma açın.`
              : `Şu maddeyle ilgili eksikliği giderin: "${turkishText}". Kullanıma devam etmeden önce kontrolün etkili olduğunu doğrulayın.`,
          },
          references: [
            "OSHA 29 CFR 1926 Subpart L",
            "OSHA 29 CFR 1926.451",
            "OSHA 29 CFR 1926.454",
          ],
        };
      }),
    };
  }),
} as unknown as ChecklistDocument;
