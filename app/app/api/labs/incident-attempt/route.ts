import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { incidentScenarios } from "@/lib/labs/scenarios/incident-scenarios";
import { localizeHseText } from "@/lib/labs/scenarios/hse-language";
import { getLevelState, getNextRank, getRank } from "@/lib/labs/progression";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ ok: false, error: "AUTH_REQUIRED" }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body.scenarioId !== "string" || !Array.isArray(body.decisions)) {
    return NextResponse.json({ ok: false, error: "INVALID_PAYLOAD" }, { status: 400 });
  }

  const scenario = incidentScenarios[body.scenarioId];
  if (!scenario || body.decisions.length === 0 || body.decisions.length > 100) {
    return NextResponse.json({ok:false,error:"INVALID_SCENARIO"},{status:400});
  }
  let expectedNode = scenario.start;
  let safety = 100, judgment = 100, response = 100, criticalCount = 0, positiveCount = 0;
  const verifiedDecisions: Array<{nodeId:string;nodeTitle:string;choiceId:string;choiceLabel:string;consequence:string;critical:boolean;impact:{safety:number;judgment:number;response:number};impactTotal:number}> = [];
  for (const item of body.decisions) {
    const node = scenario.nodes.find(n => n.id === expectedNode);
    const choice = node?.choices.find(c => c.id === item.choiceId);
    if (!node || !choice || item.nodeId !== node.id) return NextResponse.json({ok:false,error:"INVALID_DECISION_PATH"},{status:400});
    safety = Math.max(0, safety + Math.min(0,choice.impact.safety));
    judgment = Math.max(0, judgment + Math.min(0,choice.impact.judgment));
    response = Math.max(0, response + Math.min(0,choice.impact.response));
    if (choice.critical) criticalCount++;
    const impactTotal = choice.impact.safety + choice.impact.judgment + choice.impact.response;
    if (!choice.critical && impactTotal >= 0) positiveCount++;
    verifiedDecisions.push({nodeId:node.id,nodeTitle:localizeHseText(body.locale === "tr" ? "tr" : "en",node.titleTr,node.titleEn),choiceId:choice.id,choiceLabel:localizeHseText(body.locale === "tr" ? "tr" : "en",choice.labelTr,choice.labelEn),consequence:localizeHseText(body.locale === "tr" ? "tr" : "en",choice.consequenceTr,choice.consequenceEn),critical:Boolean(choice.critical),impact:choice.impact,impactTotal});
    expectedNode = choice.next ?? "";
  }
  const finalNode = scenario.nodes.find(n => n.id === expectedNode);
  if (!finalNode || finalNode.choices.length !== 0) return NextResponse.json({ok:false,error:"INCOMPLETE_SCENARIO"},{status:400});
  const score = Math.round((safety + judgment + response)/3);
  const incorrectCount = verifiedDecisions.length - positiveCount;
  const difficulty = scenario.difficulty;
  const { data, error } = await supabase.from("lab_attempts").insert({
    user_id: user.id,
    scenario_id: body.scenarioId,
    scenario_type: "incident_simulator",
    category: scenario.category,
    difficulty,
    locale: body.locale === "tr" ? "tr" : "en",
    selected_answers: { decisions: verifiedDecisions, scores: {safety,judgment,response}, criticalCount },
    correct_count: positiveCount,
    missed_count: 0,
    incorrect_count: incorrectCount,
    score,
    xp_earned: 0,
    completed: true,
  }).select("id,xp_earned").single();

  if (error) {
    console.error("incident attempt save failed", error);
    return NextResponse.json({ ok: false, error: "SAVE_FAILED" }, { status: 500 });
  }

  const { data: currentProgress, error: progressError } = await supabase.from("lab_user_progress").select("total_xp,current_streak,longest_streak,scenario_count").eq("user_id",user.id).maybeSingle();
  if (progressError || !currentProgress || !data) return NextResponse.json({ok:false,error:"PROGRESS_READ_FAILED"},{status:500});
  const awardedXp = Number(data.xp_earned ?? 0);
  const totalXp = Number(currentProgress.total_xp ?? 0);
  const levelState = getLevelState(totalXp);
  const rank = getRank(totalXp);
  const nextRank = getNextRank(totalXp);
  const currentStreak = Number(currentProgress.current_streak ?? 0);
  const longestStreak = Number(currentProgress.longest_streak ?? 0);
  const scenarioCount = Number(currentProgress.scenario_count ?? 0);
  const firstCompletion = awardedXp > 0;
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
