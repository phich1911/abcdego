import { createClient, SupabaseClient, User } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://eaxskmgekbdrmmczptmq.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_bVnYGDvGfIiB1s26IUYo9A_vefPQl8R";

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (_client) return _client;
  _client = createClient(SUPABASE_URL, SUPABASE_KEY);
  return _client;
}

export async function trackVisit() {
  if (typeof window === "undefined") return;
  const visited = "abcdego_visited";
  if (sessionStorage.getItem(visited)) return;
  sessionStorage.setItem(visited, "1");
  await getClient().from("visitors").insert({});
}

export async function getVisitorCount(): Promise<number> {
  const { count } = await getClient().from("visitors").select("*", { count: "exact", head: true });
  return count ?? 0;
}

export async function getLeaderboard(limit = 10) {
  const { data } = await getClient()
    .from("leaderboard")
    .select("name, xp")
    .order("xp", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function submitScore(name: string, xp: number) {
  const { error } = await getClient().from("leaderboard").insert({ name, xp });
  return !error;
}

// Auth
export async function signUp(email: string, password: string) {
  const { data, error } = await getClient().auth.signUp({ email, password });
  return { user: data.user, error: error?.message ?? null };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await getClient().auth.signInWithPassword({ email, password });
  return { user: data.user, error: error?.message ?? null };
}

export async function signOut() {
  await getClient().auth.signOut();
}

export async function getUser(): Promise<User | null> {
  const { data } = await getClient().auth.getUser();
  return data.user;
}

export function onAuthChange(cb: (user: User | null) => void) {
  const { data } = getClient().auth.onAuthStateChange((_event, session) => cb(session?.user ?? null));
  return () => data.subscription.unsubscribe();
}

export async function signInWithGoogle(): Promise<string | null> {
  const { error } = await getClient().auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${window.location.origin}/` },
  });
  return error?.message ?? null;
}

export async function signInWithFacebook(): Promise<string | null> {
  const { error } = await getClient().auth.signInWithOAuth({
    provider: "facebook",
    options: { redirectTo: `${window.location.origin}/` },
  });
  return error?.message ?? null;
}
