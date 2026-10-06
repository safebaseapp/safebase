"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X, ArrowRight, Command } from "lucide-react";
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
};

const SEARCH_ITEMS: SearchItem[] = [
  { href: "/dashboard", titleTr: "Dashboard", titleEn: "Dashboard", categoryTr: "Çalışma Alanı", categoryEn: "Workspace", keywords: ["dashboard","workspace","saved","kayıt","activity"] },
  { href: "/tools/quick-risk-assessment", titleTr: "Risk Analizi", titleEn: "Risk Assessment", categoryTr: "HSE Araçları", categoryEn: "HSE Tools", keywords: ["risk","hirarc","assessment","risk analizi","değerlendirme"] },
  { href: "/tools/method-statement", titleTr: "Method Statement", titleEn: "Method Statement", categoryTr: "HSE Araçları", categoryEn: "HSE Tools", keywords: ["method","statement","work method","çalışma yöntemi"] },
  { href: "/safety-pack", titleTr: "Safety Pack", titleEn: "Safety Pack", categoryTr: "HSE Araçları", categoryEn: "HSE Tools", keywords: ["pack","safety pack","saha paketi","workflow"] },
  { href: "/ppe-standards", titleTr: "KKD Standartları", titleEn: "PPE Standards", categoryTr: "HSE Araçları", categoryEn: "HSE Tools", keywords: ["ppe","kkd","en iso","helmet","gloves","standards"] },
  { href: "/tools", titleTr: "HSE Hesaplayıcılar", titleEn: "HSE Calculators", categoryTr: "HSE Araçları", categoryEn: "HSE Tools", keywords: ["calculator","hesaplayıcı","trir","ltifr","severity","risk matrix"] },
  { href: "/tools/risk-matrix", titleTr: "Risk Matrisi", titleEn: "Risk Matrix", categoryTr: "HSE Araçları", categoryEn: "HSE Tools", keywords: ["matrix","risk matrix","olasılık","şiddet"] },
  { href: "/tools/trir", titleTr: "TRIR", titleEn: "TRIR", categoryTr: "HSE Performans", categoryEn: "HSE Performance", keywords: ["trir","recordable","incident rate"] },
  { href: "/tools/ltifr", titleTr: "LTIFR", titleEn: "LTIFR", categoryTr: "HSE Performans", categoryEn: "HSE Performance", keywords: ["ltifr","lost time","frequency"] },
  { href: "/tools/severity-rate", titleTr: "Şiddet Oranı", titleEn: "Severity Rate", categoryTr: "HSE Performans", categoryEn: "HSE Performance", keywords: ["severity","şiddet","lost days"] },
  { href: "/tools/simops", titleTr: "SIMOPS Planner", titleEn: "SIMOPS Planner", categoryTr: "HSE Araçları", categoryEn: "HSE Tools", keywords: ["simops","simultaneous","operations","çakışma"] },
  { href: "/hse-performance", titleTr: "HSE Performans", titleEn: "HSE Performance", categoryTr: "Performans", categoryEn: "Performance", keywords: ["kpi","performance","observation","trend","gözlem"] },
  { href: "/labs", titleTr: "HSE Labs", titleEn: "HSE Labs", categoryTr: "Eğitim", categoryEn: "Training", keywords: ["labs","challenge","training","eğitim","spot hazard","incident simulator"] },
  { href: "/labs/spot-the-hazard", titleTr: "Spot the Hazard", titleEn: "Spot the Hazard", categoryTr: "HSE Labs", categoryEn: "HSE Labs", keywords: ["hazard","tehlike","visual","challenge"] },
  { href: "/labs/incident-simulator", titleTr: "Incident Simulator", titleEn: "Incident Simulator", categoryTr: "HSE Labs", categoryEn: "HSE Labs", keywords: ["incident","simulator","olay","kaza","challenge"] },
  { href: "/ai-assistant", titleTr: "AI Asistan", titleEn: "AI Assistant", categoryTr: "Yapay Zekâ", categoryEn: "AI", keywords: ["ai","assistant","asistan","safety ai","hse ai"] },
  { href: "/checklists", titleTr: "Denetimler", titleEn: "Inspections", categoryTr: "Kaynaklar", categoryEn: "Resources", keywords: ["inspection","checklist","denetim","kontrol"] },
  { href: "/knowledge-base", titleTr: "Rehberler", titleEn: "Guides", categoryTr: "Kaynaklar", categoryEn: "Resources", keywords: ["guide","knowledge","rehber","hse guide"] },
  { href: "/toolbox", titleTr: "Toolbox Talk", titleEn: "Toolbox Talk", categoryTr: "Kaynaklar", categoryEn: "Resources", keywords: ["toolbox","tbm","talk","briefing","konuşma"] },
  { href: "/posters", titleTr: "Posterler", titleEn: "Posters", categoryTr: "Kaynaklar", categoryEn: "Resources", keywords: ["poster","posters","afiş","print"] },
  { href: "/safety-signs", titleTr: "Güvenlik Levhaları", titleEn: "Safety Signs", categoryTr: "Kaynaklar", categoryEn: "Resources", keywords: ["sign","signs","levha","warning","prohibition"] },
  { href: "/downloads", titleTr: "İndirme Merkezi", titleEn: "Download Center", categoryTr: "Kaynaklar", categoryEn: "Resources", keywords: ["download","pdf","indir","documents","templates"] },
  { href: "/upgrade", titleTr: "Premium", titleEn: "Premium", categoryTr: "Hesap", categoryEn: "Account", keywords: ["premium","upgrade","pro"] },
  { href: "/account", titleTr: "Hesabım", titleEn: "Account", categoryTr: "Hesap", categoryEn: "Account", keywords: ["account","hesap","profile","profil"] },
];

