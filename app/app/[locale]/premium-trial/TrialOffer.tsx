"use client";

import { useState } from "react";
import Link from "next/link";

export default function TrialOffer({ locale }: { locale: "tr" | "en" }) {
  const tr = locale === "tr";
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function start() {
    if (!accepted || busy) return;
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/premium-trial/checkout", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accepted: true, locale })
      });
      const result = await response.json();
      if (!response.ok || !result?.url) throw new Error(result?.error || "Unable to start checkout");
      window.location.assign(result.url);
    } catch (err) { setError(err instanceof Error ? err.message : "Checkout failed"); setBusy(false); }
  }
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-20 text-white">
      <section className="mx-auto max-w-xl rounded-3xl border border-indigo-500/40 bg-slate-900 p-8 shadow-2xl">
        <div className="text-sm font-bold uppercase tracking-widest text-indigo-300">SERNEM Premium</div>
        <h1 className="mt-4 text-4xl font-extrabold">{tr ? "24 Saat Ücretsiz Premium" : "24 Hours of Premium — Free"}</h1>
        <p className="mt-4 text-slate-300">{tr ? "Premium özelliklerin tamamını dene. Kart bilgileriniz yalnızca Lemon Squeezy ödeme ekranında alınır." : "Explore all Premium features. Payment details are entered only through Lemon Squeezy."}</p>
        <div className="mt-6 rounded-xl bg-slate-800 p-5">
          <p className="text-xl font-bold">{tr ? "Şimdi: €0" : "Today: €0"}</p>
          <p className="mt-2 text-lg font-semibold">{tr ? "24 saat sonra: €9,99/ay" : "After 24 hours: €9.99/month"}</p>
          <p className="mt-2 text-sm text-slate-300">{tr ? "Deneme sona ermeden iptal edilmezse aboneliğin otomatik olarak ücretli hale gelir ve aylık yenilenir. Kesin ilk tahsilat zamanı ödeme sağlayıcısının abonelik kaydına göre belirlenir." : "Unless cancelled before your trial ends, your subscription automatically becomes paid and renews monthly. The precise first charge time follows the provider's subscription record."}</p>
        </div>
        <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm leading-6">
          <input type="checkbox" className="mt-1 h-5 w-5 accent-indigo-600" checked={accepted} onChange={e => setAccepted(e.target.checked)} />
          <span>{tr ? "24 saatlik ücretsiz denemeden sonra iptal etmezsem €9,99/ay ücretlendirileceğimi, aylık otomatik yenilemeyi ve deneme süresi dolmadan iptal edebileceğimi anlıyorum." : "I understand that if I do not cancel before my 24-hour trial ends, I will be charged €9.99 per month on an automatically renewing subscription, and I can cancel before trial expiry."}</span>
        </label>
        <p className="mt-4 text-xs text-slate-400">{tr ? "Yasal cayma ve iade hakların saklıdır. Abonelik yönetimi SERNEM hesabından ve Lemon Squeezy müşteri portalından sağlanacaktır." : "Statutory withdrawal and refund rights remain applicable. Subscription management will be available in your SERNEM account and Lemon Squeezy customer portal."}</p>
        <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-indigo-300" aria-label={tr ? "Yasal belgeler" : "Legal documents"}>
          <Link className="underline underline-offset-4" href={`/${locale}/terms`} target="_blank" rel="noopener noreferrer">{tr ? "Kullanım Koşulları" : "Terms of Use"}</Link>
          <Link className="underline underline-offset-4" href={`/${locale}/privacy`} target="_blank" rel="noopener noreferrer">{tr ? "Gizlilik Politikası" : "Privacy Policy"}</Link>
          <Link className="underline underline-offset-4" href={`/${locale}/premium-trial/conditions`} target="_blank" rel="noopener noreferrer">{tr ? "Deneme ve iptal koşulları" : "Trial and cancellation conditions"}</Link>
        </nav>
        {error && <p className="mt-4 text-red-300" role="alert">{error}</p>}
        <button type="button" onClick={start} disabled={!accepted || busy} className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-4 font-bold disabled:cursor-not-allowed disabled:opacity-40">{busy ? (tr ? "Güvenli ödeme açılıyor..." : "Opening secure checkout...") : (tr ? "Denemeyi Başlat — Sonra €9,99/ay" : "Start Free Trial — Then €9.99/month")}</button>
      </section>
    </main>
  );
}
