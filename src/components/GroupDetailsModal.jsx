
export default function GroupDetailsModal({
  group,
  onClose,
}) {
  if (!group) return null;

  const materials = group.materials ?? [];
  const certificateAvailable = Boolean(group.certificate?.available);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="group-details-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950 sm:rounded-3xl sm:p-7"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              {group.type || "Group"}
            </span>

            <h2
              id="group-details-title"
              className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
            >
              {group.name}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              {group.description || "No description available yet."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close group details"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            ×
          </button>
        </div>

        {/* Study materials */}
        <section className="mt-7">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Study materials
            </h3>

            <span className="text-xs text-slate-500 dark:text-slate-400">
              {materials.length} {materials.length === 1 ? "file" : "files"}
            </span>
          </div>

          {materials.length > 0 ? (
            <div className="mt-3 space-y-2">
              {materials.map((material, index) => (
                <div
                  key={material.id ?? `${material.name}-${index}`}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-800"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg dark:bg-slate-800">
                    {material.type === "link" ? "↗" : "↧"}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">
                      {material.name}
                    </p>

                    {material.description && (
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {material.description}
                      </p>
                    )}
                  </div>

                  {material.url ? (
                    <a
                      href={material.url}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-950/50"
                    >
                      {material.type === "link" ? "Open" : "Download"}
                    </a>
                  ) : (
                    <span className="shrink-0 text-xs text-slate-400">
                      Unavailable
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-3 rounded-2xl border border-dashed border-slate-300 px-4 py-8 text-center dark:border-slate-700">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                No materials yet
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Materials will appear here when staff shares them.
              </p>
            </div>
          )}
        </section>

        {/* Certificate */}
        <section className="mt-7 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xl dark:bg-emerald-950/40">
              🏅
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Certificate
              </h3>

              <p className="mt-1 text-sm leading-5 text-slate-500 dark:text-slate-400">
                {certificateAvailable
                  ? "Your certificate is ready to download."
                  : "Your certificate will be available here once staff issues it."}
              </p>
            </div>
          </div>

          {certificateAvailable && group.certificate?.url && (
            <a
              href={group.certificate.url}
              target="_blank"
              rel="noreferrer"
              download
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Download certificate
            </a>
          )}

          {certificateAvailable && !group.certificate?.url && (
            <p className="mt-3 text-xs text-amber-600 dark:text-amber-400">
              The certificate is marked as available, but its file has not been linked yet.
            </p>
          )}
        </section>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          Close
        </button>
      </section>
    </div>
  );
}
