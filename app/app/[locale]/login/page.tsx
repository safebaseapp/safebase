import Link from "next/link";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../i18n/routing";
import LoginForm from "./LoginForm";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{
    next?: string;
    intent?: string;
    confirmed?: string;
  }>;
};

function sanitizeNextPath(value?: string) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return undefined;
  }

  return value;
}

export default async function LoginPage({ params, searchParams }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const safeLocale = locale as "tr" | "en";
  const isTurkish = safeLocale === "tr";
  const query = searchParams ? await searchParams : undefined;
  const nextPath = sanitizeNextPath(query?.next);
  const isDownloadIntent =
    query?.intent === "download" ||
    Boolean(
      nextPath &&
        (nextPath.includes(".pdf") ||
          nextPath.startsWith("/downloads/") ||
          nextPath.startsWith("/api/")),
    );

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
                <div className="font-bold">SERNEM</div>
                <div className="text-xs text-slate-400">
                  {isTurkish
                    ? "Profesyonel HSE çalışma alanı"
                    : "Professional HSE workspace"}
                </div>
              </div>
            </Link>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-400">
                {isDownloadIntent
                  ? isTurkish
                    ? "İndirmeni tamamla"
                    : "Complete your download"
                  : isTurkish
                    ? "Güvenli çalışma alanın"
                    : "Your safety workspace"}
              </p>

              <h2 className="mt-5 max-w-lg text-4xl font-bold leading-tight">
                {isDownloadIntent
                  ? isTurkish
                    ? "Ücretsiz giriş yap, profesyonel HSE dokümanını hemen indir."
                    : "Sign in free and download your professional HSE document instantly."
                  : isTurkish
                    ? "Denetimlerini ve HSE kaynaklarını tek merkezden yönet."
                    : "Manage inspections and HSE resources from one place."}
              </h2>

              <p className="mt-5 max-w-md leading-7 text-slate-400">
                {isDownloadIntent
                  ? isTurkish
                    ? "Kredi kartı gerekmez. Giriş yaptıktan sonra otomatik olarak kaldığın dokümana döneceksin."
                    : "No card required. After signing in, you will automatically return to the document you requested."
                  : isTurkish
                    ? "Kontrol listelerine, AI değerlendirmelerine ve profesyonel güvenlik kaynaklarına hesabın üzerinden ulaş."
                    : "Access checklists, AI assessments and professional safety resources through your account."}
              </p>

              {isDownloadIntent && (
                <div className="mt-7 flex flex-wrap gap-3 text-xs font-bold text-slate-300">
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-emerald-300">
                    ✓ {isTurkish ? "Ücretsiz" : "Free"}
                  </span>
                  <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-2 text-blue-300">
                    ✓ {isTurkish ? "Kart gerekmez" : "No card required"}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-slate-300">
                    ✓ {isTurkish ? "Anında devam" : "Instant return"}
                  </span>
                </div>
              )}
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
                {isDownloadIntent
                  ? isTurkish
                    ? "Ücretsiz PDF erişimi"
                    : "Free PDF access"
                  : isTurkish
                    ? "SERNEM hesabı"
                    : "SERNEM account"}
              </p>

              <h1 className="mt-3 text-3xl font-bold">
                {isDownloadIntent
                  ? isTurkish
                    ? "Giriş yap ve indirmeye devam et"
                    : "Sign in and continue your download"
                  : isTurkish
                    ? "Tekrar hoş geldin"
                    : "Welcome back"}
              </h1>

              <p className="mt-3 text-slate-400">
                {isDownloadIntent
                  ? isTurkish
                    ? "Girişten sonra seni otomatik olarak istediğin dokümana geri götüreceğiz."
                    : "After signing in, we will automatically return you to the document you requested."
                  : isTurkish
                    ? "Çalışma alanına devam etmek için giriş yap."
                    : "Sign in to continue to your workspace."}
              </p>
            </div>

            <LoginForm
              locale={safeLocale}
              nextPath={nextPath}
              downloadIntent={isDownloadIntent}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
