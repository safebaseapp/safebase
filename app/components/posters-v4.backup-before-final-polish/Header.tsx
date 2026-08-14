import type { PosterDefinition } from "@/lib/posters-v2/types";

type Locale = "tr" | "en";

type Props = {
  locale: Locale;
  poster: PosterDefinition;
};

export default function Header({ locale, poster }: Props) {
  const isTurkish = locale === "tr";

  return (
    <header className="grid grid-cols-[1fr_265px] gap-5 rounded-[24px] border border-slate-300 bg-white p-6 shadow-sm">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-red-600 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">
            {isTurkish ? "Yüksek Riskli Faaliyet" : "High-Risk Activity"}
          </span>

          <span className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-700">
            Sernem Pro Series
          </span>

          <span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-emerald-700">
            Verified 2026
          </span>
        </div>

        <div className="mt-5">
          <p className="text-[34px] font-black leading-none">
            <span className="text-emerald-600">Safe</span>Base
          </p>

          <p className="mt-2 text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">
            {isTurkish
              ? "İş Sağlığı ve Güvenliği Kaynakları"
              : "Health and Safety Resources"}
          </p>
        </div>

        <h1 className="mt-6 max-w-[760px] text-[45px] font-black uppercase leading-[0.94] tracking-[-0.035em] text-slate-950">
          {poster.title[locale]}
        </h1>

        <div className="mt-5 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-300" />

          <p className="text-[15px] font-black uppercase tracking-[0.06em] text-slate-700">
            {poster.slogan[locale]}
          </p>

          <div className="h-px flex-1 bg-slate-300" />
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-[20px] bg-slate-950 p-5 text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-emerald-400">
              Document
            </p>

            <p className="mt-2 text-lg font-black">{poster.code}</p>

            <p className="mt-1 text-[10px] font-bold text-slate-400">
              {isTurkish ? "Revizyon" : "Revision"} {poster.revision}
            </p>
          </div>

          <span className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-black uppercase">
            {locale.toUpperCase()}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <div className="rounded-xl bg-white p-2">
            <img
              src="/posters/safebase-qr.png"
              alt="Sernem QR"
              className="h-[78px] w-[78px]"
            />
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-emerald-400">
              {isTurkish ? "Tarayın" : "Scan"}
            </p>

            <p className="mt-2 text-[10px] font-bold leading-4 text-slate-300">
              {isTurkish
                ? "Checklist, toolbox ve profesyonel rehberler"
                : "Checklists, toolbox talks and professional guides"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
