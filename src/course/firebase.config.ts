/**
 * 課堂 Firebase Web config。
 *
 * 這些欄位是 Firebase Web App 的公開識別資訊，不是管理員密鑰。
 * 請勿在此貼 service account JSON、私鑰、密碼、token 或任何登入資訊。
 * 沒填完時系統會自動使用「本機練習模式」，仍可完成階段 1～4，
 * 但階段 5 的跨裝置同步必須填入自己的 Firebase 專案。
 */
export const firebaseCourseConfig = {
  apiKey: "PASTE_YOUR_FIREBASE_API_KEY",
  authDomain: "PASTE_YOUR_PROJECT.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "PASTE_YOUR_MESSAGING_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID",
};

export function hasFirebaseCourseConfig(): boolean {
  return Object.values(firebaseCourseConfig).every(
    (value) => value.length > 0 && !value.startsWith("PASTE_YOUR_"),
  );
}
