import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import type { Database } from "@/lib/database.types";

import { getSupabaseEnv } from "./env";

/**
 * Cliente do Supabase para o servidor (Server Components, Server Actions e Route Handlers).
 * Usa a sessão do usuário guardada em cookies, então o RLS do banco vale normalmente.
 */
export async function createClient() {
  const env = getSupabaseEnv();
  if (!env) {
    throw new Error("Supabase não configurado: preencha o .env.local (ver .env.example).");
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(env.url, env.publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Server Components não podem gravar cookies; a sessão é renovada pelo proxy (Fase 1).
        }
      },
    },
  });
}
