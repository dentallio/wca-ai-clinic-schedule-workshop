/**
 * 每個 checkpoint 只調整這個數字，讓同一套原版介面逐步解鎖能力。
 * Stage 5 先部署 localStorage；Stage 6 設定 Firestore；Stage 7 驗收同步。
 */
export const CURRENT_WORKSHOP_STAGE = 7 as 1 | 2 | 3 | 4 | 5 | 6 | 7;
