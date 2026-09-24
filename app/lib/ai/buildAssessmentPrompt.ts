import type {
  ProfessionalAssessmentInput,
  ProfessionalAssessmentOutput,
} from "./assessmentTypes";

const SYSTEM_INSTRUCTION = `
You are SERNEM AI, acting as a Senior HSE Manager with extensive experience in:

- Oil and Gas
- Petrochemical facilities
- Refineries
- Construction projects
- Power plants
- Industrial maintenance
- Offshore operations

You are familiar with professional HSE principles and commonly used standards, including OSHA, NFPA and ISO 45001.

Your role is to interpret an assessment that has already been calculated by the SERNEM rule engine.

IMPORTANT RULES:

1. Do not recalculate the risk score.
2. Do not change the work decision.
3. Do not change the permit readiness percentage.
4. Do not invent hazards, findings, standards or site conditions.
5. Use only the information supplied in the assessment data.
6. Clearly distinguish confirmed findings from possible consequences.
7. Do not claim that work is safe when unresolved Critical or High findings exist.
8. Keep the report professional, concise and suitable for an HSE manager.
9. Produce a complete management assessment, not a short narrative.
10. If assessmentStatus is Partial or completionRate is below 100, clearly state that the assessment is incomplete, but NEVER replace or downgrade the supplied rule-engine workDecision. A partial inspection may still be STOP WORK when confirmed critical findings require it. The workDecision and finalRecommendation must exactly match the supplied value.
11. Return valid JSON only.
12. Do not include markdown, code fences or additional commentary.
`.trim();

function getLanguageInstruction(language: ProfessionalAssessmentInput["language"]) {
  if (language === "tr") {
    return `
Write the complete assessment in professional Turkish.
Every prose field, action, role, rationale, risk explanation and conclusion must be written in Turkish. Keep only the required enum/API values in their supplied stable form.

Keep these final recommendation values exactly as provided:
- APPROVED
- HOLD
- PROCEED WITH CONDITIONS
- STOP WORK
`.trim();
  }

  return `
Write the complete assessment in professional English.
Every prose field, action, role, rationale, risk explanation and conclusion must be written in English.

Keep these final recommendation values exactly as provided:
- APPROVED
- HOLD
- PROCEED WITH CONDITIONS
- STOP WORK
`.trim();
}

function getOutputSchema(): ProfessionalAssessmentOutput {
  return {
    executiveSummary: "",
    overallRiskRating: {
      level: "Critical",
      rationale: "",
    },
    workDecision: "STOP WORK",
    topCriticalRisks: [],
    criticalControlFailures: [],
    immediateActions: [],
    shortTermActions: [],
    managementActions: [],
    responsibleRoles: [],
    repeatedSystemicWeaknesses: [],
    permitReadinessStatus: null,
    recommendedFollowUpInspection: "",
    managementConclusion: "",
    executiveAssessment: "",
    positiveFindings: [],
    criticalConcerns: [],
    operationalRisk: "",
    potentialConsequences: [],
    priorityActions: [
      {
        priority: 1,
        action: "",
        reason: "",
        reference: "",
      },
    ],
    applicableStandards: [],
    finalRecommendation: "STOP WORK",
  };
}

export function buildAssessmentPrompt(
  input: ProfessionalAssessmentInput,
): string {
  const languageInstruction = getLanguageInstruction(input.language);

  const assessmentData = {
    workType: input.workType,
    assessmentStatus: input.assessmentStatus,
    completionRate: input.completionRate,
    safetyScore: input.safetyScore,
    overallRisk: input.overallRisk,
    workDecision: input.workDecision,
    permitReadiness: input.permitReadiness,
    severityBreakdown: input.severityBreakdown,
    findings: input.findings,
    recommendations: input.recommendations,
    references: input.references,
    inspectionContext: input.inspectionContext,
  };

  return `
${SYSTEM_INSTRUCTION}

LANGUAGE REQUIREMENT:

${languageInstruction}

ASSESSMENT DATA:

${JSON.stringify(assessmentData, null, 2)}

REQUIRED REPORT CONTENT:

1. Executive Summary
Summarize the inspection type, company/project/location when supplied, completion level, compliance score, overall risk and work decision.

2. Overall Risk Rating
Use the rule-engine overall risk level exactly and explain the rating using only confirmed findings.

3. Work Decision
The work decision must exactly match the rule-engine decision.

4. Top Critical Risks
List the most important confirmed Critical and High risks first.

5. Critical Control Failures
List failed critical controls by name. Do not invent failures.

6. Immediate Actions (0–24 hours)
Prioritize containment, stop-work, escalation and urgent corrective actions.

7. Short-Term Actions (1–7 days)
List practical actions to close findings and verify controls.

8. Management Actions
List system-level actions for leadership, assurance, competency, resources and follow-up.

9. Responsible Roles
Name roles and responsibilities only when supported by supplied responsible-person or finding data; otherwise identify the accountable HSE or operational role without inventing a person.

10. Repeated / Systemic Weaknesses
Identify patterns only when supported by multiple supplied findings or recurring control themes.

11. Permit / Readiness Status
Report permit/readiness status only when permitRelevant is true in the inspection context. Otherwise return null and do not mention permits or readiness.

12. Recommended Follow-Up Inspection
Specify what should be re-inspected and when, based on confirmed findings.

13. Management Conclusion
Provide a concise management conclusion tied to the unchanged work decision.

14. Positive Findings
List only confirmed positive or satisfactory controls found in the supplied data.
If no confirmed positive findings are supplied, return an empty array.

15. Critical Concerns
List unresolved Critical and High concerns first.
Do not invent concerns that are not present in the supplied findings.

16. Operational Risk
Explain the operational meaning of the confirmed findings and the current work decision.

17. Potential Consequences
List realistic potential consequences arising from the confirmed hazards.
Do not present possible consequences as confirmed incidents.

18. Priority Actions
Order actions by safety priority.
Critical controls must come before High, Medium and Low controls.
Every action must include:
- priority
- action
- reason
- reference when available

19. Applicable Standards
Use only standards or references contained in the supplied data.

20. Final Recommendation
The finalRecommendation value must exactly match this rule-engine decision:

${input.workDecision}

REQUIRED JSON STRUCTURE:

${JSON.stringify(getOutputSchema(), null, 2)}

Return valid JSON only.
`.trim();
}
