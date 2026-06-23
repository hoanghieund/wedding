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
  return new Intl.DateTimeFormat("en-CA", DATE_TIME_FORMAT_OPTIONS).format(date).replace(/-/g, "/");
}


