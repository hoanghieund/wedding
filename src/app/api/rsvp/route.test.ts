import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";
import { appendRsvpSubmissionToSheet } from "@/lib/google-sheets";
import { EVENT_DATA } from "@/lib/constants/event-data";

vi.mock("@/lib/google-sheets", () => ({
  appendRsvpSubmissionToSheet: vi.fn(),
}));

const mockedAppendRsvpSubmissionToSheet = vi.mocked(appendRsvpSubmissionToSheet);

const postJson = (body: unknown) =>
  POST(
    new Request("http://localhost:3000/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  );

describe("POST /api/rsvp", () => {
  beforeEach(() => {
    mockedAppendRsvpSubmissionToSheet.mockReset();
  });

  it("appends a valid RSVP submission to Google Sheets", async () => {
    mockedAppendRsvpSubmissionToSheet.mockResolvedValue(undefined);

    const response = await postJson({
      guestName: "  Nguyen Van A  ",
      attendanceStatus: "attending",
      attendeeCount: "2",
      guestMessage: "  See you soon  ",
      website: "",
    });

    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(response.status).toBe(200);
    expect(mockedAppendRsvpSubmissionToSheet).toHaveBeenCalledWith({
      guestName: "Nguyen Van A",
      attendanceStatus: "attending",
      attendeeCount: 2,
      guestMessage: "See you soon",
      source: EVENT_DATA.rsvp.source,
    });
  });

  it("rejects invalid submissions before appending to Google Sheets", async () => {
    const response = await postJson({
      guestName: "A",
      attendanceStatus: "yes",
      attendeeCount: 99,
      guestMessage: "",
      website: "",
    });

    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.ok).toBe(false);
    expect(body.fieldErrors).toMatchObject({
      guestName: EVENT_DATA.rsvp.errors.guestName,
      attendanceStatus: EVENT_DATA.rsvp.errors.attendanceStatus,
      attendeeCount: EVENT_DATA.rsvp.errors.attendeeCount,
    });
    expect(mockedAppendRsvpSubmissionToSheet).not.toHaveBeenCalled();
  });

  it("rejects honeypot submissions before appending to Google Sheets", async () => {
    const response = await postJson({
      guestName: "Nguyen Van A",
      attendanceStatus: "attending",
      attendeeCount: 1,
      guestMessage: "",
      website: "https://spam.example",
    });

    await expect(response.json()).resolves.toEqual({
      ok: false,
      error: EVENT_DATA.rsvp.errors.invalidSubmission,
    });
    expect(response.status).toBe(400);
    expect(mockedAppendRsvpSubmissionToSheet).not.toHaveBeenCalled();
  });

  it("returns a safe error when Google Sheets append fails", async () => {
    mockedAppendRsvpSubmissionToSheet.mockRejectedValue(new Error("private google error"));

    const response = await postJson({
      guestName: "Nguyen Van A",
      attendanceStatus: "maybe",
      attendeeCount: 1,
      guestMessage: "",
      website: "",
    });

    await expect(response.json()).resolves.toEqual({
      ok: false,
      error: EVENT_DATA.rsvp.errors.serverSubmitFailed,
    });
    expect(response.status).toBe(502);
  });
});
