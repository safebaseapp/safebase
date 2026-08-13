import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getUserRole, isAdminUser } from "@/lib/auth/access";

const OWNER_EMAIL = "safebase.global@gmail.com";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

const navigation = [
  {
    icon: "🏠",
    tr: "Genel Bakış",
    en: "Overview",
    href: "",
  },
  {
    icon: "👥",
    tr: "Kullanıcılar",
    en: "Users",
    href: "/users",
  },
  {
    icon: "👑",
    tr: "Üyelikler",
    en: "Memberships",
    href: "/memberships",
  },
  {
    icon: "📚",
    tr: "İçerik Yönetimi",
    en: "Content Management",
    href: "/content",
  },
  {
    icon: "🚀",
    tr: "Özellik Bayrakları",
    en: "Feature Flags",
    href: "/features",
  },
  {
    icon: "⚙️",
    tr: "Ayarlar",
    en: "Settings",
    href: "/settings",
  },
];

const contentStats = [
  {
    icon: "🗣️",
    value: "20",
    tr: "Toolbox Talk",
    en: "Toolbox Talks",
  },
  {
    icon: "🖼️",
    value: "9",
    tr: "Güvenlik Posteri",
    en: "Safety Posters",
  },
  {
    icon: "📘",
    value: "2",
    tr: "Profesyonel Rehber",
    en: "Professional Guides",
  },
  {
    icon: "📄",
    value: "39+",
    tr: "Toplam Kaynak",
    en: "Total Resources",
  },
];

const managementSections = [
  {
    id: "users",
    icon: "👥",
    trTitle: "Kullanıcı Yönetimi",
    enTitle: "User Management",
    trText:
      "Kullanıcıları, rollerini, planlarını ve hesap durumlarını buradan yöneteceğiz.",
    enText:
      "Manage users, roles, plans and account status from this section.",
    items: [
      "Admin / Premium / Free",
      "Aktif kullanıcılar",
      "Son giriş bilgileri",
    ],
  },
  {
    id: "memberships",
    icon: "👑",
    trTitle: "Üyelik Yönetimi",
    enTitle: "Membership Management",
    trText:
      "Free ve Premium planlarını, fiyatları ve üyelik özelliklerini buradan yöneteceğiz.",
    enText:
      "Manage Free and Premium plans, prices and membership benefits.",
    items: [
      "🌍 Free",
      "👑 Premium",
      "Admin Premium Override",
    ],
  },
  {
    id: "content",
    icon: "📚",
    trTitle: "İçerik Yönetimi",
    enTitle: "Content Management",
    trText:
      "Toolbox, poster, rehber, şablon ve checklist içeriklerinin yayın durumunu yöneteceğiz.",
    enText:
      "Control Toolbox, poster, guide, template and checklist publishing.",
    items: [
      "Visible / Hidden",
      "Free / Premium",
      "Featured / Standard",
    ],
  },
  {
    id: "features",
    icon: "🚀",
    trTitle: "Özellik Bayrakları",
    enTitle: "Feature Flags",
    trText:
      "Yeni özellikleri kod değiştirmeden açıp kapatacağımız kontrol merkezi.",
    enText:
      "Enable or disable platform features without changing application code.",
    items: [
      "AI Assistant",
      "Premium Downloads",
      "Courses & Certificates",
    ],
  },
  {
    id: "settings",
    icon: "⚙️",
    trTitle: "Platform Ayarları",
    enTitle: "Platform Settings",
    trText:
      "Site, SEO, e-posta, ödeme ve platform ayarlarını buradan yöneteceğiz.",
    enText:
      "Manage site, SEO, email, payments and general platform settings.",
    items: [
      "Site settings",
      "SEO settings",
      "Payment settings",
    ],
  },
];

