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
    <div className="print:hidden">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <a
          href={pdfHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-black text-white transition hover:-translate-y-1 hover:bg-blue-500 sm:w-auto"
        >
          📄 {printLabel}
        </a>

        <Link
          href={libraryHref}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm font-black text-white transition hover:-translate-y-1 hover:bg-white/10 sm:w-auto"
        >
          ← {libraryLabel}
        </Link>
      </div>
      <p className="mt-2 text-xs leading-5 text-slate-400">
        SERNEM hesabı ile ücretsiz standart PDF indirme / Free standard PDF download with a SERNEM account.
      </p>
    </div>
  );
}
