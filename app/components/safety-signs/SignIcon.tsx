import { resolveIsoCode } from "@/lib/safety-signs/symbols";
import type { SignIcon } from "@/lib/safety-signs/types";

type Props = {
  icon: SignIcon;
};

export default function SignIcon({
  icon,
}: Props) {
  const isoCode = resolveIsoCode(icon);

  if (!isoCode) throw new Error(`Unregistered safety symbol: ${icon}`);

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
