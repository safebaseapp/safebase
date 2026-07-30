"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "../../../utils/supabase/client";

type Props = {
  locale: "tr" | "en";
};

export default function ForgotPasswordForm({ locale }: Props) {
  const supabase = createClient();
  const isTurkish = locale === "tr";

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    const redirectTo = `${window.location.origin}/${locale}/reset-password`;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      setErrorMessage(
        isTurkish
          ? `Şifre sıfırlama bağlantısı gönderilemedi: ${error.message}`
          : `Password reset link could not be sent: ${error.message}`,
      );
      setIsLoading(false);
      return;
    }

    setSuccessMessage(
      isTurkish
        ? "Şifre sıfırlama bağlantısı e-posta adresine gönderildi."
        : "A password reset link has been sent to your email address.",
    );

    setIsLoading(false);
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
            ? "Gönderiliyor..."
            : "Sending..."
          : isTurkish
            ? "Sıfırlama bağlantısı gönder"
            : "Send reset link"}
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