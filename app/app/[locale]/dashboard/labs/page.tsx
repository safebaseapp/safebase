import Link from "next/link";
import { hasLocale } from "next-intl";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, CircleAlert, LockKeyhole, TriangleAlert } from "lucide-react";
import { routing } from "../../../../i18n/routing";
import { createClient } from "@/utils/supabase/server";
import { incidentScenarios } from "@/lib/labs/scenarios/incident-scenarios";
import { localizeHseText } from "@/lib/labs/scenarios/hse-language";
import { getAchievementBadges, getLevelState, getNextRank, getRank, normalizeLabDifficulty } from "@/lib/labs/progression";

type Props = { params: Promise<{ locale: string }> };

type Decision = {
  step?: number;
  nodeId?: string;
  nodeTitle?: string;
  choiceId?: string;
  choiceLabel?: string;
  consequence?: string;
  critical?: boolean;
  impact?: { safety?: number; judgment?: number; response?: number };
};

type Attempt = {
  id: string;
  scenario_id: string;
  category: string;
  difficulty: string;
  score: number;
  xp_earned: number;
  incorrect_count: number;
  created_at: string;
  selected_answers: {
    decisions?: Decision[];
    scores?: { safety?: number; judgment?: number; response?: number };
    criticalCount?: number;
    outcome?: string;
  } | null;
};

function localizedScenarioTitle(id: string, locale: string) {
  const scenario = incidentScenarios[id];
  if (!scenario) return id.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  return localizeHseText(locale, scenario.titleTr, scenario.titleEn);
}

function localizedDecision(attempt: Attempt, decision: Decision, locale: string) {
  const scenario = incidentScenarios[attempt.scenario_id];
  const node = scenario?.nodes.find((item) => item.id === decision.nodeId);
  const choice = node?.choices.find((item) => item.id === decision.choiceId);
  return {
    nodeTitle: node ? localizeHseText(locale, node.titleTr, node.titleEn) : (decision.nodeTitle ?? ""),
    choiceLabel: choice ? localizeHseText(locale, choice.labelTr, choice.labelEn) : (decision.choiceLabel ?? ""),
    consequence: choice ? localizeHseText(locale, choice.consequenceTr, choice.consequenceEn) : (decision.consequence ?? ""),
    critical: Boolean(choice?.critical ?? decision.critical),
    impact: choice?.impact ?? decision.impact,
  };
}

