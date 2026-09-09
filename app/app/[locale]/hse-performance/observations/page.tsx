import { hasLocale } from "next-intl";
import { notFound, redirect } from "next/navigation";
import { routing } from "../../../../i18n/routing";
import { createClient } from "@/utils/supabase/server";
import ObservationFollowUpClient from "./ObservationFollowUpClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ObservationFollowUpPage({
  params,
}: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      `/${locale}/login?next=/${locale}/hse-performance/observations`,
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("status")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect(`/${locale}/login`);
  }

  if (profile.status === "suspended") {
    redirect(`/${locale}/account-suspended`);
  }

  const { data: observations } = await supabase
    .from("hse_observations")
    .select("*")
    .eq("user_id", user.id)
    .order("observation_date", {
      ascending: false,
    })
    .order("created_at", {
      ascending: false,
    });

  return (
    <ObservationFollowUpClient
      locale={locale as "tr" | "en"}
      userId={user.id}
      initialObservations={observations ?? []}
    />
  );
}
