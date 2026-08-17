"use client";

import Link from "next/link";
import PrintButton from "@/components/ui/PrintButton";

type Props = {
  printLabel: string;
  libraryLabel: string;
  libraryHref: string;
};

export default function ToolboxActions({
  printLabel,
  libraryLabel,
  libraryHref,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3 print:hidden">
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-blue-500"
      >
        🖨️ {printLabel}
      </button>

      <Link
        href={libraryHref}
        className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-white/10"
      >
        ← {libraryLabel}
      </Link>
    </div>
  );
}