import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient | null {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  _client = createClient(url, key);
  return _client;
}

export async function trackVisit() {
  if (typeof window === "undefined") return;
  const sb = getClient();
  if (!sb) return;
  const visited = "abcdego_visited";
  if (sessionStorage.getItem(visited)) return;
  sessionStorage.setItem(visited, "1");
  await sb.from("visitors").insert({});
}

export async function getVisitorCount(): Promise<number> {
  const sb = getClient();
  if (!sb) return 0;
  const { count } = await sb.from("visitors").select("*", { count: "exact", head: true });
  return count ?? 0;
}

export async function getLeaderboard(limit = 10) {
  const sb = getClient();
  if (!sb) return [];
  const { data } = await sb
    .from("leaderboard")
    .select("name, xp")
    .order("xp", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function submitScore(name: string, xp: number) {
  const sb = getClient();
  if (!sb) return false;
  const { error } = await sb.from("leaderboard").insert({ name, xp });
  return !error;
}
