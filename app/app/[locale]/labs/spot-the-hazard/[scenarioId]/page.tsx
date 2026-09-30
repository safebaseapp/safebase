import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../../../i18n/routing";
import SpotTheHazardGame from "@/components/labs/SpotTheHazardGame";
import { getSpotTheHazardScenario, getSpotTheHazardScenarios } from "@/lib/labs/scenarios/spot-the-hazard";
import type { LabCategory } from "@/lib/labs/types";

type Props = { params: Promise<{ locale: string; scenarioId: string }> };

const sceneByCategory: Partial<Record<LabCategory, string>> = {
  working_at_height: "/labs/spot-the-hazard/pipe-rack-final.jpg",
  hot_work: "/labs/spot-the-hazard/hot-work-final.jpg",
  scaffolding: "/labs/spot-the-hazard/scaffold-final.jpg",
  lifting: "/labs/spot-the-hazard/lifting-final.jpg",
  confined_space: "/labs/spot-the-hazard/confined-space-final.jpg",
};

export default async function SpotTheHazardScenarioPage({ params }: Props) {
  const { locale, scenarioId } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const labLocale = locale === "tr" ? "tr" : "en";
  const scenarios = getSpotTheHazardScenarios(labLocale);
  const baseScenario = getSpotTheHazardScenario(scenarioId, labLocale);
  if (!baseScenario) notFound();

  const scenario = {
    ...baseScenario,
    image: sceneByCategory[baseScenario.category] ?? baseScenario.image,
  };

  const index = scenarios.findIndex((item) => item.id === scenario.id);
  const next = scenarios[index + 1] ?? null;

  return (
    <SpotTheHazardGame
      scenario={scenario}
      locale={labLocale}
      index={index}
      total={scenarios.length}
      nextHref={next ? `/${locale}/labs/spot-the-hazard/${next.id}` : undefined}
    />
  );
}
