"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { CopilotResponse } from "@/lib/ai/copilot-types";

type Props = { locale: "tr" | "en" };
type AnswerMode = "brief" | "supervisor" | "detailed";
type QuickActionKind = "risk" | "toolbox" | "method" | "checklist";

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

function createList(
  title: string,
  items: string[],
  tone: "blue" | "red" | "amber" | "green" = "blue",
  maxItems = 4,
) {
  if (!items.length) return null;
  const section = document.createElement("section");
  section.className = `sernem-brief-column sernem-brief-${tone}`;

  const heading = document.createElement("p");
  heading.className = "sernem-brief-heading";
  heading.textContent = title;
  section.appendChild(heading);

  const list = document.createElement("ul");
  items.slice(0, maxItems).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
  section.appendChild(list);
  return section;
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
    if (className) section.classList.add("hse-answer-section", className);
  });
}

function markAnswerBlocks(body: HTMLElement, nativeAnswer: HTMLElement) {
  nativeAnswer.classList.add("sernem-native-answer");

  Array.from(body.children).forEach((child) => {
    if (!(child instanceof HTMLElement) || child === nativeAnswer) return;
    const text = child.textContent?.trim().toLowerCase() ?? "";
    if (text.includes("kaynaklar") || text.startsWith("sources")) {
      child.classList.add("hse-sources-block");
    }
    if (text.includes("önerilen safety pack") || text.includes("recommended safety pack")) {
      child.classList.add("hse-safety-pack-block");
    }
  });
}

function setComposerValue(root: HTMLElement, value: string) {
  const textareas = Array.from(root.querySelectorAll<HTMLTextAreaElement>("textarea"));
  const textarea = textareas[textareas.length - 1];
  if (!textarea) return null;

  const setter = Object.getOwnPropertyDescriptor(
    HTMLTextAreaElement.prototype,
    "value",
  )?.set;
  setter?.call(textarea, value);
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
  textarea.focus();
  textarea.setSelectionRange(value.length, value.length);
  return textarea;
}

