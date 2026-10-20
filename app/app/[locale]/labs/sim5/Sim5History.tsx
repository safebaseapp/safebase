"use client";
import { useCallback, useEffect, useState } from "react";
import { scenarioNames } from "./MissionConsequences";
type Report={found?:string[];completed?:string[];missed?:string[];activeMs?:number;findings?:Record<string,{attempts:{answer:number;correct:boolean;activeMs:number}[]}>};
type Run={id:string;status:string;score:number;xp_awarded:number;started_at:string;report:Report};
export default function Sim5History({tr}:{tr:boolean}) {
 const [runs,setRuns]=useState<Run[]>([]),[error,setError]=useState("");
 const load=useCallback(async()=>{
  try{const response=await fetch("/api/labs/sim5/runs",{cache:"no-store"});const body=await response.json();if(!response.ok||!body.ok)throw Error();setRuns(body.runs);setError("");}
  catch{setError(tr?"Geçmiş şu anda yüklenemedi. Veritabanı bağlantısı ve migration gerekli.":"History is unavailable. Database connectivity and the migration are required.");}
 },[tr]);
 useEffect(()=>{
  let active=true;
  fetch("/api/labs/sim5/runs",{cache:"no-store"}).then(async response=>{
   const body=await response.json();if(!response.ok||!body.ok)throw Error();
   if(active){setRuns(body.runs);setError("");}
  }).catch(()=>{if(active)setError(tr?"Geçmiş şu anda yüklenemedi. Veritabanı bağlantısı ve migration gerekli.":"History is unavailable. Database connectivity and the migration are required.");});
  return()=>{active=false};
 },[tr]);
 return <section className="mx-auto my-6 max-w-[1600px] rounded-xl border border-cyan-300/30 p-4"><h2 className="text-xl font-bold">{tr?"Performans geçmişim":"My performance history"}</h2><button className="min-h-11 underline" onClick={()=>void load()}>{tr?"Geçmişi yenile":"Refresh history"}</button>
 {error?<p role="status">{error}</p>:runs.length===0?<p>{tr?"Henüz kayıt yok.":"No saved runs yet."}</p>:<ul>{runs.map(run=><li key={run.id} className="my-3 border-t border-white/20 pt-3"><details><summary>{new Date(run.started_at).toLocaleString(tr?"tr-TR":"en-GB")} · {run.score}/100 · {run.xp_awarded} XP · {({in_progress:tr?"Kesintili / son kayıt":"Interrupted / last checkpoint",completed:tr?"Tamamlandı":"Completed",partial:tr?"Kısmi":"Partial",cancelled:tr?"İptal":"Cancelled"})[run.status]}</summary><p>{tr?"Aktif süre":"Active time"}: {Math.floor((run.report.activeMs||0)/1000)}s</p>{(["found","completed","missed"] as const).map(kind=><p key={kind}>{({found:tr?"Bulunan":"Found",completed:tr?"Tamamlanan":"Completed",missed:tr?"Kaçırılan":"Missed"})[kind]}: {(run.report[kind]||[]).map(id=>scenarioNames[id]?.[tr?0:1]||id).join(", ")||"—"}</p>)}{Object.entries(run.report.findings||{}).map(([id,f])=><p key={id}>{scenarioNames[id]?.[tr?0:1]}: {f.attempts.map(a=>`${Math.floor(a.activeMs/1000)}s · ${a.answer+1} · ${a.correct?"✓":"×"}`).join("; ")}</p>)}</details></li>)}</ul>}
 </section>;
}
