import "server-only";
import { createClient } from "@supabase/supabase-js";

function expectEnv(value: string | undefined, label: string): string {
  if (!value) throw new Error(`${label} is required.`);
  return value;
}

// Read-only client for the Yuvabe People Supabase project (jobs, team, etc.)
export function getSupabasePeopleClient() {
  const supabaseUrl = expectEnv(
    process.env.YUVABE_PEOPLE_SUPABASE_URL,
    "YUVABE_PEOPLE_SUPABASE_URL",
  );
  const anonKey = expectEnv(
    process.env.YUVABE_PEOPLE_SUPABASE_KEY,
    "YUVABE_PEOPLE_SUPABASE_KEY",
  );

  return createClient(supabaseUrl, anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
