import { ImageResponse } from "next/og";

export const runtime = "edge";

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
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#000000",
          color: "#DBDBDB",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -1 }}>
          NYU Stern
        </div>
        <div style={{ marginTop: 24, fontSize: 34, fontWeight: 500, opacity: 0.8 }}>
          Entrepreneurship &amp; Emerging Growth
        </div>
        <div style={{ marginTop: 28, fontSize: 26, fontWeight: 400, opacity: 0.7, maxWidth: 900 }}>
          Where NYU&apos;s founders and investors are made.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

