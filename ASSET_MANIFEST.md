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

---

## Vídeos de depoimento — inventário recebido

Pasta entregue pelo cliente (Drive, acesso público), 11 arquivos, 417 MB brutos.
Recomprimidos para 75 MB em H.264 CRF 24, borda maior limitada a 1280px,
`+faststart`, áudio AAC 96k mono. Posters extraídos do próprio vídeo aos 2,5s,
com recorte central 9:16 para casar com o cartão.

| Destino | Origem | Resolução | Duração | Bruto → Otimizado |
|---|---|---|---|---|
| `eline-lobo` | 01-Eline Lobo-Cardiologista | 720×1280 | 58s | 19,7 → 6,8 MB |
| `fabio-strauss` | 02-Fabio Strauss-Cirurgiao Geral | 478×850 | 60s | 11,2 → 4,0 MB |
| `wilson-dimartini` | 03-Wilson Dimartini-Oftalmologista | 480×848 | 50s | 7,7 → 6,0 MB |
| `daniel-dorta` | Daniel Dorta @drdanieldorta | **3840×2160 (horizontal)** | 45s | 222,2 → 6,4 MB |
| `kamilla` | Dra Kamilla depoimento | **480×480 (quadrado)** | 60s | 4,3 → 3,7 MB |
| `marcelo-watanabe` | EDITADO DEPOIMENTO MARCELO | 2160×3840 | 39s | 72,8 → 11,1 MB |
| `marcus-bissiguini` | Marcus - Oftalmo | 720×1280 | 71s | 23,9 → 13,9 MB |
| `petterson-guedes` | Petterson Guedes | 480×848 | 77s | 13,8 → 6,5 MB |
| `clovisa-reck` | zClovisa Reck-Otorrino | 720×1280 | 60s | 20,3 → 8,5 MB |

### Pendências abertas

1. **`WhatsApp Video 2025-08-24 at 00.12.43.mp4`** (392×850, 66s) — sem
   identificação. Não foi publicado: não se atribui um depoimento a alguém por
   suposição. Aguarda o cliente informar de quem é.

2. **`Tatiana-Geriatria-@dratatianacosta.medica.mp4`** (392×850, 63s) — Dra.
   Tatiana Costa, Geriatria. Tem vídeo, mas **não consta na página oficial** da
   Operação Linha de Frente, então não há foto nem confirmação de uso. Aguarda
   decisão do cliente.

3. **Proporções divergentes.** Os arquivos chegam em 9:16, 1:1 e 16:9. O
   lightbox respeita a proporção real de cada um; os cartões usam recorte
   central 9:16. O de Daniel Dorta (16:9 4K) recorta bem porque ele está
   centralizado — se o enquadramento mudar em futuras entregas, revisar.

4. **Qualidade de origem da Dra. Kamilla.** 480×480 a 0,6 Mbps é a menor
   qualidade do conjunto; o poster fica visivelmente mais macio que os demais.
   Se houver arquivo original melhor, vale substituir.

---

## Fotos de Thiago Moura (03/09/2026)

Pasta "Ensaio - fotos" entregue pelo cliente (Drive, acesso público), com três
subpastas: **Coloridas** (22 arquivos), **Preto e Branco** (22) e **IA** (1).
Ensaio de estúdio, 4005×6000, fundo cinza-escuro em degradê.

Baixadas 9 coloridas para seleção; duas em uso:

| Arquivo em `public/thiago/` | Origem | Uso | Tratamento |
|---|---|---|---|
| `thiago-hero.jpg` (1100×1374, 88 KB) | `Thiago-0034.jpg` | Hero | Recorte 4:5, máscara radial nas bordas e camada de tinta verde em `mix-blend-mode: color` — o fundo do estúdio é cinza neutro e mais claro que o verde-tinta da página, e sem isso aparecia um retângulo colado sobre o fundo |
| `thiago-retrato.jpg` (900×1124, 64 KB) | `Thiago-0026.jpg` | Seção "Quem vai te guiar" | Recorte 4:5, sem máscara (fica sobre superfície clara) |

As 20 fotos coloridas restantes, as 22 em preto e branco e a imagem da subpasta
"IA" não foram baixadas. Se a direção de arte pedir outra seleção, os IDs estão
na pasta original.

### Pendências

1. **Vídeos de depoimento** — permanecem válidos: a copy nova aponta para a
   mesma pasta do Drive. Os nove estão no Vercel Blob e no ar.
2. **`WhatsApp Video 2025-08-24 at 00.12.43.mp4`** — segue sem identificação.
3. **Dra. Tatiana Costa (Geriatria)** — segue sem decisão sobre entrar na página.
4. **Sem VSL** — a copy nova não menciona vídeo de apresentação. O player foi
   removido. Se voltar a existir, o helper `src/lib/video/attach-source.ts`
   continua no projeto e aceita MP4 e HLS.
