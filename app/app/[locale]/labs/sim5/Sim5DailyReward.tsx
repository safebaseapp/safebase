"use client";
import {useCallback,useEffect,useState} from "react";

type Daily = {rewardDate:string;claimed:boolean;earnedToday:number;maxDailyXp:number;lifetimeBestXp:number};
type Props={tr:boolean;refreshKey:number};

function localDay(){
 const parts=new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Budapest",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date());
 const part=(type:string)=>parts.find(p=>p.type===type)?.value||"";
 return `${part("year")}-${part("month")}-${part("day")}`;
}

export default function Sim5DailyReward({tr,refreshKey}:Props){
 const [daily,setDaily]=useState<Daily|null>(null);
 const [error,setError]=useState(false);
 const reload=useCallback(async()=>{
  try{
   const response=await fetch("/api/labs/sim5/runs",{cache:"no-store"});
   if(!response.ok)throw new Error("Daily reward request failed");
   const result=await response.json();
   if(!result?.ok||!result?.daily)throw new Error("Missing daily reward");
   setDaily(result.daily as Daily);setError(false);
  }catch{setError(true)}
 },[]);
 useEffect(()=>{
  let active=true;
  // Refresh after each account-save response and at the next Budapest day.
  // No client-side timezone or score value is trusted by the XP writer.
  void reload();
  const tick=window.setInterval(()=>{
   if(!active||document.hidden)return;
   if(daily?.rewardDate&&localDay()!==daily.rewardDate)void reload();
  },30000);
  return()=>{active=false;window.clearInterval(tick)};
 },[reload,refreshKey,daily?.rewardDate]);
 const firstTime=!!daily&&!daily.claimed&&daily.lifetimeBestXp===0;
 return <aside className="my-4 rounded-xl border border-cyan-300/40 bg-[#103244] p-4" aria-label={tr?"SIM5 günlük XP durumu":"SIM5 daily XP status"}>
  <div className="flex flex-wrap items-center justify-between gap-2">
   <h2 className="text-lg font-bold text-cyan-100">{tr?"Günlük Saha Denetimi":"Daily Site Inspection"}</h2>
   <span className="rounded-full bg-cyan-200 px-3 py-1 text-sm font-bold text-slate-950">
    {daily?.claimed?(tr?"Bugün tamamlandı":"Claimed today"):firstTime?(tr?"İlk başarı +200 XP":"First success +200 XP"):"+50 XP"}
   </span>
  </div>
  {daily?.claimed
   ?<p className="mt-2 text-sm text-slate-200">{tr?"Bugünkü kalıcı XP hakkın kullanıldı. Simülasyonu istediğin kadar yeniden oynayabilirsin; yeni günlük ödül yarın açılır.":"Today's permanent XP slot is used. Replay as often as you like; the next daily reward becomes available tomorrow."}</p>
   :firstTime
   ?<p className="mt-2 text-sm text-slate-200">{tr?"İlk başarılı tam saha denetiminde en fazla 200 XP kazan. Sonraki günlerde 100/100 puanla günlük +50 XP al.":"Earn up to 200 XP for your first completed full inspection. On following days, earn +50 XP daily with a perfect 100/100 score."}</p>
   :<p className="mt-2 text-sm text-slate-200">{tr?"Bugünkü +50 XP hazır! Altı bulguyu eksiksiz bul, ilk kararlarının hepsinde doğruyu seç ve 100/100 puanla bitir.":"Today's +50 XP is ready! Find all six hazards, make every first decision correctly and finish at 100/100."}</p>}
  <p className="mt-2 text-xs text-slate-300">{tr?"Yenilenme: Her gün 00.00, Europe/Budapest. Günlük ödül kişi başına bir defadır; ücretsiz DEMO kalıcı XP vermez.":"Resets daily at 00:00 Europe/Budapest. One daily reward per account; the free DEMO never awards permanent XP."}</p>
  {error&&<p role="status" className="mt-2 text-amber-200">{tr?"Günlük ödül durumu şu anda doğrulanamadı. Sunucu kayıt durumu esas alınır.":"Daily eligibility is currently unavailable. The server remains authoritative."}</p>}
 </aside>;
}
