/**
 * Profissionais listados na página oficial da Operação Linha de Frente
 * (docfounder.com.br/programas/operacao-linha-de-frente).
 *
 * Nome, especialidade e imagem vêm dos materiais publicados pela DocFounder.
 * Nenhuma citação, número ou resultado foi criado: enquanto os arquivos de
 * vídeo não forem entregues, `videoSrc` permanece `null` e o componente exibe
 * apenas a identificação do profissional.
 */

export type Testimonial = {
  id: string;
  name: string;
  specialty: string;
  poster: string;
  /** URL do vídeo (CDN/streaming). `null` enquanto o material não é entregue. */
  videoSrc: string | null;
};

export const testimonials: readonly Testimonial[] = [
  { id: "eline-lobo", name: "Dra. Eline Lobo", specialty: "Cardiologista", poster: "/depoimentos/eline-lobo.jpg", videoSrc: null },
  { id: "fabio-strauss", name: "Dr. Fabio Strauss", specialty: "Cirurgião Geral", poster: "/depoimentos/fabio-strauss.jpg", videoSrc: null },
  { id: "wilson-dimartini", name: "Dr. Wilson Dimartini", specialty: "Oftalmologista", poster: "/depoimentos/wilson-dimartini.jpg", videoSrc: null },
  { id: "marcus-bissiguini", name: "Dr. Marcus Bissiguini", specialty: "Oftalmologista", poster: "/depoimentos/marcus-bissiguini.jpg", videoSrc: null },
  { id: "clovisa-reck", name: "Dra. Clovisa Reck", specialty: "Otorrinolaringologista", poster: "/depoimentos/clovisa-reck.jpg", videoSrc: null },
  { id: "marcelo-watanabe", name: "Dr. Marcelo Watanabe", specialty: "Urologista", poster: "/depoimentos/marcelo-watanabe.jpg", videoSrc: null },
  { id: "petterson-guedes", name: "Dr. Petterson Guedes", specialty: "Emagrecimento e Reposição Hormonal", poster: "/depoimentos/petterson-guedes.jpg", videoSrc: null },
  { id: "daniel-dorta", name: "Dr. Daniel Dorta", specialty: "Medicina", poster: "/depoimentos/daniel-dorta.jpg", videoSrc: null },
  { id: "kamilla", name: "Dra. Kamilla", specialty: "Medicina", poster: "/depoimentos/kamilla.jpg", videoSrc: null },
];
