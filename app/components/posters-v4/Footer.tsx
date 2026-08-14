type Locale = "tr" | "en";

type Props = {
  locale: Locale;
};

export default function Footer({ locale }: Props) {
  const isTurkish = locale === "tr";

  return (
    <footer className="mt-3 flex items-center justify-between rounded-[16px] bg-slate-950 px-6 py-3 text-white">
      <div>
        <p className="text-3xl font-black">
          <span className="text-emerald-500">SERNEM</span>
        </p>

        <p className="text-[10px] font-bold text-emerald-400">
          {isTurkish
            ? "Daha Güvenli Bir Yarın İçin."
            : "Better Safety, Better Tomorrow."}
        </p>
      </div>

      <p className="min-w-[340px] rounded-xl border border-red-400/40 bg-red-500/10 px-7 py-2.5 text-center text-[15px] font-black uppercase tracking-[0.04em] text-red-300 shadow-inner">
        {isTurkish
          ? "Güvenli Değilse İşi Durdur!"
          : "Stop Work If It Is Unsafe!"}
      </p>

      <div className="text-right">
        <p className="text-[8px] font-black uppercase tracking-[0.16em] text-emerald-400">
          Verified • Pro Series • 2026
        </p>

        <p className="mt-1 text-xs font-black">www.sernem.com</p>
      </div>
    </footer>
  );
}
