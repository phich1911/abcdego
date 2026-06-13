import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://eaxskmgekbdrmmczptmq.supabase.co";
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export async function POST(req: NextRequest) {
  // Debug: check env vars are loaded
  if (!SERVICE_KEY) {
    return NextResponse.json({ error: "SERVICE_KEY missing", env_keys: Object.keys(process.env).filter(k => k.includes("SUPA")) }, { status: 500 });
  }

  const { name, xp, oldName } = await req.json();
  if (!name || xp == null) return NextResponse.json({ error: "missing fields" }, { status: 400 });

  const auth = req.headers.get("authorization");
  if (!auth) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const userClient = createClient(SUPABASE_URL, ANON_KEY, {
    global: { headers: { Authorization: auth } },
  });
  const { data: { user }, error: authErr } = await userClient.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized", detail: authErr?.message }, { status: 401 });

  const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const previousNames: string[] = user.user_metadata?.previous_names ?? [];
  const allNames = Array.from(new Set([name, oldName, ...previousNames].filter(Boolean)));

  for (const n of allNames) {
    await admin.from("leaderboard").delete().eq("name", n);
  }

  if (oldName && oldName !== name) {
    const updatedHistory = Array.from(new Set([oldName, ...previousNames]));
    await admin.auth.admin.updateUserById(user.id, {
      user_metadata: { ...user.user_metadata, previous_names: updatedHistory },
    });
  }

  const { error: insErr } = await admin.from("leaderboard").insert({ name, xp });
  if (insErr) return NextResponse.json({ error: insErr.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
