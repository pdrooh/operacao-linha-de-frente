import { offer } from "./offer";
import { site } from "./site";

const { event, seats } = offer;

export const seo = {
  title: `Operação Linha de Frente | Imersão presencial para secretárias de clínicas — ${event.city}`,
  shortTitle: "Operação Linha de Frente",
  description: `Imersão presencial para secretárias que querem transformar o atendimento em um diferencial para a clínica. ${event.dateLabel}, ${event.venue}, ${event.city}. Apenas ${seats} vagas. Com Thiago Moura.`,
  keywords: [
    "imersão para secretárias de clínica",
    "treinamento de recepção médica",
    "atendimento em clínicas",
    "curso presencial secretária de clínica",
    "Thiago Moura",
    "DocFounder",
  ],
  ogAlt: `Operação Linha de Frente — imersão presencial em ${event.city}, ${event.dateLabel}`,
  canonical: site.url,
} as const;
