import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../../../i18n/routing";
import ActivityTracker from "@/components/analytics/ActivityTracker";
import { getCurrentAccessProfile, requirePremiumUser } from "@/lib/auth/server-access";
import { incidentScenarios } from "@/lib/labs/scenarios/incident-simulator";
import IncidentSimulatorClient from "../IncidentSimulatorClient";

type Props = { params: Promise<{ locale: string; scenarioId: string }> };
const DEMO_ID = "hot-work-gas-drift";

export default async function IncidentScenarioPage({ params }: Props) {
  const { locale, scenarioId } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  if (!incidentScenarios[scenarioId]) notFound();

  const nextPath = `/${locale}/labs/incident-simulator/${scenarioId}`;
  const { user, profile } = await getCurrentAccessProfile();
  const isAuthenticated = Boolean(user && profile && profile.status !== "suspended");

  if (scenarioId !== DEMO_ID) {
    await requirePremiumUser({ locale, nextPath });
  }

  return (
    <main>
      <ActivityTracker eventName="labs_incident_scenario_view" />
      <IncidentSimulatorClient locale={locale} scenarioId={scenarioId} isAuthenticated={isAuthenticated} />
    </main>
  );
}
