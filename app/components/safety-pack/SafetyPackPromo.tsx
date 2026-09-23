import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

type Props = {
  locale: "tr" | "en";
  compact?: boolean;
};

const promoImage =
  "https://images.pexels.com/photos/7739856/pexels-photo-7739856.jpeg?auto=compress&cs=tinysrgb&w=1600";

export default function SafetyPackPromo({ locale, compact = false }: Props) {
  const isTurkish = locale === "tr";

  return (
    <section className={compact ? "bg-slate-950 px-6 py-6 text-white" : "bg-[#020712] px-6 py-10 text-white"}>
      <div className="relative mx-auto max-w-[1220px] overflow-hidden rounded-[30px] border border-cyan-400/20 bg-slate-900 shadow-[0_24px_80px_rgba(2,132,199,.10)]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${promoImage})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,18,.98)_0%,rgba(2,7,18,.90)_55%,rgba(2,7,18,.48)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_30%,rgba(6,182,212,.18),transparent_36%)]" />

        <div className="relative flex flex-col gap-7 p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-emerald-300 backdrop-blur-xl">
              <ShieldCheck size={14} />
              SERNEM Safety Packs
            </div>
            <h2 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">
              {isTurkish ? "Bir iş. Tek tam HSE paketi." : "One task. One complete HSE pack."}
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-300">
              {isTurkish
                ? "Rehber, toolbox, denetim, poster, risk analizi, Method Statement ve ilgili güvenlik levhalarını tek saha akışında açın."
                : "Open the guide, toolbox talk, inspection, poster, risk assessment, Method Statement and relevant safety signs in one field workflow."}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-stretch gap-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/55 px-5 py-3 text-center backdrop-blur-xl">
              <strong className="block text-2xl font-black text-white">9</strong>
              <span className="text-xs font-bold text-slate-400">{isTurkish ? "yüksek risk paketi" : "high-risk packs"}</span>
            </div>
            <Link
              href={`/${locale}/safety-pack`}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-black text-white transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              {isTurkish ? "Safety Pack'leri Aç" : "Open Safety Packs"} <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
