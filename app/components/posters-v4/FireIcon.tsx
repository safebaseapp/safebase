type Props = {
  title: string;
};

const common =
  "h-[78px] w-[78px] fill-none stroke-slate-950 [stroke-linecap:round] [stroke-linejoin:round]";

export default function FireIcon({ title }: Props) {
  if (title === "Raise the Alarm") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <rect x="25" y="18" width="50" height="65" rx="7" />
        <circle cx="50" cy="49" r="16" className="stroke-red-600" />
        <path d="M50 38v13M50 61v1" className="stroke-red-600" />
        <path d="M19 24 11 16M81 24l8-8M18 49H8M82 49h10" />
      </svg>
    );
  }

  if (title === "Evacuate Safely") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <rect x="18" y="14" width="50" height="72" rx="4" />
        <path d="M68 51h22M81 42l9 9-9 9" className="stroke-emerald-600" />
        <circle cx="40" cy="33" r="7" />
        <path d="m41 42-5 17M37 50l15 8M36 59 25 16M36 59 23 78" />
      </svg>
    );
  }

  if (title === "Select the Correct Extinguisher") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <rect x="34" y="31" width="34" height="55" rx="8" />
        <path d="M42 31V20h20v11M45 20v-8h22M67 12l12 8" />
        <path d="M68 44h9c6 0 8 5 8 10v9" />
        <path d="M45 57c12-7 16 4 7 11-8 6-15-4-7-11Z" className="stroke-red-600" />
        <path d="M18 83h64" />
      </svg>
    );
  }

  if (title === "Fight Incipient Fires Only") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <path d="M31 75c-13-13-7-30 6-40 1 11 7 15 10 23 8-9 9-20 3-34 17 11 26 27 21 43-6 19-30 25-40 8Z" className="stroke-red-600" />
        <path d="M20 84h61" />
        <path d="M13 26h21M13 36h14" className="stroke-emerald-600" />
      </svg>
    );
  }

  if (title === "Inspect the Extinguisher") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <rect x="27" y="25" width="28" height="58" rx="8" />
        <path d="M34 25V15h15v10M49 15h13l9 7" />
        <circle cx="69" cy="65" r="16" />
        <path d="m80 77 11 11" className="stroke-orange-500" />
        <path d="M64 65h10M69 60v10" className="stroke-orange-500" />
      </svg>
    );
  }

  if (title === "Control Fuel and Ignition Sources") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <path d="M50 14c2 13 17 20 17 35 0 12-8 22-17 22S33 61 33 49c0-11 7-19 12-27 1 10 5 14 5 20 7-8 6-18 0-28Z" className="stroke-red-600" />
        <path d="M17 84h66M20 77 80 22" />
        <circle cx="28" cy="28" r="8" className="stroke-orange-500" />
      </svg>
    );
  }

  if (title === "Keep Exits and Equipment Clear") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <rect x="15" y="17" width="45" height="68" rx="4" />
        <path d="M60 51h30M81 42l9 9-9 9" className="stroke-emerald-600" />
        <path d="M26 71h21M26 60h21" />
        <path d="M69 75h18" className="stroke-red-600" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
      <path d="M52 15c1 13 17 20 17 36 0 13-8 23-19 23S31 64 31 51c0-11 7-20 13-29 1 11 5 15 6 21 7-8 7-18 2-28Z" className="stroke-red-600" />
      <path d="M20 85h60" />
      <path d="M16 30h20M23 22l-8 8 8 8" className="stroke-blue-600" />
    </svg>
  );
}
