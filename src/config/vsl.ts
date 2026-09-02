/**
 * Configuração da VSL.
 *
 * O vídeo é servido por CDN/streaming (Mux, Bunny Stream ou equivalente), nunca
 * embutido no bundle. Enquanto `src` for `null`, o player renderiza um estado
 * de espera honesto em vez de um vídeo quebrado.
 */

export type VslConfig = {
  /** MP4 progressivo ou playlist HLS (.m3u8) servida por CDN. */
  src: string | null;
  poster: string | null;
  /** Faixa WebVTT de legendas, quando disponível. */
  captions: string | null;
  /** Proporção usada para reservar espaço e evitar layout shift. */
  aspectRatio: string;
  title: string;
};

export const vsl: VslConfig = {
  src: process.env.NEXT_PUBLIC_VSL_SRC ?? null,
  poster: process.env.NEXT_PUBLIC_VSL_POSTER ?? null,
  captions: null,
  aspectRatio: "16 / 9",
  title: "Apresentação da Operação Linha de Frente",
};
