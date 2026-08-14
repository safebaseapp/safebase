import Link from "next/link";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../i18n/routing";
import ForgotPasswordForm from "./ForgotPasswordForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ForgotPasswordPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const isTurkish = locale === "tr";

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-16 text-white">
      <div className="mx-auto max-w-xl">
        <Link
          href={`/${locale}/login`}
          className="mb-8 inline-flex text-sm font-semibold text-slate-400 transition hover:text-blue-400"
        >
          ← {isTurkish ? "Giriş sayfasına dön" : "Back to login"}
        </Link>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/20 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-400">
            {isTurkish ? "SERNEM hesabı" : "SERNEM account"}
          </p>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {isTurkish ? "Şifreni sıfırla" : "Reset your password"}
          </h1>

          <p className="mt-3 leading-7 text-slate-400">
            {isTurkish
              ? "E-posta adresini gir. Şifreni yenileyebilmen için sana güvenli bir bağlantı göndereceğiz."
              : "Enter your email address and we will send you a secure password reset link."}
          </p>

          <ForgotPasswordForm locale={locale} />
        </section>
      </div>
    </main>
  );
}