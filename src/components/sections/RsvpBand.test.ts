import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { EVENT_DATA } from "@/lib/constants/event-data";
import { formatDateTime } from "@/lib/formatters/date-format";
import { RsvpBand, getFirstInvalidField } from "./RsvpBand";

describe("RsvpBand", () => {
  it("selects the first field error in form order", () => {
    expect(
      getFirstInvalidField({ attendeeCount: "count", guestName: "name" }),
    ).toBe("guestName");
    expect(
      getFirstInvalidField({
        guestMessage: "message",
        attendanceStatus: "status",
      }),
    ).toBe("attendanceStatus");
    expect(getFirstInvalidField({})).toBeUndefined();
  });

  it("renders the RSVP deadline beside the form", () => {
    const html = renderToStaticMarkup(createElement(RsvpBand));

    expect(html).toContain(EVENT_DATA.copy.quickFacts.rsvpDeadlineLabel);
    expect(html).toContain(formatDateTime(EVENT_DATA.rsvp.deadline));
  });
});
