import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../../../i18n/routing";
import ActivityTracker from "@/components/analytics/ActivityTracker";
import { getCurrentAccessProfile, requireActiveUser, requirePremiumUser } from "@/lib/auth/server-access";
import { getIncidentCatalogItem } from "@/lib/labs/scenarios/incident-catalog";
import { incidentScenarios } from "@/lib/labs/scenarios/incident-scenarios";
import IncidentSimulatorClient from "../IncidentSimulatorClient";

type Props = { params: Promise<{ locale: string; scenarioId: string }> };

export default async function IncidentScenarioPage({ params }: Props) {
  const { locale, scenarioId } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const scenario = incidentScenarios[scenarioId];
  const catalogItem = getIncidentCatalogItem(scenarioId);
  if (!scenario || !catalogItem) notFound();

  const nextPath = `/${locale}/labs/incident-simulator/${scenarioId}`;

  if (catalogItem.access === "free") {
    await requireActiveUser({ locale, nextPath });
  }
  if (catalogItem.access === "premium") {
    await requirePremiumUser({ locale, nextPath });
  }

  const { user, profile } = await getCurrentAccessProfile();
  const isAuthenticated = Boolean(user && profile && profile.status !== "suspended");

  return (
    <main>
      <ActivityTracker eventName="labs_incident_scenario_view" />
      <IncidentSimulatorClient locale={locale} scenarioId={scenarioId} isAuthenticated={isAuthenticated} />
    </main>
  );
}