function primeComposer(root: HTMLElement, question: string, tr: boolean) {
  const prefix = tr
    ? `Şu saha bilgisini ekliyorum — ${question}\nCevabım: `
    : `Adding this field detail — ${question}\nMy answer: `;

  const textarea = setComposerValue(root, prefix);
  textarea?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function actionContext(data: CopilotResponse, tr: boolean) {
  const hazards = (data.hazards ?? []).slice(0, 5).join("; ");
  const controls = (data.criticalControls ?? []).slice(0, 5).join("; ");
  return tr
    ? `Mevcut saha senaryosu: ${data.title}. ${data.summary} Risk seviyesi: ${data.riskLevel}. Ana tehlikeler: ${hazards || "belirtilmedi"}. Kritik kontroller: ${controls || "belirtilmedi"}.`
    : `Current field scenario: ${data.title}. ${data.summary} Risk level: ${data.riskLevel}. Main hazards: ${hazards || "not specified"}. Critical controls: ${controls || "not specified"}.`;
}

function actionPrompt(data: CopilotResponse, kind: QuickActionKind, tr: boolean) {
  const context = actionContext(data, tr);
  if (tr) {
    switch (kind) {
      case "risk":
        return `${context}\nBu senaryo için profesyonel bir risk analizi taslağı hazırla. Tehlike, olası sonuç, mevcut/önerilen kontroller, sorumlu rol ve kalan risk mantığıyla saha kullanımına uygun yapılandır.`;
      case "toolbox":
        return `${context}\nBu senaryo için sahada ekibe verilecek kısa ve profesyonel bir toolbox talk hazırla. Kritik riskleri, işe başlamadan önce kontrolleri, çalışma sırasındaki kuralları ve stop-work koşullarını net yaz.`;
      case "method":
        return `${context}\nBu senaryo için method statement taslağı hazırla. Kapsam, sorumluluklar, ekipman/KKD, izinler, iş sırası, kritik kontroller, acil durum ve stop-work şartlarını yapılandır.`;
      case "checklist":
        return `${context}\nBu senaryo için işe başlamadan önce kullanılacak saha checklisti hazırla. Maddeler kısa, doğrulanabilir ve evet/hayır kontrolüne uygun olsun; kritik maddeleri ayrıca işaretle.`;
    }
  }

  switch (kind) {
    case "risk":
      return `${context}\nCreate a professional field-ready risk assessment draft for this scenario. Structure hazards, consequences, existing/recommended controls, responsible role and residual-risk logic.`;
    case "toolbox":
      return `${context}\nCreate a concise field-ready toolbox talk for the crew. Cover critical risks, pre-start controls, rules during the work and clear stop-work conditions.`;
    case "method":
      return `${context}\nCreate a method statement draft for this scenario. Structure scope, responsibilities, equipment/PPE, permits, work sequence, critical controls, emergency arrangements and stop-work conditions.`;
    case "checklist":
      return `${context}\nCreate a pre-start field checklist for this scenario. Keep each item short, verifiable and suitable for yes/no checks, and clearly flag critical items.`;
  }
}

function submitOneClickAction(
  root: HTMLElement,
  data: CopilotResponse,
  kind: QuickActionKind,
  tr: boolean,
  button: HTMLButtonElement,
) {
  const prompt = actionPrompt(data, kind, tr);
  const textarea = setComposerValue(root, prompt);
  if (!textarea) return;

  const original = button.textContent ?? "";
  button.disabled = true;
  button.classList.add("is-running");
  button.textContent = tr ? "Hazırlanıyor…" : "Preparing…";

  window.setTimeout(() => {
    const form = textarea.closest("form");
    const submit = form?.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (submit && !submit.disabled) submit.click();
    else form?.requestSubmit();

    window.setTimeout(() => {
      button.disabled = false;
      button.classList.remove("is-running");
      button.textContent = original;
    }, 900);
  }, 120);
}

function createCopyText(data: CopilotResponse, tr: boolean) {
  const controls = (data.criticalControls ?? []).slice(0, 5);
  const stops = (data.stopWorkConditions ?? []).slice(0, 5);
  const controlText = controls.map((item) => `• ${item}`).join("\n");
  const stopText = stops.map((item) => `• ${item}`).join("\n");

  return tr
    ? `${data.title}\nRisk: ${data.riskLevel}\n\n${data.summary}\n\nKritik Kontroller\n${controlText}\n\nÇalışmayı Durdurma Koşulları\n${stopText}`
    : `${data.title}\nRisk: ${data.riskLevel}\n\n${data.summary}\n\nCritical Controls\n${controlText}\n\nStop Work Conditions\n${stopText}`;
}

function createQuickActions(
  root: HTMLElement,
  data: CopilotResponse,
  tr: boolean,
) {
  const panel = document.createElement("section");
  panel.className = "sernem-quick-actions";

  const header = document.createElement("div");
  header.className = "sernem-quick-actions-header";

  const heading = document.createElement("div");
  const eyebrow = document.createElement("p");
  eyebrow.className = "sernem-quick-actions-eyebrow";
  eyebrow.textContent = tr ? "TEK TIK AKSİYONLAR" : "ONE-CLICK ACTIONS";
  const title = document.createElement("h3");
  title.className = "sernem-quick-actions-title";
  title.textContent = tr
    ? "Bu saha değerlendirmesini doğrudan işe dönüştür"
    : "Turn this field assessment directly into work";
  heading.append(eyebrow, title);

  const badge = document.createElement("span");
  badge.className = "sernem-quick-actions-badge";
  badge.textContent = "SERNEM WORKFLOW";
  header.append(heading, badge);
  panel.appendChild(header);

  const grid = document.createElement("div");
  grid.className = "sernem-quick-actions-grid";

  const actions: Array<{
    kind: QuickActionKind;
    icon: string;
    label: string;
    detail: string;
  }> = [
    {
      kind: "risk",
      icon: "◇",
      label: tr ? "Risk Analizi" : "Risk Assessment",
      detail: tr ? "Taslağı hemen oluştur" : "Create a draft now",
    },
    {
      kind: "toolbox",
      icon: "TB",
      label: tr ? "Toolbox Talk" : "Toolbox Talk",
      detail: tr ? "Ekibe saha konuşması hazırla" : "Prepare the crew briefing",
    },
    {
      kind: "method",
      icon: "MS",
      label: "Method Statement",
      detail: tr ? "İş sırasını yapılandır" : "Structure the work sequence",
    },
    {
      kind: "checklist",
      icon: "✓",
      label: tr ? "Saha Checklisti" : "Field Checklist",
      detail: tr ? "Pre-start kontrol listesi" : "Pre-start verification list",
    },
  ];

  actions.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "sernem-quick-action";

    const icon = document.createElement("span");
    icon.className = "sernem-quick-action-icon";
    icon.textContent = item.icon;

    const copy = document.createElement("span");
    copy.className = "sernem-quick-action-copy";
    const label = document.createElement("strong");
    label.textContent = item.label;
    const detail = document.createElement("small");
    detail.textContent = item.detail;
    copy.append(label, detail);

    const arrow = document.createElement("span");
    arrow.className = "sernem-quick-action-arrow";
    arrow.textContent = "→";

    button.append(icon, copy, arrow);
    button.addEventListener("click", () =>
      submitOneClickAction(root, data, item.kind, tr, button),
    );
    grid.appendChild(button);
  });

  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.className = "sernem-quick-action sernem-copy-action";

  const copyIcon = document.createElement("span");
  copyIcon.className = "sernem-quick-action-icon";
  copyIcon.textContent = "⧉";
  const copyText = document.createElement("span");
  copyText.className = "sernem-quick-action-copy";
  const copyLabel = document.createElement("strong");
  copyLabel.textContent = tr ? "Özeti Kopyala" : "Copy Brief";
  const copyDetail = document.createElement("small");
  copyDetail.textContent = tr ? "Token harcamaz" : "No token used";
  copyText.append(copyLabel, copyDetail);
  const copyArrow = document.createElement("span");
  copyArrow.className = "sernem-quick-action-arrow";
  copyArrow.textContent = "⧉";
  copyButton.append(copyIcon, copyText, copyArrow);
  copyButton.addEventListener("click", () => {
    void navigator.clipboard
      .writeText(createCopyText(data, tr))
      .then(() => {
        copyLabel.textContent = tr ? "Kopyalandı ✓" : "Copied ✓";
        window.setTimeout(() => {
          copyLabel.textContent = tr ? "Özeti Kopyala" : "Copy Brief";
        }, 1400);
      })
      .catch(() => undefined);
  });
  grid.appendChild(copyButton);

  panel.appendChild(grid);

  const note = document.createElement("p");
  note.className = "sernem-quick-actions-note";
  note.textContent = tr
    ? "AI ile belge oluşturan aksiyonlar mevcut günlük kullanım limitinden çalışır; Kopyala token kullanmaz."
    : "AI document actions use your existing daily allowance; Copy uses no token.";
  panel.appendChild(note);

  return panel;
}

