"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  locale: "tr" | "en";
};

const WORKSPACE_ROUTES = [
  "/tools/quick-risk-assessment",
  "/tools/method-statement",
  "/toolbox",
  "/checklists",
  "/hse-performance",
  "/downloads",
];

export default function DashboardReturnBar({ locale }: Props) {
  const pathname = usePathname();
  const isTurkish = locale === "tr";

  if (!pathname || pathname === `/${locale}/dashboard`) return null;

  const localePrefix = `/${locale}`;
  const relativePath = pathname.startsWith(localePrefix)
    ? pathname.slice(localePrefix.length)
    : pathname;

  const belongsToWorkspace = WORKSPACE_ROUTES.some(
    (route) => relativePath === route || relativePath.startsWith(`${route}/`),
  );

  if (!belongsToWorkspace) return null;

  return (
    <div className="sticky top-0 z-40 border-b border-blue-400/10 bg-[#030a17]/95 px-4 py-2 backdrop-blur-xl print:hidden sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <Link
          href={`/${locale}/dashboard`}
          className="inline-flex h-9 items-center gap-2 rounded-xl border border-blue-400/20 bg-blue-500/[0.07] px-3.5 text-xs font-black text-blue-100 transition hover:border-blue-400/35 hover:bg-blue-500/[0.12] hover:text-white"
        >
          <span className="text-blue-300">←</span>
          <span>{isTurkish ? "Dashboard'a Dön" : "Back to Dashboard"}</span>
        </Link>

        <div className="hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>{isTurkish ? "SERNEM Çalışma Alanı" : "SERNEM Workspace"}</span>
        </div>
      </div>
    </div>
  );
}
