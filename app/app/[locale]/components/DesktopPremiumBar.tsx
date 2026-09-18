import Link from "next/link";

type Props = {
  locale: "tr" | "en";
};

export default function DesktopPremiumBar({ locale }: Props) {
  const isTurkish = locale === "tr";

  return (
    <div className="hidden border-b border-amber-400/10 bg-[#030b18] lg:block">
      <div className="mx-auto flex max-w-7xl items-center justify-end gap-4 px-6 py-2">
        <span className="text-[11px] font-bold text-slate-500">
          {isTurkish ? "Lansmana özel" : "Launch offer"}
        </span>

        <Link
          href={`/${locale}/upgrade`}
          className="inline-flex h-9 items-center gap-2 rounded-xl border border-amber-400/25 bg-amber-400/[0.08] px-4 text-xs font-black text-amber-200 transition hover:border-amber-300/40 hover:bg-amber-400/[0.12]"
        >
          <span>★</span>
          <span>Premium</span>
          <span className="text-slate-500 line-through">€14.99</span>
          <span className="text-amber-300">€9.99 / {isTurkish ? "ay" : "month"}</span>
        </Link>
      </div>
    </div>
  );
}
