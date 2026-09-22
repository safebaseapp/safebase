"use client";

import "../sernem-print.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "../../../../utils/supabase/client";
import { isAdminUser } from "@/lib/auth/access";
import { requirePrintAuth } from "@/lib/auth/require-print-auth";
import { trackEvent } from "@/lib/analytics";
import { generateAssessment } from "@/lib/api/assessmentClient";
import type { ProfessionalAssessmentOutput } from "@/lib/ai/assessmentTypes";
import {
  analyzeInspectionChecklist,
  type ChecklistAnalysisResult,
  type ChecklistAnswer,
} from "@/lib/ai/analyzeChecklist";
import type { ChecklistDocument } from "@/data/checklists/hot-work";
import ChecklistAnalysisPanel from "./ChecklistAnalysisPanel";
import PremiumAssessmentButton from "./PremiumAssessmentButton";
import type { Locale } from "../hot-work/types";

type Answer = "Yes" | "No" | "N/A";
type ActionStatus = "open" | "progress" | "closed";
type ActionPriority = "low" | "medium" | "high" | "critical";

type CorrectiveAction = {
  action: string;
  responsible: string;
  targetDate: string;
  priority: ActionPriority;
  status: ActionStatus;
};

type InspectionDetails = {
  company: string;
  project: string;
  location: string;
  inspector: string;
  inspectionDate: string;
};

const emptyDetails: InspectionDetails = {
  company: "",
  project: "",
  location: "",
  inspector: "",
  inspectionDate: "",
};

function actionFor(current: CorrectiveAction | undefined): CorrectiveAction {
  return current ?? {
    action: "",
    responsible: "",
    targetDate: "",
    priority: "medium",
    status: "open",
  };
}

