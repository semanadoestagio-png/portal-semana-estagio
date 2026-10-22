import { createBrowserClient } from "@supabase/ssr";

import { getSupabaseEnv } from "./env";

/** Cliente do Supabase para componentes que rodam no navegador. */
export function createClient() {
  const env = getSupabaseEnv();
  if (!env) {
    throw new Error("Supabase não configurado: preencha o .env.local (ver .env.example).");
  }
  return createBrowserClient(env.url, env.publishableKey);
}
