import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Lễ Cưới - Minh & An";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #fffaf6 0%, #fdf2f8 50%, #faf5ff 100%)",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              fontSize: 18,
              color: "#be185d",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Lễ Cưới
          </p>
          <h1
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#1c1917",
              letterSpacing: "-0.02em",
              marginBottom: 24,
            }}
          >
            Minh & An
          </h1>
          <p
            style={{
              fontSize: 24,
              color: "#57534e",
              marginBottom: 48,
            }}
          >
            Cùng Chung Vui Trong Ngày Trọng Đại
          </p>
          <p
            style={{
              fontSize: 16,
              color: "#78716c",
            }}
          >
            Ngày 22 tháng 11, 2026 · TP. Hồ Chí Minh
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: 14,
              color: "#a8a29e",
            }}
          >
            RSVP & Chi tiết
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
