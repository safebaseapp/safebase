import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { isAdminUser } from "@/lib/auth/access";

const OWNER_EMAIL = "safebase.global@gmail.com";

type Props = {
  params: Promise<{ locale: string }>;
};

type ProfileRow = {
  id: string;
  full_name: string | null;
  plan: string | null;
  role: string | null;
  status: string | null;
};

export default async function MembershipsPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "tr" ? "tr" : "en";
  const isTurkish = locale === "tr";

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/login?next=/${locale}/admin/memberships`);
  }

  const isOwner =
    user.email?.trim().toLowerCase() === OWNER_EMAIL;

  if (!isOwner || !isAdminUser(user)) {
    redirect(`/${locale}/dashboard`);
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id,full_name,plan,role,status")
    .order("full_name", { ascending: true });

  const profiles = (data ?? []) as ProfileRow[];

  const totalUsers = profiles.length;

  const premiumUsers = profiles.filter((profile) => {
    const plan = (profile.plan ?? "free").toLowerCase();
    const role = (profile.role ?? "user").toLowerCase();

    return plan === "premium" || role === "admin";
  }).length;

  const freeUsers = profiles.filter((profile) => {
    const plan = (profile.plan ?? "free").toLowerCase();
    const role = (profile.role ?? "user").toLowerCase();

    return plan !== "premium" && role !== "admin";
  }).length;

  const suspendedUsers = profiles.filter(
    (profile) =>
      (profile.status ?? "active").toLowerCase() === "suspended"
  ).length;

  const premiumRate =
    totalUsers > 0
      ? Math.round((premiumUsers / totalUsers) * 100)
      : 0;

  const stats = [
    {
      label: isTurkish ? "Toplam Kullanıcı" : "Total Users",
      value: totalUsers,
      accent: "text-blue-300",
    },
    {
      label: isTurkish ? "Free" : "Free",
      value: freeUsers,
      accent: "text-slate-200",
    },
    {
      label: isTurkish ? "Premium" : "Premium",
      value: premiumUsers,
      accent: "text-violet-300",
    },
    {
      label: isTurkish
        ? "Premium Dönüşüm"
        : "Premium Conversion",
      value: `${premiumRate}%`,
      accent: "text-emerald-300",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              href={`/${locale}/admin`}
              className="text-sm font-bold text-blue-400 transition hover:text-blue-300"
            >
              ← {isTurkish ? "Yönetici paneline dön" : "Back to admin panel"}
            </Link>

            <p className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-violet-400">
              SAFEBASE MEMBERSHIP CONTROL
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight">
              {isTurkish ? "Üyelik Yönetimi" : "Membership Management"}
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              {isTurkish
                ? "Free ve Premium kullanıcı dağılımını, plan erişimlerini ve üyelik durumlarını tek merkezden izleyin."
                : "Monitor Free and Premium user distribution, plan access and membership status from one control center."}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-400/15 bg-emerald-500/[0.06] px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-400">
              {isTurkish ? "VERİ KAYNAĞI" : "DATA SOURCE"}
            </p>
            <p className="mt-1 font-black text-white">
              Supabase Profiles
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-400/20 bg-red-500/[0.07] px-4 py-3 text-sm text-red-300">
            {isTurkish
              ? "Üyelik verileri okunurken hata oluştu."
              : "An error occurred while loading membership data."}
          </div>
        )}

        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
            >
              <p className={`text-3xl font-black ${stat.accent}`}>
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-7 grid gap-6 lg:grid-cols-2">
          <section className="rounded-[26px] border border-white/10 bg-slate-900/70 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">
                  FREE PLAN
                </p>
                <h2 className="mt-2 text-3xl font-black">
                  Free
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  {freeUsers}{" "}
                  {isTurkish ? "kullanıcı" : "users"}
                </p>
              </div>

              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-black text-slate-300">
                {freeUsers}
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {[
                isTurkish
                  ? "Temel HSE hesaplayıcıları"
                  : "Core HSE calculators",
                isTurkish
                  ? "Bilgi merkezi erişimi"
                  : "Knowledge base access",
                isTurkish
                  ? "Kişisel dashboard"
                  : "Personal dashboard",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 text-sm text-slate-300"
                >
                  <span className="text-emerald-400">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[26px] border border-violet-400/20 bg-violet-500/[0.045] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-400">
                  PREMIUM PLAN
                </p>
                <h2 className="mt-2 text-3xl font-black">
                  Premium
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  {premiumUsers}{" "}
                  {isTurkish ? "kullanıcı" : "users"}
                </p>
              </div>

              <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-black text-violet-300">
                {premiumUsers}
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {[
                isTurkish
                  ? "Premium HSE kaynakları"
                  : "Premium HSE resources",
                isTurkish
                  ? "Premium doküman indirmeleri"
                  : "Premium document downloads",
                isTurkish
                  ? "Gelişmiş SafeBase özellikleri"
                  : "Advanced SafeBase features",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 text-sm text-slate-300"
                >
                  <span className="text-emerald-400">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-7 rounded-[26px] border border-white/10 bg-slate-900/70 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">
                {isTurkish ? "ÜYE İŞLEMLERİ" : "MEMBER ACTIONS"}
              </p>

              <h2 className="mt-2 text-xl font-black">
                {isTurkish
                  ? "Kullanıcı planlarını yönetin"
                  : "Manage user plans"}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                {isTurkish
                  ? "Free / Premium plan değişiklikleri mevcut kullanıcı detay ekranından güvenli şekilde yapılır."
                  : "Free / Premium plan changes are managed securely from the existing user detail screen."}
              </p>
            </div>

            <Link
              href={`/${locale}/admin/users`}
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-black text-white transition hover:bg-blue-500"
            >
              {isTurkish
                ? "Kullanıcı Yönetimini Aç"
                : "Open User Management"}{" "}
              →
            </Link>
          </div>
        </section>

        <section className="mt-7 rounded-[26px] border border-white/10 bg-slate-900/50 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                {isTurkish ? "HESAP DURUMU" : "ACCOUNT STATUS"}
              </p>

              <p className="mt-2 text-sm text-slate-400">
                {isTurkish
                  ? `${suspendedUsers} askıya alınmış hesap bulunuyor.`
                  : `${suspendedUsers} suspended accounts found.`}
              </p>
            </div>

            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-black text-slate-300">
              {suspendedUsers}
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
