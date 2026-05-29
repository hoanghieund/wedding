import { google } from "googleapis";
import { EVENT_DATA } from "@/lib/constants/event-data";
import { formatRsvpSheetRow, type RsvpSubmission } from "@/lib/rsvp";

type GoogleSheetsConfig = {
  clientEmail: string;
  privateKey: string;
  spreadsheetId: string;
  sheetName: string;
};

const getRequiredEnv = (name: string) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

const getSheetRange = (sheetName: string) => {
  const columnCount = EVENT_DATA.rsvp.sheetColumns.length;
  const endColumn = String.fromCharCode("A".charCodeAt(0) + columnCount - 1);
  return `${sheetName}!A:${endColumn}`;
};

export function getGoogleSheetsConfig(): GoogleSheetsConfig {
  return {
    clientEmail: getRequiredEnv("GOOGLE_SHEETS_CLIENT_EMAIL"),
    privateKey: getRequiredEnv("GOOGLE_SHEETS_PRIVATE_KEY").replace(/\\n/g, "\n"),
    spreadsheetId: getRequiredEnv("GOOGLE_SHEETS_SPREADSHEET_ID"),
    sheetName: process.env.GOOGLE_SHEETS_SHEET_NAME || EVENT_DATA.rsvp.sheetName,
  };
}

export async function appendRsvpSubmissionToSheet(submission: RsvpSubmission) {
  const config = getGoogleSheetsConfig();
  const auth = new google.auth.JWT({
    email: config.clientEmail,
    key: config.privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: config.spreadsheetId,
    range: getSheetRange(config.sheetName),
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [formatRsvpSheetRow(submission)],
    },
  });
}
