import type { SafetyGuide } from "../../components/GuideTemplate";
import { specialistIndustrialGuides } from "./specialist-industrial";
import { specialistProcessGuides } from "./specialist-process";

export const specialistGuides: SafetyGuide[] = [
  ...specialistIndustrialGuides,
  ...specialistProcessGuides,
];
if (specialistGuides.length !== 12) throw new Error("SERNEM expects 12 specialist industry guides");
