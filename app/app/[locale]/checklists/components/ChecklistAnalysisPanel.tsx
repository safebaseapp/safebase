import type { ChecklistAnalysisResult } from "@/lib/ai/analyzeChecklist";

type Locale = "tr" | "en";

type Props = {
  locale: Locale;
  analysis: ChecklistAnalysisResult | null;
};

type MetricCardProps = {
  label: string;
  value: string | number;
};

function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-950 p-5 print:border-slate-300 print:bg-white">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}

export default function ChecklistAnalysisPanel({
  locale,
  analysis,
}: Props) {
  if (!analysis) {
    return null;
  }

  const isTurkish = locale === "tr";

  const decisionClasses =
    analysis.workDecision === "Stop Work"
      ? "border-red-500/40 bg-red-500/10 text-red-100"
      : analysis.workDecision === "Incomplete Assessment"
        ? "border-amber-500/40 bg-amber-500/10 text-amber-100"
        : analysis.workDecision === "Proceed With Conditions"
          ? "border-orange-500/40 bg-orange-500/10 text-orange-100"
          : "border-emerald-500/40 bg-emerald-500/10 text-emerald-100";

  const decisionLabel =
    analysis.workDecision === "Stop Work"
      ? isTurkish
        ? "🛑 İŞİ DURDUR"
        : "🛑 STOP WORK"
      : analysis.workDecision === "Incomplete Assessment"
        ? isTurkish
          ? "⚠️ DEĞERLENDİRME EKSİK"
          : "⚠️ ASSESSMENT INCOMPLETE"
        : analysis.workDecision === "Proceed With Conditions"
          ? isTurkish
            ? "🟠 KOŞULLU DEVAM"
            : "🟠 PROCEED WITH CONDITIONS"
          : isTurkish
            ? "✅ ÇALIŞMA DEVAM EDEBİLİR"
            : "✅ WORK MAY PROCEED";

  const riskClass =
    analysis.overallRisk === "Critical"
      ? "text-red-300"
      : analysis.overallRisk === "High"
        ? "text-orange-300"
        : analysis.overallRisk === "Medium"
          ? "text-amber-300"
          : "text-emerald-300";

  return (
    <section className="mt-8 overflow-hidden rounded-3xl border border-blue-500/30 bg-blue-500/5 print:border-slate-300 print:bg-white">
      <div className="border-b border-blue-500/20 bg-slate-950/40 p-7 sm:p-8 print:border-slate-300 print:bg-white">
        <div className="flex flex-col gap-7 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                {isTurkish
                  ? "SERNEM Profesyonel Güvenlik Değerlendirmesi"
                  : "SERNEM Professional Safety Assessment"}
              </p>

              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-blue-200 print:border-slate-300 print:bg-white print:text-black">
                {analysis.assessmentStatus === "Complete"
                  ? isTurkish
                    ? "Tam Değerlendirme"
                    : "Complete Assessment"
                  : isTurkish
                    ? "Kısmi Değerlendirme"
                    : "Partial Assessment"}
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {isTurkish
                ? "Kontrol Listesi Yönetici Özeti"
                : "Checklist Executive Summary"}
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 print:text-slate-700">
              {analysis.summary}
            </p>
          </div>

          <div
            className={`min-w-full rounded-3xl border p-6 text-center shadow-lg xl:min-w-80 ${decisionClasses} print:border-slate-300 print:bg-white print:text-black`}
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-75">
              {isTurkish ? "Çalışma Kararı" : "Work Decision"}
            </p>

            <p className="mt-3 text-3xl font-black uppercase tracking-tight">
              {decisionLabel}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <MetricCard
            label={isTurkish ? "Tamamlanma" : "Completion"}
            value={`${analysis.completionRate}%`}
          />

          <MetricCard
            label={isTurkish ? "Güvenlik Skoru" : "Safety Score"}
            value={`${analysis.score}/100`}
          />

          <div className="rounded-2xl border border-slate-700 bg-slate-950 p-5 print:border-slate-300 print:bg-white">
            <p className="text-sm text-slate-500">
              {isTurkish ? "Genel Risk" : "Overall Risk"}
            </p>

            <p
              className={`mt-2 text-3xl font-bold ${riskClass} print:text-black`}
            >
              {analysis.overallRisk}
            </p>
          </div>

          <MetricCard
            label={isTurkish ? "Uygunsuzluk" : "Findings"}
            value={analysis.nonCompliantItems}
          />

          <MetricCard
            label={isTurkish ? "Kritik Bulgular" : "Critical Findings"}
            value={analysis.criticalFindings.length}
          />
        </div>
      </div>

      <div className="p-7 sm:p-8">
        <div className="rounded-2xl border border-slate-700 bg-slate-950 p-6 print:border-slate-300 print:bg-white">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">
                {isTurkish ? "İzin Hazırlık Durumu" : "Permit Readiness"}
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                {analysis.permitReadiness >= 85
                  ? isTurkish
                    ? "Yetkilendirmeye Hazır"
                    : "Ready for Authorization"
                  : analysis.permitReadiness >= 60
                    ? isTurkish
                      ? "Koşullu Olarak Hazır"
                      : "Conditionally Ready"
                    : isTurkish
                      ? "İzin İçin Hazır Değil"
                      : "Not Ready for Permit"}
              </h3>
            </div>

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
        </div>

        <div className="mt-7 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-700 bg-slate-950 p-6 print:border-slate-300 print:bg-white">
            <h3 className="text-xl font-bold">
              {isTurkish ? "Önerilen Aksiyonlar" : "Recommended Actions"}
            </h3>

            {analysis.recommendations.length > 0 ? (
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
            ) : (
              <p className="mt-4 text-slate-500">
                {isTurkish
                  ? "Ek bir aksiyon önerisi bulunmuyor."
                  : "No additional actions are recommended."}
              </p>
            )}
          </article>

          <article className="rounded-2xl border border-slate-700 bg-slate-950 p-6 print:border-slate-300 print:bg-white">
            <h3 className="text-xl font-bold">
              {isTurkish ? "Referanslar" : "References"}
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
                {isTurkish
                  ? "Aktif bulgular için referans bulunmuyor."
                  : "No references are associated with active findings."}
              </p>
            )}
          </article>
        </div>

        {analysis.findings.length > 0 && (
          <div className="mt-7">
            <h3 className="text-xl font-bold">
              {isTurkish ? "Analiz Bulguları" : "Analysis Findings"}
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
                        {isTurkish ? "Rehberlik" : "Guidance"}
                      </p>

                      <p className="mt-1 text-slate-300 print:text-black">
                        {finding.guidance}
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-slate-400">
                        {isTurkish
                          ? "Düzeltici Faaliyet"
                          : "Corrective Action"}
                      </p>

                      <p className="mt-1 text-slate-300 print:text-black">
                        {finding.correctiveAction}
                      </p>
                    </div>

                    {finding.references &&
                      finding.references.length > 0 && (
                        <div>
                          <p className="font-semibold text-slate-400">
                            {isTurkish ? "Referans" : "Reference"}
                          </p>

                          <div className="mt-2 flex flex-wrap gap-2">
                            {finding.references.map((reference) => (
                              <span
                                key={reference}
                                className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 print:border-slate-300 print:text-black"
                              >
                                {reference}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
