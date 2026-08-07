import type { PosterRule } from "@/lib/posters-v2/types";

type Props = {
  type: string;
  tone?: "mandatory" | "warning" | "information";
};

export default function PosterIcon({

  


  type,
  tone = "mandatory",
}: Props) {

  /* LADDER_POSTER_ICONS_START */

  const ladderIconType = type as string;

  if (ladderIconType === "ladder-inspection") {
    return (
      <svg viewBox="0 0 100 100" className="h-20 w-20 text-slate-950"
        fill="none" stroke="currentColor" strokeWidth="5"
        strokeLinecap="round" strokeLinejoin="round">
        <rect x="25" y="20" width="50" height="64" rx="7" />
        <path d="M38 20v-8h24v8" />
        <path d="M34 48l10 10 23-27" />
        <path d="M35 70h30" />
      </svg>
    );
  }

  if (ladderIconType === "ladder-select") {
    return (
      <svg viewBox="0 0 100 100" className="h-20 w-20 text-slate-950"
        fill="none" stroke="currentColor" strokeWidth="5"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M31 10L23 90M69 10L77 90" />
        <path d="M29 28h42M27 46h46M25 64h50M24 82h52" />
        <path d="M79 23l6 6 10-13" />
      </svg>
    );
  }

  if (ladderIconType === "ladder-ground") {
    return (
      <svg viewBox="0 0 100 100" className="h-20 w-20 text-slate-950"
        fill="none" stroke="currentColor" strokeWidth="5"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M34 13L28 70M64 13L70 70" />
        <path d="M32 29h34M30 45h38M29 61h40" />
        <path d="M10 77h80M18 88h64" />
      </svg>
    );
  }

  if (ladderIconType === "ladder-angle") {
    return (
      <svg viewBox="0 0 100 100" className="h-20 w-20 text-slate-950"
        fill="none" stroke="currentColor" strokeWidth="5"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 86h73M74 12v74M24 86L67 17" />
        <path d="M35 68l20 12M43 54l20 12M51 41l17 10" />
        <path d="M61 73a20 20 0 0 1 13 13" />
        <text x="65" y="69" fontSize="12" fontWeight="900"
          fill="currentColor" stroke="none">4:1</text>
      </svg>
    );
  }

  if (ladderIconType === "ladder-contact") {
    return (
      <svg viewBox="0 0 100 100" className="h-20 w-20 text-slate-950"
        fill="none" stroke="currentColor" strokeWidth="4.5"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 9L19 91M76 9L81 91" />
        <path d="M23 27h54M22 48h56M21 69h58" />
        <circle cx="50" cy="27" r="7" />
        <path d="M50 34v25M50 41L34 49M50 41l16 8M50 59L38 76M50 59l13 17" />
        <circle cx="34" cy="49" r="4" fill="#10b981" stroke="none" />
        <circle cx="66" cy="49" r="4" fill="#10b981" stroke="none" />
        <circle cx="38" cy="76" r="4" fill="#10b981" stroke="none" />
      </svg>
    );
  }

  if (ladderIconType === "ladder-overreach") {
    return (
      <svg viewBox="0 0 100 100" className="h-20 w-20 text-slate-950"
        fill="none" stroke="currentColor" strokeWidth="4.6"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10L16 91M58 10L63 91" />
        <path d="M19 30h41M18 50h43M17 70h45" />
        <circle cx="45" cy="31" r="7" />
        <path d="M45 38l9 23M51 44l32-12M54 61L42 78M54 61l14 16" />
        <path d="M76 24l9 8-8 10" />
      </svg>
    );
  }

  if (ladderIconType === "ladder-barricade") {
    return (
      <svg viewBox="0 0 100 100" className="h-20 w-20 text-slate-950"
        fill="none" stroke="currentColor" strokeWidth="4.6"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M33 10L28 58M63 10L68 58" />
        <path d="M31 27h34M30 43h36" />
        <rect x="9" y="63" width="82" height="19" rx="4" />
        <path d="M20 82v10M80 82v10" />
        <path d="M18 67l16 11M41 67l16 11M64 67l16 11" />
      </svg>
    );
  }

  if (ladderIconType === "ladder-stop") {
    return (
      <svg viewBox="0 0 100 100" className="h-20 w-20 text-slate-950"
        fill="none" stroke="currentColor" strokeWidth="5"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M35 9h30l26 26v30L65 91H35L9 65V35z" />
        <path d="M50 25v36" />
        <circle cx="50" cy="73" r="4"
          fill="currentColor" stroke="none" />
      </svg>
    );
  }

  /* LADDER_POSTER_ICONS_END */


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
