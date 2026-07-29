import { confinedSpaceChecklist } from "../../data/checklists/confined-space";
import {
  hotWorkChecklist,
  type ChecklistDocument,
} from "../../data/checklists/hot-work";

export type ChecklistAnswerValue = "Yes" | "No" | "N/A";
export type SupportedLocale = "en" | "tr";

export interface ChecklistAnswer {
  id: string;
  answer: ChecklistAnswerValue;
  remarks?: string;
}

export type AnalysisRiskLevel = "Low" | "Medium" | "High" | "Critical";

export type AssessmentStatus = "Partial" | "Complete";

export type WorkDecision =
  | "Stop Work"
  | "Incomplete Assessment"
  | "Proceed With Conditions"
  | "Work May Proceed";

export interface SeverityBreakdown {
  Critical: number;
  High: number;
  Medium: number;
  Low: number;
}

export interface ChecklistFinding {
  id: string;
  requirement: string;
  answer: ChecklistAnswerValue;
  remarks?: string;
  critical: boolean;
  riskLevel: string;
  guidance: string;
  correctiveAction: string;
  references: string[];
}

export interface ChecklistAnalysisResult {
  checklistId: string;
  checklistTitle: string;
  locale: SupportedLocale;

  overallRisk: AnalysisRiskLevel;
  score: number;

  assessmentStatus: AssessmentStatus;
  completionRate: number;
  permitReadiness: number;
  workDecision: WorkDecision;
  severityBreakdown: SeverityBreakdown;

  totalItems: number;
  answeredItems: number;
  applicableItems: number;
  compliantItems: number;
  nonCompliantItems: number;
  notApplicableItems: number;
  unansweredItems: number;

  criticalFindings: ChecklistFinding[];
  findings: ChecklistFinding[];
  correctiveActions: string[];
  recommendations: string[];
  references: string[];

  summary: string;
  canWorkProceed: boolean;
}

type LocalizedValue = {
  en: string;
  tr: string;
};

type ChecklistItemShape = {
  id: string;
  requirement: LocalizedValue;
  critical: boolean;
  riskLevel: string;
  applicability?: string;
  guidance: LocalizedValue;
  correctiveAction: LocalizedValue;
  references?: string[];
};

function getLocalizedText(
  value: LocalizedValue | undefined,
  locale: SupportedLocale,
): string {
  if (!value) {
    return "";
  }

  return value[locale] || value.en || "";
}

function normalizeRiskLevel(riskLevel: string): AnalysisRiskLevel {
  const normalized = riskLevel.trim().toLowerCase();

  if (normalized === "critical") return "Critical";
  if (normalized === "high") return "High";
  if (normalized === "medium") return "Medium";

  return "Low";
}

function getRiskWeight(
  riskLevel: string,
  critical: boolean,
): number {
  if (critical) {
    return 10;
  }

  switch (normalizeRiskLevel(riskLevel)) {
    case "Critical":
      return 10;
    case "High":
      return 7;
    case "Medium":
      return 4;
    case "Low":
    default:
      return 2;
  }
}

function getOverallRisk(
  findings: ChecklistFinding[],
): AnalysisRiskLevel {
  if (findings.some((finding) => finding.critical)) {
    return "Critical";
  }

  if (
    findings.some(
      (finding) => normalizeRiskLevel(finding.riskLevel) === "Critical",
    )
  ) {
    return "Critical";
  }

  if (
    findings.some(
      (finding) => normalizeRiskLevel(finding.riskLevel) === "High",
    )
  ) {
    return "High";
  }

  if (
    findings.some(
      (finding) => normalizeRiskLevel(finding.riskLevel) === "Medium",
    )
  ) {
    return "Medium";
  }

  return findings.length > 0 ? "Low" : "Low";
}

function getWorkDecision(
  overallRisk: AnalysisRiskLevel,
  findings: ChecklistFinding[],
  unansweredItems: number,
): WorkDecision {
  if (
    overallRisk === "Critical" ||
    overallRisk === "High" ||
    findings.some((finding) => finding.critical)
  ) {
    return "Stop Work";
  }

  if (unansweredItems > 0) {
    return "Incomplete Assessment";
  }

  if (findings.length > 0) {
    return "Proceed With Conditions";
  }

  return "Work May Proceed";
}

function buildSeverityBreakdown(
  findings: ChecklistFinding[],
): SeverityBreakdown {
  return findings.reduce<SeverityBreakdown>(
    (result, finding) => {
      const level = normalizeRiskLevel(finding.riskLevel);
      result[level] += 1;
      return result;
    },
    {
      Critical: 0,
      High: 0,
      Medium: 0,
      Low: 0,
    },
  );
}

