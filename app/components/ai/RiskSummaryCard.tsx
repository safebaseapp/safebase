import type { CopilotRiskLevel } from "@/lib/ai/copilot-types";

type Props = {
  locale: "tr" | "en";
  riskLevel: CopilotRiskLevel;
  title?: string;
  summary?: string;
  riskReason?: string | null;
  hazards?: string[];
  criticalControlCount?: number;
};

const riskStyles: Record<
  CopilotRiskLevel,
  {
    label: {
      tr: string;
      en: string;
    };
    badge: string;
    dot: string;
    border: string;
    background: string;
  }
> = {
  LOW: {
    label: { tr: "Düşük", en: "Low" },
    badge: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
    dot: "bg-emerald-400",
    border: "border-emerald-400/20",
    background: "from-emerald-500/[0.08] to-slate-950/70",
  },
  MEDIUM: {
    label: { tr: "Orta", en: "Medium" },
    badge: "border-yellow-400/25 bg-yellow-400/10 text-yellow-300",
    dot: "bg-yellow-400",
    border: "border-yellow-400/20",
    background: "from-yellow-500/[0.08] to-slate-950/70",
  },
  HIGH: {
    label: { tr: "Yüksek", en: "High" },
    badge: "border-orange-400/25 bg-orange-400/10 text-orange-300",
    dot: "bg-orange-400",
    border: "border-orange-400/20",
    background: "from-orange-500/[0.08] to-slate-950/70",
  },
  CRITICAL: {
    label: { tr: "Kritik", en: "Critical" },
    badge: "border-red-400/25 bg-red-400/10 text-red-300",
    dot: "bg-red-400",
    border: "border-red-400/20",
    background: "from-red-500/[0.1] to-slate-950/70",
  },
  UNDETERMINED: {
    label: { tr: "Belirlenemedi", en: "Undetermined" },
    badge: "border-slate-400/20 bg-slate-400/10 text-slate-300",
    dot: "bg-slate-400",
    border: "border-slate-400/15",
    background: "from-slate-500/[0.06] to-slate-950/70",
  },
};

export default function RiskSummaryCard({
  locale,
  riskLevel,
  title,
  summary,
  riskReason,
  hazards = [],
  criticalControlCount = 0,
}: Props) {
  const isTurkish = locale === "tr";
  const style = riskStyles[riskLevel];
  const mainHazards = hazards.slice(0, 3);

  return (
    <section
      className={`mb-6 overflow-hidden rounded-3xl border ${style.border} bg-gradient-to-br ${style.background}`}
    >
      <div className="border-b border-white/10 px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-400">
              {isTurkish ? "SafeBase Risk Özeti" : "SafeBase Risk Summary"}
            </p>

            <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">
              {title ||
                (isTurkish
                  ? "Ön Profesyonel Değerlendirme"
                  : "Preliminary Professional Assessment")}
            </h3>
          </div>

          <span
            className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] ${style.badge}`}
          >
            <span className={`h-2 w-2 rounded-full ${style.dot}`} />

            {isTurkish ? style.label.tr : style.label.en}
          </span>
        </div>
      </div>

      <div className="grid gap-5 px-5 py-5 sm:px-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
            {isTurkish ? "Değerlendirme Özeti" : "Assessment Summary"}
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-300">
            {summary ||
              (isTurkish
                ? "Bu değerlendirme, kullanıcının sağladığı bilgiler ve mevcut SafeBase Bilgi Tabanı esas alınarak hazırlanmıştır."
                : "This assessment is based on the information provided by the user and the current SafeBase Knowledge Base.")}
          </p>

          {riskReason && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                {isTurkish ? "Risk Gerekçesi" : "Risk Reason"}
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {riskReason}
              </p>
            </div>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
              {isTurkish ? "Ana Tehlikeler" : "Main Hazards"}
            </p>

            {mainHazards.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {mainHazards.map((hazard) => (
                  <li
                    key={hazard}
                    className="flex items-start gap-2 text-sm leading-6 text-slate-300"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                    <span>{hazard}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-slate-500">
                {isTurkish
                  ? "Tehlike bilgisi henüz belirlenmedi."
                  : "Hazard information has not been determined yet."}
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
              {isTurkish ? "Kritik Kontroller" : "Critical Controls"}
            </p>

            <p className="mt-3 text-3xl font-black text-white">
              {criticalControlCount}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {isTurkish
                ? "kontrol tanımlandı"
                : "controls identified"}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-4 sm:px-6">
        <p className="text-xs leading-5 text-slate-500">
          {isTurkish
            ? "Bu özet işe başlama onayı değildir. Saha risk değerlendirmesi, gerekli izinler ve yetkin kişi doğrulaması uygulanmalıdır."
            : "This summary is not approval to start work. A site-specific risk assessment, applicable permits and competent-person verification remain required."}
        </p>
      </div>
    </section>
  );
}
