import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: "AUTH_REQUIRED" }, { status: 401 });
  }

  const { data, error, count } = await supabase
    .from("lab_attempts")
    .select("id,scenario_id,category,difficulty,score,incorrect_count,selected_answers,created_at", { count: "exact" })
    .eq("user_id", user.id)
    .eq("scenario_type", "incident_simulator")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    console.error("incident summary read failed", error);
    return NextResponse.json({ ok: false, error: "LAB_RESULTS_UNAVAILABLE" }, { status: 500 });
  }

  const latest = data?.[0] ?? null;
  return NextResponse.json({
    ok: true,
    count: count ?? 0,
    latest: latest ? {
      id: latest.id,
      scenarioId: latest.scenario_id,
      category: latest.category,
      difficulty: latest.difficulty,
      score: latest.score,
      incorrectCount: latest.incorrect_count,
      criticalCount: Number((latest.selected_answers as { criticalCount?: number } | null)?.criticalCount ?? 0),
      createdAt: latest.created_at,
    } : null,
  });
}
