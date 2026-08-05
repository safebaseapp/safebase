export const riskLevels = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL",
  "UNDETERMINED",
] as const;

export type CopilotRiskLevel = (typeof riskLevels)[number];

export type CopilotResponse = {
  version: "1.0";
  mode: "general-guidance" | "operational-assessment";
  title: string;
  summary: string;
  riskLevel: CopilotRiskLevel;
  riskReason: string | null;
  hazards: string[];
  criticalControls: string[];
  requiredPpe: string[];
  permitsAndDocuments: string[];
  beforeStarting: string[];
  duringWork: string[];
  afterCompletion: string[];
  stopWorkConditions: string[];
  commonFailures: string[];
  applicableStandards: string[];
  quickChecklist: string[];
  recommendation: string;
  clarificationQuestions: string[];
  relatedTopics: string[];
};

export type CopilotParseResult =
  | {
      success: true;
      data: CopilotResponse;
    }
  | {
      success: false;
      error: string;
    };
