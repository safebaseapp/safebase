"use client";

import { useState } from "react";

type PrintButtonProps = {
  label?: string;
  loadingLabel?: string;
  onClick?: () => void;
  className?: string;
};

export default function PrintButton({
  label = "PDF / Yazdır",
  loadingLabel = "Hazırlanıyor...",
  onClick,
  className = "",
}: PrintButtonProps) {
  const [isPreparing, setIsPreparing] = useState(false);

  const handleClick = () => {
    if (isPreparing) return;

    setIsPreparing(true);

    setTimeout(() => {
      if (onClick) {
        onClick();
      } else {
        window.print();
      }

      setTimeout(() => {
        setIsPreparing(false);
      }, 500);
    }, 250);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPreparing}
      className={`
        group inline-flex items-center justify-center gap-3
        rounded-xl border border-blue-300/40
        bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500
        px-5 py-3
        text-sm font-black text-white
        shadow-[0_10px_30px_rgba(37,99,235,0.30)]
        transition-all duration-200
        hover:-translate-y-0.5
        hover:border-blue-200/70
        hover:shadow-[0_15px_38px_rgba(37,99,235,0.45)]
        active:translate-y-0
        active:scale-[0.97]
        disabled:cursor-wait
        disabled:opacity-80
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-blue-400
        focus-visible:ring-offset-2
        focus-visible:ring-offset-slate-950
        print:hidden
        ${className}
      `}
    >
      <span
        className="
          flex h-8 w-8 items-center justify-center
          rounded-lg border border-white/15
          bg-white/10 text-base
          transition-colors duration-200
          group-hover:bg-white/20
        "
      >
        {isPreparing ? "◌" : "📄"}
      </span>

      <span>{isPreparing ? loadingLabel : label}</span>

      {!isPreparing && (
        <span
          aria-hidden="true"
          className="
            text-blue-100
            transition-transform duration-200
            group-hover:translate-x-1
          "
        >
          →
        </span>
      )}
    </button>
  );
}