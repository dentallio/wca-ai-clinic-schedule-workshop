# Stage 5：保留原版成果並完成同步部署

## 上線前驗收

1. 重走 Stage 3 六個操作與 Stage 4 三層人力規則。
2. 開啟 `/settings`，完成合成資料匯出／匯入。
3. 開啟 `/course-check`，確認目前是本機模式或 Firestore 雲端模式。
4. 執行 `npm run verify`，確認 lint、型別、12 測試與 build 全綠。
5. Review changes 後再分開核准 commit 與 push。

## 三裝置同步

設定 Firebase 並部署後，以電腦、手機與另一裝置開啟相同 Production URL。任一裝置在當日抽屜補入一名合成助理，其他裝置應更新相同日期與診次，重新整理後仍一致。

若不同步，先核對 Production URL、`/course-check` 模式、GitHub／Vercel commit 與 Firebase 文件；不要把 Firestore Rules 改成全面開放。

Checkpoint：`checkpoint/original-ui-stage-5`。這仍是未登入的合成資料 Demo，不能拿來放真實營運資料。
