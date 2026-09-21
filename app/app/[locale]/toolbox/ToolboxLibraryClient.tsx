"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toolboxData } from "@/lib/toolbox/toolbox-data";
import { getToolboxStandardPdfHref } from "@/lib/toolbox/standard-pdf";

type Locale = "tr" | "en";

type ToolboxContentControl = {
  slug: string;
  published: boolean;
  visible: boolean;
  accessLevel: "free" | "premium";
  featured: boolean;
};

type Props = {
  locale: Locale;
  controls: ToolboxContentControl[];
};

type ToolboxItem = {
  slug: string;
  pdfSlug?: string;
  icon: string;
  category: string;
  title: {
    tr: string;
    en: string;
  };
  description: {
    tr: string;
    en: string;
  };
  duration: string;
  hasPdf?: boolean;
};

const baseToolboxItems: ToolboxItem[] = [
  {
    slug: "working-at-height",
    pdfSlug: "working-at-height",
    icon: "🪜",
    category: "work-at-height",
    title: {
      tr: "Yüksekte Çalışma Toolbox Talk",
      en: "Working at Height Toolbox Talk",
    },
    description: {
      tr: "Düşme riskleri, ankraj, düşen cisimler ve kurtarma planını kapsayan kullanıma hazır toolbox talk.",
      en: "A ready-to-use toolbox talk covering fall hazards, anchorage, dropped objects and rescue planning.",
    },
    duration: "8–10",
  },
  {
    slug: "scaffold-safety",
    pdfSlug: "scaffold-safety",
    icon: "🏗️",
    category: "work-at-height",
    title: {
      tr: "İskele Güvenliği Toolbox Talk",
      en: "Scaffold Safety Toolbox Talk",
    },
    description: {
      tr: "İskele erişimi, platform, korkuluk, durum etiketi ve güvenli kullanım kontrollerini kapsar.",
      en: "Covers scaffold access, platforms, guardrails, status tags and safe-use controls.",
    },
    duration: "8–10",
  },
  {
    slug: "safety-harness",
    pdfSlug: "safety-harness",
    icon: "🪢",
    category: "work-at-height",
    title: {
      tr: "Emniyet Kemeri Toolbox Talk",
      en: "Safety Harness Toolbox Talk",
    },
    description: {
      tr: "Tam vücut emniyet kemeri, lanyard, bağlantı ve doğru ankraj kullanımını açıklar.",
      en: "Explains full-body harnesses, lanyards, connections and correct anchorage.",
    },
    duration: "8–10",
  },
  {
    slug: "hot-work",
    pdfSlug: "hot-work",
    icon: "🔥",
    category: "hot-work-fire",
    title: {
      tr: "Sıcak Çalışma Toolbox Talk",
      en: "Hot Work Toolbox Talk",
    },
    description: {
      tr: "İzin, gaz ölçümü, yangın gözcüsü, ekipman kontrolü ve yangın önlemlerini kapsayan pratik toolbox talk.",
      en: "A practical toolbox talk covering permits, gas testing, fire watch, equipment checks and fire controls.",
    },
    duration: "8–10",
  },
  {
    slug: "loto",
    pdfSlug: "loto",
    icon: "🔒",
    category: "electrical-loto",
    title: {
      tr: "LOTO Toolbox Talk",
      en: "LOTO Toolbox Talk",
    },
    description: {
      tr: "Enerji izolasyonu, kilitleme, etiketleme ve sıfır enerji doğrulamasını kapsar.",
      en: "Covers energy isolation, locking, tagging and zero-energy verification.",
    },
    duration: "8–10",
  },
  {
    slug: "confined-space",
    pdfSlug: "confined-space",
    icon: "⚠️",
    category: "confined-gas",
    title: {
      tr: "Kapalı Alan Toolbox Talk",
      en: "Confined Space Toolbox Talk",
    },
    description: {
      tr: "Gaz tehlikeleri, giriş izni, gözcü, havalandırma ve kurtarma hazırlığını içerir.",
      en: "Covers gas hazards, entry permits, attendants, ventilation and rescue readiness.",
    },
    duration: "8–10",
  },
  {
    slug: "electrical-safety",
    pdfSlug: "electrical-safety",
    icon: "⚡",
    category: "electrical-loto",
    title: {
      tr: "Elektrik Güvenliği Toolbox Talk",
      en: "Electrical Safety Toolbox Talk",
    },
    description: {
      tr: "Elektrik çarpması, hasarlı ekipman, izolasyon ve güvenli çalışma yöntemlerini kapsar.",
      en: "Covers electric shock, damaged equipment, isolation and safe working methods.",
    },
    duration: "8–10",
  },
  {
    slug: "excavation-safety",
    pdfSlug: "excavation-safety",
    icon: "🚧",
    category: "confined-gas",
    title: {
      tr: "Kazı Güvenliği Toolbox Talk",
      en: "Excavation Safety Toolbox Talk",
    },
    description: {
      tr: "Göçük, yer altı hizmetleri, güvenli erişim, bariyer ve kazı kontrollerini kapsar.",
      en: "Covers cave-ins, underground services, safe access, barriers and excavation controls.",
    },
    duration: "8–10",
  },
  {
    slug: "lifting-operations",
    pdfSlug: "lifting-operations",
    icon: "🏗️",
    category: "lifting-rigging",
    title: {
      tr: "Kaldırma Operasyonları Toolbox Talk",
      en: "Lifting Operations Toolbox Talk",
    },
    description: {
      tr: "Kaldırma planı, ekipman kontrolü, sapanlar, işaretçi ve askıdaki yük risklerini kapsar.",
      en: "Covers lift plans, equipment checks, rigging, banksmen and suspended-load hazards.",
    },
    duration: "8–10",
  },
  {
    slug: "crane-banksman-safety",
    icon: "🚦",
    category: "lifting-rigging",
    title: {
      tr: "Vinç İşaretçisi Toolbox Talk",
      en: "Crane Banksman Toolbox Talk",
    },
    description: {
      tr: "Standart el işaretleri, görüş alanı, iletişim ve güvenli kaldırma koordinasyonunu kapsar.",
      en: "Covers standard hand signals, visibility, communication and safe lifting coordination.",
    },
    duration: "8–10",
    hasPdf: true,
    pdfSlug: "crane-banksman-safety",
  },
  {
    slug: "mobile-equipment-safety",
    pdfSlug: "mobile-equipment-safety",
    icon: "🚜",
    category: "lifting-rigging",
    title: {
      tr: "Mobil Ekipman Toolbox Talk",
      en: "Mobile Equipment Toolbox Talk",
    },
    description: {
      tr: "Yaya ayrımı, kör noktalar, geri manevra, hız kontrolü ve operatör sorumluluklarını kapsar.",
      en: "Covers pedestrian separation, blind spots, reversing, speed and operator responsibilities.",
    },
    duration: "8–10",
  },
  {
    slug: "forklift-safety",
    pdfSlug: "forklift-safety",
    icon: "🚜",
    category: "lifting-rigging",
    title: {
      tr: "Forklift Güvenliği Toolbox Talk",
      en: "Forklift Safety Toolbox Talk",
    },
    description: {
      tr: "Operatör sorumlulukları, yük kapasitesi, kör noktalar ve yaya güvenliğini kapsar.",
      en: "Covers operator duties, load capacity, blind spots and pedestrian safety.",
    },
    duration: "8–10",
  },
  {
    slug: "ppe-safety",
    pdfSlug: "ppe-safety",
    icon: "🦺",
    category: "general-site",
    title: {
      tr: "KKD Toolbox Talk",
      en: "PPE Toolbox Talk",
    },
    description: {
      tr: "KKD seçimi, kontrolü, kullanımı, bakımı ve sahada doğru uygulamaları içerir.",
      en: "Covers PPE selection, inspection, use, maintenance and correct site practices.",
    },
    duration: "8–10",
  },
  {
    slug: "hand-power-tools",
    pdfSlug: "hand-power-tools",
    icon: "🛠️",
    category: "electrical-loto",
    title: {
      tr: "El Aletleri Toolbox Talk",
      en: "Hand and Power Tools Toolbox Talk",
    },
    description: {
      tr: "Doğru alet seçimi, koruyucu muhafaza, kablo ve kullanım öncesi kontrolleri kapsar.",
      en: "Covers tool selection, guards, cables and pre-use inspections.",
    },
    duration: "8–10",
  },
  {
    slug: "ladder-safety",
    pdfSlug: "ladder-safety",
    icon: "🪜",
    category: "work-at-height",
    title: {
      tr: "Merdiven Güvenliği Toolbox Talk",
      en: "Ladder Safety Toolbox Talk",
    },
    description: {
      tr: "Merdiven seçimi, açı, sabitleme, üç nokta temas ve güvenli kullanım kurallarını kapsar.",
      en: "Covers ladder selection, angle, securing, three-point contact and safe use.",
    },
    duration: "8–10",
  },
  {
    slug: "housekeeping",
    pdfSlug: "housekeeping",
    icon: "🧹",
    category: "general-site",
    title: {
      tr: "Housekeeping Toolbox Talk",
      en: "Housekeeping Toolbox Talk",
    },
    description: {
      tr: "Düzen, temizlik, malzeme istifi, atık yönetimi ve kayma-takılma risklerini kapsar.",
      en: "Covers order, cleanliness, storage, waste and slip-trip hazards.",
    },
    duration: "8–10",
  },
  {
    slug: "fire-safety",
    pdfSlug: "fire-safety",
    icon: "🧯",
    category: "hot-work-fire",
    title: {
      tr: "Yangın Güvenliği Toolbox Talk",
      en: "Fire Safety Toolbox Talk",
    },
    description: {
      tr: "Yangın önleme, alarm, söndürücü kullanımı, acil durum ve tahliye kontrollerini kapsar.",
      en: "Covers fire prevention, alarms, extinguishers, emergencies and evacuation.",
    },
    duration: "8–10",
  },
  {
    slug: "chemical-safety",
    icon: "🧪",
    category: "hot-work-fire",
    title: {
      tr: "Kimyasal Güvenlik Toolbox Talk",
      en: "Chemical Safety Toolbox Talk",
    },
    description: {
      tr: "Etiketleme, SDS, depolama, dökülme müdahalesi ve kimyasal maruziyeti kapsar.",
      en: "Covers labelling, SDS, storage, spill response and chemical exposure.",
    },
    duration: "8–10",
    hasPdf: true,
    pdfSlug: "chemical-safety",
  },
  {
    slug: "dropped-objects",
    icon: "📦",
    category: "work-at-height",
    title: {
      tr: "Düşen Cisimler Toolbox Talk",
      en: "Dropped Objects Toolbox Talk",
    },
    description: {
      tr: "Alet sabitleme, malzeme istifi, bariyer ve alt çalışma alanı korumasını kapsar.",
      en: "Covers tool tethering, storage, barriers and lower-area protection.",
    },
    duration: "8–10",
    hasPdf: true,
    pdfSlug: "dropped-objects",
  },
  {
    slug: "manual-handling",
    icon: "📦",
    category: "ptw-control",
    title: {
      tr: "Elle Taşıma Toolbox Talk",
      en: "Manual Handling Toolbox Talk",
    },
    description: {
      tr: "Yük değerlendirmesi, güvenli kaldırma, taşıma yolu ve mekanik yardım kullanımını kapsar.",
      en: "Covers load assessment, safe lifting, carrying routes and mechanical assistance.",
    },
    duration: "5–7",
    hasPdf: true,
    pdfSlug: "manual-handling",
  },
];

