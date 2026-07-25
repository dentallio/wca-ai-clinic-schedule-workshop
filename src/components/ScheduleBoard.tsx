"use client";

import { DownloadCloud, Sparkles, Stethoscope, Wand2 } from "lucide-react";
import { useMemo, useState } from "react";
import { courseProfile } from "@/course/clinic.config";
import { CURRENT_WORKSHOP_STAGE } from "@/course/workshop-stage";
import type { ScheduleEntry } from "@/domain/types";
import { CoverageWarnings } from "./CoverageWarnings";
import { DayDrawer } from "./DayDrawer";
import { PageHead } from "./WorkshopShell";
import { useSchedule } from "./ScheduleProvider";

const months = [
  { year: 2026, month: 7, label: "7 月 · 已發布" },
  { year: 2026, month: 8, label: "8 月 · 排班中" },
] as const;
const weekdays = ["日", "一", "二", "三", "四", "五", "六"];

function dateString(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function peopleFor(entries: ScheduleEntry[], role: "doctor" | "assistant"): ScheduleEntry[] {
  return entries.filter((entry) => courseProfile.people.find((person) => person.id === entry.personId)?.role === role);
}

export function ScheduleBoard() {
  const [viewIndex, setViewIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { entries, error } = useSchedule();
  const view = months[viewIndex];
  const totalDays = new Date(view.year, view.month, 0).getDate();
  const firstWeekday = new Date(view.year, view.month - 1, 1).getDay();
  const dates = useMemo(
    () => Array.from({ length: totalDays }, (_, index) => dateString(view.year, view.month, index + 1)),
    [totalDays, view.month, view.year],
  );
  const openDates = dates.filter((date) => new Date(`${date}T12:00:00`).getDay() !== 0);
  const monthEntries = entries.filter((entry) => entry.date.startsWith(`${view.year}-${String(view.month).padStart(2, "0")}`));
  const cells: Array<number | null> = [...Array(firstWeekday).fill(null), ...Array.from({ length: totalDays }, (_, index) => index + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <>
      <PageHead
        title="排班月曆"
        sub={`${view.year} 年 ${view.month} 月　·　原版操作教學 · Stage ${CURRENT_WORKSHOP_STAGE} / 7`}
        right={
          <div className="month-switch" role="group" aria-label="切換月份">
            {months.map((month, index) => (
              <button
                className={`ui-chip ui-chip--ink ui-chip--button ${index === viewIndex ? "ui-chip--active" : ""}`}
                onClick={() => { setViewIndex(index); setSelectedDate(null); }}
                key={month.label}
              >
                {month.label}
              </button>
            ))}
          </div>
        }
      />

      {error && <div className="course-error" role="alert">同步錯誤：{error}</div>}

      <section className="ai-banner">
        <div className="ai-banner__icon"><Sparkles size={22} /></div>
        <div>
          <div className="ai-banner__title">
            {viewIndex === 1
              ? "8 月仍是空白草稿，先回 7 月練習當日調整"
              : CURRENT_WORKSHOP_STAGE === 1
                ? "原版排班系統的視覺骨架已經成功啟動"
                : CURRENT_WORKSHOP_STAGE === 2
                  ? "已載入診所班別、人員與可重現的合成月班表"
                  : "AI 已依醫師班別與人力規則產生本月合成初版班表"}
          </div>
          <div className="ai-banner__sub">
            {viewIndex === 0
              ? CURRENT_WORKSHOP_STAGE < 3
                ? "下一階段會在同一個月曆上加入當日明細與排班操作，不會更換介面。"
                : "標記 ✦ 的為 AI 建議排班。點任一天查看診次、助理與缺口，再進行確認、換人或補人。"
              : "課程不會連接真實 HIS；需要資料時，只能自行建立合成案例。"}
          </div>
        </div>
        {viewIndex === 0 && (
          <div className="ai-banner__actions">
            <button className="ui-btn ui-btn--outline ui-btn--sm" onClick={() => setViewIndex(1)}>
              <Wand2 size={14} />排下個月（8 月）
            </button>
          </div>
        )}
      </section>

      {CURRENT_WORKSHOP_STAGE >= 4
        ? <CoverageWarnings entries={entries} dates={openDates} onPick={setSelectedDate} />
        : (
          <div className="course-stage-note">
            Stage {CURRENT_WORKSHOP_STAGE}：目前先保留原版月曆操作；Stage 4 才加入每診至少 2 名助理的人力檢核。
          </div>
        )}

      <div className="legend">
        <span className="legend__item"><span className="ui-dot ui-dot--ok" />人力充足</span>
        <span className="legend__item"><span className="ui-dot ui-dot--warn" />略吃緊</span>
        <span className="legend__item"><span className="ui-dot ui-dot--danger" />缺工</span>
        <span className="legend__item legend__doctors">
          <Stethoscope size={13} />醫師：
          {courseProfile.people.filter((person) => person.role === "doctor").map((doctor) => (
            <span className="legend__item" key={doctor.id} title={doctor.displayName}>
              <span className="cal__docdot" style={{ background: doctor.color }} />
              {doctor.displayName.replace(" 醫師", "")}
            </span>
          ))}
        </span>
      </div>

      {monthEntries.length === 0 ? (
        <div className="draft-empty">
          <DownloadCloud size={36} />
          <div className="draft-empty__title">尚未建立 {view.month} 月合成班表</div>
          <div className="draft-empty__hint">回到 7 月完成課程操作；不要匯入真實診所或人員資料。</div>
        </div>
      ) : (
        <div className="cal">
          <div className="cal__weekdays">
            {weekdays.map((weekday, index) => (
              <div className={`cal__weekday ${index === 0 ? "cal__weekday--sun" : ""}`} key={weekday}>週{weekday}</div>
            ))}
          </div>
          <div className="cal__grid">
            {cells.map((day, index) => {
              if (day === null) return <div className="cal__cell cal__cell--empty" key={`empty-${index}`} />;
              const date = dateString(view.year, view.month, day);
              const weekday = new Date(`${date}T12:00:00`).getDay();
              if (weekday === 0) {
                return (
                  <div className="cal__cell cal__cell--closed" key={date}>
                    <div className="cal__date cal__date--sun">{day}</div>
                    <div className="cal__closed">休診</div>
                  </div>
                );
              }

              const dayEntries = monthEntries.filter((entry) => entry.date === date);
              const shiftEntries = dayEntries.filter((entry) => entry.state === "shift");
              const doctors = peopleFor(shiftEntries, "doctor");
              const assistants = peopleFor(shiftEntries, "assistant");
              const visibleShifts = weekday === 6 ? courseProfile.shifts.slice(0, 2) : courseProfile.shifts;
              const counts = visibleShifts.map((shift) => assistants.filter((entry) => entry.shiftId === shift.id).length);
              const minimum = counts.length ? Math.min(...counts) : 0;
              const coverageLevel = minimum >= 2 ? "ok" : minimum === 1 ? "warn" : "danger";
              const level = CURRENT_WORKSHOP_STAGE >= 4 ? coverageLevel : "ok";
              const conflicts = CURRENT_WORKSHOP_STAGE >= 4
                ? counts.filter((count) => count < 2).length + dayEntries.filter((entry) => entry.state === "leave").length
                : 0;
              const aiCount = assistants.filter((entry) => entry.note === "AI 建議").length;

              return (
                <button
                  className={`cal__cell cal__cell--btn ${selectedDate === date ? "cal__cell--selected" : ""}`}
                  onClick={() => CURRENT_WORKSHOP_STAGE >= 3 && setSelectedDate(date)}
                  aria-label={`人力${level === "ok" ? "充足" : level === "warn" ? "吃緊" : "缺工"} ${day} 助理 ${assistants.length}`}
                  key={date}
                >
                  <div className="cal__top">
                    <div className="cal__date">
                      <span className={`ui-dot ui-dot--${level} ${level === "danger" ? "ui-dot--blink" : ""}`} />{day}
                    </div>
                    <div className="cal__docs" title="當日看診醫師">
                      {doctors.map((entry) => {
                        const doctor = courseProfile.people.find((person) => person.id === entry.personId)!;
                        return <span className="cal__docdot" style={{ background: doctor.color }} key={entry.id} />;
                      })}
                    </div>
                  </div>
                  <div className="cal__meta">
                    <span className="cal__asst">助理 {assistants.length}</span>
                    {conflicts > 0 && <span className="cal__conflict" title="人力或休假需檢查">⚠ {conflicts}</span>}
                    {aiCount > 0 && <span className="cal__ai" title="AI 建議排班">✦ {aiCount}</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {CURRENT_WORKSHOP_STAGE >= 3 && selectedDate && <DayDrawer date={selectedDate} onClose={() => setSelectedDate(null)} />}
    </>
  );
}
