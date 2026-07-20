import type { ScheduleEntry } from "./types";

export function scheduleEntryId(date: string, personId: string): string {
  return `${date}_${personId}`;
}

export function setShift(
  entries: ScheduleEntry[],
  date: string,
  personId: string,
  shiftId: string,
  now = Date.now(),
): ScheduleEntry[] {
  const next: ScheduleEntry = {
    id: scheduleEntryId(date, personId),
    date,
    personId,
    state: "shift",
    shiftId,
    updatedAt: now,
  };
  return replaceEntry(entries, next);
}

export function setLeave(
  entries: ScheduleEntry[],
  date: string,
  personId: string,
  now = Date.now(),
): ScheduleEntry[] {
  const next: ScheduleEntry = {
    id: scheduleEntryId(date, personId),
    date,
    personId,
    state: "leave",
    updatedAt: now,
  };
  return replaceEntry(entries, next);
}

export function replaceEntry(
  entries: ScheduleEntry[],
  next: ScheduleEntry,
): ScheduleEntry[] {
  return [...entries.filter((entry) => entry.id !== next.id), next].sort((a, b) =>
    a.id.localeCompare(b.id),
  );
}

export function removeEntry(entries: ScheduleEntry[], id: string): ScheduleEntry[] {
  return entries.filter((entry) => entry.id !== id);
}

export function findEntry(
  entries: ScheduleEntry[],
  date: string,
  personId: string,
): ScheduleEntry | undefined {
  return entries.find((entry) => entry.id === scheduleEntryId(date, personId));
}

export function isScheduleEntry(value: unknown): value is ScheduleEntry {
  if (!value || typeof value !== "object") return false;
  const entry = value as Partial<ScheduleEntry>;
  if (
    typeof entry.id !== "string" ||
    typeof entry.date !== "string" ||
    typeof entry.personId !== "string" ||
    typeof entry.updatedAt !== "number"
  ) {
    return false;
  }
  if (entry.state === "leave") return entry.shiftId === undefined;
  return entry.state === "shift" && typeof entry.shiftId === "string";
}
