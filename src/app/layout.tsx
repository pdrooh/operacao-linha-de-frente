import type { Metadata, Viewport } from "next";
import { Archivo, Bodoni_Moda } from "next/font/google";

import { AnalyticsBoot } from "@/components/layout/AnalyticsBoot";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LeadModalProvider } from "@/components/modal/LeadModalProvider";
import { seo } from "@/config/seo";
import { site } from "@/config/site";

import "./globals.css";

/**
 * Bodoni Moda: serifada de alto contraste — só títulos, em corpo grande, onde a
 * modulação fina do traço aparece. Variável, com eixo de tamanho óptico.
 * Archivo: grotesca de sinalização — corpo de texto, rótulos, números e interface.
 *
 * Duas famílias com papéis que não se sobrepõem. Só os pesos realmente usados
 * são carregados, e o next/font os auto-hospeda: nenhuma requisição sai para o
 * Google.
 */
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-bodoni",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: seo.title,
    template: `%s | ${seo.shortTitle}`,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  applicationName: site.name,
  authors: [{ name: site.producer, url: "https://www.docfounder.com.br" }],
  creator: site.producer,
  publisher: site.producer,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.producer,
    title: seo.title,
    description: seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0d1f19",
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${bodoni.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-brass focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Ir para o conteúdo
        </a>

        <AnalyticsBoot />

        <LeadModalProvider>
          {children}
          <SiteFooter />
        </LeadModalProvider>
      </body>
    </html>
  );
}
