import { describe, expect, it } from "vitest";
import { EVENT_DATA } from "@/lib/constants/event-data";
import {
  formatRsvpSheetRow,
  validateRsvpPayload,
} from "./rsvp";

describe("validateRsvpPayload", () => {
  it("accepts a valid RSVP submission and normalizes whitespace", () => {
    const result = validateRsvpPayload({
      guestName: "  Nguyen Van A  ",
      attendanceStatus: "attending",
      attendeeCount: 2,
      guestMessage: "  Congratulations!  ",
      website: "",
    });

    expect(result.success).toBe(true);
    if (!result.success) return;

    expect(result.data).toEqual({
      guestName: "Nguyen Van A",
      attendanceStatus: "attending",
      attendeeCount: 2,
      guestMessage: "Congratulations!",
      source: EVENT_DATA.rsvp.source,
    });
  });

  it("rejects honeypot submissions", () => {
    const result = validateRsvpPayload({
      guestName: "Nguyen Van A",
      attendanceStatus: "attending",
      attendeeCount: 1,
      guestMessage: "",
      website: "https://spam.example",
    });

    expect(result.success).toBe(false);
    if (result.success) return;

    expect(result.error).toBe(EVENT_DATA.rsvp.errors.invalidSubmission);
  });

  it("sets attendee count to zero when the guest is not attending", () => {
    const result = validateRsvpPayload({
      guestName: "Nguyen Van A",
      attendanceStatus: "not_attending",
      attendeeCount: 4,
      guestMessage: "",
      website: "",
    });

    expect(result.success).toBe(true);
    if (!result.success) return;

    expect(result.data.attendeeCount).toBe(0);
  });

  it("rejects invalid names, statuses, counts, and long messages", () => {
    const result = validateRsvpPayload({
      guestName: "A",
      attendanceStatus: "yes",
      attendeeCount: 99,
      guestMessage: "x".repeat(501),
      website: "",
    });

    expect(result.success).toBe(false);
    if (result.success) return;

    expect(result.fieldErrors).toEqual({
      guestName: EVENT_DATA.rsvp.errors.guestName,
      attendanceStatus: EVENT_DATA.rsvp.errors.attendanceStatus,
      attendeeCount: EVENT_DATA.rsvp.errors.attendeeCount,
      guestMessage: EVENT_DATA.rsvp.errors.guestMessage,
    });
  });
});

describe("formatRsvpSheetRow", () => {
  it("formats an RSVP into the agreed Google Sheet column order using Vietnamese display text", () => {
    const row = formatRsvpSheetRow(
      {
        guestName: "Nguyen Van A",
        attendanceStatus: "maybe",
        attendeeCount: 2,
        guestMessage: "See you soon",
        source: EVENT_DATA.rsvp.source,
      },
      new Date("2026-05-28T10:20:30.000Z"),
    );

    expect(row).toEqual([
      "2026/05/28 17:20",
      "Nguyen Van A",
      EVENT_DATA.rsvp.attendanceStatuses.maybe,
      2,
      "See you soon",
      EVENT_DATA.rsvp.sourceLabel,
    ]);
  });

  it("formats attendance statuses with the same Vietnamese text shown in the form", () => {
    expect(
      formatRsvpSheetRow({
        guestName: "Guest",
        attendanceStatus: "attending",
        attendeeCount: 1,
        guestMessage: "",
        source: EVENT_DATA.rsvp.source,
      })[2],
    ).toBe(EVENT_DATA.rsvp.attendanceStatuses.attending);
    expect(
      formatRsvpSheetRow({
        guestName: "Guest",
        attendanceStatus: "not_attending",
        attendeeCount: 0,
        guestMessage: "",
        source: EVENT_DATA.rsvp.source,
      })[2],
    ).toBe(EVENT_DATA.rsvp.attendanceStatuses.not_attending);
    expect(
      formatRsvpSheetRow({
        guestName: "Guest",
        attendanceStatus: "maybe",
        attendeeCount: 1,
        guestMessage: "",
        source: EVENT_DATA.rsvp.source,
      })[2],
    ).toBe(EVENT_DATA.rsvp.attendanceStatuses.maybe);
  });
});
