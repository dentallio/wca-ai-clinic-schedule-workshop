# Stage 7：月曆版 Production 與三裝置同步

1. 重走月曆、抽屜、補人、換人、休假與人力警示。
2. `/course-check` 必須顯示 Firestore 雲端模式與 `synced`。
3. 執行 `npm run verify`，Review 後分開核准 commit 與 push。
4. Vercel Production Branch、GitHub commit 與 deployment 必須一致。
5. 電腦、手機與鄰座裝置開啟相同 Production URL。
6. 任一裝置修改一筆合成排班，其他裝置更新相同結果；重新整理後仍一致。
7. Firebase Console 的 Data 頁能找到對應文件。

若不同步，依序核對網址、branch、commit、`/course-check`、Firestore 文件與 Rules；不要使用全面開放規則。

Checkpoint：`checkpoint/original-ui-lesson-7-sync`。
