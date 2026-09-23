import Link from "next/link";

type Props = {
  locale: "tr" | "en";
  compact?: boolean;
};

export default function SafetyPackPromo({ locale, compact = false }: Props) {
  const isTurkish = locale === "tr";

  return (
    <section className={compact ? "bg-slate-950 px-6 py-6 text-white" : "bg-[#020712] px-6 py-10 text-white"}>
      <div className="mx-auto max-w-[1220px] overflow-hidden rounded-[28px] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/[0.10] via-blue-500/[0.07] to-transparent p-6 shadow-[0_20px_70px_rgba(2,132,199,.08)] sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              SERNEM Safety Packs
            </div>
            <h2 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">
              {isTurkish ? "Bir iş. Tek tam HSE paketi." : "One task. One complete HSE pack."}
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-400">
              {isTurkish
                ? "Rehber, toolbox, denetim, poster, risk analizi, Method Statement ve ilgili güvenlik levhalarını tek saha akışında açın."
                : "Open the guide, toolbox talk, inspection, poster, risk assessment, Method Statement and relevant safety signs in one field workflow."}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 px-5 py-3 text-center">
              <strong className="block text-2xl font-black text-white">9</strong>
              <span className="text-xs font-bold text-slate-500">{isTurkish ? "yüksek risk paketi" : "high-risk packs"}</span>
            </div>
            <Link
              href={`/${locale}/safety-pack`}
              className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 font-black text-white transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              {isTurkish ? "Safety Pack'leri Aç" : "Open Safety Packs"} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
