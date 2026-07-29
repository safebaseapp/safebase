"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { checklistItems } from "./checklistData";
import { labels } from "./labels";
import type { Answer, CorrectiveAction, Props } from "./types";

export default function LotoChecklist({ locale }: Props) {
  const t = labels[locale];
  const items = checklistItems[locale];

  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [comments, setComments] = useState("");
  const [correctiveActions, setCorrectiveActions] = useState<
    Record<string, CorrectiveAction>
  >({});

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

  function resetInspection() {
    setAnswers({});
    setComments("");
    setCorrectiveActions({});
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
