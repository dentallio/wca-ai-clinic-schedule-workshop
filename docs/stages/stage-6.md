# Stage 6：設定 Firestore 雲端模式

## 本階段目標

Stage 5 已證明網站程式可以部署。本階段才處理資料跨裝置所需的 Firestore，兩件事不可混為一談。

1. 在自己的 Firebase 專案建立 Firestore Database。
2. 將 repo 內已審核的 `firestore.rules` 貼到 Rules 頁並發布。
3. 建立 Firebase Web App，取得六個 Web config 欄位。
4. 只修改 `src/course/firebase.config.ts`。
5. 回到 `/course-check`，確認 Web config 完整、資料模式為 `firestore`、訂閱狀態為 `synced`。
6. 到 Firebase Console 的 Data 頁確認只出現合成資料。

## 安全停止線

- Firebase Web config 是前端識別資訊，不是資料庫門鎖。
- 不提供 service account JSON、私鑰、密碼、PAT、token、cookie 或驗證碼。
- 不把 Rules 改成全面開放。
- 不使用真實診所、人員、病人、請假原因或 HIS 資料。

## 完成證據

- `/course-check` 顯示 Firestore 雲端模式。
- Firebase Console 中的專案、Database ID、Location 與 repo 文件一致。
- Rules 已發布，Data 頁只看到合成資料。
- Git Review 只包含預期的 Firebase Web config 修改。

新救援 checkpoint：`checkpoint/lesson-6-firestore`。月曆版使用 `checkpoint/original-ui-lesson-6-firestore`。
