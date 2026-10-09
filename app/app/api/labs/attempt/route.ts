import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getSpotTheHazardScenario } from "@/lib/labs/scenarios/spot-the-hazard";
import { scoreMultiSelectScenario } from "@/lib/labs/scoring";
import { getLevelState, getNextRank, getRank } from "@/lib/labs/progression";
import type { LabLocale } from "@/lib/labs/types";

type AttemptBody = { scenarioId?: string; locale?: LabLocale; selectedAnswers?: string[] };

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as AttemptBody | null;
  const scenarioId = body?.scenarioId?.trim();
  const locale = body?.locale === "tr" ? "tr" : body?.locale === "en" ? "en" : null;
  const selectedAnswers = Array.isArray(body?.selectedAnswers) ? body!.selectedAnswers.filter((v): v is string => typeof v === "string") : [];
  if (!scenarioId || !locale || selectedAnswers.length === 0) return NextResponse.json({ error: "invalid_attempt" }, { status: 400 });

  const scenario = getSpotTheHazardScenario(scenarioId, locale);
  if (!scenario) return NextResponse.json({ error: "scenario_not_found" }, { status: 404 });
  const validOptionIds = new Set((scenario.options ?? []).map((option) => option.id));
  if (selectedAnswers.some((id) => !validOptionIds.has(id))) return NextResponse.json({ error: "invalid_answer" }, { status: 400 });

  const result = scoreMultiSelectScenario(scenario, selectedAnswers);
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ saved: false, authenticated: false, result: { ...result, xpEarned: 0 } });

  const { data: attempt, error: attemptError } = await supabase.from("lab_attempts").insert({
    user_id: user.id, scenario_id: scenario.id, scenario_type: scenario.type, category: scenario.category, difficulty: scenario.difficulty, locale,
    selected_answers: selectedAnswers, correct_count: result.correctCount, missed_count: result.missedCount, incorrect_count: result.incorrectCount,
    score: result.score, xp_earned: 0, completed: true,
  }).select("id,xp_earned").single();
  if (attemptError) return NextResponse.json({ error: "attempt_save_failed" }, { status: 500 });

  const { data: currentProgress, error: progressError } = await supabase.from("lab_user_progress").select("total_xp,current_streak,longest_streak,scenario_count").eq("user_id",user.id).maybeSingle();
  if (progressError || !currentProgress || !attempt) return NextResponse.json({ok:false,error:"PROGRESS_READ_FAILED"},{status:500});
  const awardedXp = Number(attempt.xp_earned ?? 0);
  const totalXp = Number(currentProgress.total_xp ?? 0);
  const levelState = getLevelState(totalXp);
  const rank = getRank(totalXp);
  const nextRank = getNextRank(totalXp);
  const currentStreak = Number(currentProgress.current_streak ?? 0);
  const longestStreak = Number(currentProgress.longest_streak ?? 0);
  const scenarioCount = Number(currentProgress.scenario_count ?? 0);
  const firstCompletion = awardedXp > 0;
  return NextResponse.json({
    saved: true, authenticated: true, firstCompletion, awardedXp, xpBreakdown: { base: 0, scoreBonus: 0 },
    result: { ...result, xpEarned: awardedXp },
    progress: { totalXp, level: levelState.level, levelProgress: levelState.progressPercent, xpToNextLevel: levelState.remainingXp, rank, nextRank, currentStreak, longestStreak, scenarioCount },
  });
}
