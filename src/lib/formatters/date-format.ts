import { EVENT_DATA } from "@/lib/constants/event-data";

const DATE_TIME_FORMAT_OPTIONS = {
  timeZone: EVENT_DATA.event.timeZone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
} satisfies Intl.DateTimeFormatOptions;

export function formatDateTime(isoStringOrDate: string | Date): string {
  const date = isoStringOrDate instanceof Date ? isoStringOrDate : new Date(isoStringOrDate);
  const parts = new Intl.DateTimeFormat("en-CA", DATE_TIME_FORMAT_OPTIONS)
    .formatToParts(date)
    .reduce<Record<string, string>>((acc, part) => {
      if (part.type !== "literal") acc[part.type] = part.value;
      return acc;
    }, {});

  return `${parts.year}/${parts.month}/${parts.day} ${parts.hour}:${parts.minute}`;
}


export function formatTime(isoString: string): string {
  const date = new Date(isoString);

  return date.toLocaleTimeString("vi-VN", {
    timeZone: EVENT_DATA.event.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
