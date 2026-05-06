import { EVENT_DETAILS, WEDDING_DATE_ISO, RSVP_DEADLINE_ISO } from "@/lib/constants/event-data";
import { formatEventDate } from "@/lib/formatters/date-format";

export function QuickFactsBand() {
  const quickFacts = [
    {
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      label: "Ngày cử hành",
      value: formatEventDate(WEDDING_DATE_ISO),
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Địa điểm",
      value: EVENT_DETAILS[0].value,
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      label: "Trang phục",
      value: EVENT_DETAILS[3].value,
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "RSVP trước",
      value: formatEventDate(RSVP_DEADLINE_ISO),
    },
  ];

  return (
    <section
      aria-label="Thông tin nhanh về sự kiện"
      className="border-y border-rose-200/30 bg-rose-50/20 py-8 sm:py-10"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {quickFacts.map((fact) => (
          <div key={fact.label} className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-rose-600/10 text-rose-600">
              {fact.icon}
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-rose-600/80">
              {fact.label}
            </p>
            <p className="mt-2 text-base font-medium leading-7 text-rose-950">
              {fact.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
