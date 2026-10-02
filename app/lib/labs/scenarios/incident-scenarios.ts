import { hotWorkIncident, type IncidentChoice, type IncidentScenario } from "./incident-simulator";
import { starterIncidentScenarios } from "./starter-scenarios";

export type { IncidentChoice, IncidentScenario };

export const incidentScenarios: Record<string, IncidentScenario> = {
  [hotWorkIncident.id]: hotWorkIncident,
  ...starterIncidentScenarios,
};
