type Props = {
  title: string;
};

const common =
  "h-[78px] w-[78px] fill-none stroke-slate-950 [stroke-linecap:round] [stroke-linejoin:round]";

export default function PpeRuleIcon({ title }: Props) {
  if (title === "Assess the Hazards") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <path d="M50 12 88 82H12Z" />
        <path d="M50 35v23M50 70v1" className="stroke-orange-500" />
        <circle cx="73" cy="69" r="14" />
        <path d="m83 79 9 9" className="stroke-blue-600" />
      </svg>
    );
  }

  if (title === "Follow Mandatory PPE Signs") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <circle cx="50" cy="47" r="34" className="stroke-blue-600" />
        <path d="M31 53c2-17 10-27 19-27s17 10 19 27" />
        <path d="M27 53h46M36 53v13M64 53v13" />
        <path d="M25 84h50" />
      </svg>
    );
  }

  if (title === "Select the Correct PPE") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <path d="M50 12 80 25v24c0 20-12 32-30 40-18-8-30-20-30-40V25Z" />
        <path d="m34 50 10 10 23-29" className="stroke-emerald-600" />
        <path d="M27 82h46" className="stroke-blue-600" />
      </svg>
    );
  }

  if (title === "Correct Fit and Adjustment") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <circle cx="50" cy="27" r="11" />
        <path d="M28 85c2-25 12-38 22-38s20 13 22 38" />
        <path d="M28 61h44M37 50l-9 11M63 50l9 11" />
        <path d="M17 32h17M66 32h17" className="stroke-blue-600" />
        <path d="m22 26-6 6 6 6M78 26l6 6-6 6" className="stroke-blue-600" />
      </svg>
    );
  }

  if (title === "Inspect Before Use") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <path d="M24 20h42v56H24z" />
        <path d="M34 20v-8h22v8M34 37h22M34 51h17M34 65h12" />
        <circle cx="69" cy="67" r="16" />
        <path d="m80 79 10 10" className="stroke-orange-500" />
        <path d="m63 67 5 5 9-12" className="stroke-emerald-600" />
      </svg>
    );
  }

  if (title === "Wear PPE Correctly") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <circle cx="50" cy="25" r="10" />
        <path d="M29 85c2-25 11-39 21-39s19 14 21 39" />
        <path d="M34 53 50 69l16-16M50 69v16" />
        <path d="m72 28 7 7 13-18" className="stroke-emerald-600" />
      </svg>
    );
  }

  if (title === "Clean and Store Safely") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <rect x="18" y="39" width="64" height="46" rx="7" />
        <path d="M31 39V27h38v12M18 55h64" />
        <path d="M68 16c8 8 8 15 0 22-8-7-8-14 0-22Z" className="stroke-blue-600" />
        <path d="m37 66 5 5 10-13" className="stroke-emerald-600" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
      <path d="M50 12 80 25v24c0 20-12 32-30 40-18-8-30-20-30-40V25Z" />
      <path d="M30 30 70 70M70 30 30 70" className="stroke-red-600" />
      <path d="M25 84h50" />
    </svg>
  );
}
