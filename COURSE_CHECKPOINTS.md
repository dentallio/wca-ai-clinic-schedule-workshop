# 原版介面的七階段 Checkpoint

七個現行 checkpoint 使用同一套月曆視覺與操作模型，只透過 `src/course/workshop-stage.ts` 逐步解鎖。舊的 Stage 5 checkpoint 與 tag 保留作為歷史，不再作為本次工作坊教材。

| Branch | Tag | 唯一新增成果 |
|---|---|---|
| `checkpoint/original-ui-stage-1` | `original-ui-stage-1` | 原版殼層、月曆骨架、課程安全邊界 |
| `checkpoint/original-ui-stage-2` | `original-ui-stage-2` | 診所設定、三診、人員、合成月班表 |
| `checkpoint/original-ui-stage-3` | `original-ui-stage-3` | 當日抽屜、確認、換人、補人、休假與持久化 |
| `checkpoint/original-ui-stage-4` | `original-ui-stage-4` | 人力警示與邊界／回歸測試 |
| `checkpoint/original-ui-lesson-5-vercel-local` | `original-ui-lesson-5-vercel-local-v1` | 資料工具、本機狀態與 Vercel 首次部署 |
| `checkpoint/original-ui-lesson-6-firestore` | `original-ui-lesson-6-firestore-v1` | Firestore Rules、Web config 與雲端模式 |
| `checkpoint/original-ui-lesson-7-sync` | `original-ui-lesson-7-sync-v1` | Production branch、commit 與三裝置同步 |

舊的 `checkpoint/original-ui-stage-5` 與 `original-ui-stage-5` tag 不移動、不重寫。

## 救援原則

1. 先到 `/settings` 匯出 JSON。
2. 先看 `git status`，不要丟棄學員變更。
3. 建立救援 branch，再從對應 checkpoint 開新 branch。
4. Stage 6 之後保留學員自己的 Firebase 設定；Stage 2 之後保留診所課程設定檔。
5. Preview、`/course-check` 與該階段完成證據通過後再繼續。

```bash
git status
git switch -c rescue-lesson-6 checkpoint/original-ui-lesson-6-firestore
```

不要使用 `git reset --hard`。Git checkpoint 只處理程式碼；Firestore 資料仍需靠 JSON 匯出或正式備份。

## 發布規則

- `checkpoint/original-ui-*` branch 是這一版教材的已知良好狀態。
- `original-ui-*` tag 建立後不移動。
- 每次課前用乾淨 clone、乾淨瀏覽器資料與乾淨 Firebase 完整彩排。
