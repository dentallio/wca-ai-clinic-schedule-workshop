"use client";

import { hasFirebaseCourseConfig } from "@/course/firebase.config";
import { COURSE_SAFETY_NOTICE } from "@/course/safety";
import { CURRENT_WORKSHOP_STAGE } from "@/course/workshop-stage";
import { useSchedule } from "@/components/ScheduleProvider";

export default function CourseCheckPage() {
  const { mode, syncState, error } = useSchedule();
  const firebaseReady = hasFirebaseCourseConfig();
  const localDeployStage = CURRENT_WORKSHOP_STAGE === 5;
  const expectedModeReady = localDeployStage
    ? !firebaseReady && mode === "local"
    : firebaseReady && mode === "firestore";
  const checks = [
    {
      title: "合成資料安全邊界",
      ok: COURSE_SAFETY_NOTICE.includes("合成資料"),
      detail: "每頁都會顯示未登入 Demo 警示。",
    },
    {
      title: localDeployStage ? "Stage 5：本機部署模式" : "Stage 6：Firestore 雲端模式",
      ok: expectedModeReady,
      detail: localDeployStage
        ? firebaseReady
          ? "Stage 5 應先保持 localStorage；請確認是否提早填入 Firebase Web config。"
          : "目前使用本機練習模式，正是 Stage 5 首次部署的預期狀態。"
        : firebaseReady && mode === "firestore"
          ? "已連接自己的 Firebase 專案，可進入 Stage 7 同步驗收。"
          : "Stage 6 才需要填入 Web config，並確認資料模式切換為 Firestore。",
    },
    {
      title: "資料訂閱",
      ok: syncState === "synced",
      detail: error ?? `目前狀態：${syncState}；資料模式：${mode}`,
    },
    {
      title: "真實資料防線",
      ok: true,
      detail: "資料模型沒有病人、病歷、HIS 或真實請假原因欄位。",
    },
  ];

  return (
    <main className="page-shell narrow-page">
      <p className="eyebrow">Stage {CURRENT_WORKSHOP_STAGE} / 7 驗收工具</p>
      <h1>課程環境檢查</h1>
      <p className="page-intro">先確認 Preview 可開啟，再用這一頁判斷目前是本機模式或 Firestore 雲端模式。</p>
      <div className="check-grid">
        {checks.map((check) => (
          <section className="check-card" key={check.title}>
            <span className={`check-icon ${check.ok ? "is-ok" : "needs-action"}`} aria-hidden="true">
              {check.ok ? "✓" : "!"}
            </span>
            <div>
              <h2>{check.title}</h2>
              <p>{check.detail}</p>
            </div>
          </section>
        ))}
      </div>
      <section className="instruction-card">
        <h2>如何判定完成</h2>
        <ol>
          <li>Stage 1：頁面能開啟，Review changes 沒有意外檔案。</li>
          <li>Stage 3：新增一格、改班、休假、前後週與重新整理皆通過。</li>
          <li>Stage 5：Production 網址可開，本頁仍顯示「本機練習」。</li>
          <li>Stage 6：發布規則並填入 Web config，本頁顯示「Firestore 雲端模式」。</li>
          <li>Stage 7：GitHub／Vercel commit 一致，三個裝置看到相同結果。</li>
        </ol>
      </section>
    </main>
  );
}