function normalize(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

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
    if (!q) return SEARCH_ITEMS.slice(0, 9);

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
        <div className="fixed inset-0 z-[10000] flex items-start justify-center bg-slate-950/80 px-4 pt-[8vh] backdrop-blur-xl sm:pt-[12vh]" onMouseDown={(event) => {
          if (event.currentTarget === event.target) setOpen(false);
        }}>
          <div className="w-full max-w-2xl overflow-hidden rounded-[24px] border border-white/10 bg-[#07101f] shadow-[0_32px_100px_rgba(0,0,0,.65)]">
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-4 sm:px-5">
              <Search size={20} className="shrink-0 text-blue-300" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={tr ? "Araç, rehber, toolbox, HSE konusu ara..." : "Search tools, guides, toolbox, HSE topics..."}
                className="min-w-0 flex-1 bg-transparent text-[15px] font-semibold text-white outline-none placeholder:text-slate-500"
              />
              <span className="hidden items-center gap-1 rounded-lg border border-white/10 bg-white/[0.035] px-2 py-1 text-[10px] font-bold text-slate-500 sm:inline-flex">
                <Command size={11} /> K
              </span>
              <button type="button" onClick={() => setOpen(false)} aria-label={tr ? "Aramayı kapat" : "Close search"} className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition hover:bg-white/[0.05] hover:text-white">
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[62vh] overflow-y-auto p-2">
              <div className="px-3 pb-2 pt-2 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                {query.trim() ? (tr ? `${results.length} sonuç` : `${results.length} results`) : (tr ? "Hızlı erişim" : "Quick access")}
              </div>

              {results.length > 0 ? (
                <div className="space-y-1">
                  {results.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        setOpen(false);
                        setQuery("");
                      }}
                      className="group flex items-center gap-3 rounded-2xl border border-transparent px-3 py-3 transition hover:border-blue-400/15 hover:bg-blue-500/[0.055]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/[0.07] text-blue-300">
                        <Search size={16} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-black text-slate-100">{tr ? item.titleTr : item.titleEn}</span>
                        <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[0.10em] text-slate-500">{tr ? item.categoryTr : item.categoryEn}</span>
                      </span>
                      <ArrowRight size={15} className="text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-blue-300" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-10 text-center">
                  <div className="text-sm font-black text-slate-300">{tr ? "Sonuç bulunamadı" : "No results found"}</div>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{tr ? "Başka bir araç, konu veya kaynak adı deneyin." : "Try another tool, topic or resource name."}</p>
                </div>
              )}
            </div>

            <div className="border-t border-white/[0.08] px-5 py-3 text-[10px] font-semibold text-slate-600">
              {tr ? "İpucu: Aramayı her sayfada Ctrl/⌘ + K veya / ile açabilirsiniz." : "Tip: Open search anywhere with Ctrl/⌘ + K or /."}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
