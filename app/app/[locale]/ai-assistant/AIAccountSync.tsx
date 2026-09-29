"use client";

import { useEffect, useRef } from "react";

type Access = "guest" | "free" | "premium";

type Props = {
  access: Access;
  initialName: string;
  initialUsage: number;
};

function usageKey(access: Access) {
  return `sernem-ai-usage:${access}:${new Date().toISOString().slice(0, 10)}`;
}

export default function AIAccountSync({ access, initialName, initialUsage }: Props) {
  const lastNameRef = useRef(initialName);

  useEffect(() => {
    if (access === "guest") return;

    const key = usageKey(access);
    const safeUsage = Number.isFinite(initialUsage) ? Math.max(0, initialUsage) : 0;

    try {
      window.localStorage.setItem(key, String(safeUsage));
      if (initialName) {
        window.localStorage.setItem("sernem-ai-custom-name", initialName);
      }
    } catch {
      // Local storage can be unavailable in restricted browser contexts.
    }

    const nativeFetch = window.fetch.bind(window);
    let disposed = false;

    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
      const isAskRequest = url.includes("/api/ask");

      if (!isAskRequest) return nativeFetch(input, init);

      const consume = await nativeFetch("/api/ai/account-state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "consume" }),
      });

      if (!consume.ok) {
        const payload = await consume.text();
        return new Response(payload || "Daily AI limit reached", {
          status: consume.status,
          headers: { "Content-Type": "application/json" },
        });
      }

      const state = (await consume.clone().json().catch(() => null)) as
        | { usage?: number }
        | null;

      if (typeof state?.usage === "number") {
        try {
          window.localStorage.setItem(key, String(state.usage));
        } catch {
          // Ignore local storage failures.
        }
      }

      const response = await nativeFetch(input, init);

      if (!response.ok) {
        void nativeFetch("/api/ai/account-state", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "release" }),
        }).then(async (releaseResponse) => {
          const releaseState = (await releaseResponse.json().catch(() => null)) as
            | { usage?: number }
            | null;
          if (typeof releaseState?.usage === "number") {
            try {
              window.localStorage.setItem(key, String(releaseState.usage));
            } catch {
              // Ignore local storage failures.
            }
          }
        });
      }

      return response;
    };

    const nameSync = window.setInterval(() => {
      if (disposed) return;
      let currentName = "SERNEM AI";
      try {
        currentName = window.localStorage.getItem("sernem-ai-custom-name")?.trim() || "SERNEM AI";
      } catch {
        return;
      }

      currentName = currentName.replace(/\s+/g, " ").slice(0, 32);
      if (currentName === lastNameRef.current) return;
      lastNameRef.current = currentName;

      void nativeFetch("/api/ai/account-state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assistantName: currentName }),
      });
    }, 900);

    return () => {
      disposed = true;
      window.clearInterval(nameSync);
      window.fetch = nativeFetch;
    };
  }, [access, initialName, initialUsage]);

  return null;
}
