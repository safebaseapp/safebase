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
    max_output_tokens: 3000,
    reasoning: {
      effort: "low",
    },
    text: {
      format: {
        type: "json_schema",
        name: "professional_hse_assessment",
        description:
          "A structured professional HSE assessment generated from SafeBase rule-engine results.",
        strict: true,
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            executiveAssessment: {
              type: "string",
            },
            positiveFindings: {
              type: "array",
              items: {
                type: "string",
              },
            },
            criticalConcerns: {
              type: "array",
              items: {
                type: "string",
              },
            },
            operationalRisk: {
              type: "string",
            },
            potentialConsequences: {
              type: "array",
              items: {
                type: "string",
              },
            },
            priorityActions: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                properties: {
                  priority: {
                    type: "integer",
                    minimum: 1,
                  },
                  action: {
                    type: "string",
                  },
                  reason: {
                    type: "string",
                  },
                  reference: {
                    type: "string",
                  },
                },
                required: [
                  "priority",
                  "action",
                  "reason",
                  "reference",
                ],
              },
            },
            applicableStandards: {
              type: "array",
              items: {
                type: "string",
              },
            },
            finalRecommendation: {
              type: "string",
              enum: [
                "APPROVED",
                "PROCEED WITH CONDITIONS",
                "STOP WORK",
              ],
            },
          },
          required: [
            "executiveAssessment",
            "positiveFindings",
            "criticalConcerns",
            "operationalRisk",
            "potentialConsequences",
            "priorityActions",
            "applicableStandards",
            "finalRecommendation",
          ],
        },
      },
    },
  });

  if (response.status === "incomplete") {
    throw new Error(
      `OpenAI response was incomplete: ${
        response.incomplete_details?.reason || "unknown reason"
      }`,
    );
  }

  if (response.status === "failed") {
    throw new Error(
      response.error?.message || "OpenAI response generation failed.",
    );
  }

  const rawResponse = response.output_text?.trim();

  if (!rawResponse) {
    throw new Error(
      `OpenAI returned no text. Response status: ${response.status}`,
    );
  }

  return parseAssessmentResponse(rawResponse, input.workDecision);
}
