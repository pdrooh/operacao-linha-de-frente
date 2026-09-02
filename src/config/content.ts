/**
 * Toda a copy da landing page vive aqui.
 *
 * Regra do projeto: nada é inventado. O texto abaixo reproduz o documento de
 * copy oficial da DocFounder. Textos auxiliares criados para dar estrutura
 * visual (legendas das estações da Linha, rótulos de seção) estão marcados com
 * `// auxiliar` e listados em COPY_NOTES.md para aprovação do cliente.
 */

export const content = {
  hero: {
    eyebrow: "Oportunidade de lançamento",
    title: "Sua secretária pode estar afastando pacientes da sua clínica e você nem sabe.",
    subtitle: "Veja como transformar sua recepção num diferencial, não num risco.",
    cta: "Quero conhecer o programa",
    // auxiliar — resume o que já está declarado nas seções 5 e 6
    facts: ["31 aulas", "7 módulos", "Materiais de apoio", "Acesso imediato"],
  },

  vsl: {
    // auxiliar — rótulo do player
    label: "Assista antes de decidir",
    pendingCopy: "Vídeo em breve",
    pendingHint: "A apresentação do programa será publicada aqui.",
  },

  problem: {
    station: "Primeiro contato",
    title: "Você já perdeu um paciente e só descobriu o motivo por acaso?",
    paragraphs: [
      "Uma resposta seca no WhatsApp. Uma agenda bagunçada. Um “achei melhor procurar outro lugar” que ninguém explica.",
      "Você levou anos construindo sua reputação. Mas quem atende primeiro é a sua equipe e isso está acontecendo agora, sem você ver.",
    ],
    // auxiliar — encenação literal do exemplo citado na copy oficial
    exchange: {
      caption: "A conversa que você nunca vê",
      messages: [
        { from: "paciente" as const, text: "Oi, bom dia! Vocês atendem qual convênio?", time: "09:12" },
        { from: "clinica" as const, text: "Não atendemos convênio.", time: "11:40", gapLabel: "2h28 depois" },
        { from: "paciente" as const, text: "Ah, entendi. Obrigada!", time: "11:41" },
      ],
      footnote: "Ninguém errou. Ninguém explicou o valor. O paciente foi embora.",
    },
  },

  journey: {
    station: "O mecanismo",
    title: "O problema não é a sua equipe. É a falta de um processo.",
    lead: "A Operação Linha de Frente dá esse processo pronto — para sua secretária parar de improvisar e começar a representar sua clínica com segurança.",
    // auxiliar — estrutura visual definida no PRD (seção 17)
    shiftFrom: "Improviso",
    shiftTo: "Processo",
    stagesLabel: "A jornada do paciente, ponto a ponto",
    stages: [
      {
        id: "contato",
        name: "Primeiro contato",
        caption: "O paciente chega. Sua clínica é julgada antes de qualquer consulta.",
      },
      {
        id: "whatsapp",
        name: "WhatsApp",
        caption: "A resposta que decide se ele continua ou procura outro lugar.",
      },
      {
        id: "atendimento",
        name: "Atendimento",
        caption: "Acolhimento com a cultura que você construiu, sem improviso.",
      },
      {
        id: "agendamento",
        name: "Agendamento",
        caption: "Do primeiro “oi” até o horário marcado, sem paciente escapando.",
      },
      {
        id: "confirmacao",
        name: "Confirmação",
        caption: "Rotina organizada com apoio de CRM e IA.",
      },
      {
        id: "conversao",
        name: "Conversão",
        caption: "Venda consultiva conduzida com técnica, objeções contornadas com método.",
      },
      {
        id: "fidelizacao",
        name: "Fidelização",
        caption: "Indicadores que mostram, com dados, onde a clínica ganha ou perde pacientes.",
      },
    ],
  },

  proof: {
    station: "Prova",
    title: "Clínicas que já estruturaram o atendimento com esse método:",
    // auxiliar — nota honesta enquanto os vídeos não são entregues
    pendingNote:
      "Depoimentos em vídeo destes profissionais serão publicados aqui assim que os arquivos forem disponibilizados.",
  },

  transformation: {
    station: "A transformação",
    title: "Depois do treinamento, sua secretária vai:",
    items: [
      "Representar sua clínica com a cultura que você construiu, sem improviso.",
      "Organizar a rotina e não deixar nenhum paciente escapar, com ajuda de CRM e IA.",
      "Acolher o paciente do primeiro contato até o agendamento, aumentando a conversão.",
      "Conduzir a venda com técnica consultiva, do primeiro “oi” ao fechamento.",
      "Contornar objeções com método, sem perder venda por falta de resposta.",
      "Manter alta performance mesmo em dias de agenda cheia.",
      "Acompanhar indicadores para você ver, com dados, onde a clínica ganha ou perde pacientes.",
    ],
    closing: "31 aulas. 7 módulos. Direto ao ponto.",
  },

  program: {
    station: "O programa",
    title: "O que vem incluso",
    items: [
      { label: "31 aulas gravadas", detail: "Aproximadamente 50 minutos cada, no ritmo da sua equipe." },
      { label: "7 módulos", detail: "Sequência completa, do primeiro contato ao acompanhamento de indicadores." },
      { label: "Materiais de apoio", detail: "Recursos para aplicar o processo na rotina da clínica." },
      { label: "Certificado MEC", detail: "Emitido ao final do treinamento.", claim: "mecCertificate" as const },
      { label: "Acesso imediato", detail: "Liberação assim que a compra é confirmada." },
    ],
  },

  bonuses: {
    station: "Bônus",
    title: "Bônus",
    // Copy oficial do cliente, sem título auxiliar por cima: o próprio texto é a manchete.
    items: [
      { text: "Acesso a uma live de tira-dúvidas com o Thiago Moura." },
      { text: "Um script/roteiro pronto de atendimento (WhatsApp ou telefone) já usado por outras clínicas." },
      { text: "Acesso antecipado à comunidade de WhatsApp antes do lançamento oficial." },
    ],
  },

  authority: {
    station: "Quem entrega",
    title: "A Operação Linha de Frente é da DocFounder,",
    titleRest: "empresa que já acompanha clínicas médicas de perto e sabe exatamente onde o atendimento quebra.",
  },

  offer: {
    station: "A oferta",
    eyebrow: "Lançamento",
    limitedCopy: "por tempo limitado",
    originalLabel: "De",
    cta: "Quero conhecer o programa",
    // auxiliar — reforço do que está incluso, já declarado na seção 6
    reassurance: "Acesso imediato após a confirmação do pagamento.",
  },

  faq: {
    station: "Dúvidas",
    title: "Perguntas frequentes",
    items: [
      {
        q: "Minha clínica é pequena, o programa funciona mesmo assim?",
        a: "Sim. O método se aplica a qualquer porte de clínica: o que muda é o volume de pacientes, não o processo de atendimento. Se você tem uma secretária ou uma equipe inteira, o conteúdo funciona do mesmo jeito.",
      },
      {
        q: "Quanto tempo minha equipe leva para concluir o curso?",
        a: "São 31 aulas de 50 minutos cada, no próprio ritmo da sua equipe, mas dá pra concluir em poucas semanas com uma dedicação regular.",
      },
      {
        q: "Tem suporte durante o treinamento?",
        a: "Sim. O suporte é feito pelo Thiago Moura e pela equipe DocFounder, prontos para tirar dúvidas ao longo de todo o treinamento.",
      },
      {
        q: "O certificado tem validade oficial?",
        a: "Sim. O certificado tem validação MEC, reconhecido oficialmente.",
        claim: "mecCertificate" as const,
      },
      {
        q: "Posso comprar para mais de uma pessoa da equipe?",
        a: "Sim! Para comprar para mais de uma pessoa da equipe, fale com a gente pelo WhatsApp.",
        whatsappCta: "Falar pelo WhatsApp",
      },
    ],
  },

  modal: {
    title: "Quero conhecer o programa",
    // auxiliar — orientação de preenchimento
    lead: "Preencha seus dados para continuar. Leva menos de um minuto.",
    fields: {
      name: { label: "Nome completo", placeholder: "Nome e sobrenome" },
      phone: { label: "WhatsApp", placeholder: "(11) 99999-9999" },
      email: { label: "E-mail", placeholder: "voce@suaclinica.com.br" },
    },
    consentPrefix: "Autorizo o uso dos meus dados para processar esta inscrição, conforme a ",
    consentLinkLabel: "Política de Privacidade",
    marketing: "Quero receber novidades e conteúdos da DocFounder no WhatsApp e por e-mail.",
    submit: "Continuar para o checkout",
    submitting: "Processando…",
    genericError: "Não foi possível continuar agora. Tente novamente em alguns instantes.",
  },

  stickyCta: {
    label: "Quero conhecer o programa",
  },
} as const;

export type Content = typeof content;
