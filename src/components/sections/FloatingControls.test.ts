import { describe, expect, it } from "vitest";
import { shouldHideMobileRail } from "./FloatingControls";

describe("FloatingControls mobile rail visibility", () => {
  it("hides the rail while schedule or venue content is on screen", () => {
    expect(
      shouldHideMobileRail({
        isHeroVisible: false,
        isRsvpVisible: false,
        isLogisticsVisible: true,
        hasFocusedControl: false,
      }),
    ).toBe(true);
  });

  it("hides the rail while RSVP content is on screen", () => {
    expect(
      shouldHideMobileRail({
        isHeroVisible: false,
        isRsvpVisible: true,
        isLogisticsVisible: false,
        hasFocusedControl: false,
      }),
    ).toBe(true);
  });

  it("hides the rail while the hero is on screen", () => {
    expect(
      shouldHideMobileRail({
        isHeroVisible: true,
        isRsvpVisible: false,
        isLogisticsVisible: false,
        hasFocusedControl: false,
      }),
    ).toBe(true);
  });

  it("shows the rail when no obstructed content is visible", () => {
    expect(
      shouldHideMobileRail({
        isHeroVisible: false,
        isRsvpVisible: false,
        isLogisticsVisible: false,
        hasFocusedControl: false,
      }),
    ).toBe(false);
  });

  it("keeps the rail visible while focus is inside it", () => {
    expect(
      shouldHideMobileRail({
        isHeroVisible: false,
        isRsvpVisible: false,
        isLogisticsVisible: true,
        hasFocusedControl: true,
      }),
    ).toBe(false);
  });
});
