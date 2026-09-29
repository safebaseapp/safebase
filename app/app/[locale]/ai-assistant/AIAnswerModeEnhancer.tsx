"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { CopilotResponse } from "@/lib/ai/copilot-types";

type Props = { locale: "tr" | "en" };
type AnswerMode = "brief" | "supervisor" | "detailed";

const STORAGE_KEY = "sernem-ai-answer-mode";

function fieldStatus(risk: CopilotResponse["riskLevel"], tr: boolean) {
  switch (risk) {
    case "CRITICAL":
      return tr ? "Çalışmayı durdur / doğrula" : "Stop work / verify";
    case "HIGH":
      return tr ? "Başlamadan önce gözden geçir" : "Review before proceeding";
    case "MEDIUM":
      return tr ? "Kontrollerle ilerle" : "Proceed with controls";
    case "LOW":
      return tr ? "Kontrolleri doğrula" : "Verify controls";
    default:
      return tr ? "Daha fazla bilgi gerekli" : "More information required";
  }
}

function createList(title: string, items: string[], tone: "blue" | "red" | "amber") {
  if (!items.length) return null;
  const section = document.createElement("section");
  section.className = `sernem-brief-column sernem-brief-${tone}`;

  const heading = document.createElement("p");
  heading.className = "sernem-brief-heading";
  heading.textContent = title;
  section.appendChild(heading);

  const list = document.createElement("ul");
  items.slice(0, 4).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
  section.appendChild(list);
  return section;
}

function injectDecisionBrief(root: HTMLElement, data: CopilotResponse, locale: "tr" | "en") {
  const tr = locale === "tr";
  const assistantArticles = Array.from(root.querySelectorAll<HTMLElement>("article")).filter((article) =>
    Boolean(article.querySelector("h2")),
  );
  const article = assistantArticles.at(-1);
  if (!article) return false;

  const body = Array.from(article.children).find((node) =>
    node instanceof HTMLElement && node.className.includes("max-w-[92%]"),
  ) as HTMLElement | undefined;
  if (!body) return false;

  body.querySelector(".sernem-decision-brief")?.remove();

  const panel = document.createElement("section");
  panel.className = "sernem-decision-brief";

  const top = document.createElement("div");
  top.className = "sernem-brief-top";

  const label = document.createElement("div");
  label.className = "sernem-brief-label";
  label.textContent = tr ? "SAHA KARAR ÖZETİ" : "FIELD DECISION BRIEF";
  top.appendChild(label);

  const badges = document.createElement("div");
  badges.className = "sernem-brief-badges";

  const risk = document.createElement("span");
  risk.className = `sernem-risk-badge risk-${data.riskLevel.toLowerCase()}`;
  risk.textContent = `${tr ? "Risk" : "Risk"}: ${data.riskLevel}`;
  badges.appendChild(risk);

  const status = document.createElement("span");
  status.className = "sernem-status-badge";
  status.textContent = fieldStatus(data.riskLevel, tr);
  badges.appendChild(status);
  top.appendChild(badges);
  panel.appendChild(top);

  if (data.riskReason) {
    const reason = document.createElement("p");
    reason.className = "sernem-brief-reason";
    reason.textContent = data.riskReason;
    panel.appendChild(reason);
  }

  const grid = document.createElement("div");
  grid.className = "sernem-brief-grid";

  const controls = createList(
    tr ? "İlk kritik kontroller" : "Top critical controls",
    data.criticalControls ?? [],
    "blue",
  );
  const stops = createList(
    tr ? "Durdurma tetikleyicileri" : "Stop-work triggers",
    data.stopWorkConditions ?? [],
    "red",
  );
  const missing = createList(
    tr ? "Eksik / doğrulanacak bilgi" : "Missing / verify",
    data.clarificationQuestions ?? [],
    "amber",
  );

  [controls, stops, missing].forEach((node) => node && grid.appendChild(node));
  panel.appendChild(grid);

  const note = document.createElement("p");
  note.className = "sernem-brief-note";
  note.textContent = tr
    ? "Ön değerlendirmedir; saha koşulları, izinler ve yetkili kişi kontrolleri doğrulanmalıdır."
    : "Preliminary field guidance; verify site conditions, permits and competent-person controls.";
  panel.appendChild(note);

  const copilotBlock = body.querySelector(".mt-4");
  if (copilotBlock) body.insertBefore(panel, copilotBlock);
  else body.appendChild(panel);
  return true;
}

