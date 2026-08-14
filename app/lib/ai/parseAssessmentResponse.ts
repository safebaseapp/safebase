import type {
  AssessmentWorkDecision,
  ProfessionalAssessmentOutput,
} from "./assessmentTypes";

const VALID_DECISIONS: AssessmentWorkDecision[] = [
  "APPROVED",
  "PROCEED WITH CONDITIONS",
  "STOP WORK",
];

function extractJsonObject(rawResponse: string): string {
  const cleaned = rawResponse
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("AI response does not contain a valid JSON object.");
  }

  return cleaned.slice(firstBrace, lastBrace + 1);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isValidWorkDecision(
  value: unknown,
): value is AssessmentWorkDecision {
  return (
    typeof value === "string" &&
    VALID_DECISIONS.includes(value as AssessmentWorkDecision)
  );
}

function validatePriorityActions(
  value: unknown,
): value is ProfessionalAssessmentOutput["priorityActions"] {
  if (!Array.isArray(value)) {
    return false;
  }

  return value.every((item) => {
    if (!item || typeof item !== "object") {
      return false;
    }

    const action = item as Record<string, unknown>;

    return (
      typeof action.priority === "number" &&
      Number.isInteger(action.priority) &&
      action.priority > 0 &&
      typeof action.action === "string" &&
      action.action.trim().length > 0 &&
      typeof action.reason === "string" &&
      action.reason.trim().length > 0 &&
      (action.reference === undefined ||
        typeof action.reference === "string")
    );
  });
}

function validateAssessmentOutput(
  value: unknown,
): value is ProfessionalAssessmentOutput {
  if (!value || typeof value !== "object") {
    return false;
  }

  const assessment = value as Record<string, unknown>;

  return (
    typeof assessment.executiveAssessment === "string" &&
    assessment.executiveAssessment.trim().length > 0 &&
    isStringArray(assessment.positiveFindings) &&
    isStringArray(assessment.criticalConcerns) &&
    typeof assessment.operationalRisk === "string" &&
    assessment.operationalRisk.trim().length > 0 &&
    isStringArray(assessment.potentialConsequences) &&
    validatePriorityActions(assessment.priorityActions) &&
    isStringArray(assessment.applicableStandards) &&
    isValidWorkDecision(assessment.finalRecommendation)
  );
}

export function parseAssessmentResponse(
  rawResponse: string,
  expectedDecision: AssessmentWorkDecision,
): ProfessionalAssessmentOutput {
  const jsonText = extractJsonObject(rawResponse);

  let parsed: unknown;

  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error("AI response contains invalid JSON.");
  }

  if (!validateAssessmentOutput(parsed)) {
    throw new Error("AI response does not match the required assessment schema.");
  }

  if (parsed.finalRecommendation !== expectedDecision) {
    throw new Error(
      "AI final recommendation does not match the Sernem rule-engine decision.",
    );
  }

  return {
    ...parsed,
    positiveFindings: parsed.positiveFindings
      .map((item) => item.trim())
      .filter(Boolean),
    criticalConcerns: parsed.criticalConcerns
      .map((item) => item.trim())
      .filter(Boolean),
    potentialConsequences: parsed.potentialConsequences
      .map((item) => item.trim())
      .filter(Boolean),
    applicableStandards: parsed.applicableStandards
      .map((item) => item.trim())
      .filter(Boolean),
    priorityActions: [...parsed.priorityActions]
      .sort((a, b) => a.priority - b.priority)
      .map((item) => ({
        ...item,
        action: item.action.trim(),
        reason: item.reason.trim(),
        reference: item.reference?.trim() || undefined,
      })),
  };
}
