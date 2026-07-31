"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type RiskLevel = {
  labelTr: string;
  labelEn: string;
  descriptionTr: string;
  descriptionEn: string;
};

const riskLevels: Record<string, RiskLevel> = {
  low: {
    labelTr: "Düşük",
    labelEn: "Low",
    descriptionTr: "Mevcut kontroller sürdürülmeli.",
    descriptionEn: "Maintain the existing controls.",
  },
  medium: {
    labelTr: "Orta",
    labelEn: "Medium",
    descriptionTr: "Ek kontrol önlemleri planlanmalı.",
    descriptionEn: "Additional controls should be planned.",
  },
  high: {
    labelTr: "Yüksek",
    labelEn: "High",
    descriptionTr: "İşe başlamadan önce risk azaltılmalı.",
    descriptionEn: "Reduce the risk before starting the work.",
  },
  critical: {
    labelTr: "Kritik",
    labelEn: "Critical",
    descriptionTr: "Faaliyet durdurulmalı ve derhal aksiyon alınmalı.",
    descriptionEn: "Stop the activity and take immediate action.",
  },
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default function QuickRiskAssessmentPage({ params }: Props) {
  const [locale, setLocale] = useState<"tr" | "en">("en");
  const [activity, setActivity] = useState("");
  const [hazard, setHazard] = useState("");
  const [existingControls, setExistingControls] = useState("");
  const [likelihood, setLikelihood] = useState(1);
  const [severity, setSeverity] = useState(1);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    params.then(({ locale }) => {
      setLocale(locale === "tr" ? "tr" : "en");
    });
  }, [params]);

  const isTurkish = locale === "tr";
  const score = likelihood * severity;

  const levelKey =
    score <= 4
      ? "low"
      : score <= 9
        ? "medium"
        : score <= 16
          ? "high"
          : "critical";

  const riskLevel = riskLevels[levelKey];

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowResult(true);
  }

  function handleReset() {
    setActivity("");
    setHazard("");
    setExistingControls("");
    setLikelihood(1);
    setSeverity(1);
    setShowResult(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <Link
          href={`/${locale}/tools`}
          className="inline-flex text-sm font-semibold text-slate-400 transition hover:text-blue-400"
        >
          ← {isTurkish ? "Araçlara dön" : "Back to tools"}
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-400">
              {isTurkish ? "SafeBase aracı" : "SafeBase tool"}
            </p>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {isTurkish
                ? "Hızlı Risk Değerlendirmesi"
                : "Quick Risk Assessment"}
            </h1>

            <p className="mt-3 leading-7 text-slate-400">
              {isTurkish
                ? "Faaliyeti, tehlikeyi ve risk puanlarını girerek hızlı bir ön değerlendirme oluştur."
                : "Create a quick preliminary assessment by entering the activity, hazard and risk scores."}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="activity"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  {isTurkish ? "Faaliyet" : "Activity"}
                </label>

                <input
                  id="activity"
                  value={activity}
                  onChange={(event) => setActivity(event.target.value)}
                  required
                  placeholder={
                    isTurkish
                      ? "Örn. yüksekte çalışma"
                      : "Example: working at height"
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label
                  htmlFor="hazard"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  {isTurkish ? "Tehlike" : "Hazard"}
                </label>

                <textarea
                  id="hazard"
                  value={hazard}
                  onChange={(event) => setHazard(event.target.value)}
                  required
                  rows={3}
                  placeholder={
                    isTurkish
                      ? "Örn. korumasız kenardan düşme"
                      : "Example: fall from an unprotected edge"
                  }
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label
                  htmlFor="controls"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  {isTurkish ? "Mevcut kontroller" : "Existing controls"}
                </label>

                <textarea
                  id="controls"
                  value={existingControls}
                  onChange={(event) =>
                    setExistingControls(event.target.value)
                  }
                  rows={3}
                  placeholder={
                    isTurkish
                      ? "Örn. tam vücut kemeri, korkuluk, izin sistemi"
                      : "Example: full body harness, guardrails, permit system"
                  }
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="likelihood"
                    className="mb-2 block text-sm font-semibold text-slate-200"
                  >
                    {isTurkish ? "Olasılık" : "Likelihood"}
                  </label>

                  <select
                    id="likelihood"
                    value={likelihood}
                    onChange={(event) =>
                      setLikelihood(Number(event.target.value))
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="severity"
                    className="mb-2 block text-sm font-semibold text-slate-200"
                  >
                    {isTurkish ? "Şiddet" : "Severity"}
                  </label>

                  <select
                    id="severity"
                    value={severity}
                    onChange={(event) =>
                      setSeverity(Number(event.target.value))
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-500"
              >
                {isTurkish
                  ? "Değerlendirmeyi oluştur"
                  : "Create assessment"}
              </button>
            </form>
          </section>

          <aside className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-400">
              {isTurkish ? "Değerlendirme sonucu" : "Assessment result"}
            </p>

            {!showResult ? (
              <div className="mt-10 rounded-2xl border border-dashed border-slate-700 bg-slate-950/50 px-6 py-14 text-center">
                <div className="text-4xl">🧮</div>

                <h2 className="mt-4 text-xl font-bold">
                  {isTurkish ? "Henüz sonuç yok" : "No result yet"}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {isTurkish
                    ? "Formu tamamladığında risk sonucu burada görünecek."
                    : "Your risk result will appear here after completing the form."}
                </p>
              </div>
            ) : (
              <div className="mt-8 space-y-5">
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400">
                    {isTurkish ? "Risk skoru" : "Risk score"}
                  </p>

                  <p className="mt-2 text-5xl font-bold text-blue-400">
                    {score}
                  </p>
                </div>

                <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5">
                  <p className="text-sm text-blue-300">
                    {isTurkish ? "Risk seviyesi" : "Risk level"}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {isTurkish ? riskLevel.labelTr : riskLevel.labelEn}
                  </h2>

                  <p className="mt-3 leading-7 text-slate-300">
                    {isTurkish
                      ? riskLevel.descriptionTr
                      : riskLevel.descriptionEn}
                  </p>
                </div>

                <div className="space-y-3 rounded-2xl border border-slate-700 bg-slate-950/60 p-5 text-sm">
                  <p>
                    <span className="font-semibold text-white">
                      {isTurkish ? "Faaliyet:" : "Activity:"}
                    </span>{" "}
                    <span className="text-slate-400">{activity}</span>
                  </p>

                  <p>
                    <span className="font-semibold text-white">
                      {isTurkish ? "Tehlike:" : "Hazard:"}
                    </span>{" "}
                    <span className="text-slate-400">{hazard}</span>
                  </p>

                  <p>
                    <span className="font-semibold text-white">
                      {isTurkish
                        ? "Mevcut kontroller:"
                        : "Existing controls:"}
                    </span>{" "}
                    <span className="text-slate-400">
                      {existingControls ||
                        (isTurkish ? "Belirtilmedi" : "Not specified")}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold text-white">
                      {isTurkish ? "Hesaplama:" : "Calculation:"}
                    </span>{" "}
                    <span className="text-slate-400">
                      {likelihood} × {severity} = {score}
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-200 transition hover:border-blue-500 hover:text-blue-300"
                >
                  {isTurkish ? "Yeni değerlendirme" : "New assessment"}
                </button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}