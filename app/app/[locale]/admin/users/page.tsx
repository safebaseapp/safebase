import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { isAdminUser } from "@/lib/auth/access";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: "user" | "admin";
  plan: "free" | "premium";
  status: "active" | "suspended";
  created_at: string;
  updated_at: string;
};

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default async function AdminUsersPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "tr" ? "tr" : "en";
  const isTurkish = locale === "tr";

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/login?next=/${locale}/admin/users`);
  }

  if (!isAdminUser(user)) {
    redirect(`/${locale}/dashboard`);
  }

  const { data, error } = await supabase
    .from("profiles")
    .select(
      "id,email,full_name,role,plan,status,created_at,updated_at"
    )
    .order("created_at", { ascending: false });

  const profiles = (data ?? []) as Profile[];

  const totalUsers = profiles.length;
  const premiumUsers = profiles.filter(
    (profile) => profile.plan === "premium"
  ).length;
  const freeUsers = profiles.filter(
    (profile) => profile.plan === "free"
  ).length;
  const suspendedUsers = profiles.filter(
    (profile) => profile.status === "suspended"
  ).length;

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-5 border-b border-white/10 pb-7 md:flex-row md:items-end">
          <div>
            <Link
              href={`/${locale}/admin`}
              className="text-sm font-black text-blue-400 transition hover:text-blue-300"
            >
              ← {isTurkish ? "Yönetici paneline dön" : "Back to admin"}
            </Link>

            <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-emerald-400">
              Sernem User Management
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              {isTurkish ? "Kullanıcılar" : "Users"}
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              {isTurkish
                ? "Kullanıcı planlarını, rollerini ve hesap durumlarını yönetin."
                : "Manage user plans, roles and account status."}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">
              {isTurkish ? "Veri kaynağı" : "Data source"}
            </p>
            <p className="mt-1 font-black">Supabase Profiles</p>
          </div>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              icon: "👥",
              value: totalUsers,
              tr: "Toplam Kullanıcı",
              en: "Total Users",
            },
            {
              icon: "🌍",
              value: freeUsers,
              tr: "Ücretsiz",
              en: "Free",
            },
            {
              icon: "👑",
              value: premiumUsers,
              tr: "Premium",
              en: "Premium",
            },
            {
              icon: "⛔",
              value: suspendedUsers,
              tr: "Askıya Alınmış",
              en: "Suspended",
            },
          ].map((stat) => (
            <article
              key={stat.en}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <span className="text-3xl">{stat.icon}</span>
              <p className="mt-5 text-4xl font-black">{stat.value}</p>
              <p className="mt-2 font-bold text-slate-400">
                {isTurkish ? stat.tr : stat.en}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035]">
          <div className="flex flex-col justify-between gap-3 border-b border-white/10 p-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-black">
                {isTurkish ? "Kayıtlı hesaplar" : "Registered accounts"}
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                {isTurkish
                  ? `${totalUsers} kullanıcı listeleniyor.`
                  : `${totalUsers} users listed.`}
              </p>
            </div>

            <span className="w-fit rounded-full bg-blue-500/15 px-3 py-1 text-xs font-black text-blue-300">
              LIVE DATA
            </span>
          </div>

          {error ? (
            <div className="p-6 text-red-300">
              <p className="font-black">
                {isTurkish
                  ? "Kullanıcılar yüklenemedi."
                  : "Users could not be loaded."}
              </p>
              <p className="mt-2 text-sm">{error.message}</p>
            </div>
          ) : profiles.length === 0 ? (
            <div className="p-10 text-center text-slate-400">
              {isTurkish
                ? "Henüz profil kaydı bulunmuyor."
                : "No profile records found."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead className="bg-slate-950/70 text-xs uppercase tracking-[0.14em] text-slate-500">
                  <tr>
                    <th className="px-6 py-4">
                      {isTurkish ? "Kullanıcı" : "User"}
                    </th>
                    <th className="px-6 py-4">
                      {isTurkish ? "Plan" : "Plan"}
                    </th>
                    <th className="px-6 py-4">
                      {isTurkish ? "Rol" : "Role"}
                    </th>
                    <th className="px-6 py-4">
                      {isTurkish ? "Durum" : "Status"}
                    </th>
                    <th className="px-6 py-4">
                      {isTurkish ? "Kayıt Tarihi" : "Created"}
                    </th>
                    <th className="px-6 py-4">
                      {isTurkish ? "İşlem" : "Action"}
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                  {profiles.map((profile) => (
                    <tr
                      key={profile.id}
                      className="transition hover:bg-white/[0.035]"
                    >
                      <td className="px-6 py-5">
                        <p className="font-black text-white">
                          {profile.full_name ||
                            profile.email?.split("@")[0] ||
                            "Sernem User"}
                        </p>
                        <p className="mt-1 text-sm text-slate-400">
                          {profile.email ?? "—"}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-black ${
                            profile.plan === "premium"
                              ? "bg-amber-400/15 text-amber-300"
                              : "bg-emerald-400/15 text-emerald-300"
                          }`}
                        >
                          {profile.plan === "premium"
                            ? "👑 PREMIUM"
                            : "🌍 FREE"}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-black ${
                            profile.role === "admin"
                              ? "bg-blue-500/15 text-blue-300"
                              : "bg-slate-500/15 text-slate-300"
                          }`}
                        >
                          {profile.role === "admin"
                            ? "🛡️ ADMIN"
                            : "USER"}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center gap-2 text-sm font-black ${
                            profile.status === "active"
                              ? "text-emerald-300"
                              : "text-red-300"
                          }`}
                        >
                          <span>
                            {profile.status === "active" ? "●" : "●"}
                          </span>
                          {profile.status === "active"
                            ? isTurkish
                              ? "Aktif"
                              : "Active"
                            : isTurkish
                              ? "Askıda"
                              : "Suspended"}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-sm font-bold text-slate-400">
                        {formatDate(profile.created_at, locale)}
                      </td>

                      <td className="px-6 py-5">
                        <Link
                          href={`/${locale}/admin/users/${profile.id}`}
                          className="inline-flex rounded-xl border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-black text-blue-300 transition hover:border-blue-400/40 hover:bg-blue-500/20 hover:text-blue-200"
                        >
                          {isTurkish ? "Düzenle" : "Edit"}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
