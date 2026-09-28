"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function NavbarLegacyPremiumCleanup() {
  useEffect(() => {
    let cancelled = false;
    let isPremiumUser = false;

    const cleanPremiumNav = () => {
      const nav = document.querySelector("nav");
      if (!nav) return;

      nav.querySelectorAll<HTMLElement>("a, button").forEach((element) => {
        const text = element.textContent?.replace(/\s+/g, " ").trim().toLowerCase() ?? "";
        const href = element instanceof HTMLAnchorElement ? element.getAttribute("href") ?? "" : "";
        const isPremiumElement = text.includes("premium") || href.includes("/upgrade");
        const isLegacyPricedPremium = text.includes("premium") && text.includes("€9.99");

        if (isLegacyPricedPremium || (isPremiumUser && isPremiumElement)) {
          element.setAttribute("aria-hidden", "true");
          element.style.setProperty("display", "none", "important");
        }
      });
    };

    async function resolvePlan() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || cancelled) {
          cleanPremiumNav();
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("plan,role")
          .eq("id", user.id)
          .maybeSingle();

        if (!cancelled) {
          isPremiumUser = profile?.plan === "premium" || profile?.role === "admin";
          cleanPremiumNav();
        }
      } catch {
        cleanPremiumNav();
      }
    }

    void resolvePlan();
    cleanPremiumNav();

    const observer = new MutationObserver(cleanPremiumNav);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  return null;
}
