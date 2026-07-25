# Stage 5：先把 localStorage 版本部署到 Vercel

## 上線前停止新增功能

1. 重新完成 Stage 3 六個手動驗收。
2. 確認 Stage 4 的 0／1／2 人警示。
3. 開啟 `/course-check`，確認目前仍是「本機練習」模式。
4. 先執行 `npm run verify`。
5. Review changes 後，由學員分開核准 commit 與 push。

## Vercel 驗收

1. 到 GitHub 記下最新 commit 的前 7 碼。
2. 到 Vercel Deployments，確認 Production deployment 對應同一 commit。
3. 開啟 Production URL，確認頁面標題、人員與三班時間正確。

## 兩個瀏覽器對照

所有畫面只准使用合成資料：

1. 電腦在 Production URL 新增一筆合成班別並重新整理，資料仍存在。
2. 手機或無痕視窗開啟同一個 Production URL。
3. 手機能開啟網站，但看不到電腦剛才新增的 localStorage 資料。
4. 兩個瀏覽器都顯示「本機練習」。

這個不一致是 Stage 5 的成功證據，不是部署失敗。Stage 6 才設定 Firestore。

若 Production 無法開啟，依序檢查：

- 是否三個裝置都開啟 Production，而不是有人開 localhost。
- `/course-check` 是否仍顯示本機模式。
- GitHub 與 Vercel 是否來自同一個 branch 與 commit。
- build log 的第一個完整錯誤。

不要為了排除部署問題而提早填 Firebase config 或放寬 Firestore Rules。

## 最終 Checkpoint

- `npm run verify` 全綠。
- GitHub 與 Vercel commit 相同。
- Production 網址可開，且與 GitHub commit 一致。
- 同一瀏覽器重新整理後資料仍在；另一個瀏覽器看不到該筆資料。
- 學員能說出：「網站程式已上線，但資料還沒有跨裝置同步。」

新救援 checkpoint：`checkpoint/lesson-5-vercel-local`。月曆版使用 `checkpoint/original-ui-lesson-5-vercel-local`。