function createFollowUpPanel(
  root: HTMLElement,
  data: CopilotResponse,
  tr: boolean,
) {
  const questions = (data.clarificationQuestions ?? []).filter(Boolean).slice(0, 4);
  if (!questions.length) return null;

  const panel = document.createElement("section");
  panel.className = "sernem-followup-panel";

  const header = document.createElement("div");
  header.className = "sernem-followup-header";

  const eyebrow = document.createElement("p");
  eyebrow.className = "sernem-followup-eyebrow";
  eyebrow.textContent = tr ? "AKILLI TAKİP" : "SMART FOLLOW-UP";

  const title = document.createElement("h3");
  title.className = "sernem-followup-title";
  title.textContent = tr
    ? "Saha kararını netleştirmek için eksik bilgileri tamamla"
    : "Complete the missing field details to sharpen the decision";

  const description = document.createElement("p");
  description.className = "sernem-followup-description";
  description.textContent = tr
    ? "Bir soruya dokun; Aslan AI cevabını mevcut konuşmanın devamı olarak kullanır."
    : "Tap a question; your answer continues the same work context.";

  header.append(eyebrow, title, description);
  panel.appendChild(header);

  const list = document.createElement("div");
  list.className = "sernem-followup-list";

  questions.forEach((question, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "sernem-followup-question";
    button.setAttribute("aria-label", question);

    const number = document.createElement("span");
    number.className = "sernem-followup-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const text = document.createElement("span");
    text.className = "sernem-followup-question-text";
    text.textContent = question;

    const action = document.createElement("span");
    action.className = "sernem-followup-action";
    action.textContent = tr ? "Yanıtla →" : "Answer →";

    button.append(number, text, action);
    button.addEventListener("click", () => primeComposer(root, question, tr));
    list.appendChild(button);
  });

  panel.appendChild(list);

  const note = document.createElement("div");
  note.className = "sernem-followup-note";
  note.innerHTML = tr
    ? "<span>✓</span> Aynı iş senaryosu korunur · yalnızca gönderdiğinde yeni AI çağrısı yapılır"
    : "<span>✓</span> Same work scenario is retained · a new AI call happens only when you send";
  panel.appendChild(note);

  return panel;
}

