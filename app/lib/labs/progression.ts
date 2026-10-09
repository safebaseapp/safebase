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

export type BadgeStats = {
 totalXp: number; longestStreak: number; perfectCount?: number; expertCompleted?: number;
 uniqueCompleted?: number; earnedAttempts?: number;
};
export type BadgeDefinition = {key:string; title:string; titleTr:string; description:string; descriptionTr:string; icon:string; target:number; metric:keyof BadgeStats; group:string };
export const LAB_BADGES: BadgeDefinition[] = [
 {key:"first-lab",title:"First Steps",titleTr:"İlk Adım",description:"Complete your first XP-earning Lab.",descriptionTr:"İlk XP kazandıran Labs etkinliğini tamamla.",icon:"🎯",target:1,metric:"earnedAttempts",group:"participation"},
 {key:"five-labs",title:"Field Explorer",titleTr:"Saha Kaşifi",description:"Complete 5 different XP-earning scenarios.",descriptionTr:"XP kazandıran 5 farklı senaryo tamamla.",icon:"🧭",target:5,metric:"uniqueCompleted",group:"participation"},
 {key:"twenty-five-labs",title:"Safety Pathfinder",titleTr:"Güvenlik Öncüsü",description:"Complete 25 different XP-earning scenarios.",descriptionTr:"25 farklı senaryoyu XP kazanarak tamamla.",icon:"🛡️",target:25,metric:"uniqueCompleted",group:"participation"},
 {key:"hundred-labs",title:"Scenario Veteran",titleTr:"Senaryo Ustası",description:"Complete 100 different XP-earning scenarios.",descriptionTr:"100 farklı senaryoyu XP kazanarak tamamla.",icon:"🏅",target:100,metric:"uniqueCompleted",group:"participation"},
 {key:"perfect-chain",title:"Perfect Decision Chain",titleTr:"Kusursuz Karar Zinciri",description:"Earn a perfect score once.",descriptionTr:"Bir senaryoda 100 puana ulaş.",icon:"💎",target:1,metric:"perfectCount",group:"performance"},
 {key:"three-perfect",title:"Precision Thinker",titleTr:"Hatasız Düşünür",description:"Earn 3 perfect scores.",descriptionTr:"Üç kez 100 puan kazan.",icon:"✨",target:3,metric:"perfectCount",group:"performance"},
 {key:"ten-perfect",title:"Flawless Specialist",titleTr:"Kusursuz Uzman",description:"Earn 10 perfect scores.",descriptionTr:"On kez 100 puan kazan.",icon:"👑",target:10,metric:"perfectCount",group:"performance"},
 {key:"expert-five",title:"Expert Decision Maker",titleTr:"Uzman Karar Verici",description:"Complete 5 different Expert scenarios for XP.",descriptionTr:"XP kazandıran 5 farklı Expert senaryosu tamamla.",icon:"🧠",target:5,metric:"expertCompleted",group:"expertise"},
 {key:"expert-twenty",title:"Expert Veteran",titleTr:"Uzmanlık Ustası",description:"Complete 20 different Expert scenarios for XP.",descriptionTr:"XP kazandıran 20 farklı Expert senaryosu tamamla.",icon:"⚙️",target:20,metric:"expertCompleted",group:"expertise"},
 {key:"three-day-streak",title:"3 Day Safety Streak",titleTr:"3 Günlük Güvenlik Serisi",description:"Stay active for 3 consecutive UTC days.",descriptionTr:"Arka arkaya 3 UTC günü etkinlik tamamla.",icon:"🔥",target:3,metric:"longestStreak",group:"consistency"},
 {key:"seven-day-streak",title:"7 Day Safety Streak",titleTr:"7 Günlük Güvenlik Serisi",description:"Stay active for 7 consecutive UTC days.",descriptionTr:"Arka arkaya 7 UTC günü etkinlik tamamla.",icon:"⚡",target:7,metric:"longestStreak",group:"consistency"},
 {key:"thirty-day-streak",title:"30 Day Safety Streak",titleTr:"30 Günlük Güvenlik Serisi",description:"Stay active for 30 consecutive UTC days.",descriptionTr:"Arka arkaya 30 UTC günü etkinlik tamamla.",icon:"🏆",target:30,metric:"longestStreak",group:"consistency"},
 {key:"xp-thousand",title:"Field Starter",titleTr:"Saha Başlangıç",description:"Reach 1,000 lifetime XP.",descriptionTr:"Toplam 1.000 XP'ye ulaş.",icon:"🌱",target:1000,metric:"totalXp",group:"mastery"},
 {key:"decision-specialist",title:"Decision Specialist",titleTr:"Karar Uzmanı",description:"Reach 15,000 lifetime XP.",descriptionTr:"Toplam 15.000 XP'ye ulaş.",icon:"🎖️",target:15000,metric:"totalXp",group:"mastery"},
 {key:"sernem-elite-badge",title:"SERNEM Elite",titleTr:"SERNEM Elit",description:"Reach 80,000 lifetime XP.",descriptionTr:"Toplam 80.000 XP'ye ulaş.",icon:"🌟",target:80000,metric:"totalXp",group:"mastery"},
];
export function getBadgeProgress(input:BadgeStats){
 return LAB_BADGES.map(b=>{const value=Math.max(0,Number(input[b.metric]??0));return {...b,current:value,earned:value>=b.target,remaining:Math.max(0,b.target-value),percent:Math.min(100,Math.round(value/b.target*100))};});
}
export function getAchievementBadges(input:BadgeStats){
 return getBadgeProgress(input).filter(b=>b.earned).map(b=>({key:b.key,title:b.title,description:b.description}));
}
