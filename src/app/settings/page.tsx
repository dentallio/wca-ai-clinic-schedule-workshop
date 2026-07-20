"use client";

import { useRef, useState } from "react";
import { useSchedule } from "@/components/ScheduleProvider";
import { courseProfile } from "@/course/clinic.config";
import { COURSE_DATA_VERSION } from "@/course/safety";
import type { CourseExport } from "@/domain/types";

export default function SettingsPage() {
  const { entries, mode, importEntries, clearAll } = useSchedule();
  const fileInput = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);

  function exportData() {
    const value: CourseExport = {
      kind: "clinic-schedule-workshop",
      version: COURSE_DATA_VERSION,
      exportedAt: new Date().toISOString(),
      clinicName: courseProfile.clinicName,
      entries,
    };
    const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `schedule-demo-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage(`已匯出 ${entries.length} 筆合成班表資料。`);
  }

  async function onImport(file: File | undefined) {
    if (!file) return;
    try {
      const value: unknown = JSON.parse(await file.text());
      const count = await importEntries(value);
      setMessage(`已匯入 ${count} 筆合成班表資料。`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "匯入失敗");
    } finally {
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  async function clearDemoData() {
    if (!window.confirm("確定清除目前所有合成班表資料？此動作不會刪除程式碼。")) return;
    await clearAll();
    setMessage("合成班表已清空。");
  }

  return (
    <main className="page-shell narrow-page">
      <p className="eyebrow">備份與救援</p>
      <h1>資料工具</h1>
      <p className="page-intro">
        目前使用<strong>{mode === "firestore" ? " Firestore 雲端模式" : "本機練習模式"}</strong>。程式碼 checkpoint 與班表資料是兩件事，切換程式版本不會自動還原 Firestore。
      </p>
      {message && <div className="info-callout" role="status">{message}</div>}
      <div className="tool-grid">
        <section className="tool-card">
          <p className="eyebrow">推薦</p>
          <h2>匯出 JSON</h2>
          <p>修改程式或使用 checkpoint 前，先下載目前的合成班表資料。</p>
          <button className="button" onClick={exportData}>下載備份</button>
        </section>
        <section className="tool-card">
          <h2>匯入 JSON</h2>
          <p>只接受由本模板匯出的相同版本檔案，匯入會取代現有班表。</p>
          <input
            ref={fileInput}
            type="file"
            accept="application/json,.json"
            onChange={(event) => onImport(event.target.files?.[0])}
          />
        </section>
        <section className="tool-card danger-card">
          <h2>清空練習資料</h2>
          <p>只清除排班資料，不會動到 Firebase 專案、程式碼或設定。</p>
          <button className="button button-danger" onClick={clearDemoData}>清空合成資料</button>
        </section>
      </div>
    </main>
  );
}
