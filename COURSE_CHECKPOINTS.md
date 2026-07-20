# 五階段 Checkpoint 與救援

## 已建立的版本

| Branch | Tag | 內容 |
|---|---|---|
| `checkpoint/stage-1` | `checkpoint-stage-1` | 可 Preview、核心週班表、本機／Firestore 資料層、安全文件 |
| `checkpoint/stage-2` | `checkpoint-stage-2` | 微笑牙科、三位虛構醫師、四位虛構助理與可排提示 |
| `checkpoint/stage-3` | `checkpoint-stage-3` | 核心操作文件與持久化／日期／互斥自動測試 |
| `checkpoint/stage-4` | `checkpoint-stage-4` | 助理人力警示、0／1／2 人測試與回歸測試 |
| `checkpoint/stage-5` | `checkpoint-stage-5` | 最終部署、三裝置驗收與完整文件 |

另有 `exercise/stage-2-broken`，只用於預埋錯誤練習，不得當成 checkpoint。

## 救援原則

1. 先到 `/settings` 匯出 JSON。
2. 先看 `git status`；有學員變更時不可直接丟棄。
3. 由 Claude 說明將保留的檔案、checkpoint 來源與驗收方式。
4. 將目前工作建立一個救援 commit，或保留原 branch。
5. 從 checkpoint 建立新 branch，不覆寫原 branch。
6. 保留學員自己的 `src/course/firebase.config.ts`；Stage 2 之後也保留 `src/course/clinic.config.ts`。
7. Preview 與 `/course-check` 通過後再繼續課程。

助教可使用以下概念流程，但必須先向學員解釋並取得核准：

```bash
git status
git switch -c rescue-stage-4 checkpoint/stage-4
# 再從原本的學員 branch 取回兩個個人設定檔
```

不要使用 `git reset --hard`。checkpoint 只處理程式碼；Firestore 班表仍要靠 JSON 匯出或 Firebase 的正式備份策略。

## Checkpoint 發布規則

- `checkpoint/*` branch 是課堂可讀的已知良好狀態。
- `checkpoint-*` tag 不可移動或重寫。
- 修改課程模板後若需要新版 checkpoint，使用新 tag 名稱，例如 `2026-08-stage-3`，不要覆寫既有 tag。
- 每次課前用乾淨 clone、乾淨 Firebase 專案與三個裝置完整彩排。
