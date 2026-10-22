import type { Metadata } from "next";
import { Montserrat, Noto_Serif } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Portal do Expositor · Semana do Estágio",
    template: "%s · Semana do Estágio",
  },
  description:
    "Portal das empresas expositoras da Semana do Estágio, a maior feira de estágio jurídico da América Latina, organizada pela SanFran Jr.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // suppressHydrationWarning: extensões de navegador (tradutor, modo escuro, corretor)
  // costumam acrescentar atributos em <html> e <body>. Vale só para os atributos
  // destes dois elementos, não para o conteúdo da página.
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${notoSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
