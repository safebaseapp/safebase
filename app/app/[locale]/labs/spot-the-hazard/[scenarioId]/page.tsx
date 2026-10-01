import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../../../i18n/routing";
import SpotTheHazardGame from "@/components/labs/SpotTheHazardGame";
import { getSpotTheHazardScenario, getSpotTheHazardScenarios } from "@/lib/labs/scenarios/spot-the-hazard";
import type { LabCategory, LabHotspot } from "@/lib/labs/types";

type Props = { params: Promise<{ locale: string; scenarioId: string }> };

const sceneByCategory: Partial<Record<LabCategory, string>> = {
  working_at_height: "/labs/spot-the-hazard/pipe-rack-final.jpg",
  hot_work: "/labs/spot-the-hazard/hot-work-final.jpg",
  scaffolding: "/labs/spot-the-hazard/scaffold-final.jpg",
  lifting: "/labs/spot-the-hazard/lifting-final.jpg",
  confined_space: "/labs/spot-the-hazard/confined-space-final.jpg",
};

// Coordinates are percentages of the rendered scene. Radius is a percentage of the
// scene's shorter rendered side, so hit areas remain usable on desktop and mobile.
const hotspotsByCategory: Partial<Record<LabCategory, LabHotspot[]>> = {
  working_at_height: [
    { id: "no-tieoff", x: 39, y: 43, radius: 11 },
    { id: "loose-tools", x: 56, y: 57, radius: 9 },
    { id: "open-edge", x: 76, y: 45, radius: 12 },
    { id: "access", x: 22, y: 72, radius: 11 },
  ],
  hot_work: [
    { id: "combustibles", x: 59, y: 72, radius: 12 },
    { id: "firewatch", x: 26, y: 62, radius: 12 },
    { id: "cylinder", x: 79, y: 61, radius: 11 },
    { id: "barrier", x: 48, y: 84, radius: 13 },
  ],
  scaffolding: [
    { id: "tag", x: 18, y: 76, radius: 11 },
    { id: "gap", x: 51, y: 48, radius: 10 },
    { id: "toe", x: 72, y: 56, radius: 11 },
    { id: "material", x: 79, y: 35, radius: 11 },
  ],
  lifting: [
    { id: "underload", x: 52, y: 73, radius: 12 },
    { id: "barricade", x: 19, y: 78, radius: 13 },
    { id: "hands", x: 65, y: 63, radius: 10 },
    { id: "sling", x: 54, y: 31, radius: 10 },
  ],
  confined_space: [
    { id: "gas", x: 44, y: 58, radius: 11 },
    { id: "isolation", x: 76, y: 42, radius: 11 },
    { id: "rescue", x: 24, y: 39, radius: 12 },
    { id: "permit", x: 23, y: 73, radius: 11 },
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
