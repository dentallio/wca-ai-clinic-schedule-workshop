"use client";

import { AlertTriangle, ChevronDown } from "lucide-react";
import { useState } from "react";
import { courseProfile } from "@/course/clinic.config";
import { formatDay } from "@/domain/dates";
import { evaluateAssistantCoverage } from "@/domain/rules/assistant-coverage";
import type { ScheduleEntry } from "@/domain/types";

export function CoverageWarnings({
  entries,
  dates,
  onPick,
}: {
  entries: ScheduleEntry[];
  dates: string[];
  onPick?(date: string): void;
}) {
  const [open, setOpen] = useState(false);
  const issues = evaluateAssistantCoverage(entries, courseProfile.people, dates, courseProfile.shifts, 2);

  return (
    <section className={`compl ${issues.length ? "compl--warn" : "compl--ok"}`} aria-live="polite">
      <button className="compl__toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <AlertTriangle size={15} />
        <span className="compl__summary">
          助理人力檢查：{issues.length === 0 ? "本月皆達每診 2 人" : `${issues.length} 警示`}
        </span>
        <ChevronDown className={`compl__chevron ${open ? "is-open" : ""}`} size={16} />
      </button>
      {open && issues.length > 0 && (
        <div className="compl__list">
          {issues.slice(0, 12).map((issue) => (
            <button
              className={`compl__row ${issue.assistantCount === 0 ? "compl__row--danger" : "compl__row--warn"}`}
              key={`${issue.date}_${issue.shiftId}`}
              onClick={() => onPick?.(issue.date)}
            >
              <span className="compl__row-title">{formatDay(issue.date)} · {issue.shiftLabel}</span>
              <span className="compl__row-detail">目前 {issue.assistantCount}/2，點擊查看當日明細</span>
            </button>
          ))}
          {issues.length > 12 && <p className="caption">另有 {issues.length - 12} 筆，請從月曆逐日檢查。</p>}
        </div>
      )}
    </section>
  );
}
