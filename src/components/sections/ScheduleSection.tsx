import { SCHEDULE_ITEMS } from "@/lib/constants/event-data";

export default function ScheduleSection() {
  return (
    <section
      id="schedule"
      aria-labelledby="schedule-heading"
      className="space-y-12"
    >
      <div className="space-y-3 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-rose-600">
          Lịch trình đám cưới
        </p>
        <h2
          id="schedule-heading"
          className="font-serif text-4xl font-semibold tracking-tight text-rose-950 sm:text-5xl"
        >
          Lịch trình trong ngày
        </h2>
      </div>

      <ol className="mx-auto max-w-3xl space-y-10">
        {SCHEDULE_ITEMS.map((item, index) => (
          <li key={`${item.time}-${item.title}`} className="relative border-l-2 border-rose-200/50 pl-8 sm:pl-10">
            <span className="absolute -left-[9px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 ring-4 ring-white" />
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-rose-600/80">
              {item.time}
            </p>
            <h3 className="mt-3 font-serif text-2xl font-semibold text-rose-950">
              {item.title}
            </h3>
            <p className="mt-3 text-base leading-8 text-rose-800/70">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