function buildRecommendations(
  overallRisk: AnalysisRiskLevel,
  findings: ChecklistFinding[],
  unansweredItems: number,
  locale: SupportedLocale,
): string[] {
  const recommendations: string[] = [];

  if (locale === "tr") {
    if (overallRisk === "Critical") {
      recommendations.push(
        "Kritik uygunsuzluklar giderilmeden sıcak çalışmayı başlatmayın veya devam ettirmeyin.",
      );
      recommendations.push(
        "Çalışmayı durdurun ve sorumlu saha amiri ile HSE ekibine derhal bildirim yapın.",
      );
    } else if (overallRisk === "High") {
      recommendations.push(
        "Yüksek riskli uygunsuzluklar kapatılmadan çalışma izni verilmemelidir.",
      );
    } else if (overallRisk === "Medium") {
      recommendations.push(
        "Tespit edilen uygunsuzluklar için sorumlu kişi ve tamamlanma süresi belirleyin.",
      );
    } else if (findings.length > 0) {
      recommendations.push(
        "Düşük riskli bulguları kayıt altına alın ve planlanan süre içerisinde kapatın.",
      );
    } else {
      recommendations.push(
        "Kontrol listesinde uygunsuzluk tespit edilmedi. Saha koşullarını çalışma boyunca izlemeye devam edin.",
      );
    }

    if (unansweredItems > 0) {
      recommendations.push(
        `${unansweredItems} kontrol maddesi henüz cevaplanmadı. Analizi tamamlamadan önce bu maddeleri değerlendirin.`,
      );
    }

    if (findings.some((finding) => finding.critical)) {
      recommendations.push(
        "Kritik bulgular kapatıldıktan sonra yeniden saha kontrolü gerçekleştirin ve çalışma iznini tekrar doğrulayın.",
      );
    }
  } else {
    if (overallRisk === "Critical") {
      recommendations.push(
        "Do not start or continue hot work until all critical non-conformities have been corrected.",
      );
      recommendations.push(
        "Stop the activity and immediately notify the responsible supervisor and HSE team.",
      );
    } else if (overallRisk === "High") {
      recommendations.push(
        "Hot work should not be authorized until all high-risk findings have been closed.",
      );
    } else if (overallRisk === "Medium") {
      recommendations.push(
        "Assign an accountable person and target completion date for every identified finding.",
      );
    } else if (findings.length > 0) {
      recommendations.push(
        "Record low-risk findings and close them within the agreed corrective-action period.",
      );
    } else {
      recommendations.push(
        "No non-conformities were identified. Continue monitoring site conditions throughout the work.",
      );
    }

    if (unansweredItems > 0) {
      recommendations.push(
        `${unansweredItems} checklist item(s) remain unanswered. Complete them before finalizing the assessment.`,
      );
    }

    if (findings.some((finding) => finding.critical)) {
      recommendations.push(
        "After closing critical findings, repeat the field inspection and revalidate the permit before work resumes.",
      );
    }
  }

  return [...new Set(recommendations)];
}

function buildSummary(
  score: number,
  overallRisk: AnalysisRiskLevel,
  nonCompliantItems: number,
  criticalFindings: number,
  unansweredItems: number,
  totalItems: number,
  locale: SupportedLocale,
): string {
  const completedItems = totalItems - unansweredItems;
  const isPartial = unansweredItems > 0;

  if (locale === "tr") {
    return [
      isPartial
        ? `Bu, tamamlanan ${completedItems}/${totalItems} maddeye dayalı kısmi bir değerlendirmedir.`
        : "Tüm kontrol maddelerine dayalı nihai değerlendirme tamamlandı.",
      `Güvenlik skoru ${score}/100 olarak hesaplandı.`,
      `Genel risk seviyesi: ${overallRisk}.`,
      `${nonCompliantItems} uygunsuzluk ve ${criticalFindings} kritik bulgu tespit edildi.`,
    ].join(" ");
  }

  return [
    isPartial
      ? `This is a partial assessment based on ${completedItems}/${totalItems} completed checklist items.`
      : "The final assessment has been completed using all checklist items.",
    `The safety score is ${score}/100.`,
    `Overall risk level: ${overallRisk}.`,
    `${nonCompliantItems} non-conformity finding(s) and ${criticalFindings} critical finding(s) were identified.`,
  ].join(" ");
}

