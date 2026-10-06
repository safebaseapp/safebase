"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowRight,
  Bot,
  Calculator,
  Command,
  FileText,
  Gauge,
  Grid3X3,
  HardHat,
  LayoutDashboard,
  MessageSquareText,
  Search,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  Wrench,
  X,
} from "lucide-react";
import { Link } from "../../../i18n/navigation";

type Props = {
  locale: "tr" | "en";
  compact?: boolean;
};

type SearchItem = {
  href: string;
  titleTr: string;
  titleEn: string;
  categoryTr: string;
  categoryEn: string;
  keywords: string[];
  tone: "cyan" | "blue" | "violet" | "emerald" | "amber" | "slate";
};

const SEARCH_ITEMS: SearchItem[] = [
  { href: "/dashboard", titleTr: "Dashboard", titleEn: "Dashboard", categoryTr: "Çalışma Alanı", categoryEn: "Workspace", keywords: ["dashboard","workspace","saved","kayıt","activity"], tone: "cyan" },
  { href: "/tools/quick-risk-assessment", titleTr: "Risk Analizi", titleEn: "Risk Assessment", categoryTr: "HSE Araçları", categoryEn: "HSE Tools", keywords: ["risk","hirarc","assessment","risk analizi","değerlendirme"], tone: "blue" },
  { href: "/tools/method-statement", titleTr: "Method Statement", titleEn: "Method Statement", categoryTr: "HSE Araçları", categoryEn: "HSE Tools", keywords: ["method","statement","work method","çalışma yöntemi"], tone: "blue" },
  { href: "/safety-pack", titleTr: "Safety Pack", titleEn: "Safety Pack", categoryTr: "HSE Araçları", categoryEn: "HSE Tools", keywords: ["pack","safety pack","saha paketi","workflow"], tone: "blue" },
  { href: "/ppe-standards", titleTr: "KKD Standartları", titleEn: "PPE Standards", categoryTr: "HSE Araçları", categoryEn: "HSE Tools", keywords: ["ppe","kkd","en iso","helmet","gloves","standards"], tone: "blue" },
  { href: "/tools", titleTr: "HSE Hesaplayıcılar", titleEn: "HSE Calculators", categoryTr: "HSE Araçları", categoryEn: "HSE Tools", keywords: ["calculator","hesaplayıcı","trir","ltifr","severity","risk matrix"], tone: "blue" },
  { href: "/tools/risk-matrix", titleTr: "Risk Matrisi", titleEn: "Risk Matrix", categoryTr: "HSE Araçları", categoryEn: "HSE Tools", keywords: ["matrix","risk matrix","olasılık","şiddet"], tone: "amber" },
  { href: "/tools/trir", titleTr: "TRIR", titleEn: "TRIR", categoryTr: "HSE Performans", categoryEn: "HSE Performance", keywords: ["trir","recordable","incident rate"], tone: "cyan" },
  { href: "/tools/ltifr", titleTr: "LTIFR", titleEn: "LTIFR", categoryTr: "HSE Performans", categoryEn: "HSE Performance", keywords: ["ltifr","lost time","frequency"], tone: "cyan" },
  { href: "/tools/severity-rate", titleTr: "Şiddet Oranı", titleEn: "Severity Rate", categoryTr: "HSE Performans", categoryEn: "HSE Performance", keywords: ["severity","şiddet","lost days"], tone: "cyan" },
  { href: "/tools/simops", titleTr: "SIMOPS Planner", titleEn: "SIMOPS Planner", categoryTr: "HSE Araçları", categoryEn: "HSE Tools", keywords: ["simops","simultaneous","operations","çakışma"], tone: "blue" },
  { href: "/hse-performance", titleTr: "HSE Performans", titleEn: "HSE Performance", categoryTr: "Performans", categoryEn: "Performance", keywords: ["kpi","performance","observation","trend","gözlem"], tone: "cyan" },
  { href: "/labs", titleTr: "HSE Labs", titleEn: "HSE Labs", categoryTr: "Eğitim", categoryEn: "Training", keywords: ["labs","challenge","training","eğitim","spot hazard","incident simulator"], tone: "violet" },
  { href: "/labs/spot-the-hazard", titleTr: "Spot the Hazard", titleEn: "Spot the Hazard", categoryTr: "HSE Labs", categoryEn: "HSE Labs", keywords: ["hazard","tehlike","visual","challenge"], tone: "violet" },
  { href: "/labs/incident-simulator", titleTr: "Incident Simulator", titleEn: "Incident Simulator", categoryTr: "HSE Labs", categoryEn: "HSE Labs", keywords: ["incident","simulator","olay","kaza","challenge"], tone: "violet" },
  { href: "/ai-assistant", titleTr: "AI Asistan", titleEn: "AI Assistant", categoryTr: "Yapay Zekâ", categoryEn: "AI", keywords: ["ai","assistant","asistan","safety ai","hse ai"], tone: "violet" },
  { href: "/checklists", titleTr: "Denetimler", titleEn: "Inspections", categoryTr: "Kaynaklar", categoryEn: "Resources", keywords: ["inspection","checklist","denetim","kontrol"], tone: "emerald" },
  { href: "/knowledge-base", titleTr: "Rehberler", titleEn: "Guides", categoryTr: "Kaynaklar", categoryEn: "Resources", keywords: ["guide","knowledge","rehber","hse guide"], tone: "emerald" },
  { href: "/toolbox", titleTr: "Toolbox Talk", titleEn: "Toolbox Talk", categoryTr: "Kaynaklar", categoryEn: "Resources", keywords: ["toolbox","tbm","talk","briefing","konuşma"], tone: "emerald" },
  { href: "/posters", titleTr: "Posterler", titleEn: "Posters", categoryTr: "Kaynaklar", categoryEn: "Resources", keywords: ["poster","posters","afiş","print"], tone: "emerald" },
  { href: "/safety-signs", titleTr: "Güvenlik Levhaları", titleEn: "Safety Signs", categoryTr: "Kaynaklar", categoryEn: "Resources", keywords: ["sign","signs","levha","warning","prohibition"], tone: "amber" },
  { href: "/downloads", titleTr: "İndirme Merkezi", titleEn: "Download Center", categoryTr: "Kaynaklar", categoryEn: "Resources", keywords: ["download","pdf","indir","documents","templates"], tone: "emerald" },
  { href: "/upgrade", titleTr: "Premium", titleEn: "Premium", categoryTr: "Hesap", categoryEn: "Account", keywords: ["premium","upgrade","pro"], tone: "amber" },
  { href: "/account", titleTr: "Hesabım", titleEn: "Account", categoryTr: "Hesap", categoryEn: "Account", keywords: ["account","hesap","profile","profil"], tone: "slate" },
];

