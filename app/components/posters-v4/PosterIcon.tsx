import type { PosterRule } from "@/lib/posters-v2/types";

type Props = {
  type: PosterRule["icon"];
  tone?: "mandatory" | "warning" | "information";
};

export default function PosterIcon({
  type,
  tone = "mandatory",
}: Props) {
  const accent =
    tone === "warning"
      ? "stroke-orange-500"
      : tone === "information"
        ? "stroke-blue-600"
        : "stroke-emerald-600";

  const common =
    "h-[76px] w-[76px] fill-none stroke-slate-950 [stroke-linecap:round] [stroke-linejoin:round]";

  if (type === "ladder") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5.5">
        <path d="M27 88 39 12M73 88 61 12" />
        <path d="M35 31h30M32 49h36M30 68h40" />
        <path d="M23 88h54" className={accent} />
      </svg>
    );
  }

  if (type === "harness") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5.5">
        <path d="m27 15 18 36-13 36M73 15 55 51l13 36" />
        <path d="M32 87 50 67l18 20M37 58h26" />
        <circle cx="50" cy="51" r="8" className={`${accent} fill-current stroke-none`} />
      </svg>
    );
  }

  if (type === "anchor") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5.5">
        <circle cx="50" cy="19" r="10" />
        <path d="M50 29v54M33 46h34" />
        <path d="M17 56c3 24 22 34 33 14 11 20 30 10 33-14" />
        <path d="m12 56 8-2M88 56l-8-2" className={accent} />
      </svg>
    );
  }

  if (type === "guardrail") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5.5">
        <path d="M15 82h70M23 18v64M77 18v64" />
        <path d="M23 32h54M23 53h54" />
        <path d="M23 72h54" className={accent} />
      </svg>
    );
  }

  if (type === "fall") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5.5">
        <path d="M8 79h34V63" />
        <circle cx="57" cy="22" r="7" className="fill-slate-950 stroke-none" />
        <path d="m58 32 13 17M68 44l21-11M71 50 53 70M73 52l18 21" />
        <path
          d="M43 20v48m-7-9 7 10 7-10"
          className={accent}
          strokeDasharray="5 5"
        />
      </svg>
    );
  }

  if (type === "weather") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5.5">
        <path d="M18 41c-11 0-12-18 1-20 4-15 27-17 35-3 18-5 28 15 16 23Z" />
        <path d="M17 58c18-8 39-8 64 0M12 75c24-9 45-9 67 0" />
        <path d="m73 16 8-8M82 24l11-2" className={accent} />
      </svg>
    );
  }

  if (type === "equipment") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5.5">
        <rect x="16" y="38" width="68" height="47" rx="5" />
        <path d="M34 38V27h32v11M18 59h64" />
        <rect
          x="43"
          y="52"
          width="14"
          height="13"
          rx="2"
          className={`${accent} fill-current stroke-none`}
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 100" className={common} strokeWidth="5.5">
      <path d="M15 82h70M23 82V50M77 82V50" />
      <path d="M23 50 50 22l27 28" />
      <circle cx="50" cy="47" r="8" />
      <path d="M50 55v20M37 65h26" />
      <path d="M18 82h64" className={accent} />
    </svg>
  );
}
