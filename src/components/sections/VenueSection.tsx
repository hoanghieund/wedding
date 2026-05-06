interface VenueSectionProps {
  venueName: string;
  addressLines: string[];
  mapUrl: string;
  note?: string;
}

export function VenueSection({
  venueName,
  addressLines,
  mapUrl,
  note,
}: VenueSectionProps) {
  return (
    <section
      id="venue"
      aria-labelledby="venue-heading"
      className="grid gap-12 lg:grid-cols-2 lg:items-center"
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-rose-600">
            Địa điểm cử hành
          </p>
          <h2 id="venue-heading" className="font-serif text-4xl font-semibold tracking-tight text-rose-950 sm:text-5xl">
            Nơi hân hạnh đón tiếp quý vị
          </h2>
        </div>

        <div className="space-y-4 text-base leading-8 text-rose-900/70">
          <h3 className="font-serif text-2xl font-medium text-rose-950">{venueName}</h3>
          <div className="space-y-1">
            {addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          {note && (
            <p className="text-sm leading-7 text-rose-800/60">{note}</p>
          )}
        </div>

        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-rose-600 px-7 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Xem chỉ dẫn đường đi
        </a>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-rose-100/40 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-200/30 to-rose-300/20" />
      </div>
    </section>
  );
}
