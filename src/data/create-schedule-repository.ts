import { hasFirebaseCourseConfig } from "@/course/firebase.config";
import { createFirestoreScheduleRepository } from "./firestore-schedule-repository";
import { createLocalScheduleRepository } from "./local-schedule-repository";
import type { ScheduleRepository } from "./schedule-repository";

export function createScheduleRepository(): ScheduleRepository {
  return hasFirebaseCourseConfig()
    ? createFirestoreScheduleRepository()
    : createLocalScheduleRepository();
}
