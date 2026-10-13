"use client";

import { useState } from "react";

export default function TrialDashboardCard({ locale, trialEndsAt, cancelled, accessEndsAt }: {
  locale: "tr" | "en"; trialEndsAt: string | null; cancelled: boolean; accessEndsAt: string | null;
}) {
  const tr = locale === "tr";
  const [confirmed, setConfirmed] = useState(cancelled);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [ends, setEnds] = useState(accessEndsAt);
  const target = confirmed ? ends : trialEndsAt;
  const date = target ? new Intl.DateTimeFormat(tr ? "tr-TR" : "en-GB", {
    dateStyle: "medium", timeStyle: "short", timeZoneName: "short",
  }).format(new Date(target)) : null;

  async function cancel() {
    if (pending || confirmed) return;
    if (!window.confirm(tr ? "Denemeyi iptal etmek istiyor musun? Bu işlem otomatik yenilemeyi durdurur." : "Cancel this trial and stop automatic renewal?")) return;
    setPending(true); setMessage("");
    try {
      const response = await fetch("/api/premium-trial/cancel", { method: "POST" });
      const result = await response.json();
      if (!response.ok || result.confirmed !== true) throw new Error(result.error || "Cancellation could not be verified");
      setConfirmed(true);
      setEnds(result.accessEndsAt ?? null);
      setMessage(result.warning
        ? (tr ? "Ödeme sağlayıcısı iptali onayladı; hesap bilgilerinin eşitlenmesi bekleniyor." : "Cancellation confirmed by provider; account sync is pending.")
        : (tr ? "İptal Lemon Squeezy tarafından onaylandı." : "Cancellation confirmed by Lemon Squeezy."));
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Cancellation could not be verified");
    } finally { setPending(false); }
  }

  return (
    <section className="mx-auto mt-3 mb-5 w-full max-w-7xl rounded-2xl border border-indigo-500/40 bg-slate-900 p-5 text-white" aria-label="Premium trial billing">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300">SERNEM Premium</p>
          <h2 className="mt-1 text-lg font-bold">{confirmed ? (tr ? "Deneme iptal edildi" : "Trial cancelled") : (tr ? "24 Saat Premium Deneme" : "24-Hour Premium Trial")}</h2>
          <p className="mt-1 text-sm text-slate-300">{confirmed
            ? (tr ? "Otomatik yenileme kapatıldı." : "Automatic renewal has been disabled.")
            : (tr ? "Deneme bitmeden iptal edilmezse €9,99/ay tahsil edilir." : "€9.99/month will be charged unless cancelled before trial end.")}</p>
          <p className="mt-2 text-sm text-slate-200">{date
            ? `${confirmed ? (tr ? "Erişim bitişi" : "Access ends") : (tr ? "Deneme bitişi" : "Trial ends")}: ${date}`
            : (tr ? "Kesin bitiş saatini ödeme portalından kontrol et." : "Confirm the exact expiration time in your billing portal.")}</p>
        </div>
        {!confirmed && <button onClick={cancel} disabled={pending} className="rounded-xl border border-slate-500 px-5 py-3 text-sm font-semibold hover:bg-slate-800 disabled:opacity-50">{pending ? (tr ? "Doğrulanıyor..." : "Verifying...") : (tr ? "Denemeyi iptal et" : "Cancel free trial")}</button>}
      </div>
      {message && <p className="mt-3 text-sm" role="status">{message}</p>}
    </section>
  );
}
