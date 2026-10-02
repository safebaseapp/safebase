import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../../../i18n/routing";
import ActivityTracker from "@/components/analytics/ActivityTracker";
import { incidentScenarios } from "@/lib/labs/scenarios/incident-simulator";
import IncidentSimulatorClient from "../IncidentSimulatorClient";

type Props = { params: Promise<{ locale: string; scenarioId: string }> };

export default async function IncidentScenarioPage({ params }: Props) {
  const { locale, scenarioId } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  if (!incidentScenarios[scenarioId]) notFound();

  return (
    <main>
      <ActivityTracker eventName="labs_incident_scenario_view" />
      <IncidentSimulatorClient locale={locale} scenarioId={scenarioId} />
    </main>
  );
}
