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
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${notoSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
