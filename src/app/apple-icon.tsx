import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b1c17",
        }}
      >
        <svg width="112" height="112" viewBox="0 0 32 32">
          <path d="M16 5.5v21" stroke="#b68e5d" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="16" cy="10" r="2.6" fill="#b68e5d" />
          <circle cx="16" cy="16" r="2.6" fill="#0b1c17" stroke="#b68e5d" strokeWidth="1.5" />
          <circle cx="16" cy="22" r="2.6" fill="#0b1c17" stroke="#b68e5d" strokeWidth="1.5" />
        </svg>
      </div>
    ),
    size,
  );
}
