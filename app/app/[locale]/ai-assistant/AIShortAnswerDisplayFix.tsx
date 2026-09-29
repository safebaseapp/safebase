"use client";

import { useEffect } from "react";

type Props = { locale: "tr" | "en" };

function revealLatestKnowledgeAnswer(root: HTMLElement) {
  const assistantArticles = Array.from(root.querySelectorAll<HTMLElement>("article"))
    .filter((article) => Boolean(article.querySelector("h2")));
  const article = assistantArticles[assistantArticles.length - 1];
  if (!article) return false;

  const body = Array.from(article.children).find((node) => {
    if (!(node instanceof HTMLElement)) return false;
    return typeof node.className === "string" && node.className.includes("max-w-[92%]");
  }) as HTMLElement | undefined;
  if (!body) return false;

  body.querySelector(".sernem-decision-brief")?.remove();
  body.querySelector(".sernem-quick-actions")?.remove();
  body.querySelector(".sernem-followup-panel")?.remove();
  body.querySelector(".sernem-detail-extension")?.remove();

  const nativeAnswer = Array.from(body.children).find((child) => {
    if (!(child instanceof HTMLElement)) return false;
    return child.classList.contains("mt-4") && Boolean(child.querySelector("h2"));
  }) as HTMLElement | undefined;

  if (!nativeAnswer) return false;
  nativeAnswer.style.display = "block";
  nativeAnswer.style.opacity = "1";
  nativeAnswer.style.visibility = "visible";
  article.dataset.sernemKnowledgeShort = "true";
  return true;
}

export default function AIShortAnswerDisplayFix({ locale: _locale }: Props) {
  useEffect(() => {
    const nativeFetch = window.fetch.bind(window);

    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const response = await nativeFetch(input, init);
      const url =
        typeof input === "string"
          ? input
          : input instanceof URL
            ? input.toString()
            : input.url;

      if (!url.includes("/api/ask") || !response.ok) return response;

      void response
        .clone()
        .json()
        .then((payload: unknown) => {
          const answerKind = (payload as { answerKind?: unknown } | null)?.answerKind;
          if (answerKind !== "knowledge-short") return;

          const root = document.querySelector<HTMLElement>(".sernem-ai-route");
          if (!root) return;

          let attempts = 0;
          const clean = () => {
            attempts += 1;
            if (!revealLatestKnowledgeAnswer(root) && attempts < 20) {
              window.setTimeout(clean, 60);
            }
          };
          window.setTimeout(clean, 45);
        })
        .catch(() => undefined);

      return response;
    };

    return () => {
      window.fetch = nativeFetch;
    };
  }, []);

  return null;
}
