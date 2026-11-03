import type { SafetyGuide } from "../../components/GuideTemplate";
import { industrialNextGuidesA } from "./industrial-growth-a";
import { industrialNextGuidesB } from "./industrial-growth-b";
import { industrialNextGuidesC } from "./industrial-growth-c";
import { industrialNextGuidesD } from "./industrial-growth-d";

/** Twelve non-duplicative, specialist TR/EN field guides.
 * These are part of the existing Knowledge Base, never a separate gallery.
 */
export const industrialGrowthGuides: SafetyGuide[] = [
  ...industrialNextGuidesA,
  ...industrialNextGuidesB,
  ...industrialNextGuidesC,
  ...industrialNextGuidesD,
];
if (industrialGrowthGuides.length !== 12) throw new Error("SERNEM expects 12 new industrial guides");
