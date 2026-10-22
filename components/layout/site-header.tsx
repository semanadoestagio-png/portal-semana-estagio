import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="bg-navy text-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-20">
        <Link href="/" className="flex items-center gap-3" aria-label="Página inicial">
          <Image
            src="/marca/sde-branco-dourado.png"
            alt=""
            width={560}
            height={670}
            className="h-11 w-auto sm:h-14"
            priority
          />
          <span className="font-heading text-sm leading-tight font-bold tracking-wide whitespace-nowrap uppercase sm:text-base">
            Semana do Estágio
            <span className="block text-[0.65rem] font-normal tracking-[0.15em] text-gold-light sm:text-xs sm:tracking-[0.2em]">
              Portal do Expositor
            </span>
          </span>
        </Link>
        <Link
          href="/entrar"
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-gold-gradient px-3 font-semibold text-navy hover:opacity-90 sm:px-4",
          )}
        >
          <span className="sm:hidden">Entrar</span>
          <span className="hidden sm:inline">Área da empresa</span>
        </Link>
      </div>
      <div className="bg-gold-gradient h-1" />
    </header>
  );
}
