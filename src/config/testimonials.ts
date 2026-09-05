/**
 * Depoimentos.
 *
 * Nome, especialidade, cidade e citação vêm do documento oficial de
 * transcrições entregue pelo cliente ("Transcrições de Depoimentos de
 * Médicos"). As citações são recortes literais, sem reescrita; o trecho
 * escolhido de cada uma está registrado em COPY_NOTES.md.
 *
 * ATENÇÃO: estes depoimentos falam do trabalho de gestão do Thiago Moura com
 * clínicas, não da imersão Operação Linha de Frente. Ver COPY_NOTES.md.
 */

export type Testimonial = {
  id: string;
  name: string;
  /** Ausente quando a fonte não informa. */
  specialty?: string;
  city?: string;
  /** Recorte literal da transcrição. Ausente quando não há transcrição. */
  quote?: string;
  poster: string;
  videoSrc: string | null;
};

const BLOB = "https://fapgm6ieygcphrv7.public.blob.vercel-storage.com/depoimentos";

export const testimonials: readonly Testimonial[] = [
  {
    id: "tatiana-costa",
    name: "Dra. Tatiana Costa",
    specialty: "Ginecologia",
    city: "Joinville, SC",
    quote:
      "Ele me auxiliou tanto na contratação da secretária, na triagem, na organização de processos.",
    poster: "/depoimentos/tatiana-costa.jpg",
    videoSrc: `${BLOB}/tatiana-costa.mp4`,
  },
  {
    id: "marcus-vinicius",
    name: "Dr. Marcus Vinicius",
    specialty: "Oftalmologia",
    city: "Feira de Santana, BA",
    quote:
      "Na minha clínica o atendimento é com excelência, sempre foi e sempre será prioridade. Aqui tudo gira em torno do paciente.",
    poster: "/depoimentos/marcus-bissiguini.jpg",
    videoSrc: `${BLOB}/marcus-bissiguini.mp4`,
  },
  {
    id: "eline-lobo",
    name: "Dra. Eline Lobo",
    specialty: "Cardiologista",
    city: "Salvador, BA",
    quote: "Nós médicos não temos capacidade sozinhos de conduzir um processo de gestão.",
    poster: "/depoimentos/eline-lobo.jpg",
    videoSrc: `${BLOB}/eline-lobo.mp4`,
  },
  {
    id: "petterson-guedes",
    name: "Dr. Petterson Guedes",
    specialty: "Médico do Esporte",
    city: "Novo Hamburgo, RS",
    quote:
      "A nossa primeira conversa já foi suficiente pra gente entender o quanto alguns ajustes nesse processo de gestão fazem toda diferença.",
    poster: "/depoimentos/petterson-guedes.jpg",
    videoSrc: `${BLOB}/petterson-guedes.mp4`,
  },
  {
    id: "marcelo-watanabe",
    name: "Dr. Marcelo Watanabe",
    specialty: "Urologista",
    city: "São Bernardo do Campo, SP",
    quote: "Já consigo enxergar meu negócio de outra maneira.",
    poster: "/depoimentos/marcelo-watanabe.jpg",
    videoSrc: `${BLOB}/marcelo-watanabe.mp4`,
  },
  {
    id: "daniel-dorta",
    name: "Dr. Daniel Dorta",
    specialty: "Endocrinologia",
    city: "Higienópolis, SP",
    quote: "Gestão com inteligência artificial leva a clínica para um outro nível.",
    poster: "/depoimentos/daniel-dorta.jpg",
    videoSrc: `${BLOB}/daniel-dorta.mp4`,
  },
  {
    id: "fabio-strauss",
    name: "Dr. Fabio Strauss",
    specialty: "Cirurgião Geral",
    city: "Itacoara, RS",
    quote: "Ele modifica realmente a rotina, a gestão de tudo o que a gente faz aqui.",
    poster: "/depoimentos/fabio-strauss.jpg",
    videoSrc: `${BLOB}/fabio-strauss.mp4`,
  },
  {
    id: "wilson-dimartini",
    name: "Dr. Wilson Dimartini",
    specialty: "Oftalmologista",
    city: "Maringá, PR",
    quote:
      "É fantástico o conhecimento que ele tem, a clareza, o desejo, a vontade de ajudar, de melhorar a nossa clínica.",
    poster: "/depoimentos/wilson-dimartini.jpg",
    videoSrc: `${BLOB}/wilson-dimartini.mp4`,
  },
  {
    id: "kamilla",
    name: "Dra. Kamilla",
    city: "João Pessoa, PB",
    quote: "Agora eu consigo respirar e consigo que minha equipe trabalhe por mim.",
    poster: "/depoimentos/kamilla.jpg",
    videoSrc: `${BLOB}/kamilla.mp4`,
  },
  {
    /* Tem vídeo, mas não consta no documento de transcrições: fica sem citação. */
    id: "clovisa-reck",
    name: "Dra. Clovisa Reck",
    specialty: "Otorrinolaringologista",
    poster: "/depoimentos/clovisa-reck.jpg",
    videoSrc: `${BLOB}/clovisa-reck.mp4`,
  },
];
