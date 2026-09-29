import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const githubToken = process.env.SERNEM_AGENTS_GITHUB_TOKEN;

  if (!cronSecret || request.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  if (!githubToken) {
    return NextResponse.json(
      { ok: false, error: "SERNEM_AGENTS_GITHUB_TOKEN missing" },
      { status: 503 },
    );
  }

  const response = await fetch(
    "https://api.github.com/repos/safebaseapp/sernem-agents/actions/workflows/pilot.yml/dispatches",
    {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${githubToken}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ref: "main" }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const detail = await response.text();
    return NextResponse.json(
      { ok: false, error: "github_dispatch_failed", status: response.status, detail },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    dispatched: true,
    workflow: "SERNEM Agent Pilot",
    ref: "main",
    dispatchedAt: new Date().toISOString(),
  });
}
