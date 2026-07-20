"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

type Article = {
  id: number;
  slug: string;
  title: {
    en: string;
    tr: string;
  };
  description: {
    en: string;
    tr: string;
  };
  category:
    | "work-activities"
    | "equipment"
    | "hazard-control"
    | "emergency";
  readTime: number;
  standard: string;
  featured?: boolean;
  available: boolean;
};

const articles: Article[] = [
  {
    id: 1,
    slug: "working-at-height",
    title: {
      en: "Working at Height Safety",
      tr: "Yüksekte Çalışma Güvenliği",
    },
    description: {
      en: "Key hazards, fall-prevention measures, access requirements, anchorage principles and rescue planning.",
      tr: "Temel tehlikeler, düşmeyi önleme tedbirleri, erişim gereklilikleri, ankraj prensipleri ve kurtarma planlaması.",
    },
    category: "work-activities",
    readTime: 8,
    standard: "OSHA",
    featured: true,
    available: false,
  },
  {
    id: 2,
    slug: "confined-space",
    title: {
      en: "Confined Space Entry",
      tr: "Kapalı Alan Girişi",
    },
    description: {
      en: "Atmospheric testing, entry permits, attendants, communications, ventilation and rescue readiness.",
      tr: "Atmosfer ölçümü, giriş izinleri, gözcü, iletişim, havalandırma ve kurtarma hazırlığı.",
    },
    category: "work-activities",
    readTime: 10,
    standard: "OSHA",
    featured: true,
    available: false,
  },
  {
    id: 3,
    slug: "hot-work",
    title: {
      en: "Hot Work Safety",
      tr: "Sıcak Çalışma Güvenliği",
    },
    description: {
      en: "Permit requirements, fire-watch responsibilities, spark containment, gas testing and combustible control.",
      tr: "İzin gereklilikleri, yangın gözcüsü sorumlulukları, kıvılcım kontrolü, gaz ölçümü ve yanıcı madde yönetimi.",
    },
    category: "work-activities",
    readTime: 7,
    standard: "OSHA",
    featured: true,
    available: false,
  },
  {
    id: 4,
    slug: "loto",
    title: {
      en: "Lockout Tagout",
      tr: "Kilitleme ve Etiketleme",
    },
    description: {
      en: "Energy-isolation principles, authorized-person duties, stored-energy release and zero-energy verification.",
      tr: "Enerji izolasyonu prensipleri, yetkili kişi görevleri, depolanmış enerjinin boşaltılması ve sıfır enerji doğrulaması.",
    },
    category: "hazard-control",
    readTime: 9,
    standard: "OSHA",
    featured: true,
    available: false,
  },
  {
    id: 5,
    slug: "ppe",
    title: {
      en: "Personal Protective Equipment",
      tr: "Kişisel Koruyucu Donanım",
    },
    description: {
      en: "Selection, inspection, compatibility, limitations, maintenance and correct use of essential PPE.",
      tr: "Temel KKD'lerin seçimi, kontrolü, uyumluluğu, sınırlamaları, bakımı ve doğru kullanımı.",
    },
    category: "hazard-control",
    readTime: 6,
    standard: "OSHA",
    available: false,
  },
  {
    id: 6,
    slug: "grinding",
    title: {
      en: "Grinding Operations",
      tr: "Taşlama Çalışmaları",
    },
    description: {
      en: "Wheel inspection, guarding, spark control, eye protection, noise and safe operating practices.",
      tr: "Disk kontrolü, muhafaza, kıvılcım yönetimi, göz koruması, gürültü ve güvenli çalışma uygulamaları.",
    },
    category: "equipment",
    readTime: 6,
    standard: "OSHA",
    available: false,
  },
  {
    id: 7,
    slug: "scaffolding",
    title: {
      en: "Scaffold Safety",
      tr: "İskele Güvenliği",
    },
    description: {
      en: "Platforms, access, guardrails, toe boards, foundations, inspection tags and scaffold-user responsibilities.",
      tr: "Platformlar, erişim, korkuluklar, topuk levhaları, temel, kontrol etiketleri ve kullanıcı sorumlulukları.",
    },
    category: "equipment",
    readTime: 9,
    standard: "OSHA",
    available: false,
  },
  {
    id: 8,
    slug: "excavation",
    title: {
      en: "Excavation and Trenching",
      tr: "Kazı ve Hendek Çalışmaları",
    },
    description: {
      en: "Ground collapse, access, spoil placement, underground services, water accumulation and daily inspections.",
      tr: "Zemin çökmesi, erişim, hafriyat yerleşimi, yeraltı hatları, su birikmesi ve günlük kontroller.",
    },
    category: "work-activities",
    readTime: 8,
    standard: "OSHA",
    available: false,
  },
  {
    id: 9,
    slug: "electrical-safety",
    title: {
      en: "Electrical Safety",
      tr: "Elektrik Güvenliği",
    },
    description: {
      en: "Electrical hazards, isolation, temporary supplies, damaged equipment, grounding and safe-distance controls.",
      tr: "Elektrik tehlikeleri, izolasyon, geçici beslemeler, hasarlı ekipman, topraklama ve güvenli mesafe kontrolleri.",
    },
    category: "hazard-control",
    readTime: 9,
    standard: "OSHA",
    available: false,
  },
  {
    id: 10,
    slug: "fire-safety",
    title: {
      en: "Fire Safety",
      tr: "Yangın Güvenliği",
    },
    description: {
      en: "Fire prevention, extinguisher selection, emergency response, evacuation and combustible-material control.",
      tr: "Yangın önleme, söndürücü seçimi, acil durum müdahalesi, tahliye ve yanıcı madde kontrolü.",
    },
    category: "emergency",
    readTime: 7,
    standard: "OSHA",
    available: false,
  },
  {
    id: 11,
    slug: "crane-safety",
    title: {
      en: "Crane and Lifting Safety",
      tr: "Vinç ve Kaldırma Güvenliği",
    },
    description: {
      en: "Lift planning, exclusion zones, rigging, signals, load control and critical-lift considerations.",
      tr: "Kaldırma planı, yasaklı bölgeler, sapanlama, işaretleşme, yük kontrolü ve kritik kaldırma gereklilikleri.",
    },
    category: "equipment",
    readTime: 10,
    standard: "OSHA",
    available: false,
  },
  {
    id: 12,
    slug: "chemical-safety",
    title: {
      en: "Chemical Safety",
      tr: "Kimyasal Güvenlik",
    },
    description: {
      en: "Hazard communication, labels, safety data sheets, storage, exposure prevention and emergency response.",
      tr: "Tehlike iletişimi, etiketler, güvenlik bilgi formları, depolama, maruziyetin önlenmesi ve acil müdahale.",
    },
    category: "hazard-control",
    readTime: 9,
    standard: "OSHA",
    available: false,
  },
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

const BookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="h-6 w-6"
  >
    <path
      d="M5 4.5h8a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3V4.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M16 7.5h1a2 2 0 0 1 2 2V20h-3"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
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

export default function KnowledgeBasePage() {
  const params = useParams<{ locale: string }>();
  const locale = params.locale === "tr" ? "tr" : "en";
  const isTurkish = locale === "tr";

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    {
      id: "all",
      label: isTurkish ? "Tüm Konular" : "All Topics",
    },
    {
      id: "work-activities",
      label: isTurkish ? "Çalışma Faaliyetleri" : "Work Activities",
    },
    {
      id: "equipment",
      label: isTurkish ? "Ekipman Güvenliği" : "Equipment Safety",
    },
    {
      id: "hazard-control",
      label: isTurkish ? "Tehlike Kontrolü" : "Hazard Control",
    },
    {
      id: "emergency",
      label: isTurkish ? "Acil Durum" : "Emergency",
    },
  ];

  const filteredArticles = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === "all" || article.category === activeCategory;

      const searchableText = [
        article.title[locale],
        article.description[locale],
        article.standard,
        article.category,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 ||
        searchableText.includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, locale, search]);

  const featuredArticles = articles.filter((article) => article.featured);

  const categoryLabel = (category: Article["category"]) => {
    if (category === "work-activities") {
      return isTurkish ? "Çalışma Faaliyeti" : "Work Activity";
    }

    if (category === "equipment") {
      return isTurkish ? "Ekipman Güvenliği" : "Equipment Safety";
    }

    if (category === "hazard-control") {
      return isTurkish ? "Tehlike Kontrolü" : "Hazard Control";
    }

    return isTurkish ? "Acil Durum" : "Emergency";
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-30 bg-slate-950" />

        <div className="absolute left-1/2 top-[-260px] -z-20 h-[600px] w-[940px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[145px]" />

        <div className="absolute bottom-[-220px] right-[-140px] -z-20 h-[540px] w-[540px] rounded-full bg-emerald-500/10 blur-[145px]" />

        <div
          className="absolute inset-0 -z-10 opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "54px 54px",
          }}
        />

        <div className="mx-auto max-w-7xl px-6 pb-20 pt-20 lg:px-8 lg:pt-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-black text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
              {isTurkish
                ? "Profesyonel HSE Bilgi Merkezi"
                : "Professional HSE Knowledge Hub"}
            </div>

            <h1 className="mt-7 text-5xl font-black tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
              {isTurkish ? "Bilgi Merkezi" : "Knowledge Base"}
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400 sm:text-xl">
              {isTurkish
                ? "Saha ve ofis çalışmaları için pratik HSE rehberleri, temel kontroller ve güvenlik bilgileri."
                : "Practical HSE guides, essential controls and safety knowledge for field and office work."}
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
                      ? "HSE konusu veya anahtar kelime ara..."
                      : "Search HSE topics and keywords..."
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
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-400">
                {isTurkish ? "Öne Çıkan Konular" : "Featured Topics"}
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-white sm:text-4xl">
                {isTurkish
                  ? "Günlük HSE çalışmalarında en çok ihtiyaç duyulan rehberler"
                  : "Essential guidance for everyday HSE work"}
              </h2>
            </div>

            <div className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm font-bold text-slate-400">
              {featuredArticles.length}{" "}
              {isTurkish ? "öne çıkan konu" : "featured topics"}
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredArticles.map((article) => (
              <article
                key={article.id}
                className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.045] p-6 transition duration-300 hover:-translate-y-2 hover:border-blue-400/30 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-blue-950/30"
              >
                <div className="absolute right-[-40px] top-[-40px] h-32 w-32 rounded-full bg-blue-600/10 blur-3xl transition group-hover:bg-blue-600/20" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] text-blue-300">
                      <BookIcon />
                    </div>

                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-300">
                      {article.standard}
                    </span>
                  </div>

                  <p className="mt-6 text-xs font-black uppercase tracking-[0.16em] text-blue-400">
                    {categoryLabel(article.category)}
                  </p>

                  <h3 className="mt-3 text-xl font-black leading-tight text-white">
                    {article.title[locale]}
                  </h3>

                  <p className="mt-4 min-h-24 text-sm leading-6 text-slate-400">
                    {article.description[locale]}
                  </p>

                  <div className="mt-5 flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>
                      {article.readTime}{" "}
                      {isTurkish ? "dk okuma" : "min read"}
                    </span>

                    <span>
                      {article.available
                        ? isTurkish
                          ? "Hazır"
                          : "Available"
                        : isTurkish
                          ? "Yakında"
                          : "Coming Soon"}
                    </span>
                  </div>

                  {article.available ? (
                    <Link
                      href={`/${locale}/knowledge-base/${article.slug}`}
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-black text-white transition hover:bg-blue-500"
                    >
                      {isTurkish ? "Rehberi Aç" : "Open Guide"}
                      <ArrowIcon />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="mt-6 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 font-black text-slate-500"
                    >
                      {isTurkish ? "Yakında" : "Coming Soon"}
                    </button>
                  )}
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
                {isTurkish ? "Bilgi Kütüphanesi" : "Knowledge Library"}
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-white sm:text-4xl">
                {isTurkish
                  ? "Tüm HSE konularını keşfet"
                  : "Explore all HSE topics"}
              </h2>
            </div>

            <p className="text-sm font-bold text-slate-500">
              {filteredArticles.length}{" "}
              {isTurkish ? "konu bulundu" : "topics found"}
            </p>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="group flex h-full flex-col rounded-[26px] border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.065]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-blue-300">
                      <BookIcon />
                    </div>

                    <span className="rounded-lg border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-black text-slate-400">
                      {article.standard}
                    </span>
                  </div>

                  <p className="mt-6 text-xs font-black uppercase tracking-[0.16em] text-emerald-400">
                    {categoryLabel(article.category)}
                  </p>

                  <h3 className="mt-3 text-xl font-black text-white">
                    {article.title[locale]}
                  </h3>

                  <p className="mt-4 flex-1 leading-7 text-slate-400">
                    {article.description[locale]}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-sm font-bold text-slate-500">
                    <span>
                      {article.readTime}{" "}
                      {isTurkish ? "dk okuma" : "min read"}
                    </span>

                    <span>
                      {article.available
                        ? isTurkish
                          ? "Hazır"
                          : "Available"
                        : isTurkish
                          ? "Yakında"
                          : "Coming Soon"}
                    </span>
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
                {isTurkish ? "Konu bulunamadı" : "No topics found"}
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
                  SafeBase AI
                </p>

                <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-[-0.035em] text-white sm:text-4xl">
                  {isTurkish
                    ? "Bilgi tabanında aradığını bulamadın mı?"
                    : "Could not find the guidance you need?"}
                </h2>

                <p className="mt-5 max-w-2xl leading-7 text-slate-400">
                  {isTurkish
                    ? "SafeBase AI'a HSE sorunu sor ve mevcut bilgi tabanına dayalı pratik bir yanıt al."
                    : "Ask SafeBase AI an HSE question and receive practical guidance based on the available knowledge base."}
                </p>
              </div>

              <Link
                href={`/${locale}/ai-assistant`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-black text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-1 hover:bg-blue-500"
              >
                {isTurkish ? "SafeBase AI'a Sor" : "Ask SafeBase AI"}
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}