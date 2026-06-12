import { createClient, SupabaseClient, User } from "@supabase/supabase-js";

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

// Auth
export async function signUp(email: string, password: string) {
  const sb = getClient();
  if (!sb) return { user: null, error: "ไม่สามารถเชื่อมต่อได้" };
  const { data, error } = await sb.auth.signUp({ email, password });
  return { user: data.user, error: error?.message ?? null };
}

export async function signIn(email: string, password: string) {
  const sb = getClient();
  if (!sb) return { user: null, error: "ไม่สามารถเชื่อมต่อได้" };
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  return { user: data.user, error: error?.message ?? null };
}

export async function signOut() {
  const sb = getClient();
  if (!sb) return;
  await sb.auth.signOut();
}

export async function getUser(): Promise<User | null> {
  const sb = getClient();
  if (!sb) return null;
  const { data } = await sb.auth.getUser();
  return data.user;
}

export function onAuthChange(cb: (user: User | null) => void) {
  const sb = getClient();
  if (!sb) return () => {};
  const { data } = sb.auth.onAuthStateChange((_event, session) => cb(session?.user ?? null));
  return () => data.subscription.unsubscribe();
}
