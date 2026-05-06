import { EVENT_DETAILS } from "@/lib/constants/event-data";

export default function EventDetailsSection() {
  return (
    <section
      id="event-details"
      aria-labelledby="event-details-heading"
      className="space-y-8 rounded-[2rem] bg-white/75 px-6 py-8 shadow-sm ring-1 ring-rose-200/30 sm:px-8 sm:py-10"
    >
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-rose-600">Lên kế hoạch tham dự</p>
        <h2 id="event-details-heading" className="text-2xl font-semibold tracking-tight text-rose-950 sm:text-3xl">
          Chi tiết sự kiện
        </h2>
      </div>

      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {EVENT_DETAILS.map((detail) => (
          <article key={detail.label} className="border-b border-rose-200/50 pb-6 last:border-b-0 sm:last:border-b sm:[&:nth-last-child(-n+2)]:border-b-0">
            <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-rose-600/90">{detail.label}</h3>
            <p className="mt-3 text-lg font-medium leading-8 text-rose-950">{detail.value}</p>
            {detail.supportingText ? (
              <p className="mt-2 text-sm leading-6 text-rose-800/70">{detail.supportingText}</p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
