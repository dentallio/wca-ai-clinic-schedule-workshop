"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  CalendarDays,
  Database,
  GraduationCap,
  LayoutDashboard,
  ListChecks,
  Menu,
  ShieldCheck,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { courseProfile } from "@/course/clinic.config";
import { CURRENT_WORKSHOP_STAGE } from "@/course/workshop-stage";
import { SyncBadge } from "./SyncBadge";

const activeItems = [
  { href: "/", label: "排班月曆", icon: CalendarDays },
  { href: "/settings", label: "資料工具", icon: Database },
  { href: "/course-check", label: "課程檢查", icon: ListChecks },
] as const;

const previewItems = [
  { label: "Dashboard 總覽", icon: LayoutDashboard },
  { label: "請假管理", icon: Users },
  { label: "使用說明", icon: BookOpen },
] as const;

export function WorkshopShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"warm" | "pro">("warm");

  return (
    <div className="app-shell" data-theme={theme}>
      <aside className={`sidebar ${menuOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar__brand">
          <Image src="/brand/logo_dentall_asst.svg" alt="" width={40} height={40} />
          <div className="sidebar__brand-text">
            <span className="sidebar__brand-name">{courseProfile.appName}</span>
            <span className="sidebar__brand-sub">{courseProfile.appOwner}</span>
          </div>
          <button className="sidebar__close" onClick={() => setMenuOpen(false)} aria-label="關閉選單">
            <X size={18} />
          </button>
        </div>

        <div>
          <div className="sidebar__group-label">MVP Phase 1</div>
          <nav className="nav" aria-label="主要導覽">
            {previewItems.slice(0, 1).map(({ label, icon: Icon }) => (
              <span className="nav__item nav__item--disabled" key={label}>
                <Icon size={18} strokeWidth={1.75} /> {label}
              </span>
            ))}
            {activeItems.map(({ href, label, icon: Icon }) => {
              if (href === "/settings" && CURRENT_WORKSHOP_STAGE < 5) return null;
              const active = pathname === href;
              return (
                <Link className={`nav__item ${active ? "nav__item--active" : ""}`} href={href} key={href} onClick={() => setMenuOpen(false)}>
                  <Icon size={18} strokeWidth={1.75} /> {label}
                </Link>
              );
            })}
            {previewItems.slice(1).map(({ label, icon: Icon }) => (
              <span className="nav__item nav__item--disabled" key={label}>
                <Icon size={18} strokeWidth={1.75} /> {label}
                <span className="nav__soon">課程外</span>
              </span>
            ))}
          </nav>
        </div>

        <div>
          <div className="sidebar__group-label">Roadmap</div>
          <nav className="nav" aria-label="產品藍圖">
            <span className="nav__item nav__item--disabled"><GraduationCap size={18} />教育訓練<span className="nav__soon">即將</span></span>
            <span className="nav__item nav__item--disabled"><Trophy size={18} />績效管理<span className="nav__soon">即將</span></span>
          </nav>
        </div>

        <div className="sidebar__footer">
          🏥 {courseProfile.clinicName} · {courseProfile.region}<br />
          課程版 · Stage {CURRENT_WORKSHOP_STAGE} / 7<br />
          不可用於真實營運
        </div>
      </aside>

      {menuOpen && <button className="nav-overlay" onClick={() => setMenuOpen(false)} aria-label="關閉選單" />}

      <div className="app-main">
        <header className="topbar">
          <button className="topbar__menu" onClick={() => setMenuOpen(true)} aria-label="開啟選單">
            <Menu size={20} />
          </button>
          <div className="clinic-switcher">
            <span aria-hidden>🏥</span>{courseProfile.clinicName}<small>· {courseProfile.region}</small>
          </div>
          <div className="topbar__right">
            <div className="course-safety-chip" title="本系統只可使用合成資料">
              <ShieldCheck size={14} />課程 Demo
            </div>
            <div className="theme-toggle" role="group" aria-label="切換視覺風格">
              <button className={`theme-toggle__btn ${theme === "warm" ? "theme-toggle__btn--on" : ""}`} onClick={() => setTheme("warm")}>溫暖</button>
              <button className={`theme-toggle__btn ${theme === "pro" ? "theme-toggle__btn--on" : ""}`} onClick={() => setTheme("pro")}>穩重</button>
            </div>
            <div className="role-switch">
              <span className="role-switch__label">檢視身分</span>
              <select className="role-select" aria-label="切換檢視身分" value="manager" onChange={() => undefined}>
                <option value="manager">門診經理人</option>
              </select>
            </div>
            {CURRENT_WORKSHOP_STAGE >= 5
              ? <SyncBadge />
              : <span className="course-stage-chip">Stage {CURRENT_WORKSHOP_STAGE}</span>}
          </div>
        </header>
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
}

export function PageHead({ title, sub, right }: { title: string; sub?: string; right?: ReactNode }) {
  return (
    <div className="page-head row" style={{ alignItems: "flex-end", gap: "var(--space-4)" }}>
      <div className="grow">
        <h1 className="page-head__title">{title}</h1>
        {sub && <p className="page-head__sub">{sub}</p>}
      </div>
      {right}
    </div>
  );
}
