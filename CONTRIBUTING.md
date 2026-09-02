# CONTRIBUTING

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Antes de qualquer commit

```bash
npm run check
```

Typecheck (`tsc --noEmit`), lint (ESLint), testes (Vitest) e build. Os quatro
passam ou o trabalho não está pronto.

## Commits

Conventional Commits: `feat:` `fix:` `refactor:` `perf:` `seo:` `design:`
`test:` `chore:` `docs:`

Exemplos:

```
feat(vsl): tracking de progresso em 25/50/75/100
design(hero): reequilibra a dobra para caber em 1440x900
fix(modal): foco vai para o primeiro campo inválido
```

## Onde mexer

| Mudança | Arquivo |
|---|---|
| Texto | `src/config/content.ts` |
| Preço, garantia, alegações | `src/config/offer.ts` |
| Depoimentos | `src/config/testimonials.ts` |
| Vídeo | `src/config/vsl.ts` ou variáveis de ambiente |
| Metadata | `src/config/seo.ts` |
| Tokens de design | `src/app/globals.css`, bloco `@theme` |

## Regras que não se negociam

Estão em [CLAUDE.md](./CLAUDE.md). Resumo:

1. Não inventar fato, número, depoimento ou alegação.
2. Copy em config, nunca em componente.
3. Server Component por padrão.
4. Anime só `transform` e `opacity`.
5. Segredo de servidor nunca vai para o cliente.

## Testes

Vitest cobre a lógica pura: máscara e validação de telefone, heurística de nome,
normalização de e-mail, schema do lead, formatação de preço, flags da oferta e a
consistência do JSON-LD.

Componentes visuais não têm teste unitário: são verificados no navegador em
360/390/430/768/1024/1280/1440/1920. E2E com Playwright entra junto com o backend,
quando existir um funil inteiro para percorrer.
