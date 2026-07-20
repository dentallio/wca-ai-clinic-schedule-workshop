import type { Metadata } from "next";
import Link from "next/link";
import { ScheduleProvider } from "@/components/ScheduleProvider";
import { COURSE_SAFETY_NOTICE } from "@/course/safety";
import "./globals.css";

export const metadata: Metadata = {
  title: "牙科排班工作坊",
  description: "只使用合成資料的排班系統教學模板",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>
        <div className="safety-banner" role="note">
          {COURSE_SAFETY_NOTICE}
        </div>
        <header className="site-header">
          <Link className="brand" href="/">
            <span className="brand-mark" aria-hidden="true">牙</span>
            <span>
              <strong>排班工作坊</strong>
              <small>Clinic Schedule Workshop</small>
            </span>
          </Link>
          <nav aria-label="主要導覽">
            <Link href="/">週班表</Link>
            <Link href="/settings">資料工具</Link>
            <Link href="/course-check">課程檢查</Link>
          </nav>
        </header>
        <ScheduleProvider>{children}</ScheduleProvider>
        <footer className="site-footer">
          未登入課程 Demo · Build {process.env.NEXT_PUBLIC_BUILD_LABEL ?? "local"}
        </footer>
      </body>
    </html>
  );
}