function normalize(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function ItemIcon({ href }: { href: string }) {
  if (href === "/dashboard") return <LayoutDashboard size={17} />;
  if (href.includes("risk")) return <ShieldCheck size={17} />;
  if (href.includes("method")) return <FileText size={17} />;
  if (href.includes("ppe")) return <HardHat size={17} />;
  if (href.includes("simops")) return <Grid3X3 size={17} />;
  if (href.includes("trir") || href.includes("ltifr") || href.includes("severity") || href === "/hse-performance") return <Gauge size={17} />;
  if (href.startsWith("/labs")) return <Sparkles size={17} />;
  if (href === "/ai-assistant") return <Bot size={17} />;
  if (href === "/checklists") return <TriangleAlert size={17} />;
  if (href === "/knowledge-base") return <FileText size={17} />;
  if (href === "/toolbox") return <MessageSquareText size={17} />;
  if (href === "/tools") return <Calculator size={17} />;
  return <Wrench size={17} />;
}

const toneClasses = {
  cyan: "border-cyan-400/20 bg-cyan-500/[0.08] text-cyan-200",
  blue: "border-blue-400/20 bg-blue-500/[0.08] text-blue-200",
  violet: "border-violet-400/20 bg-violet-500/[0.08] text-violet-200",
  emerald: "border-emerald-400/20 bg-emerald-500/[0.08] text-emerald-200",
  amber: "border-amber-400/20 bg-amber-500/[0.08] text-amber-200",
  slate: "border-white/10 bg-white/[0.04] text-slate-300",
};

export default function GlobalSearch({ locale, compact = false }: Props) {
  const tr = locale === "tr";
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      } else if (!typing && event.key === "/") {
        event.preventDefault();
        setOpen(true);
      } else if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(timer);
  }, [open]);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return SEARCH_ITEMS.slice(0, 8);

    return SEARCH_ITEMS
      .map((item) => {
        const haystack = normalize([
          item.titleTr,
          item.titleEn,
          item.categoryTr,
          item.categoryEn,
          ...item.keywords,
        ].join(" "));
        const title = normalize(tr ? item.titleTr : item.titleEn);
        const score = title.startsWith(q) ? 0 : title.includes(q) ? 1 : haystack.includes(q) ? 2 : 99;
        return { item, score };
      })
      .filter((entry) => entry.score < 99)
      .sort((a, b) => a.score - b.score)
      .slice(0, 12)
      .map((entry) => entry.item);
  }, [query, tr]);

  const quickQueries = tr
    ? ["Risk analizi", "Toolbox", "Sıcak çalışma", "İskele", "Kapalı alan", "TRIR"]
    : ["Risk assessment", "Toolbox", "Hot work", "Scaffolding", "Confined space", "TRIR"];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={compact
          ? "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.025] text-slate-300 transition hover:border-blue-400/25 hover:bg-blue-500/[0.07] hover:text-white"
          : "inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.025] px-3.5 text-[12px] font-black text-slate-300 transition hover:border-blue-400/25 hover:bg-blue-500/[0.07] hover:text-white"}
        aria-label={tr ? "Sitede ara" : "Search site"}
      >
        <Search size={17} />
        {!compact && <span>{tr ? "Ara" : "Search"}</span>}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[10000] overflow-y-auto bg-[#020817]/95 backdrop-blur-2xl"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setOpen(false);
          }}
        >
          <div className="relative min-h-full px-4 pb-10 pt-[7vh] sm:flex sm:items-start sm:justify-center sm:pt-[10vh]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[310px] overflow-hidden">
              <img
                src="/images/sernem-hero-refinery.png"
                alt=""
                className="h-full w-full object-cover object-center opacity-45 saturate-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#020817]/20 via-[#020817]/74 to-[#020817]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#020817]/85 via-transparent to-[#020817]/55" />
            </div>

            <div className="relative w-full max-w-2xl">
              <div className="mb-4 flex items-end justify-between gap-4 px-1">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-sky-300">SERNEM SEARCH</p>
                  <h2 className="mt-2 text-[28px] font-black tracking-[-0.045em] text-white sm:text-[34px]">
                    {tr ? "Her şeyi tek yerden bul." : "Find anything, instantly."}
                  </h2>
                  <p className="mt-1 text-[12px] text-slate-400">
                    {tr ? "Araçlar, rehberler, toolbox içerikleri ve HSE kaynakları." : "Tools, guides, toolbox content and HSE resources."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={tr ? "Aramayı kapat" : "Close search"}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-[#07101f]/75 text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_12px_32px_rgba(0,0,0,.28)] backdrop-blur-xl transition hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="overflow-hidden rounded-[26px] border border-white/10 bg-[#06101e]/95 shadow-[0_32px_100px_rgba(0,0,0,.62)] backdrop-blur-2xl">
                <div className="border-b border-white/[0.08] p-3 sm:p-4">
                  <div className="flex min-h-[58px] items-center gap-3 rounded-2xl border border-sky-400/20 bg-gradient-to-r from-sky-500/[0.10] via-blue-500/[0.05] to-transparent px-4 shadow-[inset_0_1px_0_rgba(255,255,255,.04)]">
                    <Search size={20} className="shrink-0 text-sky-300" />
                    <input
                      ref={inputRef}
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder={tr ? "Örn. sıcak çalışma, risk analizi, iskele..." : "Try hot work, risk assessment, scaffolding..."}
                      className="min-w-0 flex-1 bg-transparent text-[15px] font-bold text-white outline-none placeholder:text-slate-500"
                    />
                    <span className="hidden items-center gap-1 rounded-lg border border-white/10 bg-white/[0.035] px-2 py-1 text-[10px] font-bold text-slate-500 sm:inline-flex">
                      <Command size={11} /> K
                    </span>
                  </div>

                  {!query.trim() && (
                    <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {quickQueries.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setQuery(item);
                            requestAnimationFrame(() => inputRef.current?.focus());
                          }}
                          className="shrink-0 rounded-full border border-white/[0.09] bg-white/[0.035] px-3 py-2 text-[10px] font-black text-slate-300 transition hover:border-sky-400/25 hover:bg-sky-500/[0.07] hover:text-white"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="max-h-[58vh] overflow-y-auto p-2.5 sm:p-3">
                  <div className="flex items-center justify-between px-2 pb-2 pt-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                      {query.trim() ? (tr ? `${results.length} sonuç` : `${results.length} results`) : (tr ? "Öne çıkanlar" : "Featured")}
                    </span>
                    {!query.trim() && (
                      <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-600">
                        {tr ? "Hızlı erişim" : "Quick access"}
                      </span>
                    )}
                  </div>

                  {results.length > 0 ? (
                    <div className="space-y-2">
                      {results.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => {
                            setOpen(false);
                            setQuery("");
                          }}
                          className="group flex min-h-[72px] items-center gap-3 rounded-2xl border border-white/[0.065] bg-white/[0.018] px-3 py-3 transition hover:border-sky-400/20 hover:bg-sky-500/[0.045]"
                        >
                          <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${toneClasses[item.tone]}`}>
                            <ItemIcon href={item.href} />
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[14px] font-black text-slate-100">
                              {tr ? item.titleTr : item.titleEn}
                            </span>
                            <span className="mt-1 inline-flex rounded-md border border-white/[0.07] bg-white/[0.025] px-2 py-1 text-[8px] font-black uppercase tracking-[0.10em] text-slate-500">
                              {tr ? item.categoryTr : item.categoryEn}
                            </span>
                          </span>

                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] text-slate-500 transition group-hover:border-sky-400/20 group-hover:text-sky-300">
                            <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] px-5 py-10 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-500">
                        <Search size={19} />
                      </div>
                      <div className="mt-4 text-sm font-black text-slate-300">{tr ? "Sonuç bulunamadı" : "No results found"}</div>
                      <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-slate-500">
                        {tr ? "Başka bir HSE konusu, araç veya kaynak adı deneyin." : "Try another HSE topic, tool or resource name."}
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t border-white/[0.08] px-4 py-3 text-[10px] font-semibold text-slate-600">
                  {tr ? "İpucu: Aramayı her sayfada Ctrl/⌘ + K veya / ile açabilirsiniz." : "Tip: Open search anywhere with Ctrl/⌘ + K or /."}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
