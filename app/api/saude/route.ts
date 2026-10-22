import { createClient } from "@/lib/supabase/server";
import { getSupabaseEnv } from "@/lib/supabase/env";

// Verificação rápida de que o site está no ar e conversa com o banco.
// Abra /api/saude no navegador: "banco": "conectado" significa que está tudo certo.
export async function GET() {
  if (!getSupabaseEnv()) {
    return Response.json({ site: "ok", banco: "não configurado" }, { status: 503 });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("editions").select("id", { head: true, count: "exact" });

  if (error) {
    console.error("Falha ao consultar o banco", error);
    return Response.json({ site: "ok", banco: "erro de conexão" }, { status: 503 });
  }

  return Response.json({ site: "ok", banco: "conectado" });
}
