import { TRAVEL_GUIDANCE } from "@/lib/constants/event-data";

export function TravelSection() {
  if (TRAVEL_GUIDANCE.length === 0) {
    return null;
  }

  return (
    <section
      id="travel"
      aria-labelledby="travel-heading"
      className="space-y-6"
    >
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-rose-600">
          Hướng dẫn di chuyển
        </p>
        <h2 id="travel-heading" className="font-serif text-2xl font-semibold tracking-tight text-rose-950 sm:text-3xl">
          Thông tin hữu ích cho chuyến đi
        </h2>
      </div>

      <div className="space-y-5">
        {TRAVEL_GUIDANCE.map((item) => (
          <article key={item.title} className="border-b border-rose-200/30 pb-5 last:border-b-0 last:pb-0">
            <h3 className="text-lg font-medium text-rose-950">{item.title}</h3>
            <p className="mt-2 text-sm font-medium text-rose-900/70">{item.summary}</p>
            <p className="mt-3 text-sm leading-7 text-rose-800/60">{item.details}</p>
            {item.link && (
              <a
                href={item.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-rose-600 underline decoration-rose-300 underline-offset-4 transition hover:text-rose-500 hover:decoration-rose-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2"
              >
                {item.link.label}
                <svg
                  aria-hidden="true"
                  focusable="false"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
