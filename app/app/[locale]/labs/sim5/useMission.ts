"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMissionPersistence } from "./useMissionPersistence";
import { createMission, reduceMission, type MissionMode, type MissionEvent } from "./MissionState";

/** One in-memory attempt. No storage, Labs API, Supabase or profile XP writes. */
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
  if ((event.type === "tick" && beforeEvent.phase === "active") || next !== beforeEvent) record(event);
  missionRef.current = next;
  if (next !== previous) setMission(next);
 }, [record]);
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
