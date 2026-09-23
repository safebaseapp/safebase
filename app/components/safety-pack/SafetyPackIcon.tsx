import {
  CircleDot,
  Construction,
  FireExtinguisher,
  Flame,
  FlaskConical,
  HardHat,
  Layers3,
  LockKeyhole,
  Zap,
} from "lucide-react";

type Props = {
  slug: string;
  size?: number;
  strokeWidth?: number;
};

const iconMap = {
  "working-at-height": HardHat,
  "confined-space": CircleDot,
  "hot-work": Flame,
  loto: LockKeyhole,
  excavation: Construction,
  scaffolding: Layers3,
  electrical: Zap,
  fire: FireExtinguisher,
  chemical: FlaskConical,
} as const;

export default function SafetyPackIcon({ slug, size = 24, strokeWidth = 1.8 }: Props) {
  const Icon = iconMap[slug as keyof typeof iconMap] ?? HardHat;
  return <Icon size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
}
