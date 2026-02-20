import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "flex-start",
          background:
            "radial-gradient(circle at 15% 10%, #ffffff 0%, #f2f3f4 45%, #e8edf2 100%)",
          color: "#22222a",
          display: "flex",
          flexDirection: "column",
          fontFamily: "sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div style={{ color: "#d2673b", fontSize: 28, letterSpacing: 6, marginBottom: 18 }}>
          pngwn
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, maxWidth: 900 }}>
          Personalized weather omniscience.
        </div>
        <div style={{ fontSize: 34, marginTop: 28, opacity: 0.85 }}>
          What to wear, learned from you.
        </div>
      </div>
    ),
    size,
  );
}
