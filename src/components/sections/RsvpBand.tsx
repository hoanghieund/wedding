"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { CALENDAR_EVENT, EVENT_DATA, type AttendanceStatus } from "@/lib/constants/event-data";
import { buildGoogleCalendarUrl } from "@/lib/formatters/calendar";

type RsvpFormState = {
  guestName: string;
  attendanceStatus: AttendanceStatus;
  attendeeCount: string;
  guestMessage: string;
  website: string;
};

const initialFormState: RsvpFormState = {
  guestName: "",
  attendanceStatus: "attending",
  attendeeCount: "1",
  guestMessage: "",
  website: "",
};

const STATUS_ICONS: Record<AttendanceStatus, string> = {
  attending: "✅",
  not_attending: "❌",
  maybe: "🤔",
};

export function RsvpBand() {
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState<RsvpFormState>(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { ref, isInView } = useInView(0.1);
  const calendarUrl = buildGoogleCalendarUrl(CALENDAR_EVENT);
  const isNotAttending = formState.attendanceStatus === "not_attending";
  const msgLength = formState.guestMessage.length;
  const maxMsgLength = EVENT_DATA.rsvp.validation.maxMessageLength;

  const updateFormField = <Field extends keyof RsvpFormState>(
    field: Field,
    value: RsvpFormState[Field],
  ) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  return (
    <section
      id="rsvp"
      aria-labelledby="rsvp-heading"
      ref={ref}
      className="relative overflow-hidden border-t border-[var(--border-soft)] py-20 sm:py-24 lg:py-28"
    >
      {/* Decorative script watermark */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none select-none text-[8rem] sm:text-[14rem] font-script text-[var(--accent)]/5 whitespace-nowrap z-0">
        Xác Nhận
      </div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section heading */}
        <div className={`space-y-4 text-center transition-all duration-700 ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent-soft)]">
            {EVENT_DATA.copy.sections.rsvpChapter}
          </p>
          <h2
            id="rsvp-heading"
            className="font-script text-5xl text-[var(--accent)] sm:text-6xl"
          >
            {EVENT_DATA.copy.sections.rsvpTitle}
          </h2>
          <div className="mx-auto h-px w-24 section-divider" />
          <p className="copy-muted text-lg leading-8 max-w-lg mx-auto">{EVENT_DATA.copy.sections.rsvpDescription}</p>
        </div>

        {/* Form card */}
        <div className={`mt-10 rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface)] p-8 shadow-[var(--glow-soft)] sm:p-10 transition-all duration-700 delay-200 ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}>
          {submitted ? (
            /* ——— Success state ——— */
            <div className="text-center py-8">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--accent)]/10 border-2 border-[var(--accent-soft)]/30">
                <span className="text-4xl" aria-hidden="true">💌</span>
              </div>
              <p className="font-display-serif text-2xl text-[var(--accent)] mb-3">
                {EVENT_DATA.copy.sections.rsvpSuccessLabel}
              </p>
              <p className="copy-muted text-lg leading-7 max-w-md mx-auto">
                {EVENT_DATA.copy.sections.rsvpSuccessMessage}
              </p>
            </div>
          ) : (
            /* ——— Form ——— */
            <form
              className="space-y-6"
              onSubmit={async (event) => {
                event.preventDefault();
                setSubmitting(true);
                setError("");

                try {
                  const response = await fetch("/api/rsvp", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      ...formState,
                      attendeeCount: Number(formState.attendeeCount),
                    }),
                  });
                  const result = (await response.json()) as { ok?: boolean; error?: string };

                  if (!response.ok || !result.ok) {
                    setError(result.error || EVENT_DATA.rsvp.errors.submitFailed);
                    return;
                  }

                  setSubmitted(true);
                } catch {
                  setError(EVENT_DATA.rsvp.errors.submitFailed);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {/* Honeypot */}
              <label className="hidden">
                <span>{EVENT_DATA.rsvp.labels.honeypot}</span>
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formState.website}
                  onChange={(event) => updateFormField("website", event.target.value)}
                />
              </label>

              {/* Guest name */}
              <fieldset className="space-y-1.5">
                <label className="flex items-center gap-2">
                  <span aria-hidden="true">👤</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)]">
                    {EVENT_DATA.rsvp.labels.guestName}
                  </span>
                </label>
                <input
                  type="text"
                  required
                  minLength={EVENT_DATA.rsvp.validation.minNameLength}
                  maxLength={EVENT_DATA.rsvp.validation.maxNameLength}
                  value={formState.guestName}
                  onChange={(event) => updateFormField("guestName", event.target.value)}
                  placeholder={EVENT_DATA.rsvp.placeholders.guestName}
                  className="focus-ring-accent w-full rounded-xl border border-[var(--border-soft)] bg-[var(--bg)] px-4 py-3.5 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-secondary)]/60 focus:border-[var(--accent-soft)]/40"
                />
              </fieldset>

              {/* Attendance status */}
              <fieldset className="space-y-1.5">
                <label className="flex items-center gap-2">
                  <span aria-hidden="true">💬</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)]">
                    {EVENT_DATA.rsvp.labels.attendanceStatus}
                  </span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.entries(EVENT_DATA.rsvp.attendanceStatuses) as [AttendanceStatus, string][]).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => updateFormField("attendanceStatus", value)}
                      className={`flex flex-col items-center gap-1 rounded-xl border px-3 py-3 text-xs transition-all duration-300 ${
                        formState.attendanceStatus === value
                          ? "border-[var(--accent-soft)] bg-[var(--accent)]/10 text-[var(--accent)]"
                          : "border-[var(--border-soft)] bg-[var(--bg)] text-[var(--text-secondary)] hover:border-[var(--border-soft)]/80"
                      }`}
                    >
                      <span className="text-lg">{STATUS_ICONS[value]}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.1em]">
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* Attendee count */}
              <fieldset className="space-y-1.5">
                <label className="flex items-center gap-2">
                  <span aria-hidden="true">👥</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)]">
                    {EVENT_DATA.rsvp.labels.attendeeCount}
                  </span>
                </label>
                <select
                  disabled={isNotAttending}
                  value={isNotAttending ? "0" : formState.attendeeCount}
                  onChange={(event) => updateFormField("attendeeCount", event.target.value)}
                  className="focus-ring-accent w-full rounded-xl border border-[var(--border-soft)] bg-[var(--bg)] px-4 py-3.5 text-[var(--text-primary)] outline-none transition disabled:cursor-not-allowed disabled:opacity-40 appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23d4a574' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: `right 1rem center`,
                    backgroundRepeat: `no-repeat`,
                    backgroundSize: `1.25rem`,
                  }}
                >
                  {Array.from(
                    { length: EVENT_DATA.rsvp.validation.maxAttendeeCount + 1 },
                    (_, count) => (
                      <option key={count} className="bg-[#0a0e27]" value={String(count)}>
                        {count} người
                      </option>
                    ),
                  )}
                </select>
              </fieldset>

              {/* Guest message */}
              <fieldset className="space-y-1.5">
                <label className="flex items-center gap-2">
                  <span aria-hidden="true">💌</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)]">
                    {EVENT_DATA.rsvp.labels.guestMessage}
                  </span>
                </label>
                <textarea
                  maxLength={maxMsgLength}
                  value={formState.guestMessage}
                  onChange={(event) => updateFormField("guestMessage", event.target.value)}
                  placeholder={EVENT_DATA.rsvp.placeholders.guestMessage}
                  className="focus-ring-accent min-h-28 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--bg)] px-4 py-3.5 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-secondary)]/60 focus:border-[var(--accent-soft)]/40 resize-y"
                />
                <div className="flex justify-end">
                  <span className={`font-mono text-[10px] tracking-wider ${
                    msgLength > maxMsgLength * 0.9
                      ? "text-red-400"
                      : "text-[var(--text-secondary)]/50"
                  }`}>
                    {msgLength}/{maxMsgLength}
                  </span>
                </div>
              </fieldset>

              {/* Error */}
              {error ? (
                <p className="rounded-xl border border-red-300/30 bg-red-950/30 px-4 py-3 text-sm leading-6 text-red-100">
                  {error}
                </p>
              ) : null}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="group w-full rounded-full border border-[var(--accent-soft)] bg-gradient-to-r from-[var(--accent-soft)] to-[var(--accent)] px-8 py-4 font-display-serif text-lg tracking-[0.15em] text-[var(--bg)] shadow-[0_18px_50px_rgba(212,165,116,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(244,228,193,0.26)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {EVENT_DATA.rsvp.labels.submitting}
                  </span>
                ) : (
                  EVENT_DATA.rsvp.labels.submit
                )}
              </button>
            </form>
          )}

          {/* Calendar link */}
          <div className="mt-6 text-center">
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent-soft)] transition hover:text-[var(--accent)]"
            >
              <span aria-hidden="true">📅</span>
              <span className="underline decoration-[var(--accent-soft)]/30 underline-offset-4 group-hover:decoration-[var(--accent)]/50">
                Thêm vào lịch
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
