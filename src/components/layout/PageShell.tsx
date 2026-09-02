import Link from "next/link";

import { Logo } from "@/components/ui/Logo";

/**
 * Moldura das páginas secundárias: cabeçalho enxuto, conteúdo em uma coluna
 * legível. Sem trilho, sem CTA fixo — nada disputa a atenção aqui.
 */
export function PageShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main id="conteudo" className="surface-paper min-h-dvh">
      <header className="surface-deep">
        <div className="shell flex h-[68px] items-center">
          <Link href="/" className="flex min-h-[44px] items-center" aria-label="Voltar para a página inicial">
            <Logo tone="light" width={116} priority />
          </Link>
        </div>
      </header>

      <div className="shell stack-gap-tight">
        <p className="t-label flex items-center gap-3 text-brass-deep">
          <span aria-hidden="true" className="h-px w-7 bg-brass-deep" />
          {eyebrow}
        </p>
        <h1 className="t-h2 mt-6 max-w-[20ch] text-graphite">{title}</h1>
        <div className="mt-10 max-w-[68ch]">{children}</div>
      </div>
    </main>
  );
}
