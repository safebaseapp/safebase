"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  Calculator,
  ClipboardCheck,
  Download,
  FileText,
  Flame,
  HardHat,
  Layers3,
  MessageSquareText,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Wrench,
  Trophy,
  Medal,
  Crown,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

type Locale = "tr" | "en";

type Leader = {
  rank: number;
  label: string;
  xp: number;
  best_score: number;
  attempts: number;
};

type Item = {
  href: string;
  title: string;
  titleTr: string;
  label: string;
  labelTr: string;
  icon: "shield" | "file" | "flame" | "hardhat" | "layers" | "calc" | "chart" | "sparkles" | "scan" | "check" | "message" | "sign" | "download" | "bot" | "wrench";
};

const ROTATIONS: Item[][] = [
  [
    { href: "/tools/quick-risk-assessment", title: "Risk Assessment", titleTr: "Risk Analizi", label: "FIELD TOOL", labelTr: "SAHA ARACI", icon: "shield" },
    { href: "/toolbox/hot-work", title: "Hot Work Toolbox", titleTr: "Sıcak Çalışma Toolbox", label: "TOOLBOX", labelTr: "TOOLBOX", icon: "flame" },
    { href: "/labs/incident-simulator", title: "Incident Simulator", titleTr: "Olay Simülatörü", label: "HSE LABS", labelTr: "HSE LABS", icon: "sparkles" },
  ],
  [
    { href: "/tools/method-statement", title: "Method Statement", titleTr: "Method Statement", label: "DOCUMENT TOOL", labelTr: "DOKÜMAN ARACI", icon: "file" },
    { href: "/safety-pack", title: "Safety Packs", titleTr: "Safety Pack'ler", label: "FIELD WORKFLOW", labelTr: "SAHA AKIŞI", icon: "layers" },
    { href: "/checklists", title: "Field Inspections", titleTr: "Saha Denetimleri", label: "INSPECTIONS", labelTr: "DENETİMLER", icon: "check" },
  ],
  [
    { href: "/ppe-standards", title: "PPE Standards", titleTr: "KKD Standartları", label: "REFERENCE", labelTr: "REFERANS", icon: "hardhat" },
    { href: "/tools/simops", title: "SIMOPS Planner", titleTr: "SIMOPS Planlayıcı", label: "OPERATIONS", labelTr: "OPERASYON", icon: "wrench" },
    { href: "/hse-performance", title: "HSE Performance", titleTr: "HSE Performans", label: "PERFORMANCE", labelTr: "PERFORMANS", icon: "chart" },
  ],
  [
    { href: "/tools/risk-matrix", title: "Risk Matrix", titleTr: "Risk Matrisi", label: "CALCULATOR", labelTr: "HESAPLAYICI", icon: "calc" },
    { href: "/knowledge-base", title: "HSE Guides", titleTr: "HSE Rehberleri", label: "KNOWLEDGE", labelTr: "BİLGİ", icon: "file" },
    { href: "/labs/spot-the-hazard", title: "Spot the Hazard", titleTr: "Spot the Hazard", label: "VISUAL CHALLENGE", labelTr: "GÖRSEL CHALLENGE", icon: "scan" },
  ],
  [
    { href: "/tools/trir", title: "TRIR Calculator", titleTr: "TRIR Hesaplayıcı", label: "KPI TOOL", labelTr: "KPI ARACI", icon: "chart" },
    { href: "/toolbox", title: "Toolbox Talks", titleTr: "Toolbox Talk'lar", label: "FIELD RESOURCE", labelTr: "SAHA KAYNAĞI", icon: "message" },
    { href: "/safety-signs", title: "Safety Signs", titleTr: "Güvenlik Levhaları", label: "PRINT RESOURCE", labelTr: "BASKI KAYNAĞI", icon: "sign" },
  ],
  [
    { href: "/tools/ltifr", title: "LTIFR Calculator", titleTr: "LTIFR Hesaplayıcı", label: "KPI TOOL", labelTr: "KPI ARACI", icon: "chart" },
    { href: "/posters", title: "Safety Posters", titleTr: "İSG Posterleri", label: "FIELD RESOURCE", labelTr: "SAHA KAYNAĞI", icon: "file" },
    { href: "/downloads", title: "Download Center", titleTr: "İndirme Merkezi", label: "RESOURCE LIBRARY", labelTr: "KAYNAK KÜTÜPHANESİ", icon: "download" },
  ],
  [
    { href: "/tools/severity-rate", title: "Severity Rate", titleTr: "Şiddet Oranı", label: "KPI TOOL", labelTr: "KPI ARACI", icon: "chart" },
    { href: "/ai-assistant", title: "SERNEM AI", titleTr: "SERNEM AI", label: "HSE INTELLIGENCE", labelTr: "HSE ZEKÂSI", icon: "bot" },
    { href: "/labs", title: "HSE Labs", titleTr: "HSE Labs", label: "INTERACTIVE TRAINING", labelTr: "ETKİLEŞİMLİ EĞİTİM", icon: "sparkles" },
  ],
  [
    { href: "/dashboard", title: "Workspace Dashboard", titleTr: "Çalışma Alanı", label: "WORKSPACE", labelTr: "ÇALIŞMA ALANI", icon: "layers" },
    { href: "/tools", title: "HSE Calculators", titleTr: "HSE Hesaplayıcılar", label: "TOOLS", labelTr: "ARAÇLAR", icon: "calc" },
    { href: "/knowledge-base/working-at-height", title: "Working at Height Guide", titleTr: "Yüksekte Çalışma Rehberi", label: "HSE GUIDE", labelTr: "HSE REHBERİ", icon: "file" },
  ],
];

