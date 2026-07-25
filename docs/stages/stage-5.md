# Stage 5：部署月曆版 localStorage 成果

1. 重走月曆、當日抽屜、補人、換人、休假與 Stage 4 人力警示。
2. 到 `/settings` 匯出合成資料 JSON。
3. 到 `/course-check` 確認目前仍是「本機練習」。
4. 執行 `npm run verify`，Review 後分開核准 commit 與 push。
5. 在 Vercel 指定本次選定的 Production Branch，核對 GitHub／Vercel commit。
6. 電腦新增一筆合成班別；手機或無痕視窗能開網站，但看不到該筆 localStorage 資料。

這個不同步是 Stage 5 的成功證據。不要為了排除部署問題而提早填 Firebase config 或放寬 Rules。

Checkpoint：`checkpoint/original-ui-lesson-5-vercel-local`。
