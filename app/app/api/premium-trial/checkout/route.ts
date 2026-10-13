import { NextRequest, NextResponse } from "next/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { createClient } from "../../../../utils/supabase/server";
import { PREMIUM_TRIAL_PRODUCT_ID, PREMIUM_TRIAL_VARIANT_ID, premiumTrialEnabled } from "../../../../lib/premium-trial-config";

export const runtime = "nodejs";
const POLICY_VERSION = "premium-trial-2026-10-13-v1";

export async function POST(request: NextRequest) {
  if (!premiumTrialEnabled()) return NextResponse.json({ error: "Trial is not available" }, { status: 503 });
  const body = await request.json().catch(() => null);
  if (body?.accepted !== true || !["tr", "en"].includes(body?.locale)) {
    return NextResponse.json({ error: "Explicit subscription consent is required" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user || !user.email_confirmed_at || !user.email) {
    return NextResponse.json({ error: "A verified SERNEM account is required" }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const lemonKey = process.env.LEMONSQUEEZY_API_KEY;
  if (!url || !serviceKey || !lemonKey) {
    return NextResponse.json({ error: "Trial configuration incomplete" }, { status: 503 });
  }
  const admin = createAdminClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: profile, error: profileError } = await admin.from("profiles").select("plan,lemon_subscription_id,subscription_status").eq("id", user.id).maybeSingle();
  if (profileError || !profile || profile.plan === "premium" || profile.lemon_subscription_id ||
      ["active", "on_trial", "past_due", "cancelled"].includes(String(profile.subscription_status ?? ""))) {
    return NextResponse.json({ error: "Account is not eligible for a free trial" }, { status: 409 });
  }

  // Database UNIQUE(user_id) guarantees one checkout reservation per SERNEM identity.
  // No attempts are overwritten automatically; support can review abandoned checkouts.
  const { data: reservation, error: reservationError } = await admin
    .from("premium_trial_reservations")
    .insert({ user_id: user.id, email: user.email.toLowerCase(), locale: body.locale, consent_version: POLICY_VERSION,
      consent_at: new Date().toISOString(), status: "reserved" })
    .select("id").single();
  if (reservationError || !reservation) {
    return NextResponse.json({ error: "Trial already requested or unavailable" }, { status: 409 });
  }

  const base = new URL(request.url).origin;
  try {
    // Read the authoritative store ID from this exact Lemon product rather
    // than requiring a duplicated manually configured environment variable.
    const productResponse = await fetch(`https://api.lemonsqueezy.com/v1/products/${PREMIUM_TRIAL_PRODUCT_ID}`, {
      cache: "no-store",
      headers: { Accept: "application/vnd.api+json", Authorization: `Bearer ${lemonKey}` },
    });
    if (!productResponse.ok) throw new Error(`Lemon product lookup failed: ${productResponse.status}`);
    const product = await productResponse.json();
    if (String(product?.data?.id) !== PREMIUM_TRIAL_PRODUCT_ID ||
        product?.data?.attributes?.status !== "published" ||
        !product?.data?.attributes?.store_id) {
      throw new Error("Trial product is unpublished or does not match configured ID");
    }
    const storeId = String(product.data.attributes.store_id);
    const result = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST", cache: "no-store",
      headers: { Accept: "application/vnd.api+json", "Content-Type": "application/vnd.api+json", Authorization: `Bearer ${lemonKey}` },
      body: JSON.stringify({
        data: { type: "checkouts", attributes: {
          product_options: { enabled_variants: [Number(PREMIUM_TRIAL_VARIANT_ID)],
            redirect_url: `${base}/${body.locale}/dashboard` },
          checkout_options: { skip_trial: false, subscription_preview: true, locale: body.locale },
          checkout_data: { email: user.email, custom: { user_id: user.id, trial_reservation_id: reservation.id } },
          expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString()
        }, relationships: {
          store: { data: { type: "stores", id: storeId } },
          variant: { data: { type: "variants", id: PREMIUM_TRIAL_VARIANT_ID } }
        }}
      })
    });
    if (!result.ok) throw new Error(`Lemon checkout request failed: ${result.status}`);
    const resultBody = await result.json();
    const checkoutUrl = resultBody?.data?.attributes?.url;
    if (typeof checkoutUrl !== "string") throw new Error("Missing Lemon checkout URL");
    const checkoutHost = new URL(checkoutUrl);
    if (checkoutHost.protocol !== "https:" || !(checkoutHost.hostname === "lemonsqueezy.com" || checkoutHost.hostname.endsWith(".lemonsqueezy.com"))) throw new Error("Invalid Lemon checkout host");
    const { data: updatedReservation, error: statusError } = await admin.from("premium_trial_reservations")
      .update({ status: "checkout_created", updated_at: new Date().toISOString() })
      .eq("id", reservation.id).eq("status", "reserved").select("id").maybeSingle();
    if (statusError) throw statusError;
    // A webhook may have already moved the reservation to on_trial.
    if (!updatedReservation) console.info("Checkout already synchronized by provider webhook");
    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    // Do not overwrite a newer on_trial/active status if a signed webhook
    // arrived while checkout was being created.
    await admin.from("premium_trial_reservations").update({ status: "checkout_failed" })
      .eq("id", reservation.id).eq("status", "reserved");
    console.error("Premium trial checkout error", error);
    return NextResponse.json({ error: "Unable to start checkout" }, { status: 502 });
  }
}
