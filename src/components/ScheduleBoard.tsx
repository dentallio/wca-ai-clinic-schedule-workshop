"use client";

import { courseProfile } from "@/course/clinic.config";
import { addDays, formatDay, formatWeekRange, startOfWeek, todayString, weekDates } from "@/domain/dates";
import { findEntry } from "@/domain/schedule";
import type { CoursePerson, ScheduleEntry } from "@/domain/types";
import { useMemo, useState } from "react";
import { useSchedule } from "./ScheduleProvider";
import { SyncBadge } from "./SyncBadge";

interface SelectedCell {
  date: string;
  personId: string;
}

function EntryLabel({ entry }: { entry: ScheduleEntry | undefined }) {
  if (!entry) return <span className="empty-label">＋ 排班</span>;
  if (entry.state === "leave") return <span className="leave-label">休假</span>;
  const shift = courseProfile.shifts.find((item) => item.id === entry.shiftId);
  return (
    <span className={`shift-label shift-${entry.shiftId}`}>
      {shift?.label ?? entry.shiftId}
    </span>
  );
}

function PersonRows({
  people,
  dates,
  entries,
  selected,
  onSelect,
}: {
  people: CoursePerson[];
  dates: string[];
  entries: ScheduleEntry[];
  selected: SelectedCell | null;
  onSelect(cell: SelectedCell): void;
}) {
  return people.map((person) => (
    <tr key={person.id}>
      <th scope="row">
        <span>{person.displayName}</span>
        <small>{person.role === "doctor" ? "醫師" : "助理"}</small>
        {person.availability && (
          <small className="availability-note">
            示範可排：{person.availability.map((item) => {
              const weekdays = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];
              const shift = courseProfile.shifts.find((value) => value.id === item.shiftId);
              return `${weekdays[item.weekday]}${shift?.label ?? item.shiftId}`;
            }).join("、")}
          </small>
        )}
      </th>
      {dates.map((date) => {
        const entry = findEntry(entries, date, person.id);
        const isSelected = selected?.date === date && selected.personId === person.id;
        return (
          <td key={date}>
            <button
              className={`schedule-cell ${entry ? `has-${entry.state}` : ""} ${isSelected ? "is-selected" : ""}`}
              onClick={() => onSelect({ date, personId: person.id })}
              aria-label={`${person.displayName} ${formatDay(date)}：${entry?.state === "leave" ? "休假" : entry?.shiftId ?? "空白"}`}
            >
              <EntryLabel entry={entry} />
            </button>
          </td>
        );
      })}
    </tr>
  ));
}

export function ScheduleBoard() {
  const [monday, setMonday] = useState(() => startOfWeek(todayString()));
  const [selected, setSelected] = useState<SelectedCell | null>(null);
  const { entries, syncState, error, saveShift, saveLeave, clearEntry } = useSchedule();
  const dates = useMemo(() => weekDates(monday), [monday]);
  const doctors = courseProfile.people.filter((person) => person.role === "doctor");
  const assistants = courseProfile.people.filter((person) => person.role === "assistant");
  const selectedPerson = courseProfile.people.find((person) => person.id === selected?.personId);
  const selectedEntry = selected ? findEntry(entries, selected.date, selected.personId) : undefined;

  return (
    <main className="page-shell">
      <section className="hero-row">
        <div>
          <p className="eyebrow">合成資料練習環境</p>
          <h1>{courseProfile.clinicName}</h1>
          <p>點選任一格設定班別或休假；同一格再次選擇會直接更新，不會產生重複班。</p>
        </div>
        <SyncBadge />
      </section>

      {error && <div className="error-callout" role="alert">同步錯誤：{error}</div>}
      <section className="schedule-card" aria-busy={syncState === "connecting"}>
        <div className="schedule-toolbar">
          <div>
            <p className="eyebrow">週班表</p>
            <h2>{formatWeekRange(monday)}</h2>
          </div>
          <div className="toolbar-actions">
            <button className="button button-quiet" onClick={() => setMonday(addDays(monday, -7))}>← 上一週</button>
            <button className="button button-quiet" onClick={() => setMonday(startOfWeek(todayString()))}>本週</button>
            <button className="button button-quiet" onClick={() => setMonday(addDays(monday, 7))}>下一週 →</button>
            <button className="button button-quiet print-only-hide" onClick={() => window.print()}>列印</button>
          </div>
        </div>

        <div className="table-scroll" tabIndex={0} aria-label="可水平捲動的週班表">
          <table className="schedule-table">
            <thead>
              <tr>
                <th scope="col">人員</th>
                {dates.map((date) => <th scope="col" key={date}>{formatDay(date)}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr className="group-row"><th colSpan={8}>醫師</th></tr>
              <PersonRows people={doctors} dates={dates} entries={entries} selected={selected} onSelect={setSelected} />
              <tr className="group-row"><th colSpan={8}>助理</th></tr>
              <PersonRows people={assistants} dates={dates} entries={entries} selected={selected} onSelect={setSelected} />
            </tbody>
          </table>
        </div>
      </section>

      <aside className={`cell-editor ${selected ? "is-open" : ""}`} aria-live="polite">
        {selected && selectedPerson ? (
          <>
            <div>
              <p className="eyebrow">編輯一格</p>
              <h2>{selectedPerson.displayName} · {formatDay(selected.date)}</h2>
              <p>目前：{selectedEntry ? <EntryLabel entry={selectedEntry} /> : "尚未排班"}</p>
            </div>
            <div className="editor-actions">
              {courseProfile.shifts.map((shift) => (
                <button
                  className={`button shift-button shift-${shift.id}`}
                  key={shift.id}
                  onClick={() => saveShift(selected.date, selected.personId, shift.id)}
                >
                  {shift.label}<small>{shift.start}–{shift.end}</small>
                </button>
              ))}
              <button className="button leave-button" onClick={() => saveLeave(selected.date, selected.personId)}>休假</button>
              <button className="button button-danger" onClick={() => clearEntry(selected.date, selected.personId)}>清除</button>
              <button className="button button-quiet" onClick={() => setSelected(null)}>關閉</button>
            </div>
          </>
        ) : (
          <p>選擇班表中的一格開始編輯。</p>
        )}
      </aside>
    </main>
  );
}
