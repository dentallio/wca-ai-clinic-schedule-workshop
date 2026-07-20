"use client";

import { AlertTriangle, CircleCheck, Repeat2, UserMinus, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { courseProfile } from "@/course/clinic.config";
import { useSchedule } from "./ScheduleProvider";

const weekdays = ["日", "一", "二", "三", "四", "五", "六"];

function initials(name: string): string {
  return name.replace(/\s|醫師/g, "").slice(-2);
}

export function DayDrawer({ date, onClose }: { date: string; onClose(): void }) {
  const { entries, saveShift, saveLeave, clearEntry } = useSchedule();
  const [openPersonId, setOpenPersonId] = useState<string | null>(null);
  const [leavePersonId, setLeavePersonId] = useState("");
  const dayEntries = entries.filter((entry) => entry.date === date);
  const monthNumber = Number(date.slice(5, 7));
  const dayNumber = Number(date.slice(-2));
  const weekday = new Date(`${date}T12:00:00`).getDay();
  const assistants = courseProfile.people.filter((person) => person.role === "assistant");
  const visibleShifts = weekday === 6 ? courseProfile.shifts.slice(0, 2) : courseProfile.shifts;
  const leaveEntries = dayEntries.filter((entry) => entry.state === "leave");

  const availableAssistants = assistants.filter(
    (person) => !dayEntries.some((entry) => entry.personId === person.id),
  );

  async function replaceAssistant(currentId: string, shiftId: string) {
    const replacement = availableAssistants[0];
    if (!replacement) return;
    await clearEntry(date, currentId);
    await saveShift(date, replacement.id, shiftId);
    setOpenPersonId(null);
  }

  return (
    <>
      <button className="drawer-overlay" onClick={onClose} aria-label="關閉當日明細" />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="當日排班明細">
        <div className="drawer__head">
          <div>
            <div className="ui-eyebrow">當日明細 · 合成資料</div>
            <div className="drawer__title">{monthNumber} 月 {dayNumber} 日（{weekdays[weekday]}）</div>
          </div>
          <button className="drawer__close" onClick={onClose} aria-label="關閉"><X size={18} /></button>
        </div>

        <div className="drawer__body">
          {visibleShifts.map((shift) => {
            const shiftEntries = dayEntries.filter((entry) => entry.state === "shift" && entry.shiftId === shift.id);
            const doctorEntries = shiftEntries.filter((entry) => courseProfile.people.find((person) => person.id === entry.personId)?.role === "doctor");
            const assistantEntries = shiftEntries.filter((entry) => courseProfile.people.find((person) => person.id === entry.personId)?.role === "assistant");
            const gap = Math.max(0, 2 - assistantEntries.length);
            const recommended = availableAssistants[0];

            return (
              <section className="day-sess" key={shift.id}>
                <div className="day-sess__head">
                  <span className="day-sess__name">{shift.label}</span>
                  <span className="day-sess__time">{shift.start}–{shift.end}</span>
                  <span className="day-sess__cov" style={{ color: gap === 0 ? "var(--success)" : gap === 1 ? "var(--warning)" : "var(--danger)" }}>
                    ● {gap === 0 ? "人力充足" : gap === 1 ? "略吃緊" : "缺工"} {assistantEntries.length}/2
                  </span>
                </div>

                <div className="day-block-label">看診醫師</div>
                {doctorEntries.length === 0 && <p className="caption">尚未排入醫師</p>}
                {doctorEntries.map((entry) => {
                  const doctor = courseProfile.people.find((person) => person.id === entry.personId)!;
                  return (
                    <div className="day-doc" key={entry.id}>
                      <span className="cal__docdot" style={{ background: doctor.color, width: 10, height: 10 }} />
                      {doctor.displayName}
                      <span className="muted" style={{ marginLeft: "auto", fontSize: "var(--fs-xs)" }}>{doctor.title}</span>
                    </div>
                  );
                })}

                <div className="day-block-label">跟診助理（{assistantEntries.length}）</div>
                <div className="day-asst-list">
                  {assistantEntries.map((entry) => {
                    const assistant = courseProfile.people.find((person) => person.id === entry.personId)!;
                    const open = openPersonId === assistant.id;
                    return (
                      <div className="asst-row" key={entry.id}>
                        <button className={`day-asst ${open ? "day-asst--open" : ""}`} onClick={() => setOpenPersonId(open ? null : assistant.id)}>
                          <span className="ui-avatar ui-avatar--sm" style={{ background: assistant.color }}>{initials(assistant.displayName)}</span>
                          {assistant.displayName}
                          <span className="cal__ai" style={{ marginLeft: 4, color: entry.note === "AI 建議" ? undefined : "var(--success)" }}>
                            {entry.note === "AI 建議" ? "✦ AI 建議" : "✓ 已確認"}
                          </span>
                          <span className="day-asst__dept">🦷 {assistant.department}</span>
                        </button>
                        {open && (
                          <div className="asst-menu course-asst-menu" role="menu">
                            {entry.note === "AI 建議" && (
                              <button className="asst-menu__item" onClick={() => saveShift(date, assistant.id, shift.id)}>
                                <CircleCheck size={16} color="var(--success)" />確認排班
                              </button>
                            )}
                            <button className="asst-menu__item" disabled={!recommended} onClick={() => replaceAssistant(assistant.id, shift.id)}>
                              <Repeat2 size={16} />換人{recommended ? `（推薦：${recommended.displayName}）` : ""}
                            </button>
                            <button className="asst-menu__item asst-menu__item--danger" onClick={() => clearEntry(date, assistant.id)}>
                              <UserMinus size={16} />移除此班
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <button
                  className="day-add"
                  disabled={!recommended}
                  onClick={() => recommended && saveShift(date, recommended.id, shift.id)}
                >
                  <UserPlus size={15} />補一名助理{recommended ? `（推薦：${recommended.displayName}）` : "（無可用人選）"}
                </button>

                {gap > 0 && (
                  <div className="day-gap"><AlertTriangle size={16} />尚缺 {gap} 名助理 — 此教學版只提示，不會自動排班</div>
                )}
              </section>
            );
          })}

          <section className="course-leave-box">
            <div className="day-block-label">本日休假</div>
            <p className="caption">
              {leaveEntries.length
                ? leaveEntries.map((entry) => courseProfile.people.find((person) => person.id === entry.personId)?.displayName).filter(Boolean).join("、")
                : "尚無休假標記"}
            </p>
            <div className="course-leave-actions">
              <select value={leavePersonId} onChange={(event) => setLeavePersonId(event.target.value)} aria-label="選擇休假人員">
                <option value="">選擇一位未排班人員</option>
                {courseProfile.people.filter((person) => !dayEntries.some((entry) => entry.personId === person.id)).map((person) => (
                  <option value={person.id} key={person.id}>{person.displayName}</option>
                ))}
              </select>
              <button className="ui-btn ui-btn--outline ui-btn--sm" disabled={!leavePersonId} onClick={() => leavePersonId && saveLeave(date, leavePersonId)}>
                標記休假
              </button>
            </div>
          </section>
        </div>
      </aside>
    </>
  );
}
