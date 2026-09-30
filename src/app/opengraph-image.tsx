import { ImageResponse } from "next/og";
import { EVENT_DATA } from "@/lib/constants/event-data";
import { formatDateTime } from "@/lib/formatters/date-format";

export const runtime = "edge";

export const alt = EVENT_DATA.site.ogImage.alt;
export const size = {
  width: EVENT_DATA.site.ogImage.width,
  height: EVENT_DATA.site.ogImage.height,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            "radial-gradient(circle at 75% 20%, rgba(212, 165, 116, 0.16), transparent 38%), linear-gradient(135deg, #0a0e27 0%, #101728 58%, #1a2332 100%)",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
          color: "#fff8ee",
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
              color: "#d4a574",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            {EVENT_DATA.event.title}
          </p>
          <h1
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#f4e4c1",
              letterSpacing: "-0.02em",
              marginBottom: 24,
            }}
          >
            {EVENT_DATA.couple.combinedName}
          </h1>
          <p
            style={{
              fontSize: 24,
              color: "#fff8ee",
              marginBottom: 48,
            }}
          >
            {EVENT_DATA.event.description}
          </p>
          <p
            style={{
              fontSize: 16,
              color: "#fff8ee",
            }}
          >
            {formatDateTime(EVENT_DATA.event.startTime)} · {EVENT_DATA.venues.groom.addressLocality}
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
              color: "#d4a574",
            }}
          >
            {EVENT_DATA.rsvp.labels.submit} · Chi tiết
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
