import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Área da empresa",
};

// Provisório: o login por código chega na Fase 1 (SPEC §4.1).
export default function EntrarPage() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-start gap-4 px-4 py-20">
      <h1 className="text-3xl font-bold text-navy">Área da empresa</h1>
      <p className="text-muted-foreground">
        O acesso das empresas ao portal será aberto em breve. Enquanto isso, fale com o seu
        contato na SanFran Jr.
      </p>
      <Link href="/" className={buttonVariants({ variant: "outline" })}>
        Voltar para a página inicial
      </Link>
    </section>
  );
}