function createDetailedExtension(data: CopilotResponse, tr: boolean) {
  const extension = document.createElement("section");
  extension.className = "sernem-detail-extension";

  const label = document.createElement("div");
  label.className = "sernem-detail-label";
  label.textContent = tr ? "DETAYLI SAHA İNCELEMESİ" : "DETAILED FIELD REVIEW";
  extension.appendChild(label);

  const grid = document.createElement("div");
  grid.className = "sernem-detail-grid";

  const blocks = [
    createList(tr ? "Çalışma öncesi" : "Before starting", data.beforeStarting ?? [], "blue", 8),
    createList(tr ? "Çalışma sırasında" : "During work", data.duringWork ?? [], "green", 8),
    createList(tr ? "İş tamamlandığında" : "After completion", data.afterCompletion ?? [], "green", 8),
    createList(tr ? "Yaygın hatalar" : "Common failures", data.commonFailures ?? [], "red", 8),
    createList(tr ? "Hızlı kontrol listesi" : "Quick checklist", data.quickChecklist ?? [], "amber", 10),
  ];

  blocks.forEach((block) => {
    if (block) grid.appendChild(block);
  });

  if (grid.childElementCount) extension.appendChild(grid);

  if (data.recommendation) {
    const recommendation = document.createElement("div");
    recommendation.className = "sernem-detail-recommendation";

    const title = document.createElement("p");
    title.className = "sernem-detail-recommendation-title";
    title.textContent = tr ? "HSE önerisi" : "HSE recommendation";

    const text = document.createElement("p");
    text.className = "sernem-detail-recommendation-text";
    text.textContent = data.recommendation;

    recommendation.append(title, text);
    extension.appendChild(recommendation);
  }

  return extension.childElementCount > 1 ? extension : null;
}

