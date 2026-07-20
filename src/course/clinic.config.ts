import type { CourseProfile } from "@/domain/types";

/**
 * Stage 2 的唯一客製入口。
 * 本檔所有名稱皆為從零建立的合成資料，不可換成真實診所名冊。
 */
export const courseProfile: CourseProfile = {
  clinicName: "微笑牙科（課程示範）",
  region: "台北市",
  appName: "微笑牙科排班系統",
  appOwner: "by 微笑牙科（課程示範）",
  shifts: [
    { id: "morning", label: "早診", start: "09:00", end: "12:00" },
    { id: "afternoon", label: "午診", start: "14:00", end: "17:00" },
    { id: "evening", label: "晚診", start: "18:00", end: "21:00" },
  ],
  people: [
    {
      id: "doctor-wang-demo",
      displayName: "王安禾 醫師",
      role: "doctor",
      title: "院長 / 植牙",
      color: "var(--coral-400)",
      availability: [
        { weekday: 1, shiftId: "morning" },
        { weekday: 3, shiftId: "evening" },
      ],
    },
    {
      id: "doctor-lin-demo",
      displayName: "林予晴 醫師",
      role: "doctor",
      title: "主治 / 矯正",
      color: "var(--mint-400)",
    },
    {
      id: "doctor-chen-demo",
      displayName: "陳思齊 醫師",
      role: "doctor",
      title: "主治 / 一般",
      color: "var(--sun-300)",
    },
    { id: "assistant-an-demo", displayName: "周以安", role: "assistant", department: "植牙", color: "var(--coral-200)" },
    { id: "assistant-yu-demo", displayName: "許庭妤", role: "assistant", department: "跟診", color: "var(--mint-200)" },
    { id: "assistant-le-demo", displayName: "陳可樂", role: "assistant", department: "矯正", color: "var(--sun-200)" },
    { id: "assistant-qing-demo", displayName: "林雨晴", role: "assistant", department: "櫃台", color: "var(--coral-100)" },
    { id: "assistant-xin-demo", displayName: "蔡語欣", role: "assistant", department: "跟診", color: "var(--mint-100)" },
    { id: "assistant-ning-demo", displayName: "張予甯", role: "assistant", department: "消毒", color: "var(--sun-100)" },
    { id: "assistant-wei-demo", displayName: "吳書瑋", role: "assistant", department: "植牙", color: "var(--coral-200)" },
    { id: "assistant-ru-demo", displayName: "黃心如", role: "assistant", department: "矯正", color: "var(--mint-200)" },
  ],
};
