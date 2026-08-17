"use client";

type PrintButtonProps = {
  label?: string;
  onClick?: () => void;
  className?: string;
};

export default function PrintButton({
  label = "PDF / Yazdır",
  onClick,
  className = "",
}: PrintButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    window.print();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
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
        📄
      </span>

      <span>{label}</span>

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
    </button>
  );
}
