import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../../../i18n/routing";
import SpotTheHazardGame from "@/components/labs/SpotTheHazardGame";
import { getSpotTheHazardScenario, getSpotTheHazardScenarios } from "@/lib/labs/scenarios/spot-the-hazard";
import type { LabCategory, LabHotspot } from "@/lib/labs/types";

type Props = { params: Promise<{ locale: string; scenarioId: string }> };

// 2688x1536 Firefly scenes generated for the final Labs package. These rendition
// links are auth-free Adobe assets; keeping them here lets the challenge use the
// full-resolution source without Next/Image domain configuration.
const sceneByCategory: Partial<Record<LabCategory, string>> = {
  working_at_height: "https://at.adobe.com/27rxkpV8O1CnfLZq",
  hot_work: "https://at.adobe.com/vnfBKIeZrpaeVaAC",
  scaffolding: "https://at.adobe.com/ZpHx4muxzq0kWvvb",
  lifting: "https://at.adobe.com/XwkwPsLWlabqe9K3",
  confined_space: "https://at.adobe.com/uTQGY03MIvdvcOAA",
};

// Coordinates are calibrated against the 2688x1536 scenes above. x/y are
// percentages of the actual image box; radius is a percentage of the shorter
// rendered side so hit areas remain stable across desktop and mobile.
const hotspotsByCategory: Partial<Record<LabCategory, LabHotspot[]>> = {
  working_at_height: [
    { id: "no-tieoff", x: 61.5, y: 48, radius: 7 },
    { id: "loose-tools", x: 44.5, y: 67, radius: 5.5 },
    { id: "open-edge", x: 66, y: 76, radius: 7 },
    { id: "access", x: 31, y: 76, radius: 7.5 },
  ],
  hot_work: [
    { id: "combustibles", x: 35, y: 90, radius: 8 },
    { id: "firewatch", x: 65, y: 51, radius: 7 },
    { id: "cylinder", x: 22, y: 68, radius: 8 },
    { id: "barrier", x: 82, y: 73, radius: 12 },
  ],
  scaffolding: [
    { id: "tag", x: 36, y: 31, radius: 5 },
    { id: "gap", x: 61, y: 54, radius: 6 },
    { id: "toe", x: 70, y: 59, radius: 8 },
    { id: "material", x: 84, y: 55, radius: 8 },
  ],
  lifting: [
    { id: "underload", x: 49, y: 64, radius: 7.5 },
    { id: "barricade", x: 88, y: 76, radius: 11 },
    { id: "hands", x: 70, y: 77, radius: 7.5 },
    { id: "sling", x: 54, y: 32, radius: 6.5 },
  ],
  confined_space: [
    { id: "gas", x: 57, y: 84, radius: 8 },
    { id: "isolation", x: 20, y: 45, radius: 10 },
    { id: "rescue", x: 44, y: 52, radius: 8 },
    { id: "permit", x: 82, y: 55, radius: 11 },
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
