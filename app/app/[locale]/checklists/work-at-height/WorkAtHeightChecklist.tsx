"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Locale = "tr" | "en";
type Answer = "yes" | "no" | "na" | null;

type ChecklistItem = {
  id: string;
  section: string;
  text: string;
  critical?: boolean;
};

type Props = {
  locale: Locale;
};

const checklistItems: Record<Locale, ChecklistItem[]> = {
  en: [
    {
      id: "permit",
      section: "Planning and Authorization",
      text: "A valid work-at-height permit or authorization is available.",
      critical: true,
    },
    {
      id: "risk-assessment",
      section: "Planning and Authorization",
      text: "A task-specific risk assessment and method statement have been reviewed.",
      critical: true,
    },
    {
      id: "competency",
      section: "Planning and Authorization",
      text: "Workers are trained, competent and medically fit for work at height.",
      critical: true,
    },
    {
      id: "supervision",
      section: "Planning and Authorization",
      text: "Responsible supervision has been assigned for the activity.",
    },
    {
      id: "ladder-selection",
      section: "Ladders and Access",
      text: "The correct ladder type and length have been selected.",
    },
    {
      id: "ladder-condition",
      section: "Ladders and Access",
      text: "The ladder has no visible damage, contamination or missing parts.",
      critical: true,
    },
    {
      id: "ladder-secured",
      section: "Ladders and Access",
      text: "The ladder is positioned on a stable surface and secured against movement.",
      critical: true,
    },
    {
      id: "safe-access",
      section: "Ladders and Access",
      text: "Safe access and egress are available and free from obstruction.",
    },
    {
      id: "scaffold-tag",
      section: "Scaffolding",
      text: "The scaffold has a valid inspection tag.",
      critical: true,
    },
    {
      id: "platform",
      section: "Scaffolding",
      text: "Working platforms are fully decked and free from dangerous gaps.",
      critical: true,
    },
    {
      id: "guardrails",
      section: "Scaffolding",
      text: "Top rails, mid rails and toe boards are complete.",
      critical: true,
    },
    {
      id: "scaffold-access",
      section: "Scaffolding",
      text: "Safe scaffold access is provided and access routes are clear.",
    },
    {
      id: "harness",
      section: "Fall Protection",
      text: "A suitable full-body harness has been inspected before use.",
      critical: true,
    },
    {
      id: "lanyard",
      section: "Fall Protection",
      text: "The correct lanyard or self-retracting lifeline is being used.",
      critical: true,
    },
    {
      id: "anchor",
      section: "Fall Protection",
      text: "The anchorage point is suitable, approved and positioned correctly.",
      critical: true,
    },
    {
      id: "continuous-protection",
      section: "Fall Protection",
      text: "Continuous fall protection can be maintained during movement.",
      critical: true,
    },
    {
      id: "rescue-plan",
      section: "Emergency Preparedness",
      text: "A practical rescue plan is available and understood by the team.",
      critical: true,
    },
    {
      id: "rescue-equipment",
      section: "Emergency Preparedness",
      text: "Required rescue equipment is available and ready for use.",
    },
    {
      id: "barricade",
      section: "Area Control",
      text: "The area below is barricaded to control dropped-object exposure.",
      critical: true,
    },
    {
      id: "tools-secured",
      section: "Area Control",
      text: "Tools and loose materials are secured against falling.",
      critical: true,
    },
    {
      id: "housekeeping",
      section: "Area Control",
      text: "Platforms and access routes have acceptable housekeeping.",
    },
    {
      id: "weather",
      section: "Environmental Conditions",
      text: "Wind, rain, ice, lighting and other environmental conditions are acceptable.",
      critical: true,
    },
  ],
  tr: [
    {
      id: "permit",
      section: "Planlama ve Yetkilendirme",
      text: "Geçerli bir yüksekte çalışma izni veya yetkilendirmesi mevcut.",
      critical: true,
    },
    {
      id: "risk-assessment",
      section: "Planlama ve Yetkilendirme",
      text: "İşe özel risk değerlendirmesi ve çalışma yöntemi incelenmiş.",
      critical: true,
    },
    {
      id: "competency",
      section: "Planlama ve Yetkilendirme",
      text: "Çalışanlar yüksekte çalışma için eğitimli, yetkin ve sağlık açısından uygun.",
      critical: true,
    },
    {
      id: "supervision",
      section: "Planlama ve Yetkilendirme",
      text: "Faaliyet için sorumlu saha gözetimi belirlenmiş.",
    },
    {
      id: "ladder-selection",
      section: "Merdivenler ve Erişim",
      text: "Doğru tipte ve uygun uzunlukta merdiven seçilmiş.",
    },
    {
      id: "ladder-condition",
      section: "Merdivenler ve Erişim",
      text: "Merdivende görünür hasar, kirlilik veya eksik parça bulunmuyor.",
      critical: true,
    },
    {
      id: "ladder-secured",
      section: "Merdivenler ve Erişim",
      text: "Merdiven sağlam zeminde konumlandırılmış ve harekete karşı sabitlenmiş.",
      critical: true,
    },
    {
      id: "safe-access",
      section: "Merdivenler ve Erişim",
      text: "Güvenli giriş ve çıkış mevcut, erişim yolları engelsiz.",
    },
    {
      id: "scaffold-tag",
      section: "İskele",
      text: "İskele üzerinde geçerli bir kontrol etiketi bulunuyor.",
      critical: true,
    },
    {
      id: "platform",
      section: "İskele",
      text: "Çalışma platformları tamamen kapalı ve tehlikeli boşluk içermiyor.",
      critical: true,
    },
    {
      id: "guardrails",
      section: "İskele",
      text: "Üst korkuluk, ara korkuluk ve topuk levhaları eksiksiz.",
      critical: true,
    },
    {
      id: "scaffold-access",
      section: "İskele",
      text: "İskeleye güvenli erişim sağlanmış ve erişim yolları açık.",
    },
    {
      id: "harness",
      section: "Düşmeye Karşı Koruma",
      text: "Uygun tam vücut emniyet kemeri kullanım öncesinde kontrol edilmiş.",
      critical: true,
    },
    {
      id: "lanyard",
      section: "Düşmeye Karşı Koruma",
      text: "Doğru şok emicili lanyard veya geri sarımlı düşüş durdurucu kullanılıyor.",
      critical: true,
    },
    {
      id: "anchor",
      section: "Düşmeye Karşı Koruma",
      text: "Ankraj noktası uygun, onaylı ve doğru konumda.",
      critical: true,
    },
    {
      id: "continuous-protection",
      section: "Düşmeye Karşı Koruma",
      text: "Hareket sırasında kesintisiz düşüş koruması sağlanabiliyor.",
      critical: true,
    },
    {
      id: "rescue-plan",
      section: "Acil Durum Hazırlığı",
      text: "Uygulanabilir bir kurtarma planı mevcut ve ekip tarafından biliniyor.",
      critical: true,
    },
    {
      id: "rescue-equipment",
      section: "Acil Durum Hazırlığı",
      text: "Gerekli kurtarma ekipmanları mevcut ve kullanıma hazır.",
    },
    {
      id: "barricade",
      section: "Alan Kontrolü",
      text: "Aşağıdaki alan düşen cisim riskine karşı bariyerle çevrilmiş.",
      critical: true,
    },
    {
      id: "tools-secured",
      section: "Alan Kontrolü",
      text: "Aletler ve gevşek malzemeler düşmeye karşı sabitlenmiş.",
      critical: true,
    },
    {
      id: "housekeeping",
      section: "Alan Kontrolü",
      text: "Platformlarda ve erişim yollarında saha düzeni uygun.",
    },
    {
      id: "weather",
      section: "Çevresel Koşullar",
      text: "Rüzgâr, yağmur, buzlanma, aydınlatma ve diğer çevresel koşullar uygun.",
      critical: true,
    },
  ],
};

