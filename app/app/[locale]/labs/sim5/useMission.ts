"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { useMissionPersistence } from "./useMissionPersistence";
import { createMission, reduceMission, type MissionMode, type MissionEvent } from "./MissionState";

/** One local attempt; optional full-mode recorder sends legal events to the server.
 * Guest DEMO never enables persistence. */
export function useMission(mode: MissionMode = "full", persist = false, tr = false) {
 const persistence = useMissionPersistence(persist && mode === "full", tr);
 const record = persistence.record;
 const [mission, setMission] = useState(() => createMission(mode));
 const missionRef = useRef(mission);
 const last = useRef<number | null>(null);
 const send = useCallback((event: MissionEvent) => {
  const now = performance.now(), previous = missionRef.current;
  let next = previous;
  if (previous.phase === "active" && last.current !== null) next = reduceMission(next, { type: "tick", deltaMs: Math.max(0, now - last.current) });
  last.current = now;
  if (event.type === "resume" && document.hidden) return;
  const beforeEvent = next;
  next = reduceMission(next, event);
  if ((event.type === "tick" && beforeEvent.phase === "active") || next !== beforeEvent) {
   record(event);
   if(event.type==="start")trackEvent(mode==="demo"?"sim5_demo_start":"sim5_full_mission_start",{mode,locale:tr?"tr":"en"});
   if(event.type==="finish")trackEvent(mode==="demo"?"sim5_demo_complete":"sim5_full_mission_complete",{mode,locale:tr?"tr":"en",completed_count:Object.values(next.findings).filter(f=>f.completed).length});
  }
  missionRef.current = next;
  if (next !== previous) setMission(next);
 }, [record,mode,tr]);
 useEffect(() => {
  last.current = performance.now();
  const timer = window.setInterval(() => send({ type: "tick", deltaMs: 0 }), 1000);
  const pause = () => send({ type: "pause" });
  const visibility = () => { if (document.hidden) pause(); };
  window.addEventListener("blur", pause);
  document.addEventListener("visibilitychange", visibility);
  return () => { window.clearInterval(timer); window.removeEventListener("blur", pause); document.removeEventListener("visibilitychange", visibility); };
 }, [send]);
 return { mission, missionRef, send, persistence };
}
