import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, FileSignature, LayoutGrid, Building2 } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const highlights = [
  { value: "+3.000", label: "estudantes na edição de 2025" },
  { value: "+35%", label: "dos participantes vêm de outras instituições" },
  { value: "3 dias", label: "de feira, em dois turnos por dia" },
  { value: "Arcadas", label: "no coração da Faculdade de Direito da USP" },
];

const steps = [
  {
    icon: Building2,
    title: "Cadastre sua empresa",
    text: "Crie o acesso da sua equipe. Cada pessoa entra com o próprio e-mail, sem senha.",
  },
  {
    icon: CalendarCheck,
    title: "Agende a reunião comercial",
    text: "Escolha um horário com a SanFran Jr. Quem se reúne primeiro escolhe o estande primeiro.",
  },
  {
    icon: LayoutGrid,
    title: "Reserve seu estande",
    text: "Na reunião, você escolhe o estande e os dias no mapa da feira, com confirmação na hora.",
  },
  {
    icon: FileSignature,
    title: "Acompanhe tudo pelo portal",
    text: "Avisos, prazos, documentos, contrato e assinatura eletrônica em um só lugar.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="bg-sde-pattern-dark bg-navy text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:py-20 md:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-[0.2em] text-gold-light uppercase">
              Portal do Expositor
            </p>
            <h1 className="mt-4 text-3xl leading-tight font-bold sm:text-5xl">
              A maior feira de estágio jurídico da América Latina
            </h1>
            <p className="mt-6 text-base text-white/85 sm:text-lg">
              Toda a participação da sua empresa na Semana do Estágio em um só lugar: reunião
              comercial, estande, avisos, documentos e contrato.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/entrar"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-gold-gradient h-11 px-6 text-base font-semibold text-navy hover:opacity-90",
                )}
              >
                Acessar a área da empresa
              </Link>
              <Link
                href="#como-funciona"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 border-white/40 bg-transparent px-6 text-base text-white hover:bg-white/10 hover:text-white",
                )}
              >
                Como funciona
              </Link>
            </div>
          </div>
          <Image
            src="/marca/sde-branco-dourado.png"
            alt="Logo da Semana do Estágio"
            width={560}
            height={670}
            className="mx-auto hidden h-72 w-auto md:block"
            priority
          />
        </div>
      </section>

      <section className="bg-sde-pattern bg-stone">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-12 lg:grid-cols-4">
          {highlights.map((item) => (
            <div key={item.label} className="rounded-2xl bg-gold-gradient p-5 text-navy shadow-sm">
              <p className="font-heading text-3xl font-bold">{item.value}</p>
              <p className="mt-1 text-sm font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="como-funciona" className="mx-auto max-w-6xl scroll-mt-4 px-4 py-16">
        <h2 className="text-3xl font-bold text-navy sm:text-4xl">Como funciona</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          O portal substitui as trocas de e-mail: cada etapa fica registrada, com prazos e
          lembretes automáticos.
        </p>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-navy text-gold-light">
                  <step.icon className="size-5" aria-hidden />
                </span>
                <span className="text-sm font-semibold text-muted-foreground">
                  Etapa {index + 1}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-navy">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
