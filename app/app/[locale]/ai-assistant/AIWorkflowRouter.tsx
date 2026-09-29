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

type TopicKey =
  | "scaffold"
  | "working-at-height"
  | "hot-work"
  | "confined-space"
  | "loto"
  | "lifting"
  | "other";

function topicKey(text: string): TopicKey {
  const value = text.toLowerCase();

  if (["iskele", "scaffold", "scaffolding"].some((k) => value.includes(k))) return "scaffold";
  if (["yüksekte", "yükseklik", "working at height", "fall protection"].some((k) => value.includes(k))) return "working-at-height";
  if (["sıcak iş", "hot work", "kaynak", "welding", "grinding", "taşlama"].some((k) => value.includes(k))) return "hot-work";
  if (["kapalı alan", "confined space", "tank entry", "manhole"].some((k) => value.includes(k))) return "confined-space";
  if (["loto", "lockout", "tagout", "enerji izolasyonu"].some((k) => value.includes(k))) return "loto";
  if (["kaldırma", "lifting", "vinç", "crane", "sapan", "rigging"].some((k) => value.includes(k))) return "lifting";
  return "other";
}

const TOOLBOX_ROUTES: Partial<Record<TopicKey, string>> = {
  scaffold: "scaffold-safety",
  "working-at-height": "working-at-height",
  "hot-work": "hot-work",
  "confined-space": "confined-space",
  loto: "loto",
};

const CHECKLIST_ROUTES: Partial<Record<TopicKey, string>> = {
  scaffold: "scaffold",
  "working-at-height": "work-at-height",
  "hot-work": "hot-work",
  "confined-space": "confined-space",
  loto: "loto",
  lifting: "lifting",
};

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
  const topic = topicKey(scenarioText);

  if (normalized.includes("risk") || normalized.includes("analiz")) {
    return `/${locale}/tools/quick-risk-assessment?from=sernem-ai`;
  }
  if (normalized.includes("method")) {
    return `/${locale}/tools/method-statement?from=sernem-ai`;
  }
  if (normalized.includes("toolbox")) {
    const slug = TOOLBOX_ROUTES[topic];
    return slug
      ? `/${locale}/toolbox/${slug}?from=sernem-ai`
      : `/${locale}/toolbox?from=sernem-ai`;
  }
  if (normalized.includes("checklist")) {
    const slug = CHECKLIST_ROUTES[topic];
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
