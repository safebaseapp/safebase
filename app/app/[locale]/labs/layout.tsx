import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

type LabProgress = {
  total_xp: number;
  level: number;
  current_streak: number;
  scenario_count: number;
};

export default async function LabsLayout({ children, params }: Props) {
  const { locale } = await params;
  const isTr = locale === "tr";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let progress: LabProgress | null = null;

  if (user) {
    const { data } = await supabase
      .from("lab_user_progress")
      .select("total_xp,level,current_streak,scenario_count")
      .eq("user_id", user.id)
      .maybeSingle();

    progress = data as LabProgress | null;
  }

  const totalXp = progress?.total_xp ?? 0;
  const level = progress?.level ?? 1;
  const streak = progress?.current_streak ?? 0;
  const completed = progress?.scenario_count ?? 0;
  const levelProgress = totalXp % 100;

  return (
    <div className="bg-slate-950 text-white">
      <div className="border-b border-white/10 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link href={`/${locale}/labs`} className="flex items-center gap-2 font-black tracking-tight">
            <span className="text-slate-100">SERNEM</span>
            <span className="text-cyan-300">Labs</span>
          </Link>

          {user ? (
            <div className="flex flex-1 flex-wrap items-center justify-end gap-2 sm:gap-3">
              <div className="hidden min-w-36 sm:block">
                <div className="mb-1 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <span>Level {level}</span>
                  <span>{levelProgress}/100 XP</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-cyan-300" style={{ width: `${levelProgress}%` }} />
                </div>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-black text-cyan-200">
                ⭐ {totalXp} XP
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-black text-orange-200">
                🔥 {streak}
              </div>
              <div className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-black text-slate-300 md:block">
                {completed} {isTr ? "challenge" : "challenges"}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="hidden sm:inline">
                {isTr ? "XP ve streak kaydetmek için giriş yap." : "Sign in to save XP and streak."}
              </span>
              <Link
                href={`/${locale}/login?next=/${locale}/labs`}
                className="rounded-full bg-cyan-300 px-4 py-2 font-black text-slate-950 hover:bg-cyan-200"
              >
                {isTr ? "Giriş yap" : "Sign in"}
              </Link>
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
