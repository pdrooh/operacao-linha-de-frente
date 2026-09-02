import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { LegalBody, LegalPending } from "@/components/layout/LegalBody";
import { offer, formatPrice } from "@/config/offer";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Termos de Uso e de Compra",
  description: `Condições de contratação do programa ${site.name}, da ${site.producer}.`,
  alternates: { canonical: "/termos" },
};

export default function TermosPage() {
  return (
    <PageShell eyebrow="Condições" title="Termos de Uso e de Compra">
      <LegalBody>
        <LegalPending>
          Razão social, CNPJ, endereço, canal de atendimento e prazo de acesso ao conteúdo
          precisam ser preenchidos pela DocFounder antes da publicação.
        </LegalPending>

        <h2>1. Objeto</h2>
        <p>
          Estes termos regem a contratação do programa {site.name}, produto digital de
          treinamento fornecido pela {site.producer}, composto por 31 aulas gravadas
          distribuídas em 7 módulos, materiais de apoio e certificado.
        </p>

        <h2>2. Preço e pagamento</h2>
        <p>
          O valor de lançamento é de {formatPrice(offer.currentPrice)}, ante o valor de{" "}
          {formatPrice(offer.originalPrice)}, por tempo limitado. O pagamento é processado
          por provedor externo; o valor efetivamente cobrado é sempre o exibido na tela de
          checkout do provedor.
        </p>

        <h2>3. Acesso</h2>
        <p>
          O acesso ao conteúdo é liberado após a confirmação do pagamento pelo provedor, no
          e-mail informado no momento da inscrição.
        </p>
        <LegalPending>Definir o prazo de acesso ao conteúdo (vitalício ou por período).</LegalPending>

        <h2>4. Direito de arrependimento</h2>
        <p>
          Nas compras realizadas fora do estabelecimento comercial, o artigo 49 do Código de
          Defesa do Consumidor assegura o direito de desistir da contratação em até 7 (sete)
          dias corridos contados da compra ou do recebimento do acesso, com devolução dos
          valores pagos.
        </p>
        <LegalPending>
          Política de garantia de satisfação (prazo e condições) ainda não confirmada pelo
          cliente. Enquanto não houver definição, nenhuma garantia comercial é anunciada na
          página — apenas o direito legal acima.
        </LegalPending>

        <h2>5. Uso do conteúdo</h2>
        <p>
          O acesso é individual e intransferível. É vedada a reprodução, distribuição,
          cessão ou exibição pública do material sem autorização escrita da {site.producer}.
        </p>

        <h2>6. Certificado</h2>
        <p>
          O certificado é emitido ao final do treinamento, conforme condições informadas na
          página do programa.
        </p>
        <LegalPending>
          A alegação de validação/reconhecimento MEC precisa de comprovação documental antes
          da publicação. Ver ASSET_MANIFEST.md.
        </LegalPending>

        <h2>7. Suporte</h2>
        <p>
          O suporte ao conteúdo é prestado por Thiago Moura e pela equipe {site.producer}
          durante o treinamento.
        </p>

        <h2>8. Foro</h2>
        <LegalPending>Definir o foro de eleição.</LegalPending>
      </LegalBody>
    </PageShell>
  );
}