export function analyzeChecklist(
  document: ChecklistDocument,
  answers: ChecklistAnswer[],
  locale: SupportedLocale = "en",
): ChecklistAnalysisResult {
  const items = document.sections.flatMap(
    (section) => section.items,
  ) as ChecklistItemShape[];

  const answerMap = new Map(
    answers.map((answer) => [answer.id, answer]),
  );

  const findings: ChecklistFinding[] = [];

  let compliantItems = 0;
  let notApplicableItems = 0;
  let unansweredItems = 0;

  let totalPossibleRiskWeight = 0;
  let failedRiskWeight = 0;

  for (const item of items) {
    const response = answerMap.get(item.id);

    if (!response) {
      unansweredItems += 1;
      continue;
    }

    if (response.answer === "N/A") {
      notApplicableItems += 1;
      continue;
    }

    const riskWeight = getRiskWeight(
      item.riskLevel,
      item.critical,
    );

    totalPossibleRiskWeight += riskWeight;

    if (response.answer === "Yes") {
      compliantItems += 1;
      continue;
    }

    failedRiskWeight += riskWeight;

    findings.push({
      id: item.id,
      requirement: getLocalizedText(
        item.requirement,
        locale,
      ),
      answer: response.answer,
      remarks: response.remarks,
      critical: item.critical,
      riskLevel: item.riskLevel,
      guidance: getLocalizedText(
        item.guidance,
        locale,
      ),
      correctiveAction: getLocalizedText(
        item.correctiveAction,
        locale,
      ),
      references: item.references ?? [],
    });
  }

  const applicableItems =
    compliantItems + findings.length;

  const score =
    totalPossibleRiskWeight === 0
      ? 0
      : Math.max(
          0,
          Math.round(
            100 -
              (failedRiskWeight /
                totalPossibleRiskWeight) *
                100,
          ),
        );

  const criticalFindings = findings.filter(
    (finding) => finding.critical,
  );

  const overallRisk = getOverallRisk(findings);

  const correctiveActions = [
    ...new Set(
      findings
        .map((finding) => finding.correctiveAction)
        .filter(Boolean),
    ),
  ];

  const references = [
    ...new Set(
      findings.flatMap(
        (finding) => finding.references,
      ),
    ),
  ];

  const recommendations = buildRecommendations(
    overallRisk,
    findings,
    unansweredItems,
    locale,
  );

  const checklistTitle = getLocalizedText(
    document.title,
    locale,
  );

  const assessmentStatus: AssessmentStatus =
    unansweredItems === 0 ? "Complete" : "Partial";

  const completionRate =
    items.length === 0
      ? 0
      : Math.round(((items.length - unansweredItems) / items.length) * 100);

  const severityBreakdown = buildSeverityBreakdown(findings);

  const permitReadiness = Math.max(
    0,
    Math.min(
      100,
      completionRate -
        severityBreakdown.Critical * 40 -
        severityBreakdown.High * 15 -
        severityBreakdown.Medium * 7 -
        severityBreakdown.Low * 3,
    ),
  );

  const workDecision = getWorkDecision(
    overallRisk,
    findings,
    unansweredItems,
  );

  const canWorkProceed =
    workDecision === "Work May Proceed" ||
    workDecision === "Proceed With Conditions";

  return {
    checklistId: document.id,
    checklistTitle,
    locale,

    overallRisk,
    score,

    assessmentStatus,
    completionRate,
    permitReadiness,
    workDecision,
    severityBreakdown,

    totalItems: items.length,
    answeredItems: answers.filter((answer) =>
      items.some((item) => item.id === answer.id),
    ).length,
    applicableItems,
    compliantItems,
    nonCompliantItems: findings.length,
    notApplicableItems,
    unansweredItems,

    criticalFindings,
    findings,
    correctiveActions,
    recommendations,
    references,

    summary: buildSummary(
      score,
      overallRisk,
      findings.length,
      criticalFindings.length,
      unansweredItems,
      items.length,
      locale,
    ),

    canWorkProceed,
  };
}

export function analyzeHotWorkChecklist(
  answers: ChecklistAnswer[],
  locale: SupportedLocale = "en",
): ChecklistAnalysisResult {
  return analyzeChecklist(
    hotWorkChecklist,
    answers,
    locale,
  );
}

export function analyzeConfinedSpaceChecklist(
  answers: ChecklistAnswer[],
  locale: SupportedLocale = "en",
): ChecklistAnalysisResult {
  return analyzeChecklist(
    confinedSpaceChecklist,
    answers,
    locale,
  );
}