export default function ProfessionalInspectionChecklist({
  checklistDocument,
  locale,
}: {
  checklistDocument: ChecklistDocument;
  locale: Locale;
}) {
  const items = checklistDocument.sections.flatMap((section) => section.items);
  const isTurkish = locale === "tr";
  const startedTracked = useRef(false);
  const completedTracked = useRef(false);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [remarks, setRemarks] = useState<Record<string, string>>({});
  const [correctiveActions, setCorrectiveActions] = useState<Record<string, CorrectiveAction>>({});
  const [details, setDetails] = useState<InspectionDetails>(emptyDetails);
  const [comments, setComments] = useState("");
  const [analysis, setAnalysis] = useState<ChecklistAnalysisResult | null>(null);
  const [assessment, setAssessment] = useState<ProfessionalAssessmentOutput | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadPremiumStatus() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: profile } = await supabase
          .from("profiles")
          .select("plan, role, status")
          .eq("id", user.id)
          .maybeSingle();

        if (!active) return;
        setIsPremiumUser(
          isAdminUser(user) ||
            (profile?.status !== "suspended" &&
              (profile?.plan === "premium" || profile?.role === "admin")),
        );
      } catch (error) {
        console.error("SERNEM premium access check failed:", error);
        if (active) setIsPremiumUser(false);
      }
    }

    void loadPremiumStatus();
    return () => {
      active = false;
    };
  }, []);

  const answeredCount = items.filter((item) => answers[item.id]).length;
  const applicableItems = items.filter((item) => answers[item.id] !== "N/A");
  const yesCount = applicableItems.filter((item) => answers[item.id] === "Yes").length;
  const noCount = items.filter((item) => answers[item.id] === "No").length;
  const naCount = items.filter((item) => answers[item.id] === "N/A").length;
  const criticalFailures = items.filter((item) => item.critical && answers[item.id] === "No");
  const findings = items.filter((item) => answers[item.id] === "No");
  const progress = items.length === 0 ? 0 : Math.round((answeredCount / items.length) * 100);
  const complianceScore = applicableItems.length === 0 ? 0 : Math.round((yesCount / applicableItems.length) * 100);
  const isComplete = answeredCount === items.length;
  const sections = useMemo(() => checklistDocument.sections, [checklistDocument.sections]);

  const liveSafetyStatus = criticalFailures.length > 0
    ? {
        label: isTurkish ? "GÜVENSİZ" : "UNSAFE",
        text: isTurkish ? "Kritik bir kontrol başarısız." : "A critical control has failed.",
        className: "border-red-500/40 bg-red-500/10 text-red-200",
        indicator: "bg-red-400",
      }
    : !isComplete
      ? {
          label: isTurkish ? "UYARI" : "WARNING",
          text: isTurkish ? "Uygulanabilir tüm maddeleri cevaplayın." : "Complete all applicable items.",
          className: "border-amber-500/40 bg-amber-500/10 text-amber-200",
          indicator: "bg-amber-400",
        }
      : {
          label: isTurkish ? "GÜVENLİ" : "SAFE",
          text: isTurkish ? "Kritik bir uygunsuzluk tespit edilmedi." : "No critical failures have been identified.",
          className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
          indicator: "bg-emerald-400",
        };

  function updateAnswer(id: string, answer: Answer) {
    if (!startedTracked.current) {
      trackEvent("checklist_started", {
        checklist_type: checklistDocument.slug,
        locale,
        total_items: items.length,
        source: "inspection_checklist",
      });
      startedTracked.current = true;
    }

    const nextAnswers = { ...answers, [id]: answer };
    setAnswers(nextAnswers);
    setAnalysis(null);
    setAssessment(null);

    if (answer === "No") {
      setCorrectiveActions((current) => ({ ...current, [id]: actionFor(current[id]) }));
    } else {
      setCorrectiveActions((current) => {
        const next = { ...current };
        delete next[id];
        return next;
      });
    }

    if (Object.keys(nextAnswers).length === items.length && !completedTracked.current) {
      const applicable = items.filter((item) => nextAnswers[item.id] !== "N/A");
      const yes = applicable.filter((item) => nextAnswers[item.id] === "Yes").length;
      trackEvent("checklist_completed", {
        checklist_type: checklistDocument.slug,
        locale,
        total_items: items.length,
        compliance_score: applicable.length === 0 ? 0 : Math.round((yes / applicable.length) * 100),
        findings_count: items.filter((item) => nextAnswers[item.id] === "No").length,
        source: "inspection_checklist",
      });
      completedTracked.current = true;
    }
  }

  function updateAction<K extends keyof CorrectiveAction>(id: string, field: K, value: CorrectiveAction[K]) {
    setCorrectiveActions((current) => ({
      ...current,
      [id]: { ...actionFor(current[id]), [field]: value },
    }));
  }

  function runSafetyAnalysis() {
    const checklistAnswers: ChecklistAnswer[] = items
      .filter((item) => answers[item.id])
      .map((item) => ({
        id: item.id,
        answer: answers[item.id],
        remarks: remarks[item.id] || correctiveActions[item.id]?.action || undefined,
      }));

    const result = analyzeInspectionChecklist(checklistDocument, checklistAnswers, locale);
    setAnalysis(result);
    setAssessment(null);
    trackEvent("checklist_analyzed", {
      checklist_type: checklistDocument.slug,
      locale,
      total_items: items.length,
      completion_rate: result.completionRate,
      compliance_score: result.score,
      findings_count: result.nonCompliantItems,
    });

    window.setTimeout(() => {
      window.document.querySelector("[data-checklist-analysis]")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  async function generateAiAssessment() {
    if (!analysis || isAiLoading) {
      alert(isTurkish ? "Önce Güvenlik Analizi Yap butonuna basın." : "Run Analyze Safety first.");
      return;
    }

    setIsAiLoading(true);
    setAssessment(null);
    trackEvent("premium_ai_assessment_used", {
      assessment_type: checklistDocument.slug,
      locale,
      answered_count: answeredCount,
      total_items: items.length,
      findings_count: noCount,
      critical_findings: criticalFailures.length,
      source: "inspection_checklist_premium_ai",
    });

    try {
      const workDecision = analysis.workDecision === "Stop Work"
        ? "STOP WORK"
        : analysis.workDecision === "Proceed With Conditions"
          ? "PROCEED WITH CONDITIONS"
          : "APPROVED";
      const responsiblePersons = [...new Set(findings.map((item) => correctiveActions[item.id]?.responsible).filter(Boolean))];
      const targetDates = [...new Set(findings.map((item) => correctiveActions[item.id]?.targetDate).filter(Boolean))];

      const result = await generateAssessment({
        workType: analysis.checklistTitle,
        language: locale,
        assessmentStatus: analysis.assessmentStatus,
        completionRate: analysis.completionRate,
        safetyScore: analysis.score,
        overallRisk: analysis.overallRisk,
        workDecision,
        permitReadiness: analysis.permitReadiness,
        severityBreakdown: {
          critical: analysis.severityBreakdown.Critical,
          high: analysis.severityBreakdown.High,
          medium: analysis.severityBreakdown.Medium,
          low: analysis.severityBreakdown.Low,
        },
        findings: analysis.findings.map((finding) => ({
          id: finding.id,
          title: finding.requirement,
          description: finding.guidance,
          severity: finding.riskLevel as "Low" | "Medium" | "High" | "Critical",
          recommendation: correctiveActions[finding.id]?.action || finding.correctiveAction,
          reference: finding.references[0],
        })),
        recommendations: analysis.recommendations.map((recommendation, index) => ({ title: recommendation, priority: index + 1 })),
        references: analysis.references,
        inspectionContext: {
          inspectionType: analysis.checklistTitle,
          company: details.company,
          project: details.project,
          location: details.location,
          completionPercentage: analysis.completionRate,
          complianceScore: analysis.score,
          criticalFindings: analysis.criticalFindings,
          nonConformities: analysis.findings,
          remarks: [
            ...analysis.findings.map((finding) => ({ id: finding.id, text: remarks[finding.id] ?? "" })),
            { id: "inspection-comments", text: comments },
          ],
          correctiveActions: analysis.findings.map((finding) => correctiveActions[finding.id]?.action || finding.correctiveAction),
          responsiblePersons,
          targetDates,
          inspectionSpecificCriticalControls: items.filter((item) => item.critical).map((item) => item.requirement[locale]),
          failedAnswers: analysis.findings.map((finding) => ({
            id: finding.id,
            question: finding.requirement,
            answer: finding.answer,
            remarks: finding.remarks,
          })),
        },
      });
      setAssessment(result);
      window.setTimeout(() => window.document.querySelector("[data-ai-assessment]")?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (error) {
      console.error("Inspection AI assessment error:", error);
      alert(isTurkish ? "AI değerlendirmesi oluşturulamadı." : "AI assessment could not be generated.");
    } finally {
      setIsAiLoading(false);
    }
  }

  async function printInspection() {
    if (!(await requirePrintAuth(locale))) return;
    trackEvent("pdf_downloaded", {
      document_type: `${checklistDocument.slug}_inspection`,
      locale,
      completion_rate: progress,
      compliance_score: complianceScore,
      findings_count: noCount,
      critical_findings: criticalFailures.length,
      source: "inspection_checklist",
    });
    window.print();
  }

  function resetInspection() {
    startedTracked.current = false;
    completedTracked.current = false;
    setAnswers({});
    setRemarks({});
    setCorrectiveActions({});
    setDetails(emptyDetails);
    setComments("");
    setAnalysis(null);
    setAssessment(null);
    setIsAiLoading(false);
  }

  const fieldLabels = isTurkish
    ? { company: "Firma", project: "Proje", location: "Alan / Lokasyon", inspector: "Denetçi", inspectionDate: "Denetim tarihi" }
    : { company: "Company", project: "Project", location: "Area / Location", inspector: "Inspector", inspectionDate: "Inspection date" };
  const resultLabel = !isComplete
    ? isTurkish ? "Denetim tamamlanmadı" : "Inspection incomplete"
    : criticalFailures.length > 0
      ? isTurkish ? "Başarısız" : "Failed"
      : isTurkish ? "Başarılı" : "Passed";
  const riskSections: { title: string; values: string[] }[] = [
    { title: isTurkish ? "En Kritik Riskler" : "Top Critical Risks", values: assessment?.topCriticalRisks ?? [] },
    { title: isTurkish ? "Kritik Kontrol Başarısızlıkları" : "Critical Control Failures", values: assessment?.criticalControlFailures ?? [] },
    { title: isTurkish ? "Tekrarlayan / Sistemik Zayıflıklar" : "Repeated / Systemic Weaknesses", values: assessment?.repeatedSystemicWeaknesses ?? [] },
  ];
  const actionSections = assessment ? [
    { title: isTurkish ? "Acil Faaliyetler (0–24 saat)" : "Immediate Actions (0–24 hours)", actions: assessment.immediateActions },
    { title: isTurkish ? "Kısa Vadeli Faaliyetler (1–7 gün)" : "Short-Term Actions (1–7 days)", actions: assessment.shortTermActions },
    { title: isTurkish ? "Yönetim Faaliyetleri" : "Management Actions", actions: assessment.managementActions },
  ] : [];
  const displayRiskLevel = (level: string) => {
    if (!isTurkish) return level;
    return { Low: "Düşük", Medium: "Orta", High: "Yüksek", Critical: "Kritik" }[level] ?? level;
  };
  const displayDecision = (decision: string) => {
    if (!isTurkish) return decision;
    return {
      APPROVED: "ONAYLANDI",
      "STOP WORK": "ÇALIŞMAYI DURDUR",
      "PROCEED WITH CONDITIONS": "KONTROLLERLE DEVAM",
    }[decision] ?? decision;
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="border-b border-slate-800 pb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">{checklistDocument.category[locale]}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">{checklistDocument.title[locale]}</h1>
          <p className="mt-4 max-w-3xl leading-7 text-slate-400">{checklistDocument.description[locale]}</p>
          <div className="mt-6 flex items-center gap-4 text-sm text-slate-400">
            <span>{answeredCount}/{items.length}</span>
            <div className="h-2 min-w-32 flex-1 overflow-hidden rounded-full bg-slate-800"><div className="h-full bg-blue-500 transition-all" style={{ width: `${progress}%` }} /></div>
            <span>{progress}%</span>
          </div>
        </header>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7 print:break-inside-avoid">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {(Object.keys(fieldLabels) as (keyof InspectionDetails)[]).map((field) => (
              <label key={field} className="text-sm font-semibold text-slate-300">
                {fieldLabels[field]}
                <input type={field === "inspectionDate" ? "date" : "text"} value={details[field]} onChange={(event) => setDetails((current) => ({ ...current, [field]: event.target.value }))} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 font-normal text-white outline-none focus:border-blue-500" />
              </label>
            ))}
          </div>
        </section>

        <section className={`mt-6 flex flex-col gap-3 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between ${liveSafetyStatus.className} print:border-slate-300 print:bg-white print:text-black`}>
          <div className="flex items-center gap-3"><span className={`h-3 w-3 rounded-full ${liveSafetyStatus.indicator}`} /><div><p className="text-xs font-bold uppercase tracking-[0.16em]">{isTurkish ? "Canlı güvenlik durumu" : "Live safety status"}</p><p className="mt-1 text-2xl font-black">{liveSafetyStatus.label}</p></div></div>
          <p className="text-sm">{liveSafetyStatus.text}</p>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {[
            [isTurkish ? "Tamamlanma" : "Progress", `${progress}%`],
            [isTurkish ? "Uygunluk" : "Compliance", `${complianceScore}%`],
            [isTurkish ? "Toplam" : "Total questions", items.length],
            [isTurkish ? "Cevaplanan" : "Answered", answeredCount],
            [isTurkish ? "Uygunsuzluk" : "Findings", noCount],
            [isTurkish ? "Kritik bulgu" : "Critical findings", criticalFailures.length],
          ].map(([label, value]) => <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p></div>)}
        </section>

        <div className="mt-8 space-y-8">
          {sections.map((section) => (
            <section key={section.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7">
              <h2 className="text-xl font-bold">{section.title[locale]}</h2>
              <div className="mt-5 space-y-6">
                {section.items.map((item, itemIndex) => {
                  const selected = answers[item.id];
                  const action = correctiveActions[item.id];
                  return (
                    <article key={item.id} className="border-b border-slate-800 pb-6 last:border-0 last:pb-0">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex min-w-0 gap-4">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-sm font-bold text-blue-300">{itemIndex + 1}</span>
                          <div>
                            <h3 className="font-semibold leading-6">{item.requirement[locale]}</h3>
                            {item.critical && <span className="mt-2 inline-flex rounded-full border border-red-500/30 px-2 py-1 text-[10px] font-bold uppercase text-red-300">{isTurkish ? "Kritik" : "Critical"}</span>}
                          </div>
                        </div>
                        <div className="grid w-full grid-cols-3 gap-2 lg:w-auto lg:min-w-72">
                          {(["Yes", "No", "N/A"] as const).map((answer) => <button key={answer} type="button" onClick={() => updateAnswer(item.id, answer)} className={`min-h-11 rounded-lg border px-3 text-sm font-semibold transition ${selected === answer ? answer === "No" ? "border-red-400 bg-red-500/20 text-red-200" : "border-blue-400 bg-blue-500/20 text-blue-200" : "border-slate-700 text-slate-400 hover:border-slate-500"}`}>{isTurkish ? answer === "Yes" ? "Evet" : answer === "No" ? "Hayır" : "Uygulanamaz" : answer}</button>)}
                        </div>
                      </div>
                      {selected === "No" && <div className="mt-4 grid gap-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4 sm:grid-cols-2"><label className="text-sm font-semibold text-slate-300 sm:col-span-2">{isTurkish ? "Bulgu / not" : "Finding / remarks"}<textarea value={remarks[item.id] ?? ""} onChange={(event) => setRemarks((current) => ({ ...current, [item.id]: event.target.value }))} rows={2} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 font-normal text-white outline-none focus:border-blue-500" /></label><label className="text-sm font-semibold text-slate-300 sm:col-span-2">{isTurkish ? "Düzeltici faaliyet" : "Corrective action"}<textarea value={action?.action ?? ""} onChange={(event) => updateAction(item.id, "action", event.target.value)} placeholder={item.correctiveAction[locale]} rows={2} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 font-normal text-white outline-none focus:border-blue-500" /></label><label className="text-sm font-semibold text-slate-300">{isTurkish ? "Sorumlu kişi" : "Responsible person"}<input value={action?.responsible ?? ""} onChange={(event) => updateAction(item.id, "responsible", event.target.value)} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 font-normal text-white outline-none focus:border-blue-500" /></label><label className="text-sm font-semibold text-slate-300">{isTurkish ? "Hedef tarih" : "Target date"}<input type="date" value={action?.targetDate ?? ""} onChange={(event) => updateAction(item.id, "targetDate", event.target.value)} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 font-normal text-white outline-none focus:border-blue-500" /></label><label className="text-sm font-semibold text-slate-300">{isTurkish ? "Öncelik" : "Priority"}<select value={action?.priority ?? "medium"} onChange={(event) => updateAction(item.id, "priority", event.target.value as ActionPriority)} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 font-normal text-white outline-none focus:border-blue-500"><option value="low">{isTurkish ? "Düşük" : "Low"}</option><option value="medium">{isTurkish ? "Orta" : "Medium"}</option><option value="high">{isTurkish ? "Yüksek" : "High"}</option><option value="critical">{isTurkish ? "Kritik" : "Critical"}</option></select></label><label className="text-sm font-semibold text-slate-300">{isTurkish ? "Durum" : "Status"}<select value={action?.status ?? "open"} onChange={(event) => updateAction(item.id, "status", event.target.value as ActionStatus)} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 font-normal text-white outline-none focus:border-blue-500"><option value="open">{isTurkish ? "Açık" : "Open"}</option><option value="progress">{isTurkish ? "Devam ediyor" : "In progress"}</option><option value="closed">{isTurkish ? "Kapalı" : "Closed"}</option></select></label></div>}
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 print:break-inside-avoid">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-2xl font-bold">{isTurkish ? "Denetim sonucu" : "Inspection result"}</h2><p className="mt-2 text-slate-400">{isTurkish ? "Canlı olarak hesaplanır." : "Calculated live from the inspection responses."}</p></div><p className={`text-2xl font-black ${criticalFailures.length ? "text-red-300" : isComplete ? "text-emerald-300" : "text-amber-300"}`}>{resultLabel}</p></div>
          <div className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-3"><span>{isTurkish ? "Evet" : "Yes"}: {yesCount}</span><span>{isTurkish ? "Hayır" : "No"}: {noCount}</span><span>{isTurkish ? "Uygulanamaz" : "N/A"}: {naCount}</span></div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 print:hidden">
          <h2 className="text-xl font-bold">{isTurkish ? "Denetim notları" : "Inspection comments"}</h2>
          <textarea value={comments} onChange={(event) => setComments(event.target.value)} rows={5} placeholder={isTurkish ? "Bulguları, faaliyetleri, sorumluları veya ek notları yazın..." : "Record findings, corrective actions, responsible persons or additional notes..."} className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-blue-500" />
        </section>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row print:hidden">
          <button type="button" onClick={runSafetyAnalysis} disabled={answeredCount === 0 || isAiLoading} className="rounded-2xl bg-violet-600 px-6 py-4 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40">Analyze Safety</button>
          <PremiumAssessmentButton locale={locale} disabled={!analysis || isAiLoading} isPremiumUser={isPremiumUser} onPremiumClick={() => void generateAiAssessment()} />
          <button type="button" onClick={() => void printInspection()} className="rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-500">{isTurkish ? "Yazdır / PDF Kaydet" : "Print / Save PDF"}</button>
          <button type="button" onClick={resetInspection} className="rounded-2xl border border-slate-700 bg-slate-900 px-6 py-4 font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white">{isTurkish ? "Denetimi sıfırla" : "Reset Inspection"}</button>
        </div>

        <div data-checklist-analysis className="scroll-mt-8"><ChecklistAnalysisPanel locale={locale} analysis={analysis} showPermitReadiness={false} /></div>
        {assessment && (
          <section data-ai-assessment className="mt-8 space-y-6 rounded-2xl border border-blue-500/30 bg-blue-500/5 p-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">AI {isTurkish ? "Yönetim Değerlendirmesi" : "Management Assessment"}</p>
              <h2 className="mt-3 text-2xl font-bold">{displayDecision(assessment.workDecision)}</h2>
              <p className="mt-3 leading-7 text-slate-300">{assessment.executiveSummary}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-xl border border-slate-700 bg-slate-950/60 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{isTurkish ? "Genel risk derecesi" : "Overall Risk Rating"}</p>
                <p className="mt-2 text-2xl font-black text-red-300">{displayRiskLevel(assessment.overallRiskRating.level)}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{assessment.overallRiskRating.rationale}</p>
              </article>
              <article className="rounded-xl border border-slate-700 bg-slate-950/60 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{isTurkish ? "İş kararı" : "Work Decision"}</p>
                <p className="mt-2 text-2xl font-black text-amber-300">{displayDecision(assessment.workDecision)}</p>
                {assessment.permitReadinessStatus && <p className="mt-2 text-sm text-slate-300">{assessment.permitReadinessStatus}</p>}
              </article>
            </div>

            {riskSections.map(({ title, values }) => (
              <article key={title} className="rounded-xl border border-slate-700 bg-slate-950/60 p-5">
                <h3 className="font-bold">{title}</h3>
                {values.length > 0 ? <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">{values.map((value, index) => <li key={`${title}-${index}-${value}`}>• {value}</li>)}</ul> : <p className="mt-3 text-sm text-slate-500">{isTurkish ? "Kayıt yok" : "None recorded"}</p>}
              </article>
            ))}

            <div className="grid gap-5 lg:grid-cols-3">
              {actionSections.map(({ title, actions }) => (
                <article key={title} className="rounded-xl border border-slate-700 bg-slate-950/60 p-5">
                  <h3 className="font-bold">{title}</h3>
                  <div className="mt-4 space-y-4">{actions.map((action) => <div key={`${title}-${action.priority}-${action.action}`} className="border-l-2 border-blue-400 pl-3 text-sm"><p className="font-semibold text-slate-200">{action.priority}. {action.action}</p><p className="mt-1 text-slate-400">{action.owner} · {action.timing}</p><p className="mt-1 leading-6 text-slate-400">{action.reason}</p></div>)}</div>
                </article>
              ))}
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <article className="rounded-xl border border-slate-700 bg-slate-950/60 p-5"><h3 className="font-bold">{isTurkish ? "Sorumlu Roller" : "Responsible Roles"}</h3><div className="mt-3 space-y-3 text-sm text-slate-300">{assessment.responsibleRoles.map((role, index) => <p key={`${role.role}-${index}`}><strong>{role.role}:</strong> {role.responsibility}</p>)}</div></article>
              <article className="rounded-xl border border-slate-700 bg-slate-950/60 p-5"><h3 className="font-bold">{isTurkish ? "Önerilen Takip Denetimi" : "Recommended Follow-Up Inspection"}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{assessment.recommendedFollowUpInspection}</p></article>
            </div>

            <article className="rounded-xl border border-blue-400/30 bg-blue-500/10 p-5"><h3 className="font-bold">{isTurkish ? "Yönetim Sonucu" : "Management Conclusion"}</h3><p className="mt-3 leading-7 text-slate-200">{assessment.managementConclusion}</p></article>
          </section>
        )}

        <footer className="mt-10 border-t border-slate-800 py-8 text-sm leading-6 text-slate-500 print:border-slate-300 print:text-slate-700"><p>{checklistDocument.disclaimer[locale]}</p><p className="mt-3 font-semibold">{isTurkish ? "SERNEM ile oluşturuldu" : "Generated with SERNEM"}</p></footer>
      </div>
    </main>
  );
}
