export type LabDifficulty = "basic" | "intermediate" | "advanced" | "expert";

export type LabRank = { key: string; minXp: number; title: string };

export const LAB_RANKS: LabRank[] = [
  { key: "hse-explorer", minXp: 0, title: "HSE Explorer" },
  { key: "field-starter", minXp: 1000, title: "Field Starter" },
  { key: "safety-practitioner", minXp: 3000, title: "Safety Practitioner" },
  { key: "advanced-hse", minXp: 7500, title: "Advanced HSE" },
  { key: "hse-decision-specialist", minXp: 15000, title: "HSE Decision Specialist" },
  { key: "safety-expert", minXp: 30000, title: "Safety Expert" },
  { key: "hse-master", minXp: 50000, title: "HSE Master" },
  { key: "sernem-elite", minXp: 80000, title: "SERNEM Elite" },
];

const BASE_XP: Record<LabDifficulty, number> = { basic: 100, intermediate: 200, advanced: 300, expert: 500 };

export function normalizeLabDifficulty(value?: string | null): LabDifficulty {
  const input = String(value ?? "").toLowerCase();
  if (input === "expert" || input === "professional") return "expert";
  if (input === "advanced" || input === "hard") return "advanced";
  if (input === "intermediate" || input === "medium") return "intermediate";
  return "basic";
}

export function calculateXpAward(difficulty: string | null | undefined, score: number, firstCompletion: boolean) {
  const normalized = normalizeLabDifficulty(difficulty);
  const baseXp = BASE_XP[normalized];
  const scoreBonus = score >= 100 ? 150 : score >= 90 ? 75 : 0;
  const total = firstCompletion ? baseXp + scoreBonus : 0;
  return { difficulty: normalized, baseXp, scoreBonus: firstCompletion ? scoreBonus : 0, total };
}

export function getRank(totalXp: number) {
  const xp = Math.max(0, Math.floor(totalXp || 0));
  return [...LAB_RANKS].reverse().find((rank) => xp >= rank.minXp) ?? LAB_RANKS[0];
}

export function getNextRank(totalXp: number) {
  const current = getRank(totalXp);
  const index = LAB_RANKS.findIndex((rank) => rank.key === current.key);
  return LAB_RANKS[index + 1] ?? null;
}

function xpRequiredForNextLevel(level: number) { return 250 + Math.max(1, level) * 250; }

export function getLevelState(totalXp: number) {
  const xp = Math.max(0, Math.floor(totalXp || 0));
  let level = 1;
  let levelStartXp = 0;
  let nextLevelXp = xpRequiredForNextLevel(level);
  while (xp >= levelStartXp + nextLevelXp && level < 100) {
    levelStartXp += nextLevelXp;
    level += 1;
    nextLevelXp = xpRequiredForNextLevel(level);
  }
  const xpIntoLevel = xp - levelStartXp;
  return {
    level,
    levelStartXp,
    nextLevelXp,
    xpIntoLevel,
    remainingXp: Math.max(0, nextLevelXp - xpIntoLevel),
    progressPercent: Math.max(0, Math.min(100, Math.round((xpIntoLevel / nextLevelXp) * 100))),
  };
}

export function utcDateString(date = new Date()) { return date.toISOString().slice(0, 10); }

export function daysBetween(a: string, b: string) {
  const aMs = Date.parse(`${a}T00:00:00.000Z`);
  const bMs = Date.parse(`${b}T00:00:00.000Z`);
  return Math.round((bMs - aMs) / 86400000);
}

export function calculateStreak(lastActivityDate: string | null | undefined, currentStreak: number, today = utcDateString()) {
  if (!lastActivityDate) return 1;
  const delta = daysBetween(lastActivityDate, today);
  if (delta === 0) return Math.max(1, currentStreak || 1);
  if (delta === 1) return Math.max(1, currentStreak || 0) + 1;
  return 1;
}

export function getAchievementBadges(input: { totalXp: number; longestStreak: number; perfectCount?: number; expertCompleted?: number }) {
  const badges: { key: string; title: string; description: string }[] = [];
  if ((input.perfectCount ?? 0) >= 1) badges.push({ key: "perfect-chain", title: "Perfect Decision Chain", description: "Completed a Labs activity with a perfect score." });
  if ((input.expertCompleted ?? 0) >= 5) badges.push({ key: "expert-five", title: "Expert Decision Maker", description: "Completed five Expert Labs scenarios." });
  if ((input.longestStreak ?? 0) >= 7) badges.push({ key: "seven-day-streak", title: "7 Day Safety Streak", description: "Stayed active in SERNEM Labs for seven consecutive days." });
  if (input.totalXp >= 15000) badges.push({ key: "decision-specialist", title: "Decision Specialist", description: "Reached 15,000 Labs XP." });
  return badges;
}
