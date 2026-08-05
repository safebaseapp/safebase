"use client";

export default function PrintPosterButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:bg-blue-700 active:scale-[0.98]"
    >
      A3 PDF Olarak Kaydet
    </button>
  );
}
