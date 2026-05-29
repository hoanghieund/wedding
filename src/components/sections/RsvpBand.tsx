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

export function RsvpBand() {
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState<RsvpFormState>(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { ref, isInView } = useInView();
  const calendarUrl = buildGoogleCalendarUrl(CALENDAR_EVENT);
  const isNotAttending = formState.attendanceStatus === "not_attending";

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
      className={`border-t border-[var(--border-soft)] py-20 sm:py-24 lg:py-28 reveal-hidden ${isInView ? "animate-fade-up" : ""}`}
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center">
          <p className="section-label">{EVENT_DATA.copy.sections.rsvpChapter}</p>
          <h2
            id="rsvp-heading"
            className="font-script text-5xl text-[var(--accent)] sm:text-6xl"
          >
            {EVENT_DATA.copy.sections.rsvpTitle}
          </h2>
          <p className="copy-muted text-lg leading-8">{EVENT_DATA.copy.sections.rsvpDescription}</p>
        </div>

        <div className="section-shell mt-10 rounded-[2rem] p-8 shadow-[var(--glow-soft)] sm:p-10">
          {submitted ? (
            <div className="text-center">
              <p className="section-label">{EVENT_DATA.copy.sections.rsvpSuccessLabel}</p>
              <p className="mt-4 text-lg leading-7 text-[var(--text-primary)]">{EVENT_DATA.copy.sections.rsvpSuccessMessage}</p>
            </div>
          ) : (
            <form
              className="space-y-5"
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
                    setError(
                      result.error || EVENT_DATA.rsvp.errors.submitFailed,
                    );
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

              <label className="block">
                <span className="section-label text-[10px]">{EVENT_DATA.rsvp.labels.guestName}</span>
                <input
                  type="text"
                  required
                  minLength={EVENT_DATA.rsvp.validation.minNameLength}
                  maxLength={EVENT_DATA.rsvp.validation.maxNameLength}
                  value={formState.guestName}
                  onChange={(event) => updateFormField("guestName", event.target.value)}
                  placeholder={EVENT_DATA.rsvp.placeholders.guestName}
                  className="focus-ring-accent mt-2 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-secondary)]"
                />
              </label>

              <label className="block">
                <span className="section-label text-[10px]">{EVENT_DATA.rsvp.labels.attendanceStatus}</span>
                <select
                  value={formState.attendanceStatus}
                  onChange={(event) =>
                    updateFormField("attendanceStatus", event.target.value as AttendanceStatus)
                  }
                  className="focus-ring-accent mt-2 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] outline-none transition"
                >
                  {Object.entries(EVENT_DATA.rsvp.attendanceStatuses).map(([value, label]) => (
                    <option key={value} className="bg-[#0a0e27]" value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="section-label text-[10px]">{EVENT_DATA.rsvp.labels.attendeeCount}</span>
                <select
                  disabled={isNotAttending}
                  value={isNotAttending ? "0" : formState.attendeeCount}
                  onChange={(event) => updateFormField("attendeeCount", event.target.value)}
                  className="focus-ring-accent mt-2 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
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
              </label>

              <label className="block">
                <span className="section-label text-[10px]">{EVENT_DATA.rsvp.labels.guestMessage}</span>
                <textarea
                  maxLength={EVENT_DATA.rsvp.validation.maxMessageLength}
                  value={formState.guestMessage}
                  onChange={(event) => updateFormField("guestMessage", event.target.value)}
                  placeholder={EVENT_DATA.rsvp.placeholders.guestMessage}
                  className="focus-ring-accent mt-2 min-h-28 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-secondary)]"
                />
              </label>

              {error ? (
                <p className="rounded-xl border border-red-300/30 bg-red-950/30 px-4 py-3 text-sm leading-6 text-red-100">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className={`w-full rounded-full border border-[var(--accent-soft)] bg-gradient-to-r from-[var(--accent-soft)] to-[var(--accent)] px-8 py-4 font-body-serif text-lg tracking-[0.15em] text-[var(--bg)] shadow-[0_18px_50px_rgba(212,165,116,0.28)] transition hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(244,228,193,0.26)] reveal-hidden ${
                  isInView ? "animate-zoom-in stagger-1" : ""
                } disabled:cursor-not-allowed disabled:opacity-70`}
              >
                {submitting ? EVENT_DATA.rsvp.labels.submitting : EVENT_DATA.rsvp.labels.submit}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent-soft)] underline decoration-[var(--accent-soft)]/30 underline-offset-4 transition hover:text-[var(--accent)] hover:decoration-[var(--accent-soft)]"
            >
              Thêm vào lịch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