const baseSlugs = new Set(baseToolboxItems.map((item) => item.slug));

function getAutoCategory(slug: string) {
  // 01 — Working at Height & Scaffolding
  if ([
    "working-at-height",
    "safety-harness",
    "scaffold-safety",
    "ladder-safety",
    "dropped-objects",
    "dropped-object-prevention-zones",
    "temporary-work-platforms",
    "working-near-open-edges",
    "scaffold-modification-control",
    "working-over-water",
  ].includes(slug)) return "work-at-height";

  // 02 — Lifting & Rigging Operations
  if ([
    "lifting-operations",
    "crane-banksman-safety",
    "man-basket-personnel-lifting",
    "crane-outrigger-setup",
    "rigging-inspection",
    "tag-line-safety",
    "load-stability-center-of-gravity",
  ].includes(slug)) return "lifting-rigging";

  // 03 — Mobile Equipment & Traffic Safety
  if ([
    "mobile-equipment-safety",
    "forklift-safety",
    "forklift-loading-unloading",
    "vehicle-pedestrian-interface",
  ].includes(slug)) return "mobile-traffic";

  // 04 — Electrical Safety & LOTO
  if ([
    "electrical-safety",
    "loto",
    "temporary-electrical-installations",
    "battery-charging",
    "overhead-power-lines",
    "portable-generator-safety",
    "extension-leads-cable-management",
    "stored-energy-hydraulic-systems",
  ].includes(slug)) return "electrical-loto";

  // 05 — Hot Work & Fire Safety
  if ([
    "hot-work",
    "fire-safety",
    "grinding-cutting-safety",
    "welding-fumes",
  ].includes(slug)) return "hot-work-fire";

  // 06 — Chemical & Hazardous Materials
  if ([
    "chemical-safety",
    "chemical-transfer-decanting",
    "spill-response",
    "hazardous-waste-handling",
    "painting-coating-safety",
  ].includes(slug)) return "chemical-hazmat";

  // 07 — Confined Space & Gas Safety
  if ([
    "confined-space",
    "gas-testing-atmospheric-monitoring",
    "compressed-gas-cylinders",
    "nitrogen-inert-gas-safety",
  ].includes(slug)) return "confined-gas";

  // 08 — Excavation & Groundworks
  if ([
    "excavation-safety",
    "underground-services",
  ].includes(slug)) return "excavation-groundworks";

  // 09 — Tools, Machinery & Pressure Systems
  if ([
    "hand-power-tools",
    "pressure-testing",
    "high-pressure-water-jetting",
    "flange-joint-integrity",
    "hose-coupling-safety",
    "abrasive-blasting-safety",
  ].includes(slug)) return "tools-machinery";

  // 10 — PPE & Occupational Health
  if ([
    "ppe-safety",
    "heat-stress",
    "cold-stress",
    "noise-hearing-protection",
    "respiratory-protection",
    "eye-face-protection",
    "hand-injury-prevention",
  ].includes(slug)) return "ppe-health";

  // 11 — Permit to Work & Operational Control
  if ([
    "permit-to-work",
    "simultaneous-operations",
    "stop-work-authority",
    "line-breaking-process-opening",
    "barricading-exclusion-zones",
  ].includes(slug)) return "ptw-control";

  // 12 — General Site Safety & Human Factors
  return "general-site";
}
function getAutoIcon(slug: string) {
  if (slug.includes("stored-energy-hydraulic-systems")) return "🔋";
  if (slug.includes("high-pressure-water-jetting")) return "💦";
  if (slug.includes("flange-joint-integrity")) return "🔩";
  if (slug.includes("chemical-transfer-decanting")) return "🧪";
  if (slug.includes("spill-response")) return "🧽";
  if (slug.includes("hazardous-waste-handling")) return "☣️";
  if (slug.includes("portable-generator-safety")) return "⚡";
  if (slug.includes("extension-leads-cable-management")) return "🔌";
  if (slug.includes("demolition-dismantling")) return "🔨";
  if (slug.includes("working-over-water")) return "🛟";
  if (slug.includes("dropped-object-prevention-zones")) return "🪖";
  if (slug.includes("temporary-work-platforms")) return "🪜";
  if (slug.includes("working-near-open-edges")) return "🕳️";
  if (slug.includes("scaffold-modification-control")) return "🏗️";
  if (slug.includes("man-basket-personnel-lifting")) return "👷";
  if (slug.includes("crane-outrigger-setup")) return "🛞";
  if (slug.includes("rigging-inspection")) return "🪝";
  if (slug.includes("tag-line-safety")) return "🪢";
  if (slug.includes("load-stability-center-of-gravity")) return "⚖️";
  if (slug.includes("forklift-loading-unloading")) return "📦";
  if (slug.includes("barricading-exclusion-zones")) return "🚫";
  if (slug.includes("overhead-power-lines")) return "⚡";
  if (slug.includes("underground-services")) return "🕳️";
  if (slug.includes("line-breaking-process-opening")) return "🔧";
  if (slug.includes("nitrogen-inert-gas-safety")) return "💨";
  if (slug.includes("steam-hot-surfaces")) return "♨️";
  if (slug.includes("hose-coupling-safety")) return "🔗";
  if (slug.includes("abrasive-blasting-safety")) return "🥽";
  if (slug.includes("painting-coating-safety")) return "🎨";
  if (slug.includes("lightning-severe-weather")) return "🌩️";

  if (slug.includes("line-of-fire")) return "🎯";
  if (slug.includes("pinch")) return "✋";
  if (slug.includes("slips")) return "⚠️";
  if (slug.includes("vehicle")) return "🚶";
  if (slug.includes("compressed-gas")) return "🧯";
  if (slug.includes("pressure")) return "🧪";
  if (slug.includes("grinding")) return "⚙️";
  if (slug.includes("welding")) return "🔥";
  if (slug.includes("heat")) return "☀️";
  if (slug.includes("cold")) return "❄️";
  if (slug.includes("noise")) return "🎧";
  if (slug.includes("respiratory")) return "😷";
  if (slug.includes("eye-face")) return "🥽";
  if (slug.includes("hand-injury")) return "🧤";
  if (slug.includes("electrical")) return "⚡";
  if (slug.includes("battery")) return "🔋";
  if (slug.includes("gas-testing")) return "📟";
  if (slug.includes("permit")) return "📋";
  if (slug.includes("simultaneous")) return "🔄";
  if (slug.includes("stop-work")) return "🛑";

  throw new Error(`Missing Toolbox icon mapping for slug: ${slug}`);
}

