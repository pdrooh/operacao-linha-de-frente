# Notas de copy

Registro do que é copy oficial do cliente e do que foi criado para dar estrutura
visual. A regra do projeto está no [CLAUDE.md](./CLAUDE.md): copy oficial não se
altera; sugestão de mudança vira uma entrada aqui, não um commit silencioso.

## Origem

Documento oficial: `OPERAÇÃO LINHA DE FRENTE.pdf`, entregue pelo cliente em
03/09/2026. Substituiu integralmente a copy anterior.

## Mudança de produto (03/09/2026)

A copy anterior descrevia um **curso online** — 31 aulas, 7 módulos, R$497 com
âncora de R$997, certificado MEC, três bônus. A nova descreve uma **imersão
presencial de um dia**. As duas não são versões do mesmo texto: são produtos
diferentes.

| | Antes | Agora |
|---|---|---|
| Formato | Curso online gravado | Imersão presencial, 1 dia |
| Quando | Acesso imediato | 10/10/2026, das 8h às 20h |
| Onde | — | Pullman Hotel, São Paulo — SP |
| Preço | R$497 (de R$997) | R$997, sem âncora |
| Vagas | Ilimitadas | 40 |
| Certificado | "Certificado MEC" | "Certificado de participação" |
| Bônus | 3 bônus | "Sem bônus de antecipação nesta turma" |
| Interlocutor | O médico ("sua secretária") | A secretária ("você") |
| CTA | "Quero conhecer o programa" | "Quero garantir minha vaga" |

Consequências no código, todas aplicadas:

- A alegação de certificado MEC **saiu inteiramente**, junto com o flag
  `offer.claims` que a controlava. A copy nova não faz essa alegação.
- Seções de bônus e de preço com desconto foram removidas.
- A VSL saiu: a copy nova não menciona vídeo de apresentação. O player e o
  `src/config/vsl.ts` foram removidos; o helper `attachSource` permanece,
  porque os depoimentos o usam e ele aceita MP4 e HLS.
- O JSON-LD passou de `Course` para `EducationEvent`, com data, local e
  capacidade da turma.

## Texto auxiliar

Criado para estrutura visual, sem equivalente no documento oficial. Sujeito a
aprovação do cliente:

| Onde | Texto | Função |
|---|---|---|
| Hero | "Imersão presencial · São Paulo" | Etiqueta de contexto acima do título |
| Hero e Detalhes | Rótulos "Data", "Horário", "Local", "Vagas", "Investimento" | Nomeiam os dados que a copy traz em linha corrida |
| Seu papel | "No improviso" / "Com método" | Rótulos do contraste que a copy descreve em prosa |
| Mecanismo | "A jornada do paciente, ponto a ponto" | Introduz a linha de sete estações |
| Mecanismo | Legendas das sete estações | Derivadas da copy (WhatsApp, telefone, recepção, agendamento, objeções, acompanhamento) |
| Detalhes | "Turma de 40 vagas · 10 de outubro de 2026" | Reforço abaixo do CTA, repete dados já declarados |
| Modal | "Preencha seus dados para continuar. Leva menos de um minuto." | Orientação de preenchimento |
| Rótulos de estação | Números e nomes de cada seção no trilho | Gramática visual da Linha |

## Alegações que dependem do cliente

- **"+20 clínicas assessoradas", "+200 secretárias e recepcionistas treinadas",
  "Mais de 10 anos"** — credenciais de Thiago Moura declaradas na copy oficial.
  Publicadas como recebidas. Se forem números estimados, convém revisar antes da
  campanha.
- **Garantia** — continua sem menção na copy. `offer.guarantee.enabled` segue
  `false`; nada sobre garantia é publicado.

## COPY SUGGESTION

Nenhuma pendente.
