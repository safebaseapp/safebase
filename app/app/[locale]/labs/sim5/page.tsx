import Link from "next/link";
import RealModels from "./RealModels";
import { notFound } from "next/navigation";

export default async function Sim5Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "tr") notFound();
  const isTr = locale === "tr";

  return (
    <main className="min-h-screen bg-[#071622] px-3 py-6 text-[#eaf4fa] sm:px-6 sm:py-8">
      <nav className="mx-auto mb-5 flex w-full max-w-[1600px] flex-wrap items-center justify-between gap-3 text-sm">
        <Link href={`/${locale}/labs`} className="font-semibold text-cyan-200 underline-offset-4 hover:underline">
          {isTr ? "← SERNEM Labs'e dön" : "← Back to SERNEM Labs"}
        </Link>
        <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-bold tracking-wide text-cyan-100">
          SERNEM SIM 5.0 / BETA
        </span>
      </nav>

      <header className="mx-auto mb-5 w-full max-w-[1600px]">
        <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
          {isTr ? "3D Endüstriyel Saha Simülatörü" : "3D Industrial Site Simulator"}
        </h1>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-300">
          {isTr
            ? "Sahada yürü, kaynak ve kaldırma operasyonlarını incele, tank platformlarına çık ve 6 HSE bulgusunu güvenli yaklaşım noktalarından değerlendir."
            : "Walk the site, inspect welding and lifting operations, climb the tank platforms and assess 6 HSE findings from safe approach points."}
        </p>
        <p className="mt-2 text-xs text-slate-400">
          {isTr
            ? "Beta sürümü: Bu simülasyonun denetim sonuçları henüz hesabına veya Labs XP toplamına kaydedilmez."
            : "Beta release: Inspection results are not yet saved to your account or added to your Labs XP total."}
        </p>
      </header>

      <RealModels tr={isTr} />
    </main>
  );
}
