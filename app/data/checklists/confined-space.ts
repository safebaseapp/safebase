import { checklistItems } from "../../app/[locale]/checklists/confined-space/checklistData";
import type { ChecklistDocument } from "./hot-work";

const englishItems = checklistItems.en;
const turkishItems = checklistItems.tr;

const turkishItemMap = new Map(
  turkishItems.map((item) => [item.id, item]),
);

const sectionMap = new Map<
  string,
  {
    title: {
      en: string;
      tr: string;
    };
    items: Array<{
      id: string;
      requirement: {
        en: string;
        tr: string;
      };
      critical: boolean;
      riskLevel: "Critical" | "Medium";
      applicability: string;
      guidance: {
        en: string;
        tr: string;
      };
      correctiveAction: {
        en: string;
        tr: string;
      };
      references: string[];
    }>;
  }
>();

for (const englishItem of englishItems) {
  const turkishItem = turkishItemMap.get(englishItem.id);

  if (!turkishItem) {
    throw new Error(
      `Turkish checklist item not found for: ${englishItem.id}`,
    );
  }

  if (!sectionMap.has(englishItem.section)) {
    sectionMap.set(englishItem.section, {
      title: {
        en: englishItem.section,
        tr: turkishItem.section,
      },
      items: [],
    });
  }

  sectionMap.get(englishItem.section)?.items.push({
    id: englishItem.id,

    requirement: {
      en: englishItem.text,
      tr: turkishItem.text,
    },

    critical: Boolean(englishItem.critical),

    riskLevel: englishItem.critical ? "Critical" : "Medium",

    applicability: "Confined space entry operations",

    guidance: {
      en: englishItem.critical
        ? "This is a critical confined-space entry control. Entry must not begin or continue unless the requirement is fully verified."
        : "Verify this control before entry and maintain it throughout the confined-space activity.",

      tr: englishItem.critical
        ? "Bu, kritik bir kapalı alan giriş kontrolüdür. Gereklilik tamamen doğrulanmadan giriş başlatılmamalı veya sürdürülmemelidir."
        : "Bu kontrolü girişten önce doğrulayın ve kapalı alan çalışması boyunca sürdürün.",
    },

    correctiveAction: {
      en: englishItem.critical
        ? "Stop entry, correct the deficiency, obtain verification from the responsible supervisor and revalidate the confined-space entry permit."
        : "Record the deficiency, assign a responsible person and complete the corrective action before final authorization.",

      tr: englishItem.critical
        ? "Girişi durdurun, eksikliği giderin, sorumlu amirden doğrulama alın ve kapalı alan giriş iznini yeniden geçerli hâle getirin."
        : "Eksikliği kayıt altına alın, sorumlu kişi atayın ve son yetkilendirmeden önce düzeltici faaliyeti tamamlayın.",
    },

    references: [
      "OSHA 29 CFR 1910.146",
      "Site confined space entry procedure",
      "Site permit-to-work procedure",
    ],
  });
}

export const confinedSpaceChecklist = {
  id: "confined-space-entry",

  title: {
    en: "Confined Space Entry Safety Checklist",
    tr: "Kapalı Alan Giriş Güvenliği Kontrol Listesi",
  },

  sections: Array.from(sectionMap.values()),
} as ChecklistDocument;
