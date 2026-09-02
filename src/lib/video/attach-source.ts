/**
 * Liga uma URL de vídeo a um elemento <video>, seja ela MP4 progressivo ou
 * playlist HLS.
 *
 * A decisão é tomada em runtime a partir da própria URL:
 *   - `.m3u8` em navegador com HLS nativo (Safari, iOS) → atribuição direta;
 *   - `.m3u8` nos demais → `hls.js` carregado sob demanda via import dinâmico;
 *   - qualquer outra coisa (MP4/WebM) → atribuição direta.
 *
 * O import dinâmico é o ponto importante: quem serve MP4 nunca baixa o hls.js.
 * Assim a escolha de hospedagem (Vercel Blob, Bunny Stream, Mux, CDN próprio)
 * deixa de ser uma decisão de código — basta trocar a URL.
 */

export type DetachSource = () => void;

const NOOP: DetachSource = () => {};

function isHls(src: string): boolean {
  return /\.m3u8($|\?)/i.test(src);
}

function hasNativeHls(video: HTMLVideoElement): boolean {
  return video.canPlayType("application/vnd.apple.mpegurl") !== "";
}

export async function attachSource(
  video: HTMLVideoElement,
  src: string,
): Promise<DetachSource> {
  if (!isHls(src) || hasNativeHls(video)) {
    video.src = src;
    return () => {
      video.removeAttribute("src");
      video.load();
    };
  }

  try {
    const { default: Hls } = await import("hls.js");

    if (!Hls.isSupported()) {
      // Sem MSE: tentamos a atribuição direta como último recurso.
      video.src = src;
      return NOOP;
    }

    const hls = new Hls({ enableWorker: true, lowLatencyMode: false });
    hls.loadSource(src);
    hls.attachMedia(video);

    return () => hls.destroy();
  } catch {
    // Falha ao carregar o hls.js não pode derrubar a página.
    video.src = src;
    return NOOP;
  }
}
