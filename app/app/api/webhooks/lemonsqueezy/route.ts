import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

function verifySignature(rawBody: string, signature: string | null) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

  if (!secret || !signature) return false;

  const digest = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(digest, "utf8"),
      Buffer.from(signature, "utf8")
    );
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-signature");

    if (!verifySignature(rawBody, signature)) {
      console.error("Lemon Squeezy webhook: invalid signature");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload?.meta?.event_name;
    const attributes = payload?.data?.attributes ?? {};

    const email =
      attributes?.user_email ||
      attributes?.customer_email ||
      attributes?.email;

    if (!email) {
      console.error("Lemon Squeezy webhook: customer email missing", eventName);
      return NextResponse.json(
        { error: "Customer email missing" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Supabase server environment variables missing");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Lemon checkout emailini SERNEM Auth kullanıcısı ile eşleştir.
    let matchedUserId: string | null = null;
    let page = 1;

    while (!matchedUserId && page <= 10) {
      const { data, error } = await supabase.auth.admin.listUsers({
        page,
        perPage: 1000,
      });

      if (error) {
        console.error("Could not list Supabase users:", error);
        return NextResponse.json(
          { error: "Unable to resolve customer" },
          { status: 500 }
        );
      }

      const match = data.users.find(
        (user) =>
          user.email?.trim().toLowerCase() === email.trim().toLowerCase()
      );

      if (match) {
        matchedUserId = match.id;
        break;
      }

      if (data.users.length < 1000) break;
      page += 1;
    }

    if (!matchedUserId) {
    const normalizedEmail = email.trim().toLowerCase();

    const inactiveEvents = new Set([
      "subscription_expired",
      "subscription_payment_refunded",
    ]);

    const pendingStatus = inactiveEvents.has(eventName) ? "inactive" : "active";

    const { data: existingPending, error: pendingLookupError } = await supabase
      .from("pending_premium_entitlements")
      .select("id")
      .ilike("email", normalizedEmail)
      .maybeSingle();

    if (pendingLookupError) {
      console.error("Could not check pending Premium entitlement:", pendingLookupError);
      return NextResponse.json(
        { error: "Could not check pending Premium entitlement" },
        { status: 500 }
      );
    }

    if (existingPending?.id) {
      const { error: pendingUpdateError } = await supabase
        .from("pending_premium_entitlements")
        .update({
          status: pendingStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingPending.id);

      if (pendingUpdateError) {
        console.error("Could not update pending Premium entitlement:", pendingUpdateError);
        return NextResponse.json(
          { error: "Could not update pending Premium entitlement" },
          { status: 500 }
        );
      }
    } else {
      const { error: pendingInsertError } = await supabase
        .from("pending_premium_entitlements")
        .insert({
          email: normalizedEmail,
          status: pendingStatus,
        });

      if (pendingInsertError) {
        console.error("Could not create pending Premium entitlement:", pendingInsertError);
        return NextResponse.json(
          { error: "Could not create pending Premium entitlement" },
          { status: 500 }
        );
      }
    }

    console.log(
      `SERNEM pending Premium: ${normalizedEmail} -> ${pendingStatus} (${eventName})`
    );

    return NextResponse.json({
      ok: true,
      pending: true,
      email: normalizedEmail,
      status: pendingStatus,
    });
  }

    /*
      Premium erişim politikası:
      - created / resumed / unpaused / active update => premium
      - expired => free
      - cancelled eventinde hemen free yapmıyoruz.
        Kullanıcı ücretini ödediği dönem bitene kadar erişimini korusun.
    */

    let nextPlan: "premium" | "free" | null = null;

    if (
      eventName === "subscription_created" ||
      eventName === "subscription_resumed" ||
      eventName === "subscription_unpaused" ||
      eventName === "subscription_payment_success"
    ) {
      nextPlan = "premium";
    }

    if (eventName === "subscription_updated") {
      const status = String(attributes?.status ?? "").toLowerCase();

      if (
        status === "active" ||
        status === "on_trial" ||
        status === "cancelled"
      ) {
        nextPlan = "premium";
      }

      if (
        status === "expired" ||
        status === "unpaid"
      ) {
        nextPlan = "free";
      }
    }

    if (eventName === "subscription_expired") {
      nextPlan = "free";
    }

    if (nextPlan) {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ plan: nextPlan })
        .eq("id", matchedUserId);

      if (updateError) {
        console.error("Could not update SERNEM plan:", updateError);
        return NextResponse.json(
          { error: "Unable to update subscription" },
          { status: 500 }
        );
      }

      console.log(
        `SERNEM Premium sync: ${email} -> ${nextPlan} (${eventName})`
      );
    } else {
      console.log(`Lemon event ignored safely: ${eventName}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Lemon Squeezy webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
