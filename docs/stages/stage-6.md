# Stage 6：讓月曆版切換到 Firestore

1. 在自己的 Firebase 專案建立 Firestore Database。
2. 將 repo 內已審核的 `firestore.rules` 貼到 Rules 頁並發布。
3. 建立 Firebase Web App，取得六個 Web config 欄位。
4. 只修改 `src/course/firebase.config.ts`。
5. 到 `/course-check` 確認資料模式為 `firestore`、訂閱狀態為 `synced`。
6. Firebase Console 的 Data 頁只可出現合成資料。

禁止提供 service account JSON、私鑰、密碼、PAT、token、cookie 或驗證碼；不要把 Rules 改成全面開放。

Checkpoint：`checkpoint/original-ui-lesson-6-firestore`。
