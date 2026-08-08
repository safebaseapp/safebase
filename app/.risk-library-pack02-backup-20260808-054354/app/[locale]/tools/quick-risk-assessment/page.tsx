"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { riskLibraryPack01 } from "@/lib/risk-library/pack-01";

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

  /* SAFEBASE_RISK_HEADER_STATE_START */
  const [projectName, setProjectName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [assessmentLocation, setAssessmentLocation] = useState("");
  const [assessorName, setAssessorName] = useState("");
  const [assessmentDate, setAssessmentDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [assessmentRevision, setAssessmentRevision] = useState("1.0");
  /* SAFEBASE_RISK_HEADER_STATE_END */

  /* SAFEBASE_HIRARC_HEADER_STATE_START */
  const [department, setDepartment] = useState("");
  const [assetArea, setAssetArea] = useState("");
  const [processMethod, setProcessMethod] = useState("");
  const [documentNo, setDocumentNo] = useState("SB-HIRARC-001");
  const [reviewedBy, setReviewedBy] = useState("");
  const [approvedBy, setApprovedBy] = useState("");
  /* SAFEBASE_HIRARC_HEADER_STATE_END */



  /* SAFEBASE_MULTI_RISK_STATE_START */

  type RiskRegisterItem = {
    id: string;
    activity: string;
    hazard: string;
    consequence: string;
    personsAtRisk: string;
    existingControls: string;
    likelihood: number;
    severity: number;
    additionalControls: string;
    responsible: string;
    targetDate: string;
    residualLikelihood: number;
    residualSeverity: number;
  };

  const createRiskItem = (): RiskRegisterItem => ({
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    activity: "",
    hazard: "",
    consequence: "",
    personsAtRisk: "",
    existingControls: "",
    likelihood: 1,
    severity: 1,
    additionalControls: "",
    responsible: "",
    targetDate: "",
    residualLikelihood: 1,
    residualSeverity: 1,
  });

  const [riskItems, setRiskItems] = useState<RiskRegisterItem[]>([
    createRiskItem(),
  ]);

  const updateRiskItem = <K extends keyof RiskRegisterItem>(
    id: string,
    field: K,
    value: RiskRegisterItem[K]
  ) => {
    setRiskItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const addRiskItem = () => {
    setRiskItems((current) => [...current, createRiskItem()]);
  };

  const duplicateRiskItem = (id: string) => {
    setRiskItems((current) => {
      const source = current.find((item) => item.id === id);

      if (!source) return current;

      return [
        ...current,
        {
          ...source,
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        },
      ];
    });
  };

  const removeRiskItem = (id: string) => {
    setRiskItems((current) => {
      if (current.length === 1) return current;
      return current.filter((item) => item.id !== id);
    });
  };

  const getRiskLabel = (score: number) => {
    if (score >= 20) return isTurkish ? "Kritik" : "Critical";
    if (score >= 10) return isTurkish ? "Yüksek" : "High";
    if (score >= 5) return isTurkish ? "Orta" : "Medium";
    return isTurkish ? "Düşük" : "Low";
  };


  /* SAFEBASE_RISK_PRINT_HANDLER_START */
  const handlePrintRiskAssessment = () => {
    window.print();
  };
  /* SAFEBASE_RISK_PRINT_HANDLER_END */

  const getRiskStyle = (score: number) => {
    if (score >= 20) {
      return {
        card: "border-red-500/50 bg-red-500/15",
        title: "text-red-300",
        score: "text-red-400",
        badge: "bg-red-500/15 text-red-300 border-red-500/40",
      };
    }

    if (score >= 10) {
      return {
        card: "border-orange-500/50 bg-orange-500/15",
        title: "text-orange-300",
        score: "text-orange-400",
        badge: "bg-orange-500/15 text-orange-300 border-orange-500/40",
      };
    }

    if (score >= 5) {
      return {
        card: "border-yellow-500/50 bg-yellow-500/15",
        title: "text-yellow-300",
        score: "text-yellow-300",
        badge: "bg-yellow-500/15 text-yellow-300 border-yellow-500/40",
      };
    }

    return {
      card: "border-emerald-500/50 bg-emerald-500/15",
      title: "text-emerald-300",
      score: "text-emerald-400",
      badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
    };
  };

  /* SAFEBASE_MULTI_RISK_STATE_END */

  /* SAFEBASE_RISK_LIBRARY_PACK01_STATE_START */

  const [selectedLibraryActivity, setSelectedLibraryActivity] =
    useState(riskLibraryPack01[0]?.id ?? "");

  const selectedLibraryTemplate = riskLibraryPack01.find(
    (template) => template.id === selectedLibraryActivity
  );

  const loadLibraryActivity = () => {
    if (!selectedLibraryTemplate) return;

    const lang = isTurkish ? "tr" : "en";

    const generated: RiskRegisterItem[] =
      selectedLibraryTemplate.items.map((entry) => ({
        ...createRiskItem(),

        activity: selectedLibraryTemplate.activity[lang],
        hazard: entry.hazard[lang],
        consequence: entry.consequence[lang],
        personsAtRisk: entry.personsAtRisk[lang],
        existingControls: entry.existingControls[lang],
        additionalControls: entry.additionalControls[lang],

        // Site-specific risk scoring must be completed by the assessor.
        likelihood: 1,
        severity: 1,
        residualLikelihood: 1,
        residualSeverity: 1,
      }));

    setRiskItems((current) => {
      const blank =
        current.length === 1 &&
        !current[0].activity &&
        !current[0].hazard &&
        !current[0].consequence &&
        !current[0].existingControls;

      return blank ? generated : [...current, ...generated];
    });
  };

  /* SAFEBASE_RISK_LIBRARY_PACK01_STATE_END */




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

      {/* SAFEBASE_RISK_HEADER_UI_START */}
      <section className="mb-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 shadow-xl">
        <div className="border-b border-slate-800 bg-gradient-to-r from-emerald-950/60 to-slate-950 px-6 py-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-400">
                SafeBase Risk Assessment
              </p>

              <h2 className="mt-1 text-2xl font-black text-white">
                {isTurkish
                  ? "Değerlendirme Bilgileri"
                  : "Assessment Information"}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {isTurkish
                  ? "Risk değerlendirmesine ait temel proje ve doküman bilgilerini girin."
                  : "Enter the basic project and document information for this risk assessment."}
              </p>
            </div>

            <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-emerald-300">
              {isTurkish ? "Profesyonel Değerlendirme" : "Professional Assessment"}
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">

          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-400">
              {isTurkish ? "Proje" : "Project"}
            </span>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder={isTurkish ? "Proje adı" : "Project name"}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-400">
              {isTurkish ? "Şirket" : "Company"}
            </span>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder={isTurkish ? "Şirket adı" : "Company name"}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-400">
              {isTurkish ? "Lokasyon" : "Location"}
            </span>
            <input
              type="text"
              value={assessmentLocation}
              onChange={(e) => setAssessmentLocation(e.target.value)}
              placeholder={isTurkish ? "Saha / bölüm / lokasyon" : "Site / area / location"}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-400">
              {isTurkish ? "Değerlendirmeyi Yapan" : "Assessor"}
            </span>
            <input
              type="text"
              value={assessorName}
              onChange={(e) => setAssessorName(e.target.value)}
              placeholder={isTurkish ? "Ad Soyad" : "Full name"}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-400">
              {isTurkish ? "Değerlendirme Tarihi" : "Assessment Date"}
            </span>
            <input
              type="date"
              value={assessmentDate}
              onChange={(e) => setAssessmentDate(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-emerald-500"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-400">
              {isTurkish ? "Revizyon" : "Revision"}
            </span>
            <input
              type="text"
              value={assessmentRevision}
              onChange={(e) => setAssessmentRevision(e.target.value)}
              placeholder="1.0"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
            />
          </label>

        </div>
      </section>
      
      {/* SAFEBASE_HIRARC_HEADER_UI_START */}

      <section className="mb-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70">

        <div className="border-b border-slate-800 px-6 py-4">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">
            {isTurkish
              ? "HIRARC Doküman Bilgileri"
              : "HIRARC Document Information"}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {isTurkish
              ? "Kurumsal risk değerlendirmesi ve PDF çıktısında kullanılacak ek bilgiler."
              : "Additional information used in the corporate risk assessment and PDF output."}
          </p>
        </div>

        <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">

          <label>
            <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-400">
              {isTurkish ? "Departman" : "Department"}
            </span>

            <input
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder={isTurkish ? "Örn. HSE / Bakım" : "e.g. HSE / Maintenance"}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-blue-500"
            />
          </label>

          <label>
            <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-400">
              {isTurkish ? "Asset / Alan" : "Asset / Area"}
            </span>

            <input
              value={assetArea}
              onChange={(e) => setAssetArea(e.target.value)}
              placeholder={isTurkish ? "Ünite / saha / bölüm" : "Unit / site / area"}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-blue-500"
            />
          </label>

          <label>
            <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-400">
              {isTurkish ? "Proses / Metot" : "Process / Method"}
            </span>

            <input
              value={processMethod}
              onChange={(e) => setProcessMethod(e.target.value)}
              placeholder={isTurkish ? "Çalışma yöntemi" : "Work method"}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-blue-500"
            />
          </label>

          <label>
            <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-400">
              {isTurkish ? "Doküman No" : "Document No"}
            </span>

            <input
              value={documentNo}
              onChange={(e) => setDocumentNo(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-blue-500"
            />
          </label>

          <label>
            <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-400">
              {isTurkish ? "Kontrol Eden" : "Reviewed By"}
            </span>

            <input
              value={reviewedBy}
              onChange={(e) => setReviewedBy(e.target.value)}
              placeholder={isTurkish ? "Ad Soyad" : "Full name"}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-blue-500"
            />
          </label>

          <label>
            <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-400">
              {isTurkish ? "Onaylayan" : "Approved By"}
            </span>

            <input
              value={approvedBy}
              onChange={(e) => setApprovedBy(e.target.value)}
              placeholder={isTurkish ? "Ad Soyad" : "Full name"}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-blue-500"
            />
          </label>

        </div>

      </section>

      {/* SAFEBASE_HIRARC_HEADER_UI_END */}

      {/* SAFEBASE_RISK_HEADER_UI_END */}


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
    
      
      {/* SAFEBASE_RISK_LIBRARY_PACK01_UI_START */}

      <section className="mx-auto mt-10 w-full max-w-7xl overflow-hidden rounded-2xl border border-blue-500/20 bg-slate-950/80 shadow-2xl">

        <div className="border-b border-slate-800 bg-gradient-to-r from-blue-950/60 via-slate-950 to-emerald-950/40 px-6 py-6">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-400">
                SafeBase Professional Risk Library
              </p>

              <h2 className="mt-2 text-2xl font-black text-white">
                {isTurkish
                  ? "Hazır Risk Analizi Kütüphanesi"
                  : "Ready-Made Risk Assessment Library"}
              </h2>

              <p className="mt-2 max-w-3xl text-sm text-slate-400">
                {isTurkish
                  ? "Faaliyeti seçin ve hazır risk kayıtlarını mevcut HIRARC değerlendirmenize tek tıkla aktarın."
                  : "Select an activity and load ready-made risk items directly into your HIRARC assessment."}
              </p>
            </div>

            <div className="flex gap-3">

              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3 text-center">
                <p className="text-2xl font-black text-blue-300">
                  {riskLibraryPack01.length}
                </p>

                <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  {isTurkish ? "Faaliyet" : "Activities"}
                </p>
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-center">
                <p className="text-2xl font-black text-emerald-300">
                  {riskLibraryPack01.reduce(
                    (total, activity) => total + activity.items.length,
                    0
                  )}
                </p>

                <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  {isTurkish ? "Hazır Risk" : "Risk Items"}
                </p>
              </div>

            </div>
          </div>
        </div>

        <div className="grid gap-5 p-6 lg:grid-cols-[1fr_auto]">

          <label>
            <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-400">
              {isTurkish ? "Hazır Faaliyet Seç" : "Select Ready Activity"}
            </span>

            <select
              value={selectedLibraryActivity}
              onChange={(e) =>
                setSelectedLibraryActivity(e.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-4 text-sm font-bold text-white outline-none transition focus:border-blue-500"
            >
              {riskLibraryPack01.map((template) => (
                <option key={template.id} value={template.id}>
                  {isTurkish
                    ? template.activity.tr
                    : template.activity.en}
                  {" — "}
                  {template.items.length}
                  {isTurkish ? " risk" : " risk items"}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            onClick={loadLibraryActivity}
            className="self-end rounded-xl bg-blue-500 px-6 py-4 text-sm font-black text-white transition hover:bg-blue-400"
          >
            ⚡{" "}
            {isTurkish
              ? "Risk Analizine Aktar"
              : "Load into Assessment"}
          </button>

        </div>

        {selectedLibraryTemplate && (
          <div className="border-t border-slate-800 px-6 py-5">

            <p className="text-xs font-black uppercase tracking-wider text-slate-500">
              {isTurkish ? "Bu şablondaki riskler" : "Risks in this template"}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {selectedLibraryTemplate.items.map((entry, index) => (
                <span
                  key={`${selectedLibraryTemplate.id}-${index}`}
                  className="rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-300"
                >
                  {String(index + 1).padStart(2, "0")} •{" "}
                  {isTurkish ? entry.hazard.tr : entry.hazard.en}
                </span>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">

              <p className="text-xs font-bold leading-5 text-amber-300">
                ⚠️{" "}
                {isTurkish
                  ? "Hazır içerikler başlangıç noktasıdır. Olasılık ve şiddet puanlarını gerçek saha koşulları, ekipman, personel ve mevcut kontroller dikkate alınarak yetkin değerlendirici belirlemelidir."
                  : "Ready-made content is a starting point. Likelihood and severity must be assigned by a competent assessor based on actual site conditions, equipment, personnel and controls."}
              </p>

            </div>

          </div>
        )}

      </section>

      {/* SAFEBASE_RISK_LIBRARY_PACK01_UI_END */}


      {/* SAFEBASE_MULTI_RISK_UI_START */}

      <section className="mx-auto mt-10 w-full max-w-7xl rounded-2xl border border-slate-800 bg-slate-950/70 shadow-2xl">

        <div className="flex flex-col gap-4 border-b border-slate-800 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-400">
              {isTurkish ? "Risk Kayıt Listesi" : "Risk Register"}
            </p>

            <h2 className="mt-2 text-2xl font-black text-white">
              {isTurkish
                ? "Profesyonel Risk Değerlendirmesi"
                : "Professional Risk Assessment"}
            </h2>

            <p className="mt-2 max-w-3xl text-sm text-slate-400">
              {isTurkish
                ? "Bir değerlendirmeye birden fazla tehlike ekleyin, başlangıç ve kalan risk seviyelerini ayrı ayrı yönetin."
                : "Add multiple hazards to one assessment and manage initial and residual risk levels independently."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {/* SAFEBASE_RISK_PRINT_BUTTON */}
            <button
              type="button"
              onClick={handlePrintRiskAssessment}
              className="rounded-xl border border-blue-500/50 bg-blue-500/10 px-5 py-3 text-sm font-black text-blue-300 transition hover:bg-blue-500/20"
            >
              📄 {isTurkish ? "PDF / Yazdır" : "PDF / Print"}
            </button>

            <button
              type="button"
              onClick={addRiskItem}
              className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-400"
            >
              + {isTurkish ? "Yeni Risk Ekle" : "Add Risk"}
            </button>
          </div>

          {/* SAFEBASE_RISK_LEGEND */}
          <div className="flex flex-wrap gap-2 lg:ml-auto">
            <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[10px] font-black text-emerald-300">
              1–4 {isTurkish ? "DÜŞÜK" : "LOW"}
            </span>
            <span className="rounded-full border border-yellow-500/40 bg-yellow-500/10 px-3 py-1 text-[10px] font-black text-yellow-300">
              5–9 {isTurkish ? "ORTA" : "MEDIUM"}
            </span>
            <span className="rounded-full border border-orange-500/40 bg-orange-500/10 px-3 py-1 text-[10px] font-black text-orange-300">
              10–19 {isTurkish ? "YÜKSEK" : "HIGH"}
            </span>
            <span className="rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-[10px] font-black text-red-300">
              20–25 {isTurkish ? "KRİTİK" : "CRITICAL"}
            </span>
          </div>

        </div>

        <div className="space-y-6 p-6">

          {riskItems.map((item, index) => {

            const initialScore = item.likelihood * item.severity;
            const residualScore =
              item.residualLikelihood * item.residualSeverity;

            return (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70"
              >

                <div className="flex flex-col gap-3 border-b border-slate-800 bg-slate-950 px-5 py-4 md:flex-row md:items-center md:justify-between">

                  <div className="flex items-center gap-3">

                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-sm font-black text-slate-950">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <p className="font-black text-white">
                        {isTurkish ? "Risk Kaydı" : "Risk Item"}{" "}
                        {String(index + 1).padStart(2, "0")}
                      </p>

                      <p className="text-xs text-slate-500">
                        {item.activity ||
                          (isTurkish
                            ? "Faaliyet henüz girilmedi"
                            : "Activity not entered")}
                      </p>
                    </div>

                  </div>

                  <div className="flex flex-wrap gap-2">

                    <button
                      type="button"
                      onClick={() => duplicateRiskItem(item.id)}
                      className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-bold text-slate-300 transition hover:border-blue-500 hover:text-blue-300"
                    >
                      📋 {isTurkish ? "Kopyala" : "Duplicate"}
                    </button>

                    <button
                      type="button"
                      onClick={() => removeRiskItem(item.id)}
                      disabled={riskItems.length === 1}
                      className="rounded-lg border border-red-900/70 px-3 py-2 text-xs font-bold text-red-400 transition hover:border-red-500 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      🗑 {isTurkish ? "Sil" : "Delete"}
                    </button>

                  </div>

                </div>

                <div className="grid gap-5 p-5 lg:grid-cols-2">

                  <label className="block">
                    <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-400">
                      {isTurkish ? "Faaliyet / İş Adımı" : "Activity / Task"}
                    </span>

                    <input
                      value={item.activity}
                      onChange={(e) =>
                        updateRiskItem(item.id, "activity", e.target.value)
                      }
                      placeholder={
                        isTurkish
                          ? "Örn. İskele kurulumu"
                          : "Example: Scaffold erection"
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-400">
                      {isTurkish ? "Tehlike" : "Hazard"}
                    </span>

                    <input
                      value={item.hazard}
                      onChange={(e) =>
                        updateRiskItem(item.id, "hazard", e.target.value)
                      }
                      placeholder={
                        isTurkish
                          ? "Örn. Yüksekten düşme"
                          : "Example: Fall from height"
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-400">
                      {isTurkish ? "Olası Sonuç" : "Potential Consequence"}
                    </span>

                    <textarea
                      rows={3}
                      value={item.consequence}
                      onChange={(e) =>
                        updateRiskItem(item.id, "consequence", e.target.value)
                      }
                      placeholder={
                        isTurkish
                          ? "Yaralanma, ölüm, ekipman hasarı..."
                          : "Injury, fatality, equipment damage..."
                      }
                      className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-400">
                      {isTurkish ? "Risk Altındaki Kişiler" : "Persons at Risk"}
                    </span>

                    <textarea
                      rows={3}
                      value={item.personsAtRisk}
                      onChange={(e) =>
                        updateRiskItem(
                          item.id,
                          "personsAtRisk",
                          e.target.value
                        )
                      }
                      placeholder={
                        isTurkish
                          ? "Çalışanlar, alt yükleniciler, ziyaretçiler..."
                          : "Employees, contractors, visitors..."
                      }
                      className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500"
                    />
                  </label>

                  <label className="block lg:col-span-2">
                    <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-400">
                      {isTurkish ? "Mevcut Kontroller" : "Existing Controls"}
                    </span>

                    <textarea
                      rows={3}
                      value={item.existingControls}
                      onChange={(e) =>
                        updateRiskItem(
                          item.id,
                          "existingControls",
                          e.target.value
                        )
                      }
                      placeholder={
                        isTurkish
                          ? "Mevcut mühendislik, idari ve KKD kontrolleri..."
                          : "Existing engineering, administrative and PPE controls..."
                      }
                      className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500"
                    />
                  </label>

                </div>

                {/* INITIAL RISK */}

                <div className="border-y border-slate-800 bg-slate-950/50 p-5">

                  <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-amber-400">
                    {isTurkish ? "Başlangıç Riski" : "Initial Risk"}
                  </p>

                  <div className="grid gap-4 sm:grid-cols-3">

                    <label>
                      <span className="mb-2 block text-xs font-bold text-slate-400">
                        {isTurkish ? "Olasılık" : "Likelihood"}
                      </span>

                      <select
                        value={item.likelihood}
                        onChange={(e) =>
                          updateRiskItem(
                            item.id,
                            "likelihood",
                            Number(e.target.value)
                          )
                        }
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-500"
                      >
                        {[1, 2, 3, 4, 5].map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      <span className="mb-2 block text-xs font-bold text-slate-400">
                        {isTurkish ? "Şiddet" : "Severity"}
                      </span>

                      <select
                        value={item.severity}
                        onChange={(e) =>
                          updateRiskItem(
                            item.id,
                            "severity",
                            Number(e.target.value)
                          )
                        }
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-500"
                      >
                        {[1, 2, 3, 4, 5].map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </label>

                    <div
                      className={`rounded-xl border p-4 text-center transition-all duration-300 ${getRiskStyle(initialScore).card}`}
                    >
                      <p
                        className={`text-xs font-black uppercase tracking-wider ${getRiskStyle(initialScore).title}`}
                      >
                        {isTurkish ? "Risk Skoru" : "Risk Score"}
                      </p>

                      <p
                        className={`mt-1 text-3xl font-black ${getRiskStyle(initialScore).score}`}
                      >
                        {initialScore}
                      </p>

                      <div
                        className={`mx-auto mt-2 inline-flex rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider ${getRiskStyle(initialScore).badge}`}
                      >
                        {getRiskLabel(initialScore)}
                      </div>
                    </div>

                  </div>
                </div>

                {/* ACTIONS */}

                <div className="grid gap-5 p-5 lg:grid-cols-3">

                  <label className="block lg:col-span-3">
                    <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-400">
                      {isTurkish ? "İlave Kontroller" : "Additional Controls"}
                    </span>

                    <textarea
                      rows={3}
                      value={item.additionalControls}
                      onChange={(e) =>
                        updateRiskItem(
                          item.id,
                          "additionalControls",
                          e.target.value
                        )
                      }
                      placeholder={
                        isTurkish
                          ? "Riski azaltmak için uygulanacak ek kontroller..."
                          : "Additional controls required to reduce the risk..."
                      }
                      className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
                    />
                  </label>

                  <label>
                    <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-400">
                      {isTurkish ? "Sorumlu" : "Responsible"}
                    </span>

                    <input
                      value={item.responsible}
                      onChange={(e) =>
                        updateRiskItem(
                          item.id,
                          "responsible",
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                    />
                  </label>

                  <label>
                    <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-400">
                      {isTurkish ? "Termin" : "Target Date"}
                    </span>

                    <input
                      type="date"
                      value={item.targetDate}
                      onChange={(e) =>
                        updateRiskItem(
                          item.id,
                          "targetDate",
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                    />
                  </label>

                </div>

                {/* RESIDUAL RISK */}

                <div className="border-t border-slate-800 bg-emerald-950/20 p-5">

                  <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
                    {isTurkish ? "Kalan Risk" : "Residual Risk"}
                  </p>

                  <div className="grid gap-4 sm:grid-cols-3">

                    <label>
                      <span className="mb-2 block text-xs font-bold text-slate-400">
                        {isTurkish ? "Olasılık" : "Likelihood"}
                      </span>

                      <select
                        value={item.residualLikelihood}
                        onChange={(e) =>
                          updateRiskItem(
                            item.id,
                            "residualLikelihood",
                            Number(e.target.value)
                          )
                        }
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
                      >
                        {[1, 2, 3, 4, 5].map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      <span className="mb-2 block text-xs font-bold text-slate-400">
                        {isTurkish ? "Şiddet" : "Severity"}
                      </span>

                      <select
                        value={item.residualSeverity}
                        onChange={(e) =>
                          updateRiskItem(
                            item.id,
                            "residualSeverity",
                            Number(e.target.value)
                          )
                        }
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
                      >
                        {[1, 2, 3, 4, 5].map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </label>

                    <div
                      className={`rounded-xl border p-4 text-center transition-all duration-300 ${getRiskStyle(residualScore).card}`}
                    >
                      <p
                        className={`text-xs font-black uppercase tracking-wider ${getRiskStyle(residualScore).title}`}
                      >
                        {isTurkish ? "Kalan Risk" : "Residual Risk"}
                      </p>

                      <p
                        className={`mt-1 text-3xl font-black ${getRiskStyle(residualScore).score}`}
                      >
                        {residualScore}
                      </p>

                      <div
                        className={`mx-auto mt-2 inline-flex rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider ${getRiskStyle(residualScore).badge}`}
                      >
                        {getRiskLabel(residualScore)}
                      </div>
                    </div>

                  </div>
                </div>

              </article>
            );
          })}

          <button
            type="button"
            onClick={addRiskItem}
            className="w-full rounded-xl border border-dashed border-emerald-500/50 bg-emerald-500/5 px-5 py-4 text-sm font-black text-emerald-300 transition hover:bg-emerald-500/10"
          >
            + {isTurkish ? "Yeni Risk Ekle" : "Add Another Risk"}
          </button>

        </div>
      </section>

      {/* SAFEBASE_MULTI_RISK_UI_END */}

      {/* SAFEBASE_RISK_PRINT_REPORT_START */}

      <style>{`
        @media screen {
          #safebase-risk-print {
            display: none;
          }
        }

        @media print {
          @page {
            size: A4 landscape;
            margin: 8mm;
          }

          body {
            background: white !important;
          }

          html,
          body {
            width: 100% !important;
            height: auto !important;
            min-height: 0 !important;
            overflow: visible !important;
            background: white !important;
          }

          body * {
            visibility: hidden !important;
          }

          main > *:not(#safebase-risk-print) {
            display: none !important;
          }

          header,
          nav,
          aside,
          footer {
            display: none !important;
          }

          #safebase-risk-print,
          #safebase-risk-print * {
            visibility: visible !important;
          }

          #safebase-risk-print {
            display: block !important;
            position: relative !important;
            left: auto !important;
            top: auto !important;
            width: 100% !important;
            min-height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            color: #0f172a !important;
            background: white !important;
            font-family: Arial, Helvetica, sans-serif !important;
          }

          .risk-print-item {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .risk-print-header {
            break-after: avoid;
          }

          .risk-print-table {
            width: 100%;
            border-collapse: collapse;
          }

          .risk-print-table th,
          .risk-print-table td {
            border: 1px solid #cbd5e1;
            padding: 5px;
            vertical-align: top;
            font-size: 8px;
            line-height: 1.3;
          }

          .risk-print-table th {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .risk-print-table thead tr:nth-child(2) th {
            background: #0f172a !important;
            color: white !important;
          }

          .risk-print-low {
            background: #d1fae5 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .risk-print-medium {
            background: #fef3c7 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .risk-print-high {
            background: #fed7aa !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .risk-print-critical {
            background: #fecaca !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

      <section id="safebase-risk-print">

        {/* DOCUMENT HEADER */}
        <div
          className="risk-print-header"
          style={{
            border: "2px solid #0f172a",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "stretch",
              borderBottom: "2px solid #0f172a",
            }}
          >
            <div style={{ padding: "12px", flex: 1 }}>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 900,
                  letterSpacing: "-1px",
                }}
              >
                <span style={{ color: "#10b981" }}>Safe</span>Base
              </div>

              <div
                style={{
                  marginTop: "4px",
                  fontSize: "8px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  color: "#64748b",
                }}
              >
                HEALTH & SAFETY RESOURCES
              </div>

              <div
                style={{
                  marginTop: "12px",
                  fontSize: "19px",
                  fontWeight: 900,
                }}
              >
                {isTurkish
                  ? "TEHLİKE TANIMLAMA, RİSK DEĞERLENDİRME VE RİSK KONTROLÜ (HIRARC)"
                  : "HAZARD IDENTIFICATION, RISK ASSESSMENT & RISK CONTROL (HIRARC)"}
              </div>
            </div>

            <div
              style={{
                width: "190px",
                borderLeft: "2px solid #0f172a",
                padding: "10px",
                fontSize: "9px",
              }}
            >
              <div style={{ marginBottom: "6px" }}>
                <strong>
                  {isTurkish ? "Doküman No:" : "Document No:"}
                </strong>{" "}
                {documentNo || "-"}
              </div>

              <div style={{ marginBottom: "6px" }}>
                <strong>{isTurkish ? "Tarih:" : "Date:"}</strong>{" "}
                {assessmentDate || "-"}
              </div>

              <div style={{ marginBottom: "6px" }}>
                <strong>{isTurkish ? "Revizyon:" : "Revision:"}</strong>{" "}
                {assessmentRevision || "-"}
              </div>

              <div>
                <strong>{isTurkish ? "Risk Sayısı:" : "Risk Items:"}</strong>{" "}
                {riskItems.length}
              </div>
            </div>
          </div>

          {/* PROJECT INFORMATION */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "9px",
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    width: "16%",
                    padding: "6px",
                    fontWeight: 800,
                    background: "#f1f5f9",
                    borderRight: "1px solid #cbd5e1",
                  }}
                >
                  {isTurkish ? "PROJE" : "PROJECT"}
                </td>

                <td
                  style={{
                    width: "34%",
                    padding: "6px",
                    borderRight: "1px solid #cbd5e1",
                  }}
                >
                  {projectName || "-"}
                </td>

                <td
                  style={{
                    width: "16%",
                    padding: "6px",
                    fontWeight: 800,
                    background: "#f1f5f9",
                    borderRight: "1px solid #cbd5e1",
                  }}
                >
                  {isTurkish ? "ŞİRKET" : "COMPANY"}
                </td>

                <td style={{ width: "34%", padding: "6px" }}>
                  {companyName || "-"}
                </td>
              </tr>

              <tr style={{ borderTop: "1px solid #cbd5e1" }}>
                <td
                  style={{
                    padding: "6px",
                    fontWeight: 800,
                    background: "#f1f5f9",
                    borderRight: "1px solid #cbd5e1",
                  }}
                >
                  {isTurkish ? "LOKASYON" : "LOCATION"}
                </td>

                <td
                  style={{
                    padding: "6px",
                    borderRight: "1px solid #cbd5e1",
                  }}
                >
                  {assessmentLocation || "-"}
                </td>

                <td
                  style={{
                    padding: "6px",
                    fontWeight: 800,
                    background: "#f1f5f9",
                    borderRight: "1px solid #cbd5e1",
                  }}
                >
                  {isTurkish ? "HAZIRLAYAN" : "ASSESSOR"}
                </td>

                <td style={{ padding: "6px" }}>
                  {assessorName || "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>


        {/* SAFEBASE_HIRARC_PRINT_INFO */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "9px",
            fontSize: "8px",
          }}
        >
          <tbody>

            <tr>
              <td
                style={{
                  width: "12%",
                  border: "1px solid #94a3b8",
                  padding: "5px",
                  fontWeight: 800,
                  background: "#e2e8f0",
                }}
              >
                {isTurkish ? "DEPARTMAN" : "DEPARTMENT"}
              </td>

              <td
                style={{
                  width: "21%",
                  border: "1px solid #94a3b8",
                  padding: "5px",
                }}
              >
                {department || "-"}
              </td>

              <td
                style={{
                  width: "12%",
                  border: "1px solid #94a3b8",
                  padding: "5px",
                  fontWeight: 800,
                  background: "#e2e8f0",
                }}
              >
                {isTurkish ? "ASSET / ALAN" : "ASSET / AREA"}
              </td>

              <td
                style={{
                  width: "21%",
                  border: "1px solid #94a3b8",
                  padding: "5px",
                }}
              >
                {assetArea || "-"}
              </td>

              <td
                style={{
                  width: "12%",
                  border: "1px solid #94a3b8",
                  padding: "5px",
                  fontWeight: 800,
                  background: "#e2e8f0",
                }}
              >
                {isTurkish ? "PROSES / METOT" : "PROCESS / METHOD"}
              </td>

              <td
                style={{
                  width: "22%",
                  border: "1px solid #94a3b8",
                  padding: "5px",
                }}
              >
                {processMethod || "-"}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  border: "1px solid #94a3b8",
                  padding: "5px",
                  fontWeight: 800,
                  background: "#e2e8f0",
                }}
              >
                {isTurkish ? "HAZIRLAYAN" : "PREPARED BY"}
              </td>

              <td
                style={{
                  border: "1px solid #94a3b8",
                  padding: "5px",
                }}
              >
                {assessorName || "-"}
              </td>

              <td
                style={{
                  border: "1px solid #94a3b8",
                  padding: "5px",
                  fontWeight: 800,
                  background: "#e2e8f0",
                }}
              >
                {isTurkish ? "KONTROL EDEN" : "REVIEWED BY"}
              </td>

              <td
                style={{
                  border: "1px solid #94a3b8",
                  padding: "5px",
                }}
              >
                {reviewedBy || "-"}
              </td>

              <td
                style={{
                  border: "1px solid #94a3b8",
                  padding: "5px",
                  fontWeight: 800,
                  background: "#e2e8f0",
                }}
              >
                {isTurkish ? "ONAYLAYAN" : "APPROVED BY"}
              </td>

              <td
                style={{
                  border: "1px solid #94a3b8",
                  padding: "5px",
                }}
              >
                {approvedBy || "-"}
              </td>
            </tr>

          </tbody>
        </table>

        {/* RISK TABLE */}
        <table className="risk-print-table">
          <thead>
            <tr>
              <th
                rowSpan={2}
                style={{
                  width: "3%",
                  background: "#0f172a",
                }}
              >
                No
              </th>

              <th
                colSpan={4}
                style={{
                  background: "#dc2626",
                  color: "#ffffff",
                  fontSize: "9px",
                  letterSpacing: "0.7px",
                }}
              >
                {isTurkish
                  ? "TEHLİKE TANIMLAMA"
                  : "HAZARD IDENTIFICATION"}
              </th>

              <th
                colSpan={4}
                style={{
                  background: "#eab308",
                  color: "#111827",
                  fontSize: "9px",
                  letterSpacing: "0.7px",
                }}
              >
                {isTurkish
                  ? "RİSK ANALİZİ"
                  : "RISK ANALYSIS"}
              </th>

              <th
                colSpan={6}
                style={{
                  background: "#16a34a",
                  color: "#ffffff",
                  fontSize: "9px",
                  letterSpacing: "0.7px",
                }}
              >
                {isTurkish
                  ? "RİSK KONTROLÜ"
                  : "RISK CONTROL"}
              </th>
            </tr>

            <tr>
              <th style={{ width: "8%" }}>
                {isTurkish ? "Faaliyet" : "Work Activity"}
              </th>

              <th style={{ width: "8%" }}>
                {isTurkish ? "Tehlike" : "Hazard"}
              </th>

              <th style={{ width: "8%" }}>
                {isTurkish ? "Olası Sonuç" : "Consequence / Effect"}
              </th>

              <th style={{ width: "7%" }}>
                {isTurkish
                  ? "Risk Altındaki Kişiler"
                  : "Persons at Risk"}
              </th>

              <th style={{ width: "11%" }}>
                {isTurkish
                  ? "Mevcut Kontroller"
                  : "Existing Risk Control"}
              </th>

              <th style={{ width: "3%" }}>
                L
              </th>

              <th style={{ width: "3%" }}>
                S
              </th>

              <th style={{ width: "5%" }}>
                {isTurkish ? "Risk" : "Risk"}
              </th>

              <th style={{ width: "14%" }}>
                {isTurkish
                  ? "Yapılacak Aksiyon / İlave Kontrol"
                  : "Action Required / Additional Controls"}
              </th>

              <th style={{ width: "7%" }}>
                {isTurkish
                  ? "Sorumlu"
                  : "Person in Charge"}
              </th>

              <th style={{ width: "7%" }}>
                {isTurkish
                  ? "Termin"
                  : "Due Date"}
              </th>

              <th style={{ width: "3%" }}>
                RL
              </th>

              <th style={{ width: "3%" }}>
                RS
              </th>

              <th style={{ width: "5%" }}>
                {isTurkish
                  ? "Kalan Risk"
                  : "Residual Risk"}
              </th>
            </tr>
          </thead>

          <tbody>
            {riskItems.map((item, index) => {
              const initialScore = item.likelihood * item.severity;
              const residualScore =
                item.residualLikelihood * item.residualSeverity;

              const printRiskClass = (score: number) => {
                if (score >= 20) return "risk-print-critical";
                if (score >= 10) return "risk-print-high";
                if (score >= 5) return "risk-print-medium";
                return "risk-print-low";
              };

              return (
                <tr key={`print-${item.id}`} className="risk-print-item">
                  <td style={{ textAlign: "center", fontWeight: 900 }}>
                    {String(index + 1).padStart(2, "0")}
                  </td>

                  <td>{item.activity || "-"}</td>
                  <td>{item.hazard || "-"}</td>
                  <td>{item.consequence || "-"}</td>
                  <td>{item.personsAtRisk || "-"}</td>
                  <td>{item.existingControls || "-"}</td>

                  <td style={{ textAlign: "center" }}>
                    {item.likelihood}
                  </td>

                  <td style={{ textAlign: "center" }}>
                    {item.severity}
                  </td>

                  <td
                    className={printRiskClass(initialScore)}
                    style={{
                      textAlign: "center",
                      fontWeight: 900,
                    }}
                  >
                    {initialScore}
                    <br />
                    {getRiskLabel(initialScore)}
                  </td>

                  <td>{item.additionalControls || "-"}</td>
                  <td>{item.responsible || "-"}</td>
                  <td>{item.targetDate || "-"}</td>

                  <td style={{ textAlign: "center" }}>
                    {item.residualLikelihood}
                  </td>

                  <td style={{ textAlign: "center" }}>
                    {item.residualSeverity}
                  </td>

                  <td
                    className={printRiskClass(residualScore)}
                    style={{
                      textAlign: "center",
                      fontWeight: 900,
                    }}
                  >
                    {residualScore}
                    <br />
                    {getRiskLabel(residualScore)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* SIGNATURE SECTION */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "10px",
            marginTop: "14px",
          }}
        >
          {[
            {
              title: isTurkish ? "Hazırlayan" : "Prepared By",
              name: assessorName,
            },
            {
              title: isTurkish ? "Kontrol Eden" : "Reviewed By",
              name: reviewedBy,
            },
            {
              title: isTurkish ? "Onaylayan" : "Approved By",
              name: approvedBy,
            },
          ].map((sign) => (
            <div
              key={sign.title}
              style={{
                minHeight: "65px",
                border: "1px solid #94a3b8",
                padding: "7px",
                fontSize: "9px",
              }}
            >
              <strong>{sign.title}</strong>

              <div
                style={{
                  marginTop: "7px",
                  fontWeight: 700,
                  minHeight: "12px",
                }}
              >
                {sign.name || "-"}
              </div>

              <div
                style={{
                  marginTop: "32px",
                  borderTop: "1px solid #cbd5e1",
                  paddingTop: "4px",
                  color: "#64748b",
                }}
              >
                {isTurkish ? "Ad / İmza / Tarih" : "Name / Signature / Date"}
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #cbd5e1",
            marginTop: "12px",
            paddingTop: "5px",
            fontSize: "7px",
            color: "#64748b",
          }}
        >
          <span>
            SafeBase • Professional Risk Assessment
          </span>

          <span>
            {isTurkish
              ? "Kontrol önlemleri uygulanmadan işe başlanmamalıdır."
              : "Work should not begin until required controls are implemented."}
          </span>
        </div>

      </section>

      {/* SAFEBASE_RISK_PRINT_REPORT_END */}



</main>
  );
}
