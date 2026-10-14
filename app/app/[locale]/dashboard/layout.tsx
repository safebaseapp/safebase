import PendingIncidentImport from "./labs/PendingIncidentImport";
import TrialDashboardCard from "./TrialDashboardCard";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { createClient } from "../../../utils/supabase/server";
import { premiumTrialEnabled } from "../../../lib/premium-trial-config";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export default async function DashboardLayout({ children, params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "tr" ? "tr" : "en";
  let trial: { trialEndsAt: string | null; cancelled: boolean; accessEndsAt: string | null } | null = null;

  // Trial entitlement is synchronized from signed Lemon Squeezy webhooks.
  // Avoid external API calls during SSR; cancellation verifies with the provider separately.
  if (premiumTrialEnabled() && process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const auth = await createClient();
      const { data: { user } } = await auth.auth.getUser();
      if (user) {
        const db = createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
          auth: { persistSession: false, autoRefreshToken: false },
        });
        const { data, error } = await db.from("premium_trial_reservations")
          .select("status,lemon_subscription_id,trial_ends_at,access_ends_at")
          .eq("user_id", user.id).maybeSingle();

        if (!error && data?.lemon_subscription_id && ["on_trial", "cancelled"].includes(data.status)) {
          const ends = data.status === "cancelled"
            ? (data.access_ends_at || data.trial_ends_at)
            : data.trial_ends_at;
          if (ends && Number.isFinite(Date.parse(ends)) && Date.parse(ends) > Date.now()) {
            trial = {
              trialEndsAt: data.trial_ends_at,
              cancelled: data.status === "cancelled",
              accessEndsAt: data.access_ends_at,
            };
          }
        }
      }
    } catch (error) {
      // The dashboard must remain available even when trial status is temporarily unavailable.
      console.error("Dashboard trial card unavailable", error);
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
