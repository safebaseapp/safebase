import Link from "next/link";
import { notFound } from "next/navigation";
import SignRenderer from "@/components/safety-signs/SignRenderer";
import { getSafetySign } from "@/lib/safety-signs/data";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export default async function SafetySignDetailPage({
  params,
}: Props) {
  const { locale, slug } = await params;

  if (locale !== "tr" && locale !== "en") {
    notFound();
  }

  const sign = getSafetySign(slug);

  if (!sign) {
    notFound();
  }

  const isTurkish = locale === "tr";

  return (
    <main className="min-h-screen bg-slate-200 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href={`/${locale}/safety-signs`}
          className="font-black text-blue-700"
        >
          ←{" "}
          {isTurkish
            ? "Güvenlik Levhaları"
            : "Safety Signs"}
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="mx-auto h-[900px] w-[650px] max-w-full">
            <SignRenderer
              sign={sign}
              locale={locale}
            />
          </div>

          <aside className="h-fit rounded-[28px] bg-white p-7 shadow-xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">
              {sign.code}
            </p>

            <h1 className="mt-4 text-3xl font-black text-slate-950">
              {sign.title[locale]}
            </h1>

            <p className="mt-4 leading-7 text-slate-600">
              {sign.description[locale]}
            </p>

            <div className="mt-7 space-y-3">
              <button
                type="button"
                className="w-full rounded-xl bg-blue-600 px-5 py-4 font-black text-white"
              >
                A4 PDF
              </button>

              <button
                type="button"
                className="w-full rounded-xl bg-emerald-600 px-5 py-4 font-black text-white"
              >
                A3 PDF
              </button>

              <button
                type="button"
                className="w-full rounded-xl border border-slate-300 px-5 py-4 font-black text-slate-900"
              >
                PNG
              </button>
            </div>

            <p className="mt-6 text-xs font-semibold leading-5 text-slate-500">
              {isTurkish
                ? "İndirme ve yazdırma işlevlerini sonraki adımda levha motoruna bağlayacağız."
                : "Download and print actions will be connected to the sign engine in the next step."}
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
