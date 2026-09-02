# ARCHITECTURE

## Escopo desta entrega

Frontend completo da landing page, incluindo o modal de captura de dados
funcional (máscara, validação, estados, acessibilidade). **Integrações e backend
ficaram fora desta fase por decisão do cliente** — Stripe, banco de dados,
webhooks e rate limiting não foram implementados.

O que foi feito para que a próxima fase não exija reescrita:

- O modal já valida com o **mesmo schema Zod** que o servidor vai usar.
- O envio passa por um **serviço de fronteira** (`lib/leads/lead-service.ts`).
  Trocar o transporte não toca no formulário.
- UTMs já são **capturadas e persistidas** na sessão.
- Analytics já passa por uma **camada desacoplada** com destinos plugáveis.
- Um flag de ambiente (`NEXT_PUBLIC_CHECKOUT_MODE`) alterna entre o estado atual
  e o fluxo real de checkout.

## Stack

| Camada | Escolha | Por quê |
|---|---|---|
| Framework | Next.js 16 (App Router, Turbopack) | Server Components por padrão, metadata API, `next/font`, `next/image`, `next/og` — tudo nativo, sem dependências extras |
| Linguagem | TypeScript `strict` | Sem `any` no código de produção |
| Estilo | Tailwind CSS v4 + tokens em `@theme` | Tokens em OKLCH numa única fonte; nenhum hex solto em componente |
| Validação | Zod | Um schema compartilhado entre browser e servidor |
| Testes | Vitest | 25 testes unitários sobre a lógica pura |
| Motion | CSS + IntersectionObserver | Nenhuma biblioteca de animação |

### Dependências de produção

`next`, `react`, `react-dom`, `zod`. Só isso.

## Decisões e trade-offs

### React Hook Form não foi instalado

O PRD lista RHF na stack. Para **três campos e dois checkboxes**, `useState` +
Zod entrega o mesmo resultado: validação no submit, erros por campo, foco no
primeiro campo inválido, bloqueio de duplo clique. RHF adicionaria ~13 kB
gzipped sem resolver nada que já não esteja resolvido.

**Zod ficou** porque tem um papel que nada substitui: o mesmo schema roda no
browser e no servidor, e a regra de "nunca confiar no cliente" fica garantida
por construção, não por disciplina.

Se o formulário crescer (múltiplas etapas, arrays, campos dinâmicos), RHF passa
a valer. Hoje não.

### Sem framer-motion

Toda a animação da página é: revelação por rolagem, o desenho da Linha, o hover
do CTA e a abertura do modal. Tudo isso é `transform` e `opacity` em CSS,
disparados por um único `IntersectionObserver` compartilhado. Zero JavaScript de
animação por frame, zero biblioteca.

### ORM: Drizzle (recomendação para a próxima fase)

Não implementado nesta entrega. Quando o backend entrar, a recomendação é
**Drizzle**: o modelo de dados é pequeno e estável (4 tabelas), as consultas são
diretas, e o controle explícito de SQL importa mais que produtividade de
scaffolding num projeto deste tamanho. Drizzle também não carrega um engine
binário, o que simplifica o deploy serverless.

### `<dialog>` nativo no modal

Focus trap, tecla ESC e camada superior vêm do navegador. O que sobrou para o
código: trava de rolagem com compensação de barra, clique no backdrop e a
animação de entrada. Uma biblioteca de modal aqui seria peso sem ganho.

O formulário é remontado a cada abertura via `key={openId}`, em vez de zerar
estado dentro de um efeito.

## Server vs Client Components

A página é Server Component. Vira client só o que precisa de interação:

| Client Component | Motivo |
|---|---|
| `FrontLineRail` | Escuta rolagem |
| `SiteHeader` | Muda de estado ao rolar |
| `StickyCta` | Aparece após o hero |
| `Reveal` | IntersectionObserver |
| `VslPlayer` | Controle de reprodução e tracking |
| `FaqItem` | Evento de abertura |
| `CtaButton` | Abre o modal |
| `LeadModalProvider` / `LeadCaptureModal` / `LeadForm` | Estado do formulário |
| `AnalyticsBoot` | Captura de UTM na montagem |

`LeadModalProvider` envolve a página inteira mas **não a transforma em client**:
`children` chega como árvore já renderizada no servidor.

## Estrutura

```
src/
├── app/                    rotas, metadata, robots, sitemap, manifest, OG
│   ├── obrigado/           noindex
│   ├── checkout-cancelado/ noindex
│   ├── privacidade/        indexável
│   └── termos/             indexável
├── components/
│   ├── layout/             Section, Reveal, rail, header, footer, PageShell
│   ├── sections/           uma seção da landing por arquivo
│   ├── modal/              contexto, casca do dialog, formulário
│   ├── vsl/                player
│   └── ui/                 CtaButton, StickyCta, Logo
├── config/                 toda a copy e os parâmetros de oferta
└── lib/
    ├── analytics/          camada desacoplada + catálogo de eventos
    ├── leads/              fronteira com o backend
    ├── seo/                JSON-LD
    ├── utm/                captura e persistência de atribuição
    ├── utils/              telefone, nome, e-mail, cn
    └── validation/         schemas Zod compartilhados
```

## Camada de analytics

`analytics.track(evento, propriedades)` é a única API que os componentes veem.
Destinos são registrados em runtime com `registerDestination`. Eventos disparados
antes de existir destino ficam numa fila limitada (50) e são entregues no
registro — nenhuma conversão se perde no carregamento.

Contexto global (UTMs) é anexado a todo evento via `setAnalyticsContext`.

Eventos implementados: `page_view`, `vsl_impression`, `vsl_play`, `vsl_25`,
`vsl_50`, `vsl_75`, `vsl_complete`, `cta_click`, `lead_modal_open`,
`lead_modal_close`, `lead_form_start`, `lead_form_submit`, `lead_form_invalid`,
`lead_captured`, `checkout_redirect`, `faq_open`.

Reservados para a próxima fase: `checkout_session_created`, `checkout_cancel`,
`purchase`, `testimonial_play`.

## Atribuição de campanha

`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`,
`fbclid`, `ttclid`, mais `referrer` e `landing_path`.

Guardadas em `sessionStorage` sob `olf.attribution.v1`. **A primeira campanha da
sessão vence:** se a pessoa chega por anúncio, navega, volta pelo orgânico e só
então converte, o crédito continua sendo do anúncio. Todo acesso é envolvido em
`try/catch` — modo privado e políticas de site não podem quebrar a página.

## O que falta para a próxima fase

1. `POST /api/checkout` — valida com `CheckoutSchema`, aplica rate limit, grava
   o lead **antes** do redirect, cria a Checkout Session e devolve a URL.
2. `POST /api/webhooks/stripe` — valida assinatura, idempotente por
   `stripe_event_id`.
3. Tabelas: `leads`, `checkout_sessions`, `purchases`, `stripe_webhook_events`.
4. `NEXT_PUBLIC_CHECKOUT_MODE=live`.
5. Testes E2E (Playwright) do funil completo, incluindo duplo clique e o modo de
   teste do Stripe.

Nenhum desses passos exige mexer nos componentes visuais.
