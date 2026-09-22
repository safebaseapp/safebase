"use client";

import { useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { generateAssessment } from "@/lib/api/assessmentClient";
import type { ProfessionalAssessmentOutput } from "@/lib/ai/assessmentTypes";
import { analyzeChecklist, type ChecklistAnalysisResult } from "@/lib/ai/analyzeChecklist";
import type { ChecklistDocument } from "@/data/checklists/hot-work";
import ChecklistAnalysisPanel from "./ChecklistAnalysisPanel";
import type { Locale } from "../hot-work/types";

export default function GenericChecklist({ document, locale }: { document: ChecklistDocument; locale: Locale }) {
  const items = document.sections.flatMap((section) => section.items);
  const [answers, setAnswers] = useState<Record<string, "Yes" | "No" | "N/A">>({});
  const [remarks, setRemarks] = useState<Record<string, string>>({});
  const [analysis, setAnalysis] = useState<ChecklistAnalysisResult | null>(null);
  const [assessment, setAssessment] = useState<ProfessionalAssessmentOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasTrackedStart, setHasTrackedStart] = useState(false);
  const isTurkish = locale === "tr";
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / items.length) * 100);

  const groups = useMemo(() => document.sections, [document.sections]);

  function updateAnswer(id: string, answer: "Yes" | "No" | "N/A") {
    if (!hasTrackedStart) {
      trackEvent("checklist_started", {
        checklist_type: document.slug,
        locale,
        total_items: items.length,
        source: "inspection_checklist",
      });
      setHasTrackedStart(true);
    }
    setAnswers((current) => ({ ...current, [id]: answer }));
    setAnalysis(null);
    setAssessment(null);
  }

  async function runAnalysis() {
    const checklistAnswers = items
      .filter((item) => answers[item.id])
      .map((item) => ({ id: item.id, answer: answers[item.id], remarks: remarks[item.id] }));
    const result = analyzeChecklist(document, checklistAnswers, locale);
    setAnalysis(result);
    trackEvent("checklist_analyzed", {
      checklist_type: document.slug,
      locale,
      total_items: items.length,
      completion_rate: result.completionRate,
      compliance_score: result.score,
      findings_count: result.nonCompliantItems,
    });
    setLoading(true);
    try {
      const aiResult = await generateAssessment({
        workType: document.title.en,
        language: locale,
        assessmentStatus: result.assessmentStatus,
        completionRate: result.completionRate,
        safetyScore: result.score,
        overallRisk: result.overallRisk,
        workDecision: result.workDecision === "Work May Proceed" ? "APPROVED" : result.workDecision === "Proceed With Conditions" ? "PROCEED WITH CONDITIONS" : "STOP WORK",
        permitReadiness: result.permitReadiness,
        severityBreakdown: {
          critical: result.severityBreakdown.Critical,
          high: result.severityBreakdown.High,
          medium: result.severityBreakdown.Medium,
          low: result.severityBreakdown.Low,
        },
        findings: result.findings.map((finding) => ({
          id: finding.id,
          title: finding.requirement,
          description: finding.guidance,
          severity: finding.riskLevel as "Low" | "Medium" | "High" | "Critical",
          recommendation: finding.correctiveAction,
          reference: finding.references[0],
        })),
        recommendations: result.recommendations.map((recommendation, index) => ({ title: recommendation, priority: index + 1 })),
        references: result.references,
      });
      setAssessment(aiResult);
    } catch {
      // The deterministic result remains available when the optional AI request fails.
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <header className="border-b border-slate-800 pb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">{document.category[locale]}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">{document.title[locale]}</h1>
          <p className="mt-4 max-w-3xl leading-7 text-slate-400">{document.description[locale]}</p>
          <div className="mt-6 flex items-center gap-4 text-sm text-slate-400">
            <span>{answeredCount}/{items.length} {isTurkish ? "madde yanıtlandı" : "items answered"}</span>
            <div className="h-2 min-w-32 flex-1 overflow-hidden rounded-full bg-slate-800"><div className="h-full bg-blue-500 transition-all" style={{ width: `${progress}%` }} /></div>
            <span>{progress}%</span>
          </div>
        </header>

        <div className="mt-8 space-y-8">
          {groups.map((section) => (
            <section key={section.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7">
              <h2 className="text-xl font-bold">{section.title[locale]}</h2>
              <div className="mt-5 space-y-5">
                {section.items.map((item) => (
                  <article key={item.id} className="border-b border-slate-800 pb-5 last:border-0 last:pb-0">
                    <div className="flex gap-3"><span className="text-xs font-bold text-blue-400">{item.id}</span><h3 className="font-semibold leading-6">{item.requirement[locale]}</h3></div>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {(["Yes", "No", "N/A"] as const).map((answer) => (
                        <button key={answer} type="button" onClick={() => updateAnswer(item.id, answer)} className={`min-h-11 rounded-lg border px-2 text-sm font-semibold transition ${answers[item.id] === answer ? answer === "No" ? "border-red-400 bg-red-500/20 text-red-200" : "border-blue-400 bg-blue-500/20 text-blue-200" : "border-slate-700 text-slate-400 hover:border-slate-500"}`}>{answer === "Yes" ? isTurkish ? "Uygun" : "Yes" : answer === "No" ? isTurkish ? "Uygunsuz" : "No" : "N/A"}</button>
                      ))}
                    </div>
                    {answers[item.id] === "No" && <textarea value={remarks[item.id] ?? ""} onChange={(event) => setRemarks((current) => ({ ...current, [item.id]: event.target.value }))} placeholder={isTurkish ? "Bulgu ve notlar" : "Finding and remarks"} className="mt-3 min-h-20 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-white outline-none focus:border-blue-500" />}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <button type="button" disabled={loading || answeredCount === 0} onClick={() => void runAnalysis()} className="mt-8 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50">{loading ? isTurkish ? "AI analizi hazırlanıyor..." : "Preparing AI analysis..." : isTurkish ? "Denetimi Analiz Et" : "Analyze Inspection"}</button>
        <ChecklistAnalysisPanel locale={locale} analysis={analysis} />
        {assessment && <section className="mt-8 rounded-2xl border border-blue-500/30 bg-blue-500/5 p-6"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">AI {isTurkish ? "Profesyonel Değerlendirme" : "Professional Assessment"}</p><h2 className="mt-3 text-2xl font-bold">{assessment.finalRecommendation}</h2><p className="mt-3 leading-7 text-slate-300">{assessment.executiveAssessment}</p><div className="mt-5 space-y-2">{assessment.priorityActions.map((action) => <p key={`${action.priority}-${action.action}`} className="text-sm text-slate-300">{action.priority}. {action.action}</p>)}</div></section>}
      </div>
    </main>
  );
}