const autoToolboxItems: ToolboxItem[] = toolboxData
  .filter((record) => !baseSlugs.has(record.slug))
  .map((record) => ({
    slug: record.slug,
    icon: getAutoIcon(record.slug),
    category: getAutoCategory(record.slug),
    title: {
      tr: record.tr.title ?? record.slug,
      en: record.en.title ?? record.slug,
    },
    description: {
      tr:
        typeof record.tr.objective === "string"
          ? record.tr.objective
          : "Sahada kullanıma hazır profesyonel toolbox talk.",
      en:
        typeof record.en.objective === "string"
          ? record.en.objective
          : "Professional site-ready toolbox talk.",
    },
    duration: "8–10",
    hasPdf: true,
    pdfSlug: record.slug,
  }));

const toolboxItems: ToolboxItem[] = [
  ...baseToolboxItems,
  ...autoToolboxItems,
];

const categories = [
  { id: "all", tr: "Tüm Konular", en: "All Topics", icon: "▦" },

  { id: "work-at-height", tr: "Yüksekte Çalışma & İskele", en: "Working at Height & Scaffolding", icon: "🏗️" },

  { id: "lifting-rigging", tr: "Kaldırma & Rigging Operasyonları", en: "Lifting & Rigging Operations", icon: "🏗️" },

  { id: "mobile-traffic", tr: "Mobil Ekipman & Trafik Güvenliği", en: "Mobile Equipment & Traffic Safety", icon: "🚜" },

  { id: "electrical-loto", tr: "Elektrik Güvenliği & LOTO", en: "Electrical Safety & LOTO", icon: "⚡" },

  { id: "hot-work-fire", tr: "Sıcak İş & Yangın Güvenliği", en: "Hot Work & Fire Safety", icon: "🔥" },

  { id: "chemical-hazmat", tr: "Kimyasal & Tehlikeli Maddeler", en: "Chemical & Hazardous Materials", icon: "🧪" },

  { id: "confined-gas", tr: "Kapalı Alan & Gaz Güvenliği", en: "Confined Space & Gas Safety", icon: "☣️" },

  { id: "excavation-groundworks", tr: "Kazı & Zemin İşleri", en: "Excavation & Groundworks", icon: "🚧" },

  { id: "tools-machinery", tr: "El Aletleri, Makine & Basınçlı Sistemler", en: "Tools, Machinery & Pressure Systems", icon: "🔧" },

  { id: "ppe-health", tr: "KKD & Mesleki Sağlık", en: "PPE & Occupational Health", icon: "🦺" },

  { id: "ptw-control", tr: "Çalışma İzni & Operasyonel Kontrol", en: "Permit to Work & Operational Control", icon: "📋" },

  { id: "general-site", tr: "Genel Saha Güvenliği & İnsan Faktörleri", en: "General Site Safety & Human Factors", icon: "⚠️" },
];

