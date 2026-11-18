"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../../utils/supabase/client";
import { trackEvent } from "../../../lib/analytics";

type Props = { locale: "tr" | "en" };

function safeNextPath(value: string | null, locale: "tr" | "en") {
  if (!value) return `/${locale}/dashboard`;
  if (!value.startsWith(`/${locale}/`) || value.startsWith("//")) {
    return `/${locale}/dashboard`;
  }
  return value;
}

export default function RegisterForm({ locale }: Props) {
  const searchParams = useSearchParams();
  const supabase = createClient();
  const isTurkish = locale === "tr";
  const nextPath = safeNextPath(searchParams.get("next"), locale);
  const nextQuery = encodeURIComponent(nextPath);
  const returnsToPremium = nextPath === `/${locale}/upgrade`;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);
    const normalizedEmail = email.trim().toLowerCase();

    try {
      trackEvent("sign_up_attempt", { method: "email", locale });
      const emailRedirectTo = `${window.location.origin}${nextPath}`;
      const { data, error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: { emailRedirectTo, data: { full_name: fullName.trim() } },
      });

      if (error) {
        trackEvent("sign_up_error", { method: "email", locale, error_code: error.code || "unknown" });
        setErrorMessage(isTurkish
          ? `Hesap oluşturulamadı: ${error.message}. Sorun devam ederse lütfen tekrar dene.`
          : `Account could not be created: ${error.message}. Please try again.`);
        return;
      }

      trackEvent("sign_up", { method: "email", locale });
      setPendingEmail(normalizedEmail);
      setSuccessMessage(data.session
        ? (isTurkish ? "Hesabın oluşturuldu. Giriş yaparak devam edebilirsin." : "Your account was created. You can sign in to continue.")
        : (returnsToPremium
          ? (isTurkish
              ? "Doğrulama bağlantısı için gelen kutunu ve spam klasörünü kontrol et. Doğruladıktan sonra Premium sayfasına devam edebilirsin."
              : "Check your inbox and spam folder for the confirmation link. After verification, you can continue to Premium.")
          : (isTurkish
              ? "Doğrulama bağlantısı için gelen kutunu ve spam klasörünü kontrol et. Ardından SERNEM'e giriş yap."
              : "Check your inbox and spam folder for the confirmation link, then sign in to SERNEM.")));
      setPassword("");
    } catch {
      trackEvent("sign_up_error", { method: "email", locale, error_code: "network_or_unexpected" });
      setErrorMessage(isTurkish
        ? "Bağlantı hatası oluştu. İnternet bağlantını kontrol edip tekrar dene."
        : "A connection error occurred. Check your internet connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function resendConfirmation() {
    if (!pendingEmail || isResending) return;
    setIsResending(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: pendingEmail,
        options: { emailRedirectTo: `${window.location.origin}${nextPath}` },
      });
      if (error) {
        setErrorMessage(isTurkish
          ? `Doğrulama e-postası gönderilemedi: ${error.message}`
          : `Could not resend confirmation email: ${error.message}`);
        trackEvent("sign_up_resend_error", { locale, error_code: error.code || "unknown" });
        return;
      }
      trackEvent("sign_up_confirmation_resent", { locale });
      setSuccessMessage(isTurkish
        ? "Doğrulama e-postası yeniden istendi. Gelen kutunu ve spam klasörünü kontrol et."
        : "Confirmation email requested again. Check your inbox and spam folder.");
    } catch {
      setErrorMessage(isTurkish
        ? "Bağlantı hatası oluştu. Lütfen tekrar dene."
        : "A connection error occurred. Please try again.");
    } finally {
      setIsResending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-4">
      <div>
        <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-slate-200">{isTurkish ? "Ad soyad" : "Full name"}</label>
        <input id="fullName" type="text" value={fullName} onChange={(event) => setFullName(event.target.value)} required minLength={2} autoComplete="name" placeholder={isTurkish ? "Adın ve soyadın" : "Your full name"} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-200">{isTurkish ? "E-posta adresi" : "Email address"}</label>
        <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" placeholder="name@company.com" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-200">{isTurkish ? "Şifre" : "Password"}</label>
        <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} autoComplete="new-password" placeholder="••••••••" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
        <p className="mt-2 text-xs text-slate-500">{isTurkish ? "En az 8 karakter kullan." : "Use at least 8 characters."}</p>
      </div>
      {errorMessage && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{errorMessage}</div>}
      {successMessage && <div role="status" className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm leading-6 text-emerald-300">{successMessage}</div>}
      {pendingEmail && <button type="button" onClick={resendConfirmation} disabled={isResending || isLoading} className="text-sm font-semibold text-blue-400 underline underline-offset-4 disabled:opacity-60">{isResending ? (isTurkish ? "Gönderiliyor..." : "Sending...") : (isTurkish ? "Doğrulama e-postasını tekrar gönder" : "Resend confirmation email")}</button>}
      <button type="submit" disabled={isLoading} className="w-full rounded-xl bg-blue-600 px-4 py-3.5 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60">{isLoading ? (isTurkish ? "Hesap oluşturuluyor..." : "Creating account...") : isTurkish ? "Ücretsiz hesap oluştur" : "Create free account"}</button>
      <p className="text-center text-sm text-slate-400">{isTurkish ? "Zaten hesabın var mı?" : "Already have an account?"}{" "}<Link href={`/${locale}/login?next=${nextQuery}`} className="font-semibold text-blue-400 transition hover:text-blue-300">{isTurkish ? "Giriş yap" : "Sign in"}</Link></p>
    </form>
  );
}
