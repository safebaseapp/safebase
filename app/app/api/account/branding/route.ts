import { NextResponse } from "next/server";
import { getCurrentAccessProfile } from "@/lib/auth/server-access";
import { isAdminUser } from "@/lib/auth/access";
import { hasCurrentBillingPremium } from "@/lib/auth/billing-premium";
import { hasActiveReward } from "@/lib/auth/reward-access";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "private, no-store" };
export async function GET() {
  const { user, profile } = await getCurrentAccessProfile();
  if (!user) return NextResponse.json({ error: "Login required" }, { status: 401, headers });
  if (!profile || profile.status !== "active") return NextResponse.json({ error: "Active account required" }, { status: 403, headers });
  const db = await createClient();
  const premium = isAdminUser(user) || profile.role === "admin" ||
    await hasCurrentBillingPremium(null, user.id, profile.plan) || await hasActiveReward(db, user.id);
  if (!premium) return NextResponse.json({ error: "Premium required" }, { status: 403, headers });
  // Every object path comes from the verified account, never a query/body ID.
  const bucket = db.storage.from("company-assets");
  const { data: files, error } = await bucket.list(user.id, { limit: 20, search: "logo." });
  if (error) return NextResponse.json({ error: "Branding unavailable" }, { status: 503, headers });
  const logo = files?.find(file => /^logo\.(png|jpe?g|webp)$/i.test(file.name));
  let logoUrl: string | null = null;
  if (logo) {
    const { data, error: signError } = await bucket.createSignedUrl(`${user.id}/${logo.name}`, 60);
    if (signError) return NextResponse.json({ error: "Branding unavailable" }, { status: 503, headers });
    logoUrl = data?.signedUrl ?? null;
  }
  let documentProfile: Record<string, string> | null = null;
  const { data: blob } = await bucket.download(`${user.id}/document-profile.json`);
  if (blob) {
    try {
      const value = JSON.parse(await blob.text());
      documentProfile = Object.fromEntries(["projectName", "siteName", "workArea", "presentedBy", "revision"].map(key => [key, typeof value?.[key] === "string" ? value[key] : ""]));
    } catch { /* Optional profile; never log private branding data. */ }
  }
  return NextResponse.json({ logoUrl, documentProfile }, { headers });
}