export default async function AdminPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "tr" ? "tr" : "en";
  const isTurkish = locale === "tr";

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/login?next=/${locale}/admin`);
  }

  const isOwner =
    user.email?.trim().toLowerCase() === OWNER_EMAIL;

  if (!isOwner || !isAdminUser(user)) {
    redirect(`/${locale}/dashboard`);
  }

  const role = getUserRole(user);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-white/10 bg-slate-950/95 p-6 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-3 text-xl font-black"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20">
              S
            </span>

            <span>SafeBase Admin</span>
          </Link>

          <div className="mt-8 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              {isTurkish ? "Yönetici erişimi" : "Administrator access"}
            </p>

            <p className="mt-2 break-all text-sm font-bold text-white">
              {user.email}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-black text-blue-300">
                🛡️ {role.toUpperCase()}
              </span>

              <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-black text-amber-300">
                👑 PREMIUM
              </span>
            </div>
          </div>

          <nav className="mt-8 space-y-2">
            {navigation.map((item, index) => (
              <Link
                key={item.en}
                href={
                  item.href
                    ? `/${locale}/admin${item.href}`
                    : `/${locale}/admin`
                }
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-black transition ${
                  index === 0
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <span>{item.icon}</span>
                <span>{isTurkish ? item.tr : item.en}</span>
              </Link>
            ))}
          </nav>

          <Link
            href={`/${locale}/dashboard`}
            className="mt-8 flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-black text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
          >
            ← {isTurkish ? "Kullanıcı paneline dön" : "Return to dashboard"}
          </Link>
        </aside>

        <section className="min-w-0 p-6 sm:p-8 lg:p-10">
          <header className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 xl:flex-row xl:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-400">
                SafeBase Control Center
              </p>

              <h1 className="mt-4 text-4xl font-black tracking-[-0.045em] sm:text-5xl">
                {isTurkish ? "Yönetici Paneli" : "Admin Dashboard"}
              </h1>

              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
                {isTurkish
                  ? "Kullanıcıları, Premium erişimini, içerikleri ve platform özelliklerini tek merkezden yönetin."
                  : "Manage users, Premium access, content and platform features from one control center."}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
                {isTurkish ? "Sistem durumu" : "System status"}
              </p>
              <p className="mt-2 font-black text-white">
                ● {isTurkish ? "Tüm sistemler çalışıyor" : "All systems operational"}
              </p>
            </div>
          </header>

          <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {contentStats.map((stat) => (
              <article
                key={stat.en}
                className="rounded-[24px] border border-white/10 bg-white/[0.045] p-6"
              >
                <div className="text-3xl">{stat.icon}</div>
                <p className="mt-5 text-4xl font-black">{stat.value}</p>
                <p className="mt-2 font-bold text-slate-400">
                  {isTurkish ? stat.tr : stat.en}
                </p>
              </article>
            ))}
          </section>

          <section className="mt-8 grid gap-5 xl:grid-cols-3">
            <article className="rounded-[28px] border border-blue-400/20 bg-gradient-to-br from-blue-600/20 via-white/[0.05] to-transparent p-7 xl:col-span-2">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-300">
                {isTurkish ? "Admin Premium Override" : "Admin Premium Override"}
              </p>

              <h2 className="mt-4 text-3xl font-black">
                {isTurkish
                  ? "Bütün Premium özellikler sana açık"
                  : "All Premium features are available"}
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                {isTurkish
                  ? "Admin hesabın Premium kontrollerini otomatik olarak geçer. Böylece ödeme yapmadan ve hesabını değiştirmeden bütün kilitli özellikleri test edebilirsin."
                  : "Your administrator account automatically passes Premium checks, allowing you to test all locked features without payment or plan changes."}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  "👑 Premium Downloads",
                  "🤖 AI Assistant",
                  "📚 Premium Content",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-black"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[28px] border border-white/10 bg-white/[0.045] p-7">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-400">
                {isTurkish ? "Hızlı işlemler" : "Quick actions"}
              </p>

              <div className="mt-5 space-y-3">
                <Link
                  href={`/${locale}/downloads`}
                  className="block rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-black transition hover:bg-white/[0.08]"
                >
                  📥 {isTurkish ? "Kaynakları görüntüle" : "View downloads"}
                </Link>

                <Link
                  href={`/${locale}/dashboard`}
                  className="block rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-black transition hover:bg-white/[0.08]"
                >
                  👤 {isTurkish ? "Kullanıcı panelini aç" : "Open user dashboard"}
                </Link>

                <Link
                  href={`/${locale}/tools`}
                  className="block rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-black transition hover:bg-white/[0.08]"
                >
                  🧮 {isTurkish ? "HSE araçlarını aç" : "Open HSE tools"}
                </Link>
              </div>
            </article>
          </section>

          <section className="mt-10 space-y-6">
            {managementSections.map((section) => (
              <article
                id={section.id}
                key={section.id}
                className="scroll-mt-8 rounded-[28px] border border-white/10 bg-white/[0.035] p-7"
              >
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{section.icon}</span>
                      <h2 className="text-2xl font-black">
                        {isTurkish ? section.trTitle : section.enTitle}
                      </h2>
                    </div>

                    <p className="mt-4 max-w-3xl leading-7 text-slate-400">
                      {isTurkish ? section.trText : section.enText}
                    </p>
                  </div>

                  <span className="w-fit rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">
                  {isTurkish ? "AKTİF" : "ACTIVE"}
                  </span>
                 </div>

                 <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {section.items.map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm font-bold text-slate-300"
                    >
                      ✓ {item}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </section>
        </section>
      </div>
    </main>
  );
}
