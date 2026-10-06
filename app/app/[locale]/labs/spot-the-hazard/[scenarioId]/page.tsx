import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../../../i18n/routing";
import SpotTheHazardGame from "@/components/labs/SpotTheHazardGame";
import { getSpotTheHazardScenario, getSpotTheHazardScenarios } from "@/lib/labs/scenarios/spot-the-hazard";
import type { LabCategory, LabHotspot } from "@/lib/labs/types";

type Props = { params: Promise<{ locale: string; scenarioId: string }> };

// Keep gameplay scenes local so Spot the Hazard never depends on expiring
// external share links. These assets are deployed from /public with the app.
const sceneByCategory: Partial<Record<LabCategory, string>> = {
  working_at_height: "/labs/spot-the-hazard/scene-working-at-height-2k.jpg",
  hot_work: "/labs/spot-the-hazard/scene-hot-work-2k.jpg",
  scaffolding: "/labs/spot-the-hazard/scene-scaffolding-2k.jpg",
  lifting: "/labs/spot-the-hazard/scene-lifting-2k.jpg",
  confined_space: "/labs/spot-the-hazard/scene-confined-space-2k.jpg",
};

const hotspotsByCategory: Partial<Record<LabCategory, LabHotspot[]>> = {
  working_at_height: [
    { id: "no-tieoff", x: 60.5, y: 51, radius: 7 },
    { id: "no-tieoff", x: 59.5, y: 60, radius: 5.5 },
    { id: "loose-tools", x: 46, y: 66.5, radius: 6.5 },
    { id: "open-edge", x: 64, y: 77, radius: 7.2 },
    { id: "open-edge", x: 72, y: 75, radius: 6.2 },
    { id: "access", x: 28, y: 70, radius: 7.2 },
    { id: "access", x: 32, y: 79, radius: 7.5 },
    { id: "access", x: 36, y: 87, radius: 6.5 },
  ],
  hot_work: [
    { id: "cylinder", x: 16.5, y: 69, radius: 6.8 },
    { id: "cylinder", x: 23, y: 69, radius: 5.5 },
    { id: "combustibles", x: 28.5, y: 86.5, radius: 7 },
    { id: "combustibles", x: 36, y: 89, radius: 6 },
    { id: "trip", x: 49, y: 77, radius: 6.5 },
    { id: "trip", x: 57, y: 86, radius: 7.5 },
    { id: "trip", x: 67, y: 88, radius: 7.5 },
    { id: "segregation", x: 82.5, y: 69, radius: 8.5 },
    { id: "segregation", x: 88, y: 76, radius: 7.5 },
  ],
  scaffolding: [
    { id: "gap", x: 51.5, y: 53, radius: 7.2 },
    { id: "gap", x: 57, y: 56, radius: 6.2 },
    { id: "material", x: 83, y: 56.5, radius: 6.5 },
    { id: "material", x: 80, y: 63, radius: 5.8 },
  ],
  lifting: [
    { id: "sling", x: 54.5, y: 38, radius: 6.2 },
    { id: "sling", x: 55.5, y: 31, radius: 5.5 },
    { id: "underload", x: 49.5, y: 68, radius: 6.8 },
    { id: "underload", x: 52.5, y: 75, radius: 5.5 },
    { id: "hands", x: 70, y: 68.5, radius: 6.8 },
    { id: "hands", x: 66, y: 65, radius: 5.5 },
    { id: "barricade", x: 89.5, y: 74, radius: 8.2 },
    { id: "barricade", x: 84, y: 80, radius: 7 },
  ],
  confined_space: [
    { id: "manway", x: 60, y: 48, radius: 8.5 },
    { id: "manway", x: 61, y: 61, radius: 7.2 },
    { id: "retrieval", x: 43, y: 55, radius: 7 },
    { id: "retrieval", x: 47, y: 72, radius: 7.5 },
    { id: "tools", x: 58, y: 77, radius: 7 },
    { id: "tools", x: 63, y: 76, radius: 5.5 },
    { id: "trip", x: 31, y: 69, radius: 8 },
    { id: "trip", x: 52, y: 91, radius: 8.5 },
    { id: "trip", x: 68, y: 91, radius: 7.5 },
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
