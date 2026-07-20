import { describe, expect, it, vi } from "vitest";
import { createLocalScheduleRepository } from "@/data/local-schedule-repository";
import type { ScheduleEntry } from "@/domain/types";

const entry: ScheduleEntry = {
  id: "2026-07-20_doctor-wang-demo",
  date: "2026-07-20",
  personId: "doctor-wang-demo",
  state: "shift",
  shiftId: "morning",
  updatedAt: 1,
};

describe("local schedule repository", () => {
  it("persists and publishes changes", async () => {
    const repository = createLocalScheduleRepository();
    const listener = vi.fn();
    const unsubscribe = repository.subscribe(listener, vi.fn());

    await repository.save(entry);
    expect(listener).toHaveBeenLastCalledWith([entry]);

    await repository.remove(entry.id);
    expect(listener).toHaveBeenLastCalledWith([]);
    unsubscribe();
  });

  it("replaces all entries during import", async () => {
    const repository = createLocalScheduleRepository();
    await repository.replaceAll([entry]);
    const listener = vi.fn();
    const unsubscribe = repository.subscribe(listener, vi.fn());
    expect(listener).toHaveBeenCalledWith([entry]);
    unsubscribe();
  });
});
