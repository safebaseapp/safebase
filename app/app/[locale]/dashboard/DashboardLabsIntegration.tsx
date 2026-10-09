"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Progress = {
 ok: boolean; totalXp?: number; monthlyXp?: number | null; level?: number;
 levelProgress?: number; xpToNextLevel?: number; globalRank?: number | null;
 monthlyRank?: number | null; rank?: { title: string };
};
export default function DashboardLabsIntegration({ locale }: { locale: string }) {
 const tr = locale === "tr";
 const [data, setData] = useState<Progress | null>(null);
 useEffect(() => {
  let alive = true;
  fetch("/api/labs/progress", { cache: "no-store" }).then(r => r.json()).then(result => { if (alive) setData(result); }).catch(() => { if (alive) setData({ ok: false }); });
  return () => { alive = false; };
 }, []);
 const localizedRanks: Record<string,string> = { "HSE Explorer":"İSG Kaşifi", "Field Starter":"Saha Başlangıç", "Safety Practitioner":"İSG Uygulayıcısı", "Advanced HSE":"İleri Düzey İSG", "HSE Decision Specialist":"İSG Karar Uzmanı", "Safety Expert":"İSG Uzmanı", "HSE Master":"İSG Ustası", "SERNEM Elite":"SERNEM Elit" };
 const format = (value: number | null | undefined) => value == null ? "—" : new Intl.NumberFormat(tr ? "tr-TR" : "en-US").format(value);
 return (
  <section data-testid="dashboard-labs-xp" className="my-4 rounded-[24px] border border-emerald-400/20 bg-[linear-gradient(130deg,#08251e,#071423)] p-5 text-white">
   <div className="flex flex-wrap items-center justify-between gap-3">
    <div><p className="text-[10px] font-black uppercase tracking-[0.17em] text-emerald-300">SERNEM LABS · XP</p>
    <h2 className="mt-1 text-xl font-black">{tr ? "Labs İlerlemem" : "My Labs Progress"}</h2>
    <p className="mt-1 text-xs text-slate-400">{data?.ok ? (tr ? (localizedRanks[data.rank?.title ?? "HSE Explorer"] ?? data.rank?.title ?? "İSG Kaşifi") : (data.rank?.title ?? "HSE Explorer")) : data === null ? (tr ? "Yükleniyor…" : "Loading…") : (tr ? "İlerleme şu anda alınamıyor" : "Progress is currently unavailable")}</p></div>
    <Link href={`/${locale}/dashboard/labs`} className="rounded-xl border border-emerald-300/30 px-3 py-2 text-xs font-bold text-emerald-200">{tr ? "Labs Profilim →" : "My Labs Profile →"}</Link>
   </div>
   <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
    {[
     ["XP", data?.ok ? format(data.totalXp) : "—"],
     [tr ? "Aylık XP" : "Monthly XP", data?.ok ? format(data.monthlyXp) : "—"],
     [tr ? "Seviye" : "Level", data?.ok ? format(data.level) : "—"],
     [tr ? "Global Sıra" : "Global Rank", data?.ok && data.globalRank ? `#${data.globalRank}` : "—"],
     [tr ? "Aylık Sıra" : "Monthly Rank", data?.ok && data.monthlyRank ? `#${data.monthlyRank}` : "—"]
    ].map(([label,value]) => <div key={label} className="rounded-xl border border-white/10 bg-black/20 px-3 py-3"><b className="text-xl text-white">{value}</b><p className="mt-1 text-[10px] text-slate-400">{label}</p></div>)}
   </div>
   <div className="mt-4 flex justify-between text-[11px] text-slate-400"><span>{tr ? "Seviye" : "Level"} {data?.ok ? data.level ?? 1 : "—"}</span><span>{data?.ok ? data.xpToNextLevel ?? 0 : "—"} XP {tr ? "sonraki seviyeye" : "to next level"}</span></div>
   <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-emerald-400" style={{ width: `${data?.ok ? Math.min(100,Math.max(0,data.levelProgress ?? 0)) : 0}%` }} /></div>
  </section>
 );
}
