import { CONTACT_ACTIONS, CALENDAR_EVENT } from "@/lib/constants/event-data";
import { buildGoogleCalendarUrl } from "@/lib/formatters/calendar";

export function RsvpBand() {
  const calendarUrl = buildGoogleCalendarUrl(CALENDAR_EVENT);

  return (
    <section
      id="rsvp"
      aria-labelledby="rsvp-heading"
      className="border-t border-rose-200/30 bg-gradient-to-br from-rose-50/30 via-white/50 to-pink-50/30 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2
          id="rsvp-heading"
          className="font-serif text-3xl font-semibold text-rose-950 sm:text-4xl lg:text-5xl"
        >
          Xác nhận tham dự
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-rose-800/80">
          Kính mong quý vị xác nhận tham dự trước ngày 30 tháng 10 năm 2026 để gia đình chúng tôi có thể chuẩn bị chu đáo.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={CONTACT_ACTIONS[0].href}
            className="inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-full bg-rose-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 sm:w-auto"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Gọi điện xác nhận
          </a>
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-full border-2 border-rose-600 bg-white px-8 py-4 text-base font-semibold text-rose-600 transition hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 sm:w-auto"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Thêm vào lịch
          </a>
        </div>

        <div className="mt-12 space-y-3 border-t border-rose-200/30 pt-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-rose-600/80">
            Liên hệ gia đình
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            {CONTACT_ACTIONS.map((action) => (
              <a
                key={action.href}
                href={action.href}
                className="text-base font-medium text-rose-800 underline decoration-rose-300 underline-offset-4 transition hover:text-rose-600 hover:decoration-rose-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2"
              >
                {action.hint}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
