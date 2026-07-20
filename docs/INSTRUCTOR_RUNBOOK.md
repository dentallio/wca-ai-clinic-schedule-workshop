# 講師與助教 Runbook

## 課前必做

- 使用乾淨 GitHub 帳號流程 clone 一次。
- 使用乾淨 Firebase 專案重走 `FIREBASE_SETUP.md`。
- 驗證 `npm ci && npm run verify`。
- 檢查五個 checkpoint branch、五個 tag 與錯誤練習 branch。
- 電腦、手機、另一台裝置完成 Firestore 即時同步。
- 預備每階段完成畫面截圖與一段離線備援影片。

## 每階段節奏

1. 投影完成畫面與唯一完成證據。
2. 講師示範約三分鐘。
3. 學員實作，助教優先檢查是否使用合成資料。
4. 結尾五分鐘全班對齊 checkpoint。
5. 十分鐘內無法排除就啟動救援，不占用午休補課。

## 紅牌分流

- Preview 問題：先查 Node、repo 位置與埠號，不更新相依套件。
- Firebase 問題：看 `/course-check`、Console 文件與規則；不得改成全面開放。
- Git 問題：先保留工作區，不 reset、不 force push。
- Vercel 問題：核對 GitHub repo、branch、commit 與 build log。
- 資料問題：確認只有合成資料；若發現真實資料立刻停止、隔離畫面並依課程事件處理流程處置。

## 最終口頭驗收

每位學員要能用自己的話說明：

- Git commit 備份程式碼，不備份 Firestore。
- Firebase Web config 不是資料庫門鎖。
- private GitHub repo 不會自動替部署網站加登入。
- 未登入 Demo 只能使用合成資料。
