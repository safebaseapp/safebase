import type {
  ProfessionalAssessmentInput,
  ProfessionalAssessmentOutput,
} from "@/lib/ai/assessmentTypes";

export async function generateAssessment(
  input: ProfessionalAssessmentInput,
): Promise<ProfessionalAssessmentOutput> {
  const response = await fetch("/api/ai/assessment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || "AI assessment failed.");
  }

  return data.assessment;
}
