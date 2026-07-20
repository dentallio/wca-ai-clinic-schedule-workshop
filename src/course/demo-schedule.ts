import { courseProfile } from "@/course/clinic.config";
import { CURRENT_WORKSHOP_STAGE } from "@/course/workshop-stage";
import { scheduleEntryId } from "@/domain/schedule";
import type { ScheduleEntry } from "@/domain/types";

export const DEMO_MONTH = { year: 2026, month: 7 } as const;

function dateString(day: number): string {
  return `${DEMO_MONTH.year}-${String(DEMO_MONTH.month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function rotate<T>(values: T[], offset: number): T[] {
  const start = offset % values.length;
  return [...values.slice(start), ...values.slice(0, start)];
}

/**
 * 固定且可重現的合成月班表，只用來讓學員打開專案就能看見原版成果樣貌。
 * 使用者清空資料後不會再次自動灌入；Firestore 也不會自動寫入這份示範資料。
 */
export function buildDemoSchedule(): ScheduleEntry[] {
  const doctors = courseProfile.people.filter((person) => person.role === "doctor");
  const assistants = courseProfile.people.filter((person) => person.role === "assistant");
  const entries: ScheduleEntry[] = [];

  for (let day = 1; day <= 31; day += 1) {
    const date = dateString(day);
    const weekday = new Date(`${date}T12:00:00`).getDay();
    if (weekday === 0) continue;

    const shifts = weekday === 6 ? courseProfile.shifts.slice(0, 2) : courseProfile.shifts;
    const doctorOrder = rotate(doctors, day);
    const assistantOrder = rotate(assistants, day * 2);

    shifts.forEach((shift, index) => {
      const doctor = doctorOrder[index % doctorOrder.length];
      entries.push({
        id: scheduleEntryId(date, doctor.id),
        date,
        personId: doctor.id,
        state: "shift",
        shiftId: shift.id,
        updatedAt: Date.UTC(2026, 6, day, index),
      });
    });

    const plannedAssistantCount = shifts.length * 2;
    const shortage = day % 11 === 0 ? 2 : day % 5 === 0 ? 1 : 0;
    assistantOrder.slice(0, plannedAssistantCount - shortage).forEach((assistant, index) => {
      const shift = shifts[Math.floor(index / 2) % shifts.length];
      entries.push({
        id: scheduleEntryId(date, assistant.id),
        date,
        personId: assistant.id,
        state: "shift",
        shiftId: shift.id,
        note: index % 3 === 0 ? "AI 建議" : undefined,
        updatedAt: Date.UTC(2026, 6, day, 6 + index),
      });
    });

    if (day % 4 === 0) {
      const leavePerson = assistantOrder.at(-1);
      if (leavePerson) {
        entries.push({
          id: scheduleEntryId(date, leavePerson.id),
          date,
          personId: leavePerson.id,
          state: "leave",
          updatedAt: Date.UTC(2026, 6, day, 20),
        });
      }
    }
  }

  return entries.sort((a, b) => a.id.localeCompare(b.id));
}

export const demoScheduleEntries = CURRENT_WORKSHOP_STAGE >= 2 ? buildDemoSchedule() : [];
