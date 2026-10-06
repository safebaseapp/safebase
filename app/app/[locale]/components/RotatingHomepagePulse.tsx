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

  return (
    <section className="relative border-y border-white/[0.07] bg-[#050b16] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-60%,rgba(14,165,233,.13),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-5 sm:px-6 lg:py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="min-w-[210px] lg:pr-5">
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.19em] text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_12px_rgba(125,211,252,.7)]" />
              {tr ? "SERNEM'DE ŞİMDİ" : "NOW ON SERNEM"}
            </div>
            <h2 className="mt-1.5 text-[16px] font-black tracking-[-0.025em] text-white">
              {tr ? "Öne çıkan içerikler" : "Featured on SERNEM"}
            </h2>
            <p className="mt-1 text-[10px] leading-4 text-slate-500">
              {tr ? "Her 12 saatte yeni içerikler." : "Fresh picks every 12 hours."}
            </p>
          </div>

          <div className="grid min-w-0 flex-1 gap-2 sm:grid-cols-3">
            {items.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="group flex min-h-[76px] items-center gap-3 rounded-2xl border border-white/[0.075] bg-white/[0.022] px-3.5 py-3 transition duration-200 hover:-translate-y-0.5 hover:border-sky-400/25 hover:bg-sky-500/[0.045]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-400/15 bg-sky-500/[0.07] text-sky-300 transition group-hover:border-sky-300/30 group-hover:bg-sky-500/[0.11]">
                  <Icon name={item.icon} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[8px] font-black uppercase tracking-[0.14em] text-slate-500">
                    {tr ? item.labelTr : item.label}
                  </span>
                  <span className="mt-1 block truncate text-[12px] font-black text-slate-200 transition group-hover:text-white">
                    {tr ? item.titleTr : item.title}
                  </span>
                </span>
                <ArrowUpRight size={15} className="shrink-0 text-slate-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-300" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
