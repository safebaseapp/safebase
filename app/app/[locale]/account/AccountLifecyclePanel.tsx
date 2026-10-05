"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type SubscriptionState = {
  plan: string;
  protectedAccount: boolean;
  billingManaged: boolean;
  subscription: null | {
    id: string;
    status: string | null;
    cancelled: boolean;
    renewsAt: string | null;
    endsAt: string | null;
  };
};

function formatDate(value: string | null, locale: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function AccountLifecyclePanel({ locale }: { locale: string }) {
  const isTr = locale === "tr";
  const router = useRouter();
  const [data, setData] = useState<SubscriptionState | null>(null);
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [busy, setBusy] = useState<"cancel" | "resume" | "portal" | "delete" | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function load() {
    const response = await fetch("/api/account/subscription", { cache: "no-store" });
    if (!response.ok) throw new Error("Unable to load subscription");
    setData(await response.json());
  }

  useEffect(() => {
    void load().catch(() => setError(isTr ? "Abonelik bilgileri yüklenemedi." : "Subscription details could not be loaded."));
    const supabase = createClient();
    void supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email || ""));
  }, [isTr]);

  async function act(kind: "cancel" | "resume" | "portal") {
    setBusy(kind);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/account/subscription", {
        method: kind === "cancel" ? "DELETE" : kind === "resume" ? "PATCH" : "POST",
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || "Request failed");
      if (kind === "portal") {
        window.location.assign(body.url);
        return;
      }
      await load();
      setMessage(
        kind === "cancel"
          ? isTr
            ? "Abonelik yenilemesi iptal edildi. Premium erişimin dönem sonuna kadar devam edecek."
            : "Renewal cancelled. Premium access remains active until the end of the paid period."
          : isTr
            ? "Aboneliğin yeniden etkinleştirildi."
            : "Your subscription has been reactivated."
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : isTr ? "İşlem tamamlanamadı." : "The action could not be completed.");
    } finally {
      setBusy(null);
    }
  }

  async function deleteAccount() {
    if (!email || confirmEmail.trim().toLowerCase() !== email.trim().toLowerCase()) return;
    setBusy("delete");
    setError("");
    try {
      const response = await fetch("/api/account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmation: confirmEmail.trim() }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || "Delete failed");
      const supabase = createClient();
      await supabase.auth.signOut();
      router.replace(`/${locale}`);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : isTr ? "Hesap güvenli şekilde silinemedi." : "The account could not be deleted safely.");
      setBusy(null);
    }
  }

  const subscription = data?.subscription;
  const cancelling = Boolean(subscription?.cancelled || subscription?.status === "cancelled");
  const endDate = formatDate(subscription?.endsAt || null, locale);
  const renewalDate = formatDate(subscription?.renewsAt || null, locale);

  return (
    <section className="bg-slate-950 px-6 pb-14 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        <div className="rounded-[26px] border border-violet-400/20 bg-violet-500/[0.045] p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-400">
            {isTr ? "ABONELİK & FATURALAMA" : "SUBSCRIPTION & BILLING"}
          </p>
          <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black">{data?.plan === "premium" ? "Premium" : "Free"}</h2>
              <p className="mt-1 text-sm text-slate-400">
                {data?.protectedAccount
                  ? isTr ? "SERNEM sahibi / yönetici hesabı" : "SERNEM owner / administrator account"
                  : cancelling
                    ? isTr ? `Premium erişim ${endDate} tarihine kadar devam eder.` : `Premium access continues until ${endDate}.`
                    : subscription
                      ? isTr ? `Sonraki yenileme: ${renewalDate}` : `Next renewal: ${renewalDate}`
                      : isTr ? "Abonelik durumu hesabınla senkronize edilir." : "Subscription status is synced with your account."}
              </p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-black ${cancelling ? "bg-amber-500/10 text-amber-300" : "bg-emerald-500/10 text-emerald-300"}`}>
              {data?.protectedAccount ? (isTr ? "KORUMALI" : "PROTECTED") : cancelling ? (isTr ? "İPTAL BEKLİYOR" : "CANCELLING") : (isTr ? "AKTİF" : "ACTIVE")}
            </span>
          </div>

          {data?.protectedAccount && (
            <div className="mt-6 rounded-2xl border border-violet-300/15 bg-gradient-to-br from-violet-500/[0.08] via-slate-950/30 to-blue-500/[0.05] p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-500/[0.08] text-lg text-emerald-300">
                  ✓
                </div>
                <div>
                  <h3 className="font-black text-white">
                    {isTr ? "Korumalı Owner Hesabı" : "Protected Owner Account"}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {isTr
                      ? "Bu sahip hesabında abonelik yönetimi güvenlik nedeniyle devre dışıdır. Premium erişim kalıcıdır ve herhangi bir faturalama işlemi gerekmez."
                      : "Subscription management is disabled for this protected owner account. Premium access is permanent and no billing action is required."}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-white/[0.08] bg-slate-950/55 px-4 py-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                    {isTr ? "Premium Erişim" : "Premium Access"}
                  </p>
                  <p className="mt-2 text-sm font-black text-emerald-300">
                    {isTr ? "Kalıcı" : "Permanent"}
                  </p>
                </div>

                <div className="rounded-xl border border-white/[0.08] bg-slate-950/55 px-4 py-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                    {isTr ? "Faturalama İşlemi" : "Billing Action"}
                  </p>
                  <p className="mt-2 text-sm font-black text-slate-200">
                    {isTr ? "Gerekli Değil" : "Not Required"}
                  </p>
                </div>

                <div className="rounded-xl border border-white/[0.08] bg-slate-950/55 px-4 py-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                    {isTr ? "Hesap Koruması" : "Account Protection"}
                  </p>
                  <p className="mt-2 text-sm font-black text-blue-300">
                    {isTr ? "Etkin" : "Enabled"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {message && <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-500/[0.07] px-4 py-3 text-sm text-emerald-300">{message}</div>}
          {error && <div className="mt-5 rounded-xl border border-red-400/20 bg-red-500/[0.07] px-4 py-3 text-sm text-red-300">{error}</div>}

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {data?.billingManaged && !data.protectedAccount && (
              <button type="button" disabled={busy !== null} onClick={() => void act("portal")} className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-black transition hover:bg-white/[0.08] disabled:opacity-50">
                {busy === "portal" ? (isTr ? "Açılıyor..." : "Opening...") : (isTr ? "Faturalamayı Yönet" : "Manage Billing")}
              </button>
            )}

            {data?.billingManaged && !data.protectedAccount && !cancelling && (
              <button type="button" disabled={busy !== null} onClick={() => void act("cancel")} className="rounded-xl border border-amber-400/25 bg-amber-500/[0.06] px-4 py-3 font-black text-amber-200 transition hover:bg-amber-500/[0.1] disabled:opacity-50">
                {busy === "cancel" ? (isTr ? "İptal ediliyor..." : "Cancelling...") : (isTr ? "Aboneliği İptal Et" : "Cancel Subscription")}
              </button>
            )}

            {data?.billingManaged && !data.protectedAccount && cancelling && (
              <button type="button" disabled={busy !== null} onClick={() => void act("resume")} className="rounded-xl bg-violet-600 px-4 py-3 font-black transition hover:bg-violet-500 disabled:opacity-50">
                {busy === "resume" ? (isTr ? "Etkinleştiriliyor..." : "Reactivating...") : (isTr ? "Aboneliği Yeniden Etkinleştir" : "Reactivate Subscription")}
              </button>
            )}
          </div>

          {data && !data.billingManaged && !data.protectedAccount && data.plan === "premium" && (
            <p className="mt-5 rounded-xl border border-blue-400/15 bg-blue-500/[0.05] px-4 py-3 text-sm text-blue-300">
              {isTr ? "Premium erişimin aktif. Mevcut abonelik kimliği bir sonraki Lemon Squeezy olayıyla otomatik bağlanacak." : "Premium access is active. The existing subscription ID will be linked automatically on the next Lemon Squeezy event."}
            </p>
          )}
        </div>

        <div className="rounded-[26px] border border-red-400/20 bg-red-500/[0.035] p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-red-400">{isTr ? "TEHLİKELİ BÖLGE" : "DANGER ZONE"}</p>
          <h2 className="mt-3 text-2xl font-black">{isTr ? "Hesabı Sil" : "Delete Account"}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {isTr
              ? "Hesabın silinirse SERNEM verilerin kalıcı olarak kaldırılır. Aktif ücretli abonelik varsa önce gelecek yenileme güvenli şekilde iptal edilir."
              : "Deleting your account permanently removes your SERNEM data. If a paid subscription is active, future renewal is cancelled safely first."}
          </p>

          {data?.protectedAccount ? (
            <div className="mt-5 rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/[0.08] to-slate-950/30 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/[0.08] text-blue-300">
                  🛡
                </div>
                <div>
                  <p className="font-black text-blue-200">
                    {isTr ? "Owner hesabı silme koruması etkin" : "Owner account deletion protection enabled"}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {isTr
                      ? "SERNEM sahibi / yönetici hesabı bu ekrandan veya standart hesap silme akışından kaldırılamaz."
                      : "The SERNEM owner / administrator account cannot be removed from this screen or through the standard account deletion flow."}
                  </p>
                </div>
              </div>
            </div>
          ) : !showDelete ? (
            <button type="button" onClick={() => setShowDelete(true)} className="mt-6 rounded-xl border border-red-400/30 bg-red-500/[0.08] px-5 py-3 font-black text-red-200 transition hover:bg-red-500/[0.14]">
              {isTr ? "Hesabı Sil..." : "Delete Account..."}
            </button>
          ) : (
            <div className="mt-5 rounded-2xl border border-red-400/20 bg-slate-950/60 p-4">
              <label className="text-sm font-bold text-slate-200">
                {isTr ? `Onaylamak için e-posta adresini yaz: ${email}` : `Type your email to confirm: ${email}`}
              </label>
              <input value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} autoComplete="off" className="mt-3 w-full rounded-xl border border-red-400/20 bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500/20" />
              <div className="mt-3 flex flex-wrap gap-3">
                <button type="button" onClick={() => { setShowDelete(false); setConfirmEmail(""); }} className="rounded-xl border border-white/10 px-4 py-2.5 font-bold text-slate-300">{isTr ? "Vazgeç" : "Keep Account"}</button>
                <button type="button" disabled={busy === "delete" || confirmEmail.trim().toLowerCase() !== email.trim().toLowerCase()} onClick={() => void deleteAccount()} className="rounded-xl bg-red-600 px-4 py-2.5 font-black text-white disabled:cursor-not-allowed disabled:opacity-40">
                  {busy === "delete" ? (isTr ? "Güvenli şekilde siliniyor..." : "Deleting safely...") : (isTr ? "Hesabımı Kalıcı Olarak Sil" : "Permanently Delete My Account")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
