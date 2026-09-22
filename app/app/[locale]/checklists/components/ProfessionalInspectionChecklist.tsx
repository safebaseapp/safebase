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

function waitForPaint() {
  return new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => resolve());
    });
  });
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
  const [aiLoadingStage, setAiLoadingStage] = useState(0);
  const [isPrintPreparing, setIsPrintPreparing] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(false);

  const aiLoadingMessages = isTurkish
    ? ["Analiz hazırlanıyor...", "Bulgular değerlendiriliyor...", "Yönetim özeti oluşturuluyor...", "Aksiyonlar önceliklendiriliyor..."]
    : ["Preparing assessment...", "Reviewing findings...", "Building management summary...", "Prioritizing actions..."];

  async function resolvePremiumAccess() {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { data: profile } = await supabase
        .from("profiles")
        .select("plan, role, status")
        .eq("id", user.id)
        .maybeSingle();

      return Boolean(
        isAdminUser(user) ||
          (profile?.status !== "suspended" &&
            (profile?.plan === "premium" || profile?.role === "admin")),
      );
    } catch (error) {
      console.error("SERNEM premium access check failed:", error);
      return false;
    }
  }

  useEffect(() => {
    let active = true;
    void resolvePremiumAccess().then((premium) => {
      if (active) setIsPremiumUser(premium);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isAiLoading) {
      setAiLoadingStage(0);
      return;
    }
    const timer = window.setInterval(() => {
      setAiLoadingStage((current) => Math.min(current + 1, aiLoadingMessages.length - 1));
    }, 4500);
    return () => window.clearInterval(timer);
  }, [isAiLoading, aiLoadingMessages.length]);

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

  function globalItemNumber(id: string) {
    const index = items.findIndex((item) => item.id === id);
    return index >= 0 ? index + 1 : 0;
  }

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

  function buildSafetyAnalysis() {
    const checklistAnswers: ChecklistAnswer[] = items
      .filter((item) => answers[item.id])
      .map((item) => ({
        id: item.id,
        answer: answers[item.id],
        remarks: remarks[item.id] || correctiveActions[item.id]?.action || undefined,
      }));

    const result = analyzeInspectionChecklist(checklistDocument, checklistAnswers, locale);
    setAnalysis(result);
    trackEvent("checklist_analyzed", {
      checklist_type: checklistDocument.slug,
      locale,
      total_items: items.length,
      completion_rate: result.completionRate,
      compliance_score: result.score,
      findings_count: result.nonCompliantItems,
    });
    return result;
  }

  function runSafetyAnalysis() {
    setAssessment(null);
    buildSafetyAnalysis();
    window.setTimeout(() => {
      window.document.querySelector("[data-checklist-analysis]")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  async function generateAiAssessment(
    analysisOverride?: ChecklistAnalysisResult,
    scrollToResult = true,
  ): Promise<ProfessionalAssessmentOutput | null> {
    const activeAnalysis = analysisOverride ?? analysis;
    if (!activeAnalysis || isAiLoading) {
      if (!activeAnalysis) {
        alert(isTurkish ? "Önce Güvenlik Analizi Yap butonuna basın." : "Run Analyze Safety first.");
      }
      return null;
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
      const workDecision = activeAnalysis.workDecision === "Stop Work"
        ? "STOP WORK"
        : activeAnalysis.workDecision === "Incomplete Assessment"
          ? "HOLD"
          : activeAnalysis.workDecision === "Proceed With Conditions"
            ? "PROCEED WITH CONDITIONS"
            : "APPROVED";
      const responsiblePersons = [...new Set(findings.map((item) => correctiveActions[item.id]?.responsible).filter(Boolean))];
      const targetDates = [...new Set(findings.map((item) => correctiveActions[item.id]?.targetDate).filter(Boolean))];
      const findingLabel = (findingId: string) => `${isTurkish ? "Madde" : "Item"} ${globalItemNumber(findingId)}`;

      const result = await generateAssessment({
        workType: activeAnalysis.checklistTitle,
        language: locale,
        assessmentStatus: activeAnalysis.assessmentStatus,
        completionRate: activeAnalysis.completionRate,
        safetyScore: activeAnalysis.score,
        overallRisk: activeAnalysis.overallRisk,
        workDecision,
        permitReadiness: activeAnalysis.permitReadiness,
        severityBreakdown: {
          critical: activeAnalysis.severityBreakdown.Critical,
          high: activeAnalysis.severityBreakdown.High,
          medium: activeAnalysis.severityBreakdown.Medium,
          low: activeAnalysis.severityBreakdown.Low,
        },
        findings: activeAnalysis.findings.map((finding) => ({
          id: findingLabel(finding.id),
          title: finding.requirement,
          description: finding.guidance,
          severity: finding.riskLevel as "Low" | "Medium" | "High" | "Critical",
          recommendation: correctiveActions[finding.id]?.action || finding.correctiveAction,
          reference: finding.references[0],
        })),
        recommendations: activeAnalysis.recommendations.map((recommendation, index) => ({ title: recommendation, priority: index + 1 })),
        references: activeAnalysis.references,
        inspectionContext: {
          inspectionType: activeAnalysis.checklistTitle,
          company: details.company,
          project: details.project,
          location: details.location,
          completionPercentage: activeAnalysis.completionRate,
          complianceScore: activeAnalysis.score,
          criticalFindings: activeAnalysis.criticalFindings.map((finding) => ({ ...finding, id: findingLabel(finding.id) })),
          nonConformities: activeAnalysis.findings.map((finding) => ({ ...finding, id: findingLabel(finding.id) })),
          remarks: [
            ...activeAnalysis.findings.map((finding) => ({ id: findingLabel(finding.id), text: remarks[finding.id] ?? "" })),
            { id: "inspection-comments", text: comments },
          ],
          correctiveActions: activeAnalysis.findings.map((finding) => correctiveActions[finding.id]?.action || finding.correctiveAction),
          responsiblePersons,
          targetDates,
          inspectionSpecificCriticalControls: items.filter((item) => item.critical).map((item) => item.requirement[locale]),
          permitRelevant: false,
          failedAnswers: activeAnalysis.findings.map((finding) => ({
            id: findingLabel(finding.id),
            question: finding.requirement,
            answer: finding.answer,
            remarks: finding.remarks,
          })),
        },
      });
      setAssessment(result);
      if (scrollToResult) {
        window.setTimeout(() => window.document.querySelector("[data-ai-assessment]")?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
      return result;
    } catch (error) {
      console.error("Inspection AI assessment error:", error);
      alert(isTurkish ? "AI değerlendirmesi oluşturulamadı." : "AI assessment could not be generated.");
      return null;
    } finally {
      setIsAiLoading(false);
    }
  }

  async function printInspection() {
    if (isPrintPreparing || isAiLoading) return;
    if (!(await requirePrintAuth(locale))) return;

    setIsPrintPreparing(true);
    try {
      const premium = await resolvePremiumAccess();
      setIsPremiumUser(premium);

      const activeAnalysis = analysis ?? buildSafetyAnalysis();
      let activeAssessment = assessment;

      if (premium && !activeAssessment) {
        activeAssessment = await generateAiAssessment(activeAnalysis, false);
        if (!activeAssessment) return;
      }

      trackEvent("pdf_downloaded", {
        document_type: `${checklistDocument.slug}_inspection`,
        locale,
        completion_rate: progress,
        compliance_score: complianceScore,
        findings_count: noCount,
        critical_findings: criticalFailures.length,
        report_tier: premium ? "premium_ai" : "standard",
        source: "inspection_checklist",
      });

      await waitForPaint();
      window.print();
    } finally {
      setIsPrintPreparing(false);
    }
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
    setIsPrintPreparing(false);
  }

  const fieldLabels = isTurkish
    ? { company: "Firma", project: "Proje", location: "Alan / Lokasyon", inspector: "Denetçi", inspectionDate: "Denetim tarihi" }
    : { company: "Company", project: "Project", location: "Area / Location", inspector: "Inspector", inspectionDate: "Inspection date" };

  const resultLabel = !isComplete
    ? isTurkish ? "Denetim tamamlanmadı" : "Inspection incomplete"
    : criticalFailures.length > 0
      ? isTurkish ? "Başarısız" : "Failed"
      : isTurkish ? "Başarılı" : "Passed";

  const displayRiskLevel = (level: string) => {
    if (!isTurkish) return level;
    return { Low: "Düşük", Medium: "Orta", High: "Yüksek", Critical: "Kritik" }[level] ?? level;
  };

  const displayDecision = (decision: string) => {
    if (!isTurkish) return decision;
    return {
      APPROVED: "ONAYLANDI",
      HOLD: "BEKLET",
      "STOP WORK": "ÇALIŞMAYI DURDUR",
      "PROCEED WITH CONDITIONS": "KONTROLLERLE DEVAM",
    }[decision] ?? decision;
  };

  const localizedAiText = (value?: string) => {
    if (!value || !isTurkish) return value ?? "";
    return value
      .replace(/\bASSESSMENT INCOMPLETE\b/gi, "DEĞERLENDİRME TAMAMLANMADI")
      .replace(/\bPROCEED WITH CONDITIONS\b/gi, "KONTROLLERLE DEVAM")
      .replace(/\bSTOP WORK\b/gi, "ÇALIŞMAYI DURDUR")
      .replace(/\bAPPROVED\b/gi, "ONAYLANDI")
      .replace(/\bHOLD\b/gi, "BEKLET")
      .replace(/\bCritical\b/g, "Kritik")
      .replace(/\bHigh\b/g, "Yüksek")
      .replace(/\bMedium\b/g, "Orta")
      .replace(/\bLow\b/g, "Düşük")
      .replace(/Permit readiness/gi, "İzin hazırlığı")
      .replace(/Work Decision/gi, "İş kararı");
  };

  const referenceLabel = (reference: string) =>
    isTurkish && reference === "Applicable local legislation and site procedures"
      ? "Uygulanabilir yerel mevzuat ve saha prosedürleri"
      : reference;

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

  const assessmentStatusLabel = analysis?.assessmentStatus === "Partial"
    ? (isTurkish ? "DEĞERLENDİRME TAMAMLANMADI" : "ASSESSMENT INCOMPLETE")
    : (isTurkish ? "TAM DEĞERLENDİRME" : "COMPLETE ASSESSMENT");

  const printAnswerLabel = (answer?: Answer) => {
    if (!answer) return isTurkish ? "Cevaplanmadı" : "Unanswered";
    if (!isTurkish) return answer;
    return answer === "Yes" ? "Evet" : answer === "No" ? "Hayır" : "Uygulanamaz";
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 sm:py-12">
      <div className="sernem-screen mx-auto max-w-6xl">
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

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {(Object.keys(fieldLabels) as (keyof InspectionDetails)[]).map((field) => (
              <label key={field} className="text-sm font-semibold text-slate-300">
                {fieldLabels[field]}
                <input type={field === "inspectionDate" ? "date" : "text"} value={details[field]} onChange={(event) => setDetails((current) => ({ ...current, [field]: event.target.value }))} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 font-normal text-white outline-none focus:border-blue-500" />
              </label>
            ))}
          </div>
        </section>

        <section className={`mt-6 flex flex-col gap-3 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between ${liveSafetyStatus.className}`}>
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
                {section.items.map((item) => {
                  const selected = answers[item.id];
                  const action = correctiveActions[item.id];
                  return (
                    <article key={item.id} className="border-b border-slate-800 pb-6 last:border-0 last:pb-0">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex min-w-0 gap-4">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-sm font-bold text-blue-300">{globalItemNumber(item.id)}</span>
                          <div className="min-w-0">
                            <h3 className="break-words font-semibold leading-6">{item.requirement[locale]}</h3>
                            {item.critical && <span className="mt-2 inline-flex rounded-full border border-red-500/30 px-2 py-1 text-[10px] font-bold uppercase text-red-300">{isTurkish ? "Kritik" : "Critical"}</span>}
                          </div>
                        </div>
                        <div className="grid w-full grid-cols-3 gap-2 lg:w-auto lg:min-w-72">
                          {(["Yes", "No", "N/A"] as const).map((answer) => <button key={answer} type="button" onClick={() => updateAnswer(item.id, answer)} className={`min-h-11 rounded-lg border px-2 text-xs font-semibold transition sm:px-3 sm:text-sm ${selected === answer ? answer === "No" ? "border-red-400 bg-red-500/20 text-red-200" : "border-blue-400 bg-blue-500/20 text-blue-200" : "border-slate-700 text-slate-400 hover:border-slate-500"}`}>{isTurkish ? answer === "Yes" ? "Evet" : answer === "No" ? "Hayır" : "Uygulanamaz" : answer}</button>)}
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

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-2xl font-bold">{isTurkish ? "Denetim sonucu" : "Inspection result"}</h2><p className="mt-2 text-slate-400">{isTurkish ? "Canlı olarak hesaplanır." : "Calculated live from the inspection responses."}</p></div><p className={`text-2xl font-black ${criticalFailures.length ? "text-red-300" : isComplete ? "text-emerald-300" : "text-amber-300"}`}>{resultLabel}</p></div>
          <div className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-3"><span>{isTurkish ? "Evet" : "Yes"}: {yesCount}</span><span>{isTurkish ? "Hayır" : "No"}: {noCount}</span><span>{isTurkish ? "Uygulanamaz" : "N/A"}: {naCount}</span></div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold">{isTurkish ? "Denetim notları" : "Inspection comments"}</h2>
          <textarea value={comments} onChange={(event) => setComments(event.target.value)} rows={5} placeholder={isTurkish ? "Bulguları, faaliyetleri, sorumluları veya ek notları yazın..." : "Record findings, corrective actions, responsible persons or additional notes..."} className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-blue-500" />
        </section>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <button type="button" onClick={runSafetyAnalysis} disabled={answeredCount === 0 || isAiLoading || isPrintPreparing} className="rounded-2xl bg-emerald-600 px-6 py-4 font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40">{isTurkish ? "Güvenlik Analizi Yap" : "Analyze Safety"}</button>
          {isAiLoading ? (
            <button type="button" disabled className="inline-flex min-w-64 items-center justify-center gap-3 rounded-2xl border border-fuchsia-400/20 bg-gradient-to-r from-violet-700 via-fuchsia-700 to-purple-700 px-6 py-4 font-semibold text-white opacity-90">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              <span>{aiLoadingMessages[aiLoadingStage]}</span>
            </button>
          ) : (
            <PremiumAssessmentButton locale={locale} disabled={!analysis || isPrintPreparing} isPremiumUser={isPremiumUser} onPremiumClick={() => void generateAiAssessment()} />
          )}
          <button type="button" onClick={() => void printInspection()} disabled={isPrintPreparing || isAiLoading} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-wait disabled:opacity-60">{isPrintPreparing && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />}{isPrintPreparing ? (isTurkish ? "Rapor hazırlanıyor..." : "Preparing report...") : (isTurkish ? "Yazdır / PDF Kaydet" : "Print / Save PDF")}</button>
          <button type="button" onClick={resetInspection} disabled={isAiLoading || isPrintPreparing} className="rounded-2xl border border-slate-700 bg-slate-900 px-6 py-4 font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white disabled:opacity-40">{isTurkish ? "Denetimi sıfırla" : "Reset Inspection"}</button>
        </div>

        <div data-checklist-analysis className="scroll-mt-8"><ChecklistAnalysisPanel locale={locale} analysis={analysis} showPermitReadiness={false} showInternalFindingIds={false} /></div>

        {assessment && (
          <section data-ai-assessment className="mt-8 space-y-6 rounded-2xl border border-blue-500/30 bg-blue-500/5 p-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">AI {isTurkish ? "Yönetim Değerlendirmesi" : "Management Assessment"}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3"><h2 className="text-2xl font-bold">{displayDecision(assessment.workDecision)}</h2><span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-200">{assessmentStatusLabel}</span></div>
              <p className="mt-3 leading-7 text-slate-300">{localizedAiText(assessment.executiveSummary)}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-xl border border-slate-700 bg-slate-950/60 p-5"><p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{isTurkish ? "Genel risk derecesi" : "Overall Risk Rating"}</p><p className="mt-2 text-2xl font-black text-red-300">{displayRiskLevel(assessment.overallRiskRating.level)}</p><p className="mt-2 text-sm leading-6 text-slate-300">{localizedAiText(assessment.overallRiskRating.rationale)}</p></article>
              <article className="rounded-xl border border-slate-700 bg-slate-950/60 p-5"><p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{isTurkish ? "İş kararı" : "Work Decision"}</p><p className="mt-2 text-2xl font-black text-amber-300">{displayDecision(assessment.workDecision)}</p></article>
            </div>

            {riskSections.map(({ title, values }) => <article key={title} className="rounded-xl border border-slate-700 bg-slate-950/60 p-5"><h3 className="font-bold">{title}</h3>{values.length > 0 ? <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">{values.map((value, index) => <li key={`${title}-${index}-${value}`}>• {localizedAiText(value)}</li>)}</ul> : <p className="mt-3 text-sm text-slate-500">{isTurkish ? "Kayıt yok" : "None recorded"}</p>}</article>)}

            <div className="grid gap-5 lg:grid-cols-3">{actionSections.map(({ title, actions }) => <article key={title} className="rounded-xl border border-slate-700 bg-slate-950/60 p-5"><h3 className="font-bold">{title}</h3><div className="mt-4 space-y-4">{actions.map((action) => <div key={`${title}-${action.priority}-${action.action}`} className="border-l-2 border-blue-400 pl-3 text-sm"><p className="font-semibold text-slate-200">{action.priority}. {localizedAiText(action.action)}</p><p className="mt-1 text-slate-400">{localizedAiText(action.owner)} · {localizedAiText(action.timing)}</p><p className="mt-1 leading-6 text-slate-400">{localizedAiText(action.reason)}</p></div>)}</div></article>)}</div>

            <div className="grid gap-5 lg:grid-cols-2">
              <article className="rounded-xl border border-slate-700 bg-slate-950/60 p-5"><h3 className="font-bold">{isTurkish ? "Sorumlu Roller" : "Responsible Roles"}</h3><div className="mt-3 space-y-3 text-sm text-slate-300">{assessment.responsibleRoles.map((role, index) => <p key={`${role.role}-${index}`}><strong>{localizedAiText(role.role)}:</strong> {localizedAiText(role.responsibility)}</p>)}</div></article>
              <article className="rounded-xl border border-slate-700 bg-slate-950/60 p-5"><h3 className="font-bold">{isTurkish ? "Önerilen Takip Denetimi" : "Recommended Follow-Up Inspection"}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{localizedAiText(assessment.recommendedFollowUpInspection)}</p></article>
            </div>

            <article className="rounded-xl border border-blue-400/30 bg-blue-500/10 p-5"><h3 className="font-bold">{isTurkish ? "Yönetim Sonucu" : "Management Conclusion"}</h3><p className="mt-3 leading-7 text-slate-200">{localizedAiText(assessment.managementConclusion)}</p></article>
          </section>
        )}

        <footer className="mt-10 border-t border-slate-800 py-8 text-sm leading-6 text-slate-500"><p>{checklistDocument.disclaimer[locale]}</p><p className="mt-3 font-semibold">{isTurkish ? "SERNEM ile oluşturuldu" : "Generated with SERNEM"}</p></footer>
      </div>

      <div className="sernem-print-document hidden">
        <header className="sernem-report-header">
          <div>
            <p className="sernem-brand">SERNEM</p>
            <p className="sernem-brand-subtitle">{isTurkish ? "Profesyonel HSE Denetim Raporu" : "Professional HSE Inspection Report"}</p>
          </div>
          <div className="sernem-report-badge">{isPremiumUser && assessment ? (isTurkish ? "AI YÖNETİM ANALİZİ DAHİL" : "AI MANAGEMENT ASSESSMENT INCLUDED") : (isTurkish ? "STANDART RAPOR" : "STANDARD REPORT")}</div>
        </header>

        <section className="sernem-report-cover">
          <p className="sernem-report-category">{checklistDocument.category[locale]}</p>
          <h1>{checklistDocument.title[locale]}</h1>
          <p className="sernem-report-description">{checklistDocument.description[locale]}</p>
          <div className="sernem-meta-grid">
            {(Object.keys(fieldLabels) as (keyof InspectionDetails)[]).map((field) => <div key={field}><span>{fieldLabels[field]}</span><strong>{details[field] || "—"}</strong></div>)}
          </div>
          <div className="sernem-kpi-grid">
            <div><span>{isTurkish ? "Tamamlanma" : "Completion"}</span><strong>{progress}%</strong></div>
            <div><span>{isTurkish ? "Uygunluk" : "Compliance"}</span><strong>{complianceScore}%</strong></div>
            <div><span>{isTurkish ? "Uygunsuzluk" : "Findings"}</span><strong>{noCount}</strong></div>
            <div><span>{isTurkish ? "Kritik bulgu" : "Critical findings"}</span><strong>{criticalFailures.length}</strong></div>
          </div>
          <div className={`sernem-decision-banner ${criticalFailures.length ? "is-danger" : !isComplete ? "is-warning" : "is-safe"}`}><span>{isTurkish ? "Denetim sonucu" : "Inspection result"}</span><strong>{resultLabel}</strong></div>
        </section>

        <section className="sernem-report-section">
          <div className="sernem-section-heading"><span>01</span><div><h2>{isTurkish ? "Kontrol Maddeleri" : "Inspection Checklist"}</h2><p>{isTurkish ? "Denetim cevapları ve tespit edilen uygunsuzluklar" : "Inspection responses and identified non-conformities"}</p></div></div>
          {sections.map((section) => <div key={section.id} className="sernem-check-section"><h3>{section.title[locale]}</h3>{section.items.map((item) => { const answer = answers[item.id]; const action = correctiveActions[item.id]; return <article key={item.id} className={`sernem-check-row ${answer === "No" ? "has-finding" : ""}`}><div className="sernem-check-main"><span className="sernem-item-number">{globalItemNumber(item.id)}</span><div className="sernem-check-copy"><strong>{item.requirement[locale]}</strong>{item.critical && <small>{isTurkish ? "KRİTİK KONTROL" : "CRITICAL CONTROL"}</small>}</div><span className={`sernem-answer sernem-answer-${answer === "Yes" ? "yes" : answer === "No" ? "no" : answer === "N/A" ? "na" : "empty"}`}>{printAnswerLabel(answer)}</span></div>{answer === "No" && <div className="sernem-finding-box"><div><span>{isTurkish ? "Bulgu / Not" : "Finding / Remarks"}</span><p>{remarks[item.id] || "—"}</p></div><div><span>{isTurkish ? "Düzeltici Faaliyet" : "Corrective Action"}</span><p>{action?.action || item.correctiveAction[locale]}</p></div><div className="sernem-finding-meta"><p><span>{isTurkish ? "Sorumlu" : "Responsible"}</span>{action?.responsible || "—"}</p><p><span>{isTurkish ? "Hedef tarih" : "Target date"}</span>{action?.targetDate || "—"}</p></div></div>}</article>; })}</div>)}
        </section>

        {analysis && <section className="sernem-report-section"><div className="sernem-section-heading"><span>02</span><div><h2>{isTurkish ? "SERNEM Güvenlik Analizi" : "SERNEM Safety Analysis"}</h2><p>{isTurkish ? "Kural tabanlı denetim değerlendirmesi" : "Deterministic inspection assessment"}</p></div></div><div className="sernem-analysis-summary"><p>{analysis.summary}</p><div className="sernem-analysis-grid"><div><span>{isTurkish ? "Risk" : "Risk"}</span><strong>{displayRiskLevel(analysis.overallRisk)}</strong></div><div><span>{isTurkish ? "İş kararı" : "Work decision"}</span><strong>{analysis.workDecision === "Stop Work" ? (isTurkish ? "ÇALIŞMAYI DURDUR" : "STOP WORK") : analysis.workDecision === "Incomplete Assessment" ? (isTurkish ? "DEĞERLENDİRME TAMAMLANMADI" : "ASSESSMENT INCOMPLETE") : analysis.workDecision === "Proceed With Conditions" ? (isTurkish ? "KONTROLLERLE DEVAM" : "PROCEED WITH CONDITIONS") : (isTurkish ? "ÇALIŞMA DEVAM EDEBİLİR" : "WORK MAY PROCEED")}</strong></div><div><span>{isTurkish ? "Skor" : "Score"}</span><strong>{analysis.score}/100</strong></div></div>{analysis.recommendations.length > 0 && <div className="sernem-report-list"><h3>{isTurkish ? "Önerilen Aksiyonlar" : "Recommended Actions"}</h3><ol>{analysis.recommendations.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ol></div>}{analysis.references.length > 0 && <div className="sernem-reference-row">{analysis.references.map((reference) => <span key={reference}>{referenceLabel(reference)}</span>)}</div>}</div></section>}

        {isPremiumUser && assessment && <section className="sernem-report-section sernem-premium-section"><div className="sernem-section-heading"><span>03</span><div><h2>{isTurkish ? "AI Yönetim Değerlendirmesi" : "AI Management Assessment"}</h2><p>{isTurkish ? "Premium yönetim özeti ve aksiyon planı" : "Premium management summary and action plan"}</p></div></div><div className="sernem-premium-hero"><span>{assessmentStatusLabel}</span><strong>{displayDecision(assessment.workDecision)}</strong><p>{localizedAiText(assessment.executiveSummary)}</p></div><div className="sernem-premium-grid"><div><span>{isTurkish ? "Genel risk" : "Overall risk"}</span><strong>{displayRiskLevel(assessment.overallRiskRating.level)}</strong><p>{localizedAiText(assessment.overallRiskRating.rationale)}</p></div><div><span>{isTurkish ? "Yönetim sonucu" : "Management conclusion"}</span><p>{localizedAiText(assessment.managementConclusion)}</p></div></div>{actionSections.map(({ title, actions }) => actions.length > 0 && <div key={title} className="sernem-report-list"><h3>{title}</h3><ol>{actions.map((action) => <li key={`${title}-${action.priority}-${action.action}`}><strong>{localizedAiText(action.action)}</strong><small>{localizedAiText(action.owner)} · {localizedAiText(action.timing)}</small></li>)}</ol></div>)}</section>}

        <footer className="sernem-report-footer"><span>SERNEM • Professional HSE Platform</span><span>{isTurkish ? "Bu rapor saha doğrulamasını destekler; yürürlükteki mevzuat ve saha prosedürlerinin yerine geçmez." : "This report supports field verification and does not replace applicable legislation or site procedures."}</span></footer>
      </div>
    </main>
  );
}
