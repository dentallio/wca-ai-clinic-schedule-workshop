import { describe, expect, it } from "vitest";
import { findEntry, removeEntry, setLeave, setShift } from "@/domain/schedule";
import type { ScheduleEntry } from "@/domain/types";

const date = "2026-07-20";
const personId = "doctor-wang-demo";

describe("schedule entry transitions", () => {
  it("creates one shift entry for an empty cell", () => {
    const entries = setShift([], date, personId, "morning", 1);
    expect(entries).toEqual([
      {
        id: `${date}_${personId}`,
        date,
        personId,
        state: "shift",
        shiftId: "morning",
        updatedAt: 1,
      },
    ]);
  });

  it("changes the same cell without creating a duplicate", () => {
    const morning = setShift([], date, personId, "morning", 1);
    const afternoon = setShift(morning, date, personId, "afternoon", 2);
    expect(afternoon).toHaveLength(1);
    expect(findEntry(afternoon, date, personId)?.shiftId).toBe("afternoon");
  });

  it("replaces a shift with leave and removes shiftId", () => {
    const shift = setShift([], date, personId, "morning", 1);
    const leave = setLeave(shift, date, personId, 2);
    expect(leave).toHaveLength(1);
    expect(leave[0]).toMatchObject({ state: "leave" });
    expect(leave[0]).not.toHaveProperty("shiftId");
  });

  it("clears exactly one selected cell", () => {
    const entries: ScheduleEntry[] = [
      ...setShift([], date, personId, "morning", 1),
      ...setShift([], "2026-07-21", personId, "evening", 2),
    ];
    expect(removeEntry(entries, `${date}_${personId}`)).toHaveLength(1);
  });
});