export default function ToolboxLibraryClient({
  locale,
  controls,
}: Props) {
  const isTurkish = locale === "tr";

  const controlMap = useMemo(
    () =>
      new Map(
        controls.map((control) => [
          control.slug,
          control,
        ])
      ),
    [controls]
  );

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(
      isTurkish ? "tr-TR" : "en-US",
    );

    return toolboxItems.filter((item) => {
      const control = controlMap.get(item.slug);

      const isPublished =
        control?.published ?? true;

      const isVisible =
        control?.visible ?? true;

      if (!isPublished || !isVisible) {
        return false;
      }

      const localizedTitle = isTurkish ? item.title.tr : item.title.en;
      const localizedDescription = isTurkish
        ? item.description.tr
        : item.description.en;

      const matchesCategory =
        category === "all" || item.category === category;

      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${localizedTitle} ${localizedDescription}`
          .toLocaleLowerCase(isTurkish ? "tr-TR" : "en-US")
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, controlMap, isTurkish, query]);

  async function trackDownload(
    item: ToolboxItem,
    mode: "standard" | "branded"
  ) {
    try {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase
        .from("user_activity_events")
        .insert({
          user_id: user.id,
          event_name: "pdf_download",
          path: `/toolbox/${item.slug}`,
          metadata: {
            resource_type: "toolbox",
            slug: item.slug,
            pdf_slug: item.pdfSlug ?? null,
            locale,
            mode,
          },
        });

      if (error) {
        console.error("Toolbox PDF tracking error:", error);
      }
    } catch (error) {
      console.error("Toolbox PDF tracking error:", error);
    }
  }

  function getPdfHref(item: ToolboxItem) {
    if (item.hasPdf === false || !item.pdfSlug) {
      return null;
    }

    return getToolboxStandardPdfHref(item.pdfSlug, locale);
  }

  return (
    <main className="min-h-screen bg-[#05091a] text-white">
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-400">
                SERNEM Toolbox Library
              </p>

              <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] sm:text-6xl">
                {isTurkish
                  ? "Profesyonel Toolbox Talk Kütüphanesi"
                  : "Professional Toolbox Talk Library"}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
                {isTurkish
                  ? "Sahada kullanıma hazır toolbox içeriklerini önizleyin veya profesyonel PDF olarak indirin."
                  : "Preview site-ready toolbox content or download it as a professional PDF."}
              </p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] px-6 py-5">
              <p className="text-3xl font-black text-white">
                {toolboxItems.length}
              </p>
              <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                {isTurkish ? "Toolbox Talk" : "Toolbox Talks"}
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 lg:flex-row">
            <button
              type="button"
              onClick={() => setIsCategoryMenuOpen(true)}
              className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#0c1126] px-5 py-4 text-sm font-black text-white transition hover:border-blue-500/40 lg:hidden"
            >
              ☰ {isTurkish ? "Kategoriler" : "Categories"}
            </button>

            <label className="relative block flex-1">
              <span className="pointer-events-none absolute inset-y-0 left-5 flex items-center text-slate-500">
                🔎
              </span>

              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={
                  isTurkish
                    ? "Toolbox konusu veya anahtar kelime ara..."
                    : "Search toolbox topics or keywords..."
                }
                className="w-full rounded-2xl border border-white/10 bg-[#0c1126] py-4 pl-14 pr-5 text-sm font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </label>
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[270px_1fr]">
            <aside className="hidden self-start rounded-[28px] border border-white/10 bg-[#0d1228] p-5 lg:sticky lg:top-24 lg:block">
              <p className="px-3 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                {isTurkish ? "Kategoriler" : "Categories"}
              </p>

              <nav className="mt-4 space-y-2">
                {categories.map((item) => {
                  const count =
                    item.id === "all"
                      ? toolboxItems.length
                      : toolboxItems.filter(
                          (toolbox) => toolbox.category === item.id,
                        ).length;

                  const isActive = category === item.id;

                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setCategory(item.id)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-black transition ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                          : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-base">{item.icon}</span>
                        <span>{isTurkish ? item.tr : item.en}</span>
                      </span>

                      <span
                        className={`rounded-full px-2 py-1 text-[10px] ${
                          isActive
                            ? "bg-white/15 text-white"
                            : "bg-white/[0.05] text-slate-500"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            <div>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">
              {filteredItems.length}{" "}
              {isTurkish ? "içerik gösteriliyor" : "resources shown"}
            </p>

            {(query || category !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                }}
                className="w-fit text-sm font-black text-blue-400 transition hover:text-white"
              >
                {isTurkish ? "Filtreleri Temizle" : "Clear Filters"}
              </button>
            )}
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => {
              const pdfHref = getPdfHref(item);

              const control = controlMap.get(item.slug);

              const isPremium =
                control?.accessLevel === "premium";

              const isFeatured =
                control?.featured ?? false;

              const toolboxHref =
                `/${locale}/toolbox/${item.slug}`;

              const premiumHref =
                `/${locale}/upgrade?next=${encodeURIComponent(
                  toolboxHref
                )}`;

              return (
                <article
                  key={item.slug}
                  className={`group relative flex min-h-[560px] flex-col overflow-hidden rounded-[30px] border bg-[#0d1228] p-7 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-2 ${
                    isPremium
                      ? "border-violet-400/30 hover:border-violet-400/60 hover:shadow-violet-950/30"
                      : "border-white/10 hover:border-blue-500/40 hover:shadow-blue-950/40"
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/[0.04] via-transparent to-emerald-400/[0.02]" />

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[20px] border border-white/10 bg-white/[0.05] text-3xl shadow-inner">
                      {item.icon}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {isPremium ? (
                        <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-violet-300">
                          👑 PREMIUM
                        </span>
                      ) : (
                        <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-blue-300">
                          FREE
                        </span>
                      )}

                      {isFeatured && (
                        <span className="rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-amber-300">
                          ★ {isTurkish ? "ÖNE ÇIKAN" : "FEATURED"}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="relative mt-8">
                    <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-400">
                      Toolbox Talk
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">
                        ✓ {isTurkish ? "Profesyonel" : "Professional"}
                      </span>

                      <span className="rounded-full border border-blue-400/25 bg-blue-400/10 px-3 py-1 text-xs font-black text-blue-300">
                        ✓ {isTurkish ? "Saha Uyumlu" : "Site Ready"}
                      </span>

                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-black text-slate-400">
                        {item.duration} {isTurkish ? "dk" : "min"}
                      </span>
                    </div>

                    {isPremium && (
                      <div className="mt-5 rounded-xl border border-violet-400/15 bg-violet-500/[0.07] px-3 py-2 text-xs font-bold text-violet-300">
                        🔒{" "}
                        {isTurkish
                          ? "Premium üyelik ile erişilebilir"
                          : "Available with Premium"}
                      </div>
                    )}

                    <h2 className="mt-5 text-2xl font-black leading-tight tracking-tight text-white transition group-hover:text-blue-300">
                      {isTurkish ? item.title.tr : item.title.en}
                    </h2>

                    <p className="mt-5 text-base leading-8 text-slate-400">
                      {isTurkish
                        ? item.description.tr
                        : item.description.en}
                    </p>
                  </div>

                  <div className="relative mt-auto">
                    <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-6 text-xs font-bold text-slate-500">
                      <div>
                        <p>v1.0</p>
                      </div>

                      <div className="text-center">
                        <p>{isTurkish ? "Türkçe" : "English"}</p>
                      </div>

                      <div className="text-right">
                        <p>{isTurkish ? "Ağustos" : "August"}</p>
                        <p>2026</p>
                      </div>
                    </div>

                    <div className="mt-7 grid grid-cols-2 gap-3 xl:grid-cols-3">
                      <Link
                        href={toolboxHref}
                        className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm font-black text-white transition hover:border-white/20 hover:bg-white/[0.08]"
                      >
                        {isTurkish ? "Önizleme" : "Preview"}
                      </Link>

                      {isPremium ? (
                        <Link
                          href={premiumHref}
                          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-4 py-4 text-sm font-black text-white shadow-xl shadow-violet-950/20 transition hover:-translate-y-1 hover:bg-violet-500"
                        >
                          👑 {isTurkish ? "Kilidi Aç" : "Unlock"}
                        </Link>
                      ) : pdfHref ? (
                        <a
                          href={pdfHref}
                          onClick={() => {
                            void trackDownload(item, "standard");
                          }}
                          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-4 text-sm font-black text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-1 hover:bg-blue-500"
                        >
                          ↓ {isTurkish ? "İndir" : "Download"}
                        </a>
                      ) : (
                        <span className="inline-flex cursor-not-allowed items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-center text-xs font-black text-slate-600">
                          {isTurkish ? "PDF Yakında" : "PDF Soon"}
                        </span>
                      )}

                      {pdfHref && item.pdfSlug ? (
                        <a
                          href={`/api/premium/toolbox/${item.pdfSlug}?locale=${locale}`}
                          onClick={() => {
                            void trackDownload(item, "branded");
                          }}
                          className="col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-4 text-sm font-black text-emerald-300 transition hover:-translate-y-1 hover:bg-emerald-400/20 xl:col-span-1"
                        >
                          🔒{" "}
                          {isTurkish
                            ? "Logolu PDF"
                            : "Branded PDF"}
                        </a>
                      ) : (
                        <span className="col-span-2 inline-flex cursor-not-allowed items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-center text-xs font-black text-slate-600 xl:col-span-1">
                          🔒{" "}
                          {isTurkish
                            ? "Logolu PDF Yakında"
                            : "Branded PDF Soon"}
                        </span>
                      )}

                      {isPremium ? (
                        <Link
                          href={premiumHref}
                          className="col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl border border-violet-400/30 bg-violet-500/10 px-4 py-4 text-sm font-black text-violet-200 transition hover:-translate-y-1 hover:bg-violet-500/20 xl:col-span-3"
                        >
                          📝 🔒{" "}
                          {isTurkish
                            ? "Premium Word"
                            : "Premium Word"}
                        </Link>
                      ) : (
                        <a
                          href={`/api/premium/toolbox/${item.slug}/word?locale=${locale}`}
                          className="col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-400/30 bg-blue-400/10 px-4 py-4 text-sm font-black text-blue-300 transition hover:-translate-y-1 hover:bg-blue-400/20 xl:col-span-3"
                        >
                          📝 🔒{" "}
                          {isTurkish
                            ? "Düzenlenebilir Word"
                            : "Editable Word"}
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="mt-10 rounded-[28px] border border-white/10 bg-[#0d1228] px-6 py-16 text-center">
              <p className="text-4xl">🔎</p>
              <h2 className="mt-5 text-2xl font-black">
                {isTurkish
                  ? "Eşleşen toolbox bulunamadı."
                  : "No matching toolbox found."}
              </h2>
              <p className="mt-3 text-slate-500">
                {isTurkish
                  ? "Arama kelimesini veya kategori filtresini değiştirin."
                  : "Change the search term or category filter."}
              </p>
            </div>
          )}
            </div>
          </div>
        </div>
      </section>

      {isCategoryMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label={isTurkish ? "Menüyü kapat" : "Close menu"}
            onClick={() => setIsCategoryMenuOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <aside className="absolute left-0 top-0 h-full w-[86%] max-w-sm overflow-y-auto border-r border-white/10 bg-[#0a0f22] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-400">
                  SERNEM
                </p>
                <h2 className="mt-2 text-2xl font-black text-white">
                  {isTurkish ? "Kategoriler" : "Categories"}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsCategoryMenuOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-xl text-white"
              >
                ×
              </button>
            </div>

            <nav className="mt-8 space-y-2">
              {categories.map((item) => {
                const count =
                  item.id === "all"
                    ? toolboxItems.length
                    : toolboxItems.filter(
                        (toolbox) => toolbox.category === item.id,
                      ).length;

                const isActive = category === item.id;

                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => {
                      setCategory(item.id);
                      setIsCategoryMenuOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-4 text-left text-sm font-black transition ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "bg-white/[0.03] text-slate-300"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-lg">{item.icon}</span>
                      <span>{isTurkish ? item.tr : item.en}</span>
                    </span>

                    <span className="rounded-full bg-white/10 px-2 py-1 text-[10px]">
                      {count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </main>
  );
}
