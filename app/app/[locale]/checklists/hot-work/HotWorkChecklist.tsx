"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { generateAssessment } from "@/lib/api/assessmentClient";
import { checklistItems } from "./checklistData";
import type { ProfessionalAssessmentOutput } from "@/lib/ai/assessmentTypes";
import { labels } from "./labels";
import {
  analyzeHotWorkChecklist,
  type ChecklistAnalysisResult,
  type ChecklistAnswer,
} from "../../../../lib/ai/analyzeChecklist";
import type { Answer, CorrectiveAction, Props } from "./types";

export default function HotWorkChecklist({ locale }: Props) {
  const t = labels[locale];
  const items = checklistItems[locale];

  const isPremiumUser = false;

  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [comments, setComments] = useState("");
  const [correctiveActions, setCorrectiveActions] = useState<
    Record<string, CorrectiveAction>
  >({});
  const [analysis, setAnalysis] =
    useState<ChecklistAnalysisResult | null>(null);
  const [professionalAssessment, setProfessionalAssessment] =
    useState<ProfessionalAssessmentOutput | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const answeredCount = items.filter(
    (item) => answers[item.id] !== null && answers[item.id] !== undefined,
  ).length;

  const applicableItems = items.filter((item) => answers[item.id] !== "na");

  const yesCount = applicableItems.filter(
    (item) => answers[item.id] === "yes",
  ).length;

  const noCount = items.filter((item) => answers[item.id] === "no").length;

  const naCount = items.filter((item) => answers[item.id] === "na").length;

  const findings = items.filter((item) => answers[item.id] === "no");

  const openActionCount = findings.filter(
    (item) => correctiveActions[item.id]?.status !== "closed",
  ).length;

  const highPriorityCount = findings.filter((item) => {
    const priority = correctiveActions[item.id]?.priority;
    return priority === "high" || priority === "critical";
  }).length;

  const criticalFailures = items.filter(
    (item) => item.critical && answers[item.id] === "no",
  );

  const progress = Math.round((answeredCount / items.length) * 100);

  const score =
    applicableItems.length > 0
      ? Math.round((yesCount / applicableItems.length) * 100)
      : 0;

  const isComplete = answeredCount === items.length;

  const result = useMemo(() => {
    if (!isComplete) {
      return {
        label: t.pending,
        text: t.pendingText,
        className: "border-amber-500/30 bg-amber-500/10 text-amber-200",
      };
    }

    if (criticalFailures.length > 0) {
      return {
        label: t.failed,
        text: t.failedText,
        className: "border-red-500/30 bg-red-500/10 text-red-200",
      };
    }

    return {
      label: t.passed,
      text: t.passedText,
      className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
    };
  }, [
    criticalFailures.length,
    isComplete,
    t.failed,
    t.failedText,
    t.passed,
    t.passedText,
    t.pending,
    t.pendingText,
  ]);

  const liveSafetyStatus = useMemo(() => {
    if (criticalFailures.length > 0) {
      return {
        label: t.unsafe,
        text: t.unsafeText,
        className: "border-red-500/40 bg-red-500/10 text-red-200",
        indicatorClassName: "bg-red-400",
      };
    }

    if (!isComplete) {
      return {
        label: t.warning,
        text: t.warningText,
        className: "border-amber-500/40 bg-amber-500/10 text-amber-200",
        indicatorClassName: "bg-amber-400",
      };
    }

    return {
      label: t.safe,
      text: t.safeText,
      className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
      indicatorClassName: "bg-emerald-400",
    };
  }, [
    criticalFailures.length,
    isComplete,
    t.safe,
    t.safeText,
    t.unsafe,
    t.unsafeText,
    t.warning,
    t.warningText,
  ]);

  const sections = Array.from(new Set(items.map((item) => item.section)));

  function updateAnswer(id: string, answer: Exclude<Answer, null>) {
    setAnswers((current) => ({
      ...current,
      [id]: answer,
    }));

    if (answer === "no") {
      setCorrectiveActions((current) => ({
        ...current,
        [id]: current[id] ?? {
          action: "",
          responsible: "",
          targetDate: "",
          priority: "medium",
          status: "open",
        },
      }));

      return;
    }

    setCorrectiveActions((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }

  function updateCorrectiveAction<K extends keyof CorrectiveAction>(
    id: string,
    field: K,
    value: CorrectiveAction[K],
  ) {
    setCorrectiveActions((current) => ({
      ...current,
      [id]: {
        action: current[id]?.action ?? "",
        responsible: current[id]?.responsible ?? "",
        targetDate: current[id]?.targetDate ?? "",
        priority: current[id]?.priority ?? "medium",
        status: current[id]?.status ?? "open",
        [field]: value,
      },
    }));
  }

  function runSafetyAnalysis() {
    const formattedAnswers: ChecklistAnswer[] = Object.entries(answers).map(
      ([id, answer]) => ({
        id,
        answer:
          answer === "yes"
            ? "Yes"
            : answer === "no"
              ? "No"
              : "N/A",
        remarks:
          answer === "no"
            ? correctiveActions[id]?.action || undefined
            : undefined,
      }),
    );

    const analysisResult = analyzeHotWorkChecklist(
      formattedAnswers,
      locale,
    );

    setAnalysis(analysisResult);
    setProfessionalAssessment(null);
    setIsAiLoading(false);
  }


  async function generateAiAssessment() {
    if (!analysis || isAiLoading) {
      alert(
        locale === "tr"
          ? "Önce Güvenlik Analizi Yap butonuna basın."
          : "Run Analyze Safety first.",
      );
      return;
    }

    setIsAiLoading(true);
    setProfessionalAssessment(null);

    const workDecision =
      analysis.workDecision === "Stop Work"
        ? "STOP WORK"
        : analysis.workDecision === "Proceed With Conditions"
          ? "PROCEED WITH CONDITIONS"
          : "APPROVED";

    try {
      const result = await generateAssessment({
        workType: analysis.checklistTitle || "Hot Work",
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
          severity: finding.riskLevel as
            | "Low"
            | "Medium"
            | "High"
            | "Critical",
          recommendation: finding.correctiveAction,
          reference: finding.references?.[0],
        })),
        recommendations: analysis.recommendations.map(
          (recommendation, index) => ({
            title: recommendation,
            priority: index + 1,
          }),
        ),
        references: analysis.references,
      });

      setProfessionalAssessment(result);

      setTimeout(() => {
        document
          .querySelector("[data-ai-assessment]")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (error) {
      console.error("AI Assessment Error:", error);

      alert(
        locale === "tr"
          ? "AI değerlendirmesi oluşturulamadı. API bağlantısını kontrol edin."
          : "AI assessment could not be generated. Check the API connection.",
      );
    } finally {
      setIsAiLoading(false);
    }
  }

  function handlePremiumAssessmentClick() {
    if (!isPremiumUser) {
      alert(
        locale === "tr"
          ? "🔒 Bu özellik Premium üyeler içindir."
          : "🔒 This feature is available to Premium members.",
      );
      return;
    }

    void generateAiAssessment();
  }

  function resetInspection() {
    setAnswers({});
    setComments("");
    setCorrectiveActions({});
    setAnalysis(null);
    setProfessionalAssessment(null);
    setIsAiLoading(false);
  }

  function getPriorityLabel(
    priority: CorrectiveAction["priority"] | undefined,
  ) {
    if (priority === "low") return t.priorityLow;
    if (priority === "high") return t.priorityHigh;
    if (priority === "critical") return t.priorityCritical;
    return t.priorityMedium;
  }

  function getPriorityClass(
    priority: CorrectiveAction["priority"] | undefined,
  ) {
    if (priority === "low") {
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-200";
    }

    if (priority === "high") {
      return "border-orange-500/30 bg-orange-500/10 text-orange-200";
    }

    if (priority === "critical") {
      return "border-red-500/30 bg-red-500/10 text-red-200";
    }

    return "border-amber-500/30 bg-amber-500/10 text-amber-200";
  }

  function getStatusLabel(status: CorrectiveAction["status"] | undefined) {
    if (status === "progress") return t.statusProgress;
    if (status === "closed") return t.statusClosed;
    return t.statusOpen;
  }

  function getStatusClass(status: CorrectiveAction["status"] | undefined) {
    if (status === "progress") {
      return "border-amber-500/30 bg-amber-500/10 text-amber-200";
    }

    if (status === "closed") {
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-200";
    }

    return "border-red-500/30 bg-red-500/10 text-red-200";
  }

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 text-white print:bg-white print:text-black">
      <div className="mx-auto max-w-7xl">
        <div className="print:hidden">
          <Link
            href={`/${locale}/checklists`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
          >
            ← {t.back}
          </Link>
        </div>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-7 shadow-2xl shadow-blue-950/20 sm:p-10 print:border-slate-300 print:bg-white print:shadow-none">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            {t.eyebrow}
          </p>

          <div className="mt-4 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {t.title}
              </h1>

              <p className="mt-5 text-lg leading-8 text-slate-400 print:text-slate-700">
                {t.subtitle}
              </p>
            </div>

            <div className="grid min-w-72 grid-cols-3 gap-3">
              <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4 print:border-slate-300 print:bg-white">
                <p className="text-xs text-slate-500">{t.progress}</p>
                <p className="mt-2 text-2xl font-bold">{progress}%</p>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4 print:border-slate-300 print:bg-white">
                <p className="text-xs text-slate-500">{t.score}</p>
                <p className="mt-2 text-2xl font-bold">{score}%</p>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4 print:border-slate-300 print:bg-white">
                <p className="text-xs text-slate-500">{t.findings}</p>
                <p className="mt-2 text-2xl font-bold">
                  {criticalFailures.length}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 h-3 overflow-hidden rounded-full bg-slate-800 print:border print:border-slate-300 print:bg-white">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div
            className={`mt-6 flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between ${liveSafetyStatus.className} print:border-slate-300 print:bg-white print:text-black`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`h-3 w-3 shrink-0 rounded-full ${liveSafetyStatus.indicatorClassName}`}
              />

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-75">
                  {t.liveStatus}
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {liveSafetyStatus.label}
                </p>
              </div>
            </div>

            <p className="max-w-2xl text-sm leading-6">
              {liveSafetyStatus.text}
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-4 rounded-3xl border border-slate-800 bg-slate-900 p-6 md:grid-cols-2 xl:grid-cols-3 print:border-slate-300 print:bg-white">
          {[
            [t.company, t.companyPlaceholder, "text"],
            [t.project, t.projectPlaceholder, "text"],
            [t.area, t.areaPlaceholder, "text"],
            [t.inspector, t.inspectorPlaceholder, "text"],
            [t.permit, t.permitPlaceholder, "text"],
            [t.date, "", "date"],
          ].map(([label, placeholder, type]) => (
            <label key={label} className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300 print:text-slate-700">
                {label}
              </span>

              <input
                type={type}
                placeholder={placeholder}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 print:border-slate-300 print:bg-white print:text-black"
              />
            </label>
          ))}
        </section>

        <div className="mt-8 space-y-8">
          {sections.map((section) => {
            const sectionItems = items.filter(
              (item) => item.section === section,
            );

            return (
              <section
                key={section}
                className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 print:break-inside-avoid print:border-slate-300 print:bg-white"
              >
                <div className="border-b border-slate-800 bg-slate-900/80 px-6 py-5 print:border-slate-300 print:bg-slate-100">
                  <h2 className="text-xl font-bold">{section}</h2>
                </div>

                <div className="divide-y divide-slate-800 print:divide-slate-300">
                  {sectionItems.map((item) => {
                    const selected = answers[item.id];

                    return (
                      <div
                        key={item.id}
                        className="grid gap-5 p-6 lg:grid-cols-[1fr_auto] lg:items-center"
                      >
                        <div className="flex gap-4">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-bold text-blue-300 print:border print:border-slate-300 print:bg-white print:text-black">
                            {items.indexOf(item) + 1}
                          </span>

                          <div>
                            <p className="leading-7 text-slate-200 print:text-black">
                              {item.text}
                            </p>

                            {item.critical && (
                              <span className="mt-2 inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300 print:border-red-400 print:bg-white print:text-red-700">
                                {t.critical}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 print:hidden">
                          {[
                            ["yes", t.yes],
                            ["no", t.no],
                            ["na", t.na],
                          ].map(([value, label]) => {
                            const isSelected = selected === value;

                            const selectedClass =
                              value === "yes"
                                ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
                                : value === "no"
                                  ? "border-red-400 bg-red-500/20 text-red-200"
                                  : "border-slate-400 bg-slate-500/20 text-slate-200";

                            return (
                              <button
                                key={value}
                                type="button"
                                onClick={() =>
                                  updateAnswer(
                                    item.id,
                                    value as Exclude<Answer, null>,
                                  )
                                }
                                className={`min-w-20 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                                  isSelected
                                    ? selectedClass
                                    : "border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-500 hover:text-white"
                                }`}
                              >
                                {label}
                              </button>
                            );
                          })}
                        </div>

                        <div className="hidden print:block">
                          <p className="font-semibold">
                            {selected === "yes"
                              ? t.yes
                              : selected === "no"
                                ? t.no
                                : selected === "na"
                                  ? t.na
                                  : "—"}
                          </p>
                        </div>

                        {selected === "no" && (
                          <div className="lg:col-span-2">
                            <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-5 print:border-red-300 print:bg-white">
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                  <div className="flex flex-wrap items-center gap-3">
                                    <h3 className="font-bold text-red-200 print:text-red-700">
                                      {t.correctiveAction}
                                    </h3>

                                    <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-200 print:border-red-300 print:bg-white print:text-red-700">
                                      {t.openFinding}
                                    </span>
                                  </div>

                                  <p className="mt-2 text-sm leading-6 text-slate-400 print:text-slate-700">
                                    {t.correctiveActionHelp}
                                  </p>
                                </div>
                              </div>

                              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                                <label className="block lg:col-span-2">
                                  <span className="mb-2 block text-sm font-medium text-slate-300 print:text-slate-700">
                                    {t.actionRequired}
                                  </span>

                                  <textarea
                                    value={
                                      correctiveActions[item.id]?.action ?? ""
                                    }
                                    onChange={(event) =>
                                      updateCorrectiveAction(
                                        item.id,
                                        "action",
                                        event.target.value,
                                      )
                                    }
                                    placeholder={t.actionPlaceholder}
                                    rows={3}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-red-400 focus:ring-4 focus:ring-red-500/10 print:border-slate-300 print:bg-white print:text-black"
                                  />
                                </label>

                                <label className="block">
                                  <span className="mb-2 block text-sm font-medium text-slate-300 print:text-slate-700">
                                    {t.responsiblePerson}
                                  </span>

                                  <input
                                    type="text"
                                    value={
                                      correctiveActions[item.id]?.responsible ??
                                      ""
                                    }
                                    onChange={(event) =>
                                      updateCorrectiveAction(
                                        item.id,
                                        "responsible",
                                        event.target.value,
                                      )
                                    }
                                    placeholder={t.responsiblePlaceholder}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-red-400 focus:ring-4 focus:ring-red-500/10 print:border-slate-300 print:bg-white print:text-black"
                                  />
                                </label>

                                <label className="block">
                                  <span className="mb-2 block text-sm font-medium text-slate-300 print:text-slate-700">
                                    {t.targetDate}
                                  </span>

                                  <input
                                    type="date"
                                    value={
                                      correctiveActions[item.id]?.targetDate ??
                                      ""
                                    }
                                    onChange={(event) =>
                                      updateCorrectiveAction(
                                        item.id,
                                        "targetDate",
                                        event.target.value,
                                      )
                                    }
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-500/10 print:border-slate-300 print:bg-white print:text-black"
                                  />
                                </label>

                                <label className="block">
                                  <span className="mb-2 block text-sm font-medium text-slate-300 print:text-slate-700">
                                    {t.priority}
                                  </span>

                                  <select
                                    value={
                                      correctiveActions[item.id]?.priority ??
                                      "medium"
                                    }
                                    onChange={(event) =>
                                      updateCorrectiveAction(
                                        item.id,
                                        "priority",
                                        event.target
                                          .value as CorrectiveAction["priority"],
                                      )
                                    }
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-500/10 print:border-slate-300 print:bg-white print:text-black"
                                  >
                                    <option value="low">{t.priorityLow}</option>
                                    <option value="medium">
                                      {t.priorityMedium}
                                    </option>
                                    <option value="high">
                                      {t.priorityHigh}
                                    </option>
                                    <option value="critical">
                                      {t.priorityCritical}
                                    </option>
                                  </select>
                                </label>

                                <label className="block">
                                  <span className="mb-2 block text-sm font-medium text-slate-300 print:text-slate-700">
                                    {t.findingStatus}
                                  </span>

                                  <select
                                    value={
                                      correctiveActions[item.id]?.status ??
                                      "open"
                                    }
                                    onChange={(event) =>
                                      updateCorrectiveAction(
                                        item.id,
                                        "status",
                                        event.target
                                          .value as CorrectiveAction["status"],
                                      )
                                    }
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-500/10 print:border-slate-300 print:bg-white print:text-black"
                                  >
                                    <option value="open">{t.statusOpen}</option>
                                    <option value="progress">
                                      {t.statusProgress}
                                    </option>
                                    <option value="closed">
                                      {t.statusClosed}
                                    </option>
                                  </select>
                                </label>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-7 print:border-slate-300 print:bg-white">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
              {t.inspectionSummary}
            </p>

            <p className="mt-3 max-w-3xl leading-7 text-slate-400 print:text-slate-700">
              {t.summaryDescription}
            </p>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [t.totalQuestions, items.length],
              [t.answeredQuestions, answeredCount],
              [t.yesAnswers, yesCount],
              [t.noAnswers, noCount],
              [t.naAnswers, naCount],
              [t.completionRate, `${progress}%`],
              [t.complianceRate, `${score}%`],
              [t.findings, criticalFailures.length],
              [t.openActions, openActionCount],
              [t.highPriorityFindings, highPriorityCount],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-700 bg-slate-950 p-5 print:border-slate-300 print:bg-white"
              >
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-bold">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-7 print:border-slate-300 print:bg-white">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
              {t.findingsSummary}
            </p>

            <p className="mt-3 max-w-3xl leading-7 text-slate-400 print:text-slate-700">
              {t.findingsDescription}
            </p>
          </div>

          {findings.length === 0 ? (
            <div className="mt-7 rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-8 text-center print:border-slate-300 print:bg-white">
              <p className="text-xl font-bold">{t.noFindings}</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {t.noFindingsDescription}
              </p>
            </div>
          ) : (
            <div className="mt-7 grid gap-5 lg:grid-cols-2">
              {findings.map((item, index) => {
                const action = correctiveActions[item.id];

                return (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-red-500/25 bg-red-500/5 p-6 print:break-inside-avoid print:border-slate-300 print:bg-white"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="max-w-xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-300 print:text-red-700">
                          {t.findingNumber} #{index + 1}
                        </p>

                        <h3 className="mt-3 text-lg font-bold leading-7">
                          {item.text}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${getPriorityClass(
                            action?.priority,
                          )}`}
                        >
                          {getPriorityLabel(action?.priority)}
                        </span>

                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClass(
                            action?.status,
                          )}`}
                        >
                          {getStatusLabel(action?.status)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 rounded-xl border border-slate-700 bg-slate-950 p-4 print:border-slate-300 print:bg-white">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                        {t.correctiveAction}
                      </p>

                      <p className="mt-2 leading-7 text-slate-300 print:text-black">
                        {action?.action || t.correctiveActionMissing}
                      </p>
                    </div>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-sm text-slate-500">
                          {t.responsiblePerson}
                        </p>
                        <p className="mt-1 font-semibold">
                          {action?.responsible || t.notAssigned}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-slate-500">{t.targetDate}</p>
                        <p className="mt-1 font-semibold">
                          {action?.targetDate || t.noTargetDate}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section
          className={`mt-8 rounded-3xl border p-7 ${result.className} print:border-slate-300 print:bg-white print:text-black`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em]">
            {t.result}
          </p>

          <h2 className="mt-3 text-3xl font-bold">{result.label}</h2>
          <p className="mt-3 leading-7">{result.text}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm opacity-70">{t.completed}</p>
              <p className="mt-1 text-2xl font-bold">
                {answeredCount}/{items.length}
              </p>
            </div>

            <div>
              <p className="text-sm opacity-70">{t.score}</p>
              <p className="mt-1 text-2xl font-bold">{score}%</p>
            </div>

            <div>
              <p className="text-sm opacity-70">{t.findings}</p>
              <p className="mt-1 text-2xl font-bold">
                {criticalFailures.length}
              </p>
            </div>
          </div>
        </section>

               {analysis && (
          <section className="mt-8 overflow-hidden rounded-3xl border border-blue-500/30 bg-blue-500/5 print:border-slate-300 print:bg-white">
            <div className="border-b border-blue-500/20 bg-slate-950/40 p-7 sm:p-8 print:border-slate-300 print:bg-white">
              <div className="flex flex-col gap-7 xl:flex-row xl:items-start xl:justify-between">
                <div className="max-w-4xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                      {locale === "tr"
                        ? "SafeBase Profesyonel Güvenlik Değerlendirmesi"
                        : "SafeBase Professional Safety Assessment"}
                    </p>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${
                        analysis.assessmentStatus === "Complete"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                          : "border-amber-500/30 bg-amber-500/10 text-amber-200"
                      } print:border-slate-300 print:bg-white print:text-black`}
                    >
                      {analysis.assessmentStatus === "Complete"
                        ? locale === "tr"
                          ? "Tam Değerlendirme"
                          : "Complete Assessment"
                        : locale === "tr"
                          ? "Kısmi Değerlendirme"
                          : "Partial Assessment"}
                    </span>
                  </div>

                  <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                    {locale === "tr"
                      ? "Kontrol Listesi Yönetici Özeti"
                      : "Checklist Executive Summary"}
                  </h2>

                  <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 print:text-slate-700">
                    {analysis.summary}
                  </p>
                </div>

                <div
                  className={`min-w-full rounded-3xl border p-6 text-center shadow-lg xl:min-w-80 ${
                    analysis.workDecision === "Stop Work"
                      ? "border-red-500/40 bg-red-500/10 text-red-100 shadow-red-950/20"
                      : analysis.workDecision === "Incomplete Assessment"
                        ? "border-amber-500/40 bg-amber-500/10 text-amber-100 shadow-amber-950/20"
                        : analysis.workDecision === "Proceed With Conditions"
                          ? "border-orange-500/40 bg-orange-500/10 text-orange-100 shadow-orange-950/20"
                          : "border-emerald-500/40 bg-emerald-500/10 text-emerald-100 shadow-emerald-950/20"
                  } print:border-slate-300 print:bg-white print:text-black`}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-75">
                    {locale === "tr" ? "Çalışma Kararı" : "Work Decision"}
                  </p>

                  <p className="mt-3 text-3xl font-black uppercase tracking-tight">
                    {analysis.workDecision === "Stop Work"
                      ? locale === "tr"
                        ? "🛑 İŞİ DURDUR"
                        : "🛑 STOP WORK"
                      : analysis.workDecision === "Incomplete Assessment"
                        ? locale === "tr"
                          ? "⚠️ DEĞERLENDİRME EKSİK"
                          : "⚠️ ASSESSMENT INCOMPLETE"
                        : analysis.workDecision === "Proceed With Conditions"
                          ? locale === "tr"
                            ? "🟠 KOŞULLU DEVAM"
                            : "🟠 PROCEED WITH CONDITIONS"
                          : locale === "tr"
                            ? "✅ ÇALIŞMA DEVAM EDEBİLİR"
                            : "✅ WORK MAY PROCEED"}
                  </p>

                  <p className="mt-4 text-sm leading-6 opacity-80">
                    {analysis.workDecision === "Stop Work"
                      ? locale === "tr"
                        ? "Belirlenen yüksek veya kritik riskler kapatılmadan çalışma başlatılmamalıdır."
                        : "Work must not start until the identified high or critical risks are closed."
                      : analysis.workDecision === "Incomplete Assessment"
                        ? locale === "tr"
                          ? "Nihai karar verilmeden önce kalan kontrol maddeleri değerlendirilmelidir."
                          : "The remaining checklist items must be assessed before a final decision is made."
                        : analysis.workDecision === "Proceed With Conditions"
                          ? locale === "tr"
                            ? "Çalışma yalnızca belirlenen düzeltici faaliyetler ve kontroller uygulanarak sürdürülebilir."
                            : "Work may proceed only with the identified corrective actions and controls in place."
                          : locale === "tr"
                            ? "Mevcut değerlendirmeye göre çalışmanın devam etmesini engelleyen açık bir bulgu bulunmamaktadır."
                            : "The current assessment identified no open finding preventing the work from proceeding."}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                <div className="rounded-2xl border border-slate-700 bg-slate-950 p-5 print:border-slate-300 print:bg-white">
                  <p className="text-sm text-slate-500">
                    {locale === "tr" ? "Tamamlanma" : "Completion"}
                  </p>

                  <p className="mt-2 text-3xl font-bold">
                    {analysis.completionRate}%
                  </p>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800 print:border print:border-slate-300 print:bg-white">
                    <div
                      className="h-full rounded-full bg-blue-500 transition-all duration-500"
                      style={{
                        width: `${analysis.completionRate}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-950 p-5 print:border-slate-300 print:bg-white">
                  <p className="text-sm text-slate-500">
                    {locale === "tr" ? "Güvenlik Skoru" : "Safety Score"}
                  </p>

                  <p className="mt-2 text-3xl font-bold">
                    {analysis.score}
                    <span className="text-lg text-slate-500">/100</span>
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-950 p-5 print:border-slate-300 print:bg-white">
                  <p className="text-sm text-slate-500">
                    {locale === "tr" ? "Genel Risk" : "Overall Risk"}
                  </p>

                  <p
                    className={`mt-2 text-3xl font-bold ${
                      analysis.overallRisk === "Critical"
                        ? "text-red-300"
                        : analysis.overallRisk === "High"
                          ? "text-orange-300"
                          : analysis.overallRisk === "Medium"
                            ? "text-amber-300"
                            : "text-emerald-300"
                    } print:text-black`}
                  >
                    {analysis.overallRisk === "Critical"
                      ? "🔴 "
                      : analysis.overallRisk === "High"
                        ? "🟠 "
                        : analysis.overallRisk === "Medium"
                          ? "🟡 "
                          : "🟢 "}
                    {analysis.overallRisk}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-950 p-5 print:border-slate-300 print:bg-white">
                  <p className="text-sm text-slate-500">
                    {locale === "tr" ? "Uygunsuzluk" : "Findings"}
                  </p>

                  <p className="mt-2 text-3xl font-bold">
                    {analysis.nonCompliantItems}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-950 p-5 print:border-slate-300 print:bg-white">
                  <p className="text-sm text-slate-500">
                    {locale === "tr"
                      ? "Kritik Bulgular"
                      : "Critical Findings"}
                  </p>

                  <p className="mt-2 text-3xl font-bold text-red-300 print:text-black">
                    {analysis.criticalFindings.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-7 rounded-2xl border border-slate-700 bg-slate-950 p-6 print:border-slate-300 print:bg-white">
  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">
        {locale === "tr"
          ? "Bulgu Şiddet Dağılımı"
          : "Finding Severity Breakdown"}
      </p>

      <h3 className="mt-2 text-2xl font-bold">
        {locale === "tr"
          ? "Risk Seviyelerine Göre Bulgular"
          : "Findings by Risk Level"}
      </h3>
    </div>

    <p className="text-sm text-slate-500">
      {locale === "tr"
        ? `Toplam ${analysis.findings.length} bulgu`
        : `${analysis.findings.length} total finding(s)`}
    </p>
  </div>

  <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {[
      {
        label: locale === "tr" ? "Kritik" : "Critical",
        value: analysis.severityBreakdown.Critical,
        icon: "🔴",
        className:
          "border-red-500/30 bg-red-500/10 text-red-200",
      },
      {
        label: locale === "tr" ? "Yüksek" : "High",
        value: analysis.severityBreakdown.High,
        icon: "🟠",
        className:
          "border-orange-500/30 bg-orange-500/10 text-orange-200",
      },
      {
        label: locale === "tr" ? "Orta" : "Medium",
        value: analysis.severityBreakdown.Medium,
        icon: "🟡",
        className:
          "border-amber-500/30 bg-amber-500/10 text-amber-200",
      },
      {
        label: locale === "tr" ? "Düşük" : "Low",
        value: analysis.severityBreakdown.Low,
        icon: "🟢",
        className:
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
      },
    ].map((severity) => (
      <div
        key={severity.label}
        className={`rounded-2xl border p-5 ${severity.className} print:border-slate-300 print:bg-white print:text-black`}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.12em]">
            {severity.label}
          </p>

          <span className="text-xl" aria-hidden="true">
            {severity.icon}
          </span>
        </div>

        <p className="mt-3 text-4xl font-black">
          {severity.value}
        </p>

        <p className="mt-2 text-xs opacity-75">
          {locale === "tr"
            ? "Aktif analiz bulgusu"
            : "Active analysis finding"}
        </p>
      </div>
    ))}
  </div>
</div>

<div className="mt-7 rounded-2xl border border-slate-700 bg-slate-950 p-6 print:border-slate-300 print:bg-white">
  <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">
        {locale === "tr" ? "İzin Hazırlık Durumu" : "Permit Readiness"}
      </p>

      <h3 className="mt-2 text-2xl font-bold">
        {analysis.permitReadiness >= 85
          ? locale === "tr"
            ? "Yetkilendirmeye Hazır"
            : "Ready for Authorization"
          : analysis.permitReadiness >= 60
            ? locale === "tr"
              ? "Koşullu Olarak Hazır"
              : "Conditionally Ready"
            : locale === "tr"
              ? "İzin İçin Hazır Değil"
              : "Not Ready for Permit"}
      </h3>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400 print:text-slate-700">
        {locale === "tr"
          ? "Bu değer; kontrol listesi tamamlanma oranı ve açık bulguların risk seviyeleri dikkate alınarak hesaplanır."
          : "This value is calculated using checklist completion and the risk severity of open findings."}
      </p>
    </div>

    <div className="text-left lg:text-right">
      <p
        className={`text-5xl font-black ${
          analysis.permitReadiness >= 85
            ? "text-emerald-300"
            : analysis.permitReadiness >= 60
              ? "text-amber-300"
              : "text-red-300"
        } print:text-black`}
      >
        {analysis.permitReadiness}%
      </p>

      <p className="mt-1 text-sm text-slate-500">
        {locale === "tr" ? "Hazırlık puanı" : "Readiness score"}
      </p>
    </div>
  </div>

  <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-800 print:border print:border-slate-300 print:bg-white">
    <div
      className={`h-full rounded-full transition-all duration-700 ${
        analysis.permitReadiness >= 85
          ? "bg-emerald-500"
          : analysis.permitReadiness >= 60
            ? "bg-amber-500"
            : "bg-red-500"
      }`}
      style={{ width: `${analysis.permitReadiness}%` }}
    />
  </div>

  <div className="mt-3 flex justify-between text-xs font-medium text-slate-500">
    <span>0%</span>
    <span>60%</span>
    <span>85%</span>
    <span>100%</span>
  </div>

  <div className="mt-5 grid gap-3 sm:grid-cols-3">
    <div
      className={`rounded-xl border p-4 ${
        analysis.permitReadiness < 60
          ? "border-red-500/40 bg-red-500/10 text-red-200"
          : "border-slate-700 text-slate-500"
      } print:border-slate-300 print:bg-white print:text-black`}
    >
      <p className="text-sm font-bold">
        {locale === "tr" ? "Hazır Değil" : "Not Ready"}
      </p>
      <p className="mt-1 text-xs opacity-75">0–59%</p>
    </div>

    <div
      className={`rounded-xl border p-4 ${
        analysis.permitReadiness >= 60 &&
        analysis.permitReadiness < 85
          ? "border-amber-500/40 bg-amber-500/10 text-amber-200"
          : "border-slate-700 text-slate-500"
      } print:border-slate-300 print:bg-white print:text-black`}
    >
      <p className="text-sm font-bold">
        {locale === "tr" ? "Koşullu Hazır" : "Conditionally Ready"}
      </p>
      <p className="mt-1 text-xs opacity-75">60–84%</p>
    </div>

    <div
      className={`rounded-xl border p-4 ${
        analysis.permitReadiness >= 85
          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
          : "border-slate-700 text-slate-500"
      } print:border-slate-300 print:bg-white print:text-black`}
    >
      <p className="text-sm font-bold">
        {locale === "tr"
          ? "Yetkilendirmeye Hazır"
          : "Ready for Authorization"}
      </p>
      <p className="mt-1 text-xs opacity-75">85–100%</p>
    </div>
  </div>
</div>

            <div className="mt-7 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-700 bg-slate-950 p-6 print:border-slate-300 print:bg-white">
                <h3 className="text-lg font-bold">
                  {locale === "tr"
                    ? "Önerilen Aksiyonlar"
                    : "Recommended Actions"}
                </h3>

                <div className="mt-4 space-y-3">
                  {analysis.recommendations.map((recommendation, index) => (
                    <div
                      key={`${recommendation}-${index}`}
                      className="flex gap-3"
                    >
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-xs font-bold text-blue-300">
                        {index + 1}
                      </span>
                      <p className="leading-7 text-slate-300 print:text-black">
                        {recommendation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-950 p-6 print:border-slate-300 print:bg-white">
                <h3 className="text-lg font-bold">
                  {locale === "tr"
                    ? "Referanslar"
                    : "References"}
                </h3>

                {analysis.references.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {analysis.references.map((reference) => (
                      <span
                        key={reference}
                        className="rounded-full border border-slate-700 px-3 py-2 text-sm text-slate-300 print:border-slate-300 print:text-black"
                      >
                        {reference}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-slate-500">
                    {locale === "tr"
                      ? "Aktif bulgular için referans bulunmuyor."
                      : "No references are associated with active findings."}
                  </p>
                )}
              </div>
            </div>

            {analysis.findings.length > 0 && (
              <div className="mt-7">
                <h3 className="text-xl font-bold">
                  {locale === "tr"
                    ? "Analiz Bulguları"
                    : "Analysis Findings"}
                </h3>

                <div className="mt-5 grid gap-5 lg:grid-cols-2">
                  {analysis.findings.map((finding) => (
                    <article
                      key={finding.id}
                      className="rounded-2xl border border-red-500/25 bg-red-500/5 p-6 print:break-inside-avoid print:border-slate-300 print:bg-white"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-red-300 print:text-red-700">
                            {finding.id}
                          </p>
                          <h4 className="mt-2 font-bold leading-7">
                            {finding.requirement}
                          </h4>
                        </div>

                        <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-200 print:bg-white print:text-red-700">
                          {finding.riskLevel}
                        </span>
                      </div>

                      <div className="mt-5 space-y-4 text-sm leading-6">
                        <div>
                          <p className="font-semibold text-slate-400">
                            {locale === "tr" ? "Rehberlik" : "Guidance"}
                          </p>
                          <p className="mt-1 text-slate-300 print:text-black">
                            {finding.guidance}
                          </p>
                        </div>

                        <div>
                          <p className="font-semibold text-slate-400">
                            {locale === "tr"
                              ? "Düzeltici Faaliyet"
                              : "Corrective Action"}
                          </p>
                          <p className="mt-1 text-slate-300 print:text-black">
                            {finding.correctiveAction}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {isAiLoading && (
          <section className="mt-8 rounded-3xl border border-violet-500/30 bg-violet-500/5 p-7 print:hidden">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/15 text-2xl">
                🤖
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-300">
                  {locale === "tr"
                    ? "SafeBase AI çalışıyor"
                    : "SafeBase AI is working"}
                </p>

                <p className="mt-2 text-slate-300">
                  {locale === "tr"
                    ? "Profesyonel HSE değerlendirmesi hazırlanıyor..."
                    : "Generating the professional HSE assessment..."}
                </p>
              </div>
            </div>
          </section>
        )}

        {professionalAssessment && (
          <section data-ai-assessment className="mt-8 overflow-hidden rounded-3xl border border-violet-500/30 bg-violet-500/5 print:border-slate-300 print:bg-white">
            <div className="border-b border-violet-500/20 bg-slate-950/40 p-7 sm:p-8 print:border-slate-300 print:bg-white">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                <div className="max-w-4xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
                      {locale === "tr"
                        ? "SafeBase AI Profesyonel Değerlendirmesi"
                        : "SafeBase AI Professional Assessment"}
                    </p>

                    <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-violet-200 print:border-slate-300 print:bg-white print:text-black">
                      GPT-5 MINI
                    </span>
                  </div>

                  <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                    {locale === "tr"
                      ? "Yönetici Değerlendirmesi"
                      : "Executive Assessment"}
                  </h2>

                  <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300 print:text-slate-700">
                    {professionalAssessment.executiveAssessment}
                  </p>
                </div>

                <div
                  className={`min-w-full rounded-3xl border p-6 text-center shadow-lg xl:min-w-80 ${
                    professionalAssessment.finalRecommendation === "STOP WORK"
                      ? "border-red-500/40 bg-red-500/10 text-red-100 shadow-red-950/20"
                      : professionalAssessment.finalRecommendation ===
                          "PROCEED WITH CONDITIONS"
                        ? "border-orange-500/40 bg-orange-500/10 text-orange-100 shadow-orange-950/20"
                        : "border-emerald-500/40 bg-emerald-500/10 text-emerald-100 shadow-emerald-950/20"
                  } print:border-slate-300 print:bg-white print:text-black`}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-75">
                    {locale === "tr"
                      ? "Nihai AI Tavsiyesi"
                      : "Final AI Recommendation"}
                  </p>

                  <p className="mt-3 text-3xl font-black uppercase tracking-tight">
                    {professionalAssessment.finalRecommendation === "STOP WORK"
                      ? locale === "tr"
                        ? "🛑 İŞİ DURDUR"
                        : "🛑 STOP WORK"
                      : professionalAssessment.finalRecommendation ===
                          "PROCEED WITH CONDITIONS"
                        ? locale === "tr"
                          ? "🟠 KOŞULLU DEVAM"
                          : "🟠 PROCEED WITH CONDITIONS"
                        : locale === "tr"
                          ? "✅ ONAYLANDI"
                          : "✅ APPROVED"}
                  </p>

                  <p className="mt-4 text-xs leading-5 opacity-75">
                    {locale === "tr"
                      ? "AI sonucu, SafeBase kural motorunun kararını değiştirmez."
                      : "The AI assessment does not override the SafeBase rule-engine decision."}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 p-7 sm:p-8 xl:grid-cols-2">
              <article className="rounded-2xl border border-slate-700 bg-slate-950 p-6 print:border-slate-300 print:bg-white">
                <h3 className="text-xl font-bold">
                  {locale === "tr"
                    ? "Operasyonel Risk"
                    : "Operational Risk"}
                </h3>

                <p className="mt-4 leading-7 text-slate-300 print:text-black">
                  {professionalAssessment.operationalRisk}
                </p>
              </article>

              <article className="rounded-2xl border border-slate-700 bg-slate-950 p-6 print:border-slate-300 print:bg-white">
                <h3 className="text-xl font-bold">
                  {locale === "tr"
                    ? "Muhtemel Sonuçlar"
                    : "Potential Consequences"}
                </h3>

                <div className="mt-4 space-y-3">
                  {professionalAssessment.potentialConsequences.map(
                    (consequence, index) => (
                      <div
                        key={`${consequence}-${index}`}
                        className="flex gap-3"
                      >
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-xs font-bold text-red-300">
                          {index + 1}
                        </span>

                        <p className="leading-7 text-slate-300 print:text-black">
                          {consequence}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </article>

              {professionalAssessment.criticalConcerns.length > 0 && (
                <article className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6 print:border-slate-300 print:bg-white">
                  <h3 className="text-xl font-bold text-red-200 print:text-black">
                    {locale === "tr"
                      ? "Kritik Endişeler"
                      : "Critical Concerns"}
                  </h3>

                  <div className="mt-4 space-y-3">
                    {professionalAssessment.criticalConcerns.map(
                      (concern, index) => (
                        <div key={`${concern}-${index}`} className="flex gap-3">
                          <span className="mt-1 text-red-300">●</span>

                          <p className="leading-7 text-slate-300 print:text-black">
                            {concern}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </article>
              )}

              {professionalAssessment.positiveFindings.length > 0 && (
                <article className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 print:border-slate-300 print:bg-white">
                  <h3 className="text-xl font-bold text-emerald-200 print:text-black">
                    {locale === "tr"
                      ? "Olumlu Bulgular"
                      : "Positive Findings"}
                  </h3>

                  <div className="mt-4 space-y-3">
                    {professionalAssessment.positiveFindings.map(
                      (finding, index) => (
                        <div key={`${finding}-${index}`} className="flex gap-3">
                          <span className="mt-1 text-emerald-300">✓</span>

                          <p className="leading-7 text-slate-300 print:text-black">
                            {finding}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </article>
              )}
            </div>

            <div className="border-t border-violet-500/20 p-7 sm:p-8 print:border-slate-300">
              <h3 className="text-2xl font-bold">
                {locale === "tr"
                  ? "Öncelikli Aksiyon Planı"
                  : "Priority Action Plan"}
              </h3>

              <div className="mt-5 space-y-4">
                {professionalAssessment.priorityActions.map((item) => (
                  <article
                    key={`${item.priority}-${item.action}`}
                    className="rounded-2xl border border-slate-700 bg-slate-950 p-6 print:break-inside-avoid print:border-slate-300 print:bg-white"
                  >
                    <div className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15 text-lg font-black text-violet-200">
                        {item.priority}
                      </span>

                      <div>
                        <h4 className="text-lg font-bold">{item.action}</h4>

                        <p className="mt-3 leading-7 text-slate-400 print:text-slate-700">
                          <span className="font-semibold text-slate-300 print:text-black">
                            {locale === "tr" ? "Gerekçe: " : "Reason: "}
                          </span>
                          {item.reason}
                        </p>

                        {item.reference && (
                          <p className="mt-3 text-sm text-blue-300 print:text-black">
                            <span className="font-semibold">
                              {locale === "tr" ? "Referans: " : "Reference: "}
                            </span>
                            {item.reference}
                          </p>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="border-t border-violet-500/20 p-7 sm:p-8 print:border-slate-300">
              <h3 className="text-xl font-bold">
                {locale === "tr"
                  ? "Uygulanabilir Standartlar"
                  : "Applicable Standards"}
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {professionalAssessment.applicableStandards.map((standard) => (
                  <span
                    key={standard}
                    className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-200 print:border-slate-300 print:bg-white print:text-black"
                  >
                    {standard}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-7 print:border-slate-300 print:bg-white">
          <label htmlFor="inspection-comments">
            <span className="block text-lg font-bold">{t.comments}</span>

            <textarea
              id="inspection-comments"
              value={comments}
              onChange={(event) => setComments(event.target.value)}
              placeholder={t.commentsPlaceholder}
              rows={6}
              className="mt-4 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 print:border-slate-300 print:bg-white print:text-black"
            />
          </label>
        </section>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row print:hidden">
          <button
            type="button"
            onClick={runSafetyAnalysis}
            disabled={answeredCount === 0 || isAiLoading}
            className="rounded-2xl bg-violet-600 px-6 py-4 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isAiLoading
              ? locale === "tr"
                ? "🤖 AI Değerlendirmesi Hazırlanıyor..."
                : "🤖 Generating AI Assessment..."
              : locale === "tr"
                ? "🤖 Güvenlik Analizi Yap"
                : "🤖 Analyze Safety"}
          </button>
          <button
  type="button"
  onClick={handlePremiumAssessmentClick}
  className="rounded-2xl bg-fuchsia-600 px-6 py-4 font-semibold text-white transition hover:bg-fuchsia-500 disabled:cursor-not-allowed disabled:opacity-40"
>
  {locale === "tr"
    ? "🔒 AI Değerlendirmesi (Premium)"
    : "🔒 Generate AI Assessment (Premium)"}
</button>

          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-500"
          >
            {t.print}
          </button>

          <button
            type="button"
            onClick={resetInspection}
            className="rounded-2xl border border-slate-700 bg-slate-900 px-6 py-4 font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
          >
            {t.reset}
          </button>
        </div>

        <footer className="mt-10 border-t border-slate-800 py-8 text-sm leading-6 text-slate-500 print:border-slate-300 print:text-slate-700">
          <p>{t.disclaimer}</p>
          <p className="mt-3 font-semibold">{t.generated}</p>
        </footer>
      </div>
    </main>
  );
}