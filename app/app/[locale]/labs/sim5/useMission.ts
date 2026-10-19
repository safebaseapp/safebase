"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createMission, reduceMission, type MissionEvent } from "./MissionState";

/** One in-memory attempt. No storage, Labs API, Supabase or profile XP writes. */
export function useMission() {
 const [mission, setMission] = useState(createMission);
 const missionRef = useRef(mission);
 const last = useRef<number | null>(null);
 const send = useCallback((event: MissionEvent) => {
  const now = performance.now(), previous = missionRef.current;
  let next = previous;
  if (previous.phase === "active" && last.current !== null) next = reduceMission(next, { type: "tick", deltaMs: Math.max(0, now - last.current) });
  last.current = now;
  if (event.type === "resume" && document.hidden) return;
  next = reduceMission(next, event);
  missionRef.current = next;
  if (next !== previous) setMission(next);
 }, []);
 useEffect(() => {
  last.current = performance.now();
  const timer = window.setInterval(() => send({ type: "tick", deltaMs: 0 }), 1000);
  const pause = () => send({ type: "pause" });
  const visibility = () => { if (document.hidden) pause(); };
  window.addEventListener("blur", pause);
  document.addEventListener("visibilitychange", visibility);
  return () => { window.clearInterval(timer); window.removeEventListener("blur", pause); document.removeEventListener("visibilitychange", visibility); };
 }, [send]);
 return { mission, missionRef, send };
}
