/**
 * Toda a copy da landing page vive aqui.
 *
 * Regra do projeto: nada é inventado. O texto abaixo reproduz o documento de
 * copy oficial da DocFounder para a imersão presencial de 10/10/2026. Textos
 * auxiliares criados para dar estrutura visual estão marcados com `// auxiliar`
 * e listados em COPY_NOTES.md para aprovação do cliente.
 *
 * A página fala com a SECRETÁRIA ("você"), com uma única seção endereçada ao
 * médico ou gestor. Ao editar, mantenha essa voz.
 */

export const content = {
  hero: {
    // auxiliar — etiqueta de contexto
    eyebrow: "Imersão presencial · São Paulo",
    /* `titleLead` sai em osso, `titleEm` em latão: a marca se lê em dois tempos. */
    titleLead: "Operação",
    titleEm: "Linha de Frente",
    subtitle:
      "Imersão presencial para secretárias que querem transformar o atendimento em um diferencial para a clínica.",
    cta: "Quero garantir minha vaga",
    // auxiliar — legenda do retrato
    hostCaption: "Quem conduz a imersão",
  },

  problem: {
    station: "Primeiro contato",
    title: "Você pode estar perdendo pacientes antes mesmo de eles conhecerem o médico",
    falhas: [
      "Uma resposta seca no WhatsApp.",
      "Uma ligação mal conduzida.",
      "Uma dúvida que ficou sem resposta.",
      "Um paciente que some depois do primeiro contato.",
    ],
    remate: "Muitas vezes, ninguém percebe o motivo.",
    paragraphs: [
      "Antes de conhecer o médico ou a estrutura, o paciente conhece a linha de frente da clínica: o atendimento, a recepção, você.",
      "É nesse primeiro contato que ele decide se confia na clínica ou procura outro lugar.",
    ],
  },

  role: {
    station: "Seu papel",
    title: "Você não é “apenas a secretária”",
    paragraphs: [
      "Você é uma das pessoas mais importantes na experiência do paciente.",
      "É você quem recebe, acolhe, transmite segurança e organiza a jornada do paciente desde o primeiro “oi” até o agendamento.",
    ],
    // O contraste central da página: improviso × método.
    shift: {
      from: "Quando esse processo acontece no improviso, você e sua clínica perdem oportunidades.",
      to: "Quando existe método e estratégia, o atendimento vira diferencial competitivo.",
    },
  },

  mechanism: {
    station: "O mecanismo",
    title: "A Operação Linha de Frente nasceu para isso",
    lead: "Uma imersão presencial para preparar secretárias e profissionais da recepção para atuar com mais segurança, organização e estratégia.",
    remate:
      "Atender bem não é só ser simpática. É saber ouvir, conduzir, acolher, responder, organizar e transformar um contato em confiança.",
    // auxiliar — estrutura visual da jornada (PRD, seção 17)
    stagesLabel: "A jornada do paciente, ponto a ponto",
    stages: [
      { id: "contato", name: "Primeiro contato", caption: "O paciente chega. Sua clínica é julgada antes de qualquer consulta." },
      { id: "whatsapp", name: "WhatsApp", caption: "A resposta que decide se ele continua ou procura outro lugar." },
      { id: "telefone", name: "Telefone", caption: "Uma ligação conduzida com método, não no improviso." },
      { id: "recepcao", name: "Recepção", caption: "O acolhimento presencial que confirma o que foi prometido." },
      { id: "agendamento", name: "Agendamento", caption: "Do primeiro “oi” até o horário marcado, sem paciente escapando." },
      { id: "objecoes", name: "Objeções", caption: "Contornadas sem pressão e sem perder oportunidades." },
      { id: "acompanhamento", name: "Acompanhamento", caption: "Processos, CRM e tecnologia para não perder o paciente de vista." },
    ],
  },

  outcomes: {
    station: "A transformação",
    title: "O que você vai desenvolver na imersão",
    lead: "Ao final do dia, você será capaz de:",
    items: [
      "Gerar confiança desde o primeiro contato (WhatsApp, telefone e presencial)",
      "Comunicar com mais segurança e estratégia, sem parecer robótica",
      "Organizar a rotina com agenda cheia e demandas simultâneas",
      "Atender de forma consultiva, do primeiro contato ao agendamento",
      "Lidar com objeções sem pressão e sem perder oportunidades",
      "Usar processos, CRM e tecnologia para acompanhar pacientes",
    ],
    cta: "Quero garantir minha vaga",
  },

  format: {
    station: "O formato",
    title: "Uma imersão, não apenas mais um treinamento",
    paragraphs: [
      "Nada de teoria que não vira prática na segunda-feira.",
      "A Operação Linha de Frente conecta aprendizado com a realidade da rotina de uma clínica.",
    ],
    listLabel: "Você sai com:",
    items: [
      "Nova visão sobre o seu papel",
      "Ferramentas práticas para aplicar imediatamente",
      "Clareza de como seu atendimento impacta a experiência do paciente",
    ],
    remate: "Um dia para aprender. Um método para aplicar. Uma nova forma de atuar na linha de frente.",
  },

  proof: {
    station: "Prova",
    title: "O que dizem quem já passou por isso",
  },

  manager: {
    station: "Para a gestão",
    title: "Para o médico ou gestor da clínica",
    lead: "Se você é médico ou gestor e está avaliando se vale a pena investir R$ 997 na sua secretária, pense assim:",
    items: [
      "Quantos pacientes sua clínica perde por mês por falhas no primeiro atendimento?",
      "Um único paciente de procedimento que não fecha já paga a imersão.",
      "Melhorar o atendimento na linha de frente aumenta a taxa de agendamento, reduz agenda vazia e melhora a experiência do paciente.",
    ],
    remate:
      "A Operação Linha de Frente não é um “curso de secretária”. É um treinamento de operação de clínica, focado onde a maioria das oportunidades se perde: a linha de frente.",
    cta: "Quero garantir minha vaga para minha secretária",
  },

  host: {
    station: "Quem conduz",
    title: "Quem vai te guiar",
    name: "Thiago Moura",
    credentials: [
      "Mais de 10 anos atuando com gestão e operação de clínicas",
      "+20 clínicas assessoradas",
      "+200 secretárias e recepcionistas treinadas",
    ],
    remate:
      "Metodologia nascida na prática, dentro da realidade das clínicas, e não apenas em sala de aula.",
  },

  audience: {
    station: "Para quem é",
    title: "Esta imersão é para você que:",
    items: [
      "Trabalha como secretária em uma clínica",
      "Atua na recepção ou no atendimento ao paciente",
      "Quer se comunicar com mais segurança",
      "Deseja se tornar uma profissional mais preparada e valorizada",
      "Tem dificuldade com pacientes, objeções ou agendas cheias",
      "Quer organizar melhor sua rotina",
      "Entende que atendimento também é estratégia",
    ],
    remate: "Se você está na linha de frente de uma clínica, essa imersão foi feita para você.",
  },

  details: {
    station: "A imersão",
    title: "Detalhes da imersão",
    includedLabel: "O que está incluso",
    included: [
      "1 dia de imersão presencial com Thiago Moura",
      "Curso preparatório online",
      "Materiais de apoio (scripts, planilhas, checklists)",
      "Certificado de participação",
      "Networking com outros profissionais",
    ],
    investmentLabel: "Investimento",
    noBonusNote: "Sem bônus de antecipação nesta turma.",
    cta: "Quero garantir minha vaga",
  },

  faq: {
    station: "Dúvidas",
    title: "Perguntas frequentes",
    items: [
      {
        q: "E se minha clínica não quiser pagar?",
        a: "A sua participação também representa um investimento na sua carreira e no desenvolvimento das suas habilidades. Além disso, você pode apresentar à gestão os benefícios práticos da imersão para o atendimento e para a operação da clínica.",
      },
      {
        q: "Sou médico/gestor. Vale a pena pagar para minha secretária?",
        a: "Sim. Pense em quantos pacientes você perde por falhas no primeiro atendimento. Um único paciente de procedimento que não fecha já paga a imersão, além de melhorar a experiência de todos os pacientes.",
      },
      {
        q: "Já fizemos outros treinamentos. O que muda aqui?",
        a: "Foco total na rotina de clínicas, com exemplos reais de WhatsApp, telefone e recepção. Método prático, para aplicar já na segunda-feira.",
      },
    ],
  },

  scarcity: {
    station: "Vagas",
    title: "Vagas limitadas",
    paragraphs: [
      "São apenas 40 vagas para garantir dinâmica de grupo e atendimento personalizado.",
      "Não há bônus de antecipação nesta turma. As vagas seguem até lotar.",
    ],
    cta: "Quero garantir minha vaga",
  },

  closing: {
    station: "Sua decisão",
    title: "Sua clínica pode continuar perdendo pacientes no primeiro contato…",
    subtitle: "…ou você pode preparar sua linha de frente para atuar em outro nível.",
    paragraph:
      "Uma secretária preparada não só responde mensagens. Ela acolhe, organiza, conduz, gera confiança e se torna parte fundamental da experiência que faz o paciente escolher permanecer na clínica.",
    remate: "A sua posição é na linha de frente.",
    cta: "Quero garantir minha vaga",
  },

  modal: {
    title: "Quero garantir minha vaga",
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
    label: "Garantir minha vaga",
  },
} as const;

export type Content = typeof content;
