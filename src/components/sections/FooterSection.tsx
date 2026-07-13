import { COUPLE, EVENT_DATA } from "@/lib/constants/event-data";

export function FooterSection() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--border-soft)] py-16 sm:py-20">
      {/* Decorative gradient top bar */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-soft)]/50 to-transparent" />

      {/* Decorative script watermark */}
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none text-[10rem] sm:text-[16rem] font-script text-[var(--accent)]/3 whitespace-nowrap z-0 leading-none">
        {COUPLE.initials}
      </div>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center gap-6 text-center">

          {/* Thank you message */}
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent-soft)]">
            {EVENT_DATA.copy.footer.thankYouEyebrow}
          </p>
          <p className="font-body-serif text-lg leading-8 text-[var(--text-secondary)] max-w-md">
            {EVENT_DATA.copy.footer.thankYouMessage}
          </p>

          {/* Decorative divider */}
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-[var(--accent-soft)]/30" />
            <span aria-hidden="true" className="text-xs text-[var(--accent-soft)]/50">✦</span>
            <span className="h-px w-12 bg-[var(--accent-soft)]/30" />
          </div>

          {/* Couple names in script */}
          <p className="font-script text-3xl text-[var(--accent)] sm:text-4xl">
            {COUPLE.combinedName}
          </p>

          {/* Wedding date */}
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-secondary)]/60">
            {EVENT_DATA.event.title}
          </p>

          {/* Back to top */}
          <a
            href="#hero"
            className="group mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--surface)] px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent-soft)] transition-all duration-300 hover:border-[var(--accent-soft)]/30 hover:text-[var(--accent)] hover:shadow-[var(--glow-soft)]"
          >
            <svg className="h-3.5 w-3.5 -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {EVENT_DATA.copy.footer.backToTop}
          </a>

          {/* Copyright */}
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)]/40 mt-2">
            &copy; {new Date().getFullYear()} {COUPLE.combinedName}
          </p>
        </div>
      </div>
    </footer>
  );
}
