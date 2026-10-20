"use client";
import {ScanLine} from "lucide-react";
import Sim5PromoLink from "./Sim5PromoLink";
export default function Sim5MenuEntry({locale,onNavigate}:{locale:"tr"|"en";onNavigate:()=>void}) {
 const tr=locale==="tr";
 return <div className="col-span-2 rounded-xl border border-cyan-300/30 bg-gradient-to-r from-cyan-950/60 to-violet-950/30 p-3" data-sim5-menu-entry>
  <p className="flex items-center gap-2 text-sm font-black text-cyan-100"><ScanLine size={18} aria-hidden="true"/>SERNEM SIM 5.0</p>
  <p className="mt-1 text-xs leading-5 text-slate-300">{tr?"3D sahada iki bulgulu ücretsiz DEMO. Premium ile altı bulgulu tam denetim.":"A free two-finding DEMO in the 3D site. Full six-finding inspection with Premium."}</p>
  <div className="mt-2 flex flex-wrap gap-2"><Sim5PromoLink locale={locale} kind="demo" surface="menu" onNavigate={onNavigate} className="inline-flex min-h-11 items-center rounded-lg bg-cyan-200 px-3 text-xs font-bold text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">{tr?"Ücretsiz Demo Oyna":"Play Free Demo"}</Sim5PromoLink><Sim5PromoLink locale={locale} kind="premium" surface="menu" onNavigate={onNavigate} className="inline-flex min-h-11 items-center rounded-lg border border-cyan-300/30 px-3 text-xs font-bold text-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">{tr?"Tam Simülasyon":"Full Simulation"}</Sim5PromoLink></div>
 </div>;
}
