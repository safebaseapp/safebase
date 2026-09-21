"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "../../../utils/supabase/client";

type Props = {
  locale: "tr" | "en";
  nextPath?: string;
  downloadIntent?: boolean;
};

function sanitizeNextPath(value?: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return undefined;
  }

  return value;
}

export default function RegisterForm({
  locale,
  nextPath,
  downloadIntent = false,
}: Props) {
  const supabase = useMemo(() => createClient(), []);
  const isTurkish = locale === "tr";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const safeNextPath = useMemo(
    () => sanitizeNextPath(nextPath),
    [nextPath],
  );

  const loginHref = useMemo(() => {
    const params = new URLSearchParams();

    if (safeNextPath) {
      params.set("next", safeNextPath);
    }

    if (downloadIntent) {
      params.set("intent", "download");
    }

    const query = params.toString();
    return `/${locale}/login${query ? `?${query}` : ""}`;
  }, [downloadIntent, locale, safeNextPath]);

  useEffect(() => {
    if (safeNextPath) {
      window.localStorage.setItem("sernem_post_auth_next", safeNextPath);
    }
  }, [safeNextPath]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    if (safeNextPath) {
      window.localStorage.setItem("sernem_post_auth_next", safeNextPath);
    }

    const redirectUrl = new URL(`/${locale}/dashboard`, window.location.origin);

    if (safeNextPath) {
      redirectUrl.pathname = `/${locale}/login`;
      redirectUrl.searchParams.set("next", safeNextPath);
      if (downloadIntent) {
        redirectUrl.searchParams.set("intent", "download");
      }
      redirectUrl.searchParams.set("confirmed", "1");
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl.toString(),
        data: {
          full_name: fullName.trim(),
        },
      },
    });

    if (error) {
      console.error("Supabase signup error:", error);

      setErrorMessage(
        isTurkish
          ? `Hesap oluşturulamadı: ${error.message}`
          : `Account could not be created: ${error.message}`,
      );

      setIsLoading(false);
      return;
    }

    if (data.session) {
      const destination = safeNextPath ?? `/${locale}/dashboard`;
      window.localStorage.removeItem("sernem_post_auth_next");
      window.location.assign(destination);
      return;
    }

    setSuccessMessage(
      downloadIntent
        ? isTurkish
          ? "Hesabın oluşturuldu. E-postanı doğrula; ardından giriş yaptığında istediğin dokümana kaldığın yerden devam edeceksin."
          : "Your account was created. Verify your email; after signing in, you will continue directly to the document you requested."
        : isTurkish
          ? "Hesabın oluşturuldu. E-posta adresine gönderilen doğrulama bağlantısını kontrol et."
          : "Your account was created. Check your email for the confirmation link.",
    );

    setFullName("");
    setEmail("");
    setPassword("");
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-4">
      <div>
        <label
          htmlFor="fullName"
          className="mb-2 block text-sm font-semibold text-slate-200"
        >
          {isTurkish ? "Ad soyad" : "Full name"}
        </label>

        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          required
          minLength={2}
          autoComplete="name"
          placeholder={isTurkish ? "Adın ve soyadın" : "Your full name"}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-slate-200"
        >
          {isTurkish ? "E-posta adresi" : "Email address"}
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="email"
          placeholder="name@company.com"
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-semibold text-slate-200"
        >
          {isTurkish ? "Şifre" : "Password"}
        </label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
          placeholder="••••••••"
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />

        <p className="mt-2 text-xs text-slate-500">
          {isTurkish
            ? "En az 8 karakter kullan."
            : "Use at least 8 characters."}
        </p>
      </div>

      {errorMessage && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm leading-6 text-emerald-300">
          {successMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-blue-600 px-4 py-3.5 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading
          ? isTurkish
            ? "Hesap oluşturuluyor..."
            : "Creating account..."
          : downloadIntent
            ? isTurkish
              ? "Ücretsiz hesap oluştur ve indir"
              : "Create free account and download"
            : isTurkish
              ? "Ücretsiz hesap oluştur"
              : "Create free account"}
      </button>

      {downloadIntent && (
        <p className="text-center text-xs font-semibold text-slate-500">
          {isTurkish
            ? "Ücretsiz • Kredi kartı gerekmez • Standart PDF erişimi"
            : "Free • No credit card • Standard PDF access"}
        </p>
      )}

      <p className="text-center text-sm text-slate-400">
        {isTurkish ? "Zaten hesabın var mı?" : "Already have an account?"}{" "}
        <Link
          href={loginHref}
          className="font-semibold text-blue-400 transition hover:text-blue-300"
        >
          {isTurkish ? "Giriş yap" : "Sign in"}
        </Link>
      </p>
    </form>
  );
}
