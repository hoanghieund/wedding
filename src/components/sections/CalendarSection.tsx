import { CALENDAR_EVENT } from "@/lib/constants/event-data";
import { buildGoogleCalendarUrl } from "@/lib/formatters/calendar";
import { formatEventDate } from "@/lib/formatters/date-format";

export function CalendarSection() {
  const calendarUrl = buildGoogleCalendarUrl(CALENDAR_EVENT);

  return (
    <section
      id="calendar"
      aria-labelledby="calendar-heading"
      className="rounded-[2rem] bg-white/75 px-6 py-8 shadow-sm ring-1 ring-rose-200/30 sm:px-8 sm:py-9"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-rose-600">
            Lưu lịch
          </p>
          <h2 id="calendar-heading" className="text-2xl font-semibold tracking-tight text-rose-950 sm:text-3xl">
            Đừng bỏ lỡ ngày trọng đại
          </h2>
        </div>

        <div className="space-y-2 text-base leading-7 text-rose-800/80">
          <p className="text-lg font-medium text-rose-950">{CALENDAR_EVENT.title}</p>
          <p>
            <time dateTime={CALENDAR_EVENT.startTime}>
              {formatEventDate(CALENDAR_EVENT.startTime)}
            </time>
          </p>
          <p>{CALENDAR_EVENT.location}</p>
        </div>

        <a
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-rose-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-50"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {CALENDAR_EVENT.ctaLabel}
        </a>
      </div>
    </section>
  );
}
