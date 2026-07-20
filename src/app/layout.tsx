import type { Metadata } from "next";
import { ScheduleProvider } from "@/components/ScheduleProvider";
import { WorkshopShell } from "@/components/WorkshopShell";
import { courseProfile } from "@/course/clinic.config";
import "./globals.css";

export const metadata: Metadata = {
  title: courseProfile.appName,
  description: "保留原版視覺與操作、只使用合成資料的排班工作坊",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant-TW">
      <body>
        <ScheduleProvider>
          <WorkshopShell>{children}</WorkshopShell>
        </ScheduleProvider>
      </body>
    </html>
  );
}
