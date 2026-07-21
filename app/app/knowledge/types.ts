export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface LocalizedText {
  en: string;
  tr: string;
}

export interface KnowledgeItem {
  id: string;

  title: LocalizedText;

  risk: RiskLevel;

  difficulty: 1 | 2 | 3 | 4 | 5;

  inspectionTime: string;

  why: LocalizedText;

  howToInspect: LocalizedText[];

  commonMistakes: LocalizedText[];

  requiredPPE: LocalizedText[];

  requiredCompetency: LocalizedText;

  references: string[];

  relatedDocuments: LocalizedText[];

  aiPrompt: LocalizedText;
}