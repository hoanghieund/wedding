import { NextResponse } from "next/server";
import { EVENT_DATA } from "@/lib/constants/event-data";
import { appendRsvpSubmissionToSheet } from "@/lib/google-sheets";
import { validateRsvpPayload } from "@/lib/rsvp";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: EVENT_DATA.rsvp.errors.invalidRequestBody },
      { status: 400 },
    );
  }

  const validation = validateRsvpPayload(
    typeof payload === "object" && payload !== null ? payload : {},
  );

  if (!validation.success) {
    return NextResponse.json(
      {
        ok: false,
        error: validation.error,
        fieldErrors: validation.fieldErrors,
      },
      { status: 400 },
    );
  }

  try {
    await appendRsvpSubmissionToSheet(validation.data);
  } catch (error) {
    console.error("Failed to append RSVP to Google Sheets:", error);

    return NextResponse.json(
      { ok: false, error: EVENT_DATA.rsvp.errors.serverSubmitFailed },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
