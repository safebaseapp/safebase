"use client";

import { useEffect } from "react";

type Props = { locale: "tr" | "en" };

type StoredContext = {
  source: "sernem-ai";
  title: string;
  summary: string;
  riskLevel?: string;
  capturedAt: string;
};

function topicSlug(text: string) {
  const value = text.toLowerCase();
  const groups: Array<[string, string[]]> = [
    ["scaffolding", ["iskele", "scaffold", "scaffolding"]],
    ["working-at-height", ["yüksekte", "yükseklik", "working at height", "fall protection"]],
    ["hot-work", ["sıcak iş", "hot work", "kaynak", "welding", "grinding", "taşlama"]],
    ["confined-space", ["kapalı alan", "confined space", "tank entry", "manhole"]],
    ["loto", ["loto", "lockout", "tagout", "enerji izolasyonu"]],
    ["excavation", ["kazı", "excavation", "trench", "hendek"]],
    ["electrical", ["elektrik", "electrical", "havai hat", "enerji hattı", "arc flash"]],
    ["ppe", ["kkd", "ppe", "emniyet kemeri", "harness"]],
  ];

  for (const [slug, keywords] of groups) {
    if (keywords.some((keyword) => value.includes(keyword))) return slug;
  }
  return null;
}

function readLatestScenario(button: HTMLElement): StoredContext {
  const article = button.closest("article");
  const text = article?.textContent?.replace(/\s+/g, " ").trim() ?? "";
  const title = article?.querySelector("h2")?.textContent?.trim() ?? "SERNEM AI field scenario";
  const summary = text.slice(0, 1800);
  const riskMatch = text.match(/RISK:\s*(LOW|MEDIUM|HIGH|CRITICAL|UNDETERMINED)/i);

  return {
    source: "sernem-ai",
    title,
    summary,
    riskLevel: riskMatch?.[1]?.toUpperCase(),
    capturedAt: new Date().toISOString(),
  };
}

function destination(label: string, scenarioText: string, locale: "tr" | "en") {
  const normalized = label.toLowerCase();
  const slug = topicSlug(scenarioText);

  if (normalized.includes("risk") || normalized.includes("analiz")) {
    return `/${locale}/tools/quick-risk-assessment?from=sernem-ai`;
  }
  if (normalized.includes("method")) {
    return `/${locale}/tools/method-statement?from=sernem-ai`;
  }
  if (normalized.includes("toolbox")) {
    return slug
      ? `/${locale}/toolbox/${slug}?from=sernem-ai`
      : `/${locale}/toolbox?from=sernem-ai`;
  }
  if (normalized.includes("checklist")) {
    return slug
      ? `/${locale}/checklists/${slug}?from=sernem-ai`
      : `/${locale}/checklists?from=sernem-ai`;
  }
  return null;
}

export default function AIWorkflowRouter({ locale }: Props) {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const button = target?.closest<HTMLElement>(".sernem-quick-action");
      if (!button || button.classList.contains("sernem-copy-action")) return;

      const label = button.textContent?.trim() ?? "";
      const context = readLatestScenario(button);
      const href = destination(label, `${context.title} ${context.summary}`, locale);
      if (!href) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      try {
        sessionStorage.setItem("sernem-ai-workflow-context", JSON.stringify(context));
      } catch {
        // Navigation still works if storage is unavailable.
      }

      window.location.assign(href);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [locale]);

  return null;
}
