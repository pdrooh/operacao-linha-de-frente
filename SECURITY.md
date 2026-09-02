# SECURITY

## Estado nesta fase

Sem backend, sem banco, sem segredos. Nenhuma chave existe no projeto e nenhum
dado sai do browser. As garantias abaixo cobrem o que existe hoje e definem o
contrato para a próxima fase.

## Cabeçalhos

Configurados em `next.config.ts`, aplicados a todas as rotas:

| Cabeçalho | Valor |
|---|---|
| `Content-Security-Policy` | `default-src 'self'` como base |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `X-Frame-Options` | `DENY` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), interest-cohort=()` |

A CSP declara `frame-ancestors 'none'` (clickjacking), `object-src 'none'`,
`base-uri 'self'` e `form-action 'self'`.

`'unsafe-inline'` aparece em `style-src` porque o Next injeta estilos críticos
inline. `'unsafe-eval'` existe **apenas em desenvolvimento** (React Refresh).

### Ao adicionar GTM, GA4 ou Meta Pixel

Adicione os domínios explicitamente em `script-src` e `connect-src`. **Não**
afrouxe `script-src` para `'unsafe-inline'` sem nonce — hoje a página não carrega
nenhum script de terceiros, e essa é a linha de base a preservar.

`font-src` é `'self' data:` porque as fontes são auto-hospedadas pelo
`next/font`: nenhuma requisição sai para o Google.

## Dados pessoais

- Coletados: nome, WhatsApp, e-mail, mais parâmetros de campanha.
- **Nada é enviado** enquanto `NEXT_PUBLIC_CHECKOUT_MODE` for `pending`. O modal
  diz isso ao usuário, com essas palavras.
- UTMs ficam em `sessionStorage`, apagadas ao fechar a aba.
- Consentimento de processamento é obrigatório e explícito. Consentimento de
  marketing é separado e **nunca vem pré-marcado**.
- Nenhum dado pessoal vai para query string ou URL.
- Nenhum dado de pagamento passa por esta aplicação.

## Contrato para a próxima fase

Não negociável quando o backend entrar:

1. `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` e `STRIPE_PRICE_ID` são
   **exclusivamente de servidor**. Nunca com prefixo `NEXT_PUBLIC_`.
2. O valor cobrado vem do Price ID configurado no servidor. O browser envia
   "quero comprar", nunca um preço.
3. Toda entrada é revalidada no servidor com `CheckoutSchema` — o mesmo schema do
   frontend, revalidado porque o cliente nunca é confiável.
4. `?success=true` **não** confirma pagamento. A confirmação é o webhook.
5. Webhook valida assinatura e é idempotente por `stripe_event_id` único.
6. Rate limit em `POST /api/checkout`.
7. Erro para o usuário é sempre a mensagem genérica. Stack trace, SQL e detalhes
   de provedor ficam no log interno.
8. Log estruturado nunca registra senha, dado de cartão ou chave.

## Dependências

Produção: `next`, `react`, `react-dom`, `zod`. Toda dependência nova deve passar
pela pergunta: *isso não se resolve com plataforma, CSS ou vinte linhas próprias?*

## Reportar

Encontrou algo? Não abra issue pública. Fale com a equipe DocFounder.
