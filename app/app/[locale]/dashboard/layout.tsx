import PendingIncidentImport from "./labs/PendingIncidentImport";
import TrialDashboardCard from "./TrialDashboardCard";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { createClient } from "../../../utils/supabase/server";
import { getLemonSubscription } from "../../../lib/lemonsqueezy";
import { PREMIUM_TRIAL_VARIANT_ID, premiumTrialEnabled } from "../../../lib/premium-trial-config";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export default async function DashboardLayout({ children, params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "tr" ? "tr" : "en";
  let trial: { trialEndsAt: string | null; cancelled: boolean; accessEndsAt: string | null } | null = null;
  if (premiumTrialEnabled() && process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const auth = await createClient();
    const { data: { user } } = await auth.auth.getUser();
    if (user) {
      const db = createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
      const [recordResult, profileResult] = await Promise.all([
        db.from("premium_trial_reservations").select("status").eq("user_id", user.id).maybeSingle(),
        db.from("profiles").select("lemon_subscription_id").eq("id", user.id).maybeSingle(),
      ]);
      if (!recordResult.error && !profileResult.error && recordResult.data &&
          ["on_trial", "cancelled"].includes(recordResult.data.status) &&
          profileResult.data?.lemon_subscription_id) {
        try {
          const subscription = await getLemonSubscription(String(profileResult.data.lemon_subscription_id));
          const a = subscription.data.attributes;
          if (String(a.variant_id ?? "") === PREMIUM_TRIAL_VARIANT_ID &&
              ["on_trial", "cancelled"].includes(String(a.status ?? ""))) {
            trial = {
              trialEndsAt: a.trial_ends_at ?? null,
              cancelled: Boolean(a.cancelled),
              accessEndsAt: a.ends_at ?? null,
            };
          }
        } catch (error) {
          console.error("Dashboard trial status unavailable", error);
        }
      }
    }
  }
  return (
    <>
      <PendingIncidentImport />
      {trial && <TrialDashboardCard locale={locale} {...trial} />}
      {children}
    </>
  );
}
