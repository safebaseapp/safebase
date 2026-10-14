"use client";

import { useState } from "react";

export default function TrialDashboardCard({ locale, trialEndsAt, cancelled, accessEndsAt }: {
  locale: "tr" | "en"; trialEndsAt: string | null; cancelled: boolean; accessEndsAt: string | null;
}) {
  const tr = locale === "tr";
  const [confirmed, setConfirmed] = useState(cancelled);
  const [pending, setPending] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [ends, setEnds] = useState(accessEndsAt);
  const target = confirmed ? ends : trialEndsAt;
  const date = target ? new Intl.DateTimeFormat(tr ? "tr-TR" : "en-GB", {
    year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", timeZoneName: "short",
  }).format(new Date(target)) : null;

  async function cancel() {
    if (pending || confirmed) return;
    setConfirmOpen(false);
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
    <section className="mx-auto w-full max-w-[1660px] px-3 pt-4 sm:px-6 lg:px-8" aria-label="Premium trial billing">
      <div className="relative overflow-hidden rounded-[24px] border border-amber-300/20 bg-gradient-to-r from-[#081627] via-[#10213b] to-[#091525] p-5 text-white shadow-xl shadow-black/20 sm:p-7">
        <div className="absolute inset-y-0 left-0 w-1 bg-amber-300" />
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-300">SERNEM PREMIUM · {tr ? "ÜYELİK DURUMU" : "MEMBERSHIP STATUS"}</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">{confirmed ? (tr ? "Deneme iptal edildi" : "Trial cancelled") : (tr ? "24 Saat Premium Deneme" : "24-Hour Premium Trial")}</h2>
              <span className={`rounded-full border px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide ${confirmed ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : "border-amber-300/30 bg-amber-300/10 text-amber-200"}`}>{confirmed ? (tr ? "Yenileme kapalı" : "Renewal off") : (tr ? "Deneme aktif" : "Trial active")}</span>
            </div>
            <p className="mt-3 text-sm text-slate-300">{confirmed ? (tr ? "Otomatik yenileme kapatıldı. Kalan deneme süresince Premium erişimin devam eder." : "Automatic renewal is off. Premium access continues until your trial expires.") : (tr ? "Deneme bitmeden iptal edilmezse €9,99/ay tahsil edilir." : "€9.99/month will be charged unless cancelled before trial end.")}</p>
            <p className="mt-2 text-sm font-semibold text-white">{date ? `${confirmed ? (tr ? "Erişim bitişi" : "Access ends") : (tr ? "Deneme bitişi" : "Trial ends")}: ${date}` : (tr ? "Kesin bitiş saatini ödeme portalından kontrol et." : "Confirm the exact end time in your billing portal.")}</p>
            {message && <p className="mt-3 text-sm text-emerald-300" role="status">{message}</p>}
          </div>
          {!confirmed && <button type="button" onClick={() => setConfirmOpen(true)} disabled={pending} className="rounded-xl border border-slate-400/30 bg-white/[0.07] px-5 py-3 text-sm font-bold text-white transition hover:border-red-300/40 hover:bg-red-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300 disabled:opacity-50">{tr ? "Otomatik yenilemeyi kapat" : "Turn off auto-renewal"}</button>}
        </div>
      </div>
      {confirmOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020611]/85 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !pending) setConfirmOpen(false); }}>
          <div role="alertdialog" aria-modal="true" aria-labelledby="trial-cancel-title" aria-describedby="trial-cancel-desc" className="w-full max-w-lg rounded-[28px] border border-slate-600/50 bg-[#0d192c] p-6 text-white shadow-2xl sm:p-8" onKeyDown={(event) => { if (event.key === "Escape" && !pending) setConfirmOpen(false); }}>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">SERNEM PREMIUM</p>
            <h2 id="trial-cancel-title" className="mt-4 text-2xl font-extrabold">{tr ? "Otomatik yenilemeyi kapat?" : "Turn off automatic renewal?"}</h2>
            <p id="trial-cancel-desc" className="mt-3 text-sm leading-7 text-slate-300">{tr ? "Bu işlem gelecekteki otomatik tahsilatı durdurur. Premium erişimin mevcut deneme bitişine kadar devam eder. Bu hesabın ücretsiz deneme hakkı yeniden başlamaz." : "This stops future automatic billing. Premium access remains until the trial expires. This account cannot restart its free trial."}</p>
            {date && <p className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-sm font-semibold">{tr ? "Mevcut bitiş" : "Current expiry"}: {date}</p>}
            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setConfirmOpen(false)} disabled={pending} className="rounded-xl border border-slate-500/60 px-5 py-3 text-sm font-bold hover:bg-white/10 disabled:opacity-50">{tr ? "Vazgeç" : "Keep trial"}</button>
              <button type="button" onClick={cancel} disabled={pending} className="rounded-xl bg-rose-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-rose-500 disabled:opacity-50">{pending ? (tr ? "İptal doğrulanıyor..." : "Confirming cancellation...") : (tr ? "Yenilemeyi kapat" : "Turn off renewal")}</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
