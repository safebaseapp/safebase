"use client";

import { useCallback, useEffect, useState } from "react";

type Subscription = {
  status: string | null;
  cancelled: boolean;
  renewsAt: string | null;
  endsAt: string | null;
  paidThroughAt: string | null;
  paidVerifiedAt: string | null;
  trialEndsAt: string | null;
};
type BillingInfo = {
  plan: "free" | "premium";
  premiumAccess: boolean;
  protectedAccount: boolean;
  billingManaged: boolean;
  subscription: Subscription | null;
};
type MarketingInfo = {
  marketingEmailOptIn: boolean;
  changedAt: string | null;
};
type Props = {
  locale: "tr" | "en";
  onAccessChange: (allowed: boolean) => void;
};

export default function BillingPreferencesPanel({ locale, onAccessChange }: Props) {
  const tr = locale === "tr";
  const [billing, setBilling] = useState<BillingInfo | null>(null);
  const [marketing, setMarketing] = useState<MarketingInfo | null>(null);
  const [billingLoading, setBillingLoading] = useState(true);
  const [marketingLoading, setMarketingLoading] = useState(true);
  const [billingBusy, setBillingBusy] = useState(false);
  const [marketingBusy, setMarketingBusy] = useState(false);
  const [billingError, setBillingError] = useState("");
  const [marketingError, setMarketingError] = useState("");
  const [billingNotice, setBillingNotice] = useState("");
  const [marketingNotice, setMarketingNotice] = useState("");

  const reloadBilling = useCallback(async () => {
    const response = await fetch("/api/account/subscription", { cache: "no-store" });
    const data = await response.json().catch(() => null);
    if (!response.ok || !data) throw new Error(data?.error || "Billing status unavailable");
    setBilling(data);
    onAccessChange(data.premiumAccess === true);
  }, [onAccessChange]);

  const reloadMarketing = useCallback(async () => {
    const response = await fetch("/api/account/marketing-preferences", { cache: "no-store" });
    const data = await response.json().catch(() => null);
    if (!response.ok || !data) throw new Error(data?.error || "Preference unavailable");
    setMarketing(data);
  }, []);

  useEffect(() => {
    let alive = true;
    setBillingLoading(true);
    setMarketingLoading(true);
    // All requests are scoped by the authenticated Supabase session.
    reloadBilling().catch((error) => { if (alive) setBillingError(String(error.message || error)); })
      .finally(() => { if (alive) setBillingLoading(false); });
    reloadMarketing().catch((error) => { if (alive) setMarketingError(String(error.message || error)); })
      .finally(() => { if (alive) setMarketingLoading(false); });
    return () => { alive = false; };
  }, [reloadBilling, reloadMarketing]);

  const dateText = (date: string | null | undefined) => {
    if (!date || !Number.isFinite(Date.parse(date))) return tr ? "Belirtilmedi" : "Not available";
    return new Intl.DateTimeFormat(tr ? "tr-TR" : "en-GB", {
      dateStyle: "long", timeStyle: "short", timeZone: "Europe/Budapest",
    }).format(new Date(date));
  };
  const expired = billing?.subscription?.endsAt &&
    Date.parse(billing.subscription.endsAt) <= Date.now();
  const isCancelled = Boolean(billing?.subscription?.cancelled ||
    billing?.subscription?.status === "cancelled");
  const isTrial = billing?.subscription?.status === "on_trial";
  const cancellable = Boolean(billing?.billingManaged && !billing?.protectedAccount &&
    !isCancelled && !expired && ["active", "on_trial", "paid"].includes(billing.subscription?.status || ""));
  const paidUntil = billing?.subscription?.paidThroughAt;
  const effectiveEnd = isCancelled
    ? ((paidUntil && Date.parse(paidUntil) > Date.now()) ? paidUntil :
      billing?.subscription?.trialEndsAt || billing?.subscription?.endsAt)
    : isTrial ? billing?.subscription?.trialEndsAt : billing?.subscription?.renewsAt;

  async function cancelRenewal() {
    if (billingBusy || !cancellable) return;
    const message = tr
      ? "Aboneliğinizin otomatik yenilemesini durdurmak istiyor musunuz? Ödenmiş döneminiz veya mevcut ücretsiz denemeniz varsa, uygun bitiş tarihine kadar erişiminiz korunur."
      : "Stop automatic subscription renewal? Any valid paid period or remaining free trial will remain accessible until its applicable end date.";
    if (!window.confirm(message)) return;
    setBillingBusy(true);
    setBillingError("");
    setBillingNotice("");
    try {
      const response = await fetch("/api/account/subscription", { method: "DELETE", cache: "no-store" });
      const data = await response.json().catch(() => null);
      if (!data?.confirmed) throw new Error(data?.error || "Cancellation could not be confirmed");
      setBillingNotice(data.warning
        ? (tr ? "Ödeme sağlayıcısı iptali onayladı; hesap durumu eşitleniyor. Yeniden kontrol edebilirsiniz." :
          "Cancellation confirmed by payment provider; account is synchronizing.")
        : (tr ? "Otomatik yenileme iptal edildi. Mevcut erişiminiz geçerli bitiş tarihine kadar korunur." :
          "Automatic renewal cancelled. Your existing access remains valid until the applicable end date."));
      await reloadBilling();
    } catch (error) {
      setBillingError(tr ? "İptal tamamlanamadı. Lütfen tekrar deneyin veya ödeme portalını kullanın." :
        "Cancellation could not be confirmed. Retry or use the billing portal.");
      console.error("Cancellation action failed", error);
    } finally {
      setBillingBusy(false);
    }
  }


  async function resumeRenewal() {
    const end = Date.parse(billing?.subscription?.endsAt || "");
    if (billingBusy || !isCancelled || !billing?.billingManaged ||
      billing.protectedAccount || !Number.isFinite(end) || end <= Date.now()) return;
    if (!window.confirm(tr
      ? "Aboneliği yeniden etkinleştirmek istiyor musunuz? Dönem sonunda otomatik ödeme yeniden başlayabilir."
      : "Reactivate your subscription? Automatic payments may resume at the next billing renewal.")) return;
    setBillingBusy(true);
    setBillingError("");
    setBillingNotice("");
    try {
      const response = await fetch("/api/account/subscription", { method: "PATCH", cache: "no-store" });
      const data = await response.json().catch(() => null);
      if (!data?.confirmed) throw new Error(data?.error || "Resumption not confirmed");
      setBillingNotice(tr ? "Abonelik yeniden etkinleştirildi." : "Subscription reactivated.");
      await reloadBilling();
    } catch (error) {
      console.error("Resumption failed", error);
      setBillingError(tr ? "Yeniden etkinleştirme doğrulanamadı. Ödeme portalından kontrol edin." :
        "Reactivation could not be confirmed. Check the billing portal.");
    } finally {
      setBillingBusy(false);
    }
  }

  async function openBillingPortal() {
    setBillingBusy(true);
    setBillingError("");
    try {
      const response = await fetch("/api/account/subscription", { method: "POST", cache: "no-store" });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.url) throw new Error(data?.error || "Portal unavailable");
      // Signed URL comes from server-authenticated Lemon API, never a user-entered URL.
      const portal = new URL(data.url);
      if (portal.protocol !== "https:") throw new Error("Unsafe portal URL");
      window.location.assign(portal.href);
    } catch (error) {
      console.error("Billing portal failed", error);
      setBillingError(tr ? "Ödeme portalı açılamadı. Daha sonra tekrar deneyin." : "Billing portal unavailable. Please try again.");
      setBillingBusy(false);
    }
  }

  async function updateMarketing(next: boolean) {
    if (marketingBusy) return;
    setMarketingBusy(true);
    setMarketingError("");
    setMarketingNotice("");
    try {
      const response = await fetch("/api/account/marketing-preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ marketingEmailOptIn: next }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.ok) throw new Error(data?.error || "Preference was not saved");
      setMarketing(data);
      setMarketingNotice(next
        ? (tr ? "Pazarlama e-postası izniniz kaydedildi." : "Marketing email permission saved.")
        : (tr ? "Pazarlama e-postası izniniz kapatıldı." : "Marketing emails turned off."));
    } catch (error) {
      console.error("Marketing preference update failed", error);
      setMarketingError(tr ? "Tercih kaydedilemedi. Lütfen tekrar deneyin." : "Could not save your preference. Please retry.");
    } finally {
      setMarketingBusy(false);
    }
  }

  return (
    <>
      <section id="subscription-preferences" className="scroll-mt-24 rounded-[26px] border border-violet-400/20 bg-slate-900/70 p-6" aria-labelledby="subscription-heading">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-300">SERNEM PREMIUM</p>
        <h2 id="subscription-heading" className="mt-3 text-xl font-black">
          {tr ? "Premium Aboneliğimi Yönet" : "Manage Premium Subscription"}
        </h2>
        {billingLoading ? <p className="mt-4 text-sm text-slate-400">{tr ? "Abonelik doğrulanıyor…" : "Verifying subscription…"}</p>
          : billingError && !billing ? <p role="alert" className="mt-4 text-sm text-rose-300">{billingError}</p>
          : billing ? (
            <>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-slate-950/45 p-4">
                  <p className="text-xs text-slate-400">{tr ? "Hesap erişimi" : "Account access"}</p>
                  <p className="mt-2 font-bold">{billing.premiumAccess ? "Premium" : "Free"}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-slate-950/45 p-4">
                  <p className="text-xs text-slate-400">{tr ? "Yenileme durumu" : "Renewal status"}</p>
                  <p className="mt-2 font-bold">
                    {billing.protectedAccount ? (tr ? "Yönetici hesabı" : "Administrator account")
                      : !billing.billingManaged ? (tr ? "Otomatik abonelik yok" : "No recurring subscription")
                      : isCancelled ? (tr ? "Yenileme kapalı" : "Renewal cancelled")
                      : (tr ? "Otomatik yenileme açık" : "Recurring billing active")}
                  </p>
                </div>
              </div>
              {billing.subscription && (
                <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/30 p-4 text-sm text-slate-300">
                  <p>{isCancelled
                    ? (tr ? "Premium erişiminin geçerli olabileceği son tarih" : "Applicable access end date")
                    : isTrial ? (tr ? "Ücretsiz denemenin bitişi" : "Free trial ends")
                    : (tr ? "Planlanan sonraki yenileme" : "Scheduled next renewal")}</p>
                  <p className="mt-2 font-bold text-white">{dateText(effectiveEnd)}</p>
                  <p className="mt-3 text-xs leading-6 text-slate-400">
                    {tr
                      ? "Ücretsiz deneme iptalinde yeni ücretli dönem verilmez. Ücretli dönemde iptal ederseniz ödenmiş süreniz bitene kadar Premium devam eder; sonra Free planına dönersiniz."
                      : "Cancelling a free trial does not create a paid period. Cancelling a paid subscription preserves Premium until the paid term ends, then Free access applies."}
                  </p>
                </div>
              )}
              {billing.billingManaged && !billing.protectedAccount && (
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  {cancellable && (
                    <button type="button" disabled={billingBusy} onClick={cancelRenewal}
                      className="min-h-11 rounded-xl border border-rose-400/40 px-5 py-3 text-sm font-bold text-rose-200 transition hover:bg-rose-400/10 disabled:opacity-60">
                      {billingBusy ? (tr ? "İşleniyor…" : "Processing…") :
                        (tr ? "Aboneliği İptal Et" : "Cancel Subscription")}
                    </button>
                  )}
                  {isCancelled && Number.isFinite(Date.parse(billing.subscription?.endsAt || "")) &&
                    Date.parse(billing.subscription?.endsAt || "") > Date.now() && (
                    <button type="button" disabled={billingBusy} onClick={resumeRenewal}
                      className="min-h-11 rounded-xl border border-emerald-400/40 px-5 py-3 text-sm font-bold text-emerald-200 transition hover:bg-emerald-400/10 disabled:opacity-60">
                      {tr ? "Aboneliği Yeniden Başlat" : "Reactivate Subscription"}
                    </button>
                  )}
                  <button type="button" disabled={billingBusy} onClick={openBillingPortal}
                    className="min-h-11 rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10 disabled:opacity-60">
                    {tr ? "Ödeme Portalını Aç" : "Open Billing Portal"}
                  </button>
                </div>
              )}
              {!billing.billingManaged && !billing.protectedAccount && (
                <p className="mt-4 text-sm text-slate-400">{tr
                  ? "Hesabınıza bağlı otomatik yenilenen bir Lemon Squeezy aboneliği bulunmuyor. Satın aldığınız bir abonelik görünmüyorsa destek ile iletişime geçin."
                  : "No Lemon Squeezy recurring subscription is linked to this account. Contact support if a purchase is missing."}</p>
              )}
            </>
          ) : null}
        {billingError && billing && <p role="alert" className="mt-3 text-sm text-rose-300">{billingError}</p>}
        {billingNotice && <p role="status" className="mt-3 text-sm leading-6 text-emerald-300">{billingNotice}</p>}
      </section>

      <section className="rounded-[26px] border border-blue-400/20 bg-slate-900/70 p-6" aria-labelledby="marketing-heading">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-300">{tr ? "E-POSTA TERCİHLERİ" : "EMAIL PREFERENCES"}</p>
        <h2 id="marketing-heading" className="mt-3 text-xl font-black">
          {tr ? "Pazarlama E-postaları" : "Marketing Emails"}
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-400">
          {tr
            ? "Premium teklifleri, ürün haberleri ve kampanya e-postalarını ayrı bir tercihle yönetebilirsiniz. Hesap güvenliği, ödeme dekontu veya talep ettiğiniz hizmetle ilgili zorunlu e-postalar bu tercihten etkilenmez."
            : "Control promotional Premium offers and product updates independently. Essential account-security, payment-receipt and requested service messages are not affected."}
        </p>
        {marketingLoading ? <p className="mt-4 text-sm text-slate-400">{tr ? "Tercihiniz yükleniyor…" : "Loading preference…"}</p>
          : marketing ? (
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-bold text-white">
                {marketing.marketingEmailOptIn
                  ? (tr ? "Pazarlama e-postaları açık" : "Marketing emails enabled")
                  : (tr ? "Pazarlama e-postaları kapalı" : "Marketing emails disabled")}
              </p>
              <button type="button" disabled={marketingBusy}
                onClick={() => updateMarketing(!marketing.marketingEmailOptIn)}
                className="min-h-11 rounded-xl border border-sky-400/40 px-5 py-3 text-sm font-bold text-sky-100 hover:bg-sky-400/10 disabled:opacity-60">
                {marketingBusy ? (tr ? "Kaydediliyor…" : "Saving…") :
                  marketing.marketingEmailOptIn ? (tr ? "Pazarlama E-postalarından Çık" : "Unsubscribe from Marketing Emails")
                    : (tr ? "Pazarlama E-postalarını Aç" : "Opt In to Marketing Emails")}
              </button>
            </div>
          ) : null}
        {marketingError && <p role="alert" className="mt-3 text-sm text-rose-300">{marketingError}</p>}
        {marketingNotice && <p role="status" className="mt-3 text-sm text-emerald-300">{marketingNotice}</p>}
        <p className="mt-4 text-xs text-slate-500">{tr
          ? "İzniniz siz açmadıkça verilmiş sayılmaz. Çıkış tercihinizi istediğiniz zaman tekrar değiştirebilirsiniz."
          : "You are not opted in unless you explicitly choose to subscribe. You can change this preference any time."}</p>
      </section>
    </>
  );
}
