import { ImageResponse } from "next/og";
import { EVENT_DATA } from "@/lib/constants/event-data";
import { formatEventDate } from "@/lib/formatters/date-format";

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
            {EVENT_DATA.event.title}
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
            {EVENT_DATA.couple.combinedName}
          </h1>
          <p
            style={{
              fontSize: 24,
              color: "#57534e",
              marginBottom: 48,
            }}
          >
            {EVENT_DATA.event.description}
          </p>
          <p
            style={{
              fontSize: 16,
              color: "#78716c",
            }}
          >
            {formatEventDate(EVENT_DATA.event.startISO)} · {EVENT_DATA.venues.groom.addressLocality}
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
            {EVENT_DATA.rsvp.labels.submit} & Chi tiết
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
