"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const KEY = "sernem_pending_incident_attempt";

export default function PendingIncidentImport() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    async function importPending() {
      let raw: string | null = null;
      try { raw = window.localStorage.getItem(KEY); } catch { return; }
      if (!raw) return;

      let payload: unknown;
      try { payload = JSON.parse(raw); } catch {
        window.localStorage.removeItem(KEY);
        return;
      }

      try {
        const response = await fetch("/api/labs/incident-attempt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!cancelled && response.ok) {
          window.localStorage.removeItem(KEY);
          window.dispatchEvent(new Event("sernem:labs-updated"));
          router.refresh();
          return;
        }

        // Keep the payload locally when the database/API is temporarily unavailable.
        // It will be retried on the next dashboard visit instead of silently losing the result.
      } catch {
        // Retain pending payload for the next retry.
      }
    }

    void importPending();
    return () => { cancelled = true; };
  }, [router]);

  return null;
}
