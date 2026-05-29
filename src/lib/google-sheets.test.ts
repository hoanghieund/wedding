import { afterEach, describe, expect, it, vi } from "vitest";
import { EVENT_DATA } from "@/lib/constants/event-data";
import { getGoogleSheetsConfig } from "./google-sheets";

describe("getGoogleSheetsConfig", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("requires the Google Sheets service account environment variables", () => {
    vi.stubEnv("GOOGLE_SHEETS_CLIENT_EMAIL", "");
    vi.stubEnv("GOOGLE_SHEETS_PRIVATE_KEY", "");
    vi.stubEnv("GOOGLE_SHEETS_SPREADSHEET_ID", "");
    vi.stubEnv("GOOGLE_SHEETS_SHEET_NAME", "");

    expect(() => getGoogleSheetsConfig()).toThrow(
      "Missing required environment variable: GOOGLE_SHEETS_CLIENT_EMAIL",
    );
  });

  it("normalizes escaped private key newlines and defaults the sheet name", () => {
    vi.stubEnv("GOOGLE_SHEETS_CLIENT_EMAIL", "wedding-rsvp@example.iam.gserviceaccount.com");
    vi.stubEnv("GOOGLE_SHEETS_PRIVATE_KEY", "-----BEGIN PRIVATE KEY-----\\nabc\\n-----END PRIVATE KEY-----\\n");
    vi.stubEnv("GOOGLE_SHEETS_SPREADSHEET_ID", "spreadsheet-id");
    vi.stubEnv("GOOGLE_SHEETS_SHEET_NAME", "");

    expect(getGoogleSheetsConfig()).toEqual({
      clientEmail: "wedding-rsvp@example.iam.gserviceaccount.com",
      privateKey: "-----BEGIN PRIVATE KEY-----\nabc\n-----END PRIVATE KEY-----\n",
      spreadsheetId: "spreadsheet-id",
      sheetName: EVENT_DATA.rsvp.sheetName,
    });
  });

  it("uses an explicit sheet name when configured", () => {
    vi.stubEnv("GOOGLE_SHEETS_CLIENT_EMAIL", "wedding-rsvp@example.iam.gserviceaccount.com");
    vi.stubEnv("GOOGLE_SHEETS_PRIVATE_KEY", "private-key");
    vi.stubEnv("GOOGLE_SHEETS_SPREADSHEET_ID", "spreadsheet-id");
    vi.stubEnv("GOOGLE_SHEETS_SHEET_NAME", "Guests");

    expect(getGoogleSheetsConfig().sheetName).toBe("Guests");
  });
});
