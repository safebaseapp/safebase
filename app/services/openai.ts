import OpenAI from "openai";

import { buildAssessmentPrompt } from "@/lib/ai/buildAssessmentPrompt";
import { parseAssessmentResponse } from "@/lib/ai/parseAssessmentResponse";
import type {
  ProfessionalAssessmentInput,
  ProfessionalAssessmentOutput,
} from "@/lib/ai/assessmentTypes";

function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not configured on the SafeBase server.",
    );
  }

  return new OpenAI({ apiKey });
}

export async function generateProfessionalAssessment(
  input: ProfessionalAssessmentInput,
): Promise<ProfessionalAssessmentOutput> {
  const client = getOpenAIClient();
  const prompt = buildAssessmentPrompt(input);

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-5-mini",
    input: prompt,
    store: false,
    max_output_tokens: 1800,
  });

  const rawResponse = response.output_text?.trim();

  if (!rawResponse) {
    throw new Error("OpenAI returned an empty professional assessment.");
  }

  return parseAssessmentResponse(rawResponse, input.workDecision);
}
