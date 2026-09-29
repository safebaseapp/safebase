"use client";

import { useEffect } from "react";

type Props = { locale: "tr" | "en" };

export default function AIPersonaEnhancer({ locale }: Props) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".sernem-ai-route");
    if (!root) return;

    const sync = () => {
      const textarea = root.querySelector<HTMLTextAreaElement>("textarea");
      const loading = Boolean(textarea?.disabled);
      root.dataset.aiState = loading ? "thinking" : "ready";

      const personaCard = root.querySelector<HTMLElement>(".absolute.bottom-7.right-7");
      if (personaCard) {
        const status = Array.from(personaCard.querySelectorAll("span")).find((node) => {
          const text = node.textContent?.trim();
          return text === "Ready" || text === "Hazır" || text === "Thinking" || text === "Düşünüyor";
        });
        if (status) {
          status.innerHTML = `<i class=\"h-1.5 w-1.5 rounded-full bg-emerald-400\"></i>${loading ? (locale === "tr" ? "Düşünüyor" : "Thinking") : (locale === "tr" ? "Hazır" : "Ready")}`;
        }
      }
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { subtree: true, childList: true, attributes: true, attributeFilter: ["disabled"] });
    return () => observer.disconnect();
  }, [locale]);

  return null;
}
