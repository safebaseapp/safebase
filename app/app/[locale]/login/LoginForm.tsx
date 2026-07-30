"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../../utils/supabase/client";

type Props = {
  locale: "tr" | "en";
};

export default function LoginForm({ locale }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const isTurkish = locale === "tr";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(
        isTurkish
          ? "Giriş başarısız. E-posta adresini ve şifreni kontrol et."
          : "Login failed. Check your email address and password.",
      );
      setIsLoading(false);
      return;
    }

    router.push(`/${locale}/dashboard`);
    router.refresh();
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

          <button
            type="button"
            className="text-xs font-semibold text-blue-400 transition hover:text-blue-300"
          >
            {isTurkish ? "Şifremi unuttum" : "Forgot password?"}
          </button>
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
          : isTurkish
            ? "Giriş yap"
            : "Sign in"}
      </button>

      <p className="text-center text-sm text-slate-400">
        {isTurkish ? "Henüz hesabın yok mu?" : "Don't have an account yet?"}{" "}
        <Link
          href={`/${locale}/register`}
          className="font-semibold text-blue-400 transition hover:text-blue-300"
        >
          {isTurkish ? "Hesap oluştur" : "Create account"}
        </Link>
      </p>
    </form>
  );
}
