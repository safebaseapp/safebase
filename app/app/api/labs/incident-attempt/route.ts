import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getLevelState, getNextRank, getRank } from "@/lib/labs/progression";

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
    xp_earned: 0,
    completed: true,
  }).select("id").single();

  if (error) {
    console.error("incident attempt save failed", error);
    return NextResponse.json({ ok: false, error: "SAVE_FAILED" }, { status: 500 });
  }

  const { data: latest, error: latestError } = await supabase.from("lab_attempts").select("id,xp_earned").eq("user_id",user.id).eq("scenario_type","incident_simulator").eq("scenario_id",body.scenarioId).order("created_at",{ascending:false}).limit(1).maybeSingle();
  const { data: currentProgress, error: progressError } = await supabase.from("lab_user_progress").select("total_xp,current_streak,longest_streak,scenario_count").eq("user_id",user.id).maybeSingle();
  if (latestError || progressError || !currentProgress || !latest) return NextResponse.json({ok:false,error:"PROGRESS_READ_FAILED"},{status:500});
  const awardedXp = Number(latest.xp_earned ?? 0);
  const totalXp = Number(currentProgress.total_xp ?? 0);
  const levelState = getLevelState(totalXp);
  const rank = getRank(totalXp);
  const nextRank = getNextRank(totalXp);
  const currentStreak = Number(currentProgress.current_streak ?? 0);
  const longestStreak = Number(currentProgress.longest_streak ?? 0);
  const scenarioCount = Number(currentProgress.scenario_count ?? 0);
  const firstCompletion = awardedXp > 0;
  return NextResponse.json({ ok: false, error: "PROGRESS_SAVE_FAILED" }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    id: data.id,
    firstCompletion,
    awardedXp,
    xpBreakdown: { base: 0, scoreBonus: 0 },
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
