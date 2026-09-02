import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Pagamento recebido",
  robots: { index: false, follow: false },
};

export default function ObrigadoPage() {
  return (
    <PageShell eyebrow="Inscrição" title="Pagamento recebido.">
      <p className="t-body text-graphite-soft">
        Sua inscrição está sendo processada. A confirmação definitiva acontece assim que o
        pagamento é aprovado pelo provedor — você receberá as instruções de acesso no
        e-mail informado.
      </p>

      <p className="t-body mt-5 text-graphite-soft">
        Se algo não chegar, responda o e-mail de confirmação: a equipe DocFounder acompanha
        cada inscrição.
      </p>

      <Link href="/" className="btn btn-ghost mt-10 text-graphite">
        Voltar para a página do programa
      </Link>
    </PageShell>
  );
}