const labels = {
  en: {
    eyebrow: "Interactive field inspection",
    title: "Work at Height Inspection",
    subtitle:
      "Complete each inspection item and identify critical conditions before allowing work to begin.",
    back: "Back to checklists",
    company: "Company",
    project: "Project",
    area: "Area / Location",
    inspector: "Inspector",
    permit: "Permit Number",
    date: "Inspection Date",
    companyPlaceholder: "Company name",
    projectPlaceholder: "Project name",
    areaPlaceholder: "Work area",
    inspectorPlaceholder: "Inspector name",
    permitPlaceholder: "Permit reference",
    yes: "Yes",
    no: "No",
    na: "N/A",
    critical: "Critical",
    progress: "Progress",
    completed: "Completed",
    score: "Compliance score",
    findings: "Critical findings",
    result: "Inspection result",
    pending: "Inspection incomplete",
    passed: "Passed",
    failed: "Failed",
    pendingText: "Answer every applicable item to complete the inspection.",
    passedText: "No critical failures were identified.",
    failedText: "One or more critical controls were answered No.",
    comments: "Inspection comments",
    commentsPlaceholder:
      "Record findings, corrective actions, responsible persons or additional notes...",
    reset: "Reset inspection",
    print: "Print / Save PDF",
    disclaimer:
      "This checklist supports field inspections but does not replace applicable legislation, permits, risk assessments, manufacturer instructions or site procedures.",
    generated: "Generated with SafeBase",
  },
  tr: {
    eyebrow: "Etkileşimli saha denetimi",
    title: "Yüksekte Çalışma Kontrolü",
    subtitle:
      "Çalışmaya izin vermeden önce her kontrol maddesini tamamlayın ve kritik koşulları belirleyin.",
    back: "Kontrol listelerine dön",
    company: "Firma",
    project: "Proje",
    area: "Alan / Lokasyon",
    inspector: "Denetçi",
    permit: "İzin Numarası",
    date: "Denetim Tarihi",
    companyPlaceholder: "Firma adı",
    projectPlaceholder: "Proje adı",
    areaPlaceholder: "Çalışma alanı",
    inspectorPlaceholder: "Denetçi adı",
    permitPlaceholder: "İzin referansı",
    yes: "Evet",
    no: "Hayır",
    na: "Uygulanamaz",
    critical: "Kritik",
    progress: "İlerleme",
    completed: "Tamamlanan",
    score: "Uygunluk puanı",
    findings: "Kritik bulgu",
    result: "Denetim sonucu",
    pending: "Denetim tamamlanmadı",
    passed: "Başarılı",
    failed: "Başarısız",
    pendingText:
      "Denetimi tamamlamak için uygulanabilir tüm maddeleri cevaplayın.",
    passedText: "Kritik bir uygunsuzluk tespit edilmedi.",
    failedText: "Bir veya daha fazla kritik kontrol Hayır olarak işaretlendi.",
    comments: "Denetim notları",
    commentsPlaceholder:
      "Bulguları, düzeltici faaliyetleri, sorumluları veya ek notları yazın...",
    reset: "Denetimi sıfırla",
    print: "Yazdır / PDF Kaydet",
    disclaimer:
      "Bu kontrol listesi saha denetimini destekler; geçerli mevzuatın, izinlerin, risk değerlendirmelerinin, üretici talimatlarının veya saha prosedürlerinin yerine geçmez.",
    generated: "SafeBase ile oluşturuldu",
  },
};

export default function WorkAtHeightChecklist({ locale }: Props) {
  const t = labels[locale];
  const items = checklistItems[locale];

  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [comments, setComments] = useState("");

  const answeredCount = items.filter(
    (item) => answers[item.id] !== null && answers[item.id] !== undefined,
  ).length;

  const applicableItems = items.filter((item) => answers[item.id] !== "na");

  const yesCount = applicableItems.filter(
    (item) => answers[item.id] === "yes",
  ).length;

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

  const sections = Array.from(new Set(items.map((item) => item.section)));

  function updateAnswer(id: string, answer: Exclude<Answer, null>) {
    setAnswers((current) => ({
      ...current,
      [id]: answer,
    }));
  }

  function resetInspection() {
    setAnswers({});
    setComments("");
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
                  {sectionItems.map((item, index) => {
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
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

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
