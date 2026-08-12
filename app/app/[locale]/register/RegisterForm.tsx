"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "../../../utils/supabase/client";

type Props = {
  locale: "tr" | "en";
};

export default function RegisterForm({ locale }: Props) {
  const supabase = createClient();
  const isTurkish = locale === "tr";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    const emailRedirectTo = `${window.location.origin}/${locale}/dashboard`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo,
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

    setSuccessMessage(
      isTurkish
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
          : isTurkish
            ? "Ücretsiz hesap oluştur"
            : "Create free account"}
      </button>

      <p className="text-center text-sm text-slate-400">
        {isTurkish ? "Zaten hesabın var mı?" : "Already have an account?"}{" "}
        <Link
          href={`/${locale}/login`}
          className="font-semibold text-blue-400 transition hover:text-blue-300"
        >
          {isTurkish ? "Giriş yap" : "Sign in"}
        </Link>
      </p>
    </form>
  );
}
