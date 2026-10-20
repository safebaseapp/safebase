"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MissionEvent } from "./MissionState";
import type { LoggedEvent } from "@/lib/sim5/replay";
type Session = { events:LoggedEvent[]; origin:number; runId:string; run:Promise<{id:string;revision:number}>; revision:number; queue:Promise<void> };
const endpoint="/api/labs/sim5/runs";
async function post(body:unknown){
 const response=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body),cache:"no-store"});
 const result=await response.json();if(!response.ok||!result.ok)throw Error(result.error||"SAVE_FAILED");return result;
}
export function useMissionPersistence(enabled:boolean,tr:boolean){
 const current=useRef<Session|null>(null);
 const [status,setStatus]=useState("");
 const [historyRevision,setHistoryRevision]=useState(0);
 const flush=useCallback((session:Session)=>{
  const events=structuredClone(session.events);
  session.queue=session.queue.catch(()=>{}).then(async()=>{
   try{
    let run;
    try { run=await session.run; } catch { session.run=post({action:"start",runId:session.runId,locale:tr?"tr":"en"}).then(r=>r.run);run=await session.run; }
    const result=await post({action:"sync",runId:run.id,revision:session.revision,events});session.revision=result.revision;
    setStatus(tr?`Sunucuda kaydedildi · Bu denemede kazanılan hesap XP: ${result.xpAwarded}`:`Saved on server · Account XP earned in this run: ${result.xpAwarded}`);
    setHistoryRevision(n=>n+1);
   }catch{setStatus(tr?"Hesaba kaydedilemedi. Yerel rapor korunuyor; Kaydı yeniden dene düğmesini kullan. Kalıcı XP doğrulanmadı.":"Account save failed. Local report remains; use Retry save. Permanent XP has not been confirmed.");}
  });
 },[tr]);
 const record=useCallback((event:MissionEvent)=>{
  if(!enabled)return;
  if(event.type==="restart"){
   const old=current.current;
   if(old){const last=old.events.at(-1)?.event.type;if(last!=="finish"&&last!=="cancel"){old.events.push({atMs:Math.floor(performance.now()-old.origin),event:{type:"cancel"}});}flush(old);}
   current.current=null;return;
  }
  if(event.type==="start"){
   const runId=crypto.randomUUID();
   const session:Session={runId,events:[{atMs:0,event:{type:"start"}}],origin:performance.now(),revision:0,queue:Promise.resolve(),run:post({action:"start",runId,locale:tr?"tr":"en"}).then(r=>r.run)};
   // Handle startup failures immediately; keep rejection for flush/retry feedback.
   void session.run.catch(()=>setStatus(tr?"Hesap kaydı başlatılamadı; yerel deneme devam eder.":"Account recording could not start; the local attempt continues."));
   current.current=session;setStatus(tr?"Hesap kaydı başlatılıyor…":"Starting account recording…");flush(session);return;
  }
  const session=current.current;if(!session)return;
  const atMs=Math.floor(performance.now()-session.origin);
  if(event.type==="tick"&&atMs-(session.events.at(-1)?.atMs||0)<5000)return;
  const sanitized=event.type==="tick"?{type:"tick"} as MissionEvent:event;
  session.events.push({atMs,event:sanitized});
  if(event.type==="finish"||event.type==="cancel"||event.type==="pause")flush(session);
 },[enabled,flush,tr]);
 useEffect(()=>{
  if(!enabled)return;
  const timer=window.setInterval(()=>{if(current.current)flush(current.current)},10000);
  return()=>window.clearInterval(timer);
 },[enabled,flush]);
 return {record,status,historyRevision,retry:()=>{if(current.current)flush(current.current)}};
}
