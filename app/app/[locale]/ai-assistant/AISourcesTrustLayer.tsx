"use client";

import { useEffect } from "react";

type Props = { locale: "tr" | "en" };

function isHeadingMatch(value: string, terms: string[]) {
  const normalized = value.trim().toLowerCase();
  return terms.some((term) => normalized.includes(term));
}

function countSourceChips(block: HTMLElement | null) {
  if (!block) return 0;
  const candidates = Array.from(
    block.querySelectorAll<HTMLElement>("a, button, span"),
  ).filter((node) => {
    const text = node.textContent?.trim() ?? "";
    return text.length > 1 && text.length < 90;
  });
  return new Set(candidates.map((node) => node.textContent?.trim())).size;
}

function findSourceBlock(body: HTMLElement) {
  return (
    Array.from(body.children).find((child) => {
      if (!(child instanceof HTMLElement)) return false;
      const text = child.textContent?.trim().toLowerCase() ?? "";
      return text.includes("kaynaklar") || text.includes("sources");
    }) as HTMLElement | undefined
  ) ?? null;
}

function findStandardsSection(article: HTMLElement) {
  return (
    Array.from(article.querySelectorAll<HTMLElement>("section")).find((section) => {
      const heading = section.querySelector("h3")?.textContent ?? "";
      return isHeadingMatch(heading, ["uygulanabilir standartlar", "applicable standards"]);
    }) ?? null
  );
}

function buildTrustPanel(
  locale: "tr" | "en",
  sourceCount: number,
  standardCount: number,
) {
  const tr = locale === "tr";
  const panel = document.createElement("section");
  panel.className = "sernem-trust-layer";

  const top = document.createElement("div");
  top.className = "sernem-trust-top";

  const copy = document.createElement("div");
  const eyebrow = document.createElement("p");
  eyebrow.className = "sernem-trust-eyebrow";
  eyebrow.textContent = tr ? "KAYNAK & GÜVEN KATMANI" : "SOURCES & TRUST LAYER";

  const title = document.createElement("h3");
  title.className = "sernem-trust-title";
  title.textContent = tr
    ? "Bu yanıtı nasıl kullanmalısın?"
    : "How should you use this guidance?";

  const description = document.createElement("p");
  description.className = "sernem-trust-description";
  description.textContent = tr
    ? "SERNEM bilgiyi kaynağıyla gösterir; saha kararı ise güncel koşullar, izinler ve yetkili kişi doğrulamasıyla tamamlanır."
    : "SERNEM shows the knowledge behind the answer; the field decision is completed by current conditions, permits and competent-person verification.";

  copy.append(eyebrow, title, description);

  const badges = document.createElement("div");
  badges.className = "sernem-trust-badges";

  const knowledge = document.createElement("span");
  knowledge.className = "sernem-trust-badge is-knowledge";
  knowledge.textContent = tr ? "SERNEM BİLGİ TABANI" : "SERNEM KNOWLEDGE";
  badges.appendChild(knowledge);

  if (sourceCount > 0) {
    const sourceBadge = document.createElement("span");
    sourceBadge.className = "sernem-trust-badge";
    sourceBadge.textContent = tr
      ? `${sourceCount} kaynak`
      : `${sourceCount} source${sourceCount === 1 ? "" : "s"}`;
    badges.appendChild(sourceBadge);
  }

  if (standardCount > 0) {
    const standardsBadge = document.createElement("span");
    standardsBadge.className = "sernem-trust-badge is-standard";
    standardsBadge.textContent = tr
      ? `${standardCount} standart referansı`
      : `${standardCount} standard reference${standardCount === 1 ? "" : "s"}`;
    badges.appendChild(standardsBadge);
  }

  top.append(copy, badges);
  panel.appendChild(top);

  const grid = document.createElement("div");
  grid.className = "sernem-trust-grid";

  const cards = [
    {
      icon: "✓",
      title: tr ? "Kaynak desteği" : "Source-backed",
      text:
        sourceCount > 0
          ? tr
            ? "Yanıt, ilgili SERNEM bilgi kaynaklarıyla desteklenmiştir."
            : "The answer is supported by relevant SERNEM knowledge sources."
          : tr
            ? "Yanıt genel HSE rehberliği olarak sunulmaktadır."
            : "The answer is presented as general HSE guidance.",
    },
    {
      icon: "◎",
      title: tr ? "Standart bağlamı" : "Standards context",
      text:
        standardCount > 0
          ? tr
            ? "Listelenen standartlar potansiyel olarak uygulanabilir; ülke, sektör, sözleşme ve saha prosedürüyle doğrulanmalıdır."
            : "Listed standards may be applicable; verify them against jurisdiction, industry, contract and site procedure."
          : tr
            ? "Standart uygulanabilirliği işin yeri, sektörü ve saha kurallarına göre değişebilir."
            : "Standards applicability can vary by jurisdiction, industry and site rules.",
    },
    {
      icon: "!",
      title: tr ? "Saha doğrulaması" : "Field verification",
      text: tr
        ? "İzinler, izolasyonlar, atmosfer koşulları ve yetkili kişi kontrolleri sahada doğrulanmadan işe başlanmamalıdır."
        : "Do not begin work until permits, isolations, atmospheric conditions and competent-person checks are verified in the field.",
    },
  ];

  cards.forEach((item) => {
    const card = document.createElement("div");
    card.className = "sernem-trust-card";

    const icon = document.createElement("span");
    icon.className = "sernem-trust-icon";
    icon.textContent = item.icon;

    const content = document.createElement("div");
    const heading = document.createElement("p");
    heading.className = "sernem-trust-card-title";
    heading.textContent = item.title;
    const text = document.createElement("p");
    text.className = "sernem-trust-card-text";
    text.textContent = item.text;
    content.append(heading, text);

    card.append(icon, content);
    grid.appendChild(card);
  });

  panel.appendChild(grid);
  return panel;
}

function enhanceArticle(article: HTMLElement, locale: "tr" | "en") {
  if (article.dataset.sernemTrustReady === "true") return;

  const body = Array.from(article.children).find((node) => {
    if (!(node instanceof HTMLElement)) return false;
    return typeof node.className === "string" && node.className.includes("max-w-[92%]");
  }) as HTMLElement | undefined;
  if (!body) return;

  const sourceBlock = findSourceBlock(body);
  const standardsSection = findStandardsSection(article);
  const sourceCount = countSourceChips(sourceBlock);
  const standardCount = standardsSection?.querySelectorAll("li").length ?? 0;

  const anchor = sourceBlock ?? body.lastElementChild;
  if (!(anchor instanceof HTMLElement)) return;

  body.querySelector(".sernem-trust-layer")?.remove();
  const panel = buildTrustPanel(locale, sourceCount, standardCount);

  if (sourceBlock) {
    body.insertBefore(panel, sourceBlock);
  } else {
    anchor.insertAdjacentElement("afterend", panel);
  }

  article.dataset.sernemTrustReady = "true";
}

export default function AISourcesTrustLayer({ locale }: Props) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".sernem-ai-route");
    if (!root) return;

    let scheduled = false;
    const run = () => {
      scheduled = false;
      root.querySelectorAll<HTMLElement>("article").forEach((article) => {
        if (article.querySelector("h2")) enhanceArticle(article, locale);
      });
    };

    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(run);
    };

    schedule();
    const observer = new MutationObserver(schedule);
    observer.observe(root, { subtree: true, childList: true });

    return () => observer.disconnect();
  }, [locale]);

  return null;
}
