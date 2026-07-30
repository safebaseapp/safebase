import Link from "next/link";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../i18n/routing";
import LoginForm from "./LoginForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LoginPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const safeLocale = locale as "tr" | "en";
  const isTurkish = safeLocale === "tr";

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl shadow-black/30 lg:grid-cols-2">
          <section className="hidden bg-gradient-to-br from-blue-600/25 via-slate-950 to-slate-950 p-12 lg:flex lg:flex-col lg:justify-between">
            <Link href={`/${safeLocale}`} className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 font-bold">
                S
              </div>

              <div>
                <div className="font-bold">SafeBase</div>
                <div className="text-xs text-slate-400">
                  {isTurkish
                    ? "Profesyonel HSE çalışma alanı"
                    : "Professional HSE workspace"}
                </div>
              </div>
            </Link>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-400">
                {isTurkish ? "Güvenli çalışma alanın" : "Your safety workspace"}
              </p>

              <h2 className="mt-5 max-w-lg text-4xl font-bold leading-tight">
                {isTurkish
                  ? "Denetimlerini ve HSE kaynaklarını tek merkezden yönet."
                  : "Manage inspections and HSE resources from one place."}
              </h2>

              <p className="mt-5 max-w-md leading-7 text-slate-400">
                {isTurkish
                  ? "Kontrol listelerine, AI değerlendirmelerine ve profesyonel güvenlik kaynaklarına hesabın üzerinden ulaş."
                  : "Access checklists, AI assessments and professional safety resources through your account."}
              </p>
            </div>

            <p className="text-sm text-slate-500">Safety without borders.</p>
          </section>

          <section className="p-7 sm:p-10 lg:p-12">
            <Link
              href={`/${safeLocale}`}
              className="inline-flex text-sm font-semibold text-slate-400 transition hover:text-white"
            >
              ← {isTurkish ? "Ana sayfaya dön" : "Back to homepage"}
            </Link>

            <div className="mt-10">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-400">
                {isTurkish ? "SafeBase hesabı" : "SafeBase account"}
              </p>

              <h1 className="mt-3 text-3xl font-bold">
                {isTurkish ? "Tekrar hoş geldin" : "Welcome back"}
              </h1>

              <p className="mt-3 text-slate-400">
                {isTurkish
                  ? "Çalışma alanına devam etmek için giriş yap."
                  : "Sign in to continue to your workspace."}
              </p>
            </div>

            <LoginForm locale={safeLocale} />
          </section>
        </div>
      </div>
    </main>
  );
}
