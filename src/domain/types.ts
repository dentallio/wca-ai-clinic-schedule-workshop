export type PersonRole = "doctor" | "assistant";
export type EntryState = "shift" | "leave";

export interface ShiftDefinition {
  id: string;
  label: string;
  start: string;
  end: string;
}

export interface CoursePerson {
  id: string;
  displayName: string;
  role: PersonRole;
  availability?: Array<{ weekday: number; shiftId: string }>;
}

export interface CourseProfile {
  clinicName: string;
  shifts: ShiftDefinition[];
  people: CoursePerson[];
}

export interface ScheduleEntry {
  id: string;
  date: string;
  personId: string;
  state: EntryState;
  shiftId?: string;
  note?: string;
  updatedAt: number;
}

export interface CourseExport {
  kind: "clinic-schedule-workshop";
  version: number;
  exportedAt: string;
  clinicName: string;
  entries: ScheduleEntry[];
}

export type SyncState = "connecting" | "synced" | "saving" | "error";
export type RepositoryMode = "local" | "firestore";
