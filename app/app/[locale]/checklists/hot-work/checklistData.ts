import {
  hotWorkChecklist,
  type Applicability,
  type ChecklistLinks,
  type RiskLevel,
} from "../../../../data/checklists/hot-work";

type SupportedLocale = "en" | "tr";

export interface HotWorkUiChecklistItem {
  id: string;
  sectionId: string;
  section: string;
  text: string;
  critical: boolean;
  riskLevel: RiskLevel;
  applicability: Applicability;
  guidance: string;
  correctiveAction: string;
  references: string[];
  related: ChecklistLinks;
}

function createChecklistItems(
  locale: SupportedLocale,
): HotWorkUiChecklistItem[] {
  return hotWorkChecklist.sections.flatMap((section) =>
    section.items.map((item) => ({
      id: item.id,
      sectionId: section.id,
      section: section.title[locale],
      text: item.requirement[locale],
      critical: item.critical,
      riskLevel: item.riskLevel,
      applicability: item.applicability,
      guidance: item.guidance[locale],
      correctiveAction: item.correctiveAction[locale],
      references: item.references,
      related: item.related,
    })),
  );
}

export const checklistItems: Record<
  SupportedLocale,
  HotWorkUiChecklistItem[]
> = {
  en: createChecklistItems("en"),
  tr: createChecklistItems("tr"),
};
