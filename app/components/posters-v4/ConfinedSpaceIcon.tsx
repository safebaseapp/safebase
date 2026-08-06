type Props = {
  title: string;
};

const common =
  "h-[78px] w-[78px] fill-none stroke-slate-950 [stroke-linecap:round] [stroke-linejoin:round]";

export default function ConfinedSpaceIcon({ title }: Props) {
  if (title === "Entry Permit") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <rect x="22" y="12" width="56" height="76" rx="5" />
        <path d="M35 12V7h30v5M34 32h32M34 48h20M34 64h17" />
        <path d="m57 65 8 8 17-23" className="stroke-emerald-600" />
      </svg>
    );
  }

  if (title === "Atmospheric Testing") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <rect x="27" y="11" width="46" height="78" rx="8" />
        <rect x="35" y="22" width="30" height="25" rx="3" />
        <path d="M40 61h20M50 53v16" />
        <circle cx="50" cy="77" r="4" className="fill-emerald-600 stroke-none" />
        <path
          d="M79 29c8 5 8 15 0 20M86 21c15 9 15 27 0 36"
          className="stroke-blue-600"
        />
      </svg>
    );
  }

  if (title === "Energy Isolation") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <rect x="19" y="40" width="62" height="46" rx="7" />
        <path d="M34 40V27c0-22 32-22 32 0v13" />
        <circle cx="50" cy="59" r="6" className="stroke-red-600" />
        <path d="M50 65v10" className="stroke-red-600" />
        <path d="M13 83h74" />
      </svg>
    );
  }

  if (title === "Entry Attendant") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <circle cx="43" cy="28" r="11" />
        <path d="M20 84c2-24 13-36 23-36s21 12 23 36" />
        <path d="M13 84h60" />
        <path d="M69 27h17M77 19v16" className="stroke-emerald-600" />
        <path d="M75 54c10 4 14 12 14 24" className="stroke-blue-600" />
      </svg>
    );
  }

  if (title === "Ventilation") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <circle cx="49" cy="50" r="9" />
        <path d="M49 41c-2-23 19-29 25-14 5 13-11 22-25 23Z" />
        <path d="M58 54c21 8 17 30 2 31-14 1-17-17-11-35Z" />
        <path d="M44 57c-17 15-34 1-27-12 7-12 24-5 32 5Z" />
        <path d="M78 50h14M80 63h12" className="stroke-blue-600" />
      </svg>
    );
  }

  if (title === "Communication") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <rect x="25" y="18" width="42" height="70" rx="7" />
        <path d="M37 18V8h18v10M35 39h22M35 52h22" />
        <circle cx="46" cy="72" r="6" />
        <path
          d="M74 30c9 5 9 15 0 20M81 22c16 9 16 27 0 36"
          className="stroke-blue-600"
        />
      </svg>
    );
  }

  if (title === "Rescue Readiness") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <path d="M18 86h64M29 86 50 15l21 71M38 48h24" />
        <circle cx="50" cy="58" r="8" />
        <path d="M50 66v17M38 73h24" />
        <path d="M50 24v19" className="stroke-orange-500" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
      <rect x="24" y="13" width="52" height="74" rx="8" />
      <path d="M34 31h32M34 46h32M34 61h20" />
      <circle cx="65" cy="67" r="13" className="stroke-blue-600" />
      <path d="M65 59v9l6 4" className="stroke-blue-600" />
      <path d="M15 87h70" />
    </svg>
  );
}
