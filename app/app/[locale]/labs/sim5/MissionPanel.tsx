"use client";
import { useEffect, useRef, useState } from "react";
import { findingScore, missionSummary, missionWeights, type MissionEvent, type MissionState } from "./MissionState";
import { controlOutcomes, scenarioNames, wrongDecisionReasons } from "./MissionConsequences";
import { siteInspections } from "./SiteInspections";

export function formatMissionTime(ms: number) {
 const seconds = Math.floor(ms / 1000);
 return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
}
export function MissionHud({ mission, tr }: { mission: MissionState; tr: boolean }) {
 if (mission.phase === "briefing") return null;
 const summary = missionSummary(mission);
 const title = mission.phase === "finished" ? (tr ? "Denetim bitti" : "Inspection finished") : mission.phase === "cancelled" ? (tr ? "İptal edildi" : "Cancelled") : mission.phase === "paused" ? (tr ? "Duraklatıldı" : "Paused") : (tr ? "Saha denetimi" : "Site inspection");
 return <div className="sim5-mission-hud" aria-label={tr ? "Görev göstergesi" : "Mission HUD"}>
  <strong>{title}</strong>
  <span>{tr ? "Bulunan" : "Found"}: {summary.found.length}/{Object.keys(mission.findings).length} · {tr ? "Kalan" : "Remaining"}: {summary.missed.length}</span>
  <span>{tr ? "Puan" : "Score"}: {summary.score}/100 · {mission.mode === "demo" ? (tr ? "DEMO · Hesap XP yok" : "DEMO · No account XP") : `${summary.localXp} ${tr ? "görev XP" : "mission XP"}`}</span>
  <span>{formatMissionTime(mission.activeMs)}</span>
 </div>;
}
export function MissionPanel({ mission, tr, ready, send, onStart, onRestart }: {
 mission: MissionState; tr: boolean; ready: boolean; send: (event: MissionEvent) => void; onStart: () => void; onRestart: () => void;
}) {
 const [confirm, setConfirm] = useState<"restart" | "cancel" | null>(null);
 const keepButton=useRef<HTMLButtonElement>(null);
 useEffect(()=>{if(confirm)keepButton.current?.focus()},[confirm]);
 const requestConfirm=(kind:"restart"|"cancel")=>{if(mission.phase==="active")send({type:"pause"});setConfirm(kind);};
 const l = tr ? 0 : 1, summary = missionSummary(mission), ended = mission.phase === "finished" || mission.phase === "cancelled";
 const kind = { applied: tr ? "Uygulandı" : "Applied", requested: tr ? "Talep edildi" : "Requested", partial: tr ? "Kısmen uygulandı; kontroller bekleniyor" : "Partly applied; controls pending" };
 return <section className="sim5-mission-panel" aria-label={tr ? "HSE denetim görevi" : "HSE inspection mission"}>
  <style>{`
   .sim5-mission-panel{background:#123344;border:1px solid #365c6d;border-radius:12px;padding:14px;margin:12px 0;color:#e2edf0;box-sizing:border-box}
   .sim5-mission-panel button{min-height:44px;max-width:100%;padding:10px 14px;border:1px solid #7397a7;border-radius:8px;background:#17556b;color:white;cursor:pointer;box-sizing:border-box}
   .sim5-mission-panel button:disabled{opacity:.55;cursor:wait}
   .sim5-mission-actions{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
   .sim5-mission-confirm{position:fixed;z-index:20;left:50%;top:50%;transform:translate(-50%,-50%);width:min(90vw,480px);max-height:80svh;overflow:auto;padding:18px;box-sizing:border-box;background:#123344;border:2px solid #8ab8c8;border-radius:12px;box-shadow:0 0 0 100vmax rgba(0,15,24,.72)}
   .sim5-mission-panel h2{font-size:19px;margin:0 0 10px}.sim5-mission-panel h3{font-size:16px}
   .sim5-mission-panel p{line-height:1.5}.sim5-mission-panel li{margin:7px 0;overflow-wrap:anywhere}
   .sim5-mission-hud{position:absolute;right:12px;bottom:12px;z-index:2;display:grid;gap:4px;max-width:230px;padding:9px;background:rgba(12,39,51,.91);border:1px solid #6c9eac;border-radius:9px;color:#e5f4f7;font-size:12px;pointer-events:none;box-sizing:border-box}
   @media(pointer:coarse),(max-width:700px){.sim5-mission-hud{right:8px;bottom:8px;width:150px;max-width:calc(100% - 180px);font-size:11px;padding:6px;gap:3px}}
   @media(max-width:420px){.sim5-mission-hud{max-width:calc(100% - 165px)}}
  `}</style>
  {mission.phase === "briefing" && <>
   <h2>{mission.mode === "demo" ? "SERNEM SIM 5.0 — DEMO" : tr ? "HSE saha denetimi" : "HSE site inspection"}</h2>
   <p>{mission.mode === "demo" ? (tr ? "Görev: Kaynak ve kaldırma sahnelerinde iki bulguyu keşfet, uygun kontrolleri seç ve sahadaki etkilerini gör. Bariyerlerin dışında kal. Demo sınırsız tekrar edilir; kayıt gerekmez." : "Mission: Discover two findings at the welding and lifting stations, select safe controls and see their scene consequences. Stay outside the barriers. Replay freely; no sign-in required.") : tr ? "Görev: Sıcak çalışma, kaldırma, sızıntı, engellenmiş erişim ve üst seviyedeki iki bulguyu yürüyerek keşfet. Kanıtı gör, riski değerlendir ve uygun kontrolü seç. Vinç bariyerinin dışında kal; tank servis merdivenlerini kullan. Altı doğru kontrol kararı hedefleniyor." : "Mission: Walk the site to discover hot work, lifting, a leak, blocked access and two upper-level findings. Observe evidence, assess the risk and choose a suitable control. Remain outside the lifting barrier; use the tank service stairs. Record six safe control decisions."}</p>
   <p>{mission.mode === "demo" ? (tr ? "DEMO puanı yalnız iki bulguya göre 0–100 ölçeğine çevrilir. Hesap XP veya geçmiş kaydı oluşturulmaz." : "DEMO score is normalized to 0–100 using only two findings. No account XP or history is written.") : tr ? "Aktif süre, 0–100 puan ve yalnız bu denemeye ait XP ölçülür. Yanlış ilk karar ilgili bulgunun puanını azaltır. Görev XP’si ile sunucunun doğruladığı hesap XP’si ayrıdır; kayıt durumunu kontrol et." : "Active time, a 0–100 score and XP for this attempt are measured. A wrong first decision reduces that finding’s score. Local mission XP is separate from server-confirmed account XP; check the save status."}</p>
   <button type="button" disabled={!ready} onClick={onStart}>{tr ? "Denetime başla" : "Start inspection"}</button>
  </>}
  {!ended && mission.phase !== "briefing" && <>
   <div className="sim5-mission-actions">
    {mission.phase === "active" ? <button type="button" onClick={() => send({ type: "pause" })}>{tr ? "Duraklat" : "Pause inspection"}</button> : <button type="button" onClick={() => send({ type: "resume" })}>{tr ? "Denetime devam et" : "Resume inspection"}</button>}
    <button type="button" onClick={() => send({ type: "finish" })}>{tr ? "Denetimi bitir" : "Finish inspection"}</button>
    <button type="button" onClick={() => requestConfirm("restart")}>{tr ? "Görevi yeniden başlat" : "Restart mission"}</button>
    <button type="button" onClick={() => requestConfirm("cancel")}>{tr ? "Görevi iptal et" : "Cancel mission"}</button>
   </div>
   {mission.phase === "paused" && <p role="status">{tr ? "Görev duraklatıldı. Hareket, inceleme ve süre durdu. Sekme gizlendiğinde veya odak kaybolduğunda otomatik duraklatılır; devam etmek için düğmeyi kullan." : "Inspection paused. Movement, inspection and time are stopped. Hiding the tab or losing focus pauses automatically; use Resume to continue."}</p>}
   {summary.completed.length === Object.keys(mission.findings).length && <p role="status">{tr ? "Altı kontrol kararı kaydedildi. Bekleyen doğrulamaları gözden geçir ve denetimi bitir." : "All six control decisions recorded. Review pending verifications and finish the inspection."}</p>}
  </>}
  {confirm && <div className="sim5-mission-confirm" role="alertdialog" aria-modal="true" aria-describedby="sim5-confirm-description" onKeyDown={e=>{if(e.key==="Escape"){setConfirm(null);return;}if(e.key==="Tab"){const buttons=e.currentTarget.querySelectorAll("button"),first=buttons[0],last=buttons[buttons.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}} aria-label={tr ? "Görev değişikliğini onayla" : "Confirm mission change"}>
   <p id="sim5-confirm-description">{confirm === "restart" ? (tr ? "Bu denemenin puanı, süresi ve saha kontrol durumları sıfırlanacak. Yeniden başlatılsın mı?" : "This attempt’s score, time and scene control states will be cleared. Restart?") : (tr ? "Denetim iptal edilsin mi? Mevcut sonuçlar eksik bir deneme olarak gösterilecek." : "Cancel inspection? Current results will be shown as an incomplete attempt.")}</p>
   <div className="sim5-mission-actions"><button type="button" onClick={() => { if (confirm === "restart") onRestart(); else send({ type: "cancel" }); setConfirm(null); }}>{tr ? "Onayla" : "Confirm"}</button><button ref={keepButton} type="button" onClick={() => setConfirm(null)}>{tr ? "Görevi koru" : "Keep mission"}</button></div>
  </div>}
  {ended && <div data-testid="mission-report">
   <h2>{mission.mode === "demo" ? (tr ? "DEMO — Kısa öğrenme raporu" : "DEMO — Short learning report") : mission.phase === "cancelled" ? (tr ? "İptal edilen denetim raporu" : "Cancelled inspection report") : (tr ? "Denetim sonuç raporu" : "Inspection results")}</h2>
   <p data-testid="mission-totals">{tr ? "Puan" : "Score"}: {summary.score}/100 · {mission.mode === "demo" ? (tr ? "DEMO · Hesap XP yok" : "DEMO · No account XP") : `${summary.localXp} ${tr ? "görev XP" : "mission XP"}`} · {tr ? "Aktif süre" : "Active time"}: {formatMissionTime(summary.activeMs)} · {tr ? "Doğru kontroller" : "Safe controls"}: {summary.completed.length}/{Object.keys(mission.findings).length} · {tr ? "Yanlış karar" : "Wrong decisions"}: {summary.wrongDecisions}</p>
   <p>{mission.mode === "demo" ? (tr ? "DEMO raporudur; hesap geçmişi veya kalıcı XP oluşturmaz. Sertifika değildir." : "DEMO report only; no account history or permanent XP. Not a certificate.") : tr ? "Görev XP’si yalnız bu denemeye aittir; hesap XP’si için kayıt durumuna bak. Resmî yeterlilik/sertifika anlamına gelmez." : "Mission XP belongs only to this attempt; check the save status for account XP. It is not a qualification or certificate."}</p>
   <h3>{tr ? "Bulunan bulgular" : "Found findings"} ({summary.found.length}/{Object.keys(mission.findings).length})</h3>
   {summary.found.length ? <ul>{summary.found.map(id => {
    const f = mission.findings[id];
    return <li key={id}><strong>{scenarioNames[id][l]}</strong> · {findingScore(id, f)}/{missionWeights[id]} · {f.completed ? kind[controlOutcomes[id].kind] : (tr ? "Kontrol kararı tamamlanmadı" : "Control decision incomplete")}
     <p>{siteInspections[id].visibleEvidence[l]}</p>
     {f.completed && <p>{controlOutcomes[id].text[l]}</p>}
     {f.attempts.length > 0 && <ol>{f.attempts.map((a, i) => <li key={i}>{formatMissionTime(a.activeMs)} · {siteInspections[id].answers[a.answer][l]} — {a.correct ? (tr ? "Doğru" : "Correct") : (tr ? "Yanlış" : "Incorrect")}</li>)}</ol>}
     {f.attempts[0]?.correct === false && <p>{tr ? "İlk karar için gelişim önerisi: " : "First-decision learning point: "}{wrongDecisionReasons[id][l]}</p>}
    </li>;
   })}</ul> : <p>{tr ? "Henüz bulgu tespit edilmedi." : "No findings discovered."}</p>}
   <h3>{tr ? "Kaçırılan bulgular" : "Missed findings"} ({summary.missed.length})</h3>
   {summary.missed.length ? <ul>{summary.missed.map(id => <li key={id}>{scenarioNames[id][l]}</li>)}</ul> : <p>{tr ? "Tüm bulgular bulundu." : "All findings discovered."}</p>}
   <h3>{tr ? "Gelişim önerileri" : "Improvement recommendations"}</h3>
   <ul>
    {summary.missed.some(id => siteInspections[id].level === 1) && <li>{tr ? "Servis merdivenlerinden üst platforma çık; kanıtı doğru seviyeden gözlemle. Zeminden yatay yakınlık yeterli değildir." : "Use the service stairs to inspect the upper platform at its own level. Ground-level horizontal proximity is insufficient."}</li>}
    {summary.found.length > summary.completed.length && <li>{tr ? "Bir kanıtı bulmak kontrolü tamamlamak değildir. Yanlış kararın teknik gerekçesini değerlendir ve yeni denemede kontrol kararını tamamla." : "Finding evidence does not complete its control. Review the technical reason for an incorrect decision and complete the control in a new attempt."}</li>}
    <li>{tr ? "Talep edilen kontrolleri uygulanmış sayma. Kaldırma onayı, salımın giderilmesi ve erişimin açılması yetkili doğrulaması gerektirir." : "Do not treat requested controls as implemented. Lift clearance, release repair and reopening access require authorized verification."}</li>
    <li>{tr ? "Saha keşfini güvenli yollardan yap; bariyerleri aşma ve düşen cisim kontrolünü kişisel düşme korumasından ayrı değerlendir." : "Explore by safe routes; do not cross barriers and assess dropped-object controls separately from personal fall protection."}</li>
   </ul>
   <button type="button" onClick={() => requestConfirm("restart")}>{tr ? "Görevi yeniden başlat" : "Restart mission"}</button>
  </div>}
  {mission.mode === "demo" && ended && <aside className="mt-4 rounded-xl border border-cyan-300/30 p-4">
   <h3>{tr ? "Tam saha denetimine devam et" : "Continue with the full site inspection"}</h3>
   <p>{tr ? "Premium: Altı bulgu, tank merdivenleri ve üst platform riskleri, sınırsız tekrar ve ayrıntılı hesap geçmişi. Demo tamamlamak Premium erişim kazandırmaz." : "Premium: Six findings, tank stairs and upper-platform risks, unlimited replay and detailed account history. Completing the demo does not grant Premium."}</p>
   <a className="inline-flex min-h-11 items-center underline" href={`/${tr ? "tr" : "en"}/labs/sim5`}>{tr ? "Tam Simülasyonu Aç" : "Unlock Full Simulation"}</a>
  </aside>}
  <details><summary>{tr ? "Puanlama nasıl çalışır?" : "How scoring works"}</summary>{mission.mode === "demo" && <p>{tr ? "Aşağıdaki ağırlıklar yalnız iki DEMO bulgusuna göre 0–100 ölçeğine çevrilir. XP verilmez." : "The weights below are normalized to 0–100 for the two DEMO findings only. No XP is awarded."}</p>}<p>{tr ? "Tespit ağırlığın %20’sini, doğru kontrol %80’ini kazandırır. Yanlış ilk karar ağırlığın %20’sini bir kez düşürür; düzeltilen bulgu en fazla %80 kazanır. Tekrar açma puan/XP kazandırmaz. Görev XP = puan × 2; denemeler arasında birikmez." : "Discovery earns 20% of the weight and a safe control earns 80%. A wrong first decision deducts 20% once; a corrected finding earns at most 80%. Reopening awards no score/XP. Mission XP = score × 2; attempts do not accumulate."}</p><ul>{Object.entries(missionWeights).filter(([id]) => Object.hasOwn(mission.findings, id)).map(([id, weight]) => <li key={id}>{scenarioNames[id][l]}: {weight}</li>)}</ul></details>
 </section>;
}
