
const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "⌂" },
  { id: "groups", label: "My Groups", icon: "▦" },
  { id: "profile", label: "Profile", icon: "♙" },
];

export default function StudentBottomNav({
  activePage = "home",
  onNavigate,
}) {
  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-3 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden dark:border-slate-800 dark:bg-slate-950/95"
    >
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const active = activePage === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate?.(item.id)}
              aria-current={active ? "page" : undefined}
              className={`flex min-w-[76px] flex-col items-center gap-1 rounded-xl px-4 py-2 text-xs font-medium transition-colors ${
                active
                  ? "text-brand-700 dark:text-blue-300"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              <span
                className={`flex h-7 w-9 items-center justify-center rounded-xl text-xl ${
                  active
                    ? "bg-blue-50 dark:bg-blue-950/60"
                    : ""
                }`}
              >
                {item.icon}
              </span>

              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

