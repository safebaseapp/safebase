"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { TOOLBOX_DOWNLOADS } from "@/lib/downloads/toolboxes";

type DownloadItem = {
  id: number;
  title: {
    en: string;
    tr: string;
  };
  description: {
    en: string;
    tr: string;
  };
  category: "templates" | "toolbox-talks" | "guides" | "posters";
  format: "PDF" | "DOCX" | "PDF + DOCX";
  icon: string;
  featured?: boolean;
  available: boolean;
  pdfUrl?: {
    en: string;
    tr: string;
  };
  docxUrl?: string;
  version: string;
  updated: {
    en: string;
    tr: string;
  };
  language: {
    en: string;
    tr: string;
  };
};

const downloads: DownloadItem[] = [
  {
    id: 4,
    title: {
      en: "Risk Assessment Template",
      tr: "Risk Değerlendirmesi Şablonu",
    },
    description: {
      en: "A structured template for hazards, existing controls, risk ratings and additional actions.",
      tr: "Tehlikeler, mevcut kontroller, risk puanları ve ilave önlemler için yapılandırılmış şablon.",
    },
    category: "templates",
    format: "DOCX",
    icon: "⚠️",
    featured: true,
    available: true,
    docxUrl: "/downloads/risk-assessment-template.docx",
    version: "v1.0",
    updated: { en: "July 2026", tr: "Temmuz 2026" },
    language: { en: "English", tr: "İngilizce" },
  },
  {
    id: 7,
    title: {
      en: "Daily Toolbox Talk Record",
      tr: "Günlük Toolbox Talk Formu",
    },
    description: {
      en: "Record the topic, hazards, controls, participants and supervisor confirmation for daily briefings.",
      tr: "Günlük bilgilendirmelerde konu, tehlike, önlem, katılımcı ve süpervizör onayını kaydedin.",
    },
    category: "toolbox-talks",
    format: "PDF + DOCX",
    icon: "🗣️",
    available: true,
    pdfUrl: {

      en: "/downloads/daily-toolbox-talk-record.pdf",

      tr: "/downloads/daily-toolbox-talk-record.pdf",

    },
    docxUrl: "/downloads/daily-toolbox-talk-record.docx",
    version: "v1.0",
    updated: { en: "July 2026", tr: "Temmuz 2026" },
    language: { en: "English", tr: "İngilizce" },
  },
  {
    id: 8,
    title: {
      en: "Incident Investigation Form",
      tr: "Olay Araştırma Formu",
    },
    description: {
      en: "Capture incident details, immediate causes, root causes, corrective actions and assigned responsibilities.",
      tr: "Olay detaylarını, doğrudan nedenleri, kök nedenleri, düzeltici faaliyetleri ve sorumluları kaydedin.",
    },
    category: "templates",
    format: "DOCX",
    icon: "🔎",
    available: true,
    docxUrl: "/downloads/incident-investigation-form.docx",
    version: "v1.0",
    updated: { en: "July 2026", tr: "Temmuz 2026" },
    language: { en: "English", tr: "İngilizce" },
  },
  {
    id: 10,
    title: {
      en: "PPE Selection Quick Guide",
      tr: "KKD Seçim Hızlı Rehberi",
    },
    description: {
      en: "A practical guide for selecting personal protective equipment based on workplace hazards.",
      tr: "İş yeri tehlikelerine göre kişisel koruyucu donanım seçimi için pratik rehber.",
    },
    category: "guides",
    format: "PDF",
    icon: "🦺",
    featured: true,
    available: true,
    pdfUrl: {
      en: "/downloads/ppe-selection-quick-guide-en.pdf",
      tr: "/downloads/ppe-selection-quick-guide-tr.pdf",
    },
    version: "v1.0",
    updated: { en: "August 2026", tr: "Ağustos 2026" },
    language: { en: "TR / EN", tr: "TR / EN" },
  },
  {
    id: 11,
    title: {
      en: "Hierarchy of Controls Quick Guide",
      tr: "Kontrol Hiyerarşisi Hızlı Rehberi",
    },
    description: {
      en: "Understand and apply the five levels of workplace risk control.",
      tr: "İş yeri risk kontrolünün beş seviyesini anlayın ve uygulayın.",
    },
    category: "guides",
    format: "PDF",
    icon: "📘",
    featured: true,
    available: true,
    pdfUrl: {
      en: "/downloads/hierarchy-of-controls-quick-guide-en.pdf",
      tr: "/downloads/hierarchy-of-controls-quick-guide-tr.pdf",
    },
    version: "v1.0",
    updated: { en: "August 2026", tr: "Ağustos 2026" },
    language: { en: "TR / EN", tr: "TR / EN" },
  },
  {
    id: 12,
    title: {
      en: "Emergency Response Poster",
      tr: "Acil Durum Müdahale Posteri",
    },
    description: {
      en: "Clear emergency actions covering alarms, evacuation and assembly-point requirements.",
      tr: "Alarm, tahliye ve toplanma noktası gerekliliklerini açıklayan acil durum posteri.",
    },
    category: "posters",
    format: "PDF",
    icon: "🚨",
    available: true,
    pdfUrl: {
      en: "/downloads/emergency-response-poster-en.pdf",
      tr: "/downloads/emergency-response-poster-tr.pdf",
    },
    version: "v1.0",
    updated: { en: "August 2026", tr: "Ağustos 2026" },
    language: { en: "TR / EN", tr: "TR / EN" },
  },
  {
    id: 13,
    title: {
      en: "Fire Extinguisher Selection Poster",
      tr: "Yangın Söndürücü Seçim Posteri",
    },
    description: {
      en: "A quick-reference poster for selecting extinguishers based on the type of fire.",
      tr: "Yangın türüne göre uygun söndürücü seçimi için hızlı referans posteri.",
    },
    category: "posters",
    format: "PDF",
    icon: "🧯",
    available: true,
    pdfUrl: {
      en: "/downloads/fire-extinguisher-selection-poster-en.pdf",
      tr: "/downloads/fire-extinguisher-selection-poster-tr.pdf",
    },
    version: "v1.0",
    updated: { en: "August 2026", tr: "Ağustos 2026" },
    language: { en: "TR / EN", tr: "TR / EN" },
  },
  {
    id: 14,
    title: {
      en: "Mandatory PPE Poster",
      tr: "Zorunlu KKD Posteri",
    },
    description: {
      en: "A field-ready poster covering essential personal protective equipment requirements.",
      tr: "Temel kişisel koruyucu donanım gerekliliklerini gösteren sahaya hazır poster.",
    },
    category: "posters",
    format: "PDF",
    icon: "🦺",
    featured: true,
    available: true,
    pdfUrl: {
      en: "/downloads/mandatory-ppe-poster-en.pdf",
      tr: "/downloads/mandatory-ppe-poster-tr.pdf",
    },
    version: "v1.0",
    updated: { en: "August 2026", tr: "Ağustos 2026" },
    language: { en: "English", tr: "Türkçe" },
  },
  {
    id: 15,
    title: {
      en: "LOTO Golden Rules Poster",
      tr: "LOTO Altın Kuralları Posteri",
    },
    description: {
      en: "Six essential lockout and tagout steps for safe energy isolation.",
      tr: "Güvenli enerji izolasyonu için altı temel kilitleme ve etiketleme adımı.",
    },
    category: "posters",
    format: "PDF",
    icon: "🔒",
    featured: true,
    available: true,
    pdfUrl: {
      en: "/downloads/loto-golden-rules-poster-en.pdf",
      tr: "/downloads/loto-golden-rules-poster-tr.pdf",
    },
    version: "v1.0",
    updated: { en: "August 2026", tr: "Ağustos 2026" },
    language: { en: "English", tr: "Türkçe" },
  },
  {
    id: 16,
    title: {
      en: "Working at Height Safety Poster",
      tr: "Yüksekte Çalışma Güvenliği Posteri",
    },
    description: {
      en: "Practical rules for fall prevention, anchorage, dropped objects and rescue planning.",
      tr: "Düşmenin önlenmesi, ankraj, düşen cisimler ve kurtarma planlaması için pratik kurallar.",
    },
    category: "posters",
    format: "PDF",
    icon: "🪜",
    featured: true,
    available: true,
    pdfUrl: {
      en: "/downloads/working-at-height-rules-poster-en.pdf",
      tr: "/downloads/working-at-height-rules-poster-tr.pdf",
    },
    version: "v1.0",
    updated: { en: "August 2026", tr: "Ağustos 2026" },
    language: { en: "English", tr: "Türkçe" },
  },
  {
    id: 17,
    title: {
      en: "Scaffold Safety Rules Poster",
      tr: "İskele Güvenlik Kuralları Posteri",
    },
    description: {
      en: "Essential rules for scaffold tags, access, platforms, edge protection and safe use.",
      tr: "İskele etiketi, erişim, platform, kenar koruması ve güvenli kullanım için temel kurallar.",
    },
    category: "posters",
    format: "PDF",
    icon: "🏗️",
    featured: true,
    available: true,
    pdfUrl: {
      en: "/downloads/scaffold-safety-rules-poster-en.pdf",
      tr: "/downloads/scaffold-safety-rules-poster-tr.pdf",
    },
    version: "v1.0",
    updated: { en: "August 2026", tr: "Ağustos 2026" },
    language: { en: "English", tr: "Türkçe" },
  },
  {
    id: 18,
    title: {
      en: "Hot Work Safety Rules Poster",
      tr: "Sıcak Çalışma Güvenlik Kuralları Posteri",
    },
    description: {
      en: "Practical hot work controls covering permits, gas testing, fire watch and post-work inspection.",
      tr: "İzin, gaz ölçümü, yangın gözcüsü ve iş sonrası kontrolü kapsayan pratik sıcak çalışma kuralları.",
    },
    category: "posters",
    format: "PDF",
    icon: "🔥",
    featured: true,
    available: true,
    pdfUrl: {
      en: "/downloads/hot-work-safety-rules-poster-en.pdf",
      tr: "/downloads/hot-work-safety-rules-poster-tr.pdf",
    },
    version: "v1.0",
    updated: { en: "August 2026", tr: "Ağustos 2026" },
    language: { en: "English", tr: "Türkçe" },
  },
  {
    id: 19,
    title: {
      en: "Confined Space Entry Rules Poster",
      tr: "Kapalı Alan Giriş Kuralları Posteri",
    },
    description: {
      en: "Key confined space controls for permits, isolation, atmospheric testing, attendants and rescue readiness.",
      tr: "İzin, izolasyon, atmosfer ölçümü, gözcü ve kurtarma hazırlığı için temel kapalı alan kontrolleri.",
    },
    category: "posters",
    format: "PDF",
    icon: "🕳️",
    featured: true,
    available: true,
    pdfUrl: {
      en: "/downloads/confined-space-entry-rules-poster-en.pdf",
      tr: "/downloads/confined-space-entry-rules-poster-tr.pdf",
    },
    version: "v1.0",
    updated: { en: "August 2026", tr: "Ağustos 2026" },
    language: { en: "English", tr: "Türkçe" },
  },
  {
    id: 20,
    title: {
      en: "Electrical Safety Rules Poster",
      tr: "Elektrik Güvenliği Kuralları Posteri",
    },
    description: {
      en: "Essential electrical safety rules covering isolation, LOTO, testing, PPE and damaged equipment.",
      tr: "İzolasyon, LOTO, test, KKD ve hasarlı ekipman kontrollerini kapsayan elektrik güvenliği kuralları.",
    },
    category: "posters",
    format: "PDF",
    icon: "⚡",
    featured: true,
    available: true,
    pdfUrl: {
      en: "/downloads/electrical-safety-rules-poster-en.pdf",
      tr: "/downloads/electrical-safety-rules-poster-tr.pdf",
    },
    version: "v1.0",
    updated: {
      en: "August 2026",
      tr: "Ağustos 2026",
    },
    language: {
      en: "English",
      tr: "Türkçe",
    },
  },

  {
    id: 21,
    title: {
      en: "Working at Height Toolbox Talk",
      tr: "Yüksekte Çalışma Toolbox Talk",
    },
    description: {
      en: "A ready-to-deliver toolbox talk covering fall hazards, anchorage, dropped objects and rescue planning.",
      tr: "Düşme riskleri, ankraj, düşen cisimler ve kurtarma planını kapsayan kullanıma hazır toolbox talk.",
    },
    category: "toolbox-talks",
    format: "PDF",
    icon: "🪜",
    featured: true,
    available: true,
    pdfUrl: {
      en: "/downloads/working-at-height-toolbox-talk-en.pdf",
      tr: "/downloads/working-at-height-toolbox-talk-tr.pdf",
    },
    version: "v1.0",
    updated: { en: "August 2026", tr: "Ağustos 2026" },
    language: { en: "English", tr: "Türkçe" },
  },
  {
    id: 22,
    title: {
      en: "Hot Work Toolbox Talk",
      tr: "Sıcak Çalışma Toolbox Talk",
    },
    description: {
      en: "A practical toolbox talk covering permits, gas testing, fire watch, equipment checks and fire prevention.",
      tr: "İzin, gaz ölçümü, yangın gözcüsü, ekipman kontrolü ve yangın önlemlerini kapsayan pratik toolbox talk.",
    },
    category: "toolbox-talks",
    format: "PDF",
    icon: "🔥",
    featured: true,
    available: true,
    pdfUrl: {
      en: "/downloads/hot-work-toolbox-talk-en.pdf",
      tr: "/downloads/hot-work-toolbox-talk-tr.pdf",
    },
    version: "v1.0",
    updated: { en: "August 2026", tr: "Ağustos 2026" },
    language: { en: "English", tr: "Türkçe" },
  },
  {
    id: 23,
    title: {
      en: "Scaffold Safety Toolbox Talk",
      tr: "İskele Güvenliği Toolbox Talk",
    },
    description: {
      en: "A field-ready talk covering scaffold tags, safe access, platforms, edge protection and unauthorized changes.",
      tr: "İskele etiketi, güvenli erişim, platformlar, kenar koruması ve yetkisiz değişiklikleri kapsayan sahaya hazır toolbox talk.",
    },
    category: "toolbox-talks",
    format: "PDF",
    icon: "🏗️",
    featured: true,
    available: true,
    pdfUrl: {
      en: "/downloads/scaffold-safety-toolbox-talk-en.pdf",
      tr: "/downloads/scaffold-safety-toolbox-talk-tr.pdf",
    },
    version: "v1.0",
    updated: { en: "August 2026", tr: "Ağustos 2026" },
    language: { en: "English", tr: "Türkçe" },
  },
  ...TOOLBOX_DOWNLOADS,

];

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="h-5 w-5"
  >
    <circle
      cx="11"
      cy="11"
      r="7"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="m16.5 16.5 4 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="h-5 w-5"
  >
    <path
      d="M5 12h14m-6-6 6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DownloadIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="h-5 w-5"
  >
    <path
      d="M12 3v12m0 0 4-4m-4 4-4-4M5 19h14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function DownloadsPage() {
  const params = useParams<{ locale: string }>();
  const locale = params.locale === "tr" ? "tr" : "en";
  const isTurkish = locale === "tr";

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    {
      id: "all",
      label: isTurkish ? "Tümü" : "All Resources",
      count: downloads.length,
    },
    {
      id: "templates",
      label: isTurkish ? "Şablonlar" : "Templates",
      count: downloads.filter((item) => item.category === "templates").length,
    },
    {
      id: "guides",
      label: isTurkish ? "Rehberler" : "Guides",
      count: downloads.filter((item) => item.category === "guides").length,
    },
    {
      id: "toolbox-talks",
      label: isTurkish ? "Toolbox Talk" : "Toolbox Talks",
      count: downloads.filter(
        (item) => item.category === "toolbox-talks"
      ).length,
    },
  ];

  const filteredDownloads = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return downloads.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;

      const searchableText = [
        item.title[locale],
        item.description[locale],
        item.category,
        item.format,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 ||
        searchableText.includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, locale, search]);

  const featuredDownloads = downloads.filter((item) => item.featured);

  const previewUrl = (item: DownloadItem) =>
    item.pdfUrl?.[locale];

  const downloadUrl = (item: DownloadItem) =>
    item.docxUrl ?? item.pdfUrl?.[locale] ?? "#";

  const downloadLabel = (item: DownloadItem) => {
    if (item.docxUrl) {
      return isTurkish ? "DOCX İndir" : "Download DOCX";
    }

    return isTurkish ? "PDF İndir" : "Download PDF";
  };

  const categoryLabel = (category: DownloadItem["category"]) => {
    if (category === "templates") {
      return isTurkish ? "Şablon" : "Template";
    }

    if (category === "guides") {
      return isTurkish ? "Rehber" : "Guide";
    }

    return "Toolbox Talk";
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-30 bg-slate-950" />

        <div className="absolute left-1/2 top-[-260px] -z-20 h-[580px] w-[920px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" />

        <div className="absolute bottom-[-260px] right-[-120px] -z-20 h-[520px] w-[520px] rounded-full bg-emerald-500/10 blur-[140px]" />

        <div
          className="absolute inset-0 -z-10 opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "54px 54px",
          }}
        />

        <div className="mx-auto max-w-7xl px-6 pb-20 pt-8 lg:px-8">
          <div className="mx-auto max-w-4xl pb-10 pt-20 text-center lg:pt-24">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-black text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
              {isTurkish
                ? "Profesyonel HSE Kaynakları"
                : "Professional HSE Resources"}
            </div>

            <h1 className="mt-7 text-5xl font-black tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
              {isTurkish ? "İndirme Merkezi" : "Download Center"}
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400 sm:text-xl">
            {isTurkish
            ? "Profesyonel HSE şablonları, rehberler ve sahada kullanıma hazır indirilebilir kaynakları keşfedin."
            : "Explore professional HSE templates, guides and ready-to-use downloadable resources."}
            </p>
            <div className="mx-auto mt-10 max-w-2xl">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 shadow-2xl shadow-black/20 backdrop-blur-xl transition focus-within:border-blue-500/40 focus-within:ring-4 focus-within:ring-blue-500/10">
                <span className="text-slate-500">
                  <SearchIcon />
                </span>

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={
                    isTurkish
                      ? "Şablon, rehber veya indirilebilir kaynak ara..."
                      : "Search templates, guides or downloadable resources..."
                  }
                  className="w-full bg-transparent text-white outline-none placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              {categories.map((category) => {
                const isActive = category.id === activeCategory;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    className={`rounded-full border px-5 py-2.5 text-sm font-black transition ${
                      isActive
                        ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                        : "border-white/10 bg-white/[0.045] text-slate-400 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                    }`}
                  >
                    <span>{category.label}</span>
                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-white/[0.07] text-slate-500"
                      }`}
                    >
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                {
                  value: `${downloads.length}+`,
                  label: isTurkish ? "Kaynak" : "Resources",
                  icon: "📄",
                },
                {
                  value: String(new Set(downloads.map((item) => item.category)).size),
                  label: isTurkish ? "Kategori" : "Categories",
                  icon: "📂",
                },
                {
                  value: "2",
                  label: isTurkish ? "Dil" : "Languages",
                  icon: "🌍",
                },
                {
                  value: isTurkish ? "Haftalık" : "Weekly",
                  label: isTurkish ? "Güncelleme" : "Updates",
                  icon: "🔄",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="group rounded-2xl border border-white/10 bg-white/[0.045] p-5 text-left backdrop-blur-xl transition hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.07]"
                >
                  <div className="text-2xl">{stat.icon}</div>
                  <p className="mt-4 text-2xl font-black text-white sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-400">
                {isTurkish ? "Öne Çıkanlar" : "Featured Resources"}
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-white sm:text-4xl">
                {isTurkish
                  ? "En çok ihtiyaç duyulan HSE belgeleri"
                  : "Essential documents for everyday HSE work"}
              </h2>
            </div>

            <div className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm font-bold text-slate-400">
              {featuredDownloads.length}{" "}
              {isTurkish ? "öne çıkan kaynak" : "featured resources"}
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredDownloads.map((item) => (
              <article
                key={item.id}
                className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.045] p-6 transition duration-300 hover:-translate-y-2 hover:border-blue-400/30 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-blue-950/30"
              >
                <div className="absolute right-[-40px] top-[-40px] h-32 w-32 rounded-full bg-blue-600/10 blur-3xl transition group-hover:bg-blue-600/20" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] text-3xl">
                      {item.icon}
                    </div>

                    <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-black text-blue-300">
                      {item.format}
                    </span>
                  </div>

                  <p className="mt-6 text-xs font-black uppercase tracking-[0.16em] text-emerald-400">
                    {categoryLabel(item.category)}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-black text-emerald-300">
                      ✓ {isTurkish ? "Profesyonel" : "Professional"}
                    </span>
                    <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-2.5 py-1 text-[11px] font-black text-blue-300">
                      ✓ {isTurkish ? "Saha Uyumlu" : "Field Ready"}
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl font-black leading-tight text-white">
                    {item.title[locale]}
                  </h3>

                  <p className="mt-4 min-h-24 text-sm leading-6 text-slate-400">
                    {item.description[locale]}
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-xs font-bold text-slate-500">
                    <span>{item.version}</span>
                    <span className="text-center">{item.language[locale]}</span>
                    <span className="text-right">{item.updated[locale]}</span>
                  </div>

                  <div className="mt-5 flex gap-3">
                    {previewUrl(item) ? (
                      <a
                        href={previewUrl(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-black text-slate-200 transition hover:border-blue-400/30 hover:bg-white/[0.09] hover:text-white"
                      >
                        {isTurkish ? "Önizleme" : "Preview"}
                      </a>
                    ) : (
                      <span className="inline-flex flex-1 cursor-not-allowed items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm font-black text-slate-600">
                        {isTurkish ? "DOCX Dosyası" : "DOCX File"}
                      </span>
                    )}

                    <a
                      href={downloadUrl(item)}
                      download
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
                    >
                      <DownloadIcon />
                      {isTurkish ? "İndir" : "Download"}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-950 py-24">
        <div className="absolute left-[-180px] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-blue-600/10 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-400">
                {isTurkish ? "Kaynak Kütüphanesi" : "Resource Library"}
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-white sm:text-4xl">
                {isTurkish
                  ? "HSE kaynaklarını keşfet"
                  : "Explore the HSE resource library"}
              </h2>
            </div>

            <p className="text-sm font-bold text-slate-500">
              {filteredDownloads.length}{" "}
              {isTurkish ? "kaynak bulundu" : "resources found"}
            </p>
          </div>

          {filteredDownloads.length > 0 ? (
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredDownloads.map((item) => (
                <article
                  key={item.id}
                  className="group flex h-full flex-col rounded-[26px] border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.065]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-3xl">
                      {item.icon}
                    </div>

                    <span className="rounded-lg border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-black text-slate-400">
                      {item.format}
                    </span>
                  </div>

                  <p className="mt-6 text-xs font-black uppercase tracking-[0.16em] text-emerald-400">
                    {categoryLabel(item.category)}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-black text-emerald-300">
                      ✓ {isTurkish ? "Profesyonel" : "Professional"}
                    </span>
                    <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-2.5 py-1 text-[11px] font-black text-blue-300">
                      ✓ {isTurkish ? "Saha Uyumlu" : "Field Ready"}
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl font-black text-white">
                    {item.title[locale]}
                  </h3>

                  <p className="mt-4 flex-1 leading-7 text-slate-400">
                    {item.description[locale]}
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-xs font-bold text-slate-500">
                    <span>{item.version}</span>
                    <span className="text-center">{item.language[locale]}</span>
                    <span className="text-right">{item.updated[locale]}</span>
                  </div>

                  <div className="mt-5 flex gap-3">
                    {previewUrl(item) ? (
                      <a
                        href={previewUrl(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-black text-slate-300 transition hover:border-blue-400/30 hover:bg-white/[0.08] hover:text-white"
                      >
                        {isTurkish ? "Önizleme" : "Preview"}
                      </a>
                    ) : (
                      <span className="inline-flex flex-1 cursor-not-allowed items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm font-black text-slate-600">
                        {isTurkish ? "DOCX Dosyası" : "DOCX File"}
                      </span>
                    )}

                    <a
                      href={downloadUrl(item)}
                      download
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/15 transition hover:-translate-y-0.5 hover:bg-blue-500"
                    >
                      <DownloadIcon />
                      {downloadLabel(item)}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-[28px] border border-dashed border-white/15 bg-white/[0.035] px-6 py-20 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-slate-500">
                <SearchIcon />
              </div>

              <h3 className="mt-6 text-2xl font-black text-white">
                {isTurkish ? "Kaynak bulunamadı" : "No resources found"}
              </h3>

              <p className="mt-3 text-slate-500">
                {isTurkish
                  ? "Arama kelimesini veya kategori seçimini değiştirmeyi deneyin."
                  : "Try changing your search term or selected category."}
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                }}
                className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-black text-white transition hover:bg-blue-500"
              >
                {isTurkish ? "Filtreleri Temizle" : "Clear Filters"}
              </button>
            </div>
          )}

          <div className="mt-20 overflow-hidden rounded-[32px] border border-blue-400/20 bg-gradient-to-br from-blue-600/20 via-white/[0.05] to-emerald-500/10 p-8 shadow-2xl shadow-blue-950/30 sm:p-12">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-400">
                  Sernem
                </p>

                <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-[-0.035em] text-white sm:text-4xl">
                  {isTurkish
                    ? "Yeni kaynaklar düzenli olarak eklenecek"
                    : "More professional resources are on the way"}
                </h2>

                <p className="mt-5 max-w-2xl leading-7 text-slate-400">
                  {isTurkish
                    ? "Kontrol listeleri, şablonlar, toolbox talk belgeleri ve saha formları Sernem kütüphanesine eklenecek."
                    : "Checklists, templates, toolbox-talk documents and field forms will be added to the Sernem library."}
                </p>
              </div>

              <Link
                href={`/${locale}/tools`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-black text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-1 hover:bg-blue-500"
              >
                {isTurkish ? "HSE Araçlarını Aç" : "Explore HSE Tools"}
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}