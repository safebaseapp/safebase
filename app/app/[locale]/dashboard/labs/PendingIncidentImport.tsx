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
          router.refresh();
        }
      } catch {}
    }

    void importPending();
    return () => { cancelled = true; };
  }, [router]);

  return null;
}
