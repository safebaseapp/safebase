import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getAchievementBadges, getLevelState, getNextRank, getRank, normalizeLabDifficulty } from "@/lib/labs/progression";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ ok: false, error: "AUTH_REQUIRED" }, { status: 401 });

  const [{ data: progress, error: progressError }, { data: attempts, error: attemptsError }] = await Promise.all([
    supabase.from("lab_user_progress").select("total_xp,level,current_streak,longest_streak,scenario_count,correct_count,last_activity_date").eq("user_id", user.id).maybeSingle(),
    supabase.from("lab_attempts").select("scenario_id,difficulty,score,xp_earned,completed").eq("user_id", user.id).eq("completed", true),
  ]);

  if (progressError || attemptsError) {
    console.error("labs progress read failed", progressError ?? attemptsError);
    return NextResponse.json({ ok: false, error: "LABS_PROGRESS_UNAVAILABLE" }, { status: 500 });
  }

  const { data: ranking, error: rankingError } = await supabase.rpc("get_labs_my_ranking").maybeSingle();
  if (rankingError) console.error("labs rank read failed", rankingError);

  const totalXp = Number(progress?.total_xp ?? 0);
  const levelState = getLevelState(totalXp);
  const rank = getRank(totalXp);
  const nextRank = getNextRank(totalXp);
  const allAttempts = attempts ?? [];
  const perfectCount = allAttempts.filter((item) => Number(item.score) === 100).length;
  const expertCompleted = new Set(
    allAttempts
      .filter((item) => Number(item.xp_earned ?? 0) > 0 && normalizeLabDifficulty(item.difficulty) === "expert")
      .map((item) => item.scenario_id),
  ).size;
  const uniqueCompleted = new Set(allAttempts.filter((item) => Number(item.xp_earned ?? 0) > 0).map((item) => item.scenario_id)).size;
  const badges = getAchievementBadges({ totalXp, longestStreak: Number(progress?.longest_streak ?? 0), perfectCount, expertCompleted });

  return NextResponse.json({
    ok: true,
    totalXp,
    globalRank: rankingError ? null : (ranking?.global_rank ?? null),
    monthlyRank: rankingError ? null : (ranking?.monthly_rank ?? null),
    monthlyXp: rankingError ? null : Number(ranking?.monthly_xp ?? 0),
    globalParticipants: rankingError ? null : Number(ranking?.global_participants ?? 0),
    monthlyParticipants: rankingError ? null : Number(ranking?.monthly_participants ?? 0),
    level: levelState.level,
    levelProgress: levelState.progressPercent,
    xpIntoLevel: levelState.xpIntoLevel,
    xpForLevel: levelState.nextLevelXp,
    xpToNextLevel: levelState.remainingXp,
    rank,
    nextRank,
    xpToNextRank: nextRank ? Math.max(0, nextRank.minXp - totalXp) : 0,
    currentStreak: Number(progress?.current_streak ?? 0),
    longestStreak: Number(progress?.longest_streak ?? 0),
    attempts: allAttempts.length,
    uniqueCompleted,
    perfectCount,
    expertCompleted,
    badges,
  });
}
