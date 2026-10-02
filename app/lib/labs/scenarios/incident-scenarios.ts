import { hotWorkIncident, type IncidentChoice, type IncidentScenario } from "./incident-simulator";
import { starterIncidentScenarios } from "./starter-scenarios";
import { expertPackOne } from "./expert-pack-1";
import { expertPackTwo } from "./expert-pack-2";
import { expertPackThree } from "./expert-pack-3";

export type { IncidentChoice, IncidentScenario };

export const incidentScenarios: Record<string, IncidentScenario> = {
  [hotWorkIncident.id]: hotWorkIncident,
  ...starterIncidentScenarios,
  ...expertPackOne,
  ...expertPackTwo,
  ...expertPackThree,
};
