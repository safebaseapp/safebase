import { Sim5GateEvent, Sim5UnlockLink } from "./Sim5Actions";
import Link from "next/link";
import Sim5History from "./Sim5History";
import RealModels from "./RealModels";
import { getSim5Access } from "@/lib/sim5/server-access";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Sim5Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "tr") notFound();
  const isTr = locale === "tr";
  const access = await getSim5Access();
  const fullPath = `/${locale}/labs/sim5`;
  const upgradePath = `/${locale}/upgrade?next=${encodeURIComponent(fullPath)}`;
  const unlockPath = access.reason === "inactive" ? `/${locale}/account-suspended` : access.userId ? upgradePath : `/${locale}/login?next=${encodeURIComponent(fullPath)}`;

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
            ? "DEMO kayıt gerektirmez. Premium tam denetim için hesabındaki erişim sunucuda doğrulanır."
            : "No sign-in needed for DEMO. Premium full inspection is authorized on the server."}
        </p>
      </header>

      {!access.allowed && <Sim5GateEvent tr={isTr}/>}
      <section className="mx-auto mb-5 max-w-[1600px] rounded-xl border border-cyan-300/30 p-4">
        <div className="flex flex-wrap gap-3"><Link className="inline-flex min-h-12 items-center rounded-lg bg-cyan-200 px-5 font-bold text-slate-950" href={`/${locale}/labs/sim5/demo`}>{isTr ? "Ücretsiz Demo Oyna" : "Play Free Demo"}</Link>
        {!access.allowed && <Sim5UnlockLink tr={isTr} href={unlockPath}>{isTr ? "Premium Simülasyonu Başlat" : "Start Premium Simulation"}</Sim5UnlockLink>}</div>
        <table className="mt-4 w-full text-left text-sm"><caption className="mb-2 text-left font-bold">DEMO / Premium</caption><thead><tr><th>{isTr?"Özellik":"Feature"}</th><th>DEMO</th><th>Premium</th></tr></thead><tbody>
        <tr><th>{isTr?"HSE bulguları":"HSE findings"}</th><td>2</td><td>6</td></tr><tr><th>{isTr?"Üst platform görevi":"Upper-platform mission"}</th><td>—</td><td>✓</td></tr><tr><th>{isTr?"Tekrar":"Replay"}</th><td>∞</td><td>∞</td></tr><tr><th>{isTr?"Hesap geçmişi":"Account history"}</th><td>—</td><td>✓</td></tr></tbody></table>
        {!access.allowed && <p className="mt-3" role="status">{access.reason === "unconfigured" || access.reason === "unavailable" ? (isTr ? "Premium erişimi şu anda doğrulanamıyor. Ücretsiz DEMO oynanabilir; tam görev kapalıdır." : "Premium access cannot currently be verified. Play the free DEMO; the full mission remains locked.") : isTr ? "Tam denetim yalnız aktif Premium/admin hesabına açıktır." : "Full inspection requires an active Premium/admin account."}</p>}
      </section>
      {access.allowed && <><RealModels tr={isTr} missionMode="full" persist /><Sim5History tr={isTr}/></>}
    </main>
  );
}