export default async function LabsResultsPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const isTr = locale === "tr";
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/login?next=/${locale}/dashboard/labs`);

  const [{ data, error }, { data: progress }] = await Promise.all([
    supabase.from("lab_attempts").select("id,scenario_id,category,difficulty,score,xp_earned,incorrect_count,selected_answers,created_at").eq("user_id", user.id).eq("scenario_type", "incident_simulator").order("created_at", { ascending: false }).limit(20),
    supabase.from("lab_user_progress").select("total_xp,current_streak,longest_streak").eq("user_id", user.id).maybeSingle(),
  ]);

  if (error) console.error("labs results read failed", error);
  const attempts = (data ?? []) as Attempt[];
  const totalXp = Number(progress?.total_xp ?? 0);
  const levelState = getLevelState(totalXp);
  const rank = getRank(totalXp);
  const nextRank = getNextRank(totalXp);
  const perfectCount = attempts.filter((attempt) => attempt.score === 100).length;
  const expertCompleted = new Set(attempts.filter((attempt) => attempt.xp_earned > 0 && normalizeLabDifficulty(attempt.difficulty) === "expert").map((attempt) => attempt.scenario_id)).size;
  const badges = getAchievementBadges({ totalXp, longestStreak: Number(progress?.longest_streak ?? 0), perfectCount, expertCompleted });

  return (
    <main className="min-h-screen bg-[#06110f] px-5 py-10 text-slate-100 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link href={`/${locale}/dashboard`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white"><ArrowLeft size={16} />{isTr ? "Dashboard'a dön" : "Back to dashboard"}</Link>
          <Link href={`/${locale}/labs/incident-simulator`} className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/20 px-4 py-2 text-sm font-semibold text-emerald-200">Incident Simulator <ArrowRight size={15} /></Link>
        </div>

        <section className="mb-8">
          <p className="mb-3 text-xs font-bold tracking-[0.18em] text-emerald-300">SERNEM LABS / PERSONAL REVIEW</p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">{isTr ? "Kararlarını incele. İlerlemeni gör." : "Review your decisions. Track your progress."}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400">{isTr ? "Incident Simulator sonuçların, XP ilerlemen ve karar zincirin burada kişisel olarak saklanır." : "Your Incident Simulator results, XP progression and decision chain are stored privately here."}</p>
        </section>

        <section className="mb-8 rounded-3xl border border-emerald-300/15 bg-[linear-gradient(135deg,rgba(7,35,29,.96),rgba(8,20,35,.96))] p-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">{rank.title} · Level {levelState.level}</div>
              <div className="mt-2 text-4xl font-black text-white">{totalXp.toLocaleString(isTr ? "tr-TR" : "en-US")} XP</div>
              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-emerald-300" style={{ width: `${levelState.progressPercent}%` }} /></div>
              <div className="mt-2 flex flex-wrap justify-between gap-2 text-xs text-slate-400"><span>{levelState.remainingXp} XP {isTr ? "sonraki seviyeye" : "to next level"}</span><span>{nextRank ? `${Math.max(0, nextRank.minXp - totalXp)} XP → ${nextRank.title}` : "SERNEM Elite"}</span></div>
              {badges.length > 0 ? <div className="mt-4 flex flex-wrap gap-2">{badges.map((badge) => <span key={badge.key} title={badge.description} className="rounded-full border border-amber-300/20 bg-amber-300/[0.06] px-3 py-1.5 text-xs font-bold text-amber-200">🏅 {badge.title}</span>)}</div> : null}
            </div>
            <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-3">
              <ProgressStat value={Number(progress?.current_streak ?? 0)} label={isTr ? "Günlük Seri" : "Day Streak"} />
              <ProgressStat value={perfectCount} label={isTr ? "Kusursuz" : "Perfect"} />
              <ProgressStat value={expertCompleted} label="Expert" />
            </div>
          </div>
        </section>

        {error ? (
          <div className="rounded-3xl border border-amber-300/20 bg-amber-400/[0.05] p-8"><TriangleAlert className="mb-4 text-amber-300" /><h2 className="text-2xl font-semibold">{isTr ? "Labs sonuç depolaması şu anda hazır değil" : "Labs result storage is currently unavailable"}</h2></div>
        ) : attempts.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8"><LockKeyhole className="mb-4 text-emerald-300" /><h2 className="text-2xl font-semibold">{isTr ? "Henüz kayıtlı deneme yok" : "No saved attempts yet"}</h2></div>
        ) : (
          <div className="space-y-6">
            {attempts.map((attempt) => {
              const decisions = attempt.selected_answers?.decisions ?? [];
              const scores = attempt.selected_answers?.scores ?? {};
              const criticalCount = Number(attempt.selected_answers?.criticalCount ?? 0);
              const scenario = incidentScenarios[attempt.scenario_id];
              const displayedDifficulty = scenario?.difficulty === "expert" ? "EXPERT" : attempt.difficulty.toUpperCase();
              const category = scenario?.category ?? attempt.category;
              return (
                <article key={attempt.id} className="overflow-hidden rounded-3xl border border-white/10 bg-[#0a1916]">
                  <div className="grid gap-5 border-b border-white/10 p-6 md:grid-cols-[1fr_auto] md:items-center">
                    <div><div className="mb-2 flex flex-wrap gap-2 text-xs font-bold tracking-[0.12em] text-emerald-300"><span>{category}</span><span>·</span><span>{displayedDifficulty}</span></div><h2 className="text-2xl font-semibold">{localizedScenarioTitle(attempt.scenario_id, locale)}</h2><p className="mt-2 text-sm text-slate-400">{new Intl.DateTimeFormat(isTr ? "tr-TR" : "en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date(attempt.created_at))}</p></div>
                    <div className="flex gap-5 md:text-right"><div><b className="block text-3xl">{attempt.score}</b><span className="text-xs text-slate-500">{isTr ? "GENEL" : "OVERALL"}</span></div><div><b className="block text-3xl text-cyan-300">+{attempt.xp_earned}</b><span className="text-xs text-slate-500">XP</span></div><div><b className="block text-3xl">{criticalCount}</b><span className="text-xs text-slate-500">{isTr ? "KRİTİK" : "CRITICAL"}</span></div></div>
                  </div>
                  <div className="grid grid-cols-3 gap-px bg-white/10"><Metric label={isTr ? "Güvenlik" : "Safety"} value={scores.safety} /><Metric label={isTr ? "Muhakeme" : "Judgment"} value={scores.judgment} /><Metric label={isTr ? "Müdahale" : "Response"} value={scores.response} /></div>
                  <div className="p-6"><h3 className="mb-4 text-sm font-bold tracking-[0.12em] text-slate-300">{isTr ? "KARAR ZİNCİRİ" : "DECISION CHAIN"}</h3><div className="space-y-3">{decisions.map((decision, index) => { const localized = localizedDecision(attempt, decision, locale); return <div key={`${attempt.id}-${index}`} className={`rounded-2xl border p-4 ${localized.critical ? "border-red-400/25 bg-red-400/[0.05]" : "border-white/10 bg-white/[0.025]"}`}><div className="flex gap-3">{localized.critical ? <CircleAlert size={18} className="mt-0.5 shrink-0 text-red-300" /> : <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-300" />}<div className="min-w-0"><div className="text-xs font-bold tracking-[0.12em] text-slate-500">{String(decision.step ?? index + 1).padStart(2, "0")} · {localized.nodeTitle}</div><p className="mt-1 font-semibold text-slate-100">{localized.choiceLabel}</p>{localized.consequence ? <p className="mt-2 text-sm leading-6 text-slate-400">{localized.consequence}</p> : null}<div className="mt-3 flex flex-wrap gap-2 text-xs"><Impact label={isTr ? "Güvenlik" : "Safety"} value={localized.impact?.safety} /><Impact label={isTr ? "Muhakeme" : "Judgment"} value={localized.impact?.judgment} /><Impact label={isTr ? "Müdahale" : "Response"} value={localized.impact?.response} /></div></div></div></div>; })}</div></div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

function ProgressStat({ value, label }: { value: number; label: string }) { return <div className="min-w-[100px] rounded-2xl border border-white/10 bg-black/20 p-4"><b className="block text-2xl text-white">{value}</b><span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">{label}</span></div>; }
function Metric({ label, value }: { label: string; value?: number }) { return <div className="bg-[#0b1715] p-5 text-center"><b className="block text-2xl">{typeof value === "number" ? value : "—"}</b><span className="mt-1 block text-xs uppercase tracking-[0.12em] text-slate-500">{label}</span></div>; }
function Impact({ label, value }: { label: string; value?: number }) { const number = Number(value ?? 0); return <span className={`rounded-full border px-2.5 py-1 ${number >= 0 ? "border-emerald-300/20 text-emerald-200" : "border-red-300/20 text-red-200"}`}>{label} {number > 0 ? `+${number}` : number}</span>; }
