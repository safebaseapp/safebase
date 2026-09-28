import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import ReportsHubClient from "./ReportsHubClient";

type Props = {
  params: Promise<{ locale: "tr" | "en" }>;
};

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect(`/${locale}/login?next=/${locale}/hse-performance/report`);

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan,role,status")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.status === "suspended") redirect(`/${locale}/account-suspended`);
  const isPremium = profile?.plan === "premium" || profile?.role === "admin";
  if (!isPremium) redirect(`/${locale}/upgrade`);

  return <ReportsHubClient locale={locale} userId={user.id} />;
}
