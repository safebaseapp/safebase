type Props = {
  number: string;
  tone: "mandatory" | "warning" | "information";
};

export default function HotWorkIcon({ number, tone }: Props) {
  const accent =
    tone === "warning"
      ? "stroke-orange-500"
      : tone === "information"
        ? "stroke-blue-600"
        : "stroke-emerald-600";

  const common =
    "h-[78px] w-[78px] fill-none stroke-slate-950 [stroke-linecap:round] [stroke-linejoin:round]";

  if (number === "01") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <rect x="25" y="15" width="50" height="70" rx="5" />
        <path d="M38 15v-6h24v6M36 36h28M36 52h28M36 68h16" />
        <path d="m57 69 7 7 15-18" className={accent} />
      </svg>
    );
  }

  if (number === "02") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <path d="M21 75h58M30 75V48h40v27" />
        <path d="M42 48V36h16v12" />
        <path
          d="M50 10c9 10 13 17 13 25a13 13 0 0 1-26 0c0-7 4-14 13-25Z"
          className={accent}
        />
        <path d="M18 18 82 82" />
      </svg>
    );
  }

  if (number === "03") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <rect x="25" y="18" width="50" height="66" rx="9" />
        <circle cx="50" cy="42" r="15" />
        <path d="M50 42 59 34M37 68h26" />
        <circle cx="38" cy="68" r="2" className={`${accent} fill-current stroke-none`} />
        <circle cx="50" cy="68" r="2" className={`${accent} fill-current stroke-none`} />
        <circle cx="62" cy="68" r="2" className={`${accent} fill-current stroke-none`} />
      </svg>
    );
  }

  if (number === "04") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <circle cx="31" cy="25" r="9" />
        <path d="M31 34v29M18 48h26M31 63 20 82M31 63l12 19" />
        <rect x="55" y="36" width="22" height="39" rx="5" />
        <path d="M61 36v-8h11v8M77 48h8" />
        <path
          d="M66 44c6 7 8 11 8 16a8 8 0 0 1-16 0c0-5 2-9 8-16Z"
          className={accent}
        />
      </svg>
    );
  }

  if (number === "05") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <rect x="32" y="30" width="36" height="55" rx="7" />
        <path d="M42 30V18h22v12M64 20h11l8 10M68 44h10" />
        <path
          d="M50 45c8 9 11 15 11 22a11 11 0 0 1-22 0c0-7 3-13 11-22Z"
          className={accent}
        />
      </svg>
    );
  }

  if (number === "06") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <path d="M16 78h35M42 78V61l17-17" />
        <path d="m58 45 13 13M65 38l8-8" />
        <path d="m74 37 14-5M72 46l16 5M65 31l6-14" className={accent} />
        <path d="M22 65h20" />
      </svg>
    );
  }

  if (number === "07") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <rect x="22" y="20" width="22" height="65" rx="9" />
        <rect x="56" y="20" width="22" height="65" rx="9" />
        <path d="M28 20v-8h10v8M62 20v-8h10v8M44 64h12" />
        <path d="M33 34v35M67 34v35" className={accent} />
        <path d="M18 85h64" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
      <circle cx="50" cy="50" r="33" />
      <path d="M50 30v22l15 10" />
      <path
        d="M25 72c-7-9-7-18 2-27 2 9 9 11 11 19 2 7-3 13-13 8Z"
        className={accent}
      />
    </svg>
  );
}
