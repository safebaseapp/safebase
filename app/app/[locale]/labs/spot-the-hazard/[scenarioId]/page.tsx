import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../../../i18n/routing";
import SpotTheHazardGame from "@/components/labs/SpotTheHazardGame";
import { getSpotTheHazardScenario, getSpotTheHazardScenarios } from "@/lib/labs/scenarios/spot-the-hazard";
import type { LabCategory, LabHotspot } from "@/lib/labs/types";

type Props = { params: Promise<{ locale: string; scenarioId: string }> };

const sceneByCategory: Partial<Record<LabCategory, string>> = {
  working_at_height: "https://at.adobe.com/27rxkpV8O1CnfLZq",
  hot_work: "https://at.adobe.com/vnfBKIeZrpaeVaAC",
  scaffolding: "https://at.adobe.com/ZpHx4muxzq0kWvvb",
  lifting: "https://at.adobe.com/XwkwPsLWlabqe9K3",
  confined_space: "https://at.adobe.com/uTQGY03MIvdvcOAA",
};

const hotspotsByCategory: Partial<Record<LabCategory, LabHotspot[]>> = {
  working_at_height: [
    { id: "no-tieoff", x: 60.8, y: 52, radius: 5.5 },
    { id: "loose-tools", x: 46, y: 66.5, radius: 4.8 },
    { id: "open-edge", x: 64.5, y: 78, radius: 5.8 },
    { id: "access", x: 25.5, y: 77, radius: 6.2 },
  ],
  hot_work: [
    { id: "cylinder", x: 16.5, y: 69, radius: 5.6 },
    { id: "combustibles", x: 28.5, y: 86.5, radius: 5.8 },
    { id: "trip", x: 52.5, y: 78, radius: 5.4 },
    { id: "segregation", x: 83.5, y: 69.5, radius: 7.6 },
  ],
  scaffolding: [
    { id: "tag", x: 34, y: 35, radius: 4.6 },
    { id: "gap", x: 51.5, y: 53, radius: 6 },
    { id: "toe", x: 70.5, y: 67, radius: 5.4 },
    { id: "material", x: 83, y: 56.5, radius: 5.2 },
  ],
  lifting: [
    { id: "sling", x: 54.5, y: 38, radius: 5.2 },
    { id: "underload", x: 49.5, y: 68, radius: 5.8 },
    { id: "hands", x: 70, y: 68.5, radius: 5.6 },
    { id: "barricade", x: 89.5, y: 74, radius: 7.2 },
  ],
  confined_space: [
    { id: "entry-board", x: 24, y: 36, radius: 7.2 },
    { id: "rescue", x: 60.5, y: 24, radius: 7.5 },
    { id: "lanyard", x: 43, y: 56, radius: 5.8 },
    { id: "manway", x: 49.5, y: 86.5, radius: 7 },
  ],
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
    hotspots: hotspotsByCategory[baseScenario.category] ?? [],
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
