import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createLabsWriter } from "@/lib/labs/admin-writer";
import { dayId, dailyQuestions } from "@/lib/labs/daily-brain-bank";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ ok: false, error: "AUTH_REQUIRED" }, { status: 401 });
  const body = await request.json().catch(() => null);
  const today = dayId(new Date());
  if (!body || body.day !== today || !Array.isArray(body.answers) || body.answers.length !== 5 ||
      !body.answers.every((answer: unknown) => Number.isInteger(answer) && (answer as number) >= 0 && (answer as number) <= 2)) {
    return NextResponse.json({ ok: false, error: "INVALID_DAILY_ANSWERS" }, { status: 400 });
  }
  const questions = dailyQuestions(today);
  const correct = questions.filter((question, i) => question.correct === body.answers[i]).length;
  const writer = createLabsWriter();
  const { data, error } = await writer.from("lab_attempts").insert({
    user_id: user.id,
    scenario_id: "daily-brain",
    scenario_type: "daily_safety_brain",
    category: "daily-hse",
    difficulty: "basic",
    locale: body.locale === "tr" ? "tr" : "en",
    selected_answers: { day: today, questionIds: questions.map((q) => q.id), answers: body.answers },
    correct_count: correct,
    missed_count: 0,
    incorrect_count: 5 - correct,
    score: correct * 20,
    xp_earned: 0,
    completed: true,
  }).select("id,xp_earned").single();
  if (error || !data) {
    console.error("daily brain save failed", error);
    return NextResponse.json({ ok: false, error: "SAVE_FAILED" }, { status: 500 });
  }
  return NextResponse.json({
    ok: true,
    awardedXp: Number(data.xp_earned ?? 0),
    correct,
    alreadyAwardedToday: Number(data.xp_earned ?? 0) === 0,
  });
}
