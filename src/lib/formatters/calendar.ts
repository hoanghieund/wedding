import type { CALENDAR_EVENT } from "../constants/event-data";

type CalendarEventInfo = typeof CALENDAR_EVENT;

/**
 * Generates a Google Calendar URL for adding an event.
 *
 * @param event - Calendar event information
 * @returns Google Calendar URL with encoded event details
 */
export function buildGoogleCalendarUrl(event: CalendarEventInfo): string {
  const baseUrl = "https://www.google.com/calendar/render?action=TEMPLATE";

  // Convert ISO 8601 to Google Calendar format (YYYYMMDDTHHmmssZ)
  const formatDateForGoogle = (isoString: string): string =>
    new Date(isoString).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const params = new URLSearchParams({
    text: event.title,
    dates: `${formatDateForGoogle(event.startTime)}/${formatDateForGoogle(event.endTime)}`,
    details: event.description,
    location: event.location,
    ctz: "Asia/Ho_Chi_Minh",
  });

  return `${baseUrl}&${params.toString()}`;
}
