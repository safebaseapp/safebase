import type { SignIcon } from "@/lib/safety-signs/types";

type Props = {
  icon: SignIcon;
};

const legacyIsoFiles: Record<string, string> = {
  helmet: "M014",
  glasses: "M004",
  gloves: "M009",
  footwear: "M008",
  hearing: "M003",

  "no-smoking": "P002",
  "no-entry": "P004",
  "no-flame": "P003",

  "high-voltage": "W012",
  forklift: "W014",
  "falling-objects": "W035",
  slippery: "W011",

  "first-aid": "E003",
  "emergency-exit": "E001",
  "assembly-point": "E007",

  "fire-extinguisher": "F001",
};

function resolveIsoCode(icon: string) {
  const legacyCode = legacyIsoFiles[icon];

  if (legacyCode) {
    return legacyCode;
  }

  const normalized = icon.trim().toUpperCase();

  if (/^[EFMPW]\d{3}$/.test(normalized)) {
    return normalized;
  }

  return "W001";
}

export default function SignIcon({
  icon,
}: Props) {
  const isoCode = resolveIsoCode(icon);

  return (
    <img
      src={`/safety-signs/iso/${isoCode}.svg`}
      alt=""
      aria-hidden="true"
      className="block h-full w-full object-contain"
      draggable={false}
    />
  );
}