function Icon({ name }: { name: Item["icon"] }) {
  const props = { size: 18, strokeWidth: 1.9 };
  if (name === "shield") return <ShieldCheck {...props} />;
  if (name === "file") return <FileText {...props} />;
  if (name === "flame") return <Flame {...props} />;
  if (name === "hardhat") return <HardHat {...props} />;
  if (name === "layers") return <Layers3 {...props} />;
  if (name === "calc") return <Calculator {...props} />;
  if (name === "chart") return <BarChart3 {...props} />;
  if (name === "sparkles") return <Sparkles {...props} />;
  if (name === "scan") return <ScanSearch {...props} />;
  if (name === "check") return <ClipboardCheck {...props} />;
  if (name === "message") return <MessageSquareText {...props} />;
  if (name === "sign") return <ShieldCheck {...props} />;
  if (name === "download") return <Download {...props} />;
  if (name === "bot") return <Bot {...props} />;
  return <Wrench {...props} />;
}

const FEATURE_IMAGES = [
  "/labs/spot-the-hazard/scene-hot-work-2k.jpg",
  "/labs/spot-the-hazard/scene-confined-space-2k.jpg",
  "/labs/spot-the-hazard/scene-working-at-height-2k.jpg",
  "/labs/spot-the-hazard/scene-scaffolding-2k.jpg",
  "/labs/spot-the-hazard/scene-lifting-2k.jpg",
  "/images/sernem-hero-refinery.png",
];

const HALF_DAY = 12 * 60 * 60 * 1000;

