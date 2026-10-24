
import { useState } from "react";

export default function StudentHeader({
  studentName = "Student",
  avatar = "",
  isDark,
  onToggleTheme,
}) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <a href="/students" className="flex shrink-0 items-center gap-3">
          <div className="flex h-10 w-10 p-2 items-center justify-center rounded-xl bg-brand-800 text-lg font-bold text-white shadow-sm">
           <img src="/images/logo.png" alt="" />
          </div>

          <div>
            <p className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
              ThinkfoTech
            </p>
            <p className="hidden text-xs text-slate-500 sm:block dark:text-slate-400">
              Student Portal
            </p>
          </div>
        </a>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* <span className="hidden text-sm text-slate-500 sm:block dark:text-slate-400">
            Welcome back,
            <span className="ml-1 font-semibold text-slate-800 dark:text-slate-100">
              {studentName}
            </span>
          </span> */}

          {/* <button
            type="button"
            onClick={onToggleTheme}
            aria-label={
              isDark ? "Switch to light mode" : "Switch to dark mode"
            }
            title={isDark ? "Light mode" : "Dark mode"}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-lg text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {isDark ? "☀️" : "🌙"}
          </button> */}

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowProfile((previous) => !previous)}
              aria-label="Open student profile menu"
              aria-expanded={showProfile}
              className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-blue-100 bg-blue-50 font-semibold text-blue-700 transition-colors hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800 dark:text-blue-300"
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                studentName.charAt(0).toUpperCase()
              )}
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-3 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900">
                <div className="border-b border-slate-100 px-3 py-3 dark:border-slate-800">
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {studentName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Student account
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowProfile(false);
                    document
                      .getElementById("student-profile")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-1 w-full rounded-xl px-3 py-2.5 text-left text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  View profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
