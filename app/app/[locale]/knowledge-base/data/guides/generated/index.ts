import { generatedHeightAccessGuides } from "./height-access";
import { generatedLiftingRiggingGuides } from "./lifting-rigging";
import { generatedEnergyMachineryGuides } from "./energy-machinery";
import { generatedHotworkFireGuides } from "./hotwork-fire";
import { generatedConfinedAtmosphericGuides } from "./confined-atmospheric";
import { generatedCivilScaffoldGuides } from "./civil-scaffold";
import { generatedToolsMaintenanceGuides } from "./tools-maintenance";
import { generatedChemicalHealthGuides } from "./chemical-health";
import { generatedGeneralHseGuides } from "./general-hse";

export const generatedGuides = [
  ...generatedHeightAccessGuides,
  ...generatedLiftingRiggingGuides,
  ...generatedEnergyMachineryGuides,
  ...generatedHotworkFireGuides,
  ...generatedConfinedAtmosphericGuides,
  ...generatedCivilScaffoldGuides,
  ...generatedToolsMaintenanceGuides,
  ...generatedChemicalHealthGuides,
  ...generatedGeneralHseGuides,
];

if (generatedGuides.length !== 86) {
  throw new Error(`SERNEM generated guide catalog expected 86 guides, received ${generatedGuides.length}.`);
}
