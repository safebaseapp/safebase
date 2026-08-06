type Props = {
  title: string;
};

const common =
  "h-[78px] w-[78px] fill-none stroke-slate-950 [stroke-linecap:round] [stroke-linejoin:round]";

export default function LotoIcon({ title }: Props) {
  if (title === "Identify Energy Sources") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <circle cx="50" cy="50" r="32" />
        <path d="M50 18v14M50 68v14M18 50h14M68 50h14" />
        <path d="m55 27-15 26h13L39 76" className="stroke-amber-500" />
        <path d="M24 27 14 17M76 27l10-10M24 73 14 83M76 73l10 10" />
      </svg>
    );
  }

  if (title === "Notify Affected Employees") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <circle cx="37" cy="29" r="10" />
        <path d="M17 82c2-23 11-34 20-34s18 11 20 34" />
        <path d="M61 32h20M61 45h15" />
        <path d="M65 59h20v18H65z" className="stroke-blue-600" />
        <path d="m71 68 4 4 8-10" className="stroke-emerald-600" />
      </svg>
    );
  }

  if (title === "Shut Down Equipment") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <rect x="20" y="17" width="60" height="67" rx="7" />
        <circle cx="50" cy="48" r="19" />
        <path d="M50 28v20" className="stroke-red-600" />
        <path d="M36 37a19 19 0 1 0 28 0" className="stroke-red-600" />
      </svg>
    );
  }

  if (title === "Isolate Every Energy Source") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <path d="M15 50h25M60 50h25" />
        <rect x="40" y="34" width="20" height="32" rx="4" />
        <path d="M50 34V20M50 66v14" />
        <path d="M30 23 70 77" className="stroke-red-600" />
        <path d="M70 23 30 77" className="stroke-red-600" />
      </svg>
    );
  }

  if (title === "Apply Locks and Tags") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <rect x="19" y="42" width="48" height="43" rx="7" />
        <path d="M30 42V29c0-20 27-20 27 0v13" />
        <circle cx="43" cy="61" r="5" className="stroke-red-600" />
        <path d="M43 66v10" className="stroke-red-600" />
        <path d="M70 26h18v43H70z" />
        <path d="M75 38h8M75 49h8M75 60h6" className="stroke-blue-600" />
      </svg>
    );
  }

  if (title === "Control Stored Energy") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <path d="M18 61h64M25 61l8-31 9 31 8-31 9 31 8-31 8 31" />
        <path d="M18 79h64" />
        <path d="M50 12v13M43 19h14" className="stroke-orange-500" />
        <path d="M84 33v23M77 49l7 7 7-7" className="stroke-blue-600" />
      </svg>
    );
  }

  if (title === "Verify Zero Energy") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <rect x="22" y="14" width="50" height="72" rx="8" />
        <rect x="31" y="25" width="32" height="22" rx="3" />
        <path d="M36 61h22M47 53v17" />
        <circle cx="47" cy="77" r="4" className="fill-emerald-600 stroke-none" />
        <path d="m70 58 7 7 14-20" className="stroke-emerald-600" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
      <path d="M50 12 82 28v23c0 20-13 32-32 39-19-7-32-19-32-39V28Z" />
      <path d="m34 51 10 10 23-29" className="stroke-emerald-600" />
      <path d="M26 80h48" className="stroke-blue-600" />
    </svg>
  );
}
