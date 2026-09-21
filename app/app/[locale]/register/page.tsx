import Link from "next/link";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../i18n/routing";
import RegisterForm from "./RegisterForm";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{
    next?: string;
    intent?: string;
  }>;
};

function sanitizeNextPath(value?: string) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return undefined;
  }

  return value;
}

export default async function RegisterPage({ params, searchParams }: Props) {
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
                    ? "Ücretsiz indir"
                    : "Download free"
                  : isTurkish
                    ? "Ücretsiz hesabını oluştur"
                    : "Create your free account"}
              </p>

              <h2 className="mt-5 max-w-lg text-4xl font-bold leading-tight">
                {isDownloadIntent
                  ? isTurkish
                    ? "Hesabını oluştur, istediğin HSE dokümanına kaldığın yerden devam et."
                    : "Create your account and continue straight to the HSE document you requested."
                  : isTurkish
                    ? "Daha güvenli iş yerleri için dijital çalışma alanını oluştur."
                    : "Build your digital workspace for safer workplaces."}
              </h2>

              <ul className="mt-7 space-y-4 text-slate-300">
                <li>
                  ✓{" "}
                  {isDownloadIntent
                    ? isTurkish
                      ? "Ücretsiz standart PDF indirmeleri"
                      : "Free standard PDF downloads"
                    : isTurkish
                      ? "Profesyonel HSE araçları"
                      : "Professional HSE tools"}
                </li>
                <li>
                  ✓{" "}
                  {isDownloadIntent
                    ? isTurkish
                      ? "Kredi kartı gerekmez"
                      : "No credit card required"
                    : isTurkish
                      ? "AI destekli rehberlik"
                      : "AI-powered guidance"}
                </li>
                <li>
                  ✓{" "}
                  {isDownloadIntent
                    ? isTurkish
                      ? "Doğrulama sonrası indirmene geri dön"
                      : "Return to your download after verification"
                    : isTurkish
                      ? "Kişisel dashboard"
                      : "Personal dashboard"}
                </li>
              </ul>
            </div>

            <p className="text-sm text-slate-500">Safety without borders.</p>
          </section>

          <section className="p-7 sm:p-8 lg:p-10">
            <Link
              href={`/${safeLocale}`}
              className="inline-flex text-sm font-semibold text-slate-400 transition hover:text-white"
            >
              ← {isTurkish ? "Ana sayfaya dön" : "Back to homepage"}
            </Link>

            <div className="mt-7">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-400">
                {isDownloadIntent
                  ? isTurkish
                    ? "Ücretsiz PDF erişimi"
                    : "Free PDF access"
                  : isTurkish
                    ? "SERNEM'e katıl"
                    : "Join SERNEM"}
              </p>

              <h1 className="mt-3 text-3xl font-bold">
                {isDownloadIntent
                  ? isTurkish
                    ? "Ücretsiz hesap oluştur ve indir"
                    : "Create a free account and download"
                  : isTurkish
                    ? "Hesabını oluştur"
                    : "Create your account"}
              </h1>

              <p className="mt-3 text-slate-400">
                {isDownloadIntent
                  ? isTurkish
                    ? "Kart bilgisi istemiyoruz. Hesabını doğruladıktan sonra dokümanına devam edebilirsin."
                    : "No card details required. After verifying your account, you can continue to your document."
                  : isTurkish
                    ? "Başlamak yalnızca birkaç saniye sürer."
                    : "It only takes a few seconds to get started."}
              </p>
            </div>

            <RegisterForm
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
