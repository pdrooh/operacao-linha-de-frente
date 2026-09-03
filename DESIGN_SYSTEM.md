# DESIGN_SYSTEM

## Conceito

**Linha de Frente**, levado ao pé da letra.

Uma linha de latão percorre a página inteira. No desktop ela vive num trilho fixo
à esquerda, com sete estações — do primeiro contato à fidelização — que acendem
conforme o visitante desce. Cada seção é uma estação numerada desse percurso: o
mesmo traço que sai da margem carrega o número e o nome da seção.

Não é ornamento. É a tese da página desenhada: a recepção é uma linha, e ou ela
está estruturada ponto a ponto, ou quebra em algum deles.

**Referência estética:** dossiê de operação clínica. Papel-osso numerado, réguas
de latão, verde profundo. Precisão de protocolo, não brilho de infoproduto.

## Cor

Derivada da identidade oficial da DocFounder e convertida para OKLCH, que dá
gradação perceptualmente uniforme e evita as saturações estranhas do HSL nos
extremos.

| Token | OKLCH | Origem |
|---|---|---|
| `--color-ink` | `oklch(17% 0.026 168)` | Verde-quase-preto, base das seções profundas |
| `--color-ink-raised` | `oklch(21.5% 0.030 168)` | Superfície elevada no escuro |
| `--color-forest` | `oklch(34.2% 0.050 167)` | `hsl(158 41% 18%)` — verde DocFounder |
| `--color-forest-mid` / `-vivid` | `43.7%` / `52.7%` | Escala do mesmo verde |
| `--color-bone` | `oklch(98.6% 0.002 85)` | `hsl(40 20% 98%)` — papel quente |
| `--color-bone-raised` / `-sunk` | `96.4%` / `93.8%` | Camadas do papel |
| `--color-rule` | `oklch(90.5% 0.006 85)` | Régua no claro |
| `--color-graphite` | `oklch(24.3% 0.007 122)` | Texto no claro |
| `--color-graphite-soft` | `oklch(45% 0.008 122)` | Texto secundário no claro |
| `--color-brass` | `oklch(67.4% 0.082 71)` | `hsl(33 38% 54%)` — dourado DocFounder |
| `--color-brass-light` / `-deep` | `78%` / `54%` | Hover; e latão para texto sobre papel |
| `--color-alert` | `oklch(56% 0.150 28)` | Erro de formulário |

**Estratégia: Committed.** O verde profundo carrega hero, mecanismo, autoridade e
oferta. O papel-osso carrega as seções de leitura. O latão é acento cirúrgico —
réguas, números, CTA, estados ativos. Nunca preenchimento.

Nenhum `#000` nem `#fff`: todo neutro é levemente puxado para o matiz da marca.

### Contraste

Texto principal sobre ambas as superfícies passa de 4.5:1 com folga. Sobre papel,
o latão de texto é sempre `--color-brass-deep` (~5:1); `--color-brass` fica
reservado para réguas, ícones e superfícies grandes. O anel de foco troca de
`brass` para `brass-deep` dentro de `.surface-paper`.

## Tipografia

| Família | Papel | Pesos |
|---|---|---|
| **Archivo** | Títulos, rótulos, números, interface | 500 · 600 · 700 |
| **Literata** | Parágrafos narrativos e documentos legais | 400 |

Archivo é uma grotesca de sinalização: institucional, densa nas versais, firme
com tracking negativo em tamanhos grandes. Literata é serifada de leitura, feita
para tela — dá ao texto corrido peso de documento, não de post.

A divisão é de papel, não decorativa: **Archivo comanda, Literata explica.**

### Escala

| Classe | Tamanho | Uso |
|---|---|---|
| `.t-display` | `clamp(2.25rem, 1.6rem + 2.25vw, 3.3rem)` | H1 |
| `.t-h2` | `clamp(1.95rem, 1.25rem + 2.9vw, 3.4rem)` | Título de seção |
| `.t-h3` | `clamp(1.3rem, 1.08rem + 0.95vw, 1.85rem)` | Subtítulo |
| `.t-lead` | `clamp(1.125rem, 1.02rem + 0.5vw, 1.4rem)` | Subheadline |
| `.t-body` | `clamp(1.0625rem, 1.01rem + 0.24vw, 1.1875rem)` | Parágrafo (Literata) |
| `.t-meta` | `0.8125rem` | Apoio |
| `.t-label` | `0.6875rem`, `0.19em`, versais | Estação, rótulo |

