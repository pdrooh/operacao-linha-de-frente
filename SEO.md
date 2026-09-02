# SEO

Conformidade técnica e semântica. Isto não é promessa de posição — é a base para
que a página seja indexada, compreendida e compartilhada corretamente.

## Metadata

Definida em `src/app/layout.tsx`, alimentada por `src/config/seo.ts`:

`title` (com template `%s | Operação Linha de Frente`) · `description` ·
`keywords` · `canonical` · `robots` (com `max-image-preview: large`) ·
Open Graph completo · Twitter `summary_large_image` · `metadataBase` ·
`themeColor` · `formatDetection: { telephone: false }`.

`lang="pt-BR"` na raiz.

## Arquivos gerados

| Rota | Origem |
|---|---|
| `/robots.txt` | `app/robots.ts` — libera `/`, bloqueia `/obrigado`, `/checkout-cancelado`, `/api/` |
| `/sitemap.xml` | `app/sitemap.ts` — home, privacidade, termos |
| `/manifest.webmanifest` | `app/manifest.ts` |
| `/opengraph-image` | `app/opengraph-image.tsx` — 1200×630 gerado com `next/og` |
| `/icon.svg`, `/apple-icon` | ícones do programa |

A imagem OG é desenhada com os tokens da página (verde profundo, régua de latão,
Archivo). **Não é screenshot automático.**

## Semântica

- Um único `<h1>` — a headline do hero.
- Um `<h2>` por seção, `<h3>` nos itens. Nenhum nível pulado.
- `<main id="conteudo">`, `<header>`, `<footer>`, `<nav aria-label>`.
- Listas reais: `<ol>` onde a ordem importa (jornada, transformação, bônus),
  `<dl>` no que é definição (programa), `<figure>/<figcaption>` na ilustração da
  conversa.
- `<details>/<summary>` no FAQ — encontrável pela busca da página.
- Todas as imagens com `alt` descritivo ("Dra. Eline Lobo, Cardiologista").

## Dados estruturados

`src/lib/seo/structured-data.ts` emite um `@graph` com exatamente três nós:

- **Organization** — DocFounder, logo, URL.
- **Course** — nome, descrição, idioma, provedor, `Offer` com `price` e
  `priceCurrency`, e um `CourseInstance` online.
- **FAQPage** — as perguntas efetivamente publicadas.

**Nenhum schema de review, rating, resultado ou contagem de alunos.** Não há dado
auditável que os sustente, e schema inventado é risco de penalização.

O JSON-LD respeita os mesmos flags da página: se `offer.claims.mecCertificate`
virar `false`, a pergunta sobre certificado some do FAQPage junto com o resto.
Há teste unitário garantindo isso.

## Páginas transacionais

`/obrigado` e `/checkout-cancelado` exportam `robots: { index: false, follow: false }`
e estão no `disallow` do robots.txt. Não entram no sitemap.

`/privacidade` e `/termos` são indexáveis, com canonical próprio.

## Core Web Vitals

| Métrica | Como foi tratada |
|---|---|
| **LCP** | Fontes auto-hospedadas com `display: swap`; hero sem imagem pesada; logo com `priority`; zero script de terceiros |
| **CLS** | Quadro da VSL com `aspect-ratio` reservado desde o primeiro paint; imagens com `fill` sobre proporção declarada; só `transform`/`opacity` animados |
| **INP** | Ouvintes de rolagem limitados por `requestAnimationFrame` escrevendo direto no DOM, sem re-render do React; um único IntersectionObserver compartilhado |

Tudo é pré-renderizado estaticamente (13 rotas, todas `○ Static`).

## Ao publicar

1. `NEXT_PUBLIC_SITE_URL` com o domínio final — canonical, OG e sitemap dependem
   dele.
2. Verificar a imagem OG no validador do Facebook e no do X.
3. Enviar o sitemap ao Search Console.
4. Confirmar que `/obrigado` e `/checkout-cancelado` retornam `noindex` em
   produção.
