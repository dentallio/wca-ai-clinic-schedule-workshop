# 牙科排班一日工作坊

這份 repo 保留原版牙科排班系統的視覺語言與主要操作，再拆成五個可逐步完成的 checkpoint。所有名稱與班表都是從零建立的合成資料；沒有登入與角色權限，**不可放入真實診所、員工、病人或 HIS 資料**。

## 先看完整成果

需要 Node.js 20.9 以上：

```bash
npm install
npm run dev
```

開啟 `http://localhost:3000`。`main` 是 Stage 5 完整成果：

- 原版暖珊瑚側欄、頂欄、月排班與月份切換。
- 點日期開啟當日抽屜，查看三診、醫師、助理與休假。
- 可確認 AI 建議、替換／移除／補入助理、標記休假。
- 月曆與抽屜同步顯示人力充足、吃緊與缺工。
- 未設定 Firebase 時使用瀏覽器本機資料；設定後切換 Firestore。

## 五階段：同一介面、能力累加

| 階段 | 畫面與能力 | Checkpoint |
|---|---|---|
| Stage 1 | 啟動原版殼層、頂欄、側欄與空白月曆 | `checkpoint/original-ui-stage-1` |
| Stage 2 | 加入診所設定、三診、人員與合成月班表 | `checkpoint/original-ui-stage-2` |
| Stage 3 | 點日期開抽屜，完成確認、換人、補人與休假 | `checkpoint/original-ui-stage-3` |
| Stage 4 | 加入每診至少 2 名助理的警示、正常／邊界／回歸測試 | `checkpoint/original-ui-stage-4` |
| Stage 5 | 加入本機／Firestore 狀態、資料工具、部署與跨裝置驗收 | `checkpoint/original-ui-stage-5` |

切換階段：

```bash
git switch checkpoint/original-ui-stage-3
npm install
npm run dev
```

切換 checkpoint 後若要看到該階段的預設合成資料，請用無痕視窗，或在 `/settings` 清除先前練習資料。不要使用 `git reset --hard`。

每階段講義在 `docs/stages/`；救援流程在 `COURSE_CHECKPOINTS.md`；講師流程在 `docs/INSTRUCTOR_RUNBOOK.md`。

## 驗證

```bash
npm run verify
```

這會依序執行 lint、TypeScript、12 個自動測試與 production build。手動驗收完整成果：

1. 7 月月曆可見，8 月顯示空白草稿。
2. 點 7 月任一非週日日期，右側出現當日抽屜。
3. 在缺工診次按「補一名助理」，人數與警示立即更新。
4. 重新整理後本機資料仍保留。
5. `/course-check` 與 `/settings` 可開啟。

## 主要檔案

| 檔案 | 用途 |
|---|---|
| `src/course/workshop-stage.ts` | checkpoint 的階段解鎖值 |
| `src/course/clinic.config.ts` | Stage 2：診所、三診與合成人員 |
| `src/course/demo-schedule.ts` | Stage 2：固定可重現的合成月班表 |
| `src/components/ScheduleBoard.tsx` | 原版月曆與月份切換 |
| `src/components/DayDrawer.tsx` | Stage 3：當日明細與調班 |
| `src/domain/rules/assistant-coverage.ts` | Stage 4：人力規則純邏輯 |
| `src/data/` | Stage 5：本機／Firestore 資料層 |
| `src/course/firebase.config.ts` | 學員自己的 Firebase Web config |

## Firebase 與部署

依 `FIREBASE_SETUP.md` 建立學員自己的 Firebase，發布 repo 內的 `firestore.rules`，再填入 `src/course/firebase.config.ts`。Firebase Web config 是前端專案識別資訊，不是資料庫門鎖；禁止提交 service account、私鑰、密碼或 token。

部署時把 repo push 到自己的 private GitHub repository，再由 Vercel 匯入。private repo 只保護程式碼；這個未登入 Demo 仍只能使用合成資料。
