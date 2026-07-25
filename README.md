# 牙科排班工作坊模板

這是一份給零程式基礎學員使用的 Next.js 排班教學模板。它只允許使用從零建立的合成資料，沒有登入與角色權限，**不可直接拿來放真實診所班表、病人資料或 HIS 資料**。

## 第一次預覽

需要 Node.js 20.9 以上。

```bash
npm install
npm run dev
```

開啟 `http://localhost:3000`。尚未填 Firebase 時，網站會使用瀏覽器 `localStorage`，右上角顯示「本機練習」。這足以完成 Stage 1～5；Stage 5 會先把本機模式部署到 Vercel，但尚不能跨裝置同步。

常用檢查：

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run verify
```

## 七階段技術路線

1. Preview：開啟專案、閱讀 README／CLAUDE.md、確認沒有意外變更。
2. AI 協作：只修改 `src/course/clinic.config.ts`，加入虛構診所、班別與人員。
3. 核心功能：驗收點格排班、換班、休假、前後週與重新整理。
4. 診所規則：在獨立規則模組加入「助理少於 2 人」警示，並做邊界與回歸測試。
5. Vercel 首次上線：保持 localStorage，先證明網站程式可以部署。
6. Firestore 雲端模式：發布規則、填入 Firebase Web config，確認 `/course-check` 顯示雲端模式。
7. 三裝置同步：核對 GitHub／Vercel commit，使用三個裝置完成即時同步與重新整理驗收。

每階段細節放在 `docs/stages/`，卡住時看 `COURSE_CHECKPOINTS.md`。

課堂第 8 課「備份與維護」及第 9 課「安全升級門檻」不新增程式 checkpoint；它們使用 Stage 7 成果進行維護與風險判斷。

講師與助教另見 `docs/INSTRUCTOR_RUNBOOK.md`。

## Firebase 與即時同步

依 [FIREBASE_SETUP.md](FIREBASE_SETUP.md) 建立學員自己的 Firebase 專案：

1. 建立 Firestore。
2. 將本 repo 的 `firestore.rules` 貼到 Firebase Console 規則頁並發布。
3. 將 Firebase Web App config 填進 `src/course/firebase.config.ts`。
4. 回到 `/course-check`，確認顯示 Firestore 雲端模式。

Firebase Web config 是前端專案識別資訊，不是資料庫門鎖；禁止把 service account JSON、私鑰、密碼或 token 貼進專案。

## 部署 Vercel

1. 將 repo push 到自己的 private GitHub repository。
2. 到 Vercel 使用 GitHub 匯入該 repo。
3. Framework Preset 選 Next.js，Build Command 維持 `npm run build`。
4. 部署後開啟 Production URL，以合成資料新增一格班。
5. Stage 5 先確認手機能開啟、但看不到電腦 localStorage 資料。
6. Stage 6 完成 Firestore 後，再於 Stage 7 使用電腦、手機及鄰座裝置驗收即時更新。

private GitHub repository 只保護程式碼；未登入網站本身仍不可放真實資料。

## 主要檔案

| 檔案 | 用途 |
|---|---|
| `src/course/clinic.config.ts` | Stage 2 診所名稱、班別、虛構人員 |
| `src/course/workshop-stage.ts` | 目前技術 checkpoint（Stage 1～7） |
| `src/course/firebase.config.ts` | 學員自己的 Firebase Web config |
| `src/domain/` | 日期、排班與規則的純邏輯 |
| `src/data/` | 本機／Firestore 資料存取 |
| `src/components/ScheduleBoard.tsx` | 週班表介面 |
| `firestore.rules` | 課程當期審核過的 Demo 規則 |
| `CLAUDE.md` | 給 AI 的專案工作守則 |

## 資料備份

到 `/settings` 下載 JSON。Git commit 只能還原程式碼，不會自動還原 Firestore 資料；修改前應同時保留最近成功 commit 與 JSON 匯出檔。