Razão ≥ 1.25 entre degraus. `.t-body` limitado a `62ch`. Texto claro sobre fundo
escuro ganha `line-height` extra (1.74), porque tipo claro parece mais leve.

Números sempre tabulares em preços, horários e indicadores.

## Layout

- Conteúdo em `1200px`; no desktop a calha esquerda abre `88px` para o trilho.
- Calhas: `24px` → `32px` (480) → `48px` (1024) → `64px` (1440).
- Espaço entre seções: `clamp(4.5rem, 3rem + 7vw, 9rem)`.
- Composição assimétrica. Nada de pilha centralizada.
- **Cards são exceção.** Praticamente tudo é lista com régua de latão ou grade
  editorial. Os únicos cards da página são o painel de preço e os retratos —
  onde o card é de fato a forma certa.

## Motion

| Elemento | Movimento |
|---|---|
| Revelação | `opacity` + `translateY(18px)`, 700ms, cascata de 60–110ms |
| A Linha (trilho) | `scaleY` ligado à rolagem, escrito via variável CSS |
| A Linha (jornada) | `scaleX`/`scaleY` desenhando em 1500ms, nós em cascata |
| CTA | Elevação de 2px + varredura de luz em 620ms |
| Modal | `translateY` + `opacity`, entrada 380ms |
| FAQ | `::details-content` com `interpolate-size`, 420ms |

Só `transform` e `opacity` são animados. Curvas exponenciais (`ease-out-quint`,
`ease-out-expo`) — sem bounce, sem elástico.

`prefers-reduced-motion: reduce` desliga tudo e revela o conteúdo imediatamente.

## Componentes

**Botão** — 56px de altura (52px no CTA fixo), 48px na variante fantasma. No
mobile o rótulo encolhe para caber em uma linha. Estados: idle, hover (elevação +
varredura), active, disabled, loading.

**Campo** — 52px, fonte de 16px (impede o zoom automático do iOS), borda que
escurece no hover, anel de latão no foco, `aria-invalid` + erro com `role="alert"`
logo abaixo.

**Estação** — traço de latão, número tabular, nome em versais. É a gramática que
liga cada seção ao trilho.

## Acessibilidade

- Alvos de toque ≥ 44px em todo elemento interativo.
- Um único `<h1>`; `<h2>` por seção; `<h3>` nos itens.
- `<dialog>` nativo: focus trap, ESC e camada superior pelo navegador.
- Foco vai para o primeiro campo inválido; erros anunciados por `role="alert"`.
- Consentimento de marketing separado e nunca pré-marcado.
- Link "Ir para o conteúdo" como primeiro elemento focável.
- Foco visível em tudo, com cor ajustada por superfície.

## Listas de definição

Pares de rótulo e valor (data, horário, local, vagas, investimento) usam `<dl>`.

**`<dt>` e `<dd>` são filhos diretos do `<dl>`.** A regra `definition-list` do axe
tolera uma camada de `<div>` entre eles, mas não duas — e foi exatamente isso que
quebrou quando cada linha ganhou um `<div>` de layout somado ao `<div>` do
componente `Reveal`. Se precisar de revelação por rolagem, envolva o `<dl>`
inteiro, nunca cada par.

O alinhamento em duas colunas vem da grade, não de wrappers:

```
dl   → grid grid-cols-[auto_1fr]   (sem gap entre colunas)
dt   → flex items-center  border-b  pr-6
dd   → flex items-center justify-end  border-b  m-0
```

Duas exigências dessa combinação, ambas verificáveis:

1. **Sem `gap-x`.** As bordas inferiores de `dt` e `dd` precisam se encostar,
   senão a régua aparece partida em dois segmentos.
2. **Sem `items-baseline` no `dl`.** Com baseline as células encolhem para o
   próprio conteúdo e, como rótulo e valor têm tamanhos diferentes, as duas
   bordas ficam em alturas distintas. Esticadas (padrão da grade), coincidem; o
   `items-center` de cada célula cuida do alinhamento vertical do texto.
