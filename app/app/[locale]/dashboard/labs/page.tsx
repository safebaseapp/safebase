import Link from "next/link";
import { hasLocale } from "next-intl";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, CircleAlert, LockKeyhole, TriangleAlert } from "lucide-react";
import { routing } from "../../../../i18n/routing";
import { createClient } from "@/utils/supabase/server";
import { incidentScenarios } from "@/lib/labs/scenarios/incident-scenarios";
import { localizeHseText } from "@/lib/labs/scenarios/hse-language";

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
  const isTr = locale === "tr";

  return {
    nodeTitle: node ? localizeHseText(locale, node.titleTr, node.titleEn) : (decision.nodeTitle ?? ""),
    choiceLabel: choice ? localizeHseText(locale, choice.labelTr, choice.labelEn) : (decision.choiceLabel ?? ""),
    consequence: choice ? localizeHseText(locale, choice.consequenceTr, choice.consequenceEn) : (decision.consequence ?? ""),
    critical: Boolean(choice?.critical ?? decision.critical),
    impact: choice?.impact ?? decision.impact,
    fallbackWarning: !node || !choice,
    isTr,
  };
}

export default async function LabsResultsPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const isTr = locale === "tr";
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/login?next=/${locale}/dashboard/labs`);

  const { data, error } = await supabase
    .from("lab_attempts")
    .select("id,scenario_id,category,difficulty,score,incorrect_count,selected_answers,created_at")
    .eq("user_id", user.id)
    .eq("scenario_type", "incident_simulator")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) console.error("labs results read failed", error);
  const attempts = (data ?? []) as Attempt[];

  return (
    <main className="min-h-screen bg-[#06110f] px-5 py-10 text-slate-100 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link href={`/${locale}/dashboard`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white"><ArrowLeft size={16} />{isTr ? "Dashboard'a dön" : "Back to dashboard"}</Link>
          <Link href={`/${locale}/labs/incident-simulator`} className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/20 px-4 py-2 text-sm font-semibold text-emerald-200">Incident Simulator <ArrowRight size={15} /></Link>
        </div>

        <section className="mb-10">
          <p className="mb-3 text-xs font-bold tracking-[0.18em] text-emerald-300">SERNEM LABS / PERSONAL REVIEW</p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">{isTr ? "Kararlarını incele. Nerede puan kaybettiğini gör." : "Review your decisions. See where you lost points."}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400">{isTr ? "Incident Simulator denemelerin burada kişisel olarak saklanır. Her olayda verdiğin kararları, kritik seçimleri ve Safety / Judgment / Response etkilerini geriye dönük inceleyebilirsin." : "Your Incident Simulator attempts are stored privately here. Review each decision, critical choice, and its effect on Safety, Judgment, and Response."}</p>
        </section>

        {error ? (
          <div className="rounded-3xl border border-amber-300/20 bg-amber-400/[0.05] p-8">
            <TriangleAlert className="mb-4 text-amber-300" />
            <h2 className="text-2xl font-semibold">{isTr ? "Labs sonuç depolaması şu anda hazır değil" : "Labs result storage is currently unavailable"}</h2>
            <p className="mt-2 max-w-3xl text-slate-400">{isTr ? "Deneme sonucu tarayıcıda korunuyor ve sistem tekrar kaydetmeyi deneyecek. Bu ekran artık veritabanı hatasını 'kayıt yok' diye gizlemiyor." : "Your attempt is retained in the browser and the system will retry saving it. Database errors are no longer shown as an empty result list."}</p>
          </div>
        ) : attempts.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <LockKeyhole className="mb-4 text-emerald-300" />
            <h2 className="text-2xl font-semibold">{isTr ? "Henüz kayıtlı deneme yok" : "No saved attempts yet"}</h2>
            <p className="mt-2 text-slate-400">{isTr ? "Incident Simulator'da bir senaryoyu tamamladığında sonuçların otomatik olarak burada görünecek." : "Complete an Incident Simulator scenario and your result will appear here automatically."}</p>
          </div>
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
                    <div>
                      <div className="mb-2 flex flex-wrap gap-2 text-xs font-bold tracking-[0.12em] text-emerald-300"><span>{category}</span><span>·</span><span>{displayedDifficulty}</span></div>
                      <h2 className="text-2xl font-semibold">{localizedScenarioTitle(attempt.scenario_id, locale)}</h2>
                      <p className="mt-2 text-sm text-slate-400">{new Intl.DateTimeFormat(isTr ? "tr-TR" : "en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date(attempt.created_at))}</p>
                    </div>
                    <div className="flex gap-5 md:text-right">
                      <div><b className="block text-3xl">{attempt.score}</b><span className="text-xs text-slate-500">{isTr ? "GENEL" : "OVERALL"}</span></div>
                      <div><b className="block text-3xl">{criticalCount}</b><span className="text-xs text-slate-500">{isTr ? "KRİTİK" : "CRITICAL"}</span></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-px bg-white/10">
                    <Metric label={isTr ? "Güvenlik" : "Safety"} value={scores.safety} />
                    <Metric label={isTr ? "Muhakeme" : "Judgment"} value={scores.judgment} />
                    <Metric label={isTr ? "Müdahale" : "Response"} value={scores.response} />
                  </div>

                  <div className="p-6">
                    <h3 className="mb-4 text-sm font-bold tracking-[0.12em] text-slate-300">{isTr ? "KARAR ZİNCİRİ" : "DECISION CHAIN"}</h3>
                    <div className="space-y-3">
                      {decisions.map((decision, index) => {
                        const localized = localizedDecision(attempt, decision, locale);
                        return (
                          <div key={`${attempt.id}-${index}`} className={`rounded-2xl border p-4 ${localized.critical ? "border-red-400/25 bg-red-400/[0.05]" : "border-white/10 bg-white/[0.025]"}`}>
                            <div className="flex gap-3">
                              {localized.critical ? <CircleAlert size={18} className="mt-0.5 shrink-0 text-red-300" /> : <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-300" />}
                              <div className="min-w-0">
                                <div className="text-xs font-bold tracking-[0.12em] text-slate-500">{String(decision.step ?? index + 1).padStart(2, "0")} · {localized.nodeTitle}</div>
                                <p className="mt-1 font-semibold text-slate-100">{localized.choiceLabel}</p>
                                {localized.consequence ? <p className="mt-2 text-sm leading-6 text-slate-400">{localized.consequence}</p> : null}
                                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                                  <Impact label={isTr ? "Güvenlik" : "Safety"} value={localized.impact?.safety} />
                                  <Impact label={isTr ? "Muhakeme" : "Judgment"} value={localized.impact?.judgment} />
                                  <Impact label={isTr ? "Müdahale" : "Response"} value={localized.impact?.response} />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value?: number }) {
  return <div className="bg-[#0b1715] p-5 text-center"><b className="block text-2xl">{typeof value === "number" ? value : "—"}</b><span className="mt-1 block text-xs uppercase tracking-[0.12em] text-slate-500">{label}</span></div>;
}

function Impact({ label, value }: { label: string; value?: number }) {
  const number = Number(value ?? 0);
  return <span className={`rounded-full border px-2.5 py-1 ${number >= 0 ? "border-emerald-300/20 text-emerald-200" : "border-red-300/20 text-red-200"}`}>{label} {number > 0 ? `+${number}` : number}</span>;
}
