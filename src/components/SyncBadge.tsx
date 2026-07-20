"use client";

import { useSchedule } from "./ScheduleProvider";

const labels = {
  connecting: "正在連線",
  saving: "正在儲存",
  synced: "已同步",
  error: "同步失敗",
};

export function SyncBadge() {
  const { mode, syncState } = useSchedule();
  return (
    <div className={`sync-badge sync-${syncState}`} aria-live="polite">
      <span className="sync-dot" aria-hidden="true" />
      <span>{labels[syncState]}</span>
      <small>{mode === "firestore" ? "雲端" : "本機練習"}</small>
    </div>
  );
}
