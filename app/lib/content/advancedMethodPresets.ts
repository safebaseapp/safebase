import type { GrowthMethodPreset } from "./growthMethodPresets";
import type { MethodExample } from "./methodExamples";
import { advancedMethodPresetsA } from "./advancedMethodPresetsA";
import { advancedMethodPresetsB } from "./advancedMethodPresetsB";

// Only the content needed by the existing generator is stored here.
// Specialist presets do not create new public method-guide routes.
export type AdvancedMethodPreset = GrowthMethodPreset & {
  method: Pick<MethodExample, "intro" | "description" | "steps" | "checks" | "stop" | "refs">;
};
export const advancedMethodPresets: AdvancedMethodPreset[] = [
  ...advancedMethodPresetsA,
  ...advancedMethodPresetsB,
];
