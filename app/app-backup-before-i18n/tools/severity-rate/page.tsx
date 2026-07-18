"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function SeverityRateCalculatorPage() {
  const [lostWorkdays, setLostWorkdays] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const days = Number(lostWorkdays);
    const hours = Number(hoursWorked);

    if (
      !lostWorkdays ||
      !hoursWorked ||
      Number.isNaN(days) ||
      Number.isNaN(hours) ||
      days < 0 ||
      hours <= 0
    ) {
      return null;
    }

    return (days * 200_000) / hours;
  }, [lostWorkdays, hoursWorked]);

  const performanceLevel =
    result === null
      ? ""
      : result < 50
        ? "Excellent"
        : result <= 200
          ? "Moderate"
          : "Needs Immediate Review";

  const interpretation =
    result === null
      ? ""
      : result < 50
        ? "Low injury severity. Lost workdays are being effectively controlled."
        : result <= 200
          ? "Moderate injury severity detected. Continue reducing lost workdays through rehabilitation, return-to-work planning and preventive actions."
          : "High injury severity detected. Review serious incidents, recovery periods and corrective actions immediately.";

  const clearCalculator = () => {
    setLostWorkdays("");
    setHoursWorked("");
    setCopied(false);
  };

  const copyResult = async () => {
    if (result === null) return;

    const textToCopy = [
      `Severity Rate Result: ${result.toFixed(2)}`,
      `Performance Level: ${performanceLevel}`,
      `Interpretation: ${interpretation}`,
      "Formula: (Lost Workdays × 200,000) ÷ Total Hours Worked",
    ].join("\n");

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white sm:px-6 md:py-16">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
        >
          ← Back to Safety Calculators
        </Link>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-black/20 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-400">
              Safety Performance Calculator
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Severity Rate Calculator
            </h1>

            <p className="mt-4 leading-7 text-slate-400">
              Measure the severity of workplace injuries using lost workdays
              and total employee hours worked.
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="lost-workdays"
                  className="mb-2 block text-sm font-semibold text-slate-300"
                >
                  Lost workdays
                </label>

                <input
                  id="lost-workdays"
                  type="number"
                  min="0"
                  step="1"
                  value={lostWorkdays}
                  onChange={(event) => setLostWorkdays(event.target.value)}
                  placeholder="Example: 30"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label
                  htmlFor="hours-worked"
                  className="mb-2 block text-sm font-semibold text-slate-300"
                >
                  Total hours worked
                </label>

                <input
                  id="hours-worked"
                  type="number"
                  min="1"
                  step="1"
                  value={hoursWorked}
                  onChange={(event) => setHoursWorked(event.target.value)}
                  placeholder="Example: 500000"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <button
                type="button"
                onClick={clearCalculator}
                className="rounded-xl border border-slate-700 bg-slate-950 px-5 py-3 font-semibold text-slate-300 transition hover:border-slate-600 hover:text-white"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-blue-500/20 bg-blue-500/10 p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
                Severity Rate Result
              </p>

              <div className="mt-5">
                {result === null ? (
                  <>
                    <div className="text-5xl font-extrabold text-slate-500">
                      --
                    </div>

                    <p className="mt-4 text-lg font-semibold text-slate-300">
                      Waiting for input
                    </p>

                    <p className="mt-2 leading-7 text-slate-400">
                      Enter lost workdays and total hours worked to calculate
                      the severity rate.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-5xl font-extrabold text-white">
                      {result.toFixed(2)}
                    </div>

                    <div
                      className={`mt-5 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                        result < 50
                          ? "bg-green-500/20 text-green-300"
                          : result <= 200
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {result < 50
                        ? "🟢 Excellent"
                        : result <= 200
                          ? "🟡 Moderate"
                          : "🔴 Needs Immediate Review"}
                    </div>

                    <p className="mt-5 leading-7 text-slate-300">
                      {interpretation}
                    </p>

                    <button
                      type="button"
                      onClick={copyResult}
                      className="mt-5 rounded-xl border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300 transition hover:border-blue-300 hover:text-blue-200"
                    >
                      {copied ? "Copied ✓" : "Copy Result"}
                    </button>
                  </>
                )}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white">Formula</h2>

              <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4 text-center font-mono text-sm text-blue-300 sm:text-base">
                Severity Rate = (Lost Workdays × 200,000) ÷ Total Hours Worked
              </div>

              <p className="mt-5 leading-7 text-slate-400">
                The severity rate shows the number of lost workdays per
                200,000 employee hours worked.
              </p>
            </section>

            <section className="rounded-3xl border border-amber-500/20 bg-amber-500/10 p-6">
              <h2 className="font-bold text-amber-200">Important</h2>

              <p className="mt-2 leading-7 text-amber-100/80">
                Severity rate thresholds can vary by company, industry and
                reporting standard. Use the result together with incident
                details and internal performance targets.
              </p>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
