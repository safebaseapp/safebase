import { getSim5Access } from "@/lib/sim5/server-access";
import Link from "next/link";
import { notFound } from "next/navigation";
import RealModels from "../RealModels";
import type { Metadata } from "next";
export async function generateMetadata({params}: {params: Promise<{locale:string}>}): Promise<Metadata> {
 const {locale} = await params;
 return {title: "SERNEM SIM 5.0 — " + (locale === "tr" ? "Ücretsiz Demo" : "Free Demo"), alternates: {canonical: `https://www.sernem.com/${locale}/labs/sim5/demo`, languages: {en:"https://www.sernem.com/en/labs/sim5/demo", tr:"https://www.sernem.com/tr/labs/sim5/demo", "x-default":"https://www.sernem.com/en/labs/sim5/demo"}}};
}
export default async function DemoPage({params}: {params:Promise<{locale:string}>}) {
 const {locale}=await params; if(locale!=="tr"&&locale!=="en") notFound(); const tr=locale==="tr";
 const access=await getSim5Access();
 const fullPath=`/${locale}/labs/sim5`,upgrade=`/${locale}/upgrade?next=${encodeURIComponent(fullPath)}`;
 const unlockHref=access.allowed?fullPath:access.reason==="inactive"?`/${locale}/account-suspended`:access.userId?upgrade:`/${locale}/login?next=${encodeURIComponent(fullPath)}`;
 return <main className="min-h-screen bg-[#071622] px-3 py-6 text-slate-100 sm:px-6">
  <nav className="mx-auto flex max-w-[1600px] flex-wrap justify-between gap-3"><Link href={`/${locale}/labs`}>← SERNEM Labs</Link><Link href={`/${tr?"en":"tr"}/labs/sim5/demo`} hrefLang={tr?"en":"tr"}>{tr?"English":"Türkçe"}</Link></nav>
  <header className="mx-auto my-5 max-w-[1600px]"><h1 className="text-2xl font-black">SERNEM SIM 5.0 — {tr?"Ücretsiz Demo Oyna":"Play Free Demo"}</h1><p>{tr?"İki HSE bulgusu · Kaynak + kaldırma · Kayıt gerekmez · Sınırsız tekrar":"Two HSE findings · Welding + lifting · No sign-in · Unlimited replay"}</p></header>
  <RealModels tr={tr} missionMode="demo" unlockHref={unlockHref}/>
 </main>;
}
