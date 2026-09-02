# COPY_NOTES

A copy do documento oficial foi reproduzida sem alteração de conteúdo. Este
arquivo registra **tudo que foi escrito por fora dela**, para aprovação.

## Texto auxiliar criado (marcado como `// auxiliar` em `src/config/content.ts`)

| Onde | Texto | Justificativa |
|---|---|---|
| Hero | "31 aulas · 7 módulos · Materiais de apoio · Acesso imediato" | Resumo do que a seção 6 já declara. Antecipa o conteúdo na dobra. |
| VSL | "Assista antes de decidir" · "Vídeo em breve" · "A apresentação do programa será publicada aqui." | Rótulo do player e estado de espera. |
| Problema | "A conversa que você nunca vê" / "Ilustração" / as três mensagens / "2h28 depois" / "Ninguém errou. Ninguém explicou o valor. O paciente foi embora." | Encenação literal do exemplo da própria copy ("uma resposta seca no WhatsApp"). Marcada como **Ilustração** no próprio componente. |
| Mecanismo | "Improviso" → "Processo" | Estrutura visual definida no PRD, seção 46. |
| Jornada | "A jornada do paciente, ponto a ponto" + as 7 legendas de estação | Estrutura definida no PRD, seção 17. Cada legenda deriva de um item da seção 5 da copy. |
| Prova | "Depoimentos em vídeo destes profissionais serão publicados aqui assim que os arquivos forem disponibilizados." | Nota honesta enquanto os vídeos não chegam. |
| Programa | Os detalhes de cada item ("Aproximadamente 50 minutos cada", etc.) | Derivados do FAQ e da seção 5. |
| Oferta | "Acesso imediato após a confirmação do pagamento." | Reafirma o item "Acesso imediato" da seção 6. |
| Modal | "Preencha seus dados para continuar. Leva menos de um minuto." + rótulos e mensagens de erro | Interface. |
| Páginas legais | Política de Privacidade e Termos | Redigidos a partir do que a página de fato coleta. Todo dado do controlador está marcado como pendente. |

## Normalização tipográfica

Uma única alteração de pontuação foi aplicada à copy oficial, sem mudar palavra:

| Original | Publicado |
|---|---|
| "dá esse processo pronto **-** para sua secretária" | "dá esse processo pronto **—** para sua secretária" |

O hífen solto vira travessão, que é a pontuação correta para aposto explicativo.
Se o cliente preferir manter o hífen, é uma linha em `content.journey.lead`.

## Legendas das estações — origem

| Estação | Legenda | Deriva de |
|---|---|---|
| Primeiro contato | "O paciente chega. Sua clínica é julgada antes de qualquer consulta." | Seção 2 |
| WhatsApp | "A resposta que decide se ele continua ou procura outro lugar." | Seção 2 |
| Atendimento | "Acolhimento com a cultura que você construiu, sem improviso." | Seção 5, item 1 |
| Agendamento | "Do primeiro 'oi' até o horário marcado, sem paciente escapando." | Seção 5, itens 2 e 3 |
| Confirmação | "Rotina organizada com apoio de CRM e IA." | Seção 5, item 2 |
| Conversão | "Venda consultiva conduzida com técnica, objeções contornadas com método." | Seção 5, itens 4 e 5 |
| Fidelização | "Indicadores que mostram, com dados, onde a clínica ganha ou perde pacientes." | Seção 5, item 7 |

## COPY SUGGESTION — não aplicadas

Sugestões que **não** foram implementadas, porque alterar a copy é decisão do cliente:

1. **Headline do hero.** "Sua secretária pode estar afastando pacientes da sua
   clínica e você nem sabe" tem 76 caracteres e ocupa 3 linhas no desktop, 5 no
   mobile. Uma versão de ~55 caracteres ganharia impacto na dobra. Exemplo:
   *"Sua secretária pode estar afastando pacientes — e você nem sabe."*

2. **Seção 9 (autoridade).** A frase atual é factual mas genérica. Se a DocFounder
   puder liberar números auditáveis (clínicas atendidas, tempo de operação), esta
   é a seção mais fraca da página e a que mais ganharia.

3. **Seção 10 (oferta).** "Por tempo limitado" sem prazo tem força limitada.
   Havendo data real, `offer.endsAt` já está preparado.

4. **Seção 3 (prova).** "Clínicas que já estruturaram o atendimento com esse
   método" promete depoimento. Sem os vídeos, a seção entrega menos do que a
   headline anuncia. Prioridade alta na entrega de material.

## Alegações que exigem validação antes de publicar

- **"Certificado MEC, reconhecido oficialmente"** (seção 6 e FAQ). Está no ar
  hoje porque é copy oficial do cliente, mas depende de comprovação documental.
  Desligue em `offer.claims.mecCertificate` e o item some de todos os lugares.
- **Garantia de satisfação.** O briefing traz "(ex: 7 dias)?". **Não foi
  publicada nada** sobre garantia. Os Termos citam apenas o direito legal de
  arrependimento do art. 49 do CDC.
