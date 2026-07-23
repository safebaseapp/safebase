import type { SafetyGuide } from "../../components/GuideTemplate";

import { workingAtHeightGuide } from "./working-at-height";
import { confinedSpaceGuide } from "./confined-space";
import { hotWorkGuide } from "./hot-work";
import { lotoGuide } from "./loto";
import { ppeGuide } from "./ppe";
import { grindingGuide } from "./grinding";
import { excavationGuide } from "./excavation";
import { scaffoldingGuide } from "./scaffolding";
import { electricalSafetyGuide } from "./electrical-safety";
import { fireSafetyGuide } from "./fire-safety";
import { craneSafetyGuide } from "./crane-safety";
import { chemicalSafetyGuide } from "./chemical-safety";

export const allGuides: SafetyGuide[] = [
  workingAtHeightGuide,
  confinedSpaceGuide,
  hotWorkGuide,
  lotoGuide,
  ppeGuide,
  grindingGuide,
  excavationGuide,
  scaffoldingGuide,
  electricalSafetyGuide,
  fireSafetyGuide,
  craneSafetyGuide,
  chemicalSafetyGuide,
];

export function getGuideBySlug(slug: string) {
  return allGuides.find((guide) => guide.slug === slug);
}
