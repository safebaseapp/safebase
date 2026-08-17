"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PrintButton from "@/components/ui/PrintButton";

type Props = {
  locale: "tr" | "en";
};

export default function PosterFormatToolbar({ locale }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isTurkish = locale === "tr";
  const selectedSize =
    searchParams.get("size") === "a4" ? "a4" : "a3";

  function selectSize(size: "a4" | "a3") {
    router.replace(`${pathname}?size=${size}`, {
      scroll: false,
    });
  }

  function printPoster(size: "a4" | "a3") {
    selectSize(size);

    window.setTimeout(() => {
      window.print();
    }, 400);
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => selectSize("a4")}
        className={`rounded-xl border px-5 py-3 text-sm font-black transition ${
          selectedSize === "a4"
            ? "border-blue-500 bg-blue-600 text-white"
            : "border-slate-300 bg-white text-slate-800 hover:border-blue-400"
        }`}
      >
        A4 {isTurkish ? "Önizleme" : "Preview"}
      </button>

      <button
        type="button"
        onClick={() => printPoster("a4")}
        className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-blue-500"
      >
        ↓ {isTurkish ? "A4 PDF Kaydet" : "Save A4 PDF"}
      </button>

      <button
        type="button"
        onClick={() => selectSize("a3")}
        className={`rounded-xl border px-5 py-3 text-sm font-black transition ${
          selectedSize === "a3"
            ? "border-emerald-500 bg-emerald-600 text-white"
            : "border-slate-300 bg-white text-slate-800 hover:border-emerald-400"
        }`}
      >
        A3 {isTurkish ? "Önizleme" : "Preview"}
      </button>

      <button
        type="button"
        onClick={() => printPoster("a3")}
        className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
      >
        ↓ {isTurkish ? "A3 PDF Kaydet" : "Save A3 PDF"}
      </button>

      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800 transition hover:border-blue-400 hover:text-blue-600"
      >
        🖨 {isTurkish ? "Yazdır" : "Print"}
      </button>
    </div>
  );
}