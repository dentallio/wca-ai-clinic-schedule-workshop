"use client";

import { COURSE_DATA_VERSION } from "@/course/safety";
import { createScheduleRepository } from "@/data/create-schedule-repository";
import { isScheduleEntry, scheduleEntryId } from "@/domain/schedule";
import type {
  CourseExport,
  RepositoryMode,
  ScheduleEntry,
  SyncState,
} from "@/domain/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface ScheduleContextValue {
  entries: ScheduleEntry[];
  mode: RepositoryMode;
  syncState: SyncState;
  error: string | null;
  saveShift(date: string, personId: string, shiftId: string): Promise<void>;
  saveLeave(date: string, personId: string): Promise<void>;
  clearEntry(date: string, personId: string): Promise<void>;
  importEntries(value: unknown): Promise<number>;
  clearAll(): Promise<void>;
}

const ScheduleContext = createContext<ScheduleContextValue | null>(null);

export function ScheduleProvider({ children }: { children: ReactNode }) {
  const repository = useMemo(() => createScheduleRepository(), []);
  const [entries, setEntries] = useState<ScheduleEntry[]>([]);
  const [syncState, setSyncState] = useState<SyncState>("connecting");
  const [error, setError] = useState<string | null>(null);

  useEffect(
    () =>
      repository.subscribe(
        (nextEntries) => {
          setEntries(nextEntries);
          setSyncState("synced");
          setError(null);
        },
        (nextError) => {
          setError(nextError.message);
          setSyncState("error");
        },
      ),
    [repository],
  );

  const save = useCallback(
    async (entry: ScheduleEntry) => {
      setSyncState("saving");
      setError(null);
      try {
        await repository.save(entry);
        if (repository.mode === "local") setSyncState("synced");
      } catch (nextError) {
        setError(nextError instanceof Error ? nextError.message : "儲存失敗");
        setSyncState("error");
      }
    },
    [repository],
  );

  const value = useMemo<ScheduleContextValue>(
    () => ({
      entries,
      mode: repository.mode,
      syncState,
      error,
      async saveShift(date, personId, shiftId) {
        await save({
          id: scheduleEntryId(date, personId),
          date,
          personId,
          state: "shift",
          shiftId,
          updatedAt: Date.now(),
        });
      },
      async saveLeave(date, personId) {
        await save({
          id: scheduleEntryId(date, personId),
          date,
          personId,
          state: "leave",
          updatedAt: Date.now(),
        });
      },
      async clearEntry(date, personId) {
        setSyncState("saving");
        try {
          await repository.remove(scheduleEntryId(date, personId));
          if (repository.mode === "local") setSyncState("synced");
        } catch (nextError) {
          setError(nextError instanceof Error ? nextError.message : "刪除失敗");
          setSyncState("error");
        }
      },
      async importEntries(input) {
        const source = input as Partial<CourseExport>;
        if (
          !source ||
          source.kind !== "clinic-schedule-workshop" ||
          source.version !== COURSE_DATA_VERSION ||
          !Array.isArray(source.entries)
        ) {
          throw new Error("這不是相容的課程排班匯出檔");
        }
        const nextEntries = source.entries.filter(isScheduleEntry);
        if (nextEntries.length !== source.entries.length) {
          throw new Error("匯出檔含有無法辨識的班表資料");
        }
        setSyncState("saving");
        await repository.replaceAll(nextEntries);
        if (repository.mode === "local") setSyncState("synced");
        return nextEntries.length;
      },
      async clearAll() {
        setSyncState("saving");
        await repository.replaceAll([]);
        if (repository.mode === "local") setSyncState("synced");
      },
    }),
    [entries, repository, save, syncState, error],
  );

  return <ScheduleContext.Provider value={value}>{children}</ScheduleContext.Provider>;
}

export function useSchedule(): ScheduleContextValue {
  const value = useContext(ScheduleContext);
  if (!value) throw new Error("useSchedule 必須在 ScheduleProvider 內使用");
  return value;
}
