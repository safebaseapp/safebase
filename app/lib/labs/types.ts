export type LabScenarioType =
  | "spot_hazard"
  | "daily_brain"
  | "myth_buster"
  | "ppe_match"
  | "blind_spot"
  | "incident_simulator";

export type LabDifficulty = "easy" | "medium" | "hard" | "expert";

export type LabCategory =
  | "working_at_height"
  | "hot_work"
  | "confined_space"
  | "lifting"
  | "electrical"
  | "scaffolding"
  | "ppe"
  | "housekeeping"
  | "excavation"
  | "loto";

export type LabLocale = "tr" | "en";

export type LabOption = {
  id: string;
  label: string;
};

export type LabHazard = {
  id: string;
  label: string;
  explanation: string;
  severity?: "low" | "medium" | "high" | "critical";
};

export type LabHotspot = {
  id: string;
  x: number;
  y: number;
  radius: number;
};

export type LabScenario = {
  id: string;
  type: LabScenarioType;
  category: LabCategory;
  difficulty: LabDifficulty;
  language: LabLocale;
  title: string;
  scenario: string;
  image?: string;
  options?: LabOption[];
  correct_answer?: string | string[];
  hazards?: LabHazard[];
  hotspots?: LabHotspot[];
  explanation: string;
  xp: number;
  premium: boolean;
};

export type ScenarioScore = {
  correctCount: number;
  missedCount: number;
  incorrectCount: number;
  score: number;
  xpEarned: number;
  perfect: boolean;
};
