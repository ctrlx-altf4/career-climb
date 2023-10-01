import { formatTime, generateHourlyTimeListWithObjects } from "./utils";

describe("formatTime", () => {
  it('should return "Invalid input" for input < 100', () => {
    expect(formatTime(99)).toBe("Invalid input");
  });

  it('should return "Invalid input" for input > 2400', () => {
    expect(formatTime(2401)).toBe("Invalid input");
  });

  it("should format the time correctly in the AM", () => {
    expect(formatTime(845)).toBe("Invalid input");
    expect(formatTime(300)).toBe("03:00 AM");
  });

  it("should format the time correctly in the PM", () => {
    expect(formatTime(2200)).toBe("10:00 PM");
    expect(formatTime(2400)).toBe("12:00 PM");
    expect(formatTime(1400)).toBe("02:00 PM");
  });

  it("should handle noon (12:00 PM) correctly", () => {
    expect(formatTime(1200)).toBe("12:00 PM");
  });

  it("should handle midnight (12:00 AM) correctly", () => {
    expect(formatTime(0)).toBe("12:00 AM");
  });

  it("should pad single-digit hours and minutes with leading zeros", () => {
    expect(formatTime(900)).toBe("09:00 AM");
    expect(formatTime(315)).toBe("Invalid input");
  });
});

describe("generateHourlyTimeListWithObjects", () => {
  it("should generate an array with 24 time slots", () => {
    const timeList = generateHourlyTimeListWithObjects();
    expect(timeList).toHaveLength(24);
  });

  it("should format the time slots correctly", () => {
    const timeList = generateHourlyTimeListWithObjects();

    timeList.forEach((timeSlot, index) => {
      if (timeSlot.label === "12:00 AM") {
        expect(timeSlot.value).toBe("2400");
      }
      if (timeSlot.label === "11:00 AM") {
        expect(timeSlot.value).toBe("1100");
      }
      if (timeSlot.label === "11:00 PM") {
        expect(timeSlot.value).toBe("2300");
      }
      if (timeSlot.label === "12:00 PM") {
        expect(timeSlot.value).toBe("1200");
      }
    });
  });
});
