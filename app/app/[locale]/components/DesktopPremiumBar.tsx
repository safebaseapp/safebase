import Link from "next/link";

type Props = {
  locale: "tr" | "en";
};

export default function DesktopPremiumBar({ locale }: Props) {
  return (
    <div className="pointer-events-none absolute right-[30.5rem] top-[13px] z-[80] hidden xl:block">
      <Link
        href={`/${locale}/upgrade`}
        className="pointer-events-auto inline-flex h-10 items-center gap-2 rounded-xl border border-amber-400/25 bg-[#07101d]/95 px-3.5 text-[12px] font-black text-amber-200 shadow-[0_8px_24px_rgba(0,0,0,.28)] backdrop-blur-xl transition hover:border-amber-300/40 hover:bg-amber-400/[0.10]"
      >
        <span>★</span>
        <span>Premium</span>
        <span className="text-amber-300">€9.99</span>
      </Link>
    </div>
  );
}
