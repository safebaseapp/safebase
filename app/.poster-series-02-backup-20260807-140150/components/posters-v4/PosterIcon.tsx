import type { PosterRule } from "@/lib/posters-v2/types";

type Props = {
  type: string;
  tone?: "mandatory" | "warning" | "information";
};

export default function PosterIcon({

  


  type,
  tone = "mandatory",
}: Props) {
  /* SAFEBASE_SERIAL_ICON_ENGINE_START */
  const sbSerialType = String(type);

  const SBIcon = ({
    children,
  }: {
    children: React.ReactNode;
  }) => (
    <svg
      viewBox="0 0 100 100"
      className="h-20 w-20 text-slate-950"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );

  if (["hsk-clean","hsk-walkway","hsk-spill","hsk-bin","hsk-trip","hsk-stack","hsk-emergency","hsk-stop"].includes(sbSerialType)) {
    if (sbSerialType === "hsk-clean") return <SBIcon><path d="M28 15l14 58M42 73l-22 8M42 73l22-3"/><path d="M63 22l16 16M71 14l-16 16"/></SBIcon>;
    if (sbSerialType === "hsk-walkway") return <SBIcon><path d="M15 82h70M27 82l8-55h30l8 55"/><path d="M40 40h20M38 55h24"/></SBIcon>;
    if (sbSerialType === "hsk-spill") return <SBIcon><path d="M50 14c14 19 23 30 23 44a23 23 0 01-46 0c0-14 9-25 23-44z"/><path d="M18 84h64"/></SBIcon>;
    if (sbSerialType === "hsk-bin") return <SBIcon><path d="M28 30h44l-4 55H32zM22 30h56M38 30v-9h24v9"/><path d="M43 43v28M57 43v28"/></SBIcon>;
    if (sbSerialType === "hsk-trip") return <SBIcon><path d="M12 78h76M18 66h25l8-15 12 9 19-2"/><circle cx="55" cy="27" r="7"/><path d="M55 34l-7 17"/></SBIcon>;
    if (sbSerialType === "hsk-stack") return <SBIcon><rect x="19" y="57" width="27" height="22"/><rect x="54" y="57" width="27" height="22"/><rect x="36" y="30" width="28" height="22"/></SBIcon>;
    if (sbSerialType === "hsk-emergency") return <SBIcon><rect x="24" y="18" width="52" height="66" rx="6"/><path d="M50 32v38M31 51h38"/></SBIcon>;
    return <SBIcon><path d="M35 9h30l26 26v30L65 91H35L9 65V35z"/><path d="M50 25v36"/><circle cx="50" cy="73" r="4" fill="currentColor" stroke="none"/></SBIcon>;
  }

  if (["exc-service","exc-inspect","exc-shield","exc-spoil","exc-access","exc-water","exc-barrier","exc-atmosphere"].includes(sbSerialType)) {
    if (sbSerialType === "exc-service") return <SBIcon><path d="M14 74h72M22 74l12-32h32l12 32"/><path d="M30 55h40M50 18v24"/><path d="M42 25h16"/></SBIcon>;
    if (sbSerialType === "exc-inspect") return <SBIcon><rect x="25" y="18" width="50" height="65" rx="7"/><path d="M37 18v-7h26v7M35 49l10 10 22-27"/></SBIcon>;
    if (sbSerialType === "exc-shield") return <SBIcon><path d="M12 25l25 59h26l25-59"/><path d="M33 37v42M67 37v42M33 50h34M33 65h34"/></SBIcon>;
    if (sbSerialType === "exc-spoil") return <SBIcon><path d="M10 78h80M19 70l15-25 17 25M60 70l10-17 12 17"/><path d="M50 22v48"/></SBIcon>;
    if (sbSerialType === "exc-access") return <SBIcon><path d="M18 20l20 64M52 20l20 64M24 38h35M29 55h35M34 72h35"/></SBIcon>;
    if (sbSerialType === "exc-water") return <SBIcon><path d="M15 77h70M50 17c13 18 21 28 21 41a21 21 0 01-42 0c0-13 8-23 21-41z"/></SBIcon>;
    if (sbSerialType === "exc-barrier") return <SBIcon><rect x="10" y="48" width="80" height="20" rx="4"/><path d="M20 68v18M80 68v18M18 52l18 12M42 52l18 12M66 52l18 12"/></SBIcon>;
    return <SBIcon><circle cx="32" cy="51" r="9"/><circle cx="52" cy="42" r="9"/><circle cx="69" cy="57" r="9"/><path d="M20 77h60"/></SBIcon>;
  }

  if (["chm-label","chm-sds","chm-storage","chm-vent","chm-spill","chm-transfer","chm-hygiene","chm-emergency"].includes(sbSerialType)) {
    if (sbSerialType === "chm-label") return <SBIcon><path d="M18 27h42l22 23-32 32-32-32z"/><circle cx="36" cy="42" r="4"/></SBIcon>;
    if (sbSerialType === "chm-sds") return <SBIcon><rect x="24" y="14" width="52" height="72" rx="5"/><path d="M35 34h30M35 48h30M35 62h21"/></SBIcon>;
    if (sbSerialType === "chm-storage") return <SBIcon><rect x="17" y="23" width="66" height="61"/><path d="M17 48h66M50 23v61"/><path d="M29 37h9M62 37h9M29 63h9M62 63h9"/></SBIcon>;
    if (sbSerialType === "chm-vent") return <SBIcon><circle cx="50" cy="50" r="11"/><path d="M50 39c-4-18 10-25 21-19-3 15-10 23-21 19zM39 50c-18-4-25 10-19 21 15-3 23-10 19-21zM50 61c4 18-10 25-21 19 3-15 10-23 21-19zM61 50c18 4 25-10 19-21-15 3-23 10-19 21z"/></SBIcon>;
    if (sbSerialType === "chm-spill") return <SBIcon><path d="M23 20l34 21-17 28L9 51z"/><path d="M57 41l18 11M68 62c8 9 11 14 11 19"/></SBIcon>;
    if (sbSerialType === "chm-transfer") return <SBIcon><path d="M18 25h26v52H18zM60 42h23v35H60z"/><path d="M44 38h18v14M54 45l8 7-8 7"/></SBIcon>;
    if (sbSerialType === "chm-hygiene") return <SBIcon><path d="M18 58c15-4 19-18 26-28M82 58C67 54 63 40 56 30"/><path d="M25 72h50"/><circle cx="50" cy="50" r="8"/></SBIcon>;
    return <SBIcon><path d="M50 13v74M13 50h74"/><rect x="24" y="24" width="52" height="52" rx="10"/></SBIcon>;
  }

  if (["flt-operator","flt-inspect","flt-load","flt-stable","flt-pedestrian","flt-visibility","flt-slope","flt-park"].includes(sbSerialType)) {
    if (sbSerialType === "flt-operator") return <SBIcon><circle cx="50" cy="25" r="9"/><path d="M50 34v23M31 83l19-26 19 26M35 45h30"/><circle cx="78" cy="63" r="9"/></SBIcon>;
    if (sbSerialType === "flt-inspect") return <SBIcon><rect x="25" y="18" width="50" height="65" rx="7"/><path d="M38 18v-7h24v7M35 49l10 10 22-27"/></SBIcon>;
    if (sbSerialType === "flt-load") return <SBIcon><path d="M17 76h66M25 76V38h27v38M52 54h22v22"/><circle cx="33" cy="82" r="7"/><circle cx="68" cy="82" r="7"/></SBIcon>;
    if (sbSerialType === "flt-stable") return <SBIcon><rect x="20" y="40" width="45" height="30"/><path d="M65 58h17v12M25 40V22h27v18"/><path d="M28 53h29"/></SBIcon>;
    if (sbSerialType === "flt-pedestrian") return <SBIcon><circle cx="27" cy="24" r="7"/><path d="M27 31v24M27 39L15 48M27 40l12 8M27 55L18 76M27 55l11 21"/><path d="M51 70h34M58 70V42h18l9 28"/></SBIcon>;
    if (sbSerialType === "flt-visibility") return <SBIcon><path d="M12 50s15-22 38-22 38 22 38 22-15 22-38 22S12 50 12 50z"/><circle cx="50" cy="50" r="9"/></SBIcon>;
    if (sbSerialType === "flt-slope") return <SBIcon><path d="M12 80h76L28 35z"/><path d="M36 62h32M42 62V49h18v13"/><circle cx="45" cy="67" r="5"/><circle cx="64" cy="67" r="5"/></SBIcon>;
    return <SBIcon><path d="M18 73h64M25 73V43h28v30M53 57h22v16"/><path d="M32 32h36M50 20v12"/><circle cx="33" cy="79" r="6"/><circle cx="67" cy="79" r="6"/></SBIcon>;
  }

  if (["mh-assess","mh-route","mh-close","mh-lift","mh-twist","mh-trolley","mh-team","mh-setdown"].includes(sbSerialType)) {
    if (sbSerialType === "mh-assess") return <SBIcon><rect x="20" y="36" width="42" height="34"/><path d="M62 49h18v21M31 36V25h20v11"/><path d="M66 24l9 9 14-17"/></SBIcon>;
    if (sbSerialType === "mh-route") return <SBIcon><path d="M15 75c20-5 18-25 35-25s15 20 35 12"/><path d="M75 52l10 10-11 8"/><circle cx="25" cy="25" r="8"/></SBIcon>;
    if (sbSerialType === "mh-close") return <SBIcon><circle cx="32" cy="22" r="7"/><path d="M32 29v28M32 38l14 12M32 57L22 78M32 57l13 21"/><rect x="47" y="43" width="30" height="25"/></SBIcon>;
    if (sbSerialType === "mh-lift") return <SBIcon><rect x="32" y="18" width="36" height="26"/><circle cx="50" cy="55" r="7"/><path d="M50 62v19M50 67L35 78M50 67l15 11"/></SBIcon>;
    if (sbSerialType === "mh-twist") return <SBIcon><circle cx="50" cy="22" r="7"/><path d="M50 29v30M50 38L33 49M50 39l17 10M50 59L39 80M50 59l12 21"/><path d="M24 32c-10 13-8 31 4 41M76 32c10 13 8 31-4 41"/></SBIcon>;
    if (sbSerialType === "mh-trolley") return <SBIcon><path d="M20 18v55h55"/><rect x="32" y="39" width="32" height="28"/><circle cx="31" cy="80" r="7"/><circle cx="68" cy="80" r="7"/></SBIcon>;
    if (sbSerialType === "mh-team") return <SBIcon><circle cx="25" cy="26" r="7"/><circle cx="75" cy="26" r="7"/><path d="M25 33v24M75 33v24"/><rect x="36" y="42" width="28" height="24"/><path d="M25 43l11 8M75 43l-11 8M25 57L17 78M25 57l9 21M75 57l8 21M75 57l-9 21"/></SBIcon>;
    return <SBIcon><rect x="27" y="42" width="46" height="34"/><path d="M18 77h64M36 42V27h28v15"/><path d="M18 27h12M70 27h12"/></SBIcon>;
  }

  if (["do-identify","do-tether","do-material","do-barricade","do-transfer","do-toeboard","do-overhead","do-final"].includes(sbSerialType)) {
    if (sbSerialType === "do-identify") return <SBIcon><path d="M50 12v46M39 47l11 11 11-11"/><rect x="22" y="68" width="56" height="17"/><path d="M25 25h13M62 25h13"/></SBIcon>;
    if (sbSerialType === "do-tether") return <SBIcon><path d="M24 24l24 24M76 24L52 48"/><circle cx="50" cy="52" r="8"/><path d="M50 60v25"/></SBIcon>;
    if (sbSerialType === "do-material") return <SBIcon><rect x="20" y="28" width="60" height="40"/><path d="M50 28v40M20 48h60"/><path d="M15 78h70"/></SBIcon>;
    if (sbSerialType === "do-barricade") return <SBIcon><rect x="9" y="54" width="82" height="19" rx="4"/><path d="M20 73v15M80 73v15M18 58l16 11M41 58l16 11M64 58l16 11"/><path d="M50 13v28M42 33l8 8 8-8"/></SBIcon>;
    if (sbSerialType === "do-transfer") return <SBIcon><rect x="16" y="21" width="28" height="23"/><rect x="56" y="58" width="28" height="23"/><path d="M44 32h27v17M63 41l8 8-8 8"/></SBIcon>;
    if (sbSerialType === "do-toeboard") return <SBIcon><path d="M13 74h74M15 60h70M22 18v42M78 18v42"/><rect x="21" y="48" width="58" height="12"/></SBIcon>;
    if (sbSerialType === "do-overhead") return <SBIcon><circle cx="50" cy="70" r="7"/><path d="M50 77v12M25 20h50M32 20v22h36V20"/><path d="M50 42v17M42 51l8 8 8-8"/></SBIcon>;
    return <SBIcon><rect x="24" y="18" width="52" height="66" rx="7"/><path d="M38 18v-7h24v7M35 49l10 10 22-27M35 70h30"/></SBIcon>;
  }

  /* SAFEBASE_SERIAL_ICON_ENGINE_END */



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
