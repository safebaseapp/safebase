import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getSpotTheHazardScenario } from "@/lib/labs/scenarios/spot-the-hazard";
import { scoreMultiSelectScenario } from "@/lib/labs/scoring";
import type { LabLocale } from "@/lib/labs/types";

type AttemptBody = {
  scenarioId?: string;
  locale?: LabLocale;
  selectedAnswers?: string[];
};

function utcDateString(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string) {
  const aMs = Date.parse(`${a}T00:00:00.000Z`);
  const bMs = Date.parse(`${b}T00:00:00.000Z`);
  return Math.round((bMs - aMs) / 86400000);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as AttemptBody | null;
  const scenarioId = body?.scenarioId?.trim();
  const locale = body?.locale === "tr" ? "tr" : body?.locale === "en" ? "en" : null;
  const selectedAnswers = Array.isArray(body?.selectedAnswers)
    ? body!.selectedAnswers.filter((value): value is string => typeof value === "string")
    : [];

  if (!scenarioId || !locale || selectedAnswers.length === 0) {
    return NextResponse.json({ error: "invalid_attempt" }, { status: 400 });
  }

  const scenario = getSpotTheHazardScenario(scenarioId, locale);
  if (!scenario) {
    return NextResponse.json({ error: "scenario_not_found" }, { status: 404 });
  }

  const validOptionIds = new Set((scenario.options ?? []).map((option) => option.id));
  if (selectedAnswers.some((id) => !validOptionIds.has(id))) {
    return NextResponse.json({ error: "invalid_answer" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({
      saved: false,
      authenticated: false,
      result: scoreMultiSelectScenario(scenario, selectedAnswers),
    });
  }

  const result = scoreMultiSelectScenario(scenario, selectedAnswers);

  const { count: previousCount, error: previousError } = await supabase
    .from("lab_attempts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("scenario_id", scenario.id);

  if (previousError) {
    return NextResponse.json({ error: "labs_schema_unavailable" }, { status: 503 });
  }

  const firstCompletion = (previousCount ?? 0) === 0;
  const awardedXp = firstCompletion ? result.xpEarned : 0;

  const { error: attemptError } = await supabase.from("lab_attempts").insert({
    user_id: user.id,
    scenario_id: scenario.id,
    scenario_type: scenario.type,
    category: scenario.category,
    difficulty: scenario.difficulty,
    locale,
    selected_answers: selectedAnswers,
    correct_count: result.correctCount,
    missed_count: result.missedCount,
    incorrect_count: result.incorrectCount,
    score: result.score,
    xp_earned: awardedXp,
    completed: true,
  });

  if (attemptError) {
    return NextResponse.json({ error: "attempt_save_failed" }, { status: 500 });
  }

  const { data: currentProgress } = await supabase
    .from("lab_user_progress")
    .select("total_xp,level,current_streak,longest_streak,scenario_count,correct_count,last_activity_date")
    .eq("user_id", user.id)
    .maybeSingle();

  const today = utcDateString();
  const lastActivity = currentProgress?.last_activity_date ?? null;
  let currentStreak = currentProgress?.current_streak ?? 0;

  if (!lastActivity) {
    currentStreak = 1;
  } else {
    const delta = daysBetween(lastActivity, today);
    if (delta === 1) currentStreak += 1;
    else if (delta > 1) currentStreak = 1;
  }

  const totalXp = (currentProgress?.total_xp ?? 0) + awardedXp;
  const scenarioCount = (currentProgress?.scenario_count ?? 0) + 1;
  const correctCount = (currentProgress?.correct_count ?? 0) + result.correctCount;
  const longestStreak = Math.max(currentProgress?.longest_streak ?? 0, currentStreak);
  const level = Math.max(1, Math.floor(totalXp / 100) + 1);

  const { error: progressError } = await supabase.from("lab_user_progress").upsert({
    user_id: user.id,
    total_xp: totalXp,
    level,
    current_streak: currentStreak,
    longest_streak: longestStreak,
    scenario_count: scenarioCount,
    correct_count: correctCount,
    last_activity_date: today,
    updated_at: new Date().toISOString(),
  });

  if (progressError) {
    return NextResponse.json({ error: "progress_save_failed" }, { status: 500 });
  }

  return NextResponse.json({
    saved: true,
    authenticated: true,
    firstCompletion,
    awardedXp,
    result: { ...result, xpEarned: awardedXp },
    progress: {
      totalXp,
      level,
      currentStreak,
      longestStreak,
      scenarioCount,
    },
  });
}
