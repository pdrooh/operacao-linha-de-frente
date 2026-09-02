import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Checkout não concluído",
  robots: { index: false, follow: false },
};

export default function CheckoutCanceladoPage() {
  return (
    <PageShell eyebrow="Checkout" title="Seu checkout não foi concluído.">
      <p className="t-body text-graphite-soft">
        Nenhuma cobrança foi feita. Se foi um engano ou o pagamento não passou, você pode
        retomar de onde parou.
      </p>

      <Link href="/#oferta" className="btn btn-primary mt-10">
        Voltar e tentar novamente
      </Link>
    </PageShell>
  );
}
