import type { RepositoryMode, ScheduleEntry } from "@/domain/types";

export interface ScheduleRepository {
  mode: RepositoryMode;
  subscribe(
    onEntries: (entries: ScheduleEntry[]) => void,
    onError: (error: Error) => void,
  ): () => void;
  save(entry: ScheduleEntry): Promise<void>;
  remove(id: string): Promise<void>;
  replaceAll(entries: ScheduleEntry[]): Promise<void>;
}
