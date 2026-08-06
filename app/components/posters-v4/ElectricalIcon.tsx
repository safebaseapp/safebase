type Props = {
  title: string;
};

const common =
  "h-[78px] w-[78px] fill-none stroke-slate-950 [stroke-linecap:round] [stroke-linejoin:round]";

export default function ElectricalIcon({ title }: Props) {
  if (title === "De-Energize") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <rect x="20" y="17" width="60" height="67" rx="6" />
        <path d="M34 32h32M34 48h32M34 64h17" />
        <path
          d="m60 27-13 23h11L43 75"
          className="stroke-amber-500"
        />
        <path
          d="M19 82 82 18"
          className="stroke-red-600"
        />
      </svg>
    );
  }

  if (title === "Apply LOTO") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <rect x="19" y="42" width="62" height="43" rx="7" />
        <path d="M35 42V28c0-21 30-21 30 0v14" />
        <circle
          cx="50"
          cy="61"
          r="6"
          className="stroke-red-600"
        />
        <path
          d="M50 67v9"
          className="stroke-red-600"
        />
        <path d="M13 86h74" />
      </svg>
    );
  }

  if (title === "Verify De-Energization") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <rect x="25" y="12" width="50" height="76" rx="8" />
        <rect x="34" y="23" width="32" height="25" rx="3" />
        <path d="M39 64h22M50 55v18" />
        <circle
          cx="50"
          cy="78"
          r="4"
          className="fill-emerald-600 stroke-none"
        />
        <path
          d="m81 55-8 8-5-5"
          className="stroke-emerald-600"
        />
      </svg>
    );
  }

  if (title === "Qualified Persons Only") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <circle cx="42" cy="28" r="11" />
        <path d="M19 84c2-24 13-36 23-36s21 12 23 36" />
        <path d="M13 84h60" />
        <path
          d="M70 21h18M79 12v18"
          className="stroke-emerald-600"
        />
        <path
          d="m78 48-8 16h9l-10 20"
          className="stroke-amber-500"
        />
      </svg>
    );
  }

  if (title === "Inspect Equipment") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <path d="M24 32h44v45H24z" />
        <path d="M35 32V20h23v12M24 51h44" />
        <circle cx="72" cy="69" r="15" />
        <path
          d="m82 80 10 10"
          className="stroke-orange-500"
        />
        <path
          d="M67 64h10M72 59v10"
          className="stroke-orange-500"
        />
      </svg>
    );
  }

  if (title === "Ground-Fault Protection") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <path d="M50 12v44" />
        <path d="M32 56h36M37 67h26M43 78h14" />
        <path
          d="m70 20-12 20h10L55 63"
          className="stroke-amber-500"
        />
        <path
          d="M18 83h64"
          className="stroke-emerald-600"
        />
      </svg>
    );
  }

  if (title === "Control the Work Area") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
        <path d="M13 81h74M21 81l13-56h32l13 56" />
        <path d="M27 52h46M23 67h54" />
        <path
          d="M34 25 66 52M66 25 34 52"
          className="stroke-orange-500"
        />
        <path
          d="m47 35 7-12h-6l8-12"
          className="stroke-amber-500"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 100" className={common} strokeWidth="5">
      <path d="M50 10 84 26v24c0 21-14 34-34 41-20-7-34-20-34-41V26Z" />
      <path
        d="m56 20-15 28h13L39 77"
        className="stroke-amber-500"
      />
      <path
        d="M23 79h54"
        className="stroke-blue-600"
      />
    </svg>
  );
}
