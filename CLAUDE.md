@AGENTS.md

# Operação Linha de Frente — regras do projeto

Landing page de conversão da DocFounder. Leia [ARCHITECTURE.md](./ARCHITECTURE.md),
[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) e [ASSET_MANIFEST.md](./ASSET_MANIFEST.md)
antes de mexer em qualquer coisa.

## Regra número um: não inventar

Esta página vende um produto de saúde para médicos. Toda afirmação factual precisa
de origem no material do cliente.

Nunca crie: depoimento, número, resultado, credencial, módulo, garantia, prazo,
certificado, link ou contato. Se a informação não existe, crie uma configuração
com estado de espera visível — como já foi feito com a VSL, os vídeos de
depoimento e a garantia — e registre a pendência no ASSET_MANIFEST.

Alegações que dependem de validação do cliente ficam atrás de um flag em
`offer.claims`. Desligar o flag deve remover a alegação de **todos** os lugares,
incluindo o JSON-LD. Há teste unitário garantindo isso.

## Copy

Toda a copy vive em `src/config/content.ts`. Nenhum texto dentro de componente.

A copy oficial não se altera. Melhorias de quebra de linha, hierarquia e destaque
são bem-vindas; mudança de conteúdo vira uma entrada em COPY_NOTES.md sob
`COPY SUGGESTION`, não um commit silencioso.

Texto auxiliar criado para estrutura visual é marcado com `// auxiliar` e
registrado em COPY_NOTES.md.

## Componentes

Server Component por padrão. `"use client"` só quando há interação real — a lista
do que é client está em ARCHITECTURE.md e deve ser curta.

## Estilo

Tokens em `@theme`, dentro de `src/app/globals.css`. Nenhum valor de cor solto em
componente. Cor em OKLCH; nunca `#000` nem `#fff`.

Anime apenas `transform` e `opacity`. Nada de `width`, `height`, `top`, `left`.
Toda animação respeita `prefers-reduced-motion`.

Cards são exceção, não padrão. Prefira listas com régua e grades editoriais.

## Dependências

Antes de instalar qualquer coisa: *isso não se resolve com plataforma, CSS ou
vinte linhas próprias?* Produção hoje tem quatro dependências. Cada nova precisa
ser justificada em ARCHITECTURE.md.

## Segurança

- Segredo de Stripe é só de servidor. Nunca `NEXT_PUBLIC_`.
- O browser nunca informa preço. O valor vem do Price ID no servidor.
- `?success=true` não confirma pagamento. Só o webhook confirma.
- Toda entrada é revalidada no servidor com o mesmo schema Zod do cliente.
- Erro exibido é sempre a mensagem genérica; detalhe vai para o log.

## Antes de dar por pronto

```bash
npm run check
```

Typecheck, lint, testes e build. Os quatro passam ou não está pronto.
