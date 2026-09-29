"use client";

import { useEffect } from "react";

type Props = { locale: "tr" | "en" };

const PERSONA_SRC = "/images/sernem-ai-human-avatar.jpg";

export default function AIPersonaEnhancer({ locale }: Props) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".sernem-ai-route");
    if (!root) return;

    let heroPersona = root.querySelector<HTMLImageElement>(".sernem-human-hero");
    const heroSection = root.querySelector<HTMLElement>(
      'section:has(> img[alt="HSE professional in an industrial environment"])',
    );

    if (heroSection && !heroPersona) {
      heroPersona = document.createElement("img");
      heroPersona.className = "sernem-human-hero";
      heroPersona.src = PERSONA_SRC;
      heroPersona.alt = locale === "tr" ? "SERNEM HSE profesyoneli" : "SERNEM HSE professional";
      heroPersona.decoding = "async";
      heroSection.appendChild(heroPersona);
    }

    const syncAvatars = () => {
      root
        .querySelectorAll<HTMLImageElement>(
          '.absolute.bottom-7.right-7 .relative.h-12.w-12 img, article .relative.mt-1.h-11.w-11 img',
        )
        .forEach((img) => {
          if (!img.src.endsWith(PERSONA_SRC)) {
            img.src = PERSONA_SRC;
            img.srcset = "";
          }
          img.style.opacity = "1";
        });
    };

    const syncState = () => {
      const textarea = root.querySelector<HTMLTextAreaElement>("textarea");
      const loading = Boolean(textarea?.disabled);
      root.dataset.aiState = loading ? "thinking" : "ready";

      const personaCard = root.querySelector<HTMLElement>(".absolute.bottom-7.right-7");
      if (!personaCard) return;
      const status = Array.from(personaCard.querySelectorAll<HTMLElement>("span")).find((node) => {
        const text = node.textContent?.trim();
        return text === "Ready" || text === "Hazır" || text === "Thinking" || text === "Düşünüyor";
      });
      if (!status) return;
      const desired = loading
        ? locale === "tr" ? "Düşünüyor" : "Thinking"
        : locale === "tr" ? "Hazır" : "Ready";
      const labelNode = Array.from(status.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
      if (labelNode && labelNode.textContent?.trim() !== desired) labelNode.textContent = ` ${desired}`;
    };

    syncAvatars();
    syncState();

    const listObserver = new MutationObserver(() => syncAvatars());
    listObserver.observe(root, { subtree: true, childList: true });

    const textareas = root.querySelectorAll("textarea");
    const stateObserver = new MutationObserver(syncState);
    textareas.forEach((textarea) => stateObserver.observe(textarea, { attributes: true, attributeFilter: ["disabled"] }));

    return () => {
      listObserver.disconnect();
      stateObserver.disconnect();
    };
  }, [locale]);

  return null;
}