function classifyAnswerSections(root: HTMLElement) {
  const map: Record<string, string> = {
    "ana tehlikeler": "hse-section-hazards",
    "main hazards": "hse-section-hazards",
    "kritik kontroller": "hse-section-controls",
    "critical controls": "hse-section-controls",
    "gerekli kkd": "hse-section-ppe",
    "required ppe": "hse-section-ppe",
    "izinler ve dokümanlar": "hse-section-permits",
    "permits & documents": "hse-section-permits",
    "çalışmayı durdurma koşulları": "hse-section-stop",
    "stop work conditions": "hse-section-stop",
    "uygulanabilir standartlar": "hse-section-standards",
    "applicable standards": "hse-section-standards",
  };

  root.querySelectorAll<HTMLElement>("article section").forEach((section) => {
    const heading = section.querySelector("h3")?.textContent?.trim().toLowerCase();
    if (!heading) return;
    const className = map[heading];
    if (className) {
      section.classList.add("hse-answer-section", className);
    }
  });
}

export default function AIAnswerModeEnhancer({ locale }: Props) {
  const [mode, setMode] = useState<AnswerMode>("supervisor");
  const [host, setHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".sernem-ai-route");
    if (!root) return;
    const saved = window.localStorage.getItem(STORAGE_KEY) as AnswerMode | null;
    if (saved === "brief" || saved === "supervisor" || saved === "detailed") setMode(saved);
    setHost(root.querySelector<HTMLElement>("header"));
    classifyAnswerSections(root);

    const observer = new MutationObserver(() => classifyAnswerSections(root));
    observer.observe(root, { subtree: true, childList: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".sernem-ai-route");
    if (!root) return;
    root.dataset.answerMode = mode;
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    const originalFetch = window.fetch;
    const patched: typeof window.fetch = async (...args) => {
      const response = await originalFetch(...args);
      const requestUrl = typeof args[0] === "string" ? args[0] : args[0] instanceof Request ? args[0].url : "";
      if (requestUrl.includes("/api/ask") && response.ok) {
        response.clone().json().then((payload: { data?: CopilotResponse }) => {
          if (!payload?.data) return;
          const root = document.querySelector<HTMLElement>(".sernem-ai-route");
          if (!root) return;
          let attempts = 0;
          const place = () => {
            attempts += 1;
            classifyAnswerSections(root);
            if (!injectDecisionBrief(root, payload.data!, locale) && attempts < 20) {
              window.setTimeout(place, 60);
            }
          };
          window.setTimeout(place, 30);
        }).catch(() => undefined);
      }
      return response;
    };
    window.fetch = patched;
    return () => {
      if (window.fetch === patched) window.fetch = originalFetch;
    };
  }, [locale]);

  if (!host) return null;

  const tr = locale === "tr";
  const options: { id: AnswerMode; label: string; short: string }[] = [
    { id: "brief", label: tr ? "Saha Özeti" : "Field Brief", short: tr ? "Kısa" : "Brief" },
    { id: "supervisor", label: tr ? "Supervisor" : "Supervisor", short: "Supervisor" },
    { id: "detailed", label: tr ? "Detaylı İnceleme" : "Detailed Review", short: tr ? "Detay" : "Detail" },
  ];

  return createPortal(
    <div className="sernem-answer-mode" aria-label={tr ? "Yanıt modu" : "Answer mode"}>
      <span className="sernem-answer-mode-label">{tr ? "Yanıt" : "Answer"}</span>
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          title={option.label}
          aria-pressed={mode === option.id}
          onClick={() => setMode(option.id)}
          className={mode === option.id ? "is-active" : ""}
        >
          <span className="mode-long">{option.label}</span>
          <span className="mode-short">{option.short}</span>
        </button>
      ))}
    </div>,
    host,
  );
}
