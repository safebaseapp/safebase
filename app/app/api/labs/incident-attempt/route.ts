import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: "AUTH_REQUIRED" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body.scenarioId !== "string" || !Array.isArray(body.decisions)) {
    return NextResponse.json({ ok: false, error: "INVALID_PAYLOAD" }, { status: 400 });
  }

  const score = Math.max(0, Math.min(100, Number(body.score) || 0));
  const criticalCount = Math.max(0, Number(body.criticalCount) || 0);
  const positiveCount = body.decisions.filter((item: { impactTotal?: number; critical?: boolean }) => !item.critical && Number(item.impactTotal || 0) >= 0).length;
  const incorrectCount = Math.max(0, body.decisions.length - positiveCount);

  const { data, error } = await supabase
    .from("lab_attempts")
    .insert({
      user_id: user.id,
      scenario_id: body.scenarioId,
      scenario_type: "incident_simulator",
      category: typeof body.category === "string" ? body.category : "Incident Simulator",
      difficulty: typeof body.difficulty === "string" ? body.difficulty : "basic",
      locale: body.locale === "tr" ? "tr" : "en",
      selected_answers: {
        decisions: body.decisions,
        scores: body.scores ?? null,
        criticalCount,
        outcome: body.outcome ?? null,
      },
      correct_count: positiveCount,
      missed_count: 0,
      incorrect_count: incorrectCount,
      score,
      xp_earned: 0,
      completed: true,
    })
    .select("id")
    .single();

  if (error) {
    console.error("incident attempt save failed", error);
    return NextResponse.json({ ok: false, error: "SAVE_FAILED" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: data.id });
}
