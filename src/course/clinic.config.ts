import type { CourseProfile } from "@/domain/types";

/**
 * 階段 2 的主要練習檔。
 * 只使用從零建立的虛構名稱，不要貼入真實診所班表。
 */
export const courseProfile: CourseProfile = {
  clinicName: "微笑牙科（課程示範）",
  shifts: [
    { id: "morning", label: "早診", start: "09:00", end: "12:00" },
    { id: "afternoon", label: "午診", start: "14:00", end: "17:00" },
    { id: "evening", label: "晚診", start: "18:00", end: "21:00" },
  ],
  people: [
    {
      id: "doctor-wang-demo",
      displayName: "王醫師（虛構）",
      role: "doctor",
      availability: [
        { weekday: 1, shiftId: "evening" },
        { weekday: 3, shiftId: "evening" },
      ],
    },
    { id: "doctor-lin-demo", displayName: "林醫師（虛構）", role: "doctor" },
    { id: "doctor-chen-demo", displayName: "陳醫師（虛構）", role: "doctor" },
    { id: "assistant-an-demo", displayName: "小安助理（虛構）", role: "assistant" },
    { id: "assistant-yu-demo", displayName: "小妤助理（虛構）", role: "assistant" },
    { id: "assistant-le-demo", displayName: "小樂助理（虛構）", role: "assistant" },
    { id: "assistant-qing-demo", displayName: "小晴助理（虛構）", role: "assistant" },
  ],
};
