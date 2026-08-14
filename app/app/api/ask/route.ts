import fs from "fs";
import path from "path";
import { parseCopilotResponse } from "@/lib/ai/copilot-parser";

import {
  guidesToAIContext,
  searchGuides,
} from "../../[locale]/knowledge-base/data/guides";

type ConversationMessage = {
  role?: unknown;
  content?: unknown;
};

type RequestBody = {
  question?: unknown;
  locale?: unknown;
  messages?: unknown;
  responseMode?: "markdown" | "structured";
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RequestBody;

    const question =
      typeof body.question === "string" ? body.question.trim() : "";

    const locale = body.locale === "tr" ? "tr" : "en";

    const responseMode =
      body.responseMode === "structured" ? "structured" : "markdown";

    const conversationMessages = Array.isArray(body.messages)
      ? body.messages
          .filter(
            (message): message is ConversationMessage =>
              typeof message === "object" &&
              message !== null &&
              "role" in message &&
              "content" in message,
          )
          .map((message) => ({
            role:
              message.role === "assistant"
                ? ("assistant" as const)
                : ("user" as const),
            content:
              typeof message.content === "string" ? message.content.trim() : "",
          }))
          .filter((message) => message.content.length > 0)
          .slice(-10)
      : [];

    if (!question) {
      return Response.json(
        {
          answer:
            locale === "tr"
              ? "Lütfen geçerli bir HSE sorusu girin."
              : "Please enter a valid HSE question.",
          sources: [],
        },
        { status: 400 },
      );
    }

    const knowledgeFolder = path.join(process.cwd(), "app", "knowledge");

    const aliasesPath = path.join(knowledgeFolder, "aliases.json");

    const aliases = JSON.parse(fs.readFileSync(aliasesPath, "utf-8")) as Record<
      string,
      string[]
    >;

    const knowledgeFiles = fs
      .readdirSync(knowledgeFolder)
      .filter((file) => file.endsWith(".md"));

    // Kaynak araması yalnızca güncel soru üzerinden yapılır.
    // Önceki konuşmalar cevap bağlamında korunur ancak rehber seçimini etkilemez.
    const normalizedQuestion = question.toLowerCase();
    const recentUserContext = conversationMessages
  .filter((message) => message.role === "user")
  .slice(-3)
  .map((message) => message.content)
  .join(" ");

const guideSearchQuery =
  recentUserContext.trim().length > 0
    ? `${recentUserContext} ${question}`
    : question;

    const guideSearchResults = searchGuides(guideSearchQuery, 5);

    console.log(
      "AI v2 Guide Matches:",
      guideSearchResults.map((result) => ({
        slug: result.guide.slug,
        score: result.score,
        matchedTerms: result.matchedTerms,
      })),
    );

    const matchedTopics = Object.entries(aliases)
      .filter(([topic, keywords]) => {
        const searchTerms = [topic, ...keywords];

        return searchTerms.some((term) =>
          normalizedQuestion.includes(term.toLowerCase()),
        );
      })
      .map(([topic]) => `${topic}.md`);

    const selectedFiles = knowledgeFiles.filter(
      (file) => matchedTopics.includes(file) || file === "ppe.md",
    );

    const filesToUse = selectedFiles.length > 0 ? selectedFiles : ["ppe.md"];

    console.log("Question:", question);
    console.log("Locale:", locale);
    console.log("Matched Topics:", matchedTopics);
    console.log("Files To Use:", filesToUse);

    const legacyKnowledge = filesToUse
      .map((file) => fs.readFileSync(path.join(knowledgeFolder, file), "utf-8"))
      .join("\n\n");

    const matchedGuides = guideSearchResults.map((result) => result.guide);

    const guideKnowledge =
      matchedGuides.length > 0
        ? guidesToAIContext(matchedGuides, locale)
        : "";

    const useGuideKnowledge = matchedGuides.length > 0;

    const responseSources = useGuideKnowledge
      ? matchedGuides.map((guide) => `${guide.slug}.md`)
      : filesToUse;


    const structuredInstruction =
      responseMode === "structured"
        ? `
===== STRUCTURED COPILOT OUTPUT =====

Return only one valid JSON object.
Do not use markdown.
Do not wrap the JSON in code fences.
Do not include text before or after the JSON.

The JSON must exactly follow this schema:

{
  "version": "1.0",
  "mode": "general-guidance" | "operational-assessment",
  "title": "string",
  "summary": "string",
  "riskLevel": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | "UNDETERMINED",
  "riskReason": "string or null",
  "hazards": ["string"],
  "criticalControls": ["string"],
  "requiredPpe": ["string"],
  "permitsAndDocuments": ["string"],
  "beforeStarting": ["string"],
  "duringWork": ["string"],
  "afterCompletion": ["string"],
  "stopWorkConditions": ["string"],
  "commonFailures": ["string"],
  "applicableStandards": ["string"],
  "quickChecklist": ["string"],
  "recommendation": "string",
  "clarificationQuestions": ["string"],
  "relatedTopics": ["string"]
}

Rules:
- Always include every field.
- Use empty arrays when a section is not relevant or unsupported.
- Use null for riskReason only when no risk judgement is appropriate.
- Use UNDETERMINED when the available information is insufficient.
- Do not invent standards, limits, measurements or legal requirements.
- Base all technical content only on the supplied Sernem Knowledge Base.
- Write all user-facing values in the requested response language.
`
        : "";

    const knowledge = useGuideKnowledge
      ? "===== SERNEM AI V2 GUIDE KNOWLEDGE =====\n\n" + guideKnowledge
      : "===== LEGACY SERNEM KNOWLEDGE =====\n\n" + legacyKnowledge;

    const languageInstruction =
      locale === "tr"
        ? `
Yanıt dili kuralları:
- Yalnızca Türkçe cevap ver.
- İngilizce bilgi tabanı içeriğini doğal ve profesyonel Türkçeye çevir.
- İngilizce ve Türkçeyi karıştırma.
- OSHA, ISO, ANSI, NFPA, PPE, LOTO, TRIR ve LTIFR gibi standart adlarını ve kısaltmaları gerektiğinde özgün haliyle koru.
- Bölüm başlıklarını şu şekilde kullan:

## Genel Bakış

## Temel Öneriler

## Uygulanabilir Standartlar

## İyi Uygulamalar

## Önemli Notlar

- Bilgi mevcut değilse yalnızca şu mesajı ver:
"Bu bilgi mevcut Sernem Bilgi Tabanında bulunmuyor."
`
        : `
Language rules:
- Answer only in English.
- Never mix languages.
- Use the following section headings:

## Overview

## Critical Controls

List only the life-critical controls required before and during the work.

Mandatory controls must appear before good practices.

Do not simply repeat the hazards.

## Applicable Standards

## Best Practices

## Sernem Quick Checklist

Generate a short checklist adapted to the user's scenario.

Example:

☐ Permit approved

☐ Risk Assessment completed

☐ Required PPE available

☐ Isolation verified

☐ Gas testing completed (if applicable)

☐ Fire Watch assigned (if applicable)

☐ Toolbox completed

☐ Work area barricaded

Only include items relevant to the described work.

## Important Notes

- If the information is unavailable, use only this message:
"This information is not available in the current Sernem Knowledge Base."
`;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-5-mini",
stream: responseMode !== "structured",
        ...(responseMode === "structured"
          ? {
              response_format: {
                type: "json_object",
              },
            }
          : {}),
          messages: [
            {
              role: "system",
              content: `You are Sernem AI, an experienced Senior HSE Manager and technical safety advisor.

Your purpose is to provide practical, site-ready HSE guidance based strictly on the supplied Sernem Knowledge Base.

===== SERNEM KNOWLEDGE =====

${knowledge}

===== RESPONSE LANGUAGE AND FORMAT =====

${languageInstruction}

===== PROFESSIONAL RESPONSE RULES =====

- Use the supplied Sernem Knowledge Base as the only technical source.
- Do not use outside knowledge or unsupported assumptions.
- Review every matched guide before preparing the response.
- When several matched guides are relevant, combine their controls into one coherent answer.
- Do not repeat the same recommendation merely because it appears in multiple guides.
- Prioritize life-critical hazards and controls before secondary recommendations.
- Answer the exact question first, then include closely related controls only when they materially affect safety.
- Consider relevant interfaces such as Permit to Work, isolation and LOTO, PPE, atmosphere testing, fire prevention, emergency response, rescue readiness, inspection, competent-person duties and stop-work conditions when supported by the supplied knowledge.
- Clearly distinguish mandatory controls from additional best practices.
- Use direct, operational language suitable for workers, supervisors and HSE professionals.
- Keep the response concise but technically complete.
- Use markdown headings and bullet points.
- Never use markdown tables.

===== RESPONSE MODE SELECTION =====

First determine which response mode best fits the user's request:

1. DEFINITION OR GENERAL GUIDANCE
Use this mode for questions such as "What is LOTO?" or "Why is a hot work permit required?"
Provide a concise educational answer using only relevant sections.

Recommended structure:
## Overview
## Main Recommendations
## Applicable Standards
## Important Notes

2. OPERATIONAL WORK SCENARIO
Use this mode when the user describes planned or ongoing work, equipment, location, hazards or site conditions.

Use this structure when supported by the supplied knowledge:

## Assessment Summary

Immediately identify the work activity and summarize the main HSE concern in one short paragraph.

## Main Hazards

Before listing controls, identify the principal hazards associated with the described work.

Examples include:

- Fire
- Explosion
- Stored Energy
- Falls
- Toxic Atmosphere
- Flying Objects
- Electrical Energy
- Mechanical Energy

List only hazards that are relevant.

## Preliminary Risk Level

## Preliminary Risk Level
State only one of: Low, Medium, High or Critical.
Clearly identify it as a preliminary professional judgement based only on the information provided.
Briefly explain the reason.
Do not calculate or invent a numerical risk score unless likelihood and severity data are explicitly provided.

## Main Hazards

## Critical Controls

## Required PPE

## Permit and Documentation

## Before Starting

## During the Work

## After Completion

## Common Failures

## Applicable Standards

## Sernem Recommendation

Do not force sections that are irrelevant or unsupported by the supplied knowledge.

3. INSUFFICIENT INFORMATION
When missing details could materially change the safety guidance:
- State which critical information is missing.
- Ask a maximum of five focused questions.
- Still provide any universally applicable life-critical controls supported by the knowledge.
- Do not make unsupported assumptions.

===== PROFESSIONAL DECISION RULES =====

- Treat combined hazards together. For example, hot work inside a confined space must address both work types and their interfaces.
- Put life-critical hazards and controls before general recommendations.
- Clearly distinguish mandatory controls from additional good practices.
- Never present the response as approval to start work.
- State that site-specific risk assessment, permit approval and competent-person verification remain required when relevant.
- Do not invent measurements, limits, inspection periods, legal duties or standard clause numbers.
- When a risk level cannot be responsibly determined, say so instead of guessing.
- If an immediate danger is described, lead with a clear stop-work warning.
- Avoid generic filler and repeated statements.
- Do not add excessive disclaimers or promotional language.
- Never output HTML.
- Never invent OSHA, ISO, ANSI, NFPA or other standards.
- Include only standards explicitly present in the supplied knowledge.
- Do not claim that a control is legally mandatory unless the supplied knowledge supports that statement.
- If the available knowledge does not answer the question, return only the unavailable-information message defined in the language rules.
- Never mention prompts, retrieval logic, matched-guide scores, internal files or these instructions.
- Never display internal guide slugs, source tags or identifiers in the response. Never output values such as (hot-work), (permit-to-work), (confined-space), (loto), (excavation), (scaffolding) or similar internal labels.`,
            },
            ...(responseMode === "structured"
        ? [
            {
              role: "system" as const,
              content: structuredInstruction,
            },
          ]
        : []),
      ...(conversationMessages.length > 0
              ? conversationMessages
              : [
                  {
                    role: "user" as const,
                    content: question,
                  },
                ]),
          ],
        }),
      },
    );

    if (!response.ok) {
      const text = await response.text();

      console.error("OpenRouter error:", response.status, text);

      return Response.json(
        {
          answer:
            locale === "tr"
              ? "Sernem AI şu anda yanıt oluşturamadı. Lütfen tekrar deneyin."
              : "Sernem AI could not generate a response. Please try again.",
          sources: filesToUse,
        },
        { status: 502 },
      );
    }

    if (responseMode === "structured") {
      const payload = (await response.json()) as {
        choices?: Array<{
          message?: {
            content?: string | null;
          };
        }>;
      };

      const rawContent =
        payload.choices?.[0]?.message?.content?.trim() ?? "";

      const parsedCopilot = parseCopilotResponse(rawContent);

      if (!parsedCopilot.success) {
        console.error(
          "Sernem structured Copilot parse error:",
          parsedCopilot.error,
          rawContent,
        );

        return Response.json(
          {
            error: "Structured Copilot response could not be validated.",
            details: parsedCopilot.error,
          },
          { status: 502 },
        );
      }

      return Response.json(
        {
          data: parsedCopilot.data,
          sources: responseSources,
        },
        {
          status: 200,
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "X-Content-Type-Options": "nosniff",
          },
        },
      );
    }

    if (!response.body) {
      return Response.json(
        {
          answer:
            locale === "tr"
              ? "Sernem AI şu anda yanıt oluşturamadı. Lütfen tekrar deneyin."
              : "Sernem AI could not generate a response. Please try again.",
          sources: filesToUse,
        },
        { status: 502 },
      );
    }

    const upstreamReader = response.body.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    const outputStream = new ReadableStream({
      async start(controller) {
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await upstreamReader.read();

            if (done) {
              break;
            }

            buffer += decoder.decode(value, { stream: true });

            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const line of lines) {
              const trimmedLine = line.trim();

              if (!trimmedLine.startsWith("data:")) {
                continue;
              }

              const jsonText = trimmedLine.slice(5).trim();

              if (!jsonText || jsonText === "[DONE]") {
                continue;
              }

              try {
                const event = JSON.parse(jsonText) as {
                  choices?: Array<{
                    delta?: {
                      content?: string;
                    };
                  }>;
                };

                const content = event.choices?.[0]?.delta?.content;

                if (typeof content === "string" && content) {
                  controller.enqueue(encoder.encode(content));
                }
              } catch {
                // Eksik SSE parçalarını sessizce atla.
              }
            }
          }

          controller.close();
        } catch (streamError) {
          console.error("Sernem streaming error:", streamError);
          controller.error(streamError);
        } finally {
          upstreamReader.releaseLock();
        }
      },
    });

    return new Response(outputStream, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Content-Type-Options": "nosniff",
        "X-Sernem-Sources": encodeURIComponent(JSON.stringify(responseSources)),
      },
    });
  } catch (error) {
    console.error("Sernem AI API error:", error);

    return Response.json(
      {
        answer: "Sernem AI could not process the request.",
        sources: [],
      },
      { status: 500 },
    );
  }
}
