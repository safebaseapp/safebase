"use client";

import { calculateSeverityRate } from "@/lib/hse-metrics";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  AlertTriangle,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Copy,
  Info,
  ListChecks,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

export default function SeverityRateCalculatorPage() {
  const params = useParams();
  const locale = params?.locale === "tr" ? "tr" : "en";
  const isTurkish = locale === "tr";

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

    return calculateSeverityRate(days, hours);
  }, [lostWorkdays, hoursWorked]);

  const performanceLevel =
    result === null
      ? ""
      : result < 10
        ? isTurkish
          ? "Mükemmel"
          : "Excellent"
        : result < 25
          ? isTurkish
            ? "İyi"
            : "Good"
          : result < 50
            ? isTurkish
              ? "Orta"
              : "Fair"
            : result <= 100
              ? isTurkish
                ? "Zayıf"
                : "Poor"
              : isTurkish
                ? "Kabul Edilemez"
                : "Unacceptable";

  const interpretation =
    result === null
      ? ""
      : result < 10
        ? isTurkish
          ? "Kayıp iş günü etkisi oldukça düşük. Mevcut önleyici uygulamalarınızı sürdürün ve iyi performansı koruyun."
          : "The impact of lost workdays is very low. Maintain current preventive practices and preserve strong performance."
        : result < 25
          ? isTurkish
            ? "Genel performans iyi seviyede. Tekrarlayan olayları ve işe dönüş süreçlerini izlemeye devam edin."
            : "Overall performance is good. Continue monitoring recurring incidents and return-to-work processes."
          : result < 50
            ? isTurkish
              ? "Şiddet oranı orta seviyede. Kayıp iş günlerini azaltmak için rehabilitasyon, işe dönüş planlaması ve önleyici aksiyonları güçlendirin."
              : "Severity is at a fair level. Strengthen rehabilitation, return-to-work planning and preventive actions to reduce lost workdays."
            : result <= 100
              ? isTurkish
                ? "Şiddet oranı yüksek. Ciddi olayları, iyileşme sürelerini ve düzeltici faaliyetleri ayrıntılı olarak gözden geçirin."
                : "Severity is high. Review serious incidents, recovery periods and corrective actions in detail."
              : isTurkish
                ? "Şiddet oranı kritik seviyede. Ağır yaralanmalar, uzun süreli iş göremezlik ve düzeltici faaliyetler için acil yönetim incelemesi önerilir."
                : "Severity is critical. Immediate management review is recommended for serious injuries, prolonged lost time and corrective actions.";

  const clearCalculator = () => {
    setLostWorkdays("");
    setHoursWorked("");
    setCopied(false);
  };

  const copyResult = async () => {
    if (result === null) return;

    const textToCopy = isTurkish
      ? [
          `Şiddet Oranı Sonucu: ${result.toFixed(2)}`,
          `Performans Seviyesi: ${performanceLevel}`,
          `Yorum: ${interpretation}`,
          "Formül: (Kayıp İş Günü × 200.000) ÷ Toplam Çalışılan Saat",
        ].join("\n")
      : [
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

  const gaugePercent =
    result === null ? 0 : Math.min(Math.max(result, 0), 120) / 120 * 100;

  const resultAccent =
    result === null
      ? "from-blue-500 to-cyan-400"
      : result < 10
        ? "from-emerald-400 to-green-500"
        : result < 25
          ? "from-cyan-400 to-blue-500"
          : result < 50
            ? "from-amber-400 to-yellow-500"
            : result <= 100
              ? "from-orange-400 to-orange-600"
              : "from-red-400 to-red-600";

  const gaugeColor =
    result === null
      ? "#3b82f6"
      : result < 10
        ? "#10b981"
        : result < 25
          ? "#06b6d4"
          : result < 50
            ? "#f59e0b"
            : result <= 100
              ? "#f97316"
              : "#ef4444";

  const resultTextColor =
    result === null
      ? "text-blue-300"
      : result < 10
        ? "text-emerald-300"
        : result < 25
          ? "text-cyan-300"
          : result < 50
            ? "text-amber-300"
            : result <= 100
              ? "text-orange-300"
              : "text-red-300";

  const riskSignals =
    result === null
      ? []
      : result < 10
        ? isTurkish
          ? [
              "Belirgin bir yüksek şiddet göstergesi görülmüyor.",
              "Mevcut önleyici kontrolleri sürdürün.",
              "Trend değişimlerini düzenli olarak takip edin.",
            ]
          : [
              "No major high-severity indicator is visible.",
              "Maintain existing preventive controls.",
              "Continue monitoring changes in the trend.",
            ]
        : result < 25
          ? isTurkish
            ? [
                "Tekrarlayan kayıp iş günü olaylarını takip edin.",
                "İşe dönüş süreçlerini gözden geçirin.",
                "Kritik faaliyetlerde önleyici kontrolleri doğrulayın.",
              ]
            : [
                "Monitor recurring lost-workday cases.",
                "Review return-to-work processes.",
                "Verify preventive controls for critical activities.",
              ]
          : result < 50
            ? isTurkish
              ? [
                  "Kayıp iş günü süresinde artış riski.",
                  "Rehabilitasyon ve işe dönüş planları gözden geçirilmeli.",
                  "Tekrarlayan yaralanmalar için kök neden analizi yapılmalı.",
                ]
              : [
                  "Risk of increasing lost-workday duration.",
                  "Review rehabilitation and return-to-work plans.",
                  "Perform root cause analysis for recurring injuries.",
                ]
            : result <= 100
              ? isTurkish
                ? [
                    "Ciddi yaralanma veya uzun iş göremezlik riski.",
                    "Düzeltici faaliyetlerin etkinliği doğrulanmalı.",
                    "Yönetim seviyesinde olay incelemesi önerilir.",
                  ]
                : [
                    "Risk of serious injury or prolonged absence.",
                    "Verify the effectiveness of corrective actions.",
                    "Management-level incident review is recommended.",
                  ]
              : isTurkish
                ? [
                    "Ağır yaralanma ve uzun süreli iş göremezlik göstergesi.",
                    "Kritik olaylar ve yüksek potansiyelli vakalar acilen incelenmeli.",
                    "Kök neden analizi ve düzeltici faaliyet planı oluşturulmalı.",
                    "Üst yönetim tarafından performans ve kontroller gözden geçirilmeli.",
                  ]
                : [
                    "Indicator of serious injury and prolonged lost time.",
                    "Critical and high-potential incidents require urgent review.",
                    "Root cause analysis and corrective action planning are required.",
                    "Management should review performance and critical controls.",
                  ];

  return (
    <main className="min-h-screen bg-[#020817] px-4 py-8 text-white sm:px-6 lg:py-10">
      <div className="mx-auto max-w-[1380px]">
        <Link
          href={`/${locale}/tools`}
          className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 transition hover:text-blue-300"
        >
          ← {isTurkish ? "Güvenlik Hesaplayıcılarına Dön" : "Back to Safety Calculators"}
        </Link>

        <section className="mt-7 grid gap-6 xl:grid-cols-[1.03fr_0.97fr]">
          {/* LEFT */}
          <section className="relative overflow-hidden rounded-[28px] border border-blue-400/20 bg-gradient-to-br from-slate-900 via-[#081225] to-[#050b18] p-6 shadow-[0_30px_80px_rgba(0,0,0,.35)] sm:p-8">
            <div className="pointer-events-none absolute bottom-[-70px] right-[-30px] h-52 w-80 opacity-40 [background:radial-gradient(circle_at_center,rgba(37,99,235,.24),transparent_62%)]" />

            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[22px] border border-blue-400/20 bg-blue-500/[0.10] text-blue-300 shadow-[0_15px_35px_rgba(37,99,235,.16)]">
                  <ShieldCheck size={38} strokeWidth={1.7} />
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-400">
                    {isTurkish
                      ? "GÜVENLİK PERFORMANS HESAPLAMA ARACI"
                      : "SAFETY PERFORMANCE CALCULATOR"}
                  </p>

                  <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
                    {isTurkish
                      ? "Şiddet Oranı Hesaplayıcı"
                      : "Severity Rate Calculator"}
                  </h1>

                  <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-300 sm:text-base">
                    {isTurkish
                      ? "Kayıp iş günleri ve toplam çalışan saatlerini kullanarak iş kazalarının şiddet oranını profesyonel şekilde hesaplayın."
                      : "Measure the severity of workplace injuries using lost workdays and total employee hours worked."}
                  </p>
                </div>
              </div>

              <div className="my-7 h-px bg-white/[0.08]" />

              <div className="flex items-center gap-3 text-blue-400">
                <ListChecks size={20} />
                <h2 className="text-sm font-black uppercase tracking-[0.18em]">
                  {isTurkish ? "GİRDİ BİLGİLERİ" : "INPUT DATA"}
                </h2>
              </div>

              <div className="mt-6 space-y-6">
                <InputRow
                  icon={<CalendarDays size={25} />}
                  label={isTurkish ? "Kayıp iş günü sayısı" : "Lost workdays"}
                  help={
                    isTurkish
                      ? "İş kazaları nedeniyle kaybedilen toplam gün sayısı."
                      : "Total number of days lost due to work-related injuries."
                  }
                  info={
                    isTurkish
                      ? "Aynı raporlama döneminde iş kazası veya işle ilişkili yaralanma nedeniyle çalışanların işe gelemediği toplam kayıp iş günü sayısını girin. Kurumunuzun resmi raporlama yöntemini kullanın. Örnek: Bir çalışan 20 gün, başka bir çalışan 10 gün işe gelemediyse toplam 30 girilir."
                      : "Enter the total number of lost workdays caused by occupational injuries during the same reporting period. Follow your organization's official reporting method. Example: if one employee loses 20 days and another loses 10 days, enter 30."
                  }
                  value={lostWorkdays}
                  onChange={setLostWorkdays}
                  placeholder={isTurkish ? "Örnek: 30" : "Example: 30"}
                  suffix={isTurkish ? "gün" : "days"}
                  min="0"
                />

                <InputRow
                  icon={<Clock3 size={25} />}
                  label={isTurkish ? "Toplam çalışılan saat" : "Total hours worked"}
                  help={
                    isTurkish
                      ? "Tüm çalışanlar tarafından çalışılan toplam saat."
                      : "Total number of hours worked by all employees."
                  }
                  info={
                    isTurkish
                      ? "Aynı raporlama döneminde tüm çalışanların gerçekleştirdiği toplam çalışma saatini girin. Örnek: 250 çalışan yılda ortalama 2.000 saat çalıştıysa toplam 500.000 çalışan-saat kullanılır."
                      : "Enter the total employee hours worked during the same reporting period. Example: 250 employees working approximately 2,000 hours each equals 500,000 employee-hours."
                  }
                  value={hoursWorked}
                  onChange={setHoursWorked}
                  placeholder={isTurkish ? "Örnek: 500000" : "Example: 500000"}
                  suffix={isTurkish ? "saat" : "hours"}
                  min="1"
                />
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={clearCalculator}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-6 text-sm font-black text-slate-200 transition hover:border-white/20 hover:bg-white/[0.055]"
                >
                  <RotateCcw size={17} />
                  {isTurkish ? "Temizle" : "Clear"}
                </button>

                <button
                  type="button"
                  onClick={() => {}}
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 text-sm font-black text-white shadow-[0_12px_30px_rgba(37,99,235,.25)] transition hover:-translate-y-0.5 hover:from-blue-500 hover:to-violet-500"
                >
                  <BarChart3 size={18} />
                  {isTurkish
                    ? "Şiddet Oranını Hesapla"
                    : "Calculate Severity Rate"}
                </button>
              </div>

              <div className="mt-7 flex items-start gap-3 rounded-2xl border border-blue-400/20 bg-blue-500/[0.055] p-4 text-sm leading-6 text-slate-300">
                <Info size={20} className="mt-0.5 shrink-0 text-blue-400" />
                <p>
                  {isTurkish
                    ? "Şiddet oranı, 200.000 çalışan-saat başına kaybedilen iş günü sayısını ifade eder."
                    : "The severity rate is expressed as the number of lost workdays per 200,000 employee hours worked."}
                </p>
              </div>
            </div>
          </section>

          {/* RIGHT */}
          <div className="space-y-5">
            {/* RESULT */}
            <section className="relative overflow-hidden rounded-[28px] border border-emerald-400/20 bg-gradient-to-br from-[#071c25] via-[#061522] to-[#03101b] p-6 shadow-[0_25px_70px_rgba(0,0,0,.30)] sm:p-8">
              <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-500/[0.09] text-emerald-300">
                <BarChart3 size={24} />
              </div>

              <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-400">
                {isTurkish ? "ŞİDDET ORANI SONUCU" : "SEVERITY RATE RESULT"}
              </p>

              <div className="mt-6 grid gap-6 sm:grid-cols-[175px_1fr] sm:items-center">
                <div className="relative mx-auto h-[170px] w-[170px]">
                  <div className="absolute inset-0 rounded-full bg-slate-950 shadow-[inset_0_0_30px_rgba(0,0,0,.65),0_10px_35px_rgba(0,0,0,.35)]" />

                  <div
                    className="absolute inset-2 rounded-full"
                    style={{
                      background: `conic-gradient(${gaugeColor} ${Math.max(
                        gaugePercent * 3.6,
                        result === null ? 55 : 360
                      )}deg, #12213d 0deg)`,
                    }}
                  />

                  <div className="absolute inset-[14px] flex items-center justify-center rounded-full bg-[#030a17]">
                    <span className="text-4xl font-black text-white">
                      {result === null ? "—" : result.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div>
                  <h3
                    className={`text-2xl font-black ${
                      result === null ? "text-white" : resultTextColor
                    }`}
                  >
                    {result === null
                      ? isTurkish
                        ? "Sonuç Henüz Yok"
                        : "No result yet"
                      : performanceLevel}
                  </h3>

                  <p className="mt-3 max-w-md text-sm font-medium leading-7 text-slate-300">
                    {result === null
                      ? isTurkish
                        ? "Şiddet oranını hesaplamak için kayıp iş günü ve toplam çalışılan saat değerlerini girin."
                        : "Enter lost workdays and total hours worked to calculate the severity rate."
                      : interpretation}
                  </p>

                  {result !== null && (
                    <div
                      className={`mt-5 rounded-2xl border p-4 ${
                        result < 10
                          ? "border-emerald-400/15 bg-emerald-500/[0.045]"
                          : result < 25
                            ? "border-cyan-400/15 bg-cyan-500/[0.045]"
                            : result < 50
                              ? "border-amber-400/15 bg-amber-500/[0.045]"
                              : result <= 100
                                ? "border-orange-400/15 bg-orange-500/[0.045]"
                                : "border-red-400/20 bg-red-500/[0.055]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <AlertTriangle
                          size={16}
                          className={resultTextColor}
                        />

                        <p
                          className={`text-[11px] font-black uppercase tracking-[0.14em] ${resultTextColor}`}
                        >
                          {isTurkish
                            ? "DİKKAT EDİLMESİ GEREKEN NOKTALAR"
                            : "KEY RISK INDICATORS"}
                        </p>
                      </div>

                      <div className="mt-3 space-y-2">
                        {riskSignals.map((risk) => (
                          <div
                            key={risk}
                            className="flex items-start gap-2 text-xs leading-5 text-slate-300"
                          >
                            <span
                              className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${
                                result < 10
                                  ? "bg-emerald-400"
                                  : result < 25
                                    ? "bg-cyan-400"
                                    : result < 50
                                      ? "bg-amber-400"
                                      : result <= 100
                                        ? "bg-orange-400"
                                        : "bg-red-400"
                              }`}
                            />

                            <span>{risk}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {result !== null && (
                    <button
                      type="button"
                      onClick={copyResult}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/[0.06] px-4 py-2 text-xs font-black text-emerald-300 transition hover:bg-emerald-500/[0.10]"
                    >
                      <Copy size={15} />
                      {copied
                        ? isTurkish
                          ? "Kopyalandı ✓"
                          : "Copied ✓"
                        : isTurkish
                          ? "Sonucu Kopyala"
                          : "Copy Result"}
                    </button>
                  )}
                </div>
              </div>
            </section>

            {/* FORMULA */}
            <section className="rounded-[26px] border border-violet-400/20 bg-gradient-to-br from-violet-950/30 via-slate-900 to-slate-950 p-6 sm:p-7">
              <div className="flex items-center gap-3 text-violet-400">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-400/20 bg-violet-500/[0.09]">
                  ∑
                </div>
                <h2 className="text-lg font-black uppercase tracking-[0.14em]">
                  {isTurkish ? "FORMÜL" : "FORMULA"}
                </h2>
              </div>

              <div className="mt-5 rounded-2xl border border-violet-400/35 bg-slate-950/80 px-5 py-5 text-center font-mono text-sm font-bold leading-8 text-blue-300 sm:text-lg">
                {isTurkish
                  ? "Şiddet Oranı = (Kayıp İş Günü × 200.000) ÷ Toplam Çalışılan Saat"
                  : "Severity Rate = (Lost Workdays × 200,000) ÷ Total Hours Worked"}
              </div>

              <p className="mt-5 text-sm font-medium leading-7 text-slate-300">
                {isTurkish
                  ? "Şiddet oranı, 200.000 çalışan-saat başına kaybedilen iş günü sayısını gösterir."
                  : "The severity rate shows the number of lost workdays per 200,000 employee hours worked."}
              </p>
            </section>

            {/* IMPORTANT */}
            <section className="relative overflow-hidden rounded-[26px] border border-amber-500/25 bg-gradient-to-br from-amber-950/30 via-[#1a110c] to-[#0d0908] p-6 sm:p-7">
              <div className="absolute right-5 top-5 text-amber-500/80">
                <ShieldAlert size={64} strokeWidth={1.2} />
              </div>

              <div className="relative max-w-[80%]">
                <div className="flex items-center gap-3 text-amber-400">
                  <AlertTriangle size={20} />
                  <h2 className="font-black uppercase tracking-[0.14em]">
                    {isTurkish ? "ÖNEMLİ" : "IMPORTANT"}
                  </h2>
                </div>

                <p className="mt-4 text-sm font-medium leading-7 text-amber-100/85">
                  {isTurkish
                    ? "Şiddet oranı eşikleri işletmeye, sektöre ve raporlama standartlarına göre değişebilir. Sonucu olay ayrıntıları, kök neden analizi ve kurum içi performans hedefleriyle birlikte değerlendirin."
                    : "Severity rate thresholds can vary by company, industry and reporting standard. Use the result together with incident details, root cause analysis and internal performance targets."}
                </p>
              </div>
            </section>
          </div>
        </section>


        {/* METRIC EXPLAINER */}
        <section className="mt-6 overflow-hidden rounded-[26px] border border-blue-400/15 bg-gradient-to-br from-[#071327] via-slate-900/90 to-[#040a16] p-5 shadow-[0_20px_60px_rgba(0,0,0,.25)] sm:p-6">
          <div className="flex flex-col gap-3 border-b border-white/[0.07] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                {isTurkish ? "SERNEM METRİK REHBERİ" : "SERNEM METRIC GUIDE"}
              </p>

              <h2 className="mt-2 text-xl font-black tracking-tight text-white sm:text-2xl">
                {isTurkish
                  ? "Şiddet Oranı neyi gösterir?"
                  : "What does Severity Rate measure?"}
              </h2>
            </div>

            <div className="rounded-full border border-blue-400/15 bg-blue-500/[0.06] px-3 py-1.5 text-[10px] font-bold text-blue-300">
              SR = Lost Workdays × 200,000 / Hours
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <MetricInfoCard
              number="01"
              title={isTurkish ? "Bu metrik nedir?" : "What is this metric?"}
              text={
                isTurkish
                  ? "Şiddet Oranı, iş kazalarının yalnızca kaç kez gerçekleştiğini değil, çalışanların ne kadar süre işten uzak kaldığını ölçer. Böylece yaralanmaların iş gücü üzerindeki etkisini gösterir."
                  : "Severity Rate measures not only incident frequency, but the amount of working time lost because of occupational injuries."
              }
            />

            <MetricInfoCard
              number="02"
              title={isTurkish ? "Neden 200.000 saat?" : "Why 200,000 hours?"}
              text={
                isTurkish
                  ? "200.000 çalışan-saat, farklı büyüklükteki işyerlerini ortak bir ölçekte karşılaştırmak için kullanılan normalizasyon bazıdır. Yaklaşık 100 tam zamanlı çalışanın yıllık çalışma süresini temsil eder."
                  : "The 200,000-hour base normalizes results so organizations of different sizes can be compared on a common scale."
              }
            />

            <MetricInfoCard
              number="03"
              title={isTurkish ? "12.00 ne anlama gelir?" : "What does 12.00 mean?"}
              text={
                isTurkish
                  ? "12.00 sonucu, girilen dönemdeki kayıp iş günlerinin 200.000 çalışan-saatlik ortak ölçeğe çevrildiğinde 12 kayıp iş gününe karşılık geldiğini gösterir."
                  : "A result of 12.00 means the lost-workday impact is equivalent to 12 lost days per 200,000 employee-hours."
              }
            />

            <MetricInfoCard
              number="04"
              title={isTurkish ? "Renkler neye göre?" : "How are colors used?"}
              text={
                isTurkish
                  ? "Renk bantları hızlı yorumlama için SERNEM referans sınıflandırmasıdır. Yasal veya evrensel sınırlar değildir; şirket geçmişi, sektör verileri ve kurumun raporlama standardıyla birlikte değerlendirilmelidir."
                  : "Color bands are SERNEM reference categories for quick interpretation. They are not universal legal limits and should be considered with company and industry benchmarks."
              }
            />
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-400/15 bg-amber-500/[0.045] p-4">
            <AlertTriangle
              size={18}
              className="mt-0.5 shrink-0 text-amber-400"
            />

            <p className="text-xs font-medium leading-6 text-slate-300">
              {isTurkish
                ? "Yorumlama notu: Daha düşük bir Şiddet Oranı genellikle daha düşük kayıp iş günü etkisini gösterir. Ancak tek başına güvenlik performansının iyi veya kötü olduğunu kanıtlamaz. TRIR, LTIFR, olay şiddeti, ramak kala verileri ve kök neden analizleriyle birlikte değerlendirilmelidir."
                : "Interpretation note: A lower Severity Rate generally indicates lower lost-workday impact, but it should not be used alone to judge overall safety performance. Review it together with TRIR, LTIFR, incident severity, near-miss data and root cause findings."}
            </p>
          </div>
        </section>

        {/* REFERENCE */}
        <section className="mt-6 rounded-[26px] border border-white/[0.08] bg-slate-900/70 p-5 shadow-[0_20px_60px_rgba(0,0,0,.25)] sm:p-6">
          <h2 className="text-sm font-black uppercase tracking-[0.14em] text-blue-400">
            {isTurkish
              ? "ŞİDDET ORANI REFERANS ARALIKLARI (200.000 çalışan-saat başına)"
              : "SEVERITY RATE REFERENCE (per 200,000 hours)"}
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <ReferenceItem
              title={isTurkish ? "MÜKEMMEL" : "EXCELLENT"}
              value="< 10"
              accent="emerald"
            />
            <ReferenceItem
              title={isTurkish ? "İYİ" : "GOOD"}
              value="10 – 25"
              accent="cyan"
            />
            <ReferenceItem
              title={isTurkish ? "ORTA" : "FAIR"}
              value="25 – 50"
              accent="amber"
            />
            <ReferenceItem
              title={isTurkish ? "ZAYIF" : "POOR"}
              value="50 – 100"
              accent="orange"
            />
            <ReferenceItem
              title={isTurkish ? "KABUL EDİLEMEZ" : "UNACCEPTABLE"}
              value="> 100"
              accent="red"
            />
          </div>
        </section>

        <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.018] px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-blue-400" />
            {isTurkish
              ? "Doğru ölçüm, güçlü bir güvenlik kültürünün temelidir."
              : "Accurate measurement supports a stronger safety culture."}
          </div>

          <div className="font-bold text-slate-400">
            SERNEM Safety Platform
          </div>
        </div>
      </div>
    </main>
  );
}

function InputRow({
  icon,
  label,
  help,
  info,
  value,
  onChange,
  placeholder,
  suffix,
  min,
}: {
  icon: React.ReactNode;
  label: string;
  help: string;
  info: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  suffix: string;
  min: string;
}) {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <div className="grid gap-4 sm:grid-cols-[64px_1fr]">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/[0.07] text-blue-300">
        {icon}
      </div>

      <div className="min-w-0">
        <div className="mb-2 flex items-center gap-2">
          <label className="text-sm font-black text-slate-200">
            {label}
          </label>

          <button
            type="button"
            onClick={() => setInfoOpen((current) => !current)}
            aria-expanded={infoOpen}
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
              infoOpen
                ? "border-blue-400/40 bg-blue-500/[0.14] text-blue-300"
                : "border-white/10 bg-white/[0.025] text-slate-500 hover:border-blue-400/30 hover:bg-blue-500/[0.08] hover:text-blue-300"
            }`}
          >
            <Info size={13} />
          </button>
        </div>

        <div className="flex overflow-hidden rounded-xl border border-slate-700 bg-slate-950 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/15">
          <input
            type="number"
            min={min}
            step="1"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-white outline-none placeholder:text-slate-600"
          />

          <div className="flex min-w-[74px] items-center justify-center border-l border-slate-800 px-3 text-sm font-bold text-slate-400">
            {suffix}
          </div>
        </div>

        <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
          {help}
        </p>

        {infoOpen && (
          <div className="mt-3 overflow-hidden rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/[0.08] via-[#071225] to-[#050b17] shadow-[0_18px_50px_rgba(0,0,0,.28)]">
            <div className="flex items-start gap-3 p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/[0.10] text-blue-300">
                <Info size={17} />
              </div>

              <div className="min-w-0">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-400">
                    SERNEM INFO
                  </p>

                  <button
                    type="button"
                    onClick={() => setInfoOpen(false)}
                    className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-500 transition hover:text-slate-300"
                  >
                    ×
                  </button>
                </div>

                <p className="mt-2 text-xs font-medium leading-6 text-slate-300">
                  {info}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MetricInfoCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition duration-300 hover:border-blue-400/20 hover:bg-blue-500/[0.04]">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black tracking-[0.16em] text-blue-400">
          {number}
        </span>

        <div className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,.7)]" />
      </div>

      <h3 className="mt-3 text-sm font-black text-white">
        {title}
      </h3>

      <p className="mt-2 text-xs font-medium leading-6 text-slate-400">
        {text}
      </p>
    </div>
  );
}

function ReferenceItem({
  title,
  value,
  accent,
}: {
  title: string;
  value: string;
  accent: "emerald" | "cyan" | "amber" | "orange" | "red";
}) {
  const styles = {
    emerald: "border-emerald-400/20 bg-emerald-500/[0.05] text-emerald-400",
    cyan: "border-cyan-400/20 bg-cyan-500/[0.05] text-cyan-400",
    amber: "border-amber-400/20 bg-amber-500/[0.05] text-amber-400",
    orange: "border-orange-400/20 bg-orange-500/[0.05] text-orange-400",
    red: "border-red-400/20 bg-red-500/[0.05] text-red-400",
  };

  return (
    <div className={`rounded-2xl border p-4 ${styles[accent]}`}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-current/20 bg-current/[0.04]">
          <ShieldCheck size={20} />
        </div>

        <div>
          <div className="text-xs font-black tracking-[0.08em]">
            {title}
          </div>
          <div className="mt-1 text-lg font-black">{value}</div>
        </div>
      </div>
    </div>
  );
}
