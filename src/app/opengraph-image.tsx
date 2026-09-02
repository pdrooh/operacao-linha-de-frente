import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { content } from "@/config/content";
import { site } from "@/config/site";
import { seo } from "@/config/seo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = seo.ogAlt;

/**
 * Imagem de compartilhamento própria — não é screenshot da página. Mesmos
 * tokens da landing: fundo profundo, régua de latão, tipografia Archivo.
 */
export default async function OpenGraphImage() {
  const archivo = await readFile(
    join(process.cwd(), "src/assets/fonts/Archivo-SemiBold.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#0b1c17",
          backgroundImage:
            "radial-gradient(900px 500px at 88% 0%, rgba(39,93,74,0.55), transparent), repeating-linear-gradient(to right, rgba(182,142,93,0.05) 0 1px, transparent 1px 120px)",
          fontFamily: "Archivo",
          color: "#fbfaf9",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 44, height: 2, backgroundColor: "#b68e5d" }} />
          <div
            style={{
              fontSize: 20,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#b68e5d",
            }}
          >
            {site.producer}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 62,
              lineHeight: 1.05,
              letterSpacing: -2.4,
              maxWidth: 940,
            }}
          >
            {content.hero.title}
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 27,
              lineHeight: 1.35,
              color: "rgba(251,250,249,0.62)",
              maxWidth: 780,
            }}
          >
            {content.hero.subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            borderTop: "1px solid rgba(182,142,93,0.34)",
            paddingTop: 26,
            fontSize: 21,
            letterSpacing: 3.4,
            textTransform: "uppercase",
            color: "rgba(251,250,249,0.55)",
          }}
        >
          <span style={{ color: "#b68e5d" }}>{site.name}</span>
          <span>31 aulas</span>
          <span>7 módulos</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Archivo", data: archivo, style: "normal", weight: 600 }],
    },
  );
}
