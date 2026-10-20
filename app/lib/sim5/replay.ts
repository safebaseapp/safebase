import { createMission, reduceMission, missionSummary, type MissionEvent } from "@/app/[locale]/labs/sim5/MissionState";
import { canInspectAt, siteInspections } from "@/app/[locale]/labs/sim5/SiteInspections";
export const SIM5_SCHEMA = "sim5-mission/1";
export type LoggedEvent = { atMs: number; event: MissionEvent };
const MAX_DURATION = 2 * 60 * 60 * 1000;
/** Replay legal commands only; no client score/XP/completed flags are accepted.
 * Positions are simulated evidence, not proof of physical-world competence. */
export function verifyMissionLog(input: unknown, wallMs: number) {
 if (!Array.isArray(input) || input.length < 1 || input.length > 4096) throw new Error("INVALID_LOG");
 let state = createMission("full"), lastMs = 0;
 const log: LoggedEvent[] = [];
 for (const raw of input) {
  if (!raw || typeof raw !== "object" || Object.keys(raw).some(k=>k!=="atMs"&&k!=="event")) throw new Error("INVALID_EVENT");
  const {atMs,event} = raw;
  if (!Number.isSafeInteger(atMs) || atMs < lastMs || atMs < 0 || atMs > MAX_DURATION || atMs > wallMs + 5000 || !event || typeof event !== "object") throw new Error("INVALID_TIME");
  const type = event.type;
  const keys = type === "answer" ? ["type","id","answer"] : type === "discover" ? ["type","id","position"] : ["type"];
  if (Object.keys(event).some(k=>!keys.includes(k))) throw new Error("INVALID_EVENT_FIELDS");
  if (!log.length && (type !== "start" || atMs !== 0)) throw new Error("START_REQUIRED");
  if (type === "restart" || (type === "start" && log.length)) throw new Error("NEW_RUN_REQUIRED");
  if (state.phase === "active") state = reduceMission(state,{type:"tick",deltaMs:atMs-lastMs});
  lastMs=atMs;
  let command: MissionEvent;
  if (type === "discover") {
   if (typeof event.id !== "string" || !Object.hasOwn(siteInspections,event.id)) throw new Error("INVALID_FINDING");
   const p=event.position;
   if (!Array.isArray(p) || p.length!==3 || !p.every(Number.isFinite) || !canInspectAt(siteInspections[event.id],{x:p[0],y:p[1],z:p[2]})) throw new Error("INVALID_EVIDENCE_POSITION");
   command={type:"discover",id:event.id,position:[p[0],p[1],p[2]]};
  } else if (type === "answer") {
   if (typeof event.id !== "string" || !Number.isInteger(event.answer)) throw new Error("INVALID_ANSWER");
   command={type:"answer",id:event.id,answer:event.answer};
  } else if (["start","pause","resume","finish","cancel"].includes(type)) command={type} as MissionEvent;
  else if (type === "tick") command={type:"tick",deltaMs:0};
  else throw new Error("INVALID_COMMAND");
  const next=reduceMission(state,command);
  if(next===state && type!=="tick") throw new Error("ILLEGAL_TRANSITION");
  if(type==="tick" && state.phase!=="active") throw new Error("ILLEGAL_TRANSITION");
  state=next;
  log.push({atMs,event:type==="tick"?{type:"tick"} as MissionEvent:command});
 }
 const summary=missionSummary(state);
 const status=state.phase==="cancelled"?"cancelled":state.phase==="finished"?(summary.completed.length===6?"completed":"partial"):"in_progress";
 return { state, summary, status, log, eligibleXp:status==="completed"?summary.score*2:0 };
}
function canonical(value: unknown): string {
 if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
 if (value && typeof value === "object") return "{" + Object.entries(value).sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>JSON.stringify(k)+":"+canonical(v)).join(",") + "}";
 return JSON.stringify(value);
}
export function isLogExtension(previous: LoggedEvent[], next: LoggedEvent[]) {
 return next.length>=previous.length && previous.every((entry,i)=>canonical(entry)===canonical(next[i]));
}