export default function RotatingHomepagePulse({ locale }: { locale: Locale }) {
  const tr = locale === "tr";
  const [slot, setSlot] = useState(0);
  const [leaders, setLeaders] = useState<Leader[]>([]);

  useEffect(() => {
    const update = () => setSlot(Math.floor(Date.now() / HALF_DAY));
    update();
    const timer = window.setInterval(update, 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let active = true;
    const supabase = createClient();
    void supabase.rpc("get_labs_monthly_leaderboard").then(({ data }) => {
      if (active && Array.isArray(data)) setLeaders(data as Leader[]);
    });
    return () => {
      active = false;
    };
  }, []);

  const items = useMemo(() => ROTATIONS[slot % ROTATIONS.length], [slot]);
  const monthLabel = new Intl.DateTimeFormat(tr ? "tr-TR" : "en-US", { month: "long", year: "numeric" }).format(new Date());
  const podium = [0, 1, 2].map((index) => leaders[index] ?? null);
  const categoryLinks = [
    { href: "/tools/quick-risk-assessment", label: tr ? "Risk Analizi" : "Risk Assessment", note: tr ? "100+ faaliyet" : "100+ activities" },
    { href: "/toolbox", label: tr ? "Toolbox Talk" : "Toolbox Talks", note: "70+" },
    { href: "/safety-signs", label: tr ? "Güvenlik Levhaları" : "Safety Signs", note: tr ? "A4 / A3 / Poster" : "A4 / A3 / Posters" },
    { href: "/tools/method-statement", label: "Method Statement", note: tr ? "Saha şablonları" : "Field templates" },
    { href: "/labs", label: "HSE Labs", note: tr ? "Simülasyonlar" : "Simulations" },
    { href: "/ai-assistant", label: "SERNEM AI", note: tr ? "HSE zekâsı" : "HSE intelligence" },
  ];

  return (
    <section className="relative border-y border-white/[0.07] bg-[#050b16] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-30%,rgba(14,165,233,.13),transparent_45%)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-5 sm:px-6 lg:py-6">
        <Link
          href={`/${locale}/downloads`}
          className="group flex flex-col gap-3 rounded-2xl border border-sky-400/[0.12] bg-[linear-gradient(90deg,rgba(14,165,233,.08),rgba(255,255,255,.02))] px-4 py-4 transition hover:border-sky-300/25 sm:flex-row sm:items-center sm:justify-between sm:px-5"
        >
          <div className="flex items-center gap-4">
            <div className="text-[34px] font-black tracking-[-0.045em] text-white sm:text-[40px]">1,000+</div>
            <div>
              <div className="text-[13px] font-black text-slate-100">{tr ? "HSE içeriği, kayıt ve araç" : "HSE content, records & tools"}</div>
              <div className="mt-1 max-w-3xl text-[10px] leading-4 text-slate-500">
                {tr ? "Risk kayıtları, toolbox içerikleri, rehberler, levhalar, posterler, checklistler, hesaplayıcılar, Labs ve saha araçları." : "Risk records, toolbox talks, guides, safety signs, posters, checklists, calculators, Labs and field tools."}
              </div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-sky-300">
            {tr ? "Tüm içeriği keşfet" : "Explore all content"} <ArrowUpRight size={14} />
          </span>
        </Link>

        <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1.55fr)_minmax(330px,.72fr)]">
          <div className="rounded-[22px] border border-white/[0.08] bg-[#07111f]/88 p-4 shadow-[0_20px_55px_rgba(0,0,0,.18)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.18em] text-sky-300">
                  <Sparkles size={12} /> SERNEM PULSE
                  <span className="rounded-full border border-sky-400/20 bg-sky-500/[0.08] px-2 py-1 text-[7px] text-sky-200">{tr ? "YENİ SEÇKİ" : "NEW PICKS"}</span>
                </div>
                <h2 className="mt-1.5 text-[16px] font-black tracking-[-0.025em] text-white sm:text-[19px]">
                  {tr ? "Şu an keşfetmeye değer içerikler." : "What to explore on SERNEM right now."}
                </h2>
              </div>
              <span className="text-[8px] font-black uppercase tracking-[0.13em] text-slate-600">{tr ? "12 saatte bir yenilenir" : "Refreshes every 12 hours"}</span>
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {items.map((item, index) => {
                const image = FEATURE_IMAGES[(slot * 3 + index) % FEATURE_IMAGES.length];
                const badges = tr ? ["ÖNE ÇIKAN", "SAHA SEÇKİSİ", "KEŞFET"] : ["FEATURED", "FIELD PICK", "EXPLORE"];
                return (
                  <Link
                    key={item.href}
                    href={`/${locale}${item.href}`}
                    className="group relative min-h-[190px] overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900 transition hover:-translate-y-0.5 hover:border-sky-400/30"
                  >
                    <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,.12),rgba(2,6,23,.28)_35%,rgba(2,6,23,.96)_88%)]" />
                    <div className="relative flex h-full min-h-[190px] flex-col justify-between p-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-lg border border-white/15 bg-slate-950/70 px-2 py-1 text-[9px] font-black text-white">{index + 1}</span>
                        <span className="rounded-full border border-sky-300/25 bg-sky-400/15 px-2 py-1 text-[7px] font-black uppercase tracking-[0.12em] text-sky-200">{badges[index]}</span>
                      </div>
                      <div>
                        <div className="text-[8px] font-black uppercase tracking-[0.14em] text-sky-300">{tr ? item.labelTr : item.label}</div>
                        <div className="mt-1.5 text-[15px] font-black leading-5 text-white">{tr ? item.titleTr : item.title}</div>
                        <div className="mt-3 inline-flex h-7 w-7 items-center justify-center rounded-full border border-sky-300/35 bg-slate-950/55 text-sky-200">
                          <ArrowUpRight size={13} />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <Link
            href={`/${locale}/labs`}
            className="group relative overflow-hidden rounded-[22px] border border-amber-300/[0.14] bg-[linear-gradient(145deg,rgba(245,158,11,.08),rgba(255,255,255,.018)_55%,rgba(14,165,233,.035))] p-4 shadow-[0_20px_55px_rgba(0,0,0,.18)] transition hover:border-amber-300/30"
          >
            <Trophy size={118} strokeWidth={1.1} className="pointer-events-none absolute -right-7 -top-7 text-amber-300/[0.05]" />
            <div className="relative flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.18em] text-amber-300"><Trophy size={12} /> {monthLabel}</div>
                <h3 className="mt-1.5 text-[15px] font-black text-white">HSE Labs XP Leaderboard</h3>
                <p className="mt-1 text-[9px] text-slate-500">{tr ? "Bu ayın gerçek XP sıralaması" : "Real XP ranking for this month"}</p>
              </div>
              <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-[7px] font-black uppercase tracking-[0.12em] text-slate-500">{tr ? "İLK 3" : "TOP 3"}</span>
            </div>

            <div className="relative mt-4 space-y-2">
              {podium.map((leader, index) => {
                const rank = index + 1;
                return (
                  <div key={rank} className="flex min-h-[42px] items-center gap-2.5 rounded-xl border border-white/[0.06] bg-black/10 px-2.5">
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${rank === 1 ? "border-amber-300/25 bg-amber-300/[0.08] text-amber-300" : "border-white/[0.08] bg-white/[0.03] text-slate-400"}`}>
                      {rank === 1 ? <Crown size={13} /> : <Medal size={13} />}
                    </span>
                    {leader ? (
                      <>
                        <span className="min-w-0 flex-1 truncate text-[10px] font-black text-slate-200">{leader.label}</span>
                        <span className="shrink-0 text-[10px] font-black text-cyan-300">{leader.xp.toLocaleString()} XP</span>
                      </>
                    ) : (
                      <>
                        <span className="min-w-0 flex-1 text-[10px] font-bold text-slate-500">{tr ? `${rank}. sıra açık` : `Rank #${rank} is open`}</span>
                        <span className="shrink-0 text-[7px] font-black uppercase tracking-[0.11em] text-amber-300/80">{tr ? "YARIŞA KATIL" : "JOIN"}</span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="relative mt-3 flex items-center justify-between rounded-xl bg-sky-500/[0.08] px-3 py-2.5 text-[9px] font-black text-sky-200">
              <span>{tr ? "HSE Labs'e katıl ve XP kazan" : "Join HSE Labs and earn XP"}</span>
              <ArrowUpRight size={13} />
            </div>
          </Link>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {categoryLinks.map((item) => (
            <Link key={item.href} href={`/${locale}${item.href}`} className="min-w-[155px] flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 transition hover:border-sky-400/20 hover:bg-sky-500/[0.035]">
              <div className="text-[9px] font-black text-slate-200">{item.label}</div>
              <div className="mt-0.5 text-[8px] font-semibold text-slate-600">{item.note}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
