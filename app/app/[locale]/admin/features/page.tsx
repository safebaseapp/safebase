import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { isAdminUser } from "@/lib/auth/access";
import FeatureFlagsClient from "./FeatureFlagsClient";

const OWNER_EMAIL = "safebase.global@gmail.com";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

type FeatureFlagKey =
  | "ai_assistant"
  | "premium_downloads"
  | "courses_certificates";

type FeatureFlag = {
  key: FeatureFlagKey;
  enabled: boolean;
  label_tr: string;
  label_en: string;
  description_tr: string | null;
  description_en: string | null;
};

export default async function FeatureFlagsPage({
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
      `/${locale}/login?next=/${locale}/admin/features`
    );
  }

  const isOwner =
    user.email?.trim().toLowerCase() === OWNER_EMAIL;

  if (!isOwner || !isAdminUser(user)) {
    redirect(`/${locale}/dashboard`);
  }

  const { data, error } = await supabase
    .from("feature_flags")
    .select(
      "key,enabled,label_tr,label_en,description_tr,description_en"
    )
    .order("key");

  if (error) {
    throw new Error(error.message);
  }

  const flags = (data ?? []) as FeatureFlag[];

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
            SAFEBASE FEATURE CONTROL
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            {isTurkish
              ? "Özellik Bayrakları"
              : "Feature Flags"}
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
            {isTurkish
              ? "Platform özelliklerini kod değiştirmeden merkezi olarak açın veya kapatın."
              : "Enable or disable platform capabilities centrally without changing application code."}
          </p>
        </header>

        <FeatureFlagsClient
          locale={locale}
          initialFlags={flags}
        />
      </div>
    </main>
  );
}
