import { courseProfile } from "@/course/clinic.config";
import { formatDay } from "@/domain/dates";
import { evaluateAssistantCoverage } from "@/domain/rules/assistant-coverage";
import type { ScheduleEntry } from "@/domain/types";

export function CoverageWarnings({ entries, dates }: { entries: ScheduleEntry[]; dates: string[] }) {
  const issues = evaluateAssistantCoverage(
    entries,
    courseProfile.people,
    dates,
    courseProfile.shifts,
    2,
  );

  return (
    <section className="coverage-panel" aria-live="polite">
      <div>
        <p className="eyebrow">Stage 4 規則</p>
        <h2>助理人力檢查</h2>
        <p>每診至少 2 名虛構助理；只顯示提示，不會自動排班。</p>
      </div>
      {issues.length === 0 ? (
        <div className="coverage-ok">本週所有班別人力充足</div>
      ) : (
        <div className="coverage-results">
          <strong>{issues.length} 個班別人力不足</strong>
          <div className="coverage-chips">
            {issues.slice(0, 8).map((issue) => (
              <span className="coverage-chip" key={`${issue.date}_${issue.shiftId}`}>
                {formatDay(issue.date)} · {issue.shiftLabel} · {issue.assistantCount}/{issue.minimumAssistants}
              </span>
            ))}
            {issues.length > 8 && <span className="coverage-more">另有 {issues.length - 8} 筆</span>}
          </div>
        </div>
      )}
    </section>
  );
}
