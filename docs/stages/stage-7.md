# Stage 7：Production 與三裝置同步驗收

## 上線前驗收

1. 重走 Stage 3 的新增、換班、休假、日期切換與重新整理。
2. 確認 Stage 4 的 0／1／2 人警示與 UI 修改仍正常。
3. 開啟 `/course-check`，確認 Firestore 雲端模式與 `synced`。
4. 執行 `npm run verify`。
5. Review changes 後，由學員分開核准 commit 與 push。

## 版本對齊

1. GitHub 記下要部署 branch 的最新 commit 前 7 碼。
2. Vercel 的 Production Branch 必須是本次選定的週班表或月曆 UI branch。
3. Production deployment 必須對應同一個 commit。

## 三裝置同步

所有裝置只准使用合成資料：

1. 電腦、自己的手機與鄰座裝置開啟相同 Production URL。
2. 三個裝置都顯示「已同步／雲端」。
3. 電腦修改一筆合成排班，手機與鄰座裝置應顯示同一結果。
4. 重新整理三個裝置，資料仍一致。
5. Firebase Console 的 Data 頁能找到對應文件。

若不同步，依序核對 Production URL、Production Branch、commit、`/course-check`、Firestore 文件與 Rules；不要用全面開放規則排除問題。

新救援 checkpoint：`checkpoint/lesson-7-sync`。月曆版使用 `checkpoint/original-ui-lesson-7-sync`。
