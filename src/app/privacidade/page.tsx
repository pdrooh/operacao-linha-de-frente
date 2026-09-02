import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { LegalBody, LegalPending } from "@/components/layout/LegalBody";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a DocFounder trata os dados pessoais coletados na página da Operação Linha de Frente.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <PageShell eyebrow="LGPD" title="Política de Privacidade">
      <LegalBody>
        <LegalPending>
          Dados do controlador (razão social, CNPJ, endereço e contato do encarregado)
          precisam ser preenchidos pela DocFounder antes da publicação.
        </LegalPending>

        <h2>1. Quem trata seus dados</h2>
        <p>
          O tratamento dos dados coletados nesta página é realizado pela {site.producer},
          controladora das informações, para viabilizar a inscrição no programa{" "}
          {site.name}.
        </p>

        <h2>2. Quais dados coletamos</h2>
        <p>Coletamos apenas o necessário para processar a sua inscrição:</p>
        <ul>
          <li>
            <strong>Dados informados por você:</strong> nome, número de WhatsApp e e-mail,
            enviados no formulário de inscrição.
          </li>
          <li>
            <strong>Dados de origem da visita:</strong> parâmetros de campanha (utm_source,
            utm_medium, utm_campaign, utm_content, utm_term) e identificadores de clique de
            anúncio (gclid, fbclid, ttclid), quando presentes na URL de acesso.
          </li>
          <li>
            <strong>Dados de navegação:</strong> página de entrada e origem do acesso
            (referrer), guardados na sessão do seu navegador.
          </li>
        </ul>
        <p>
          Dados de pagamento (número de cartão, código de segurança) <strong>não</strong>{" "}
          passam por esta página e não são armazenados por nós: são tratados diretamente
          pelo provedor de pagamento.
        </p>

        <h2>3. Para que usamos</h2>
        <ul>
          <li>Processar a inscrição e liberar o acesso ao programa.</li>
          <li>Entrar em contato sobre a compra e sobre o acesso ao conteúdo.</li>
          <li>Medir a performance das campanhas que trouxeram você até aqui.</li>
          <li>
            Enviar comunicações promocionais — <strong>apenas</strong> se você marcar essa
            opção. O consentimento de marketing é separado, opcional e nunca vem marcado por
            padrão.
          </li>
        </ul>

        <h2>4. Base legal</h2>
        <p>
          O tratamento dos dados necessários à compra apoia-se na execução de contrato e em
          procedimentos preliminares a ele (art. 7º, V, da LGPD). O envio de comunicações
          promocionais apoia-se no seu consentimento (art. 7º, I), que pode ser retirado a
          qualquer momento.
        </p>

        <h2>5. Compartilhamento</h2>
        <p>
          Compartilhamos dados apenas com operadores necessários à entrega do serviço:
          provedor de pagamento, provedor de hospedagem e ferramentas de e-mail e
          mensageria. Não vendemos dados pessoais.
        </p>
        <LegalPending>
          Listar nominalmente os operadores contratados (processador de pagamento,
          hospedagem, CRM, ferramenta de e-mail) antes da publicação.
        </LegalPending>

        <h2>6. Retenção</h2>
        <p>
          Mantemos os dados enquanto durar a relação com você e pelos prazos legais
          aplicáveis a registros fiscais e de defesa em processos.
        </p>

        <h2>7. Seus direitos</h2>
        <p>
          Você pode solicitar confirmação de tratamento, acesso, correção, anonimização,
          portabilidade, informação sobre compartilhamentos e revogação do consentimento.
        </p>
        <LegalPending>Informar o canal oficial para exercício dos direitos do titular.</LegalPending>

        <h2>8. Cookies e armazenamento local</h2>
        <p>
          Esta página guarda os parâmetros de campanha no armazenamento de sessão do seu
          navegador (sessionStorage). Esse conteúdo é apagado quando você fecha a aba e não
          é usado para identificar você fora desta navegação.
        </p>

        <h2>9. Alterações</h2>
        <p>
          Podemos atualizar esta política. A versão vigente é sempre a publicada nesta
          página.
        </p>
      </LegalBody>
    </PageShell>
  );
}
