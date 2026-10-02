import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getSpotTheHazardScenario } from "@/lib/labs/scenarios/spot-the-hazard";
import { scoreMultiSelectScenario } from "@/lib/labs/scoring";
import { calculateStreak, calculateXpAward, getLevelState, getNextRank, getRank, utcDateString } from "@/lib/labs/progression";
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

  const { count: previousCount, error: previousError } = await supabase.from("lab_attempts").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("scenario_type", scenario.type).eq("scenario_id", scenario.id);
  if (previousError) return NextResponse.json({ error: "labs_schema_unavailable" }, { status: 503 });
  const firstCompletion = (previousCount ?? 0) === 0;
  const xp = calculateXpAward(scenario.difficulty, result.score, firstCompletion);

  const { error: attemptError } = await supabase.from("lab_attempts").insert({
    user_id: user.id, scenario_id: scenario.id, scenario_type: scenario.type, category: scenario.category, difficulty: scenario.difficulty, locale,
    selected_answers: selectedAnswers, correct_count: result.correctCount, missed_count: result.missedCount, incorrect_count: result.incorrectCount,
    score: result.score, xp_earned: xp.total, completed: true,
  });
  if (attemptError) return NextResponse.json({ error: "attempt_save_failed" }, { status: 500 });

  const { data: currentProgress } = await supabase.from("lab_user_progress").select("total_xp,current_streak,longest_streak,scenario_count,correct_count,last_activity_date").eq("user_id", user.id).maybeSingle();
  const today = utcDateString();
  const currentStreak = calculateStreak(currentProgress?.last_activity_date ?? null, currentProgress?.current_streak ?? 0, today);
  const totalXp = (currentProgress?.total_xp ?? 0) + xp.total;
  const scenarioCount = (currentProgress?.scenario_count ?? 0) + 1;
  const correctCount = (currentProgress?.correct_count ?? 0) + result.correctCount;
  const longestStreak = Math.max(currentProgress?.longest_streak ?? 0, currentStreak);
  const levelState = getLevelState(totalXp);
  const rank = getRank(totalXp);
  const nextRank = getNextRank(totalXp);

  const { error: progressError } = await supabase.from("lab_user_progress").upsert({
    user_id: user.id, total_xp: totalXp, level: levelState.level, current_streak: currentStreak, longest_streak: longestStreak,
    scenario_count: scenarioCount, correct_count: correctCount, last_activity_date: today, updated_at: new Date().toISOString(),
  });
  if (progressError) return NextResponse.json({ error: "progress_save_failed" }, { status: 500 });

  return NextResponse.json({
    saved: true, authenticated: true, firstCompletion, awardedXp: xp.total, xpBreakdown: { base: xp.baseXp, scoreBonus: xp.scoreBonus },
    result: { ...result, xpEarned: xp.total },
    progress: { totalXp, level: levelState.level, levelProgress: levelState.progressPercent, xpToNextLevel: levelState.remainingXp, rank, nextRank, currentStreak, longestStreak, scenarioCount },
  });
}
