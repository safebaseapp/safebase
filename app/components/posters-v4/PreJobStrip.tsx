import type { PosterDefinition } from "@/lib/posters-v2/types";

import {getPosterTechnicalProfile} from "@/lib/posters-v2/technical-profiles";

type Locale = "tr" | "en";

type Props = {
  locale: Locale;
  poster: PosterDefinition;
};

export default function PreJobStrip({ locale, poster }: Props) {
  const isTurkish = locale === "tr";

  const profile = getPosterTechnicalProfile(poster.code);
  const checks = profile?.preJob.map(item => item[locale]) ?? [isTurkish ? 'Teknik tanım eksik: işe başlamadan yetkiliye danışın.' : 'Technical profile missing: consult the responsible person before starting.'];

  return (
    <section className="mt-3 overflow-hidden rounded-[18px] border border-slate-300 bg-white shadow-sm">
      <div className="flex items-center justify-between bg-slate-950 px-5 py-2.5 text-white">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-sm font-black">
            ✓
          </span>

          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-emerald-400">
              {isTurkish ? "SERNEM İş Öncesi Kontrol" : "SERNEM Pre-Job Control"}
            </p>

            <h2 className="text-[16px] font-black uppercase leading-none">
              {isTurkish
                ? "İşe Başlamadan Önce Kontrol Et"
                : "Check Before Starting"}
            </h2>
          </div>
        </div>

        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[9px] font-black uppercase tracking-wider">
          {isTurkish ? "İŞ ÖNCESİ KONTROL" : "PRE-JOB CHECK"}
        </span>
      </div>

      <div className="grid grid-cols-7 gap-2 p-3">
        {checks.map((item) => (
          <div
            key={item}
            data-prejob-check
            className="flex min-h-[42px] items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 border-emerald-600 bg-white text-[10px] font-black text-emerald-600">
              ✓
            </span>

            <span className="text-[8px] font-black uppercase leading-[1.2] text-slate-800">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
