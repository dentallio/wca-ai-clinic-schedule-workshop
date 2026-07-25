# 牙科排班工作坊：AI 新進助理守則

## 使用者與溝通方式

- 使用者是零程式基礎的課程學員，請一律使用繁體中文與短句。
- 每次修改前先：重述目標、列出預計修改檔案、風險與驗收方式。
- 等使用者明確回覆「開始」後才修改。
- 不要把安裝套件、修改檔案、commit、push 合併成一次授權；各自說明並分開取得核准。

## Next.js 版本與文件

- 本專案使用的 Next.js 版本可能與既有訓練資料不同，API、慣例與檔案結構也可能已經變更。
- 修改 Next.js 相關程式前，先閱讀 `node_modules/next/dist/docs/` 內與任務相關的文件，並遵守其中的棄用提示。
- 不要憑印象套用舊版 Next.js 寫法，也不要在未確認文件前更換既有專案慣例。

## 絕對安全邊界

- 全程只使用從零建立的合成資料。
- 不得加入或輸入真實醫師、助理、病人、病歷、約診、請假原因或可對照真實診所的代號。
- 不得串接 HIS、正式人事系統、付款或外部 production 資料。
- 這是未登入 Demo，不得描述成正式安全系統。
- Firebase Web config 可放在前端，但 service account JSON、私鑰、密碼、PAT、token、cookie 與驗證碼都是秘密，禁止貼入 repo 或對話。

## 可安全修改的範圍

- Stage 2：`src/course/clinic.config.ts`
- Stage 4：`src/domain/rules/` 與對應警示元件、測試
- Stage 5：只做 Vercel 部署與 localStorage 對照，不填 Firebase config
- Stage 6：依教材填入 `src/course/firebase.config.ts` 與發布既有 Rules
- Stage 7：只做版本、Production Branch 與三裝置同步驗收
- 一般介面：`src/components/` 與 `src/app/globals.css`
- 文件與測試：`docs/`、`tests/`

## 需先停下說明的範圍

除非課程教材明確要求且使用者另行確認，否則不要修改：

- `firestore.rules`
- `src/course/firebase.config.ts`
- `src/data/` 的集合名稱與儲存格式
- `src/domain/types.ts` 的核心資料結構
- `package.json` 與相依套件
- checkpoint branch、Git 歷史與 Vercel 設定

如果需求涉及登入、角色、權限、Security Rules、病人資料、HIS 或跨診所資料，停止修改，說明這已超出課堂 Demo 安全範圍。

## 既有設計契約

- 同一位人員同一天只有一筆文件，ID 為 `日期_人員ID`。
- `state: "shift"` 必須有 `shiftId`。
- `state: "leave"` 不得同時有 `shiftId`。
- 換班是覆寫同一筆文件，不能新增重複文件。
- Firestore 使用即時訂閱；未填 Firebase 時使用 localStorage。
- 手機以檢視為主，桌機可以編輯。

## 修改後最低驗證

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

另外親自驗收：

1. 空白格可排班。
2. 同格早診改午診不重複。
3. 休假與班別不會同時存在。
4. 前後週可切換。
5. 重新整理資料仍存在。
6. Stage 4 修改後，再跑一次以上五項。

## Git 操作

- 修改前先確認目前 branch 與工作區狀態。
- 禁止自行使用 `git reset --hard`、強制 push 或丟棄使用者變更。
- commit 前先顯示 Review changes 摘要；使用者核准後才能 commit。
- push 是另一個外部動作，必須再次核准。
- Git checkpoint 不等於 Firestore 備份；切換前提醒學員先從 `/settings` 匯出 JSON。
