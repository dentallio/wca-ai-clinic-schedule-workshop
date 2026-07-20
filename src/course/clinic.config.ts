import type { CourseProfile } from "@/domain/types";

/**
 * 階段 2 的主要練習檔。
 * 只使用從零建立的虛構名稱，不要貼入真實診所班表。
 */
export const courseProfile: CourseProfile = {
  clinicName: "牙科排班課程 Demo",
  shifts: [
    { id: "morning", label: "早診", start: "09:00", end: "12:00" },
    { id: "afternoon", label: "午診", start: "14:00", end: "17:00" },
    { id: "evening", label: "晚診", start: "18:00", end: "21:00" },
  ],
  people: [
    { id: "doctor-demo-a", displayName: "示範醫師 A（虛構）", role: "doctor" },
    { id: "assistant-demo-a", displayName: "示範助理 A（虛構）", role: "assistant" },
    { id: "assistant-demo-b", displayName: "示範助理 B（虛構）", role: "assistant" },
  ],
};
