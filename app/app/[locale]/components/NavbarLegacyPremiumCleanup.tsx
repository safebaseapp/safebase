"use client";

import { useEffect } from "react";

export default function NavbarLegacyPremiumCleanup() {
  useEffect(() => {
    const cleanLegacyPremium = () => {
      const nav = document.querySelector("nav");
      if (!nav) return;

      nav.querySelectorAll<HTMLElement>("a, button").forEach((element) => {
        const text = element.textContent?.replace(/\s+/g, " ").trim().toLowerCase() ?? "";
        const isLegacyPricedPremium = text.includes("premium") && text.includes("€9.99");

        if (isLegacyPricedPremium) {
          element.setAttribute("aria-hidden", "true");
          element.style.setProperty("display", "none", "important");
        }
      });
    };

    cleanLegacyPremium();

    const observer = new MutationObserver(cleanLegacyPremium);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
