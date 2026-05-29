import { EVENT_DATA, type AttendanceStatus } from "@/lib/constants/event-data";
import { formatDateTime } from "@/lib/formatters/date-format";

export const ATTENDANCE_STATUSES = Object.keys(
  EVENT_DATA.rsvp.attendanceStatuses,
) as AttendanceStatus[];

export type RsvpSubmission = {
  guestName: string;
  attendanceStatus: AttendanceStatus;
  attendeeCount: number;
  guestMessage: string;
  source: typeof EVENT_DATA.rsvp.source;
};

type RsvpPayload = {
  guestName?: unknown;
  attendanceStatus?: unknown;
  attendeeCount?: unknown;
  guestMessage?: unknown;
  website?: unknown;
};

type FieldErrors = Partial<Record<"guestName" | "attendanceStatus" | "attendeeCount" | "guestMessage", string>>;

export type RsvpValidationResult =
  | { success: true; data: RsvpSubmission }
  | { success: false; error: string; fieldErrors?: FieldErrors };

const { validation, errors } = EVENT_DATA.rsvp;

const isAttendanceStatus = (value: unknown): value is AttendanceStatus =>
  typeof value === "string" && ATTENDANCE_STATUSES.includes(value as AttendanceStatus);

const normalizeText = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const normalizeAttendeeCount = (value: unknown) => {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "") return Number(value);
  return Number.NaN;
};

export function validateRsvpPayload(payload: RsvpPayload): RsvpValidationResult {
  if (normalizeText(payload.website).length > 0) {
    return { success: false, error: errors.invalidSubmission };
  }

  const guestName = normalizeText(payload.guestName);
  const attendanceStatus = payload.attendanceStatus;
  const attendeeCount = normalizeAttendeeCount(payload.attendeeCount);
  const guestMessage = normalizeText(payload.guestMessage);
  const fieldErrors: FieldErrors = {};

  if (guestName.length < validation.minNameLength || guestName.length > validation.maxNameLength) {
    fieldErrors.guestName = errors.guestName;
  }

  if (!isAttendanceStatus(attendanceStatus)) {
    fieldErrors.attendanceStatus = errors.attendanceStatus;
  }

  if (!Number.isInteger(attendeeCount) || attendeeCount < 0 || attendeeCount > validation.maxAttendeeCount) {
    fieldErrors.attendeeCount = errors.attendeeCount;
  }

  if (guestMessage.length > validation.maxMessageLength) {
    fieldErrors.guestMessage = errors.guestMessage;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      error: errors.checkFields,
      fieldErrors,
    };
  }

  return {
    success: true,
    data: {
      guestName,
      attendanceStatus: attendanceStatus as AttendanceStatus,
      attendeeCount: attendanceStatus === "not_attending" ? 0 : attendeeCount,
      guestMessage,
      source: EVENT_DATA.rsvp.source,
    },
  };
}

export function formatRsvpSheetRow(submission: RsvpSubmission, submittedAt = new Date()) {
  return [
    formatDateTime(submittedAt),
    submission.guestName,
    EVENT_DATA.rsvp.attendanceStatuses[submission.attendanceStatus],
    submission.attendeeCount,
    submission.guestMessage,
    EVENT_DATA.rsvp.sourceLabel,
  ];
}
