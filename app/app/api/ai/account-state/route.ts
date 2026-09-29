import { isAdminUser } from "@/lib/auth/access";
import { createClient } from "@/utils/supabase/server";

const todayKey = () => new Date().toISOString().slice(0, 10);

function cleanName(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, 32);
}

function currentUsage(metadata: Record<string, unknown> | null | undefined) {
  const raw = metadata?.sernem_ai_usage;
  if (!raw || typeof raw !== "object") return 0;
  const data = raw as { date?: unknown; count?: unknown };
  if (data.date !== todayKey()) return 0;
  const count = Number(data.count ?? 0);
  return Number.isFinite(count) && count > 0 ? Math.floor(count) : 0;
}

async function getContext() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { supabase, user: null, profile: null, limit: 0 };

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan,role,status")
    .eq("id", user.id)
    .maybeSingle();

  const premium =
    !!profile &&
    profile.status === "active" &&
    (isAdminUser(user) || profile.role === "admin" || profile.plan === "premium");

  return {
    supabase,
    user,
    profile,
    limit: premium ? 30 : 5,
  };
}

export async function GET() {
  const { user, profile, limit } = await getContext();

  if (!user) {
    return Response.json({ access: "guest", usage: 0, limit: 0, assistantName: "SERNEM AI" });
  }

  if (!profile || profile.status === "suspended") {
    return Response.json({ error: "Account access denied" }, { status: 403 });
  }

  const metadata = (user.user_metadata ?? {}) as Record<string, unknown>;
  const usage = currentUsage(metadata);
  const assistantName = cleanName(metadata.sernem_ai_name) || "SERNEM AI";

  return Response.json({
    access: limit === 30 ? "premium" : "free",
    usage,
    limit,
    remaining: Math.max(limit - usage, 0),
    assistantName,
  });
}

export async function POST(req: Request) {
  const { supabase, user, profile, limit } = await getContext();

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!profile || profile.status === "suspended") {
    return Response.json({ error: "Account access denied" }, { status: 403 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    action?: unknown;
    assistantName?: unknown;
  };

  const metadata = (user.user_metadata ?? {}) as Record<string, unknown>;
  let nextMetadata: Record<string, unknown> = { ...metadata };
  let usage = currentUsage(metadata);

  if (body.action === "consume") {
    if (usage >= limit) {
      return Response.json(
        { error: "Daily AI limit reached", usage, limit, remaining: 0 },
        { status: 429 },
      );
    }
    usage += 1;
    nextMetadata.sernem_ai_usage = { date: todayKey(), count: usage };
  } else if (body.action === "release") {
    usage = Math.max(usage - 1, 0);
    nextMetadata.sernem_ai_usage = { date: todayKey(), count: usage };
  }

  if (Object.prototype.hasOwnProperty.call(body, "assistantName")) {
    const assistantName = cleanName(body.assistantName) || "SERNEM AI";
    nextMetadata.sernem_ai_name = assistantName;
  }

  const { data, error } = await supabase.auth.updateUser({ data: nextMetadata });
  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const savedMetadata = (data.user?.user_metadata ?? nextMetadata) as Record<string, unknown>;
  const savedName = cleanName(savedMetadata.sernem_ai_name) || "SERNEM AI";

  return Response.json({
    usage,
    limit,
    remaining: Math.max(limit - usage, 0),
    assistantName: savedName,
  });
}
