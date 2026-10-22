// Variáveis públicas do Supabase (ficam no .env.local; ver .env.example).
// A chave secreta (service role) nunca é lida aqui: este arquivo pode ir para o navegador.

export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    return null;
  }

  return { url, publishableKey };
}
