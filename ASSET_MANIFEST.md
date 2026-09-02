# ASSET_MANIFEST

Inventário do que existe, do que foi usado e do que ainda falta. Nada nesta
página é inventado: quando um material não foi entregue, o componente mostra um
estado de espera explícito em vez de um placeholder disfarçado.

## Origem dos materiais

| Fonte | Situação |
|---|---|
| `Copy. (6).pdf` (documento oficial de copy) | Recebido. É a fonte de verdade de todo o texto. |
| PRD Master — Operação Linha de Frente | Recebido. |
| `docfounder.com.br/programas/operacao-linha-de-frente` | Consultado. Origem da identidade visual e dos retratos. |
| Google Drive — pasta "Identidade Visual" | **Sem acesso.** A pasta exige autenticação. Precisa ser compartilhada ou exportada. |
| Vídeos de depoimento (link do Drive no PDF) | **Sem acesso.** Mesma pendência. |
| Transcrições de depoimentos (link ClickUp no PDF) | **Sem acesso.** Requer login no ClickUp. |

## Assets em uso

### Marca

| Arquivo | Origem | Observação |
|---|---|---|
| `public/brand/docfounder-logo.png` | `docfounder.com.br/assets/logo-ni-Ih-T0.png` | 250×50 PNG com alpha. **Baixa resolução.** Em telas de alta densidade o limite útil é ~125px de largura. Substituir por SVG assim que a pasta de identidade for liberada. |

Sobre superfícies escuras o logotipo é invertido por filtro CSS (`brightness(0) invert(1)`),
preservando as proporções. Nenhuma recoloração parcial é aplicada.

### Retratos dos profissionais

Nove arquivos em `public/depoimentos/`, 720×1280 (9:16), extraídos do storage
público usado pela própria página da DocFounder:

`eline-lobo` · `fabio-strauss` · `wilson-dimartini` · `marcus-bissiguini` ·
`clovisa-reck` · `marcelo-watanabe` · `petterson-guedes` · `daniel-dorta` · `kamilla`

Nome e especialidade vêm da página oficial. **Nenhuma citação, número ou
resultado foi atribuído a essas pessoas.**

> **Pendente:** confirmar autorização de uso destas imagens nesta landing
> específica e entregar os arquivos de vídeo. Enquanto `videoSrc` for `null` em
> `src/config/testimonials.ts`, a seção exibe apenas a identificação e uma nota
> de que os vídeos serão publicados.

### Tipografia

| Família | Papel | Carregamento |
|---|---|---|
| Archivo (500/600/700) | Títulos, rótulos, números, interface | `next/font/google` — auto-hospedada no build, zero requisições ao Google |
| Literata (400) | Parágrafos narrativos e documentos legais | idem |
| `src/assets/fonts/Archivo-SemiBold.ttf` | Renderização da imagem Open Graph (`next/og`) | Lida do disco no build |

### Ícones e favicon

`src/app/icon.svg` e `src/app/apple-icon.tsx` desenham o motivo da Linha
(traço vertical com três estações) nas cores da marca. **Não é o símbolo
corporativo da DocFounder** — é iconografia do programa.

> **Pendente:** exportar o símbolo "D" da DocFounder em SVG a partir do kit de
> marca, caso o cliente prefira o ícone corporativo.

## Assets ausentes

| O que falta | Impacto hoje | Onde se conecta |
|---|---|---|
| **Vídeo da VSL** | O quadro reserva o espaço 16:9 e mostra "Vídeo em breve". Sem layout shift quando o vídeo chegar. | `NEXT_PUBLIC_VSL_SRC` e `NEXT_PUBLIC_VSL_POSTER` |
| **Pôster da VSL** | O quadro usa uma trama em latão no lugar. | idem |
| **Vídeos de depoimento** | Seção mostra retratos + nota. | `videoSrc` em `src/config/testimonials.ts` |
| **Logo em SVG** | PNG de baixa resolução em uso. | `public/brand/` |
| **Link oficial de WhatsApp** | O CTA de compra para equipe no FAQ não é renderizado. | `NEXT_PUBLIC_WHATSAPP_URL` |
| **Detalhamento dos 7 módulos** | Só o número é citado, como na copy. Nenhum módulo foi inventado. | `content.program` |
| **Foto real da recepção** | A seção "Problema" usa uma encenação em CSS da conversa citada na copy. Uma foto real da recepção da clínica fortaleceria a seção. | `src/components/sections/Problem.tsx` |

> Uma busca por imagens de banco foi feita e descartada: os melhores resultados
> traziam marca de terceiros visível ou sinalização em inglês. Preferimos não
> ter foto genérica a ter foto que enfraquece a página.

## Pendências de validação (bloqueiam a publicação)

| Item | Estado | Onde está travado |
|---|---|---|
| **Certificado com validação MEC** | A copy oficial afirma "reconhecido oficialmente". Precisa de comprovação documental antes de ir ao ar. | `offer.claims.mecCertificate` — vire `false` e o item some da seção "O que vem incluso", do FAQ e do JSON-LD, sem mexer em componente. |
| **Garantia de satisfação** | O briefing traz "(ex: 7 dias)?" — não confirmado. **Nada é publicado.** | `offer.guarantee` — mude para `{ enabled: true, days, copy }` quando confirmado. |
| **Prazo real da oferta** | Sem data. A página diz "por tempo limitado" e **não exibe contador**. | `offer.endsAt` |
| **Dados do controlador (LGPD)** | Razão social, CNPJ, endereço, encarregado, operadores contratados, foro, prazo de acesso. | Blocos "Pendente do cliente" em `/privacidade` e `/termos` |
