import type {
  ProfessionalAssessmentInput,
  ProfessionalAssessmentOutput,
} from "@/lib/ai/assessmentTypes";

function buildRuleEngineFallback(
  input: ProfessionalAssessmentInput,
): ProfessionalAssessmentOutput {
  const isTurkish = input.language === "tr";
  const partial =
    input.assessmentStatus.toLowerCase() === "partial" ||
    input.completionRate < 100;

  const highRiskFindings = input.findings.filter(
    (finding) => finding.severity === "Critical" || finding.severity === "High",
  );
  const criticalFindings = input.findings.filter(
    (finding) => finding.severity === "Critical",
  );

  const topCriticalRisks = highRiskFindings
    .slice(0, 5)
    .map((finding) => finding.title)
    .filter(Boolean);

  const criticalControlFailures = criticalFindings
    .slice(0, 5)
    .map((finding) => finding.title)
    .filter(Boolean);

  const references = Array.from(
    new Set(
      [
        ...input.references,
        ...input.findings.map((finding) => finding.reference).filter(Boolean),
      ].filter((value): value is string => Boolean(value)),
    ),
  );

  const fallbackMessage = isTurkish
    ? "AI servisi geçici olarak yanıt vermedi. Bu yönetim özeti SERNEM kural motorunun doğrulanmış denetim sonuçlarından oluşturuldu."
    : "The AI service did not respond temporarily. This management summary was generated from the verified SERNEM rule-engine inspection results.";

  const statusMessage = partial
    ? isTurkish
      ? `Denetim %${input.completionRate} tamamlandı ve henüz tamamlanmamış durumda.`
      : `The inspection is ${input.completionRate}% complete and remains incomplete.`
    : isTurkish
      ? "Denetim tamamlandı."
      : "The inspection is complete.";

  const decisionMessage = isTurkish
    ? `Kural motoru iş kararı: ${input.workDecision}. Genel risk: ${input.overallRisk}. Güvenlik skoru: ${input.safetyScore}/100.`
    : `Rule-engine work decision: ${input.workDecision}. Overall risk: ${input.overallRisk}. Safety score: ${input.safetyScore}/100.`;

  const immediateActions = input.findings.slice(0, 5).map((finding, index) => ({
    priority: index + 1,
    action:
      finding.recommendation ||
      (isTurkish
        ? `${finding.title} bulgusunu doğrulayın ve kapatın.`
        : `Verify and close the finding: ${finding.title}.`),
    owner: isTurkish ? "Saha / HSE sorumlusu" : "Site / HSE responsible role",
    timing: finding.severity === "Critical" ? "0–24 h" : "1–7 days",
    reason:
      isTurkish
        ? `${finding.severity} seviyesindeki doğrulanmış bulgu.`
        : `Confirmed ${finding.severity} finding.`,
    reference: finding.reference,
  }));

  const priorityActions = input.findings.slice(0, 5).map((finding, index) => ({
    priority: index + 1,
    action:
      finding.recommendation ||
      (isTurkish
        ? `${finding.title} bulgusunu doğrulayın ve kapatın.`
        : `Verify and close the finding: ${finding.title}.`),
    reason:
      isTurkish
        ? `${finding.severity} seviyesindeki doğrulanmış bulgu.`
        : `Confirmed ${finding.severity} finding.`,
    reference: finding.reference,
  }));

  return {
    executiveSummary: `${fallbackMessage} ${statusMessage} ${decisionMessage}`,
    overallRiskRating: {
      level: input.overallRisk,
      rationale: isTurkish
        ? `Risk seviyesi SERNEM kural motorunun doğrulanmış bulgularına göre ${input.overallRisk} olarak hesaplandı.`
        : `The risk level was calculated as ${input.overallRisk} from verified SERNEM rule-engine findings.`,
    },
    workDecision: input.workDecision,
    topCriticalRisks,
    criticalControlFailures,
    immediateActions,
    shortTermActions: [],
    managementActions: [],
    responsibleRoles: [],
    repeatedSystemicWeaknesses: [],
    permitReadinessStatus:
      input.inspectionContext?.permitRelevant
        ? `${input.permitReadiness}%`
        : null,
    recommendedFollowUpInspection: isTurkish
      ? "Açık bulgular kapatıldıktan sonra ilgili kontrol maddeleri yeniden doğrulanmalıdır."
      : "Relevant inspection items should be re-verified after open findings are closed.",
    managementConclusion: `${fallbackMessage} ${decisionMessage}`,
    executiveAssessment: `${fallbackMessage} ${decisionMessage}`,
    positiveFindings: [],
    criticalConcerns: topCriticalRisks,
    operationalRisk: isTurkish
      ? `Operasyonel karar SERNEM kural motorunun ${input.workDecision} sonucuna göre uygulanmalıdır.`
      : `The operational decision must follow the SERNEM rule-engine result: ${input.workDecision}.`,
    potentialConsequences: [],
    priorityActions,
    applicableStandards: references,
    finalRecommendation: input.workDecision,
  };
}

export async function generateAssessment(
  input: ProfessionalAssessmentInput,
): Promise<ProfessionalAssessmentOutput> {
  try {
    const response = await fetch("/api/ai/assessment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : null;

    if (!response.ok || !data?.success || !data.assessment) {
      throw new Error(data?.error || `AI assessment failed (${response.status}).`);
    }

    return data.assessment as ProfessionalAssessmentOutput;
  } catch (error) {
    console.error("SERNEM AI assessment fallback activated:", error);
    return buildRuleEngineFallback(input);
  }
}
