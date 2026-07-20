# Firebase 課堂設定

此流程只適用於合成資料 Demo。不要在未登入的網站使用真實班表。

## 1. 建立專案與 Firestore

1. 登入 Firebase Console，建立自己的課堂專案。
2. 新增 Web App。
3. 開啟 Firestore Database，區域依當期課程 SOP 選擇。
4. 不要長期使用會到期的 Test mode，也不要使用全域 `allow read, write: if true`。

## 2. 發布課程規則

1. 開啟 Firestore → Rules。
2. 複製 repo 根目錄 `firestore.rules` 的完整內容。
3. 貼上後發布。

規則只允許 `courseScheduleEntries`，並限制欄位與資料型態。因為課程沒有登入，它仍不具備真正的使用者授權；只能放合成資料。

## 3. 貼入 Web config

從 Firebase Project settings → Your apps 取得類似以下資料：

```ts
{
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
}
```

將六個值填入 `src/course/firebase.config.ts`，不要修改欄位名稱。這些是 Web App 公開識別資訊；不要把 service account JSON 或其他秘密放進來。

## 4. 驗收

1. 重新啟動 Preview。
2. 開啟 `/course-check`，確認顯示 Firestore 雲端模式。
3. 在班表替一位虛構人員新增一格。
4. 重新整理後確認仍存在。
5. 到 Firebase Console 確認 `courseScheduleEntries` 文件存在。

若看到 Missing permissions，應檢查規則與集合名稱；不要用全面開放規則繞過問題。
