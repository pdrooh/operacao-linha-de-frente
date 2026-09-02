# Operação Linha de Frente

Landing page do programa **Operação Linha de Frente**, da DocFounder.

> **Fase atual: frontend.** A página está completa e navegável, incluindo o modal
> de captura funcional. Stripe, banco de dados e webhooks ficaram para a próxima
> fase, por definição do cliente. Ver [ARCHITECTURE.md](./ARCHITECTURE.md).

## Rodar localmente

```bash
npm install
cp .env.example .env.local
npm run dev
```

Em `http://localhost:3000`.

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm start` | Serve o build |
| `npm run typecheck` | TypeScript em modo strict |
| `npm run lint` | ESLint |
| `npm test` | Testes unitários (Vitest) |
| `npm run check` | Typecheck + lint + testes + build |

## Documentação

| Arquivo | Conteúdo |
|---|---|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Stack, decisões, trade-offs, o que falta |
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | Conceito, cor, tipografia, motion, componentes |
| [ASSET_MANIFEST.md](./ASSET_MANIFEST.md) | Assets em uso, pendências, validações que bloqueiam publicação |
| [COPY_NOTES.md](./COPY_NOTES.md) | Todo texto criado além da copy oficial, e sugestões não aplicadas |
| [SECURITY.md](./SECURITY.md) | Cabeçalhos, dados pessoais, contrato para o backend |
| [SEO.md](./SEO.md) | Metadata, dados estruturados, Core Web Vitals |

## Como mudar as coisas

### Copy

`src/config/content.ts`. Nenhum texto vive dentro de componente.

### Preço

`src/config/offer.ts`.

```ts
currentPrice: 497,
originalPrice: 997,
```

Isso é **apresentação**. Quando o Stripe entrar, o valor cobrado vem do Price ID
no servidor — o browser nunca informa preço.

### Vídeo da VSL

```bash
NEXT_PUBLIC_VSL_SRC=https://sua-cdn/vsl.m3u8
NEXT_PUBLIC_VSL_POSTER=https://sua-cdn/poster.jpg
```

Sem essas variáveis, o quadro mostra "Vídeo em breve" com o espaço já reservado —
nenhum layout shift quando o vídeo chegar.

### Garantia

Ainda não confirmada pelo cliente, então **nada é publicado**. Quando confirmar:

```ts
guarantee: { enabled: true, days: 7, copy: "..." }
```

### Certificado MEC

A copy oficial afirma validação MEC. A alegação depende de comprovação
documental. Para tirar do ar sem tocar em componente:

```ts
claims: { mecCertificate: false }
```

Some da seção "O que vem incluso", do FAQ e do JSON-LD de uma vez.

### Prazo da oferta

Sem data confirmada, a página diz "por tempo limitado" e **não exibe contador**.
Havendo data real, preencha `offer.endsAt`.

### WhatsApp

```bash
NEXT_PUBLIC_WHATSAPP_URL=https://wa.me/55...
```

Sem essa variável, o CTA de compra para equipe no FAQ não é renderizado.

### Depoimentos

`src/config/testimonials.ts`. Preencha `videoSrc` quando os arquivos chegarem.

### Analytics

Registre um destino uma vez, em qualquer client component do topo da árvore:

```ts
import { registerDestination } from "@/lib/analytics";

registerDestination({
  name: "ga4",
  track: (event, properties) => window.gtag?.("event", event, properties),
});
```

Nenhum componente precisa mudar. Eventos disparados antes do registro ficam em
fila e são entregues depois.

## Deploy

Vercel. Configure `NEXT_PUBLIC_SITE_URL` com o domínio final antes do primeiro
build — canonical, Open Graph e sitemap dependem dele.

Os cabeçalhos de segurança vêm de `next.config.ts` e não precisam de configuração
na plataforma.
