import { siteInspections } from "./SiteInspections";

export type MissionPhase = "briefing" | "active" | "paused" | "finished" | "cancelled";
export type Attempt = { answer: number; correct: boolean; activeMs: number };
export type FindingProgress = { discovered: boolean; completed: boolean; attempts: Attempt[] };
export type MissionState = { phase: MissionPhase; activeMs: number; findings: Record<string, FindingProgress> };
export type MissionEvent =
 | { type: "start" | "pause" | "resume" | "finish" | "cancel" | "restart" }
 | { type: "tick"; deltaMs: number }
 | { type: "discover"; id: string }
 | { type: "answer"; id: string; answer: number };

// Relative training priorities, not a certified quantitative risk assessment.
// Sum=100. Discovery earns 20%; a safe control earns 80%. A wrong first
// decision deducts 20% of that finding's weight once, including after correction.
export const missionWeights: Record<string, number> = {
 hotwork: 25, lifting: 25, leak: 20, droppedTool: 15, access: 10, materials: 5,
};
export function createMission(): MissionState {
 return { phase: "briefing", activeMs: 0, findings: Object.fromEntries(Object.keys(siteInspections).map(id => [id, { discovered: false, completed: false, attempts: [] }])) };
}
export function reduceMission(state: MissionState, event: MissionEvent): MissionState {
 if (event.type === "restart") return createMission();
 if (event.type === "start") return state.phase === "briefing" ? { ...state, phase: "active" } : state;
 if (event.type === "pause") return state.phase === "active" ? { ...state, phase: "paused" } : state;
 if (event.type === "resume") return state.phase === "paused" ? { ...state, phase: "active" } : state;
 if (event.type === "finish" || event.type === "cancel") return state.phase === "active" || state.phase === "paused" ? { ...state, phase: event.type === "finish" ? "finished" : "cancelled" } : state;
 if (state.phase !== "active") return state;
 if (event.type === "tick") return Number.isFinite(event.deltaMs) && event.deltaMs > 0 ? { ...state, activeMs: state.activeMs + event.deltaMs } : state;
 if (!("id" in event) || !Object.hasOwn(state.findings, event.id)) return state;
 const finding = state.findings[event.id];
 if (event.type === "discover") {
  if (finding.discovered) return state;
  return { ...state, findings: { ...state.findings, [event.id]: { ...finding, discovered: true } } };
 }
 if (event.type !== "answer" || !finding.discovered || finding.completed || !Number.isInteger(event.answer) || event.answer < 0 || event.answer >= siteInspections[event.id].answers.length) return state;
 const correct = event.answer === siteInspections[event.id].correct;
 return { ...state, findings: { ...state.findings, [event.id]: { ...finding, completed: correct, attempts: [...finding.attempts, { answer: event.answer, correct, activeMs: state.activeMs }] } } };
}
export function findingScore(id: string, finding: FindingProgress) {
 const weight = missionWeights[id] || 0;
 return Math.max(0, (finding.discovered ? weight * .2 : 0) + (finding.completed ? weight * .8 : 0) - (finding.attempts[0]?.correct === false ? weight * .2 : 0));
}
export function missionSummary(state: MissionState) {
 const entries = Object.entries(state.findings);
 const score = Math.round(entries.reduce((sum, [id, finding]) => sum + findingScore(id, finding), 0));
 return {
  schema: "sim5-mission/1" as const, phase: state.phase, activeMs: state.activeMs,
  score, localXp: score * 2,
  found: entries.filter(([, f]) => f.discovered).map(([id]) => id),
  missed: entries.filter(([, f]) => !f.discovered).map(([id]) => id),
  completed: entries.filter(([, f]) => f.completed).map(([id]) => id),
  firstWrong: entries.filter(([, f]) => f.attempts[0]?.correct === false).map(([id]) => id),
  wrongDecisions: entries.reduce((sum, [, f]) => sum + f.attempts.filter(a => !a.correct).length, 0),
  findings: state.findings,
 };
}
