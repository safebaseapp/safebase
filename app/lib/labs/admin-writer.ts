import "server-only";
import { createClient } from "@supabase/supabase-js";

/** Server-side only. Never expose this client or its credentials to a browser. */
export function createLabsWriter() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("LABS_WRITER_NOT_CONFIGURED");
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { headers: { "X-Client-Info": "sernem-labs-server" } },
  });
}
