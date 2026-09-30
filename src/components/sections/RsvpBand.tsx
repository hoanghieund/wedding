"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { EVENT_DATA, type AttendanceStatus } from "@/lib/constants/event-data";
import { buildGoogleCalendarUrl } from "@/lib/formatters/calendar";
import { WeddingIcon, type WeddingIconName } from "@/components/ui/WeddingIcon";

type RsvpFormState = {
  guestName: string;
  attendanceStatus: AttendanceStatus;
  attendeeCount: string;
  guestMessage: string;
  website: string;
};

type RsvpField = "guestName" | "attendanceStatus" | "attendeeCount" | "guestMessage";
type RsvpFieldErrors = Partial<Record<RsvpField, string>>;

const initialFormState: RsvpFormState = {
  guestName: "",
  attendanceStatus: "attending",
  attendeeCount: "1",
  guestMessage: "",
  website: "",
};

const STATUS_ICONS: Record<AttendanceStatus, WeddingIconName> = {
  attending: "check",
  not_attending: "cross",
  maybe: "help",
};

export function RsvpBand() {
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState<RsvpFormState>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<RsvpFieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { ref, isInView } = useInView(0.1);
  const calendarUrl = buildGoogleCalendarUrl(EVENT_DATA.calendar.event);
  const isNotAttending = formState.attendanceStatus === "not_attending";
  const minAttendeeCount = formState.attendanceStatus === "attending" ? 1 : 0;
  const maxMsgLength = EVENT_DATA.rsvp.validation.maxMessageLength;
  const msgLength = formState.guestMessage.length;

  const clearFieldError = (field: RsvpField) => {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const updateFormField = <Field extends keyof RsvpFormState>(
    field: Field,
    value: RsvpFormState[Field],
  ) => {
    setFormState((current) => ({ ...current, [field]: value }));
    if (field !== "website") clearFieldError(field);
  };

  return (
    <section
      id="rsvp"
      aria-labelledby="rsvp-heading"
      ref={ref}
      className="relative overflow-hidden border-t border-[var(--border-soft)] py-20 sm:py-24 lg:py-28"
    >
      {/* Decorative script watermark */}
      <div aria-hidden="true" className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none select-none text-[8rem] sm:text-[14rem] font-script text-[var(--accent)]/5 whitespace-nowrap z-0">
        Xác Nhận
      </div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section heading */}
        <div className={`space-y-4 text-center transition-all duration-700 ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent-soft)]">
            {EVENT_DATA.copy.sections.rsvpChapter}
          </p>
          <h2
            id="rsvp-heading"
            className="chapter-title text-4xl sm:text-5xl"
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
            <div role="status" className="text-center py-8">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--accent)]/10 border-2 border-[var(--accent-soft)]/30">
                <WeddingIcon className="h-10 w-10" name="letter" />
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
              aria-describedby={error ? "rsvp-submit-error" : undefined}
              onSubmit={async (event) => {
                event.preventDefault();
                setSubmitting(true);
                setError("");
                setFieldErrors({});

                try {
                  const response = await fetch("/api/rsvp", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      ...formState,
                      attendeeCount: Number(formState.attendeeCount),
                    }),
                  });
                  const rawResult = await response.json();
                  const result =
                    rawResult && typeof rawResult === "object"
                      ? (rawResult as {
                          ok?: boolean;
                          error?: string;
                          fieldErrors?: RsvpFieldErrors;
                        })
                      : {};

                  if (!response.ok || !result.ok) {
                    setError(result.error || EVENT_DATA.rsvp.errors.submitFailed);
                    setFieldErrors(result.fieldErrors ?? {});
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
                <label htmlFor="rsvp-guest-name" className="flex items-center gap-2">
                  <WeddingIcon className="h-4 w-4" name="person" />
                  <span className="font-medium font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent-soft)]">
                    {EVENT_DATA.rsvp.labels.guestName}
                  </span>
                </label>
                <input
                  id="rsvp-guest-name"
                  type="text"
                  required
                  minLength={EVENT_DATA.rsvp.validation.minNameLength}
                  maxLength={EVENT_DATA.rsvp.validation.maxNameLength}
                  value={formState.guestName}
                  onChange={(event) => updateFormField("guestName", event.target.value)}
                  placeholder={EVENT_DATA.rsvp.placeholders.guestName}
                  aria-invalid={Boolean(fieldErrors.guestName)}
                  aria-describedby={fieldErrors.guestName ? "rsvp-guest-name-error" : undefined}
                  className="focus-ring-accent w-full rounded-xl border border-[var(--border-soft)] bg-[var(--bg)] px-4 py-3.5 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-secondary)]/60 focus:border-[var(--accent-soft)]/40"
                />
                {fieldErrors.guestName ? (
                  <p id="rsvp-guest-name-error" className="text-sm leading-6 text-red-100">
                    {fieldErrors.guestName}
                  </p>
                ) : null}
              </fieldset>

              {/* Attendance status */}
              <fieldset
                className="space-y-1.5"
                aria-describedby={fieldErrors.attendanceStatus ? "rsvp-attendance-error" : undefined}
              >
                <legend id="rsvp-attendance-status" className="flex items-center gap-2">
                  <WeddingIcon className="h-4 w-4" name="chat" />
                  <span className="font-medium font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent-soft)]">
                    {EVENT_DATA.rsvp.labels.attendanceStatus}
                  </span>
                </legend>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.entries(EVENT_DATA.rsvp.attendanceStatuses) as [AttendanceStatus, string][]).map(([value, label]) => (
                    <label
                      key={value}
                      className={`focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--accent)] flex min-h-[44px] cursor-pointer flex-col items-center gap-1 rounded-xl border px-3 py-3 text-xs transition-all duration-300 ${
                        formState.attendanceStatus === value
                          ? "border-[var(--accent-soft)] bg-[var(--accent)]/10 text-[var(--accent)] ring-1 ring-[var(--accent-soft)]/70"
                          : "border-[var(--border-soft)] bg-[var(--bg)] text-[var(--text-secondary)] hover:border-[var(--border-soft)]/80"
                      }`}
                    >
                      <input
                        className="sr-only"
                        type="radio"
                        name="attendanceStatus"
                        value={value}
                        checked={formState.attendanceStatus === value}
                        aria-describedby={fieldErrors.attendanceStatus ? "rsvp-attendance-error" : undefined}
                        onChange={() => {
                          setFormState((current) => ({
                            ...current,
                            attendanceStatus: value,
                            attendeeCount:
                              value === "attending" && current.attendeeCount === "0"
                                ? "1"
                                : current.attendeeCount,
                          }));
                          clearFieldError("attendanceStatus");
                          clearFieldError("attendeeCount");
                        }}
                      />
                      <WeddingIcon className="h-5 w-5" name={STATUS_ICONS[value]} />
                      <span className="font-mono text-xs uppercase tracking-[0.1em]">
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
                {fieldErrors.attendanceStatus ? (
                  <p id="rsvp-attendance-error" className="text-sm leading-6 text-red-100">
                    {fieldErrors.attendanceStatus}
                  </p>
                ) : null}
              </fieldset>

              {/* Attendee count */}
              <fieldset className="space-y-1.5">
                <label htmlFor="rsvp-attendee-count" className="flex items-center gap-2">
                  <WeddingIcon className="h-4 w-4" name="person" />
                  <span className="font-medium font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent-soft)]">
                    {EVENT_DATA.rsvp.labels.attendeeCount}
                  </span>
                </label>
                <select
                  id="rsvp-attendee-count"
                  disabled={isNotAttending}
                  value={isNotAttending ? "0" : formState.attendeeCount}
                  onChange={(event) => updateFormField("attendeeCount", event.target.value)}
                  aria-invalid={Boolean(fieldErrors.attendeeCount)}
                  aria-describedby={fieldErrors.attendeeCount ? "rsvp-attendee-count-error" : undefined}
                  className="focus-ring-accent w-full appearance-none rounded-xl border border-[var(--border-soft)] bg-[var(--bg)] px-4 py-3.5 text-[var(--text-primary)] outline-none transition disabled:cursor-not-allowed disabled:opacity-40"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23d4a574' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: `right 1rem center`,
                    backgroundRepeat: `no-repeat`,
                    backgroundSize: `1.25rem`,
                  }}
                >
                  {Array.from(
                    {
                      length:
                        EVENT_DATA.rsvp.validation.maxAttendeeCount -
                        minAttendeeCount +
                        1,
                    },
                    (_, index) => {
                      const count = minAttendeeCount + index;
                      return (
                        <option key={count} className="bg-[var(--bg)]" value={String(count)}>
                          {count} người
                        </option>
                      );
                    },
                  )}
                </select>
                {fieldErrors.attendeeCount ? (
                  <p id="rsvp-attendee-count-error" className="text-sm leading-6 text-red-100">
                    {fieldErrors.attendeeCount}
                  </p>
                ) : null}
              </fieldset>

              {/* Guest message */}
              <fieldset className="space-y-1.5">
                <label htmlFor="rsvp-message" className="flex items-center gap-2">
                  <WeddingIcon className="h-4 w-4" name="gift" />
                  <span className="font-medium font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent-soft)]">
                    {EVENT_DATA.rsvp.labels.guestMessage}
                  </span>
                </label>
                <textarea
                  id="rsvp-message"
                  maxLength={maxMsgLength}
                  value={formState.guestMessage}
                  onChange={(event) => updateFormField("guestMessage", event.target.value)}
                  placeholder={EVENT_DATA.rsvp.placeholders.guestMessage}
                  aria-invalid={Boolean(fieldErrors.guestMessage)}
                  aria-describedby={fieldErrors.guestMessage ? "rsvp-message-error" : undefined}
                  className="focus-ring-accent min-h-28 w-full resize-y rounded-xl border border-[var(--border-soft)] bg-[var(--bg)] px-4 py-3.5 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-secondary)]/60 focus:border-[var(--accent-soft)]/40"
                />
                {fieldErrors.guestMessage ? (
                  <p id="rsvp-message-error" className="text-sm leading-6 text-red-100">
                    {fieldErrors.guestMessage}
                  </p>
                ) : null}
                <div className="flex justify-end">
                  <span aria-live="polite" className={`font-mono text-xs font-medium tracking-wider ${
                    msgLength > maxMsgLength * 0.9
                      ? "text-red-400"
                      : "text-[var(--text-secondary)]"
                  }`}>
                    {msgLength}/{maxMsgLength} ký tự
                  </span>
                </div>
              </fieldset>

              {/* Error */}
              {error ? (
                <p id="rsvp-submit-error" role="alert" aria-live="assertive" className="rounded-xl border border-red-300/30 bg-red-950/30 px-4 py-3 text-sm leading-6 text-red-100">
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
                    <svg aria-hidden="true" className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
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
              <WeddingIcon className="h-4 w-4" name="calendar" />
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
