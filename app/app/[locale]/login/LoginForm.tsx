"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "../../../utils/supabase/client";
import { trackEvent } from "@/lib/analytics/track";

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

function getPostDownloadReturnPath(
  destination: string,
  locale: "tr" | "en",
) {
  const premiumToolboxMatch = destination.match(
    /^\/api\/premium\/toolbox\/([^/?#]+)/,
  );
  if (premiumToolboxMatch) {
    return `/${locale}/toolbox/${decodeURIComponent(premiumToolboxMatch[1])}`;
  }

  const standardToolboxMatch = destination.match(
    /^\/api\/toolbox\/([^/?#]+)\/pdf/,
  );
  if (standardToolboxMatch) {
    return `/${locale}/toolbox/${decodeURIComponent(standardToolboxMatch[1])}`;
  }

  const staticToolboxMatch = destination.match(
    /^\/downloads\/(.+)-toolbox-talk-(?:tr|en)\.pdf(?:\?.*)?$/i,
  );
  if (staticToolboxMatch) {
    return `/${locale}/toolbox/${decodeURIComponent(staticToolboxMatch[1])}`;
  }

  return `/${locale}/downloads`;
}

export default function LoginForm({
  locale,
  nextPath,
  downloadIntent = false,
}: Props) {
  const supabase = useMemo(() => createClient(), []);
  const isTurkish = locale === "tr";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const safeNextPath = useMemo(
    () => sanitizeNextPath(nextPath),
    [nextPath],
  );

  const registerHref = useMemo(() => {
    const params = new URLSearchParams();

    if (safeNextPath) {
      params.set("next", safeNextPath);
    }

    if (downloadIntent) {
      params.set("intent", "download");
    }

    const query = params.toString();
    return `/${locale}/register${query ? `?${query}` : ""}`;
  }, [downloadIntent, locale, safeNextPath]);

  useEffect(() => {
    if (safeNextPath) {
      window.localStorage.setItem("sernem_post_auth_next", safeNextPath);
    }

    trackEvent("login_view", {
      locale,
      download_intent: downloadIntent,
      destination: safeNextPath,
    });

    const redirectAuthenticatedUser = async () => {
      if (!safeNextPath) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        window.localStorage.removeItem("sernem_post_auth_next");

        if (downloadIntent) {
          trackEvent("download_resumed", {
            locale,
            destination: safeNextPath,
            source: "existing_session",
          });

          const returnPath = getPostDownloadReturnPath(safeNextPath, locale);
          window.setTimeout(() => {
            window.location.replace(returnPath);
          }, 1200);
        }

        window.location.assign(safeNextPath);
      }
    };

    void redirectAuthenticatedUser();
  }, [downloadIntent, locale, safeNextPath, supabase]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setIsLoading(true);

    trackEvent("login_submitted", {
      locale,
      download_intent: downloadIntent,
      destination: safeNextPath,
    });

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      trackEvent("login_failed", {
        locale,
        download_intent: downloadIntent,
        error_code: error.code ?? "unknown",
      });

      setErrorMessage(
        isTurkish
          ? "Giriş başarısız. E-posta adresini ve şifreni kontrol et."
          : "Login failed. Check your email address and password.",
      );
      setIsLoading(false);
      return;
    }

    const storedNextPath = sanitizeNextPath(
      window.localStorage.getItem("sernem_post_auth_next"),
    );
    const destination = safeNextPath ?? storedNextPath ?? `/${locale}/dashboard`;

    trackEvent("login_success", {
      locale,
      download_intent: downloadIntent,
      destination,
    });

    window.localStorage.removeItem("sernem_post_auth_next");

    if (downloadIntent && destination !== `/${locale}/dashboard`) {
      trackEvent("download_resumed", {
        locale,
        destination,
        source: "login_success",
      });

      const returnPath = getPostDownloadReturnPath(destination, locale);

      window.setTimeout(() => {
        window.location.replace(returnPath);
      }, 1200);
    }

    window.location.assign(destination);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-slate-200"
          >
            {isTurkish ? "Şifre" : "Password"}
          </label>

          <Link
            href={`/${locale}/forgot-password`}
            className="text-xs font-semibold text-blue-400 transition hover:text-blue-300"
          >
            {isTurkish ? "Şifremi unuttum" : "Forgot password?"}
          </Link>
        </div>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={6}
          autoComplete="current-password"
          placeholder="••••••••"
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {errorMessage ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {errorMessage}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading
          ? isTurkish
            ? "Giriş yapılıyor..."
            : "Signing in..."
          : downloadIntent
            ? isTurkish
              ? "Giriş yap ve PDF'ye devam et"
              : "Sign in and continue to PDF"
            : isTurkish
              ? "Giriş yap"
              : "Sign in"}
      </button>

      {downloadIntent && (
        <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold text-slate-400">
          <span className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-2">
            {isTurkish ? "Ücretsiz" : "Free"}
          </span>
          <span className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-2">
            {isTurkish ? "Kart yok" : "No card"}
          </span>
          <span className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-2">
            {isTurkish ? "Hızlı erişim" : "Instant access"}
          </span>
        </div>
      )}

      <p className="text-center text-sm text-slate-400">
        {isTurkish ? "Henüz hesabın yok mu?" : "Don't have an account yet?"}{" "}
        <Link
          href={registerHref}
          className="font-semibold text-blue-400 transition hover:text-blue-300"
        >
          {downloadIntent
            ? isTurkish
              ? "Ücretsiz hesap oluştur ve indir"
              : "Create a free account and download"
            : isTurkish
              ? "Hesap oluştur"
              : "Create account"}
        </Link>
      </p>
    </form>
  );
}