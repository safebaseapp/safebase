"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function TRIRCalculatorPage() {
  const [recordableCases, setRecordableCases] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");

  const result = useMemo(() => {
    const cases = Number(recordableCases);
    const hours = Number(hoursWorked);

    if (
      !recordableCases ||
      !hoursWorked ||
      Number.isNaN(cases) ||
      Number.isNaN(hours) ||
      cases < 0 ||
      hours <= 0
    ) {
      return null;
    }

    return (cases * 1000000) / hours;
  }, [recordableCases, hoursWorked]);

  const clearCalculator = () => {
    setRecordableCases("");
    setHoursWorked("");
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
              LTIFR Calculator
            </h1>

            <p className="mt-4 leading-7 text-slate-400">
              Calculate the Lost Time Injury Frequency Rate using lost time injuries and total hours worked.
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="recordable-cases"
                  className="mb-2 block text-sm font-semibold text-slate-300"
                >
                  Lost time injuries
                </label>

                <input
                  id="recordable-cases"
                  type="number"
                  min="0"
                  step="1"
                  value={recordableCases}
                  onChange={(event) => setRecordableCases(event.target.value)}
                  placeholder="Example: 4"
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

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={clearCalculator}
                  className="rounded-xl border border-slate-700 bg-slate-950 px-5 py-3 font-semibold text-slate-300 transition hover:border-slate-600 hover:text-white"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-blue-500/20 bg-blue-500/10 p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
                LTIFR RESULT
              </p>

              <div className="mt-5">
                {result === null ? (
                  <>
                    <div className="text-5xl font-bold text-slate-500">—</div>

                    <p className="mt-4 leading-7 text-slate-400">
                      Enter the number of recordable cases and total hours
                      worked to calculate TRIR.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-5xl font-bold text-white">
                      {result.toFixed(2)}
                    </div>

                    <p className="mt-4 leading-7 text-slate-300">
                      This represents the number of recordable cases per
                      200,000 hours worked.
                    </p>
                  </>
                )}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white">
                Formula
              </h2>

              <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4 text-center font-mono text-sm text-blue-300 sm:text-base">
                LTIFR = (Lost Time Injuries × 1,000,000) ÷ Total Hours Worked
              </div>

              <p className="mt-5 leading-7 text-slate-400">
                The 1,000,000-hour base is commonly used for international LTIFR reporting.
              </p>
            </section>

            <section className="rounded-3xl border border-amber-500/20 bg-amber-500/10 p-6">
              <h2 className="font-bold text-amber-200">
                Important
              </h2>

              <p className="mt-2 leading-7 text-amber-100/80">
                Use consistent case classification and verified working-hour
                data when comparing performance across periods or locations.
              </p>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}