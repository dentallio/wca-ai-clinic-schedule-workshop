import { isScheduleEntry } from "@/domain/schedule";
import type { ScheduleEntry } from "@/domain/types";
import type { ScheduleRepository } from "./schedule-repository";

const STORAGE_KEY = "clinic-schedule-workshop:entries:v1";
const subscribers = new Set<(entries: ScheduleEntry[]) => void>();

function readEntries(initialEntries: ScheduleEntry[]): ScheduleEntry[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialEntries;
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isScheduleEntry) : [];
  } catch {
    return [];
  }
}

function writeEntries(entries: ScheduleEntry[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  subscribers.forEach((subscriber) => subscriber(entries));
}

export function createLocalScheduleRepository(initialEntries: ScheduleEntry[] = []): ScheduleRepository {
  return {
    mode: "local",
    subscribe(onEntries, onError) {
      const listener = () => {
        try {
          onEntries(readEntries(initialEntries));
        } catch (error) {
          onError(error instanceof Error ? error : new Error("無法讀取本機練習資料"));
        }
      };
      subscribers.add(onEntries);
      window.addEventListener("storage", listener);
      listener();
      return () => {
        subscribers.delete(onEntries);
        window.removeEventListener("storage", listener);
      };
    },
    async save(entry) {
      const entries = readEntries(initialEntries);
      writeEntries([...entries.filter((item) => item.id !== entry.id), entry]);
    },
    async remove(id) {
      writeEntries(readEntries(initialEntries).filter((entry) => entry.id !== id));
    },
    async replaceAll(entries) {
      writeEntries(entries);
    },
  };
}
