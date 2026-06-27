import { COUPLE, EVENT_DATA } from "@/lib/constants/event-data";

export function FooterSection() {
  return (
    <footer className="border-t border-[var(--border-soft)] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="font-body-serif text-sm text-[var(--text-secondary)]">
            {COUPLE.combinedName} &middot; {EVENT_DATA.event.title}
          </p>

          <a
            href="#hero"
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent-soft)] transition hover:text-[var(--accent)]"
          >
            Lên đầu trang
        </a>
        </div>
      </div>
    </footer>
  );
}
