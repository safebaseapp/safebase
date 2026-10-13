"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../../utils/supabase/client";

type Props = {
  locale: "tr" | "en";
};

export default function ResetPasswordForm({ locale }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const isTurkish = locale === "tr";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recoveryReady, setRecoveryReady] = useState(false);
  const [checkingRecovery, setCheckingRecovery] = useState(true);

  useEffect(() => {
    let alive = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === "PASSWORD_RECOVERY" && alive) {
          setRecoveryReady(true);
          setCheckingRecovery(false);
          setErrorMessage("");
        }
      },
    );

    async function initializeRecovery() {
      const query = new URLSearchParams(window.location.search);
      const fragment = new URLSearchParams(window.location.hash.slice(1));
      if (query.has("error") || fragment.has("error")) {
        throw new Error("Invalid recovery link");
      }

      const code = query.get("code");
      const tokenHash = query.get("token_hash");
      const accessToken = fragment.get("access_token");
      const refreshToken = fragment.get("refresh_token");
      let recoveryError: string | undefined;

      if (accessToken && refreshToken && fragment.get("type") === "recovery") {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        recoveryError = error?.message;
      } else if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        recoveryError = error?.message;
      } else if (tokenHash && query.get("type") === "recovery") {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: "recovery",
        });
        recoveryError = error?.message;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!alive) return;
      if (!session) throw new Error(recoveryError || "No recovery session");

      if (code || tokenHash || accessToken) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      setRecoveryReady(true);
      setErrorMessage("");
    }

    initializeRecovery().catch(() => {
      if (alive) setErrorMessage(
        isTurkish
          ? "Bağlantının süresi dolmuş veya kurtarma oturumu oluşturulamamış. Lütfen yeni sıfırlama bağlantısı isteyin."
          : "The reset link expired or no recovery session was established. Please request a new link.",
      );
    }).finally(() => {
      if (alive) setCheckingRecovery(false);
    });

    return () => {
      alive = false;
      subscription.unsubscribe();
    };
  }, [isTurkish, supabase]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!recoveryReady) {
      setErrorMessage(isTurkish
        ? "Kurtarma oturumu eksik. Yeni bağlantı isteyin."
        : "Missing recovery session. Request a new link.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage(
        isTurkish
          ? "Şifre en az 8 karakter olmalıdır."
          : "Password must be at least 8 characters.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(
        isTurkish
          ? "Şifreler birbiriyle eşleşmiyor."
          : "Passwords do not match.",
      );
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setErrorMessage(
        isTurkish
          ? `Şifre güncellenemedi: ${error.message}`
          : `Password could not be updated: ${error.message}`,
      );
      setIsLoading(false);
      return;
    }

    setSuccessMessage(
      isTurkish
        ? "Şifren başarıyla güncellendi. Giriş sayfasına yönlendiriliyorsun."
        : "Your password was updated successfully. Redirecting to login.",
    );

    setIsLoading(false);

    setTimeout(() => {
      router.push(`/${locale}/login`);
      router.refresh();
    }, 1500);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-semibold text-slate-200"
        >
          {isTurkish ? "Yeni şifre" : "New password"}
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
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-sm font-semibold text-slate-200"
        >
          {isTurkish ? "Yeni şifreyi tekrar gir" : "Confirm new password"}
        </label>

        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
          placeholder="••••••••"
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {errorMessage ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {errorMessage}
        </div>
      ) : null}

      {successMessage ? (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          {successMessage}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isLoading || checkingRecovery || !recoveryReady}
        className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading
          ? isTurkish
            ? "Şifre güncelleniyor..."
            : "Updating password..."
          : isTurkish
            ? "Şifreyi güncelle"
            : "Update password"}
      </button>

      {checkingRecovery ? (
        <p role="status" className="text-center text-sm text-slate-400">
          {isTurkish ? "Bağlantı doğrulanıyor..." : "Verifying recovery link..."}
        </p>
      ) : null}
      {!checkingRecovery && !recoveryReady ? (
        <p className="text-center text-sm">
          <Link href={`/${locale}/forgot-password`} className="font-semibold text-blue-400">
            {isTurkish ? "Yeni sıfırlama bağlantısı iste" : "Request a new reset link"}
          </Link>
        </p>
      ) : null}
      <p className="text-center text-sm text-slate-400">
        <Link
          href={`/${locale}/login`}
          className="font-semibold text-blue-400 transition hover:text-blue-300"
        >
          {isTurkish ? "Giriş sayfasına dön" : "Back to login"}
        </Link>
      </p>
    </form>
  );
}