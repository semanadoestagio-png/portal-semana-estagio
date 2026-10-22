import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-white/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/marca/sanfranjr-horizontal-branco.svg"
            alt="SanFran Jr."
            width={460}
            height={192}
            className="h-10 w-auto"
          />
          <p className="max-w-xs text-sm">
            Empresa Júnior da Faculdade de Direito da USP. Organizadora da Semana do Estágio.
          </p>
        </div>
        <p className="text-xs text-white/60">
          © SanFran Jr. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
