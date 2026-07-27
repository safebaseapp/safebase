export type AssessmentLanguage = "en" | "tr";

export type AssessmentRiskLevel =
  | "Low"
  | "Medium"
  | "High"
  | "Critical";

export type AssessmentWorkDecision =
  | "APPROVED"
  | "PROCEED WITH CONDITIONS"
  | "STOP WORK";

export type AssessmentFinding = {
  id?: string;
  title: string;
  description?: string;
  severity: AssessmentRiskLevel;
  recommendation?: string;
  reference?: string;
};

export type AssessmentRecommendation = {
  title: string;
  reason?: string;
  reference?: string;
  priority?: number;
};

export type ProfessionalAssessmentInput = {
  workType: string;
  language: AssessmentLanguage;

  assessmentStatus: string;
  completionRate: number;
  safetyScore: number;
  overallRisk: AssessmentRiskLevel;
  workDecision: AssessmentWorkDecision;
  permitReadiness: number;

  severityBreakdown: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };

  findings: AssessmentFinding[];
  recommendations: AssessmentRecommendation[];
  references: string[];
};

export type ProfessionalAssessmentOutput = {
  executiveAssessment: string;
  positiveFindings: string[];
  criticalConcerns: string[];
  operationalRisk: string;
  potentialConsequences: string[];

  priorityActions: {
    priority: number;
    action: string;
    reason: string;
    reference?: string;
  }[];

  applicableStandards: string[];
  finalRecommendation: AssessmentWorkDecision;
};