function injectDecisionBrief(root: HTMLElement, data: CopilotResponse, locale: "tr" | "en") {
  const tr = locale === "tr";
  const assistantArticles = Array.from(
    root.querySelectorAll<HTMLElement>("article"),
  ).filter((article) => Boolean(article.querySelector("h2")));
  const article = assistantArticles[assistantArticles.length - 1];
  if (!article) return false;

  const body = Array.from(article.children).find((node) => {
    if (!(node instanceof HTMLElement)) return false;
    return typeof node.className === "string" && node.className.includes("max-w-[92%]");
  }) as HTMLElement | undefined;
  if (!body) return false;

  body.querySelector(".sernem-decision-brief")?.remove();
  body.querySelector(".sernem-detail-extension")?.remove();
  body.querySelector(".sernem-followup-panel")?.remove();
  body.querySelector(".sernem-quick-actions")?.remove();

  const nativeAnswer = Array.from(body.children).find((child) => {
    if (!(child instanceof HTMLElement)) return false;
    return child.classList.contains("mt-4") && Boolean(child.querySelector("h2"));
  }) as HTMLElement | undefined;
  if (!nativeAnswer) return false;

  markAnswerBlocks(body, nativeAnswer);

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
  risk.textContent = `Risk: ${data.riskLevel}`;
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
    4,
  );
  const stops = createList(
    tr ? "Durdurma tetikleyicileri" : "Stop-work triggers",
    data.stopWorkConditions ?? [],
    "red",
    4,
  );
  const missing = createList(
    tr ? "Eksik / doğrulanacak bilgi" : "Missing / verify",
    data.clarificationQuestions ?? [],
    "amber",
    4,
  );

  [controls, stops, missing].forEach((node) => {
    if (node) grid.appendChild(node);
  });
  panel.appendChild(grid);

  const note = document.createElement("p");
  note.className = "sernem-brief-note";
  note.textContent = tr
    ? "Ön değerlendirmedir; saha koşulları, izinler ve yetkili kişi kontrolleri doğrulanmalıdır."
    : "Preliminary field guidance; verify site conditions, permits and competent-person controls.";
  panel.appendChild(note);

  body.insertBefore(panel, nativeAnswer);

  const actions = createQuickActions(root, data, tr);
  panel.insertAdjacentElement("afterend", actions);

  const followUp = createFollowUpPanel(root, data, tr);
  if (followUp) actions.insertAdjacentElement("afterend", followUp);

  const detailed = createDetailedExtension(data, tr);
  if (detailed) nativeAnswer.insertAdjacentElement("afterend", detailed);

  classifyAnswerSections(root);
  markAnswerBlocks(body, nativeAnswer);
  return true;
}

export default function AIAnswerModeEnhancer({ locale }: Props) {
  const [mode, setMode] = useState<AnswerMode>("supervisor");
  const [host, setHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".sernem-ai-route");
    if (!root) return;

    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "brief" || saved === "supervisor" || saved === "detailed") {
      setMode(saved);
    }

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
    const originalFetch = window.fetch.bind(window);

    async function patchedFetch(
      input: RequestInfo | URL,
      init?: RequestInit,
    ): Promise<Response> {
      const response = await originalFetch(input, init);
      const requestUrl =
        typeof input === "string"
          ? input
          : input instanceof Request
            ? input.url
            : input.toString();

      if (requestUrl.includes("/api/ask") && response.ok) {
        void response
          .clone()
          .json()
          .then((payload: unknown) => {
            const data = (payload as { data?: CopilotResponse } | null)?.data;
            if (!data) return;

            const root = document.querySelector<HTMLElement>(".sernem-ai-route");
            if (!root) return;

            let attempts = 0;
            const place = () => {
              attempts += 1;
              classifyAnswerSections(root);
              if (!injectDecisionBrief(root, data, locale) && attempts < 20) {
                window.setTimeout(place, 60);
              }
            };
            window.setTimeout(place, 30);
          })
          .catch(() => undefined);
      }

      return response;
    }

    window.fetch = patchedFetch;
    return () => {
      window.fetch = originalFetch;
    };
  }, [locale]);

  if (!host) return null;

  const tr = locale === "tr";
  const options: { id: AnswerMode; label: string; short: string }[] = [
    {
      id: "brief",
      label: tr ? "Saha Özeti" : "Field Brief",
      short: tr ? "Kısa" : "Brief",
    },
    {
      id: "supervisor",
      label: "Supervisor",
      short: "Supervisor",
    },
    {
      id: "detailed",
      label: tr ? "Detaylı İnceleme" : "Detailed Review",
      short: tr ? "Detay" : "Detail",
    },
  ];

  return createPortal(
    <div
      className="sernem-answer-mode"
      aria-label={tr ? "Yanıt modu" : "Answer mode"}
    >
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
