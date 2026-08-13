import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { isAdminUser } from "@/lib/auth/access";
import PlatformSettingsClient from "./PlatformSettingsClient";

const OWNER_EMAIL = "safebase.global@gmail.com";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function PlatformSettingsPage({
  params,
}: Props) {
  const { locale: rawLocale } = await params;

  const locale: "tr" | "en" =
    rawLocale === "tr" ? "tr" : "en";

  const isTurkish = locale === "tr";

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      `/${locale}/login?next=/${locale}/admin/settings`
    );
  }

  const isOwner =
    user.email?.trim().toLowerCase() === OWNER_EMAIL;

  if (!isOwner || !isAdminUser(user)) {
    redirect(`/${locale}/dashboard`);
  }

  const { data, error } = await supabase
    .from("platform_settings")
    .select(
      "site_name_tr,site_name_en,seo_title_tr,seo_title_en,seo_description_tr,seo_description_en,support_email,maintenance_mode"
    )
    .eq("id", 1)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href={`/${locale}/admin`}
          className="text-sm font-black text-blue-400 transition hover:text-blue-300"
        >
          ←{" "}
          {isTurkish
            ? "Yönetici paneline dön"
            : "Back to admin dashboard"}
        </Link>

        <header className="mt-8 border-b border-white/10 pb-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-400">
            SAFEBASE PLATFORM CONTROL
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            {isTurkish
              ? "Platform Ayarları"
              : "Platform Settings"}
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
            {isTurkish
              ? "Site bilgilerini, SEO metinlerini ve genel platform davranışlarını tek merkezden yönetin."
              : "Manage site information, SEO content and general platform behavior from one control center."}
          </p>
        </header>

        <PlatformSettingsClient
          locale={locale}
          initialSettings={data}
        />
      </div>
    </main>
  );
}
