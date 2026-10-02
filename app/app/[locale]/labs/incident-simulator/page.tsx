import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../../i18n/routing";
import ActivityTracker from "@/components/analytics/ActivityTracker";
import IncidentSimulatorClient from "./IncidentSimulatorClient";

type Props = { params: Promise<{ locale: string }> };

export default async function IncidentSimulatorPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <main>
      <ActivityTracker eventName="labs_incident_simulator_view" />
      <IncidentSimulatorClient locale={locale} />
    </main>
  );
}
