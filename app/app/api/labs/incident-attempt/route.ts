import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { calculateStreak, calculateXpAward, getLevelState, getNextRank, getRank, utcDateString } from "@/lib/labs/progression";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ ok: false, error: "AUTH_REQUIRED" }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body.scenarioId !== "string" || !Array.isArray(body.decisions)) {
    return NextResponse.json({ ok: false, error: "INVALID_PAYLOAD" }, { status: 400 });
  }

  const score = Math.max(0, Math.min(100, Number(body.score) || 0));
  const criticalCount = Math.max(0, Number(body.criticalCount) || 0);
  const positiveCount = body.decisions.filter((item: { impactTotal?: number; critical?: boolean }) => !item.critical && Number(item.impactTotal || 0) >= 0).length;
  const incorrectCount = Math.max(0, body.decisions.length - positiveCount);
  const difficulty = typeof body.difficulty === "string" ? body.difficulty : "basic";

  const { count: previousCount, error: previousError } = await supabase.from("lab_attempts").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("scenario_id", body.scenarioId);
  if (previousError) return NextResponse.json({ ok: false, error: "LABS_SCHEMA_UNAVAILABLE" }, { status: 503 });
  const firstCompletion = (previousCount ?? 0) === 0;
  const xp = calculateXpAward(difficulty, score, firstCompletion);

  const { data, error } = await supabase.from("lab_attempts").insert({
    user_id: user.id,
    scenario_id: body.scenarioId,
    scenario_type: "incident_simulator",
    category: typeof body.category === "string" ? body.category : "Incident Simulator",
    difficulty,
    locale: body.locale === "tr" ? "tr" : "en",
    selected_answers: { decisions: body.decisions, scores: body.scores ?? null, criticalCount, outcome: body.outcome ?? null },
    correct_count: positiveCount,
    missed_count: 0,
    incorrect_count: incorrectCount,
    score,
    xp_earned: xp.total,
    completed: true,
  }).select("id").single();

  if (error) {
    console.error("incident attempt save failed", error);
    return NextResponse.json({ ok: false, error: "SAVE_FAILED" }, { status: 500 });
  }

  const { data: currentProgress } = await supabase.from("lab_user_progress").select("total_xp,current_streak,longest_streak,scenario_count,correct_count,last_activity_date").eq("user_id", user.id).maybeSingle();
  const today = utcDateString();
  const currentStreak = calculateStreak(currentProgress?.last_activity_date ?? null, currentProgress?.current_streak ?? 0, today);
  const totalXp = (currentProgress?.total_xp ?? 0) + xp.total;
  const scenarioCount = (currentProgress?.scenario_count ?? 0) + 1;
  const correctCount = (currentProgress?.correct_count ?? 0) + positiveCount;
  const longestStreak = Math.max(currentProgress?.longest_streak ?? 0, currentStreak);
  const levelState = getLevelState(totalXp);
  const rank = getRank(totalXp);
  const nextRank = getNextRank(totalXp);

  const { error: progressError } = await supabase.from("lab_user_progress").upsert({
    user_id: user.id,
    total_xp: totalXp,
    level: levelState.level,
    current_streak: currentStreak,
    longest_streak: longestStreak,
    scenario_count: scenarioCount,
    correct_count: correctCount,
    last_activity_date: today,
    updated_at: new Date().toISOString(),
  });
  if (progressError) {
    console.error("incident progress save failed", progressError);
    return NextResponse.json({ ok: false, error: "PROGRESS_SAVE_FAILED" }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    id: data.id,
    firstCompletion,
    awardedXp: xp.total,
    xpBreakdown: { base: xp.baseXp, scoreBonus: xp.scoreBonus },
    progress: {
      totalXp,
      level: levelState.level,
      levelProgress: levelState.progressPercent,
      xpToNextLevel: levelState.remainingXp,
      rank,
      nextRank,
      currentStreak,
      longestStreak,
      scenarioCount,
    },
  });
}
