type Locale = "tr" | "en";

type Props = {
  locale: Locale;
};

export default function Footer({ locale }: Props) {
  const isTurkish = locale === "tr";

  return (
    <footer className="mt-3 flex items-center justify-between rounded-[16px] bg-slate-950 px-6 py-3 text-white">
      <div>
        <p className="text-xl font-black">
          <span className="text-emerald-500">Safe</span>Base
        </p>

        <p className="text-[9px] font-bold text-emerald-400">
          {isTurkish
            ? "Daha Güvenli Bir Yarın İçin."
            : "Better Safety, Better Tomorrow."}
        </p>
      </div>

      <p className="rounded-lg border border-red-400/40 bg-red-500/10 px-5 py-2 text-[14px] font-black uppercase tracking-wide text-red-300">
        {isTurkish
          ? "Güvenli Değilse İşi Durdur!"
          : "Stop Work If It Is Unsafe!"}
      </p>

      <div className="text-right">
        <p className="text-[8px] font-black uppercase tracking-[0.16em] text-emerald-400">
          Verified • Pro Series • 2026
        </p>

        <p className="mt-1 text-xs font-black">www.safebase.app</p>
      </div>
    </footer>
  );
}
