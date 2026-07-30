"use client";

import { FormEvent, useState } from "react";
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

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
        disabled={isLoading}
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