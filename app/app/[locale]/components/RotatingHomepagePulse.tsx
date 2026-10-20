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
  UsersRound,
} from "lucide-react";

type Locale = "tr" | "en";

type Leader = {
  rank: number;
  label: string;
  xp: number;
  best_score: number;
  attempts: number;
};

// Illustrative profiles for layout preview only — never inserted into Supabase,
// counted as participants, or displayed as authentic competitive results.
const SAMPLE_LEADERS: Leader[] = [
  { rank: 1, label: "Alex Morgan", xp: 14850, best_score: 100, attempts: 0 },
  { rank: 2, label: "Luca Moretti", xp: 11270, best_score: 100, attempts: 0 },
  { rank: 3, label: "Maya Chen", xp: 8930, best_score: 100, attempts: 0 },
];

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

  useEffect(() => {
    const update = () => setSlot(Math.floor(Date.now() / HALF_DAY));
    update();
    const timer = window.setInterval(update, 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  const items = useMemo(() => ROTATIONS[slot % ROTATIONS.length], [slot]);
  const monthLabel = new Intl.DateTimeFormat(tr ? "tr-TR" : "en-US", { month: "long", year: "numeric" }).format(new Date());
  const podium = SAMPLE_LEADERS;
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
        <div className="relative isolate overflow-hidden rounded-[24px] border border-sky-400/25 bg-[linear-gradient(115deg,#071a2d_0%,#07101e_51%,#071b2b_100%)] p-3 shadow-[0_16px_42px_rgba(0,0,0,.22)] sm:p-4">
          <div aria-hidden="true" className="pointer-events-none absolute -left-28 -top-32 h-64 w-64 rounded-full bg-sky-400/[0.07] blur-[75px]" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -bottom-40 h-64 w-64 rounded-full bg-cyan-400/[0.07] blur-[80px]" />
          <div className="relative grid gap-2 md:grid-cols-[minmax(0,1.28fr)_minmax(0,.94fr)_minmax(0,.90fr)] xl:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)_minmax(0,.95fr)_auto] xl:items-center">
            <Link href={`/${locale}/downloads`} className="group flex min-w-0 items-center gap-3 rounded-2xl border border-sky-400/15 bg-sky-400/[0.035] p-3 transition hover:border-sky-300/40 hover:bg-sky-400/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 sm:gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-400/[0.08] text-cyan-300 shadow-[inset_0_0_15px_rgba(34,211,238,.06)] sm:h-14 sm:w-14" aria-hidden="true">
                <FileText size={27} strokeWidth={1.65} />
              </span>
              <span className="min-w-0">
                <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="text-[29px] font-black leading-none tracking-[-0.055em] text-white sm:text-[34px]">{tr ? "1.000+" : "1,000+"}</span>
                  <span className="text-[11px] font-extrabold leading-tight text-slate-100 sm:text-[12px]">{tr ? "HSE içeriği ve araç" : "HSE resources & tools"}</span>
                </span>
                <span className="mt-2 block max-w-sm text-[10px] leading-[1.55] text-slate-400">
                  {tr ? "Risk değerlendirmeleri, toolbox, kontrol listeleri, rehberler ve saha araçları." : "Risk assessments, toolbox talks, checklists, guides and field tools."}
                </span>
              </span>
            </Link>
            <div className="relative flex min-w-0 items-center gap-3 rounded-2xl border border-sky-400/25 bg-[linear-gradient(135deg,rgba(8,145,178,.13),rgba(2,6,23,.16))] p-3 shadow-[inset_0_1px_0_rgba(125,211,252,.07)] sm:gap-3.5" aria-label={tr ? "Topluluk büyüme hedefi: 1.000 üzeri üye" : "Community growth goal: over 1,000 members"}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-300/30 bg-sky-400/10 text-cyan-300 sm:h-12 sm:w-12" aria-hidden="true">
                <UsersRound size={24} strokeWidth={1.75} />
              </span>
              <span className="min-w-0">
                <span className="block text-[8px] font-black uppercase tracking-[0.16em] text-cyan-300/90">{tr ? "TOPLULUK HEDEFİ" : "COMMUNITY GOAL"}</span>
                <span className="mt-0.5 flex flex-wrap items-baseline gap-x-2">
                  <span className="text-[28px] font-black leading-none tracking-[-0.045em] text-white sm:text-[32px]">{tr ? "1.000+" : "1,000+"}</span>
                  <span className="text-[11px] font-bold text-slate-100">{tr ? "Üye" : "Members"}</span>
                </span>
                <span className="mt-1 block text-[9px] leading-4 text-slate-400">{tr ? "Hedeflenen HSE topluluğu" : "Target HSE community size"}</span>
              </span>
            </div>
            <div className="relative flex min-w-0 items-center gap-3 rounded-2xl border border-amber-300/25 bg-[linear-gradient(135deg,rgba(245,158,11,.09),rgba(2,6,23,.18))] p-3 shadow-[inset_0_1px_0_rgba(253,230,138,.05)] sm:gap-3.5" aria-label={tr ? "Premium büyüme hedefi: 100 üzeri üye" : "Premium growth goal: over 100 members"}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-300/30 bg-amber-300/[0.07] text-amber-300 sm:h-12 sm:w-12" aria-hidden="true">
                <Crown size={24} strokeWidth={1.75} />
              </span>
              <span className="min-w-0">
                <span className="block text-[8px] font-black uppercase tracking-[0.16em] text-amber-300/90">{tr ? "PREMIUM HEDEFİ" : "PREMIUM GOAL"}</span>
                <span className="mt-0.5 flex flex-wrap items-baseline gap-x-2">
                  <span className="text-[28px] font-black leading-none tracking-[-0.045em] text-white sm:text-[32px]">100+</span>
                  <span className="text-[11px] font-bold text-slate-100">Premium</span>
                </span>
                <span className="mt-1 block text-[9px] leading-4 text-slate-400">{tr ? "Uzmanlar için özel araçlar" : "Advanced tools for professionals"}</span>
              </span>
            </div>
            <Link href={`/${locale}/downloads`} className="group flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-sky-400/15 bg-sky-500/[0.06] px-3 text-[10px] font-black text-cyan-300 transition hover:border-cyan-300/35 hover:bg-sky-500/[0.12] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 md:col-span-3 xl:col-span-1 xl:bg-transparent xl:text-right">
              {tr ? "Tüm içeriği keşfet" : "Explore all content"}
              <ArrowUpRight size={15} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

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

          <div className="relative overflow-hidden rounded-[22px] border border-amber-300/[0.14] bg-[linear-gradient(145deg,rgba(245,158,11,.08),rgba(255,255,255,.018)_55%,rgba(14,165,233,.035))] p-4 shadow-[0_20px_55px_rgba(0,0,0,.18)]">
            <Trophy size={118} strokeWidth={1.1} className="pointer-events-none absolute -right-7 -top-7 text-amber-300/[0.05]" />
            <div className="relative flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.18em] text-amber-300"><Trophy size={12} /> {monthLabel}</div>
                <h3 className="mt-1.5 text-[15px] font-black text-white">HSE Labs XP Leaderboard</h3>
                <p className="mt-1 text-[9px] text-slate-400">{tr ? "Temsilî sıralama" : "Illustrative ranking"}</p>
              </div>
            </div>

            <div className="relative mt-3 space-y-2">
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

            <Link href={`/${locale}/labs`} className="relative mt-3 flex min-h-10 items-center justify-between rounded-xl bg-sky-500/[0.08] px-3 py-2.5 text-[9px] font-black text-sky-200 transition hover:bg-sky-500/[0.15] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
              <span>{tr ? "HSE Labs'e katıl ve XP kazan" : "Join HSE Labs and earn XP"}</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
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
