"use client";

import Link from "next/link";

type Props = {
  printLabel: string;
  libraryLabel: string;
  libraryHref: string;
  pdfHref: string;
};

export default function ToolboxActions({
  printLabel,
  libraryLabel,
  libraryHref,
  pdfHref,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3 print:hidden">
      <a
        href={pdfHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-blue-500"
      >
        📄 {printLabel}
      </a>

      <Link
        href={libraryHref}
        className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-white/10"
      >
        ← {libraryLabel}
      </Link>
    </div>
  );
}
