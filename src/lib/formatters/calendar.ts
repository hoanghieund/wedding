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
  const formatDateForGoogle = (isoString: string): string => {
    const date = new Date(isoString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
  };

  const params = new URLSearchParams({
    text: event.title,
    dates: `${formatDateForGoogle(event.startTime)}/${formatDateForGoogle(event.endTime)}`,
    details: event.description,
    location: event.location,
    ctz: "Asia/Ho_Chi_Minh",
  });

  return `${baseUrl}&${params.toString()}`;
}
