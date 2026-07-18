import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const knowledgeFolder = path.join(process.cwd(), "app", "knowledge");
 const aliasesPath = path.join(knowledgeFolder, "aliases.json");

const aliases = JSON.parse(
  fs.readFileSync(aliasesPath, "utf-8")
) as Record<string, string[]>;

const knowledgeFiles = fs
  .readdirSync(knowledgeFolder)
  .filter((file) => file.endsWith(".md"));

const { question } = await req.json();

const normalizedQuestion = question.toLowerCase();

const matchedTopics = Object.entries(aliases)
  .filter(([topic, keywords]) => {
    const searchTerms = [topic, ...keywords];

    return searchTerms.some((term) =>
      normalizedQuestion.includes(term.toLowerCase())
    );
  })
  .map(([topic]) => `${topic}.md`);

const selectedFiles = knowledgeFiles.filter(
  (file) => matchedTopics.includes(file) || file === "ppe.md"
);

const filesToUse =
  selectedFiles.length > 0 ? selectedFiles : ["ppe.md"];
  console.log("Question:", question);
console.log("Matched Topics:", matchedTopics);
console.log("Files To Use:", filesToUse);

const knowledge = filesToUse
  .map((file) =>
    fs.readFileSync(path.join(knowledgeFolder, file), "utf-8")
  )
  .join("\n\n");
const response = await fetch(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-20b:free",
      temperature: 0,
      messages: [
        {
          role: "system",
          content: `You are SafeBase AI, a senior HSE engineer.

Use the following SafeBase knowledge as the primary reference:

${knowledge}

Rules:
- Answer in the same language as the user's question.
- Never mix languages.
- Never use markdown tables.
- Never output HTML.
- Never invent OSHA, ISO, ANSI or NFPA standards.
- Use only the provided SafeBase Knowledge Base.
- Do not use your own knowledge.
- If the answer is not in the knowledge base, say: "This information is not available in the current SafeBase Knowledge Base."

Use this structure:

## Overview

## Main Recommendations

## Applicable Standards

## Best Practices

## Important Notes

Use bullet points instead of tables.
Keep answers short, practical and professional.`,
        },
        {
          role: "user",
          content: question,
        },
      ],
    }),
  }
);

if (!response.ok) {
  const text = await response.text();

  return Response.json({
    answer: `OpenRouter ${response.status}\n\n${text}`,
  });
}

const data = await response.json();
const answer =
  data?.choices?.[0]?.message?.content ??
  "This information is not available in the current SafeBase Knowledge Base.";

return Response.json({
  answer,
});
}