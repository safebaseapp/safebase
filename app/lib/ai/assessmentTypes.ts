export type AssessmentLanguage = "en" | "tr";

export type AssessmentRiskLevel =
  | "Low"
  | "Medium"
  | "High"
  | "Critical";

export type AssessmentWorkDecision =
  | "APPROVED"
  | "HOLD"
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

export type InspectionAssessmentContext = {
  inspectionType: string;
  company: string;
  project: string;
  location: string;
  completionPercentage: number;
  complianceScore: number;
  criticalFindings: unknown[];
  nonConformities: unknown[];
  remarks: { id: string; text: string }[];
  correctiveActions: string[];
  responsiblePersons: string[];
  targetDates: string[];
  inspectionSpecificCriticalControls: string[];
  permitRelevant?: boolean;
  failedAnswers?: {
    id: string;
    question: string;
    answer: string;
    remarks?: string;
  }[];
};

export type ManagementAction = {
  priority: number;
  action: string;
  owner: string;
  timing: string;
  reason: string;
  reference?: string;
};

export type ResponsibleRole = {
  role: string;
  responsibility: string;
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
  inspectionContext?: InspectionAssessmentContext;
};

export type ProfessionalAssessmentOutput = {
  executiveSummary: string;
  overallRiskRating: {
    level: AssessmentRiskLevel;
    rationale: string;
  };
  workDecision: AssessmentWorkDecision;
  topCriticalRisks: string[];
  criticalControlFailures: string[];
  immediateActions: ManagementAction[];
  shortTermActions: ManagementAction[];
  managementActions: ManagementAction[];
  responsibleRoles: ResponsibleRole[];
  repeatedSystemicWeaknesses: string[];
  permitReadinessStatus: string | null;
  recommendedFollowUpInspection: string;
  managementConclusion: string;

  // Kept for the existing six inspection renderers.
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
