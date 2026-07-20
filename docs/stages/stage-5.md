# Stage 5：成果上線與跨裝置同步驗收

## 上線前停止新增功能

1. 重新完成 Stage 3 六個手動驗收。
2. 確認 Stage 4 的 0／1／2 人警示。
3. 開啟 `/course-check`，確認為 Firestore 雲端模式。
4. 先執行 `npm run verify`。
5. Review changes 後，由學員分開核准 commit 與 push。

## Vercel 驗收

1. 到 GitHub 記下最新 commit 的前 7 碼。
2. 到 Vercel Deployments，確認 Production deployment 對應同一 commit。
3. 開啟 Production URL，確認頁面標題、人員與三班時間正確。

## 三裝置同步

所有裝置只准使用合成資料：

1. 電腦、自己的手機與鄰座裝置開啟相同 Production URL。
2. 三個裝置都顯示右上角「已同步／雲端」。
3. 電腦把王醫師（虛構）某一格從早診改成午診。
4. 手機與鄰座裝置應在合理時間內顯示相同格子的午診。
5. 重新整理三個裝置，資料仍一致。

若不同步，依序檢查：

- 是否三個裝置都開啟 Production，而不是有人開 localhost。
- `/course-check` 是否顯示 Firestore 雲端模式。
- 三個版本是否來自同一 GitHub commit。
- Firebase Console 是否真的出現該文件。
- Firestore Rules 是否為本 repo 已審核版本。

不要用全面開放規則排除問題。

## 最終 Checkpoint

- `npm run verify` 全綠。
- GitHub 與 Vercel commit 相同。
- 三裝置同步與重新整理通過。
- 學員能說出：「這是可部署、可同步的合成資料 Demo；沒有登入與角色權限，不能放真實資料。」
