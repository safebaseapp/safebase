"use client";

import { useEffect } from "react";

type Props = { locale: "tr" | "en" };

const STOP_PATTERNS = [
  /iş başlatılmamal/i,
  /işe başlamayın/i,
  /çalışmayı başlatma/i,
  /çalışma başlatılmamal/i,
  /çalışmayı durdur/i,
  /stop[- ]?work/i,
  /do not start/i,
  /must not start/i,
  /should not start/i,
  /cannot start/i,
  /can not start/i,
  /must not proceed/i,
  /do not proceed/i,
  /work must not (?:start|proceed)/i,
];

function syncDecisionStatus(root: HTMLElement, locale: "tr" | "en") {
  root.querySelectorAll<HTMLElement>(".sernem-decision-brief").forEach((brief) => {
    const riskBadge = brief.querySelector<HTMLElement>(".sernem-risk-badge");
    const statusBadge = brief.querySelector<HTMLElement>(".sernem-status-badge");
    const article = brief.closest("article");
    if (!riskBadge || !statusBadge || !article) return;

    const risk = riskBadge.textContent?.toUpperCase() ?? "";
    const isHighOrCritical = risk.includes("HIGH") || risk.includes("CRITICAL");
    if (!isHighOrCritical) return;

    const articleText = article.textContent ?? "";
    const explicitStop = STOP_PATTERNS.some((pattern) => pattern.test(articleText));
    if (!explicitStop) return;

    statusBadge.textContent = locale === "tr" ? "ÇALIŞMAYI BAŞLATMA" : "DO NOT START";
    statusBadge.dataset.sernemStopWork = "true";
  });
}

export default function AIStopWorkStatusFix({ locale }: Props) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".sernem-ai-route");
    if (!root) return;

    let frame = 0;
    const scheduleSync = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => syncDecisionStatus(root, locale));
    };

    scheduleSync();
    const observer = new MutationObserver(scheduleSync);
    observer.observe(root, { subtree: true, childList: true, characterData: true });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [locale]);

  return null;
}
