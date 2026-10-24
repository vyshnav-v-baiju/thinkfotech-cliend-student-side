
import { useState } from "react";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "⌂" },
  { id: "groups", label: "My Groups", icon: "▦" },
  { id: "profile", label: "Profile", icon: "♙" },
];

export default function StudentSidebar({
  activePage = "home",
  onNavigate,
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`sticky top-[88px] hidden h-[calc(100vh-112px)] shrink-0 flex-col rounded-2xl border border-slate-200 bg-white p-3 transition-[width] duration-300 lg:flex dark:border-slate-800 dark:bg-slate-950 ${
        collapsed ? "w-[76px]" : "w-64"
      }`}
    >
      <div className="mb-6 flex items-center justify-between px-2 pt-2">
        {!collapsed && (
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Workspace
          </span>
        )}

        <button
          type="button"
          onClick={() => setCollapsed((previous) => !previous)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      <nav aria-label="Student navigation" className="space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = activePage === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate?.(item.id)}
              title={collapsed ? item.label : undefined}
              aria-current={active ? "page" : undefined}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-50 text-brand-700 dark:bg-blue-950/60 dark:text-blue-300"
                  : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center text-xl">
                {item.icon}
              </span>

              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-slate-100 px-2 pt-4 dark:border-slate-800">
        {!collapsed && (
          <>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
              ThinkFoTech
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Learning & Projects
            </p>
          </>
        )}
      </div>
    </aside>
  );
}
