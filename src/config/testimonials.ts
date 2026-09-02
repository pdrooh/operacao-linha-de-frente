/**
 * Profissionais listados na página oficial da Operação Linha de Frente
 * (docfounder.com.br/programas/operacao-linha-de-frente).
 *
 * Nome, especialidade e imagem vêm dos materiais publicados pela DocFounder;
 * as especialidades foram conferidas contra os nomes dos arquivos de vídeo
 * entregues pelo cliente. Onde a DocFounder não informa especialidade, o campo
 * fica ausente — nada é preenchido por suposição.
 *
 * `videoSrc` aceita MP4 progressivo ou playlist HLS servida por CDN. Enquanto
 * for `null`, o cartão é só identificação: sem botão de play que não leva a
 * lugar nenhum. Ver ASSET_MANIFEST.md para as pendências abertas.
 */

export type Testimonial = {
  id: string;
  name: string;
  /** Ausente quando a DocFounder não divulga a especialidade. */
  specialty?: string;
  poster: string;
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
  { id: "daniel-dorta", name: "Dr. Daniel Dorta", poster: "/depoimentos/daniel-dorta.jpg", videoSrc: null },
  { id: "kamilla", name: "Dra. Kamilla", poster: "/depoimentos/kamilla.jpg", videoSrc: null },
];
